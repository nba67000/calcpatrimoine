'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { calculerPER } from '@/lib/per'
import type { PERInputs, TMIOption } from '@/types/per'

const TMI_OPTIONS: Array<{ value: TMIOption; label: string; color: string }> = [
  { value: 0,  label: '0 %',  color: 'bg-neutral-100 text-neutral-800' },
  { value: 11, label: '11 %', color: 'bg-green-100 text-green-800' },
  { value: 30, label: '30 %', color: 'bg-yellow-100 text-yellow-800' },
  { value: 41, label: '41 %', color: 'bg-orange-100 text-orange-800' },
  { value: 45, label: '45 %', color: 'bg-red-100 text-red-800' },
]

const DEFAULT_INPUTS: PERInputs = {
  salaireNetAnnuel: 50_000,
  tmi: 30,
  versementEnvisage: 5_000,
  plafondsReportesN1: 0,
  plafondsReportesN2: 0,
  plafondsReportesN3: 0,
}

function formatEur(n: number): string {
  return n.toLocaleString('fr-FR') + ' €'
}

export default function PERCalculator() {
  const [salaire, setSalaire] = useState(DEFAULT_INPUTS.salaireNetAnnuel)
  const [salaireSaisi, setSalaireSaisi] = useState(String(DEFAULT_INPUTS.salaireNetAnnuel))
  const [tmi, setTmi] = useState<TMIOption>(DEFAULT_INPUTS.tmi)
  const [versement, setVersement] = useState(DEFAULT_INPUTS.versementEnvisage)
  const [versementSaisi, setVersementSaisi] = useState(String(DEFAULT_INPUTS.versementEnvisage))
  const [reportN1, setReportN1] = useState(0)
  const [reportN1Saisi, setReportN1Saisi] = useState('0')
  const [reportN2, setReportN2] = useState(0)
  const [reportN2Saisi, setReportN2Saisi] = useState('0')
  const [reportN3, setReportN3] = useState(0)
  const [reportN3Saisi, setReportN3Saisi] = useState('0')

  const inputs: PERInputs = {
    salaireNetAnnuel: salaire,
    tmi,
    versementEnvisage: versement,
    plafondsReportesN1: reportN1,
    plafondsReportesN2: reportN2,
    plafondsReportesN3: reportN3,
  }

  const results = useMemo(() => calculerPER(inputs), [salaire, tmi, versement, reportN1, reportN2, reportN3])

  function handleSalaireInput(val: string) {
    setSalaireSaisi(val)
    const n = parseInt(val.replace(/\s/g, ''), 10)
    if (!isNaN(n) && n >= 0 && n <= 500_000) setSalaire(n)
  }

  function handleVersementInput(val: string) {
    setVersementSaisi(val)
    const n = parseInt(val.replace(/\s/g, ''), 10)
    if (!isNaN(n) && n >= 0 && n <= 200_000) setVersement(n)
  }

  function handleReportInput(
    val: string,
    setter: (n: number) => void,
    saisieSet: (s: string) => void
  ) {
    saisieSet(val)
    const n = parseInt(val.replace(/\s/g, ''), 10)
    if (!isNaN(n) && n >= 0 && n <= 200_000) setter(n)
  }

  const { detail, economieFiscale, coutNetReel, rendementFiscal, warnings, optimisations } = results

  return (
    <div className="grid lg:grid-cols-2 gap-8">

      {/* COLONNE GAUCHE — INPUTS */}
      <div className="space-y-6">

        {/* Salaire net annuel */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
          <h3 className="text-xl font-bold text-neutral-900 mb-2">
            Salaire net annuel (N-1)
          </h3>
          <p className="text-xs text-neutral-500 mb-4">
            Votre salaire net à payer annuel de l'année précédente (avant déclaration d'impôts). L'abattement forfaitaire de 10 % pour frais professionnels est calculé automatiquement.
          </p>

          <div className="mb-4">
            <div className="flex items-baseline gap-3 mb-3">
              <input
                type="text"
                inputMode="numeric"
                value={salaireSaisi}
                onChange={(e) => handleSalaireInput(e.target.value)}
                onBlur={() => setSalaireSaisi(String(salaire))}
                className="w-40 px-4 py-3 border border-neutral-300 rounded-lg text-2xl font-bold text-primary-700 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-right"
              />
              <span className="text-2xl font-bold text-neutral-600">€</span>
            </div>
            <input
              type="range"
              min="0"
              max="300000"
              step="1000"
              value={salaire}
              onChange={(e) => {
                const n = Number(e.target.value)
                setSalaire(n)
                setSalaireSaisi(String(n))
              }}
              className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
            />
            <div className="flex justify-between text-xs text-neutral-500 mt-1">
              <span>0 €</span>
              <span>300 000 €</span>
            </div>
          </div>
        </div>

        {/* TMI */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-neutral-900 mb-1">
                Tranche marginale d'imposition
              </h3>
              <p className="text-xs text-neutral-500">
                Sélectionnez votre TMI.{' '}
                <Link href="/tmi" className="text-primary-600 hover:underline">
                  Calculer ma TMI →
                </Link>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {TMI_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setTmi(opt.value)}
                className={`px-5 py-3 rounded-lg font-bold text-sm transition-all border-2 ${
                  tmi === opt.value
                    ? 'border-primary-600 bg-primary-600 text-white shadow-md scale-105'
                    : `border-neutral-200 ${opt.color} hover:border-primary-300`
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Versement envisagé */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
          <h3 className="text-xl font-bold text-neutral-900 mb-4">
            Versement envisagé sur le PER
          </h3>

          <div className="mb-4">
            <div className="flex items-baseline gap-3 mb-3">
              <input
                type="text"
                inputMode="numeric"
                value={versementSaisi}
                onChange={(e) => handleVersementInput(e.target.value)}
                onBlur={() => setVersementSaisi(String(versement))}
                className="w-40 px-4 py-3 border border-neutral-300 rounded-lg text-2xl font-bold text-primary-700 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-right"
              />
              <span className="text-2xl font-bold text-neutral-600">€</span>
            </div>
            <input
              type="range"
              min="0"
              max="50000"
              step="100"
              value={versement}
              onChange={(e) => {
                const n = Number(e.target.value)
                setVersement(n)
                setVersementSaisi(String(n))
              }}
              className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
            />
            <div className="flex justify-between text-xs text-neutral-500 mt-1">
              <span>0 €</span>
              <span>50 000 €</span>
            </div>
          </div>
        </div>

        {/* Reports plafonds */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
          <h3 className="text-xl font-bold text-neutral-900 mb-2">
            Plafonds non utilisés (reports)
          </h3>
          <p className="text-xs text-neutral-500 mb-4">
            Ces montants figurent sur votre avis d'imposition, rubrique "Plafonds disponibles pour les versements retraite". Laissez à 0 si vous n'avez pas d'information.
          </p>

          <div className="space-y-3">
            {[
              { label: 'Report N-1 (2024)', val: reportN1Saisi, setVal: setReportN1Saisi, setN: setReportN1 },
              { label: 'Report N-2 (2023)', val: reportN2Saisi, setVal: setReportN2Saisi, setN: setReportN2 },
              { label: 'Report N-3 (2022)', val: reportN3Saisi, setVal: setReportN3Saisi, setN: setReportN3 },
            ].map((r) => (
              <div key={r.label} className="flex items-center gap-3">
                <label className="text-sm text-neutral-600 w-36 flex-shrink-0">{r.label}</label>
                <div className="flex items-baseline gap-2">
                  <input
                    type="text"
                    inputMode="numeric"
                    value={r.val}
                    onChange={(e) => handleReportInput(e.target.value, r.setN, r.setVal)}
                    onBlur={() => {
                      const n = parseInt(r.val.replace(/\s/g, ''), 10)
                      if (isNaN(n) || n < 0) {
                        r.setVal('0')
                        r.setN(0)
                      }
                    }}
                    className="w-28 px-3 py-2 border border-neutral-300 rounded-lg text-sm font-medium text-neutral-700 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-right"
                  />
                  <span className="text-sm text-neutral-500">€</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* COLONNE DROITE — RÉSULTATS */}
      <div className="space-y-6">

        {/* Économie fiscale — résultat principal */}
        <div className={`rounded-xl border-2 p-6 ${
          tmi === 0 ? 'bg-neutral-50 border-neutral-300' :
          economieFiscale > 0 ? 'bg-green-50 border-green-300' : 'bg-neutral-50 border-neutral-300'
        }`}>
          <div className="mb-4">
            <h3 className="text-lg font-bold text-neutral-900 mb-1">Économie d'impôt</h3>
            <p className="text-xs text-neutral-500">Sur la part déductible du versement</p>
          </div>
          <div className="text-5xl font-bold text-green-700 mb-6">
            {formatEur(economieFiscale)}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-neutral-500 mb-1">Coût net réel</div>
              <div className="text-2xl font-bold text-neutral-900">
                {formatEur(coutNetReel)}
              </div>
            </div>
            <div>
              <div className="text-xs text-neutral-500 mb-1">Rendement fiscal</div>
              <div className="text-2xl font-bold text-neutral-900">
                {rendementFiscal.toFixed(1)} %
              </div>
            </div>
          </div>
        </div>

        {/* Détail du plafond */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-neutral-900 mb-4">
            Détail du plafond de déduction
          </h3>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-neutral-600">
              <span>Salaire net N-1</span>
              <span className="font-medium">{formatEur(salaire)}</span>
            </div>
            <div className="flex justify-between text-neutral-600">
              <span>Abattement frais pro (10 %)</span>
              <span className="font-medium text-neutral-500">− {formatEur(detail.abattementFraisPro)}</span>
            </div>
            <div className="flex justify-between font-medium pt-1 border-t border-neutral-200">
              <span className="text-neutral-700">Revenu net professionnel retenu</span>
              <span>{formatEur(detail.revenuNetProfessionnel)}</span>
            </div>

            <div className="flex justify-between text-neutral-600 pt-2">
              <span>Plafond annuel (10 % du revenu net)</span>
              <span className="font-medium">{formatEur(detail.plafondAnnuel)}</span>
            </div>
            {detail.plafondsReportesTotal > 0 && (
              <div className="flex justify-between text-neutral-600">
                <span>Reports N-1 / N-2 / N-3</span>
                <span className="font-medium">+ {formatEur(detail.plafondsReportesTotal)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold pt-1 border-t-2 border-neutral-300 text-base">
              <span className="text-neutral-900">Plafond total disponible</span>
              <span className="text-primary-700">{formatEur(detail.plafondTotal)}</span>
            </div>

            <div className="pt-3 border-t border-neutral-200 space-y-2">
              <div className="flex justify-between text-neutral-600">
                <span>Versement envisagé</span>
                <span className="font-medium">{formatEur(versement)}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span className={detail.partNonDeductible > 0 ? 'text-red-700' : 'text-neutral-700'}>
                  Part déductible
                </span>
                <span className={detail.partNonDeductible > 0 ? 'text-red-700' : 'text-green-700'}>
                  {formatEur(detail.montantDeductible)}
                </span>
              </div>
              {detail.partNonDeductible > 0 && (
                <div className="flex justify-between text-sm text-red-600">
                  <span>Part non déductible</span>
                  <span className="font-medium">{formatEur(detail.partNonDeductible)}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Warnings */}
        {warnings.length > 0 && (
          <div className="space-y-3">
            {warnings.map((w, i) => (
              <div
                key={i}
                className={`rounded-xl p-4 border-2 ${
                  w.type === 'danger'
                    ? 'bg-red-50 border-red-300'
                    : w.type === 'warning'
                    ? 'bg-orange-50 border-orange-300'
                    : 'bg-blue-50 border-blue-300'
                }`}
              >
                <p className={`text-sm leading-relaxed ${
                  w.type === 'danger' ? 'text-red-800'
                  : w.type === 'warning' ? 'text-orange-800'
                  : 'text-blue-800'
                }`}>
                  {w.message}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Optimisations */}
        {optimisations.length > 0 && (
          <div className="space-y-3">
            {optimisations.map((o, i) => (
              <div
                key={i}
                className={`rounded-xl p-4 border-2 ${
                  o.type === 'success' ? 'bg-green-50 border-green-300' : 'bg-blue-50 border-blue-300'
                }`}
              >
                <p className={`text-sm leading-relaxed ${
                  o.type === 'success' ? 'text-green-800' : 'text-blue-800'
                }`}>
                  {o.message}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
