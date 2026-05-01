// src/components/Calculator/TransmissionCalculator.tsx
'use client'

import { useState, useEffect } from 'react'
import TransmissionChart from '@/components/TransmissionChart'
import {
 calculerTransmission,
 genererIdBeneficiaire,
 getLibelleLien,
 ajouterBeneficiaire,
 supprimerBeneficiaire,
 equilibrerParts,
 modifierPartBeneficiaire,
} from '@/lib/transmission'
import type { 
 TransmissionInputs, 
 TransmissionResults,
 Beneficiaire 
} from '@/types/transmission'

export default function TransmissionCalculator() {
 // États inputs
 const [capitalTotal, setCapitalTotal] = useState<number>(250000)
 const [versementsAvant70, setVersementsAvant70] = useState<number>(180000)
 const [versementsApres70, setVersementsApres70] = useState<number>(20000)
 const [ageSouscripteur, setAgeSouscripteur] = useState<number>(72)
 
 const [beneficiaires, setBeneficiaires] = useState<Beneficiaire[]>([
 {
 id: genererIdBeneficiaire(),
 nom: 'Enfant 1',
 lien: 'enfant',
 partPourcentage: 50
 },
 {
 id: genererIdBeneficiaire(),
 nom: 'Enfant 2',
 lien: 'enfant',
 partPourcentage: 50
 }
 ])

 // État résultats
 const [results, setResults] = useState<TransmissionResults | null>(null)

 // Calcul automatique
 useEffect(() => {
 const inputs: TransmissionInputs = {
 capitalTotal,
 versementsAvant70,
 versementsApres70,
 dateOuverture: new Date(2010, 0, 1),
 ageSouscripteur,
 beneficiaires
 }
 
 const calculatedResults = calculerTransmission(inputs)
 setResults(calculatedResults)
 }, [capitalTotal, versementsAvant70, versementsApres70, ageSouscripteur, beneficiaires])

 // Actions bénéficiaires — délèguent aux fonctions pures de lib/transmission
 const modifierBeneficiaire = (id: string, updates: Partial<Beneficiaire>) => {
   setBeneficiaires(beneficiaires.map(b => b.id === id ? { ...b, ...updates } : b))
 }

 const totalParts = beneficiaires.reduce((sum, b) => sum + b.partPourcentage, 0)

 return (
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
 {capitalTotal.toLocaleString('fr-FR')} €
 </span>
 </div>
 <input
 type="range"
 min="10000"
 max="2000000"
 step="10000"
 value={capitalTotal}
 onChange={(e) => setCapitalTotal(Number(e.target.value))}
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
 {versementsAvant70.toLocaleString('fr-FR')} €
 </span>
 </div>
 <input
 type="range"
 min="0"
 max={capitalTotal}
 step="5000"
 value={versementsAvant70}
 onChange={(e) => {
 const newVal = Number(e.target.value)
 setVersementsAvant70(newVal)
 // Ajuster après 70 si besoin
 if (newVal + versementsApres70> capitalTotal) {
 setVersementsApres70(Math.max(0, capitalTotal - newVal))
 }
 }}
 className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
 />
 <div className="flex justify-between text-xs text-neutral-500 mt-1">
 <span>0€</span>
 <span>{capitalTotal.toLocaleString('fr-FR')}€</span>
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
 {versementsApres70.toLocaleString('fr-FR')} €
 </span>
 </div>
 <input
 type="range"
 min="0"
 max={Math.max(0, capitalTotal - versementsAvant70)}
 step="5000"
 value={versementsApres70}
 onChange={(e) => setVersementsApres70(Number(e.target.value))}
 className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
 />
 <div className="flex justify-between text-xs text-neutral-500 mt-1">
 <span>0€</span>
 <span>{Math.max(0, capitalTotal - versementsAvant70).toLocaleString('fr-FR')}€</span>
 </div>
 </div>

 {/* Résumé versements */}
 <div className="bg-neutral-50 rounded-lg p-4 text-sm">
 <div className="flex justify-between mb-1">
 <span className="text-neutral-600">Versements totaux :</span>
 <span className="font-bold">{(versementsAvant70 + versementsApres70).toLocaleString('fr-FR')}€</span>
 </div>
 <div className="flex justify-between">
 <span className="text-neutral-600">Plus-value contrat :</span>
 <span className="font-bold text-primary-700">
 +{(capitalTotal - versementsAvant70 - versementsApres70).toLocaleString('fr-FR')}€
 </span>
 </div>
 </div>
 </div>

 {/* Carte : Bénéficiaires */}
 <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
 <div className="flex justify-between items-center mb-6">
 <h3 className="text-xl font-bold text-neutral-900">
 Bénéficiaires ({beneficiaires.length})
 </h3>
 <div className="flex gap-2">
 {beneficiaires.length > 1 && (
 <button
 onClick={() => setBeneficiaires(equilibrerParts(beneficiaires))}
 className="text-xs bg-neutral-100 hover:bg-neutral-200 text-neutral-700 px-3 py-1 rounded-lg font-medium transition-colors"
>
 Équilibrer
 </button>
 )}
 {beneficiaires.length < 6 && (
 <button
 onClick={() => setBeneficiaires(ajouterBeneficiaire(beneficiaires))}
 className="text-xs bg-primary-600 hover:bg-primary-700 text-white px-3 py-1 rounded-lg font-medium transition-colors"
>
 + Ajouter
 </button>
 )}
 </div>
 </div>

 {/* Alerte total parts */}
 {Math.abs(totalParts - 100)> 0.01 && (
 <div className="bg-primary-50 border border-primary-300 rounded-lg p-3 mb-4 text-sm">
 <p className="text-primary-900">
 Total des parts : <strong>{totalParts.toFixed(1)}%</strong> (doit faire 100%)
 </p>
 </div>
 )}

 {/* Indication cascade proportionnelle */}
 {beneficiaires.length > 1 && (
 <div className="bg-primary-50 border border-primary-200 rounded-lg p-3 mb-4 text-xs text-primary-800">
 <p>
 Déplacer le curseur d'un bénéficiaire ajuste automatiquement les bénéficiaires 
 situés en dessous pour maintenir 100%.
 </p>
 </div>
 )}

 {/* Liste bénéficiaires */}
 <div className="space-y-4">
 {beneficiaires.map((benef, index) => (
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
 {beneficiaires.length > 1 && (
 <button
 onClick={() => setBeneficiaires(supprimerBeneficiaire(beneficiaires, benef.id))}
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
 {/* Indicateur : ce bénéficiaire ajustera ceux en dessous */}
 {index < beneficiaires.length - 1 && (
 <span 
 className="text-xs bg-primary-100 text-primary-700 px-1.5 py-0.5 rounded text-[10px] font-medium"
 title="Modifier cette part ajuste les bénéficiaires en dessous"
>
 ajustable
 </span>
 )}
 {/* Indicateur : dernier bénéficiaire = auto-ajusté */}
 {index === beneficiaires.length - 1 && beneficiaires.length > 1 && (
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
 ({Math.round((benef.partPourcentage / 100) * capitalTotal).toLocaleString('fr-FR')}€)
 </span>
 </span>
 </div>
 <input
 type="range"
 min="0"
 max={(() => {
 // Max = 100 - somme des bénéficiaires AVANT (figés)
 const partAvant = beneficiaires
 .slice(0, index)
 .reduce((sum, b) => sum + b.partPourcentage, 0)
 return Math.max(0, 100 - partAvant)
 })()}
 step="0.5"
 value={benef.partPourcentage}
 onChange={(e) => setBeneficiaires(modifierPartBeneficiaire(beneficiaires, benef.id, Number(e.target.value)))}
 disabled={index === beneficiaires.length - 1 && beneficiaires.length > 1}
 className={`w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary-600 ${
 index === beneficiaires.length - 1 && beneficiaires.length > 1 
 ? 'opacity-60 cursor-not-allowed' 
 : ''
 }`}
 />
 {/* Afficher max disponible si différent de 100 */}
 {index < beneficiaires.length - 1 && (() => {
 const partAvant = beneficiaires
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
 </div>
 </div>
 )
}
