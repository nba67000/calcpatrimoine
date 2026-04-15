// src/app/page.tsx
'use client'

import { useState } from 'react'
import RenteCalculator from '@/components/Calculator/RenteCalculator'
import InverseCalculator from '@/components/Calculator/InverseCalculator'
import CoupleCalculator from '@/components/Calculator/CoupleCalculator'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import TrustMarkers from '@/components/TrustMarkers'
import CrossLink from '@/components/CrossLink'

type CalculatorMode = 'standard' | 'inverse' | 'couple'

export default function Home() {
  const [mode, setMode] = useState<CalculatorMode>('standard')

  return (
    <main className="min-h-screen bg-neutral-50">
      <Header />

      {/* Hero Section - Redesign premium */}
      <section className="bg-gradient-to-b from-primary-900 to-primary-800 text-white">
        <div className="max-w-6xl mx-auto px-4 pt-20 pb-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight tracking-tight">
              Calculez votre rente viagère
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 mb-6 font-light">
              Conversion capital → revenus mensuels à vie
            </p>
            <p className="text-base text-primary-200 mb-8 leading-relaxed">
              Estimation fiable basée sur les tables de mortalité officielles INSEE.
              Gratuit, sans inscription, aucune donnée conservée.
            </p>
            
            {/* Clarification viager immobilier */}
            <div className="bg-warning-50 border-l-4 border-warning-500 rounded-md p-5 mb-8 text-left max-w-2xl mx-auto">
              <div className="flex gap-3">
                <span className="text-warning-600 text-lg flex-shrink-0">⚠️</span>
                <p className="text-sm text-warning-900">
                  <strong className="font-semibold">À ne pas confondre</strong> : La <strong>rente viagère</strong> (ce calculateur) 
                  convertit un capital financier en revenus mensuels versés à vie. 
                  Le <strong>viager immobilier</strong> est la vente d'un bien avec bouquet + rente.
                </p>
              </div>
            </div>
            
            <TrustMarkers />
          </div>
        </div>
      </section>

      {/* Section calculateurs avec background neutre */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        {/* Tabs redesign - Plus sobre */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white rounded-lg shadow-md p-1.5 border border-neutral-200">
            <button
              onClick={() => setMode('standard')}
              className={`px-8 py-3 rounded-md text-sm font-semibold transition-all ${
                mode === 'standard'
                  ? 'bg-primary-700 text-white shadow-sm'
                  : 'text-neutral-700 hover:bg-neutral-50'
              }`}
            >
              📊 Calculateur classique
            </button>
            <button
              onClick={() => setMode('inverse')}
              className={`px-8 py-3 rounded-md text-sm font-semibold transition-all ${
                mode === 'inverse'
                  ? 'bg-primary-700 text-white shadow-sm'
                  : 'text-neutral-700 hover:bg-neutral-50'
              }`}
            >
              🎯 Calculateur inverse
            </button>
            <button
              onClick={() => setMode('couple')}
              className={`px-8 py-3 rounded-md text-sm font-semibold transition-all ${
                mode === 'couple'
                  ? 'bg-primary-700 text-white shadow-sm'
                  : 'text-neutral-700 hover:bg-neutral-50'
              }`}
            >
              💑 Mode couple
            </button>
          </div>
        </div>

        {/* Description */}
        <div className="text-center mb-8">
          {mode === 'standard' && (
            <p className="text-sm text-neutral-600">
              Calculez le montant de votre rente mensuelle à partir d&apos;un capital
            </p>
          )}
          {mode === 'inverse' && (
            <p className="text-sm text-neutral-600">
              💡 <strong>Nouveau :</strong> Découvrez quel capital est nécessaire pour obtenir la rente souhaitée
            </p>
          )}
          {mode === 'couple' && (
            <p className="text-sm text-neutral-600">
              💡 <strong>Nouveau :</strong> Comparez toutes les stratégies pour optimiser vos rentes à deux
            </p>
          )}
        </div>

        {/* Calculateur actif */}
        {mode === 'standard' && <RenteCalculator />}
        {mode === 'inverse' && <InverseCalculator />}
        {mode === 'couple' && <CoupleCalculator />}
        
        {/* Prochains calculateurs */}
        <div className="mt-16 pt-12 border-t border-neutral-200">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-2">Prochainement sur CalcPatrimoine</h2>
            <p className="text-neutral-600">D&apos;autres calculateurs patrimoniaux arrivent</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white border border-neutral-200 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="font-semibold text-neutral-900 mb-2">TMI</h3>
              <p className="text-sm text-neutral-600 mb-3">Calculateur Tranche Marginale d&apos;Imposition</p>
              <span className="inline-block px-3 py-1 bg-success-50 text-success-700 text-xs font-medium rounded-full">
                T2 2026
              </span>
            </div>
            
            <div className="bg-white border border-neutral-200 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="font-semibold text-neutral-900 mb-2">Assurance-vie</h3>
              <p className="text-sm text-neutral-600 mb-3">Fiscalité rachat partiel/total</p>
              <span className="inline-block px-3 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded-full">
                T3 2026
              </span>
            </div>
            
            <div className="bg-white border border-neutral-200 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="font-semibold text-neutral-900 mb-2">PER</h3>
              <p className="text-sm text-neutral-600 mb-3">Optimisation déductibilité fiscale</p>
              <span className="inline-block px-3 py-1 bg-purple-50 text-purple-700 text-xs font-medium rounded-full">
                T4 2026
              </span>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <p className="text-sm text-neutral-500">
              📧 Inscrivez-vous pour être notifié des nouveaux calculateurs (bientôt)
            </p>
          </div>
        </div>
        
        {/* Cross-links vers FAQ et Méthodologie */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <CrossLink
            title="Des questions ?"
            description="Consultez notre FAQ pour tout comprendre sur la rente viagère"
            href="/faq"
            icon="❓"
            variant="blue"
          />
          <CrossLink
            title="Comment on calcule ?"
            description="Découvrez les formules actuarielles et les données INSEE utilisées"
            href="/methodologie"
            icon="📐"
            variant="purple"
          />
        </div>
      </section>

      <Footer />
    </main>
  )
}
