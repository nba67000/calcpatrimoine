// src/components/Calculator/RenteCalculator.tsx
'use client'

import { useState, useEffect } from 'react'
import { calculateAnnuity, formatEuro } from '@/lib/mortality'
import type { CalculatorInput, AnnuityResult, Gender } from '@/types'
import { motion, AnimatePresence } from 'framer-motion'

export default function RenteCalculator() {
  const [age, setAge] = useState<number>(65)
  const [capital, setCapital] = useState<number>(100000)
  const [gender, setGender] = useState<Gender>('homme')
  const [showReversion, setShowReversion] = useState(false)
  const [spouseAge, setSpouseAge] = useState<number>(63)
  const [reversionPercentage, setReversionPercentage] = useState<60 | 80 | 100>(60)
  
  const [result, setResult] = useState<AnnuityResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  // Calcul en temps réel
  useEffect(() => {
    setIsCalculating(true)
    
    const input: CalculatorInput = {
      age,
      capital,
      gender,
      reversion: showReversion ? {
        enabled: true,
        spouse_age: spouseAge,
        percentage: reversionPercentage
      } : {
        enabled: false
      }
    }
    
    // Simuler un micro-délai pour l'animation (UX)
    const timer = setTimeout(() => {
      const calculatedResult = calculateAnnuity(input)
      setResult(calculatedResult)
      setIsCalculating(false)
    }, 150)
    
    return () => clearTimeout(timer)
  }, [age, capital, gender, showReversion, spouseAge, reversionPercentage])

  return (
    <div className="max-w-4xl mx-auto">
      {/* Zone formulaire */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h2 className="text-xl font-medium mb-6">Vos informations</h2>
        
        {/* Âge */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm text-gray-600">Votre âge</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="50"
                max="90"
                value={age}
                onChange={(e) => {
                  // Laisser l'utilisateur taper librement
                  const val = e.target.value
                  if (val === '' || !isNaN(Number(val))) {
                    setAge(val === '' ? 50 : Number(val))
                  }
                }}
                onBlur={(e) => {
                  // Validation seulement à la perte de focus
                  let val = Number(e.target.value)
                  if (isNaN(val) || val < 50) {
                    setAge(50)
                  } else if (val > 90) {
                    setAge(90)
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
            min="50"
            max="90"
            step="1"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>50 ans</span>
            <span>90 ans</span>
          </div>
        </div>

        {/* Capital */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm text-gray-600">Capital disponible</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="10000"
                max="500000"
                step="1000"
                value={capital}
                onChange={(e) => {
                  const val = e.target.value
                  if (val === '' || !isNaN(Number(val))) {
                    setCapital(val === '' ? 10000 : Number(val))
                  }
                }}
                onBlur={(e) => {
                  let val = Number(e.target.value)
                  if (isNaN(val) || val < 10000) {
                    setCapital(10000)
                  } else if (val > 500000) {
                    setCapital(500000)
                  }
                }}
                onFocus={(e) => e.target.select()}
                className="w-32 px-3 py-1 text-lg font-medium text-right border border-gray-300 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <span className="text-lg font-medium text-gray-600">€</span>
            </div>
          </div>
          <input
            type="range"
            min="10000"
            max="500000"
            step="5000"
            value={capital}
            onChange={(e) => setCapital(Number(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>10 k€</span>
            <span>500 k€</span>
          </div>
        </div>

        {/* Sexe */}
        <div className="mb-6">
          <label className="text-sm text-gray-600 block mb-3">Sexe</label>
          <div className="flex gap-3">
            <button
              onClick={() => setGender('homme')}
              className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                gender === 'homme'
                  ? 'border-blue-600 bg-blue-50 text-blue-900'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              Homme
            </button>
            <button
              onClick={() => setGender('femme')}
              className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                gender === 'femme'
                  ? 'border-blue-600 bg-blue-50 text-blue-900'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              Femme
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            💡 Les montants varient selon l&apos;espérance de vie INSEE (H: 20,4 ans | F: 23,7 ans à 65 ans)
          </p>
        </div>

        {/* Réversion au conjoint - UX améliorée */}
        <div className="border-t pt-6 mt-6">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border-2 border-amber-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-medium text-gray-900">Réversion au conjoint</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Garantir un revenu à votre conjoint après votre décès
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
                        💡 <strong>Comment ça marche ?</strong> Votre rente sera légèrement réduite, 
                        mais votre conjoint continuera à recevoir {reversionPercentage}% après votre décès.
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
                        {reversionPercentage === 60 && '💰 Rente couple maximale, protection modérée'}
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
          className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border-2 border-blue-200 p-8"
        >
          <h3 className="text-lg text-blue-900 mb-2">Votre rente viagère estimée</h3>
          
          {/* Montant principal */}
          <div className="mb-6">
            <motion.div
              key={result.monthly_amount}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, type: 'spring' }}
              className="text-5xl font-bold text-blue-900 mb-1"
            >
              {formatEuro(result.monthly_amount)}
            </motion.div>
            <div className="text-sm text-blue-700">par mois, à vie, garantie</div>
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
                {formatEuro(result.total_expected_payout)}
              </div>
            </div>
          </div>

          {/* Réversion info */}
          {result.with_reversion && (
            <div className="bg-amber-100 border border-amber-300 rounded-lg p-4 mb-6">
              <div className="text-xs text-amber-800 mb-2 font-medium">
                Avec réversion {reversionPercentage}%
              </div>
              <div className="text-sm text-amber-900">
                Après votre décès, votre conjoint percevra{' '}
                <strong>{formatEuro(result.with_reversion.spouse_monthly_amount)}/mois</strong>
              </div>
            </div>
          )}

          {/* Disclaimer */}
          <div className="mt-6 text-xs text-blue-800 leading-relaxed">
            <strong>Avertissement :</strong> Cette estimation est indicative et basée sur les tables de mortalité INSEE 
            et un taux technique de {(result.tech_rate * 100).toFixed(1)}%. Les montants réels peuvent varier selon 
            l&apos;assureur, votre état de santé et les frais appliqués. Ceci ne constitue pas un conseil en investissement.
          </div>
        </motion.div>
      )}
    </div>
  )
}
