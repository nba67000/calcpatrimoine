import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Blog — CalcPatrimoine',
  description: 'Articles sur la rente viagère, les calculs actuariels, et la finance personnelle. Tout ce que votre conseiller ne vous dit pas.',
}

const ARTICLES = [
  {
    slug: 'assurance-vie-fiscalite-rachat',
    titre: 'Assurance-vie : combien vous allez vraiment payer sur un rachat',
    extrait: 'Règle proportionnelle, abattement 8 ans, PFU vs IR, date du 27 septembre 2017. Guide complet avec exemples chiffrés et formules détaillées.',
    date: '2026-04-18',
    duree: '11 min',
    tag: 'Fiscalité',
  },
  {
    slug: 'rente-viagere-seuil-rentabilite',
    titre: 'Pourquoi le seuil de rentabilité est après votre espérance de vie',
    extrait: 'À 72 ans avec 250 000 €, le seuil tombe à 15,8 ans alors que l\'espérance est de 14 ans. Découvrez pourquoi c\'est normal.',
    date: '2026-04-16',
    duree: '15 min',
    tag: 'Rente viagère',
  },
]

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function BlogIndex() {
  return (
    <>
      <Header />
      <div className="h-[3px] bg-accent-400 w-full" />
      <div style={{ backgroundColor: '#F7F3EC' }}>

        {/* Hero */}
        <section className="max-w-6xl mx-auto px-6 py-12">
          <nav className="flex items-center gap-2 font-mono text-xs text-neutral-400 mb-8">
            <Link href="/" className="hover:text-primary-600 transition-colors">Accueil</Link>
            <span>/</span>
            <span className="text-neutral-600">Blog</span>
          </nav>

          <div className="h-[2px] w-10 bg-accent-400 mb-6" />

          <h1 className="font-serif text-5xl font-bold text-neutral-900 mb-4 leading-tight">
            Blog CalcPatrimoine
          </h1>

          <p className="text-lg text-neutral-600 max-w-2xl leading-relaxed">
            Tout ce que votre conseiller ne vous dit pas sur la rente viagère,
            les calculs actuariels, et la finance personnelle.
          </p>
        </section>

        {/* Liste articles */}
        <section className="max-w-6xl mx-auto px-6 pb-16">
          <div className="flex items-center gap-6 mb-0">
            <h2 className="font-serif text-2xl text-neutral-900 shrink-0">Articles publiés</h2>
            <div className="flex-1 h-[1px] bg-neutral-300" />
          </div>

          <div className="border-t border-neutral-300">
            {ARTICLES.map(article => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group flex flex-col gap-1.5 py-7 border-b border-neutral-200 hover:bg-white transition-colors pr-4"
                style={{ borderLeft: '3px solid #D4AF37', paddingLeft: '1.25rem' }}
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-neutral-500">{article.tag}</span>
                  <span className="font-mono text-xs text-neutral-300">·</span>
                  <time dateTime={article.date} className="font-mono text-xs text-neutral-500">{formatDate(article.date)}</time>
                  <span className="font-mono text-xs text-neutral-300">·</span>
                  <span className="font-mono text-xs text-neutral-500">{article.duree} de lecture</span>
                </div>
                <h2 className="text-xl font-bold text-neutral-900 group-hover:text-primary-700 transition-colors leading-snug">
                  {article.titre}
                </h2>
                <p className="text-sm text-neutral-500 leading-snug max-w-2xl">
                  {article.extrait}
                </p>
              </Link>
            ))}

            {/* Teaser à venir */}
            <div
              className="py-7 pr-4 opacity-40"
              style={{ borderLeft: '3px solid #94A3B8', paddingLeft: '1.25rem' }}
            >
              <p className="font-mono text-xs text-neutral-400 mb-1">Prochainement</p>
              <p className="font-bold text-neutral-500">PER vs assurance-vie, fiscalité des rentes, stratégies couple optimisées</p>
            </div>
          </div>
        </section>

      </div>
      <Footer />
    </>
  )
}
