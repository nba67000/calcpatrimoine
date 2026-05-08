// src/components/Calculator/TMICalculator.tsx
'use client'

import { useState, useMemo } from 'react'
import { calculerTMIResult } from '@/lib/tmi'
import type { TMIInputs, SituationFamiliale } from '@/types/tmi'
import { useNumericInput } from '@/hooks/useNumericInput'
import AlertList from '@/components/AlertList'
import ChatWidget from '@/components/ChatWidget'
import { formatEur } from '@/lib/formatters'

const TMI_COLORS: Record<number, { badge: string; text: string; bg: string }> = {
  0:  { badge: 'bg-neutral-200 text-neutral-800',  text: 'text-neutral-700',  bg: 'bg-neutral-50'  },
  11: { badge: 'bg-green-100 text-green-800',       text: 'text-green-700',   bg: 'bg-green-50'    },
  30: { badge: 'bg-yellow-100 text-yellow-800',     text: 'text-yellow-700',  bg: 'bg-yellow-50'   },
  41: { badge: 'bg-orange-100 text-orange-800',     text: 'text-orange-700',  bg: 'bg-orange-50'   },
  45: { badge: 'bg-red-100 text-red-800',           text: 'text-red-700',     bg: 'bg-red-50'      },
}

const TRANCHE_COLORS: Record<number, string> = {
  0:  'bg-neutral-300',
  11: 'bg-green-400',
  30: 'bg-yellow-400',
  41: 'bg-orange-400',
  45: 'bg-red-500',
}

const SITUATIONS: Array<{ value: SituationFamiliale; label: string }> = [
  { value: 'celibataire',  label: 'Célibataire / Divorcé·e' },
  { value: 'marie-pacse',  label: 'Marié·e ou Pacsé·e' },
  { value: 'parent-isole', label: 'Parent isolé (case T)' },
]

export default function TMICalculator() {
  const revenu = useNumericInput(45000, { min: 0, max: 500000 })
  const [situationFamiliale, setSituationFamiliale] = useState<SituationFamiliale>('celibataire')
  const [nombreEnfants, setNombreEnfants] = useState<number>(0)

  function handleSituation(s: SituationFamiliale) {
    setSituationFamiliale(s)
    // Parent isolé sans enfant est juridiquement impossible (case T Art. 195-1-c CGI)
    if (s === 'parent-isole' && nombreEnfants === 0) setNombreEnfants(1)
  }

  const inputs: TMIInputs = {
    revenuNetImposable: revenu.value,
    situationFamiliale,
    nombreEnfants,
  }

  const results = useMemo(() => calculerTMIResult(inputs), [revenu.value, situationFamiliale, nombreEnfants])

  const tmiColors = TMI_COLORS[results.tmi]

  return (
    <>
    <div className="grid lg:grid-cols-2 gap-8">

      {/* COLONNE GAUCHE - INPUTS */}
      <div className="space-y-6">

        {/* Revenu net imposable */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
          <h3 className="text-xl font-bold text-neutral-900 mb-6">
            Revenu net imposable
          </h3>

          <div className="mb-4">
            <div className="flex items-baseline gap-3 mb-3">
              <input
                type="text"
                inputMode="numeric"
                value={revenu.display}
                onChange={(e) => revenu.onChange(e.target.value)}
                onBlur={revenu.onBlur}
                className="w-28 sm:w-40 px-4 py-3 border border-neutral-300 rounded-lg text-xl sm:text-2xl font-bold text-primary-700 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-right"
              />
              <span className="text-xl sm:text-2xl font-bold text-neutral-600">€</span>
            </div>
            <input
              type="range"
              min="0"
              max="200000"
              step="500"
              value={revenu.value}
              onChange={(e) => revenu.set(Number(e.target.value))}
              className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
            />
            <div className="flex justify-between text-xs text-neutral-500 mt-1">
              <span>0 €</span>
              <span>200 000 €</span>
            </div>
          </div>

          <p className="text-xs text-neutral-500">
            Saisissez le revenu net imposable (après abattement de 10 % pour frais professionnels ou frais réels, avant décote).
          </p>
        </div>

        {/* Situation familiale */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
          <h3 className="text-xl font-bold text-neutral-900 mb-4">
            Situation familiale
          </h3>

          <div className="space-y-2 mb-6">
            {SITUATIONS.map((s) => (
              <button
                key={s.value}
                onClick={() => handleSituation(s.value)}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium text-sm transition-all border-2 ${
                  situationFamiliale === s.value
                    ? 'bg-primary-600 text-white border-primary-600 shadow-md'
                    : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:border-primary-300 hover:bg-primary-50'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Nombre d'enfants */}
          <div>
            <label className="text-sm font-medium text-neutral-700 block mb-3">
              Enfants à charge fiscalement
            </label>
            <div className="flex gap-2 flex-wrap">
              {[0, 1, 2, 3, 4, 5].map((n) => {
                const disabled = situationFamiliale === 'parent-isole' && n === 0
                return (
                  <button
                    key={n}
                    disabled={disabled}
                    onClick={() => setNombreEnfants(n)}
                    title={disabled ? 'Parent isolé : au moins 1 enfant requis (Art. 195-1-c CGI)' : undefined}
                    className={`w-12 h-12 rounded-lg font-bold text-sm transition-all ${
                      disabled
                        ? 'bg-neutral-50 text-neutral-300 cursor-not-allowed'
                        : nombreEnfants === n
                          ? 'bg-primary-600 text-white shadow-md scale-105'
                          : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                    }`}
                  >
                    {n}
                  </button>
                )
              })}
            </div>
            <p className="text-xs text-neutral-500 mt-2">
              {situationFamiliale === 'parent-isole'
                ? 'Parent isolé (case T) : au moins 1 enfant requis - Art. 195-1-c CGI.'
                : 'Enfants rattachés au foyer fiscal (art. 196 CGI).'}
            </p>
          </div>
        </div>

        {/* Récap parts fiscales */}
        <div className="bg-neutral-50 rounded-xl border border-neutral-200 p-5">
          <h3 className="text-sm font-bold text-neutral-700 mb-3 uppercase tracking-wide">
            Quotient familial
          </h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-white rounded-lg p-3 border border-neutral-200">
              <div className="text-xs text-neutral-500 mb-1">Parts totales</div>
              <div className="text-2xl font-bold text-neutral-900">
                {results.nombreParts.toLocaleString('fr-FR')}
              </div>
            </div>
            <div className="bg-white rounded-lg p-3 border border-neutral-200">
              <div className="text-xs text-neutral-500 mb-1">Revenu / part</div>
              <div className="text-xl font-bold text-neutral-900">
                {formatEur(results.revenuParPart)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* COLONNE DROITE - RÉSULTATS */}
      <div className="space-y-6">

        {/* TMI - résultat principal */}
        <div className={`rounded-xl border-2 p-6 ${tmiColors.bg} border-current`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-neutral-900">Tranche marginale</h3>
            <span className={`px-4 py-2 rounded-full font-bold text-xl ${tmiColors.badge}`}>
              {results.tmi} %
            </span>
          </div>
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-neutral-500 mb-1">Impôt sur le revenu net</div>
              <div className="text-3xl font-bold text-neutral-900">
                {formatEur(results.irNet)}
              </div>
            </div>
            <div>
              <div className="text-xs text-neutral-500 mb-1">Taux moyen</div>
              <div className="text-3xl font-bold text-neutral-900">
                {results.tauxMoyen.toFixed(1)} %
              </div>
            </div>
          </div>
        </div>

        {/* Détail du calcul */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-neutral-900 mb-4">
            Détail du calcul
          </h3>

          {/* Barres de tranches */}
          <div className="space-y-3 mb-5">
            {results.detailTranches.map((tranche, i) => {
              const pct = revenu.value > 0 ? (tranche.revenuDansLaTranche / revenu.value) * 100 : 0
              return (
                <div key={i}>
                  <div className="flex justify-between text-xs text-neutral-600 mb-1">
                    <span className="font-medium">
                      Tranche {tranche.taux} %
                      {tranche.borneSup
                        ? ` (jusqu'à ${formatEur(tranche.borneSup)})`
                        : ''}
                    </span>
                    <span>
                      {tranche.impotDansLaTranche > 0
                        ? formatEur(tranche.impotDansLaTranche)
                        : '–'}
                    </span>
                  </div>
                  <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${TRANCHE_COLORS[tranche.taux]}`}
                      style={{ width: `${Math.min(100, pct)}%` }}
                    />
                  </div>
                  <div className="text-xs text-neutral-400 mt-0.5">
                    {formatEur(tranche.revenuDansLaTranche)} dans cette tranche
                  </div>
                </div>
              )
            })}
          </div>

          {/* Synthèse chiffrée */}
          <div className="space-y-2 pt-4 border-t border-neutral-200 text-sm">
            <div className="flex justify-between">
              <span className="text-neutral-600">IR avec quotient familial (avant plafonnement)</span>
              <span className="font-medium">{formatEur(results.irAvecQF)}</span>
            </div>

            {results.plafonnementActif && (
              <>
                <div className="flex justify-between text-orange-700">
                  <span>Plafonnement QF actif</span>
                  <span className="font-medium">
                    +{formatEur(results.reductionQFBrute - results.reductionQFAppliquee)} ajouté
                  </span>
                </div>
              </>
            )}

            {results.reductionQFAppliquee > 0 && (
              <div className="flex justify-between text-green-700">
                <span>Réduction quotient familial</span>
                <span className="font-medium">
                  -{formatEur(results.reductionQFAppliquee)}
                </span>
              </div>
            )}

            <div className="flex justify-between font-medium pt-1 border-t border-neutral-200">
              <span className="text-neutral-700">IR brut</span>
              <span>{formatEur(results.irBrut)}</span>
            </div>

            {results.decoteApplicable > 0 && (
              <div className="flex justify-between text-green-700">
                <span>Décote</span>
                <span className="font-medium">-{formatEur(results.decoteApplicable)}</span>
              </div>
            )}

            <div className="flex justify-between font-bold text-base pt-2 border-t-2 border-neutral-300">
              <span className="text-neutral-900">IR net</span>
              <span className="text-primary-700">{formatEur(results.irNet)}</span>
            </div>
          </div>
        </div>

        <AlertList items={results.warnings} />
        <AlertList items={results.optimisations} />
      </div>
    </div>
    <ChatWidget contexte={{ calculateur: 'tmi', inputs, results }} />
    </>
  )
}
