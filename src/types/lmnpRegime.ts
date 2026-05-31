// src/types/lmnpRegime.ts

export type TypeMeuble = 'classique' | 'touristique_classe' | 'touristique_non_classe'

export interface LmnpRegimeInputs {
  loyersAnnuels: number
  chargesReelles: number             // entretien, taxes, copropriété, intérêts d'emprunt
  amortissementsAnnuels: number      // bien + meuble (linéaire)
  tmi: 0 | 11 | 30 | 41 | 45
  typeMeuble: TypeMeuble
}

export interface LmnpRegimeResults {
  // Micro-BIC
  abattementMicroPct: number          // 50, 71 ou 30 selon type
  seuilMicro: number                  // 77 700, 188 700 ou 15 000
  beneficeImposableMicro: number
  irMicro: number
  psMicro: number
  totalImpotMicro: number
  microApplicable: boolean            // loyers < seuil

  // Réel
  beneficeImposableReel: number       // peut être négatif (déficit reportable)
  irReel: number
  psReel: number
  totalImpotReel: number

  // Synthèse
  regimeAvantageux: 'micro' | 'reel'
  economie: number

  warnings: Array<{ type: 'danger' | 'warning' | 'info'; message: string }>
  optimisations: Array<{ type: 'success' | 'info'; message: string }>
}
