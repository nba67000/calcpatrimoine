// src/lib/succession.ts
//
// Calcul des droits de succession par héritier.
// Réutilise barème Art. 777 CGI + abattements Art. 779 (mêmes que donation),
// ajoute l'exonération conjoint/PACS Loi TEPA 2007 (Art. 796-0 bis CGI).

import type {
  SuccessionInputs,
  SuccessionResults,
  LienHeritier,
  TrancheSuccession,
  DetailHeritier,
} from '@/types/succession'
import type { CalculatorModule } from '@/lib/calculators/types'
import { formatEurRounded as eur, formatLigne as ligne } from '@/lib/formatters'

export const SOURCES_SUCCESSION = [
  // Cf. docs/broken-links-to-fix.md pour le statut des URLs Légifrance.
  { label: 'Article 777 du CGI' },
  { href: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000026292566', label: 'Article 779 du CGI', desc: 'Abattements personnels par lien de parenté (100 000 € enfant, 15 932 € frère-sœur, etc.)' },
  { label: 'Article 784 du CGI', desc: 'Rappel fiscal des donations antérieures (15 ans)' },
  { label: 'Article 796-0 bis du CGI', desc: 'Exonération totale du conjoint survivant et partenaire de PACS (Loi TEPA 2007)' },
  { href: 'https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000278649', label: 'Loi TEPA 2007', desc: 'Loi en faveur du travail, de l\'emploi et du pouvoir d\'achat' },
]

// ─────────────────────────────────────────────────────────────
// Abattements (mêmes que donation - Art. 779 CGI 2026)
// ─────────────────────────────────────────────────────────────

const ABATTEMENTS: Record<LienHeritier, number> = {
  enfant:       100000, // Art. 779-I CGI
  epoux_pacs:   80724,  // Art. 790 E CGI (succession : exonéré totalement par TEPA - ce montant n'est jamais appliqué)
  parent:       100000, // Art. 779-I CGI (ligne directe ascendante)
  petit_enfant: 1594,   // Art. 779-I CGI : abattement spécifique petit-enfant en succession (1 594 €)
  frere_soeur:  15932,  // Art. 779-IV CGI
  neveu_niece:  7967,   // Art. 779-V CGI
  autre_4e:     1594,   // Abattement défaut Art. 788 CGI
  non_parent:   1594,   // Abattement défaut Art. 788 CGI
}

// ─────────────────────────────────────────────────────────────
// Barèmes Art. 777 CGI (mêmes que donation pour la plupart des liens)
// ─────────────────────────────────────────────────────────────

interface Tranche {
  taux: number
  min: number
  max: number
}

const BAREME_LIGNE_DIRECTE: Tranche[] = [
  { taux: 5,  min: 0,       max: 8072 },
  { taux: 10, min: 8072,    max: 12109 },
  { taux: 15, min: 12109,   max: 15932 },
  { taux: 20, min: 15932,   max: 552324 },
  { taux: 30, min: 552324,  max: 902838 },
  { taux: 40, min: 902838,  max: 1805677 },
  { taux: 45, min: 1805677, max: Number.MAX_VALUE },
]

const BAREME_FRERE_SOEUR: Tranche[] = [
  { taux: 35, min: 0,     max: 24430 },
  { taux: 45, min: 24430, max: Number.MAX_VALUE },
]

const BAREME_NEVEU_NIECE: Tranche[] = [
  { taux: 55, min: 0, max: Number.MAX_VALUE },
]

const BAREME_NON_PARENT: Tranche[] = [
  { taux: 60, min: 0, max: Number.MAX_VALUE },
]

function getBareme(lien: LienHeritier): Tranche[] {
  switch (lien) {
    case 'enfant':
    case 'parent':
    case 'petit_enfant':
      return BAREME_LIGNE_DIRECTE
    case 'epoux_pacs':
      // Exonéré, mais on retourne ligne directe par sécurité (le code n'arrivera pas ici)
      return BAREME_LIGNE_DIRECTE
    case 'frere_soeur':
      return BAREME_FRERE_SOEUR
    case 'neveu_niece':
    case 'autre_4e':
      return BAREME_NEVEU_NIECE
    case 'non_parent':
      return BAREME_NON_PARENT
  }
}

/**
 * Applique le barème par tranches à la base taxable, en tenant compte du rappel
 * fiscal Art. 784 CGI (les donations antérieures consomment déjà certaines tranches
 * basses du barème).
 */
function appliquerBareme(
  baseTaxable: number,
  tranchesConsomeesParRappel: number,
  bareme: Tranche[]
): { droits: number; detail: TrancheSuccession[] } {
  const detail: TrancheSuccession[] = []
  let droits = 0
  const debut = tranchesConsomeesParRappel
  const fin = debut + baseTaxable

  for (const t of bareme) {
    if (fin <= t.min) break

    const borneBasse = Math.max(t.min, debut)
    const borneHaute = Math.min(t.max, fin)

    if (borneHaute <= borneBasse) continue

    const baseDansLaTranche = borneHaute - borneBasse
    const droitsDansLaTranche = baseDansLaTranche * (t.taux / 100)
    droits += droitsDansLaTranche

    detail.push({
      taux: t.taux,
      borneInf: t.min,
      borneSup: t.max === Number.MAX_VALUE ? null : t.max,
      baseDansLaTranche: Math.round(baseDansLaTranche),
      droitsDansLaTranche: Math.round(droitsDansLaTranche),
    })
  }

  return { droits, detail }
}

/**
 * Calcule les droits de succession pour chaque héritier.
 *
 * Règles appliquées :
 * - Conjoint et partenaire de PACS : exonérés totalement (Art. 796-0 bis CGI, Loi TEPA 2007).
 * - Pour les autres héritiers : abattement personnel Art. 779 CGI + barème Art. 777 CGI selon le lien.
 * - Rappel 15 ans (Art. 784 CGI) : si le défunt avait fait des donations à l'héritier
 *   dans les 15 années avant son décès, l'abattement déjà utilisé n'est plus disponible,
 *   et le calcul démarre dans une tranche plus haute du barème.
 *
 * @example
 * // Enfant unique recevant 250 000 € sans donation antérieure
 * calculerSuccession({
 *   actifNetSuccessoral: 250000,
 *   heritiers: [{ id: '1', nom: 'Enfant', lien: 'enfant', partRecue: 250000, donationsAnterieures: 0 }],
 * })
 * // → Abattement 100 000 €, base taxable 150 000 €, droits ≈ 28 194 €.
 */
export function calculerSuccession(inputs: SuccessionInputs): SuccessionResults {
  const detailHeritiers: DetailHeritier[] = []
  const warnings: SuccessionResults['warnings'] = []
  const optimisations: SuccessionResults['optimisations'] = []

  let totalDroits = 0
  let totalNetRecu = 0

  // 1. Vérification : la somme des parts reçues colle à l'actif successoral
  const sommeParts = inputs.heritiers.reduce((s, h) => s + h.partRecue, 0)
  if (Math.abs(sommeParts - inputs.actifNetSuccessoral) > 1) {
    warnings.push({
      type: 'warning',
      message: `La somme des parts reçues (${eur(sommeParts)}) ne correspond pas à l'actif net successoral saisi (${eur(inputs.actifNetSuccessoral)}). Les calculs portent sur les parts saisies.`,
    })
  }

  // 2. Calcul par héritier
  for (const h of inputs.heritiers) {
    // 2a. Cas conjoint / PACS : exonération totale Loi TEPA
    if (h.lien === 'epoux_pacs') {
      detailHeritiers.push({
        id: h.id,
        nom: h.nom,
        lien: h.lien,
        partRecue: h.partRecue,
        abattementApplique: h.partRecue, // l'intégralité est "abattue"
        baseTaxable: 0,
        droits: 0,
        netRecu: h.partRecue,
        exonereLoiTEPA: true,
        detailTranches: [],
      })
      totalNetRecu += h.partRecue
      continue
    }

    // 2b. Abattement personnel après rappel 15 ans
    const abattementMax = ABATTEMENTS[h.lien]
    const abattementConsomme = Math.min(h.donationsAnterieures, abattementMax)
    const abattementApplique = Math.max(0, abattementMax - abattementConsomme)

    // 2c. Base taxable
    const baseTaxable = Math.max(0, h.partRecue - abattementApplique)

    // 2d. Tranches consommées par les donations antérieures (au-delà de l'abattement)
    const tranchesConsomees = Math.max(0, h.donationsAnterieures - abattementMax)

    // 2e. Application du barème
    const bareme = getBareme(h.lien)
    const { droits, detail } = appliquerBareme(baseTaxable, tranchesConsomees, bareme)

    const droitsArrondis = Math.round(droits)
    detailHeritiers.push({
      id: h.id,
      nom: h.nom,
      lien: h.lien,
      partRecue: h.partRecue,
      abattementApplique,
      baseTaxable,
      droits: droitsArrondis,
      netRecu: h.partRecue - droitsArrondis,
      exonereLoiTEPA: false,
      detailTranches: detail,
    })

    totalDroits += droitsArrondis
    totalNetRecu += h.partRecue - droitsArrondis

    // 2f. Warnings/optimisations par héritier
    if (h.donationsAnterieures > 0 && abattementConsomme > 0) {
      warnings.push({
        type: 'info',
        message: `${h.nom} : les donations reçues du défunt depuis moins de 15 ans (${eur(h.donationsAnterieures)}) ont consommé ${eur(abattementConsomme)} d'abattement. Il ne reste que ${eur(abattementApplique)} avant que la part reçue ne soit taxée (Art. 784 CGI).`,
      })
    }
  }

  // 3. Optimisations transverses
  const enfants = inputs.heritiers.filter(h => h.lien === 'enfant')
  if (enfants.length > 0 && totalDroits > 0) {
    const sansDonationAnterieure = enfants.filter(h => h.donationsAnterieures === 0)
    if (sansDonationAnterieure.length > 0) {
      optimisations.push({
        type: 'info',
        message: `L'abattement de 100 000 € par enfant (Art. 779-I CGI) se reconstitue tous les 15 ans. Anticiper la transmission par donation permettrait d'éviter les droits de succession au décès, dans la limite de cet abattement renouvelable.`,
      })
    }
  }

  return {
    totalDroits,
    totalNetRecu,
    detailHeritiers,
    warnings,
    optimisations,
  }
}

// ─────────────────────────────────────────────────────────────
// Schémas SEO (FAQ + HowTo minimaux)
// ─────────────────────────────────────────────────────────────

import type { HowToSchema } from '@/lib/calculators/types'
import type { FAQSchemaItem } from '@/components/SchemaFAQ'

const FAQ_SUCCESSION: FAQSchemaItem[] = [
  {
    question: "Qui paie les droits de succession ?",
    answer: "Chaque héritier paie ses propres droits de succession, calculés sur sa part reçue après l'abattement applicable à son lien de parenté avec le défunt.",
  },
  {
    question: "Le conjoint paie-t-il des droits de succession ?",
    answer: "Non. Depuis la loi TEPA de 2007 (Art. 796-0 bis CGI), le conjoint survivant et le partenaire de PACS sont totalement exonérés de droits de succession, quel que soit le montant transmis.",
  },
  {
    question: "Quel est l'abattement par enfant ?",
    answer: "Chaque enfant bénéficie d'un abattement de 100 000 € sur sa part d'héritage (Art. 779-I CGI). Cet abattement se reconstitue tous les 15 ans.",
  },
]

const HOWTO_SUCCESSION: HowToSchema = {
  name: "Calculer les droits de succession",
  description: "Estimer les droits de succession par héritier selon l'actif successoral et le lien de parenté avec le défunt.",
  totalTime: "PT5M",
  steps: [
    {
      name: "Renseigner l'actif net successoral",
      text: "Indiquer le montant total de l'héritage après dettes.",
    },
    {
      name: "Ajouter chaque héritier",
      text: "Saisir le nom, le lien de parenté et la part reçue par chaque héritier.",
    },
    {
      name: "Saisir les donations antérieures",
      text: "Pour chaque héritier, indiquer les donations reçues du défunt depuis moins de 15 ans (rappel Art. 784 CGI).",
    },
    {
      name: "Lire le détail",
      text: "Le calculateur affiche l'abattement appliqué, la base taxable, les droits et le net reçu pour chaque héritier.",
    },
  ],
}

// ─────────────────────────────────────────────────────────────
// Helpers UI
// ─────────────────────────────────────────────────────────────

let nextHeritierId = 1
export function genererIdHeritier(): string {
  return `h${nextHeritierId++}-${Date.now()}`
}

export const LIBELLE_LIEN: Record<LienHeritier, string> = {
  enfant:       'Enfant',
  epoux_pacs:   'Époux / PACS (exonéré)',
  parent:       'Parent (ascendant)',
  petit_enfant: 'Petit-enfant',
  frere_soeur:  'Frère ou sœur',
  neveu_niece:  'Neveu ou nièce',
  autre_4e:     'Autre parent (jusqu\'au 4e degré)',
  non_parent:   'Non parent ou au-delà du 4e degré',
}

// ─────────────────────────────────────────────────────────────
// Module calculateur (cf. ADR-0001)
// ─────────────────────────────────────────────────────────────

export const moduleSuccession: CalculatorModule<SuccessionInputs, SuccessionResults> = {
  slug: 'succession',
  nom: 'Succession - Droits par héritier',
  sources: SOURCES_SUCCESSION,
  faqSchema: FAQ_SUCCESSION,
  howToSchema: HOWTO_SUCCESSION,
  formatContexteChat: (inputs, results) => {
    const lignes = [
      'CONTEXTE SUCCESSION :',
      ligne('Actif net', eur(inputs.actifNetSuccessoral)),
      ligne('Nombre d\'héritiers', String(inputs.heritiers.length)),
      ligne('Total droits', eur(results.totalDroits)),
      ligne('Total net reçu', eur(results.totalNetRecu)),
      '',
      'Détail par héritier :',
      ...results.detailHeritiers.map(h =>
        `  - ${h.nom} (${LIBELLE_LIEN[h.lien]}) : part ${eur(h.partRecue)}, droits ${eur(h.droits)}, net ${eur(h.netRecu)}${h.exonereLoiTEPA ? ' [exonéré TEPA]' : ''}`
      ),
    ]
    return lignes.join('\n')
  },
}
