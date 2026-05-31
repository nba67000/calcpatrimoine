import { describe, it, expect } from 'vitest'
import { calculerPlusValueLmnp } from './plusValueLmnp'
import type { PlusValueLmnpInputs } from '@/types/plusValueLmnp'

function defaults(over: Partial<PlusValueLmnpInputs> = {}): PlusValueLmnpInputs {
  return {
    dateAcquisition: '2018-05-02',
    prixAcquisition: 200000,
    fraisAcquisition: 'forfait',
    fraisAcquisitionReels: 0,
    travaux: 'aucun',
    travauxReels: 0,
    dateCession: '2026-05-02',
    prixCession: 320000,
    typeBien: 'autre',
    premiereCession: false,
    amortissementsLmnpCumules: 0,
    ...over,
  }
}

describe('calculerPlusValueLmnp', () => {
  it('sans amortissements : surcoût = 0', () => {
    const r = calculerPlusValueLmnp(defaults())
    expect(r.surcoutLmnp).toBe(0)
    expect(r.resultatStandard.totalImpots).toBe(r.resultatLmnp.totalImpots)
  })

  it('avec amortissements 30k : surcoût > 0', () => {
    const r = calculerPlusValueLmnp(defaults({ amortissementsLmnpCumules: 30000 }))
    expect(r.surcoutLmnp).toBeGreaterThan(0)
    expect(r.resultatLmnp.pvBrute).toBeGreaterThan(r.resultatStandard.pvBrute)
  })

  it('amortissements 50k → prix acquisition fiscal réduit à 150k (PV +50k +3 750 forfait)', () => {
    const r = calculerPlusValueLmnp(defaults({ amortissementsLmnpCumules: 50000 }))
    // PV brute LMNP - standard = 50 000 (amortissements) + 7,5 % × 50 000 (réduction du forfait frais) = 53 750
    expect(r.resultatLmnp.pvBrute - r.resultatStandard.pvBrute).toBe(53750)
  })

  it('warning si amortissements > 0', () => {
    const r = calculerPlusValueLmnp(defaults({ amortissementsLmnpCumules: 30000 }))
    expect(r.warnings.some(w => w.message.includes('retirés'))).toBe(true)
  })

  it('amortissements 0 : warning info "saisir vos amortissements"', () => {
    const r = calculerPlusValueLmnp(defaults())
    expect(r.warnings.some(w => w.type === 'info')).toBe(true)
  })

  it('amortissements > prix achat → prix acquisition clampé à 0', () => {
    const r = calculerPlusValueLmnp(defaults({ amortissementsLmnpCumules: 250000 }))
    expect(r.resultatLmnp.pvBrute).toBeGreaterThan(0)
  })
})
