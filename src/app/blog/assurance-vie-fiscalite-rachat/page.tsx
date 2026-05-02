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
      <div className="h-[3px] bg-accent-400 w-full" />
      <article style={{ backgroundColor: '#F7F3EC' }}>

        {/* En-tête article */}
        <header>
          <div className="max-w-4xl mx-auto px-6 py-12">
            <nav className="flex items-center gap-2 font-mono text-xs text-neutral-400 mb-8">
              <Link href="/blog" className="hover:text-primary-600 transition-colors">Blog</Link>
              <span>/</span>
              <span className="text-neutral-600">Fiscalité assurance-vie</span>
            </nav>

            <div className="h-[2px] w-10 bg-accent-400 mb-6" />

            <h1 className="font-serif text-4xl md:text-5xl font-bold text-neutral-900 mb-6 leading-tight">
              Assurance-vie : combien vous allez vraiment payer sur un rachat
            </h1>

            <div className="flex flex-wrap gap-4 font-mono text-xs text-neutral-500">
              <span>Fiscalité</span>
              <span>·</span>
              <span>11 min de lecture</span>
              <span>·</span>
              <span>18 avril 2026</span>
            </div>
          </div>
        </header>

        {/* Contenu */}
        <div className="max-w-4xl mx-auto px-6 pb-16">

          {/* Intro */}
          <div className="mb-12">
            <p className="text-xl text-neutral-700 leading-relaxed mb-6">
              Vous avez 100 000€ sur une assurance-vie, dont 70 000€ de versements et 30 000€ de plus-value.
              Vous voulez retirer 50 000€. Combien allez-vous payer d&apos;impôts ?
            </p>
            <p className="text-neutral-700 mb-4">
              Si vous demandez à trois personnes (votre banquier, votre beau-frère, Google), vous obtiendrez
              probablement trois réponses différentes. Et aucune ne sera complète.
            </p>
            <p className="text-neutral-700 mb-4">
              Parce que la fiscalité du rachat d&apos;assurance-vie n&apos;est pas une simple multiplication. C&apos;est un
              empilement de règles qui interagissent : règle proportionnelle, abattement 8 ans, date pivot du
              27 septembre 2017, choix PFU vs IR.
            </p>
            <p className="font-medium text-lg text-neutral-800">
              Dans cet article, on décortique tout. Formules, calculs, pièges, optimisations. Avec des chiffres
              réels, pas du marketing.
            </p>
          </div>

          {/* Disclaimer */}
          <div className="border-l-4 border-warning-400 bg-warning-50 px-5 py-4 mb-12">
            <p className="font-mono text-xs font-bold text-warning-800 uppercase tracking-wider mb-1">Avertissement</p>
            <p className="text-sm text-warning-700 leading-relaxed">
              Cet article compare les options fiscales disponibles. Il ne constitue pas un
              conseil fiscal personnalisé. Chaque situation est unique. Pour une décision adaptée
              à votre cas, consultez un expert-comptable, un avocat fiscaliste ou un conseiller
              en gestion de patrimoine indépendant.
            </p>
          </div>

          {/* CTA calculateur */}
          <div className="bg-primary-700 px-8 py-6 mb-12">
            <p className="font-mono text-xs text-primary-300 uppercase tracking-wider mb-2">Outil associé</p>
            <p className="text-white font-bold text-lg mb-1">Calculez votre fiscalité en 2 minutes</p>
            <p className="text-primary-200 text-sm mb-4">
              Notre calculateur applique automatiquement toutes les règles : règle proportionnelle,
              abattement 8 ans, taux réduit 2017, comparaison PFU vs IR.
            </p>
            <Link
              href="/assurance-vie"
              className="inline-block bg-white text-primary-700 px-6 py-2.5 font-medium text-sm hover:bg-neutral-100 transition-colors font-mono"
            >
              Accéder au calculateur →
            </Link>
          </div>

          {/* Sommaire */}
          <nav className="bg-white border border-neutral-200 p-6 mb-12">
            <p className="font-mono text-xs uppercase tracking-wider text-neutral-500 mb-4">Sommaire</p>
            <ol className="space-y-2 text-sm font-mono">
              <li><a href="#piege-1" className="text-primary-600 hover:underline">1. Le piège n°1 : croire qu&apos;on taxe tout le rachat</a></li>
              <li><a href="#abattement" className="text-primary-600 hover:underline">2. L&apos;abattement des 8 ans</a></li>
              <li><a href="#pfu-vs-ir" className="text-primary-600 hover:underline">3. PFU ou IR : quelle option choisir ?</a></li>
              <li><a href="#date-2017" className="text-primary-600 hover:underline">4. La date du 27 septembre 2017</a></li>
              <li><a href="#150k" className="text-primary-600 hover:underline">5. Le cas des contrats &gt; 150 000€</a></li>
              <li><a href="#erreurs" className="text-primary-600 hover:underline">6. Les 5 erreurs qui coûtent cher</a></li>
              <li><a href="#cas-concrets" className="text-primary-600 hover:underline">7. Cas concrets : 3 exemples chiffrés</a></li>
              <li><a href="#optimisations" className="text-primary-600 hover:underline">8. Optimisations (100 % légales)</a></li>
            </ol>
          </nav>

          {/* SECTION 1 */}
          <section id="piege-1" className="mb-16">
            <h2 className="font-serif text-3xl font-bold text-neutral-900 mb-6">
              Le piège n°1 : croire qu&apos;on taxe tout le rachat
            </h2>

            <div className="border-l-4 border-warning-400 bg-warning-50 px-5 py-4 mb-4">
              <p className="font-mono text-xs text-warning-700 uppercase tracking-wider mb-1">Idée reçue</p>
              <p className="text-warning-800 text-sm">
                &laquo;&nbsp;Je retire 50 000€, je vais payer 30 % de PFU dessus, soit 15 000€ d&apos;impôts.&nbsp;&raquo;
              </p>
            </div>

            <div className="border-l-4 border-primary-400 bg-primary-50 px-5 py-4 mb-6">
              <p className="font-mono text-xs text-primary-600 uppercase tracking-wider mb-1">Réalité</p>
              <p className="text-primary-800 text-sm">
                On taxe uniquement la <strong>plus-value</strong> contenue dans votre rachat,
                pas le capital que vous avez versé.
              </p>
            </div>

            <h3 className="font-serif text-2xl font-bold text-neutral-900 mt-8 mb-4">
              La règle proportionnelle
            </h3>

            <p className="text-neutral-700 mb-4">
              Quand vous retirez de l&apos;argent, l&apos;administration fiscale applique une règle simple :
              votre rachat contient la même proportion de plus-value que votre contrat global.
            </p>

            <div className="bg-white border border-neutral-200 p-5 my-6">
              <p className="font-mono text-xs text-neutral-400 uppercase tracking-wider mb-2">Formule</p>
              <p className="font-mono text-sm text-neutral-800">
                Plus-value dans rachat = Montant rachat × (Plus-value totale ÷ Capital total)
              </p>
            </div>

            <div className="bg-neutral-50 border border-neutral-200 p-5 my-6">
              <p className="font-mono text-xs text-neutral-400 uppercase tracking-wider mb-3">Exemple concret</p>
              <div className="space-y-1.5 text-sm text-neutral-800 font-mono">
                <p>Capital total du contrat : 100 000€</p>
                <p>Vos versements totaux : 70 000€</p>
                <p>Plus-value totale : 30 000€</p>
                <p className="font-bold text-primary-700 pt-2">→ Taux de plus-value : 30 %</p>
                <p className="pt-2">Vous retirez 50 000€</p>
                <p className="font-bold text-primary-700">Plus-value contenue : 50 000 × 30 % = 15 000€</p>
                <p>Capital remboursé : 50 000 - 15 000 = 35 000€</p>
              </div>
              <div className="mt-4 pt-4 border-t border-neutral-200">
                <p className="text-sm font-bold text-neutral-900">
                  Résultat : vous paierez des impôts uniquement sur les 15 000€ de plus-value, pas sur les 50 000€ complets.
                </p>
              </div>
            </div>

            <p className="text-xs text-neutral-500 font-mono">
              Source :{' '}
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

          {/* SECTION 2 */}
          <section id="abattement" className="mb-16">
            <h2 className="font-serif text-3xl font-bold text-neutral-900 mb-6">
              L&apos;abattement des 8 ans
            </h2>

            <p className="text-neutral-700 mb-4">
              Si votre contrat a <strong>plus de 8 ans</strong>, vous bénéficiez d&apos;un abattement annuel
              sur la plus-value taxable :
            </p>

            <ul className="space-y-1.5 font-mono text-sm text-neutral-700 my-6 pl-0">
              <li>— <strong>4 600€</strong> pour une personne seule</li>
              <li>— <strong>9 200€</strong> pour un couple marié ou pacsé</li>
            </ul>

            <p className="text-neutral-700 mb-6">
              Cet abattement s&apos;applique <strong>chaque année civile</strong>. Et c&apos;est là que ça devient intéressant.
            </p>

            <h3 className="font-bold text-neutral-900 mb-4">Exemple sans abattement vs avec abattement</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
              <div className="bg-white border border-neutral-200 p-5">
                <p className="font-mono text-xs text-neutral-500 uppercase tracking-wider mb-2">Contrat &lt; 8 ans</p>
                <div className="font-mono text-sm space-y-1 text-neutral-700">
                  <p>Plus-value dans rachat : 15 000€</p>
                  <p>Abattement : 0€</p>
                  <p className="font-bold text-primary-700 pt-2">Plus-value taxable : 15 000€</p>
                </div>
              </div>
              <div className="bg-white border border-neutral-200 p-5">
                <p className="font-mono text-xs text-neutral-500 uppercase tracking-wider mb-2">Contrat ≥ 8 ans (seul)</p>
                <div className="font-mono text-sm space-y-1 text-neutral-700">
                  <p>Plus-value dans rachat : 15 000€</p>
                  <p>Abattement : 4 600€</p>
                  <p className="font-bold text-primary-700 pt-2">Plus-value taxable : 10 400€</p>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-accent-400 bg-accent-100 px-5 py-4 my-6">
              <p className="font-mono text-xs text-neutral-600 uppercase tracking-wider mb-1">Économie réalisée</p>
              <p className="text-sm text-neutral-800">
                4 600€ × 30 % (PFU) = <strong>1 380€ d&apos;impôts économisés</strong> juste parce que votre
                contrat a dépassé 8 ans.
              </p>
            </div>

            <h3 className="font-serif text-xl font-bold text-neutral-900 mt-8 mb-4">
              Le piège du &laquo;&nbsp;presque 8 ans&nbsp;&raquo;
            </h3>

            <p className="text-neutral-700 mb-4">
              Votre contrat a 7 ans et 11 mois. Vous avez un besoin urgent de liquidités. Deux options :
            </p>

            <div className="bg-white border border-neutral-200 p-5 my-6">
              <div className="space-y-4 text-sm">
                <div>
                  <p className="font-bold text-neutral-900 font-mono">Option A — Retirer maintenant</p>
                  <p className="text-neutral-600 font-mono">Plus-value taxable : 15 000€ (pas d&apos;abattement)</p>
                  <p className="text-neutral-600 font-mono">Impôt : 15 000€ × 30 % = <strong>4 500€</strong></p>
                </div>
                <div className="border-t border-neutral-100 pt-4">
                  <p className="font-bold text-neutral-900 font-mono">Option B — Attendre 1 mois</p>
                  <p className="text-neutral-600 font-mono">Plus-value taxable : 10 400€ (après abattement 4 600€)</p>
                  <p className="text-neutral-600 font-mono">Impôt : 10 400€ × 30 % = <strong>3 120€</strong></p>
                </div>
                <div className="border-t border-neutral-200 pt-4">
                  <p className="font-bold text-accent-500 font-mono">1 380€ économisés en attendant 30 jours</p>
                </div>
              </div>
            </div>

            <p className="text-neutral-600 italic text-sm">
              C&apos;est souvent la période la plus rentable de toute la vie de votre contrat : un mois d&apos;attente
              peut valoir plusieurs milliers d&apos;euros.
            </p>
          </section>

          {/* SECTION 3 */}
          <section id="pfu-vs-ir" className="mb-16">
            <h2 className="font-serif text-3xl font-bold text-neutral-900 mb-6">
              PFU ou IR : quelle option choisir ?
            </h2>

            <p className="text-neutral-700 mb-6">
              Depuis 2018, vous avez deux options pour payer l&apos;impôt sur votre plus-value :
            </p>

            <div className="space-y-3 mb-8">
              <div className="bg-white border border-neutral-200 p-5">
                <p className="font-mono text-xs text-neutral-500 uppercase tracking-wider mb-2">Option 1 — PFU (Prélèvement Forfaitaire Unique)</p>
                <p className="text-sm text-neutral-700 mb-2">
                  Taux fixe de <strong>30 %</strong> (12,8 % d&apos;impôt + 17,2 % de prélèvements sociaux),
                  quelle que soit votre tranche d&apos;imposition.
                </p>
                <p className="font-mono text-xs text-neutral-500">Simple et prévisible · peut être cher si votre TMI est faible</p>
              </div>

              <div className="bg-white border border-neutral-200 p-5">
                <p className="font-mono text-xs text-neutral-500 uppercase tracking-wider mb-2">Option 2 — IR + PS (Impôt sur le Revenu + Prélèvements Sociaux)</p>
                <p className="text-sm text-neutral-700 mb-2">
                  Votre <strong>Tranche Marginale d&apos;Imposition (TMI)</strong> + 17,2 % de prélèvements sociaux.
                </p>
                <p className="font-mono text-xs text-neutral-500">Peut être moins cher si TMI ≤ 11 % · intégré à votre déclaration annuelle</p>
              </div>
            </div>

            <h3 className="font-bold text-neutral-900 mb-4">Le tableau qui dit tout</h3>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-neutral-300">
                    <th className="py-2 text-left text-neutral-500 font-mono text-xs">Votre TMI</th>
                    <th className="py-2 text-left text-neutral-500 font-mono text-xs">IR + PS</th>
                    <th className="py-2 text-left text-neutral-500 font-mono text-xs">PFU</th>
                    <th className="py-2 text-left text-neutral-500 font-mono text-xs">Écart</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 font-mono text-xs">
                  <tr><td className="py-2 text-neutral-700">0 %</td><td className="py-2">17,2 %</td><td className="py-2">30 %</td><td className="py-2 text-primary-600">PFU coûte +74 %</td></tr>
                  <tr><td className="py-2 text-neutral-700">11 %</td><td className="py-2">28,2 %</td><td className="py-2">30 %</td><td className="py-2 text-primary-600">PFU coûte +6 %</td></tr>
                  <tr><td className="py-2 text-neutral-700">30 %</td><td className="py-2">47,2 %</td><td className="py-2">30 %</td><td className="py-2 text-accent-500">IR coûte +57 %</td></tr>
                  <tr><td className="py-2 text-neutral-700">41 %</td><td className="py-2">58,2 %</td><td className="py-2">30 %</td><td className="py-2 text-accent-500">IR coûte +94 %</td></tr>
                  <tr><td className="py-2 text-neutral-700">45 %</td><td className="py-2">62,2 %</td><td className="py-2">30 %</td><td className="py-2 text-accent-500">IR coûte +107 %</td></tr>
                </tbody>
              </table>
            </div>

            <div className="border-l-4 border-primary-300 bg-primary-50 px-5 py-4 my-6">
              <p className="font-mono text-xs text-primary-600 uppercase tracking-wider mb-2">Verdict</p>
              <ul className="space-y-1 text-sm text-primary-800 font-mono">
                <li>— TMI à 0–11 % : l&apos;option IR est généralement plus avantageuse</li>
                <li>— TMI à 30 %+ : le PFU est nettement plus avantageux</li>
              </ul>
            </div>

            <p className="text-xs text-neutral-500 font-mono">
              Source :{' '}
              <a href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000047956718" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">Article 125-0 A du CGI</a>
            </p>
          </section>

          {/* SECTION 4 */}
          <section id="date-2017" className="mb-16">
            <h2 className="font-serif text-3xl font-bold text-neutral-900 mb-6">
              La date du 27 septembre 2017
            </h2>

            <p className="text-neutral-700 mb-4">
              Si vous avez fait des versements <strong>avant le 27 septembre 2017</strong>, vous bénéficiez
              d&apos;un taux réduit pour les contrats de plus de 8 ans.
            </p>

            <p className="text-neutral-700 mb-6">
              La loi de finances 2018 a créé le PFU (flat tax à 30 %). Pour ne pas pénaliser ceux qui avaient
              ouvert leur contrat sous l&apos;ancien régime, le législateur a instauré un taux préférentiel pour
              les versements antérieurs.
            </p>

            <div className="bg-neutral-50 border border-neutral-200 p-5 my-6">
              <p className="font-mono text-xs text-neutral-400 uppercase tracking-wider mb-3">Taux préférentiel — versements avant 27/09/2017, contrat &gt; 8 ans</p>
              <div className="font-mono text-sm space-y-1 text-neutral-800">
                <p>Taux d&apos;imposition : 7,5 % (au lieu de 12,8 %)</p>
                <p>+ Prélèvements sociaux : 17,2 %</p>
                <p className="font-bold text-primary-700 pt-2 border-t border-neutral-200 mt-2">= Total : 24,7 % (au lieu de 30 %)</p>
              </div>
              <p className="mt-3 text-sm font-bold text-neutral-800">Économie : 5,3 points, soit 530€ sur 10 000€ de plus-value</p>
            </div>

            <h3 className="font-bold text-neutral-900 mt-8 mb-4">Cas mixte (versements avant ET après 2017)</h3>

            <p className="text-neutral-700 mb-4">
              Vous avez versé 50 000€ avant 2017 et 20 000€ après.
              L&apos;administration fiscale calcule une <strong>moyenne pondérée</strong> :
            </p>

            <div className="bg-neutral-50 border border-neutral-200 p-5 my-6">
              <p className="font-mono text-xs text-neutral-400 uppercase tracking-wider mb-3">Exemple</p>
              <div className="font-mono text-sm space-y-1 text-neutral-800">
                <p>Plus-value totale : 30 000€</p>
                <p>Versements avant 2017 : 50 000€ (71 % du total)</p>
                <p>Versements après 2017 : 20 000€ (29 % du total)</p>
                <p className="pt-2">Plus-value avant 2017 : 30 000 × 71 % = 21 300€ → taxée à 24,7 %</p>
                <p>Plus-value après 2017 : 30 000 × 29 % = 8 700€ → taxée à 30 %</p>
                <p className="font-bold text-primary-700 pt-2 border-t border-neutral-200 mt-2">Taux moyen effectif : 26,2 %</p>
              </div>
            </div>

            <div className="border-l-4 border-primary-300 bg-primary-50 px-5 py-4 my-6">
              <p className="text-sm text-primary-800">
                Notre calculateur gère ce cas automatiquement — vous entrez le montant
                des versements avant 2017, il fait le reste.
              </p>
            </div>

            <p className="text-xs text-neutral-500 font-mono">
              Source :{' '}
              <a href="https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000036339197" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">Loi de finances 2018 - Article 28</a>
            </p>
          </section>

          {/* SECTION 5 */}
          <section id="150k" className="mb-16">
            <h2 className="font-serif text-3xl font-bold text-neutral-900 mb-6">
              Le cas des contrats &gt; 150 000€
            </h2>

            <p className="text-neutral-700 mb-6">
              Si vos <strong>versements totaux</strong> (tous contrats confondus) dépassent 150 000€, une
              taxe supplémentaire peut s&apos;appliquer. Mais attention aux idées reçues.
            </p>

            <div className="border-l-4 border-primary-300 bg-primary-50 px-5 py-4 mb-6">
              <p className="font-mono text-xs text-primary-600 uppercase tracking-wider mb-1">Ce qui est taxé</p>
              <p className="text-sm text-primary-800">
                La taxe de 20 % ou 31,25 % s&apos;applique uniquement sur les <strong>versements effectués après
                70 ans</strong> qui dépassent 152 500€ (au-delà de cet abattement).
              </p>
            </div>

            <p className="text-neutral-700 mb-4">
              Si vous avez versé 200 000€ <strong>avant 70 ans</strong>, vous n&apos;êtes PAS concerné
              par cette taxe, même si votre capital a grossi jusqu&apos;à 300 000€.
            </p>

            <div className="bg-neutral-50 border border-neutral-200 p-5 my-6">
              <p className="font-mono text-xs text-neutral-400 uppercase tracking-wider mb-3">Conditions cumulatives</p>
              <div className="font-mono text-sm space-y-1.5 text-neutral-800">
                <p>1. Versements effectués <strong>après vos 70 ans</strong></p>
                <p>2. Ces versements dépassent <strong>152 500€</strong> au total (tous contrats)</p>
                <p>3. L&apos;assureur conserve les fonds après votre décès</p>
              </div>
            </div>

            <div className="border-l-4 border-primary-300 bg-primary-50 px-5 py-4 my-6">
              <p className="text-sm text-primary-800">
                Ce prélèvement ne concerne <strong>que les bénéficiaires au décès</strong>, pas vous de
                votre vivant. Si vous faites un rachat, cette règle ne s&apos;applique pas.
              </p>
            </div>

            <p className="text-xs text-neutral-500 font-mono">
              Source :{' '}
              <a href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000045583309" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">Article 990 I du CGI</a>
            </p>
          </section>

          {/* SECTION 6 */}
          <section id="erreurs" className="mb-16">
            <h2 className="font-serif text-3xl font-bold text-neutral-900 mb-6">
              Les 5 erreurs qui coûtent cher
            </h2>

            {[
              {
                titre: '1. Retirer juste avant les 8 ans',
                desc: 'Votre contrat a 7 ans et 10 mois. Vous retirez tout de suite.',
                cols: [
                  { label: 'Retrait immédiat', lines: ['Plus-value : 15 000€', 'Abattement : 0€', 'Impôt (30 %) : 4 500€'] },
                  { label: 'Attente de 2 mois', lines: ['Plus-value : 15 000€', 'Abattement : 4 600€', 'Impôt (30 %) : 3 120€'] },
                ],
                cout: '1 380€ pour 60 jours d\'impatience',
              },
              {
                titre: '2. Faire un gros rachat unique en décembre',
                desc: 'L\'abattement de 4 600€ s\'applique par an. Si vous retirez 80 000€ d\'un coup, vous « gaspillez » votre abattement de l\'année suivante.',
                cols: [
                  { label: 'Rachat unique (déc. N)', lines: ['Plus-value : 24 000€', 'Abattement année N : 4 600€', 'PV taxable : 19 400€', 'Impôt : 5 820€'] },
                  { label: 'Fractionné (déc. N + janv. N+1)', lines: ['Déc. N : 12 000€ PV → 7 400€ taxable', 'Janv. N+1 : 12 000€ PV → 7 400€ taxable', 'Total taxable : 14 800€', 'Impôt : 4 440€'] },
                ],
                cout: '1 380€ pour 1 mois d\'attente',
              },
              {
                titre: '3. Choisir automatiquement le PFU sans vérifier',
                desc: 'Retraité avec TMI 11 %. Vous laissez le PFU s\'appliquer automatiquement.',
                cols: [
                  { label: 'PFU par défaut', lines: ['Plus-value taxable : 10 000€', 'Taux : 30 %', 'Impôt : 3 000€'] },
                  { label: 'Option IR + PS', lines: ['Plus-value taxable : 10 000€', 'TMI 11 % + PS 17,2 % = 28,2 %', 'Impôt : 2 820€'] },
                ],
                cout: '180€ (et bien plus sur de gros montants)',
              },
            ].map(({ titre, desc, cols, cout }) => (
              <div key={titre} className="mb-10">
                <h3 className="font-bold text-neutral-900 mb-3">{titre}</h3>
                <p className="text-sm text-neutral-700 mb-4">{desc}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                  {cols.map(col => (
                    <div key={col.label} className="bg-white border border-neutral-200 p-4">
                      <p className="font-mono text-xs text-neutral-500 uppercase tracking-wider mb-2">{col.label}</p>
                      <div className="font-mono text-xs space-y-1 text-neutral-700">
                        {col.lines.map(l => <p key={l}>{l}</p>)}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="font-mono text-xs text-accent-500 font-bold">Coût de l&apos;erreur : {cout}</p>
              </div>
            ))}

            <div className="mb-10">
              <h3 className="font-bold text-neutral-900 mb-3">4. Oublier les versements avant 2017</h3>
              <p className="text-sm text-neutral-700 mb-4">
                Vous avez ouvert votre contrat en 2010 et versé 100 000€. Vous pensez que tout sera taxé à 30 %.
                Erreur : tous vos versements avant le 27/09/2017 bénéficient du taux réduit de 24,7 %.
              </p>
              <div className="bg-neutral-50 border border-neutral-200 p-4 font-mono text-xs text-neutral-700">
                <p>Taux 30 % : 6 000€ d&apos;impôt sur 20 000€ de plus-value</p>
                <p>Taux 24,7 % : 4 940€ d&apos;impôt</p>
                <p className="font-bold text-accent-500 pt-1">Économie : 1 060€</p>
              </div>
            </div>

            <div className="mb-10">
              <h3 className="font-bold text-neutral-900 mb-3">5. Confondre capital et plus-value</h3>
              <p className="text-sm text-neutral-700 mb-4">
                Vous avez 100 000€ sur votre contrat. Vous pensez qu&apos;en retirant 50 000€, vous allez payer
                des impôts sur 50 000€. Règle proportionnelle : vous payez sur la plus-value contenue seulement.
              </p>
              <div className="bg-neutral-50 border border-neutral-200 p-4 font-mono text-xs space-y-1 text-neutral-700">
                <p>Impôt imaginé : 50 000€ × 30 % = <strong>15 000€</strong></p>
                <p className="border-t border-neutral-200 pt-1 mt-1">Versements : 70 000€ · Plus-value : 30 000€</p>
                <p>Plus-value dans rachat : 50 000 × 30 % = 15 000€</p>
                <p>Avec abattement 4 600€ : PV taxable = 10 400€</p>
                <p className="font-bold text-primary-700">Impôt réel : 3 120€ (au lieu de 15 000€)</p>
              </div>
            </div>
          </section>

          {/* SECTION 7 */}
          <section id="cas-concrets" className="mb-16">
            <h2 className="font-serif text-3xl font-bold text-neutral-900 mb-6">
              Cas concrets : 3 profils, 3 stratégies
            </h2>

            <p className="text-neutral-700 mb-8">
              Tous les exemples utilisent un contrat de plus de 8 ans avec 100 000€ de capital
              (70 000€ de versements, 30 000€ de plus-value).
            </p>

            {[
              {
                num: 'Cas 1',
                titre: 'Retraité modeste — TMI 0 %',
                profil: 'Jean, 68 ans, retraité. Pension annuelle 18 000€, TMI 0 %, non imposable.',
                besoin: 'Retrait de 50 000€ pour financer des travaux.',
                etapes: [
                  { label: 'Règle proportionnelle', val: 'Plus-value dans rachat : 50 000 × (30 000 ÷ 100 000) = 15 000€' },
                  { label: 'Abattement 8 ans', val: 'Plus-value taxable : 15 000 - 4 600 = 10 400€' },
                ],
                pfu: '10 400 × 30 % = 3 120€',
                ir: '10 400 × (0 % + 17,2 %) = 1 789€',
                conclusion: 'Avec TMI 0 %, l\'option IR + PS génère 1 331€ de différence par rapport au PFU.',
                gagnant: 'IR',
              },
              {
                num: 'Cas 2',
                titre: 'Cadre supérieur — TMI 41 %',
                profil: 'Marie, 45 ans, cadre sup. Salaire 90 000€/an, TMI 41 %.',
                besoin: 'Retrait de 30 000€ pour apport immobilier.',
                etapes: [
                  { label: 'Règle proportionnelle', val: 'Plus-value dans rachat : 30 000 × 30 % = 9 000€' },
                  { label: 'Abattement 8 ans', val: 'Plus-value taxable : 9 000 - 4 600 = 4 400€' },
                ],
                pfu: '4 400 × 30 % = 1 320€',
                ir: '4 400 × (41 % + 17,2 %) = 2 561€',
                conclusion: 'Avec TMI 41 %, le PFU génère 1 241€ de différence par rapport à l\'IR.',
                gagnant: 'PFU',
              },
              {
                num: 'Cas 3',
                titre: 'Couple retraité — TMI 11 %, versements pré-2017',
                profil: 'Paul et Sophie, 70 ans. Pensions cumulées 48 000€/an, TMI 11 %. Tous les versements (70 000€) effectués avant le 27/09/2017.',
                besoin: 'Retrait de 60 000€ pour aider leurs enfants.',
                etapes: [
                  { label: 'Règle proportionnelle', val: 'Plus-value dans rachat : 60 000 × 30 % = 18 000€' },
                  { label: 'Abattement couple (9 200€)', val: 'Plus-value taxable : 18 000 - 9 200 = 8 800€' },
                  { label: 'Taux réduit pré-2017', val: 'Tous versements avant 2017 → taux PFU réduit à 24,7 %' },
                ],
                pfu: '8 800 × 24,7 % = 2 174€',
                ir: '8 800 × (11 % + 17,2 %) = 2 482€',
                conclusion: 'Le PFU avec taux réduit génère 308€ de différence par rapport à l\'IR.',
                gagnant: 'PFU',
              },
            ].map(cas => (
              <div key={cas.num} className="mb-10">
                <div className="bg-primary-700 px-5 py-3">
                  <p className="font-mono text-xs text-primary-300">{cas.num}</p>
                  <p className="text-white font-bold">{cas.titre}</p>
                </div>
                <div className="bg-white border border-neutral-200 border-t-0 p-6">
                  <p className="text-sm text-neutral-700 mb-1"><strong>Profil :</strong> {cas.profil}</p>
                  <p className="text-sm text-neutral-700 mb-5"><strong>Besoin :</strong> {cas.besoin}</p>

                  <div className="space-y-2 mb-5">
                    {cas.etapes.map(e => (
                      <div key={e.label} className="bg-neutral-50 border border-neutral-200 px-4 py-2.5">
                        <p className="font-mono text-xs text-neutral-400 mb-0.5">{e.label}</p>
                        <p className="font-mono text-xs text-neutral-800">{e.val}</p>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className={`border px-4 py-3 ${cas.gagnant === 'PFU' ? 'border-accent-400 bg-accent-100' : 'border-neutral-200 bg-neutral-50'}`}>
                      <p className="font-mono text-xs text-neutral-500 uppercase mb-1">PFU</p>
                      <p className="font-mono text-sm font-bold text-neutral-800">{cas.pfu}</p>
                    </div>
                    <div className={`border px-4 py-3 ${cas.gagnant === 'IR' ? 'border-accent-400 bg-accent-100' : 'border-neutral-200 bg-neutral-50'}`}>
                      <p className="font-mono text-xs text-neutral-500 uppercase mb-1">IR + PS</p>
                      <p className="font-mono text-sm font-bold text-neutral-800">{cas.ir}</p>
                    </div>
                  </div>

                  <div className="border-l-4 border-accent-400 pl-4 py-1">
                    <p className="text-sm text-neutral-800">{cas.conclusion}</p>
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* SECTION 8 */}
          <section id="optimisations" className="mb-16">
            <h2 className="font-serif text-3xl font-bold text-neutral-900 mb-6">
              Optimisations (100 % légales)
            </h2>

            <p className="text-neutral-700 mb-8">Quatre stratégies pour réduire votre fiscalité dans le cadre légal.</p>

            <div className="space-y-3">
              {[
                {
                  titre: '1. Fractionner les rachats pour maximiser l\'abattement',
                  desc: 'L\'abattement de 4 600€ (ou 9 200€) s\'applique chaque année civile. Besoin de 100 000€ en décembre 2026 ? Retirez 50 000€ en décembre 2026 et 50 000€ en janvier 2027 pour profiter de 2× l\'abattement.',
                },
                {
                  titre: '2. Attendre les 8 ans (si proche)',
                  desc: 'Si votre contrat a entre 7 ans 8 mois et 8 ans, attendez avant de retirer. Sur 10 000€ de plus-value, l\'abattement représente 1 380€ d\'impôts économisés.',
                },
                {
                  titre: '3. Comparer systématiquement PFU vs IR',
                  desc: 'Ne laissez pas le PFU s\'appliquer automatiquement si vous avez une TMI faible. Si vous êtes à TMI 0–11 %, l\'IR est souvent plus avantageux.',
                },
                {
                  titre: '4. Privilégier les rachats partiels aux rachats totaux',
                  desc: 'Un rachat partiel préserve votre antériorité fiscale et vos futurs abattements. Si vous clôturez complètement votre contrat et en rouvrez un nouveau, vous perdez l\'ancienneté.',
                },
              ].map(opt => (
                <div key={opt.titre} className="bg-white border border-neutral-200 px-5 py-4">
                  <p className="font-bold text-neutral-900 mb-1.5 text-sm">{opt.titre}</p>
                  <p className="text-sm text-neutral-600">{opt.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA final */}
          <div className="bg-primary-700 px-8 py-6 mb-12">
            <p className="text-white font-bold text-lg mb-1">Prêt à calculer votre fiscalité ?</p>
            <p className="text-primary-200 text-sm mb-4">
              Notre calculateur applique toutes les règles de cet article automatiquement. Gratuit, sans
              inscription, zéro donnée conservée.
            </p>
            <Link
              href="/assurance-vie"
              className="inline-block bg-white text-primary-700 px-6 py-2.5 font-medium text-sm hover:bg-neutral-100 transition-colors font-mono"
            >
              Accéder au calculateur →
            </Link>
          </div>

          {/* Sources */}
          <div className="bg-white border border-neutral-200 p-8">
            <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-6">Méthodologie et sources</h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-500 mb-3">Textes de loi</h3>
                <ul className="space-y-2 text-sm">
                  {[
                    { href: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000047956718', label: 'Article 125-0 A du Code Général des Impôts', desc: 'Fiscalité des rachats, abattements annuels' },
                    { href: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000045583309', label: 'Article 990 I du CGI', desc: 'Prélèvement spécifique sur versements > 150 000€' },
                    { href: 'https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000036339197', label: 'Loi de finances 2018 - Article 28', desc: 'Réforme PFU, date pivot du 27 septembre 2017' },
                    { href: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000047958086', label: 'Article L136-7 du Code de la Sécurité Sociale', desc: 'Prélèvements sociaux : CSG + CRDS + PS = 17,2 %' },
                  ].map(s => (
                    <li key={s.href} className="flex items-start gap-3">
                      <span className="text-accent-400 mt-0.5 shrink-0">—</span>
                      <div>
                        <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline font-medium">{s.label}</a>
                        <p className="text-neutral-500 text-xs mt-0.5">{s.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-500 mb-3">Documentation officielle</h3>
                <ul className="space-y-2 text-sm">
                  {[
                    { href: 'https://bofip.impots.gouv.fr/bofip/2823-PGP.html', label: 'BOFiP-RPPM-RCM-20-10-20', desc: 'Règle proportionnelle et exemples de calculs détaillés' },
                    { href: 'https://www.service-public.fr/particuliers/vosdroits/F22414', label: 'Service-Public.fr', desc: 'Fiche pratique sur la fiscalité de l\'assurance-vie' },
                  ].map(s => (
                    <li key={s.href} className="flex items-start gap-3">
                      <span className="text-accent-400 mt-0.5 shrink-0">—</span>
                      <div>
                        <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline font-medium">{s.label}</a>
                        <p className="text-neutral-500 text-xs mt-0.5">{s.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-500 mb-3">Formules clés</h3>
                <div className="bg-neutral-50 border border-neutral-200 p-5 font-mono text-xs text-neutral-700 space-y-2">
                  <p><span className="text-neutral-400">1. Règle proportionnelle</span><br />PV rachat = Montant rachat × (PV totale ÷ Capital total)</p>
                  <p><span className="text-neutral-400">2. Plus-value taxable</span><br />PV taxable = PV rachat − Abattement</p>
                  <p><span className="text-neutral-400">3. Impôt PFU</span><br />Impôt = PV taxable × 30 % (ou 24,7 % si versements avant 2017)</p>
                  <p><span className="text-neutral-400">4. Impôt IR + PS</span><br />Impôt = PV taxable × (TMI + 17,2 %)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Pied de page article */}
          <div className="border-t border-neutral-200 mt-8 pt-6 text-center">
            <p className="font-mono text-xs text-neutral-400 leading-relaxed">
              Outil indicatif uniquement. Ne constitue pas un conseil fiscal personnalisé.{' '}
              <a href="https://github.com/nba67000/calcpatrimoine" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">Code source ouvert</a>
            </p>
          </div>

        </div>
      </article>
      <Footer />
    </>
  )
}
