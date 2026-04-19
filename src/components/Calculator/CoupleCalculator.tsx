// src/components/Calculator/CoupleCalculator.tsx
'use client'

import { useState, useEffect } from 'react'
import { calculateCoupleStrategies, formatEuro } from '@/lib/mortality'
import type { CoupleProfile, CoupleCalculation } from '@/types'
import { motion } from 'framer-motion'
import LegalDisclaimer from '@/components/LegalDisclaimer'

export default function CoupleCalculator() {
 const [person1Age, setPerson1Age] = useState<number>(67)
 const [person2Age, setPerson2Age] = useState<number>(64)
 const [totalCapital, setTotalCapital] = useState<number>(180000)
 
 const [strategies, setStrategies] = useState<CoupleCalculation[]>([])
 const [isCalculating, setIsCalculating] = useState(false)

 // Formatage montant avec espaces
 const formatCapitalInput = (value: number): string => {
 return value.toLocaleString('fr-FR')
 }

 const parseCapitalInput = (value: string): number => {
 return Number(value.replace(/\s/g, ''))
 }

 useEffect(() => {
 setIsCalculating(true)
 
 const timer = setTimeout(() => {
 const profile: CoupleProfile = {
 person1_age: person1Age,
 person2_age: person2Age,
 total_capital: totalCapital
 }
 
 const result = calculateCoupleStrategies(profile)
 setStrategies(result)
 setIsCalculating(false)
 }, 150)
 
 return () => clearTimeout(timer)
 }, [person1Age, person2Age, totalCapital])

 return (
 <div className="max-w-5xl mx-auto" suppressHydrationWarning>
 {/* Formulaire */}
 <div className="bg-neutral-100 rounded-lg shadow-md p-8 mb-6 border-l-4 border-primary-600" suppressHydrationWarning>
 <h2 className="text-xl font-medium mb-2">Mode couple</h2>
 <p className="text-sm text-neutral-600 mb-6">
 Comparez 9 stratégies de rente pour optimiser votre situation à deux
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
 <strong>Capital commun (compte joint) :</strong>Peut être alloué 
 librement selon toutes les stratégies affichées ci-dessous.
 </p>
 <p>
 <strong>Contrats individuels séparés :</strong>Si Personne 1 a une assurance-vie 
 à son nom (100k€) et Personne 2 une autre (80k€), seules les stratégies 
 "P1 seule" et "P2 seule" sont directement applicables. Les autres 
 stratégies nécessiteraient de transférer les fonds sur un compte 
 commun avant conversion en rente.
 </p>
 <p className="font-semibold text-primary-900 mt-2">
 Selon votre régime matrimonial (communauté, séparation de biens), 
 les possibilités et implications fiscales/successorales diffèrent. 
 Un notaire pourra vous conseiller précisément.
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
 <div className="flex justify-between items-center mb-2">
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
 <div className="flex justify-between items-center mb-2">
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
 <div className="flex justify-between items-center mb-2">
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
 Voici toutes les options possibles pour votre situation. Choisissez selon vos priorités.
 </p>

 <div className="space-y-4">
 {strategies.map((strategy, index) => (
 <motion.div
 key={index}
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: index * 0.05 }}
 className="border border-neutral-200 rounded-lg p-6 hover:border-primary-300 transition-colors"
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
 </motion.div>
 ))}
 </div>

 {/* Note explicative réversion */}
 <div className="mt-6 p-4 bg-primary-50 border-l-4 border-primary-300 rounded-lg">
 <p className="text-sm text-primary-900">
 <strong>Important</strong> : La réversion est <strong>unidirectionnelle</strong>.
 Si "P1 titulaire, 80% à P2" : P1 décède → P2 reçoit 80%. Mais si P2 décède d'abord → P1 garde 100%.
 </p>
 </div>

 {/* Disclaimer LONG */}
 <div className="mt-6 p-6 bg-primary-50 border-2 border-primary-200 rounded-lg">
 <h4 className="text-base font-bold text-primary-900 mb-3 flex items-center gap-2">
 <span className="text-xl"></span>
 Avertissement Important
 </h4>
 
 <div className="text-sm text-primary-800 space-y-3">
 <p className="font-semibold">
 CalcPatrimoine est un outil pédagogique gratuit à titre indicatif uniquement. 
 Il ne constitue en aucun cas :
 </p>
 
 <ul className="list-disc list-inside space-y-1 ml-4 text-primary-700">
 <li>Un conseil en investissement personnalisé</li>
 <li>Une recommandation de souscription</li>
 <li>Une garantie de résultat</li>
 <li>Un avis juridique, fiscal ou patrimonial</li>
 </ul>
 
 <p className="font-semibold mt-3">
 Les calculs sont basés sur des formules actuarielles standard mais ne tiennent PAS compte de :
 </p>
 
 <ul className="list-disc list-inside space-y-1 ml-4 text-primary-700 text-xs">
 <li>Votre situation fiscale personnelle</li>
 <li>Votre état de santé spécifique</li>
 <li>Votre régime matrimonial</li>
 <li>Les frais et commissions des assureurs (variables selon contrats)</li>
 <li>Les clauses particulières des contrats</li>
 <li>Les évolutions réglementaires futures</li>
 </ul>
 
 <p className="font-bold text-primary-900 mt-3">
 Avant toute décision d'investissement, consultez IMPÉRATIVEMENT :
 </p>
 
 <ul className="list-disc list-inside space-y-1 ml-4 text-primary-700">
 <li>Un <strong>conseiller en gestion de patrimoine</strong> certifié (CGP)</li>
 <li>Un <strong>notaire</strong> pour les aspects successoraux et matrimoniaux</li>
 <li>Un <strong>expert-comptable</strong> pour optimiser la fiscalité</li>
 </ul>
 
 <div className="border-t border-primary-300 pt-3 mt-3">
 <p className="text-xs text-primary-700">
 <strong>Limitation de responsabilité :</strong>CalcPatrimoine décline toute responsabilité 
 en cas de décision prise uniquement sur la base des calculs fournis. L'éditeur ne peut être 
 tenu responsable d'éventuelles erreurs de calcul, bugs logiciels, ou évolutions réglementaires 
 postérieures à la dernière mise à jour (avril 2026).
 </p>
 <p className="text-xs text-primary-700 mt-2">
 <a href="/cgu" className="underline hover:text-primary-900 font-medium">
 Conditions d'utilisation complètes →
 </a>
 </p>
 </div>
 </div>
 </div>
 </div>
 )}

 {/* État calcul */}
 {isCalculating && (
 <div className="text-center py-8 text-neutral-500">
 <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
 <p className="mt-2 text-sm">Calcul en cours...</p>
 </div>
 )}
 </div>
 )
}
