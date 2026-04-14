// src/components/Calculator/RenteCalculator.tsx
'use client'

import { useState, useEffect } from 'react'
import { calculateAnnuity, formatEuro } from '@/lib/mortality'
import type { CalculatorInput, AnnuityResult, Gender } from '@/types'
import { motion, AnimatePresence } from 'framer-motion'
import AdvancedOptions, { type AdvancedOptionsState } from './AdvancedOptions'
import { exportCalculationToPDF } from '@/lib/pdfExport'

export default function RenteCalculator() {
  const [age, setAge] = useState<number>(65)
  const [capital, setCapital] = useState<number>(100000)
  const [gender, setGender] = useState<Gender>('homme')
  const [showReversion, setShowReversion] = useState(false)
  const [spouseAge, setSpouseAge] = useState<number>(63)
  const [reversionPercentage, setReversionPercentage] = useState<60 | 80 | 100>(60)
  
  const [advancedOptions, setAdvancedOptions] = useState<AdvancedOptionsState>({
    enabled: false
  })
  
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
        percentage: reversionPercentage,
        deferred_years: advancedOptions.deferredReversionYears
      } : {
        enabled: false
      },
      custom_tech_rate: advancedOptions.customTechRate,
      guaranteed_years: advancedOptions.guaranteedYears
    }
    
    // Simuler un micro-délai pour l'animation (UX)
    const timer = setTimeout(() => {
      const calculatedResult = calculateAnnuity(input)
      setResult(calculatedResult)
      setIsCalculating(false)
    }, 150)
    
    return () => clearTimeout(timer)
  }, [age, capital, gender, showReversion, spouseAge, reversionPercentage, advancedOptions])

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

        {/* Options avancées : Réversion */}
        <div className="border-t pt-6">
          <button
            onClick={() => setShowReversion(!showReversion)}
            className="flex items-center justify-between w-full text-left group"
          >
            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
              Options avancées : réversion au conjoint
            </span>
            <span className="text-gray-400 group-hover:text-gray-600">
              {showReversion ? '−' : '+'}
            </span>
          </button>

          <AnimatePresence>
            {showReversion && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <p className="text-xs text-amber-800 mb-4">
                    La réversion garantit un revenu à votre conjoint après votre décès.
                    Le montant de votre rente sera réduit en contrepartie.
                  </p>

                  {/* Âge conjoint */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm text-gray-700">Âge du conjoint</label>
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
                    <label className="text-sm text-gray-700 block mb-2">
                      Pourcentage de réversion
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {([60, 80, 100] as const).map((pct) => (
                        <button
                          key={pct}
                          onClick={() => setReversionPercentage(pct)}
                          className={`py-2 px-3 rounded-lg border-2 text-sm transition-all ${
                            reversionPercentage === pct
                              ? 'border-amber-600 bg-amber-100 text-amber-900'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {pct}%
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Options avancées */}
        <div className="border-t pt-6 mt-6">
          <AdvancedOptions
            value={advancedOptions}
            onChange={setAdvancedOptions}
            showReversionOptions={showReversion}
          />
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
            <div className="bg-amber-100 border border-amber-300 rounded-lg p-4 mb-4">
              <div className="text-xs text-amber-800 mb-2 font-medium">
                Avec réversion {reversionPercentage}%
                {result.with_reversion.deferred_years && (
                  <span className="ml-2 text-xs bg-amber-200 px-2 py-0.5 rounded">
                    Différée {result.with_reversion.deferred_years} ans
                  </span>
                )}
              </div>
              <div className="text-sm text-amber-900">
                Après votre décès, votre conjoint percevra{' '}
                <strong>{formatEuro(result.with_reversion.spouse_monthly_amount)}/mois</strong>
                {result.with_reversion.deferred_years && (
                  <span className="block text-xs mt-1 text-amber-700">
                    (démarre après {result.with_reversion.deferred_years} ans)
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Rente certaine info */}
          {result.guaranteed_payout && (
            <div className="bg-green-100 border border-green-300 rounded-lg p-4 mb-4">
              <div className="text-xs text-green-800 mb-2 font-medium">
                Rente certaine {result.guaranteed_payout.years} ans
              </div>
              <div className="text-sm text-green-900">
                Minimum garanti :{' '}
                <strong>{formatEuro(result.guaranteed_payout.total_guaranteed)}</strong>
                {' '}versé quoi qu&apos;il arrive
              </div>
            </div>
          )}

          {/* Taux technique personnalisé */}
          {result.custom_tech_rate_used && (
            <div className="bg-purple-100 border border-purple-300 rounded-lg p-3 mb-4">
              <div className="text-xs text-purple-900">
                ⚙️ Taux technique personnalisé : {(result.tech_rate * 100).toFixed(1)}%
              </div>
            </div>
          )}

          {/* Bouton export PDF */}
          <button
            onClick={async () => {
              await exportCalculationToPDF(result, {
                age,
                gender,
                capital,
                spouse: showReversion ? {
                  age: spouseAge,
                  percentage: reversionPercentage
                } : undefined
              })
            }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors mb-6 flex items-center justify-center gap-2"
          >
            <span>📄</span>
            Télécharger le détail (PDF)
          </button>

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
