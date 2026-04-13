// src/app/methodologie/page.tsx
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Méthodologie de Calcul',
  description: 'Découvrez comment nous calculons votre rente viagère avec les tables INSEE et les formules actuarielles officielles.'
}

export default function Methodologie() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />

      <article className="max-w-4xl mx-auto px-4 py-16">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-gray-900">Accueil</Link>
          <span className="mx-2">→</span>
          <span>Méthodologie</span>
        </nav>

        {/* En-tête */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Comment nous calculons votre rente viagère
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Transparence totale sur nos méthodes de calcul, nos sources de données et nos formules actuarielles.
          </p>
          
          {/* Clarification rente viagère vs viager immobilier */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              🏠 Rente viagère ≠ Viager immobilier
            </h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
                <div className="font-semibold text-blue-900 mb-2">📊 Rente viagère (ce calculateur)</div>
                <ul className="space-y-1 text-gray-700">
                  <li>✓ Vous avez un <strong>capital financier</strong> (épargne, assurance-vie)</li>
                  <li>✓ Vous le convertissez en <strong>revenus mensuels à vie</strong></li>
                  <li>✓ Pas de bien immobilier impliqué</li>
                  <li>✓ Exemple : 100 000€ → 614€/mois à vie (homme, 65 ans)</li>
                </ul>
              </div>
              
              <div className="bg-white rounded-lg p-4 border-l-4 border-orange-500">
                <div className="font-semibold text-orange-900 mb-2">🏡 Viager immobilier (autre produit)</div>
                <ul className="space-y-1 text-gray-700">
                  <li>✓ Vous vendez votre <strong>maison/appartement</strong></li>
                  <li>✓ Acheteur paie : bouquet + rente mensuelle</li>
                  <li>✓ Vous gardez l&apos;usufruit (droit d&apos;y habiter)</li>
                  <li>✓ Exemple : Vente maison 300k€ → 50k€ bouquet + 800€/mois</li>
                </ul>
              </div>
            </div>
            <p className="text-xs text-gray-600 mt-4 text-center">
              💡 Ce site calcule uniquement les <strong>rentes viagères financières</strong>, pas le viager immobilier.
            </p>
          </div>
        </header>

        {/* Section 1 : Sources */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">📊 Nos sources de données</h2>
          
          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-6">
            <h3 className="font-semibold text-blue-900 mb-2">Tables de mortalité INSEE officielles</h3>
            <p className="text-blue-800 mb-3">
              Nous utilisons les <strong>tables de mortalité par génération</strong> les plus récentes publiées par l&apos;INSEE et l&apos;INED (données 2020-2022).
            </p>
            <ul className="space-y-2 text-sm text-blue-700">
              <li>• <strong>Source principale</strong> : Institut National d&apos;Études Démographiques (INED)</li>
              <li>• <strong>Période observée</strong> : 2020-2022 (données post-COVID actualisées)</li>
              <li>• <strong>Mise à jour</strong> : Automatique chaque année le 1er octobre via GitHub Actions</li>
              <li>• <strong>Disponibilité</strong> : <a href="https://www.ined.fr/fr/tout-savoir-population/chiffres/france/mortalite-cause-deces/table-mortalite/" className="underline hover:text-blue-900" target="_blank" rel="noopener">www.ined.fr</a></li>
            </ul>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h4 className="font-medium text-gray-900 mb-3">Exemples d&apos;espérance de vie (données INSEE 2020-2022)</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <div className="font-semibold text-blue-600 mb-1">👨 Hommes</div>
                <ul className="space-y-1 text-gray-700">
                  <li>• 60 ans → 24.8 ans restants</li>
                  <li>• 65 ans → 20.35 ans restants</li>
                  <li>• 70 ans → 16.12 ans restants</li>
                  <li>• 75 ans → 12.27 ans restants</li>
                </ul>
              </div>
              <div>
                <div className="font-semibold text-pink-600 mb-1">👩 Femmes</div>
                <ul className="space-y-1 text-gray-700">
                  <li>• 60 ans → 28.84 ans restants</li>
                  <li>• 65 ans → 23.71 ans restants</li>
                  <li>• 70 ans → 19.22 ans restants</li>
                  <li>• 75 ans → 14.93 ans restants</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2 : Formules */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🧮 Formules actuarielles</h2>

          {/* Rente simple */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">1. Rente viagère simple</h3>
            <div className="bg-gray-50 rounded p-4 mb-4 font-mono text-sm">
              R = C / a(x)
            </div>
            <div className="space-y-2 text-sm text-gray-700">
              <p><strong>R</strong> = Rente annuelle versée à vie</p>
              <p><strong>C</strong> = Capital initial investi</p>
              <p><strong>a(x)</strong> = Facteur viager à l&apos;âge x (calculé avec taux technique 0,5%)</p>
            </div>
            
            <div className="mt-4 p-4 bg-green-50 rounded">
              <p className="text-sm font-semibold text-green-900 mb-2">💡 Exemple concret</p>
              <p className="text-sm text-green-800">
                Homme de 65 ans, capital 100 000€<br/>
                → Facteur viager a(65) ≈ 13,58<br/>
                → Rente annuelle : 100 000 / 13,58 = 7 364€<br/>
                → <strong>Rente mensuelle : 614€</strong>
              </p>
            </div>
          </div>

          {/* Rente avec réversion */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">2. Rente viagère avec réversion</h3>
            <div className="bg-gray-50 rounded p-4 mb-4 font-mono text-sm">
              R = C / [a(x) + p × a(y) × 0.7]
            </div>
            <div className="space-y-2 text-sm text-gray-700">
              <p><strong>p</strong> = Taux de réversion (60%, 80% ou 100%)</p>
              <p><strong>a(y)</strong> = Facteur viager du conjoint à l&apos;âge y</p>
              <p><strong>0.7</strong> = Coefficient de réduction (espérance conjointe)</p>
            </div>
            
            <div className="mt-4 p-4 bg-blue-50 rounded">
              <p className="text-sm font-semibold text-blue-900 mb-2">💡 Exemple concret</p>
              <p className="text-sm text-blue-800">
                Homme 65 ans + Femme 63 ans, capital 100 000€, réversion 80%<br/>
                → a(65) = 13,58 | a(63) = 15,24<br/>
                → Dénominateur : 13,58 + (0,8 × 15,24 × 0,7) = 22,11<br/>
                → Rente annuelle : 100 000 / 22,11 = 4 523€<br/>
                → <strong>Rente mensuelle : 377€</strong><br/>
                → <strong>Réversion conjoint : 302€/mois</strong> (80% de 377€)
              </p>
            </div>
          </div>

          {/* Calculateur inverse */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">3. Calculateur inverse (capital nécessaire)</h3>
            <div className="bg-gray-50 rounded p-4 mb-4 font-mono text-sm">
              C = (R × 12) × a(x)
            </div>
            <div className="space-y-2 text-sm text-gray-700">
              <p><strong>R</strong> = Rente mensuelle souhaitée</p>
              <p><strong>12</strong> = Conversion en rente annuelle</p>
            </div>
            
            <div className="mt-4 p-4 bg-purple-50 rounded">
              <p className="text-sm font-semibold text-purple-900 mb-2">💡 Exemple concret</p>
              <p className="text-sm text-purple-800">
                Je veux 1 000€/mois, Homme 65 ans<br/>
                → Rente annuelle souhaitée : 1 000 × 12 = 12 000€<br/>
                → a(65) = 13,58<br/>
                → <strong>Capital nécessaire : 12 000 × 13,58 = 162 960€</strong>
              </p>
            </div>
          </div>
        </section>

        {/* Section 3 : Taux technique */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">📈 Taux technique : 0,5%</h2>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <p className="text-gray-700 mb-4">
              Le <strong>taux technique</strong> représente le rendement annuel moyen que l&apos;assureur s&apos;engage à garantir sur le capital investi.
            </p>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <p className="text-sm text-yellow-800">
                <strong>⚠️ Important :</strong> Nous utilisons 0,5%, qui est la norme actuelle du marché français en 2026. 
                Ce taux est <strong>volontairement prudent</strong> pour éviter les estimations trop optimistes. 
                Certains assureurs proposent entre 0% et 1% selon le contexte économique.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4 : Différence H/F */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">⚖️ Pourquoi une différence Homme/Femme ?</h2>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <p className="text-gray-700 mb-4">
              Les montants de rente diffèrent selon le sexe car <strong>l&apos;espérance de vie n&apos;est pas la même</strong>.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="font-semibold text-blue-900 mb-2">👨 Hommes</div>
                <p className="text-sm text-blue-800">
                  Espérance de vie plus courte → L&apos;assureur verse moins longtemps → <strong>Rente mensuelle plus élevée</strong>
                </p>
              </div>
              <div className="p-4 bg-pink-50 rounded-lg">
                <div className="font-semibold text-pink-900 mb-2">👩 Femmes</div>
                <p className="text-sm text-pink-800">
                  Espérance de vie plus longue → L&apos;assureur verse plus longtemps → <strong>Rente mensuelle plus basse</strong>
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded">
              <p className="text-sm text-gray-700">
                <strong>📜 Cadre légal :</strong> Cette différenciation est <strong>légale en France</strong> pour les rentes viagères individuelles 
                (produits facultatifs). La directive européenne de 2011 interdisant la discrimination H/F ne s&apos;applique qu&apos;aux 
                assurances obligatoires (auto, santé).
              </p>
            </div>
          </div>
        </section>

        {/* Section 5 : Limites */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">⚠️ Limites et précisions</h2>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="space-y-4 text-sm text-gray-700">
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Frais non inclus</h4>
                <p>
                  Les assureurs appliquent généralement des frais de gestion (3-5% du capital) et des frais annuels. 
                  Notre calculateur affiche la rente <strong>brute théorique</strong>.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">État de santé</h4>
                <p>
                  Les montants affichés correspondent à une personne en <strong>bonne santé</strong>. 
                  Certains assureurs proposent des rentes majorées pour les personnes avec réduction d&apos;espérance de vie médicalement constatée.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Fiscalité</h4>
                <p>
                  Les rentes viagères sont soumises à l&apos;impôt sur le revenu avec un <strong>abattement selon l&apos;âge</strong> 
                  (30% si &lt;50 ans, 50% entre 50-59 ans, 60% entre 60-69 ans, 70% si ≥70 ans). 
                  Notre calculateur affiche les montants <strong>avant impôt</strong>.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Pas de conseil personnalisé</h4>
                <p>
                  Cet outil est purement <strong>informatif</strong>. Il ne constitue pas un conseil en investissement. 
                  Pour une souscription, consultez un courtier ou assureur agréé.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-3">Calculez votre rente maintenant</h3>
          <p className="mb-6 text-blue-100">
            Utilisez nos calculateurs basés sur cette méthodologie transparente
          </p>
          <Link 
            href="/"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Accéder aux calculateurs →
          </Link>
        </div>
      </article>

      <Footer />
    </main>
  )
}
