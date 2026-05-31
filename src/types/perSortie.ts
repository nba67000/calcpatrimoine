// src/types/perSortie.ts

export type ModeSortie = 'capital' | 'rente' | 'mixte'

export interface PerSortieInputs {
  /** Capital total accumulé sur le PER au moment de la liquidation. */
  capitalAccumule: number
  /** Fraction du capital qui vient des versements déductibles (en %, le reste = plus-values). */
  fractionVersementsDeductibles: number
  /** TMI à la retraite (0, 11, 30, 41, 45). */
  tmiRetraite: 0 | 11 | 30 | 41 | 45
  /** Âge au moment de la liquidation. */
  ageRetraite: number
  /** Espérance de vie résiduelle estimée (en années). */
  esperanceVie: number
  /** Taux de rente annuel sur le capital (en %, ex. 4 %). */
  tauxRenteAnnuel: number
  /** Mode de sortie choisi. */
  mode: ModeSortie
  /** Si mode = 'mixte' : % du capital sorti en capital (le reste va en rente). */
  partCapitalSiMixte: number
}

export interface PerSortieResults {
  // --- Sortie en capital ---
  versementsImposables: number
  impotVersements: number
  impotGains: number
  netCapital: number

  // --- Sortie en rente ---
  renteAnnuelleBrute: number
  renteAnnuelleNette: number
  netCumuleRente: number  // sur l'espérance de vie

  // --- Mode mixte ---
  netMixte: number

  // --- Synthèse ---
  optionAvantageuse: 'capital' | 'rente'
  ecart: number
  warnings: Array<{ type: 'danger' | 'warning' | 'info'; message: string }>
  optimisations: Array<{ type: 'success' | 'info'; message: string; gain?: number }>
}
