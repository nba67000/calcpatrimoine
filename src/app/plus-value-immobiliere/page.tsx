import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LegalDisclaimer from '@/components/LegalDisclaimer'
import PlusValueImmobiliereCalculator from '@/components/Calculator/PlusValueImmobiliereCalculator'

export const metadata: Metadata = {
  title: 'Plus-value immobilière : calculateur IR et PS 2026',
  description: 'Calculez l\'impôt sur votre plus-value immobilière (19 % IR + 17,2 % PS). Abattements par durée, surtaxe, forfait travaux. Résidence secondaire et locatif.',
  keywords: 'plus-value immobilière, calculateur, impôt, prélèvements sociaux, abattement, durée détention, résidence secondaire, surtaxe',
  openGraph: {
    title: 'Calculateur plus-value immobilière — IR + PS + surtaxe',
    description: 'Simulez la fiscalité de votre cession immobilière : 19 % IR, 17,2 % PS, abattements pour durée, surtaxe éventuelle.',
    type: 'article',
  },
}

const SOURCES = [
  { href: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000044989702', label: 'Article 150 U du CGI', desc: 'Champ d\'application — plus-values immobilières des particuliers' },
  { href: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000036382543', label: 'Article 150 VB du CGI', desc: 'Frais d\'acquisition (forfait 7,5 %) et travaux (forfait 15 % si > 5 ans)' },
  { href: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000044994142', label: 'Article 150 VC du CGI', desc: 'Abattement IR : 6 %/an de la 6e à la 21e année, 4 % la 22e — exonération à 22 ans' },
  { href: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000023374015', label: 'Article 150 VD du CGI', desc: 'Abattement PS : 1,65 %/an (6e-21e), 1,60 % (22e), 9 %/an (23e-29e) — exonération à 30 ans' },
  { href: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000028432433', label: 'Article 1609 nonies G du CGI', desc: 'Taxe additionnelle (surtaxe) sur plus-values > 50 000 € — de 2 % à 6 %' },
  { href: 'https://www.service-public.gouv.fr/particuliers/vosdroits/F10864', label: 'Service-Public.fr — Plus-value immobilière', desc: 'Synthèse officielle des règles applicables (consulté le 02/05/2026)' },
]

const ABATTEMENTS_IR = [
  { annees: 5,  taux: '0 %' },
  { annees: 6,  taux: '6 %' },
  { annees: 10, taux: '30 %' },
  { annees: 15, taux: '60 %' },
  { annees: 20, taux: '90 %' },
  { annees: 21, taux: '96 %' },
  { annees: 22, taux: '100 % (exo.)' },
]

const ABATTEMENTS_PS = [
  { annees: 5,  taux: '0 %' },
  { annees: 6,  taux: '1,65 %' },
  { annees: 15, taux: '16,5 %' },
  { annees: 22, taux: '28 %' },
  { annees: 25, taux: '55 %' },
  { annees: 29, taux: '91 %' },
  { annees: 30, taux: '100 % (exo.)' },
]

export default function PlusValueImmobilierePage() {
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
            <span className="text-neutral-600">Plus-value immobilière</span>
          </nav>

          <div className="h-[2px] w-10 bg-accent-400 mb-6" />

          <h1 className="font-serif text-5xl font-bold text-neutral-900 mb-4 leading-tight">
            Plus-value immobilière :<br />
            calculateur 2026
          </h1>

          <p className="text-lg text-neutral-600 max-w-3xl leading-relaxed mb-8">
            Calculez l&apos;impôt sur votre cession immobilière: IR 19%, prélèvements sociaux
            17,2%, abattements pour durée de détention, surtaxe. Résidence secondaire, bien locatif.
          </p>

          <div className="flex flex-wrap gap-x-8 gap-y-2">
            {[
              'IR 19 % + PS 17,2 %',
              'Abattements 6e–30e année',
              'Surtaxe Art. 1609 nonies G',
              'Forfait frais 7,5 % et travaux 15 %',
              'Zéro donnée conservée',
            ].map((t) => (
              <span key={t} className="font-mono text-xs text-neutral-500">{t}</span>
            ))}
          </div>
        </section>

        {/* Disclaimer */}
        <div className="max-w-6xl mx-auto px-6 pb-4">
          <LegalDisclaimer />
        </div>

        {/* Calculateur */}
        <div className="max-w-6xl mx-auto px-6 py-4 pb-12">
          <PlusValueImmobiliereCalculator />
        </div>

        {/* Explications */}
        <section className="max-w-4xl mx-auto px-6 py-8">
          <div className="bg-white border border-neutral-200 p-8 space-y-6">
            <h2 className="font-serif text-2xl font-bold text-neutral-900">Comment ça marche?</h2>

            <div className="space-y-4 text-neutral-700 leading-relaxed">
              <p>
                <strong>La plus-value brute: prix de vente moins prix de revient ajusté.</strong>{' '}
                Le prix de revient ajusté inclut le prix d&apos;acquisition, les frais (droits d&apos;enregistrement + frais de notaire,
                en forfait 7,5% ou en réel) et les travaux (forfait 15% si détention&gt;5ans, ou montant réel justifié).
              </p>

              <p>
                <strong>Deux abattements différents selon IR et prélèvements sociaux.</strong>{' '}
                L&apos;IR (19%) et les PS (17,2%) n&apos;utilisent pas le même barème d&apos;abattement.
                L&apos;IR est exonéré dès 22ans de détention; les prélèvements sociaux seulement à 30ans.
              </p>

              <p>
                <strong>La surtaxe s&apos;ajoute si la plus-value nette dépasse 50000€.</strong>{' '}
                Calculée sur la même base que l&apos;IR 19%, elle est prélevée par le notaire lors de la cession.
                Son taux varie de 2% à 6% selon le montant, avec un mécanisme de tempérament à chaque seuil.
              </p>

              <p>
                <strong>Exonérations principales.</strong>{' '}
                La résidence principale est toujours exonérée. Le prix de cession≤15000€ également.
                La 1ère cession d&apos;une résidence secondaire est exonérée sous conditions: non-propriétaire de la résidence
                principale depuis 4ans et remploi du produit dans les 24mois (Art.150 U II 7° CGI).
              </p>
            </div>
          </div>
        </section>

        {/* Tableau abattements */}
        <section className="max-w-4xl mx-auto px-6 py-4 pb-8">
          <div className="bg-white border border-neutral-200 p-8">
            <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-6">
              Barème des abattements pour durée de détention
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-500 mb-3">IR — 19 %</h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-neutral-200">
                      <th className="text-left py-2 text-neutral-500 font-mono text-xs">Durée</th>
                      <th className="text-right py-2 text-neutral-500 font-mono text-xs">Abattement cumulé</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ABATTEMENTS_IR.map(({ annees, taux }) => (
                      <tr key={annees} className="border-b border-neutral-100">
                        <td className="py-1.5 text-neutral-700">{annees} ans</td>
                        <td className={`py-1.5 text-right font-medium ${taux.includes('exo') ? 'text-green-700' : 'text-neutral-900'}`}>
                          {taux}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="text-xs text-neutral-500 mt-2">Source : Art. 150 VC CGI</p>
              </div>

              <div>
                <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-500 mb-3">Prélèvements sociaux — 17,2 %</h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-neutral-200">
                      <th className="text-left py-2 text-neutral-500 font-mono text-xs">Durée</th>
                      <th className="text-right py-2 text-neutral-500 font-mono text-xs">Abattement cumulé</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ABATTEMENTS_PS.map(({ annees, taux }) => (
                      <tr key={annees} className="border-b border-neutral-100">
                        <td className="py-1.5 text-neutral-700">{annees} ans</td>
                        <td className={`py-1.5 text-right font-medium ${taux.includes('exo') ? 'text-green-700' : 'text-neutral-900'}`}>
                          {taux}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="text-xs text-neutral-500 mt-2">Source : Art. 150 VD CGI</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-4xl mx-auto px-6 py-4 pb-8">
          <div className="bg-white border border-neutral-200 p-8 space-y-6">
            <h2 className="font-serif text-2xl font-bold text-neutral-900">Questions fréquentes</h2>

            <div className="space-y-5">
              {[
                {
                  q: 'Le forfait travaux de 15 % est-il toujours applicable?',
                  r: 'Non. Le forfait de 15 % n\'est utilisable que si vous détenez le bien depuis plus de 5 ans complets ET que les travaux concernés n\'ont pas déjà été déduits des revenus fonciers. Si vous êtes en mesure de justifier un montant réel supérieur, il est préférable d\'utiliser les frais réels.',
                },
                {
                  q: 'Quelle différence entre IR et prélèvements sociaux dans les abattements?',
                  r: 'Les deux taxes utilisent des barèmes d\'abattement différents : l\'IR est exonéré à 22 ans de détention, mais les prélèvements sociaux (CSG/CRDS) ne sont exonérés qu\'à 30 ans. Une cession après 23 ans peut donc être exonérée d\'IR (19 %) tout en restant partiellement imposée aux PS.',
                },
                {
                  q: 'La surtaxe s\'applique-t-elle avant ou après abattements?',
                  r: 'La surtaxe s\'applique sur la même base que l\'IR, c\'est-à-dire sur la plus-value nette après abattement pour durée de détention. Si la plus-value nette imposable (base IR) est inférieure ou égale à 50 000 €, aucune surtaxe n\'est due.',
                },
                {
                  q: 'Qui calcule et prélève les impôts?',
                  r: 'C\'est le notaire qui calcule et verse l\'ensemble des prélèvements (IR 19 %, PS 17,2 %, surtaxe éventuelle) au Trésor Public lors de la signature de l\'acte de vente. Le vendeur perçoit directement le prix net après déduction.',
                },
                {
                  q: 'Que se passe-t-il en cas de moins-value?',
                  r: 'Aucun impôt n\'est dû. En revanche, la moins-value immobilière d\'un particulier n\'est pas imputable sur d\'autres revenus ni reportable sur des plus-values futures. Elle est définitivement perdue fiscalement.',
                },
              ].map(({ q, r }) => (
                <div key={q} className="border-l-2 border-accent-400 pl-4">
                  <p className="font-bold text-neutral-900 mb-1">{q}</p>
                  <p className="text-sm text-neutral-700 leading-relaxed">{r}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Méthodologie et sources */}
        <section className="max-w-4xl mx-auto px-6 py-4 pb-16">
          <div className="bg-white border border-neutral-200 p-8">
            <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-6">
              Méthodologie et sources officielles
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-500 mb-3">Formules de calcul</h3>
                <div className="bg-neutral-50 border border-neutral-200 p-5 grid md:grid-cols-2 gap-x-8 gap-y-3">
                  {[
                    ['Plus-value brute', 'Prix de cession − Prix de revient ajusté'],
                    ['Prix de revient ajusté', 'Prix achat + frais + travaux'],
                    ['Forfait frais', '7,5 % du prix d\'acquisition'],
                    ['Forfait travaux (> 5 ans)', '15 % du prix d\'acquisition'],
                    ['Abattement IR (6e-21e an)', '6 % × (n − 5)'],
                    ['Abattement IR (22e an)', '6 % × 16 + 4 % = 100 %'],
                    ['Abattement PS (6e-21e an)', '1,65 % × (n − 5)'],
                    ['Abattement PS (22e an)', '28 % ; + 9 %/an jusqu\'à 30 ans'],
                    ['IR', 'PV nette IR × 19 %'],
                    ['Prélèvements sociaux', 'PV nette PS × 17,2 %'],
                    ['Surtaxe (si PV nette IR > 50 000 €)', '2 % à 6 % avec tempérament par seuil'],
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
                  {SOURCES.map((s) => (
                    <li key={s.href} className="flex items-start gap-3">
                      <span className="text-accent-400 mt-0.5 shrink-0">—</span>
                      <div>
                        <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline font-medium">
                          {s.label}
                        </a>
                        <p className="text-neutral-500 text-xs mt-0.5">{s.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-l-4 border-primary-200 bg-primary-50 px-4 py-3">
                <p className="text-sm text-primary-800">
                  <strong>Millésime fiscal: 2026.</strong> Barèmes applicables aux cessions réalisées en 2026.
                  Dernière vérification des sources: 02/05/2026. Ce calculateur est indicatif;
                  le notaire calcule et prélève les impôts définitifs lors de la cession.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-neutral-200 mt-8 pt-6 text-center">
            <p className="font-mono text-xs text-neutral-400 leading-relaxed">
              Outil indicatif uniquement. Ne constitue pas un conseil fiscal personnalisé.
              Consultez un notaire ou un conseiller en gestion de patrimoine avant toute décision.{' '}
              <a href="https://github.com/nba67000/calculpatrimoine" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                Code source ouvert
              </a>
            </p>
          </div>
        </section>

      </div>
      <Footer />
    </>
  )
}
