import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AssuranceVieCalculator from '@/components/Calculator/AssuranceVieCalculator'

export const metadata: Metadata = {
 title: 'Calculateur Assurance-Vie : Fiscalité Rachat PFU vs IR | CalcPatrimoine',
 description: 'Calculez la fiscalité exacte de votre rachat d\'assurance-vie. Comparez PFU et IR selon votre TMI. Optimisez vos impôts avec notre simulateur gratuit.',
 keywords: 'assurance vie, fiscalité rachat, PFU, flat tax, IR, impôts, simulation, calculateur gratuit, abattement 8 ans',
 openGraph: {
 title: 'Calculateur Fiscalité Assurance-Vie - PFU vs IR',
 description: 'Calculez combien vous allez payer en impôts sur votre rachat d\'assurance-vie. Comparez PFU et IR, optimisez votre choix fiscal.',
 type: 'article',
 },
}

export default function AssuranceViePage() {
 return (
 <>
 <Header />
 <div className="min-h-screen bg-neutral-50">
 {/* Header */}
 <div className="bg-gradient-to-b from-primary-50 to-white border-b border-neutral-200">
 <div className="max-w-6xl mx-auto px-4 py-12">
 
 {/* Breadcrumb */}
 <div className="flex items-center gap-2 text-sm text-neutral-600 mb-6">
 <Link href="/" className="hover:text-primary-600">
 Accueil
 </Link>
 <span>›</span>
 <Link href="/assurance-vie" className="hover:text-primary-600">
 Assurance-Vie
 </Link>
 <span>›</span>
 <span className="text-neutral-900 font-medium">Fiscalité Rachat</span>
 </div>

 {/* Titre */}
 <h1 className="text-5xl font-bold text-neutral-900 mb-6 leading-tight">
 Calculateur Fiscalité<br />
 Rachat Assurance-Vie
 </h1>
 
 <p className="text-xl text-neutral-700 max-w-3xl leading-relaxed">
 Calculez la fiscalité exacte de votre rachat partiel d'assurance-vie. 
 Comparez PFU (flat tax) et IR selon votre tranche d'imposition, 
 et découvrez quelle option vous fait économiser le plus.
 </p>

 {/* Trust markers */}
 <div className="flex flex-wrap gap-6 mt-8">
 <div className="flex items-center gap-2 text-sm text-neutral-600">
 <span className="text-primary-600 text-lg">✓</span>
 <span>Calculs officiels (CGI)</span>
 </div>
 <div className="flex items-center gap-2 text-sm text-neutral-600">
 <span className="text-primary-600 text-lg">✓</span>
 <span>Règle des 8 ans appliquée</span>
 </div>
 <div className="flex items-center gap-2 text-sm text-neutral-600">
 <span className="text-primary-600 text-lg">✓</span>
 <span>Versements avant 2017</span>
 </div>
 <div className="flex items-center gap-2 text-sm text-neutral-600">
 <span className="text-primary-600 text-lg">✓</span>
 <span>Zéro donnée conservée</span>
 </div>
 </div>
 </div>
 </div>

 {/* Calculateur */}
 <div className="max-w-6xl mx-auto px-4 py-12">
 <AssuranceVieCalculator />
 </div>

 {/* Explications */}
 <div className="max-w-4xl mx-auto px-4 py-12">
 <div className="bg-white rounded-xl border border-neutral-200 p-8 space-y-6">
 
 <h2 className="text-2xl font-bold text-neutral-900">
 Comment ça marche ?
 </h2>

 <div className="space-y-4 text-neutral-700 leading-relaxed">
 <p>
 <strong>Règle #1 : On taxe la PLUS-VALUE, pas le capital.</strong><br />
 Si vous avez versé 70 000€ et que votre contrat vaut 100 000€, 
 seuls les 30 000€ de plus-value sont imposables (répartis proportionnellement dans votre rachat).
 </p>

 <p>
 <strong>Règle #2 : L'âge du contrat change TOUT.</strong><br />
 Contrat &lt; 8 ans : pas d'abattement.<br />
 Contrat &gt; 8 ans : abattement de 4 600€ (9 200€ en couple) par an sur la plus-value.
 </p>

 <p>
 <strong>Règle #3 : Vous avez le CHOIX entre PFU et IR.</strong><br />
 • <strong>PFU (Flat Tax)</strong> : taux fixe de 30% (12,8% IR + 17,2% PS)<br />
 • <strong>IR + PS</strong> : votre TMI + 17,2% de prélèvements sociaux
 </p>

 <p>
 <strong>Règle #4 : Versements avant le 27/09/2017.</strong><br />
 Les versements effectués avant cette date bénéficient d'un taux réduit de 24,7% 
 (7,5% IR + 17,2% PS) au lieu de 30%.
 </p>
 </div>
 </div>
 </div>

 {/* Article lié */}
 <div className="max-w-4xl mx-auto px-4 py-12">
 <Link
 href="/assurance-vie/transmission"
 className="block bg-primary-50 border-2 border-primary-200 rounded-xl p-8 hover:border-primary-400 hover:shadow-lg transition-all group mb-6"
>
 <div className="flex items-start gap-4">
 <div className="text-4xl"></div>
 <div className="flex-1">
 <h3 className="text-2xl font-bold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors">
 Vous préparez votre succession ?
 </h3>
 <p className="text-neutral-700 mb-4 leading-relaxed">
 Utilisez notre calculateur de transmission pour simuler les droits 
 de succession sur votre assurance-vie (avant et après 70 ans).
 </p>
 <div className="flex items-center gap-2 text-primary-600 font-medium group-hover:gap-3 transition-all">
 <span>Calculateur Transmission</span>
 <span>→</span>
 </div>
 </div>
 </div>
 </Link>

 <Link
 href="/blog/assurance-vie-fiscalite-rachat"
 className="block bg-primary-50 border-2 border-primary-200 rounded-xl p-8 hover:border-primary-400 hover:shadow-lg transition-all group"
>
 <div className="flex items-start gap-4">
 <div className="text-4xl"></div>
 <div className="flex-1">
 <h3 className="text-2xl font-bold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors">
 Article complet : Assurance-vie, combien vous allez VRAIMENT payer ?
 </h3>
 <p className="text-neutral-700 mb-4 leading-relaxed">
 Découvrez tous les mécanismes fiscaux, les 5 erreurs qui coûtent cher, 
 et les optimisations que personne ne vous dit. 2 500 mots pour tout comprendre.
 </p>
 <div className="flex items-center gap-2 text-primary-600 font-medium group-hover:gap-3 transition-all">
 <span>Lire l'article complet</span>
 <span>→</span>
 </div>
 </div>
 </div>
 </Link>
 </div>

 {/* FAQ */}
 <div className="max-w-4xl mx-auto px-4 py-12">
 <Link
 href="/faq/assurance-vie"
 className="block bg-primary-50 border-2 border-primary-200 rounded-xl p-8 hover:border-primary-400 hover:shadow-lg transition-all group"
>
 <div className="flex items-start gap-4">
 <div className="text-4xl"></div>
 <div className="flex-1">
 <h3 className="text-2xl font-bold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors">
 Questions fréquentes sur l'assurance-vie
 </h3>
 <p className="text-neutral-700 mb-4 leading-relaxed">
 15 questions/réponses détaillées : PFU vs IR, abattement 8 ans, versements avant 2017, 
 optimisations fiscales, fractionnement de rachats, et bien plus.
 </p>
 <div className="flex items-center gap-2 text-primary-600 font-medium group-hover:gap-3 transition-all">
 <span>Voir toutes les questions</span>
 <span>→</span>
 </div>
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
 
 {/* Formules de calcul */}
 <div>
 <h3 className="text-lg font-bold text-neutral-900 mb-3">
 Formules de calcul
 </h3>
 <div className="bg-white rounded-lg p-5 border border-neutral-200 space-y-3">
 <div className="grid md:grid-cols-2 gap-4 text-sm">
 <div>
 <p className="font-medium text-neutral-900 mb-1">Plus-value dans le rachat</p>
 <p className="font-mono text-xs text-neutral-600">
 Montant rachat × (PV totale ÷ Capital total)
 </p>
 </div>
 <div>
 <p className="font-medium text-neutral-900 mb-1">Abattement (si &gt; 8 ans)</p>
 <p className="font-mono text-xs text-neutral-600">
 4 600€ (seul) ou 9 200€ (couple)
 </p>
 </div>
 <div>
 <p className="font-medium text-neutral-900 mb-1">PFU versements après 27/09/2017</p>
 <p className="font-mono text-xs text-neutral-600">
 12,8% IR + 17,2% PS = 30%
 </p>
 </div>
 <div>
 <p className="font-medium text-neutral-900 mb-1">PFU versements avant 27/09/2017</p>
 <p className="font-mono text-xs text-neutral-600">
 7,5% IR + 17,2% PS = 24,7%
 </p>
 </div>
 <div>
 <p className="font-medium text-neutral-900 mb-1">IR + Prélèvements sociaux</p>
 <p className="font-mono text-xs text-neutral-600">
 TMI utilisateur + 17,2%
 </p>
 </div>
 <div>
 <p className="font-medium text-neutral-900 mb-1">Recommandation</p>
 <p className="font-mono text-xs text-neutral-600">
 min(totalPFU, totalIR)
 </p>
 </div>
 </div>
 </div>
 </div>

 {/* Textes de loi */}
 <div>
 <h3 className="text-lg font-bold text-neutral-900 mb-3">
 Textes de loi
 </h3>
 <ul className="space-y-2 text-sm">
 <li className="flex items-start gap-2">
 <span className="text-primary-600 mt-1">•</span>
 <div>
 <a 
 href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000047956718"
 target="_blank"
 rel="noopener noreferrer"
 className="text-primary-600 hover:underline font-medium"
>
 Article 125-0 A du Code Général des Impôts
 </a>
 <p className="text-neutral-600 text-xs mt-1">
 Fiscalité des rachats d'assurance-vie, abattements annuels
 </p>
 </div>
 </li>
 <li className="flex items-start gap-2">
 <span className="text-primary-600 mt-1">•</span>
 <div>
 <a 
 href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000045583309"
 target="_blank"
 rel="noopener noreferrer"
 className="text-primary-600 hover:underline font-medium"
>
 Article 990 I du CGI
 </a>
 <p className="text-neutral-600 text-xs mt-1">
 Prélèvement spécifique sur versements &gt; 150 000€
 </p>
 </div>
 </li>
 <li className="flex items-start gap-2">
 <span className="text-primary-600 mt-1">•</span>
 <div>
 <a 
 href="https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000036339197"
 target="_blank"
 rel="noopener noreferrer"
 className="text-primary-600 hover:underline font-medium"
>
 Loi de finances 2018 (article 28)
 </a>
 <p className="text-neutral-600 text-xs mt-1">
 Réforme PFU (flat tax), date pivot du 27 septembre 2017
 </p>
 </div>
 </li>
 <li className="flex items-start gap-2">
 <span className="text-primary-600 mt-1">•</span>
 <div>
 <a 
 href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000047958086"
 target="_blank"
 rel="noopener noreferrer"
 className="text-primary-600 hover:underline font-medium"
>
 Article L136-7 du Code de la Sécurité Sociale
 </a>
 <p className="text-neutral-600 text-xs mt-1">
 Prélèvements sociaux : CSG 9,2% + CRDS 0,5% + PS 7,5% = 17,2%
 </p>
 </div>
 </li>
 </ul>
 </div>

 {/* Documentation officielle */}
 <div>
 <h3 className="text-lg font-bold text-neutral-900 mb-3">
 Documentation officielle
 </h3>
 <ul className="space-y-2 text-sm">
 <li className="flex items-start gap-2">
 <span className="text-primary-600 mt-1">•</span>
 <div>
 <a 
 href="https://bofip.impots.gouv.fr/bofip/2823-PGP.html"
 target="_blank"
 rel="noopener noreferrer"
 className="text-primary-600 hover:underline font-medium"
>
 BOFiP-RPPM-RCM-20-10-20
 </a>
 <p className="text-neutral-600 text-xs mt-1">
 Bulletin Officiel des Finances Publiques : règle proportionnelle, 
 exemples de calculs détaillés
 </p>
 </div>
 </li>
 <li className="flex items-start gap-2">
 <span className="text-primary-600 mt-1">•</span>
 <div>
 <a 
 href="https://www.service-public.fr/particuliers/vosdroits/F22414"
 target="_blank"
 rel="noopener noreferrer"
 className="text-primary-600 hover:underline font-medium"
>
 Service-Public.fr
 </a>
 <p className="text-neutral-600 text-xs mt-1">
 Fiche pratique : fiscalité de l'assurance-vie en cas de rachat
 </p>
 </div>
 </li>
 <li className="flex items-start gap-2">
 <span className="text-primary-600 mt-1">•</span>
 <div>
 <a 
 href="https://www.ffa-assurance.fr"
 target="_blank"
 rel="noopener noreferrer"
 className="text-primary-600 hover:underline font-medium"
>
 Fédération Française de l'Assurance
 </a>
 <p className="text-neutral-600 text-xs mt-1">
 Guide fiscal de l'assurance-vie (mise à jour annuelle)
 </p>
 </div>
 </li>
 </ul>
 </div>

 {/* Note vérification */}
 <div className="bg-primary-50 rounded-lg p-4 border border-primary-200">
 <p className="text-sm text-primary-800">
 <strong>✓ Méthodologie vérifiée</strong> : Tous les calculs ont été validés 
 par recoupement avec les exemples officiels du BOFiP et de Service-Public.fr. 
 Dernière vérification : Avril 2026.
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
 fiscal personnalisé. Pour toute décision patrimoniale importante, consultez un conseiller 
 en gestion de patrimoine indépendant ou un expert-comptable.
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
