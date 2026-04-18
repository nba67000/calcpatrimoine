// src/components/Calculator/AssuranceVieCalculator.tsx
'use client'

import { useState, useEffect } from 'react'
import FiscaliteComparisonChart from '@/components/FiscaliteComparisonChart'
import { calculerFiscaliteRachat, formatDateForInput, parseDateFromInput } from '@/lib/assuranceVie'
import type { AssuranceVieInputs, AssuranceVieResults } from '@/types/assuranceVie'

export default function AssuranceVieCalculator() {
  // États inputs
  const [capitalTotal, setCapitalTotal] = useState<number>(100000)
  const [versementTotal, setVersementTotal] = useState<number>(70000)
  const [dateOuverture, setDateOuverture] = useState<Date>(new Date(2015, 0, 1))
  const [montantRachat, setMontantRachat] = useState<number>(30000)
  const [versementAvant2017, setVersementAvant2017] = useState<number>(40000)
  const [tmi, setTmi] = useState<AssuranceVieInputs['tmi']>(30)
  const [enCouple, setEnCouple] = useState<boolean>(false)

  // État résultats
  const [results, setResults] = useState<AssuranceVieResults | null>(null)

  // Calcul au chargement et à chaque changement
  useEffect(() => {
    const inputs: AssuranceVieInputs = {
      capitalTotal,
      versementTotal,
      dateOuverture,
      montantRachat,
      versementAvant2017,
      tmi,
      enCouple
    }
    
    const calculatedResults = calculerFiscaliteRachat(inputs)
    setResults(calculatedResults)
  }, [capitalTotal, versementTotal, dateOuverture, montantRachat, versementAvant2017, tmi, enCouple])

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      
      {/* COLONNE GAUCHE - INPUTS */}
      <div className="space-y-6">
        
        {/* Carte : Caractéristiques du contrat */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
          <h3 className="text-xl font-bold text-neutral-900 mb-6">
            📊 Caractéristiques du contrat
          </h3>

          {/* Capital actuel */}
          <div className="mb-6">
            <div className="flex justify-between items-baseline mb-2">
              <label className="text-sm font-medium text-neutral-700">
                Capital actuel total
              </label>
              <span className="text-2xl font-bold text-primary-600">
                {capitalTotal.toLocaleString('fr-FR')} €
              </span>
            </div>
            <input
              type="range"
              min="10000"
              max="500000"
              step="5000"
              value={capitalTotal}
              onChange={(e) => setCapitalTotal(Number(e.target.value))}
              className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
            />
            <div className="flex justify-between text-xs text-neutral-500 mt-1">
              <span>10 000€</span>
              <span>500 000€</span>
            </div>
          </div>

          {/* Versements totaux */}
          <div className="mb-6">
            <div className="flex justify-between items-baseline mb-2">
              <label className="text-sm font-medium text-neutral-700">
                Versements totaux
              </label>
              <span className="text-2xl font-bold text-neutral-900">
                {versementTotal.toLocaleString('fr-FR')} €
              </span>
            </div>
            <input
              type="range"
              min="5000"
              max={capitalTotal}
              step="5000"
              value={versementTotal}
              onChange={(e) => setVersementTotal(Number(e.target.value))}
              className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
            />
            <div className="flex justify-between text-xs text-neutral-500 mt-1">
              <span>5 000€</span>
              <span>{capitalTotal.toLocaleString('fr-FR')}€</span>
            </div>
          </div>

          {/* Date d'ouverture */}
          <div className="mb-6">
            <label className="text-sm font-medium text-neutral-700 block mb-2">
              Date d'ouverture du contrat
            </label>
            <input
              type="date"
              value={formatDateForInput(dateOuverture)}
              onChange={(e) => setDateOuverture(parseDateFromInput(e.target.value))}
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-lg font-medium"
            />
            {results && (
              <div className="mt-2 text-sm text-neutral-600">
                Ancienneté : <span className="font-bold text-neutral-900">
                  {results.ancienneteContrat} ans et {results.ancienneteMois} mois
                </span>
              </div>
            )}
          </div>

          {/* Plus-value (calculée) */}
          {results && (
            <div className="bg-neutral-50 rounded-lg p-4 border border-neutral-200">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-neutral-700">
                  Plus-value totale
                </span>
                <span className="text-lg font-bold text-success-600">
                  +{results.plusValueTotale.toLocaleString('fr-FR')} €
                </span>
              </div>
              <div className="text-xs text-neutral-500 mt-1">
                Soit {results.tauxPlusValue.toFixed(1)}% du capital
              </div>
            </div>
          )}
        </div>

        {/* Carte : Rachat envisagé */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
          <h3 className="text-xl font-bold text-neutral-900 mb-6">
            💰 Rachat envisagé
          </h3>

          {/* Montant du rachat */}
          <div className="mb-6">
            <div className="flex justify-between items-baseline mb-2">
              <label className="text-sm font-medium text-neutral-700">
                Montant du rachat partiel
              </label>
              <span className="text-2xl font-bold text-primary-600">
                {montantRachat.toLocaleString('fr-FR')} €
              </span>
            </div>
            <input
              type="range"
              min="1000"
              max={capitalTotal}
              step="1000"
              value={montantRachat}
              onChange={(e) => setMontantRachat(Number(e.target.value))}
              className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
            />
            <div className="flex justify-between text-xs text-neutral-500 mt-1">
              <span>1 000€</span>
              <span>{capitalTotal.toLocaleString('fr-FR')}€</span>
            </div>
          </div>

          {/* Répartition rachat */}
          {results && (
            <div className="space-y-3">
              <div className="bg-neutral-50 rounded-lg p-4 border border-neutral-200">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-neutral-700">
                    Capital (non taxé)
                  </span>
                  <span className="font-bold text-neutral-900">
                    {results.partCapital.toLocaleString('fr-FR')} €
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-neutral-700">
                    Plus-value (taxée)
                  </span>
                  <span className="font-bold text-warning-600">
                    {results.partPlusValue.toLocaleString('fr-FR')} €
                  </span>
                </div>
              </div>

              {results.abattementApplicable > 0 && (
                <div className="bg-success-50 rounded-lg p-4 border border-success-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-success-700">
                      ✓ Abattement (contrat &gt; 8 ans)
                    </span>
                    <span className="font-bold text-success-600">
                      -{results.abattementApplicable.toLocaleString('fr-FR')} €
                    </span>
                  </div>
                  <div className="text-xs text-success-600 mt-1">
                    {enCouple ? 'Couple : 9 200€' : 'Personne seule : 4 600€'}
                  </div>
                </div>
              )}

              <div className="bg-primary-50 rounded-lg p-4 border border-primary-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-primary-700">
                    Plus-value taxable finale
                  </span>
                  <span className="text-lg font-bold text-primary-600">
                    {results.plusValueTaxable.toLocaleString('fr-FR')} €
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Carte : Situation fiscale */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
          <h3 className="text-xl font-bold text-neutral-900 mb-6">
            📋 Situation fiscale
          </h3>

          {/* TMI */}
          <div className="mb-6">
            <label className="text-sm font-medium text-neutral-700 block mb-3">
              Votre tranche marginale d'imposition (TMI)
            </label>
            <div className="grid grid-cols-5 gap-2">
              {([0, 11, 30, 41, 45] as const).map((taux) => (
                <button
                  key={taux}
                  onClick={() => setTmi(taux)}
                  className={`py-3 px-2 rounded-lg font-bold text-sm transition-all ${
                    tmi === taux
                      ? 'bg-primary-600 text-white shadow-md scale-105'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {taux}%
                </button>
              ))}
            </div>
            <p className="text-xs text-neutral-500 mt-2">
              Consultez votre dernier avis d'imposition pour connaître votre TMI
            </p>
          </div>

          {/* En couple */}
          <div className="mb-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={enCouple}
                onChange={(e) => setEnCouple(e.target.checked)}
                className="w-5 h-5 text-primary-600 rounded focus:ring-2 focus:ring-primary-500"
              />
              <span className="text-sm font-medium text-neutral-700">
                En couple (abattement 9 200€ au lieu de 4 600€)
              </span>
            </label>
          </div>

          {/* Versements avant 2017 */}
          <div>
            <div className="flex justify-between items-baseline mb-2">
              <label className="text-sm font-medium text-neutral-700">
                Versements avant le 27/09/2017
              </label>
              <span className="text-lg font-bold text-neutral-900">
                {versementAvant2017.toLocaleString('fr-FR')} €
              </span>
            </div>
            <input
              type="range"
              min="0"
              max={versementTotal}
              step="5000"
              value={versementAvant2017}
              onChange={(e) => setVersementAvant2017(Number(e.target.value))}
              className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
            />
            <div className="flex justify-between text-xs text-neutral-500 mt-1">
              <span>0€</span>
              <span>{versementTotal.toLocaleString('fr-FR')}€</span>
            </div>
            {versementAvant2017 > 0 && (
              <p className="text-xs text-success-600 mt-2">
                ✓ Fiscalité réduite : 24,7% au lieu de 30%
              </p>
            )}
          </div>
        </div>
      </div>

      {/* COLONNE DROITE - RÉSULTATS */}
      <div className="space-y-6">
        
        {/* DISCLAIMER JURIDIQUE */}
        <div className="bg-warning-50 border-2 border-warning-300 rounded-xl p-5">
          <div className="flex gap-3">
            <div className="text-2xl flex-shrink-0">⚠️</div>
            <div>
              <p className="font-bold text-warning-900 mb-2 text-sm">
                Outil de comparaison uniquement
              </p>
              <p className="text-xs text-warning-800 leading-relaxed">
                Ce calculateur compare les options fiscales disponibles. Il ne constitue pas 
                un conseil fiscal personnalisé. Le choix final vous appartient. Pour une décision 
                adaptée à votre situation, consultez un expert-comptable, un avocat fiscaliste 
                ou un conseiller en gestion de patrimoine indépendant.
              </p>
            </div>
          </div>
        </div>
        
        {results && (
          <>
            {/* Graphique comparatif */}
            <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
              <FiscaliteComparisonChart
                optionPFU={results.optionPFU}
                optionIR={results.optionIR}
                optionMoinsImposee={results.optionMoinsImposee}
                montantRachat={montantRachat}
              />
            </div>

            {/* Warnings */}
            {results.warnings.length > 0 && (
              <div className="space-y-3">
                {results.warnings.map((warning, index) => (
                  <div
                    key={index}
                    className={`rounded-xl p-5 border-2 ${
                      warning.type === 'danger'
                        ? 'bg-red-50 border-red-300'
                        : warning.type === 'warning'
                        ? 'bg-warning-50 border-warning-300'
                        : 'bg-blue-50 border-blue-300'
                    }`}
                  >
                    <p className={`text-sm leading-relaxed ${
                      warning.type === 'danger'
                        ? 'text-red-700'
                        : warning.type === 'warning'
                        ? 'text-warning-700'
                        : 'text-blue-700'
                    }`}>
                      {warning.message}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Optimisations */}
            {results.optimisations.length > 0 && (
              <div className="space-y-3">
                {results.optimisations.map((optim, index) => (
                  <div
                    key={index}
                    className={`rounded-xl p-5 border-2 ${
                      optim.type === 'success'
                        ? 'bg-success-50 border-success-300'
                        : 'bg-blue-50 border-blue-300'
                    }`}
                  >
                    <p className={`text-sm leading-relaxed ${
                      optim.type === 'success'
                        ? 'text-success-700'
                        : 'text-blue-700'
                    }`}>
                      {optim.message}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Synthèse */}
            <div className="bg-neutral-50 rounded-xl border border-neutral-200 p-6">
              <h3 className="text-lg font-bold text-neutral-900 mb-4">
                📌 Points clés
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Ancienneté contrat</span>
                  <span className="font-bold text-neutral-900">
                    {results.ancienneteContrat} ans {results.ancienneteMois} mois
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Plus-value taxable</span>
                  <span className="font-bold text-neutral-900">
                    {results.plusValueTaxable.toLocaleString('fr-FR')}€
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Option la moins imposée</span>
                  <span className="font-bold text-primary-600">
                    {results.optionMoinsImposee}
                  </span>
                </div>
                {results.difference > 50 && (
                  <div className="flex justify-between pt-2 border-t border-neutral-300">
                    <span className="text-neutral-600">Différence</span>
                    <span className="font-bold text-blue-600">
                      {results.difference.toLocaleString('fr-FR')}€
                    </span>
                  </div>
                )}
              </div>
            </div>

          </>
        )}
      </div>

    </div>
  )
}
