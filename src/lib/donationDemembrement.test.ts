import { describe, it, expect } from 'vitest'
import { calculerDonationDemembrement } from './donationDemembrement'
import type { DonationDemembrementInputs } from '@/types/donationDemembrement'

function defaults(over: Partial<DonationDemembrementInputs> = {}): DonationDemembrementInputs {
  return {
    valeurBienPleinePropriete: 500000,
    ageUsufruitier: 65,
    lienDonataire: 'enfant',
    donationsAnterieures: 0,
    ...over,
  }
}

describe('calculerDonationDemembrement', () => {
  it('barème Art. 669 : 65 ans → 60 % nue-propriété, 40 % usufruit', () => {
    const r = calculerDonationDemembrement(defaults())
    expect(r.tauxNuePropriete).toBe(60)
    expect(r.tauxUsufruit).toBe(40)
    expect(r.valeurNueProprietetransmise).toBe(300000)
  })

  it('barème 669 : 25 ans → 20 %, 80 ans → 70 %, 95 ans → 90 %', () => {
    expect(calculerDonationDemembrement(defaults({ ageUsufruitier: 25 })).tauxNuePropriete).toBe(20)
    expect(calculerDonationDemembrement(defaults({ ageUsufruitier: 80 })).tauxNuePropriete).toBe(70)
    expect(calculerDonationDemembrement(defaults({ ageUsufruitier: 95 })).tauxNuePropriete).toBe(90)
  })

  it('donation 500k à enfant, 65 ans → base 200k → droits ≈ 38 194 €', () => {
    const r = calculerDonationDemembrement(defaults())
    expect(r.abattementDisponible).toBe(100000)
    expect(r.baseTaxable).toBe(200000)
    // 5%×8072 + 10%×4037 + 15%×3823 + 20%×184068 = 403,6+403,7+573,45+36813,6 = 38 194
    expect(r.droitsDemembrement).toBe(38194)
  })

  it('comparaison pleine propriété : 500k → base 400k → droits ≈ 78 194 €', () => {
    const r = calculerDonationDemembrement(defaults())
    expect(r.droitsPleinePropriete).toBe(78194)
    expect(r.economieRealisee).toBe(40000)
  })

  it('rappel 15 ans : 80k donations antérieures → abattement résiduel 20k', () => {
    const r = calculerDonationDemembrement(defaults({ donationsAnterieures: 80000 }))
    expect(r.abattementDisponible).toBe(20000)
    expect(r.baseTaxable).toBe(280000)
  })

  it('warning âge > 75 ans', () => {
    const r = calculerDonationDemembrement(defaults({ ageUsufruitier: 80 }))
    expect(r.warnings.some(w => w.type === 'warning')).toBe(true)
  })

  it('optimisation : économie vs pleine propriété affichée', () => {
    const r = calculerDonationDemembrement(defaults())
    expect(r.optimisations.some(o => o.message.includes('économiser'))).toBe(true)
  })
})
