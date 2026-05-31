// src/types/pretIntrafamilial.ts

export type LienEmprunteur = 'enfant' | 'petit_enfant' | 'frere_soeur' | 'autre'

export interface PretIntrafamilialInputs {
  /** Montant prêté en €. */
  montantPret: number
  /** Durée du prêt en années. */
  dureeAnnees: number
  /** Taux d'intérêt annuel en % (0 = prêt sans intérêt). */
  tauxInteret: number
  /** Âge du prêteur au moment du prêt. */
  agePreteur: number
  /** Espérance de vie résiduelle du prêteur (en années). */
  esperanceVie: number
  /** Lien de parenté de l'emprunteur avec le prêteur. */
  lienEmprunteur: LienEmprunteur
  /** Donations antérieures du prêteur à l'emprunteur < 15 ans. */
  donationsAnterieures: number
}

export interface PretIntrafamilialResults {
  // Intérêts (côté prêteur, imposables)
  interetsAnnuels: number
  interetsCumulesPretDuree: number
  interetsImposablesPreteur: boolean
  /** Si le prêteur décède avant le terme du prêt : capital non remboursé inclus dans la succession. */
  capitalNonRembourseDecesEstime: number
  /** Droits de succession sur la créance restante côté emprunteur. */
  droitsSuccessionCreance: number

  // Comparaison vs donation directe
  abattementDisponible: number
  baseTaxableDonation: number
  droitsDonationEquivalente: number

  // Synthèse
  optionAvantageuse: 'pret' | 'donation'
  ecart: number
  warnings: Array<{ type: 'danger' | 'warning' | 'info'; message: string }>
  optimisations: Array<{ type: 'success' | 'info'; message: string }>
}
