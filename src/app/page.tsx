// src/app/page.tsx
import Link from 'next/link'
import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'CalcPatrimoine - Calculateurs gratuits patrimoine & retraite',
  description: 'Calculateurs gratuits et open-source pour vos décisions patrimoniales : rente viagère, assurance-vie, PER. Zéro donnée conservée.',
  keywords: 'calculateur patrimoine, rente viagère, assurance vie, PER, retraite, simulateur gratuit',
  openGraph: {
    title: 'CalcPatrimoine - Calculateurs gratuits patrimoine',
    description: 'Outils open-source pour simuler rente viagère, fiscalité assurance-vie, et optimiser votre patrimoine.',
    type: 'website',
  },
}

export default function HomePage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-neutral-50">
        {/* Hero */}
        <section className="bg-gradient-to-b from-primary-50 to-white py-20 border-b border-neutral-200">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold text-neutral-900 mb-6">
              Calculateurs gratuits pour vos décisions patrimoniales
            </h1>
            <p className="text-xl text-neutral-700 mb-8 max-w-2xl mx-auto leading-relaxed">
              Outils open-source pour simuler rente viagère, fiscalité assurance-vie, 
              et optimiser votre patrimoine. Aucune donnée conservée, calculs 100% côté navigateur.
            </p>
            
            <div className="flex flex-wrap gap-6 justify-center text-sm">
              <div className="flex items-center gap-2 text-neutral-600">
                <span className="font-medium">100% gratuit</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-600">
                <span className="font-medium">Open-source</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-600">
                <span className="font-medium">Zéro tracking</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-600">
                <span className="font-medium">Tables INSEE officielles</span>
              </div>
            </div>
          </div>
        </section>

        {/* Calculateurs Grid */}
        <section className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-neutral-900 mb-3">
            Nos calculateurs
          </h2>
          <p className="text-neutral-600 mb-10 text-lg">
            Choisissez le calculateur adapté à votre situation patrimoniale
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Rente Viagère */}
            <Link 
              href="/rente-viagere"
              className="bg-white rounded-xl border-2 border-neutral-200 p-8 hover:border-primary-400 hover:shadow-lg transition-all group"
            >
              <h3 className="text-2xl font-bold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors">
                Rente Viagère
              </h3>
              <p className="text-neutral-600 mb-6 leading-relaxed">
                Calculez votre seuil de rentabilité, comparez avec l&apos;espérance de vie INSEE, 
                et simulez différentes stratégies couple.
              </p>
              <div className="flex items-center gap-2 text-primary-600 font-medium group-hover:gap-3 transition-all">
                <span>Accéder au calculateur</span>
                <span>→</span>
              </div>
            </Link>

            {/* Assurance-Vie (2 calculateurs) */}
            <Link 
              href="/assurance-vie"
              className="bg-white rounded-xl border-2 border-neutral-200 p-8 hover:border-primary-400 hover:shadow-lg transition-all group relative"
            >
              <div className="absolute top-4 right-4 bg-primary-100 text-primary-700 text-xs font-bold px-2 py-1 rounded-full">
                2 outils
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors">
                Assurance-Vie
              </h3>
              <p className="text-neutral-600 mb-6 leading-relaxed">
                Deux calculateurs : fiscalité des rachats (PFU vs IR) et 
                transmission aux bénéficiaires (succession).
              </p>
              <div className="flex items-center gap-2 text-primary-600 font-medium group-hover:gap-3 transition-all">
                <span>Voir les calculateurs</span>
                <span>→</span>
              </div>
            </Link>

            {/* PER (coming soon) */}
            <div className="bg-neutral-50 rounded-xl border-2 border-dashed border-neutral-300 p-8">
              <h3 className="text-2xl font-bold text-neutral-500 mb-3">
                PER (Retraite)
              </h3>
              <p className="text-neutral-500 mb-6 leading-relaxed">
                Optimisez votre déduction fiscale et comparez PER vs Assurance-vie 
                selon votre situation.
              </p>
              <div className="text-neutral-400 font-medium">
                Bientôt disponible
              </div>
            </div>

            {/* SCPI */}
            <div className="bg-neutral-50 rounded-xl border-2 border-dashed border-neutral-300 p-8">
              <h3 className="text-2xl font-bold text-neutral-500 mb-3">
                SCPI
              </h3>
              <p className="text-neutral-500 mb-6 leading-relaxed">
                Simulez vos revenus locatifs et comparez la rentabilité 
                de différentes SCPI.
              </p>
              <div className="text-neutral-400 font-medium">
                Bientôt disponible
              </div>
            </div>

            {/* Immobilier locatif */}
            <div className="bg-neutral-50 rounded-xl border-2 border-dashed border-neutral-300 p-8">
              <h3 className="text-2xl font-bold text-neutral-500 mb-3">
                Immobilier locatif
              </h3>
              <p className="text-neutral-500 mb-6 leading-relaxed">
                Calculez la rentabilité de votre projet immobilier 
                (rendement, cash-flow, fiscalité).
              </p>
              <div className="text-neutral-400 font-medium">
                Bientôt disponible
              </div>
            </div>

          </div>
        </section>

        {/* Articles récents */}
        <section className="max-w-6xl mx-auto px-4 py-16 bg-white rounded-xl my-8 border border-neutral-200">
          <h2 className="text-3xl font-bold text-neutral-900 mb-3">
            Articles récents
          </h2>
          <p className="text-neutral-600 mb-8 text-lg">
            Guides complets pour comprendre avant de calculer
          </p>
          
          <div className="space-y-4">
            <Link 
              href="/blog/assurance-vie-fiscalite-rachat"
              className="block p-6 rounded-lg border border-neutral-200 hover:border-primary-300 hover:bg-primary-50 transition-colors"
            >
              <div className="text-primary-600 text-sm font-medium mb-2">Fiscalité · 11 min</div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">
                Assurance-vie : combien vous allez vraiment payer sur un rachat
              </h3>
              <p className="text-neutral-600">
                Règle proportionnelle, abattement 8 ans, PFU vs IR, versements avant 2017. Tout le détail.
              </p>
            </Link>

            <Link 
              href="/blog/rente-viagere-seuil-rentabilite"
              className="block p-6 rounded-lg border border-neutral-200 hover:border-primary-300 hover:bg-primary-50 transition-colors"
            >
              <div className="text-primary-600 text-sm font-medium mb-2">Rente viagère · 15 min</div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">
                Pourquoi le seuil de rentabilité est après votre espérance de vie
              </h3>
              <p className="text-neutral-600">
                À 72 ans avec 250 000€, le seuil tombe à 15,8 ans. Ce n&apos;est pas une anomalie.
              </p>
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
