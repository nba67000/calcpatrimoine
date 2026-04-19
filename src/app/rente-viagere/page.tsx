// src/app/rente-viagere/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import RenteCalculator from '@/components/Calculator/RenteCalculator'
import InverseCalculator from '@/components/Calculator/InverseCalculator'
import CoupleCalculator from '@/components/Calculator/CoupleCalculator'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

type CalculatorMode = 'standard' | 'inverse' | 'couple'

export default function RenteViagerePage() {
  const [mode, setMode] = useState<CalculatorMode>('standard')

  return (
    <>
      <Header />
      <div className="min-h-screen bg-neutral-50">

        {/* Header */}
        <div className="bg-gradient-to-b from-primary-50 to-white border-b border-neutral-200">
          <div className="max-w-6xl mx-auto px-4 py-12">

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-neutral-600 mb-6">
              <Link href="/" className="hover:text-primary-600">
                Accueil
              </Link>
              <span>›</span>
              <span className="text-neutral-900 font-medium">Rente Viagère</span>
            </div>

            {/* Titre */}
            <h1 className="text-5xl font-bold text-neutral-900 mb-6 leading-tight">
              Calculateur<br />
              Rente Viagère
            </h1>

            <p className="text-xl text-neutral-700 max-w-3xl leading-relaxed">
              Convertissez votre épargne (PER, assurance-vie, capital) en revenus versés à vie.
              Estimation fiable basée sur les tables de mortalité officielles INSEE,
              avec gestion de la réversion au conjoint.
            </p>

            {/* Trust markers */}
            <div className="flex flex-wrap gap-6 mt-8">
              <div className="flex items-center gap-2 text-sm text-neutral-600">
                <span className="text-primary-600 text-lg">✓</span>
                <span>Tables INSEE 2020-2022</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-600">
                <span className="text-primary-600 text-lg">✓</span>
                <span>Réversion conjoint 60/80/100%</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-600">
                <span className="text-primary-600 text-lg">✓</span>
                <span>3 modes de calcul</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-600">
                <span className="text-primary-600 text-lg">✓</span>
                <span>Zéro donnée conservée</span>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer viager immobilier */}
        <div className="max-w-4xl mx-auto px-4 pt-12">
          <div className="bg-warning-50 border-l-4 border-warning-500 rounded-md p-5">
            <p className="text-sm text-warning-900">
              <strong className="font-semibold">À ne pas confondre</strong> : La <strong>rente viagère</strong> (ce calculateur)
              convertit un capital financier en revenus mensuels versés à vie.
              Le <strong>viager immobilier</strong> est la vente d&apos;un bien avec bouquet + rente.
            </p>
          </div>
        </div>

        {/* Calculateur avec tabs */}
        <div className="max-w-6xl mx-auto px-4 py-12">

          {/* Tabs modes */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-white rounded-lg shadow-md p-1.5 border border-neutral-200">
              <button
                onClick={() => setMode('standard')}
                className={`px-8 py-3 rounded-md text-sm font-semibold transition-all ${
                  mode === 'standard'
                    ? 'bg-primary-700 text-white shadow-sm'
                    : 'text-neutral-700 hover:bg-neutral-50'
                }`}
              >
                Calculateur classique
              </button>
              <button
                onClick={() => setMode('inverse')}
                className={`px-8 py-3 rounded-md text-sm font-semibold transition-all ${
                  mode === 'inverse'
                    ? 'bg-primary-700 text-white shadow-sm'
                    : 'text-neutral-700 hover:bg-neutral-50'
                }`}
              >
                Calculateur inverse
              </button>
              <button
                onClick={() => setMode('couple')}
                className={`px-8 py-3 rounded-md text-sm font-semibold transition-all ${
                  mode === 'couple'
                    ? 'bg-primary-700 text-white shadow-sm'
                    : 'text-neutral-700 hover:bg-neutral-50'
                }`}
              >
                Mode couple
              </button>
            </div>
          </div>

          {/* Description mode */}
          <div className="text-center mb-8">
            {mode === 'standard' && (
              <p className="text-sm text-neutral-600">
                Calculez le montant de votre rente mensuelle à partir d&apos;un capital
              </p>
            )}
            {mode === 'inverse' && (
              <p className="text-sm text-neutral-600">
                Découvrez quel capital est nécessaire pour obtenir la rente souhaitée
              </p>
            )}
            {mode === 'couple' && (
              <p className="text-sm text-neutral-600">
                Comparez toutes les stratégies pour optimiser vos rentes à deux
              </p>
            )}
          </div>

          {mode === 'standard' && <RenteCalculator />}
          {mode === 'inverse' && <InverseCalculator />}
          {mode === 'couple' && <CoupleCalculator />}
        </div>

        {/* Explications */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-white rounded-xl border border-neutral-200 p-8 space-y-6">

            <h2 className="text-2xl font-bold text-neutral-900">
              Comment ça marche ?
            </h2>

            <div className="space-y-4 text-neutral-700 leading-relaxed">
              <p>
                <strong>Règle #1 : La rente dépend de l&apos;espérance de vie.</strong><br />
                Plus vous êtes âgé au moment de la conversion, plus la rente mensuelle est élevée
                (à capital égal) : l&apos;assureur répartit votre capital sur moins d&apos;années statistiques.
                À 65 ans, l&apos;espérance résiduelle INSEE est d&apos;environ 20 ans ; à 75 ans, 12 ans.
              </p>

              <p>
                <strong>Règle #2 : Tables unisexes depuis 2012.</strong><br />
                Depuis l&apos;arrêt <em>Test-Achats</em> (CJUE 2011), transposé en droit français en 2012,
                les assureurs doivent utiliser des tables de mortalité <strong>unisexes</strong>.
                Un homme et une femme du même âge obtiennent donc la même rente à capital identique.
              </p>

              <p>
                <strong>Règle #3 : Le taux technique gonfle la rente initiale.</strong><br />
                Les assureurs anticipent un rendement futur (le <em>taux technique</em>, souvent 0 à 1%)
                pour majorer votre rente dès le départ. Un taux plus élevé = rente initiale plus forte,
                mais revalorisation future plus faible. Notre calculateur utilise 0,5% par défaut.
              </p>

              <p>
                <strong>Règle #4 : La réversion réduit la rente, mais protège le conjoint.</strong><br />
                Opter pour une réversion à 60%, 80% ou 100% diminue votre rente personnelle
                (car l&apos;assureur couvre deux espérances de vie), mais garantit le versement au
                conjoint survivant. Plus le taux est élevé, plus la rente initiale baisse.
              </p>
            </div>
          </div>
        </div>

        {/* Liens vers calculateurs AV et blog */}
        <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
          <Link
            href="/assurance-vie/fiscalite-rachat"
            className="block bg-primary-50 border-2 border-primary-200 rounded-xl p-8 hover:border-primary-400 hover:shadow-lg transition-all group"
          >
            <div className="flex items-start gap-4">
              <div className="text-4xl"></div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors">
                  Plutôt un rachat qu&apos;une rente ?
                </h3>
                <p className="text-neutral-700 mb-4 leading-relaxed">
                  Calculez la fiscalité exacte d&apos;un rachat partiel ou total d&apos;assurance-vie.
                  Comparaison automatique PFU vs IR selon votre TMI.
                </p>
                <div className="flex items-center gap-2 text-primary-600 font-medium group-hover:gap-3 transition-all">
                  <span>Calculateur Fiscalité Rachat</span>
                  <span>→</span>
                </div>
              </div>
            </div>
          </Link>

          <Link
            href="/blog/rente-viagere-seuil-rentabilite"
            className="block bg-primary-50 border-2 border-primary-200 rounded-xl p-8 hover:border-primary-400 hover:shadow-lg transition-all group"
          >
            <div className="flex items-start gap-4">
              <div className="text-4xl"></div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors">
                  Article complet : le seuil de rentabilité
                </h3>
                <p className="text-neutral-700 mb-4 leading-relaxed">
                  À 72 ans avec 250 000€, le seuil de rentabilité tombe à 15,8 ans alors que
                  l&apos;espérance est de 14 ans. Découvrez pourquoi — et ce que personne ne vous dit.
                </p>
                <div className="flex items-center gap-2 text-primary-600 font-medium group-hover:gap-3 transition-all">
                  <span>Lire l&apos;article complet</span>
                  <span>→</span>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* FAQ */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Link
            href="/faq"
            className="block bg-primary-50 border-2 border-primary-200 rounded-xl p-8 hover:border-primary-400 hover:shadow-lg transition-all group"
          >
            <div className="flex items-start gap-4">
              <div className="text-4xl"></div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors">
                  Questions fréquentes sur la rente viagère
                </h3>
                <p className="text-neutral-700 mb-4 leading-relaxed">
                  Espérance de vie, tables unisexes, taux technique, réversion, fiscalité de la rente,
                  différence avec le viager immobilier : toutes les réponses aux questions courantes.
                </p>
                <div className="flex items-center gap-2 text-primary-600 font-medium group-hover:gap-3 transition-all">
                  <span>Voir toutes les questions</span>
                  <span>→</span>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Méthodologie et sources */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-neutral-100 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">
              Méthodologie et sources officielles
            </h2>

            <div className="space-y-6">

              {/* Formules de calcul */}
              <div>
                <h3 className="text-lg font-bold text-neutral-900 mb-3">
                  Formules actuarielles
                </h3>
                <div className="bg-white rounded-lg p-5 border border-neutral-200 space-y-3">
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-neutral-900 mb-1">Annuité viagère (äx)</p>
                      <p className="font-mono text-xs text-neutral-600">
                        Σ (ₖpₓ × vᵏ) pour k = 0 à ω-x
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900 mb-1">Facteur d&apos;actualisation</p>
                      <p className="font-mono text-xs text-neutral-600">
                        v = 1 / (1 + i) — i = taux technique
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900 mb-1">Probabilité de survie</p>
                      <p className="font-mono text-xs text-neutral-600">
                        ₖpₓ = lₓ₊ₖ / lₓ (table INSEE)
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900 mb-1">Rente annuelle</p>
                      <p className="font-mono text-xs text-neutral-600">
                        Rente = Capital / äx
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900 mb-1">Rente avec réversion</p>
                      <p className="font-mono text-xs text-neutral-600">
                        Capital / (äx + α × äy|x)
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900 mb-1">Taux technique par défaut</p>
                      <p className="font-mono text-xs text-neutral-600">
                        0,5% (standard marché)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Textes de loi */}
              <div>
                <h3 className="text-lg font-bold text-neutral-900 mb-3">
                  Textes réglementaires
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-primary-600 mt-1">•</span>
                    <div>
                      <a
                        href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006796685"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:underline font-medium"
                      >
                        Article A132-1 du Code des assurances
                      </a>
                      <p className="text-neutral-600 text-xs mt-1">
                        Tables de mortalité réglementaires pour les contrats de rente viagère
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-600 mt-1">•</span>
                    <div>
                      <a
                        href="https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000023744555"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:underline font-medium"
                      >
                        Loi n° 2011-1906 du 21 décembre 2011 (transposition Test-Achats)
                      </a>
                      <p className="text-neutral-600 text-xs mt-1">
                        Interdiction de la tarification différenciée selon le sexe (tables unisexes)
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-600 mt-1">•</span>
                    <div>
                      <a
                        href="https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000000606830"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:underline font-medium"
                      >
                        Arrêté du 1er août 2006 (tables TGH 05 / TGF 05)
                      </a>
                      <p className="text-neutral-600 text-xs mt-1">
                        Tables de mortalité par génération pour les rentes viagères
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-600 mt-1">•</span>
                    <div>
                      <a
                        href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006307136"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:underline font-medium"
                      >
                        Article 158-6 du CGI
                      </a>
                      <p className="text-neutral-600 text-xs mt-1">
                        Fiscalité des rentes viagères à titre onéreux (abattement selon âge d&apos;entrée)
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Documentation officielle */}
              <div>
                <h3 className="text-lg font-bold text-neutral-900 mb-3">
                  Sources statistiques officielles
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-primary-600 mt-1">•</span>
                    <div>
                      <a
                        href="https://www.insee.fr/fr/statistiques/5390366"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:underline font-medium"
                      >
                        INSEE — Tables de mortalité 2020-2022
                      </a>
                      <p className="text-neutral-600 text-xs mt-1">
                        Tables officielles utilisées pour les projections d&apos;espérance de vie
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-600 mt-1">•</span>
                    <div>
                      <a
                        href="https://www.ined.fr/fr/tout-savoir-population/chiffres/france/mortalite-cause-deces/table-mortalite/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:underline font-medium"
                      >
                        INED — Tables de mortalité par génération
                      </a>
                      <p className="text-neutral-600 text-xs mt-1">
                        Données démographiques de référence pour le calcul actuariel
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-600 mt-1">•</span>
                    <div>
                      <a
                        href="https://www.ffa-assurance.fr"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:underline font-medium"
                      >
                        Fédération Française de l&apos;Assurance
                      </a>
                      <p className="text-neutral-600 text-xs mt-1">
                        Guide des contrats de rente viagère (taux techniques, clauses de réversion)
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Note vérification */}
              <div className="bg-primary-50 rounded-lg p-4 border border-primary-200">
                <p className="text-sm text-primary-800">
                  <strong>✓ Méthodologie vérifiée</strong> : Tous les calculs sont conformes aux
                  formules actuarielles standard et utilisent les tables de mortalité INSEE les plus
                  récentes. Dernière vérification : Avril 2026.
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* Footer disclaimer */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center text-sm text-neutral-600 space-y-2">
            <p className="italic">
              Cet outil est fourni à titre informatif uniquement. Il ne constitue pas un conseil
              patrimonial ni une offre de contrat. Les rentes réelles proposées par les assureurs
              dépendent de leurs propres tables et taux techniques. Pour toute décision patrimoniale
              importante, consultez un conseiller en gestion de patrimoine indépendant.
            </p>
            <p>
              <strong>Code open-source :</strong>{' '}
              <a
                href="https://github.com/nba67000/calcpatrimoine"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:underline"
              >
                github.com/nba67000/calcpatrimoine
              </a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
