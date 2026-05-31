import { describe, it, expect } from 'vitest'
import { calculerCsgRetraite } from './csgRetraite'
import type { CsgRetraiteInputs } from '@/types/csgRetraite'

function defaults(over: Partial<CsgRetraiteInputs> = {}): CsgRetraiteInputs {
  return {
    pensionBruteAnnuelle: 24000,
    revenuFiscalReference: 18000,
    nombreParts: 1,
    ...over,
  }
}

describe('calculerCsgRetraite', () => {
  it('RFR 18 000 € / 1 part → taux médian (7,4 %)', () => {
    const r = calculerCsgRetraite(defaults())
    expect(r.tauxApplicable).toBe('median')
    expect(r.tauxTotalPct).toBeCloseTo(7.4)
    expect(r.prelevement).toBe(Math.round(24000 * 0.074))
    expect(r.pensionNette).toBe(24000 - r.prelevement)
  })

  it('RFR très faible → exonération totale', () => {
    const r = calculerCsgRetraite(defaults({ revenuFiscalReference: 10000 }))
    expect(r.tauxApplicable).toBe('exonere')
    expect(r.prelevement).toBe(0)
    expect(r.pensionNette).toBe(24000)
  })

  it('RFR 14 000 € / 1 part → taux réduit (4,3 %)', () => {
    const r = calculerCsgRetraite(defaults({ revenuFiscalReference: 14000 }))
    expect(r.tauxApplicable).toBe('reduit')
    expect(r.tauxTotalPct).toBeCloseTo(4.3)
  })

  it('RFR élevé → taux normal (9,1 %)', () => {
    const r = calculerCsgRetraite(defaults({ revenuFiscalReference: 35000 }))
    expect(r.tauxApplicable).toBe('normal')
    expect(r.tauxTotalPct).toBeCloseTo(9.1)
  })

  it('2 parts : seuils relevés → même RFR peut donner un taux plus bas', () => {
    const r1Part = calculerCsgRetraite(defaults({ revenuFiscalReference: 20000, nombreParts: 1 }))
    const r2Part = calculerCsgRetraite(defaults({ revenuFiscalReference: 20000, nombreParts: 2 }))
    // 1 part : 20000 > 15988 médian. 2 parts : seuils relevés → 20000 < 24526 → reduit.
    expect(r1Part.tauxApplicable).toBe('median')
    expect(r2Part.tauxApplicable).toBe('reduit')
  })

  it('seuils retournés cohérents avec nombre de parts', () => {
    const r1 = calculerCsgRetraite(defaults({ nombreParts: 1 }))
    const r2 = calculerCsgRetraite(defaults({ nombreParts: 2 }))
    expect(r2.seuilMedian).toBeGreaterThan(r1.seuilMedian)
  })

  it('optimisation exonération signalée', () => {
    const r = calculerCsgRetraite(defaults({ revenuFiscalReference: 10000 }))
    expect(r.optimisations.some(o => o.message.includes('exonération'))).toBe(true)
  })
})
