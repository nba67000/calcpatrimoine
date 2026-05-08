import { describe, it, expect } from 'vitest'
import {
  calculateSimpleAnnuity,
  calculateReversionAnnuity,
  calculateRequiredCapital,
  calculateCoupleStrategies,
} from './mortality'

// ---------------------------------------------------------------------------
// calculateSimpleAnnuity - rente simple unisexe
// ---------------------------------------------------------------------------
describe('calculateSimpleAnnuity', () => {
  it('retourne un résultat non-null pour un âge valide (65 ans)', () => {
    const r = calculateSimpleAnnuity(100000, 65)
    expect(r).not.toBeNull()
  })

  it('rente mensuelle cohérente : 100 000 € à 65 ans → 200–600 €/mois', () => {
    const r = calculateSimpleAnnuity(100000, 65)
    expect(r!.monthly_amount).toBeGreaterThan(200)
    expect(r!.monthly_amount).toBeLessThan(600)
  })

  it("rente annuelle = rente mensuelle × 12 (à l'arrondi près)", () => {
    const r = calculateSimpleAnnuity(100000, 65)
    expect(r!.annual_amount).toBeCloseTo(r!.monthly_amount * 12, -1)
  })

  it('rente plus élevée pour un rentier plus âgé (espérance de vie plus courte)', () => {
    const r70 = calculateSimpleAnnuity(100000, 70)
    const r65 = calculateSimpleAnnuity(100000, 65)
    expect(r70!.monthly_amount).toBeGreaterThan(r65!.monthly_amount)
  })

  it('rente proportionnelle au capital : double capital = double rente', () => {
    const r1 = calculateSimpleAnnuity(100000, 65)
    const r2 = calculateSimpleAnnuity(200000, 65)
    expect(r2!.monthly_amount).toBeCloseTo(r1!.monthly_amount * 2, 0)
  })

  it('retourne null pour un âge hors table (150 ans)', () => {
    const r = calculateSimpleAnnuity(100000, 150)
    expect(r).toBeNull()
  })

  it('facteur de rente positif', () => {
    const r = calculateSimpleAnnuity(100000, 65)
    expect(r!.annuity_factor).toBeGreaterThan(0)
  })

  it('seuil de rentabilité = capital / rente annuelle', () => {
    const r = calculateSimpleAnnuity(100000, 65)
    const expected = 100000 / r!.annual_amount
    expect(r!.roi_years).toBeCloseTo(expected, 0)
  })
})

// ---------------------------------------------------------------------------
// calculateReversionAnnuity - rente avec réversion
// ---------------------------------------------------------------------------
describe('calculateReversionAnnuity', () => {
  it('retourne un résultat non-null pour des âges valides', () => {
    const r = calculateReversionAnnuity(100000, 65, 63, 60)
    expect(r).not.toBeNull()
  })

  it('rente avec réversion < rente simple (facteur plus grand = rente plus faible)', () => {
    const simple = calculateSimpleAnnuity(100000, 65)
    const reversion = calculateReversionAnnuity(100000, 65, 63, 60)
    expect(reversion!.monthly_amount).toBeLessThan(simple!.monthly_amount)
  })

  it('réversion 100% < réversion 60% (facteur encore plus grand)', () => {
    const r60 = calculateReversionAnnuity(100000, 65, 63, 60)
    const r100 = calculateReversionAnnuity(100000, 65, 63, 100)
    expect(r100!.monthly_amount).toBeLessThan(r60!.monthly_amount)
  })

  it('rente réversionnaire = rente principale × taux réversion', () => {
    const r = calculateReversionAnnuity(100000, 65, 63, 80)
    const expectedReversionary = r!.monthly_amount * 0.8
    expect(r!.with_reversion!.spouse_monthly_amount).toBeCloseTo(expectedReversionary, 0)
  })

  it('with_reversion est présent dans le résultat', () => {
    const r = calculateReversionAnnuity(100000, 65, 63, 60)
    expect(r!.with_reversion).toBeDefined()
    expect(r!.with_reversion!.spouse_monthly_amount).toBeGreaterThan(0)
  })
})

// ---------------------------------------------------------------------------
// calculateRequiredCapital - calculateur inverse
// ---------------------------------------------------------------------------
describe('calculateRequiredCapital', () => {
  it("retourne un résultat non-null pour des paramètres valides", () => {
    const r = calculateRequiredCapital(500, 65)
    expect(r).not.toBeNull()
  })

  it('capital requis > 0 pour une rente > 0', () => {
    const r = calculateRequiredCapital(500, 65)
    expect(r!.required_capital).toBeGreaterThan(0)
  })

  it('cohérence inverse : calculateSimpleAnnuity(capital) ≈ rente demandée', () => {
    const desiredMonthly = 500
    const inv = calculateRequiredCapital(desiredMonthly, 65)
    const check = calculateSimpleAnnuity(inv!.required_capital, 65)
    expect(check!.monthly_amount).toBeCloseTo(desiredMonthly, -1)
  })

  it('capital requis proportionnel à la rente (double rente = double capital)', () => {
    const r500 = calculateRequiredCapital(500, 65)
    const r1000 = calculateRequiredCapital(1000, 65)
    expect(r1000!.required_capital).toBeCloseTo(r500!.required_capital * 2, -2)
  })

  it('capital plus élevé requis pour un rentier plus jeune (espérance plus longue)', () => {
    const r55 = calculateRequiredCapital(500, 55)
    const r70 = calculateRequiredCapital(500, 70)
    expect(r55!.required_capital).toBeGreaterThan(r70!.required_capital)
  })
})

// ---------------------------------------------------------------------------
// calculateCoupleStrategies - comparaison des 7 stratégies
// ---------------------------------------------------------------------------
describe('calculateCoupleStrategies', () => {
  it('retourne au moins 5 stratégies pour un couple standard', () => {
    const strategies = calculateCoupleStrategies({ person1_age: 67, person2_age: 64, total_capital: 180000 })
    expect(strategies.length).toBeGreaterThanOrEqual(5)
  })

  it('toutes les stratégies ont un monthly_amount > 0', () => {
    const strategies = calculateCoupleStrategies({ person1_age: 65, person2_age: 63, total_capital: 100000 })
    strategies.forEach(s => {
      expect(s.monthly_amount).toBeGreaterThan(0)
    })
  })

  it('stratégie "Dernier décès" a la rente la plus faible (couverture la plus longue)', () => {
    const strategies = calculateCoupleStrategies({ person1_age: 65, person2_age: 63, total_capital: 100000 })
    const lastDecesStrategy = strategies.find(s => s.strategy === 'Dernier décès')
    const soloStrategies = strategies.filter(s => s.strategy.includes('seule'))
    if (lastDecesStrategy && soloStrategies.length > 0) {
      soloStrategies.forEach(s => {
        expect(lastDecesStrategy.monthly_amount).toBeLessThanOrEqual(s.monthly_amount)
      })
    }
  })

  it('retourne un tableau vide pour des âges hors table', () => {
    const strategies = calculateCoupleStrategies({ person1_age: 150, person2_age: 160, total_capital: 100000 })
    expect(strategies).toHaveLength(0)
  })
})
