import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LegalDisclaimer from '@/components/LegalDisclaimer'
import TMICalculator from '@/components/Calculator/TMICalculator'

export const metadata: Metadata = {
  title: 'Calculateur TMI : Tranche Marginale Imposition 2026',
  description: 'Calculez votre tranche marginale d\'imposition (TMI) et votre IR net 2026. Barème officiel, quotient familial, décote. Revenus 2025, gratuit et open-source.',
  keywords: 'TMI, tranche marginale imposition, impôt sur le revenu, barème IR 2026, quotient familial, décote, calculateur impôts, revenus 2025',
  openGraph: {
    title: 'Calculateur TMI — Tranche Marginale d\'Imposition 2026',
    description: 'Calculez votre TMI et votre IR net avec le barème officiel 2026, le quotient familial et la décote.',
    type: 'article',
  },
}

export default function TMIPage() {
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
              <span className="text-neutral-900 font-medium">Tranche Marginale d'Imposition</span>
            </div>

            {/* Titre */}
            <h1 className="text-5xl font-bold text-neutral-900 mb-6 leading-tight">
              Calculateur TMI<br />
              Barème IR 2026
            </h1>

            <p className="text-xl text-neutral-700 max-w-3xl leading-relaxed">
              Calculez votre tranche marginale d'imposition et votre impôt net à partir de votre
              revenu net imposable, de votre situation familiale et du nombre d'enfants à charge.
              Barème officiel 2026 (revenus 2025), quotient familial et décote inclus.
            </p>

            {/* Trust markers */}
            <div className="flex flex-wrap gap-6 mt-8">
              <div className="flex items-center gap-2 text-sm text-neutral-600">
                <span className="text-primary-600 text-lg">✓</span>
                <span>Barème IR 2026 (LF 2026)</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-600">
                <span className="text-primary-600 text-lg">✓</span>
                <span>Quotient familial + plafonnement</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-600">
                <span className="text-primary-600 text-lg">✓</span>
                <span>Décote (Art. 197-I-4 CGI)</span>
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
          <TMICalculator />
        </div>

        {/* Explications */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-white rounded-xl border border-neutral-200 p-8 space-y-6">

            <h2 className="text-2xl font-bold text-neutral-900">
              Comment fonctionne le barème progressif ?
            </h2>

            <div className="space-y-4 text-neutral-700 leading-relaxed">
              <p>
                <strong>Principe : chaque tranche s'applique sur la fraction concernée du revenu.</strong><br />
                Un célibataire gagnant 50 000 € ne paie pas 30 % sur 50 000 €. Il paie 0 % sur les
                premiers 11 600 €, 11 % de 11 600 € à 29 579 €, et 30 % sur le reste. La TMI est le
                taux de la tranche la plus haute atteinte, pas le taux appliqué sur l'ensemble du revenu.
              </p>

              <p>
                <strong>Quotient familial : diviser pour mieux imposer.</strong><br />
                Le revenu est divisé par le nombre de parts fiscales avant d'appliquer le barème, puis
                l'impôt est multiplié par ce même nombre de parts. Cette mécanique réduit l'impôt des
                foyers avec enfants. Le gain est toutefois limité par le plafonnement du quotient familial
                (1 807 € par demi-part supplémentaire — Art. 197-IV CGI).
              </p>

              <p>
                <strong>La décote protège les revenus modestes.</strong><br />
                Si l'impôt brut reste inférieur à 1 982 € (célibataire) ou 3 277 € (couple), une décote
                s'applique automatiquement et réduit l'impôt proportionnellement (Art. 197-I-4 CGI).
                Elle s'annule progressivement pour éviter tout effet de seuil brutal.
              </p>
            </div>

            <div className="bg-neutral-50 rounded-lg p-5 border border-neutral-200">
              <h3 className="font-bold text-neutral-900 mb-3 text-sm uppercase tracking-wide">
                Barème 2026 — revenus 2025 (Art. 197 CGI, LF 2026)
              </h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-neutral-300">
                    <th className="text-left py-2 text-neutral-600 font-medium">Tranche (revenu / part)</th>
                    <th className="text-right py-2 text-neutral-600 font-medium">Taux</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  <tr>
                    <td className="py-2 text-neutral-700">Jusqu'à 11 600 €</td>
                    <td className="py-2 text-right font-bold text-neutral-500">0 %</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-neutral-700">De 11 601 € à 29 579 €</td>
                    <td className="py-2 text-right font-bold text-green-700">11 %</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-neutral-700">De 29 580 € à 84 577 €</td>
                    <td className="py-2 text-right font-bold text-yellow-700">30 %</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-neutral-700">De 84 578 € à 181 917 €</td>
                    <td className="py-2 text-right font-bold text-orange-700">41 %</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-neutral-700">Au-delà de 181 917 €</td>
                    <td className="py-2 text-right font-bold text-red-700">45 %</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Lien PER */}
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link
            href="/per/fiscalite-versement"
            className="block bg-primary-50 border-2 border-primary-200 rounded-xl p-8 hover:border-primary-400 hover:shadow-lg transition-all group"
          >
            <div className="flex-1">
              <h3 className="text-xl font-bold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors">
                Calculez votre économie d'impôt PER
              </h3>
              <p className="text-neutral-700 mb-4 leading-relaxed">
                Connaissant maintenant votre TMI, simulez l'économie d'impôt que vous réaliseriez
                en versant sur un Plan d'Épargne Retraite individuel (déductibilité Art. 163 quatervicies CGI).
              </p>
              <div className="flex items-center gap-2 text-primary-600 font-medium group-hover:gap-3 transition-all">
                <span>Simulateur PER — bientôt disponible</span>
                <span>→</span>
              </div>
            </div>
          </Link>
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
                      href: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000051212954',
                      label: 'Article 197 du CGI',
                      desc: 'Barème progressif IR 2026 (revenus 2025), décote, plafonnement QF',
                    },
                    {
                      href: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006302756',
                      label: 'Article 194 du CGI',
                      desc: 'Quotient familial : parts de base et parts pour enfants à charge',
                    },
                    {
                      href: 'https://www.legifrance.gouv.fr/codes/id/LEGISCTA000006179579/',
                      label: 'Article 195 du CGI',
                      desc: 'Demi-parts supplémentaires : parent isolé (case T), invalidité, etc.',
                    },
                    {
                      href: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006302765',
                      label: 'Article 196 du CGI',
                      desc: 'Définition des enfants à charge fiscalement',
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
                <h3 className="text-lg font-bold text-neutral-900 mb-3">Documentation officielle</h3>
                <ul className="space-y-3 text-sm">
                  {[
                    {
                      href: 'https://bofip.impots.gouv.fr/bofip/2491-PGP.html/identifiant=BOI-IR-LIQ-20-10-20260407',
                      label: 'BOFiP BOI-IR-LIQ-20-10',
                      desc: 'Barème de l\'impôt sur le revenu 2026 — publié le 07/04/2026',
                    },
                    {
                      href: 'https://bofip.impots.gouv.fr/bofip/2494-PGP.html/identifiant=BOI-IR-LIQ-20-20-20-20260407',
                      label: 'BOFiP BOI-IR-LIQ-20-20-20',
                      desc: 'Plafonnement des effets du quotient familial',
                    },
                    {
                      href: 'https://bofip.impots.gouv.fr/bofip/2495-PGP.html/identifiant=BOI-IR-LIQ-20-20-30-20250414',
                      label: 'BOFiP BOI-IR-LIQ-20-20-30',
                      desc: 'Décote — paramètres 2026 (indexation +0,9 % sur la base 2025)',
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
                <h3 className="text-lg font-bold text-neutral-900 mb-2">Limites connues</h3>
                <ul className="text-sm text-neutral-600 space-y-1">
                  {[
                    'Le revenu saisi est le revenu net imposable (après abattement 10 % ou frais réels).',
                    'Les revenus soumis à taux fixe (plus-values mobilières au PFU, etc.) ne sont pas pris en compte.',
                    'Les réductions et crédits d\'impôt ne sont pas simulés.',
                    'La contribution sur les hauts revenus (CEHR — Art. 223 sexies CGI) n\'est pas calculée.',
                    'La résidence alternée (demi-parts à 0,25) n\'est pas gérée.',
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
                  <strong>Méthodologie vérifiée</strong> : Les calculs ont été validés sur trois cas
                  de référence issus des barèmes officiels LF 2026, dont un cas de plafonnement du
                  quotient familial. Dernière vérification : 19 avril 2026.
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
              fiscal personnalisé. Pour toute décision patrimoniale importante, consultez un
              conseiller en gestion de patrimoine indépendant ou un expert-comptable.
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
