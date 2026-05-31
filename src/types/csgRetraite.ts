// src/types/csgRetraite.ts

export type TauxCsg = 'exonere' | 'reduit' | 'median' | 'normal'

export interface CsgRetraiteInputs {
  /** Pension de retraite brute annuelle. */
  pensionBruteAnnuelle: number
  /** Revenu fiscal de référence (RFR) de l'année N-2 (= RFR 2024 pour CSG 2026). */
  revenuFiscalReference: number
  /** Nombre de parts fiscales. */
  nombreParts: number
}

export interface CsgRetraiteResults {
  tauxApplicable: TauxCsg
  tauxTotalPct: number   // CSG + CRDS + CASA (selon taux)
  prelevement: number
  pensionNette: number
  seuilExoneration: number   // RFR seuil pour 0 %
  seuilReduit: number        // RFR seuil pour 3,8 %
  seuilMedian: number        // RFR seuil pour 6,6 %
  warnings: Array<{ type: 'danger' | 'warning' | 'info'; message: string }>
  optimisations: Array<{ type: 'success' | 'info'; message: string }>
}
