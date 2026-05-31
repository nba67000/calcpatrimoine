// src/lib/pretIntrafamilial.ts
//
// Simulateur de prêt intrafamilial in fine comme alternative ou complément
// à la donation. Calcul des intérêts, du risque successoral, et comparaison
// fiscale vs donation directe.

import type {
  PretIntrafamilialInputs,
  PretIntrafamilialResults,
  LienEmprunteur,
} from '@/types/pretIntrafamilial'
import type { CalculatorModule, HowToSchema } from '@/lib/calculators/types'
import type { FAQSchemaItem } from '@/components/SchemaFAQ'
import { formatEurRounded as eur, formatLigne as ligne } from '@/lib/formatters'

export const SOURCES_PRET_INTRAFAMILIAL = [
  { label: 'Article 1892 et s. du Code civil', desc: 'Régime juridique du prêt entre particuliers' },
  { label: 'Article 757 B du CGI', desc: 'Régime applicable en cas de remise de dette (assimilée à un don)' },
  { label: 'Article 779 du CGI', desc: 'Abattements donation/succession - point de comparaison' },
  { label: 'Article 784 du CGI', desc: 'Rappel fiscal des donations antérieures (15 ans)' },
  { label: 'Instruction fiscale 7G-3-12', desc: 'Prêts familiaux - déclaration obligatoire au-delà de 1 500 € (cumul annuel par préteur)' },
]

// Abattements personnels Art. 779 CGI - mêmes que donation
const ABATTEMENTS: Record<LienEmprunteur, number> = {
  enfant:       100000,
  petit_enfant: 31865,
  frere_soeur:  15932,
  autre:        0,
}

// Barème ligne directe (simplifié pour le MVP : ligne directe + neveu/sœur)
function tauxDroitsLigneDirecte(base: number): number {
  // Simplification : taux moyen approximatif pour base typique < 500 000 €
  if (base <= 0) return 0
  let droits = 0
  const tranches = [
    { max: 8072, taux: 0.05 },
    { max: 12109, taux: 0.10 },
    { max: 15932, taux: 0.15 },
    { max: 552324, taux: 0.20 },
    { max: 902838, taux: 0.30 },
    { max: 1805677, taux: 0.40 },
    { max: Number.MAX_VALUE, taux: 0.45 },
  ]
  let restant = base
  let bornePre = 0
  for (const t of tranches) {
    const dansLaTranche = Math.min(restant, t.max - bornePre)
    if (dansLaTranche <= 0) break
    droits += dansLaTranche * t.taux
    restant -= dansLaTranche
    bornePre = t.max
    if (restant <= 0) break
  }
  return droits
}

function tauxDroitsAutreLien(base: number, lien: LienEmprunteur): number {
  if (base <= 0) return 0
  if (lien === 'frere_soeur') {
    if (base <= 24430) return base * 0.35
    return 24430 * 0.35 + (base - 24430) * 0.45
  }
  // Autre lien (neveu, non parent)
  return base * 0.55
}

function calculerDroits(base: number, lien: LienEmprunteur): number {
  if (lien === 'enfant' || lien === 'petit_enfant') return tauxDroitsLigneDirecte(base)
  return tauxDroitsAutreLien(base, lien)
}

/**
 * Simule un prêt intrafamilial in fine. Compare avec une donation directe
 * équivalente sur le plan des droits de succession futurs.
 *
 * Hypothèses :
 * - Prêt remboursé in fine : seules les intérêts annuels sont versés par
 *   l'emprunteur jusqu'au terme, puis le capital intégral à la fin.
 * - Si le prêteur décède avant le terme : la créance non remboursée entre dans
 *   l'actif successoral, taxée selon le lien emprunteur ↔ prêteur (héritier).
 * - Comparaison : droits succession sur créance (prêt) vs droits donation
 *   immédiate (donation), même montant transmis.
 *
 * @example
 * // Prêt 100 000 € à un enfant, durée 10 ans, taux 2 %, prêteur 70 ans, espérance 85.
 * calculerPretIntrafamilial({...})
 */
export function calculerPretIntrafamilial(
  inputs: PretIntrafamilialInputs,
): PretIntrafamilialResults {
  const warnings: PretIntrafamilialResults['warnings'] = []
  const optimisations: PretIntrafamilialResults['optimisations'] = []

  // --- Intérêts ---
  const interetsAnnuels = inputs.montantPret * (inputs.tauxInteret / 100)
  const interetsCumulesPretDuree = interetsAnnuels * inputs.dureeAnnees
  // Au-delà de 1 000 € cumulés/an, déclaration obligatoire et imposables côté prêteur.
  const interetsImposablesPreteur = interetsAnnuels > 1000

  // --- Risque successoral : prêteur décède avant le terme ---
  const dureeRestanteAvantDeces = Math.max(0, inputs.esperanceVie - inputs.agePreteur)
  const decesAvantTerme = dureeRestanteAvantDeces < inputs.dureeAnnees
  const capitalNonRembourseDecesEstime = decesAvantTerme ? inputs.montantPret : 0

  // Droits de succession sur la créance (si héritier = emprunteur)
  const abattementDisponible = Math.max(
    0,
    ABATTEMENTS[inputs.lienEmprunteur] - inputs.donationsAnterieures,
  )
  const baseTaxableCreance = Math.max(0, capitalNonRembourseDecesEstime - abattementDisponible)
  const droitsSuccessionCreance = Math.round(calculerDroits(baseTaxableCreance, inputs.lienEmprunteur))

  // --- Comparaison : donation directe équivalente ---
  const baseTaxableDonation = Math.max(0, inputs.montantPret - abattementDisponible)
  const droitsDonationEquivalente = Math.round(calculerDroits(baseTaxableDonation, inputs.lienEmprunteur))

  // --- Synthèse ---
  // L'option "prêt" est avantageuse si :
  // - le prêteur vit jusqu'au remboursement (pas de droits de succession)
  // - OU les droits de succession sur la créance sont inférieurs aux droits de donation
  // L'option "donation" est avantageuse si :
  // - les droits de donation immédiate sont inférieurs au cumul intérêts +
  //   droits succession éventuels.
  const coutPretTotal = interetsCumulesPretDuree + droitsSuccessionCreance
  const optionAvantageuse: 'pret' | 'donation' =
    coutPretTotal < droitsDonationEquivalente ? 'pret' : 'donation'
  const ecart = Math.abs(coutPretTotal - droitsDonationEquivalente)

  // --- Warnings ---
  if (inputs.tauxInteret === 0 && inputs.montantPret > 5000) {
    warnings.push({
      type: 'warning',
      message: `Prêt sans intérêt de ${eur(inputs.montantPret)} : risque de requalification en don indirect par l'administration fiscale, surtout en l'absence de reconnaissance de dette écrite et de calendrier de remboursement précis. Le taux minimal accepté est généralement le TMM (taux moyen mensuel pratiqué par les banques).`,
    })
  }
  if (interetsAnnuels > 1000) {
    warnings.push({
      type: 'info',
      message: `Intérêts annuels > 1 000 € : le prêteur doit déclarer ces intérêts à l'IR (revenus de capitaux mobiliers, formulaire 2778) et le prêt doit être déclaré (formulaire 2062 si > 5 000 €).`,
    })
  }
  if (decesAvantTerme) {
    warnings.push({
      type: 'danger',
      message: `Espérance de vie (${dureeRestanteAvantDeces} ans) inférieure à la durée du prêt (${inputs.dureeAnnees} ans). Le capital non remboursé (${eur(capitalNonRembourseDecesEstime)}) entrera dans l'actif successoral comme créance, taxée à la part de l'emprunteur si héritier.`,
    })
  }

  // --- Optimisations ---
  if (
    inputs.lienEmprunteur === 'enfant' &&
    inputs.donationsAnterieures === 0 &&
    droitsDonationEquivalente === 0 &&
    inputs.montantPret <= ABATTEMENTS.enfant
  ) {
    optimisations.push({
      type: 'success',
      message: `À ${eur(inputs.montantPret)}, une donation directe à votre enfant serait intégralement couverte par l'abattement de ${eur(ABATTEMENTS.enfant)} (Art. 779-I CGI) — aucun droit de donation. À comparer avec le coût de gestion d'un prêt (intérêts, déclarations, risque de requalification).`,
    })
  }

  if (optionAvantageuse === 'pret' && !decesAvantTerme) {
    optimisations.push({
      type: 'info',
      message: `Si le prêt va jusqu'au terme (remboursement complet par l'emprunteur), aucun droit de mutation n'est dû. Le prêt n'est ni une donation ni une transmission — c'est un déplacement temporaire de trésorerie.`,
    })
  }

  return {
    interetsAnnuels: Math.round(interetsAnnuels),
    interetsCumulesPretDuree: Math.round(interetsCumulesPretDuree),
    interetsImposablesPreteur,
    capitalNonRembourseDecesEstime: Math.round(capitalNonRembourseDecesEstime),
    droitsSuccessionCreance,
    abattementDisponible,
    baseTaxableDonation,
    droitsDonationEquivalente,
    optionAvantageuse,
    ecart: Math.round(ecart),
    warnings,
    optimisations,
  }
}

// ─────────────────────────────────────────────────────────────
// Schémas SEO
// ─────────────────────────────────────────────────────────────

const FAQ_PRET_INTRAFAMILIAL: FAQSchemaItem[] = [
  {
    question: "Faut-il déclarer un prêt entre proches ?",
    answer: "Oui, à partir de 5 000 € cumulés par prêteur sur l'année (formulaire 2062). Les intérêts versés par l'emprunteur deviennent des revenus de capitaux mobiliers imposables pour le prêteur dès qu'ils dépassent 1 000 € par an au total.",
  },
  {
    question: "Un prêt sans intérêt peut-il être requalifié en donation ?",
    answer: "Oui. L'administration peut requalifier un prêt à 0 % en don indirect, surtout en l'absence de reconnaissance de dette écrite, d'échéances précises, et d'effet réel des remboursements. Le taux minimal accepté est généralement le TMM (taux moyen mensuel pratiqué).",
  },
  {
    question: "Que se passe-t-il si le prêteur décède avant le remboursement ?",
    answer: "Le capital non remboursé devient une créance qui entre dans l'actif successoral du défunt. Si l'emprunteur est aussi héritier, sa part d'héritage est diminuée de la créance, qui s'éteint par confusion — mais elle a déjà été taxée aux droits de succession sur la base qui revient à l'emprunteur.",
  },
]

const HOWTO_PRET_INTRAFAMILIAL: HowToSchema = {
  name: "Simuler un prêt intrafamilial in fine",
  description: "Comparer le coût fiscal d'un prêt intrafamilial in fine vs une donation directe.",
  totalTime: "PT3M",
  steps: [
    { name: "Saisir le montant et la durée", text: "Montant prêté, durée du prêt, taux d'intérêt." },
    { name: "Indiquer l'âge prêteur + espérance", text: "Permet d'évaluer le risque de décès avant le terme." },
    { name: "Choisir le lien emprunteur", text: "Détermine l'abattement et le barème applicables en cas de succession." },
    { name: "Lire la comparaison", text: "Coût total prêt (intérêts + droits succession éventuels) vs droits de donation immédiate." },
  ],
}

// ─────────────────────────────────────────────────────────────
// Module
// ─────────────────────────────────────────────────────────────

export const modulePretIntrafamilial: CalculatorModule<
  PretIntrafamilialInputs,
  PretIntrafamilialResults
> = {
  slug: 'pret-intrafamilial',
  nom: 'Prêt intrafamilial in fine',
  sources: SOURCES_PRET_INTRAFAMILIAL,
  faqSchema: FAQ_PRET_INTRAFAMILIAL,
  howToSchema: HOWTO_PRET_INTRAFAMILIAL,
  formatContexteChat: (inputs, results) =>
    [
      'CONTEXTE PRÊT INTRAFAMILIAL :',
      ligne('Montant', eur(inputs.montantPret)),
      ligne('Durée', `${inputs.dureeAnnees} ans`),
      ligne('Taux', `${inputs.tauxInteret} %`),
      ligne('Âge prêteur', `${inputs.agePreteur} ans`),
      ligne('Espérance de vie', `${inputs.esperanceVie} ans`),
      ligne('Lien emprunteur', inputs.lienEmprunteur),
      '',
      ligne('Intérêts cumulés', eur(results.interetsCumulesPretDuree)),
      ligne('Droits succession éventuels', eur(results.droitsSuccessionCreance)),
      ligne('Droits donation équivalente', eur(results.droitsDonationEquivalente)),
      ligne('Option avantageuse', `${results.optionAvantageuse} (écart ${eur(results.ecart)})`),
    ].join('\n'),
}
