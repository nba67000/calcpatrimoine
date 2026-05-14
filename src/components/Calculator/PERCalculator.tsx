'use client'

import { useMemo, useEffect } from 'react'
import Link from 'next/link'
import { calculerPER } from '@/lib/per'
import type { PERInputs, TMIOption } from '@/types/per'
import { formatEur } from '@/lib/formatters'
import { useNumericInput } from '@/hooks/useNumericInput'
import { saveSimHistory, useSimStorage } from '@/hooks/useSimStorage'
import AlertList from '@/components/AlertList'
import ChatWidget from '@/components/ChatWidget'
import CrossLink from '@/components/CrossLink'
import SimResumeBanner from '@/components/Calculator/SimResumeBanner'

// ---------------------------------------------------------------------------
// Composant interne : Scénario de versement alternatif
// Compare l'économie fiscale pour versement actuel vs 50% plus élevé (plafond max)
// ---------------------------------------------------------------------------
interface PERVersementScenarioProps {
  salaire: number
  tmi: TMIOption
  versementActuel: number
  rapports: { n1: number; n2: number; n3: number; n4: number; n5: number }
  plafondTotal: number
}

function PERVersementScenario({ salaire, tmi, versementActuel, rapports, plafondTotal }: PERVersementScenarioProps) {
  const versementAlternatif = Math.min(versementActuel * 2, plafondTotal)
  if (versementAlternatif <= versementActuel + 500) return null // trop proche, inutile

  const resultatAlt = useMemo(() => calculerPER({
    salaireNetAnnuel: salaire,
    tmi,
    versementEnvisage: versementAlternatif,
    plafondsReportesN1: rapports.n1,
    plafondsReportesN2: rapports.n2,
    plafondsReportesN3: rapports.n3,
    plafondsReportesN4: rapports.n4,
    plafondsReportesN5: rapports.n5,
  }), [salaire, tmi, versementAlternatif, rapports.n1, rapports.n2, rapports.n3, rapports.n4, rapports.n5])

  const economieAct = Math.round(Math.min(versementActuel, plafondTotal) * tmi / 100)
  const gainSuppl = resultatAlt.economieFiscale - economieAct
  if (gainSuppl <= 0) return null

  return (
    <div className="bg-neutral-50 border border-neutral-200 p-4">
      <p className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-3">
        Scénario : versement à {formatEur(versementAlternatif)}
      </p>
      <div className="flex items-baseline gap-3 flex-wrap">
        <span className="text-2xl font-bold tabular-nums text-green-700">
          {formatEur(resultatAlt.economieFiscale)}
        </span>
        <span className="font-mono text-sm text-green-700 font-medium">
          +{formatEur(gainSuppl)} d&apos;économie supplémentaire
        </span>
      </div>
      <p className="text-xs text-neutral-400 mt-1">
        Doubler le versement réduit le coût net réel à {formatEur(resultatAlt.coutNetReel)}.
      </p>
    </div>
  )
}

// ---------------------------------------------------------------------------

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
  plafondsReportesN4: 0,
  plafondsReportesN5: 0,
}

interface PERSimState {
  salaireNetAnnuel: number
  tmi: TMIOption
  versementEnvisage: number
  reportN1: number
  reportN2: number
  reportN3: number
  reportN4: number
  reportN5: number
}

export default function PERCalculator() {
  const [simState, setSimState, resetSimState] = useSimStorage<PERSimState>('per-individuel', {
    salaireNetAnnuel: DEFAULT_INPUTS.salaireNetAnnuel,
    tmi: DEFAULT_INPUTS.tmi,
    versementEnvisage: DEFAULT_INPUTS.versementEnvisage,
    reportN1: 0,
    reportN2: 0,
    reportN3: 0,
    reportN4: 0,
    reportN5: 0,
  })

  const salaire = useNumericInput(simState.salaireNetAnnuel, { min: 0, max: 500_000 })
  const versement = useNumericInput(simState.versementEnvisage, { min: 0, max: 200_000 })
  const reportN1 = useNumericInput(simState.reportN1, { min: 0, max: 200_000 })
  const reportN2 = useNumericInput(simState.reportN2, { min: 0, max: 200_000 })
  const reportN3 = useNumericInput(simState.reportN3, { min: 0, max: 200_000 })
  const reportN4 = useNumericInput(simState.reportN4, { min: 0, max: 200_000 })
  const reportN5 = useNumericInput(simState.reportN5, { min: 0, max: 200_000 })

  useEffect(() => {
    setSimState(prev => ({
      ...prev,
      salaireNetAnnuel: salaire.value,
      versementEnvisage: versement.value,
      reportN1: reportN1.value,
      reportN2: reportN2.value,
      reportN3: reportN3.value,
      reportN4: reportN4.value,
      reportN5: reportN5.value,
    }))
  }, [salaire.value, versement.value, reportN1.value, reportN2.value, reportN3.value, reportN4.value, reportN5.value]) // setSimState is stable

  const inputs: PERInputs = {
    salaireNetAnnuel: salaire.value,
    tmi: simState.tmi,
    versementEnvisage: versement.value,
    plafondsReportesN1: reportN1.value,
    plafondsReportesN2: reportN2.value,
    plafondsReportesN3: reportN3.value,
    plafondsReportesN4: reportN4.value,
    plafondsReportesN5: reportN5.value,
  }

  const results = useMemo(
    () => calculerPER(inputs),
    [salaire.value, simState.tmi, versement.value, reportN1.value, reportN2.value, reportN3.value, reportN4.value, reportN5.value]
  )

  const { detail, economieFiscale, coutNetReel, rendementFiscal, warnings, optimisations } = results

  useEffect(() => {
    if (economieFiscale <= 0) return
    saveSimHistory({
      slug: 'per-individuel',
      nom: 'PER Individuel',
      href: '/per-individuel',
      resume: `Économie : ${formatEur(economieFiscale)} · TMI ${simState.tmi} %`,
      date: new Date().toISOString(),
    })
  }, [economieFiscale, simState.tmi])

  return (
    <>
    <SimResumeBanner slug="per-individuel" onReset={resetSimState} />
    <div className="grid lg:grid-cols-2 gap-8">

      {/* COLONNE GAUCHE - INPUTS */}
      <div className="space-y-6">

        {/* Salaire net annuel */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
          <h3 className="text-xl font-bold text-neutral-900 mb-2">
            Salaire net annuel (N-1)
          </h3>
          <p className="text-xs text-neutral-500 mb-4">
            Le salaire net reçu l&apos;an dernier, tel qu&apos;il apparaît sur votre bulletin de décembre ou votre déclaration d&apos;impôts. L&apos;abattement de 10 % pour frais professionnels est déduit automatiquement.
          </p>

          <div className="mb-4">
            <div className="flex items-baseline gap-3 mb-3">
              <input
                type="text"
                inputMode="numeric"
                value={salaire.display}
                onChange={(e) => salaire.onChange(e.target.value)}
                onBlur={salaire.onBlur}
                className="w-40 px-4 py-3 border border-neutral-300 rounded-lg text-2xl font-bold text-primary-700 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-right"
              />
              <span className="text-2xl font-bold text-neutral-600">€</span>
            </div>
            <input
              type="range"
              min="0"
              max="300000"
              step="1000"
              value={salaire.value}
              onChange={(e) => salaire.set(Number(e.target.value))}
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
                Tranche marginale d&apos;imposition
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
                onClick={() => setSimState(prev => ({ ...prev, tmi: opt.value }))}
                className={`px-5 py-3 rounded-lg font-bold text-sm transition-all border-2 ${
                  simState.tmi === opt.value
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
                value={versement.display}
                onChange={(e) => versement.onChange(e.target.value)}
                onBlur={versement.onBlur}
                className="w-40 px-4 py-3 border border-neutral-300 rounded-lg text-2xl font-bold text-primary-700 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-right"
              />
              <span className="text-2xl font-bold text-neutral-600">€</span>
            </div>
            <input
              type="range"
              min="0"
              max="50000"
              step="100"
              value={versement.value}
              onChange={(e) => versement.set(Number(e.target.value))}
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
            Ces montants figurent sur votre avis d&apos;imposition, rubrique &quot;Plafonds disponibles pour les versements retraite&quot;. Laissez à 0 si vous n&apos;avez pas d&apos;information.
          </p>

          <div className="space-y-3">
            {([
              { label: 'Report N-1 (2024)', field: reportN1 },
              { label: 'Report N-2 (2023)', field: reportN2 },
              { label: 'Report N-3 (2022)', field: reportN3 },
              { label: 'Report N-4 (2021)', field: reportN4 },
              { label: 'Report N-5 (2020)', field: reportN5 },
            ] as const).map((r) => (
              <div key={r.label} className="flex items-center gap-3">
                <label className="text-sm text-neutral-600 w-36 flex-shrink-0">{r.label}</label>
                <div className="flex items-baseline gap-2">
                  <input
                    type="text"
                    inputMode="numeric"
                    value={r.field.display}
                    onChange={(e) => r.field.onChange(e.target.value)}
                    onBlur={r.field.onBlur}
                    className="w-28 px-3 py-2 border border-neutral-300 rounded-lg text-sm font-medium text-neutral-700 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-right"
                  />
                  <span className="text-sm text-neutral-500">€</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* COLONNE DROITE - RÉSULTATS */}
      <div className="space-y-6">

        {/* Économie fiscale - résultat principal */}
        <div className={`rounded-xl border-2 p-6 ${
          simState.tmi === 0 ? 'bg-neutral-50 border-neutral-300' :
          economieFiscale > 0 ? 'bg-green-50 border-green-300' : 'bg-neutral-50 border-neutral-300'
        }`}>
          <div className="mb-4">
            <h3 className="text-lg font-bold text-neutral-900 mb-1">Économie d&apos;impôt</h3>
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
              <span className="font-medium">{formatEur(salaire.value)}</span>
            </div>
            <div className="flex justify-between text-neutral-600">
              <span>Abattement frais pro (10 %)</span>
              <span className="font-medium text-neutral-500">− {formatEur(detail.abattementFraisPro)}</span>
            </div>
            <div className="flex justify-between font-medium pt-1 border-t border-neutral-200">
              <span className="text-neutral-700">Salaire après abattement frais pro</span>
              <span>{formatEur(detail.revenuNetProfessionnel)}</span>
            </div>

            <div className="flex justify-between text-neutral-600 pt-2">
              <span>Plafond annuel (10 % du revenu net)</span>
              <span className="font-medium">{formatEur(detail.plafondAnnuel)}</span>
            </div>
            {detail.plafondsReportesTotal > 0 && (
              <div className="flex justify-between text-neutral-600">
                <span>Reports N-1 à N-5</span>
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
                <span className="font-medium">{formatEur(versement.value)}</span>
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

        <AlertList items={warnings} />
        <AlertList items={optimisations} />

        {/* Scénario : impact d'un versement différent */}
        {simState.tmi > 0 && economieFiscale > 0 && versement.value > 0 && (
          <PERVersementScenario
            salaire={salaire.value}
            tmi={simState.tmi}
            versementActuel={versement.value}
            rapports={{
              n1: reportN1.value, n2: reportN2.value, n3: reportN3.value,
              n4: reportN4.value, n5: reportN5.value,
            }}
            plafondTotal={detail.plafondTotal}
          />
        )}

      </div>
    </div>

    {economieFiscale > 0 && (
      <div className="mt-4 border-t border-neutral-200">
        <p className="font-mono text-xs uppercase tracking-widest text-neutral-400 px-1 pt-4 pb-2">
          Questions naturelles après ce résultat
        </p>
        <CrossLink
          href="/tmi"
          title="Vérifier votre TMI : le calcul change si vous êtes à la limite d'une tranche"
          description="Un versement PER de {versement} réduit votre revenu imposable. Votre TMI réelle après versement peut différer."
          context={{ versement: formatEur(versement.value) }}
        />
        <CrossLink
          href="/assurance-vie/fiscalite-rachat"
          title="Comparer avec un rachat d'assurance-vie à ce niveau de revenus"
          description="PFU vs barème sur un rachat assurance-vie : l'écart dépend de votre TMI à {tmi} %."
          context={{ tmi: simState.tmi }}
        />
        <CrossLink
          href="/rente-viagere"
          title="Ce que deviendra ce capital converti en rente à la retraite"
          description="Économie fiscale de {economie} réinvestie : simulation de la rente viagère au moment de la liquidation."
          context={{ economie: formatEur(economieFiscale) }}
        />
      </div>
    )}

    <ChatWidget contexte={{ calculateur: 'per-individuel', inputs, results }} />
    </>
  )
}
