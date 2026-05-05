import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'À propos — CalcPatrimoine',
  description: 'CalcPatrimoine : un développeur dans l\'assurance-vie, des outils de calcul open-source, une ligne éditoriale anti-conseil. L\'histoire du projet.',
}

export default function APropos() {
  return (
    <>
      <Header />
      <div className="h-[3px] bg-accent-400 w-full" />
      <div style={{ backgroundColor: '#F7F3EC' }}>
        <article className="max-w-4xl mx-auto px-6 py-16">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 font-mono text-xs text-neutral-400 mb-8">
            <Link href="/" className="hover:text-primary-600 transition-colors">Accueil</Link>
            <span>/</span>
            <span className="text-neutral-600">À propos</span>
          </nav>

          <div className="h-[2px] w-10 bg-accent-400 mb-6" />

          <h1 className="font-serif text-4xl font-bold text-neutral-900 mb-4 leading-tight">
            Pourquoi CalcPatrimoine existe
          </h1>

          {/* Intro Les 3 Frères */}
          <div className="bg-white border border-neutral-200 p-6 mb-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-accent-400" />
            <p className="font-mono text-xs uppercase tracking-wider text-neutral-400 mb-3 pl-4">Scène d&apos;ouverture</p>
            <blockquote className="pl-4">
              <p className="text-neutral-700 leading-relaxed mb-3">
                Vous connaissez la scène des <em>Trois Frères</em> chez le notaire ?{' '}
                Les frères Latour débarquent pour l&apos;héritage, et le notaire les noie sous un flot de jargon
                juridico-financier — <em>&laquo;&nbsp;l&apos;usufruit viager afférent aux biens immobiliers
                indivis se trouve, en vertu des dispositions testamentaires, dévolu au conjoint survivant&nbsp;&raquo;</em> —
                pendant que les trois regardent le plafond en hochant la tête, l&apos;air de parfaitement comprendre.
              </p>
              <p className="text-neutral-700 leading-relaxed">
                La fiscalité patrimoniale, c&apos;est un peu ça pour tout le monde.{' '}
                <strong className="text-neutral-900">CalcPatrimoine existe pour qu&apos;on n&apos;ait plus à faire semblant.</strong>
              </p>
            </blockquote>
          </div>

          <p className="text-lg text-neutral-600 mb-12 leading-relaxed">
            Un développeur dans l&apos;assurance-vie. Des simulateurs qui ne répondaient pas.
            Un outil fait pour en finir avec l&apos;opacité des calculs patrimoniaux.
          </p>

          {/* Le constat */}
          <section className="mb-12">
            <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-5">Le constat</h2>

            <div className="bg-white border border-neutral-200 p-6 mb-5">
              <p className="text-neutral-700 mb-4">
                En 2026, j&apos;ai cherché à estimer une rente viagère pour un projet personnel.
                Les outils disponibles ne répondaient pas à mes besoins.
              </p>
              <div className="space-y-1 text-sm text-neutral-700 font-mono">
                <p className="text-neutral-400 text-xs uppercase tracking-wider mb-2">Ce qui manquait :</p>
                <p>— Calculateur inverse (quel capital pour obtenir X €/mois ?)</p>
                <p>— Comparaison automatique des stratégies pour un couple</p>
                <p>— Accès mobile fluide et responsive</p>
                <p>— Transparence sur les formules utilisées</p>
                <p>— Code source ouvert pour vérification</p>
              </div>
            </div>

            <div className="border-l-4 border-primary-300 bg-primary-50 px-5 py-4">
              <p className="text-sm text-primary-800">
                <strong>Contexte :</strong> Développeur dans l&apos;assurance-vie, je travaille quotidiennement
                sur des systèmes qui calculent des rentes viagères. J&apos;ai voulu créer l&apos;outil que j&apos;aurais aimé trouver.
              </p>
            </div>
          </section>

          {/* La solution */}
          <section className="mb-12">
            <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-5">La solution : faire mieux</h2>

            <div className="bg-white border border-neutral-200 p-6">
              <div className="space-y-5">
                {[
                  { titre: 'Transparence totale', desc: 'Code source public sur GitHub, formules détaillées, tables INSEE brutes téléchargeables.' },
                  { titre: 'Vraiment gratuit', desc: 'Pas de formulaire caché, pas de vente forcée, aucune donnée collectée.' },
                  { titre: 'Fonctionnalités uniques', desc: 'Calculateur inverse + mode couple avec 5 stratégies comparées + calcul temps réel.' },
                  { titre: 'Anti-conseil, pro-calcul', desc: 'Le site calcule et compare. Il ne recommande pas. Chaque résultat est factuel et conditionnel.' },
                ].map(item => (
                  <div key={item.titre} className="flex items-start gap-4">
                    <div className="w-1.5 h-1.5 bg-accent-400 rounded-full mt-2 shrink-0" />
                    <div>
                      <h3 className="font-bold text-neutral-900 mb-1">{item.titre}</h3>
                      <p className="text-sm text-neutral-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Qui suis-je */}
          <section className="mb-12">
            <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-5">Qui suis-je ?</h2>

            <div className="bg-white border border-neutral-200 p-6">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="w-16 h-16 bg-primary-700 flex items-center justify-center text-white text-2xl font-bold shrink-0">
                  N
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-neutral-900 mb-2">Nicolas</h3>
                  <p className="text-neutral-600 mb-4 leading-relaxed">
                    Analyste-développeur COBOL/AS400 dans l&apos;assurance-vie,
                    spécialisé dans les systèmes de gestion de contrats et calculs actuariels.
                  </p>
                  <div className="space-y-1.5 text-sm text-neutral-600 font-mono">
                    <p><span className="text-neutral-400">Stack :</span> Next.js 16, TypeScript, Tailwind CSS</p>
                    <p><span className="text-neutral-400">Open source :</span>{' '}
                      <a href="https://github.com/nba67000/calculpatrimoine" className="text-primary-600 hover:underline" target="_blank" rel="noopener">
                        github.com/nba67000/calculpatrimoine
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Stack technique */}
          <section className="mb-12">
            <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-5">Comment c&apos;est fait ?</h2>

            <div className="bg-white border border-neutral-200 p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-500 mb-3">Frontend</h3>
                  <ul className="space-y-1.5 text-sm text-neutral-700 font-mono">
                    <li>Next.js 16 (React 19, Server Components)</li>
                    <li>TypeScript (typage strict)</li>
                    <li>Tailwind CSS (design system)</li>
                    <li>Framer Motion (animations)</li>
                    <li>Recharts (graphiques)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-500 mb-3">Backend & Data</h3>
                  <ul className="space-y-1.5 text-sm text-neutral-700 font-mono">
                    <li>Python (scraping tables INSEE)</li>
                    <li>GitHub Actions (MAJ annuelle)</li>
                    <li>Vercel (hébergement)</li>
                    <li>JSON (stockage tables mortalité)</li>
                    <li>ISR/SSG (génération statique)</li>
                  </ul>
                </div>
              </div>
              <div className="mt-5 border-t border-neutral-100 pt-4">
                <p className="font-mono text-xs text-neutral-500">
                  Performance : Lighthouse 95+ mobile · bundle &lt;155 KB · temps calcul &lt;10ms
                </p>
              </div>
            </div>
          </section>

          {/* Modèle économique */}
          <section className="mb-12">
            <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-5">Modèle économique</h2>

            <div className="bg-white border border-neutral-200 p-6">
              <p className="text-neutral-700 mb-4">
                <strong>V1 (actuelle) : 100 % gratuit, sans publicité.</strong>{' '}
                L&apos;objectif est de construire une audience qualifiée avant toute monétisation.
              </p>
              <div className="border-l-4 border-neutral-300 pl-5 py-2 text-sm text-neutral-600">
                <p className="font-bold text-neutral-800 mb-2">V2 (future, si succès) : Partenariats courtiers</p>
                <p>CTA optionnel &quot;Être rappelé par un courtier&quot; · Commission lead qualifié · Partenaires sélectionnés · Identifiés clairement comme publicité.</p>
              </div>
              <p className="text-sm text-neutral-500 mt-4">
                Le calculateur restera <strong>toujours gratuit et sans inscription</strong>.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section className="mb-12">
            <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-5">Contact</h2>

            <div className="bg-white border border-neutral-200 p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-500 mb-3">Développeurs</h3>
                  <ul className="space-y-2 text-sm">
                    <li><a href="https://github.com/nba67000/calculpatrimoine" className="text-primary-600 hover:underline" target="_blank" rel="noopener">Code source GitHub →</a></li>
                    <li><a href="https://github.com/nba67000/calculpatrimoine/issues" className="text-primary-600 hover:underline" target="_blank" rel="noopener">Reporter un bug →</a></li>
                    <li><a href="https://github.com/nba67000/calculpatrimoine/pulls" className="text-primary-600 hover:underline" target="_blank" rel="noopener">Contribuer (Pull Requests) →</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-500 mb-3">Contact</h3>
                  <ul className="space-y-2 text-sm">
                    <li><a href="mailto:contact@calculpatrimoine.fr" className="text-primary-600 hover:underline">contact@calculpatrimoine.fr →</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <div className="bg-primary-700 p-8 text-center text-white">
            <h3 className="font-serif text-2xl font-bold mb-3">Essayez les calculateurs</h3>
            <p className="text-primary-200 mb-6 font-mono text-sm">Transparent · Gratuit · Sans inscription</p>
            <Link
              href="/"
              className="inline-block bg-white text-primary-700 px-8 py-3 font-medium hover:bg-neutral-100 transition-colors"
            >
              Accueil →
            </Link>
          </div>

        </article>
      </div>
      <Footer />
    </>
  )
}
