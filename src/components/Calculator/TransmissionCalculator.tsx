// src/components/Calculator/TransmissionCalculator.tsx
'use client'

import { useState, useEffect } from 'react'
import TransmissionChart from '@/components/TransmissionChart'
import { calculerTransmission, genererIdBeneficiaire, getLibelleLien } from '@/lib/transmission'
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

  // Actions bénéficiaires
  const ajouterBeneficiaire = () => {
    if (beneficiaires.length >= 6) return
    
    const partExistante = beneficiaires.reduce((sum, b) => sum + b.partPourcentage, 0)
    const partRestante = Math.max(0, 100 - partExistante)
    
    setBeneficiaires([
      ...beneficiaires,
      {
        id: genererIdBeneficiaire(),
        nom: `Bénéficiaire ${beneficiaires.length + 1}`,
        lien: 'enfant',
        partPourcentage: partRestante
      }
    ])
  }

  const supprimerBeneficiaire = (id: string) => {
    if (beneficiaires.length <= 1) return
    setBeneficiaires(beneficiaires.filter(b => b.id !== id))
  }

  const modifierBeneficiaire = (id: string, updates: Partial<Beneficiaire>) => {
    setBeneficiaires(beneficiaires.map(b => 
      b.id === id ? { ...b, ...updates } : b
    ))
  }

  /**
   * Modifie la part d'un bénéficiaire avec cascade proportionnelle
   * 
   * Règle : Quand on bouge le bénéficiaire N, seuls les bénéficiaires 
   * situés APRÈS (N+1, N+2, ...) s'ajustent proportionnellement pour 
   * maintenir le total à 100%.
   * 
   * Les bénéficiaires AVANT (1, 2, ..., N-1) restent figés.
   * 
   * Exemple : 3 bénéficiaires (40, 40, 20)
   *   - Bouger benef 1 à 60% → benef 2 et 3 ajustés proportionnellement
   *     Ratio benef 2/3 actuel : 40/20 = 2/1 (soit 2/3 et 1/3)
   *     Reste à répartir : 100 - 60 = 40%
   *     Benef 2 : 40 × 2/3 = 26.67%
   *     Benef 3 : 40 × 1/3 = 13.33%
   *   - Bouger benef 2 à 50% → seul benef 3 ajusté
   *     Benef 1 reste à 40%, reste à répartir : 100 - 40 - 50 = 10%
   *     Benef 3 : 10%
   */
  const modifierPartBeneficiaire = (id: string, nouvelleValeur: number) => {
    const index = beneficiaires.findIndex(b => b.id === id)
    if (index === -1) return

    // Cas spécial : dernier bénéficiaire → pas de cascade possible
    // On lui permet de changer et on affichera l'alerte "total != 100%"
    if (index === beneficiaires.length - 1) {
      setBeneficiaires(beneficiaires.map(b => 
        b.id === id ? { ...b, partPourcentage: nouvelleValeur } : b
      ))
      return
    }

    // Somme des parts des bénéficiaires AVANT (figés)
    const partAvant = beneficiaires
      .slice(0, index)
      .reduce((sum, b) => sum + b.partPourcentage, 0)

    // Part maximum disponible pour le bénéficiaire actuel
    const partMaxDispo = 100 - partAvant
    const partClampee = Math.max(0, Math.min(nouvelleValeur, partMaxDispo))

    // Reste à répartir entre les bénéficiaires APRÈS
    const resteAPartager = partMaxDispo - partClampee

    // Bénéficiaires situés APRÈS
    const benefApres = beneficiaires.slice(index + 1)
    
    // Somme actuelle des parts des bénéficiaires après
    const sommePartsApres = benefApres.reduce((sum, b) => sum + b.partPourcentage, 0)

    // Créer le nouveau tableau
    const nouveauBeneficiaires = beneficiaires.map((b, i) => {
      // Bénéficiaires avant : inchangés
      if (i < index) return b
      
      // Bénéficiaire modifié
      if (i === index) {
        return { ...b, partPourcentage: partClampee }
      }
      
      // Bénéficiaires après : ajustement proportionnel
      if (sommePartsApres > 0) {
        // Garder le ratio entre bénéficiaires après
        const ratio = b.partPourcentage / sommePartsApres
        const nouvellePart = resteAPartager * ratio
        return { ...b, partPourcentage: Math.round(nouvellePart * 100) / 100 }
      } else {
        // Si toutes les parts après étaient à 0, répartir équitablement
        const nouvellePart = resteAPartager / benefApres.length
        return { ...b, partPourcentage: Math.round(nouvellePart * 100) / 100 }
      }
    })

    setBeneficiaires(nouveauBeneficiaires)
  }

  // Equilibrer les parts
  const equilibrerParts = () => {
    const partEgale = 100 / beneficiaires.length
    setBeneficiaires(beneficiaires.map(b => ({
      ...b,
      partPourcentage: Math.round(partEgale * 100) / 100
    })))
  }

  const totalParts = beneficiaires.reduce((sum, b) => sum + b.partPourcentage, 0)

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      
      {/* COLONNE GAUCHE - INPUTS */}
      <div className="space-y-6">
        
        {/* Carte : Capital et versements */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
          <h3 className="text-xl font-bold text-neutral-900 mb-6">
            💰 Capital du contrat
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
                if (newVal + versementsApres70 > capitalTotal) {
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
              className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-warning-600"
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
              <span className="font-bold text-success-700">
                +{(capitalTotal - versementsAvant70 - versementsApres70).toLocaleString('fr-FR')}€
              </span>
            </div>
          </div>
        </div>

        {/* Carte : Bénéficiaires */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-neutral-900">
              👥 Bénéficiaires ({beneficiaires.length})
            </h3>
            <div className="flex gap-2">
              {beneficiaires.length > 1 && (
                <button
                  onClick={equilibrerParts}
                  className="text-xs bg-neutral-100 hover:bg-neutral-200 text-neutral-700 px-3 py-1 rounded-lg font-medium transition-colors"
                >
                  Équilibrer
                </button>
              )}
              {beneficiaires.length < 6 && (
                <button
                  onClick={ajouterBeneficiaire}
                  className="text-xs bg-primary-600 hover:bg-primary-700 text-white px-3 py-1 rounded-lg font-medium transition-colors"
                >
                  + Ajouter
                </button>
              )}
            </div>
          </div>

          {/* Alerte total parts */}
          {Math.abs(totalParts - 100) > 0.01 && (
            <div className="bg-warning-50 border border-warning-300 rounded-lg p-3 mb-4 text-sm">
              <p className="text-warning-900">
                ⚠️ Total des parts : <strong>{totalParts.toFixed(1)}%</strong> (doit faire 100%)
              </p>
            </div>
          )}

          {/* Indication cascade proportionnelle */}
          {beneficiaires.length > 1 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 text-xs text-blue-800">
              <p>
                💡 Déplacer le curseur d'un bénéficiaire ajuste automatiquement les bénéficiaires 
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
                      onClick={() => supprimerBeneficiaire(benef.id)}
                      className="text-red-500 hover:text-red-700 text-sm"
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
                    onChange={(e) => modifierPartBeneficiaire(benef.id, Number(e.target.value))}
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
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm">
          <p className="font-bold text-blue-900 mb-2">💡 Rappel fiscal</p>
          <ul className="space-y-1 text-blue-800 text-xs">
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
        <div className="bg-warning-50 border-2 border-warning-300 rounded-xl p-5">
          <div className="flex items-start gap-3">
            <div className="text-2xl">⚠️</div>
            <div>
              <h4 className="font-bold text-warning-900 mb-2 text-sm">
                Outil de simulation uniquement
              </h4>
              <p className="text-xs text-warning-800 leading-relaxed">
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
