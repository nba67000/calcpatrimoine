import { describe, it, expect } from 'vitest'
import { formatContexteChat, type ContexteChat } from './chatContext'
import { calculerTMIResult } from './tmi'
import { calculerPER } from './per'
import { calculateSimpleAnnuity } from './mortality'
import { calculerFiscaliteRachat } from './assuranceVie'
import { calculerTransmission } from './transmission'
import { calculerPlusValueImmobiliere } from './plusValueImmobiliere'

// ---------------------------------------------------------------------------
// Build one valid ContexteChat per discriminant using real calculator functions
// ---------------------------------------------------------------------------

const TMI_CASE: ContexteChat = {
  calculateur: 'tmi',
  inputs: { revenuNetImposable: 45000, situationFamiliale: 'celibataire', nombreEnfants: 0 },
  results: calculerTMIResult({ revenuNetImposable: 45000, situationFamiliale: 'celibataire', nombreEnfants: 0 }),
}

const PER_CASE: ContexteChat = {
  calculateur: 'per-individuel',
  inputs: {
    salaireNetAnnuel: 60000, tmi: 30, versementEnvisage: 3000,
    plafondsReportesN1: 0, plafondsReportesN2: 0, plafondsReportesN3: 0,
    plafondsReportesN4: 0, plafondsReportesN5: 0,
  },
  results: calculerPER({
    salaireNetAnnuel: 60000, tmi: 30, versementEnvisage: 3000,
    plafondsReportesN1: 0, plafondsReportesN2: 0, plafondsReportesN3: 0,
    plafondsReportesN4: 0, plafondsReportesN5: 0,
  }),
}

const renteResult = calculateSimpleAnnuity(100000, 65)!
const RENTE_CASE: ContexteChat = {
  calculateur: 'rente-viagere',
  inputs: { capital: 100000, age: 65 },
  results: renteResult,
}

const AV_CASE: ContexteChat = {
  calculateur: 'assurance-vie/fiscalite-rachat',
  inputs: {
    capitalTotal: 100000, versementTotal: 80000,
    dateOuverture: new Date('2015-01-01'), montantRachat: 20000,
    versementAvant2017: 0, tmi: 30, enCouple: false,
    encoursTotalContrats: 100000,
  },
  results: calculerFiscaliteRachat({
    capitalTotal: 100000, versementTotal: 80000,
    dateOuverture: new Date('2015-01-01'), montantRachat: 20000,
    versementAvant2017: 0, tmi: 30, enCouple: false,
    encoursTotalContrats: 100000,
  }),
}

const transmissionInputs = {
  capitalTotal: 200000, versementsAvant70: 150000, versementsApres70: 20000,
  dateOuverture: new Date('2010-01-01'), ageSouscripteur: 72,
  beneficiaires: [{ id: '1', nom: 'Enfant 1', lien: 'enfant' as const, partPourcentage: 100 }],
}
const TRANSMISSION_CASE: ContexteChat = {
  calculateur: 'assurance-vie/transmission',
  inputs: transmissionInputs,
  results: calculerTransmission(transmissionInputs),
}

const pvInputs = {
  dateAcquisition: '2018-01-01', prixAcquisition: 200000,
  fraisAcquisition: 'forfait' as const, fraisAcquisitionReels: 0,
  travaux: 'aucun' as const, travauxReels: 0,
  dateCession: '2026-01-01', prixCession: 295000,
  typeBien: 'autre' as const, premiereCession: false,
}
const PV_CASE: ContexteChat = {
  calculateur: 'plus-value-immobiliere',
  inputs: pvInputs,
  results: calculerPlusValueImmobiliere(pvInputs),
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

const ALL_CASES: Array<[string, ContexteChat]> = [
  ['tmi', TMI_CASE],
  ['per-individuel', PER_CASE],
  ['rente-viagere', RENTE_CASE],
  ['assurance-vie/fiscalite-rachat', AV_CASE],
  ['assurance-vie/transmission', TRANSMISSION_CASE],
  ['plus-value-immobiliere', PV_CASE],
]

describe('formatContexteChat', () => {
  ALL_CASES.forEach(([slug, cas]) => {
    it(`retourne une chaîne non vide pour "${slug}"`, () => {
      const result = formatContexteChat(cas)
      expect(typeof result).toBe('string')
      expect(result.length).toBeGreaterThan(20)
    })
  })

  it('couvre toutes les branches de ContexteChat (exhaustivité)', () => {
    const slugs = ALL_CASES.map(([slug]) => slug).sort()
    expect(slugs).toEqual([
      'assurance-vie/fiscalite-rachat',
      'assurance-vie/transmission',
      'per-individuel',
      'plus-value-immobiliere',
      'rente-viagere',
      'tmi',
    ])
  })
})
