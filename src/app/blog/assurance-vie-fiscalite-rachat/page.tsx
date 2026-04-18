import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Assurance-vie : combien vous allez VRAIMENT payer sur un rachat (guide 2026)',
  description: 'Règle proportionnelle, abattement 8 ans, PFU vs IR, versements avant 2017. Guide complet avec exemples chiffrés et formules officielles.',
  keywords: 'assurance vie fiscalité, rachat assurance vie impôts, pfu vs ir, abattement 8 ans, règle proportionnelle, versements 2017',
}

export default function ArticleAssuranceViePage() {
  return (
    <>
      <Header />
      <article className="min-h-screen bg-white">
        {/* Header */}
        <header className="bg-gradient-to-b from-primary-50 to-white border-b border-neutral-200">
          <div className="max-w-4xl mx-auto px-4 py-16">
            <Link href="/blog" className="text-primary-600 hover:text-primary-700 text-sm font-medium mb-6 inline-block">
              ← Retour aux articles
            </Link>
            
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6 leading-tight">
              Assurance-vie : combien vous allez VRAIMENT payer sur un rachat
            </h1>
            
            <div className="flex flex-wrap gap-4 text-sm text-neutral-600">
              <span>⏱️ 11 minutes</span>
              <span>•</span>
              <span>📊 Exemples chiffrés</span>
              <span>•</span>
              <span>🗓️ 18 avril 2026</span>
            </div>
          </div>
        </header>

        {/* Contenu */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          
          {/* Intro */}
          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-xl text-neutral-700 leading-relaxed mb-6">
              Vous avez 100 000€ sur une assurance-vie, dont 70 000€ de versements et 30 000€ de plus-value. 
              Vous voulez retirer 50 000€. Combien allez-vous payer d'impôts ?
            </p>
            
            <p className="mb-4">
              Si vous demandez à trois personnes (votre banquier, votre beau-frère, Google), vous obtiendrez 
              probablement trois réponses différentes. Et aucune ne sera complète.
            </p>
            
            <p className="mb-4">
              Parce que la fiscalité du rachat d'assurance-vie n'est pas une simple multiplication. C'est un 
              empilement de règles qui interagissent : règle proportionnelle, abattement 8 ans, date pivot du 
              27 septembre 2017, choix PFU vs IR.
            </p>
            
            <p className="font-medium text-lg">
              Dans cet article, on décortique tout. Formules, calculs, pièges, optimisations. Avec des chiffres 
              réels, pas du marketing.
            </p>
          </div>

          {/* Disclaimer important - EN HAUT */}
          <div className="bg-warning-50 border-2 border-warning-400 rounded-xl p-6 mb-12">
            <div className="flex items-start gap-4">
              <div className="text-3xl">⚠️</div>
              <div>
                <h3 className="font-bold text-warning-900 mb-3">Outil de comparaison uniquement</h3>
                <p className="text-sm text-warning-800 leading-relaxed">
                  Cet article compare les options fiscales disponibles. Il ne constitue <strong>pas</strong> un 
                  conseil fiscal personnalisé. Chaque situation est unique (patrimoine global, objectifs, autres 
                  revenus, héritiers). Pour une décision adaptée à votre cas, consultez un expert-comptable, 
                  un avocat fiscaliste ou un conseiller en gestion de patrimoine indépendant.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Calculateur */}
          <div className="bg-primary-600 rounded-xl p-8 mb-12 text-white">
            <div className="flex items-start gap-4">
              <div className="text-4xl">🧮</div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-3">
                  Calculez votre fiscalité en 2 minutes
                </h3>
                <p className="text-primary-100 mb-4">
                  Notre calculateur applique automatiquement toutes les règles : règle proportionnelle, 
                  abattement 8 ans, taux réduit 2017, comparaison PFU vs IR.
                </p>
                <Link
                  href="/assurance-vie"
                  className="inline-block bg-white text-primary-600 px-6 py-3 rounded-lg font-bold hover:bg-primary-50 transition-colors"
                >
                  Accéder au calculateur →
                </Link>
              </div>
            </div>
          </div>

          {/* Sommaire */}
          <nav className="bg-neutral-50 rounded-xl p-6 mb-12 border border-neutral-200">
            <h2 className="text-xl font-bold text-neutral-900 mb-4">📋 Sommaire</h2>
            <ol className="space-y-2 text-sm">
              <li><a href="#piege-1" className="text-primary-600 hover:underline">1. Le piège n°1 : croire qu'on taxe tout le rachat</a></li>
              <li><a href="#abattement" className="text-primary-600 hover:underline">2. L'abattement des 8 ans</a></li>
              <li><a href="#pfu-vs-ir" className="text-primary-600 hover:underline">3. PFU ou IR : quelle option choisir ?</a></li>
              <li><a href="#date-2017" className="text-primary-600 hover:underline">4. La date du 27 septembre 2017</a></li>
              <li><a href="#150k" className="text-primary-600 hover:underline">5. Le cas des contrats &gt; 150 000€</a></li>
              <li><a href="#erreurs" className="text-primary-600 hover:underline">6. Les 5 erreurs qui coûtent cher</a></li>
              <li><a href="#cas-concrets" className="text-primary-600 hover:underline">7. Cas concrets : 3 exemples chiffrés</a></li>
              <li><a href="#optimisations" className="text-primary-600 hover:underline">8. Optimisations (100% légales)</a></li>
            </ol>
          </nav>

          {/* SECTION 1 : Le piège n°1 */}
          <section id="piege-1" className="mb-16">
            <h2 className="text-3xl font-bold text-neutral-900 mb-6">
              Le piège n°1 : croire qu'on taxe tout le rachat
            </h2>
            
            <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-6">
              <p className="font-bold text-red-900 mb-2">❌ Idée reçue</p>
              <p className="text-red-800">
                "Je retire 50 000€, je vais payer 30% de PFU dessus, soit 15 000€ d'impôts."
              </p>
            </div>
            
            <div className="bg-success-50 border-l-4 border-success-500 p-6 mb-6">
              <p className="font-bold text-success-900 mb-2">✅ Réalité</p>
              <p className="text-success-800">
                On taxe uniquement la <strong>plus-value</strong> contenue dans votre rachat, 
                pas le capital que vous avez versé.
              </p>
            </div>

            <h3 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">
              La règle proportionnelle
            </h3>
            
            <p className="mb-4">
              Quand vous retirez de l'argent, l'administration fiscale applique une règle simple : 
              votre rachat contient la même proportion de plus-value que votre contrat global.
            </p>

            <div className="bg-primary-50 rounded-lg p-6 my-6 border border-primary-200">
              <p className="font-semibold text-primary-900 mb-3">Formule :</p>
              <p className="text-neutral-800">
                Plus-value dans rachat = Montant rachat × (Plus-value totale ÷ Capital total)
              </p>
            </div>

            <div className="bg-white border-2 border-primary-200 rounded-lg p-6 my-6">
              <p className="font-bold text-primary-900 mb-4">📊 Exemple concret</p>
              <div className="space-y-2 text-neutral-800">
                <p>Capital total du contrat : <strong>100 000€</strong></p>
                <p>Vos versements totaux : <strong>70 000€</strong></p>
                <p>Plus-value totale : <strong>30 000€</strong></p>
                <p className="font-bold text-primary-700 mt-3">→ Taux de plus-value : 30%</p>
                <p className="mt-4">Vous retirez <strong>50 000€</strong></p>
                <p className="font-bold text-primary-700">Plus-value contenue : 50 000 × 30% = 15 000€</p>
                <p>Capital remboursé : 50 000 - 15 000 = 35 000€</p>
              </div>
              <div className="mt-6 pt-4 border-t border-primary-200">
                <p className="font-bold text-primary-900">
                  Résultat : vous paierez des impôts uniquement sur les 15 000€ de plus-value, pas sur les 50 000€ complets.
                </p>
              </div>
            </div>

            <p className="text-sm text-neutral-600">
              <strong>Source officielle :</strong>{' '}
              <a 
                href="https://bofip.impots.gouv.fr/bofip/2823-PGP.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:underline"
              >
                BOFiP-RPPM-RCM-20-10-20
              </a>
            </p>
          </section>

          {/* SECTION 2 : Abattement 8 ans */}
          <section id="abattement" className="mb-16">
            <h2 className="text-3xl font-bold text-neutral-900 mb-6">
              L'abattement des 8 ans
            </h2>
            
            <p className="mb-4">
              Si votre contrat a <strong>plus de 8 ans</strong>, vous bénéficiez d'un abattement annuel 
              sur la plus-value taxable :
            </p>

            <ul className="list-disc list-inside space-y-2 my-6 text-lg">
              <li><strong>4 600€</strong> pour une personne seule</li>
              <li><strong>9 200€</strong> pour un couple marié ou pacsé</li>
            </ul>

            <p className="mb-6">
              Cet abattement s'applique <strong>chaque année civile</strong>. Et c'est là que ça devient intéressant.
            </p>

            <h3 className="text-xl font-bold text-neutral-900 mb-4">Exemple sans abattement vs avec abattement</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <p className="font-bold text-red-900 mb-3">Sans abattement (contrat &lt; 8 ans)</p>
                <div className="font-mono text-sm space-y-1">
                  <p>Plus-value dans rachat : 15 000€</p>
                  <p>Abattement : 0€</p>
                  <p className="font-bold text-red-700 pt-2">Plus-value taxable : 15 000€</p>
                </div>
              </div>

              <div className="bg-success-50 border border-success-200 rounded-lg p-6">
                <p className="font-bold text-success-900 mb-3">Avec abattement (contrat ≥ 8 ans, seul)</p>
                <div className="font-mono text-sm space-y-1">
                  <p>Plus-value dans rachat : 15 000€</p>
                  <p>Abattement : 4 600€</p>
                  <p className="font-bold text-success-700 pt-2">Plus-value taxable : 10 400€</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-6">
              <p className="font-bold text-blue-900 mb-2">💡 Économie réalisée</p>
              <p className="text-blue-800">
                4 600€ × 30% (PFU) = <strong>1 380€ d'impôts économisés</strong> juste parce que votre 
                contrat a dépassé 8 ans.
              </p>
            </div>

            <h3 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">
              Le piège du "presque 8 ans"
            </h3>

            <p className="mb-4">
              Votre contrat a 7 ans et 11 mois. Vous avez un besoin urgent de liquidités. Deux options :
            </p>

            <div className="bg-warning-50 border-l-4 border-warning-500 p-6 my-6">
              <div className="space-y-4">
                <div>
                  <p className="font-bold text-neutral-900">Option A : Retirer maintenant</p>
                  <p className="text-sm">Plus-value taxable : 15 000€ (pas d'abattement)</p>
                  <p className="text-sm">Impôt : 15 000€ × 30% = <strong>4 500€</strong></p>
                </div>
                <div>
                  <p className="font-bold text-neutral-900">Option B : Attendre 1 mois</p>
                  <p className="text-sm">Plus-value taxable : 10 400€ (après abattement 4 600€)</p>
                  <p className="text-sm">Impôt : 10 400€ × 30% = <strong>3 120€</strong></p>
                </div>
                <p className="font-bold text-warning-900 border-t border-warning-300 pt-3">
                  Différence : 1 380€ économisés en attendant 30 jours
                </p>
              </div>
            </div>

            <p className="text-neutral-700 italic">
              C'est souvent la période la plus rentable de toute la vie de votre contrat : un mois d'attente 
              peut valoir plusieurs milliers d'euros.
            </p>
          </section>

          {/* SECTION 3 : PFU vs IR */}
          <section id="pfu-vs-ir" className="mb-16">
            <h2 className="text-3xl font-bold text-neutral-900 mb-6">
              PFU ou IR : quelle option choisir ?
            </h2>

            <p className="mb-6">
              Depuis 2018, vous avez deux options pour payer l'impôt sur votre plus-value :
            </p>

            <div className="space-y-6 mb-8">
              <div className="bg-neutral-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-neutral-900 mb-3">
                  Option 1 : PFU (Prélèvement Forfaitaire Unique)
                </h3>
                <p className="mb-3">
                  Taux fixe de <strong>30%</strong> (12,8% d'impôt + 17,2% de prélèvements sociaux), 
                  quelle que soit votre tranche d'imposition.
                </p>
                <p className="text-sm text-neutral-700">
                  <strong>Avantage :</strong> Simple, prévisible<br />
                  <strong>Inconvénient :</strong> Peut être cher si votre TMI est faible
                </p>
              </div>

              <div className="bg-neutral-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-neutral-900 mb-3">
                  Option 2 : IR + PS (Impôt sur le Revenu + Prélèvements Sociaux)
                </h3>
                <p className="mb-3">
                  Votre <strong>Tranche Marginale d'Imposition (TMI)</strong> + 17,2% de prélèvements sociaux.
                </p>
                <p className="text-sm text-neutral-700">
                  <strong>Avantage :</strong> Peut être moins cher si TMI ≤ 11%<br />
                  <strong>Inconvénient :</strong> Plus complexe, intégré à votre déclaration annuelle
                </p>
              </div>
            </div>

            <h3 className="text-xl font-bold text-neutral-900 mb-4">Le tableau qui dit tout</h3>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-neutral-100">
                    <th className="border border-neutral-300 p-3 text-left">Votre TMI</th>
                    <th className="border border-neutral-300 p-3 text-left">IR + PS</th>
                    <th className="border border-neutral-300 p-3 text-left">PFU</th>
                    <th className="border border-neutral-300 p-3 text-left">Différence</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-neutral-300 p-3">0%</td>
                    <td className="border border-neutral-300 p-3">17,2%</td>
                    <td className="border border-neutral-300 p-3">30%</td>
                    <td className="border border-neutral-300 p-3 bg-red-50">PFU coûte +74%</td>
                  </tr>
                  <tr>
                    <td className="border border-neutral-300 p-3">11%</td>
                    <td className="border border-neutral-300 p-3">28,2%</td>
                    <td className="border border-neutral-300 p-3">30%</td>
                    <td className="border border-neutral-300 p-3 bg-red-50">PFU coûte +6%</td>
                  </tr>
                  <tr>
                    <td className="border border-neutral-300 p-3">30%</td>
                    <td className="border border-neutral-300 p-3">47,2%</td>
                    <td className="border border-neutral-300 p-3">30%</td>
                    <td className="border border-neutral-300 p-3 bg-green-50">IR coûte +57%</td>
                  </tr>
                  <tr>
                    <td className="border border-neutral-300 p-3">41%</td>
                    <td className="border border-neutral-300 p-3">58,2%</td>
                    <td className="border border-neutral-300 p-3">30%</td>
                    <td className="border border-neutral-300 p-3 bg-green-50">IR coûte +94%</td>
                  </tr>
                  <tr>
                    <td className="border border-neutral-300 p-3">45%</td>
                    <td className="border border-neutral-300 p-3">62,2%</td>
                    <td className="border border-neutral-300 p-3">30%</td>
                    <td className="border border-neutral-300 p-3 bg-green-50">IR coûte +107%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-6">
              <p className="font-bold text-blue-900 mb-3">Verdict simple</p>
              <ul className="space-y-2 text-blue-800">
                <li>• TMI à 0-11% → L'option IR est généralement plus avantageuse</li>
                <li>• TMI à 30%+ → Le PFU est nettement plus avantageux</li>
              </ul>
            </div>

            <h3 className="text-xl font-bold text-neutral-900 mb-4">Exemple chiffré</h3>

            <div className="bg-neutral-50 rounded-lg p-6">
              <p className="font-bold mb-3">Sur 10 000€ de plus-value taxable :</p>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="font-bold">TMI 11% (IR + PS) :</p>
                  <p>• Impôt : 10 000€ × 11% = 1 100€</p>
                  <p>• Prélèvements sociaux : 10 000€ × 17,2% = 1 720€</p>
                  <p className="font-bold mt-1">Total : 2 820€</p>
                </div>
                <div>
                  <p className="font-bold">PFU :</p>
                  <p className="font-bold">Total : 3 000€</p>
                </div>
                <p className="font-bold text-primary-600 border-t border-neutral-300 pt-3">
                  Différence : 180€ en faveur de l'IR
                </p>
              </div>
            </div>

            <p className="text-sm text-neutral-600 mt-4">
              <strong>Source :</strong>{' '}
              <a 
                href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000047956718"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:underline"
              >
                Article 125-0 A du CGI
              </a>
            </p>
          </section>

          {/* SECTION 4 : Date 27/09/2017 */}
          <section id="date-2017" className="mb-16">
            <h2 className="text-3xl font-bold text-neutral-900 mb-6">
              La date du 27 septembre 2017
            </h2>

            <p className="mb-6">
              Si vous avez fait des versements <strong>avant le 27 septembre 2017</strong>, vous bénéficiez 
              d'un taux réduit pour les contrats de plus de 8 ans.
            </p>

            <h3 className="text-xl font-bold text-neutral-900 mb-4">Pourquoi cette date ?</h3>

            <p className="mb-6">
              La loi de finances 2018 a créé le PFU (flat tax à 30%). Pour ne pas pénaliser ceux qui avaient 
              ouvert leur contrat sous l'ancien régime, le législateur a instauré un taux préférentiel pour 
              les versements antérieurs.
            </p>

            <div className="bg-success-50 rounded-lg p-6 my-6">
              <p className="font-bold text-success-900 mb-3">Le taux préférentiel</p>
              <p className="text-success-800 mb-3">
                Pour les versements avant le 27/09/2017 sur un contrat de plus de 8 ans :
              </p>
              <div className="font-mono text-sm space-y-1 text-neutral-800">
                <p>Taux d'imposition : 7,5% (au lieu de 12,8%)</p>
                <p>+ Prélèvements sociaux : 17,2%</p>
                <p className="font-bold text-success-700 pt-2">= Total : 24,7% (au lieu de 30%)</p>
              </div>
              <p className="mt-4 font-bold text-success-900">
                Économie : 5,3 points, soit 530€ sur 10 000€ de plus-value
              </p>
            </div>

            <h3 className="text-xl font-bold text-neutral-900 mb-4">
              Cas mixte (versements avant ET après 2017)
            </h3>

            <p className="mb-4">
              Vous avez versé 50 000€ avant 2017 et 20 000€ après. Comment ça marche ?
            </p>

            <p className="mb-4">
              L'administration fiscale calcule une <strong>moyenne pondérée</strong> :
            </p>

            <div className="bg-primary-50 rounded-lg p-6 my-6">
              <p className="font-bold text-primary-900 mb-3">Exemple</p>
              <div className="font-mono text-sm space-y-1 text-neutral-800">
                <p>Plus-value totale : 30 000€</p>
                <p>Versements avant 2017 : 50 000€ (71% du total)</p>
                <p>Versements après 2017 : 20 000€ (29% du total)</p>
                <p className="mt-3">Plus-value avant 2017 : 30 000 × 71% = 21 300€ → taxée à 24,7%</p>
                <p>Plus-value après 2017 : 30 000 × 29% = 8 700€ → taxée à 30%</p>
                <p className="font-bold text-primary-700 mt-3 pt-3 border-t border-primary-200">
                  Taux moyen effectif : 26,2%
                </p>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-6">
              <p className="text-blue-800">
                <strong>Notre calculateur gère ce cas automatiquement.</strong> Vous entrez juste le montant 
                des versements avant 2017, il fait le reste.
              </p>
            </div>

            <p className="text-sm text-neutral-600">
              <strong>Source :</strong>{' '}
              <a 
                href="https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000036339197"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:underline"
              >
                Loi de finances 2018 - Article 28
              </a>
            </p>
          </section>

          {/* SECTION 5 : Contrats > 150k€ */}
          <section id="150k" className="mb-16">
            <h2 className="text-3xl font-bold text-neutral-900 mb-6">
              Le cas des contrats &gt; 150 000€
            </h2>

            <p className="mb-6">
              Si vos <strong>versements totaux</strong> (tous contrats confondus) dépassent 150 000€, une 
              taxe supplémentaire peut s'appliquer. Mais attention aux idées reçues.
            </p>

            <div className="bg-warning-50 border-l-4 border-warning-500 p-6 mb-6">
              <p className="font-bold text-warning-900 mb-2">⚠️ Ce qui est taxé</p>
              <p className="text-warning-800">
                La taxe de 2% ou 3,5% s'applique uniquement sur les <strong>versements effectués après 
                70 ans</strong> qui dépassent 152 500€ (au-delà de cet abattement).
              </p>
            </div>

            <p className="mb-4">
              Donc si vous avez versé 200 000€ <strong>avant 70 ans</strong>, vous n'êtes PAS concerné 
              par cette taxe, même si votre capital a grossi jusqu'à 300 000€.
            </p>

            <h3 className="text-xl font-bold text-neutral-900 mb-4">Qui est concerné ?</h3>

            <div className="bg-neutral-50 rounded-lg p-6 my-6">
              <p className="font-bold mb-3">Conditions cumulatives :</p>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>Vous avez fait des versements <strong>après vos 70 ans</strong></li>
                <li>Ces versements dépassent <strong>152 500€</strong> au total (tous contrats)</li>
                <li>L'assureur conserve les fonds après votre décès</li>
              </ol>
            </div>

            <p className="mb-4">
              Si ces 3 conditions sont réunies, le prélèvement de 20% (taux réduit) ou 31,25% (taux normal) 
              s'applique sur la fraction des versements qui dépasse 152 500€.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-6">
              <p className="font-bold text-blue-900 mb-3">💡 Important</p>
              <p className="text-blue-800">
                Ce prélèvement ne concerne <strong>que les bénéficiaires au décès</strong>, pas vous de 
                votre vivant. Si vous faites un rachat, cette règle ne s'applique pas.
              </p>
            </div>

            <p className="text-sm text-neutral-600">
              <strong>Source :</strong>{' '}
              <a 
                href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000045583309"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:underline"
              >
                Article 990 I du CGI
              </a>
            </p>
          </section>

          {/* SECTION 6 : Les 5 erreurs */}
          <section id="erreurs" className="mb-16">
            <h2 className="text-3xl font-bold text-neutral-900 mb-6">
              Les 5 erreurs qui coûtent cher
            </h2>

            {/* Erreur 1 */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-neutral-900 mb-4">
                1. Retirer juste avant les 8 ans
              </h3>
              
              <p className="mb-4">
                Vous avez besoin de liquidités, votre contrat a 7 ans et 10 mois. Vous retirez tout de suite.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="font-bold text-red-900 mb-2">❌ Retrait immédiat</p>
                  <div className="text-sm space-y-1">
                    <p>Plus-value : 15 000€</p>
                    <p>Abattement : 0€</p>
                    <p>Impôt (30%) : <strong>4 500€</strong></p>
                  </div>
                </div>

                <div className="bg-success-50 border border-success-200 rounded-lg p-4">
                  <p className="font-bold text-success-900 mb-2">✅ Attente de 2 mois</p>
                  <div className="text-sm space-y-1">
                    <p>Plus-value : 15 000€</p>
                    <p>Abattement : 4 600€</p>
                    <p>Impôt (30%) : <strong>3 120€</strong></p>
                  </div>
                </div>
              </div>

              <p className="font-bold text-primary-600">
                Coût de l'erreur : 1 380€ pour 60 jours d'impatience
              </p>
            </div>

            {/* Erreur 2 */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-neutral-900 mb-4">
                2. Faire un gros rachat unique en décembre
              </h3>
              
              <p className="mb-4">
                Votre contrat a plus de 8 ans. Vous retirez 80 000€ en une fois en décembre pour financer 
                des travaux.
              </p>

              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                <p className="font-bold text-red-900 mb-2">Problème :</p>
                <p className="text-sm text-red-800">
                  L'abattement de 4 600€ s'applique <strong>par an</strong>. Si vous retirez 80 000€ d'un coup, 
                  vous "gaspillez" votre abattement de l'année suivante.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="font-bold text-red-900 mb-2">❌ Rachat unique (décembre N)</p>
                  <div className="text-sm space-y-1">
                    <p>Plus-value : 24 000€</p>
                    <p>Abattement année N : 4 600€</p>
                    <p>PV taxable : 19 400€</p>
                    <p>Impôt : <strong>5 820€</strong></p>
                  </div>
                </div>

                <div className="bg-success-50 border border-success-200 rounded-lg p-4">
                  <p className="font-bold text-success-900 mb-2">✅ Rachat fractionné (déc N + janv N+1)</p>
                  <div className="text-sm space-y-1">
                    <p>Décembre N : 12 000€ PV → 7 400€ taxable</p>
                    <p>Janvier N+1 : 12 000€ PV → 7 400€ taxable</p>
                    <p>Total taxable : 14 800€</p>
                    <p>Impôt : <strong>4 440€</strong></p>
                  </div>
                </div>
              </div>

              <p className="font-bold text-primary-600">
                Coût de l'erreur : 1 380€ pour 1 mois d'attente
              </p>
            </div>

            {/* Erreur 3 */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-neutral-900 mb-4">
                3. Choisir automatiquement le PFU sans vérifier
              </h3>
              
              <p className="mb-4">
                Vous êtes retraité avec une TMI à 11%. Vous laissez le PFU (option par défaut) s'appliquer 
                automatiquement.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="font-bold text-red-900 mb-2">❌ PFU par défaut</p>
                  <div className="text-sm space-y-1">
                    <p>Plus-value taxable : 10 000€</p>
                    <p>Taux : 30%</p>
                    <p>Impôt : <strong>3 000€</strong></p>
                  </div>
                </div>

                <div className="bg-success-50 border border-success-200 rounded-lg p-4">
                  <p className="font-bold text-success-900 mb-2">✅ Option IR + PS</p>
                  <div className="text-sm space-y-1">
                    <p>Plus-value taxable : 10 000€</p>
                    <p>TMI 11% + PS 17,2% = 28,2%</p>
                    <p>Impôt : <strong>2 820€</strong></p>
                  </div>
                </div>
              </div>

              <p className="font-bold text-primary-600">
                Coût de l'erreur : 180€ (et ça peut être bien plus sur de gros montants)
              </p>
            </div>

            {/* Erreur 4 */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-neutral-900 mb-4">
                4. Oublier les versements avant 2017
              </h3>
              
              <p className="mb-4">
                Vous avez ouvert votre contrat en 2010 et versé 100 000€. Vous pensez que tout sera taxé à 30%.
              </p>

              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                <p className="font-bold text-red-900 mb-2">Erreur :</p>
                <p className="text-sm text-red-800">
                  Tous vos versements avant le 27/09/2017 bénéficient du taux réduit de 24,7% (au lieu de 30%) 
                  si le contrat a plus de 8 ans.
                </p>
              </div>

              <div className="bg-success-50 border-l-4 border-success-500 p-4">
                <p className="font-bold text-success-900 mb-2">Sur 20 000€ de plus-value :</p>
                <div className="text-sm space-y-1 text-success-800">
                  <p>Taux 30% : 6 000€ d'impôt</p>
                  <p>Taux 24,7% : 4 940€ d'impôt</p>
                  <p className="font-bold pt-2">Économie : 1 060€</p>
                </div>
              </div>
            </div>

            {/* Erreur 5 */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-neutral-900 mb-4">
                5. Confondre capital et plus-value
              </h3>
              
              <p className="mb-4">
                Vous avez 100 000€ sur votre contrat. Vous pensez qu'en retirant 50 000€, vous allez payer 
                des impôts sur 50 000€.
              </p>

              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                <p className="font-bold text-red-900 mb-2">Erreur de calcul :</p>
                <p className="text-sm text-red-800">
                  Impôt imaginé : 50 000€ × 30% = 15 000€
                </p>
              </div>

              <div className="bg-success-50 border-l-4 border-success-500 p-4">
                <p className="font-bold text-success-900 mb-2">Réalité (règle proportionnelle) :</p>
                <div className="text-sm space-y-1 text-success-800">
                  <p>Versements : 70 000€, Plus-value : 30 000€</p>
                  <p>Plus-value dans rachat : 50 000 × 30% = 15 000€</p>
                  <p>Avec abattement 4 600€ : PV taxable = 10 400€</p>
                  <p className="font-bold pt-2">Impôt réel : 3 120€ (au lieu de 15 000€ !)</p>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 7 : Cas concrets */}
          <section id="cas-concrets" className="mb-16">
            <h2 className="text-3xl font-bold text-neutral-900 mb-6">
              Cas concrets : 3 profils, 3 stratégies
            </h2>

            <p className="mb-8">
              Voyons comment la fiscalité change selon votre profil. Tous les exemples utilisent un contrat 
              de plus de 8 ans avec 100 000€ de capital (70 000€ de versements, 30 000€ de plus-value).
            </p>

            {/* Cas 1 : Retraité */}
            <div className="mb-10">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg p-4">
                <h3 className="text-xl font-bold">Cas 1 : Retraité modeste (TMI 0%)</h3>
              </div>
              <div className="bg-blue-50 border-2 border-blue-200 rounded-b-lg p-6">
                <p className="mb-4">
                  <strong>Profil :</strong> Jean, 68 ans, retraité, pension annuelle 18 000€, TMI 0%, non imposable.
                </p>
                <p className="mb-4">
                  <strong>Besoin :</strong> Retrait de 50 000€ pour financer des travaux.
                </p>

                <div className="bg-white rounded-lg p-4 mb-4">
                  <p className="font-bold mb-3">📊 Calculs</p>
                  <div className="space-y-4 text-sm">
                    <div>
                      <p className="font-bold text-blue-900">Étape 1 : Règle proportionnelle</p>
                      <p>Plus-value dans rachat : 50 000 × (30 000 ÷ 100 000) = 15 000€</p>
                    </div>
                    
                    <div>
                      <p className="font-bold text-blue-900">Étape 2 : Abattement 8 ans</p>
                      <p>Plus-value taxable : 15 000 - 4 600 = 10 400€</p>
                    </div>

                    <div>
                      <p className="font-bold text-blue-900">Étape 3 : Comparaison fiscale</p>
                      <div className="grid grid-cols-2 gap-4 mt-2">
                        <div className="bg-red-50 p-3 rounded">
                          <p className="font-bold text-red-900">PFU (30%)</p>
                          <p>10 400 × 30% = <strong>3 120€</strong></p>
                        </div>
                        <div className="bg-green-50 p-3 rounded">
                          <p className="font-bold text-green-900">IR + PS</p>
                          <p>10 400 × (0% + 17,2%) = <strong>1 789€</strong></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-green-100 border-l-4 border-green-500 p-4">
                  <p className="font-bold text-green-900 mb-2">💡 Conclusion</p>
                  <p className="text-green-800">
                    Avec TMI 0%, l'option IR + PS génère <strong>1 331€ de différence</strong> par rapport au PFU.
                  </p>
                </div>
              </div>
            </div>

            {/* Cas 2 : Cadre */}
            <div className="mb-10">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-t-lg p-4">
                <h3 className="text-xl font-bold">Cas 2 : Cadre supérieur (TMI 41%)</h3>
              </div>
              <div className="bg-purple-50 border-2 border-purple-200 rounded-b-lg p-6">
                <p className="mb-4">
                  <strong>Profil :</strong> Marie, 45 ans, cadre sup, salaire 90 000€/an, TMI 41%.
                </p>
                <p className="mb-4">
                  <strong>Besoin :</strong> Retrait de 30 000€ pour apport immobilier.
                </p>

                <div className="bg-white rounded-lg p-4 mb-4">
                  <p className="font-bold mb-3">📊 Calculs</p>
                  <div className="space-y-4 text-sm">
                    <div>
                      <p className="font-bold text-purple-900">Étape 1 : Règle proportionnelle</p>
                      <p>Plus-value dans rachat : 30 000 × 30% = 9 000€</p>
                    </div>
                    
                    <div>
                      <p className="font-bold text-purple-900">Étape 2 : Abattement 8 ans</p>
                      <p>Plus-value taxable : 9 000 - 4 600 = 4 400€</p>
                    </div>

                    <div>
                      <p className="font-bold text-purple-900">Étape 3 : Comparaison fiscale</p>
                      <div className="grid grid-cols-2 gap-4 mt-2">
                        <div className="bg-green-50 p-3 rounded">
                          <p className="font-bold text-green-900">PFU (30%)</p>
                          <p>4 400 × 30% = <strong>1 320€</strong></p>
                        </div>
                        <div className="bg-red-50 p-3 rounded">
                          <p className="font-bold text-red-900">IR + PS</p>
                          <p>4 400 × (41% + 17,2%) = <strong>2 561€</strong></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-green-100 border-l-4 border-green-500 p-4">
                  <p className="font-bold text-green-900 mb-2">💡 Conclusion</p>
                  <p className="text-green-800">
                    Avec TMI 41%, le PFU génère <strong>1 241€ de différence</strong> par rapport à l'IR.
                  </p>
                </div>
              </div>
            </div>

            {/* Cas 3 : Couple */}
            <div className="mb-10">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg p-4">
                <h3 className="text-xl font-bold">Cas 3 : Couple retraité (TMI 11%)</h3>
              </div>
              <div className="bg-orange-50 border-2 border-orange-200 rounded-b-lg p-6">
                <p className="mb-4">
                  <strong>Profil :</strong> Paul et Sophie, 70 ans, pensions cumulées 48 000€/an, TMI 11%.
                </p>
                <p className="mb-4">
                  <strong>Besoin :</strong> Retrait de 60 000€ pour aider leurs enfants.
                </p>
                <p className="mb-4 text-sm">
                  <strong>Spécificité :</strong> Contrat ouvert en 2012, tous les versements (70 000€) avant le 27/09/2017.
                </p>

                <div className="bg-white rounded-lg p-4 mb-4">
                  <p className="font-bold mb-3">📊 Calculs</p>
                  <div className="space-y-4 text-sm">
                    <div>
                      <p className="font-bold text-orange-900">Étape 1 : Règle proportionnelle</p>
                      <p>Plus-value dans rachat : 60 000 × 30% = 18 000€</p>
                    </div>
                    
                    <div>
                      <p className="font-bold text-orange-900">Étape 2 : Abattement couple (9 200€)</p>
                      <p>Plus-value taxable : 18 000 - 9 200 = 8 800€</p>
                    </div>

                    <div>
                      <p className="font-bold text-orange-900">Étape 3 : Taux réduit pré-2017</p>
                      <p className="text-xs">Tous versements avant 2017 → taux 24,7% au lieu de 30%</p>
                    </div>

                    <div>
                      <p className="font-bold text-orange-900">Étape 4 : Comparaison fiscale</p>
                      <div className="grid grid-cols-2 gap-4 mt-2">
                        <div className="bg-green-50 p-3 rounded">
                          <p className="font-bold text-green-900">PFU (24,7%)</p>
                          <p>8 800 × 24,7% = <strong>2 174€</strong></p>
                        </div>
                        <div className="bg-red-50 p-3 rounded">
                          <p className="font-bold text-red-900">IR + PS</p>
                          <p>8 800 × (11% + 17,2%) = <strong>2 482€</strong></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-green-100 border-l-4 border-green-500 p-4">
                  <p className="font-bold text-green-900 mb-2">💡 Conclusion</p>
                  <p className="text-green-800 mb-2">
                    Le PFU avec taux réduit génère <strong>308€ de différence</strong> par rapport à l'IR.
                  </p>
                  <p className="text-xs text-green-700">
                    Note : Sans les versements pré-2017, le PFU coûterait 2 640€ (30%), soit 158€ de plus que l'IR.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 8 : Optimisations */}
          <section id="optimisations" className="mb-16">
            <h2 className="text-3xl font-bold text-neutral-900 mb-6">
              Optimisations (100% légales)
            </h2>

            <p className="mb-8">
              Quatre stratégies pour réduire votre fiscalité dans le cadre légal.
            </p>

            {/* Optimisation 1 */}
            <div className="bg-neutral-50 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-neutral-900 mb-3">
                1. Fractionner les rachats pour maximiser l'abattement
              </h3>
              <p className="mb-4">
                L'abattement de 4 600€ (ou 9 200€) s'applique <strong>chaque année civile</strong>.
              </p>
              <p className="text-sm text-neutral-700">
                <strong>Exemple :</strong> Besoin de 100 000€ en décembre 2026. Au lieu de tout retirer d'un coup, 
                retirez 50 000€ en décembre 2026 et 50 000€ en janvier 2027 pour profiter de 2× l'abattement.
              </p>
            </div>

            {/* Optimisation 2 */}
            <div className="bg-neutral-50 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-neutral-900 mb-3">
                2. Attendre les 8 ans (si proche)
              </h3>
              <p className="mb-4">
                Si votre contrat a entre 7 ans et 8 mois et 8 ans, <strong>attendez</strong> avant de retirer.
              </p>
              <p className="text-sm text-neutral-700">
                Sur 10 000€ de plus-value, l'abattement représente 1 380€ d'impôts économisés. C'est souvent 
                plus rentable qu'un livret A pendant ces quelques mois.
              </p>
            </div>

            {/* Optimisation 3 */}
            <div className="bg-neutral-50 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-neutral-900 mb-3">
                3. Comparer systématiquement PFU vs IR
              </h3>
              <p className="mb-4">
                Ne laissez pas le PFU s'appliquer automatiquement si vous avez une TMI faible.
              </p>
              <p className="text-sm text-neutral-700">
                <strong>Utilisez notre calculateur</strong> pour comparer les deux options. Si vous êtes à TMI 0-11%, 
                l'IR est souvent plus avantageux, même si c'est moins "simple".
              </p>
            </div>

            {/* Optimisation 4 */}
            <div className="bg-neutral-50 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-neutral-900 mb-3">
                4. Privilégier les rachats partiels aux rachats totaux
              </h3>
              <p className="mb-4">
                Un rachat partiel préserve votre antériorité fiscale et vos futurs abattements.
              </p>
              <p className="text-sm text-neutral-700">
                Si vous clôturez complètement votre contrat et en rouvrez un nouveau plus tard, vous perdez 
                l'ancienneté et devrez attendre 8 ans pour le nouvel abattement.
              </p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6">
              <p className="font-bold text-blue-900 mb-2">⚙️ Notre calculateur applique tout ça</p>
              <p className="text-blue-800">
                Il gère automatiquement : règle proportionnelle, abattement selon votre situation (seul/couple), 
                taux réduit 2017, et compare PFU vs IR pour vous.
              </p>
            </div>
          </section>

          {/* CTA Final */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-8 text-white text-center mb-12">
            <h3 className="text-2xl font-bold mb-4">
              Prêt à calculer votre fiscalité ?
            </h3>
            <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
              Notre calculateur applique toutes les règles de cet article automatiquement. Gratuit, sans 
              inscription, zéro donnée conservée.
            </p>
            <Link
              href="/assurance-vie"
              className="inline-block bg-white text-primary-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-primary-50 transition-colors"
            >
              Accéder au calculateur →
            </Link>
          </div>

          {/* Sources */}
          <div className="mt-12 pt-12 border-t border-neutral-200">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">
              📚 Méthodologie et sources
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-neutral-900 mb-3">Textes de loi</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a 
                      href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000047956718"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:underline"
                    >
                      Article 125-0 A du Code Général des Impôts
                    </a>
                    {' '}- Fiscalité des rachats, abattements annuels
                  </li>
                  <li>
                    <a 
                      href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000045583309"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:underline"
                    >
                      Article 990 I du CGI
                    </a>
                    {' '}- Prélèvement spécifique sur versements &gt; 150 000€
                  </li>
                  <li>
                    <a 
                      href="https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000036339197"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:underline"
                    >
                      Loi de finances 2018 - Article 28
                    </a>
                    {' '}- Réforme PFU, date pivot du 27 septembre 2017
                  </li>
                  <li>
                    <a 
                      href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000047958086"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:underline"
                    >
                      Article L136-7 du Code de la Sécurité Sociale
                    </a>
                    {' '}- Prélèvements sociaux : CSG + CRDS + PS = 17,2%
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-neutral-900 mb-3">Documentation officielle</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a 
                      href="https://bofip.impots.gouv.fr/bofip/2823-PGP.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:underline"
                    >
                      BOFiP-RPPM-RCM-20-10-20
                    </a>
                    {' '}- Règle proportionnelle et exemples de calculs détaillés
                  </li>
                  <li>
                    <a 
                      href="https://www.service-public.fr/particuliers/vosdroits/F22414"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:underline"
                    >
                      Service-Public.fr
                    </a>
                    {' '}- Fiche pratique sur la fiscalité de l'assurance-vie
                  </li>
                  <li>
                    <a 
                      href="https://www.ffa-assurance.fr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:underline"
                    >
                      Fédération Française de l'Assurance
                    </a>
                    {' '}- Guide fiscal de l'assurance-vie
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-neutral-900 mb-3">Formules clés</h3>
                <div className="bg-primary-50 rounded-lg p-6 border border-primary-200 space-y-4">
                  <div>
                    <p className="font-bold text-neutral-900 mb-2">1. Règle proportionnelle</p>
                    <p className="text-neutral-700">PV rachat = Montant rachat × (PV totale ÷ Capital total)</p>
                  </div>
                  <div>
                    <p className="font-bold text-neutral-900 mb-2">2. Plus-value taxable</p>
                    <p className="text-neutral-700">PV taxable = PV rachat - Abattement</p>
                  </div>
                  <div>
                    <p className="font-bold text-neutral-900 mb-2">3. Impôt PFU</p>
                    <p className="text-neutral-700">Impôt = PV taxable × 30% (ou 24,7% avant 2017)</p>
                  </div>
                  <div>
                    <p className="font-bold text-neutral-900 mb-2">4. Impôt IR + PS</p>
                    <p className="text-neutral-700">Impôt = PV taxable × (TMI + 17,2%)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-12 bg-neutral-100 border border-neutral-300 rounded-xl p-6">
            <p className="text-xs text-neutral-700">
              Code source du calculateur : {' '}
              <a 
                href="https://github.com/nba67000/calcpatrimoine"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-neutral-900"
              >
                github.com/nba67000/calcpatrimoine
              </a>
            </p>
          </div>

        </div>
      </article>
      <Footer />
    </>
  )
}
