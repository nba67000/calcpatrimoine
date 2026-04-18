// src/app/faq/page.tsx
'use client'

import { useState } from 'react'
import type { ReactElement } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CrossLink from '@/components/CrossLink'

interface FAQItem {
  question: string
  answer: string | ReactElement
}

interface FAQSection {
  title: string
  icon: string
  items: FAQItem[]
}

function FAQAccordion({ item }: { item: FAQItem }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border border-neutral-200 rounded-lg mb-3 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex justify-between items-center bg-white hover:bg-neutral-50 transition-colors text-left"
      >
        <span className="font-medium text-neutral-900 pr-4">{item.question}</span>
        <svg 
          className={`w-5 h-5 text-neutral-400 flex-shrink-0 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-200">
          <div className="text-neutral-700 leading-relaxed prose prose-sm max-w-none">
            {item.answer}
          </div>
        </div>
      )}
    </div>
  )
}

export default function FAQPage() {
  const sections: FAQSection[] = [
    {
      title: "Les bases",
      icon: "🎓",
      items: [
        {
          question: "C'est quoi une rente viagère ?",
          answer: (
            <>
              <p className="mb-3">
                <strong>En une phrase</strong> : C&apos;est transformer un gros montant d&apos;argent en petits revenus mensuels garantis jusqu&apos;à votre décès.
              </p>
              <p className="mb-3">
                <strong>Exemple concret</strong> : Vous avez 100 000€ d&apos;épargne. Au lieu de les laisser dormir, 
                vous les donnez à un assureur qui vous verse 614€ chaque mois jusqu&apos;à la fin de votre vie 
                (si vous avez 65 ans, homme).
              </p>
              <p className="mb-3">
                <strong>Pourquoi faire ça ?</strong> Pour avoir un revenu régulier et sécurisé, 
                comme un complément de retraite que vous créez vous-même.
              </p>
              <div className="bg-primary-50 border-l-4 border-blue-400 p-4 mt-4">
                <p className="text-sm text-primary-900">
                  💡 <strong>À retenir</strong> : Plus vous êtes âgé au moment de souscrire, 
                  plus la rente mensuelle est élevée (car l&apos;assureur estime vous verser moins longtemps).
                </p>
              </div>
            </>
          )
        },
        {
          question: "Comment ça marche concrètement ?",
          answer: (
            <>
              <p className="mb-3">
                <strong>Étape 1</strong> : Vous versez votre capital à un assureur (exemple : 150 000€).
              </p>
              <p className="mb-3">
                <strong>Étape 2</strong> : L&apos;assureur calcule combien vous verser chaque mois en fonction de :
              </p>
              <ul className="list-disc pl-6 mb-3 space-y-1">
                <li>Votre âge (plus vous êtes âgé, plus la rente est élevée)</li>
                <li>Votre sexe (les femmes vivent plus longtemps, donc rente légèrement plus basse)</li>
                <li>Les options choisies (réversion ou pas, voir plus bas)</li>
              </ul>
              <p className="mb-3">
                <strong>Étape 3</strong> : Vous recevez votre rente chaque mois, à vie, peu importe combien de temps vous vivez.
              </p>
              <div className="bg-success-50 border-l-4 border-green-400 p-4 mt-4">
                <p className="text-sm text-green-900">
                  ✅ <strong>Exemple chiffré</strong> : Marc, 70 ans, verse 200 000€. 
                  Il reçoit 1 227€/mois à vie. S&apos;il vit jusqu&apos;à 90 ans (20 ans), 
                  il aura touché au total 294 480€.
                </p>
              </div>
            </>
          )
        },
        {
          question: "Quelle différence avec un placement classique (Livret A, assurance-vie) ?",
          answer: (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-neutral-100">
                      <th className="border border-neutral-300 px-4 py-2 text-left"></th>
                      <th className="border border-neutral-300 px-4 py-2 text-left">Livret A / Assurance-vie</th>
                      <th className="border border-neutral-300 px-4 py-2 text-left">Rente viagère</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-neutral-300 px-4 py-2 font-medium">Capital</td>
                      <td className="border border-neutral-300 px-4 py-2">✅ Vous gardez votre argent</td>
                      <td className="border border-neutral-300 px-4 py-2">❌ Vous le donnez définitivement</td>
                    </tr>
                    <tr>
                      <td className="border border-neutral-300 px-4 py-2 font-medium">Revenus</td>
                      <td className="border border-neutral-300 px-4 py-2">⚠️ Variables selon les marchés</td>
                      <td className="border border-neutral-300 px-4 py-2">✅ Fixes, garantis à vie</td>
                    </tr>
                    <tr>
                      <td className="border border-neutral-300 px-4 py-2 font-medium">Durée</td>
                      <td className="border border-neutral-300 px-4 py-2">⏱️ Limité par votre capital</td>
                      <td className="border border-neutral-300 px-4 py-2">♾️ Jusqu&apos;à votre décès (illimité)</td>
                    </tr>
                    <tr>
                      <td className="border border-neutral-300 px-4 py-2 font-medium">Héritage</td>
                      <td className="border border-neutral-300 px-4 py-2">✅ Transmis à vos héritiers</td>
                      <td className="border border-neutral-300 px-4 py-2">❌ Rien si vous décédez tôt (sauf réversion)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm text-neutral-700">
                <strong>En résumé</strong> : La rente viagère, c&apos;est l&apos;inverse d&apos;un héritage. 
                Vous &quot;pariez&quot; sur votre longévité pour avoir un revenu garanti à vie.
              </p>
            </>
          )
        },
        {
          question: "Est-ce que c'est sûr ? L'assureur peut faire faillite ?",
          answer: (
            <>
              <p className="mb-3">
                <strong>Oui, c&apos;est très sûr</strong>, mais pas à 100% comme tout placement.
              </p>
              <p className="mb-3">
                <strong>Pourquoi c&apos;est sûr</strong> :
              </p>
              <ul className="list-disc pl-6 mb-3 space-y-1">
                <li>Les assureurs sont surveillés par l&apos;ACPR (Autorité de Contrôle)</li>
                <li>Ils doivent garder des réserves obligatoires énormes</li>
                <li>Si un assureur fait faillite, un fonds de garantie vous rembourse jusqu&apos;à 70 000€</li>
              </ul>
              <p className="mb-3">
                <strong>Risques réels</strong> :
              </p>
              <ul className="list-disc pl-6 mb-3 space-y-1">
                <li>Si vous décédez tôt, vous perdez votre capital (sauf option réversion)</li>
                <li>L&apos;inflation réduit le pouvoir d&apos;achat de votre rente (614€ en 2026 ≠ 614€ en 2046)</li>
              </ul>
              <div className="bg-warning-50 border-l-4 border-warning-400 p-4 mt-4">
                <p className="text-sm text-warning-900">
                  ⚠️ <strong>Conseil</strong> : Ne mettez pas TOUT votre capital en rente viagère. 
                  Gardez une réserve de sécurité (10-20k€) accessible en cas d&apos;urgence (santé, travaux...).
                </p>
              </div>
            </>
          )
        },
        {
          question: "Pour qui c'est fait ?",
          answer: (
            <>
              <p className="mb-3">
                <strong>La rente viagère convient si</strong> :
              </p>
              <ul className="list-disc pl-6 mb-3 space-y-2">
                <li>
                  ✅ Vous avez <strong>plus de 60 ans</strong> et un capital disponible (50k€+)
                </li>
                <li>
                  ✅ Vous voulez <strong>sécuriser vos vieux jours</strong> avec un revenu garanti
                </li>
                <li>
                  ✅ Vous n&apos;avez <strong>pas d&apos;héritiers</strong> ou ils n&apos;en ont pas besoin
                </li>
                <li>
                  ✅ Vous craignez de <strong>vivre très longtemps</strong> et de manquer d&apos;argent
                </li>
                <li>
                  ✅ Votre retraite est <strong>trop basse</strong> et vous voulez un complément stable
                </li>
              </ul>
              <p className="mb-3">
                <strong>Ce n&apos;est PAS fait pour vous si</strong> :
              </p>
              <ul className="list-disc pl-6 mb-3 space-y-2">
                <li>
                  ❌ Vous avez <strong>moins de 60 ans</strong> (rente trop faible, mieux vaut investir)
                </li>
                <li>
                  ❌ Vous voulez <strong>laisser un héritage important</strong> à vos enfants
                </li>
                <li>
                  ❌ Vous avez besoin de <strong>liquidités</strong> (impossible de récupérer le capital)
                </li>
                <li>
                  ❌ Vous êtes en <strong>mauvaise santé</strong> (risque de décès rapide)
                </li>
              </ul>
              <div className="bg-primary-50 border-l-4 border-blue-400 p-4 mt-4">
                <p className="text-sm text-primary-900">
                  💡 <strong>Cas idéal</strong> : Jeanne, 68 ans, célibataire, 120 000€ d&apos;épargne, 
                  retraite 1200€/mois. Elle transforme 80 000€ en rente (491€/mois) et garde 40 000€ 
                  en réserve. Total : 1691€/mois garanti à vie.
                </p>
              </div>
            </>
          )
        }
      ]
    },
    {
      title: "L'argent",
      icon: "💰",
      items: [
        {
          question: "Comment savoir combien je vais toucher chaque mois ?",
          answer: (
            <>
              <p className="mb-3">
                <strong>Utilisez notre calculateur</strong> en haut de cette page ! 
                C&apos;est gratuit, instantané, et basé sur les vraies tables de mortalité INSEE.
              </p>
              <p className="mb-3">
                <strong>Ordre de grandeur</strong> (pour 100 000€ de capital) :
              </p>
              <ul className="list-none pl-0 mb-3 space-y-2">
                <li>Homme 65 ans → <strong>614€/mois</strong></li>
                <li>Homme 70 ans → <strong>766€/mois</strong></li>
                <li>Homme 75 ans → <strong>996€/mois</strong></li>
                <li>Femme 65 ans → <strong>532€/mois</strong> (vit plus longtemps)</li>
                <li>Femme 70 ans → <strong>671€/mois</strong></li>
                <li>Femme 75 ans → <strong>885€/mois</strong></li>
              </ul>
              <div className="bg-success-50 border-l-4 border-green-400 p-4 mt-4">
                <p className="text-sm text-green-900">
                  ✅ <strong>Astuce</strong> : Plus vous attendez (70 ans vs 65 ans), 
                  plus la rente mensuelle est élevée (+25% environ tous les 5 ans).
                </p>
              </div>
            </>
          )
        },
        {
          question: "Que devient mon capital ? Je peux le récupérer ?",
          answer: (
            <>
              <p className="mb-3">
                <strong>Non, vous ne pouvez pas récupérer votre capital</strong>. 
                C&apos;est le principe de la rente viagère : échange définitif.
              </p>
              <p className="mb-3">
                <strong>Concrètement</strong> :
              </p>
              <ul className="list-disc pl-6 mb-3 space-y-1">
                <li>Vous versez 100 000€ → L&apos;argent n&apos;est plus à vous</li>
                <li>L&apos;assureur le met dans un &quot;pot commun&quot; avec d&apos;autres clients</li>
                <li>Il vous verse 614€/mois jusqu&apos;à votre décès</li>
                <li>À votre décès, l&apos;argent restant reste chez l&apos;assureur</li>
              </ul>
              <p className="mb-3">
                <strong>Pourquoi ?</strong> C&apos;est un système de <strong>mutualisation</strong> : 
                ceux qui décèdent tôt &quot;financent&quot; ceux qui vivent longtemps.
              </p>
              <div className="bg-red-50 border-l-4 border-red-400 p-4 mt-4">
                <p className="text-sm text-red-900">
                  ⚠️ <strong>ATTENTION</strong> : Réfléchissez bien avant de souscrire. 
                  Une fois signé, c&apos;est irréversible. Vous ne pouvez ni annuler, ni récupérer votre capital.
                </p>
              </div>
            </>
          )
        },
        {
          question: "Si je décède avant l'âge moyen (espérance de vie), je perds tout ?",
          answer: (
            <>
              <p className="mb-3">
                <strong>Oui, SAUF si vous avez pris l&apos;option réversion</strong> (voir question suivante).
              </p>
              <p className="mb-3">
                <strong>Exemple concret</strong> :
              </p>
              <div className="bg-neutral-100 p-4 rounded-lg mb-3">
                <p className="mb-2">
                  Jean, 65 ans, verse 100 000€. Il reçoit 614€/mois.
                </p>
                <p className="mb-2">
                  <strong>Scénario 1</strong> : Il décède à 70 ans (5 ans après)
                </p>
                <ul className="list-none pl-4 mb-2">
                  <li>→ Total reçu : 614€ × 12 mois × 5 ans = <strong>36 840€</strong></li>
                  <li>→ Perte : 100 000€ - 36 840€ = <strong>63 160€</strong> ❌</li>
                </ul>
                <p className="mb-2">
                  <strong>Scénario 2</strong> : Il décède à 85 ans (20 ans après)
                </p>
                <ul className="list-none pl-4">
                  <li>→ Total reçu : 614€ × 12 mois × 20 ans = <strong>147 360€</strong></li>
                  <li>→ Gain : 147 360€ - 100 000€ = <strong>+47 360€</strong> ✅</li>
                </ul>
              </div>
              <p className="mb-3">
                <strong>Point mort</strong> (âge où vous &quot;récupérez&quot; votre capital) :
              </p>
              <ul className="list-disc pl-6 mb-3">
                <li>Homme 65 ans → Point mort à <strong>78-79 ans</strong> (13-14 ans)</li>
                <li>Femme 65 ans → Point mort à <strong>80-81 ans</strong> (15-16 ans)</li>
              </ul>
              <div className="bg-warning-50 border-l-4 border-warning-400 p-4 mt-4">
                <p className="text-sm text-warning-900">
                  💡 <strong>C&apos;est un pari</strong> : Si vous vivez longtemps, vous gagnez. 
                  Si vous décédez tôt, vous perdez. C&apos;est le principe de l&apos;assurance.
                </p>
              </div>
            </>
          )
        },
        {
          question: "Si je vis très longtemps (100 ans), l'assureur arrête de payer ?",
          answer: (
            <>
              <p className="mb-3">
                <strong>NON ! L&apos;assureur paie jusqu&apos;à votre décès, même à 110 ans.</strong>
              </p>
              <p className="mb-3">
                <strong>C&apos;est tout l&apos;intérêt de la rente viagère</strong> : 
                vous êtes protégé contre le risque de &quot;vivre trop longtemps&quot; et de manquer d&apos;argent.
              </p>
              <p className="mb-3">
                <strong>Exemple extrême</strong> :
              </p>
              <div className="bg-success-100 p-4 rounded-lg mb-3">
                <p className="mb-2">
                  Marie, 65 ans, verse 100 000€. Elle reçoit 532€/mois (femme).
                </p>
                <p className="mb-2">
                  <strong>Elle vit jusqu&apos;à 102 ans</strong> (37 ans de rente) :
                </p>
                <ul className="list-none pl-4">
                  <li>→ Total reçu : 532€ × 12 × 37 = <strong>236 208€</strong></li>
                  <li>→ Gain : 236 208€ - 100 000€ = <strong>+136 208€</strong></li>
                </ul>
              </div>
              <p className="mb-3">
                <strong>Pourquoi l&apos;assureur accepte ?</strong> Parce qu&apos;il mutualise : 
                certains clients décèdent à 70 ans (il garde leur argent), 
                d&apos;autres vivent jusqu&apos;à 100 ans (il paie plus). En moyenne, ça s&apos;équilibre.
              </p>
              <div className="bg-primary-50 border-l-4 border-blue-400 p-4 mt-4">
                <p className="text-sm text-primary-900">
                  ✅ <strong>Garantie</strong> : Même si vous vivez 50 ans de plus, 
                  l&apos;assureur est <strong>légalement obligé</strong> de vous verser la rente.
                </p>
              </div>
            </>
          )
        },
        {
          question: "Puis-je arrêter la rente et récupérer mon capital ?",
          answer: (
            <>
              <p className="mb-3">
                <strong>Non, c&apos;est impossible</strong>. Une fois le contrat signé, il est irréversible.
              </p>
              <p className="mb-3">
                <strong>Même si</strong> :
              </p>
              <ul className="list-disc pl-6 mb-3 space-y-1">
                <li>Vous avez un gros besoin d&apos;argent (santé, travaux...)</li>
                <li>Vous regrettez votre choix</li>
                <li>L&apos;inflation rend la rente trop faible</li>
                <li>Vous voulez changer de stratégie</li>
              </ul>
              <p className="mb-3">
                <strong>Solutions si vous avez besoin d&apos;argent</strong> :
              </p>
              <ol className="list-decimal pl-6 mb-3 space-y-2">
                <li>
                  <strong>Gardez une réserve</strong> : Ne mettez jamais 100% de votre capital en rente. 
                  Conservez 20-30% en épargne accessible (Livret A, assurance-vie).
                </li>
                <li>
                  <strong>Vente de rente</strong> (rare) : Certaines sociétés rachètent votre rente 
                  à prix cassé (vous perdez 30-50% de la valeur). À éviter sauf urgence absolue.
                </li>
              </ol>
              <div className="bg-red-50 border-l-4 border-red-400 p-4 mt-4">
                <p className="text-sm text-red-900">
                  🚨 <strong>CRUCIAL</strong> : Avant de signer, assurez-vous de garder une épargne de sécurité. 
                  La rente viagère doit compléter vos revenus, pas être votre unique ressource.
                </p>
              </div>
            </>
          )
        }
      ]
    },
    {
      title: "Situations spéciales",
      icon: "👥",
      items: [
        {
          question: "La réversion, c'est quoi ? Ça sert à quoi ?",
          answer: (
            <>
              <p className="mb-3">
                <strong>La réversion, c&apos;est protéger votre conjoint</strong>.
              </p>
              <p className="mb-3">
                <strong>Sans réversion</strong> :
              </p>
              <ul className="list-disc pl-6 mb-3">
                <li>Vous décédez → La rente s&apos;arrête immédiatement</li>
                <li>Votre conjoint ne touche plus rien</li>
              </ul>
              <p className="mb-3">
                <strong>Avec réversion (60%, 80% ou 100%)</strong> :
              </p>
              <ul className="list-disc pl-6 mb-3">
                <li>Vous décédez → Votre conjoint continue à recevoir 60%, 80% ou 100% de la rente</li>
                <li>Jusqu&apos;à son propre décès</li>
              </ul>
              <p className="mb-3">
                <strong>Exemple chiffré</strong> :
              </p>
              <div className="bg-primary-100 p-4 rounded-lg mb-3">
                <p className="mb-2">
                  Pierre, 65 ans, verse 100 000€.
                </p>
                <p className="mb-2">
                  <strong>Sans réversion</strong> : 614€/mois
                </p>
                <p className="mb-2">
                  <strong>Avec réversion 60%</strong> : 540€/mois
                </p>
                <p className="mb-2 text-sm text-neutral-700">
                  → Si Pierre décède, sa femme Marie touche 60% × 540€ = <strong>324€/mois à vie</strong><br/>
                  → Si Marie décède avant Pierre, Pierre garde ses <strong>540€/mois</strong> (c&apos;est sa rente)
                </p>
              </div>
              
              <div className="bg-warning-50 border-l-4 border-warning-400 p-4 mb-3">
                <p className="text-sm text-warning-900">
                  ⚠️ <strong>Important</strong> : La réversion ne fonctionne que <strong>dans un sens</strong> 
                  (du titulaire vers le bénéficiaire). Si c&apos;est votre conjoint qui décède en premier, 
                  vous gardez 100% de votre rente. Seul le conjoint survivant bénéficie de la réversion.
                </p>
              </div>
              
              <p className="mb-3">
                <strong>Quel taux choisir ?</strong>
              </p>
              <ul className="list-disc pl-6 mb-3">
                <li><strong>60%</strong> : Si votre conjoint a ses propres revenus</li>
                <li><strong>80%</strong> : Compromis équilibré (le plus courant)</li>
                <li><strong>100%</strong> : Si votre conjoint dépend entièrement de vos revenus</li>
              </ul>
            </>
          )
        },
        {
          question: "Mode couple : quelle stratégie choisir ?",
          answer: (
            <>
              <p className="mb-3">
                <strong>Notre calculateur &quot;Mode Couple&quot; compare plusieurs stratégies</strong> pour optimiser 
                vos revenus en couple et protéger le survivant.
              </p>
              
              <div className="bg-primary-50 border-l-4 border-blue-400 p-4 mb-4">
                <p className="text-sm text-primary-900">
                  💡 <strong>Principe clé</strong> : Dans un couple, vous avez deux options principales :
                </p>
                <ul className="list-disc pl-6 mt-2 text-sm text-primary-900 space-y-1">
                  <li><strong>Rentes séparées</strong> : Chacun transforme son capital en rente (revenus max pour le couple, mais chute importante au premier décès)</li>
                  <li><strong>Capital regroupé</strong> : Tout le capital sur une seule tête avec réversion (revenus couple plus bas, mais survivant mieux protégé)</li>
                </ul>
              </div>
              
              <p className="mb-3">
                <strong>Les stratégies comparées</strong> :
              </p>
              <ol className="list-decimal pl-6 mb-3 space-y-2">
                <li>
                  <strong>Rentes séparées</strong> : Chacun sa rente sur son capital
                  <div className="text-sm text-neutral-600 mt-1">
                    ✅ Revenus couple maximaux<br/>
                    ⚠️ Survivant perd la rente du défunt (chute de revenus importante)
                  </div>
                </li>
                <li>
                  <strong>Capital total sur Personne 1</strong> avec réversion 60%, 80% ou 100% vers Personne 2
                  <div className="text-sm text-neutral-600 mt-1">
                    Protection asymétrique : Personne 2 protégée à X%, Personne 1 garde 100% si P2 décède
                  </div>
                </li>
                <li>
                  <strong>Capital total sur Personne 2</strong> avec réversion 60%, 80% ou 100% vers Personne 1
                  <div className="text-sm text-neutral-600 mt-1">
                    Protection asymétrique : Personne 1 protégée à X%, Personne 2 garde 100% si P1 décède
                  </div>
                </li>
              </ol>
              
              <p className="mb-3">
                <strong>Comment choisir ?</strong>
              </p>
              <ul className="list-disc pl-6 mb-3 space-y-2">
                <li>
                  <strong>Si un conjoint a des revenus faibles</strong> : Mettre le capital sur l&apos;autre avec réversion 80-100%
                </li>
                <li>
                  <strong>Si revenus équilibrés</strong> : Rentes séparées OU capital regroupé 80%
                </li>
                <li>
                  <strong>Si vous voulez maximiser les revenus</strong> : Rentes séparées (mais risque survivant)
                </li>
              </ul>
              
              <div className="bg-success-50 border-l-4 border-green-400 p-4 mt-4">
                <p className="text-sm text-green-900">
                  <strong>Notre recommandation automatique</strong> analyse votre situation et privilégie 
                  la stratégie qui protège au mieux le survivant (au moins 70% des revenus du couple) 
                  tout en maximisant les revenus tant que vous êtes vivants tous les deux.
                </p>
              </div>
            </>
          )
        },
        {
          question: "Fiscalité : je paie des impôts sur ma rente ?",
          answer: (
            <>
              <p className="mb-3">
                <strong>Oui, mais seulement sur une partie</strong> (c&apos;est avantageux).
              </p>
              <p className="mb-3">
                <strong>Comment ça marche</strong> :
              </p>
              <ul className="list-disc pl-6 mb-3">
                <li>Seule une <strong>fraction</strong> de votre rente est imposable</li>
                <li>Cette fraction dépend de votre âge au moment de souscrire</li>
                <li>Plus vous souscrivez âgé, moins vous payez d&apos;impôts</li>
              </ul>
              <p className="mb-3">
                <strong>Barème 2026</strong> :
              </p>
              <table className="w-full text-sm border-collapse mb-3">
                <thead>
                  <tr className="bg-neutral-100">
                    <th className="border border-neutral-300 px-4 py-2 text-left">Âge lors du 1er versement</th>
                    <th className="border border-neutral-300 px-4 py-2 text-left">Part imposable</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-neutral-300 px-4 py-2">Moins de 50 ans</td>
                    <td className="border border-neutral-300 px-4 py-2">70%</td>
                  </tr>
                  <tr>
                    <td className="border border-neutral-300 px-4 py-2">50 à 59 ans</td>
                    <td className="border border-neutral-300 px-4 py-2">50%</td>
                  </tr>
                  <tr>
                    <td className="border border-neutral-300 px-4 py-2">60 à 69 ans</td>
                    <td className="border border-neutral-300 px-4 py-2">40%</td>
                  </tr>
                  <tr>
                    <td className="border border-neutral-300 px-4 py-2">70 ans et plus</td>
                    <td className="border border-neutral-300 px-4 py-2">30%</td>
                  </tr>
                </tbody>
              </table>
              <p className="mb-3">
                <strong>Exemple concret</strong> :
              </p>
              <div className="bg-primary-100 p-4 rounded-lg">
                <p className="mb-2">
                  Paul, 65 ans, reçoit 614€/mois de rente.
                </p>
                <ul className="list-none pl-0 space-y-1">
                  <li>→ Part imposable : 40% (car souscrit à 65 ans)</li>
                  <li>→ Montant imposable : 614€ × 40% = <strong>245,60€</strong></li>
                  <li>→ Si TMI 11%, impôt : 245,60€ × 11% = <strong>27€/mois</strong></li>
                  <li>→ Rente nette : 614€ - 27€ = <strong>587€/mois</strong></li>
                </ul>
              </div>
            </>
          )
        },
        {
          question: "Quel est le bon âge pour souscrire ?",
          answer: (
            <>
              <p className="mb-3">
                <strong>Entre 65 et 75 ans, c&apos;est l&apos;idéal</strong>.
              </p>
              <p className="mb-3">
                <strong>Pourquoi pas avant 60 ans ?</strong>
              </p>
              <ul className="list-disc pl-6 mb-3">
                <li>Rente mensuelle trop faible (à 55 ans : ~400€ pour 100k€)</li>
                <li>Trop tôt pour bloquer votre capital définitivement</li>
                <li>Mieux vaut investir et faire fructifier votre argent</li>
              </ul>
              <p className="mb-3">
                <strong>Pourquoi pas après 80 ans ?</strong>
              </p>
              <ul className="list-disc pl-6 mb-3">
                <li>Risque de santé plus élevé (décès rapide = perte)</li>
                <li>Certains assureurs refusent ou appliquent des conditions strictes</li>
                <li>Vous avez peut-être déjà organisé votre retraite autrement</li>
              </ul>
              <p className="mb-3">
                <strong>L&apos;âge idéal dépend de</strong> :
              </p>
              <ul className="list-disc pl-6 mb-3">
                <li><strong>Votre santé</strong> : En bonne santé → attendez 70-75 ans</li>
                <li><strong>Vos besoins</strong> : Besoin urgent de revenus → souscrivez plus tôt</li>
                <li><strong>Votre famille</strong> : Pas d&apos;héritiers → souscrivez quand vous voulez</li>
              </ul>
            </>
          )
        },
        {
          question: "Où souscrire une rente viagère ? (Banque, assureur, courtier)",
          answer: (
            <>
              <p className="mb-3">
                <strong>3 options</strong> :
              </p>
              <ol className="list-decimal pl-6 mb-3 space-y-3">
                <li>
                  <strong>Votre banque</strong>
                  <ul className="list-none pl-4 mt-1 text-sm text-neutral-700">
                    <li>✅ Pratique (vous avez déjà un conseiller)</li>
                    <li>❌ Souvent plus cher (moins de choix, commissions élevées)</li>
                  </ul>
                </li>
                <li>
                  <strong>Un assureur directement</strong>
                  <ul className="list-none pl-4 mt-1 text-sm text-neutral-700">
                    <li>✅ Tarifs transparents</li>
                    <li>❌ Vous ne comparez qu&apos;un seul produit</li>
                  </ul>
                </li>
                <li>
                  <strong>Un courtier en assurances</strong>
                  <ul className="list-none pl-4 mt-1 text-sm text-neutral-700">
                    <li>✅ Compare plusieurs assureurs (meilleur taux)</li>
                    <li>✅ Conseils personnalisés gratuits</li>
                    <li>⚠️ Vérifiez qu&apos;il est certifié ORIAS</li>
                  </ul>
                </li>
              </ol>
              <p className="mb-3">
                <strong>Notre conseil</strong> : Contactez 2-3 courtiers, comparez leurs propositions, 
                et choisissez le meilleur taux.
              </p>
              <div className="bg-warning-50 border-l-4 border-warning-400 p-4 mt-4">
                <p className="text-sm text-warning-900">
                  ⚠️ <strong>Attention aux arnaques</strong> : Vérifiez toujours que le courtier est enregistré 
                  sur <a href="https://www.orias.fr" target="_blank" rel="noopener" className="text-primary-600 underline">orias.fr</a> 
                  (registre officiel des intermédiaires en assurance).
                </p>
              </div>
              <p className="mt-4 text-sm text-neutral-600">
                <strong>Note</strong> : CalcPatrimoine est un outil de calcul gratuit et indépendant. 
                Nous ne vendons pas de rentes viagères. Utilisez nos calculateurs pour estimer vos montants, 
                puis contactez un courtier certifié pour souscrire.
              </p>
            </>
          )
        }
      ]
    }
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
      <Header />

      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* En-tête */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">
            Questions fréquentes
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto mb-8">
            Tout ce que vous devez savoir sur la rente viagère, expliqué simplement avec des exemples concrets.
          </p>
          
          {/* Lien vers FAQ Assurance-Vie */}
          <div className="max-w-2xl mx-auto mb-6">
            <a
              href="/faq/assurance-vie"
              className="block bg-success-50 border-2 border-success-200 rounded-xl p-6 hover:border-success-400 hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="text-3xl">🏦</div>
                <div className="flex-1 text-left">
                  <div className="font-bold text-neutral-900 mb-1 group-hover:text-success-600 transition-colors">
                    FAQ Assurance-Vie
                  </div>
                  <div className="text-sm text-neutral-600">
                    Fiscalité du rachat : PFU vs IR, abattement, optimisations
                  </div>
                </div>
                <div className="text-success-600 group-hover:translate-x-1 transition-transform">
                  →
                </div>
              </div>
            </a>
          </div>
          
          {/* Cross-link Méthodologie */}
          <div className="max-w-2xl mx-auto">
            <CrossLink
              title="Voir les formules détaillées"
              description="Découvrez comment sont calculées les rentes avec les tables INSEE"
              href="/methodologie"
              icon="📐"
              variant="purple"
            />
          </div>
        </header>

        {/* Sections FAQ */}
        {sections.map((section, sectionIndex) => (
          <section key={sectionIndex} className="mb-12">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
              <span>{section.icon}</span>
              <span>{section.title}</span>
            </h2>
            
            <div>
              {section.items.map((item, itemIndex) => (
                <FAQAccordion key={itemIndex} item={item} />
              ))}
            </div>
          </section>
        ))}

        {/* Cross-link vers calculateur */}
        <div className="mb-12">
          <CrossLink
            title="Testez le calculateur"
            description="Calculez votre rente viagère en 30 secondes avec nos 3 modes"
            href="/"
            icon="🧮"
            variant="green"
          />
        </div>

        {/* CTA final */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-8 text-center text-white mt-16">
          <h3 className="text-2xl font-bold mb-3">Vous avez d&apos;autres questions ?</h3>
          <p className="text-primary-100 mb-6">
            Contactez-nous par email, nous vous répondrons sous 48h.
          </p>
          <a
            href="mailto:contact@calcpatrimoine.fr"
            className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-medium 
                       hover:bg-primary-50 transition-colors"
          >
            Nous contacter
          </a>
        </div>
      </div>

      <Footer />
    </main>
  )
}
