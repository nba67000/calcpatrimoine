// src/lib/succession.test.ts

import { describe, it, expect } from 'vitest'
import { calculerSuccession } from './succession'
import type { HeritierSuccession } from '@/types/succession'

function h(props: Partial<HeritierSuccession> & Pick<HeritierSuccession, 'lien' | 'partRecue'>): HeritierSuccession {
  return {
    id: props.id ?? 'h-test',
    nom: props.nom ?? 'Test',
    donationsAnterieures: props.donationsAnterieures ?? 0,
    ...props,
  }
}

describe('calculerSuccession', () => {
  it('enfant unique 250 000 € → abattement 100k + barème ligne directe', () => {
    const r = calculerSuccession({
      actifNetSuccessoral: 250000,
      heritiers: [h({ id: '1', nom: 'Enfant', lien: 'enfant', partRecue: 250000 })],
    })
    // Base taxable = 150 000 €
    // 5%×8072 + 10%×4037 + 15%×3823 + 20%×134068 = 403,6 + 403,7 + 573,45 + 26813,6 = 28194 €
    expect(r.detailHeritiers[0].abattementApplique).toBe(100000)
    expect(r.detailHeritiers[0].baseTaxable).toBe(150000)
    expect(r.detailHeritiers[0].droits).toBe(28194)
    expect(r.totalDroits).toBe(28194)
    expect(r.totalNetRecu).toBe(250000 - 28194)
  })

  it('conjoint exonéré (Loi TEPA)', () => {
    const r = calculerSuccession({
      actifNetSuccessoral: 1000000,
      heritiers: [h({ id: '1', nom: 'Conjoint', lien: 'epoux_pacs', partRecue: 1000000 })],
    })
    expect(r.detailHeritiers[0].exonereLoiTEPA).toBe(true)
    expect(r.detailHeritiers[0].droits).toBe(0)
    expect(r.totalDroits).toBe(0)
    expect(r.totalNetRecu).toBe(1000000)
  })

  it('multi-héritiers : conjoint + 2 enfants', () => {
    const r = calculerSuccession({
      actifNetSuccessoral: 600000,
      heritiers: [
        h({ id: '1', nom: 'Conjoint', lien: 'epoux_pacs', partRecue: 300000 }),
        h({ id: '2', nom: 'Enfant 1', lien: 'enfant', partRecue: 150000 }),
        h({ id: '3', nom: 'Enfant 2', lien: 'enfant', partRecue: 150000 }),
      ],
    })
    // Conjoint : 0 €
    // Chaque enfant : base 50 000 €, droits = 5%×8072 + 10%×4037 + 15%×3823 + 20%×34068 = 403,6 + 403,7 + 573,45 + 6813,6 = 8194 €
    expect(r.detailHeritiers[0].droits).toBe(0)
    expect(r.detailHeritiers[1].droits).toBe(8194)
    expect(r.detailHeritiers[2].droits).toBe(8194)
    expect(r.totalDroits).toBe(16388)
  })

  it('rappel 15 ans : donation antérieure de 80 000 € à un enfant héritant de 120 000 €', () => {
    const r = calculerSuccession({
      actifNetSuccessoral: 120000,
      heritiers: [
        h({ id: '1', nom: 'Enfant', lien: 'enfant', partRecue: 120000, donationsAnterieures: 80000 }),
      ],
    })
    // Abattement résiduel : 100 000 - 80 000 = 20 000 €
    // Base taxable : 120 000 - 20 000 = 100 000 €
    // Le barème démarre où la donation l'a laissé (donation = 80k, abattement = 80k consommé → 0 tranche consommée)
    expect(r.detailHeritiers[0].abattementApplique).toBe(20000)
    expect(r.detailHeritiers[0].baseTaxable).toBe(100000)
    // Droits = 5%×8072 + 10%×4037 + 15%×3823 + 20%×84068 = 18194 €
    expect(r.detailHeritiers[0].droits).toBe(18194)
  })

  it('frère/sœur : abattement 15 932 € + barème 35 % puis 45 %', () => {
    const r = calculerSuccession({
      actifNetSuccessoral: 50000,
      heritiers: [h({ id: '1', nom: 'Frère', lien: 'frere_soeur', partRecue: 50000 })],
    })
    // Base taxable = 50000 - 15932 = 34068
    // Droits = 35%×24430 + 45%×9638 = 8550,5 + 4337,1 = 12888 €
    expect(r.detailHeritiers[0].droits).toBe(12888)
  })

  it('neveu/nièce : abattement 7967 € + 55 %', () => {
    const r = calculerSuccession({
      actifNetSuccessoral: 30000,
      heritiers: [h({ id: '1', nom: 'Neveu', lien: 'neveu_niece', partRecue: 30000 })],
    })
    // Base = 30000 - 7967 = 22033
    // Droits = 22033 × 55 % = 12118 €
    expect(r.detailHeritiers[0].droits).toBe(12118)
  })

  it('warning si somme parts ≠ actif net', () => {
    const r = calculerSuccession({
      actifNetSuccessoral: 200000,
      heritiers: [h({ id: '1', nom: 'Enfant', lien: 'enfant', partRecue: 150000 })],
    })
    expect(r.warnings.some(w => w.message.includes('ne correspond pas'))).toBe(true)
  })

  it('immutabilité : ne mute pas inputs.heritiers', () => {
    const heritiers: HeritierSuccession[] = [
      h({ id: '1', nom: 'Enfant', lien: 'enfant', partRecue: 200000 }),
    ]
    const snapshot = JSON.parse(JSON.stringify(heritiers))
    calculerSuccession({ actifNetSuccessoral: 200000, heritiers })
    expect(heritiers).toEqual(snapshot)
  })
})
