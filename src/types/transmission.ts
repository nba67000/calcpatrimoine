// src/types/transmission.ts

export interface Beneficiaire {
  id: string
  nom: string // Optionnel, juste pour affichage
  lien: 'conjoint' | 'enfant' | 'frere_soeur' | 'neveu_niece' | 'autre'
  partPourcentage: number // Part en % du capital
}

export interface TransmissionInputs {
  capitalTotal: number
  versementsAvant70: number
  versementsApres70: number
  dateOuverture: Date
  ageSouscripteur: number
  beneficiaires: Beneficiaire[]
}

export interface RepartitionBeneficiaire {
  id: string
  nom: string
  lien: string
  part: number // Montant en €
  partPourcentage: number
  
  // Calculs 990 I (versements avant 70 ans)
  capital990I: number // Part allouée versements avant 70 ans
  abattement990I: number // 152 500€ par bénéficiaire
  baseTaxable990I: number
  impot990I: number // 20% ou 31,25%
  
  // Calculs 757 B (versements après 70 ans)
  capital757B: number // Part allouée versements après 70 ans
  abattement757B: number // 30 500€ GLOBAL partagé
  baseTaxable757B: number
  droitsSuccession757B: number // Selon barème
  
  // Totaux
  totalImpots: number
  montantNet: number
  tauxEffectif: number // % d'imposition sur sa part
}

export interface TransmissionResults {
  // Inputs rappel
  capitalTotal: number
  nombreBeneficiaires: number
  
  // Répartition versements
  totalVersementsAvant70: number
  totalVersementsApres70: number
  plusValueTotale: number
  
  // Abattements globaux
  abattementTotal990I: number // 152 500€ × nombre bénéficiaires
  abattement757BGlobal: number // 30 500€ (fixe)
  
  // Par bénéficiaire
  repartition: RepartitionBeneficiaire[]
  
  // Totaux
  totalImpots: number
  totalNet: number
  tauxEffectifGlobal: number
  
  // Comparaison avec succession classique
  impotsSuccessionClassique: number // Si AV n'avait pas existé
  economieVsClassique: number
  
  // Warnings / infos
  warnings: string[]
  infos: string[]
}

// Barème succession 2026 - Droits en ligne directe (enfants)
export const BAREME_LIGNE_DIRECTE = [
  { min: 0, max: 8072, taux: 0.05 },
  { min: 8072, max: 12109, taux: 0.10 },
  { min: 12109, max: 15932, taux: 0.15 },
  { min: 15932, max: 552324, taux: 0.20 },
  { min: 552324, max: 902838, taux: 0.30 },
  { min: 902838, max: 1805677, taux: 0.40 },
  { min: 1805677, max: Infinity, taux: 0.45 }
]

// Abattement succession ligne directe (enfants)
export const ABATTEMENT_SUCCESSION_ENFANT = 100000 // 2026

// Abattement AV versements après 70 ans (Article 757 B)
export const ABATTEMENT_757B_GLOBAL = 30500

// Abattement AV versements avant 70 ans (Article 990 I)
export const ABATTEMENT_990I_PAR_BENEFICIAIRE = 152500

// Taux 990 I
export const TAUX_990I_REDUIT = 0.20  // Jusqu'à 700 000€ au-delà abattement
export const TAUX_990I_NORMAL = 0.3125 // Au-delà 700 000€
export const SEUIL_990I = 700000 // Seuil changement de taux
