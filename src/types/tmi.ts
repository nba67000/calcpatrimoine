// src/types/tmi.ts

export type SituationFamiliale = 'celibataire' | 'marie-pacse' | 'parent-isole'

export interface TMIInputs {
  revenuNetImposable: number
  situationFamiliale: SituationFamiliale
  nombreEnfants: number // enfants à charge fiscalement (0 à 8)
}

export interface TrancheDetail {
  taux: number // en % (0, 11, 30, 41, 45)
  borneInf: number // borne inférieure de la tranche (revenu total)
  borneSup: number | null // null = dernière tranche
  revenuDansLaTranche: number // montant du revenu dans cette tranche
  impotDansLaTranche: number // impôt généré par cette tranche
}

export interface TMIResults {
  // Quotient familial
  nombreParts: number
  revenuParPart: number

  // Plafonnement QF
  irAvecQF: number // IR calculé avec le quotient familial complet
  irSansQF: number // IR calculé avec les parts de base (sans enfants)
  reductionQFBrute: number // irSansQF - irAvecQF
  reductionQFPlafond: number // plafond légal applicable
  reductionQFAppliquee: number // min(reductionQFBrute, plafond)
  plafonnementActif: boolean

  // Résultats principaux
  irBrut: number // après plafonnement QF, avant décote
  decoteApplicable: number
  irNet: number // après décote

  // Indicateurs clés
  tmi: 0 | 11 | 30 | 41 | 45
  tauxMoyen: number // en %

  // Détail par tranche (sur le revenu total)
  detailTranches: TrancheDetail[]

  warnings: Array<{ type: 'danger' | 'warning' | 'info'; message: string }>
  optimisations: Array<{ type: 'success' | 'info'; message: string; gain?: number }>
}
