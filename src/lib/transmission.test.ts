import { describe, it, expect } from 'vitest'
import {
  ajouterBeneficiaire,
  supprimerBeneficiaire,
  equilibrerParts,
  modifierPartBeneficiaire,
} from './transmission'
import type { Beneficiaire } from '@/types/transmission'

// Helpers de test - IDs stables pour les assertions
function benef(id: string, part: number, lien: Beneficiaire['lien'] = 'enfant'): Beneficiaire {
  return { id, nom: `B${id}`, lien, partPourcentage: part }
}

// ---------------------------------------------------------------------------
// ajouterBeneficiaire
// ---------------------------------------------------------------------------
describe('ajouterBeneficiaire', () => {
  it('ajoute un bénéficiaire avec la part restante', () => {
    const liste = [benef('a', 60), benef('b', 30)]
    const result = ajouterBeneficiaire(liste)
    expect(result).toHaveLength(3)
    expect(result[2].partPourcentage).toBe(10)
  })

  it('part restante = 0 si total déjà à 100', () => {
    const liste = [benef('a', 50), benef('b', 50)]
    const result = ajouterBeneficiaire(liste)
    expect(result[2].partPourcentage).toBe(0)
  })

  it('ne dépasse pas 6 bénéficiaires', () => {
    const liste = Array.from({ length: 6 }, (_, i) => benef(String(i), 100 / 6))
    const result = ajouterBeneficiaire(liste)
    expect(result).toHaveLength(6)
  })

  it('ne mute pas le tableau source', () => {
    const liste = [benef('a', 100)]
    const result = ajouterBeneficiaire(liste)
    expect(liste).toHaveLength(1)
    expect(result).toHaveLength(2)
  })
})

// ---------------------------------------------------------------------------
// supprimerBeneficiaire
// ---------------------------------------------------------------------------
describe('supprimerBeneficiaire', () => {
  it('supprime le bon bénéficiaire', () => {
    const liste = [benef('a', 50), benef('b', 30), benef('c', 20)]
    const result = supprimerBeneficiaire(liste, 'b')
    expect(result).toHaveLength(2)
    expect(result.find(b => b.id === 'b')).toBeUndefined()
  })

  it('ne supprime pas si un seul bénéficiaire', () => {
    const liste = [benef('a', 100)]
    const result = supprimerBeneficiaire(liste, 'a')
    expect(result).toHaveLength(1)
  })

  it('ne mute pas le tableau source', () => {
    const liste = [benef('a', 50), benef('b', 50)]
    supprimerBeneficiaire(liste, 'a')
    expect(liste).toHaveLength(2)
  })
})

// ---------------------------------------------------------------------------
// equilibrerParts
// ---------------------------------------------------------------------------
describe('equilibrerParts', () => {
  it('répartit à parts égales entre 2', () => {
    const liste = [benef('a', 70), benef('b', 30)]
    const result = equilibrerParts(liste)
    expect(result[0].partPourcentage).toBe(50)
    expect(result[1].partPourcentage).toBe(50)
  })

  it('répartit à parts égales entre 3', () => {
    const liste = [benef('a', 40), benef('b', 40), benef('c', 20)]
    const result = equilibrerParts(liste)
    const attendu = Math.round((100 / 3) * 100) / 100
    result.forEach(b => expect(b.partPourcentage).toBe(attendu))
  })

  it('ne mute pas le tableau source', () => {
    const liste = [benef('a', 80), benef('b', 20)]
    equilibrerParts(liste)
    expect(liste[0].partPourcentage).toBe(80)
  })
})

// ---------------------------------------------------------------------------
// modifierPartBeneficiaire
// ---------------------------------------------------------------------------
describe('modifierPartBeneficiaire', () => {
  it('2 bénéficiaires : bouger le premier ajuste le second', () => {
    const liste = [benef('a', 50), benef('b', 50)]
    const result = modifierPartBeneficiaire(liste, 'a', 70)
    expect(result[0].partPourcentage).toBe(70)
    expect(result[1].partPourcentage).toBe(30)
  })

  it('3 bénéficiaires : cascade proportionnelle sur les suivants', () => {
    // (40, 40, 20) → bouger 'a' à 60 → reste 40 réparti 40/20 = 2:1 → (26.67, 13.33)
    const liste = [benef('a', 40), benef('b', 40), benef('c', 20)]
    const result = modifierPartBeneficiaire(liste, 'a', 60)
    expect(result[0].partPourcentage).toBe(60)
    expect(result[1].partPourcentage).toBeCloseTo(26.67, 1)
    expect(result[2].partPourcentage).toBeCloseTo(13.33, 1)
  })

  it('3 bénéficiaires : bouger le second ne touche que le troisième', () => {
    // (40, 40, 20) → bouger 'b' à 50 → 'a' figé à 40, reste = 10 → 'c' = 10
    const liste = [benef('a', 40), benef('b', 40), benef('c', 20)]
    const result = modifierPartBeneficiaire(liste, 'b', 50)
    expect(result[0].partPourcentage).toBe(40)
    expect(result[1].partPourcentage).toBe(50)
    expect(result[2].partPourcentage).toBe(10)
  })

  it('dernier bénéficiaire : modification libre, pas de cascade', () => {
    const liste = [benef('a', 50), benef('b', 50)]
    const result = modifierPartBeneficiaire(liste, 'b', 80)
    expect(result[0].partPourcentage).toBe(50) // 'a' inchangé
    expect(result[1].partPourcentage).toBe(80)
  })

  it('clamp : ne peut pas dépasser le maximum disponible', () => {
    // 'a' figé à 60, 'b' essaie de prendre 80% → max dispo = 40
    const liste = [benef('a', 60), benef('b', 20), benef('c', 20)]
    const result = modifierPartBeneficiaire(liste, 'b', 80)
    expect(result[1].partPourcentage).toBe(40)
    expect(result[2].partPourcentage).toBe(0)
  })

  it('parts suivantes à 0 : répartition égale du reste', () => {
    const liste = [benef('a', 100), benef('b', 0), benef('c', 0)]
    const result = modifierPartBeneficiaire(liste, 'a', 60)
    expect(result[0].partPourcentage).toBe(60)
    expect(result[1].partPourcentage).toBe(20)
    expect(result[2].partPourcentage).toBe(20)
  })

  it('id inconnu : retourne le tableau inchangé', () => {
    const liste = [benef('a', 50), benef('b', 50)]
    const result = modifierPartBeneficiaire(liste, 'inconnu', 70)
    expect(result).toEqual(liste)
  })

  it('ne mute pas le tableau source', () => {
    const liste = [benef('a', 50), benef('b', 50)]
    modifierPartBeneficiaire(liste, 'a', 70)
    expect(liste[0].partPourcentage).toBe(50)
  })
})
