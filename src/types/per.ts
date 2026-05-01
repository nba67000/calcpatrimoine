// src/types/per.ts

export type TMIOption = 0 | 11 | 30 | 41 | 45

export interface PERInputs {
  salaireNetAnnuel: number    // salaire net annuel avant abattement frais pro
  tmi: TMIOption              // tranche marginale d'imposition
  versementEnvisage: number   // montant du versement PER envisagé
  plafondsReportesN1: number  // plafond non utilisé N-1 (figurant sur avis d'imposition)
  plafondsReportesN2: number  // plafond non utilisé N-2
  plafondsReportesN3: number  // plafond non utilisé N-3
}

export interface PERDetailPlafond {
  abattementFraisPro: number      // abattement 10% appliqué (entre min et max légaux)
  revenuNetProfessionnel: number  // base du calcul = salaire - abattement
  plafondAnnuel: number           // plafond de l'année (10% revenu net, borné min/max)
  plafondsReportesTotal: number   // somme des reports N-1 + N-2 + N-3
  plafondTotal: number            // plafond total disponible = annuel + reports
  montantDeductible: number       // min(versement, plafondTotal)
  partNonDeductible: number       // versement - montantDeductible (0 si pas de dépassement)
}

export interface PERResults {
  detail: PERDetailPlafond

  // Résultats principaux
  economieFiscale: number    // montantDeductible × TMI
  coutNetReel: number        // versementEnvisage - economieFiscale
  rendementFiscal: number    // economieFiscale / versementEnvisage × 100

  warnings: Array<{ type: 'danger' | 'warning' | 'info'; message: string }>
  optimisations: Array<{ type: 'success' | 'info'; message: string; gain?: number }>
}
