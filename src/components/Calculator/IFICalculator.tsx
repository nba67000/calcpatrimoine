'use client'

import { useMemo, useEffect } from 'react'
import { calculerIFI } from '@/lib/ifi'
import type { IFIInputs } from '@/types/ifi'
import { saveSimHistory, useSimStorage } from '@/hooks/useSimStorage'
import AlertList from '@/components/AlertList'
import ChatWidget from '@/components/ChatWidget'
import CrossLink from '@/components/CrossLink'
import SimResumeBanner from '@/components/Calculator/SimResumeBanner'
import { formatEur, formatPct } from '@/lib/formatters'

const SEUIL_IFI = 1_300_000

const DEFAULT_INPUTS: IFIInputs = {
  valeurBruteImmobilier: 2_000_000,
  incluResidencePrincipale: false,
  valeurResidencePrincipale: 500_000,
  dettesDeductibles: 0,
  appliquerPlafonnement: false,
  revenusAnnuels: 80_000,
  irAnnuel: 15_000,
}

export default function IFICalculator() {
  const [inputs, setInputs, resetInputs] = useSimStorage<IFIInputs>('ifi', DEFAULT_INPUTS)
  const results = useMemo(() => calculerIFI(inputs), [inputs])
  const ifiDefinitif = results.plafonnementApplicable ? results.ifiApresPlafonnement : results.ifiNet

  useEffect(() => {
    if (ifiDefinitif <= 0) return
    saveSimHistory({
      slug: 'ifi',
      nom: 'IFI - Fortune immobilière',
      href: '/ifi',
      resume: `IFI : ${formatEur(ifiDefinitif)}`,
      date: new Date().toISOString(),
    })
  }, [ifiDefinitif])

  return (
    <>
    <SimResumeBanner slug="ifi" onReset={resetInputs} />
    <div className="grid lg:grid-cols-2 gap-8">

      {/* === COLONNE GAUCHE - INPUTS === */}
      <div className="space-y-6">

        {/* Carte : Patrimoine immobilier */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
          <h3 className="text-xl font-bold text-neutral-900 mb-6">Patrimoine immobilier</h3>

          {/* Valeur brute totale */}
          <div className="mb-5">
            <label className="text-sm font-medium text-neutral-700 block mb-2">
              Valeur de marché totale de vos biens immobiliers
            </label>
            <div className="relative">
              <input
                type="number"
                min="0"
                step="10000"
                value={inputs.valeurBruteImmobilier}
                onChange={(e) => setInputs(prev => ({ ...prev, valeurBruteImmobilier: Number(e.target.value) }))}
                className="w-full px-4 py-3 pr-10 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base font-medium"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 text-sm">€</span>
            </div>
            <p className="text-xs text-neutral-500 mt-1">
              Prix auquel vous pourriez vendre chacun de vos biens au 1er janvier 2026. Total de tous vos biens (France et étranger).
            </p>
          </div>

          {/* Résidence principale */}
          <div className="mb-5">
            <label className="flex items-start gap-3 cursor-pointer mb-3">
              <input
                type="checkbox"
                checked={inputs.incluResidencePrincipale}
                onChange={(e) => setInputs(prev => ({ ...prev, incluResidencePrincipale: e.target.checked }))}
                className="w-5 h-5 mt-0.5 text-primary-600 rounded focus:ring-2 focus:ring-primary-500 shrink-0"
              />
              <span className="text-sm text-neutral-700">
                <span className="font-medium">La valeur inclut ma résidence principale</span>
                <span className="block text-xs text-neutral-500 mt-0.5">
                  Abattement de 30 % appliqué sur sa valeur (Art. 973 CGI)
                </span>
              </span>
            </label>
            {inputs.incluResidencePrincipale && (
              <div className="ml-8">
                <label className="text-sm font-medium text-neutral-700 block mb-2">
                  Valeur de la résidence principale
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    step="10000"
                    value={inputs.valeurResidencePrincipale}
                    onChange={(e) => setInputs(prev => ({ ...prev, valeurResidencePrincipale: Number(e.target.value) }))}
                    className="w-full px-4 py-3 pr-10 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 text-sm">€</span>
                </div>
                {results.abattementResidencePrincipale > 0 && (
                  <p className="text-xs text-primary-600 bg-primary-50 px-3 py-2 rounded-lg mt-2">
                    Abattement appliqué : −{formatEur(results.abattementResidencePrincipale)}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Dettes déductibles */}
          <div>
            <label className="text-sm font-medium text-neutral-700 block mb-2">
              Emprunts et dettes liés à vos biens immobiliers
            </label>
            <div className="relative">
              <input
                type="number"
                min="0"
                step="1000"
                value={inputs.dettesDeductibles}
                onChange={(e) => setInputs(prev => ({ ...prev, dettesDeductibles: Number(e.target.value) }))}
                className="w-full px-4 py-3 pr-10 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 text-sm">€</span>
            </div>
            <p className="text-xs text-neutral-500 mt-1">
              Capital restant dû sur crédits immobiliers + taxes foncières au 1er janvier. Les crédits à la consommation ne sont pas déductibles.
            </p>
          </div>
        </div>

        {/* Carte : Plafonnement optionnel */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
          <label className="flex items-start gap-3 cursor-pointer mb-4">
            <input
              type="checkbox"
              checked={inputs.appliquerPlafonnement}
              onChange={(e) => setInputs(prev => ({ ...prev, appliquerPlafonnement: e.target.checked }))}
              className="w-5 h-5 mt-0.5 text-primary-600 rounded focus:ring-2 focus:ring-primary-500 shrink-0"
            />
            <span className="text-sm text-neutral-700">
              <span className="font-medium">Vérifier le plafonnement IFI + IR</span>
              <span className="block text-xs text-neutral-500 mt-0.5">
                IFI + IR ne peut excéder 75 % des revenus (Art. 979 CGI)
              </span>
            </span>
          </label>

          {inputs.appliquerPlafonnement && (
            <div className="space-y-4 ml-8">
              <div>
                <label className="text-sm font-medium text-neutral-700 block mb-2">
                  Revenus imposables annuels
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    step="1000"
                    value={inputs.revenusAnnuels}
                    onChange={(e) => setInputs(prev => ({ ...prev, revenusAnnuels: Number(e.target.value) }))}
                    className="w-full px-4 py-3 pr-10 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 text-sm">€</span>
                </div>
                <p className="text-xs text-neutral-500 mt-1">Revenus soumis à l&apos;IR, y compris dividendes, intérêts et loyers.</p>
              </div>
              <div>
                <label className="text-sm font-medium text-neutral-700 block mb-2">
                  Impôt sur le revenu dû (même année)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    step="100"
                    value={inputs.irAnnuel}
                    onChange={(e) => setInputs(prev => ({ ...prev, irAnnuel: Number(e.target.value) }))}
                    className="w-full px-4 py-3 pr-10 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 text-sm">€</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* === COLONNE DROITE - RÉSULTATS === */}
      <div className="space-y-5">

        {/* Patrimoine net taxable */}
        <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-sm">
          <h4 className="text-sm font-bold text-neutral-700 uppercase tracking-wider mb-3">Patrimoine pris en compte</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-neutral-600">Valeur brute immobilier</span>
              <span className="font-medium">{formatEur(inputs.valeurBruteImmobilier)}</span>
            </div>
            {results.abattementResidencePrincipale > 0 && (
              <div className="flex justify-between text-green-700">
                <span>Abattement RP 30 %</span>
                <span className="font-medium">−{formatEur(results.abattementResidencePrincipale)}</span>
              </div>
            )}
            {inputs.dettesDeductibles > 0 && (
              <div className="flex justify-between text-green-700">
                <span>Dettes déductibles</span>
                <span className="font-medium">−{formatEur(inputs.dettesDeductibles)}</span>
              </div>
            )}
            <div className="flex justify-between pt-2 border-t border-neutral-200 font-bold">
              <span className="text-neutral-800">Patrimoine net taxable</span>
              <span className={results.patrimoineNetTaxable >= SEUIL_IFI ? 'text-neutral-900 text-lg' : 'text-green-700 text-lg'}>
                {formatEur(results.patrimoineNetTaxable)}
              </span>
            </div>
          </div>
        </div>

        {/* Non assujetti */}
        {!results.assujetti && (
          <div className="bg-green-50 border-2 border-green-300 rounded-xl p-6">
            <p className="font-bold text-green-900 text-lg mb-1">Aucun IFI dû</p>
            <p className="text-sm text-green-800">
              Le patrimoine net taxable ({formatEur(results.patrimoineNetTaxable)}) est inférieur au seuil de {formatEur(SEUIL_IFI)} (Art. 964 CGI).
            </p>
          </div>
        )}

        {/* Assujetti - résultats */}
        {results.assujetti && (
          <>
            {/* IFI total */}
            <div className="bg-white rounded-xl border-2 border-primary-300 p-6 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium text-neutral-600">IFI brut</span>
                <span className="font-bold text-neutral-900 text-lg">{formatEur(results.ifiBrut)}</span>
              </div>
              {results.decoteProgressive > 0 && (
                <div className="flex justify-between items-center mb-4 text-green-700">
                  <span className="text-sm font-medium">Décote progressive</span>
                  <span className="font-bold">−{formatEur(results.decoteProgressive)}</span>
                </div>
              )}
              <div className="border-t border-neutral-200 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-neutral-800">IFI net{results.plafonnementApplicable ? ' (avant plafonnement)' : ''}</span>
                  <span className="font-bold text-red-700 text-2xl">{formatEur(results.ifiNet)}</span>
                </div>
                {results.plafonnementApplicable && (
                  <div className="flex justify-between items-center mt-3 pt-3 border-t border-neutral-200">
                    <span className="text-sm font-bold text-neutral-800">IFI après plafonnement</span>
                    <span className="font-bold text-primary-700 text-2xl">{formatEur(results.ifiApresPlafonnement)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-neutral-500">Taux effectif</span>
                  <span className="text-sm font-medium text-neutral-600">{formatPct(results.tauxEffectif, 3)}</span>
                </div>
              </div>
            </div>

            {/* Plafonnement */}
            {inputs.appliquerPlafonnement && inputs.revenusAnnuels > 0 && (
              <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-sm">
                <h4 className="text-sm font-bold text-neutral-700 uppercase tracking-wider mb-3">Plafonnement (Art. 979 CGI)</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Revenus annuels</span>
                    <span className="font-medium">{formatEur(inputs.revenusAnnuels)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Seuil (75 %)</span>
                    <span className="font-medium">{formatEur(results.seuilPlafonnement)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">IFI net</span>
                    <span className="font-medium">{formatEur(results.ifiNet)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">IR dû</span>
                    <span className="font-medium">+{formatEur(inputs.irAnnuel)}</span>
                  </div>
                  <div className={`flex justify-between pt-2 border-t font-bold ${results.plafonnementApplicable ? 'text-orange-700' : 'text-green-700'}`}>
                    <span>IFI + IR</span>
                    <span>{formatEur(results.ifiNet + inputs.irAnnuel)}</span>
                  </div>
                  {results.plafonnementApplicable && (
                    <p className="text-xs text-orange-600 mt-1">
                      Dépasse le seuil de {formatEur(results.seuilPlafonnement)} → IFI plafonné à {formatEur(results.ifiApresPlafonnement)}
                    </p>
                  )}
                  {!results.plafonnementApplicable && (
                    <p className="text-xs text-green-700 mt-1">
                      Sous le seuil de {formatEur(results.seuilPlafonnement)} - pas de plafonnement.
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Détail barème */}
            <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-sm">
              <h4 className="text-sm font-bold text-neutral-700 uppercase tracking-wider mb-3">
                Détail du barème - {formatEur(results.patrimoineNetTaxable)} net taxable
              </h4>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-neutral-200">
                    <th className="text-left py-2 text-neutral-500 font-mono text-xs">Tranche</th>
                    <th className="text-right py-2 text-neutral-500 font-mono text-xs">Taux</th>
                    <th className="text-right py-2 text-neutral-500 font-mono text-xs">Base</th>
                    <th className="text-right py-2 text-neutral-500 font-mono text-xs">Impôt</th>
                  </tr>
                </thead>
                <tbody>
                  {results.tranches.map((t, i) => (
                    <tr key={i} className={`border-b border-neutral-100 ${t.impot > 0 ? '' : 'text-neutral-400'}`}>
                      <td className="py-2 text-xs">
                        {t.de.toLocaleString('fr-FR')} →{' '}
                        {t.a !== null ? t.a.toLocaleString('fr-FR') : '∞'} €
                      </td>
                      <td className="py-2 text-right font-mono">{t.taux.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} %</td>
                      <td className="py-2 text-right">{t.baseImposable.toLocaleString('fr-FR')} €</td>
                      <td className="py-2 text-right font-bold">{t.impot.toLocaleString('fr-FR')} €</td>
                    </tr>
                  ))}
                  <tr className="border-t-2 border-neutral-200 font-bold">
                    <td className="py-2 text-neutral-800" colSpan={3}>Total IFI brut</td>
                    <td className="py-2 text-right text-red-700">{formatEur(results.ifiBrut)}</td>
                  </tr>
                  {results.decoteProgressive > 0 && (
                    <tr className="font-medium text-green-700">
                      <td className="py-1 text-xs" colSpan={3}>Décote progressive</td>
                      <td className="py-1 text-right">−{formatEur(results.decoteProgressive)}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Warnings et optimisations */}
        <AlertList items={results.warnings} />
        <AlertList items={results.optimisations} />
      </div>
    </div>

    {results.assujetti && (
      <div className="mt-4 border-t border-neutral-200">
        <p className="font-mono text-xs uppercase tracking-widest text-neutral-400 px-1 pt-4 pb-2">
          Questions naturelles après ce résultat
        </p>
        <CrossLink
          href="/tmi"
          title="Calculer votre TMI — le plafonnement IFI dépend de votre IR"
          description="Le plafonnement IFI (IR + IFI ≤ 75 % des revenus) nécessite de connaître votre IR exact — Calculer."
        />
        <CrossLink
          href="/assurance-vie/transmission"
          title="Réduire l'assiette IFI par démembrement ou assurance-vie"
          description="Le capital en assurance-vie ({ifi} d'IFI en jeu) n'entre pas dans l'assiette IFI — Simuler la transmission."
          context={{ ifi: formatEur(ifiDefinitif) }}
        />
        <CrossLink
          href="/assurance-vie/fiscalite-rachat"
          title="Arbitrage : placer une partie du patrimoine hors IFI"
          description="Un rachat de {ifi} réinvesti en assurance-vie sortirait ce montant de l'assiette IFI."
          context={{ ifi: formatEur(ifiDefinitif) }}
        />
      </div>
    )}

    <ChatWidget
      contexte={{
        calculateur: 'ifi',
        inputs,
        results,
      }}
    />
    </>
  )
}
