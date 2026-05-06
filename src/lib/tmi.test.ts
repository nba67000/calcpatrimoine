import { describe, it, expect } from 'vitest'
import { calculerTMIResult } from './tmi'

// ---------------------------------------------------------------------------
// Cas nominaux (sources : barème LF 2026, Art. 197 CGI)
// ---------------------------------------------------------------------------
describe('calculerTMIResult — cas nominaux', () => {
  it('célibataire 30 000 € — TMI 30 %, IR 2 104 €, taux 7,0 %', () => {
    const r = calculerTMIResult({ revenuNetImposable: 30000, situationFamiliale: 'celibataire', nombreEnfants: 0 })
    expect(r.tmi).toBe(30)
    expect(r.irNet).toBe(2104)
    expect(r.tauxMoyen).toBe(7.0)
  })

  it('marié 2 enfants 60 000 € — TMI 11 %, IR 2 543 €, taux 4,2 %', () => {
    const r = calculerTMIResult({ revenuNetImposable: 60000, situationFamiliale: 'marie-pacse', nombreEnfants: 2 })
    expect(r.tmi).toBe(11)
    expect(r.irNet).toBe(2543)
    expect(r.tauxMoyen).toBe(4.2)
  })

  it('célibataire 1 enfant 50 000 € — plafonnement QF actif, IR 6 297 €', () => {
    const r = calculerTMIResult({ revenuNetImposable: 50000, situationFamiliale: 'celibataire', nombreEnfants: 1 })
    expect(r.irNet).toBe(6297)
    expect(r.plafonnementActif).toBe(true)
  })
})

// ---------------------------------------------------------------------------
// Décote (Art. 197-I-4 CGI)
// ---------------------------------------------------------------------------
describe('calculerTMIResult — décote', () => {
  it("décote célibataire : revenu faible efface en partie l'IR brut", () => {
    const r = calculerTMIResult({ revenuNetImposable: 20000, situationFamiliale: 'celibataire', nombreEnfants: 0 })
    expect(r.decoteApplicable).toBeGreaterThan(0)
    expect(r.irNet).toBeLessThan(r.irBrut)
  })

  it('revenu nul — IR 0 €, TMI 0 %', () => {
    const r = calculerTMIResult({ revenuNetImposable: 0, situationFamiliale: 'celibataire', nombreEnfants: 0 })
    expect(r.irNet).toBe(0)
    expect(r.tmi).toBe(0)
    expect(r.tauxMoyen).toBe(0)
  })
})

// ---------------------------------------------------------------------------
// Quotient familial
// ---------------------------------------------------------------------------
describe('calculerTMIResult — quotient familial', () => {
  it('marié sans enfant : 2 parts de base', () => {
    const r = calculerTMIResult({ revenuNetImposable: 60000, situationFamiliale: 'marie-pacse', nombreEnfants: 0 })
    expect(r.nombreParts).toBe(2)
  })

  it('parent isolé 1 enfant : 1 (base) + 0,5 (enfant) + 0,5 (case T) = 2 parts', () => {
    const r = calculerTMIResult({ revenuNetImposable: 40000, situationFamiliale: 'parent-isole', nombreEnfants: 1 })
    expect(r.nombreParts).toBe(2)
  })

  it('célibataire 3 enfants : 1 + 0,5 + 0,5 + 1 = 3 parts', () => {
    const r = calculerTMIResult({ revenuNetImposable: 50000, situationFamiliale: 'celibataire', nombreEnfants: 3 })
    expect(r.nombreParts).toBe(3)
  })
})

// ---------------------------------------------------------------------------
// Warnings
// ---------------------------------------------------------------------------
describe('calculerTMIResult — warnings', () => {
  it('plafonnement actif → warning dans la liste', () => {
    const r = calculerTMIResult({ revenuNetImposable: 50000, situationFamiliale: 'celibataire', nombreEnfants: 1 })
    expect(r.warnings.some(w => w.type === 'warning')).toBe(true)
  })

  it('TMI >= 30 → suggestion PER dans optimisations', () => {
    const r = calculerTMIResult({ revenuNetImposable: 50000, situationFamiliale: 'celibataire', nombreEnfants: 0 })
    expect(r.optimisations.length).toBeGreaterThan(0)
  })
})
