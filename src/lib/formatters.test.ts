import { describe, it, expect } from 'vitest'
import { formatEur, formatEurRounded, formatPct, formatNombre, parseNombre, formatLigne } from './formatters'

describe('formatEur', () => {
  it('formate un entier positif', () => {
    expect(formatEur(1000)).toBe('1 000 €')
  })

  it('formate zéro', () => {
    expect(formatEur(0)).toBe('0 €')
  })

  it('formate un nombre avec décimales', () => {
    const result = formatEur(1234.56)
    expect(result).toContain('€')
    expect(result).toContain('1')
  })

  it('formate un nombre négatif', () => {
    const result = formatEur(-500)
    expect(result).toContain('€')
    expect(result).toContain('500')
  })

  it('formate un grand nombre avec séparateur de milliers', () => {
    const result = formatEur(1000000)
    expect(result).toContain('000')
    expect(result).toContain('€')
  })
})

describe('formatEurRounded', () => {
  it('arrondit à l\'entier le plus proche', () => {
    const result = formatEurRounded(1234.7)
    expect(result).toContain('1')
    expect(result).toContain('235')
    expect(result).toContain('€')
  })

  it('formate zéro', () => {
    expect(formatEurRounded(0)).toBe('0 €')
  })

  it('formate sans décimales', () => {
    const result = formatEurRounded(500.4)
    expect(result).not.toContain(',')
    expect(result).toContain('500')
  })
})

describe('formatPct', () => {
  it('formate avec 1 décimale par défaut', () => {
    expect(formatPct(12.5)).toBe('12.5 %')
  })

  it('formate avec 0 décimales', () => {
    expect(formatPct(30, 0)).toBe('30 %')
  })

  it('formate avec 2 décimales', () => {
    expect(formatPct(1.234, 2)).toBe('1.23 %')
  })

  it('formate zéro', () => {
    expect(formatPct(0)).toBe('0.0 %')
  })

  it('formate 100 %', () => {
    expect(formatPct(100, 0)).toBe('100 %')
  })
})

describe('formatNombre', () => {
  it('formate un entier', () => {
    const result = formatNombre(12345)
    expect(result).toContain('12')
    expect(result).toContain('345')
  })

  it('formate zéro', () => {
    expect(formatNombre(0)).toBe('0')
  })
})

describe('parseNombre', () => {
  it('parse une chaîne sans espace', () => {
    expect(parseNombre('1234')).toBe(1234)
  })

  it('ignore les espaces (séparateur milliers français)', () => {
    expect(parseNombre('1 234')).toBe(1234)
    expect(parseNombre('1 234')).toBe(1234)
  })

  it('parse zéro', () => {
    expect(parseNombre('0')).toBe(0)
  })

  it('round-trip avec formatNombre', () => {
    const original = 98765
    expect(parseNombre(formatNombre(original))).toBe(original)
  })
})

describe('formatLigne', () => {
  it('formate label et valeur avec indentation', () => {
    expect(formatLigne('Total', '1 000 €')).toBe('  Total : 1 000 €')
  })

  it('préfixe toujours par deux espaces', () => {
    const result = formatLigne('A', 'B')
    expect(result.startsWith('  ')).toBe(true)
  })
})
