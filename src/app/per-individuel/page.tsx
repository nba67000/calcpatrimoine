import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LegalDisclaimer from '@/components/LegalDisclaimer'
import PERCalculator from '@/components/Calculator/PERCalculator'

export const metadata: Metadata = {
  title: 'Simulateur PER individuel — économie d\'impôt',
  description: 'Calculez l\'économie d\'impôt réalisée en versant sur un PER individuel. Plafond de déduction 2026, report 3 ans, TMI. Barème officiel, gratuit et open-source.',
  keywords: 'PER individuel, plan épargne retraite, économie impôt, plafond déduction, TMI, versement PER, fiscalité PER, simulateur PER 2026',
  openGraph: {
    title: 'Simulateur PER individuel — économie d\'impôt sur versement',
    description: 'Calculez votre économie d\'impôt sur un versement PER individuel. Plafond 2026, report des plafonds N-1/N-2/N-3.',
    type: 'article',
  },
}

export default function PERIndividuelPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-neutral-50">

        {/* En-tête */}
        <div className="bg-gradient-to-b from-primary-50 to-white border-b border-neutral-200">
          <div className="max-w-6xl mx-auto px-4 py-12">

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-neutral-600 mb-6">
              <Link href="/" className="hover:text-primary-600">Accueil</Link>
              <span>›</span>
              <span className="text-neutral-900 font-medium">PER individuel — économie d'impôt</span>
            </div>

            {/* Titre */}
            <h1 className="text-5xl font-bold text-neutral-900 mb-6 leading-tight">
              Simulateur PER individuel<br />
              Économie d'impôt sur versement
            </h1>

            <p className="text-xl text-neutral-700 max-w-3xl leading-relaxed">
              Calculez l'économie d'impôt générée par un versement volontaire sur votre Plan
              d'Épargne Retraite individuel (PERIN). Plafond de déduction 2026, report des
              plafonds non utilisés sur 3 ans, coût net réel du versement.
            </p>

            {/* Trust markers */}
            <div className="flex flex-wrap gap-6 mt-8">
              <div className="flex items-center gap-2 text-sm text-neutral-600">
                <span className="text-primary-600 text-lg">✓</span>
                <span>Art. 163 quatervicies CGI</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-600">
                <span className="text-primary-600 text-lg">✓</span>
                <span>PASS 2025 — plafonds 2026</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-600">
                <span className="text-primary-600 text-lg">✓</span>
                <span>Report plafonds N-1 / N-2 / N-3</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-600">
                <span className="text-primary-600 text-lg">✓</span>
                <span>Zéro donnée conservée</span>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer légal */}
        <div className="max-w-6xl mx-auto px-4 pt-8">
          <LegalDisclaimer />
        </div>

        {/* Calculateur */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          <PERCalculator />
        </div>

        {/* Lien vers TMI */}
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link
            href="/tmi"
            className="block bg-neutral-100 border border-neutral-200 rounded-xl p-6 hover:border-primary-300 hover:bg-primary-50 transition-all group"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-700 group-hover:text-primary-700 transition-colors">
                  Vous ne connaissez pas votre TMI ?
                </p>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Calculez votre tranche marginale d'imposition à partir de votre revenu net imposable.
                </p>
              </div>
              <span className="text-primary-600 font-medium text-sm group-hover:gap-3 transition-all">
                Calculateur TMI →
              </span>
            </div>
          </Link>
        </div>

        {/* Explications */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-white rounded-xl border border-neutral-200 p-8 space-y-8">

            <h2 className="text-2xl font-bold text-neutral-900">
              Comment fonctionne la déduction PER ?
            </h2>

            <div className="space-y-6 text-neutral-700 leading-relaxed">

              <div>
                <h3 className="text-lg font-bold text-neutral-900 mb-2">
                  Le principe : un versement qui réduit votre revenu imposable
                </h3>
                <p>
                  Un versement volontaire sur un PER individuel est déductible du revenu net global
                  (Art. 163 quatervicies CGI). Concrètement, si vous versez 5 000 € et que votre
                  TMI est de 30 %, votre impôt sur le revenu diminue de 1 500 € — le versement
                  ne vous coûte réellement que 3 500 €.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-neutral-900 mb-2">
                  Le plafond de déduction pour les salariés
                </h3>
                <p>
                  La déduction est limitée à <strong>10 % de vos revenus professionnels nets de
                  frais professionnels</strong> de l'année précédente. Pour 2026, ce plafond est
                  borné entre <strong>4 710 €</strong> (minimum légal) et
                  <strong> 37 680 €</strong> (maximum = 10 % × 8 × PASS 2025 = 10 % × 8 × 47 100 €).
                </p>
                <p className="mt-3">
                  L'abattement forfaitaire de 10 % pour frais professionnels est appliqué
                  automatiquement sur votre salaire net (min. 509 €, max. 14 555 € pour les
                  revenus 2025 — Art. 83 CGI, LF 2026). Le résultat est votre "revenu net
                  professionnel", base du calcul du plafond.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-neutral-900 mb-2">
                  Le report des plafonds non utilisés
                </h3>
                <p>
                  Si vous n'avez pas utilisé tout votre plafond les années précédentes, vous
                  pouvez reporter la part non consommée sur les <strong>3 années suivantes</strong>
                  (Art. 163 quatervicies I alinéa 3 CGI). Ces montants disponibles figurent sur
                  votre avis d'imposition, rubrique "Plafonds disponibles pour les versements
                  retraite de l'épargne retraite".
                </p>
              </div>

              <div className="bg-neutral-50 rounded-lg p-5 border border-neutral-200">
                <h3 className="font-bold text-neutral-900 mb-3 text-sm uppercase tracking-wide">
                  Formule de calcul
                </h3>
                <div className="text-sm text-neutral-700 space-y-1 font-mono">
                  <p>abattement = max(509 €, min(salaire × 10 %, 14 555 €))</p>
                  <p>revenu net professionnel = salaire − abattement</p>
                  <p>plafond annuel = max(4 710 €, min(revenu × 10 %, 37 680 €))</p>
                  <p>plafond total = plafond annuel + reports N-1 + N-2 + N-3</p>
                  <p>économie d'impôt = min(versement, plafond total) × TMI</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                Exemples chiffrés
              </h2>
              <div className="space-y-4">
                <div className="bg-neutral-50 rounded-lg p-5 border border-neutral-200">
                  <p className="font-bold text-neutral-900 text-sm mb-2">
                    Salarié, 60 000 € / an, TMI 30 %, versement 3 000 €
                  </p>
                  <p className="text-sm text-neutral-700">
                    Abattement 10 % = 6 000 € · Revenu net professionnel = 54 000 € ·
                    Plafond annuel = 5 400 € · Montant déductible = 3 000 € ·
                    <strong> Économie : 900 €</strong> · Coût net réel : 2 100 €
                  </p>
                </div>
                <div className="bg-neutral-50 rounded-lg p-5 border border-neutral-200">
                  <p className="font-bold text-neutral-900 text-sm mb-2">
                    Salarié, 50 000 € / an, TMI 30 %, versement 5 000 € (dépassement)
                  </p>
                  <p className="text-sm text-neutral-700">
                    Revenu net = 45 000 € · 10 % × 45 000 = 4 500 € {'<'} 4 710 € (minimum) ·
                    Plafond = 4 710 € · Part déductible = 4 710 € ·
                    <strong> Économie : 1 413 €</strong> · Part non déductible : 290 €
                  </p>
                </div>
                <div className="bg-neutral-50 rounded-lg p-5 border border-neutral-200">
                  <p className="font-bold text-neutral-900 text-sm mb-2">
                    Salarié, 50 000 € / an, TMI 41 %, versement 10 000 €, report N-1 = 3 000 €
                  </p>
                  <p className="text-sm text-neutral-700">
                    Plafond annuel = 4 710 € · Report N-1 = 3 000 € · Plafond total = 7 710 € ·
                    Montant déductible = 7 710 € ·
                    <strong> Économie : 3 161 €</strong> · Coût net réel : 6 839 €
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Méthodologie et sources */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-neutral-100 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">
              Méthodologie et sources officielles
            </h2>

            <div className="space-y-6">

              <div>
                <h3 className="text-lg font-bold text-neutral-900 mb-3">Textes de loi</h3>
                <ul className="space-y-3 text-sm">
                  {[
                    {
                      href: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000048776042',
                      label: 'Article 163 quatervicies du CGI',
                      desc: 'Déductibilité et plafonnement des versements PER (PERIN, salarié et TNS)',
                    },
                    {
                      href: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000044986838',
                      label: 'Article 83 du CGI',
                      desc: 'Abattement forfaitaire de 10 % pour frais professionnels sur les salaires (min. 509 €, max. 14 555 € pour revenus 2025)',
                    },
                    {
                      href: 'https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006072026/LEGISCTA000038619671/',
                      label: 'Articles L.224-1 et suivants du Code monétaire et financier',
                      desc: 'Régime juridique du Plan d\'Épargne Retraite (PER) — compartiments, versements, sortie',
                    },
                  ].map((s) => (
                    <li key={s.href} className="flex items-start gap-2">
                      <span className="text-primary-600 mt-1">•</span>
                      <div>
                        <a
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-600 hover:underline font-medium"
                        >
                          {s.label}
                        </a>
                        <p className="text-neutral-600 text-xs mt-0.5">{s.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-neutral-900 mb-3">Barèmes vérifiés</h3>
                <div className="bg-white rounded-lg p-4 border border-neutral-200">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-neutral-200">
                        <th className="text-left py-2 text-neutral-600 font-medium">Paramètre</th>
                        <th className="text-right py-2 text-neutral-600 font-medium">Valeur 2026</th>
                        <th className="text-right py-2 text-neutral-600 font-medium">Base</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100 text-neutral-700">
                      <tr>
                        <td className="py-2">PASS 2025</td>
                        <td className="py-2 text-right font-medium">47 100 €</td>
                        <td className="py-2 text-right text-neutral-500 text-xs">Décret nov. 2024</td>
                      </tr>
                      <tr>
                        <td className="py-2">Plafond PER maximum</td>
                        <td className="py-2 text-right font-medium">37 680 €</td>
                        <td className="py-2 text-right text-neutral-500 text-xs">10 % × 8 × PASS</td>
                      </tr>
                      <tr>
                        <td className="py-2">Plafond PER minimum</td>
                        <td className="py-2 text-right font-medium">4 710 €</td>
                        <td className="py-2 text-right text-neutral-500 text-xs">10 % × 1 × PASS</td>
                      </tr>
                      <tr>
                        <td className="py-2">Abattement frais pro (min)</td>
                        <td className="py-2 text-right font-medium">509 €</td>
                        <td className="py-2 text-right text-neutral-500 text-xs">Art. 83 CGI</td>
                      </tr>
                      <tr>
                        <td className="py-2">Abattement frais pro (max)</td>
                        <td className="py-2 text-right font-medium">14 555 €</td>
                        <td className="py-2 text-right text-neutral-500 text-xs">Art. 83 CGI</td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="text-xs text-neutral-500 mt-3">
                    Dernière vérification : 1er mai 2026 — service-public.gouv.fr
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-neutral-900 mb-2">Limites connues</h3>
                <ul className="text-sm text-neutral-600 space-y-1">
                  {[
                    'Ce calculateur couvre uniquement le PERIN (PER individuel), compartiment versements volontaires déductibles. Le PERCOL et le PERO ne sont pas simulés.',
                    'Le régime TNS (Madelin) n\'est pas pris en compte — les plafonds sont différents et nécessitent le bénéfice imposable.',
                    'La mutualisation des plafonds entre conjoints (mariage ou PACS) n\'est pas simulée.',
                    'La fiscalité à la sortie (imposition de la rente ou du capital) n\'est pas simulée.',
                    'Les versements non déductibles (option de renonciation à la déduction) ne sont pas couverts.',
                    'Il est supposé que les frais professionnels sont couverts par l\'abattement forfaitaire de 10 %. Les frais réels ne sont pas gérés.',
                  ].map((l, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-neutral-400 mt-0.5">–</span>
                      <span>{l}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-primary-50 rounded-lg p-4 border border-primary-200">
                <p className="text-sm text-primary-800">
                  <strong>Méthodologie vérifiée</strong> : Les calculs ont été validés sur trois
                  cas de référence (salaire 60 000 € / TMI 30 %, dépassement plafond à 50 000 €,
                  report N-1 à TMI 41 %). Sources : service-public.gouv.fr, Art. 163 quatervicies
                  CGI. Dernière vérification : 1er mai 2026.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer disclaimer */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center text-sm text-neutral-600 space-y-2">
            <p className="italic">
              Cet outil est fourni à titre informatif uniquement. Il ne constitue pas un conseil
              fiscal ou patrimonial personnalisé. Pour toute décision d'investissement important,
              consultez un conseiller en gestion de patrimoine indépendant ou un expert-comptable.
            </p>
            <p>
              <strong>Code open-source :</strong>{' '}
              <a
                href="https://github.com/nba67000/calcpatrimoine"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:underline"
              >
                github.com/nba67000/calcpatrimoine
              </a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
