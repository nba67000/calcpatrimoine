import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Rente viagère : pourquoi le seuil de rentabilité est après votre espérance de vie | CalcPatrimoine',
  description: 'À 72 ans, le seuil de rentabilité tombe après l\'espérance de vie moyenne. Découvrez pourquoi c\'est normal et comment calculer si la rente viagère est faite pour vous.',
  keywords: 'rente viagère, seuil rentabilité, espérance de vie, calcul rente, assurance vie, PER, retraite',
  openGraph: {
    title: 'Rente viagère : le seuil de rentabilité est après l\'espérance de vie',
    description: 'À 72 ans avec 250 000€, le seuil tombe à 15,8 ans alors que l\'espérance est de 14 ans. Pourquoi c\'est normal.',
    type: 'article',
    publishedTime: '2026-04-16',
    authors: ['Nicolas Barbier'],
  },
}

export default function ArticleRenteViagere() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header simple */}
      <header className="bg-white border-b border-neutral-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link href="/" className="text-primary-600 hover:text-primary-700 font-medium">
            ← Retour à CalcPatrimoine
          </Link>
        </div>
      </header>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* En-tête article */}
        <div className="mb-16">
          <div className="flex items-center gap-3 text-sm text-neutral-600 mb-6">
            <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full font-medium">
              Finance personnelle
            </span>
            <time dateTime="2026-04-16">16 avril 2026</time>
            <span>·</span>
            <span>15 min de lecture</span>
          </div>

          <h1 className="text-5xl font-bold text-neutral-900 mb-8 leading-tight">
            Rente viagère : pourquoi le « seuil de rentabilité » est après votre espérance de vie (et c'est normal)
          </h1>

          <p className="text-2xl text-neutral-700 leading-relaxed mb-8">
            À 72 ans avec 250 000€, le seuil tombe à 15,8 ans alors que l'espérance de vie est de 14 ans. 
            Découvrez pourquoi c'est exactement comme ça que ça marche — et ce que personne ne vous dit.
          </p>

          <div className="flex items-center gap-3 pt-6 border-t border-neutral-200">
            <div className="w-12 h-12 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold">
              NB
            </div>
            <div>
              <div className="font-medium text-neutral-900">Nicolas Barbier</div>
              <div className="text-sm text-neutral-600">Créateur de CalcPatrimoine</div>
            </div>
          </div>
        </div>

        {/* Contenu article - ton intermédiaire */}
        <div className="space-y-8 text-lg leading-relaxed text-neutral-800">
          
          {/* Introduction */}
          <p className="text-xl leading-relaxed">
            La rente viagère financière permet de transformer un capital accumulé (via une assurance-vie, un PER, ou une épargne constituée) en revenus mensuels garantis et versés à vie. À titre d'illustration, avec un taux de conversion moyen de 5,2% net de frais observé en 2026 (non garanti), un épargnant peut percevoir environ 1 300€ par mois pour chaque tranche de 250 000€ investie.
          </p>

          <p>
            Cependant, une observation mérite d'être mise en lumière : le seuil de rentabilité — c'est-à-dire le nombre d'années nécessaires pour récupérer l'intégralité du capital initial — se situe généralement au-delà de l'espérance de vie statistique. Prenons un exemple concret : un homme de 72 ans qui convertit 250 000€ en rente viagère et perçoit 1 340€ mensuels devra vivre jusqu'à 87,8 ans (soit 15,8 années) pour retrouver son capital de départ. Or, l'espérance de vie INSEE d'un homme de 72 ans étant d'environ 14 ans (86 ans), le seuil de rentabilité se trouve donc environ 2 ans après l'espérance statistique moyenne.
          </p>

          <p>
            Cette réalité, rarement mise en avant par les distributeurs, est pourtant inhérente au modèle de la rente viagère. Dans ce guide, nous décryptons les mécanismes de ce produit, identifions les situations où il présente un réel intérêt patrimonial, et analysons les alternatives (assurance-vie en gestion libre, retraits programmés, PER) qui peuvent s'avérer plus adaptées selon votre profil.
          </p>

          {/* Disclaimer important - EN HAUT */}
          <div className="bg-warning-50 border-2 border-warning-400 rounded-xl p-8 my-12">
            <div className="flex items-start gap-4">
              <div className="text-3xl">⚠️</div>
              <div>
                <h3 className="text-xl font-bold text-warning-900 mb-4">
                  Outil de comparaison et d'information uniquement
                </h3>
                <p className="leading-relaxed text-warning-800">
                  Cet article compare différentes options de gestion de patrimoine (rente viagère, retraits programmés, assurance-vie). Il ne constitue <strong>pas</strong> un conseil patrimonial personnalisé. Chaque situation est unique (santé, objectifs, héritiers, fiscalité). Pour une décision adaptée à votre cas, consultez un expert-comptable, un avocat fiscaliste ou un conseiller en gestion de patrimoine indépendant.
                </p>
              </div>
            </div>
          </div>

          {/* Box avertissement */}
          <div className="bg-warning-50 border-l-4 border-warning-400 p-8 rounded-r-lg my-12">
            <h3 className="text-xl font-bold text-warning-900 mb-4">
              ⚠️ Clarification : nous parlons de rente viagère financière
            </h3>
            <p className="leading-relaxed mb-0">
              Cet article traite de la rente viagère financière (transformation d'un capital financier en revenus à vie), et non du viager immobilier (vente d'un bien immobilier contre bouquet et rente mensuelle). Si vous cherchez des informations sur le viager immobilier, ce n'est pas le sujet abordé ici.
            </p>
          </div>

          <h2 className="text-3xl font-bold text-neutral-900 mt-16 mb-6">
            Fonctionnement de la rente viagère
          </h2>

          <p>
            Considérons un épargnant qui a constitué un capital de 200 000€ via son assurance-vie ou son PER. À l'approche de la retraite, deux grandes stratégies s'offrent à lui pour transformer ce capital en revenus.
          </p>

          <p>
            <strong>Première option : conserver le capital et effectuer des retraits progressifs.</strong> L'épargnant garde la propriété de son capital et retire chaque mois ou trimestre le montant dont il a besoin. Cette approche offre une grande flexibilité et permet de transmettre le solde restant à ses héritiers. En revanche, elle impose de déterminer le bon rythme de retrait : trop conservateur, et l'on se prive d'un niveau de vie que l'on pourrait s'offrir ; trop généreux, et l'on risque d'épuiser son capital avant son décès, notamment en cas de longévité supérieure à la moyenne.
          </p>

          <p>
            <strong>Seconde option : convertir le capital en rente viagère.</strong> L'épargnant transfère irrévocablement ses 200 000€ à un assureur, qui s'engage en contrepartie à lui verser une rente mensuelle garantie (par exemple 1 100€) jusqu'à son décès, quelle que soit sa durée de vie. Si l'assuré atteint 105 ans, l'assureur continuera de verser la rente. En revanche, en cas de décès prématuré (par exemple à 74 ans), le capital non distribué reste acquis à l'assureur, et les héritiers ne perçoivent rien (sauf clauses particulières comme les annuités garanties ou la réversion).
          </p>

          <p>
            La rente viagère fonctionne donc comme une assurance longévité : l'assureur s'engage à vous verser un revenu à vie en échange de votre capital. Si vous vivez plus longtemps que la moyenne, vous êtes gagnant. Si vous décédez tôt, c'est l'assureur qui conserve le capital restant. Ce mécanisme repose sur la mutualisation des risques : ceux qui décèdent avant l'espérance de vie financent ceux qui vivent au-delà, et l'assureur prélève sa marge au passage.
          </p>

          <h2 className="text-3xl font-bold text-neutral-900 mt-16 mb-6">
            Pourquoi le seuil de rentabilité est-il après l'espérance de vie ?
          </h2>

          <p>Prenons l'exemple d'un profil type observé sur CalcPatrimoine :</p>

          <div className="bg-neutral-100 border border-neutral-300 rounded-xl p-8 my-12">
            <p className="font-bold text-lg mb-6">Caractéristiques du profil :</p>
            <ul className="space-y-3">
              <li>• Âge : <strong>72 ans</strong></li>
              <li>• Capital disponible : <strong>255 000€</strong></li>
              <li>• Rente mensuelle proposée : <strong>1 340€</strong></li>
            </ul>

            <p className="font-bold text-lg mt-10 mb-6">Calcul du seuil de rentabilité :</p>
            <p className="font-mono bg-white p-6 rounded-lg border border-neutral-300">
              255 000€ / (1 340€ × 12 mois) = <strong className="text-success-600 text-xl">15,8 années</strong>
            </p>

            <p className="mt-6">Le capital initial est récupéré à partir de <strong>87,8 ans</strong>.</p>

            <p className="font-bold text-lg mt-10 mb-6">Espérance de vie à 72 ans (tables INSEE 2022) :</p>
            <ul className="space-y-3">
              <li>• Homme : environ 14 ans <span className="text-neutral-600">(soit 86 ans)</span></li>
              <li>• Femme : environ 17 ans <span className="text-neutral-600">(soit 89 ans)</span></li>
            </ul>

            <p className="mt-8 text-warning-700 font-bold">
              Observation : le seuil de rentabilité se situe après l'espérance moyenne pour les hommes, et légèrement avant pour les femmes.
            </p>
          </div>

          <h3 className="text-2xl font-bold text-neutral-900 mt-12 mb-4">
            Les trois raisons de cet écart
          </h3>

          <h4 className="text-xl font-bold mt-8 mb-4">
            1. L'assureur prélève une marge substantielle
          </h4>

          <p>Sur un capital initial de 255 000€, l'assureur ne redistribue pas l'intégralité sous forme de rentes. Il retient environ 20 à 30% pour couvrir plusieurs postes :</p>

          <ul className="space-y-2 ml-6">
            <li>• Sa marge bénéficiaire (15 à 20%)</li>
            <li>• Ses frais de gestion annuels (5 à 10%)</li>
            <li>• Des provisions pour le risque de longévité exceptionnelle</li>
          </ul>

          <p>
            Concrètement, sur 255 000€ versés, environ 180 000€ sont effectivement reversés via les rentes mensuelles au fil des années. Le différentiel constitue la rémunération de l'assureur pour le service rendu et le risque pris.
          </p>

          <h4 className="text-xl font-bold mt-8 mb-4">
            2. Le principe de mutualisation actuarielle
          </h4>

          <p>
            L'assureur ne mise pas sur votre durée de vie individuelle, mais sur une moyenne statistique. Sur 1 000 assurés, environ la moitié décédera avant l'espérance de vie, et l'autre moitié vivra au-delà. Les capitaux non distribués des premiers financent les rentes prolongées des seconds. C'est le principe classique de mutualisation des risques, identique à celui de l'assurance automobile ou habitation.
          </p>

          <p>
            Autrement dit, l'assureur équilibre son portefeuille : ceux qui décèdent tôt "subventionnent" ceux qui vivent longtemps, tandis que l'assureur prélève sa marge technique au passage.
          </p>

          <h4 className="text-xl font-bold mt-8 mb-4">
            3. Une assurance, pas un placement
          </h4>

          <p>
            La rente viagère n'est pas un produit d'épargne conçu pour maximiser le rendement de votre capital. C'est avant tout un produit d'assurance destiné à couvrir le risque de longévité excessive. De la même manière qu'une assurance automobile vous protège contre le risque d'accident (et que vous "perdez" vos primes si vous n'en avez jamais), la rente viagère vous protège contre le risque de vivre trop longtemps et d'épuiser votre capital.
          </p>

          <p>
            Si vous décédez avant le seuil de rentabilité, vous aurez effectivement "perdu" de l'argent par rapport à un retrait programmé de votre capital. Mais c'est le prix de la garantie : quoi qu'il arrive, vous toucherez vos revenus jusqu'à votre dernier jour, même à 105 ans.
          </p>

          <h3 className="text-2xl font-bold text-neutral-900 mt-12 mb-4">
            La rente viagère est-elle alors désavantageuse ?
          </h3>

          <p>Non. La rente viagère n'est ni une arnaque ni un mauvais produit en soi. C'est simplement un outil patrimonial qui répond à un besoin spécifique : sécuriser des revenus à vie en transférant le risque de longévité à un assureur.</p>

          <p>Le produit présente trois caractéristiques fondamentales :</p>

          <ul className="space-y-2 ml-6">
            <li>• ✅ Une protection contre le risque de vivre au-delà de vos moyens financiers</li>
            <li>• ✅ Un revenu garanti à vie, quelle que soit votre longévité effective</li>
            <li>• ❌ Un rendement inférieur au capital initial si vous décédez avant le seuil de rentabilité</li>
          </ul>

          <div className="bg-success-50 border-l-4 border-success-600 p-8 rounded-r-lg my-12">
            <p className="font-bold text-success-900 text-lg mb-3">
              Règle d'or :
            </p>
            <p className="text-success-900 mb-0">
              La rente viagère est financièrement intéressante uniquement si vous vivez au-delà de l'espérance de vie moyenne de votre tranche d'âge.
            </p>
          </div>

          {/* CTA Calculateur */}
          <div className="bg-primary-50 border border-primary-200 rounded-xl p-10 my-16 text-center">
            <h3 className="text-3xl font-bold text-primary-900 mb-4">
              Calculez votre seuil de rentabilité personnel
            </h3>
            <p className="text-neutral-700 mb-8 max-w-2xl mx-auto">
              Utilisez notre calculateur gratuit pour déterminer précisément votre seuil de rentabilité et le comparer à votre espérance de vie selon les tables INSEE.
            </p>
            <Link 
              href="/"
              className="inline-block bg-primary-600 text-white font-bold text-lg px-10 py-4 rounded-lg hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl"
            >
              Accéder au simulateur →
            </Link>
          </div>

          <h2 className="text-3xl font-bold text-neutral-900 mt-16 mb-6">
            Les trois situations où la rente viagère présente un intérêt
          </h2>

          <h3 className="text-2xl font-bold text-neutral-900 mt-12 mb-4">
            1. Vous anticipez une longévité supérieure à la moyenne
          </h3>

          <p>Si vous réunissez plusieurs facteurs favorables à une longévité exceptionnelle :</p>

          <ul className="space-y-2 ml-6">
            <li>• Excellente santé actuelle et absence d'antécédents familiaux graves</li>
            <li>• Historique familial de longévité (parents et grands-parents ayant vécu au-delà de 90 ans)</li>
            <li>• Mode de vie sain : activité physique régulière, alimentation équilibrée, absence de tabagisme</li>
          </ul>

          <p>
            Dans ce cas, si vous vivez 5 à 10 ans de plus que l'espérance de vie moyenne, vous percevrez potentiellement 30 à 50% de plus que votre capital initial. La rente viagère devient alors un outil de maximisation des revenus sur votre longévité.
          </p>

          <h3 className="text-2xl font-bold text-neutral-900 mt-12 mb-4">
            2. Vous n'avez pas d'objectif de transmission
          </h3>

          <p>
            Si vous êtes célibataire sans enfants, ou que vos héritiers potentiels (neveux, nièces) n'ont pas de besoins financiers particuliers, la question de la transmission patrimoniale ne se pose pas avec la même acuité. Dans ce contexte, optimiser vos revenus de votre vivant prime sur la constitution d'un héritage.
          </p>

          <p>
            Avantage fiscal supplémentaire : en l'absence de transmission, vous évitez les droits de succession qui peuvent atteindre 60% pour les neveux et nièces (au-delà de 15 932€ par bénéficiaire).
          </p>

          <h3 className="text-2xl font-bold text-neutral-900 mt-12 mb-4">
            3. Vous recherchez la sécurité absolue
          </h3>

          <p>
            Certains épargnants ne souhaitent pas gérer un capital en phase de retraite, que ce soit par crainte des mauvaises décisions de retrait, de la volatilité des marchés financiers, ou par simple préférence pour la tranquillité d'esprit.
          </p>

          <p>
            La rente viagère offre alors une délégation totale : versement automatique chaque mois jusqu'au décès, sans aucune gestion requise de votre part. Même en cas de perte d'autonomie ou de troubles cognitifs, les revenus continuent d'être versés sans interruption.
          </p>

          <h2 className="text-3xl font-bold text-neutral-900 mt-16 mb-6">
            Les cinq situations où d'autres solutions sont préférables
          </h2>

          <h3 className="text-2xl font-bold text-neutral-900 mt-12 mb-4">
            1. Vous avez un objectif de transmission patrimoniale
          </h3>

          <p>
            La rente viagère entraîne une extinction du capital : sauf clauses spécifiques (annuités garanties), vos héritiers ne perçoivent rien au décès. Si la transmission à vos enfants ou petits-enfants constitue un objectif important, d'autres solutions sont plus adaptées.
          </p>

          <p>
            <strong>Alternative recommandée :</strong> conserver le capital en assurance-vie avec retraits programmés. Vous bénéficiez d'une fiscalité avantageuse sur les retraits (abattement de 4 600€ par an pour une personne seule, 9 200€ pour un couple), tout en préservant la transmission du solde restant avec un abattement de 152 500€ par bénéficiaire.
          </p>

          <h3 className="text-2xl font-bold text-neutral-900 mt-12 mb-4">
            2. Vous pourriez avoir besoin de liquidités ponctuelles
          </h3>

          <p>Plusieurs situations courantes peuvent nécessiter un accès au capital :</p>

          <ul className="space-y-2 ml-6">
            <li>• Travaux importants dans votre résidence principale</li>
            <li>• Aide financière substantielle à vos enfants (acquisition immobilière, création d'entreprise)</li>
            <li>• Dépendance et financement d'un EHPAD (coûts moyens de 2 000 à 4 000€ par mois)</li>
            <li>• Soins médicaux lourds non pris en charge par la Sécurité sociale</li>
          </ul>

          <p>
            La rente viagère est un engagement irrévocable : une fois le capital transféré, il n'est plus possible de le récupérer, même partiellement. Si un besoin imprévu survient, vous n'aurez aucune marge de manœuvre.
          </p>

          <h3 className="text-2xl font-bold text-neutral-900 mt-12 mb-4">
            3. Votre état de santé est fragile
          </h3>

          <p>
            Si votre médecin vous indique une espérance de vie inférieure à la moyenne (suite à une maladie chronique, un cancer, ou d'autres pathologies lourdes), vous allez mathématiquement perdre de l'argent avec une rente viagère.
          </p>

          <div className="bg-warning-50 border-l-4 border-warning-400 p-6 rounded-r-lg my-8">
            <strong>Exemple chiffré :</strong> avec une espérance de 8 ans et un seuil de rentabilité à 15,8 ans, vous ne récupérerez qu'environ 50% de votre capital initial.
          </div>

          <p>
            Dans ce contexte, conserver le capital en assurance-vie et effectuer des retraits plus élevés permet de profiter pleinement de vos économies de votre vivant, tout en transmettant le solde à vos proches.
          </p>

          <h3 className="text-2xl font-bold text-neutral-900 mt-12 mb-4">
            4. Vous avez moins de 65 ans
          </h3>

          <p>Le taux de conversion de la rente viagère augmente significativement avec l'âge. Avant 65 ans, les montants de rente sont généralement peu attractifs.</p>

          <div className="bg-neutral-100 rounded-xl p-8 my-10">
            <p className="font-bold mb-6">Illustration pour un capital de 200 000€ :</p>
            <ul className="space-y-3">
              <li>• À 60 ans : environ 780€ par mois</li>
              <li>• À 70 ans : environ 1 360€ par mois <span className="text-success-600 font-bold">(soit +74%)</span></li>
            </ul>
          </div>

          <p>
            En reportant la conversion de 10 ans, vous doublez presque votre rente mensuelle. Pendant cette période, il est préférable de conserver le capital en assurance-vie ou PER, soit en effectuant des retraits programmés pour financer votre retraite, soit en laissant fructifier le capital jusqu'à un âge plus favorable.
          </p>

          <h3 className="text-2xl font-bold text-neutral-900 mt-12 mb-4">
            5. L'inflation est une préoccupation majeure
          </h3>

          <p>
            Bien que certaines rentes viagères soient indexées sur l'inflation, la revalorisation effective est souvent inférieure à l'inflation réelle constatée, notamment en période de forte hausse des prix.
          </p>

          <p>
            <strong>Exemple :</strong> avec une inflation à 3% par an et une revalorisation de la rente limitée à 1,5% par an, vous perdez 1,5% de pouvoir d'achat chaque année. Sur une période de 20 ans, cela représente une perte cumulée d'environ 30% en termes de pouvoir d'achat réel.
          </p>

          <p>
            À l'inverse, en conservant votre capital investi en unités de compte (actions, obligations, immobilier) via votre assurance-vie, vous bénéficiez potentiellement d'une meilleure protection contre l'érosion monétaire, notamment via les dividendes croissants et la revalorisation des actifs.
          </p>

          <h2 className="text-3xl font-bold text-neutral-900 mt-16 mb-6">
            Synthèse : les dix points à retenir
          </h2>

          <div className="space-y-6 my-12">
            <div className="flex gap-4">
              <span className="font-bold text-primary-600 shrink-0 text-xl">1.</span>
              <p className="mb-0">La rente viagère est un mécanisme d'assurance longévité, pas un produit d'épargne optimisant le rendement du capital. Vous transférez le risque de longévité à l'assureur en échange d'un revenu garanti à vie.</p>
            </div>
            <div className="flex gap-4">
              <span className="font-bold text-primary-600 shrink-0 text-xl">2.</span>
              <p className="mb-0">Le seuil de rentabilité se situe après l'espérance de vie moyenne en raison de la marge prélevée par l'assureur (20 à 30%) et du principe de mutualisation des risques. Cette caractéristique est inhérente au modèle et parfaitement normale.</p>
            </div>
            <div className="flex gap-4">
              <span className="font-bold text-primary-600 shrink-0 text-xl">3.</span>
              <p className="mb-0">Le taux de conversion augmente significativement avec l'âge. La période optimale pour convertir se situe entre 70 et 75 ans. Avant 65 ans, les montants de rente sont généralement peu attractifs.</p>
            </div>
            <div className="flex gap-4">
              <span className="font-bold text-primary-600 shrink-0 text-xl">4.</span>
              <p className="mb-0">L'option de réversion au profit du conjoint survivant réduit la rente initiale de 20 à 30%. Calculez précisément les besoins réels de votre conjoint avant d'opter pour cette clause.</p>
            </div>
            <div className="flex gap-4">
              <span className="font-bold text-primary-600 shrink-0 text-xl">5.</span>
              <p className="mb-0">La décision est irrévocable : une fois le capital transféré à l'assureur, il est impossible de le récupérer, même partiellement. Pesez soigneusement cette irréversibilité avant de vous engager.</p>
            </div>
            <div className="flex gap-4">
              <span className="font-bold text-primary-600 shrink-0 text-xl">6.</span>
              <p className="mb-0">La rente viagère est pertinente si vous anticipez une longévité supérieure à la moyenne : excellente santé, antécédents familiaux de longévité, mode de vie sain. Dans le cas contraire, d'autres solutions sont préférables.</p>
            </div>
            <div className="flex gap-4">
              <span className="font-bold text-primary-600 shrink-0 text-xl">7.</span>
              <p className="mb-0">Comparez systématiquement les frais de conversion et les frais de gestion annuels entre différents assureurs. Les écarts peuvent être substantiels (variation du simple au triple selon les contrats).</p>
            </div>
            <div className="flex gap-4">
              <span className="font-bold text-primary-600 shrink-0 text-xl">8.</span>
              <p className="mb-0">Évaluez les alternatives patrimoniales selon votre situation : assurance-vie en gestion libre avec retraits programmés, PER, ou stratégies mixtes combinant rente partielle et conservation de capital.</p>
            </div>
            <div className="flex gap-4">
              <span className="font-bold text-primary-600 shrink-0 text-xl">9.</span>
              <p className="mb-0">Utilisez des outils de simulation comme CalcPatrimoine pour visualiser concrètement votre seuil de rentabilité, comparer avec votre espérance de vie, et évaluer l'impact des différentes options (réversion, annuités garanties).</p>
            </div>
            <div className="flex gap-4">
              <span className="font-bold text-primary-600 shrink-0 text-xl">10.</span>
              <p className="mb-0">Consultez un conseiller en gestion de patrimoine indépendant pour une analyse personnalisée de votre situation. Les conseillers liés à un assureur ont des intérêts commerciaux qui ne sont pas nécessairement alignés avec les vôtres.</p>
            </div>
          </div>

          {/* CTA final */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl p-10 my-16 text-center">
            <h3 className="text-3xl font-bold mb-4">
              Simulez votre rente viagère en quelques clics
            </h3>
            <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
              Projection sur 30 ans • Seuil de rentabilité précis • Comparaison avec l'espérance de vie INSEE • 
              Simulation des stratégies couple
            </p>
            <Link 
              href="/"
              className="inline-block bg-white text-primary-700 font-bold text-lg px-10 py-4 rounded-lg hover:bg-neutral-50 transition-colors shadow-lg"
            >
              Accéder au calculateur gratuit →
            </Link>
          </div>

          {/* Footer article */}
          <div className="border-t border-neutral-200 pt-10 mt-16 text-sm text-neutral-600 space-y-4">
            <p>
              <strong>Publié le :</strong> 16 avril 2026<br />
              <strong>Auteur :</strong> Nicolas Barbier - CalcPatrimoine<br />
              <strong>Dernière mise à jour :</strong> 16 avril 2026
            </p>

            <p className="italic">
              Cet article est fourni à titre informatif et pédagogique uniquement. Il ne constitue pas un conseil en investissement personnalisé. 
              Pour toute décision patrimoniale importante, consultez un conseiller en gestion de patrimoine indépendant certifié.
            </p>

            <p className="text-xs">
              <strong>Sources :</strong> Tables de mortalité INSEE 2022 • Enquête patrimoniale INSEE 2021 • 
              Observatoire de l'épargne réglementée 2025
            </p>
          </div>
        </div>
      </article>

      {/* Footer simple */}
      <footer className="bg-white border-t border-neutral-200 py-8 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center text-sm text-neutral-600">
          <Link href="/" className="text-primary-600 hover:text-primary-700 font-medium">
            CalcPatrimoine
          </Link>
          {' · '}
          <Link href="/mentions-legales" className="text-neutral-600 hover:text-neutral-900">
            Mentions légales
          </Link>
          {' · '}
          <Link href="/politique-confidentialite" className="text-neutral-600 hover:text-neutral-900">
            Confidentialité
          </Link>
        </div>
      </footer>
    </div>
  )
}
