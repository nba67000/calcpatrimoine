// src/components/TransmissionChart.tsx
'use client'

import { useEffect, useState } from 'react'
import type { TransmissionResults } from '@/types/transmission'
import { getLibelleLien } from '@/lib/transmission'

interface TransmissionChartProps {
  results: TransmissionResults
}

// Couleurs par lien de parenté
const COULEURS_LIEN: Record<string, string> = {
  conjoint: 'from-purple-500 to-purple-600',
  enfant: 'from-primary-500 to-primary-600',
  frere_soeur: 'from-blue-500 to-blue-600',
  neveu_niece: 'from-teal-500 to-teal-600',
  autre: 'from-orange-500 to-orange-600'
}

const COULEURS_LIEN_BG: Record<string, string> = {
  conjoint: 'bg-purple-50 border-purple-200',
  enfant: 'bg-primary-50 border-primary-200',
  frere_soeur: 'bg-blue-50 border-blue-200',
  neveu_niece: 'bg-teal-50 border-teal-200',
  autre: 'bg-orange-50 border-orange-200'
}

export default function TransmissionChart({ results }: TransmissionChartProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [animatedValues, setAnimatedValues] = useState({
    totalNet: 0,
    totalImpots: 0,
    tauxEffectif: 0
  })

  useEffect(() => {
    setIsVisible(false)
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [results])

  // Animation des chiffres
  useEffect(() => {
    if (!isVisible) return
    
    const duration = 1200
    const steps = 60
    const interval = duration / steps
    
    let currentStep = 0
    const timer = setInterval(() => {
      currentStep++
      const progress = currentStep / steps
      const easeOutProgress = 1 - Math.pow(1 - progress, 3) // easeOutCubic
      
      setAnimatedValues({
        totalNet: results.totalNet * easeOutProgress,
        totalImpots: results.totalImpots * easeOutProgress,
        tauxEffectif: results.tauxEffectifGlobal * easeOutProgress
      })
      
      if (currentStep >= steps) clearInterval(timer)
    }, interval)
    
    return () => clearInterval(timer)
  }, [isVisible, results])

  const pourcentageNet = results.capitalTotal > 0 
    ? (results.totalNet / results.capitalTotal) * 100 
    : 0
  const pourcentageImpots = 100 - pourcentageNet

  return (
    <div className="space-y-8">
      
      {/* SECTION HERO : Gros chiffres + barre */}
      <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 rounded-2xl p-8 text-white shadow-xl">
        <div className="text-center mb-6">
          <p className="text-primary-100 text-sm uppercase tracking-wider mb-2">
            Capital transmis aux bénéficiaires
          </p>
          <div className="text-6xl font-bold tabular-nums">
            {Math.round(animatedValues.totalNet).toLocaleString('fr-FR')}€
          </div>
          <p className="text-primary-200 text-lg mt-2">
            sur {results.capitalTotal.toLocaleString('fr-FR')}€ transmis
          </p>
        </div>

        {/* Barre répartition animée */}
        <div className="relative h-16 bg-white/10 rounded-xl overflow-hidden backdrop-blur-sm">
          {/* Part nette (verte) */}
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-success-400 to-success-500 flex items-center justify-start pl-4 transition-all duration-1500 ease-out"
            style={{ width: isVisible ? `${pourcentageNet}%` : '0%' }}
          >
            {pourcentageNet > 20 && (
              <span className="text-white font-bold text-lg drop-shadow">
                {pourcentageNet.toFixed(1)}% net
              </span>
            )}
          </div>
          
          {/* Part impôts (rouge) */}
          <div
            className="absolute inset-y-0 right-0 bg-gradient-to-r from-red-400 to-red-500 flex items-center justify-end pr-4 transition-all duration-1500 ease-out"
            style={{ width: isVisible ? `${pourcentageImpots}%` : '0%' }}
          >
            {pourcentageImpots > 15 && (
              <span className="text-white font-bold text-lg drop-shadow">
                {pourcentageImpots.toFixed(1)}% impôts
              </span>
            )}
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="text-primary-200 text-xs uppercase mb-1">Droits payés</div>
            <div className="text-3xl font-bold tabular-nums">
              {Math.round(animatedValues.totalImpots).toLocaleString('fr-FR')}€
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="text-primary-200 text-xs uppercase mb-1">Taux effectif</div>
            <div className="text-3xl font-bold tabular-nums">
              {animatedValues.tauxEffectif.toFixed(1)}%
            </div>
          </div>
        </div>
      </div>

      {/* SECTION : Répartition par bénéficiaire */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-neutral-900 mb-4">
          Répartition par bénéficiaire
        </h3>
        
        {results.repartition.map((benef, index) => {
          const gradientClass = COULEURS_LIEN[benef.lien] || COULEURS_LIEN.autre
          const bgClass = COULEURS_LIEN_BG[benef.lien] || COULEURS_LIEN_BG.autre
          const pourcentageNetBenef = benef.part > 0 
            ? (benef.montantNet / benef.part) * 100 
            : 0
          const widthPart = results.capitalTotal > 0
            ? (benef.part / results.capitalTotal) * 100
            : 0

          return (
            <div 
              key={benef.id}
              className={`${bgClass} border-2 rounded-xl p-6 transition-all duration-500`}
              style={{ 
                transitionDelay: `${index * 150}ms`,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
              }}
            >
              {/* Header bénéficiaire */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-lg font-bold text-neutral-900">
                    {benef.nom}
                  </h4>
                  <p className="text-sm text-neutral-600">
                    {getLibelleLien(benef.lien as any)} · {benef.partPourcentage.toFixed(1)}% du capital
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-neutral-900 tabular-nums">
                    {Math.round(benef.montantNet).toLocaleString('fr-FR')}€
                  </div>
                  <div className="text-xs text-neutral-600">reçus nets</div>
                </div>
              </div>

              {/* Barre de répartition individuelle */}
              <div className="relative h-8 bg-white rounded-lg overflow-hidden shadow-inner">
                {/* Part nette */}
                <div
                  className={`absolute inset-y-0 left-0 bg-gradient-to-r ${gradientClass} transition-all duration-1000 ease-out`}
                  style={{ 
                    width: isVisible ? `${pourcentageNetBenef}%` : '0%',
                    transitionDelay: `${index * 150 + 300}ms`
                  }}
                />
                {/* Part impôts */}
                <div
                  className="absolute inset-y-0 right-0 bg-gradient-to-r from-red-300 to-red-400 transition-all duration-1000 ease-out"
                  style={{ 
                    width: isVisible ? `${100 - pourcentageNetBenef}%` : '0%',
                    transitionDelay: `${index * 150 + 300}ms`
                  }}
                />
              </div>

              {/* Détail */}
              <div className="grid grid-cols-3 gap-2 mt-4 text-xs">
                <div>
                  <div className="text-neutral-600">Part brute</div>
                  <div className="font-bold text-neutral-900 tabular-nums">
                    {Math.round(benef.part).toLocaleString('fr-FR')}€
                  </div>
                </div>
                <div>
                  <div className="text-neutral-600">Droits</div>
                  <div className="font-bold text-red-700 tabular-nums">
                    {Math.round(benef.totalImpots).toLocaleString('fr-FR')}€
                  </div>
                </div>
                <div>
                  <div className="text-neutral-600">Taux effectif</div>
                  <div className="font-bold text-neutral-900 tabular-nums">
                    {benef.tauxEffectif.toFixed(1)}%
                  </div>
                </div>
              </div>

              {/* Détail 990I / 757B si pertinent */}
              {(benef.impot990I > 0 || benef.droitsSuccession757B > 0) && (
                <details className="mt-3 text-xs">
                  <summary className="cursor-pointer text-neutral-700 hover:text-neutral-900 font-medium">
                    Voir le détail du calcul
                  </summary>
                  <div className="mt-3 space-y-2 pl-4 border-l-2 border-neutral-300">
                    {benef.impot990I > 0 && (
                      <div>
                        <p className="font-semibold text-neutral-800">Article 990 I (versements avant 70 ans)</p>
                        <p>Capital : {Math.round(benef.capital990I).toLocaleString('fr-FR')}€</p>
                        <p>Abattement : {benef.abattement990I.toLocaleString('fr-FR')}€</p>
                        <p>Base taxable : {Math.round(benef.baseTaxable990I).toLocaleString('fr-FR')}€</p>
                        <p className="font-bold">Droits : {Math.round(benef.impot990I).toLocaleString('fr-FR')}€</p>
                      </div>
                    )}
                    {benef.droitsSuccession757B > 0 && (
                      <div>
                        <p className="font-semibold text-neutral-800">Article 757 B (versements après 70 ans)</p>
                        <p>Capital : {Math.round(benef.capital757B).toLocaleString('fr-FR')}€</p>
                        <p>Abattement : {Math.round(benef.abattement757B).toLocaleString('fr-FR')}€</p>
                        <p>Base taxable : {Math.round(benef.baseTaxable757B).toLocaleString('fr-FR')}€</p>
                        <p className="font-bold">Droits : {Math.round(benef.droitsSuccession757B).toLocaleString('fr-FR')}€</p>
                      </div>
                    )}
                  </div>
                </details>
              )}
            </div>
          )
        })}
      </div>

      {/* SECTION : Comparaison succession classique */}
      {results.economieVsClassique > 0 && (
        <div className="bg-gradient-to-br from-success-50 to-success-100 border-2 border-success-300 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="text-4xl">📊</div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-success-900 mb-2">
                Comparaison avec une succession classique
              </h3>
              <p className="text-success-800 mb-4">
                Sans assurance-vie, les droits auraient été de environ{' '}
                <strong>{Math.round(results.impotsSuccessionClassique).toLocaleString('fr-FR')}€</strong>.
              </p>
              <div className="bg-white rounded-lg p-4 border border-success-200">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-neutral-700">Différence :</span>
                  <span className="text-3xl font-bold text-success-700 tabular-nums">
                    {Math.round(results.economieVsClassique).toLocaleString('fr-FR')}€
                  </span>
                </div>
              </div>
              <p className="text-xs text-success-700 mt-3">
                Estimation basée sur le barème succession ligne directe avec abattement 100 000€ par enfant.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Warnings */}
      {results.warnings.length > 0 && (
        <div className="bg-warning-50 border-2 border-warning-300 rounded-xl p-4 space-y-2">
          {results.warnings.map((w, i) => (
            <p key={i} className="text-sm text-warning-900">{w}</p>
          ))}
        </div>
      )}

      {/* Infos */}
      {results.infos.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 space-y-2">
          {results.infos.map((info, i) => (
            <p key={i} className="text-sm text-blue-900">{info}</p>
          ))}
        </div>
      )}
    </div>
  )
}
