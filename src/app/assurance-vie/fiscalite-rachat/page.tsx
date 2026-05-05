import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AssuranceVieCalculator from '@/components/Calculator/AssuranceVieCalculator'

export const metadata: Metadata = {
  title: 'Calculateur Assurance-Vie : Fiscalité Rachat PFU vs IR | CalcPatrimoine',
  description: 'Calculez la fiscalité exacte de votre rachat d\'assurance-vie. Comparez PFU et IR selon votre TMI. Simulateur gratuit conforme au CGI, zéro donnée conservée.',
  keywords: 'assurance vie, fiscalité rachat, PFU, flat tax, IR, impôts, simulation, calculateur gratuit, abattement 8 ans',
  openGraph: {
    title: 'Calculateur Fiscalité Assurance-Vie - PFU vs IR',
    description: 'Calculez combien vous allez payer en impôts sur votre rachat d\'assurance-vie.',
    type: 'article',
  },
}

const SOURCES = [
  { href: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000047956718', label: 'Article 125-0 A du CGI', desc: 'Fiscalité des rachats d\'assurance-vie, abattements annuels' },
  { href: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000045583309', label: 'Article 990 I du CGI', desc: 'Prélèvement spécifique sur versements > 150 000 €' },
  { href: 'https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000036339197', label: 'Loi de finances 2018 (article 28)', desc: 'Réforme PFU (flat tax), date pivot du 27 septembre 2017' },
  { href: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000047958086', label: 'Article L136-7 du Code de la Sécurité Sociale', desc: 'Prélèvements sociaux : CSG 9,2 % + CRDS 0,5 % + PS 7,5 % = 17,2 %' },
  { href: 'https://bofip.impots.gouv.fr/bofip/2823-PGP.html', label: 'BOFiP RPPM-RCM-20-10-20', desc: 'Règle proportionnelle, exemples de calculs détaillés' },
]

const CROSS_LINKS = [
  { href: '/assurance-vie/transmission', label: 'Vous préparez votre succession ?', desc: 'Calculateur de transmission — droits de succession avant et après 70 ans.' },
  { href: '/blog/assurance-vie-fiscalite-rachat', label: 'Article complet — Assurance-vie, combien allez-vous vraiment payer ?', desc: 'Mécanismes fiscaux, 5 erreurs courantes, optimisations. 2 500 mots pour tout comprendre.' },
  { href: '/faq/assurance-vie', label: 'FAQ assurance-vie', desc: '15 questions/réponses : PFU vs IR, abattement 8 ans, versements avant 2017, optimisations.' },
]

export default function AssuranceViePage() {
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
            <span className="text-neutral-600">Fiscalité Rachat</span>
          </nav>

          <div className="h-[2px] w-10 bg-accent-400 mb-6" />

          <h1 className="font-serif text-5xl font-bold text-neutral-900 mb-4 leading-tight">
            Calculateur Fiscalité<br />
            Rachat Assurance-Vie
          </h1>

          <p className="text-lg text-neutral-600 max-w-3xl leading-relaxed mb-8">
            Calculez la fiscalité exacte de votre rachat partiel d&apos;assurance-vie.
            Comparez PFU (flat tax) et IR selon votre tranche d&apos;imposition.
          </p>

          <div className="flex flex-wrap gap-x-8 gap-y-2">
            {['Calculs officiels (CGI)', 'Règle des 8 ans appliquée', 'Versements avant 2017', 'Zéro donnée conservée'].map(t => (
              <span key={t} className="font-mono text-xs text-neutral-500">{t}</span>
            ))}
          </div>
        </section>

        {/* Calculateur */}
        <div className="max-w-6xl mx-auto px-6 py-8">
          <AssuranceVieCalculator />
        </div>

        {/* Explications */}
        <section className="max-w-4xl mx-auto px-6 py-8">
          <div className="bg-white border border-neutral-200 p-8 space-y-5">
            <h2 className="font-serif text-2xl font-bold text-neutral-900">Comment ça marche ?</h2>
            <div className="space-y-4 text-neutral-700 leading-relaxed">
              <p>
                <strong>On taxe la plus-value, pas le capital.</strong>{' '}
                Si vous avez versé 70 000 € et que votre contrat vaut 100 000 €,
                seuls les 30 000 € de plus-value sont imposables, répartis proportionnellement dans votre rachat.
              </p>
              <p>
                <strong>L&apos;âge du contrat change tout.</strong>{' '}
                Contrat de moins de 8 ans : pas d&apos;abattement.
                Contrat de plus de 8 ans : abattement de 4 600 € (9 200 € en couple) par an sur la plus-value.
              </p>
              <p>
                <strong>Vous avez le choix entre PFU et IR.</strong>{' '}
                PFU (Flat Tax) : taux fixe de 30 % (12,8 % IR + 17,2 % PS).
                IR + PS : votre TMI + 17,2 % de prélèvements sociaux.
              </p>
              <p>
                <strong>Versements avant le 27/09/2017.</strong>{' '}
                Les versements effectués avant cette date bénéficient d&apos;un taux réduit de 24,7 %
                (7,5 % IR + 17,2 % PS) au lieu de 30 %.
              </p>
            </div>
          </div>
        </section>

        {/* Liens croisés */}
        <section className="max-w-4xl mx-auto px-6 pb-8">
          <div className="border-t border-neutral-300">
            {CROSS_LINKS.map(link => (
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
        </section>

        {/* Méthodologie */}
        <section className="max-w-4xl mx-auto px-6 py-8 pb-16">
          <div className="bg-white border border-neutral-200 p-8">
            <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-6">
              Méthodologie et sources officielles
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-500 mb-3">Formules de calcul</h3>
                <div className="bg-neutral-50 border border-neutral-200 p-5 grid md:grid-cols-2 gap-x-8 gap-y-3">
                  {[
                    ['Plus-value dans le rachat', 'Montant rachat × (PV totale ÷ Capital total)'],
                    ['Abattement (si > 8 ans)', '4 600 € (seul) ou 9 200 € (couple)'],
                    ['PFU versements après 27/09/2017', '12,8 % IR + 17,2 % PS = 30 %'],
                    ['PFU versements avant 27/09/2017', '7,5 % IR + 17,2 % PS = 24,7 %'],
                    ['IR + Prélèvements sociaux', 'TMI utilisateur + 17,2 %'],
                    ['Option retenue', 'min(totalPFU, totalIR)'],
                  ].map(([label, val]) => (
                    <div key={label} className="font-mono">
                      <p className="text-xs text-neutral-400 mb-0.5">{label}</p>
                      <p className="text-xs text-neutral-700">{val}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-500 mb-3">Textes de loi</h3>
                <ul className="space-y-3 text-sm">
                  {SOURCES.map(s => (
                    <li key={s.href} className="flex items-start gap-3">
                      <span className="text-accent-400 mt-0.5 shrink-0">—</span>
                      <div>
                        <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline font-medium">{s.label}</a>
                        <p className="text-neutral-500 text-xs mt-0.5">{s.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-l-4 border-primary-200 bg-primary-50 px-4 py-3">
                <p className="text-sm text-primary-800">
                  <strong>Méthodologie vérifiée</strong> — calculs validés par recoupement avec le BOFiP et Service-Public.fr.
                  Dernière vérification : avril 2026.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-neutral-200 mt-8 pt-6 text-center">
            <p className="font-mono text-xs text-neutral-400 leading-relaxed">
              Outil indicatif uniquement. Ne constitue pas un conseil fiscal personnalisé.
              Consultez un conseiller en gestion de patrimoine ou un expert-comptable.{' '}
              <a href="https://github.com/nba67000/calculpatrimoine" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">Code source ouvert</a>
            </p>
          </div>
        </section>

      </div>
      <Footer />
    </>
  )
}
