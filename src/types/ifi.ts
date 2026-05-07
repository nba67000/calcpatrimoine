// src/types/ifi.ts

import type { Warning, Optimisation } from '@/types/alerts'

export interface IFIInputs {
  valeurBruteImmobilier: number       // Valeur vénale brute totale des biens immobiliers
  incluResidencePrincipale: boolean   // La valeur saisie inclut-elle la résidence principale ?
  valeurResidencePrincipale: number   // Valeur brute de la RP (abattement 30 % appliqué)
  dettesDeductibles: number           // Capital restant dû sur emprunts liés aux biens taxables

  // Plafonnement optionnel (Art. 979 CGI)
  appliquerPlafonnement: boolean
  revenusAnnuels: number              // Revenus imposables de l'année N
  irAnnuel: number                    // IR effectivement dû pour l'année N
}

export interface TrancheIFI {
  de: number
  a: number | null    // null = tranche sans plafond supérieur
  taux: number        // En %
  baseImposable: number
  impot: number
}

export interface IFIResults {
  // Assiette
  abattementResidencePrincipale: number
  patrimoineNetTaxable: number
  assujetti: boolean          // Patrimoine net ≥ 1 300 000 €

  // Barème (Art. 977 CGI)
  tranches: TrancheIFI[]
  ifiBrut: number

  // Décote progressive pour 1 300 000 € ≤ patrimoine < 1 400 000 €
  decoteProgressive: number

  // IFI net avant plafonnement
  ifiNet: number

  // Plafonnement (Art. 979 CGI)
  seuilPlafonnement: number           // 75 % des revenus
  plafonnementApplicable: boolean
  ifiApresPlafonnement: number        // IFI définitif si plafonnement activé

  // Taux effectif global
  tauxEffectif: number                // ifiNet / patrimoineNetTaxable × 100

  warnings: Warning[]
  optimisations: Optimisation[]
}
