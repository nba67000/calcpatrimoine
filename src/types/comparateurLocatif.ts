// src/types/comparateurLocatif.ts

export type RegimeLocatif = 'micro_foncier' | 'reel_nu'
export type VehiculePlacement = 'pea' | 'assurance_vie' | 'cto'

export interface ComparateurLocatifInputs {
  capitalInitial: number
  dureeAnnees: number
  tmi: 0 | 11 | 30 | 41 | 45

  // Locatif
  rendementLocatifBrut: number     // % de loyers annuels / capital
  valorisationAnnuelle: number     // % par an
  fraisChargesPct: number          // % du loyer brut (frais, taxes, vacances)
  regimeLocatif: RegimeLocatif

  // Placement
  rendementPlacementBrut: number   // % annuel
  vehiculePlacement: VehiculePlacement
}

export interface ComparateurLocatifResults {
  // Locatif
  loyersCumulesNets: number
  capitalRevente: number
  pvImmoNette: number  // net après IR + PS
  totalNetLocatif: number

  // Placement
  capitalFinalBrut: number
  impotSortiePlacement: number
  totalNetPlacement: number

  // Synthèse
  optionAvantageuse: 'locatif' | 'placement'
  ecart: number
  rendementAnnuelAvantageux: number   // taux annuel composé en %

  warnings: Array<{ type: 'danger' | 'warning' | 'info'; message: string }>
  optimisations: Array<{ type: 'success' | 'info'; message: string }>
}
