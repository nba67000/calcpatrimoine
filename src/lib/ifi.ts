// src/lib/ifi.ts

import type { IFIInputs, IFIResults, TrancheIFI } from '@/types/ifi'
import type { CalculatorModule } from '@/lib/calculators/types'
import { FAQ_IFI, HOWTO_IFI } from '@/lib/schema/schemaData'
import { formatEurRounded as eur, formatLigne as ligne } from '@/lib/formatters'

export const SOURCES_IFI = [
  { href: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000036472764', label: 'Article 964 du CGI', desc: "Champ d'application IFI - seuil d'assujettissement à 1 300 000 €" },
  { href: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000036473012', label: 'Article 977 du CGI', desc: "Barème IFI - 6 tranches de 0 % à 1,50 % ; décote progressive 1,3M–1,4M€" },
  { href: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000036472780', label: 'Article 973 du CGI', desc: "Abattement de 30 % sur la résidence principale ; passif déductible" },
  { href: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000036472786', label: 'Article 974 du CGI', desc: "Dettes déductibles - emprunts liés aux biens taxables, taxes foncières" },
  { href: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000036473018', label: 'Article 979 du CGI', desc: "Plafonnement : IFI + IR ≤ 75 % des revenus de l'année" },
]

// --- Constantes fiscales (Art. 977 CGI - LF 2018, inchangées au 01/01/2026) ---

const SEUIL_IFI = 1_300_000          // Art. 964 CGI
const SEUIL_DECOTE_HAUTE = 1_400_000
const DECOTE_CONSTANTE = 17_500      // Art. 977 CGI
const DECOTE_TAUX = 0.0125
const ABATTEMENT_RP = 0.30           // Art. 973 CGI
const TAUX_PLAFONNEMENT = 0.75       // Art. 979 CGI

const BAREME = [
  { de: 0,          a: 800_000,    taux: 0      },  // Art. 977 CGI
  { de: 800_000,    a: 1_300_000,  taux: 0.005  },
  { de: 1_300_000,  a: 2_570_000,  taux: 0.007  },
  { de: 2_570_000,  a: 5_000_000,  taux: 0.01   },
  { de: 5_000_000,  a: 10_000_000, taux: 0.0125 },
  { de: 10_000_000, a: Infinity,   taux: 0.015  },
] as const

/**
 * Applique le barème progressif IFI (Art. 977 CGI).
 * Retourne le détail par tranche et le total brut.
 */
function appliquerBareme(patrimoine: number): { tranches: TrancheIFI[]; total: number } {
  const tranches: TrancheIFI[] = []
  let total = 0

  for (const t of BAREME) {
    if (patrimoine <= t.de) break
    const baseImposable = Math.min(patrimoine, t.a) - t.de
    const impot = Math.round(baseImposable * t.taux)
    tranches.push({
      de: t.de,
      a: t.a === Infinity ? null : t.a,
      taux: t.taux * 100,
      baseImposable,
      impot,
    })
    total += impot
  }

  return { tranches, total }
}

/**
 * Calcule la décote progressive (Art. 977 CGI) pour patrimoine entre 1,3M€ et 1,4M€.
 * Formule : max(0, 17 500 € − 1,25 % × P).
 */
function calculerDecoteProgressive(patrimoine: number): number {
  if (patrimoine < SEUIL_IFI || patrimoine >= SEUIL_DECOTE_HAUTE) return 0
  return Math.max(0, Math.round(DECOTE_CONSTANTE - DECOTE_TAUX * patrimoine))
}

/**
 * Calcule l'IFI (Impôt sur la Fortune Immobilière) d'un foyer fiscal.
 *
 * Règles appliquées :
 * - Seuil 1 300 000 € (Art. 964 CGI)
 * - Abattement RP 30 % (Art. 973 CGI)
 * - Barème progressif 0 %→1,50 % (Art. 977 CGI)
 * - Décote progressive si patrimoine net ∈ [1 300 000 €, 1 400 000 [
 * - Plafonnement IFI + IR ≤ 75 % revenus (Art. 979 CGI, optionnel)
 *
 * @example
 * // Exemple 1 - Patrimoine 2 000 000 €, sans RP, sans dettes
 * const r = calculerIFI({
 *   valeurBruteImmobilier: 2000000,
 *   incluResidencePrincipale: false, valeurResidencePrincipale: 0,
 *   dettesDeductibles: 0,
 *   appliquerPlafonnement: false, revenusAnnuels: 0, irAnnuel: 0,
 * })
 * // r.patrimoineNetTaxable = 2 000 000, r.ifiBrut = 7400, r.ifiNet = 7400
 *
 * @example
 * // Exemple 2 - Patrimoine 1 350 000 € (décote progressive)
 * const r = calculerIFI({
 *   valeurBruteImmobilier: 1350000,
 *   incluResidencePrincipale: false, valeurResidencePrincipale: 0,
 *   dettesDeductibles: 0,
 *   appliquerPlafonnement: false, revenusAnnuels: 0, irAnnuel: 0,
 * })
 * // r.ifiBrut = 2850, r.decoteProgressive = 625, r.ifiNet = 2225
 *
 * @example
 * // Exemple 3 - Patrimoine 5 000 000 €
 * const r = calculerIFI({
 *   valeurBruteImmobilier: 5000000,
 *   incluResidencePrincipale: false, valeurResidencePrincipale: 0,
 *   dettesDeductibles: 0,
 *   appliquerPlafonnement: false, revenusAnnuels: 0, irAnnuel: 0,
 * })
 * // r.ifiBrut = 35690, r.ifiNet = 35690
 */
function evaluerAlertesIFI(p: {
  dettesDeductibles: number
  irAnnuel: number
  patrimoineNetTaxable: number
  decoteProgressive: number
  plafonnementApplicable: boolean
  ifiNet: number
  seuilPlafonnement: number
  ifiApresPlafonnement: number
}): { warnings: IFIResults['warnings']; optimisations: IFIResults['optimisations'] } {
  const warnings: IFIResults['warnings'] = []
  const optimisations: IFIResults['optimisations'] = []

  if (p.decoteProgressive > 0) {
    optimisations.push({
      type: 'info',
      message: `Décote progressive appliquée : −${p.decoteProgressive.toLocaleString('fr-FR')} €. Elle s'annule progressivement entre 1 300 000 € et 1 400 000 € de patrimoine net taxable.`,
      gain: p.decoteProgressive,
    })
  }

  if (p.dettesDeductibles === 0 && p.patrimoineNetTaxable >= SEUIL_IFI) {
    optimisations.push({
      type: 'info',
      message: `Si des emprunts immobiliers sont en cours sur les biens déclarés, le capital restant dû réduit le patrimoine taxable (Art. 974 CGI). Ajoutez ce montant dans le champ « Dettes déductibles » pour affiner le calcul.`,
    })
  }

  if (p.plafonnementApplicable) {
    warnings.push({
      type: 'info',
      message: `Plafonnement Art. 979 CGI : IFI (${p.ifiNet.toLocaleString('fr-FR')} €) + IR (${p.irAnnuel.toLocaleString('fr-FR')} €) dépasse 75 % des revenus (${p.seuilPlafonnement.toLocaleString('fr-FR')} €). L'IFI est plafonné à ${p.ifiApresPlafonnement.toLocaleString('fr-FR')} €.`,
    })
  }

  if (p.patrimoineNetTaxable >= SEUIL_IFI && p.patrimoineNetTaxable < SEUIL_IFI + 50_000) {
    warnings.push({
      type: 'warning',
      message: `Patrimoine net taxable très proche du seuil de 1 300 000 €. Une réévaluation des biens ou une dette déductible non saisie peut faire basculer le calcul de l'autre côté du seuil.`,
    })
  }

  return { warnings, optimisations }
}

export function calculerIFI(inputs: IFIInputs): IFIResults {
  // 1. Abattement résidence principale (Art. 973 CGI)
  const abattementRP = inputs.incluResidencePrincipale
    ? Math.round(inputs.valeurResidencePrincipale * ABATTEMENT_RP)
    : 0

  // 2. Patrimoine net taxable
  const patrimoineNetTaxable = Math.max(
    0,
    inputs.valeurBruteImmobilier - abattementRP - inputs.dettesDeductibles
  )

  // 3. Vérification du seuil (Art. 964 CGI)
  if (patrimoineNetTaxable < SEUIL_IFI) {
    const manque = SEUIL_IFI - patrimoineNetTaxable
    return {
      abattementResidencePrincipale: abattementRP,
      patrimoineNetTaxable,
      assujetti: false,
      tranches: [],
      ifiBrut: 0,
      decoteProgressive: 0,
      ifiNet: 0,
      seuilPlafonnement: 0,
      plafonnementApplicable: false,
      ifiApresPlafonnement: 0,
      tauxEffectif: 0,
      warnings: [{
        type: 'info',
        message: `Patrimoine net taxable (${patrimoineNetTaxable.toLocaleString('fr-FR')} €) inférieur au seuil IFI de 1 300 000 €. Aucun IFI n'est dû (marge : ${manque.toLocaleString('fr-FR')} €).`,
      }],
      optimisations: [],
    }
  }

  // 4. Barème progressif (Art. 977 CGI)
  const { tranches, total: ifiBrut } = appliquerBareme(patrimoineNetTaxable)

  // 5. Décote progressive
  const decoteProgressive = calculerDecoteProgressive(patrimoineNetTaxable)
  const ifiNet = Math.max(0, ifiBrut - decoteProgressive)

  // 6. Plafonnement IFI + IR (Art. 979 CGI)
  let ifiApresPlafonnement = ifiNet
  let plafonnementApplicable = false
  let seuilPlafonnement = 0

  if (inputs.appliquerPlafonnement && inputs.revenusAnnuels > 0) {
    seuilPlafonnement = Math.round(inputs.revenusAnnuels * TAUX_PLAFONNEMENT)
    const totalAvantPlaf = ifiNet + inputs.irAnnuel
    if (totalAvantPlaf > seuilPlafonnement) {
      plafonnementApplicable = true
      ifiApresPlafonnement = Math.max(0, seuilPlafonnement - inputs.irAnnuel)
    }
  }

  // 7. Taux effectif
  const ifiDefinitif = plafonnementApplicable ? ifiApresPlafonnement : ifiNet
  const tauxEffectif = patrimoineNetTaxable > 0
    ? (ifiDefinitif / patrimoineNetTaxable) * 100
    : 0

  // 8. Warnings et optimisations
  const { warnings, optimisations } = evaluerAlertesIFI({
    dettesDeductibles: inputs.dettesDeductibles,
    irAnnuel: inputs.irAnnuel,
    patrimoineNetTaxable,
    decoteProgressive,
    plafonnementApplicable,
    ifiNet,
    seuilPlafonnement,
    ifiApresPlafonnement,
  })

  return {
    abattementResidencePrincipale: abattementRP,
    patrimoineNetTaxable,
    assujetti: true,
    tranches,
    ifiBrut,
    decoteProgressive,
    ifiNet,
    seuilPlafonnement,
    plafonnementApplicable,
    ifiApresPlafonnement,
    tauxEffectif,
    warnings,
    optimisations,
  }
}

/** Formatte le contexte IFI pour le ChatWidget. */
export function formatContexteIFI(inputs: IFIInputs, r: IFIResults): string {
  const lines = [
    'Calculateur : IFI - Impôt sur la fortune immobilière',
    '',
    'Assiette',
    ligne('Valeur brute immobilier', eur(inputs.valeurBruteImmobilier)),
    ...(inputs.incluResidencePrincipale ? [
      ligne('Valeur résidence principale', eur(inputs.valeurResidencePrincipale)),
      ligne('Abattement RP 30 %', `−${eur(r.abattementResidencePrincipale)}`),
    ] : []),
    ...(inputs.dettesDeductibles > 0 ? [
      ligne('Dettes déductibles', `−${eur(inputs.dettesDeductibles)}`),
    ] : []),
    ligne('Patrimoine net taxable', eur(r.patrimoineNetTaxable)),
    '',
    'Résultats',
    ligne('Assujetti à l\'IFI', r.assujetti ? 'Oui' : 'Non (< 1 300 000 €)'),
  ]

  if (r.assujetti) {
    lines.push(
      ligne('IFI brut', eur(r.ifiBrut)),
      ...(r.decoteProgressive > 0 ? [ligne('Décote progressive', `−${eur(r.decoteProgressive)}`)] : []),
      ligne('IFI net', eur(r.ifiNet)),
    )
    if (r.plafonnementApplicable) {
      lines.push(ligne('IFI après plafonnement', eur(r.ifiApresPlafonnement)))
    }
    lines.push(ligne('Taux effectif', r.tauxEffectif.toFixed(3) + ' %'))
  }

  return lines.join('\n')
}

// Module calculateur unifié (cf. CONTEXT.md, ADR-0001)
export const moduleIfi: CalculatorModule<IFIInputs, IFIResults> = {
  slug: 'ifi',
  nom: 'IFI - Fortune immobilière',
  sources: SOURCES_IFI,
  faqSchema: FAQ_IFI,
  howToSchema: HOWTO_IFI,
  formatContexteChat: formatContexteIFI,
}
