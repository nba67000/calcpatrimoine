// src/types/plusValueLmnp.ts

import type { PlusValueImmobiliereInputs, PlusValueImmobiliereResults } from './plusValueImmobiliere'

export interface PlusValueLmnpInputs extends PlusValueImmobiliereInputs {
  /** Amortissements LMNP cumulés et déduits des revenus locatifs depuis l'achat. */
  amortissementsLmnpCumules: number
}

export interface PlusValueLmnpResults {
  /** Résultat standard (sans réintégration LMNP). */
  resultatStandard: PlusValueImmobiliereResults
  /** Résultat avec réintégration des amortissements LMNP au prix d'acquisition. */
  resultatLmnp: PlusValueImmobiliereResults
  /** Surcoût d'impôt dû à la réintégration des amortissements. */
  surcoutLmnp: number
  warnings: Array<{ type: 'danger' | 'warning' | 'info'; message: string }>
  optimisations: Array<{ type: 'success' | 'info'; message: string }>
}
