// src/components/Calculator/RenteCalculator.tsx
'use client'

import { useState, useEffect } from 'react'
import { calculateAnnuity, formatEuro } from '@/lib/mortality'
import { trackEvent, PlausibleEvents } from '@/lib/plausible'
import type { CalculatorInput, AnnuityResult } from '@/types'
import { motion, AnimatePresence } from 'framer-motion'
import LegalDisclaimer from '@/components/LegalDisclaimer'

export default function RenteCalculator() {
  const [age, setAge] = useState<number>(65)
  const [capital, setCapital] = useState<number>(100000)
  const [showReversion, setShowReversion] = useState(false)
  const [spouseAge, setSpouseAge] = useState<number>(63)
  const [reversionPercentage, setReversionPercentage] = useState<60 | 80 | 100>(60)
  
  const [result, setResult] = useState<AnnuityResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  // Formatage montant avec espaces (100 000 au lieu de 100000)
  const formatCapitalInput = (value: number): string => {
    return value.toLocaleString('fr-FR')
  }

  const parseCapitalInput = (value: string): number => {
    return Number(value.replace(/\s/g, ''))
  }

  // Calcul en temps réel
  useEffect(() => {
    setIsCalculating(true)
    
    const input: CalculatorInput = {
      age,
      capital,
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
      
      // Track événement calcul
      if (calculatedResult) {
        trackEvent(
          showReversion ? PlausibleEvents.RENTE_REVERSION : PlausibleEvents.RENTE_SIMPLE,
          {
            age,
            capital,
            ...(showReversion && { reversionPct: reversionPercentage })
          }
        )
      }
    }, 150)
    
    return () => clearTimeout(timer)
  }, [age, capital, showReversion, spouseAge, reversionPercentage])

  return (
    <div className="max-w-4xl mx-auto" suppressHydrationWarning>
      {/* Zone formulaire */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6" suppressHydrationWarning>
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
                type="text"
                inputMode="numeric"
                value={formatCapitalInput(capital)}
                onChange={(e) => {
                  const val = e.target.value.replace(/\s/g, '')
                  if (val === '' || !isNaN(Number(val))) {
                    setCapital(val === '' ? 10000 : Number(val))
                  }
                }}
                onBlur={(e) => {
                  let val = parseCapitalInput(e.target.value)
                  if (isNaN(val) || val < 10000) {
                    setCapital(10000)
                  } else if (val > 500000) {
                    setCapital(500000)
                  }
                }}
                onFocus={(e) => e.target.select()}
                className="w-40 px-3 py-1 text-lg font-medium text-right border border-gray-300 rounded-lg 
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
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer
                       [&::-webkit-slider-thumb]:appearance-none
                       [&::-webkit-slider-thumb]:w-5
                       [&::-webkit-slider-thumb]:h-5
                       [&::-webkit-slider-thumb]:rounded-full
                       [&::-webkit-slider-thumb]:bg-blue-600
                       [&::-webkit-slider-thumb]:cursor-pointer
                       [&::-webkit-slider-thumb]:hover:bg-blue-700
                       [&::-webkit-slider-thumb]:transition-colors
                       [&::-moz-range-thumb]:w-5
                       [&::-moz-range-thumb]:h-5
                       [&::-moz-range-thumb]:rounded-full
                       [&::-moz-range-thumb]:bg-blue-600
                       [&::-moz-range-thumb]:cursor-pointer
                       [&::-moz-range-thumb]:hover:bg-blue-700
                       [&::-moz-range-thumb]:border-0
                       [&::-moz-range-thumb]:transition-colors"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>10 k€</span>
            <span>500 k€</span>
          </div>
        </div>

        {/* Note pédagogique table unisexe */}
        <div className="mb-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
          <p className="text-sm text-blue-900">
            <strong>ℹ️ Table de mortalité unisexe (réglementation 2012)</strong><br />
            Depuis décembre 2012, les assureurs utilisent une table unique pour
            hommes et femmes (moyenne pondérée). Ce calculateur applique cette
            réglementation obligatoire.
          </p>
          <p className="text-xs text-blue-700 mt-2">
            Biologiquement, les femmes vivent ~4 ans de plus que les hommes
            (espérance vie 24,1 vs 20,4 ans à 65 ans), mais la loi impose
            un tarif identique (arrêt CJUE mars 2011).
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
            <div className="bg-amber-100 border border-amber-300 rounded-lg p-4">
              <div className="text-xs text-amber-800 mb-2 font-medium">
                Avec réversion {reversionPercentage}%
              </div>
              <div className="text-sm text-amber-900">
                Après votre décès, votre conjoint percevra{' '}
                <strong>{formatEuro(result.with_reversion.spouse_monthly_amount)}/mois</strong>
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Disclaimer LONG - EN DEHORS du bloc bleu */}
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
