// src/lib/plusValueLmnp.ts
//
// Extension du calculateur /plus-value-immobiliere pour le cas LMNP : depuis
// le 15/02/2025, les amortissements déduits des revenus locatifs LMNP doivent
// être réintégrés au prix d'acquisition pour le calcul de la plus-value
// imposable (Art. 150 VB III CGI modifié par LF 2025).
//
// Approche : wrapper autour de calculerPlusValueImmobiliere , la
// réintégration des amortissements = soustraction au prix d'acquisition fiscal.

import { calculerPlusValueImmobiliere } from './plusValueImmobiliere'
import type {
  PlusValueLmnpInputs,
  PlusValueLmnpResults,
} from '@/types/plusValueLmnp'
import type { CalculatorModule, HowToSchema } from '@/lib/calculators/types'
import type { FAQSchemaItem } from '@/components/SchemaFAQ'
import { formatEurRounded as eur, formatLigne as ligne } from '@/lib/formatters'

export const SOURCES_PV_LMNP = [
  { label: 'Article 150 VB III du CGI', desc: 'Réintégration des amortissements LMNP au prix d\'acquisition (modifié par LF 2025, applicable depuis le 15/02/2025)' },
  { label: 'Article 150 U du CGI', desc: 'Champ d\'application des plus-values immobilières des particuliers' },
  { label: 'Article 150 VC du CGI', desc: 'Abattements pour durée de détention (IR)' },
  { label: 'Article L136-7 CSS (VI 2)', desc: 'Abattements pour durée de détention (PS)' },
  { label: 'Article 1609 nonies G du CGI', desc: 'Surtaxe sur plus-values > 50 000 €' },
]

/**
 * Calcule la plus-value immobilière d'un bien LMNP en réintégrant les
 * amortissements déduits des revenus locatifs au prix d'acquisition.
 *
 * Mécaniquement : nouveau prix d'acquisition = prix d'acquisition initial −
 * amortissements cumulés. La plus-value brute augmente d'autant, et donc
 * l'impôt.
 *
 * @example
 * // Bien acquis 200 000 € en 2018, amortissements LMNP cumulés 30 000 €,
 * // revendu 320 000 € en 2026. Sans LMNP : PV brute = 75 000 €.
 * // Avec LMNP : PV brute = 75 000 + 30 000 = 105 000 € (impôt +).
 */
export function calculerPlusValueLmnp(inputs: PlusValueLmnpInputs): PlusValueLmnpResults {
  const warnings: PlusValueLmnpResults['warnings'] = []
  const optimisations: PlusValueLmnpResults['optimisations'] = []

  // Standard : pas de réintégration
  const standardInputs = { ...inputs }
  delete (standardInputs as Record<string, unknown>).amortissementsLmnpCumules
  const resultatStandard = calculerPlusValueImmobiliere(standardInputs)

  // LMNP : prix d'acquisition réduit du montant des amortissements
  const lmnpInputs = {
    ...standardInputs,
    prixAcquisition: Math.max(0, inputs.prixAcquisition - inputs.amortissementsLmnpCumules),
  }
  const resultatLmnp = calculerPlusValueImmobiliere(lmnpInputs)

  const surcoutLmnp = Math.max(0, resultatLmnp.totalImpots - resultatStandard.totalImpots)

  if (inputs.amortissementsLmnpCumules > 0) {
    warnings.push({
      type: 'warning',
      message: `Depuis le 15 février 2025, les amortissements que vous avez déduits chaque année de vos loyers (${eur(inputs.amortissementsLmnpCumules)} cumulés) sont retirés de votre prix d'achat fiscal au moment de la vente. Concrètement, votre prix d'achat fiscal n'est plus le prix payé mais ce prix moins les amortissements : votre plus-value imposable augmente d'autant. Surcoût d'impôt estimé : ${eur(surcoutLmnp)}.`,
    })
  }

  if (inputs.amortissementsLmnpCumules === 0) {
    warnings.push({
      type: 'info',
      message: `Aucun amortissement LMNP saisi : le calcul est identique au calculateur /plus-value-immobiliere standard. Saisir vos amortissements cumulés depuis l'achat pour voir le surcoût LMNP.`,
    })
  }

  if (resultatLmnp.warnings) {
    warnings.push(...resultatLmnp.warnings)
  }
  if (resultatLmnp.optimisations) {
    optimisations.push(...resultatLmnp.optimisations.map(o => ({ ...o, gain: undefined })))
  }

  return {
    resultatStandard,
    resultatLmnp,
    surcoutLmnp,
    warnings,
    optimisations,
  }
}

// ─────────────────────────────────────────────────────────────
// Schémas SEO
// ─────────────────────────────────────────────────────────────

const FAQ_PV_LMNP: FAQSchemaItem[] = [
  {
    question: "Pourquoi les amortissements LMNP augmentent-ils la plus-value ?",
    answer: "Depuis le 15/02/2025 (LF 2025), les amortissements déduits des revenus locatifs LMNP sont réintégrés au prix d'acquisition lors du calcul de la plus-value. Concrètement, le prix d'acquisition fiscal est réduit du montant des amortissements cumulés, ce qui augmente la plus-value brute imposable.",
  },
  {
    question: "Cette règle s'applique-t-elle aux ventes antérieures à 2025 ?",
    answer: "Non. La règle est entrée en vigueur le 15/02/2025 et s'applique aux cessions réalisées à partir de cette date. Les ventes antérieures suivent l'ancienne règle (pas de réintégration).",
  },
  {
    question: "Le LMP (loueur en meublé professionnel) est-il concerné ?",
    answer: "Non. Le LMP relève d'un régime fiscal différent (BIC professionnel, plus-values pro). Ce calculateur traite uniquement le LMNP (non-professionnel), qui relève des plus-values des particuliers (Art. 150 U et s. CGI).",
  },
]

const HOWTO_PV_LMNP: HowToSchema = {
  name: "Calculer une plus-value LMNP avec réintégration des amortissements",
  description: "Estimer le surcoût d'impôt LMNP par rapport à un bien non-meublé.",
  totalTime: "PT3M",
  steps: [
    { name: "Saisir les données du bien", text: "Prix d'achat, frais, travaux, dates, prix de vente." },
    { name: "Indiquer les amortissements cumulés", text: "Total des amortissements LMNP déduits depuis l'acquisition." },
    { name: "Lire le surcoût", text: "Comparaison standard vs LMNP : surcoût d'impôt dû à la réintégration." },
  ],
}

// ─────────────────────────────────────────────────────────────
// Module
// ─────────────────────────────────────────────────────────────

export const modulePlusValueLmnp: CalculatorModule<PlusValueLmnpInputs, PlusValueLmnpResults> = {
  slug: 'plus-value-immobiliere/lmnp',
  nom: 'Plus-value immobilière LMNP (réintégration amortissements)',
  sources: SOURCES_PV_LMNP,
  faqSchema: FAQ_PV_LMNP,
  howToSchema: HOWTO_PV_LMNP,
  formatContexteChat: (inputs, results) =>
    [
      'CONTEXTE PLUS-VALUE LMNP :',
      ligne('Prix acquisition', eur(inputs.prixAcquisition)),
      ligne('Prix cession', eur(inputs.prixCession)),
      ligne('Amortissements LMNP', eur(inputs.amortissementsLmnpCumules)),
      '',
      ligne('Impôt standard', eur(results.resultatStandard.totalImpots)),
      ligne('Impôt LMNP', eur(results.resultatLmnp.totalImpots)),
      ligne('Surcoût LMNP', eur(results.surcoutLmnp)),
    ].join('\n'),
}
