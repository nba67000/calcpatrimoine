'use client'

import { useState, useMemo, useEffect } from 'react'
import { calculerPlusValueImmobiliere } from '@/lib/plusValueImmobiliere'
import type { PlusValueImmobiliereInputs } from '@/types/plusValueImmobiliere'
import { saveSimHistory } from '@/hooks/useSimStorage'
import AlertList from '@/components/AlertList'
import ChatWidget from '@/components/ChatWidget'
import { formatEur, formatPct } from '@/lib/formatters'

export default function PlusValueImmobiliereCalculator() {
  const [dateAcquisition, setDateAcquisition] = useState('2018-05-02')
  const [prixAcquisition, setPrixAcquisition] = useState(200000)
  const [fraisAcquisition, setFraisAcquisition] = useState<PlusValueImmobiliereInputs['fraisAcquisition']>('forfait')
  const [fraisAcquisitionReels, setFraisAcquisitionReels] = useState(15000)
  const [travaux, setTravaux] = useState<PlusValueImmobiliereInputs['travaux']>('forfait')
  const [travauxReels, setTravauxReels] = useState(0)
  const [dateCession, setDateCession] = useState('2026-05-02')
  const [prixCession, setPrixCession] = useState(295000)
  const [typeBien, setTypeBien] = useState<PlusValueImmobiliereInputs['typeBien']>('autre')
  const [premiereCession, setPremiereCession] = useState(false)

  const results = useMemo(
    () =>
      calculerPlusValueImmobiliere({
        dateAcquisition,
        prixAcquisition,
        fraisAcquisition,
        fraisAcquisitionReels,
        travaux,
        travauxReels,
        dateCession,
        prixCession,
        typeBien,
        premiereCession,
      }),
    [
      dateAcquisition, prixAcquisition, fraisAcquisition, fraisAcquisitionReels,
      travaux, travauxReels, dateCession, prixCession, typeBien, premiereCession,
    ]
  )

  const forfaitDisponible = results.anneesDetention > 5

  useEffect(() => {
    if (results.pvBrute <= 0) return
    saveSimHistory({
      slug: 'plus-value-immobiliere',
      nom: 'Plus-value immobilière',
      href: '/plus-value-immobiliere',
      resume: `PV brute : ${formatEur(results.pvBrute)} · Impôts : ${formatEur(results.totalImpots)}`,
      date: new Date().toISOString(),
    })
  }, [results.pvBrute, results.totalImpots])

  return (
    <>
    <div className="grid lg:grid-cols-2 gap-8">

      {/* === COLONNE GAUCHE - INPUTS === */}
      <div className="space-y-6">

        {/* Carte : Acquisition */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
          <h3 className="text-xl font-bold text-neutral-900 mb-6">Acquisition</h3>

          {/* Date acquisition */}
          <div className="mb-5">
            <label className="text-sm font-medium text-neutral-700 block mb-2">
              Date d&apos;acquisition
            </label>
            <input
              type="date"
              value={dateAcquisition}
              onChange={(e) => setDateAcquisition(e.target.value)}
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base"
            />
            <p className="text-xs text-neutral-500 mt-1">
              Durée de détention : <span className="font-bold text-neutral-700">{results.anneesDetention} an{results.anneesDetention !== 1 ? 's' : ''}</span>
            </p>
          </div>

          {/* Prix d'acquisition */}
          <div className="mb-5">
            <label className="text-sm font-medium text-neutral-700 block mb-2">
              Prix d&apos;acquisition
            </label>
            <div className="relative">
              <input
                type="number"
                min="0"
                step="1000"
                value={prixAcquisition}
                onChange={(e) => setPrixAcquisition(Number(e.target.value))}
                className="w-full px-4 py-3 pr-10 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base font-medium"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 text-sm">€</span>
            </div>
          </div>

          {/* Frais d'acquisition */}
          <div className="mb-5">
            <label className="text-sm font-medium text-neutral-700 block mb-2">
              Frais d&apos;acquisition (droits + notaire)
            </label>
            <div className="grid grid-cols-2 gap-2 mb-3">
              {(['forfait', 'reel'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setFraisAcquisition(mode)}
                  className={`py-2 px-3 rounded-lg font-medium text-sm transition-all ${
                    fraisAcquisition === mode
                      ? 'bg-primary-600 text-white shadow-md'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {mode === 'forfait' ? `Forfait 7,5 %` : 'Montant réel'}
                </button>
              ))}
            </div>
            {fraisAcquisition === 'forfait' ? (
              <p className="text-xs text-primary-600 bg-primary-50 px-3 py-2 rounded-lg">
                Forfait appliqué : {formatEur(Math.round(prixAcquisition * 0.075))}
              </p>
            ) : (
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  step="100"
                  value={fraisAcquisitionReels}
                  onChange={(e) => setFraisAcquisitionReels(Number(e.target.value))}
                  className="w-full px-4 py-3 pr-10 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base"
                  placeholder="Montant réel des frais"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 text-sm">€</span>
              </div>
            )}
          </div>

          {/* Travaux */}
          <div>
            <label className="text-sm font-medium text-neutral-700 block mb-2">
              Travaux
            </label>
            <div className="grid grid-cols-3 gap-2 mb-3">
              {(['aucun', 'forfait', 'reel'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setTravaux(mode)}
                  disabled={mode === 'forfait' && !forfaitDisponible}
                  className={`py-2 px-2 rounded-lg font-medium text-xs transition-all ${
                    travaux === mode
                      ? 'bg-primary-600 text-white shadow-md'
                      : mode === 'forfait' && !forfaitDisponible
                        ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {mode === 'aucun' ? 'Aucun' : mode === 'forfait' ? 'Forfait 15 %' : 'Montant réel'}
                </button>
              ))}
            </div>
            {travaux === 'forfait' && (
              <p className="text-xs text-primary-600 bg-primary-50 px-3 py-2 rounded-lg">
                Forfait appliqué : {formatEur(Math.round(prixAcquisition * 0.15))}
              </p>
            )}
            {travaux === 'forfait' && !forfaitDisponible && (
              <p className="text-xs text-orange-600">
                Forfait 15 % disponible uniquement si détention &gt; 5 ans.
              </p>
            )}
            {travaux === 'reel' && (
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  step="1000"
                  value={travauxReels}
                  onChange={(e) => setTravauxReels(Number(e.target.value))}
                  className="w-full px-4 py-3 pr-10 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base"
                  placeholder="Montant des travaux"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 text-sm">€</span>
              </div>
            )}
          </div>
        </div>

        {/* Carte : Cession */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
          <h3 className="text-xl font-bold text-neutral-900 mb-6">Cession</h3>

          {/* Date cession */}
          <div className="mb-5">
            <label className="text-sm font-medium text-neutral-700 block mb-2">
              Date de cession
            </label>
            <input
              type="date"
              value={dateCession}
              onChange={(e) => setDateCession(e.target.value)}
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base"
            />
          </div>

          {/* Prix de cession */}
          <div className="mb-5">
            <label className="text-sm font-medium text-neutral-700 block mb-2">
              Prix de vente
            </label>
            <div className="relative">
              <input
                type="number"
                min="0"
                step="1000"
                value={prixCession}
                onChange={(e) => setPrixCession(Number(e.target.value))}
                className="w-full px-4 py-3 pr-10 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base font-medium"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 text-sm">€</span>
            </div>
          </div>

          {/* Nature du bien */}
          <div className="mb-5">
            <label className="text-sm font-medium text-neutral-700 block mb-2">
              Nature du bien
            </label>
            <div className="grid grid-cols-2 gap-2">
              {([
                { val: 'principal', label: 'Résidence principale' },
                { val: 'autre',     label: 'Autre bien (secondaire / locatif)' },
              ] as const).map(({ val, label }) => (
                <button
                  key={val}
                  onClick={() => setTypeBien(val)}
                  className={`py-2 px-3 rounded-lg font-medium text-xs transition-all ${
                    typeBien === val
                      ? 'bg-primary-600 text-white shadow-md'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            {typeBien === 'principal' && (
              <p className="text-xs text-green-700 bg-green-50 px-3 py-2 rounded-lg mt-2">
                Exonération totale - résidence principale (Art. 150 U II 1° CGI)
              </p>
            )}
          </div>

          {/* 1ère cession */}
          {typeBien === 'autre' && (
            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={premiereCession}
                  onChange={(e) => setPremiereCession(e.target.checked)}
                  className="w-5 h-5 mt-0.5 text-primary-600 rounded focus:ring-2 focus:ring-primary-500 shrink-0"
                />
                <span className="text-sm text-neutral-700">
                  <span className="font-medium">1ère cession hors résidence principale</span>
                  <span className="block text-xs text-neutral-500 mt-0.5">
                    Conditions : ne pas avoir été propriétaire de sa résidence principale dans les 4 ans précédents + réinvestir le prix de vente dans l&apos;achat de sa résidence principale dans les 24 mois (Art. 150 U II 7° CGI)
                  </span>
                </span>
              </label>
            </div>
          )}
        </div>
      </div>

      {/* === COLONNE DROITE - RÉSULTATS === */}
      <div className="space-y-5">

        {/* Exonération totale */}
        {results.exoneree && (
          <div className="bg-green-50 border-2 border-green-300 rounded-xl p-6">
            <p className="font-bold text-green-900 text-lg mb-1">Exonération totale</p>
            <p className="text-sm text-green-800 leading-relaxed">{results.motifExoneration}</p>
            <div className="mt-4 pt-4 border-t border-green-200 flex justify-between">
              <span className="text-sm text-green-700">Plus-value brute</span>
              <span className="font-bold text-green-900">{formatEur(results.pvBrute)}</span>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-sm text-green-700">Impôts dus</span>
              <span className="font-bold text-green-900">0 €</span>
            </div>
          </div>
        )}

        {/* Moins-value */}
        {!results.exoneree && results.pvBrute <= 0 && (
          <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6">
            <p className="font-bold text-blue-900 text-lg mb-1">
              Moins-value : {formatEur(Math.abs(results.pvBrute))}
            </p>
            <p className="text-sm text-blue-800">Aucune imposition. La moins-value immobilière n&apos;est pas imputable sur d&apos;autres revenus.</p>
          </div>
        )}

        {/* Résultats imposables */}
        {!results.exoneree && results.pvBrute > 0 && (
          <>
            {/* Net total */}
            <div className="bg-white rounded-xl border-2 border-primary-300 p-6 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-neutral-600">Plus-value brute</span>
                <span className="font-bold text-neutral-900 text-lg">{formatEur(results.pvBrute)}</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium text-red-700">Total impôts + prél. sociaux</span>
                <span className="font-bold text-red-700 text-xl">{formatEur(results.totalImpots)}</span>
              </div>
              <div className="border-t border-neutral-200 pt-4 flex justify-between items-center">
                <span className="text-sm font-bold text-neutral-800">Gain net (PV − impôts)</span>
                <span className="font-bold text-primary-700 text-2xl">{formatEur(results.pvBrute - results.totalImpots)}</span>
              </div>
            </div>

            {/* Prix de revient ajusté */}
            <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-sm">
              <h4 className="text-sm font-bold text-neutral-700 uppercase tracking-wider mb-3">Prix de revient ajusté</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Prix d&apos;acquisition</span>
                  <span className="font-medium">{formatEur(prixAcquisition)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">
                    Frais {fraisAcquisition === 'forfait' ? '(forfait 7,5 %)' : '(réels)'}
                  </span>
                  <span className="font-medium">+{formatEur(results.fraisDeductibles)}</span>
                </div>
                {results.travauxDeductibles > 0 && (
                  <div className="flex justify-between">
                    <span className="text-neutral-600">
                      Travaux {travaux === 'forfait' ? '(forfait 15 %)' : '(réels)'}
                    </span>
                    <span className="font-medium">+{formatEur(results.travauxDeductibles)}</span>
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t border-neutral-200">
                  <span className="font-bold text-neutral-800">Prix de revient total</span>
                  <span className="font-bold text-neutral-900">{formatEur(results.prixRevient)}</span>
                </div>
              </div>
            </div>

            {/* Abattements */}
            <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-sm">
              <h4 className="text-sm font-bold text-neutral-700 uppercase tracking-wider mb-3">
                Abattements - {results.anneesDetention} an{results.anneesDetention !== 1 ? 's' : ''} de détention
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-neutral-50 rounded-lg p-3">
                  <p className="text-xs text-neutral-500 mb-1">Abattement IR (19 %)</p>
                  <p className="text-lg font-bold text-neutral-900">{formatPct(results.tauxAbattementIR)}</p>
                  <p className="text-xs text-neutral-600 mt-1">−{formatEur(results.abattementIR)}</p>
                </div>
                <div className="bg-neutral-50 rounded-lg p-3">
                  <p className="text-xs text-neutral-500 mb-1">Abattement PS (17,2 %)</p>
                  <p className="text-lg font-bold text-neutral-900">{formatPct(results.tauxAbattementPS)}</p>
                  <p className="text-xs text-neutral-600 mt-1">−{formatEur(results.abattementPS)}</p>
                </div>
              </div>
              {results.anneesAvantExoIR > 0 && (
                <p className="text-xs text-neutral-500 mt-3">
                  Exonération IR dans <span className="font-bold text-neutral-700">{results.anneesAvantExoIR} an{results.anneesAvantExoIR > 1 ? 's' : ''}</span> -
                  Exonération PS totale dans <span className="font-bold text-neutral-700">{results.anneesAvantExoPS} an{results.anneesAvantExoPS > 1 ? 's' : ''}</span>
                </p>
              )}
              {results.anneesAvantExoIR === 0 && results.anneesAvantExoPS > 0 && (
                <p className="text-xs text-neutral-500 mt-3">
                  IR exonéré - Exonération PS totale dans <span className="font-bold text-neutral-700">{results.anneesAvantExoPS} an{results.anneesAvantExoPS > 1 ? 's' : ''}</span>
                </p>
              )}
            </div>

            {/* Détail impôts */}
            <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-sm">
              <h4 className="text-sm font-bold text-neutral-700 uppercase tracking-wider mb-3">Détail des prélèvements</h4>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-neutral-600">Base imposable IR</span>
                    <span className="font-medium">{formatEur(results.pvNetteIR)}</span>
                  </div>
                  <div className="flex justify-between text-red-700">
                    <span>Impôt sur le revenu 19 %</span>
                    <span className="font-bold">{formatEur(results.impotRevenu)}</span>
                  </div>
                </div>
                <div className="border-t border-neutral-100 pt-3">
                  <div className="flex justify-between mb-1">
                    <span className="text-neutral-600">Base imposable PS</span>
                    <span className="font-medium">{formatEur(results.pvNettePS)}</span>
                  </div>
                  <div className="flex justify-between text-red-700">
                    <span>Prélèvements sociaux 17,2 %</span>
                    <span className="font-bold">{formatEur(results.prelevementsSociaux)}</span>
                  </div>
                </div>
                {results.surtaxe > 0 && (
                  <div className="border-t border-neutral-100 pt-3">
                    <div className="flex justify-between text-orange-700">
                      <span>Surtaxe (Art. 1609 nonies G CGI)</span>
                      <span className="font-bold">{formatEur(results.surtaxe)}</span>
                    </div>
                    <p className="text-xs text-orange-600 mt-1">Taux effectif : {formatPct(results.tauxSurtaxeEffectif, 2)} - montant indicatif, calcul définitif par le notaire</p>
                  </div>
                )}
                <div className="border-t border-neutral-200 pt-3 flex justify-between font-bold">
                  <span className="text-neutral-800">Total à payer</span>
                  <span className="text-red-700 text-lg">{formatEur(results.totalImpots)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Net perçu (prix vente − impôts)</span>
                  <span className="font-bold text-neutral-900">{formatEur(results.netPercu)}</span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Warnings et optimisations */}
        <AlertList items={results.warnings} />
        <AlertList items={results.optimisations} />

      </div>
    </div>
    <ChatWidget
      contexte={{
        calculateur: 'plus-value-immobiliere',
        inputs: {
          dateAcquisition,
          prixAcquisition,
          fraisAcquisition,
          fraisAcquisitionReels,
          travaux,
          travauxReels,
          dateCession,
          prixCession,
          typeBien,
          premiereCession,
        },
        results,
      }}
    />
    </>
  )
}
