// src/components/Calculator/RenteCalculator.tsx
'use client'

import { useMemo, useEffect } from 'react'
import { calculateAnnuity } from '@/lib/mortality'
import { formatEurRounded as formatEuro, formatNombre } from '@/lib/formatters'
import type { AnnuityResult } from '@/types'
// PERF: framer-motion supprimé → animations CSS natives (.perf-fade-in, .perf-expand)
import Tooltip from '@/components/Tooltip'
import ProjectionChart from '@/components/ProjectionChart'
import Icon from '@/components/Icon'
import ChatWidget from '@/components/ChatWidget'
import CrossLink from '@/components/CrossLink'
import SimResumeBanner from '@/components/Calculator/SimResumeBanner'
import { useNumericInput } from '@/hooks/useNumericInput'
import { saveSimHistory, useSimStorage } from '@/hooks/useSimStorage'
import { LIMITS, DEFAULT_VALUES } from '@/lib/constants'

// ---------------------------------------------------------------------------
// Composant interne : Comparateur de scénarios d'âge de départ
// Montre l'impact de partir 4 ans plus tard sur la rente mensuelle
// ---------------------------------------------------------------------------
interface AgeScenarioComparisonProps {
  capital: number
  currentAge: number
  reversion: { enabled: false } | { enabled: true; spouse_age: number; percentage: 60 | 80 | 100 }
}

function AgeScenarioComparison({ capital, currentAge, reversion }: AgeScenarioComparisonProps) {
  const laterAge = Math.min(currentAge + 4, LIMITS.AGE_MAX)
  const laterResult = useMemo(
    () => calculateAnnuity({ age: laterAge, capital, reversion }),
    [laterAge, capital, reversion]
  )
  const currentResult = useMemo(
    () => calculateAnnuity({ age: currentAge, capital, reversion }),
    [currentAge, capital, reversion]
  )

  if (!laterResult || !currentResult) return null
  const diff = laterResult.monthly_amount - currentResult.monthly_amount
  if (diff <= 0) return null

  return (
    <div className="mt-6 bg-neutral-50 border border-neutral-200 p-4">
      <p className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-3">
        Scénario — départ à {laterAge} ans
      </p>
      <div className="flex items-baseline gap-3">
        <span className="text-2xl font-bold tabular-nums text-neutral-900">
          {formatEuro(laterResult.monthly_amount)}
        </span>
        <span className="text-sm text-neutral-500">/ mois</span>
        <span className="font-mono text-sm text-green-700 font-medium">
          +{formatEuro(diff)}/mois vs {currentAge} ans
        </span>
      </div>
      <p className="text-xs text-neutral-400 mt-1">
        Attendre {laterAge - currentAge} ans génère {formatEuro(diff * 12)}/an supplémentaires à vie.
      </p>
    </div>
  )
}

// ---------------------------------------------------------------------------

interface RenteSimState {
  age: number
  capital: number
  showReversion: boolean
  spouseAge: number
  reversionPercentage: 60 | 80 | 100
}

export default function RenteCalculator() {
  const [simState, setSimState, resetSimState] = useSimStorage<RenteSimState>('rente-viagere', {
    age: DEFAULT_VALUES.AGE,
    capital: DEFAULT_VALUES.CAPITAL,
    showReversion: false,
    spouseAge: DEFAULT_VALUES.AGE - DEFAULT_VALUES.SPOUSE_AGE_DIFF,
    reversionPercentage: 60,
  })

  const capitalInput = useNumericInput(simState.capital, {
    min: LIMITS.CAPITAL_MIN,
    max: LIMITS.CAPITAL_MAX,
    format: formatNombre,
  })

  useEffect(() => {
    setSimState(prev => ({ ...prev, capital: capitalInput.value }))
  }, [capitalInput.value]) // setSimState is stable

  const result = useMemo<AnnuityResult | null>(() => calculateAnnuity({
    age: simState.age,
    capital: capitalInput.value,
    reversion: simState.showReversion
      ? { enabled: true, spouse_age: simState.spouseAge, percentage: simState.reversionPercentage }
      : { enabled: false },
  }), [simState.age, capitalInput.value, simState.showReversion, simState.spouseAge, simState.reversionPercentage])

  useEffect(() => {
    if (!result || result.monthly_amount <= 0) return
    saveSimHistory({
      slug: 'rente-viagere',
      nom: 'Rente Viagère',
      href: '/rente-viagere',
      resume: `Rente : ${formatEuro(result.monthly_amount)}/mois · Capital : ${formatNombre(capitalInput.value)} €`,
      date: new Date().toISOString(),
    })
  }, [result?.monthly_amount, capitalInput.value])

 return (
 <>
 <SimResumeBanner slug="rente-viagere" onReset={resetSimState} />
 <div className="max-w-6xl mx-auto" suppressHydrationWarning>
 {/* Zone formulaire */}
  <div className="bg-neutral-100 rounded-lg shadow-md p-5 sm:p-8 mb-6 border-l-4 border-primary-600" suppressHydrationWarning>
  <div className="mb-6">
    <h2 className="text-2xl font-semibold text-neutral-900 mb-2">
      Calculez votre rente viagère
    </h2>
    <p className="text-sm text-neutral-600">
      Simulation basée sur les tables de mortalité INSEE 2021
    </p>
  </div>
 {/* Âge */}
 <div className="mb-6">
 <div className="flex flex-wrap justify-between items-center gap-2 mb-2">
 <label className="text-sm text-neutral-600">Votre âge</label>
 <div className="flex items-center gap-2">
 <input
 type="number"
 min={LIMITS.AGE_MIN}
 max={LIMITS.AGE_MAX}
 value={simState.age}
 onChange={(e) => {
 const val = e.target.value
 if (val === '' || !isNaN(Number(val))) {
 setSimState(prev => ({ ...prev, age: val === '' ? LIMITS.AGE_MIN : Number(val) }))
 }
 }}
 onBlur={(e) => {
 const val = Number(e.target.value)
 if (isNaN(val) || val < LIMITS.AGE_MIN) setSimState(prev => ({ ...prev, age: LIMITS.AGE_MIN }))
 else if (val > LIMITS.AGE_MAX) setSimState(prev => ({ ...prev, age: LIMITS.AGE_MAX }))
 }}
 onFocus={(e) => e.target.select()}
 className="w-20 px-3 py-1 text-lg font-medium text-center border border-neutral-300 rounded-lg
 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
 />
 <span className="text-lg font-medium text-neutral-600">ans</span>
 </div>
 </div>
 <input
 type="range"
 min={LIMITS.AGE_MIN}
 max={LIMITS.AGE_MAX}
 step={1}
 value={simState.age}
 onChange={(e) => setSimState(prev => ({ ...prev, age: Number(e.target.value) }))}
 className="w-full"
 />
 <div className="flex justify-between text-xs text-neutral-400 mt-1">
 <span>{LIMITS.AGE_MIN} ans</span>
 <span>{LIMITS.AGE_MAX} ans</span>
 </div>
 </div>

 {/* Capital */}
 <div className="mb-6">
 <div className="flex flex-wrap justify-between items-center gap-2 mb-2">
 <label className="text-sm text-neutral-600 flex items-center">
 Capital disponible
 <Tooltip content="Montant à convertir en rente. La fiscalité dépend de l'origine du capital : si c'est une assurance-vie, seule une fraction est imposable (30 % à 70 % selon votre âge) ; si c'est un PER déduit à l'entrée, la rente est imposée comme une pension de retraite (abattement 10 %)." />
 </label>
 <div className="flex items-center gap-2">
 <input
 type="text"
 inputMode="numeric"
 value={capitalInput.display}
 onChange={(e) => capitalInput.onChange(e.target.value)}
 onBlur={capitalInput.onBlur}
 onFocus={(e) => e.target.select()}
 className="w-28 sm:w-40 px-3 py-1 text-lg font-medium text-right border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
 />
 <span className="text-lg font-medium text-neutral-600">€</span>
 </div>
 </div>
 <input
 type="range"
 min={LIMITS.CAPITAL_MIN}
 max={LIMITS.CAPITAL_MAX}
 step={LIMITS.CAPITAL_STEP}
 value={capitalInput.value}
 onChange={(e) => capitalInput.set(Number(e.target.value))}
 className="w-full"
 />
 <div className="flex justify-between text-xs text-neutral-400 mt-1">
 <span>10 k€</span>
 <span>500 k€</span>
 </div>
 </div>

 {/* Note pédagogique table unisexe */}
 <div className="mb-6 p-4 bg-primary-50 border border-primary-200 rounded-lg">
 <p className="text-sm text-primary-900 font-semibold mb-1">
 Table de mortalité unisexe (réglementation 2012)
 </p>
 <p className="text-sm text-primary-900">
 Depuis décembre 2012, les assureurs utilisent une table unique pour hommes et
 femmes (moyenne pondérée). Ce calculateur applique cette réglementation obligatoire
 (arrêt CJUE mars 2011).
 </p>
 </div>

 {/* Réversion au conjoint */}
 <div className="border-t pt-6 mt-6">
 <div className="bg-primary-50 rounded-lg border-l-4 border-primary-300 p-6">
 <div className="flex items-start justify-between mb-4">
 <div className="flex-1">
 <h3 className="text-lg font-medium text-neutral-900 flex items-center mb-2">
 Réversion au conjoint
 <Tooltip content="Permet à votre conjoint de continuer à percevoir une partie de la rente (60%, 80% ou 100%) après votre décès. Votre rente sera légèrement réduite en contrepartie de cette garantie." />
 </h3>
 <p className="text-sm text-neutral-600">
 Garantir un revenu à votre conjoint après votre décès
 </p>
 </div>
 <button
 onClick={() => setSimState(prev => ({ ...prev, showReversion: !prev.showReversion }))}
 className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
 simState.showReversion ? 'bg-primary-600' : 'bg-neutral-300'
 }`}
 aria-label="Activer réversion"
>
 <span
 className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
 simState.showReversion ? 'translate-x-7' : 'translate-x-1'
 }`}
 />
 </button>
 </div>
 {simState.showReversion && (
 <div className="overflow-hidden perf-fade-in"
>
 <div className="border-t border-primary-200 pt-4 mt-2">
 <div className="bg-white/50 rounded-lg p-4 mb-4">
 <p className="text-xs text-primary-900">
 <strong>Comment ça marche ?</strong>{' '}Votre rente sera légèrement réduite,
 mais votre conjoint continuera à recevoir {simState.reversionPercentage}% après votre décès.
 </p>
 </div>

 {/* Âge conjoint */}
 <div className="mb-4">
 <div className="flex justify-between items-center mb-2">
 <label className="text-sm font-medium text-neutral-700">Âge du conjoint</label>
 <div className="flex items-center gap-2">
 <input
 type="number"
 min={LIMITS.AGE_MIN}
 max={LIMITS.AGE_MAX}
 value={simState.spouseAge}
 onChange={(e) => {
 const val = e.target.value
 if (val === '' || !isNaN(Number(val))) {
 setSimState(prev => ({ ...prev, spouseAge: val === '' ? LIMITS.AGE_MIN : Number(val) }))
 }
 }}
 onBlur={(e) => {
 const val = Number(e.target.value)
 if (isNaN(val) || val < LIMITS.AGE_MIN) setSimState(prev => ({ ...prev, spouseAge: LIMITS.AGE_MIN }))
 else if (val > LIMITS.AGE_MAX) setSimState(prev => ({ ...prev, spouseAge: LIMITS.AGE_MAX }))
 }}
 onFocus={(e) => e.target.select()}
 className="w-16 px-2 py-1 text-sm font-medium text-center border border-primary-300 rounded-lg
 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
 />
 <span className="text-sm font-medium text-neutral-600">ans</span>
 </div>
 </div>
 <input
 type="range"
 min={LIMITS.AGE_MIN}
 max={LIMITS.AGE_MAX}
 step={1}
 value={simState.spouseAge}
 onChange={(e) => setSimState(prev => ({ ...prev, spouseAge: Number(e.target.value) }))}
 className="w-full"
 />
 </div>

 {/* Pourcentage réversion */}
 <div>
 <label className="text-sm font-medium text-neutral-700 flex items-center mb-3">
 Pourcentage de réversion
 <Tooltip content="Part de votre rente que votre conjoint continuera à percevoir après votre décès. Plus le pourcentage est élevé, plus votre rente initiale sera réduite." />
 </label>
 <div className="grid grid-cols-3 gap-3">
 {([60, 80, 100] as const).map((pct) => (
 <button
 key={pct}
 onClick={() => setSimState(prev => ({ ...prev, reversionPercentage: pct }))}
 className={`py-3 px-4 rounded-lg border-2 text-sm font-medium transition-all ${
 simState.reversionPercentage === pct
 ? 'border-primary-600 bg-primary-100 text-primary-900 shadow-sm'
 : 'border-neutral-200 hover:border-primary-300 hover:bg-primary-50'
 }`}
>
 {pct}%
 </button>
 ))}
 </div>
 <p className="text-xs text-neutral-500 mt-2">
 {simState.reversionPercentage === 60 && 'Rente couple maximale, protection modérée'}
 {simState.reversionPercentage === 80 && 'Équilibre entre les deux (le plus courant)'}
 {simState.reversionPercentage === 100 && 'Protection maximale du conjoint'}
 </p>
 </div>
 </div>
 </div>
 )}
 </div>
 </div>
 </div>

 {/* Zone résultat */}
 {result && (
 <div className="bg-white rounded-lg shadow-lg p-5 sm:p-8 border-t-4 border-primary-600 perf-fade-in"
>
 <h3 className="text-xl font-semibold text-neutral-900 mb-6">Votre rente viagère estimée</h3>

 <div className="mb-8">
 <div key={result.monthly_amount} className="flex items-baseline gap-2 perf-fade-in"
>
 <span className="text-4xl sm:text-6xl font-bold tabular-nums text-neutral-900 tracking-tight">
 {formatEuro(result.monthly_amount)}
 </span>
 <span className="text-xl text-neutral-600 font-medium">/ mois</span>
 </div>
 <div className="text-sm text-neutral-500 mt-2">Rente mensuelle garantie à vie</div>
 </div>

 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-6 border-b border-neutral-200">
 <div className="bg-neutral-50 rounded-md p-4">
 <div className="text-xs text-neutral-600 font-medium mb-1">Espérance de vie</div>
 <div className="text-2xl font-semibold tabular-nums text-neutral-900">
 {result.life_expectancy.toFixed(1)} ans
 </div>
 </div>
 <div className="bg-neutral-50 rounded-md p-4">
 <div className="text-xs text-neutral-600 font-medium mb-1">Total espéré</div>
 <div className="text-2xl font-semibold tabular-nums text-neutral-900">
 {formatEuro(result.total_expected_payout)}
 </div>
 </div>
 </div>

 {result.with_reversion && (
 <div className="mt-6 bg-primary-50 border border-primary-200 rounded-lg p-4">
 <div className="text-xs text-primary-900 mb-2 font-medium">
 Avec réversion {simState.reversionPercentage}%
 </div>
 <div className="text-sm text-primary-900">
 Après votre décès, votre conjoint percevra{' '}
 <strong>{formatEuro(result.with_reversion.spouse_monthly_amount)}/mois</strong>
 </div>
 </div>
 )}

 {/* Comparateur de scénarios d'âge */}
 {simState.age < 75 && (
   <AgeScenarioComparison
     capital={capitalInput.value}
     currentAge={simState.age}
     reversion={simState.showReversion ? { enabled: true, spouse_age: simState.spouseAge, percentage: simState.reversionPercentage } : { enabled: false }}
   />
 )}
 </div>
 )}

 {/* Graphique de projection */}
 {result && (
 <div className="mt-6 bg-white rounded-lg shadow-lg p-4 sm:p-8 border border-neutral-200 perf-fade-in" style={{ animationDelay: '100ms' }}
>
 <ProjectionChart
 capital={capitalInput.value}
 monthlyRent={result.monthly_amount}
 lifeExpectancy={result.life_expectancy}
 />
 </div>
 )}

 </div>
 {result && (
   <div className="mt-4 border-t border-neutral-200">
     <p className="font-mono text-xs uppercase tracking-widest text-neutral-400 px-1 pt-4 pb-2">
       Questions naturelles après ce résultat
     </p>
     <CrossLink
       href="/assurance-vie/fiscalite-rachat"
       title="Et si ce capital restait en assurance-vie ?"
       description="Fiscalité exacte d'un rachat partiel sur un contrat de {capital} — abattement, PFU vs barème."
       context={{ capital: formatNombre(capitalInput.value) + ' €' }}
     />
     <CrossLink
       href="/assurance-vie/transmission"
       title="Transmission après décès — Art. 990 I"
       description="Ce capital de {capital} transmis en assurance-vie : calcul des droits par bénéficiaire."
       context={{ capital: formatNombre(capitalInput.value) + ' €' }}
     />
     <CrossLink
       href="/tmi"
       title="Quelle est votre TMI ?"
       description="La rente de {rente}/mois s'ajoute à vos revenus — votre tranche marginale détermine l'impôt réel."
       context={{ rente: formatEuro(result.monthly_amount) }}
     />
   </div>
 )}
 {result && (
   <ChatWidget
     contexte={{
       calculateur: 'rente-viagere',
       inputs: {
         age: simState.age,
         capital: capitalInput.value,
         reversion: simState.showReversion
           ? { enabled: true, spouse_age: simState.spouseAge, percentage: simState.reversionPercentage }
           : { enabled: false },
       },
       results: result,
     }}
   />
 )}
 </>
 )
}
