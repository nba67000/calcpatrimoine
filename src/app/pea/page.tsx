import type { Metadata } from 'next'
import CalculateurPageLayout from '@/components/CalculateurPageLayout'
import dynamic from 'next/dynamic'
import CalculatorSkeleton from '@/components/Calculator/CalculatorSkeleton'
const PeaCalculator = dynamic(
  () => import('@/components/Calculator/PeaCalculator'),
  { loading: () => <CalculatorSkeleton /> }
)
import MethodologieSection from '@/components/MethodologieSection'

export const metadata: Metadata = {
  title: 'PEA : fiscalité retrait + bilan latent (calculateur 2026)',
  description: 'Calculez le net après PS sur un retrait PEA (exonération IR après 5 ans). Plus vue bilan : brut, net de sortie, passif fiscal latent.',
  alternates: { canonical: 'https://calculpatrimoine.fr/pea' },
}

const LIMITES = [
  'Le calculateur suppose un PEA classique (plafond 150 000 €). Le PEA-PME (plafond 225 000 €) et le PEA-Jeunes (20 000 €) suivent les mêmes règles fiscales.',
  'La fraction PV/valeur est supposée proportionnelle dans la valeur. En réalité, le calcul de la PV dans un retrait partiel utilise la méthode du prix moyen pondéré sur l\'historique des versements.',
  'Pas d\'historique des taux PS : avant 2018, les taux étaient différents (8,2 % puis 15,5 %). Pour un PEA très ancien avec PV importante, la fiscalité réelle peut différer.',
  'Le calculateur ne traite pas la clôture avant 5 ans (qui déclenche la fiscalité sur la totalité des gains, pas seulement le retrait).',
  'Le crédit lombard (emprunt garanti par le PEA, alternative au retrait) n\'est pas modélisé.',
]

export default function PeaPage() {
  return (
    <CalculateurPageLayout
      breadcrumb={[
        { href: '/', label: 'Accueil' },
        { label: 'PEA' },
      ]}
      titre={<>Calculateur PEA<br />Fiscalité retrait + bilan latent</>}
      description="Deux usages dans un seul calculateur : (1) estimer le net après prélèvements sociaux sur
        un retrait (exonération IR après 5 ans, Art. 157-5° bis CGI) ; (2) faire le bilan
        patrimonial avec trois vues : brut, net de sortie, et passif fiscal latent (analogue aux
        impôts différés)."
      features={[
        'Exonération IR > 5 ans',
        'PS 17,2 % sur PV',
        'Bilan 3 vues',
        'Passif latent chiffré',
        'Warning < 5 ans',
      ]}
      calculator={<PeaCalculator />}
      currentHref="/pea"
      methodologie={
        <MethodologieSection
          slug="pea"
          limites={LIMITES}
          note={
            <>
              Régime applicable 2026. Sources : Art. L. 221-30 et s. CMF (cadre juridique),
              Art. 150-0 A et 157-5° bis CGI (fiscalité), Art. L. 136-7 CSS (prélèvements sociaux).
            </>
          }
        />
      }
    />
  )
}
