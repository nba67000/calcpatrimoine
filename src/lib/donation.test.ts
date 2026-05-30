import { describe, it, expect } from 'vitest'
import { calculerDonation } from './donation'
import type { DonationInputs } from '@/types/donation'

const baseInputs: DonationInputs = {
  montantDonation: 0,
  lien: 'enfant',
  donataireHandicape: false,
  donFamilial790G: false,
  ageDonateur: 60,
  donataireMajeur: true,
  donationsAnterieures15Ans: 0,
}

// ---------------------------------------------------------------------------
// Cas nominaux (barème Art. 777 / abattements Art. 779 - barème 2026)
// ---------------------------------------------------------------------------
describe('calculerDonation - cas nominaux', () => {
  it('parent → enfant 200 000 € : abattement 100 000 €, droits 18 194 €', () => {
    const r = calculerDonation({ ...baseInputs, montantDonation: 200000, lien: 'enfant' })
    expect(r.abattementPersonnelApplique).toBe(100000)
    expect(r.baseTaxable).toBe(100000)
    expect(r.droitsBruts).toBe(18194)
    expect(r.montantNet).toBe(181806)
  })

  it('époux/PACS 150 000 € : abattement 80 724 €, droits 11 062 €', () => {
    const r = calculerDonation({ ...baseInputs, montantDonation: 150000, lien: 'epoux_pacs' })
    expect(r.abattementPersonnelApplique).toBe(80724)
    expect(r.baseTaxable).toBe(69276)
    expect(r.droitsBruts).toBe(11062)
  })

  it('frère/sœur 50 000 € : abattement 15 932 €, droits 12 888 €', () => {
    const r = calculerDonation({ ...baseInputs, montantDonation: 50000, lien: 'frere_soeur' })
    expect(r.abattementPersonnelApplique).toBe(15932)
    expect(r.baseTaxable).toBe(34068)
    expect(r.droitsBruts).toBe(12888)
  })

  it('neveu/nièce 30 000 € : abattement 7 967 €, droits 12 118 € (taux 55 %)', () => {
    const r = calculerDonation({ ...baseInputs, montantDonation: 30000, lien: 'neveu_niece' })
    expect(r.abattementPersonnelApplique).toBe(7967)
    expect(r.baseTaxable).toBe(22033)
    expect(r.droitsBruts).toBe(12118)
  })

  it('non-parent 20 000 € : aucun abattement, droits 12 000 € (taux 60 %)', () => {
    const r = calculerDonation({ ...baseInputs, montantDonation: 20000, lien: 'non_parent' })
    expect(r.abattementPersonnelApplique).toBe(0)
    expect(r.baseTaxable).toBe(20000)
    expect(r.droitsBruts).toBe(12000)
  })
})

// ---------------------------------------------------------------------------
// Abattements cumulables (Art. 779-II handicap, Art. 790 G don familial)
// ---------------------------------------------------------------------------
describe('calculerDonation - abattements cumulables', () => {
  it('don familial 790 G enfant majeur : abattement 131 865 €, droits 1 821 €', () => {
    const r = calculerDonation({
      ...baseInputs,
      montantDonation: 150000,
      lien: 'enfant',
      donFamilial790G: true,
    })
    expect(r.abattementPersonnelApplique).toBe(100000)
    expect(r.abattement790G).toBe(31865)
    expect(r.abattementTotal).toBe(131865)
    expect(r.baseTaxable).toBe(18135)
    expect(r.droitsBruts).toBe(1821)
    expect(r.donFamilial790GRefuse).toBe(false)
  })

  it("don familial 790 G refusé si donateur 80 ans : seul l'abattement 100 000 € s'applique", () => {
    const r = calculerDonation({
      ...baseInputs,
      montantDonation: 150000,
      lien: 'enfant',
      donFamilial790G: true,
      ageDonateur: 82,
    })
    expect(r.donFamilial790GRefuse).toBe(true)
    expect(r.abattement790G).toBe(0)
    expect(r.abattementTotal).toBe(100000)
    expect(r.motifRefus790G).toContain('80 ans')
  })

  it('don familial 790 G refusé si donataire mineur non émancipé', () => {
    const r = calculerDonation({
      ...baseInputs,
      montantDonation: 50000,
      lien: 'enfant',
      donFamilial790G: true,
      donataireMajeur: false,
    })
    expect(r.donFamilial790GRefuse).toBe(true)
    expect(r.abattement790G).toBe(0)
  })

  it('don familial 790 G refusé si lien frère/sœur (non éligible)', () => {
    const r = calculerDonation({
      ...baseInputs,
      montantDonation: 50000,
      lien: 'frere_soeur',
      donFamilial790G: true,
    })
    expect(r.donFamilial790GRefuse).toBe(true)
    expect(r.abattement790G).toBe(0)
  })

  it('abattement handicap cumulable : enfant handicapé 300 000 €', () => {
    const r = calculerDonation({
      ...baseInputs,
      montantDonation: 300000,
      lien: 'enfant',
      donataireHandicape: true,
    })
    expect(r.abattementPersonnelApplique).toBe(100000)
    expect(r.abattementHandicap).toBe(159325)
    expect(r.abattementTotal).toBe(259325)
    expect(r.baseTaxable).toBe(40675)
  })
})

// ---------------------------------------------------------------------------
// Rappel fiscal 15 ans (Art. 784 CGI)
// ---------------------------------------------------------------------------
describe('calculerDonation - rappel fiscal 15 ans', () => {
  it("donation antérieure 40 000 € → abattement résiduel 60 000 € seulement", () => {
    const r = calculerDonation({
      ...baseInputs,
      montantDonation: 100000,
      lien: 'enfant',
      donationsAnterieures15Ans: 40000,
    })
    expect(r.rappel15AnsActif).toBe(true)
    expect(r.abattementPersonnelApplique).toBe(60000)
    expect(r.baseTaxable).toBe(40000)
  })

  it("donation antérieure ≥ abattement → tranches basses déjà consommées", () => {
    // Donation antérieure de 200 000 € : abattement déjà épuisé, 100 000 € de
    // base déjà passée par les tranches basses (5/10/15/20 %). La donation
    // actuelle de 50 000 € démarre directement dans la tranche à 20 %.
    const r = calculerDonation({
      ...baseInputs,
      montantDonation: 50000,
      lien: 'enfant',
      donationsAnterieures15Ans: 200000,
    })
    expect(r.abattementPersonnelApplique).toBe(0)
    expect(r.baseTaxable).toBe(50000)
    // Tranches déjà consommées : 100 000 € (= 200 000 - 100 000 abattement)
    // La donation actuelle (50 000 €) tombe à 100 % dans la tranche 20 %.
    expect(r.droitsBruts).toBe(10000)
  })
})

// ---------------------------------------------------------------------------
// Indicateurs et bornes
// ---------------------------------------------------------------------------
describe('calculerDonation - indicateurs', () => {
  it('donation < abattement : 0 € de droits, optimisation success', () => {
    const r = calculerDonation({ ...baseInputs, montantDonation: 50000, lien: 'enfant' })
    expect(r.droitsBruts).toBe(0)
    expect(r.baseTaxable).toBe(0)
    expect(r.optimisations.some(o => o.type === 'success')).toBe(true)
  })

  it('montant 0 € : tous les indicateurs neutres', () => {
    const r = calculerDonation({ ...baseInputs, montantDonation: 0, lien: 'enfant' })
    expect(r.droitsBruts).toBe(0)
    expect(r.tauxEffectif).toBe(0)
    expect(r.montantNet).toBe(0)
  })

  it('économie liée à l\'abattement chiffrée', () => {
    const r = calculerDonation({ ...baseInputs, montantDonation: 200000, lien: 'enfant' })
    // Sans abattement : droits sur 200 000 € en ligne directe
    // 5% × 8072 + 10% × 4037 + 15% × 3823 + 20% × (200000 - 15932)
    // = 403,60 + 403,70 + 573,45 + 36813,60 = 38194,35 → 38194
    expect(r.droitsSansAbattement).toBe(38194)
    expect(r.economieAbattements).toBe(20000)
  })
})

// ---------------------------------------------------------------------------
// Warnings
// ---------------------------------------------------------------------------
describe('calculerDonation - warnings', () => {
  it('rappel 15 ans actif → warning dans la liste', () => {
    const r = calculerDonation({
      ...baseInputs,
      montantDonation: 100000,
      lien: 'enfant',
      donationsAnterieures15Ans: 30000,
    })
    expect(r.warnings.some(w => w.type === 'warning')).toBe(true)
  })

  it('don 790 G refusé → warning danger', () => {
    const r = calculerDonation({
      ...baseInputs,
      montantDonation: 50000,
      lien: 'enfant',
      donFamilial790G: true,
      ageDonateur: 85,
    })
    expect(r.warnings.some(w => w.type === 'danger')).toBe(true)
  })

  it('suggestion 790 G si éligible mais non coché et droits dus', () => {
    const r = calculerDonation({
      ...baseInputs,
      montantDonation: 200000,
      lien: 'enfant',
      donFamilial790G: false,
    })
    expect(r.optimisations.some(o => o.message.includes('790 G'))).toBe(true)
  })
})
