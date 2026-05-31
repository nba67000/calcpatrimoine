import { describe, it, expect } from 'vitest'
import { calculerPretIntrafamilial } from './pretIntrafamilial'
import type { PretIntrafamilialInputs } from '@/types/pretIntrafamilial'

function defaults(over: Partial<PretIntrafamilialInputs> = {}): PretIntrafamilialInputs {
  return {
    montantPret: 100000,
    dureeAnnees: 10,
    tauxInteret: 2,
    agePreteur: 65,
    esperanceVie: 85,
    lienEmprunteur: 'enfant',
    donationsAnterieures: 0,
    ...over,
  }
}

describe('calculerPretIntrafamilial', () => {
  it('prêt 100k à 2% sur 10 ans → intérêts cumulés 20 000 €', () => {
    const r = calculerPretIntrafamilial(defaults())
    expect(r.interetsAnnuels).toBe(2000)
    expect(r.interetsCumulesPretDuree).toBe(20000)
  })

  it('prêt sans intérêt → warning requalification', () => {
    const r = calculerPretIntrafamilial(defaults({ tauxInteret: 0 }))
    expect(r.warnings.some(w => w.message.includes('requalification'))).toBe(true)
  })

  it('intérêts > 1 000 € → warning déclaration prêteur', () => {
    const r = calculerPretIntrafamilial(defaults({ tauxInteret: 2 }))
    expect(r.interetsImposablesPreteur).toBe(true)
  })

  it('si espérance résiduelle < durée prêt → warning danger + créance succession', () => {
    const r = calculerPretIntrafamilial(defaults({ agePreteur: 80, esperanceVie: 85, dureeAnnees: 10 }))
    expect(r.warnings.some(w => w.type === 'danger')).toBe(true)
    expect(r.capitalNonRembourseDecesEstime).toBe(100000)
  })

  it('donation à enfant 80k couverte par abattement 100k → 0 € droits donation', () => {
    const r = calculerPretIntrafamilial(defaults({ montantPret: 80000 }))
    expect(r.droitsDonationEquivalente).toBe(0)
  })

  it('donation à enfant 200k → droits ≈ 18 194 € (barème ligne directe)', () => {
    const r = calculerPretIntrafamilial(defaults({ montantPret: 200000 }))
    // Base 100k → 5%×8072 + 10%×4037 + 15%×3823 + 20%×84068 ≈ 18 194 €
    expect(r.droitsDonationEquivalente).toBe(18194)
  })

  it('prêt avec décès avant terme : compare intérêts + droits succession vs donation', () => {
    const r = calculerPretIntrafamilial(
      defaults({ montantPret: 200000, agePreteur: 80, esperanceVie: 85, dureeAnnees: 10 }),
    )
    expect(r.droitsSuccessionCreance).toBeGreaterThan(0)
    expect(r.droitsDonationEquivalente).toBeGreaterThan(0)
    expect(['pret', 'donation']).toContain(r.optionAvantageuse)
  })
})
