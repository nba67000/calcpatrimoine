// src/components/Calculator/TransmissionCalculator.tsx
'use client'

import { useMemo, useEffect } from 'react'
import TransmissionChart from '@/components/TransmissionChart'
import {
 calculerTransmission,
 genererIdBeneficiaire,
 ajouterBeneficiaire,
 supprimerBeneficiaire,
 equilibrerParts,
 modifierPartBeneficiaire,
} from '@/lib/transmission'
import type {
 TransmissionResults,
 Beneficiaire
} from '@/types/transmission'
import ChatWidget from '@/components/ChatWidget'
import AlertList from '@/components/AlertList'
import CrossLink from '@/components/CrossLink'
import { saveSimHistory, useSimStorage } from '@/hooks/useSimStorage'
import { formatEur } from '@/lib/formatters'

interface TransmissionSimState {
  capitalTotal: number
  versementsAvant70: number
  versementsApres70: number
  ageSouscripteur: number
  beneficiaires: Beneficiaire[]
}

const DEFAULT_STATE: TransmissionSimState = {
  capitalTotal: 250000,
  versementsAvant70: 180000,
  versementsApres70: 20000,
  ageSouscripteur: 72,
  beneficiaires: [
    { id: genererIdBeneficiaire(), nom: 'Enfant 1', lien: 'enfant', partPourcentage: 50 },
    { id: genererIdBeneficiaire(), nom: 'Enfant 2', lien: 'enfant', partPourcentage: 50 },
  ],
}

export default function TransmissionCalculator() {
 const [inputs, setInputs] = useSimStorage<TransmissionSimState>('assurance-vie-transmission', DEFAULT_STATE)

 const results = useMemo<TransmissionResults>(() => calculerTransmission({
   ...inputs,
   dateOuverture: new Date(2010, 0, 1),
 }), [inputs])

 const modifierBeneficiaire = (id: string, updates: Partial<Beneficiaire>) => {
   setInputs(prev => ({
     ...prev,
     beneficiaires: prev.beneficiaires.map(b => b.id === id ? { ...b, ...updates } : b),
   }))
 }

 const totalParts = inputs.beneficiaires.reduce((sum, b) => sum + b.partPourcentage, 0)

 useEffect(() => {
   if (results.capitalTotal <= 0) return
   saveSimHistory({
     slug: 'assurance-vie-transmission',
     nom: 'Transmission AV',
     href: '/assurance-vie/transmission',
     resume: `Capital : ${formatEur(results.capitalTotal)} · Impôts : ${formatEur(results.totalImpots)}`,
     date: new Date().toISOString(),
   })
 }, [results.totalImpots, results.capitalTotal])

 return (
 <>
 <div className="grid lg:grid-cols-2 gap-8">

 {/* COLONNE GAUCHE - INPUTS */}
 <div className="space-y-6">

 {/* Carte : Capital et versements */}
 <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
 <h3 className="text-xl font-bold text-neutral-900 mb-6">
 Capital du contrat
 </h3>

 {/* Capital actuel */}
 <div className="mb-6">
 <div className="flex justify-between items-baseline mb-2">
 <label className="text-sm font-medium text-neutral-700">
 Capital actuel total
 </label>
 <span className="text-2xl font-bold text-primary-600">
 {formatEur(inputs.capitalTotal)}
 </span>
 </div>
 <input
 type="range"
 min="10000"
 max="2000000"
 step="10000"
 value={inputs.capitalTotal}
 onChange={(e) => setInputs(prev => ({ ...prev, capitalTotal: Number(e.target.value) }))}
 className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
 />
 <div className="flex justify-between text-xs text-neutral-500 mt-1">
 <span>10 000€</span>
 <span>2 000 000€</span>
 </div>
 </div>

 {/* Versements avant 70 ans */}
 <div className="mb-6">
 <div className="flex justify-between items-baseline mb-2">
 <label className="text-sm font-medium text-neutral-700">
 Versements avant 70 ans
 <span className="text-xs text-neutral-500 ml-2">(Art. 990 I)</span>
 </label>
 <span className="text-xl font-bold text-neutral-900">
 {formatEur(inputs.versementsAvant70)}
 </span>
 </div>
 <input
 type="range"
 min="0"
 max={inputs.capitalTotal}
 step="5000"
 value={inputs.versementsAvant70}
 onChange={(e) => {
   const newVal = Number(e.target.value)
   setInputs(prev => ({
     ...prev,
     versementsAvant70: newVal,
     versementsApres70: newVal + prev.versementsApres70 > prev.capitalTotal
       ? Math.max(0, prev.capitalTotal - newVal)
       : prev.versementsApres70,
   }))
 }}
 className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
 />
 <div className="flex justify-between text-xs text-neutral-500 mt-1">
 <span>0€</span>
 <span>{inputs.capitalTotal.toLocaleString('fr-FR')}€</span>
 </div>
 </div>

 {/* Versements après 70 ans */}
 <div className="mb-6">
 <div className="flex justify-between items-baseline mb-2">
 <label className="text-sm font-medium text-neutral-700">
 Versements après 70 ans
 <span className="text-xs text-neutral-500 ml-2">(Art. 757 B)</span>
 </label>
 <span className="text-xl font-bold text-neutral-900">
 {formatEur(inputs.versementsApres70)}
 </span>
 </div>
 <input
 type="range"
 min="0"
 max={Math.max(0, inputs.capitalTotal - inputs.versementsAvant70)}
 step="5000"
 value={inputs.versementsApres70}
 onChange={(e) => setInputs(prev => ({ ...prev, versementsApres70: Number(e.target.value) }))}
 className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
 />
 <div className="flex justify-between text-xs text-neutral-500 mt-1">
 <span>0€</span>
 <span>{Math.max(0, inputs.capitalTotal - inputs.versementsAvant70).toLocaleString('fr-FR')}€</span>
 </div>
 </div>

 {/* Résumé versements */}
 <div className="bg-neutral-50 rounded-lg p-4 text-sm">
 <div className="flex justify-between mb-1">
 <span className="text-neutral-600">Versements totaux :</span>
 <span className="font-bold">{(inputs.versementsAvant70 + inputs.versementsApres70).toLocaleString('fr-FR')}€</span>
 </div>
 <div className="flex justify-between">
 <span className="text-neutral-600">Plus-value contrat :</span>
 <span className="font-bold text-primary-700">
 +{(inputs.capitalTotal - inputs.versementsAvant70 - inputs.versementsApres70).toLocaleString('fr-FR')}€
 </span>
 </div>
 </div>
 </div>

 {/* Carte : Bénéficiaires */}
 <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
 <div className="flex justify-between items-center mb-6">
 <h3 className="text-xl font-bold text-neutral-900">
 Bénéficiaires ({inputs.beneficiaires.length})
 </h3>
 <div className="flex gap-2">
 {inputs.beneficiaires.length > 1 && (
 <button
 onClick={() => setInputs(prev => ({ ...prev, beneficiaires: equilibrerParts(prev.beneficiaires) }))}
 className="text-xs bg-neutral-100 hover:bg-neutral-200 text-neutral-700 px-3 py-1 rounded-lg font-medium transition-colors"
>
 Équilibrer
 </button>
 )}
 {inputs.beneficiaires.length < 6 && (
 <button
 onClick={() => setInputs(prev => ({ ...prev, beneficiaires: ajouterBeneficiaire(prev.beneficiaires) }))}
 className="text-xs bg-primary-600 hover:bg-primary-700 text-white px-3 py-1 rounded-lg font-medium transition-colors"
>
 + Ajouter
 </button>
 )}
 </div>
 </div>

 {/* Alerte total parts */}
 {Math.abs(totalParts - 100) > 0.01 && (
 <div className="bg-primary-50 border border-primary-300 rounded-lg p-3 mb-4 text-sm">
 <p className="text-primary-900">
 Total des parts : <strong>{totalParts.toFixed(1)}%</strong> (doit faire 100%)
 </p>
 </div>
 )}

 {/* Indication cascade proportionnelle */}
 {inputs.beneficiaires.length > 1 && (
 <div className="bg-primary-50 border border-primary-200 rounded-lg p-3 mb-4 text-xs text-primary-800">
 <p>
 Déplacer le curseur d&apos;un bénéficiaire ajuste automatiquement les bénéficiaires
 situés en dessous pour maintenir 100%.
 </p>
 </div>
 )}

 {/* Liste bénéficiaires */}
 <div className="space-y-4">
 {inputs.beneficiaires.map((benef, index) => (
 <div
 key={benef.id}
 className="bg-neutral-50 rounded-lg p-4 border border-neutral-200"
>
 <div className="flex justify-between items-start mb-3">
 <input
 type="text"
 value={benef.nom}
 onChange={(e) => modifierBeneficiaire(benef.id, { nom: e.target.value })}
 placeholder={`Bénéficiaire ${index + 1}`}
 className="font-bold text-neutral-900 bg-transparent border-b border-neutral-300 focus:border-primary-500 focus:outline-none px-1 py-0.5 text-sm flex-1 mr-2"
 />
 {inputs.beneficiaires.length > 1 && (
 <button
 onClick={() => setInputs(prev => ({ ...prev, beneficiaires: supprimerBeneficiaire(prev.beneficiaires, benef.id) }))}
 className="text-primary-500 hover:text-primary-700 text-sm"
 aria-label="Supprimer"
>
 ✕
 </button>
 )}
 </div>

 {/* Lien de parenté */}
 <div className="mb-3">
 <label className="text-xs text-neutral-600 block mb-1">
 Lien de parenté
 </label>
 <select
 value={benef.lien}
 onChange={(e) => modifierBeneficiaire(benef.id, {
 lien: e.target.value as Beneficiaire['lien']
 })}
 className="w-full text-sm bg-white border border-neutral-300 rounded-lg px-3 py-2 focus:border-primary-500 focus:outline-none"
>
 <option value="conjoint">Conjoint / PACS</option>
 <option value="enfant">Enfant</option>
 <option value="frere_soeur">Frère / Sœur</option>
 <option value="neveu_niece">Neveu / Nièce</option>
 <option value="autre">Autre (ami, tiers...)</option>
 </select>
 </div>

 {/* Part en % */}
 <div>
 <div className="flex justify-between items-baseline mb-1">
 <label className="text-xs text-neutral-600 flex items-center gap-2">
 Part
 {index < inputs.beneficiaires.length - 1 && (
 <span
 className="text-xs bg-primary-100 text-primary-700 px-1.5 py-0.5 rounded text-[10px] font-medium"
 title="Modifier cette part ajuste les bénéficiaires en dessous"
>
 ajustable
 </span>
 )}
 {index === inputs.beneficiaires.length - 1 && inputs.beneficiaires.length > 1 && (
 <span
 className="text-xs bg-neutral-200 text-neutral-600 px-1.5 py-0.5 rounded text-[10px] font-medium"
 title="Cette part s'ajuste automatiquement"
>
 auto
 </span>
 )}
 </label>
 <span className="text-sm font-bold text-primary-600">
 {benef.partPourcentage.toFixed(1)}%
 <span className="text-xs text-neutral-500 ml-2">
 ({Math.round((benef.partPourcentage / 100) * inputs.capitalTotal).toLocaleString('fr-FR')}€)
 </span>
 </span>
 </div>
 <input
 type="range"
 min="0"
 max={(() => {
 const partAvant = inputs.beneficiaires
 .slice(0, index)
 .reduce((sum, b) => sum + b.partPourcentage, 0)
 return Math.max(0, 100 - partAvant)
 })()}
 step="0.5"
 value={benef.partPourcentage}
 onChange={(e) => setInputs(prev => ({ ...prev, beneficiaires: modifierPartBeneficiaire(prev.beneficiaires, benef.id, Number(e.target.value)) }))}
 disabled={index === inputs.beneficiaires.length - 1 && inputs.beneficiaires.length > 1}
 className={`w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary-600 ${
 index === inputs.beneficiaires.length - 1 && inputs.beneficiaires.length > 1
 ? 'opacity-60 cursor-not-allowed'
 : ''
 }`}
 />
 {index < inputs.beneficiaires.length - 1 && (() => {
 const partAvant = inputs.beneficiaires
 .slice(0, index)
 .reduce((sum, b) => sum + b.partPourcentage, 0)
 const maxDispo = 100 - partAvant
 if (maxDispo < 100) {
 return (
 <div className="text-[10px] text-neutral-500 mt-1">
 Max disponible : {maxDispo.toFixed(1)}%
 </div>
 )
 }
 return null
 })()}
 </div>
 </div>
 ))}
 </div>
 </div>

 {/* Info box */}
 <div className="bg-primary-50 border border-primary-200 rounded-xl p-4 text-sm">
 <p className="font-bold text-primary-900 mb-2">Rappel fiscal</p>
 <ul className="space-y-1 text-primary-800 text-xs">
 <li>• <strong>Versements avant 70 ans</strong> : Abattement 152 500€ par bénéficiaire (Art. 990 I)</li>
 <li>• <strong>Versements après 70 ans</strong> : Abattement 30 500€ global partagé (Art. 757 B)</li>
 <li>• <strong>Plus-values après 70 ans</strong> : Totalement exonérées</li>
 <li>• <strong>Conjoint / PACS</strong> : Exonération totale (Loi TEPA)</li>
 </ul>
 </div>
 </div>

 {/* COLONNE DROITE - RÉSULTATS */}
 <div className="space-y-6">

 {/* Disclaimer */}
 <div className="bg-primary-50 border-2 border-primary-300 rounded-xl p-5">
 <div className="flex items-start gap-3">
 <div className="text-2xl"></div>
 <div>
 <h4 className="font-bold text-primary-900 mb-2 text-sm">
 Outil de simulation uniquement
 </h4>
 <p className="text-xs text-primary-800 leading-relaxed">
 Ce calculateur estime les droits de transmission. Il ne constitue pas un conseil
 patrimonial personnalisé. Pour une décision adaptée à votre cas, consultez un notaire,
 un avocat fiscaliste ou un conseiller en gestion de patrimoine indépendant.
 </p>
 </div>
 </div>
 </div>

 {/* Graphique résultats */}
 {results && <TransmissionChart results={results} />}
 {results && <AlertList items={results.warnings} />}
 {results && <AlertList items={results.infos} />}
 </div>
 </div>

 {results && results.capitalTotal > 0 && (
   <div className="mt-4 border-t border-neutral-200">
     <p className="font-mono text-xs uppercase tracking-widest text-neutral-400 px-1 pt-4 pb-2">
       Questions naturelles après ce résultat
     </p>
     <CrossLink
       href="/assurance-vie/fiscalite-rachat"
       title="Simuler avec des versements avant 27/09/2017"
       description="Les versements avant 2017 sur ce capital de {capital} bénéficient du taux 7,5 % — Calculer l'écart."
       context={{ capital: formatEur(inputs.capitalTotal) }}
     />
     <CrossLink
       href="/rente-viagere"
       title="Ce capital converti en rente viagère avant décès"
       description="{capital} en rente mensuelle à vie : comparaison avec la transmission aux bénéficiaires."
       context={{ capital: formatEur(inputs.capitalTotal) }}
     />
     <CrossLink
       href="/tmi"
       title="Vérifier la TMI des bénéficiaires"
       description="Les versements après 70 ans sont soumis aux droits de succession — la TMI des héritiers est déterminante."
     />
   </div>
 )}

 {results && (
   <ChatWidget
     contexte={{
       calculateur: 'assurance-vie/transmission',
       inputs: {
         ...inputs,
         dateOuverture: new Date(2010, 0, 1),
       },
       results,
     }}
   />
 )}
 </>
 )
}
