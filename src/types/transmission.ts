// src/types/transmission.ts

import type { Warning, Optimisation } from '@/types/alerts'

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
 lien: Beneficiaire['lien']
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
 warnings: Warning[]
 infos: Optimisation[]
}

