// src/components/Calculator/CoupleCalculator.tsx
'use client'

import { useState, useEffect } from 'react'
import { calculateCoupleStrategies, formatEuro } from '@/lib/mortality'
import type { Gender, CoupleProfile, CoupleCalculation } from '@/types'
import { motion, AnimatePresence } from 'framer-motion'
import { LIMITS } from '@/lib/constants'

export default function CoupleCalculator() {
  const [person1, setPerson1] = useState<CoupleProfile>({
    age: 65,
    gender: 'homme',
    capital: 100000
  })
  
  const [person2, setPerson2] = useState<CoupleProfile>({
    age: 63,
    gender: 'femme',
    capital: 80000
  })
  
  const [result, setResult] = useState<CoupleCalculation | null>(null)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    const calc = calculateCoupleStrategies(person1, person2)
    setResult(calc)
  }, [person1, person2])

  const getRecommendationLabel = (rec: CoupleCalculation['recommendation']) => {
    switch (rec) {
      case 'person1_solo': return 'Rente séparée (Personne 1)'
      case 'person2_solo': return 'Rente séparée (Personne 2)'
      case 'joint_60': return 'Rente conjointe avec réversion 60%'
      case 'joint_80': return 'Rente conjointe avec réversion 80%'
      case 'joint_100': return 'Rente conjointe avec réversion 100%'
    }
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h2 className="text-xl font-medium mb-2">Mode couple</h2>
        <p className="text-sm text-gray-600 mb-6">
          Comparez toutes les stratégies possibles pour optimiser vos rentes
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Personne 1 */}
          <div className="border border-blue-200 rounded-xl p-6 bg-blue-50">
            <h3 className="font-medium text-blue-900 mb-4">👤 Personne 1</h3>
            
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm text-gray-600">Âge</label>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    min={LIMITS.AGE_MIN}
                    max={LIMITS.AGE_MAX}
                    value={person1.age}
                    onChange={(e) => {
                      const val = e.target.value
                      if (val === '' || !isNaN(Number(val))) {
                        setPerson1({...person1, age: val === '' ? LIMITS.AGE_MIN : Number(val)})
                      }
                    }}
                    onBlur={(e) => {
                      let val = Number(e.target.value)
                      if (isNaN(val) || val < LIMITS.AGE_MIN) {
                        setPerson1({...person1, age: LIMITS.AGE_MIN})
                      } else if (val > LIMITS.AGE_MAX) {
                        setPerson1({...person1, age: LIMITS.AGE_MAX})
                      }
                    }}
                    onFocus={(e) => e.target.select()}
                    className="w-16 px-2 py-1 text-sm font-medium text-center border border-blue-300 rounded 
                               focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm">ans</span>
                </div>
              </div>
              <input
                type="range"
                min={LIMITS.AGE_MIN}
                max={LIMITS.AGE_MAX}
                value={person1.age}
                onChange={(e) => setPerson1({...person1, age: Number(e.target.value)})}
                className="w-full"
              />
            </div>

            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm text-gray-600">Capital</label>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    min={LIMITS.CAPITAL_MIN}
                    max={LIMITS.CAPITAL_MAX}
                    step={1000}
                    value={person1.capital}
                    onChange={(e) => {
                      const val = e.target.value
                      if (val === '' || !isNaN(Number(val))) {
                        setPerson1({...person1, capital: val === '' ? LIMITS.CAPITAL_MIN : Number(val)})
                      }
                    }}
                    onBlur={(e) => {
                      let val = Number(e.target.value)
                      if (isNaN(val) || val < LIMITS.CAPITAL_MIN) {
                        setPerson1({...person1, capital: LIMITS.CAPITAL_MIN})
                      } else if (val > LIMITS.CAPITAL_MAX) {
                        setPerson1({...person1, capital: LIMITS.CAPITAL_MAX})
                      }
                    }}
                    onFocus={(e) => e.target.select()}
                    className="w-24 px-2 py-1 text-sm font-medium text-right border border-blue-300 rounded 
                               focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm">€</span>
                </div>
              </div>
              <input
                type="range"
                min={LIMITS.CAPITAL_MIN}
                max={LIMITS.CAPITAL_MAX}
                step={LIMITS.CAPITAL_STEP}
                value={person1.capital}
                onChange={(e) => setPerson1({...person1, capital: Number(e.target.value)})}
                className="w-full"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600 block mb-2">Sexe</label>
              <div className="flex gap-2">
                {(['homme', 'femme'] as const).map((g) => (
                  <button
                    key={g}
                    onClick={() => setPerson1({...person1, gender: g})}
                    className={`flex-1 py-2 px-3 rounded-lg border-2 text-sm transition-all ${
                      person1.gender === g
                        ? 'border-blue-600 bg-blue-100 text-blue-900'
                        : 'border-blue-200 hover:border-blue-300'
                    }`}
                  >
                    {g === 'homme' ? 'H' : 'F'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Personne 2 */}
          <div className="border border-pink-200 rounded-xl p-6 bg-pink-50">
            <h3 className="font-medium text-pink-900 mb-4">👤 Personne 2</h3>
            
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm text-gray-600">Âge</label>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    min={LIMITS.AGE_MIN}
                    max={LIMITS.AGE_MAX}
                    value={person2.age}
                    onChange={(e) => {
                      const val = e.target.value
                      if (val === '' || !isNaN(Number(val))) {
                        setPerson2({...person2, age: val === '' ? LIMITS.AGE_MIN : Number(val)})
                      }
                    }}
                    onBlur={(e) => {
                      let val = Number(e.target.value)
                      if (isNaN(val) || val < LIMITS.AGE_MIN) {
                        setPerson2({...person2, age: LIMITS.AGE_MIN})
                      } else if (val > LIMITS.AGE_MAX) {
                        setPerson2({...person2, age: LIMITS.AGE_MAX})
                      }
                    }}
                    onFocus={(e) => e.target.select()}
                    className="w-16 px-2 py-1 text-sm font-medium text-center border border-pink-300 rounded 
                               focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                  <span className="text-sm">ans</span>
                </div>
              </div>
              <input
                type="range"
                min={LIMITS.AGE_MIN}
                max={LIMITS.AGE_MAX}
                value={person2.age}
                onChange={(e) => setPerson2({...person2, age: Number(e.target.value)})}
                className="w-full"
              />
            </div>

            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm text-gray-600">Capital</label>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    min={LIMITS.CAPITAL_MIN}
                    max={LIMITS.CAPITAL_MAX}
                    step={1000}
                    value={person2.capital}
                    onChange={(e) => {
                      const val = e.target.value
                      if (val === '' || !isNaN(Number(val))) {
                        setPerson2({...person2, capital: val === '' ? LIMITS.CAPITAL_MIN : Number(val)})
                      }
                    }}
                    onBlur={(e) => {
                      let val = Number(e.target.value)
                      if (isNaN(val) || val < LIMITS.CAPITAL_MIN) {
                        setPerson2({...person2, capital: LIMITS.CAPITAL_MIN})
                      } else if (val > LIMITS.CAPITAL_MAX) {
                        setPerson2({...person2, capital: LIMITS.CAPITAL_MAX})
                      }
                    }}
                    onFocus={(e) => e.target.select()}
                    className="w-24 px-2 py-1 text-sm font-medium text-right border border-pink-300 rounded 
                               focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                  <span className="text-sm">€</span>
                </div>
              </div>
              <input
                type="range"
                min={LIMITS.CAPITAL_MIN}
                max={LIMITS.CAPITAL_MAX}
                step={LIMITS.CAPITAL_STEP}
                value={person2.capital}
                onChange={(e) => setPerson2({...person2, capital: Number(e.target.value)})}
                className="w-full"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600 block mb-2">Sexe</label>
              <div className="flex gap-2">
                {(['homme', 'femme'] as const).map((g) => (
                  <button
                    key={g}
                    onClick={() => setPerson2({...person2, gender: g})}
                    className={`flex-1 py-2 px-3 rounded-lg border-2 text-sm transition-all ${
                      person2.gender === g
                        ? 'border-pink-600 bg-pink-100 text-pink-900'
                        : 'border-pink-200 hover:border-pink-300'
                    }`}
                  >
                    {g === 'homme' ? 'H' : 'F'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Résultat */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl border-2 border-purple-200 p-8"
        >
          <h3 className="text-lg text-purple-900 mb-4">✨ Notre recommandation</h3>
          
          {/* Stratégie recommandée */}
          <div className="bg-white rounded-xl p-6 mb-6 border-2 border-purple-300">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                🏆
              </div>
              <div>
                <div className="font-medium text-purple-900">
                  {getRecommendationLabel(result.recommendation)}
                </div>
                <div className="text-xs text-gray-600">Meilleur rapport rendement/sécurité</div>
              </div>
            </div>
            
            <div className="text-3xl font-bold text-purple-900 mb-1">
              {result.recommendation === 'person1_solo' && formatEuro(result.person1_solo.monthly_amount)}
              {result.recommendation === 'person2_solo' && formatEuro(result.person2_solo.monthly_amount)}
              {result.recommendation === 'joint_60' && formatEuro(result.joint_with_reversion_60.monthly_amount)}
              {result.recommendation === 'joint_80' && formatEuro(result.joint_with_reversion_80.monthly_amount)}
              {result.recommendation === 'joint_100' && formatEuro(result.joint_with_reversion_100.monthly_amount)}
              <span className="text-lg">/mois</span>
            </div>
            <div className="text-sm text-gray-600">
              Capital total : {formatEuro(result.total_capital)}
            </div>
          </div>

          {/* Bouton afficher détails */}
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-medium transition-colors mb-4"
          >
            {showDetails ? 'Masquer' : 'Voir'} toutes les stratégies
          </button>

          {/* Tableau comparatif */}
          <AnimatePresence>
            {showDetails && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-white rounded-xl p-6 overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-2">Stratégie</th>
                        <th className="text-right py-3 px-2">Rente mensuelle</th>
                        <th className="text-right py-3 px-2">Total espéré</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 px-2">Pers. 1 seule</td>
                        <td className="text-right py-3 px-2 font-medium">
                          {formatEuro(result.person1_solo.monthly_amount)}
                        </td>
                        <td className="text-right py-3 px-2 text-gray-600">
                          {formatEuro(result.person1_solo.total_expected_payout)}
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-2">Pers. 2 seule</td>
                        <td className="text-right py-3 px-2 font-medium">
                          {formatEuro(result.person2_solo.monthly_amount)}
                        </td>
                        <td className="text-right py-3 px-2 text-gray-600">
                          {formatEuro(result.person2_solo.total_expected_payout)}
                        </td>
                      </tr>
                      <tr className="border-b bg-purple-50">
                        <td className="py-3 px-2">Conjointe (60% réversion)</td>
                        <td className="text-right py-3 px-2 font-medium">
                          {formatEuro(result.joint_with_reversion_60.monthly_amount)}
                        </td>
                        <td className="text-right py-3 px-2 text-gray-600">
                          {formatEuro(result.joint_with_reversion_60.total_expected_payout)}
                        </td>
                      </tr>
                      <tr className="border-b bg-purple-50">
                        <td className="py-3 px-2">Conjointe (80% réversion)</td>
                        <td className="text-right py-3 px-2 font-medium">
                          {formatEuro(result.joint_with_reversion_80.monthly_amount)}
                        </td>
                        <td className="text-right py-3 px-2 text-gray-600">
                          {formatEuro(result.joint_with_reversion_80.total_expected_payout)}
                        </td>
                      </tr>
                      <tr className="bg-purple-50">
                        <td className="py-3 px-2">Conjointe (100% réversion)</td>
                        <td className="text-right py-3 px-2 font-medium">
                          {formatEuro(result.joint_with_reversion_100.monthly_amount)}
                        </td>
                        <td className="text-right py-3 px-2 text-gray-600">
                          {formatEuro(result.joint_with_reversion_100.total_expected_payout)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  )
}
