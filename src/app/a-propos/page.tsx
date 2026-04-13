// src/app/a-propos/page.tsx
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'À propos',
  description: 'L\'histoire de RenteVie : pourquoi et comment nous avons créé le calculateur de rente viagère le plus transparent du marché français.'
}

export default function APropos() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />

      <article className="max-w-4xl mx-auto px-4 py-16">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-gray-900">Accueil</Link>
          <span className="mx-2">→</span>
          <span>À propos</span>
        </nav>

        {/* En-tête */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Pourquoi RenteVie existe
          </h1>
          <p className="text-xl text-gray-600">
            L&apos;histoire d&apos;un développeur qui travaille dans l&apos;assurance-vie et qui en a eu marre des simulateurs cassés.
          </p>
        </header>

        {/* Section 1 : Le constat */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🔍 Le constat</h2>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <p className="text-gray-700 mb-4">
              En 2026, j&apos;ai cherché à estimer une rente viagère pour un projet personnel. 
              Les outils disponibles ne répondaient pas à mes besoins.
            </p>
            
            <div className="space-y-3 text-sm text-gray-700">
              <div>
                <strong>Ce qui manquait :</strong>
              </div>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Calculateur inverse (quel capital pour obtenir X€/mois ?)</li>
                <li>Comparaison automatique des stratégies pour un couple</li>
                <li>Accès mobile fluide et responsive</li>
                <li>Transparence sur les formules utilisées</li>
                <li>Code source ouvert pour vérification</li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-6">
            <p className="text-sm text-blue-800">
              <strong>💡 Contexte personnel</strong> : En tant que développeur COBOL chez <strong>Império Assurances</strong>, 
              je travaille quotidiennement sur des systèmes qui calculent des rentes viagères. 
              J&apos;ai voulu créer l&apos;outil que j&apos;aurais aimé trouver.
            </p>
          </div>
        </section>

        {/* Section 2 : La solution */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">💡 La solution : faire mieux</h2>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <p className="text-gray-700 mb-6">
              J&apos;ai décidé de créer <strong>le calculateur que j&apos;aurais voulu trouver</strong> :
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-bold">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Transparence totale</h3>
                  <p className="text-sm text-gray-600">
                    Code source public sur GitHub, formules détaillées, tables INSEE brutes téléchargeables
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-green-600 font-bold">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Vraiment gratuit</h3>
                  <p className="text-sm text-gray-600">
                    Pas de formulaire caché, pas de vente forcée, aucune donnée collectée
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-600 font-bold">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Fonctionnalités uniques</h3>
                  <p className="text-sm text-gray-600">
                    Calculateur inverse (quel capital pour X€/mois ?) + Mode couple avec 5 stratégies comparées
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-orange-600 font-bold">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">UX moderne</h3>
                  <p className="text-sm text-gray-600">
                    Calcul temps réel sans bouton, mobile-first, design 2026
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3 : Qui je suis */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">👨‍💻 Qui suis-je ?</h2>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white text-3xl font-bold flex-shrink-0">
                NB
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Nicolas Barbier</h3>
                <p className="text-gray-700 mb-4">
                  Développeur COBOL/AS400 chez <strong>Império Assurances</strong> (groupe SMABTP), 
                  spécialisé dans les systèmes legacy d&apos;assurance-vie.
                </p>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <p><strong>Parcours</strong> : 6 ans chez Crédit Mutuel (EID), puis DevOps, puis retour à l&apos;assurance-vie</p>
                  <p><strong>Stack RenteVie</strong> : Next.js 15, TypeScript, Tailwind CSS, Python (scraping INSEE)</p>
                  <p><strong>Open source</strong> : Code complet disponible sur <a href="https://github.com/nba67000/rente_viagere_calculator" className="text-blue-600 hover:underline" target="_blank" rel="noopener">GitHub</a></p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4 : Stack technique */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🛠️ Comment c&apos;est fait ?</h2>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Frontend</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• <strong>Next.js 15</strong> (React 19, Server Components)</li>
                  <li>• <strong>TypeScript</strong> (typage strict)</li>
                  <li>• <strong>Tailwind CSS</strong> (design system)</li>
                  <li>• <strong>Framer Motion</strong> (animations)</li>
                  <li>• <strong>Recharts</strong> (graphiques futurs)</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Backend & Data</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• <strong>Python</strong> (scraping tables INSEE)</li>
                  <li>• <strong>GitHub Actions</strong> (MAJ auto annuelle)</li>
                  <li>• <strong>Vercel</strong> (hébergement gratuit)</li>
                  <li>• <strong>JSON</strong> (stockage tables mortalité)</li>
                  <li>• <strong>ISR/SSG</strong> (génération statique)</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-gray-50 rounded">
              <p className="text-sm text-gray-700">
                <strong>📊 Performance</strong> : Lighthouse 95+ sur mobile, bundle &lt;155 KB, temps de calcul &lt;10ms
              </p>
            </div>
          </div>
        </section>

        {/* Section 5 : Business model */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">💰 Modèle économique</h2>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <p className="text-gray-700 mb-4">
              <strong>V1 (actuelle) : 100% gratuit, sans publicité</strong>
            </p>
            <p className="text-gray-600 mb-6 text-sm">
              L&apos;objectif est de construire une audience qualifiée (1000+ visiteurs/mois) avant toute monétisation.
            </p>
            
            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-4">
              <p className="text-sm text-blue-800 mb-2">
                <strong>V2 (future, si succès) : Partenariats courtiers</strong>
              </p>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• CTA optionnel "Être rappelé par un courtier"</li>
                <li>• Commission lead qualifié : 100-200€ (standard marché)</li>
                <li>• Partenaires sélectionnés (Meilleurtaux, Magnolia, indépendants)</li>
              </ul>
            </div>
            
            <p className="text-sm text-gray-600">
              <strong>Engagement</strong> : Le calculateur restera <strong>toujours gratuit et sans inscription</strong>. 
              Les partenariats éventuels seront clairement identifiés.
            </p>
          </div>
        </section>

        {/* Section 6 : Contact */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">📬 Contact</h2>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Pour les développeurs</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="https://github.com/nba67000/rente_viagere_calculator" className="text-blue-600 hover:underline" target="_blank" rel="noopener">
                      → Code source GitHub
                    </a>
                  </li>
                  <li>
                    <a href="https://github.com/nba67000/rente_viagere_calculator/issues" className="text-blue-600 hover:underline" target="_blank" rel="noopener">
                      → Reporter un bug
                    </a>
                  </li>
                  <li>
                    <a href="https://github.com/nba67000/rente_viagere_calculator/pulls" className="text-blue-600 hover:underline" target="_blank" rel="noopener">
                      → Contribuer (Pull Requests)
                    </a>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Pour le créateur</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="https://www.linkedin.com/in/nicolas-barbier" className="text-blue-600 hover:underline" target="_blank" rel="noopener">
                      → LinkedIn
                    </a>
                  </li>
                  <li>
                    <a href="mailto:contact@rente-viagere-calcul.fr" className="text-blue-600 hover:underline">
                      → Email
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-3">Essayez le calculateur</h3>
          <p className="mb-6 text-blue-100">
            Transparent, gratuit, sans inscription
          </p>
          <Link 
            href="/"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Calculer ma rente →
          </Link>
        </div>
      </article>

      <Footer />
    </main>
  )
}
