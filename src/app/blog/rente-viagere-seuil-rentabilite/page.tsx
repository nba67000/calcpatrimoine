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
        <div className="mb-12">
          <div className="flex items-center gap-3 text-sm text-neutral-600 mb-4">
            <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full font-medium">
              Finance personnelle
            </span>
            <time dateTime="2026-04-16">16 avril 2026</time>
            <span>·</span>
            <span>15 min de lecture</span>
          </div>

          <h1 className="text-4xl font-bold text-neutral-900 mb-6 leading-tight">
            Rente viagère : pourquoi le « seuil de rentabilité » est après votre espérance de vie (et c'est normal)
          </h1>

          <p className="text-xl text-neutral-700 leading-relaxed">
            À 72 ans avec 250 000€, le seuil tombe à 15,8 ans alors que l'espérance de vie est de 14 ans. 
            Découvrez pourquoi c'est exactement comme ça que ça marche — et ce que personne ne vous dit.
          </p>

          <div className="flex items-center gap-3 mt-6 pt-6 border-t border-neutral-200">
            <div className="w-12 h-12 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold">
              NB
            </div>
            <div>
              <div className="font-medium text-neutral-900">Nicolas Barbier</div>
              <div className="text-sm text-neutral-600">Créateur de CalcPatrimoine</div>
            </div>
          </div>
        </div>

        {/* Contenu article */}
        <div className="prose prose-lg max-w-none">
          {/* Introduction */}
          <p className="lead">
            Vous avez 72 ans et 250 000€ sur votre assurance-vie. Votre conseiller vous propose une rente de 1 300€/mois. 
            Ça a l'air bien.
          </p>

          <p>
            Puis vous faites le calcul : 250 000 / (1 300 × 12) = <strong>16 ans</strong>. Vous devez vivre jusqu'à 
            88 ans pour simplement <em>récupérer</em> votre capital. Rentable seulement après.
          </p>

          <p>
            Or votre espérance de vie ? <strong>14-15 ans</strong>. Autrement dit : statistiquement, l'assureur gagne 
            de l'argent. Pas vous.
          </p>

          <p>
            Surprise ? C'est pourtant exactement comme ça que ça marche. Et dans cet article, on va voir pourquoi c'est 
            à la fois normal ET pourquoi il faut le savoir avant de signer.
          </p>

          {/* Box avertissement */}
          <div className="bg-warning-50 border-l-4 border-warning-400 p-6 my-8">
            <h3 className="text-lg font-semibold text-warning-900 mt-0">
              ⚠️ Clarification : on ne parle PAS de viager immobilier
            </h3>
            <p className="mb-0">
              Si vous êtes arrivé ici en cherchant "rente viagère" pour vendre votre maison (bouquet + rente mensuelle), 
              ce n'est pas le sujet. On parle ici de <strong>rente viagère financière</strong> : transformer un capital 
              (PER, assurance-vie, épargne) en revenus mensuels versés jusqu'à votre décès.
            </p>
          </div>

          {/* Le principe */}
          <h2>Le principe (sans langue de bois)</h2>

          <p>Vous avez économisé 200 000€. Deux options :</p>

          <p>
            <strong>Option A</strong> : Vous gardez le capital et piochez dedans chaque mois. Mais combien retirer pour 
            ne pas finir à sec à 95 ans ? Trop peu → vous vous privez. Trop → risque de panne sèche.
          </p>

          <p>
            <strong>Option B</strong> : Vous donnez les 200 000€ à un assureur qui vous garantit 1 100€/mois à vie. 
            Même si vous vivez jusqu'à 105 ans.
          </p>

          <p>
            Contrepartie : si vous mourez à 74 ans, l'assureur empoche le capital restant. Vos héritiers ne touchent rien.
          </p>

          <p>
            C'est ça, la rente viagère. <strong>Un pari sur votre longévité.</strong>
          </p>

          <p>
            L'assureur parie que vous mourrez dans les temps (espérance moyenne). Vous pariez que vous vivrez plus vieux. 
            Si vous gagnez le pari, vous touchez beaucoup plus que votre capital. Si vous perdez, l'assureur garde la mise.
          </p>

          {/* La vraie question */}
          <h2>La vraie question : pourquoi le seuil de rentabilité est APRÈS l'espérance de vie ?</h2>

          <p>Prenons un exemple réel que j'ai eu cette semaine sur CalcPatrimoine :</p>

          <div className="bg-neutral-100 border border-neutral-300 rounded-lg p-6 my-6">
            <p className="font-semibold mb-4">Profil :</p>
            <ul className="space-y-2">
              <li>Âge : <strong>72 ans</strong></li>
              <li>Capital : <strong>255 000€</strong></li>
              <li>Rente proposée : <strong>~1 340€/mois</strong></li>
            </ul>

            <p className="font-semibold mt-6 mb-4">Calcul du seuil :</p>
            <p className="font-mono bg-white p-4 rounded border border-neutral-300">
              255 000 / (1 340 × 12) = <strong className="text-success-600">15,8 ans</strong>
            </p>

            <p className="mt-4">Donc rentable à partir de <strong>87,8 ans</strong>.</p>

            <p className="font-semibold mt-6 mb-4">Or l'espérance de vie à 72 ans (INSEE 2022) :</p>
            <ul className="space-y-2">
              <li>Homme : ~14 ans <span className="text-neutral-600">(86 ans)</span></li>
              <li>Femme : ~17 ans <span className="text-neutral-600">(89 ans)</span></li>
            </ul>

            <p className="mt-4 text-warning-700 font-medium">
              Le seuil est APRÈS l'espérance moyenne pour les hommes, légèrement avant pour les femmes.
            </p>
          </div>

          <h3>Pourquoi c'est comme ça ?</h3>

          <h4>1. L'assureur prend une marge (20-30%)</h4>

          <p>
            Sur 255 000€, l'assureur ne vous reverse pas tout. Il garde :
          </p>

          <ul>
            <li>Une marge bénéficiaire (15-20%)</li>
            <li>Des frais de gestion (5-10%)</li>
            <li>Une provision pour risque longévité</li>
          </ul>

          <p>
            Résultat : sur 255 000€, seuls ~180 000€ sont réellement versés sous forme de rentes. Le reste ? 
            Profit de l'assureur.
          </p>

          <h4>2. L'actuariel fonctionne sur la moyenne</h4>

          <p>
            L'assureur ne parie pas sur VOUS spécifiquement. Il parie sur la loi des grands nombres : sur 1 000 clients, 
            la moitié mourra avant l'espérance, l'autre moitié après.
          </p>

          <p>
            Ceux qui meurent tôt "financent" ceux qui vivent vieux. Et l'assureur empoche la marge au milieu.
          </p>

          <h4>3. C'est un produit d'ASSURANCE, pas d'épargne</h4>

          <p>
            Une assurance auto, vous payez des primes toute votre vie. Si vous n'avez jamais d'accident, vous "perdez" 
            de l'argent. Personne ne trouve ça choquant.
          </p>

          <p>
            La rente viagère, c'est pareil : vous assurez votre longévité. Si vous mourez "trop tôt", vous perdez. 
            C'est le prix de la garantie.
          </p>

          <h3>Alors, c'est une arnaque ?</h3>

          <p>
            <strong>Non</strong>. C'est transparent (enfin, maintenant que vous le savez).
          </p>

          <p>La rente viagère, c'est :</p>

          <ul>
            <li>✅ Une <strong>protection</strong> contre le risque de vivre trop vieux</li>
            <li>✅ Un <strong>revenu garanti</strong> à vie (même si vous vivez jusqu'à 110 ans)</li>
            <li>❌ PAS un placement rentable pour récupérer votre capital</li>
          </ul>

          <div className="bg-success-50 border-l-4 border-success-600 p-6 my-8">
            <p className="font-semibold text-success-900 mb-2">
              La règle d'or :
            </p>
            <p className="mb-0 text-success-900">
              C'est rentable SEULEMENT si vous vivez plus longtemps que la moyenne.
            </p>
          </div>

          {/* Le graphique */}
          <h2>Le graphique qui dit tout</h2>

          <p>Sur CalcPatrimoine, j'ai ajouté un graphique de projection sur 30 ans. Voici ce qu'il montre :</p>

          <div className="bg-neutral-900 text-neutral-100 p-8 rounded-lg font-mono text-sm my-8 overflow-x-auto">
            <pre className="mb-4 text-neutral-400">
Capital : 255k€
Rente : 1 340€/mois
            </pre>
            <pre className="whitespace-pre">
{`  €
  │
340k│                             ╱ Rente cumulée
  │                          ╱
255k├──────────────────────┼──  Capital initial
  │                    ╱   │
  │                 ╱      │✅ Seuil : 15,8 ans
  │              ╱         │
  │           ╱            │🔴 Espérance : 14 ans
  │        ╱               │
 0│     ╱                  │
  └─────┴──────────────────┴────────> Années
  0    10        14       15,8      28`}
            </pre>
          </div>

          <p><strong>Ce que ça montre :</strong></p>

          <ul>
            <li>Ligne bleue (horizontale) : Votre capital (255k€)</li>
            <li>Ligne verte (montante) : Total cumulé des rentes perçues</li>
            <li>Trait vert (✅) : Seuil de rentabilité (15,8 ans)</li>
            <li>Trait rouge (🔴) : Espérance de vie moyenne (14 ans)</li>
          </ul>

          <p>
            <strong>Traduction</strong> : Statistiquement, vous mourrez AVANT d'avoir récupéré votre capital. 
            L'assureur gagne.
          </p>

          <p>
            MAIS : si vous vivez jusqu'à 90 ans (18 ans), vous aurez touché 289k€. Vous gagnez 34k€.<br />
            Et si vous vivez jusqu'à 95 ans (23 ans), vous aurez touché 370k€. Vous gagnez 115k€.
          </p>

          {/* CTA Calculateur */}
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-8 my-12 text-center">
            <h3 className="text-2xl font-bold text-primary-900 mt-0">
              Calculez votre seuil de rentabilité
            </h3>
            <p className="text-neutral-700 mb-6">
              Utilisez CalcPatrimoine pour voir exactement où se situe votre seuil par rapport à votre espérance de vie.
            </p>
            <Link 
              href="/"
              className="inline-block bg-primary-600 text-white font-semibold px-8 py-4 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Essayer le simulateur gratuit →
            </Link>
          </div>

          {/* Les 3 cas où ça a du sens */}
          <h2>Les 3 cas où la rente viagère a du sens</h2>

          <h3>1. Vous êtes convaincu de vivre très vieux</h3>

          <p><strong>Profil :</strong></p>
          <ul>
            <li>Excellente santé</li>
            <li>Parents/grands-parents centenaires</li>
            <li>Mode de vie sain (sport, alimentation, pas de tabac)</li>
          </ul>

          <p>
            <strong>Calcul</strong> : Si vous vivez 5-10 ans de plus que l'espérance, vous touchez 30-50% de plus 
            que votre capital.
          </p>

          <h3>2. Vous n'avez pas d'héritiers</h3>

          <p>
            Si vous êtes célibataire sans enfants, la question de la transmission ne se pose pas. Autant profiter à 
            fond de votre capital.
          </p>

          <p>
            <strong>Bonus</strong> : Vous évitez les droits de succession (qui peuvent atteindre 60% pour les 
            neveux/nièces).
          </p>

          <h3>3. Vous voulez la sécurité absolue</h3>

          <p>
            Vous avez peur de gérer un capital, de mal retirer, de vous faire arnaquer, de perdre en bourse.
          </p>

          <p>
            La rente, c'est <strong>zéro gestion</strong>. Versement automatique chaque mois jusqu'à votre dernier 
            souffle. Même si vous devenez dépendant, même si vous perdez la tête.
          </p>

          {/* Les 5 cas où c'est une mauvaise idée */}
          <h2>Les 5 cas où c'est une mauvaise idée</h2>

          <h3>1. Vous voulez transmettre à vos enfants</h3>

          <p>
            La rente viagère, c'est <strong>zéro héritage</strong> (sauf rare clause "annuités garanties").
          </p>

          <p>
            <strong>Alternative</strong> : Gardez le capital en assurance-vie. Transmission optimisée fiscalement 
            (152 500€ exonérés par bénéficiaire).
          </p>

          <h3>2. Vous pourriez avoir besoin de liquidités</h3>

          <p>Besoin potentiel :</p>
          <ul>
            <li>Travaux maison</li>
            <li>Aide financière enfants</li>
            <li>Dépendance (EHPAD : 2 000-4 000€/mois)</li>
            <li>Soins médicaux non remboursés</li>
          </ul>

          <p>
            La rente, c'est <strong>irréversible</strong>. Impossible de récupérer le capital. Vous êtes coincé.
          </p>

          <h3>3. Votre santé est fragile</h3>

          <p>
            Si votre médecin vous donne une espérance inférieure à la moyenne (cancer, maladie chronique, etc.), 
            vous allez <em>mathématiquement</em> perdre de l'argent.
          </p>

          <p className="bg-warning-50 border-l-4 border-warning-400 p-4">
            <strong>Exemple</strong> : Espérance 8 ans, seuil 15,8 ans. Vous perdez 50% de votre capital.
          </p>

          <h3>4. Vous avez moins de 65 ans</h3>

          <p>Avant 65 ans, la rente est tellement faible que ça ne vaut pas le coup.</p>

          <div className="bg-neutral-100 rounded-lg p-6 my-6">
            <p className="font-semibold mb-4">Exemple pour 200 000€ :</p>
            <ul className="space-y-2">
              <li>60 ans : 780€/mois</li>
              <li>70 ans : 1 360€/mois <span className="text-success-600 font-semibold">(+74%)</span></li>
            </ul>
          </div>

          <p>
            Attendre 10 ans double presque la rente. Pendant ce temps, vivez sur le capital (retraits programmés) 
            ou laissez-le fructifier.
          </p>

          <h3>5. L'inflation vous inquiète</h3>

          <p>
            La rente est revalorisée chaque année, mais pas toujours au niveau de l'inflation réelle.
          </p>

          <p>
            <strong>Exemple</strong> : Inflation 3%/an, revalorisation 1,5%/an. Vous perdez 1,5% de pouvoir d'achat 
            par an. Sur 20 ans : -30%.
          </p>

          {/* FAQ rapide */}
          <h2>Questions fréquentes</h2>

          <h3>Puis-je récupérer mon capital si je change d'avis ?</h3>

          <p>
            <strong>Non</strong>. Irréversible. Une fois signé, c'est définitif.
          </p>

          <p>
            Seule exception rarissime : clause "annuités garanties". Si vous décédez dans les 10 premières années, 
            vos héritiers touchent le solde. Mais ça réduit la rente de 10-15%.
          </p>

          <h3>La rente est-elle revalorisée chaque année ?</h3>

          <p>
            <strong>Oui</strong>, c'est obligatoire (Code des assurances, article A331-5).
          </p>

          <p>
            La revalorisation suit généralement l'IPC (inflation), mais dépend aussi des résultats financiers de 
            l'assureur.
          </p>

          <div className="bg-warning-50 border-l-4 border-warning-400 p-4 my-4">
            <strong>Piège</strong> : Certains assureurs revalorisent mal (0,5%/an alors que l'inflation est à 2-3%). 
            Vérifiez l'historique.
          </div>

          <h3>Que se passe-t-il si mon assureur fait faillite ?</h3>

          <p>
            Vos rentes sont protégées par le <strong>Fonds de Garantie des Assurances de Personnes (FGAP)</strong> 
            jusqu'à <strong>70 000€</strong> par assuré.
          </p>

          <p>Au-delà, vous prenez le risque.</p>

          <p>
            <strong>Règle</strong> : Diversifiez. 100 000€ chez Assureur A, 100 000€ chez Assureur B. Deux rentes de 
            510€ valent mieux qu'une seule de 1 020€.
          </p>

          {/* Synthèse finale */}
          <h2>Ce qu'il faut retenir (les 10 points essentiels)</h2>

          <ol className="space-y-3">
            <li>
              <strong>La rente viagère est un PARI sur votre longévité</strong>, pas un placement. Vous gagnez si 
              vous vivez plus vieux que la moyenne.
            </li>
            <li>
              <strong>Le seuil de rentabilité est APRÈS l'espérance de vie</strong>. C'est normal : l'assureur prend 
              une marge. Statistiquement, il gagne.
            </li>
            <li>
              <strong>Plus vous attendez, plus la rente est élevée</strong>. Sweet spot : 70-75 ans. Avant, vous perdez 
              trop de rente.
            </li>
            <li>
              <strong>La réversion coûte 20-30% de rente</strong> et est unidirectionnelle. Calculez le besoin réel de 
              votre conjoint avant.
            </li>
            <li>
              <strong>Irréversible</strong>. Une fois signé, impossible de récupérer le capital. Réfléchissez TRÈS bien.
            </li>
            <li>
              <strong>Seulement si vous vivez vieux</strong>. Excellente santé, longévité familiale = avantage. Santé 
              fragile = fuyez.
            </li>
            <li>
              <strong>Vérifiez les frais</strong> (conversion + gestion). Ils varient du simple au triple selon les 
              assureurs.
            </li>
            <li>
              <strong>Comparez avec assurance-vie et PER</strong> selon votre situation (héritiers, flexibilité, santé).
            </li>
            <li>
              <strong>Utilisez CalcPatrimoine</strong> pour voir les VRAIS chiffres : seuil exact, graphique projection, 
              impact réversion.
            </li>
            <li>
              <strong>Ne faites pas confiance aveuglément</strong> à votre conseiller. Son intérêt (commission) n'est 
              pas toujours aligné avec le vôtre.
            </li>
          </ol>

          {/* CTA final */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg p-8 my-12">
            <h3 className="text-2xl font-bold mt-0 text-white">
              Calculez votre rente viagère en 3 clics
            </h3>
            <p className="text-primary-100 mb-6">
              Graphique projection 30 ans • Seuil de rentabilité exact • Comparaison espérance de vie • 
              7 stratégies couple
            </p>
            <Link 
              href="/"
              className="inline-block bg-white text-primary-700 font-semibold px-8 py-4 rounded-lg hover:bg-neutral-50 transition-colors"
            >
              Essayer CalcPatrimoine gratuitement →
            </Link>
          </div>

          {/* Sources */}
          <h2>Sources</h2>

          <ul>
            <li>
              <a href="https://www.ined.fr/fr/tout-savoir-population/graphiques-cartes/graphiques-interpretes/esperance-vie-france/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-primary-600 hover:text-primary-700">
                Tables INSEE 2022 - Espérance de vie par âge
              </a>
            </li>
            <li>
              <a href="https://www.service-public.fr/particuliers/vosdroits/F3173" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-primary-600 hover:text-primary-700">
                Service-Public.fr - Fiscalité rentes viagères
              </a>
            </li>
            <li>Code des assurances, articles A331-1 à A331-11 - Réglementation rentes</li>
          </ul>

          {/* Footer article */}
          <div className="border-t border-neutral-200 pt-8 mt-12">
            <p className="text-sm text-neutral-600 mb-4">
              <strong>Publié le :</strong> 16 avril 2026<br />
              <strong>Auteur :</strong> Nicolas Barbier - CalcPatrimoine<br />
              <strong>Licence :</strong> Creative Commons BY-NC-SA 4.0
            </p>

            <p className="text-sm text-neutral-600 italic">
              Cet article est fourni à titre informatif uniquement. Il ne constitue pas un conseil en investissement. 
              Consultez un conseiller financier indépendant avant toute décision patrimoniale importante.
            </p>
          </div>
        </div>
      </article>

      {/* Footer simple */}
      <footer className="bg-white border-t border-neutral-200 py-8">
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
