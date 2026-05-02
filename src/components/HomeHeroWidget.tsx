'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'

// Tables INSEE 2022 — espérance résiduelle (moyenne hommes/femmes, simplified)
const ESPERANCE_POINTS: [number, number][] = [
  [55, 27.8], [60, 23.4], [65, 19.2], [70, 15.4], [75, 12.0], [80, 9.1], [85, 6.7],
]

function esperanceResiduelle(age: number): number {
  for (let i = 0; i < ESPERANCE_POINTS.length - 1; i++) {
    const [a1, e1] = ESPERANCE_POINTS[i]
    const [a2, e2] = ESPERANCE_POINTS[i + 1]
    if (age >= a1 && age <= a2) {
      const t = (age - a1) / (a2 - a1)
      return e1 + t * (e2 - e1)
    }
  }
  return ESPERANCE_POINTS[ESPERANCE_POINTS.length - 1][1]
}

const CAPITAL = 200_000

export default function HomeHeroWidget() {
  const [age, setAge] = useState(70)

  const result = useMemo(() => {
    const esperance = esperanceResiduelle(age)
    const mois = esperance * 12
    // Estimation simplifiée — chargement moyen assureur ~15 %
    const pension = Math.round((CAPITAL / mois) * 0.87)
    const seuil = +(CAPITAL / (pension * 12)).toFixed(1)
    return { pension, seuil, esperance: +esperance.toFixed(1) }
  }, [age])

  return (
    <div className="bg-white border border-neutral-200" style={{ boxShadow: '4px 4px 0 #D4AF37' }}>
      {/* Header widget */}
      <div className="border-b border-neutral-100 px-6 py-4">
        <p className="font-mono text-xs text-neutral-400 uppercase tracking-widest">
          Rente viagère — estimation
        </p>
        <p className="font-mono text-xs text-neutral-400 mt-0.5">
          Capital fixé à {CAPITAL.toLocaleString('fr-FR')} €
        </p>
      </div>

      <div className="px-6 py-5">
        {/* Slider âge */}
        <div className="mb-6">
          <div className="flex justify-between items-baseline mb-3">
            <label className="font-mono text-xs text-neutral-500 uppercase tracking-wider">
              Âge de départ
            </label>
            <span className="font-mono text-xl font-bold text-primary-700">
              {age} ans
            </span>
          </div>
          <input
            type="range"
            min={55}
            max={85}
            step={1}
            value={age}
            onChange={e => setAge(Number(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between font-mono text-xs text-neutral-400 mt-1">
            <span>55 ans</span>
            <span>85 ans</span>
          </div>
        </div>

        {/* Résultat principal */}
        <div className="border-t border-neutral-100 pt-5 mb-4">
          <p className="font-mono text-xs text-neutral-400 uppercase tracking-wider mb-2">
            Rente mensuelle estimée
          </p>
          <p className="font-mono font-bold text-primary-700 leading-none" style={{ fontSize: '2.5rem' }}>
            {result.pension.toLocaleString('fr-FR')} €
            <span className="text-base font-normal text-neutral-400 ml-1">/mois</span>
          </p>
        </div>

        {/* Données secondaires */}
        <div className="grid grid-cols-2 gap-2 mb-5">
          <div className="bg-neutral-50 border border-neutral-100 px-3 py-2.5">
            <p className="font-mono text-xs text-neutral-400 mb-1">Espérance résiduelle</p>
            <p className="font-mono text-sm font-bold text-neutral-700">{result.esperance} ans</p>
          </div>
          <div className="bg-neutral-50 border border-neutral-100 px-3 py-2.5">
            <p className="font-mono text-xs text-neutral-400 mb-1">Seuil de rentabilité</p>
            <p className="font-mono text-sm font-bold text-neutral-700">{result.seuil} ans</p>
          </div>
        </div>

        {/* CTA */}
        <Link
          href="/rente-viagere"
          className="block text-center font-mono text-xs font-medium text-primary-700 border border-primary-700 px-4 py-2.5 hover:bg-primary-700 hover:text-white transition-colors"
        >
          Calculateur complet — tables INSEE →
        </Link>

        <p className="font-mono text-xs text-neutral-400 text-center mt-3 leading-relaxed">
          Estimation indicative non contractuelle.
        </p>
      </div>
    </div>
  )
}
