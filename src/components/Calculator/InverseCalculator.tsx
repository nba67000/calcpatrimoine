// src/components/Calculator/InverseCalculator.tsx
'use client'

import { useState, useEffect } from 'react'
import { calculateRequiredCapital, formatEuro } from '@/lib/mortality'
import type { InverseResult } from '@/types'
import { motion, AnimatePresence } from 'framer-motion'
import { LIMITS } from '@/lib/constants'
import LegalDisclaimer from '@/components/LegalDisclaimer'

export default function InverseCalculator() {
  const [desiredAmount, setDesiredAmount] = useState<number>(1000)
  const [age, setAge] = useState<number>(65)
  const [showReversion, setShowReversion] = useState(false)
  const [spouseAge, setSpouseAge] = useState<number>(63)
  const [reversionPercentage, setReversionPercentage] = useState<60 | 80 | 100>(60)
  const [result, setResult] = useState<InverseResult | null>(null)

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
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6" suppressHydrationWarning>
        <h2 className="text-xl font-medium mb-2">Calculateur inverse</h2>
        <p className="text-sm text-gray-600 mb-6">
          Découvrez le capital nécessaire pour obtenir la rente mensuelle souhaitée
        </p>

        {/* Disclaimer juridique RENFORCÉ */}
        <div className="mb-6 p-6 bg-red-50 border-2 border-red-200 rounded-lg">
          <h3 className="text-lg font-bold text-red-900 mb-3">
            ⚠️ Avertissement Important
          </h3>
          
          <div className="text-sm text-red-800 space-y-3">
            <p className="font-semibold">
              CalcPatrimoine est un outil pédagogique gratuit à titre indicatif uniquement. 
              Il ne constitue en aucun cas un conseil personnalisé.
            </p>
            
            <p className="text-xs font-semibold mt-2">
              Les calculs ne tiennent pas compte de votre situation fiscale, état de santé, 
              régime matrimonial, ni des frais spécifiques des assureurs.
            </p>
            
            <p className="text-xs font-bold mt-2 text-red-900">
              Consultez un professionnel qualifié avant toute décision d&apos;investissement.
            </p>
          </div>
        </div>
        
        {/* Montant souhaité */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm text-gray-600">Rente mensuelle souhaitée</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="300"
                max="5000"
                step="50"
                value={desiredAmount}
                onChange={(e) => {
                  const val = e.target.value
                  if (val === '' || !isNaN(Number(val))) {
                    setDesiredAmount(val === '' ? 300 : Number(val))
                  }
                }}
                onBlur={(e) => {
                  let val = Number(e.target.value)
                  if (isNaN(val) || val < 300) {
                    setDesiredAmount(300)
                  } else if (val > 5000) {
                    setDesiredAmount(5000)
                  }
                }}
                onFocus={(e) => e.target.select()}
                className="w-24 px-3 py-1 text-lg font-medium text-right border border-gray-300 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <span className="text-lg font-medium text-gray-600">€/mois</span>
            </div>
          </div>
          <input
            type="range"
            min="300"
            max="5000"
            step="50"
            value={desiredAmount}
            onChange={(e) => setDesiredAmount(Number(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>300€</span>
            <span>5 000€</span>
          </div>
        </div>

        {/* Âge */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm text-gray-600">Votre âge</label>
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
                className="w-20 px-3 py-1 text-lg font-medium text-center border border-gray-300 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <span className="text-lg font-medium text-gray-600">ans</span>
            </div>
          </div>
          <input
            type="range"
            min={LIMITS.AGE_MIN}
            max={LIMITS.AGE_MAX}
            step="1"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>{LIMITS.AGE_MIN} ans</span>
            <span>{LIMITS.AGE_MAX} ans</span>
          </div>
        </div>

        {/* Note pédagogique table unisexe */}
        <div className="mb-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
          <p className="text-sm text-blue-900">
            <strong>ℹ️ Table de mortalité unisexe (réglementation 2012)</strong><br />
            Depuis décembre 2012, les assureurs utilisent une table unique pour
            hommes et femmes. Ce calculateur applique cette réglementation.
          </p>
        </div>

        {/* Réversion au conjoint - UX améliorée */}
        <div className="border-t pt-6 mt-6">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border-2 border-amber-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">💑</span>
                  <h3 className="text-lg font-medium text-gray-900">Réversion au conjoint</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Augmente le capital nécessaire, mais protège votre conjoint
                </p>
              </div>
              <button
                onClick={() => setShowReversion(!showReversion)}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 ${
                  showReversion ? 'bg-amber-500' : 'bg-gray-300'
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
                  <div className="border-t border-amber-200 pt-4 mt-2">
                    <div className="bg-white/50 rounded-lg p-4 mb-4">
                      <p className="text-xs text-amber-800">
                        💡 <strong>Impact :</strong> Le capital nécessaire sera plus élevé, 
                        car votre conjoint continuera à recevoir {reversionPercentage}% de la rente après votre décès.
                      </p>
                    </div>

                    {/* Âge conjoint */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-sm font-medium text-gray-700">Âge du conjoint</label>
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
                            className="w-16 px-2 py-1 text-sm font-medium text-center border border-amber-300 rounded-lg 
                                       focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          />
                          <span className="text-sm font-medium text-gray-600">ans</span>
                        </div>
                      </div>
                      <input
                        type="range"
                        min="50"
                        max="90"
                        step="1"
                        value={spouseAge}
                        onChange={(e) => setSpouseAge(Number(e.target.value))}
                        className="w-full"
                      />
                    </div>

                    {/* Pourcentage réversion */}
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-3">
                        Pourcentage de réversion
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {([60, 80, 100] as const).map((pct) => (
                          <button
                            key={pct}
                            onClick={() => setReversionPercentage(pct)}
                            className={`py-3 px-4 rounded-lg border-2 text-sm font-medium transition-all ${
                              reversionPercentage === pct
                                ? 'border-amber-600 bg-amber-100 text-amber-900 shadow-sm'
                                : 'border-gray-200 hover:border-amber-300 hover:bg-amber-50'
                            }`}
                          >
                            {pct}%
                          </button>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
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
          className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl border-2 border-green-200 p-8"
        >
          <h3 className="text-lg text-green-900 mb-2">Capital nécessaire</h3>
          
          {/* Montant principal */}
          <div className="mb-6">
            <motion.div
              key={result.required_capital}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, type: 'spring' }}
              className="text-5xl font-bold text-green-900 mb-1"
            >
              {formatEuro(result.required_capital)}
            </motion.div>
            <div className="text-sm text-green-700">
              pour obtenir {formatEuro(desiredAmount)}/mois à vie
            </div>
          </div>

          {/* Détails */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white/60 rounded-lg p-4">
              <div className="text-xs text-gray-600 mb-1">Espérance de vie</div>
              <div className="text-lg font-medium text-gray-900">
                {result.life_expectancy} ans
              </div>
            </div>
            <div className="bg-white/60 rounded-lg p-4">
              <div className="text-xs text-gray-600 mb-1">Total espéré</div>
              <div className="text-lg font-medium text-gray-900">
                {formatEuro(desiredAmount * 12 * result.life_expectancy)}
              </div>
            </div>
          </div>

          {/* Disclaimer LONG */}
          <div className="mt-6 p-6 bg-red-50 border-2 border-red-200 rounded-lg">
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
          </div>
        </motion.div>
      )}
    </div>
  )
}
