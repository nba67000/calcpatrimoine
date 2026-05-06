import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import TransmissionCalculator from '@/components/Calculator/TransmissionCalculator'
import { SOURCES_TRANSMISSION } from '@/lib/transmission'
import SourcesSection from '@/components/SourcesSection'
import LegalDisclaimer from '@/components/LegalDisclaimer'

export const metadata: Metadata = {
  title: 'Calculateur Transmission Assurance-Vie : Succession & Bénéficiaires | CalculPatrimoine',
  description: 'Calculez les droits de transmission de votre assurance-vie. Article 990 I (avant 70 ans) et Article 757 B (après 70 ans). Gestion multi-bénéficiaires.',
  keywords: 'transmission assurance vie, succession, bénéficiaires, abattement 152 500, article 990 I, article 757 B, droits succession',
  openGraph: {
    title: 'Calculateur Transmission Assurance-Vie',
    description: 'Simulez les droits de succession sur votre assurance-vie. Calculs conformes au CGI avec gestion multi-bénéficiaires.',
    type: 'article',
  },
}

export default function TransmissionPage() {
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
            <Link href="/assurance-vie" className="hover:text-primary-600 transition-colors">Assurance-Vie</Link>
            <span>/</span>
            <span className="text-neutral-600">Transmission</span>
          </nav>

          <div className="h-[2px] w-10 bg-accent-400 mb-6" />

          <h1 className="font-serif text-5xl font-bold text-neutral-900 mb-4 leading-tight">
            Calculateur Transmission<br />
            Assurance-Vie
          </h1>

          <p className="text-lg text-neutral-600 max-w-3xl leading-relaxed mb-8">
            Simulez les droits de succession sur votre assurance-vie. Prend en compte les versements
            avant et après 70 ans, les abattements par bénéficiaire, et la répartition entre héritiers.
          </p>

          <div className="flex flex-wrap gap-x-8 gap-y-2">
            {['Article 990 I (avant 70 ans)', 'Article 757 B (après 70 ans)', 'Jusqu\'à 6 bénéficiaires', 'Zéro donnée conservée'].map(t => (
              <span key={t} className="font-mono text-xs text-neutral-500">{t}</span>
            ))}
          </div>
        </section>

        {/* Calculateur */}
        <div className="max-w-6xl mx-auto px-6 pt-6">
          <LegalDisclaimer />
        </div>
        <div className="max-w-6xl mx-auto px-6 py-8">
          <TransmissionCalculator />
        </div>

        {/* Explications */}
        <section className="max-w-4xl mx-auto px-6 py-8">
          <div className="bg-white border border-neutral-200 p-8 space-y-5">
            <h2 className="font-serif text-2xl font-bold text-neutral-900">Comment ça marche ?</h2>
            <div className="space-y-4 text-neutral-700 leading-relaxed">
              <p>
                <strong>Deux régimes selon l&apos;âge des versements.</strong>{' '}
                L&apos;assurance-vie bénéficie d&apos;une fiscalité successorale favorable, mais différente
                selon que les versements ont été effectués avant ou après 70 ans.
              </p>
              <p>
                <strong>Article 990 I — versements avant 70 ans.</strong>{' '}
                Abattement de 152 500 € par bénéficiaire (non partagé).
                Au-delà : 20 % jusqu&apos;à 700 000 €, puis 31,25 % au-delà.
              </p>
              <p>
                <strong>Article 757 B — versements après 70 ans.</strong>{' '}
                Abattement global de 30 500 € partagé entre tous les bénéficiaires (sauf conjoint).
                Les plus-values générées sont totalement exonérées.
                Au-delà : barème de succession classique.
              </p>
              <p>
                <strong>Conjoint et PACS totalement exonérés.</strong>{' '}
                Grâce à la loi TEPA 2007, le conjoint survivant ou partenaire de PACS est
                totalement exonéré de droits, quel que soit le montant transmis.
              </p>
            </div>
          </div>
        </section>

        {/* Liens croisés */}
        <section className="max-w-4xl mx-auto px-6 pb-8">
          <div className="border-t border-neutral-300">
            <Link
              href="/assurance-vie/fiscalite-rachat"
              className="group flex items-center justify-between py-5 border-b border-neutral-200 hover:bg-white transition-colors pr-4"
              style={{ borderLeft: '3px solid #D4AF37', paddingLeft: '1.25rem' }}
            >
              <div>
                <p className="font-bold text-neutral-900 group-hover:text-primary-700 transition-colors mb-0.5">Vous voulez retirer de l&apos;argent de votre contrat ?</p>
                <p className="text-sm text-neutral-500">Calculateur de fiscalité des rachats — comparaison automatique PFU vs IR.</p>
              </div>
              <span className="font-mono text-primary-600 group-hover:translate-x-1 transition-transform ml-4 shrink-0">→</span>
            </Link>
            <Link
              href="/faq/transmission"
              className="group flex items-center justify-between py-5 border-b border-neutral-200 hover:bg-white transition-colors pr-4"
              style={{ borderLeft: '3px solid #D4AF37', paddingLeft: '1.25rem' }}
            >
              <div>
                <p className="font-bold text-neutral-900 group-hover:text-primary-700 transition-colors mb-0.5">FAQ Transmission Assurance-Vie</p>
                <p className="text-sm text-neutral-500">Article 990 I, 757 B, clause bénéficiaire, abattements — toutes vos questions.</p>
              </div>
              <span className="font-mono text-primary-600 group-hover:translate-x-1 transition-transform ml-4 shrink-0">→</span>
            </Link>
          </div>
        </section>

        {/* Méthodologie */}
        <section className="max-w-4xl mx-auto px-6 py-8 pb-16">
          <div className="bg-white border border-neutral-200 p-8">
            <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-6">
              Méthodologie et sources officielles
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-500 mb-3">Abattements et taux 2026</h3>
                <div className="bg-neutral-50 border border-neutral-200 p-5 grid md:grid-cols-2 gap-x-8 gap-y-4 text-sm">
                  <div>
                    <p className="font-bold text-neutral-900 mb-1">Article 990 I (avant 70 ans)</p>
                    <p className="text-neutral-600">Abattement : 152 500 € par bénéficiaire</p>
                    <p className="text-neutral-600">Taux : 20 % puis 31,25 % (seuil 700 000 €)</p>
                  </div>
                  <div>
                    <p className="font-bold text-neutral-900 mb-1">Article 757 B (après 70 ans)</p>
                    <p className="text-neutral-600">Abattement : 30 500 € global partagé</p>
                    <p className="text-neutral-600">Taux : barème succession classique</p>
                  </div>
                  <div>
                    <p className="font-bold text-neutral-900 mb-1">Conjoint / PACS</p>
                    <p className="text-neutral-600">Exonération totale (Loi TEPA 2007)</p>
                  </div>
                  <div>
                    <p className="font-bold text-neutral-900 mb-1">Plus-values après 70 ans</p>
                    <p className="text-neutral-600">Totalement exonérées</p>
                  </div>
                </div>
              </div>

              <SourcesSection sources={SOURCES_TRANSMISSION} />

              <div className="border-l-4 border-primary-200 bg-primary-50 px-4 py-3">
                <p className="text-sm text-primary-800">
                  <strong>Méthodologie vérifiée</strong> — calculs conformes au CGI et au BOFiP.
                  Barèmes et abattements mis à jour en avril 2026.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-neutral-200 mt-8 pt-6 text-center">
            <p className="font-mono text-xs text-neutral-400 leading-relaxed">
              Outil indicatif uniquement. Ne constitue pas un conseil patrimonial personnalisé.
              Pour toute décision successorale, consultez un notaire ou un expert-comptable.{' '}
              <a href="https://github.com/nba67000/calculpatrimoine" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">Code source ouvert</a>
            </p>
          </div>
        </section>

      </div>
      <Footer />
    </>
  )
}
