// src/types/donationDemembrement.ts

import type { LienParente } from '@/types/donation'

export interface DonationDemembrementInputs {
  /** Valeur de marché du bien transmis (pleine propriété). */
  valeurBienPleinePropriete: number
  /** Âge de l'usufruitier au moment de la donation (= âge donateur). */
  ageUsufruitier: number
  /** Lien du nu-propriétaire (donataire) avec le donateur. */
  lienDonataire: LienParente
  /** Donations antérieures du donateur au donataire < 15 ans. */
  donationsAnterieures: number
}

export interface DonationDemembrementResults {
  // Application du barème Art. 669
  tauxUsufruit: number       // en %
  tauxNuePropriete: number   // en %
  valeurUsufruit: number
  valeurNueProprietetransmise: number

  // Donation de la nue-propriété
  abattementDisponible: number
  baseTaxable: number
  droitsDemembrement: number

  // Comparaison vs pleine propriété
  baseTaxablePleinePropriete: number
  droitsPleinePropriete: number
  economieRealisee: number

  warnings: Array<{ type: 'danger' | 'warning' | 'info'; message: string }>
  optimisations: Array<{ type: 'success' | 'info'; message: string }>
}
