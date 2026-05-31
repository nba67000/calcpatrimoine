// src/types/sciRegime.ts

export interface SciRegimeInputs {
  loyersAnnuels: number
  chargesDeductibles: number     // entretien, copropriété, taxes
  interetsEmprunt: number
  amortissementsAnnuels: number  // pour l'IS seulement (linéaire)
  tmiAssocies: 0 | 11 | 30 | 41 | 45
  dureeProjet: number             // en années (pour cumul)
}

export interface SciRegimeResults {
  // SCI à l'IR (transparence fiscale, revenus fonciers)
  revenuFoncier: number          // loyers - charges - intérêts (peut être négatif = déficit)
  irAnnuel: number
  psAnnuel: number
  totalAnnuelIr: number
  cumulSurDureeIr: number

  // SCI à l'IS
  beneficeImposableIs: number    // loyers - charges - intérêts - amortissements
  isAnnuel: number               // 15% jusqu'à 42 500 €, 25% au-delà
  totalAnnuelIs: number          // IS + PS sur dividendes éventuels (simplification : on suppose tout réinvesti)
  cumulSurDureeIs: number

  // Synthèse
  regimeAvantageux: 'ir' | 'is'
  ecart: number

  warnings: Array<{ type: 'danger' | 'warning' | 'info'; message: string }>
  optimisations: Array<{ type: 'success' | 'info'; message: string }>
}
