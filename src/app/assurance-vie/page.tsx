import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Calculateurs Assurance-Vie : Fiscalité Rachat & Transmission | CalcPatrimoine',
  description: 'Deux calculateurs gratuits pour l\'assurance-vie : fiscalité des rachats (PFU vs IR) et transmission aux bénéficiaires (succession). Calculs officiels, zéro donnée conservée.',
  keywords: 'assurance vie, calculateur, fiscalité rachat, transmission succession, PFU, IR, bénéficiaires, abattement',
  openGraph: {
    title: 'Calculateurs Assurance-Vie - Fiscalité & Transmission',
    description: 'Deux calculateurs gratuits : fiscalité des rachats et transmission aux bénéficiaires. Calculs officiels conformes au CGI.',
    type: 'website',
  },
}

const CALCULATEURS = [
  {
    href: '/assurance-vie/fiscalite-rachat',
    nom: 'Fiscalité Rachat',
    tag: 'Impôt',
    question: 'Combien allez-vous payer sur votre retrait ?',
    desc: 'Simulez l\'impôt exact sur un rachat partiel ou total. Comparez PFU (30 %) et IR + PS selon votre tranche d\'imposition.',
    points: ['Règle proportionnelle automatique', 'Abattement 8 ans (4 600 € / 9 200 €)', 'Versements avant 27/09/2017', 'Comparaison PFU vs IR'],
  },
  {
    href: '/assurance-vie/transmission',
    nom: 'Transmission',
    tag: 'Succession',
    question: 'Combien vos bénéficiaires vont-ils recevoir ?',
    desc: 'Simulez les droits de succession sur votre assurance-vie. Gérez plusieurs bénéficiaires avec abattements avant et après 70 ans.',
    points: ['Article 990 I (abattement 152 500 €)', 'Article 757 B (abattement 30 500 €)', 'Jusqu\'à 6 bénéficiaires', 'Comparaison succession classique'],
  },
]

export default function AssuranceVieHubPage() {
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
            <span className="text-neutral-600">Assurance-Vie</span>
          </nav>

          <div className="h-[2px] w-10 bg-accent-400 mb-6" />

          <h1 className="font-serif text-5xl font-bold text-neutral-900 mb-4 leading-tight">
            Calculateurs<br />
            Assurance-Vie
          </h1>

          <p className="text-lg text-neutral-600 max-w-3xl leading-relaxed mb-8">
            Deux outils gratuits pour anticiper votre fiscalité et votre transmission.
            Calculs conformes au Code Général des Impôts, aucune donnée conservée.
          </p>

          <div className="flex flex-wrap gap-x-8 gap-y-2">
            {['Conforme CGI 2026', 'Code source ouvert', 'Zéro donnée conservée', '100 % gratuit'].map(t => (
              <span key={t} className="font-mono text-xs text-neutral-500">{t}</span>
            ))}
          </div>
        </section>

        {/* 2 Calculateurs — table-style */}
        <section className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center gap-6 mb-0">
            <h2 className="font-serif text-2xl text-neutral-900 shrink-0">Choisissez votre outil</h2>
            <div className="flex-1 h-[1px] bg-neutral-300" />
          </div>

          <div className="border-t border-neutral-300 mt-0">
            {CALCULATEURS.map(calc => (
              <Link
                key={calc.href}
                href={calc.href}
                className="group block border-b border-neutral-200 hover:bg-white transition-colors py-8 pr-6"
                style={{ borderLeft: '3px solid #2E4A6F', paddingLeft: '1.25rem' }}
              >
                <div className="flex items-start gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-xs text-primary-600 border border-primary-300 px-2 py-0.5 bg-white">
                        {calc.tag}
                      </span>
                      <h3 className="text-xl font-bold text-neutral-900 group-hover:text-primary-700 transition-colors">
                        {calc.nom}
                      </h3>
                    </div>
                    <p className="text-sm text-neutral-500 italic mb-4">{calc.question}</p>
                    <p className="text-neutral-600 mb-4 leading-relaxed max-w-2xl">{calc.desc}</p>
                    <ul className="flex flex-wrap gap-x-6 gap-y-1">
                      {calc.points.map(p => (
                        <li key={p} className="font-mono text-xs text-neutral-500">{p}</li>
                      ))}
                    </ul>
                  </div>
                  <span className="font-mono text-primary-600 group-hover:translate-x-1 transition-transform mt-1 shrink-0 text-lg">→</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Info pédagogique */}
        <section className="max-w-4xl mx-auto px-6 py-8">
          <div className="bg-white border border-neutral-200 p-8">
            <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-6">
              Quelle différence entre les deux ?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border-l-4 border-primary-200 pl-5 py-2">
                <h3 className="font-bold text-primary-900 mb-3">Fiscalité Rachat</h3>
                <p className="text-sm text-neutral-500 mb-2 font-mono uppercase tracking-wider text-xs">Quand l'utiliser ?</p>
                <ul className="text-sm text-neutral-700 space-y-1">
                  <li>— Vous voulez retirer de l&apos;argent de votre contrat</li>
                  <li>— Vous voulez anticiper les impôts sur ce retrait</li>
                  <li>— Vous voulez comparer PFU et IR pour votre situation</li>
                </ul>
              </div>
              <div className="border-l-4 border-accent-400 pl-5 py-2">
                <h3 className="font-bold text-neutral-900 mb-3">Transmission</h3>
                <p className="text-sm text-neutral-500 mb-2 font-mono uppercase tracking-wider text-xs">Quand l'utiliser ?</p>
                <ul className="text-sm text-neutral-700 space-y-1">
                  <li>— Vous préparez votre succession</li>
                  <li>— Vous voulez optimiser la répartition entre bénéficiaires</li>
                  <li>— Vous voulez anticiper les droits payés par vos héritiers</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Article lié */}
        <section className="max-w-4xl mx-auto px-6 pb-16">
          <div className="border-t border-neutral-300">
            {[
              { href: '/blog/assurance-vie-fiscalite-rachat', label: 'Article complet — Assurance-vie, combien allez-vous vraiment payer ?', desc: 'Mécanismes fiscaux, règle proportionnelle, optimisations. Guide complet avec exemples chiffrés.' },
              { href: '/faq/assurance-vie', label: 'FAQ assurance-vie', desc: '15 questions/réponses sur la fiscalité, les abattements, les optimisations et la transmission.' },
            ].map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex items-center justify-between py-5 border-b border-neutral-200 hover:bg-white transition-colors pr-4"
                style={{ borderLeft: '3px solid #D4AF37', paddingLeft: '1.25rem' }}
              >
                <div>
                  <p className="font-bold text-neutral-900 group-hover:text-primary-700 transition-colors mb-0.5">{link.label}</p>
                  <p className="text-sm text-neutral-500">{link.desc}</p>
                </div>
                <span className="font-mono text-primary-600 group-hover:translate-x-1 transition-transform ml-4 shrink-0">→</span>
              </Link>
            ))}
          </div>

          <div className="border-t border-neutral-200 mt-8 pt-6 text-center">
            <p className="font-mono text-xs text-neutral-400 leading-relaxed">
              Outils indicatifs uniquement. Ne constituent pas un conseil fiscal ou patrimonial personnalisé.
              Consultez un notaire, un expert-comptable ou un conseiller en gestion de patrimoine.{' '}
              <a href="https://github.com/nba67000/calculpatrimoine" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">Code source ouvert</a>
            </p>
          </div>
        </section>

      </div>
      <Footer />
    </>
  )
}
