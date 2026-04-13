// src/app/page.tsx
'use client'

import { useState } from 'react'
import RenteCalculator from '@/components/Calculator/RenteCalculator'
import InverseCalculator from '@/components/Calculator/InverseCalculator'
import CoupleCalculator from '@/components/Calculator/CoupleCalculator'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import TrustMarkers from '@/components/TrustMarkers'

type CalculatorMode = 'standard' | 'inverse' | 'couple'

export default function Home() {
  const [mode, setMode] = useState<CalculatorMode>('standard')

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 pt-16 pb-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Calculez votre rente viagère<br />en 30 secondes
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Estimation fiable basée sur les tables de mortalité officielles INSEE.
            Gratuit, sans inscription, aucune donnée conservée.
          </p>
          
          <TrustMarkers />
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white rounded-xl border border-gray-200 p-1">
            <button
              onClick={() => setMode('standard')}
              className={`px-6 py-3 rounded-lg text-sm font-medium transition-all ${
                mode === 'standard'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              📊 Calculateur classique
            </button>
            <button
              onClick={() => setMode('inverse')}
              className={`px-6 py-3 rounded-lg text-sm font-medium transition-all ${
                mode === 'inverse'
                  ? 'bg-green-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              🎯 Calculateur inverse
            </button>
            <button
              onClick={() => setMode('couple')}
              className={`px-6 py-3 rounded-lg text-sm font-medium transition-all ${
                mode === 'couple'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              👫 Mode couple
            </button>
          </div>
        </div>

        {/* Description */}
        <div className="text-center mb-8">
          {mode === 'standard' && (
            <p className="text-sm text-gray-600">
              Calculez le montant de votre rente mensuelle à partir d&apos;un capital
            </p>
          )}
          {mode === 'inverse' && (
            <p className="text-sm text-gray-600">
              💡 <strong>Nouveau :</strong> Découvrez quel capital est nécessaire pour obtenir la rente souhaitée
            </p>
          )}
          {mode === 'couple' && (
            <p className="text-sm text-gray-600">
              💡 <strong>Nouveau :</strong> Comparez toutes les stratégies pour optimiser vos rentes à deux
            </p>
          )}
        </div>

        {/* Calculateur actif */}
        {mode === 'standard' && <RenteCalculator />}
        {mode === 'inverse' && <InverseCalculator />}
        {mode === 'couple' && <CoupleCalculator />}
        
        {/* Prochains calculateurs */}
        <div className="mt-16 pt-12 border-t border-gray-200">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Prochainement sur CalcPatrimoine</h2>
            <p className="text-gray-600">D&apos;autres calculateurs patrimoniaux arrivent</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">TMI</h3>
              <p className="text-sm text-gray-600 mb-3">Calculateur Tranche Marginale d&apos;Imposition</p>
              <span className="inline-block px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full">
                T2 2026
              </span>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Assurance-vie</h3>
              <p className="text-sm text-gray-600 mb-3">Fiscalité rachat partiel/total</p>
              <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                T3 2026
              </span>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">PER</h3>
              <p className="text-sm text-gray-600 mb-3">Optimisation déductibilité fiscale</p>
              <span className="inline-block px-3 py-1 bg-purple-50 text-purple-700 text-xs font-medium rounded-full">
                T4 2026
              </span>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500">
              📧 Inscrivez-vous pour être notifié des nouveaux calculateurs (bientôt)
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
