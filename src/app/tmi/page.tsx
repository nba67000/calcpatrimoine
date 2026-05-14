import type { Metadata } from 'next'
import Link from 'next/link'
import CalculateurPageLayout from '@/components/CalculateurPageLayout'
// PERF: lazy-load → TMICalculator sort du bundle initial (logique métier + recharts)
import dynamic from 'next/dynamic'
import CalculatorSkeleton from '@/components/Calculator/CalculatorSkeleton'
const TMICalculator = dynamic(
  () => import('@/components/Calculator/TMICalculator'),
  { loading: () => <CalculatorSkeleton /> }
)
import SourcesSection from '@/components/SourcesSection'
import SchemaFAQ from '@/components/SchemaFAQ'
import SchemaHowTo from '@/components/SchemaHowTo'
import { FAQ_TMI, HOWTO_TMI } from '@/lib/schema/schemaData'


export const metadata: Metadata = {
  title: 'Calculateur TMI : Tranche Marginale Imposition 2026',
  description: 'Calculez votre tranche marginale d\'imposition (TMI) et votre IR net 2026. Barème officiel, quotient familial, décote. Revenus 2025, gratuit et open-source.',
  keywords: 'TMI, tranche marginale imposition, impôt sur le revenu, barème IR 2026, quotient familial, décote, calculateur impôts, revenus 2025',
  openGraph: {
    title: 'Calculateur TMI - Tranche Marginale d\'Imposition 2026',
    description: 'Calculez votre TMI et votre IR net avec le barème officiel 2026, le quotient familial et la décote.',
    type: 'article',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'CalculPatrimoine' }],
  },

  alternates: { canonical: 'https://calculpatrimoine.fr/tmi' },
}

const TRANCHES = [
  { tranche: 'Jusqu\'à 11 600 €', taux: '0 %', color: 'text-neutral-500' },
  { tranche: 'De 11 601 € à 29 579 €', taux: '11 %', color: 'text-green-700' },
  { tranche: 'De 29 580 € à 84 577 €', taux: '30 %', color: 'text-yellow-700' },
  { tranche: 'De 84 578 € à 181 917 €', taux: '41 %', color: 'text-orange-700' },
  { tranche: 'Au-delà de 181 917 €', taux: '45 %', color: 'text-red-700' },
]

const LIMITES = [
  'Le revenu saisi est le revenu net imposable (après abattement 10 % ou frais réels).',
  'Les revenus soumis à taux fixe (plus-values mobilières au PFU, etc.) ne sont pas pris en compte.',
  'Les réductions et crédits d\'impôt ne sont pas simulés.',
  'La surtaxe sur les très hauts revenus (CEHR, Art. 223 sexies CGI) n\'est pas calculée. Elle s\'applique au-delà de 250 000 € de revenus et représente 3 à 4 % supplémentaires.',
  'La garde alternée (enfants à mi-temps : 0,25 part au lieu de 0,5) n\'est pas gérée.',
]

export default function TMIPage() {
  return (
    <>
      <SchemaHowTo
        name={HOWTO_TMI.name}
        description={HOWTO_TMI.description}
        totalTime={HOWTO_TMI.totalTime}
        steps={HOWTO_TMI.steps}
        tool="Calculateur CalculPatrimoine"
      />
      <SchemaFAQ items={FAQ_TMI} />
      <CalculateurPageLayout
      breadcrumb={[{ href: '/', label: 'Accueil' }, { label: 'Tranche Marginale d\'Imposition' }]}
      titre={<>Calculateur TMI<br />Barème IR 2026</>}
      description="Calculez votre tranche marginale d'imposition et votre impôt net à partir de votre
        revenu net imposable, de votre situation familiale et du nombre d'enfants à charge.
        Barème officiel 2026 (revenus 2025), quotient familial et décote inclus."
      features={['Barème IR 2026 (LF 2026)', 'Quotient familial + plafonnement', 'Décote (Art. 197-I-4 CGI)', 'Zéro donnée conservée']}
      calculator={<TMICalculator />}
      currentHref="/tmi"
    >

      {/* Explications */}
      <section className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white border border-neutral-200 p-8 space-y-5">
          <h2 className="font-serif text-2xl font-bold text-neutral-900">
            Comment fonctionne le barème progressif ?
          </h2>

          <div className="space-y-4 text-neutral-700 leading-relaxed">
            <p>
              <strong>Chaque tranche s&apos;applique sur la fraction concernée du revenu.</strong>{' '}
              Un célibataire gagnant 50 000 € ne paie pas 30 % sur 50 000 €. Il paie 0 % sur les
              premiers 11 600 €, 11 % de 11 600 € à 29 579 €, et 30 % sur le reste. La TMI est le
              taux de la tranche la plus haute atteinte, pas le taux appliqué sur l&apos;ensemble du revenu.
            </p>
            <p>
              <strong>Quotient familial : diviser pour mieux imposer.</strong>{' '}
              Le revenu est divisé par le nombre de parts fiscales avant d&apos;appliquer le barème, puis
              l&apos;impôt est multiplié par ce même nombre de parts. Le gain est limité par le plafonnement
              du quotient familial (1 807 € par demi-part supplémentaire - Art. 197-IV CGI).
            </p>
            <p>
              <strong>La décote protège les revenus modestes.</strong>{' '}
              Si votre impôt (calculé par le barème, avant toute réduction) est inférieur à 1 982 €
              (célibataire) ou 3 277 € (couple), l&apos;État réduit automatiquement la note. Plus votre
              impôt est proche de zéro, plus la réduction est grande, jusqu&apos;à l&apos;annuler complètement
              (Art. 197-I-4 CGI).
            </p>
          </div>

          <div className="bg-neutral-50 border border-neutral-200 p-5">
            <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-500 mb-3">
              Barème 2026 - revenus 2025 (Art. 197 CGI, LF 2026)
            </h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-300">
                  <th className="text-left py-2 text-neutral-500 font-mono text-xs">Tranche (revenu / part)</th>
                  <th className="text-right py-2 text-neutral-500 font-mono text-xs">Taux</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {TRANCHES.map(t => (
                  <tr key={t.tranche}>
                    <td className="py-2 text-neutral-700">{t.tranche}</td>
                    <td className={`py-2 text-right font-bold font-mono ${t.color}`}>{t.taux}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Lien vers PER */}
      <section className="max-w-4xl mx-auto px-6 pb-8">
        <div className="border-t border-neutral-300">
          <Link
            href="/per-individuel"
            className="group flex items-center justify-between py-5 border-b border-neutral-200 hover:bg-white transition-colors pr-4"
            style={{ borderLeft: '3px solid #D4AF37', paddingLeft: '1.25rem' }}
          >
            <div>
              <p className="font-bold text-neutral-900 group-hover:text-primary-700 transition-colors mb-0.5">Calculez votre économie d&apos;impôt PER</p>
              <p className="text-sm text-neutral-500">Connaissant votre TMI, simulez l&apos;économie d&apos;impôt en versant sur un PER individuel (Art. 163 quatervicies CGI).</p>
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
            <SourcesSection slug="tmi" />

            <div>
              <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-500 mb-3">Limites connues</h3>
              <ul className="text-sm text-neutral-600 space-y-1.5">
                {LIMITES.map((l, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-neutral-400 mt-0.5 shrink-0">-</span>
                    <span>{l}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-l-4 border-primary-200 bg-primary-50 px-4 py-3">
              <p className="text-sm text-primary-800">
                <strong>Méthodologie vérifiée</strong> - calculs validés sur trois cas de référence issus des barèmes LF 2026,
                dont un cas de plafonnement du quotient familial. Dernière vérification : 19 avril 2026.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-200 mt-8 pt-6 text-center">
          <p className="font-mono text-xs text-neutral-400 leading-relaxed">
            Outil indicatif uniquement. Ne constitue pas un conseil fiscal personnalisé.{' '}
            <a href="https://github.com/nba67000/calculpatrimoine" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">Code source ouvert</a>
          </p>
        </div>
      </section>

      {/* FAQ cross-link */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <div className="border-t border-neutral-300">
          <Link
            href="/faq/tmi"
            className="group flex items-center justify-between py-5 border-b border-neutral-200 hover:bg-white transition-colors pr-4"
            style={{ borderLeft: '3px solid #D4AF37', paddingLeft: '1.25rem' }}
          >
            <div>
              <p className="font-bold text-neutral-900 group-hover:text-primary-700 transition-colors mb-0.5">FAQ TMI</p>
              <p className="text-sm text-neutral-500">TMI vs taux moyen, quotient familial, décote, utilité pour le PER et l&apos;assurance-vie.</p>
            </div>
            <span className="font-mono text-primary-600 group-hover:translate-x-1 transition-transform ml-4 shrink-0">→</span>
          </Link>
        </div>
      </section>

    </CalculateurPageLayout>
    </>
  )
}
