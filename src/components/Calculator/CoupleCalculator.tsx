// src/components/Calculator/CoupleCalculator.tsx
'use client'

import { useState, useMemo } from 'react'
import { calculateCoupleStrategies } from '@/lib/mortality'
import { formatEurRounded as formatEuro, formatNombre as formatCapitalInput } from '@/lib/formatters'
import type { CoupleProfile, CoupleCalculation } from '@/types'
// PERF: framer-motion supprimé → animations CSS natives (.perf-fade-in, .perf-expand)
import LegalDisclaimer from '@/components/LegalDisclaimer'

export default function CoupleCalculator() {
 const [person1Age, setPerson1Age] = useState<number>(67)
 const [person2Age, setPerson2Age] = useState<number>(64)
 const [totalCapital, setTotalCapital] = useState<number>(180000)
 
 const parseCapitalInput = (value: string): number => Number(value.replace(/\s/g, ''))

 const strategies = useMemo<CoupleCalculation[]>(() => calculateCoupleStrategies({
   person1_age: person1Age,
   person2_age: person2Age,
   total_capital: totalCapital,
 }), [person1Age, person2Age, totalCapital])

 return (
 <div className="max-w-6xl mx-auto" suppressHydrationWarning>
 {/* Formulaire */}
 <div className="bg-neutral-100 rounded-lg shadow-md p-5 sm:p-8 mb-6 border-l-4 border-primary-600" suppressHydrationWarning>
 <h2 className="text-xl font-medium mb-2">Mode couple</h2>
 <p className="text-sm text-neutral-600 mb-6">
 Comparez 9 stratégies de rente pour un couple.
 </p>

 {/* Note épargne commune/séparée */}
 <div className="mb-6 p-4 bg-primary-50 border-l-4 border-primary-300 rounded-lg">
 <p className="text-sm text-primary-900">
 <strong>Épargne commune ou séparée ?</strong><br />
 Ce calculateur suppose que le capital total peut être alloué librement 
 entre les deux personnes (compte joint ou patrimoine commun).
 </p>
 <details className="mt-3">
 <summary className="text-xs text-primary-700 cursor-pointer hover:underline font-medium">
 ▸ En savoir plus sur la gestion de l&apos;épargne en couple
 </summary>
 <div className="mt-3 text-xs text-primary-900 space-y-2 pl-4 border-l-2 border-primary-300">
 <p>
 <strong>Capital commun (compte joint) :</strong>{' '}Peut être alloué 
 librement selon toutes les stratégies affichées ci-dessous.
 </p>
 <p>
 <strong>Contrats individuels séparés :</strong>{' '}Si Personne 1 a une assurance-vie 
 à son nom (100k€) et Personne 2 une autre (80k€), seules les stratégies 
 &quot;P1 seule&quot; et &quot;P2 seule&quot; sont directement applicables. Les autres 
 stratégies nécessiteraient de transférer les fonds sur un compte 
 commun avant conversion en rente.
 </p>
 <p className="font-semibold text-primary-900 mt-2">
 Selon le régime matrimonial (communauté, séparation de biens),
 les possibilités et implications fiscales/successorales diffèrent.
 </p>
 </div>
 </details>
 </div>

 {/* Note pédagogique */}
 <div className="mb-6 p-4 bg-primary-50 border border-primary-200 rounded-lg">
 <p className="text-sm text-primary-900">
 <strong>Table unisexe (réglementation 2012)</strong><br />
 Les calculs utilisent la table de mortalité unique obligatoire depuis décembre 2012.
 </p>
 </div>

 <div className="grid md:grid-cols-2 gap-6 mb-6">
 {/* Personne 1 */}
 <div className="border border-primary-200 rounded-lg p-6 bg-primary-50">
 <h3 className="font-medium text-primary-900 mb-4">Personne 1</h3>
 
 <div className="mb-4">
 <div className="flex flex-wrap justify-between items-center gap-2 mb-2">
 <label className="text-sm text-neutral-600">Âge</label>
 <div className="flex items-center gap-1">
 <input
 type="number"
 min="50"
 max="90"
 value={person1Age}
 onChange={(e) => {
 const val = e.target.value
 if (val === '' || !isNaN(Number(val))) {
 setPerson1Age(val === '' ? 50 : Number(val))
 }
 }}
 onBlur={(e) => {
 let val = Number(e.target.value)
 if (isNaN(val) || val < 50) val = 50
 if (val> 90) val = 90
 setPerson1Age(val)
 }}
 className="w-20 px-3 py-1 text-lg font-medium text-right border border-neutral-300 rounded-lg 
 focus:outline-none focus:ring-2 focus:ring-primary-500"
 />
 <span className="text-lg font-medium text-neutral-600">ans</span>
 </div>
 </div>
 <input
 type="range"
 min={50}
 max={90}
 step={1}
 value={person1Age}
 onChange={(e) => setPerson1Age(Number(e.target.value))}
 className="w-full"
 />
 <div className="flex justify-between text-xs text-neutral-400 mt-1">
 <span>50 ans</span>
 <span>90 ans</span>
 </div>
 </div>
 </div>

 {/* Personne 2 */}
 <div className="border-2 border-primary-400 rounded-lg p-6 bg-primary-100">
 <h3 className="font-medium text-primary-900 mb-4">Personne 2</h3>
 
 <div className="mb-4">
 <div className="flex flex-wrap justify-between items-center gap-2 mb-2">
 <label className="text-sm text-neutral-600">Âge</label>
 <div className="flex items-center gap-1">
 <input
 type="number"
 min="50"
 max="90"
 value={person2Age}
 onChange={(e) => {
 const val = e.target.value
 if (val === '' || !isNaN(Number(val))) {
 setPerson2Age(val === '' ? 50 : Number(val))
 }
 }}
 onBlur={(e) => {
 let val = Number(e.target.value)
 if (isNaN(val) || val < 50) val = 50
 if (val> 90) val = 90
 setPerson2Age(val)
 }}
 className="w-20 px-3 py-1 text-lg font-medium text-right border border-neutral-300 rounded-lg 
 focus:outline-none focus:ring-2 focus:ring-primary-500"
 />
 <span className="text-lg font-medium text-neutral-600">ans</span>
 </div>
 </div>
 <input
 type="range"
 min={50}
 max={90}
 step={1}
 value={person2Age}
 onChange={(e) => setPerson2Age(Number(e.target.value))}
 className="w-full"
 />
 <div className="flex justify-between text-xs text-neutral-400 mt-1">
 <span>50 ans</span>
 <span>90 ans</span>
 </div>
 </div>
 </div>
 </div>

 {/* Capital total */}
 <div className="mb-6">
 <div className="flex flex-wrap justify-between items-center gap-2 mb-2">
 <label className="text-sm text-neutral-600">Capital total du couple</label>
 <div className="flex items-center gap-2">
 <input
 type="text"
 inputMode="numeric"
 value={formatCapitalInput(totalCapital)}
 onChange={(e) => {
 const val = e.target.value.replace(/\s/g, '')
 if (val === '' || !isNaN(Number(val))) {
 setTotalCapital(val === '' ? 20000 : Number(val))
 }
 }}
 onBlur={(e) => {
 let val = parseCapitalInput(e.target.value)
 if (isNaN(val) || val < 20000) val = 20000
 if (val> 1000000) val = 1000000
 setTotalCapital(val)
 }}
 onFocus={(e) => e.target.select()}
 className="w-44 px-3 py-1 text-lg font-medium text-right border border-neutral-300 rounded-lg 
 focus:outline-none focus:ring-2 focus:ring-primary-500"
 />
 <span className="text-lg font-medium text-neutral-600">€</span>
 </div>
 </div>
 <input
 type="range"
 min={20000}
 max={1000000}
 step={10000}
 value={totalCapital}
 onChange={(e) => setTotalCapital(Number(e.target.value))}
 className="w-full"
 />
 <div className="flex justify-between text-xs text-neutral-400 mt-1">
 <span>20 k€</span>
 <span>1 M€</span>
 </div>
 </div>
 </div>

 {/* Résultats */}
 {strategies.length > 0 && (
 <div className="bg-white rounded-lg border border-neutral-200 p-8">
 <h3 className="text-xl font-semibold mb-2">Comparaison des 9 stratégies</h3>
 <p className="text-sm text-neutral-600 mb-6">
 Les 9 combinaisons de réversion possibles pour ce couple, classées par rente totale.
 </p>

 <div className="space-y-4">
 {strategies.map((strategy, index) => (
 <div key={index} className="border border-neutral-200 rounded-lg p-6 hover:border-primary-300 transition-colors perf-fade-in" style={{ animationDelay: `${index * 50}ms` }}
>
 <div className="flex items-start justify-between mb-3">
 <div>
 <h4 className="text-lg font-semibold text-neutral-900">
 {strategy.strategy}
 </h4>
 <p className="text-sm text-neutral-600 mt-1">
 {strategy.description}
 </p>
 </div>
 <div className="text-right">
 <div className="text-3xl font-bold text-primary-600">
 {formatEuro(strategy.monthly_amount)}
 </div>
 <div className="text-xs text-neutral-500">par mois</div>
 </div>
 </div>

 {strategy.life_expectancy && (
 <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-neutral-200 text-sm">
 <div>
 <span className="text-neutral-600">Espérance de vie : </span>
 <span className="font-medium">{strategy.life_expectancy.toFixed(1)} ans</span>
 </div>
 {strategy.total_payout && (
 <div>
 <span className="text-neutral-600">Total espéré : </span>
 <span className="font-medium">{formatEuro(strategy.total_payout)}</span>
 </div>
 )}
 </div>
 )}
 </div>
 ))}
 </div>

 {/* Note explicative réversion */}
 <div className="mt-6 p-4 bg-primary-50 border-l-4 border-primary-300 rounded-lg">
 <p className="text-sm text-primary-900">
 <strong>Important</strong> : La réversion est <strong>unidirectionnelle</strong>.
 Si &quot;P1 titulaire, 80% à P2&quot; : P1 décède → P2 reçoit 80%. Mais si P2 décède d&apos;abord → P1 garde 100%.
 </p>
 </div>

 <div className="mt-6">
 <LegalDisclaimer />
 </div>
 </div>
 )}

 </div>
 )
}
