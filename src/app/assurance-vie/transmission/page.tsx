import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import TransmissionCalculator from '@/components/Calculator/TransmissionCalculator'

export const metadata: Metadata = {
 title: 'Calculateur Transmission Assurance-Vie : Succession & Bénéficiaires | CalcPatrimoine',
 description: 'Calculez les droits de transmission de votre assurance-vie. Article 990 I (avant 70 ans) et Article 757 B (après 70 ans). Gestion multi-bénéficiaires.',
 keywords: 'transmission assurance vie, succession, bénéficiaires, abattement 152 500, article 990 I, article 757 B, droits succession',
 openGraph: {
 title: 'Calculateur Transmission Assurance-Vie',
 description: 'Simulez les droits de succession sur votre assurance-vie. Calculs conformes au CGI avec gestion multi-bénéficiaires.',
 type: 'article',
 },
}

export default function TransmissionPage() {
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
 <span className="text-neutral-900 font-medium">Transmission</span>
 </div>

 {/* Titre */}
 <h1 className="text-5xl font-bold text-neutral-900 mb-6 leading-tight">
 Calculateur Transmission<br />
 Assurance-Vie
 </h1>
 
 <p className="text-xl text-neutral-700 max-w-3xl leading-relaxed">
 Simulez les droits de succession sur votre assurance-vie. Prend en compte les versements 
 avant et après 70 ans, les abattements par bénéficiaire, et la répartition entre héritiers.
 </p>

 {/* Trust markers */}
 <div className="flex flex-wrap gap-6 mt-8">
 <div className="flex items-center gap-2 text-sm text-neutral-600">
 <span className="text-primary-600 text-lg">✓</span>
 <span>Article 990 I (avant 70 ans)</span>
 </div>
 <div className="flex items-center gap-2 text-sm text-neutral-600">
 <span className="text-primary-600 text-lg">✓</span>
 <span>Article 757 B (après 70 ans)</span>
 </div>
 <div className="flex items-center gap-2 text-sm text-neutral-600">
 <span className="text-primary-600 text-lg">✓</span>
 <span>Jusqu'à 6 bénéficiaires</span>
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
 <TransmissionCalculator />
 </div>

 {/* Explications */}
 <div className="max-w-4xl mx-auto px-4 py-12">
 <div className="bg-white rounded-xl border border-neutral-200 p-8 space-y-6">
 
 <h2 className="text-2xl font-bold text-neutral-900">
 Comment ça marche ?
 </h2>

 <div className="space-y-4 text-neutral-700 leading-relaxed">
 <p>
 <strong>Règle #1 : Deux régimes selon l'âge des versements.</strong><br />
 L'assurance-vie bénéficie d'une fiscalité successorale favorable, mais différente 
 selon que les versements ont été effectués avant ou après 70 ans.
 </p>

 <p>
 <strong>Règle #2 : Article 990 I (versements avant 70 ans).</strong><br />
 Abattement de <strong>152 500€ par bénéficiaire</strong> (non partagé). 
 Au-delà : 20% jusqu'à 700 000€, puis 31,25% au-delà.
 </p>

 <p>
 <strong>Règle #3 : Article 757 B (versements après 70 ans).</strong><br />
 Abattement global de <strong>30 500€ partagé</strong> entre tous les bénéficiaires 
 (sauf conjoint). Les plus-values générées sont totalement exonérées. Au-delà : 
 barème de succession classique.
 </p>

 <p>
 <strong>Règle #4 : Conjoint et PACS totalement exonérés.</strong><br />
 Grâce à la loi TEPA 2007, le conjoint survivant ou partenaire de PACS est 
 totalement exonéré de droits, quel que soit le montant transmis.
 </p>
 </div>
 </div>
 </div>

 {/* Lien vers fiscalité rachat */}
 <div className="max-w-4xl mx-auto px-4 py-8">
 <Link
 href="/assurance-vie/fiscalite-rachat"
 className="block bg-primary-50 border-2 border-primary-200 rounded-xl p-8 hover:border-primary-400 hover:shadow-lg transition-all group"
>
 <div className="flex items-start gap-4">
 <div className="text-4xl"></div>
 <div className="flex-1">
 <h3 className="text-2xl font-bold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors">
 Vous voulez retirer de l'argent de votre contrat ?
 </h3>
 <p className="text-neutral-700 mb-4 leading-relaxed">
 Utilisez notre calculateur de fiscalité des rachats pour simuler les impôts 
 sur un retrait partiel ou total. Comparaison automatique PFU vs IR.
 </p>
 <div className="flex items-center gap-2 text-primary-600 font-medium group-hover:gap-3 transition-all">
 <span>Calculateur Fiscalité Rachat</span>
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
 Abattements et taux 2026
 </h3>
 <div className="bg-white rounded-lg p-5 border border-neutral-200 space-y-3">
 <div className="grid md:grid-cols-2 gap-4 text-sm">
 <div>
 <p className="font-semibold text-neutral-900 mb-1">Article 990 I (avant 70 ans)</p>
 <p className="text-neutral-700">
 Abattement : <strong>152 500€ par bénéficiaire</strong><br />
 Taux : 20% puis 31,25% (seuil 700 000€)
 </p>
 </div>
 <div>
 <p className="font-semibold text-neutral-900 mb-1">Article 757 B (après 70 ans)</p>
 <p className="text-neutral-700">
 Abattement : <strong>30 500€ global partagé</strong><br />
 Taux : barème succession classique
 </p>
 </div>
 <div>
 <p className="font-semibold text-neutral-900 mb-1">Conjoint / PACS</p>
 <p className="text-neutral-700">
 Exonération totale (Loi TEPA 2007)
 </p>
 </div>
 <div>
 <p className="font-semibold text-neutral-900 mb-1">Plus-values après 70 ans</p>
 <p className="text-neutral-700">
 Totalement exonérées
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
 href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000045583309"
 target="_blank"
 rel="noopener noreferrer"
 className="text-primary-600 hover:underline font-medium"
>
 Article 990 I du CGI
 </a>
 <p className="text-neutral-600 text-xs mt-1">
 Prélèvement sur versements avant 70 ans, abattement 152 500€ par bénéficiaire
 </p>
 </div>
 </li>
 <li className="flex items-start gap-2">
 <span className="text-primary-600 mt-1">•</span>
 <div>
 <a 
 href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006305484"
 target="_blank"
 rel="noopener noreferrer"
 className="text-primary-600 hover:underline font-medium"
>
 Article 757 B du CGI
 </a>
 <p className="text-neutral-600 text-xs mt-1">
 Réintégration succession versements après 70 ans, abattement 30 500€
 </p>
 </div>
 </li>
 <li className="flex items-start gap-2">
 <span className="text-primary-600 mt-1">•</span>
 <div>
 <a 
 href="https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000278649"
 target="_blank"
 rel="noopener noreferrer"
 className="text-primary-600 hover:underline font-medium"
>
 Loi TEPA 2007
 </a>
 <p className="text-neutral-600 text-xs mt-1">
 Exonération totale conjoint/PACS pour les successions
 </p>
 </div>
 </li>
 <li className="flex items-start gap-2">
 <span className="text-primary-600 mt-1">•</span>
 <div>
 <a 
 href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000042160878"
 target="_blank"
 rel="noopener noreferrer"
 className="text-primary-600 hover:underline font-medium"
>
 Articles 777 et suivants du CGI
 </a>
 <p className="text-neutral-600 text-xs mt-1">
 Barème des droits de succession en ligne directe
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
 href="https://bofip.impots.gouv.fr/bofip/3296-PGP.html"
 target="_blank"
 rel="noopener noreferrer"
 className="text-primary-600 hover:underline font-medium"
>
 BOFiP - Assurance-vie et successions
 </a>
 <p className="text-neutral-600 text-xs mt-1">
 Bulletin Officiel des Finances Publiques sur la transmission
 </p>
 </div>
 </li>
 <li className="flex items-start gap-2">
 <span className="text-primary-600 mt-1">•</span>
 <div>
 <a 
 href="https://www.service-public.fr/particuliers/vosdroits/F15761"
 target="_blank"
 rel="noopener noreferrer"
 className="text-primary-600 hover:underline font-medium"
>
 Service-Public.fr
 </a>
 <p className="text-neutral-600 text-xs mt-1">
 Fiche pratique : transmission de l'assurance-vie après décès
 </p>
 </div>
 </li>
 </ul>
 </div>

 {/* Note vérification */}
 <div className="bg-primary-50 rounded-lg p-4 border border-primary-200">
 <p className="text-sm text-primary-800">
 <strong>✓ Méthodologie vérifiée</strong> : Tous les calculs sont conformes aux 
 dispositions du Code Général des Impôts et du BOFiP. Barèmes et abattements mis 
 à jour en avril 2026.
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
 patrimonial personnalisé. Pour toute décision successorale, consultez un notaire, 
 un expert-comptable ou un conseiller en gestion de patrimoine indépendant.
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
