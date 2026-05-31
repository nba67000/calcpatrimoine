// src/types/succession.ts

export type LienHeritier =
  | 'enfant'
  | 'epoux_pacs'
  | 'parent'
  | 'petit_enfant'
  | 'frere_soeur'
  | 'neveu_niece'
  | 'autre_4e'
  | 'non_parent'

export interface HeritierSuccession {
  id: string
  nom: string
  lien: LienHeritier
  /** Montant € reçu par cet héritier de l'actif successoral. */
  partRecue: number
  /** Donations reçues du défunt < 15 ans (rappel Art. 784 CGI). */
  donationsAnterieures: number
}

export interface SuccessionInputs {
  actifNetSuccessoral: number
  heritiers: HeritierSuccession[]
}

export interface TrancheSuccession {
  taux: number
  borneInf: number
  borneSup: number | null
  baseDansLaTranche: number
  droitsDansLaTranche: number
}

export interface DetailHeritier {
  id: string
  nom: string
  lien: LienHeritier
  partRecue: number
  abattementApplique: number
  baseTaxable: number
  droits: number
  netRecu: number
  /** Exonéré au titre de la Loi TEPA (Art. 796-0 bis CGI) : conjoint ou PACS. */
  exonereLoiTEPA: boolean
  detailTranches: TrancheSuccession[]
}

export interface SuccessionResults {
  totalDroits: number
  totalNetRecu: number
  detailHeritiers: DetailHeritier[]
  warnings: Array<{ type: 'danger' | 'warning' | 'info'; message: string }>
  optimisations: Array<{ type: 'success' | 'info'; message: string; gain?: number }>
}
