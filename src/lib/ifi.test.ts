import { describe, it, expect } from 'vitest'
import { calculerIFI } from './ifi'
import type { IFIInputs } from '@/types/ifi'

function base(overrides: Partial<IFIInputs> = {}): IFIInputs {
  return {
    valeurBruteImmobilier: 2_000_000,
    incluResidencePrincipale: false,
    valeurResidencePrincipale: 0,
    dettesDeductibles: 0,
    appliquerPlafonnement: false,
    revenusAnnuels: 0,
    irAnnuel: 0,
    ...overrides,
  }
}

// ---------------------------------------------------------------------------
// Seuil d'assujettissement
// ---------------------------------------------------------------------------
describe('calculerIFI — seuil', () => {
  it('patrimoine < 1 300 000 € → non assujetti, IFI = 0', () => {
    const r = calculerIFI(base({ valeurBruteImmobilier: 1_200_000 }))
    expect(r.assujetti).toBe(false)
    expect(r.ifiNet).toBe(0)
  })

  it('patrimoine = 1 300 000 € → assujetti', () => {
    const r = calculerIFI(base({ valeurBruteImmobilier: 1_300_000 }))
    expect(r.assujetti).toBe(true)
    expect(r.ifiNet).toBeGreaterThan(0)
  })
})

// ---------------------------------------------------------------------------
// Cas nominaux — issus de l'application directe du barème Art. 977 CGI
// ---------------------------------------------------------------------------
describe('calculerIFI — barème nominaux', () => {
  it('Exemple 1 — patrimoine 2 000 000 € → IFI brut = 7 400 €, IFI net = 7 400 €', () => {
    // Tranche 2: 500 000 × 0,5% = 2 500 €
    // Tranche 3: 700 000 × 0,7% = 4 900 €
    const r = calculerIFI(base({ valeurBruteImmobilier: 2_000_000 }))
    expect(r.patrimoineNetTaxable).toBe(2_000_000)
    expect(r.ifiBrut).toBe(7_400)
    expect(r.decoteProgressive).toBe(0)
    expect(r.ifiNet).toBe(7_400)
  })

  it('Exemple 3 — patrimoine 5 000 000 € → IFI brut = 35 690 €', () => {
    // Tranche 2: 500 000 × 0,5% = 2 500 €
    // Tranche 3: 1 270 000 × 0,7% = 8 890 €
    // Tranche 4: 2 430 000 × 1% = 24 300 €
    const r = calculerIFI(base({ valeurBruteImmobilier: 5_000_000 }))
    expect(r.ifiBrut).toBe(35_690)
    expect(r.ifiNet).toBe(35_690)
  })

  it('patrimoine 10 000 000 € → IFI brut = 98 190 €', () => {
    // Tranche 2: 2 500
    // Tranche 3: 8 890
    // Tranche 4: 24 300
    // Tranche 5: (10 000 000 - 5 000 000) × 1,25% = 62 500
    // Total = 98 190 €
    // ... wait let me recalculate
    // Tranche 4: (5 000 000 - 2 570 000) × 1% = 24 300
    // Tranche 5: (10 000 000 - 5 000 000) × 1,25% = 62 500
    // Total = 2500 + 8890 + 24300 + 62500 = 98 190
    const r = calculerIFI(base({ valeurBruteImmobilier: 10_000_000 }))
    expect(r.ifiBrut).toBe(98_190)
    expect(r.ifiNet).toBe(98_190)
  })
})

// ---------------------------------------------------------------------------
// Décote progressive
// ---------------------------------------------------------------------------
describe('calculerIFI — décote progressive', () => {
  it('Exemple 2 — patrimoine 1 350 000 € → ifiBrut = 2 850, décote = 625, ifiNet = 2 225', () => {
    // Tranche 2: 500 000 × 0,5% = 2 500
    // Tranche 3: 50 000 × 0,7% = 350
    // ifiBrut = 2 850
    // décote = 17 500 - 1,25% × 1 350 000 = 625
    const r = calculerIFI(base({ valeurBruteImmobilier: 1_350_000 }))
    expect(r.ifiBrut).toBe(2_850)
    expect(r.decoteProgressive).toBe(625)
    expect(r.ifiNet).toBe(2_225)
  })

  it('patrimoine = 1 300 000 € → décote max = 1 250 €', () => {
    // décote = 17 500 - 1,25% × 1 300 000 = 1 250
    const r = calculerIFI(base({ valeurBruteImmobilier: 1_300_000 }))
    expect(r.decoteProgressive).toBe(1_250)
    expect(r.ifiBrut).toBe(2_500)
    expect(r.ifiNet).toBe(1_250)
  })

  it('patrimoine = 1 400 000 € → décote = 0', () => {
    // décote = 17 500 - 1,25% × 1 400 000 = 0
    const r = calculerIFI(base({ valeurBruteImmobilier: 1_400_000 }))
    expect(r.decoteProgressive).toBe(0)
  })
})

// ---------------------------------------------------------------------------
// Abattement résidence principale (Art. 973 CGI)
// ---------------------------------------------------------------------------
describe('calculerIFI — abattement résidence principale', () => {
  it('RP valeur 1 000 000 € → abattement 300 000 €', () => {
    const r = calculerIFI(base({
      valeurBruteImmobilier: 2_000_000,
      incluResidencePrincipale: true,
      valeurResidencePrincipale: 1_000_000,
    }))
    expect(r.abattementResidencePrincipale).toBe(300_000)
    expect(r.patrimoineNetTaxable).toBe(1_700_000)
  })

  it('sans RP cochée → abattement = 0 même si valeur renseignée', () => {
    const r = calculerIFI(base({
      valeurBruteImmobilier: 2_000_000,
      incluResidencePrincipale: false,
      valeurResidencePrincipale: 500_000,
    }))
    expect(r.abattementResidencePrincipale).toBe(0)
    expect(r.patrimoineNetTaxable).toBe(2_000_000)
  })
})

// ---------------------------------------------------------------------------
// Dettes déductibles
// ---------------------------------------------------------------------------
describe('calculerIFI — dettes déductibles', () => {
  it('dettes 400 000 € → patrimoine réduit de 400 000 €', () => {
    const r = calculerIFI(base({
      valeurBruteImmobilier: 2_000_000,
      dettesDeductibles: 400_000,
    }))
    expect(r.patrimoineNetTaxable).toBe(1_600_000)
  })

  it('dettes > patrimoine → patrimoine net = 0, non assujetti', () => {
    const r = calculerIFI(base({
      valeurBruteImmobilier: 1_000_000,
      dettesDeductibles: 1_500_000,
    }))
    expect(r.patrimoineNetTaxable).toBe(0)
    expect(r.assujetti).toBe(false)
  })
})

// ---------------------------------------------------------------------------
// Plafonnement (Art. 979 CGI)
// ---------------------------------------------------------------------------
describe('calculerIFI — plafonnement', () => {
  it('IFI + IR > 75% revenus → plafonnement applicable', () => {
    // Patrimoine 3 000 000 € → IFI ≈ 15 690 €
    // IR = 40 000 €, revenus = 60 000 € → seuil = 45 000 €
    // 15 690 + 40 000 = 55 690 > 45 000 → plafonnement
    const r = calculerIFI(base({
      valeurBruteImmobilier: 3_000_000,
      appliquerPlafonnement: true,
      revenusAnnuels: 60_000,
      irAnnuel: 40_000,
    }))
    expect(r.plafonnementApplicable).toBe(true)
    expect(r.seuilPlafonnement).toBe(45_000)
    expect(r.ifiApresPlafonnement).toBe(5_000)  // 45 000 - 40 000
  })

  it('IFI + IR ≤ 75% revenus → pas de plafonnement', () => {
    const r = calculerIFI(base({
      valeurBruteImmobilier: 2_000_000,
      appliquerPlafonnement: true,
      revenusAnnuels: 200_000,
      irAnnuel: 30_000,
    }))
    expect(r.plafonnementApplicable).toBe(false)
    expect(r.ifiApresPlafonnement).toBe(r.ifiNet)
  })
})

// ---------------------------------------------------------------------------
// Immutabilité et edge cases
// ---------------------------------------------------------------------------
describe('calculerIFI — edge cases', () => {
  it('patrimoine 0 € → non assujetti', () => {
    const r = calculerIFI(base({ valeurBruteImmobilier: 0 }))
    expect(r.assujetti).toBe(false)
    expect(r.ifiNet).toBe(0)
  })

  it('tranches renseignées correctement pour patrimoine 2 000 000 €', () => {
    const r = calculerIFI(base({ valeurBruteImmobilier: 2_000_000 }))
    // On attend 3 tranches (0%, 0.5%, 0.7%)
    expect(r.tranches).toHaveLength(3)
    expect(r.tranches[0].taux).toBe(0)
    expect(r.tranches[1].taux).toBeCloseTo(0.5, 5)
    expect(r.tranches[2].taux).toBeCloseTo(0.7, 5)
    expect(r.tranches[2].baseImposable).toBe(700_000)
  })
})
