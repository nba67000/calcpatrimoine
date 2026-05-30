// src/lib/calculators/index.test.ts
//
// Test du **calculator registry** (ADR-0001).
//
// Garantit que :
//   1. Tous les slugs attendus sont enregistrés.
//   2. Chaque module produit un `formatContexteChat` non-trivial sur des
//      inputs/results valides issus de la lib correspondante.
//
// Remplace l'ancien `chatContext.test.ts` qui testait l'exhaustivité du
// switch supprimé.

import { describe, it, expect } from 'vitest'
import { getCalculator, listCalculatorSlugs } from './index'
import { calculerTMIResult } from '@/lib/tmi'
import { calculerPER } from '@/lib/per'
import { calculateSimpleAnnuity } from '@/lib/mortality'
import { calculerFiscaliteRachat } from '@/lib/assuranceVie'
import { calculerTransmission } from '@/lib/transmission'
import { calculerPlusValueImmobiliere } from '@/lib/plusValueImmobiliere'
import { calculerIFI } from '@/lib/ifi'
import { calculerDonation } from '@/lib/donation'
import type { PERInputs } from '@/types/per'
import type { AssuranceVieInputs } from '@/types/assuranceVie'
import type { IFIInputs } from '@/types/ifi'

describe('calculator registry — exhaustivité', () => {
  it('expose exactement les 8 calculateurs livrés', () => {
    expect(listCalculatorSlugs().sort()).toEqual([
      'assurance-vie/fiscalite-rachat',
      'assurance-vie/transmission',
      'donation/droits',
      'ifi',
      'per-individuel',
      'plus-value-immobiliere',
      'rente-viagere',
      'tmi',
    ])
  })

  it('getCalculator retourne undefined pour un slug inconnu', () => {
    expect(getCalculator('inexistant')).toBeUndefined()
  })
})

describe('calculator registry — formatContexteChat retourne une chaîne non vide', () => {
  it('tmi', () => {
    const inputs = { revenuNetImposable: 45000, situationFamiliale: 'celibataire' as const, nombreEnfants: 0 }
    const results = calculerTMIResult(inputs)
    const txt = getCalculator('tmi')!.formatContexteChat(inputs, results)
    expect(txt.length).toBeGreaterThan(20)
  })

  it('per-individuel', () => {
    const inputs: PERInputs = {
      salaireNetAnnuel: 60000, tmi: 30, versementEnvisage: 3000,
      plafondsReportesN1: 0, plafondsReportesN2: 0, plafondsReportesN3: 0,
      plafondsReportesN4: 0, plafondsReportesN5: 0,
    }
    const results = calculerPER(inputs)
    const txt = getCalculator('per-individuel')!.formatContexteChat(inputs, results)
    expect(txt.length).toBeGreaterThan(20)
  })

  it('rente-viagere', () => {
    const inputs = { capital: 100000, age: 65 }
    const results = calculateSimpleAnnuity(100000, 65)!
    const txt = getCalculator('rente-viagere')!.formatContexteChat(inputs, results)
    expect(txt.length).toBeGreaterThan(20)
  })

  it('assurance-vie/fiscalite-rachat', () => {
    const inputs: AssuranceVieInputs = {
      capitalTotal: 100000, versementTotal: 80000,
      dateOuverture: new Date('2015-01-01'), montantRachat: 20000,
      versementAvant2017: 0, tmi: 30, enCouple: false,
      encoursTotalContrats: 100000,
    }
    const results = calculerFiscaliteRachat(inputs)
    const txt = getCalculator('assurance-vie/fiscalite-rachat')!.formatContexteChat(inputs, results)
    expect(txt.length).toBeGreaterThan(20)
  })

  it('assurance-vie/transmission', () => {
    const inputs = {
      capitalTotal: 200000, versementsAvant70: 150000, versementsApres70: 20000,
      dateOuverture: new Date('2010-01-01'), ageSouscripteur: 72,
      beneficiaires: [{ id: '1', nom: 'Enfant 1', lien: 'enfant' as const, partPourcentage: 100 }],
    }
    const results = calculerTransmission(inputs)
    const txt = getCalculator('assurance-vie/transmission')!.formatContexteChat(inputs, results)
    expect(txt.length).toBeGreaterThan(20)
  })

  it('plus-value-immobiliere', () => {
    const inputs = {
      dateAcquisition: '2018-01-01', prixAcquisition: 200000,
      fraisAcquisition: 'forfait' as const, fraisAcquisitionReels: 0,
      travaux: 'aucun' as const, travauxReels: 0,
      dateCession: '2026-01-01', prixCession: 295000,
      typeBien: 'autre' as const, premiereCession: false,
    }
    const results = calculerPlusValueImmobiliere(inputs)
    const txt = getCalculator('plus-value-immobiliere')!.formatContexteChat(inputs, results)
    expect(txt.length).toBeGreaterThan(20)
  })

  it('ifi', () => {
    const inputs: IFIInputs = {
      valeurBruteImmobilier: 1500000,
      incluResidencePrincipale: true,
      valeurResidencePrincipale: 800000,
      dettesDeductibles: 100000,
      appliquerPlafonnement: false,
      revenusAnnuels: 0,
      irAnnuel: 0,
    }
    const results = calculerIFI(inputs)
    const txt = getCalculator('ifi')!.formatContexteChat(inputs, results)
    expect(txt.length).toBeGreaterThan(20)
  })

  it('donation/droits', () => {
    const inputs = {
      montantDonation: 200000, lien: 'enfant' as const,
      donataireHandicape: false, donFamilial790G: false,
      ageDonateur: 60, donataireMajeur: true,
      donationsAnterieures15Ans: 0,
    }
    const results = calculerDonation(inputs)
    const txt = getCalculator('donation/droits')!.formatContexteChat(inputs, results)
    expect(txt.length).toBeGreaterThan(20)
  })
})
