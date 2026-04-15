// src/components/Calculator/InverseCalculator.tsx
'use client'

import { useState, useEffect } from 'react'
import { calculateRequiredCapital, formatEuro } from '@/lib/mortality'
import type { InverseResult } from '@/types'
import { motion, AnimatePresence } from 'framer-motion'
import { LIMITS } from '@/lib/constants'
import LegalDisclaimer from '@/components/LegalDisclaimer'
import Tooltip from '@/components/Tooltip'
import ProjectionChart from '@/components/ProjectionChart'

export default function InverseCalculator() {
  const [desiredAmount, setDesiredAmount] = useState<number>(1000)
  const [age, setAge] = useState<number>(65)
  const [showReversion, setShowReversion] = useState(false)
  const [spouseAge, setSpouseAge] = useState<number>(63)
  const [reversionPercentage, setReversionPercentage] = useState<60 | 80 | 100>(60)
  const [result, setResult] = useState<InverseResult | null>(null)

  // Formatage montant avec espaces (100 000 au lieu de 100000)
  const formatAmountInput = (value: number): string => {
    return value.toLocaleString('fr-FR')
  }

  const parseAmountInput = (value: string): number => {
    return Number(value.replace(/\s/g, ''))
  }

  useEffect(() => {
    const calculatedResult = calculateRequiredCapital(
      desiredAmount,
      age,
      showReversion ? {
        spouse_age: spouseAge,
        percentage: reversionPercentage
      } : undefined
    )
    setResult(calculatedResult)
  }, [desiredAmount, age, showReversion, spouseAge, reversionPercentage])

  return (
    <div className="max-w-4xl mx-auto" suppressHydrationWarning>
      {/* Zone formulaire */}
      <div className="bg-neutral-100 rounded-lg shadow-md p-8 mb-6 border-l-4 border-primary-600" suppressHydrationWarning>
        <h2 className="text-xl font-medium mb-2">Calculateur inverse</h2>
        <p className="text-sm text-neutral-600 mb-6">
          Découvrez le capital nécessaire pour obtenir la rente mensuelle souhaitée
        </p>
        
        {/* Montant souhaité */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm text-neutral-600 flex items-center">
              Rente mensuelle souhaitée
              <Tooltip content="Montant que vous aimeriez percevoir chaque mois à vie. Le calculateur vous indiquera le capital nécessaire pour obtenir cette rente." />
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                inputMode="numeric"
                value={formatAmountInput(desiredAmount)}
                onChange={(e) => {
                  const val = e.target.value.replace(/\s/g, '')
                  if (val === '' || !isNaN(Number(val))) {
                    setDesiredAmount(val === '' ? 300 : Number(val))
                  }
                }}
                onBlur={(e) => {
                  let val = parseAmountInput(e.target.value)
                  if (isNaN(val) || val < 300) {
                    setDesiredAmount(300)
                  } else if (val > 5000) {
                    setDesiredAmount(5000)
                  }
                }}
                onFocus={(e) => e.target.select()}
                className="w-28 px-3 py-1 text-lg font-medium text-right border border-neutral-300 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <span className="text-lg font-medium text-neutral-600">€/mois</span>
            </div>
          </div>
          <input
            type="range"
            min={300}
            max={5000}
            step={50}
            value={desiredAmount}
            onChange={(e) => setDesiredAmount(Number(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-neutral-400 mt-1">
            <span>300€</span>
            <span>5 000€</span>
          </div>
        </div>

        {/* Âge */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
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
                  let val = Number(e.target.value)
                  if (isNaN(val) || val < LIMITS.AGE_MIN) {
                    setAge(LIMITS.AGE_MIN)
                  } else if (val > LIMITS.AGE_MAX) {
                    setAge(LIMITS.AGE_MAX)
                  }
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

        {/* Note pédagogique table unisexe */}
        <div className="mb-6 p-4 bg-primary-50 border border-primary-200 rounded-lg">
          <p className="text-sm text-primary-900">
            <strong>ℹ️ Table de mortalité unisexe (réglementation 2012)</strong><br />
            Depuis décembre 2012, les assureurs utilisent une table unique pour
            hommes et femmes. Ce calculateur applique cette réglementation.
          </p>
        </div>

        {/* Réversion au conjoint - UX améliorée */}
        <div className="border-t pt-6 mt-6">
          <div className="bg-warning-50 rounded-lg border-l-4 border-warning-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">💑</span>
                  <h3 className="text-lg font-medium text-neutral-900">Réversion au conjoint</h3>
                </div>
                <p className="text-sm text-neutral-600">
                  Augmente le capital nécessaire, mais protège votre conjoint
                </p>
              </div>
              <button
                onClick={() => setShowReversion(!showReversion)}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 ${
                  showReversion ? 'bg-warning-500' : 'bg-neutral-300'
                }`}
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
                  <div className="border-t border-warning-200 pt-4 mt-2">
                    <div className="bg-white/50 rounded-lg p-4 mb-4">
                      <p className="text-xs text-warning-800">
                        💡 <strong>Impact :</strong> Le capital nécessaire sera plus élevé, 
                        car votre conjoint continuera à recevoir {reversionPercentage}% de la rente après votre décès.
                      </p>
                    </div>

                    {/* Âge conjoint */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-sm font-medium text-neutral-700">Âge du conjoint</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min="50"
                            max="90"
                            value={spouseAge}
                            onChange={(e) => {
                              const val = e.target.value
                              if (val === '' || !isNaN(Number(val))) {
                                setSpouseAge(val === '' ? 50 : Number(val))
                              }
                            }}
                            onBlur={(e) => {
                              let val = Number(e.target.value)
                              if (isNaN(val) || val < 50) {
                                setSpouseAge(50)
                              } else if (val > 90) {
                                setSpouseAge(90)
                              }
                            }}
                            onFocus={(e) => e.target.select()}
                            className="w-16 px-2 py-1 text-sm font-medium text-center border border-warning-300 rounded-lg 
                                       focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          />
                          <span className="text-sm font-medium text-neutral-600">ans</span>
                        </div>
                      </div>
                      <input
            type="range"
            min={50}
            max={90}
            step={1}
            value={spouseAge}
            onChange={(e) => setSpouseAge(Number(e.target.value))}
            className="w-full"
          />
                    </div>

                    {/* Pourcentage réversion */}
                    <div>
                      <label className="text-sm font-medium text-neutral-700 block mb-3">
                        Pourcentage de réversion
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {([60, 80, 100] as const).map((pct) => (
                          <button
                            key={pct}
                            onClick={() => setReversionPercentage(pct)}
                            className={`py-3 px-4 rounded-lg border-2 text-sm font-medium transition-all ${
                              reversionPercentage === pct
                                ? 'border-amber-600 bg-warning-100 text-warning-900 shadow-sm'
                                : 'border-neutral-200 hover:border-warning-300 hover:bg-warning-50'
                            }`}
                          >
                            {pct}%
                          </button>
                        ))}
                      </div>
                      <p className="text-xs text-neutral-500 mt-2">
                        {reversionPercentage === 60 && '💰 Capital réduit, protection modérée'}
                        {reversionPercentage === 80 && '⚖️ Équilibre idéal (le plus courant)'}
                        {reversionPercentage === 100 && '🛡️ Protection maximale du conjoint'}
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
          className="bg-white rounded-lg shadow-lg p-10 border-t-4 border-success-600"
        >
          <h3 className="text-xl font-semibold text-neutral-900 mb-6">Capital nécessaire</h3>
          
          {/* Montant principal */}
          <div className="mb-8">
            <motion.div
              key={result.required_capital}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="flex items-baseline gap-2"
            >
              <span className="text-6xl font-bold tabular-nums text-neutral-900 tracking-tight">
                {formatEuro(result.required_capital)}
              </span>
            </motion.div>
            <div className="text-sm text-neutral-500 mt-2">
              pour obtenir {formatEuro(desiredAmount)}/mois à vie
            </div>
          </div>

          {/* Détails */}
          <div className="grid grid-cols-2 gap-4 pb-6 border-b border-neutral-200">
            <div className="bg-neutral-50 rounded-md p-4">
              <div className="text-xs text-neutral-600 font-medium mb-1">Espérance de vie</div>
              <div className="text-2xl font-semibold tabular-nums text-neutral-900">
                {result.life_expectancy.toFixed(1)} ans
              </div>
            </div>
            <div className="bg-neutral-50 rounded-md p-4">
              <div className="text-xs text-neutral-600 font-medium mb-1">Total espéré</div>
              <div className="text-2xl font-semibold tabular-nums text-neutral-900">
                {formatEuro(desiredAmount * 12 * result.life_expectancy)}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Graphique de projection */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="mt-6 bg-white rounded-lg shadow-lg p-8 border border-neutral-200"
        >
          <ProjectionChart
            capital={result.required_capital}
            monthlyRent={desiredAmount}
            lifeExpectancy={result.life_expectancy}
          />
        </motion.div>
      )}

      {/* Disclaimer LONG - EN DEHORS du bloc vert */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="mt-6 p-6 bg-red-50 border-2 border-red-200 rounded-lg"
        >
          <h4 className="text-base font-bold text-red-900 mb-3 flex items-center gap-2">
            <span className="text-xl">⚠️</span>
            Avertissement Important
          </h4>
          
          <div className="text-sm text-red-800 space-y-3">
            <p className="font-semibold">
              CalcPatrimoine est un outil pédagogique gratuit à titre indicatif uniquement. 
              Il ne constitue en aucun cas :
            </p>
            
            <ul className="list-disc list-inside space-y-1 ml-4 text-red-700">
              <li>Un conseil en investissement personnalisé</li>
              <li>Une recommandation de souscription</li>
              <li>Une garantie de résultat</li>
              <li>Un avis juridique, fiscal ou patrimonial</li>
            </ul>
            
            <p className="font-semibold mt-3">
              Les calculs sont basés sur des formules actuarielles standard mais ne tiennent PAS compte de :
            </p>
            
            <ul className="list-disc list-inside space-y-1 ml-4 text-red-700 text-xs">
              <li>Votre situation fiscale personnelle</li>
              <li>Votre état de santé spécifique</li>
              <li>Votre régime matrimonial</li>
              <li>Les frais et commissions des assureurs (variables selon contrats)</li>
              <li>Les clauses particulières des contrats</li>
              <li>Les évolutions réglementaires futures</li>
            </ul>
            
            <p className="font-bold text-red-900 mt-3">
              ⚖️ Avant toute décision d'investissement, consultez IMPÉRATIVEMENT :
            </p>
            
            <ul className="list-disc list-inside space-y-1 ml-4 text-red-700">
              <li>Un <strong>conseiller en gestion de patrimoine</strong> certifié (CGP)</li>
              <li>Un <strong>notaire</strong> pour les aspects successoraux et matrimoniaux</li>
              <li>Un <strong>expert-comptable</strong> pour optimiser la fiscalité</li>
            </ul>
            
            <div className="border-t border-red-300 pt-3 mt-3">
              <p className="text-xs text-red-700">
                <strong>Limitation de responsabilité :</strong> CalcPatrimoine décline toute responsabilité 
                en cas de décision prise uniquement sur la base des calculs fournis. L'éditeur ne peut être 
                tenu responsable d'éventuelles erreurs de calcul, bugs logiciels, ou évolutions réglementaires 
                postérieures à la dernière mise à jour (avril 2026).
              </p>
              <p className="text-xs text-red-700 mt-2">
                <a href="/cgu" className="underline hover:text-red-900 font-medium">
                  Conditions d'utilisation complètes →
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
