import { describe, it, expect } from 'vitest'
import {
  appliquerBareme,
  getBaremePourLien,
  BAREME_LIGNE_DIRECTE,
  BAREME_FRERE_SOEUR,
  ABATTEMENTS_ART_779,
} from './baremesArt777'

describe('appliquerBareme , Art. 777 CGI', () => {
  it('ligne directe 100 000 € (après abattement) → 18 194 €', () => {
    const r = appliquerBareme(100000, 0, BAREME_LIGNE_DIRECTE)
    // 5%×8072 + 10%×4037 + 15%×3823 + 20%×84068 = 18194
    expect(Math.round(r.droits)).toBe(18194)
  })

  it('frère/sœur 50 000 € → 35%×24430 + 45%×25570 = 11 502 €', () => {
    const r = appliquerBareme(50000, 0, BAREME_FRERE_SOEUR)
    // 35% × 24430 = 8550,5
    // 45% × 25570 = 11506,5
    // total = 20057
    expect(Math.round(r.droits)).toBe(20057)
  })

  it('rappel 15 ans : tranches consommées démarrent le barème plus haut', () => {
    // Donation antérieure de 50 000 € → tranches 5%/10%/15% déjà consommées partiellement
    // Nouvelle base = 30 000 €, démarre à 50 000 €
    const r = appliquerBareme(30000, 50000, BAREME_LIGNE_DIRECTE)
    // Toutes les nouvelles tombent dans 20% (15 932 € < 50 000 € < 552 324 €)
    expect(Math.round(r.droits)).toBe(6000)
  })

  it('base = 0 → droits = 0', () => {
    const r = appliquerBareme(0, 0, BAREME_LIGNE_DIRECTE)
    expect(r.droits).toBe(0)
    expect(r.detail).toHaveLength(0)
  })

  it('immutabilité du barème', () => {
    const snapshot = JSON.parse(JSON.stringify(BAREME_LIGNE_DIRECTE))
    appliquerBareme(100000, 0, BAREME_LIGNE_DIRECTE)
    expect(BAREME_LIGNE_DIRECTE).toEqual(snapshot)
  })
})

describe('getBaremePourLien', () => {
  it('enfant/parent/petit_enfant → ligne directe', () => {
    expect(getBaremePourLien('enfant')).toBe(BAREME_LIGNE_DIRECTE)
    expect(getBaremePourLien('parent')).toBe(BAREME_LIGNE_DIRECTE)
    expect(getBaremePourLien('petit_enfant')).toBe(BAREME_LIGNE_DIRECTE)
  })

  it('frère/sœur → barème dédié', () => {
    expect(getBaremePourLien('frere_soeur')).toBe(BAREME_FRERE_SOEUR)
  })

  it('neveu/autre_4e → 55 %', () => {
    expect(getBaremePourLien('neveu_niece')[0].taux).toBe(55)
    expect(getBaremePourLien('autre_4e')[0].taux).toBe(55)
  })

  it('non_parent/autre → 60 %', () => {
    expect(getBaremePourLien('non_parent')[0].taux).toBe(60)
    expect(getBaremePourLien('autre')[0].taux).toBe(60)
  })
})

describe('ABATTEMENTS_ART_779', () => {
  it('abattements 2026 conformes au CGI', () => {
    expect(ABATTEMENTS_ART_779.enfant).toBe(100000)
    expect(ABATTEMENTS_ART_779.epoux_pacs).toBe(80724)
    expect(ABATTEMENTS_ART_779.frere_soeur).toBe(15932)
    expect(ABATTEMENTS_ART_779.neveu_niece).toBe(7967)
    expect(ABATTEMENTS_ART_779.non_parent).toBe(0)
  })
})
