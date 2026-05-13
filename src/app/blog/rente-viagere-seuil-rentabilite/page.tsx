import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Rente viagère : pourquoi le seuil de rentabilité est après votre espérance de vie',
  description: 'À 72 ans avec 250 000 euros, le seuil de rentabilité tombe à 15,8 ans alors que l\'espérance de vie est de 14 ans. Pourquoi c\'est normal et ce que ça signifie.',
  keywords: 'rente viagère, seuil rentabilité, espérance de vie, calcul rente, assurance vie, PER, retraite',
  openGraph: {
    title: 'Rente viagère : pourquoi le seuil de rentabilité est après votre espérance de vie',
    description: 'À 72 ans avec 250 000 euros, il faut vivre jusqu\'à 87,8 ans pour récupérer son capital. Pourquoi c\'est normal.',
    type: 'article',
    publishedTime: '2026-04-16',
  },
  alternates: { canonical: 'https://calculpatrimoine.fr/blog/rente-viagere-seuil-rentabilite' },
}

export default function ArticleRenteViagere() {
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
              <span className="text-neutral-600">Rente viagère</span>
            </nav>
            <div className="h-[2px] w-10 bg-accent-400 mb-6" />
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-neutral-900 mb-6 leading-tight">
              Rente viagère : pourquoi le seuil de rentabilité est après votre espérance de vie
            </h1>
            <div className="flex flex-wrap gap-4 font-mono text-xs text-neutral-500">
              <span>Retraite</span>
              <span>·</span>
              <span>15 min de lecture</span>
              <span>·</span>
              <span>16 avril 2026</span>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-6 pb-16">

          {/* Intro */}
          <div className="mb-12">
            <p className="text-xl text-neutral-700 leading-relaxed mb-6">
              Supposons que vous ayez 72 ans et 255 000 euros d&apos;épargne. Vous convertissez ce capital en rente viagère. Vous percevez 1 340 euros par mois. Vous devrez vivre jusqu&apos;à 87,8 ans pour récupérer votre capital de départ. Or, l&apos;espérance de vie d&apos;un homme de 72 ans est d&apos;environ 86 ans selon les tables INSEE 2022. Le seuil de rentabilité est donc après l&apos;espérance de vie. Est-ce une arnaque ? Non.
            </p>
            <p className="text-neutral-700 mb-4">
              C&apos;est le fonctionnement normal de ce produit. La rente viagère n&apos;est pas un placement conçu pour maximiser le rendement de votre capital. C&apos;est une assurance contre le risque de vivre trop longtemps.
            </p>
            <p className="text-neutral-700 mb-4">
              La distinction est importante. Si vous comprenez ce que la rente fait vraiment, vous pouvez juger objectivement si elle correspond à votre situation.
            </p>
            <p className="text-neutral-700">
              Dans cet article : le mécanisme expliqué simplement, pourquoi le seuil de rentabilité est structurellement au-delà de l&apos;espérance de vie, et les situations où la rente présente un intérêt réel.
            </p>
          </div>

          {/* Disclaimer */}
          <div className="border-l-4 border-warning-400 bg-warning-50 px-5 py-4 mb-12">
            <p className="font-mono text-xs font-bold text-warning-800 uppercase tracking-wider mb-1">Avertissement</p>
            <p className="text-sm text-warning-700 leading-relaxed">
              Cet article compare différentes options de gestion du patrimoine à la retraite. Il ne constitue pas un conseil patrimonial personnalisé. Chaque situation est unique. Pour une décision adaptée à votre cas, consultez un conseiller en gestion de patrimoine indépendant.
            </p>
          </div>

          {/* Clarification */}
          <div className="border-l-4 border-neutral-300 bg-surface-card px-5 py-4 mb-12">
            <p className="font-bold text-sm text-neutral-900 mb-1.5">Clarification : de quelle rente parle-t-on ?</p>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Cet article traite de la rente viagère financière. C&apos;est la conversion d&apos;un capital financier (assurance-vie, PER, épargne) en revenus mensuels à vie. Ce n&apos;est pas le viager immobilier, qui est la vente d&apos;un bien immobilier contre un bouquet et une rente mensuelle. Ces deux produits n&apos;ont rien à voir.
            </p>
          </div>

          {/* Lexique */}
          <div className="bg-surface-card border border-neutral-200 p-6 mb-12">
            <p className="font-mono text-xs text-neutral-400 uppercase tracking-wider mb-5">Lexique - avant de commencer</p>
            <div className="space-y-5">
              {[
                {
                  terme: 'Rente viagère',
                  def: "Vous donnez définitivement un capital à un assureur. En échange, l'assureur vous verse un revenu mensuel jusqu'à votre décès, quelle que soit votre durée de vie. Si vous vivez jusqu'à 105 ans, il continue de payer. Si vous décédez à 74 ans, il arrête les versements et conserve le capital restant.",
                },
                {
                  terme: 'Taux de conversion',
                  def: "Le rapport entre la rente annuelle que vous percevrez et le capital que vous avez versé. Un taux de 5 % signifie qu'un capital de 100 000 euros génère 5 000 euros de rente par an, soit environ 417 euros par mois. Ce taux dépend de votre âge au moment de la conversion : plus vous êtes âgé, plus le taux est élevé.",
                },
                {
                  terme: 'Seuil de rentabilité',
                  def: "Le nombre d'années qu'il faut vivre après la conversion pour avoir perçu autant en rentes que le capital versé. Si vous avez donné 100 000 euros et que vous percevez 5 000 euros par an, votre seuil de rentabilité est à 20 ans.",
                },
                {
                  terme: 'Espérance de vie',
                  def: "Le nombre d'années moyen qu'une personne de votre âge peut s'attendre à vivre, selon les tables de mortalité INSEE. C'est une moyenne statistique, pas une prédiction individuelle. La moitié des personnes de votre âge vivront moins longtemps, l'autre moitié vivront plus longtemps.",
                },
                {
                  terme: 'Réversion',
                  def: "Une clause optionnelle qui garantit qu'en cas de décès, une fraction de la rente continue d'être versée à votre conjoint survivant. Cette garantie a un coût : elle réduit le montant de la rente initiale de 15 à 30 % environ.",
                },
                {
                  terme: 'Mutualisation',
                  def: "Le mécanisme par lequel l'assureur équilibre ses engagements. Les personnes qui décèdent avant d'avoir récupéré leur capital financent les rentes versées à ceux qui vivent au-delà de l'espérance de vie. L'assureur prélève sa marge technique au passage.",
                },
              ].map(({ terme, def }) => (
                <div key={terme} className="border-b border-neutral-100 pb-5 last:border-0 last:pb-0">
                  <p className="font-bold text-sm text-neutral-900 mb-1.5">{terme}</p>
                  <p className="text-sm text-neutral-600 leading-relaxed">{def}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-primary-700 px-8 py-6 mb-12">
            <p className="font-mono text-xs text-primary-300 uppercase tracking-wider mb-2">Outil associé</p>
            <p className="text-white font-bold text-lg mb-1">Calculez votre seuil de rentabilité personnel</p>
            <p className="text-primary-200 text-sm mb-4">
              Notre calculateur détermine votre seuil précis et le compare à votre espérance de vie selon les tables INSEE 2022.
            </p>
            <Link href="/rente-viagere" className="inline-block bg-surface-card text-primary-700 px-6 py-2.5 font-medium text-sm hover:bg-neutral-100 transition-colors font-mono">
              Accéder au calculateur →
            </Link>
          </div>

          {/* Sommaire */}
          <nav className="bg-surface-card border border-neutral-200 p-6 mb-12">
            <p className="font-mono text-xs uppercase tracking-wider text-neutral-500 mb-4">Sommaire</p>
            <ol className="space-y-2 text-sm font-mono">
              <li><a href="#fonctionnement" className="text-primary-600 hover:underline">1. Comment fonctionne la rente viagère</a></li>
              <li><a href="#seuil" className="text-primary-600 hover:underline">2. Pourquoi le seuil de rentabilité est après l&apos;espérance de vie</a></li>
              <li><a href="#avantages" className="text-primary-600 hover:underline">3. Trois situations où la rente présente un intérêt réel</a></li>
              <li><a href="#limites" className="text-primary-600 hover:underline">4. Cinq situations où d&apos;autres solutions sont préférables</a></li>
              <li><a href="#synthese" className="text-primary-600 hover:underline">5. Synthèse : 10 points à retenir</a></li>
            </ol>
          </nav>

          {/* SECTION 1 */}
          <section id="fonctionnement" className="mb-16">
            <h2 className="font-serif text-3xl font-bold text-neutral-900 mb-6">Comment fonctionne la rente viagère</h2>

            <p className="text-neutral-700 mb-4">
              Imaginons que vous avez constitué un capital de 200 000 euros via votre assurance-vie ou votre PER. Vous arrivez à la retraite. Deux stratégies s&apos;offrent à vous pour transformer ce capital en revenus.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
              <div className="bg-surface-card border border-neutral-200 p-5 border-l-4 border-l-neutral-400">
                <p className="font-bold text-sm text-neutral-900 mb-3">Stratégie A - Retraits programmés</p>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Vous gardez votre capital. Vous retirez chaque mois ce dont vous avez besoin. Vous conservez la propriété de l&apos;argent et pouvez le transmettre à vos héritiers. Mais si vous vivez très longtemps, vous risquez d&apos;épuiser votre épargne avant votre décès.
                </p>
              </div>
              <div className="bg-surface-card border border-neutral-200 p-5 border-l-4 border-l-primary-700">
                <p className="font-bold text-sm text-neutral-900 mb-3">Stratégie B - Rente viagère</p>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Vous cédez définitivement vos 200 000 euros à un assureur. Il s&apos;engage à vous verser par exemple 1 100 euros par mois jusqu&apos;à votre décès. Peu importe si vous vivez jusqu&apos;à 75 ans ou jusqu&apos;à 105 ans. En contrepartie, si vous décédez tôt, vos héritiers ne récupèrent rien.
                </p>
              </div>
            </div>

            <p className="text-neutral-700 mb-6">
              La rente viagère fonctionne comme une assurance longévité. L&apos;assureur prend le risque de vous payer très longtemps. Vous cédez le risque de manquer d&apos;argent à un âge avancé. C&apos;est un échange de risques, pas un placement.
            </p>

            <div className="bg-neutral-50 border border-neutral-200 p-5 my-6">
              <p className="font-mono text-xs text-neutral-400 uppercase tracking-wider mb-3">Fiscalité de la rente viagère (information générale)</p>
              <p className="text-sm text-neutral-700 leading-relaxed">
                La rente perçue est imposée partiellement. La fraction imposable dépend de votre âge au moment où vous commencez à percevoir la rente : 70 % si vous avez moins de 50 ans, 50 % entre 50 et 59 ans, 40 % entre 60 et 69 ans, 30 % à partir de 70 ans. Cette fraction est intégrée à votre revenu imposable et taxée à votre taux marginal, plus les prélèvements sociaux.
              </p>
            </div>
          </section>

          {/* SECTION 2 */}
          <section id="seuil" className="mb-16">
            <h2 className="font-serif text-3xl font-bold text-neutral-900 mb-6">Pourquoi le seuil de rentabilité est après l&apos;espérance de vie</h2>

            <p className="text-neutral-700 mb-6">
              C&apos;est la question centrale. Voici les chiffres, puis les trois raisons.
            </p>

            <div className="bg-surface-card border border-neutral-200 p-6 my-6">
              <p className="font-mono text-xs text-neutral-400 uppercase tracking-wider mb-4">Exemple de référence</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                {[
                  { label: 'Âge', val: '72 ans' },
                  { label: 'Capital converti', val: '255 000 euros' },
                  { label: 'Rente mensuelle', val: '1 340 euros' },
                ].map(({ label, val }) => (
                  <div key={label} className="text-center">
                    <p className="font-mono text-xs text-neutral-400 uppercase mb-1">{label}</p>
                    <p className="font-bold text-lg text-neutral-900">{val}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-neutral-100 pt-4 space-y-2 font-mono text-sm text-neutral-800">
                <p>Seuil de rentabilité : 255 000 ÷ (1 340 × 12) = <strong className="text-primary-700">15,8 ans</strong></p>
                <p>Capital récupéré à partir de : <strong className="text-primary-700">87,8 ans</strong></p>
              </div>
              <div className="border-t border-neutral-100 mt-4 pt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="font-mono text-xs text-neutral-400 uppercase mb-1">Espérance de vie homme à 72 ans (INSEE 2022)</p>
                  <p className="font-bold text-neutral-900">environ 14 ans <span className="font-normal text-neutral-500 text-sm">(86 ans)</span></p>
                </div>
                <div>
                  <p className="font-mono text-xs text-neutral-400 uppercase mb-1">Espérance de vie femme à 72 ans (INSEE 2022)</p>
                  <p className="font-bold text-neutral-900">environ 17 ans <span className="font-normal text-neutral-500 text-sm">(89 ans)</span></p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-neutral-200">
                <p className="text-sm text-neutral-700">Le seuil de rentabilité se situe après l&apos;espérance de vie moyenne pour les hommes, et légèrement avant pour les femmes.</p>
              </div>
            </div>

            <h3 className="font-serif text-xl font-bold text-neutral-900 mb-4 mt-10">Les trois raisons de cet écart</h3>

            <div className="space-y-6">
              <div className="bg-surface-card border border-neutral-200 p-5">
                <p className="font-bold text-sm text-neutral-900 mb-2">1. L&apos;assureur prélève une marge</p>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Sur 255 000 euros versés, l&apos;assureur ne redistribue pas tout sous forme de rentes. Il retient une marge de l&apos;ordre de 20 à 30 % pour couvrir sa rémunération, ses frais de gestion et ses provisions pour risque de longévité exceptionnelle. Concrètement, sur 255 000 euros, environ 180 000 euros sont effectivement redistribués en rentes mensuelles.
                </p>
              </div>

              <div className="bg-surface-card border border-neutral-200 p-5">
                <p className="font-bold text-sm text-neutral-900 mb-2">2. La mutualisation des risques</p>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  L&apos;assureur ne mise pas sur votre durée de vie individuelle. Il gère un portefeuille de milliers d&apos;assurés. Sur 1 000 personnes, environ la moitié décédera avant l&apos;espérance de vie statistique. Les capitaux non distribués de ces personnes financent les rentes prolongées de ceux qui vivent au-delà. C&apos;est le même principe que l&apos;assurance automobile : vos primes financent les accidents des autres.
                </p>
              </div>

              <div className="bg-surface-card border border-neutral-200 p-5">
                <p className="font-bold text-sm text-neutral-900 mb-2">3. C&apos;est une assurance, pas un investissement</p>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  On ne mesure pas l&apos;utilité d&apos;une assurance au fait de ne jamais l&apos;avoir utilisée. Si vous assurez votre maison contre l&apos;incendie et qu&apos;il n&apos;y a jamais d&apos;incendie, vous n&apos;avez pas &quot;perdu&quot; vos primes. Vous avez payé pour une tranquillité d&apos;esprit. La rente viagère fonctionne de la même façon. Si vous décédez avant le seuil de rentabilité, vous avez payé pour la garantie de ne jamais manquer de revenus, quoi qu&apos;il arrive.
                </p>
              </div>
            </div>

            <div className="border-l-4 border-primary-300 bg-primary-50 px-5 py-4 my-8">
              <p className="font-mono text-xs text-primary-600 uppercase tracking-wider mb-2">Ce que ça signifie concrètement</p>
              <p className="text-sm text-primary-800 leading-relaxed">
                La rente viagère est financièrement avantageuse si vous vivez longtemps. Elle l&apos;est d&apos;autant plus si vous dépassez l&apos;espérance de vie de votre tranche d&apos;âge. C&apos;est précisément le risque qu&apos;elle couvre.
              </p>
            </div>
          </section>

          {/* SECTION 3 */}
          <section id="avantages" className="mb-16">
            <h2 className="font-serif text-3xl font-bold text-neutral-900 mb-6">Trois situations où la rente présente un intérêt réel</h2>

            <div className="space-y-6">
              <div className="bg-surface-card border border-neutral-200 p-6 border-l-4 border-l-primary-700">
                <p className="font-bold text-neutral-900 mb-3">1. Vous anticipez une longévité supérieure à la moyenne</p>
                <p className="text-sm text-neutral-600 leading-relaxed mb-3">
                  Excellente santé, parents et grands-parents ayant vécu au-delà de 90 ans, mode de vie sain. Si vous vivez 5 à 10 ans de plus que l&apos;espérance de vie statistique, vous percevrez potentiellement entre 30 et 50 % de plus que votre capital initial.
                </p>
                <p className="font-mono text-xs text-neutral-400">
                  Exemple : avec un seuil à 15,8 ans et une longévité réelle de 22 ans, vous percevez 354 000 euros en rentes pour 255 000 euros versés.
                </p>
              </div>

              <div className="bg-surface-card border border-neutral-200 p-6 border-l-4 border-l-primary-700">
                <p className="font-bold text-neutral-900 mb-3">2. Vous n&apos;avez pas d&apos;objectif de transmission</p>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Si vous n&apos;avez pas d&apos;héritiers à qui transmettre du capital, la question de la transmission ne se pose pas. Dans ce cas, optimiser vos revenus de votre vivant a plus de sens que de conserver un capital qui n&apos;ira à personne. La rente répond exactement à cet objectif.
                </p>
              </div>

              <div className="bg-surface-card border border-neutral-200 p-6 border-l-4 border-l-primary-700">
                <p className="font-bold text-neutral-900 mb-3">3. Vous voulez déléguer totalement la gestion</p>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Certaines personnes ne souhaitent pas gérer un capital en phase de retraite. Peur des mauvaises décisions, des marchés financiers, ou simple préférence pour la tranquillité. La rente offre une délégation totale. Aucune gestion requise. Les versements sont automatiques jusqu&apos;au décès, même en cas de perte d&apos;autonomie ou de difficultés cognitives.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 4 */}
          <section id="limites" className="mb-16">
            <h2 className="font-serif text-3xl font-bold text-neutral-900 mb-6">Cinq situations où d&apos;autres solutions sont préférables</h2>

            <div className="space-y-6">
              <div className="bg-surface-card border border-neutral-200 p-6">
                <p className="font-bold text-neutral-900 mb-3">1. Vous souhaitez transmettre un patrimoine</p>
                <p className="text-sm text-neutral-600 leading-relaxed mb-3">
                  La rente viagère consomme le capital. Sauf clauses spécifiques, vos héritiers ne perçoivent rien à votre décès. Si transmettre à vos enfants ou petits-enfants est un objectif important, la rente est inadaptée.
                </p>
                <p className="font-mono text-xs text-neutral-400">
                  Alternative : conserver le capital en assurance-vie avec retraits programmés. Vous pouvez retirer 4 600 euros de gains par an en exonération d&apos;impôt (9 200 euros en couple), et transmettre le solde avec un abattement de 152 500 euros par bénéficiaire.
                </p>
              </div>

              <div className="bg-surface-card border border-neutral-200 p-6">
                <p className="font-bold text-neutral-900 mb-3">2. Vous pourriez avoir besoin de liquidités ponctuelles</p>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Une fois le capital transféré à l&apos;assureur, il est irrécupérable. Pas partiellement. Pas en urgence. Si des travaux importants, une aide à vos enfants, ou des frais de dépendance surviennent, vous n&apos;aurez aucune marge de manœuvre. Les frais d&apos;hébergement en EHPAD dépassent souvent 3 000 euros par mois, et les aides publiques ne couvrent pas tout.
                </p>
              </div>

              <div className="bg-surface-card border border-neutral-200 p-6">
                <p className="font-bold text-neutral-900 mb-3">3. Votre état de santé laisse prévoir une espérance de vie réduite</p>
                <p className="text-sm text-neutral-600 leading-relaxed mb-3">
                  Si une maladie chronique ou une pathologie lourde vous laisse espérer vivre 8 ans de plus, et que le seuil de rentabilité est à 15 ans, vous ne récupérerez qu&apos;environ la moitié de votre capital.
                </p>
                <div className="bg-neutral-50 border border-neutral-200 p-4 font-mono text-xs text-neutral-700">
                  <p>Capital versé : 255 000 euros</p>
                  <p>Rente perçue sur 8 ans : 1 340 × 12 × 8 = 128 640 euros</p>
                  <p className="font-bold text-primary-700 pt-1">Récupéré : 50 % du capital</p>
                </div>
              </div>

              <div className="bg-surface-card border border-neutral-200 p-6">
                <p className="font-bold text-neutral-900 mb-3">4. Vous avez moins de 65 ans</p>
                <p className="text-sm text-neutral-600 leading-relaxed mb-3">
                  Le taux de conversion augmente avec l&apos;âge. Avant 65 ans, les montants de rente sont peu attractifs.
                </p>
                <div className="bg-neutral-50 border border-neutral-200 p-4 font-mono text-xs text-neutral-700">
                  <p>Capital de 200 000 euros</p>
                  <p>À 60 ans : environ 780 euros par mois</p>
                  <p>À 70 ans : environ 1 360 euros par mois (+74 %)</p>
                </div>
                <p className="text-sm text-neutral-600 mt-3 leading-relaxed">
                  En reportant la conversion de 10 ans, la rente est presque doublée. Pendant cette période, le capital peut continuer à fructifier en assurance-vie ou PER.
                </p>
              </div>

              <div className="bg-surface-card border border-neutral-200 p-6">
                <p className="font-bold text-neutral-900 mb-3">5. L&apos;inflation est une préoccupation importante</p>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Certaines rentes sont indexées sur l&apos;inflation, mais la revalorisation est souvent inférieure à l&apos;inflation réelle. Avec 3 % d&apos;inflation et une revalorisation limitée à 1,5 %, vous perdez 1,5 % de pouvoir d&apos;achat chaque année. Sur 20 ans, la perte cumulée approche 30 %. Un capital investi en unités de compte peut offrir une meilleure protection contre l&apos;érosion monétaire.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 5 */}
          <section id="synthese" className="mb-16">
            <h2 className="font-serif text-3xl font-bold text-neutral-900 mb-6">Synthèse : 10 points à retenir</h2>

            <div className="space-y-4">
              {[
                "La rente viagère est un mécanisme d'assurance longévité, pas un placement. Vous transférez à l'assureur le risque de vivre très longtemps en échange d'un revenu garanti à vie.",
                "Le seuil de rentabilité est structurellement après l'espérance de vie. C'est inhérent au modèle, pas une anomalie. La marge de l'assureur et la mutualisation des risques l'expliquent entièrement.",
                "Le taux de conversion augmente avec l'âge. La période de conversion la plus favorable se situe entre 70 et 75 ans. Avant 65 ans, les montants sont peu attractifs.",
                "La décision est irrévocable. Une fois le capital transféré, vous ne pouvez pas le récupérer, même partiellement. C'est le point le plus important à intégrer avant de signer.",
                "L'option de réversion au profit du conjoint réduit la rente initiale de 15 à 30 %. Évaluez les besoins réels de votre conjoint avant d'opter pour cette clause.",
                "La rente est pertinente si vous anticipez une longévité supérieure à la moyenne. Si votre état de santé est fragile, d'autres solutions préservent mieux votre capital.",
                "La rente est inadaptée si vous souhaitez transmettre un patrimoine. L'assurance-vie avec retraits programmés permet de concilier revenus réguliers et transmission.",
                "Comparez les offres entre assureurs. Les taux de conversion peuvent varier de façon significative pour un même profil. Un écart de 10 % sur le taux représente 10 % de revenus en plus ou en moins à vie.",
                "La fiscalité de la rente est plus lourde que celle des retraits en assurance-vie. Prenez-la en compte dans votre calcul de revenu net réel.",
                "Consultez un conseiller en gestion de patrimoine indépendant avant de convertir un capital important. La décision est définitive et mérite une analyse complète de votre situation.",
              ].map((point, i) => (
                <div key={i} className="flex items-start gap-5 bg-surface-card border border-neutral-200 px-5 py-4">
                  <span className="font-mono font-bold text-primary-300 text-lg shrink-0 w-6">{i + 1}</span>
                  <p className="text-sm text-neutral-700 leading-relaxed">{point}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA final */}
          <div className="bg-primary-700 px-8 py-6 mb-12">
            <p className="text-white font-bold text-lg mb-1">Simulez votre rente viagère en quelques clics</p>
            <p className="text-primary-200 text-sm mb-4">
              Projection sur 30 ans, seuil de rentabilité précis, comparaison avec l&apos;espérance de vie INSEE, simulation des stratégies couple. Gratuit, sans inscription, zéro donnée conservée.
            </p>
            <Link href="/rente-viagere" className="inline-block bg-surface-card text-primary-700 px-6 py-2.5 font-medium text-sm hover:bg-neutral-100 transition-colors font-mono">
              Accéder au calculateur →
            </Link>
          </div>

          {/* Sources */}
          <div className="bg-surface-card border border-neutral-200 p-8">
            <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-6">Méthodologie et sources</h2>
            <div className="space-y-4 text-sm">
              {[
                { label: 'Tables de mortalité INSEE 2022', desc: 'Source des espérances de vie par âge et par sexe utilisées dans les calculs.' },
                { label: 'Article 158, 6° du CGI', desc: 'Fiscalité des rentes viagères à titre onéreux : fractions imposables selon l\'âge.', href: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000044979614' },
                { label: 'Service-Public.fr - Rente viagère', desc: 'Fiche pratique officielle sur le fonctionnement et la fiscalité de la rente viagère.', href: 'https://www.service-public.fr/particuliers/vosdroits/F3173' },
              ].map(s => (
                <div key={s.label} className="flex items-start gap-3">
                  <span className="text-accent-400 mt-0.5 shrink-0">-</span>
                  <div>
                    {s.href
                      ? <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline font-medium">{s.label}</a>
                      : <p className="font-medium text-neutral-800">{s.label}</p>
                    }
                    <p className="text-neutral-500 text-xs mt-0.5">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-neutral-200 mt-8 pt-6 text-center">
            <p className="font-mono text-xs text-neutral-400 leading-relaxed">
              Outil indicatif uniquement. Ne constitue pas un conseil patrimonial personnalisé.{' '}
              <a href="https://github.com/nba67000/calculpatrimoine" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">Code source ouvert</a>
            </p>
          </div>

        </div>
      </article>
      <Footer />
    </>
  )
}
