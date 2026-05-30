// src/types/donation.ts

import type { Warning, Optimisation } from '@/types/alerts'

/**
 * Lien de parenté entre donateur et donataire.
 * Détermine l'abattement personnel (Art. 779 / 790 E CGI) et le barème
 * applicable (Art. 777 CGI, tableaux I à IV).
 */
export type LienParente =
  | 'enfant'        // ligne directe descendante (Art. 777-I, abattement 100 000 €)
  | 'parent'        // ligne directe ascendante (Art. 777-I, abattement 100 000 €)
  | 'petit_enfant'  // descendant 2e degré (Art. 777-I + abattement spécifique 1 594 € résiduel)
  | 'epoux_pacs'    // conjoint ou partenaire PACS (Art. 777-II + Art. 790 E)
  | 'frere_soeur'   // fratrie (Art. 777-III, abattement 15 932 €)
  | 'neveu_niece'   // (Art. 777-IV, abattement 7 967 €, taux 55 %)
  | 'autre_4e'      // autres parents jusqu'au 4e degré (Art. 777-IV, taux 55 %)
  | 'non_parent'    // au-delà du 4e degré ou sans lien (Art. 777-IV, taux 60 %)

export interface DonationInputs {
  /** Valeur de la donation transmise en pleine propriété (en €). */
  montantDonation: number
  /** Lien de parenté entre donateur et donataire. */
  lien: LienParente
  /** Le donataire est-il en situation de handicap (Art. 779-II) ? */
  donataireHandicape: boolean
  /** Don familial de sommes d'argent (Art. 790 G CGI). */
  donFamilial790G: boolean
  /** Âge du donateur (utile pour la condition < 80 ans du don 790 G). */
  ageDonateur: number
  /** Donataire majeur ou mineur émancipé (condition du don 790 G). */
  donataireMajeur: boolean
  /** Donations antérieures consenties depuis moins de 15 ans (Art. 784). */
  donationsAnterieures15Ans: number
}

/**
 * Détail d'une tranche du barème art. 777 CGI appliquée au calcul.
 */
export interface TrancheDonation {
  /** Taux de la tranche en %. */
  taux: number
  /** Borne inférieure de la tranche (base taxable cumulée). */
  borneInf: number
  /** Borne supérieure (null pour la dernière tranche). */
  borneSup: number | null
  /** Fraction de la base imposable dans cette tranche. */
  baseDansLaTranche: number
  /** Droits dus pour cette tranche. */
  droitsDansLaTranche: number
}

export interface DonationResults {
  // ───── Données rappelées
  montantDonation: number
  lien: LienParente

  // ───── Abattements (Art. 779 / 790 E / 790 G CGI)
  /** Abattement personnel théorique (avant prise en compte du rappel 15 ans). */
  abattementPersonnelTheorique: number
  /** Abattement personnel réellement appliqué (après déduction des donations antérieures). */
  abattementPersonnelApplique: number
  /** Abattement handicap appliqué (Art. 779-II, cumulable). */
  abattementHandicap: number
  /** Abattement 790 G appliqué (don familial de sommes d'argent). */
  abattement790G: number
  /** Total des abattements effectivement utilisés. */
  abattementTotal: number

  // ───── Base imposable et droits
  baseTaxable: number
  droitsBruts: number

  /** Détail tranche par tranche pour affichage. */
  detailTranches: TrancheDonation[]

  // ───── Indicateurs
  /** Montant net effectivement transmis au donataire (donation - droits). */
  montantNet: number
  /** Taux effectif d'imposition sur la donation (%). */
  tauxEffectif: number
  /** Coût des droits pour 100 € transmis (€ pour 100 €). */
  coutPour100Transmis: number

  // ───── Comparaisons pédagogiques
  /** Droits qui auraient été dus sans abattement (à barème équivalent). */
  droitsSansAbattement: number
  /** Économie liée aux abattements appliqués (€). */
  economieAbattements: number

  // ───── Diagnostic
  /** Le rappel 15 ans réduit-il l'abattement disponible ? */
  rappel15AnsActif: boolean
  /** Le don 790 G a-t-il été refusé pour cause de conditions non remplies ? */
  donFamilial790GRefuse: boolean
  /** Motif éventuel du refus du don 790 G (ou chaîne vide). */
  motifRefus790G: string

  warnings: Warning[]
  optimisations: Optimisation[]
}
