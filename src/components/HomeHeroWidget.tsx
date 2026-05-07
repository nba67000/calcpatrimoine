'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { calculerTMIResult } from '@/lib/tmi'
import type { SituationFamiliale } from '@/types/tmi'

const TMI_PALETTE: Record<number, { text: string; bg: string; border: string }> = {
  0:  { text: '#6B7280', bg: '#F9FAFB', border: '#E5E7EB' },
  11: { text: '#15803D', bg: '#F0FDF4', border: '#BBF7D0' },
  30: { text: '#B45309', bg: '#FFFBEB', border: '#FDE68A' },
  41: { text: '#C2410C', bg: '#FFF7ED', border: '#FED7AA' },
  45: { text: '#B91C1C', bg: '#FEF2F2', border: '#FECACA' },
}

const SITUATIONS: { value: SituationFamiliale; label: string }[] = [
  { value: 'celibataire',  label: 'Célibataire' },
  { value: 'marie-pacse',  label: 'Marié / Pacsé' },
  { value: 'parent-isole', label: 'Parent isolé' },
]

export default function HomeHeroWidget() {
  const [revenu, setRevenu]             = useState(45000)
  const [situation, setSituation]       = useState<SituationFamiliale>('celibataire')
  const [nombreEnfants, setNombreEnfants] = useState(0)

  function handleSituation(s: SituationFamiliale) {
    setSituation(s)
    // Parent isolé sans enfant est juridiquement impossible (case T Art. 195-1-c CGI)
    if (s === 'parent-isole' && nombreEnfants === 0) setNombreEnfants(1)
  }

  const result = useMemo(
    () => calculerTMIResult({ revenuNetImposable: revenu, situationFamiliale: situation, nombreEnfants }),
    [revenu, situation, nombreEnfants]
  )

  const palette = TMI_PALETTE[result.tmi]

  return (
    <div className="bg-surface-card border border-neutral-200" style={{ boxShadow: '4px 4px 0 #D4AF37' }}>
      {/* En-tête */}
      <div className="border-b border-neutral-100 px-6 py-4">
        <p className="font-mono text-xs text-neutral-400 uppercase tracking-widest">
          TMI — Barème IR 2026
        </p>
        <p className="font-mono text-xs text-neutral-400 mt-0.5">
          Revenus 2025
        </p>
      </div>

      <div className="px-6 py-5">
        {/* Situation familiale */}
        <div className="mb-4">
          <p className="font-mono text-xs text-neutral-500 uppercase tracking-wider mb-2">
            Situation
          </p>
          <div className="grid grid-cols-3 gap-1.5">
            {SITUATIONS.map(s => (
              <button
                key={s.value}
                onClick={() => handleSituation(s.value)}
                className={`font-mono text-xs py-2 px-1 border transition-colors ${
                  situation === s.value
                    ? 'bg-primary-700 text-white border-primary-700'
                    : 'text-neutral-600 border-neutral-200 hover:border-primary-400'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Enfants à charge */}
        <div className="mb-5">
          <p className="font-mono text-xs text-neutral-500 uppercase tracking-wider mb-2">
            Enfants à charge
          </p>
          <div className="flex gap-1.5">
            {[0, 1, 2, 3, 4].map(n => {
              const disabled = situation === 'parent-isole' && n === 0
              return (
                <button
                  key={n}
                  disabled={disabled}
                  onClick={() => !disabled && setNombreEnfants(n)}
                  title={disabled ? 'Parent isolé : au moins 1 enfant requis (Art. 195-1-c CGI)' : undefined}
                  className={`w-10 h-10 font-mono text-sm border transition-colors ${
                    disabled
                      ? 'text-neutral-200 border-neutral-100 cursor-not-allowed'
                      : nombreEnfants === n
                        ? 'bg-primary-700 text-white border-primary-700'
                        : 'text-neutral-600 border-neutral-200 hover:border-primary-400'
                  }`}
                >
                  {n}
                </button>
              )
            })}
          </div>
        </div>

        {/* Slider revenu */}
        <div className="mb-6">
          <div className="flex justify-between items-baseline mb-3">
            <label className="font-mono text-xs text-neutral-500 uppercase tracking-wider">
              Revenu net imposable
            </label>
            <span className="font-mono text-base font-bold text-primary-700">
              {revenu.toLocaleString('fr-FR')} €
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={150000}
            step={1000}
            value={revenu}
            onChange={e => setRevenu(Number(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between font-mono text-xs text-neutral-400 mt-1">
            <span>0 €</span>
            <span>150 000 €</span>
          </div>
        </div>

        {/* Résultat — TMI */}
        <div
          className="border p-4 mb-4 flex items-center justify-between gap-4"
          style={{ backgroundColor: palette.bg, borderColor: palette.border }}
        >
          <div>
            <p className="font-mono text-xs text-neutral-500 uppercase tracking-wider mb-1">
              Tranche marginale
            </p>
            <p
              className="font-mono font-bold leading-none"
              style={{ fontSize: '3rem', color: palette.text }}
            >
              {result.tmi} %
            </p>
          </div>
          <div className="text-right shrink-0">
            <p className="font-mono text-xs text-neutral-400 mb-1">IR net estimé</p>
            <p className="font-mono text-lg font-bold text-neutral-700">
              {result.irNet.toLocaleString('fr-FR')} €
            </p>
            <p className="font-mono text-xs text-neutral-400">
              Taux effectif : {result.tauxMoyen} %
            </p>
          </div>
        </div>

        {/* CTA */}
        <Link
          href="/tmi"
          className="block text-center font-mono text-xs font-medium text-primary-700 border border-primary-700 px-4 py-2.5 hover:bg-primary-700 hover:text-white transition-colors"
        >
          Calculateur complet — quotient familial, décote →
        </Link>

        <p className="font-mono text-xs text-neutral-400 text-center mt-3 leading-relaxed">
          Estimation barème 2026. Sans conseil personnalisé.
        </p>
      </div>
    </div>
  )
}
