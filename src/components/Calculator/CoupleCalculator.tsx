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
          <h3 className="text-lg text-purple-900 mb-4">📊 Comparaison des stratégies</h3>
          
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
            <p className="text-sm text-blue-900">
              💡 <strong>Capital total : {formatEuro(result.total_capital)}</strong><br/>
              Comparez les revenus selon les scénarios (couple vivant / après décès de l&apos;un).
            </p>
          </div>

          {/* Tableau comparatif */}
          <div className="bg-white rounded-xl p-6 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2">Stratégie</th>
                  <th className="text-right py-3 px-2">Couple vivant</th>
                  <th className="text-right py-3 px-2">Si P1 décède<br/><span className="text-xs font-normal text-gray-500">→ P2 reçoit</span></th>
                  <th className="text-right py-3 px-2">Si P2 décède<br/><span className="text-xs font-normal text-gray-500">→ P1 reçoit</span></th>
                  <th className="text-right py-3 px-2">Total espéré<br/><span className="text-xs font-normal text-gray-500">(sur espérance vie)</span></th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-2 font-medium">
                    Rentes séparées
                    <div className="text-xs text-gray-500 font-normal">Chacun transforme son capital en rente</div>
                  </td>
                  <td className="text-right py-3 px-2 font-medium text-purple-900">
                    <div className="mb-1">P1 : {formatEuro(result.person1_solo.monthly_amount)}/mois</div>
                    <div>P2 : {formatEuro(result.person2_solo.monthly_amount)}/mois</div>
                    <div className="text-xs text-gray-500 font-normal mt-1">
                      Total : {formatEuro(result.person1_solo.monthly_amount + result.person2_solo.monthly_amount)}
                    </div>
                  </td>
                  <td className="text-right py-3 px-2 text-amber-700">
                    {formatEuro(result.person2_solo.monthly_amount)}
                    <div className="text-xs text-gray-500">P2 perd rente P1</div>
                  </td>
                  <td className="text-right py-3 px-2 text-amber-700">
                    {formatEuro(result.person1_solo.monthly_amount)}
                    <div className="text-xs text-gray-500">P1 perd rente P2</div>
                  </td>
                  <td className="text-right py-3 px-2 text-gray-600">
                    {formatEuro((result.person1_solo.total_expected_payout + result.person2_solo.total_expected_payout) / 2)}
                  </td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-2 font-medium">
                    Capital sur P1, rév. 60% → P2
                    <div className="text-xs text-gray-500 font-normal">Capital P2 non transformé (reste disponible)</div>
                  </td>
                  <td className="text-right py-3 px-2 font-medium text-purple-900">
                    {formatEuro(result.joint_with_reversion_60.monthly_amount)}
                    <div className="text-xs text-gray-500 font-normal">Rente viagère sur capital P1 uniquement</div>
                  </td>
                  <td className="text-right py-3 px-2 text-green-700">
                    {formatEuro(result.joint_with_reversion_60.with_reversion?.spouse_monthly_amount || 0)}
                    <div className="text-xs text-gray-500">60% rente + capital P2 intact</div>
                  </td>
                  <td className="text-right py-3 px-2 text-green-700">
                    {formatEuro(result.joint_with_reversion_60.monthly_amount)}
                    <div className="text-xs text-gray-500">100% rente + capital P2 intact</div>
                  </td>
                  <td className="text-right py-3 px-2 text-gray-600">
                    {formatEuro(result.joint_with_reversion_60.total_expected_payout)}
                  </td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-2 font-medium">
                    Capital sur P1, rév. 80% → P2
                    <div className="text-xs text-gray-500 font-normal">Capital P2 non transformé (reste disponible)</div>
                  </td>
                  <td className="text-right py-3 px-2 font-medium text-purple-900">
                    {formatEuro(result.joint_with_reversion_80.monthly_amount)}
                    <div className="text-xs text-gray-500 font-normal">Rente viagère sur capital P1 uniquement</div>
                  </td>
                  <td className="text-right py-3 px-2 text-green-700">
                    {formatEuro(result.joint_with_reversion_80.with_reversion?.spouse_monthly_amount || 0)}
                    <div className="text-xs text-gray-500">80% rente + capital P2 intact</div>
                  </td>
                  <td className="text-right py-3 px-2 text-green-700">
                    {formatEuro(result.joint_with_reversion_80.monthly_amount)}
                    <div className="text-xs text-gray-500">100% rente + capital P2 intact</div>
                  </td>
                  <td className="text-right py-3 px-2 text-gray-600">
                    {formatEuro(result.joint_with_reversion_80.total_expected_payout)}
                  </td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-2 font-medium">
                    Capital sur P1, rév. 100% → P2
                    <div className="text-xs text-gray-500 font-normal">Capital P2 non transformé (reste disponible)</div>
                  </td>
                  <td className="text-right py-3 px-2 font-medium text-purple-900">
                    {formatEuro(result.joint_with_reversion_100.monthly_amount)}
                    <div className="text-xs text-gray-500 font-normal">Rente viagère sur capital P1 uniquement</div>
                  </td>
                  <td className="text-right py-3 px-2 text-green-700">
                    {formatEuro(result.joint_with_reversion_100.with_reversion?.spouse_monthly_amount || 0)}
                    <div className="text-xs text-gray-500">100% rente + capital P2 intact</div>
                  </td>
                  <td className="text-right py-3 px-2 text-green-700">
                    {formatEuro(result.joint_with_reversion_100.monthly_amount)}
                    <div className="text-xs text-gray-500">100% rente + capital P2 intact</div>
                  </td>
                  <td className="text-right py-3 px-2 text-gray-600">
                    {formatEuro(result.joint_with_reversion_100.total_expected_payout)}
                  </td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-2 font-medium">
                    Capital sur P2, rév. 60% → P1
                    <div className="text-xs text-gray-500 font-normal">Capital P1 non transformé (reste disponible)</div>
                  </td>
                  <td className="text-right py-3 px-2 font-medium text-purple-900">
                    {formatEuro(result.p2_joint_with_reversion_60.monthly_amount)}
                    <div className="text-xs text-gray-500 font-normal">Rente viagère sur capital P2 uniquement</div>
                  </td>
                  <td className="text-right py-3 px-2 text-green-700">
                    {formatEuro(result.p2_joint_with_reversion_60.monthly_amount)}
                    <div className="text-xs text-gray-500">100% rente + capital P1 intact</div>
                  </td>
                  <td className="text-right py-3 px-2 text-green-700">
                    {formatEuro(result.p2_joint_with_reversion_60.with_reversion?.spouse_monthly_amount || 0)}
                    <div className="text-xs text-gray-500">60% rente + capital P1 intact</div>
                  </td>
                  <td className="text-right py-3 px-2 text-gray-600">
                    {formatEuro(result.p2_joint_with_reversion_60.total_expected_payout)}
                  </td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-2 font-medium">
                    Capital sur P2, rév. 80% → P1
                    <div className="text-xs text-gray-500 font-normal">Capital P1 non transformé (reste disponible)</div>
                  </td>
                  <td className="text-right py-3 px-2 font-medium text-purple-900">
                    {formatEuro(result.p2_joint_with_reversion_80.monthly_amount)}
                    <div className="text-xs text-gray-500 font-normal">Rente viagère sur capital P2 uniquement</div>
                  </td>
                  <td className="text-right py-3 px-2 text-green-700">
                    {formatEuro(result.p2_joint_with_reversion_80.monthly_amount)}
                    <div className="text-xs text-gray-500">100% rente + capital P1 intact</div>
                  </td>
                  <td className="text-right py-3 px-2 text-green-700">
                    {formatEuro(result.p2_joint_with_reversion_80.with_reversion?.spouse_monthly_amount || 0)}
                    <div className="text-xs text-gray-500">80% rente + capital P1 intact</div>
                  </td>
                  <td className="text-right py-3 px-2 text-gray-600">
                    {formatEuro(result.p2_joint_with_reversion_80.total_expected_payout)}
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-2 font-medium">
                    Capital sur P2, rév. 100% → P1
                    <div className="text-xs text-gray-500 font-normal">Capital P1 non transformé (reste disponible)</div>
                  </td>
                  <td className="text-right py-3 px-2 font-medium text-purple-900">
                    {formatEuro(result.p2_joint_with_reversion_100.monthly_amount)}
                    <div className="text-xs text-gray-500 font-normal">Rente viagère sur capital P2 uniquement</div>
                  </td>
                  <td className="text-right py-3 px-2 text-green-700">
                    {formatEuro(result.p2_joint_with_reversion_100.monthly_amount)}
                    <div className="text-xs text-gray-500">100% rente + capital P1 intact</div>
                  </td>
                  <td className="text-right py-3 px-2 text-green-700">
                    {formatEuro(result.p2_joint_with_reversion_100.with_reversion?.spouse_monthly_amount || 0)}
                    <div className="text-xs text-gray-500">100% rente + capital P1 intact</div>
                  </td>
                  <td className="text-right py-3 px-2 text-gray-600">
                    {formatEuro(result.p2_joint_with_reversion_100.total_expected_payout)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  )
}
