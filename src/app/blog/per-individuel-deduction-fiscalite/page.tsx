import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'PER individuel : ce que vous gagnez à l\'entrée, ce que vous payez à la sortie',
  description: 'Déduction fiscale, plafond épargne retraite, fiscalité des retraits en rente ou capital. Guide complet avec exemples chiffrés et comparaison PER vs assurance-vie.',
  keywords: 'PER individuel, déduction fiscale, plafond épargne retraite, fiscalité sortie PER, rente ou capital, PER vs assurance-vie',
  openGraph: {
    title: 'PER individuel : ce que vous gagnez à l\'entrée, ce que vous payez à la sortie',
    description: 'Vous versez 5 000€ sur un PER. L\'État vous rembourse 1 500€. Avantageux ? Pas si sûr.',
    type: 'article',
    publishedTime: '2026-05-05',
  },

  alternates: { canonical: 'https://calculpatrimoine.fr/blog/per-individuel-deduction-fiscalite' },
}

export default function ArticlePERPage() {
  return (
    <>
      <Header />
      <div className="h-[3px] bg-accent-400 w-full" />
      <article style={{ backgroundColor: '#F7F3EC' }}>

        <header>
          <div className="max-w-4xl mx-auto px-6 py-12">
            <nav className="flex items-center gap-2 font-mono text-xs text-neutral-400 mb-8">
              <Link href="/blog" className="hover:text-primary-600 transition-colors">Blog</Link>
              <span>/</span>
              <span className="text-neutral-600">PER individuel - fiscalité</span>
            </nav>
            <div className="h-[2px] w-10 bg-accent-400 mb-6" />
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-neutral-900 mb-6 leading-tight">
              PER individuel : ce que vous gagnez à l&apos;entrée, ce que vous payez à la sortie
            </h1>
            <div className="flex flex-wrap gap-4 font-mono text-xs text-neutral-500">
              <span>Fiscalité · Retraite</span>
              <span>·</span>
              <span>14 min de lecture</span>
              <span>·</span>
              <span>5 mai 2026</span>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-6 pb-16">

          {/* Intro */}
          <div className="mb-12">
            <p className="text-xl text-neutral-700 leading-relaxed mb-6">
              Imaginons que cette année, vous versez 5 000 euros sur un PER individuel à 30 % de TMI.
              L&apos;économie immédiate : 1 500 euros. Ce que ce chiffre ne montre pas : cet argent sera
              imposé à la sortie, quand vous le retirerez à la retraite. Le bilan dépend donc de
              votre TMI aujourd&apos;hui comparée à celle prévue à la retraite.
            </p>
            <p className="text-neutral-700">
              Dans cet article : les mécanismes exacts à l&apos;entrée et à la sortie, les plafonds,
              et une comparaison chiffrée avec l&apos;assurance-vie.
            </p>
          </div>

          {/* Disclaimer */}
          <div className="border-l-4 border-warning-400 bg-warning-50 px-5 py-4 mb-12">
            <p className="font-mono text-xs font-bold text-warning-800 uppercase tracking-wider mb-1">Avertissement</p>
            <p className="text-sm text-warning-700 leading-relaxed">
              Cet article décrit les mécanismes fiscaux du PER individuel et présente des exemples chiffrés. Il ne constitue pas un conseil en investissement ou un conseil fiscal personnalisé.
            </p>
          </div>

          {/* CTA */}
          <div className="bg-primary-700 px-8 py-6 mb-12">
            <p className="font-mono text-xs text-primary-300 uppercase tracking-wider mb-2">Outil associé</p>
            <p className="text-white font-bold text-lg mb-1">Calculez votre économie d&apos;impôt</p>
            <p className="text-primary-200 text-sm mb-4">
              Notre calculateur PER simule votre économie à l&apos;entrée et la fiscalité à la sortie selon votre taux d&apos;imposition actuel et prévisible à la retraite.
            </p>
            <Link href="/per-individuel" className="inline-block bg-surface-card text-primary-700 px-6 py-2.5 font-medium text-sm hover:bg-neutral-100 transition-colors font-mono">
              Accéder au calculateur →
            </Link>
          </div>

          {/* Lexique */}
          <div className="bg-surface-card border border-neutral-200 p-6 mb-12">
            <p className="font-mono text-xs text-neutral-400 uppercase tracking-wider mb-5">Lexique - avant de commencer</p>
            <div className="space-y-5">
              {[
                {
                  terme: 'Le taux marginal d\'imposition (TMI)',
                  def: "L'impôt sur le revenu en France est progressif : vous ne payez pas le même taux sur chaque euro gagné. Les revenus sont découpés en tranches, chacune taxée à un taux différent. Le taux marginal, c'est celui qui s'applique sur votre dernière tranche de revenus. En 2025, les tranches sont 0 %, 11 %, 30 %, 41 % et 45 %. Un salarié qui gagne 45 000 euros nets imposables est à 30 % de taux marginal. Cela ne signifie pas qu'il paie 30 % sur l'ensemble de son salaire, mais sur la partie qui dépasse 28 797 euros.",
                },
                {
                  terme: 'Le PASS (Plafond Annuel de la Sécurité Sociale)',
                  def: "Le PASS sert de base pour calculer le montant des indemnités journalières pour maladie, accident du travail ou maternité, les pensions d'invalidité, les retraites, et d'autres prestations. En 2025, le PASS vaut 47 100 euros. Dans cet article, quand il est indiqué « 10 % du PASS », cela signifie 10 % × 47 100 euros = 4 710 euros.",
                },
                {
                  terme: 'Le PFU (Prélèvement Forfaitaire Unique)',
                  def: "C'est un taux d'imposition fixe de 30 % qui s'applique sur les gains financiers : intérêts, dividendes, plus-values. Il se décompose en 12,8 % d'impôt sur le revenu et 17,2 % de prélèvements sociaux. On l'appelle aussi « flat tax ». Son avantage : il est simple et prévisible, quel que soit votre niveau de revenus.",
                },
                {
                  terme: 'Les prélèvements sociaux',
                  def: "Des cotisations prélevées sur les revenus du capital - épargne, placements, loyers - au taux global de 17,2 %. Ils se décomposent principalement en CSG (9,2 %) et CRDS (0,5 %), complétés d'autres contributions. Ils s'ajoutent à l'impôt sur le revenu et sont dus même si vous n'êtes pas imposable sur le revenu.",
                },
                {
                  terme: 'La rente viagère',
                  def: "Un revenu mensuel versé jusqu'à votre décès, en échange d'un capital que vous cédez définitivement à un assureur. L'assureur prend le risque de vous payer longtemps si vous vivez longtemps. En contrepartie, si vous décédez tôt, vous n'aurez pas récupéré l'équivalent de votre capital.",
                },
              ].map(({ terme, def }) => (
                <div key={terme} className="border-b border-neutral-100 pb-5 last:border-0 last:pb-0">
                  <p className="font-bold text-sm text-neutral-900 mb-1.5">{terme}</p>
                  <p className="text-sm text-neutral-600 leading-relaxed">{def}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Sommaire */}
          <nav className="bg-surface-card border border-neutral-200 p-6 mb-12">
            <p className="font-mono text-xs uppercase tracking-wider text-neutral-500 mb-4">Sommaire</p>
            <ol className="space-y-2 text-sm font-mono">
              <li><a href="#fonctionnement" className="text-primary-600 hover:underline">1. Ce que le PER fait exactement</a></li>
              <li><a href="#deduction" className="text-primary-600 hover:underline">2. La déduction à l&apos;entrée : calcul et exemples</a></li>
              <li><a href="#plafond" className="text-primary-600 hover:underline">3. Le plafond : combien puis-je déduire ?</a></li>
              <li><a href="#sortie" className="text-primary-600 hover:underline">4. La fiscalité à la sortie : rente ou capital</a></li>
              <li><a href="#idees-recues" className="text-primary-600 hover:underline">5. Les idées reçues qui coûtent cher</a></li>
              <li><a href="#per-vs-av" className="text-primary-600 hover:underline">6. PER vs assurance-vie : 3 profils comparés</a></li>
              <li><a href="#cas-concrets" className="text-primary-600 hover:underline">7. Calculs complets chiffrés</a></li>
            </ol>
          </nav>

          {/* SECTION 1 */}
          <section id="fonctionnement" className="mb-16">
            <h2 className="font-serif text-3xl font-bold text-neutral-900 mb-6">Ce que le PER fait exactement</h2>

            <p className="text-neutral-700 mb-4">
              Le PER individuel (Plan d&apos;Épargne Retraite) est un compte d&apos;épargne longue durée créé en 2019 pour remplacer d&apos;anciens produits devenus complexes, comme le PERP ou le contrat Madelin. Vous y versez de l&apos;argent pendant votre vie active. Cet argent est bloqué jusqu&apos;à votre départ à la retraite. Vous le récupérez ensuite, selon des modalités que vous choisissez.
            </p>

            <p className="text-neutral-700 mb-4">
              Sa particularité par rapport à un livret bancaire classique : l&apos;argent que vous versez réduit votre impôt immédiatement. Si vous payez 4 000 euros d&apos;impôts cette année et que vous versez 5 000 euros sur votre PER, votre facture fiscale baisse de 1 500 euros. Vous ne payez plus que 2 500 euros.
            </p>

            <p className="text-neutral-700 mb-6">
              En contrepartie, quand vous retirerez cet argent à la retraite, il sera imposé à ce moment-là. Le PER ne supprime pas l&apos;impôt. Il le déplace dans le temps.
            </p>

            <div className="bg-surface-card border border-neutral-200 p-6 my-6">
              <p className="font-mono text-xs text-neutral-400 uppercase tracking-wider mb-5">Les trois phases d&apos;un PER</p>
              <div className="space-y-5">
                {[
                  {
                    num: '1',
                    phase: 'Vous versez',
                    desc: "Vous alimentez votre PER. Ce montant est retranché de votre revenu imposable avant que l'impôt soit calculé. Votre impôt de l'année baisse. Une partie de ce versement vient donc indirectement de l'impôt que vous n'avez pas payé.",
                  },
                  {
                    num: '2',
                    phase: 'L\'argent fructifie',
                    desc: "Votre épargne est investie, selon votre choix, sur des fonds garantis sans risque de perte (appelés fonds en euros) ou sur des placements en actions et obligations (appelés unités de compte, avec un risque de perte en capital). Les gains générés ne sont pas imposés chaque année. Ils s'accumulent sans ponction annuelle.",
                  },
                  {
                    num: '3',
                    phase: 'Vous retirez à la retraite',
                    desc: "Vous récupérez votre épargne. Tout ce que vous avez versé et qui avait été déduit de vos impôts est alors réimposé, au taux en vigueur à ce moment-là. Les gains accumulés sont également imposés, selon un régime différent détaillé plus bas.",
                  },
                ].map(({ num, phase, desc }) => (
                  <div key={num} className="flex items-start gap-5 border-b border-neutral-100 pb-5 last:border-0 last:pb-0">
                    <span className="font-mono text-2xl font-bold text-primary-200 shrink-0 w-7 mt-0.5">{num}</span>
                    <div>
                      <p className="font-bold text-sm text-neutral-900 mb-1.5">{phase}</p>
                      <p className="text-sm text-neutral-600 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-l-4 border-neutral-300 bg-surface-card px-5 py-4 my-6">
              <p className="text-sm text-neutral-700 leading-relaxed">
                L&apos;idée centrale est la suivante. Si vous payez plus d&apos;impôts aujourd&apos;hui qu&apos;à la retraite, ce qui est fréquent quand on passe d&apos;un salaire de cadre à une pension, le PER est mathématiquement avantageux. Si votre taux d&apos;imposition reste identique, l&apos;avantage est bien moindre.
              </p>
            </div>

            <p className="text-xs text-neutral-500 font-mono">
              Source :{' '}
              <span className="font-medium text-neutral-700">Article L224-1 du Code monétaire et financier</span>
            </p>
          </section>

          {/* SECTION 2 */}
          <section id="deduction" className="mb-16">
            <h2 className="font-serif text-3xl font-bold text-neutral-900 mb-6">La déduction à l&apos;entrée : calcul et exemples</h2>

            <p className="text-neutral-700 mb-4">
              Quand vous versez de l&apos;argent sur un PER, ce montant est soustrait de votre revenu avant que l&apos;impôt soit calculé. Vous payez donc l&apos;impôt sur un revenu plus faible, ce qui réduit directement votre facture fiscale.
            </p>

            <p className="text-neutral-700 mb-6">
              L&apos;économie réalisée dépend de votre taux marginal d&apos;imposition. Plus ce taux est élevé, plus le PER est efficace à l&apos;entrée. La formule est simple.
            </p>

            <div className="bg-surface-card border border-neutral-200 p-5 my-6">
              <p className="font-mono text-xs text-neutral-400 uppercase tracking-wider mb-2">Formule</p>
              <p className="font-mono text-sm text-neutral-800">Impôt économisé = Montant versé × Votre taux marginal</p>
              <p className="text-xs text-neutral-400 mt-3">Exemple : vous versez 5 000 euros et votre taux marginal est de 30 %. Vous économisez 5 000 × 30 % = 1 500 euros d&apos;impôt.</p>
            </div>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-neutral-300">
                    <th className="py-2 text-left text-neutral-500 font-mono text-xs">Taux marginal</th>
                    <th className="py-2 text-left text-neutral-500 font-mono text-xs">Profil indicatif</th>
                    <th className="py-2 text-left text-neutral-500 font-mono text-xs">Versement</th>
                    <th className="py-2 text-left text-neutral-500 font-mono text-xs">Impôt économisé</th>
                    <th className="py-2 text-left text-neutral-500 font-mono text-xs">Coût réel du versement</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 font-mono text-xs">
                  {[
                    { tmi: '0 %',  profil: 'Non imposable',      v: '5 000€', eco: '0€',      cout: '5 000€' },
                    { tmi: '11 %', profil: 'Revenus modestes',   v: '5 000€', eco: '550€',    cout: '4 450€' },
                    { tmi: '30 %', profil: 'Cadre intermédiaire',v: '5 000€', eco: '1 500€',  cout: '3 500€' },
                    { tmi: '41 %', profil: 'Cadre supérieur',    v: '5 000€', eco: '2 050€',  cout: '2 950€' },
                    { tmi: '45 %', profil: 'Hauts revenus',      v: '5 000€', eco: '2 250€',  cout: '2 750€' },
                  ].map(r => (
                    <tr key={r.tmi}>
                      <td className="py-2 font-bold text-neutral-900">{r.tmi}</td>
                      <td className="py-2 text-neutral-500">{r.profil}</td>
                      <td className="py-2">{r.v}</td>
                      <td className="py-2 text-primary-600">{r.eco}</td>
                      <td className="py-2 font-bold text-neutral-900">{r.cout}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-neutral-600 text-sm mb-8 leading-relaxed">
              Le coût réel, c&apos;est ce que ce versement vous coûte effectivement après la réduction d&apos;impôt. À 30 % de taux marginal, verser 5 000 euros ne vous coûte en réalité que 3 500 euros. Les 1 500 euros restants proviennent de l&apos;impôt que vous n&apos;avez pas payé cette année.
            </p>

            <div className="border-l-4 border-warning-400 bg-warning-50 px-5 py-4 mb-3">
              <p className="font-mono text-xs text-warning-700 uppercase tracking-wider mb-1">Ce qu&apos;on entend souvent</p>
              <p className="text-warning-800 text-sm font-medium">&laquo;&nbsp;Avec un PER, l&apos;État me donne de l&apos;argent.&nbsp;&raquo;</p>
            </div>
            <div className="border-l-4 border-primary-400 bg-primary-50 px-5 py-4 mb-6">
              <p className="font-mono text-xs text-primary-600 uppercase tracking-wider mb-1">Ce qui se passe réellement</p>
              <p className="text-primary-800 text-sm leading-relaxed">
                L&apos;État ne vous donne rien. Il vous accorde une avance : vous ne payez pas cet impôt maintenant, mais vous le paierez à la retraite quand vous retirerez votre argent. C&apos;est un décalage dans le temps, pas une remise.
              </p>
            </div>

            <p className="text-xs text-neutral-500 font-mono">
              Source :{' '}
              <span className="font-medium text-neutral-700">Article 163 quatervicies du CGI</span>
            </p>
          </section>

          {/* SECTION 3 */}
          <section id="plafond" className="mb-16">
            <h2 className="font-serif text-3xl font-bold text-neutral-900 mb-6">Le plafond : combien puis-je déduire ?</h2>

            <p className="text-neutral-700 mb-4">
              Vous ne pouvez pas déduire une somme illimitée. Il existe un plafond annuel de déduction, qui dépend de vos revenus. La bonne nouvelle, c&apos;est que ce plafond est déjà calculé pour vous. Il figure sur votre avis d&apos;imposition, page 3, dans la rubrique intitulée &laquo;&nbsp;Plafonds pour les cotisations d&apos;épargne retraite&nbsp;&raquo;.
            </p>

            <div className="border-l-4 border-accent-400 bg-accent-100 px-5 py-4 mb-8">
              <p className="font-bold text-sm text-neutral-900 mb-1">Avant de calculer quoi que ce soit</p>
              <p className="text-sm text-neutral-700 leading-relaxed">
                Ouvrez votre avis d&apos;imposition. Le montant que vous pouvez déduire cette année y est indiqué directement. Vous n&apos;avez pas besoin de faire le calcul vous-même.
              </p>
            </div>

            <h3 className="font-bold text-neutral-900 mb-3">Comment ce plafond est calculé</h3>

            <p className="text-neutral-700 mb-4">
              Le plafond est égal à 10 % de vos revenus professionnels de l&apos;année précédente. Supposons que vous ayez gagné 30 000 euros en 2024. Votre plafond 2025 sera de 3 000 euros. Mais 3 000 euros est inférieur au minimum garanti de 4 637 euros. Vous pourrez donc déduire 4 637 euros, même si le calcul de base donnait moins. À l&apos;inverse, si vous avez gagné 500 000 euros, le calcul donnerait 50 000 euros. Mais le plafond maximum est de 37 094 euros. Vous ne pourrez pas dépasser ce montant, quelle que soit la hauteur de vos revenus.
            </p>

            <p className="text-neutral-700 mb-6">
              Ces bornes sont exprimées en pourcentage du PASS (Plafond Annuel de la Sécurité Sociale), qui vaut 47 100 euros en 2025. Quand un texte de loi indique &laquo;&nbsp;10 % du PASS&nbsp;&raquo;, cela signifie concrètement 10 % × 47 100 euros, soit 4 710 euros.
            </p>

            <div className="bg-neutral-50 border border-neutral-200 p-5 my-6">
              <p className="font-mono text-xs text-neutral-400 uppercase tracking-wider mb-3">Plafond 2025, calculé sur les revenus de 2024</p>
              <div className="font-mono text-sm space-y-2 text-neutral-800">
                <p>Plafond = 10 % de vos revenus professionnels 2024</p>
                <div className="border-t border-neutral-200 mt-3 pt-3 space-y-1 text-xs text-neutral-500">
                  <p>Minimum garanti : 4 637 euros (si vos revenus sont faibles, vous pouvez quand même déduire au moins cette somme)</p>
                  <p>Maximum autorisé : 37 094 euros (même avec des revenus très élevés, la déduction ne peut pas dépasser ce plafond)</p>
                </div>
              </div>
            </div>

            <h3 className="font-bold text-neutral-900 mb-3 mt-8">Exemples concrets</h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
              {[
                { revenu: 'Revenus 2024 : 25 000€', plafond: 'Calcul : 2 500€', note: 'Inférieur au minimum garanti. Le plafond appliqué est de 4 637 euros.' },
                { revenu: 'Revenus 2024 : 60 000€', plafond: 'Calcul : 6 000€', note: 'Situé entre le minimum et le maximum. Vous pouvez déduire 6 000 euros.' },
                { revenu: 'Revenus 2024 : 400 000€', plafond: 'Calcul : 40 000€', note: 'Supérieur au maximum autorisé. La déduction est plafonnée à 37 094 euros.' },
              ].map(ex => (
                <div key={ex.revenu} className="bg-surface-card border border-neutral-200 p-4">
                  <p className="font-mono text-xs text-neutral-400 uppercase mb-2">{ex.revenu}</p>
                  <p className="font-bold text-sm text-primary-700 mb-2">{ex.plafond}</p>
                  <p className="text-xs text-neutral-500 leading-relaxed">{ex.note}</p>
                </div>
              ))}
            </div>

            <div className="border-l-4 border-accent-400 bg-accent-100 px-5 py-4 my-6">
              <p className="font-bold text-sm text-neutral-900 mb-1.5">Les plafonds non utilisés se cumulent sur 5 ans (depuis la loi de finances 2026)</p>
              <p className="text-sm text-neutral-700 leading-relaxed">
                Si vous n&apos;avez pas versé le maximum les cinq dernières années, vous pouvez rattraper le retard cette année. Votre avis d&apos;imposition indique le plafond cumulé disponible, pas seulement celui de l&apos;année en cours. Beaucoup de personnes ont un solde disponible bien plus élevé qu&apos;elles ne le supposent.
              </p>
            </div>

            <div className="bg-neutral-50 border border-neutral-200 p-5 my-6">
              <p className="font-mono text-xs text-neutral-400 uppercase tracking-wider mb-3">Cas pratique - salarié, 60 000 euros de revenus en 2024</p>
              <div className="font-mono text-sm space-y-2 text-neutral-800">
                <p>Plafond 2025 : 10 % × 60 000 euros = 6 000 euros</p>
                <p>Plafond 2024 non utilisé : 5 500 euros</p>
                <p>Plafond 2023 non utilisé : 5 200 euros</p>
                <p className="font-bold text-primary-700 pt-2 border-t border-neutral-200 mt-2">
                  Plafond disponible total cette année : 16 700 euros
                </p>
              </div>
            </div>

            <p className="text-xs text-neutral-500 font-mono">
              Source :{' '}
              <span className="font-medium text-neutral-700">Article 163 quatervicies du CGI</span>
            </p>
          </section>

          {/* SECTION 4 */}
          <section id="sortie" className="mb-16">
            <h2 className="font-serif text-3xl font-bold text-neutral-900 mb-6">La fiscalité à la sortie : rente ou capital</h2>

            <p className="text-neutral-700 mb-6">
              À la retraite, vous choisissez comment récupérer votre épargne. Deux options s&apos;offrent à vous, et la fiscalité n&apos;est pas la même selon celle que vous retenez.
            </p>

            <h3 className="font-serif text-xl font-bold text-neutral-900 mb-4">Sortie en capital</h3>

            <p className="text-neutral-700 mb-4">
              Vous retirez votre épargne en une fois ou progressivement. L&apos;administration fiscale distingue deux catégories dans votre épargne, chacune imposée selon des règles différentes.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-surface-card border border-neutral-200 p-5">
                <p className="font-mono text-xs text-neutral-500 uppercase tracking-wider mb-3">Vos versements</p>
                <p className="text-sm text-neutral-700 leading-relaxed mb-3">
                  L&apos;argent que vous avez versé et qui a été déduit de vos impôts est considéré comme un revenu ordinaire au moment du retrait. Il est ajouté à vos autres revenus de l&apos;année et taxé à votre taux marginal du moment.
                </p>
                <p className="font-mono text-xs text-neutral-400 border-t border-neutral-100 pt-3">
                  Exemple : vous retirez 10 000 euros de versements, votre taux marginal à la retraite est de 11 % → 1 100 euros d&apos;impôt.
                </p>
              </div>
              <div className="bg-surface-card border border-neutral-200 p-5">
                <p className="font-mono text-xs text-neutral-500 uppercase tracking-wider mb-3">Les gains accumulés</p>
                <p className="text-sm text-neutral-700 leading-relaxed mb-3">
                  Les intérêts et plus-values générés pendant la phase d&apos;épargne sont imposés au taux fixe de 30 % : 12,8 % d&apos;impôt sur le revenu et 17,2 % de prélèvements sociaux. Ce taux s&apos;applique quel que soit votre niveau de revenus à la retraite.
                </p>
                <p className="font-mono text-xs text-neutral-400 border-t border-neutral-100 pt-3">
                  Exemple : 5 000 euros de gains → 1 500 euros d&apos;impôt (30 %).
                </p>
              </div>
            </div>

            <h3 className="font-serif text-xl font-bold text-neutral-900 mb-4 mt-8">Sortie en rente</h3>

            <p className="text-neutral-700 mb-4">
              Vous confiez votre capital à l&apos;assureur, qui vous verse un revenu mensuel jusqu&apos;à votre décès. Ce revenu est traité fiscalement comme une pension de retraite. Il est ajouté à vos autres pensions, avec un abattement de 10 % calculé automatiquement (plafonné à 4 321 euros en 2025).
            </p>

            <div className="bg-neutral-50 border border-neutral-200 p-5 my-6">
              <p className="font-mono text-xs text-neutral-400 uppercase tracking-wider mb-3">Exemple - Rente PER de 1 000 euros par mois</p>
              <div className="font-mono text-sm space-y-1.5 text-neutral-800">
                <p>Rente annuelle perçue : 12 000 euros</p>
                <p>Abattement de 10 % : 1 200 euros déduits automatiquement</p>
                <p className="font-bold text-primary-700 pt-2 border-t border-neutral-200 mt-2">Rente imposable : 10 800 euros</p>
                <p className="text-neutral-500 text-xs mt-1">Ces 10 800 euros s&apos;ajoutent à vos autres pensions pour calculer votre impôt de l&apos;année.</p>
              </div>
            </div>

            <div className="border-l-4 border-warning-400 bg-warning-50 px-5 py-4 my-6">
              <p className="font-mono text-xs text-warning-700 uppercase tracking-wider mb-1">Point d&apos;attention</p>
              <p className="text-sm text-warning-700 leading-relaxed">
                En sortie en rente, les prélèvements sociaux (17,2 %) s&apos;appliquent en plus sur une fraction de la rente, calculée selon votre âge au moment où vous commencez à la percevoir. Ce coût supplémentaire n&apos;existe pas en sortie capital sur la partie versements, qui ne supporte que l&apos;impôt sur le revenu.
              </p>
            </div>

            <p className="text-xs text-neutral-500 font-mono">
              Sources :{' '}
              <span className="font-medium text-neutral-700">Article 158, 5° bis du CGI</span>
              {' · '}
              <a href="https://bofip.impots.gouv.fr/bofip/10261-PGP.html" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">BOFiP RSA-PENS-10</a>
            </p>
          </section>

          {/* SECTION 5 */}
          <section id="idees-recues" className="mb-16">
            <h2 className="font-serif text-3xl font-bold text-neutral-900 mb-6">Les idées reçues qui coûtent cher</h2>

            {[
              {
                faux: "Le PER est avantageux dès que je paye des impôts.",
                vrai: "Tout dépend du différentiel entre votre taux marginal aujourd'hui et celui qui sera effectif à la retraite. Si vous êtes à 30 % maintenant et à 30 % à la retraite, vous avez simplement décalé l'imposition dans le temps. Aucun gain fiscal net. Le PER est vraiment intéressant quand votre taux marginal baisse significativement à la retraite.",
              },
              {
                faux: "Je peux récupérer mon argent en cas de besoin.",
                vrai: "Le PER est bloqué jusqu'à la retraite, c'est-à-dire jusqu'à la liquidation de vos droits à la retraite. Les situations autorisant un déblocage anticipé sont précisément encadrées par la loi : achat de la résidence principale, décès du conjoint ou du partenaire de Pacs, invalidité de 2e ou 3e catégorie, situation de surendettement, fin de droits au chômage. Ce n'est pas un livret accessible à tout moment.",
              },
              {
                faux: "Le PER disparaît si je décède avant la retraite.",
                vrai: "Si vous décédez avant d'avoir liquidé votre PER, le capital est transmis aux bénéficiaires désignés dans votre contrat, comme pour une assurance-vie. La fiscalité applicable est proche de celle de l'assurance-vie, avec des abattements qui varient selon votre âge au moment du décès.",
              },
              {
                faux: "Je peux déduire autant que je veux.",
                vrai: "La déduction est limitée au plafond figurant sur votre avis d'imposition. Si vous versez davantage, l'excédent n'est pas déductible cette année. Vous pouvez néanmoins effectuer ce versement : à la sortie, la partie non déduite ne sera pas réimposée.",
              },
            ].map(({ faux, vrai }) => (
              <div key={faux} className="mb-8">
                <div className="border-l-4 border-warning-400 bg-warning-50 px-5 py-4 mb-2">
                  <p className="font-mono text-xs text-warning-700 uppercase tracking-wider mb-1">Ce qu&apos;on entend souvent</p>
                  <p className="text-warning-800 text-sm font-medium">&laquo;&nbsp;{faux}&nbsp;&raquo;</p>
                </div>
                <div className="border-l-4 border-primary-400 bg-primary-50 px-5 py-4">
                  <p className="font-mono text-xs text-primary-600 uppercase tracking-wider mb-1">Ce qui se passe réellement</p>
                  <p className="text-primary-800 text-sm leading-relaxed">{vrai}</p>
                </div>
              </div>
            ))}
          </section>

          {/* SECTION 6 */}
          <section id="per-vs-av" className="mb-16">
            <h2 className="font-serif text-3xl font-bold text-neutral-900 mb-6">PER vs assurance-vie : 3 profils comparés</h2>

            <p className="text-neutral-700 mb-4">
              Le PER et l&apos;assurance-vie sont souvent présentés comme des produits concurrents. En réalité, ils ne répondent pas aux mêmes besoins.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              <div className="bg-surface-card border-l-4 border-l-primary-700 border border-neutral-200 p-5">
                <p className="font-bold text-sm text-neutral-900 mb-3">Le PER</p>
                <p className="text-sm text-neutral-600 leading-relaxed">Réduit votre impôt dès cette année. L&apos;argent est bloqué jusqu&apos;à la retraite, sauf exceptions. Les versements et les gains sont imposés à la sortie.</p>
              </div>
              <div className="bg-surface-card border-l-4 border-l-accent-400 border border-neutral-200 p-5">
                <p className="font-bold text-sm text-neutral-900 mb-3">L&apos;assurance-vie</p>
                <p className="text-sm text-neutral-600 leading-relaxed">Aucun avantage fiscal à l&apos;entrée. Le capital est disponible à tout moment. Seuls les gains sont imposés à la sortie, pas les versements. Fiscalité allégée après 8 ans.</p>
              </div>
            </div>

            {[
              {
                num: 'Profil 1',
                titre: "Taux d'imposition élevé aujourd'hui, faible à la retraite",
                detail: "Sophie, 45 ans, cadre supérieure. Taux marginal actuel : 41 %. À la retraite, ses revenus baisseront sensiblement. Taux marginal prévisible : 11 %.",
                versement: '5 000 euros versés cette année',
                per: [
                  "Impôt économisé maintenant : 5 000 × 41 % = 2 050 euros",
                  "Coût effectif du versement : 2 950 euros (pas 5 000)",
                  "À la sortie : ces 5 000 euros seront taxés à 11 % seulement",
                  "Elle gagne la différence entre 41 % économisés et 11 % payés à la sortie",
                ],
                av: [
                  "Aucune économie cette année. Le versement coûte 5 000 euros réels",
                  "À la sortie : seuls les gains sont imposés, pas les 5 000 euros versés",
                  "Capital disponible à tout moment, sans blocage",
                  "Après 8 ans, une partie des gains est exonérée chaque année",
                ],
                note: "Pour ce profil, le PER est clairement plus efficace fiscalement. L'économie immédiate de 2 050 euros représente un avantage significatif, et la taxation à 11 % à la sortie est bien inférieure à ce que Sophie aurait payé en restant imposée aujourd'hui.",
              },
              {
                num: 'Profil 2',
                titre: "Taux d'imposition stable avant et après retraite",
                detail: "Marc, 50 ans, indépendant. Taux marginal : 30 % aujourd'hui, et probablement encore 30 % à la retraite en raison de ses revenus locatifs.",
                versement: '5 000 euros versés cette année',
                per: [
                  "Impôt économisé maintenant : 5 000 × 30 % = 1 500 euros",
                  "À la sortie : ces 5 000 euros seront retaxés à 30 % aussi",
                  "Le décalage fiscal s'annule. L'avantage résiduel : avoir pu replacer ces 1 500 euros pendant des années",
                ],
                av: [
                  "Aucune économie à l'entrée",
                  "À la sortie : seuls les gains sont imposés, les 5 000 euros versés ne le sont pas",
                  "Après 8 ans : abattement annuel sur les gains (4 600 euros pour une personne seule)",
                  "La fiscalité de sortie est souvent plus douce que celle du PER dans ce cas",
                ],
                note: "Avec un taux stable, l'avantage du PER est limité. L'assurance-vie peut rattraper son retard grâce à l'exonération partielle des gains après 8 ans et à la disponibilité du capital.",
              },
              {
                num: 'Profil 3',
                titre: "Taux d'imposition faible aujourd'hui, incertain à la retraite",
                detail: "Léa, 35 ans, salariée en début de carrière. Taux marginal actuel : 11 %. Sa situation à la retraite est difficile à prévoir sur 30 ans.",
                versement: '3 000 euros versés cette année',
                per: [
                  "Impôt économisé maintenant : 3 000 × 11 % = 330 euros. C'est peu",
                  "Capital bloqué pendant 30 ans",
                  "Risque : si sa retraite est confortable, elle pourrait être taxée à 30 % à la sortie",
                  "Elle aurait économisé 11 % pour payer 30 % plus tard",
                ],
                av: [
                  "Aucune économie à l'entrée",
                  "Capital disponible si un besoin survient avant la retraite",
                  "Fiscalité de sortie connue et stable sur les gains",
                  "Plus de visibilité et de flexibilité sur 30 ans",
                ],
                note: "Avec un faible taux marginal et un long horizon, l'avantage fiscal du PER à l'entrée est limité : 330 euros sur 3 000 euros versés. L'assurance-vie est souvent plus adaptée quand la situation à la retraite reste incertaine.",
              },
            ].map(cas => (
              <div key={cas.num} className="mb-10">
                <div className="bg-primary-700 px-5 py-4">
                  <p className="font-mono text-xs text-primary-300 mb-1">{cas.num}</p>
                  <p className="text-white font-bold text-lg">{cas.titre}</p>
                  <p className="text-primary-300 text-sm mt-1">{cas.detail}</p>
                </div>
                <div className="bg-surface-card border border-neutral-200 border-t-0 p-6">
                  <p className="font-mono text-xs text-neutral-400 uppercase tracking-wider mb-4">{cas.versement}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                    <div className="bg-neutral-50 border-l-4 border-l-primary-700 border border-neutral-200 p-4">
                      <p className="font-mono text-xs text-primary-600 uppercase tracking-wider mb-3">PER individuel</p>
                      <ul className="space-y-2">
                        {cas.per.map(l => <li key={l} className="text-xs text-neutral-700 leading-relaxed">{l}</li>)}
                      </ul>
                    </div>
                    <div className="bg-neutral-50 border-l-4 border-l-accent-400 border border-neutral-200 p-4">
                      <p className="font-mono text-xs text-accent-600 uppercase tracking-wider mb-3">Assurance-vie</p>
                      <ul className="space-y-2">
                        {cas.av.map(l => <li key={l} className="text-xs text-neutral-700 leading-relaxed">{l}</li>)}
                      </ul>
                    </div>
                  </div>
                  <div className="border-l-4 border-neutral-300 pl-4 py-1">
                    <p className="text-sm text-neutral-700 leading-relaxed">{cas.note}</p>
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* SECTION 7 */}
          <section id="cas-concrets" className="mb-16">
            <h2 className="font-serif text-3xl font-bold text-neutral-900 mb-6">Calculs complets chiffrés</h2>

            <p className="text-neutral-700 mb-4">
              Pour illustrer l&apos;impact du taux marginal sur le résultat final, voici un même versement soumis à trois situations différentes.
            </p>

            <div className="bg-neutral-50 border border-neutral-200 p-5 mb-8">
              <p className="font-mono text-xs text-neutral-400 uppercase tracking-wider mb-3">Hypothèses communes aux trois scénarios</p>
              <div className="text-sm space-y-1.5 text-neutral-700">
                <p>Versement unique sur le PER : <strong>5 000 euros</strong></p>
                <p>Durée de placement : <strong>20 ans</strong></p>
                <p>Rendement annuel moyen : <strong>4 %</strong> (hypothèse indicative, non garantie)</p>
                <p>Capital brut après 20 ans : <strong>5 000 × (1,04)²⁰ = 10 956 euros</strong></p>
                <p className="text-neutral-500 text-xs mt-2">Dont 5 000 euros de versement initial et 5 956 euros de gains accumulés.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {[
                {
                  label: 'Scénario A - Favorable',
                  tmia: 'Taux marginal actuel : 30 %',
                  tmib: 'Taux marginal retraite : 11 %',
                  calcul: [
                    { lib: "Impôt économisé à l'entrée", val: "− 1 500€" },
                    { lib: "Impôt sur les versements à la sortie (11 %)", val: "+ 550€" },
                    { lib: "Impôt sur les gains (30 % fixe)", val: "+ 1 787€" },
                    { lib: "Coût fiscal net", val: "= 837€" },
                  ],
                  net: '10 956 − 837 = 10 119€ net',
                  explication: "Vous avez déduit à 30 % et réimposé à 11 %. Vous avez gagné 19 points de différence sur vos versements.",
                  favorable: true,
                },
                {
                  label: 'Scénario B - Neutre',
                  tmia: 'Taux marginal actuel : 30 %',
                  tmib: 'Taux marginal retraite : 30 %',
                  calcul: [
                    { lib: "Impôt économisé à l'entrée", val: "− 1 500€" },
                    { lib: "Impôt sur les versements à la sortie (30 %)", val: "+ 1 500€" },
                    { lib: "Impôt sur les gains (30 % fixe)", val: "+ 1 787€" },
                    { lib: "Coût fiscal net", val: "= 1 787€" },
                  ],
                  net: '10 956 − 1 787 = 9 169€ net',
                  explication: "L'économie à l'entrée et l'impôt à la sortie s'annulent exactement. Seuls les gains restent taxés.",
                  favorable: false,
                },
                {
                  label: 'Scénario C - Défavorable',
                  tmia: 'Taux marginal actuel : 11 %',
                  tmib: 'Taux marginal retraite : 30 %',
                  calcul: [
                    { lib: "Impôt économisé à l'entrée", val: "− 550€" },
                    { lib: "Impôt sur les versements à la sortie (30 %)", val: "+ 1 500€" },
                    { lib: "Impôt sur les gains (30 % fixe)", val: "+ 1 787€" },
                    { lib: "Coût fiscal net", val: "= 2 737€" },
                  ],
                  net: '10 956 − 2 737 = 8 219€ net',
                  explication: "Vous avez déduit à 11 % et réimposé à 30 %. Vous avez payé plus que ce que vous avez économisé.",
                  favorable: false,
                },
              ].map((col, i) => (
                <div key={i} className={`border p-5 flex flex-col gap-3 ${col.favorable ? 'bg-accent-50 border-accent-300' : 'bg-surface-card border-neutral-200'}`}>
                  <p className="text-xs font-bold text-neutral-700">{col.label}</p>
                  <div>
                    <p className="font-mono text-xs text-neutral-500">{col.tmia}</p>
                    <p className="font-mono text-xs text-neutral-500">{col.tmib}</p>
                  </div>
                  <div className="space-y-1.5 border-t border-neutral-200 pt-3">
                    {col.calcul.map(l => (
                      <div key={l.lib} className="flex justify-between gap-2">
                        <span className="font-mono text-xs text-neutral-500 leading-tight">{l.lib}</span>
                        <span className="font-mono text-xs text-neutral-800 font-bold shrink-0">{l.val}</span>
                      </div>
                    ))}
                  </div>
                  <p className={`font-mono text-xs font-bold pt-2 border-t border-neutral-200 ${col.favorable ? 'text-accent-600' : 'text-primary-700'}`}>
                    {col.net}
                  </p>
                  <p className="text-xs text-neutral-600 leading-relaxed">{col.explication}</p>
                </div>
              ))}
            </div>

            <div className="border-l-4 border-primary-300 bg-primary-50 px-5 py-4">
              <p className="font-mono text-xs text-primary-600 uppercase tracking-wider mb-2">Ce que ces chiffres montrent</p>
              <p className="text-sm text-primary-800 leading-relaxed">
                Le PER est d&apos;autant plus avantageux que la différence entre votre taux d&apos;imposition actuel et votre taux à la retraite est grande. Quand les taux s&apos;inversent, la mécanique joue à l&apos;envers. Ces calculs ne tiennent pas compte du fait que l&apos;économie d&apos;impôt réalisée chaque année peut être réinvestie, ce qui améliore mécaniquement le résultat du PER dans les scénarios A et B.
              </p>
            </div>
          </section>

          {/* CTA final */}
          <div className="bg-primary-700 px-8 py-6 mb-12">
            <p className="text-white font-bold text-lg mb-1">Calculez votre cas avec vos chiffres</p>
            <p className="text-primary-200 text-sm mb-4">
              Notre calculateur PER simule votre économie à l&apos;entrée et la fiscalité à la sortie selon votre taux d&apos;imposition actuel et prévisible. Gratuit, sans inscription, zéro donnée conservée.
            </p>
            <Link href="/per-individuel" className="inline-block bg-surface-card text-primary-700 px-6 py-2.5 font-medium text-sm hover:bg-neutral-100 transition-colors font-mono">
              Accéder au calculateur PER →
            </Link>
          </div>

          {/* Sources */}
          <div className="bg-surface-card border border-neutral-200 p-8">
            <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-6">Méthodologie et sources</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-500 mb-3">Textes de loi</h3>
                <ul className="space-y-2 text-sm">
                  {([
                    { href: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000053542827', label: 'Article 163 quatervicies du CGI', desc: 'Déductibilité des cotisations versées au PER individuel' },
                    { href: 'https://www.legifrance.gouv.fr/codes/id/LEGIARTI000042158853', label: 'Article 158, 5° bis du CGI', desc: 'Imposition des rentes issues des PER - régime des pensions' },
                    { href: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000038507575', label: 'Article L224-1 du Code monétaire et financier', desc: 'Définition légale du PER individuel (loi PACTE 2019)' },
                    { href: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000048805604', label: 'Article L224-28 du Code monétaire et financier', desc: 'Cas de déblocage anticipé - liste exhaustive' },
                    { href: 'https://www.service-public.fr/particuliers/vosdroits/F34982', label: 'Service-Public.fr - PER individuel', desc: 'Fiche pratique officielle : ouverture, versements, fiscalité, déblocages' },
                  ] as Array<{ href?: string; label: string; desc?: string }>).map((s, i) => (
                    <li key={s.href ?? `${s.label}-${i}`} className="flex items-start gap-3">
                      <span className="text-accent-400 mt-0.5 shrink-0">-</span>
                      <div>
                        {s.href ? (
                          <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline font-medium">{s.label}</a>
                        ) : (
                          <span className="font-medium text-neutral-700">{s.label}</span>
                        )}
                        {s.desc && <p className="text-neutral-500 text-xs mt-0.5">{s.desc}</p>}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-500 mb-3">Formules clés</h3>
                <div className="bg-neutral-50 border border-neutral-200 p-5 font-mono text-xs text-neutral-700 space-y-3">
                  <div>
                    <p className="text-neutral-400 mb-0.5">1. Impôt économisé à l&apos;entrée</p>
                    <p>Économie = Versement × Taux marginal d&apos;imposition</p>
                  </div>
                  <div>
                    <p className="text-neutral-400 mb-0.5">2. Plafond de déduction annuel</p>
                    <p>10 % × revenus N-1, entre 4 637 euros (min) et 37 094 euros (max) en 2025</p>
                  </div>
                  <div>
                    <p className="text-neutral-400 mb-0.5">3. Impôt à la sortie sur les versements</p>
                    <p>Versements retirés × Taux marginal à la retraite</p>
                  </div>
                  <div>
                    <p className="text-neutral-400 mb-0.5">4. Impôt à la sortie sur les gains</p>
                    <p>Gains × 30 % (12,8 % IR + 17,2 % prélèvements sociaux)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-neutral-200 mt-8 pt-6 text-center">
            <p className="font-mono text-xs text-neutral-400 leading-relaxed">
              Outil indicatif uniquement. Ne constitue pas un conseil fiscal ou en investissement personnalisé.{' '}
              <a href="https://github.com/nba67000/calculpatrimoine" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">Code source ouvert</a>
            </p>
          </div>

        </div>
      </article>
      <Footer />
    </>
  )
}
