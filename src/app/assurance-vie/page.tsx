import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
 title: 'Calculateurs Assurance-Vie : Fiscalité Rachat & Transmission | CalcPatrimoine',
 description: 'Deux calculateurs gratuits pour l\'assurance-vie : fiscalité des rachats (PFU vs IR) et transmission aux bénéficiaires (succession). Calculs officiels, zéro donnée conservée.',
 keywords: 'assurance vie, calculateur, fiscalité rachat, transmission succession, PFU, IR, bénéficiaires, abattement',
 openGraph: {
 title: 'Calculateurs Assurance-Vie - Fiscalité & Transmission',
 description: 'Deux calculateurs gratuits : fiscalité des rachats et transmission aux bénéficiaires. Calculs officiels conformes au CGI.',
 type: 'website',
 },
}

export default function AssuranceVieHubPage() {
 return (
 <>
 <Header />
 <div className="min-h-screen bg-neutral-50">
 
 {/* Header avec gradient */}
 <div className="bg-gradient-to-b from-primary-50 to-white border-b border-neutral-200">
 <div className="max-w-6xl mx-auto px-4 py-16">
 
 {/* Breadcrumb */}
 <div className="flex items-center gap-2 text-sm text-neutral-600 mb-6">
 <Link href="/" className="hover:text-primary-600">
 Accueil
 </Link>
 <span>›</span>
 <span className="text-neutral-900 font-medium">Assurance-Vie</span>
 </div>

 {/* Titre */}
 <h1 className="text-5xl md:text-6xl font-bold text-neutral-900 mb-6 leading-tight">
 Calculateurs<br />
 Assurance-Vie
 </h1>
 
 <p className="text-xl text-neutral-700 max-w-3xl leading-relaxed">
 Deux outils gratuits pour anticiper votre fiscalité et votre transmission. 
 Calculs conformes au Code Général des Impôts, aucune donnée conservée.
 </p>

 {/* Trust markers */}
 <div className="flex flex-wrap gap-6 mt-8">
 <div className="flex items-center gap-2 text-sm text-neutral-600">
 <span className="text-primary-600 text-lg">✓</span>
 <span>Conforme CGI 2026</span>
 </div>
 <div className="flex items-center gap-2 text-sm text-neutral-600">
 <span className="text-primary-600 text-lg">✓</span>
 <span>Open source</span>
 </div>
 <div className="flex items-center gap-2 text-sm text-neutral-600">
 <span className="text-primary-600 text-lg">✓</span>
 <span>Zéro donnée conservée</span>
 </div>
 <div className="flex items-center gap-2 text-sm text-neutral-600">
 <span className="text-primary-600 text-lg">✓</span>
 <span>100% gratuit</span>
 </div>
 </div>
 </div>
 </div>

 {/* 2 Calculateurs */}
 <div className="max-w-6xl mx-auto px-4 py-16">
 <h2 className="text-3xl font-bold text-neutral-900 mb-2 text-center">
 Choisissez votre calculateur
 </h2>
 <p className="text-neutral-600 text-center mb-12 max-w-2xl mx-auto">
 Deux situations, deux outils adaptés
 </p>

 <div className="grid md:grid-cols-2 gap-6">
 
 {/* Calculateur 1 : Fiscalité Rachat */}
 <Link
 href="/assurance-vie/fiscalite-rachat"
 className="group bg-white rounded-2xl border-2 border-neutral-200 overflow-hidden hover:border-primary-400 hover:shadow-xl transition-all"
>
 {/* Header coloré */}
 <div className="bg-gradient-to-br from-primary-500 to-primary-700 p-8 text-white">
 <div className="text-5xl mb-4"></div>
 <h3 className="text-2xl font-bold mb-2">
 Fiscalité Rachat
 </h3>
 <p className="text-primary-100">
 Combien allez-vous payer sur votre retrait ?
 </p>
 </div>

 {/* Contenu */}
 <div className="p-8">
 <p className="text-neutral-700 mb-6 leading-relaxed">
 Simulez l'impôt exact sur un rachat partiel ou total. Comparez 
 automatiquement <strong>PFU (30%)</strong> et <strong>IR + PS</strong> 
 selon votre tranche d'imposition.
 </p>

 <div className="space-y-2 mb-6">
 <div className="flex items-center gap-2 text-sm">
 <span className="text-primary-600">✓</span>
 <span className="text-neutral-700">Règle proportionnelle automatique</span>
 </div>
 <div className="flex items-center gap-2 text-sm">
 <span className="text-primary-600">✓</span>
 <span className="text-neutral-700">Abattement 8 ans (4 600€ / 9 200€)</span>
 </div>
 <div className="flex items-center gap-2 text-sm">
 <span className="text-primary-600">✓</span>
 <span className="text-neutral-700">Versements avant 27/09/2017</span>
 </div>
 <div className="flex items-center gap-2 text-sm">
 <span className="text-primary-600">✓</span>
 <span className="text-neutral-700">Comparaison PFU vs IR</span>
 </div>
 </div>

 <div className="flex items-center gap-2 text-primary-600 font-bold group-hover:gap-3 transition-all">
 <span>Accéder au calculateur</span>
 <span>→</span>
 </div>
 </div>
 </Link>

 {/* Calculateur 2 : Transmission */}
 <Link
 href="/assurance-vie/transmission"
 className="group bg-white rounded-2xl border-2 border-neutral-200 overflow-hidden hover:border-primary-400 hover:shadow-xl transition-all"
>
 {/* Header coloré */}
 <div className="bg-gradient-to-br from-primary-500 to-primary-700 p-8 text-white">
 <div className="text-5xl mb-4"></div>
 <h3 className="text-2xl font-bold mb-2">
 Transmission
 </h3>
 <p className="text-primary-100">
 Combien vos bénéficiaires vont-ils recevoir ?
 </p>
 </div>

 {/* Contenu */}
 <div className="p-8">
 <p className="text-neutral-700 mb-6 leading-relaxed">
 Simulez les droits de succession sur votre assurance-vie. Gérez 
 plusieurs bénéficiaires avec abattements <strong>avant et après 70 ans</strong>.
 </p>

 <div className="space-y-2 mb-6">
 <div className="flex items-center gap-2 text-sm">
 <span className="text-primary-600">✓</span>
 <span className="text-neutral-700">Article 990 I (abattement 152 500€)</span>
 </div>
 <div className="flex items-center gap-2 text-sm">
 <span className="text-primary-600">✓</span>
 <span className="text-neutral-700">Article 757 B (abattement 30 500€)</span>
 </div>
 <div className="flex items-center gap-2 text-sm">
 <span className="text-primary-600">✓</span>
 <span className="text-neutral-700">Jusqu'à 6 bénéficiaires</span>
 </div>
 <div className="flex items-center gap-2 text-sm">
 <span className="text-primary-600">✓</span>
 <span className="text-neutral-700">Comparaison succession classique</span>
 </div>
 </div>

 <div className="flex items-center gap-2 text-primary-600 font-bold group-hover:gap-3 transition-all">
 <span>Accéder au calculateur</span>
 <span>→</span>
 </div>
 </div>
 </Link>

 </div>
 </div>

 {/* Info pédagogique */}
 <div className="max-w-4xl mx-auto px-4 py-12">
 <div className="bg-white rounded-xl border border-neutral-200 p-8">
 <h2 className="text-2xl font-bold text-neutral-900 mb-6">
 Quelle différence entre les deux ?
 </h2>

 <div className="grid md:grid-cols-2 gap-6">
 <div className="bg-primary-50 rounded-lg p-6 border border-primary-200">
 <h3 className="font-bold text-primary-900 mb-3">
 Fiscalité Rachat
 </h3>
 <p className="text-sm text-neutral-700 mb-3">
 <strong>Quand l'utiliser ?</strong>
 </p>
 <ul className="text-sm text-neutral-700 space-y-1">
 <li>• Vous voulez retirer de l'argent de votre contrat</li>
 <li>• Vous voulez anticiper les impôts sur ce retrait</li>
 <li>• Vous voulez comparer PFU et IR pour votre situation</li>
 </ul>
 </div>

 <div className="bg-primary-50 rounded-lg p-6 border border-primary-200">
 <h3 className="font-bold text-primary-900 mb-3">
 Transmission
 </h3>
 <p className="text-sm text-neutral-700 mb-3">
 <strong>Quand l'utiliser ?</strong>
 </p>
 <ul className="text-sm text-neutral-700 space-y-1">
 <li>• Vous préparez votre succession</li>
 <li>• Vous voulez optimiser la répartition entre bénéficiaires</li>
 <li>• Vous voulez anticiper les droits payés par vos héritiers</li>
 </ul>
 </div>
 </div>
 </div>
 </div>

 {/* Article lié */}
 <div className="max-w-4xl mx-auto px-4 py-8">
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
 Découvrez tous les mécanismes fiscaux, les erreurs courantes, 
 et les optimisations possibles. Guide complet avec exemples chiffrés.
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
 <div className="max-w-4xl mx-auto px-4 py-8">
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
 15 questions/réponses détaillées sur la fiscalité, les abattements, 
 les optimisations et la transmission.
 </p>
 <div className="flex items-center gap-2 text-primary-600 font-medium group-hover:gap-3 transition-all">
 <span>Voir toutes les questions</span>
 <span>→</span>
 </div>
 </div>
 </div>
 </Link>
 </div>

 {/* Footer disclaimer */}
 <div className="max-w-4xl mx-auto px-4 py-12">
 <div className="text-center text-sm text-neutral-600 space-y-2">
 <p className="italic">
 Ces outils sont fournis à titre informatif uniquement. Ils ne constituent pas un conseil 
 fiscal ou patrimonial personnalisé. Pour toute décision importante, consultez un notaire, 
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
