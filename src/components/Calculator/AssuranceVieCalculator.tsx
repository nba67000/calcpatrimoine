// src/components/Calculator/AssuranceVieCalculator.tsx
'use client'

import { useState, useMemo, useEffect } from 'react'
import FiscaliteComparisonChart from '@/components/FiscaliteComparisonChart'
import { calculerFiscaliteRachat, formatDateForInput, parseDateFromInput } from '@/lib/assuranceVie'
import type { AssuranceVieInputs, AssuranceVieResults } from '@/types/assuranceVie'
import { saveSimHistory } from '@/hooks/useSimStorage'
import AlertList from '@/components/AlertList'
import ChatWidget from '@/components/ChatWidget'
import { formatEur } from '@/lib/formatters'

export default function AssuranceVieCalculator() {
  const [capitalTotal, setCapitalTotal] = useState<number>(100000)
  const [versementTotal, setVersementTotal] = useState<number>(70000)
  const [dateOuverture, setDateOuverture] = useState<Date>(new Date(2015, 0, 1))
  const [montantRachat, setMontantRachat] = useState<number>(30000)
  const [versementAvant2017, setVersementAvant2017] = useState<number>(40000)
  const [tmi, setTmi] = useState<AssuranceVieInputs['tmi']>(30)
  const [enCouple, setEnCouple] = useState<boolean>(false)
  const [encoursTotalContrats, setEncoursTotalContrats] = useState<number>(70000)
  const results = useMemo<AssuranceVieResults>(() => calculerFiscaliteRachat({
    capitalTotal,
    versementTotal,
    dateOuverture,
    montantRachat,
    versementAvant2017,
    tmi,
    enCouple,
    encoursTotalContrats,
  }), [capitalTotal, versementTotal, dateOuverture, montantRachat, versementAvant2017, tmi, enCouple, encoursTotalContrats])

  useEffect(() => {
    if (results.plusValueTaxable <= 0) return
    saveSimHistory({
      slug: 'assurance-vie-rachat',
      nom: 'Fiscalité des rachats',
      href: '/assurance-vie/fiscalite-rachat',
      resume: `Rachat : ${formatEur(montantRachat)} · PV imposable : ${formatEur(results.plusValueTaxable)}`,
      date: new Date().toISOString(),
    })
  }, [results.plusValueTaxable, montantRachat])

  return (
    <>
    <div className="grid lg:grid-cols-2 gap-8">

      {/* COLONNE GAUCHE - INPUTS */}
      <div className="space-y-6">

        {/* Carte : Caractéristiques du contrat */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
          <h3 className="text-xl font-bold text-neutral-900 mb-6">
            Caractéristiques du contrat
          </h3>

          {/* Capital actuel */}
          <div className="mb-6">
            <div className="flex justify-between items-baseline mb-2">
              <label className="text-sm font-medium text-neutral-700">Capital actuel total</label>
              <span className="text-2xl font-bold text-primary-600">
                {formatEur(capitalTotal)}
              </span>
            </div>
            <input
              type="range" min="10000" max="500000" step="5000" value={capitalTotal}
              onChange={(e) => setCapitalTotal(Number(e.target.value))}
              className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
            />
            <div className="flex justify-between text-xs text-neutral-500 mt-1">
              <span>10 000€</span><span>500 000€</span>
            </div>
          </div>

          {/* Versements totaux - max déplafonné (moins-value possible) */}
          <div className="mb-6">
            <div className="flex justify-between items-baseline mb-2">
              <label className="text-sm font-medium text-neutral-700">Versements totaux</label>
              <span className="text-2xl font-bold text-neutral-900">
                {formatEur(versementTotal)}
              </span>
            </div>
            <input
              type="range" min="5000" max="500000" step="5000" value={versementTotal}
              onChange={(e) => setVersementTotal(Number(e.target.value))}
              className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
            />
            <div className="flex justify-between text-xs text-neutral-500 mt-1">
              <span>5 000€</span><span>500 000€</span>
            </div>
          </div>

          {/* Date d'ouverture */}
          <div className="mb-6">
            <label className="text-sm font-medium text-neutral-700 block mb-2">
              Date d&apos;ouverture du contrat
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

          {/* Plus-value / moins-value (calculée) */}
          {results && (
            <div className={`rounded-lg p-4 border ${results.plusValueTotale >= 0 ? 'bg-neutral-50 border-neutral-200' : 'bg-amber-50 border-amber-200'}`}>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-neutral-700">
                  {results.plusValueTotale >= 0 ? 'Plus-value totale' : 'Moins-value totale'}
                </span>
                <span className={`text-lg font-bold ${results.plusValueTotale >= 0 ? 'text-primary-600' : 'text-amber-600'}`}>
                  {results.plusValueTotale >= 0 ? '+' : ''}{formatEur(results.plusValueTotale)}
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
          <h3 className="text-xl font-bold text-neutral-900 mb-6">Rachat envisagé</h3>

          <div className="mb-6">
            <div className="flex justify-between items-baseline mb-2">
              <label className="text-sm font-medium text-neutral-700">Montant du rachat partiel</label>
              <span className="text-2xl font-bold text-primary-600">
                {formatEur(montantRachat)}
              </span>
            </div>
            <input
              type="range" min="1000" max={capitalTotal} step="1000" value={montantRachat}
              onChange={(e) => setMontantRachat(Number(e.target.value))}
              className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
            />
            <div className="flex justify-between text-xs text-neutral-500 mt-1">
              <span>1 000€</span><span>{capitalTotal.toLocaleString('fr-FR')}€</span>
            </div>
          </div>

          {results && (
            <div className="space-y-3">
              <div className="bg-neutral-50 rounded-lg p-4 border border-neutral-200">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-neutral-700">Capital (non taxé)</span>
                  <span className="font-bold text-neutral-900">{formatEur(results.partCapital)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-neutral-700">Plus-value (taxée)</span>
                  <span className="font-bold text-primary-600">{formatEur(results.partPlusValue)}</span>
                </div>
              </div>

              {results.abattementApplicable > 0 && (
                <div className="bg-primary-50 rounded-lg p-4 border border-primary-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-primary-700">✓ Abattement (contrat &gt; 8 ans)</span>
                    <span className="font-bold text-primary-600">-{formatEur(results.abattementApplicable)}</span>
                  </div>
                  <div className="text-xs text-primary-600 mt-1">
                    {enCouple ? 'Couple : 9 200€' : 'Personne seule : 4 600€'}
                  </div>
                </div>
              )}

              <div className="bg-primary-50 rounded-lg p-4 border border-primary-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-primary-700">Plus-value taxable finale</span>
                  <span className="text-lg font-bold text-primary-600">{formatEur(results.plusValueTaxable)}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Carte : Situation fiscale */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
          <h3 className="text-xl font-bold text-neutral-900 mb-6">Situation fiscale</h3>

          <div className="mb-6">
            <label className="text-sm font-medium text-neutral-700 block mb-3">
              Votre tranche marginale d&apos;imposition (TMI)
            </label>
            <div className="grid grid-cols-5 gap-2">
              {([0, 11, 30, 41, 45] as const).map((taux) => (
                <button
                  key={taux}
                  onClick={() => setTmi(taux)}
                  className={`py-2 px-1 sm:py-3 sm:px-2 rounded-lg font-bold text-sm transition-all ${
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
              Consultez votre dernier avis d&apos;imposition pour connaître votre TMI
            </p>
          </div>

          <div className="mb-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox" checked={enCouple}
                onChange={(e) => setEnCouple(e.target.checked)}
                className="w-5 h-5 text-primary-600 rounded focus:ring-2 focus:ring-primary-500"
              />
              <span className="text-sm font-medium text-neutral-700">
                En couple (abattement 9 200€ au lieu de 4 600€)
              </span>
            </label>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-baseline mb-2">
              <label className="text-sm font-medium text-neutral-700">Versements avant le 27/09/2017</label>
              <span className="text-lg font-bold text-neutral-900">
                {formatEur(versementAvant2017)}
              </span>
            </div>
            <input
              type="range" min="0" max={versementTotal} step="5000" value={versementAvant2017}
              onChange={(e) => setVersementAvant2017(Number(e.target.value))}
              className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
            />
            <div className="flex justify-between text-xs text-neutral-500 mt-1">
              <span>0€</span><span>{versementTotal.toLocaleString('fr-FR')}€</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-baseline mb-2">
              <label className="text-sm font-medium text-neutral-700">
                Total versé sur tous vos contrats d&apos;assurance-vie
              </label>
              <span className={`text-lg font-bold ${encoursTotalContrats > 150000 ? 'text-amber-600' : 'text-neutral-900'}`}>
                {formatEur(encoursTotalContrats)}
              </span>
            </div>
            <input
              type="range" min="0" max="1000000" step="5000" value={encoursTotalContrats}
              onChange={(e) => setEncoursTotalContrats(Number(e.target.value))}
              className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
            />
            <div className="flex justify-between text-xs text-neutral-500 mt-1">
              <span>0€</span><span>1 000 000€</span>
            </div>
            <p className="text-xs text-neutral-500 mt-2">
              Primes cumulées sur l&apos;ensemble de vos contrats (tous assureurs).
              Si vous n&apos;avez qu&apos;un seul contrat : saisir le même montant qu&apos;en « Versements totaux » ci-dessus.
              Au-delà de 150 000 € : le PFU passe de 7,5 % à 12,8 % (Art. 125-0 A CGI).
            </p>
            {encoursTotalContrats <= 150000 ? (
              <p className="text-xs text-primary-600 mt-1">Taux réduit : 7,5 % (total versé ≤ 150 000 €)</p>
            ) : (
              <p className="text-xs text-amber-600 mt-1">Taux normal : 12,8 % (total versé &gt; 150 000 €)</p>
            )}
          </div>
        </div>
      </div>

      {/* COLONNE DROITE - RÉSULTATS */}
      <div className="space-y-6">


        {results && (
          <>
            <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
              <FiscaliteComparisonChart
                optionPFU={results.optionPFU}
                optionIR={results.optionIR}
                optionMoinsImposee={results.optionMoinsImposee}
                montantRachat={montantRachat}
              />
            </div>

            <AlertList items={results.warnings} />
            <AlertList items={results.optimisations} />

            <div className="bg-neutral-50 rounded-xl border border-neutral-200 p-6">
              <h3 className="text-lg font-bold text-neutral-900 mb-4">Points clés</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Ancienneté contrat</span>
                  <span className="font-bold text-neutral-900">
                    {results.ancienneteContrat} ans {results.ancienneteMois} mois
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Plus-value taxable</span>
                  <span className="font-bold text-neutral-900">{formatEur(results.plusValueTaxable)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Option la moins imposée</span>
                  <span className="font-bold text-primary-600">{results.optionMoinsImposee}</span>
                </div>
                {results.difference > 50 && (
                  <div className="flex justify-between pt-2 border-t border-neutral-300">
                    <span className="text-neutral-600">Différence</span>
                    <span className="font-bold text-primary-600">{formatEur(results.difference)}</span>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
    {results && (
      <ChatWidget
        contexte={{
          calculateur: 'assurance-vie/fiscalite-rachat',
          inputs: {
            capitalTotal,
            versementTotal,
            dateOuverture,
            montantRachat,
            versementAvant2017,
            tmi,
            enCouple,
            encoursTotalContrats,
          },
          results,
        }}
      />
    )}
    </>
  )
}
