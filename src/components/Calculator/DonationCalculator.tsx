// src/components/Calculator/DonationCalculator.tsx
'use client'

import { useMemo, useEffect } from 'react'
import { calculerDonation, LIBELLE_LIEN } from '@/lib/donation'
import type { DonationInputs, LienParente } from '@/types/donation'
import { useNumericInput } from '@/hooks/useNumericInput'
import { saveSimHistory, useSimStorage } from '@/hooks/useSimStorage'
import AlertList from '@/components/AlertList'
import ChatWidget from '@/components/ChatWidget'
import CrossLink from '@/components/CrossLink'
import SimResumeBanner from '@/components/Calculator/SimResumeBanner'
import { formatEur } from '@/lib/formatters'

const LIENS: Array<{ value: LienParente; label: string; bareme: string }> = [
  { value: 'enfant',       label: 'Enfant',                                bareme: 'Ligne directe' },
  { value: 'parent',       label: 'Parent (ascendant)',                    bareme: 'Ligne directe' },
  { value: 'petit_enfant', label: 'Petit-enfant',                          bareme: 'Ligne directe' },
  { value: 'epoux_pacs',   label: 'Époux ou partenaire PACS',              bareme: 'Tableau II' },
  { value: 'frere_soeur',  label: 'Frère ou sœur',                         bareme: 'Tableau III' },
  { value: 'neveu_niece',  label: 'Neveu ou nièce',                        bareme: 'Tableau IV - 55 %' },
  { value: 'autre_4e',     label: 'Autre parent (jusqu\'au 4e degré)',     bareme: 'Tableau IV - 55 %' },
  { value: 'non_parent',   label: 'Non parent ou au-delà du 4e degré',     bareme: 'Tableau IV - 60 %' },
]

interface DonationSimState {
  montantDonation: number
  lien: LienParente
  donataireHandicape: boolean
  donFamilial790G: boolean
  ageDonateur: number
  donataireMajeur: boolean
  donationsAnterieures15Ans: number
}

export default function DonationCalculator() {
  const [simState, setSimState, resetSimState] = useSimStorage<DonationSimState>('donation-droits', {
    montantDonation: 200000,
    lien: 'enfant',
    donataireHandicape: false,
    donFamilial790G: false,
    ageDonateur: 65,
    donataireMajeur: true,
    donationsAnterieures15Ans: 0,
  })

  const montant = useNumericInput(simState.montantDonation, { min: 0, max: 5000000 })
  const anterieures = useNumericInput(simState.donationsAnterieures15Ans, { min: 0, max: 5000000 })
  const age = useNumericInput(simState.ageDonateur, { min: 18, max: 120 })

  useEffect(() => {
    setSimState(prev => ({
      ...prev,
      montantDonation: montant.value,
      donationsAnterieures15Ans: anterieures.value,
      ageDonateur: age.value,
    }))
  }, [montant.value, anterieures.value, age.value]) // setSimState stable

  const inputs: DonationInputs = {
    montantDonation: montant.value,
    lien: simState.lien,
    donataireHandicape: simState.donataireHandicape,
    donFamilial790G: simState.donFamilial790G,
    ageDonateur: age.value,
    donataireMajeur: simState.donataireMajeur,
    donationsAnterieures15Ans: anterieures.value,
  }

  const results = useMemo(
    () => calculerDonation(inputs),
    [
      montant.value,
      simState.lien,
      simState.donataireHandicape,
      simState.donFamilial790G,
      age.value,
      simState.donataireMajeur,
      anterieures.value,
    ]
  )

  useEffect(() => {
    saveSimHistory({
      slug: 'donation-droits',
      nom: 'Donation - droits de mutation',
      href: '/donation/droits',
      resume: `${LIBELLE_LIEN[simState.lien]} · ${formatEur(montant.value)} → ${formatEur(results.droitsBruts)} de droits`,
      date: new Date().toISOString(),
    })
  }, [results.droitsBruts, simState.lien, montant.value])

  return (
    <>
      <SimResumeBanner slug="donation-droits" onReset={resetSimState} />
      <div className="grid lg:grid-cols-2 gap-8">

        {/* COLONNE GAUCHE - INPUTS */}
        <div className="space-y-6">

          {/* Montant transmis */}
          <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
            <h3 className="text-xl font-bold text-neutral-900 mb-6">
              Montant transmis
            </h3>
            <div className="mb-4">
              <div className="flex items-baseline gap-3 mb-3">
                <input
                  type="text"
                  inputMode="numeric"
                  value={montant.display}
                  onChange={(e) => montant.onChange(e.target.value)}
                  onBlur={montant.onBlur}
                  aria-label="Montant transmis en euros"
                  className="w-28 sm:w-40 px-4 py-3 border border-neutral-300 rounded-lg text-xl sm:text-2xl font-bold text-primary-700 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-right"
                />
                <span className="text-xl sm:text-2xl font-bold text-neutral-600">€</span>
              </div>
              <input
                type="range"
                min="0"
                max="1000000"
                step="1000"
                value={montant.value}
                onChange={(e) => montant.set(Number(e.target.value))}
                aria-label="Curseur montant donation"
                className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
              />
              <div className="flex justify-between text-xs text-neutral-500 mt-1">
                <span>0 €</span>
                <span>1 000 000 €</span>
              </div>
            </div>
            <p className="text-xs text-neutral-500">
              Valeur du bien ou de la somme transmise. Si vous avez déjà fait des dons à la même personne dans les 15 dernières années, indiquez-les dans le champ plus bas — ne les cumulez pas ici.
            </p>
          </div>

          {/* Lien de parenté */}
          <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
            <h3 className="text-xl font-bold text-neutral-900 mb-4">
              Lien de parenté
            </h3>
            <div className="space-y-2">
              {LIENS.map((l) => (
                <button
                  key={l.value}
                  onClick={() => setSimState(prev => ({ ...prev, lien: l.value }))}
                  className={`w-full text-left px-4 py-3 rounded-lg font-medium text-sm transition-all border-2 ${
                    simState.lien === l.value
                      ? 'bg-primary-600 text-white border-primary-600 shadow-md'
                      : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:border-primary-300 hover:bg-primary-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{l.label}</span>
                    <span className={`font-mono text-xs ${
                      simState.lien === l.value ? 'text-primary-100' : 'text-neutral-400'
                    }`}>{l.bareme}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Donations antérieures */}
          <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
            <h3 className="text-xl font-bold text-neutral-900 mb-4">
              Donations antérieures (moins de 15 ans)
            </h3>
            <div className="flex items-baseline gap-3 mb-3">
              <input
                type="text"
                inputMode="numeric"
                value={anterieures.display}
                onChange={(e) => anterieures.onChange(e.target.value)}
                onBlur={anterieures.onBlur}
                aria-label="Donations antérieures en euros"
                className="w-28 sm:w-40 px-4 py-3 border border-neutral-300 rounded-lg text-xl sm:text-2xl font-bold text-primary-700 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-right"
              />
              <span className="text-xl sm:text-2xl font-bold text-neutral-600">€</span>
            </div>
            <p className="text-xs text-neutral-500">
              Si vous avez déjà donné à la même personne dans les 15 dernières années, additionnez ces dons ici. Cela réduit l&apos;abattement qui vous reste et le calcul démarre dans une tranche plus haute du barème. Règle du rappel des 15 ans (Art. 784 CGI).
            </p>
          </div>

          {/* Options supplémentaires */}
          <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm space-y-5">
            <h3 className="text-xl font-bold text-neutral-900">
              Options spécifiques
            </h3>

            {/* Don familial 790 G */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={simState.donFamilial790G}
                  onChange={(e) => setSimState(prev => ({ ...prev, donFamilial790G: e.target.checked }))}
                  className="mt-1 h-4 w-4 accent-primary-600"
                />
                <div className="flex-1">
                  <div className="text-sm font-medium text-neutral-900">
                    Don familial de sommes d&apos;argent (Art. 790 G CGI)
                  </div>
                  <div className="text-xs text-neutral-500 mt-1">
                    Ajoute 31 865 € d&apos;abattement en plus du premier, si trois conditions sont réunies : donateur de moins de 80 ans, donataire majeur (ou mineur émancipé), et le don va à un enfant, petit-enfant, arrière-petit-enfant — ou à défaut à un neveu/nièce.
                  </div>
                </div>
              </label>
            </div>

            {/* Donataire handicapé */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={simState.donataireHandicape}
                  onChange={(e) => setSimState(prev => ({ ...prev, donataireHandicape: e.target.checked }))}
                  className="mt-1 h-4 w-4 accent-primary-600"
                />
                <div className="flex-1">
                  <div className="text-sm font-medium text-neutral-900">
                    Donataire en situation de handicap (Art. 779-II CGI)
                  </div>
                  <div className="text-xs text-neutral-500 mt-1">
                    Abattement supplémentaire de 159 325 € cumulable avec l&apos;abattement personnel.
                  </div>
                </div>
              </label>
            </div>

            {/* Donataire majeur */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={simState.donataireMajeur}
                  onChange={(e) => setSimState(prev => ({ ...prev, donataireMajeur: e.target.checked }))}
                  className="mt-1 h-4 w-4 accent-primary-600"
                />
                <div className="flex-1">
                  <div className="text-sm font-medium text-neutral-900">
                    Donataire majeur ou mineur émancipé
                  </div>
                  <div className="text-xs text-neutral-500 mt-1">
                    Condition nécessaire pour bénéficier du don familial 790 G.
                  </div>
                </div>
              </label>
            </div>

            {/* Âge du donateur */}
            <div>
              <label className="text-sm font-medium text-neutral-700 block mb-2">
                Âge du donateur
              </label>
              <div className="flex items-baseline gap-3">
                <input
                  type="text"
                  inputMode="numeric"
                  value={age.display}
                  onChange={(e) => age.onChange(e.target.value)}
                  onBlur={age.onBlur}
                  aria-label="Âge du donateur"
                  className="w-20 px-3 py-2 border border-neutral-300 rounded-lg text-lg font-bold text-primary-700 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-right"
                />
                <span className="text-lg text-neutral-600">ans</span>
              </div>
              <p className="text-xs text-neutral-500 mt-2">
                Utilisé pour vérifier la condition d&apos;âge du don familial 790 G (donateur de moins de 80 ans).
              </p>
            </div>
          </div>
        </div>

        {/* COLONNE DROITE - RÉSULTATS */}
        <div className="space-y-6">

          {/* Bloc principal : droits dus */}
          <div className="rounded-xl border-2 p-6 bg-primary-50 border-primary-300">
            <div className="flex items-baseline justify-between mb-4">
              <h3 className="text-lg font-bold text-neutral-900">Droits à payer</h3>
              <span className="px-3 py-1 rounded-full font-mono text-xs bg-primary-100 text-primary-800">
                {LIBELLE_LIEN[simState.lien]}
              </span>
            </div>
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-neutral-500 mb-1">Droits dus</div>
                <div className="text-3xl font-bold text-neutral-900">
                  {formatEur(results.droitsBruts)}
                </div>
              </div>
              <div>
                <div className="text-xs text-neutral-500 mb-1">Taux effectif</div>
                <div className="text-3xl font-bold text-neutral-900">
                  {results.tauxEffectif.toFixed(1)} %
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-primary-200 text-sm text-neutral-700">
              Montant net pour le donataire : <strong className="text-neutral-900">{formatEur(results.montantNet)}</strong>
            </div>
          </div>

          {/* Détail abattements */}
          <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-neutral-900 mb-4">
              Détail des abattements
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-600">Abattement personnel (Art. 779 / 790 E)</span>
                <span className="font-medium">{formatEur(results.abattementPersonnelApplique)}</span>
              </div>
              {results.rappel15AnsActif && (
                <div className="flex justify-between text-orange-700 text-xs">
                  <span>dont déjà utilisé par vos dons précédents</span>
                  <span>-{formatEur(results.abattementPersonnelTheorique - results.abattementPersonnelApplique)}</span>
                </div>
              )}
              {results.abattementHandicap > 0 && (
                <div className="flex justify-between text-green-700">
                  <span>Abattement handicap (Art. 779-II)</span>
                  <span className="font-medium">+{formatEur(results.abattementHandicap)}</span>
                </div>
              )}
              {results.abattement790G > 0 && (
                <div className="flex justify-between text-green-700">
                  <span>Don familial sommes d&apos;argent (Art. 790 G)</span>
                  <span className="font-medium">+{formatEur(results.abattement790G)}</span>
                </div>
              )}
              <div className="flex justify-between font-medium pt-2 border-t border-neutral-200">
                <span className="text-neutral-700">Total abattements appliqués</span>
                <span>{formatEur(results.abattementTotal)}</span>
              </div>
              <div className="flex justify-between font-bold pt-2 border-t-2 border-neutral-300">
                <span className="text-neutral-900">Base taxable</span>
                <span className="text-primary-700">{formatEur(results.baseTaxable)}</span>
              </div>
            </div>
          </div>

          {/* Détail tranches */}
          {results.detailTranches.length > 0 && (
            <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-neutral-900 mb-4">
                Application du barème (Art. 777 CGI)
              </h3>
              <div className="space-y-3">
                {results.detailTranches.map((tranche, i) => {
                  const pct =
                    results.baseTaxable > 0
                      ? (tranche.baseDansLaTranche / results.baseTaxable) * 100
                      : 0
                  return (
                    <div key={i}>
                      <div className="flex justify-between text-xs text-neutral-600 mb-1">
                        <span className="font-medium">
                          Tranche {tranche.taux} %
                          {tranche.borneSup
                            ? ` (jusqu'à ${formatEur(tranche.borneSup)})`
                            : ' (au-delà)'}
                        </span>
                        <span>{formatEur(tranche.droitsDansLaTranche)}</span>
                      </div>
                      <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-primary-500"
                          style={{ width: `${Math.min(100, pct)}%` }}
                        />
                      </div>
                      <div className="text-xs text-neutral-400 mt-0.5">
                        {formatEur(tranche.baseDansLaTranche)} dans cette tranche
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Comparaison sans abattement */}
          {results.economieAbattements > 0 && (
            <div className="bg-neutral-50 rounded-xl border border-neutral-200 p-5 text-sm">
              <div className="flex items-baseline justify-between">
                <span className="text-neutral-600">Droits sans aucun abattement</span>
                <span className="font-medium text-neutral-700">{formatEur(results.droitsSansAbattement)}</span>
              </div>
              <div className="flex items-baseline justify-between mt-1 text-green-700">
                <span>Économie liée aux abattements</span>
                <span className="font-bold">-{formatEur(results.economieAbattements)}</span>
              </div>
            </div>
          )}

          <AlertList items={results.warnings} />
          <AlertList items={results.optimisations} />
        </div>
      </div>

      {results.droitsBruts > 0 && (
        <div className="mt-4 border-t border-neutral-200">
          <p className="font-mono text-xs uppercase tracking-widest text-neutral-400 px-1 pt-4 pb-2">
            Questions naturelles après ce résultat
          </p>
          <CrossLink
            href="/assurance-vie/transmission"
            title="Comparer avec la transmission par assurance-vie"
            description="L'assurance-vie applique des abattements spécifiques (152 500 € avant 70 ans, Art. 990 I CGI) souvent plus élevés que les abattements de droit commun."
          />
          {simState.lien === 'enfant' && (
            <CrossLink
              href="/faq/donation-droits"
              title="Étaler la donation sur 15 ans"
              description="Le rappel fiscal de 15 ans (Art. 784 CGI) permet de reconstituer l'abattement de 100 000 € entre deux donations à un même enfant."
            />
          )}
        </div>
      )}

      <ChatWidget contexte={{ calculateur: 'donation-droits', inputs, results }} />
    </>
  )
}
