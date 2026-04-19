import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
 title: 'Blog - CalcPatrimoine',
 description: 'Articles sur la rente viagère, les calculs actuariels, et la finance personnelle. Tout ce que votre conseiller ne vous dit pas.',
}

export default function BlogIndex() {
 const articles = [
 {
 slug: 'assurance-vie-fiscalite-rachat',
 title: 'Assurance-vie : combien vous allez VRAIMENT payer sur un rachat',
 excerpt: 'Règle proportionnelle, abattement 8 ans, PFU vs IR, date du 27 septembre 2017. Guide complet avec exemples chiffrés et formules détaillées.',
 date: '2026-04-18',
 readTime: '11 min',
 category: 'Finance personnelle',
 },
 {
 slug: 'rente-viagere-seuil-rentabilite',
 title: 'Pourquoi le seuil de rentabilité est après votre espérance de vie',
 excerpt: 'À 72 ans avec 250 000€, le seuil tombe à 15,8 ans alors que l\'espérance est de 14 ans. Découvrez pourquoi c\'est normal — et ce que personne ne vous dit.',
 date: '2026-04-16',
 readTime: '15 min',
 category: 'Finance personnelle',
 },
 ]

 return (
 <main className="min-h-screen bg-neutral-50">
 <Header />

 <div className="max-w-6xl mx-auto px-4 py-16">
 {/* Header */}
 <div className="max-w-3xl mb-16">
 <h1 className="text-5xl font-bold text-neutral-900 mb-6">
 Blog CalcPatrimoine
 </h1>
 <p className="text-xl text-neutral-700">
 Tout ce que votre conseiller ne vous dit pas sur la rente viagère, 
 les calculs actuariels, et la finance personnelle.
 </p>
 </div>

 {/* Liste articles */}
 <div className="grid md:grid-cols-2 gap-8">
 {articles.map((article) => (
 <Link
 key={article.slug}
 href={`/blog/${article.slug}`}
 className="bg-white rounded-xl border border-neutral-200 overflow-hidden hover:shadow-lg transition-shadow group"
>
 <div className="p-8">
 <div className="flex items-center gap-3 text-sm text-neutral-600 mb-4">
 <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full font-medium">
 {article.category}
 </span>
 <time dateTime={article.date}>
 {new Date(article.date).toLocaleDateString('fr-FR', {
 year: 'numeric',
 month: 'long',
 day: 'numeric',
 })}
 </time>
 <span>·</span>
 <span>{article.readTime}</span>
 </div>

 <h2 className="text-2xl font-bold text-neutral-900 mb-4 group-hover:text-primary-700 transition-colors">
 {article.title}
 </h2>

 <p className="text-neutral-700 mb-6">
 {article.excerpt}
 </p>

 <div className="text-primary-600 font-medium group-hover:text-primary-700">
 Lire l'article →
 </div>
 </div>
 </Link>
 ))}
 </div>

 {/* Future articles teaser */}
 <div className="mt-16 text-center">
 <div className="bg-neutral-100 rounded-xl p-12 max-w-2xl mx-auto">
 <div className="text-5xl mb-4"></div>
 <h3 className="text-2xl font-bold text-neutral-900 mb-4">
 D'autres articles arrivent bientôt
 </h3>
 <p className="text-neutral-700">
 Prochains sujets : PER vs assurance-vie, fiscalité des rentes, stratégies 
 couple optimisées, et bien plus encore.
 </p>
 </div>
 </div>
 </div>

 <Footer />
 </main>
 )
}
