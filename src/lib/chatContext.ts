// src/lib/chatContext.ts
// Formateurs de contexte calculateur → texte lisible pour le système prompt du chatbot.
// Chaque calculateur exporte son propre formateur dans son lib - centralisé ici pour dispatch.

import type { TMIInputs, TMIResults } from '@/types/tmi'
import type { PERInputs, PERResults } from '@/types/per'
import type { AssuranceVieInputs, AssuranceVieResults } from '@/types/assuranceVie'
import type { TransmissionInputs, TransmissionResults } from '@/types/transmission'
import type { PlusValueImmobiliereInputs, PlusValueImmobiliereResults } from '@/types/plusValueImmobiliere'
import type { IFIInputs, IFIResults } from '@/types/ifi'
import type { DonationInputs, DonationResults } from '@/types/donation'
import type { CalculatorInput, AnnuityResult } from '@/types'
import { formatContexteTMI } from '@/lib/tmi'
import { formatContextePER } from '@/lib/per'
import { formatContexteRente } from '@/lib/mortality'
import { formatContexteAVRachat } from '@/lib/assuranceVie'
import { formatContexteTransmission } from '@/lib/transmission'
import { formatContextePlusValue } from '@/lib/plusValueImmobiliere'
import { formatContexteIFI } from '@/lib/ifi'
import { formatContexteDonation } from '@/lib/donation'

// ---------------------------------------------------------------------------
// Type discriminant
// ---------------------------------------------------------------------------

export type ContexteChat =
  | { calculateur: 'tmi'; inputs: TMIInputs; results: TMIResults }
  | { calculateur: 'per-individuel'; inputs: PERInputs; results: PERResults }
  | { calculateur: 'rente-viagere'; inputs: CalculatorInput; results: AnnuityResult }
  | { calculateur: 'assurance-vie/fiscalite-rachat'; inputs: AssuranceVieInputs; results: AssuranceVieResults }
  | { calculateur: 'assurance-vie/transmission'; inputs: TransmissionInputs; results: TransmissionResults }
  | { calculateur: 'plus-value-immobiliere'; inputs: PlusValueImmobiliereInputs; results: PlusValueImmobiliereResults }
  | { calculateur: 'ifi'; inputs: IFIInputs; results: IFIResults }
  | { calculateur: 'donation-droits'; inputs: DonationInputs; results: DonationResults }

// ---------------------------------------------------------------------------
// Point d'entrée unique - TypeScript vérifie l'exhaustivité via le type de retour
// ---------------------------------------------------------------------------

export function formatContexteChat(contexte: ContexteChat): string {
  switch (contexte.calculateur) {
    case 'tmi':
      return formatContexteTMI(contexte.inputs, contexte.results)
    case 'per-individuel':
      return formatContextePER(contexte.inputs, contexte.results)
    case 'rente-viagere':
      return formatContexteRente(contexte.inputs, contexte.results)
    case 'assurance-vie/fiscalite-rachat':
      return formatContexteAVRachat(contexte.inputs, contexte.results)
    case 'assurance-vie/transmission':
      return formatContexteTransmission(contexte.inputs, contexte.results)
    case 'plus-value-immobiliere':
      return formatContextePlusValue(contexte.inputs, contexte.results)
    case 'ifi':
      return formatContexteIFI(contexte.inputs, contexte.results)
    case 'donation-droits':
      return formatContexteDonation(contexte.inputs, contexte.results)
  }
}
