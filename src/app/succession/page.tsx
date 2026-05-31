import type { Metadata } from 'next'
import CalculateurPageLayout from '@/components/CalculateurPageLayout'
import dynamic from 'next/dynamic'
import CalculatorSkeleton from '@/components/Calculator/CalculatorSkeleton'
const SuccessionCalculator = dynamic(
  () => import('@/components/Calculator/SuccessionCalculator'),
  { loading: () => <CalculatorSkeleton /> }
)
import SourcesSection from '@/components/SourcesSection'

export const metadata: Metadata = {
  title: 'Calculateur droits de succession 2026 par héritier',
  description: 'Calculez les droits de succession par héritier : abattements Art. 779 CGI, barème Art. 777, exonération conjoint/PACS Loi TEPA, rappel 15 ans.',
  keywords: 'droits succession, calculateur succession, abattement succession, barème succession, exonération conjoint TEPA, rappel 15 ans',
  alternates: { canonical: 'https://calculpatrimoine.fr/succession' },
}

const LIMITES = [
  'Ce calculateur traite la succession en pleine propriété (numéraire ou biens évalués). Les successions avec démembrement (usufruit/nue-propriété) ne sont pas gérées.',
  'L\'assurance-vie n\'est pas intégrée à la succession : elle suit ses propres règles (Art. 990 I / 757 B CGI) — voir le calculateur dédié /assurance-vie/transmission.',
  'Les exonérations spéciales ne sont pas calculées : Pacte Dutreil (transmission d\'entreprise), forêts (Art. 793 CGI), œuvres d\'art, monuments historiques.',
  'Les frais de notaire et émoluments ne sont pas inclus (hors fiscalité pure).',
  'L\'abattement spécifique aux héritiers handicapés (Art. 779-II CGI, +159 325 €) n\'est pas géré dans cette V1.',
]

export default function SuccessionPage() {
  return (
    <CalculateurPageLayout
      breadcrumb={[
        { href: '/', label: 'Accueil' },
        { label: 'Succession' },
      ]}
      titre={<>Calculateur Succession<br />Droits par héritier 2026</>}
      description="Calculez les droits de succession dus par chaque héritier selon le lien de parenté
        avec le défunt. Abattements Art. 779 CGI, barème Art. 777, exonération totale conjoint/PACS
        (Loi TEPA 2007), prise en compte des donations antérieures (rappel 15 ans, Art. 784 CGI)."
      features={[
        'Barème 2026 (Art. 777 CGI)',
        'Abattements Art. 779',
        'Exonération conjoint TEPA',
        'Rappel 15 ans',
        'Jusqu\'à 8 héritiers',
      ]}
      calculator={<SuccessionCalculator />}
      currentHref="/succession"
      methodologie={
        <>
          <SourcesSection slug="succession" />

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
              Barème 2026 de l&apos;article 777 CGI (inchangé depuis LF 2011). Abattements
              Art. 779 CGI applicables aux successions ouvertes en 2026. Le conjoint et le
              partenaire de PACS sont totalement exonérés (Art. 796-0 bis CGI, Loi TEPA 2007).
            </p>
          </div>
        </>
      }
    />
  )
}
