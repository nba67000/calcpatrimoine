// src/lib/donationDemembrement.ts
//
// Donation avec démembrement de propriété (nue-propriété transmise, usufruit
// conservé par le donateur). Barème Art. 669 CGI : valeur de la nue-propriété
// dépend de l'âge de l'usufruitier au moment de la donation.

import type {
  DonationDemembrementInputs,
  DonationDemembrementResults,
} from '@/types/donationDemembrement'
import type { LienParente } from '@/types/donation'
import type { CalculatorModule, HowToSchema } from '@/lib/calculators/types'
import type { FAQSchemaItem } from '@/components/SchemaFAQ'
import { formatEurRounded as eur, formatLigne as ligne, formatPct as pct } from '@/lib/formatters'

export const SOURCES_DONATION_DEMEMBREMENT = [
  { label: 'Article 669 du CGI', desc: 'Barème légal de la valeur de l\'usufruit et de la nue-propriété selon l\'âge de l\'usufruitier' },
  { label: 'Article 777 du CGI', desc: 'Barème progressif des droits de mutation à titre gratuit (donation et succession)' },
  { href: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000026292566', label: 'Article 779 du CGI', desc: 'Abattements personnels par lien de parenté' },
  { label: 'Article 784 du CGI', desc: 'Rappel fiscal des donations antérieures (15 ans)' },
]

// ─────────────────────────────────────────────────────────────
// Barème Art. 669 CGI : valeur de l'usufruit selon l'âge
// ─────────────────────────────────────────────────────────────

function bareme669(age: number): { usufruit: number; nuePropriete: number } {
  if (age < 21)      return { usufruit: 90, nuePropriete: 10 }
  if (age <= 30)     return { usufruit: 80, nuePropriete: 20 }
  if (age <= 40)     return { usufruit: 70, nuePropriete: 30 }
  if (age <= 50)     return { usufruit: 60, nuePropriete: 40 }
  if (age <= 60)     return { usufruit: 50, nuePropriete: 50 }
  if (age <= 70)     return { usufruit: 40, nuePropriete: 60 }
  if (age <= 80)     return { usufruit: 30, nuePropriete: 70 }
  if (age <= 90)     return { usufruit: 20, nuePropriete: 80 }
  return                  { usufruit: 10, nuePropriete: 90 }
}

// ─────────────────────────────────────────────────────────────
// Abattements + barème Art. 777 (réutilisés depuis donation)
// ─────────────────────────────────────────────────────────────

const ABATTEMENTS: Record<LienParente, number> = {
  enfant: 100000, parent: 100000, petit_enfant: 31865,
  epoux_pacs: 80724, frere_soeur: 15932, neveu_niece: 7967,
  autre_4e: 0, non_parent: 0,
}

const BAREMES_LINEAIRES: Partial<Record<LienParente, number>> = {
  neveu_niece: 0.55,
  autre_4e: 0.55,
  non_parent: 0.60,
}

function appliquerBaremeLigneDirecte(base: number): number {
  if (base <= 0) return 0
  const tranches = [
    { max: 8072, taux: 0.05 },
    { max: 12109, taux: 0.10 },
    { max: 15932, taux: 0.15 },
    { max: 552324, taux: 0.20 },
    { max: 902838, taux: 0.30 },
    { max: 1805677, taux: 0.40 },
    { max: Number.MAX_VALUE, taux: 0.45 },
  ]
  let droits = 0
  let restant = base
  let bornePre = 0
  for (const t of tranches) {
    const dans = Math.min(restant, t.max - bornePre)
    if (dans <= 0) break
    droits += dans * t.taux
    restant -= dans
    bornePre = t.max
    if (restant <= 0) break
  }
  return droits
}

function appliquerBaremeEpoux(base: number): number {
  if (base <= 0) return 0
  const tranches = [
    { max: 8072, taux: 0.05 },
    { max: 15932, taux: 0.10 },
    { max: 31865, taux: 0.15 },
    { max: 552324, taux: 0.20 },
    { max: 902838, taux: 0.30 },
    { max: 1805677, taux: 0.40 },
    { max: Number.MAX_VALUE, taux: 0.45 },
  ]
  let droits = 0
  let restant = base
  let bornePre = 0
  for (const t of tranches) {
    const dans = Math.min(restant, t.max - bornePre)
    if (dans <= 0) break
    droits += dans * t.taux
    restant -= dans
    bornePre = t.max
    if (restant <= 0) break
  }
  return droits
}

function appliquerBareme(base: number, lien: LienParente): number {
  const lineaire = BAREMES_LINEAIRES[lien]
  if (lineaire !== undefined) return base * lineaire
  if (lien === 'frere_soeur') {
    if (base <= 0) return 0
    if (base <= 24430) return base * 0.35
    return 24430 * 0.35 + (base - 24430) * 0.45
  }
  if (lien === 'epoux_pacs') return appliquerBaremeEpoux(base)
  return appliquerBaremeLigneDirecte(base)
}

/**
 * Calcule les droits de donation avec démembrement (nue-propriété transmise).
 *
 * Le donataire reçoit la nue-propriété ; l'usufruit reste au donateur (jusqu'à
 * son décès). La valeur fiscale de la nue-propriété est donnée par le barème
 * Art. 669 CGI selon l'âge de l'usufruitier — plus l'usufruitier est jeune,
 * moins la nue-propriété vaut, donc moins de droits.
 *
 * @example
 * // Donation à un enfant, parent 65 ans, bien 500 000 €
 * // → nue-propriété = 60 % × 500 000 = 300 000 €
 * // → après abattement 100 000 € : base 200 000 €
 * // → droits ≈ 38 194 €
 */
export function calculerDonationDemembrement(
  inputs: DonationDemembrementInputs,
): DonationDemembrementResults {
  const warnings: DonationDemembrementResults['warnings'] = []
  const optimisations: DonationDemembrementResults['optimisations'] = []

  // 1. Barème Art. 669
  const { usufruit, nuePropriete } = bareme669(inputs.ageUsufruitier)
  const valeurUsufruit = inputs.valeurBienPleinePropriete * (usufruit / 100)
  const valeurNueProprietetransmise = inputs.valeurBienPleinePropriete * (nuePropriete / 100)

  // 2. Abattement disponible (Art. 779 + rappel 784)
  const abattementMax = ABATTEMENTS[inputs.lienDonataire]
  const abattementDisponible = Math.max(0, abattementMax - inputs.donationsAnterieures)

  // 3. Droits sur la donation de nue-propriété
  const baseTaxable = Math.max(0, valeurNueProprietetransmise - abattementDisponible)
  const droitsDemembrement = Math.round(appliquerBareme(baseTaxable, inputs.lienDonataire))

  // 4. Comparaison : donation en pleine propriété
  const baseTaxablePleinePropriete = Math.max(0, inputs.valeurBienPleinePropriete - abattementDisponible)
  const droitsPleinePropriete = Math.round(appliquerBareme(baseTaxablePleinePropriete, inputs.lienDonataire))
  const economieRealisee = droitsPleinePropriete - droitsDemembrement

  // 5. Warnings + optimisations
  if (inputs.ageUsufruitier > 75) {
    warnings.push({
      type: 'warning',
      message: `À ${inputs.ageUsufruitier} ans, la valeur fiscale de la nue-propriété est de ${nuePropriete} % (Art. 669 CGI). Le démembrement réduit encore les droits mais le donateur conserve l'usufruit moins longtemps statistiquement.`,
    })
  }
  if (inputs.lienDonataire === 'epoux_pacs') {
    warnings.push({
      type: 'info',
      message: `Donation au conjoint : l'abattement est de 80 724 € (Art. 790 E CGI). En succession (décès), le conjoint est totalement exonéré (Loi TEPA). Le démembrement entre époux a surtout un intérêt civil/patrimonial (protéger le conjoint usufruitier), pas fiscal.`,
    })
  }
  if (economieRealisee > 0) {
    optimisations.push({
      type: 'success',
      message: `Le démembrement permet d'économiser ${eur(economieRealisee)} de droits par rapport à une donation en pleine propriété du même bien. À noter : au décès du donateur, l'usufruit s'éteint sans droit supplémentaire — le donataire récupère la pleine propriété sans nouvelle taxation.`,
    })
  }

  return {
    tauxUsufruit: usufruit,
    tauxNuePropriete: nuePropriete,
    valeurUsufruit: Math.round(valeurUsufruit),
    valeurNueProprietetransmise: Math.round(valeurNueProprietetransmise),
    abattementDisponible,
    baseTaxable: Math.round(baseTaxable),
    droitsDemembrement,
    baseTaxablePleinePropriete: Math.round(baseTaxablePleinePropriete),
    droitsPleinePropriete,
    economieRealisee,
    warnings,
    optimisations,
  }
}

// ─────────────────────────────────────────────────────────────
// Schémas SEO
// ─────────────────────────────────────────────────────────────

const FAQ_DD: FAQSchemaItem[] = [
  {
    question: "Qu'est-ce que la donation avec démembrement ?",
    answer: "Le donateur transmet la nue-propriété d'un bien à un donataire (typiquement un enfant) en conservant l'usufruit (droit d'usage et droit aux fruits) jusqu'à son décès. Au décès, l'usufruit s'éteint et le nu-propriétaire récupère la pleine propriété sans nouvelle taxation.",
  },
  {
    question: "Comment est calculée la valeur de la nue-propriété ?",
    answer: "Le barème Art. 669 CGI fixe la valeur de la nue-propriété en fonction de l'âge de l'usufruitier : par exemple 60 % de la valeur totale entre 61 et 70 ans, 70 % entre 71 et 80 ans. Plus l'usufruitier est jeune, moins la nue-propriété vaut, donc moins de droits.",
  },
  {
    question: "Le démembrement réduit-il toujours les droits de donation ?",
    answer: "Oui : les droits sont calculés sur la valeur fiscale de la nue-propriété, qui est par construction inférieure à la valeur du bien en pleine propriété. L'économie dépend de l'âge de l'usufruitier au moment de la donation.",
  },
]

const HOWTO_DD: HowToSchema = {
  name: "Simuler une donation avec démembrement",
  description: "Calculer les droits de donation sur la nue-propriété transmise (Art. 669 CGI).",
  totalTime: "PT2M",
  steps: [
    { name: "Saisir la valeur du bien", text: "Valeur de marché du bien en pleine propriété." },
    { name: "Indiquer l'âge du donateur", text: "L'âge détermine la valeur fiscale de la nue-propriété (Art. 669 CGI)." },
    { name: "Choisir le lien donataire", text: "Détermine l'abattement personnel et le barème applicables." },
    { name: "Lire le détail", text: "Le calculateur affiche la décomposition usufruit/nue-propriété, les droits dus, et l'économie vs donation en pleine propriété." },
  ],
}

// ─────────────────────────────────────────────────────────────
// Module
// ─────────────────────────────────────────────────────────────

export const moduleDonationDemembrement: CalculatorModule<
  DonationDemembrementInputs,
  DonationDemembrementResults
> = {
  slug: 'donation/demembrement',
  nom: 'Donation avec démembrement',
  sources: SOURCES_DONATION_DEMEMBREMENT,
  faqSchema: FAQ_DD,
  howToSchema: HOWTO_DD,
  formatContexteChat: (inputs, results) =>
    [
      'CONTEXTE DONATION DEMEMBREMENT :',
      ligne('Valeur bien', eur(inputs.valeurBienPleinePropriete)),
      ligne('Âge usufruitier', `${inputs.ageUsufruitier} ans`),
      ligne('Lien donataire', inputs.lienDonataire),
      ligne('Donations < 15 ans', eur(inputs.donationsAnterieures)),
      '',
      ligne('Taux nue-propriété', pct(results.tauxNuePropriete, 0)),
      ligne('Valeur nue-propriété', eur(results.valeurNueProprietetransmise)),
      ligne('Droits avec démembrement', eur(results.droitsDemembrement)),
      ligne('Droits pleine propriété', eur(results.droitsPleinePropriete)),
      ligne('Économie', eur(results.economieRealisee)),
    ].join('\n'),
}
