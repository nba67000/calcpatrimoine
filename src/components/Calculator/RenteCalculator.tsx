// src/components/Calculator/RenteCalculator.tsx
'use client'

import { useState, useMemo, useEffect } from 'react'
import { calculateAnnuity } from '@/lib/mortality'
import { formatEurRounded as formatEuro, formatNombre } from '@/lib/formatters'
import type { AnnuityResult } from '@/types'
import { motion, AnimatePresence } from 'framer-motion'
import Tooltip from '@/components/Tooltip'
import ProjectionChart from '@/components/ProjectionChart'
import Icon from '@/components/Icon'
import ChatWidget from '@/components/ChatWidget'
import { useNumericInput } from '@/hooks/useNumericInput'
import { saveSimHistory } from '@/hooks/useSimStorage'
import { LIMITS, DEFAULT_VALUES } from '@/lib/constants'

export default function RenteCalculator() {
 const [age, setAge] = useState<number>(DEFAULT_VALUES.AGE)
 const capitalInput = useNumericInput(DEFAULT_VALUES.CAPITAL, {
   min: LIMITS.CAPITAL_MIN,
   max: LIMITS.CAPITAL_MAX,
   format: formatNombre,
 })
 const [showReversion, setShowReversion] = useState(false)
 const [spouseAge, setSpouseAge] = useState<number>(DEFAULT_VALUES.AGE - DEFAULT_VALUES.SPOUSE_AGE_DIFF)
 const [reversionPercentage, setReversionPercentage] = useState<60 | 80 | 100>(60)

 const result = useMemo<AnnuityResult | null>(() => calculateAnnuity({
   age,
   capital: capitalInput.value,
   reversion: showReversion
     ? { enabled: true, spouse_age: spouseAge, percentage: reversionPercentage }
     : { enabled: false },
 }), [age, capitalInput.value, showReversion, spouseAge, reversionPercentage])

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
 <div className="max-w-4xl mx-auto" suppressHydrationWarning>
 {/* Zone formulaire */}
 <div className="bg-neutral-100 rounded-lg shadow-md p-5 sm:p-8 mb-6 border-l-4 border-primary-600" suppressHydrationWarning>
 <h2 className="text-2xl font-semibold text-neutral-900 mb-2">Calculez votre rente viagère</h2>
 <p className="text-sm text-neutral-600 mb-6">Simulation basée sur les tables de mortalité INSEE 2021</p>
 
 {/* Âge */}
 <div className="mb-6">
 <div className="flex flex-wrap justify-between items-center gap-2 mb-2">
 <label className="text-sm text-neutral-600">Votre âge</label>
 <div className="flex items-center gap-2">
 <input
 type="number"
 min={LIMITS.AGE_MIN}
 max={LIMITS.AGE_MAX}
 value={age}
 onChange={(e) => {
 const val = e.target.value
 if (val === '' || !isNaN(Number(val))) {
 setAge(val === '' ? LIMITS.AGE_MIN : Number(val))
 }
 }}
 onBlur={(e) => {
 const val = Number(e.target.value)
 if (isNaN(val) || val < LIMITS.AGE_MIN) setAge(LIMITS.AGE_MIN)
 else if (val > LIMITS.AGE_MAX) setAge(LIMITS.AGE_MAX)
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
 value={age}
 onChange={(e) => setAge(Number(e.target.value))}
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
 <Tooltip content="Montant à convertir en rente viagère. La fiscalité varie selon l'origine : assurance-vie ou capital propre → fraction imposable selon l'âge (30–70 %) ; PER avec versements déduits → imposé comme une pension (abattement 10 %)." />
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
 onClick={() => setShowReversion(!showReversion)}
 className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
 showReversion ? 'bg-primary-600' : 'bg-neutral-300'
 }`}
 aria-label="Activer réversion"
>
 <span
 className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
 showReversion ? 'translate-x-7' : 'translate-x-1'
 }`}
 />
 </button>
 </div>

 <AnimatePresence>
 {showReversion && (
 <motion.div
 initial={{ height: 0, opacity: 0 }}
 animate={{ height: 'auto', opacity: 1 }}
 exit={{ height: 0, opacity: 0 }}
 transition={{ duration: 0.3 }}
 className="overflow-hidden"
>
 <div className="border-t border-primary-200 pt-4 mt-2">
 <div className="bg-white/50 rounded-lg p-4 mb-4">
 <p className="text-xs text-primary-900">
 <strong>Comment ça marche ?</strong>{' '}Votre rente sera légèrement réduite,
 mais votre conjoint continuera à recevoir {reversionPercentage}% après votre décès.
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
 value={spouseAge}
 onChange={(e) => {
 const val = e.target.value
 if (val === '' || !isNaN(Number(val))) {
 setSpouseAge(val === '' ? LIMITS.AGE_MIN : Number(val))
 }
 }}
 onBlur={(e) => {
 const val = Number(e.target.value)
 if (isNaN(val) || val < LIMITS.AGE_MIN) setSpouseAge(LIMITS.AGE_MIN)
 else if (val > LIMITS.AGE_MAX) setSpouseAge(LIMITS.AGE_MAX)
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
 value={spouseAge}
 onChange={(e) => setSpouseAge(Number(e.target.value))}
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
 onClick={() => setReversionPercentage(pct)}
 className={`py-3 px-4 rounded-lg border-2 text-sm font-medium transition-all ${
 reversionPercentage === pct
 ? 'border-primary-600 bg-primary-100 text-primary-900 shadow-sm'
 : 'border-neutral-200 hover:border-primary-300 hover:bg-primary-50'
 }`}
>
 {pct}%
 </button>
 ))}
 </div>
 <p className="text-xs text-neutral-500 mt-2">
 {reversionPercentage === 60 && 'Rente couple maximale, protection modérée'}
 {reversionPercentage === 80 && 'Équilibre entre les deux (le plus courant)'}
 {reversionPercentage === 100 && 'Protection maximale du conjoint'}
 </p>
 </div>
 </div>
 </motion.div>
 )}
 </AnimatePresence>
 </div>
 </div>
 </div>

 {/* Zone résultat */}
 {result && (
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.3 }}
 className="bg-white rounded-lg shadow-lg p-5 sm:p-8 border-t-4 border-primary-600"
>
 <h3 className="text-xl font-semibold text-neutral-900 mb-6">Votre rente viagère estimée</h3>
 
 <div className="mb-8">
 <motion.div
 key={result.monthly_amount}
 initial={{ y: 10, opacity: 0 }}
 animate={{ y: 0, opacity: 1 }}
 transition={{ duration: 0.2 }}
 className="flex items-baseline gap-2"
>
 <span className="text-4xl sm:text-6xl font-bold tabular-nums text-neutral-900 tracking-tight">
 {formatEuro(result.monthly_amount)}
 </span>
 <span className="text-xl text-neutral-600 font-medium">/ mois</span>
 </motion.div>
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
 Avec réversion {reversionPercentage}%
 </div>
 <div className="text-sm text-primary-900">
 Après votre décès, votre conjoint percevra{' '}
 <strong>{formatEuro(result.with_reversion.spouse_monthly_amount)}/mois</strong>
 </div>
 </div>
 )}
 </motion.div>
 )}

 {/* Graphique de projection */}
 {result && (
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.3, delay: 0.1 }}
 className="mt-6 bg-white rounded-lg shadow-lg p-4 sm:p-8 border border-neutral-200"
>
 <ProjectionChart
 capital={capitalInput.value}
 monthlyRent={result.monthly_amount}
 lifeExpectancy={result.life_expectancy}
 />
 </motion.div>
 )}

 {/* Bloc disclaimer - SEULE AUTRE COULEUR (warning orange) */}
 {result && (
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.3, delay: 0.2 }}
 className="mt-6 p-6 bg-warning-50 border-2 border-warning-300 rounded-lg"
>
 <h4 className="text-base font-bold text-warning-900 mb-3 flex items-center gap-2">
 <Icon name="warning" size={22} />
 Avertissement important
 </h4>
 
 <div className="text-sm text-warning-900 space-y-3">
 <p className="font-semibold">
 CalculPatrimoine est un outil pédagogique gratuit à titre indicatif uniquement. 
 Il ne constitue en aucun cas :
 </p>
 
 <ul className="space-y-1.5 ml-1">
 <li className="flex items-start gap-2">
 <Icon name="cross" size={16} className="mt-0.5" />
 <span>Un conseil en investissement personnalisé</span>
 </li>
 <li className="flex items-start gap-2">
 <Icon name="cross" size={16} className="mt-0.5" />
 <span>Une recommandation de souscription</span>
 </li>
 <li className="flex items-start gap-2">
 <Icon name="cross" size={16} className="mt-0.5" />
 <span>Une garantie de résultat</span>
 </li>
 <li className="flex items-start gap-2">
 <Icon name="cross" size={16} className="mt-0.5" />
 <span>Un avis juridique, fiscal ou patrimonial</span>
 </li>
 </ul>
 
 <p className="font-semibold mt-3">
 Les calculs sont basés sur des formules actuarielles standard mais ne tiennent pas compte de :
 </p>
 
 <ul className="space-y-1.5 ml-1 text-xs">
 <li className="flex items-start gap-2">
 <Icon name="cross" size={14} className="mt-0.5" />
 <span>Votre situation fiscale personnelle</span>
 </li>
 <li className="flex items-start gap-2">
 <Icon name="cross" size={14} className="mt-0.5" />
 <span>Votre état de santé spécifique</span>
 </li>
 <li className="flex items-start gap-2">
 <Icon name="cross" size={14} className="mt-0.5" />
 <span>Votre régime matrimonial</span>
 </li>
 <li className="flex items-start gap-2">
 <Icon name="cross" size={14} className="mt-0.5" />
 <span>Les frais et commissions des assureurs (variables selon contrats)</span>
 </li>
 <li className="flex items-start gap-2">
 <Icon name="cross" size={14} className="mt-0.5" />
 <span>Les clauses particulières des contrats</span>
 </li>
 </ul>
 
 <p className="font-bold mt-3">
 Avant toute décision d&apos;investissement, consultez impérativement :
 </p>
 
 <ul className="space-y-1.5 ml-1">
 <li className="flex items-start gap-2">
 <Icon name="check" size={16} className="mt-0.5" />
 <span>Un <strong>conseiller en gestion de patrimoine</strong> certifié (CGP)</span>
 </li>
 <li className="flex items-start gap-2">
 <Icon name="check" size={16} className="mt-0.5" />
 <span>Un <strong>notaire</strong> pour les aspects successoraux et matrimoniaux</span>
 </li>
 <li className="flex items-start gap-2">
 <Icon name="check" size={16} className="mt-0.5" />
 <span>Un <strong>expert-comptable</strong> pour optimiser la fiscalité</span>
 </li>
 </ul>
 
 <div className="border-t border-warning-300 pt-3 mt-3">
 <p className="text-xs">
 <strong>Limitation de responsabilité :</strong>CalculPatrimoine décline toute responsabilité 
 en cas de décision prise uniquement sur la base des calculs fournis. L&apos;éditeur ne peut être 
 tenu responsable d&apos;éventuelles erreurs de calcul, bugs logiciels, ou évolutions réglementaires 
 postérieures à la dernière mise à jour (avril 2026).
 </p>
 <p className="text-xs mt-2">
 <a href="/cgu" className="underline hover:text-warning-700 font-medium">
 Conditions d&apos;utilisation complètes
 </a>
 </p>
 </div>
 </div>
 </motion.div>
 )}
 </div>
 {result && (
   <ChatWidget
     contexte={{
       calculateur: 'rente-viagere',
       inputs: {
         age,
         capital: capitalInput.value,
         reversion: showReversion
           ? { enabled: true, spouse_age: spouseAge, percentage: reversionPercentage }
           : { enabled: false },
       },
       results: result,
     }}
   />
 )}
 </>
 )
}

