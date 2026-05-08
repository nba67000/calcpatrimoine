import { describe, it, expect } from 'vitest'
import { calculerPER } from './per'

// ---------------------------------------------------------------------------
// Cas nominaux issus du JSDoc (source : Art. 163 quatervicies CGI, PASS 2025)
// ---------------------------------------------------------------------------
describe('calculerPER - cas nominaux', () => {
  it('salarié 60 000 €, TMI 30 %, versement 3 000 € - économie 900 €, coût net 2 100 €', () => {
    const r = calculerPER({
      salaireNetAnnuel: 60000, tmi: 30, versementEnvisage: 3000,
      plafondsReportesN1: 0, plafondsReportesN2: 0, plafondsReportesN3: 0,
      plafondsReportesN4: 0, plafondsReportesN5: 0,
    })
    expect(r.economieFiscale).toBe(900)
    expect(r.coutNetReel).toBe(2100)
    expect(r.detail.plafondAnnuel).toBe(5400)
    expect(r.detail.partNonDeductible).toBe(0)
  })

  it('salarié 50 000 €, TMI 30 %, versement 5 000 € (dépassement) - plafond minimum 4 710 €', () => {
    const r = calculerPER({
      salaireNetAnnuel: 50000, tmi: 30, versementEnvisage: 5000,
      plafondsReportesN1: 0, plafondsReportesN2: 0, plafondsReportesN3: 0,
      plafondsReportesN4: 0, plafondsReportesN5: 0,
    })
    expect(r.detail.plafondAnnuel).toBe(4710)
    expect(r.economieFiscale).toBe(1413)
    expect(r.detail.partNonDeductible).toBe(290)
  })

  it('salarié 50 000 €, TMI 41 %, versement 10 000 €, report N-1 = 3 000 € - économie 3 161 €', () => {
    const r = calculerPER({
      salaireNetAnnuel: 50000, tmi: 41, versementEnvisage: 10000,
      plafondsReportesN1: 3000, plafondsReportesN2: 0, plafondsReportesN3: 0,
      plafondsReportesN4: 0, plafondsReportesN5: 0,
    })
    expect(r.detail.plafondTotal).toBe(7710)
    expect(r.economieFiscale).toBe(3161)
    expect(r.coutNetReel).toBe(6839)
  })
})

// ---------------------------------------------------------------------------
// Cas limites
// ---------------------------------------------------------------------------
describe('calculerPER - cas limites', () => {
  it('TMI 0 % - économie nulle', () => {
    const r = calculerPER({
      salaireNetAnnuel: 30000, tmi: 0, versementEnvisage: 2000,
      plafondsReportesN1: 0, plafondsReportesN2: 0, plafondsReportesN3: 0,
      plafondsReportesN4: 0, plafondsReportesN5: 0,
    })
    expect(r.economieFiscale).toBe(0)
    expect(r.coutNetReel).toBe(2000)
  })

  it('versement 0 € - rendement fiscal 0 %', () => {
    const r = calculerPER({
      salaireNetAnnuel: 60000, tmi: 30, versementEnvisage: 0,
      plafondsReportesN1: 0, plafondsReportesN2: 0, plafondsReportesN3: 0,
      plafondsReportesN4: 0, plafondsReportesN5: 0,
    })
    expect(r.rendementFiscal).toBe(0)
    expect(r.economieFiscale).toBe(0)
  })

  it('salaire élevé - plafond plafonné au maximum légal (37 680 €)', () => {
    const r = calculerPER({
      salaireNetAnnuel: 500000, tmi: 45, versementEnvisage: 40000,
      plafondsReportesN1: 0, plafondsReportesN2: 0, plafondsReportesN3: 0,
      plafondsReportesN4: 0, plafondsReportesN5: 0,
    })
    expect(r.detail.plafondAnnuel).toBe(37680)
  })
})

// ---------------------------------------------------------------------------
// Warnings
// ---------------------------------------------------------------------------
describe('calculerPER - warnings', () => {
  it("warning info systématique sur le report d'imposition", () => {
    const r = calculerPER({
      salaireNetAnnuel: 60000, tmi: 30, versementEnvisage: 3000,
      plafondsReportesN1: 0, plafondsReportesN2: 0, plafondsReportesN3: 0,
      plafondsReportesN4: 0, plafondsReportesN5: 0,
    })
    expect(r.warnings.some(w => w.type === 'info')).toBe(true)
  })

  it('dépassement du plafond → warning danger', () => {
    const r = calculerPER({
      salaireNetAnnuel: 50000, tmi: 30, versementEnvisage: 5000,
      plafondsReportesN1: 0, plafondsReportesN2: 0, plafondsReportesN3: 0,
      plafondsReportesN4: 0, plafondsReportesN5: 0,
    })
    expect(r.warnings.some(w => w.type === 'danger')).toBe(true)
  })
})
