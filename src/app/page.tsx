import Link from 'next/link'
import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import HomeHeroWidget from '@/components/HomeHeroWidget'

export const metadata: Metadata = {
  title: 'CalcPatrimoine — Calculateurs patrimoniaux gratuits et open-source',
  description: 'Rente viagère, assurance-vie, PER, impôt sur le revenu. Calculs basés sur les textes officiels. Aucune donnée conservée. Code source ouvert.',
  keywords: 'calculateur patrimoine, rente viagère, assurance vie, PER, TMI, retraite, simulateur gratuit, open-source',
  openGraph: {
    title: 'CalcPatrimoine — Calculateurs patrimoniaux gratuits',
    description: 'Quatre outils de calcul patrimonial basés sur les textes officiels. Aucun conseil, aucune donnée conservée.',
    type: 'website',
  },
}

const CALCULATEURS_ACTIFS = [
  {
    href: '/rente-viagere',
    nom: 'Rente Viagère',
    tag: 'Assurance',
    desc: 'Convertit un capital en revenu mensuel garanti à vie. Seuil de rentabilité, espérance INSEE, stratégies couple.',
  },
  {
    href: '/assurance-vie',
    nom: 'Assurance-Vie',
    tag: 'Fiscalité',
    desc: 'Fiscalité des rachats (PFU vs barème IR) et transmission aux bénéficiaires (succession).',
  },
  {
    href: '/tmi',
    nom: 'TMI — Impôt sur le revenu',
    tag: 'Fiscalité',
    desc: 'Visualise les tranches marginales, le taux effectif et l\'impôt annuel selon le barème en vigueur.',
  },
  {
    href: '/per-individuel',
    nom: 'PER Individuel',
    tag: 'Retraite',
    desc: 'Économie d\'impôt sur versement et comparaison avec l\'assurance-vie selon votre TMI.',
  },
]

const CALCULATEURS_A_VENIR = [
  {
    nom: 'SCPI',
    tag: 'Immobilier',
    desc: 'Revenus locatifs papier et rentabilité comparée entre véhicules.',
  },
  {
    nom: 'Immobilier locatif',
    tag: 'Immobilier',
    desc: 'Rendement brut/net, cash-flow, fiscalité LMNP et SCI.',
  },
]

const ARTICLES = [
  {
    href: '/blog/assurance-vie-fiscalite-rachat',
    tag: 'Fiscalité',
    duree: '11 min',
    titre: 'Assurance-vie : combien vous allez vraiment payer sur un rachat',
    accroche: 'Règle proportionnelle, abattement 8 ans, PFU vs IR, versements avant 2017. Tout le détail.',
  },
  {
    href: '/blog/rente-viagere-seuil-rentabilite',
    tag: 'Rente viagère',
    duree: '15 min',
    titre: 'Pourquoi le seuil de rentabilité est après votre espérance de vie',
    accroche: 'À 72 ans avec 250 000 €, le seuil tombe à 15,8 ans. Ce n\'est pas une anomalie.',
  },
]

export default function HomePage() {
  return (
    <>
      <Header />

      {/* Liseré or accent en haut du contenu */}
      <div className="h-[3px] bg-accent-400 w-full" />

      <div style={{ backgroundColor: '#F7F3EC' }}>

        {/* ── HERO ─────────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-6 pt-16 pb-12 lg:pt-24 lg:pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1.75fr_1fr] gap-10 lg:gap-16 items-start">

            {/* Colonne gauche — éditoriale */}
            <div>
              <p className="font-mono text-xs text-neutral-400 uppercase tracking-widest mb-6">
                Calcul patrimonial — France
              </p>

              {/* Filet or */}
              <div className="h-[2px] w-14 bg-accent-400 mb-8" />

              <h1 className="font-serif text-5xl lg:text-[3.6rem] text-neutral-900 leading-tight tracking-tight mb-6">
                Des chiffres précis.<br />
                Pas de conseil.
              </h1>

              <p className="text-lg text-neutral-600 leading-relaxed mb-10 max-w-xl">
                Rente viagère, assurance-vie, PER, impôt sur le revenu.
                Quatre calculateurs basés sur les textes officiels en vigueur.
                Les calculs s&apos;exécutent entièrement dans votre navigateur.
              </p>

              {/* Données de confiance en monospace */}
              <div className="flex flex-wrap gap-x-8 gap-y-2.5">
                {[
                  '0 donnée collectée',
                  '4 calculateurs actifs',
                  'Sources : CGI · BOFiP · INSEE',
                  'Code source ouvert',
                ].map(label => (
                  <span key={label} className="font-mono text-xs text-neutral-500">
                    {label}
                  </span>
                ))}
              </div>
            </div>

            {/* Colonne droite — widget interactif */}
            <div>
              <HomeHeroWidget />
            </div>
          </div>
        </section>

        {/* ── CALCULATEURS ─────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-6 py-12 lg:py-16">

          {/* En-tête de section */}
          <div className="flex items-center gap-6 mb-0">
            <h2 className="font-serif text-3xl text-neutral-900 shrink-0">
              Les outils
            </h2>
            <div className="flex-1 h-[1px] bg-neutral-300" />
          </div>

          {/* Calculateurs disponibles */}
          <div className="border-t border-neutral-300">
            {CALCULATEURS_ACTIFS.map((calc) => (
              <Link
                key={calc.href}
                href={calc.href}
                className="group flex items-center gap-4 lg:gap-8 py-5 border-b border-neutral-200 hover:bg-white transition-colors pr-6"
                style={{ borderLeft: '3px solid #2E4A6F', paddingLeft: '1.25rem' }}
              >
                <span className="font-mono text-xs text-primary-600 border border-primary-300 px-2 py-0.5 shrink-0 hidden sm:inline bg-white">
                  {calc.tag}
                </span>
                <span className="font-bold text-neutral-900 group-hover:text-primary-700 transition-colors shrink-0 min-w-[10rem] lg:min-w-[14rem]">
                  {calc.nom}
                </span>
                <span className="text-neutral-500 text-sm flex-1 hidden md:block leading-snug">
                  {calc.desc}
                </span>
                <span className="font-mono text-primary-600 group-hover:translate-x-1 transition-transform ml-auto shrink-0">
                  →
                </span>
              </Link>
            ))}

            {/* Calculateurs à venir — atténués */}
            {CALCULATEURS_A_VENIR.map((calc) => (
              <div
                key={calc.nom}
                className="flex items-center gap-4 lg:gap-8 py-5 border-b border-neutral-200 pr-6 opacity-35"
                style={{ borderLeft: '3px solid #94A3B8', paddingLeft: '1.25rem' }}
              >
                <span className="font-mono text-xs text-neutral-500 border border-neutral-300 px-2 py-0.5 shrink-0 hidden sm:inline">
                  {calc.tag}
                </span>
                <span className="font-bold text-neutral-500 shrink-0 min-w-[10rem] lg:min-w-[14rem]">
                  {calc.nom}
                </span>
                <span className="text-neutral-400 text-sm flex-1 hidden md:block leading-snug">
                  {calc.desc}
                </span>
                <span className="font-mono text-xs text-neutral-400 ml-auto shrink-0">
                  Bientôt
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── MANIFESTE ────────────────────────────────────────── */}
        <section className="max-w-2xl mx-auto px-6 py-16 lg:py-20 text-center">
          <div className="h-[1px] w-20 bg-accent-400 mx-auto mb-10" />

          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-neutral-900 leading-tight mb-6">
            CalcPatrimoine calcule.<br />
            Il ne conseille pas.
          </h2>

          <p className="text-neutral-600 leading-relaxed">
            Chaque résultat repose sur les textes officiels en vigueur —
            Code général des impôts, BOFiP, tables de mortalité INSEE 2022.
            Le code source est public et auditable.
            Les données ne quittent pas votre navigateur.
          </p>

          <div className="h-[1px] w-20 bg-accent-400 mx-auto mt-10" />
        </section>

        {/* ── ARTICLES ─────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-6 py-12 pb-24">

          <div className="flex items-center gap-6 mb-0">
            <h2 className="font-serif text-3xl text-neutral-900 shrink-0">
              À lire avant de calculer
            </h2>
            <div className="flex-1 h-[1px] bg-neutral-300" />
          </div>

          <div className="border-t border-neutral-300">
            {ARTICLES.map((article) => (
              <Link
                key={article.href}
                href={article.href}
                className="group flex flex-col gap-1.5 py-6 border-b border-neutral-200 hover:bg-white transition-colors px-5"
                style={{ borderLeft: '3px solid #D4AF37' }}
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-neutral-500">{article.tag}</span>
                  <span className="font-mono text-xs text-neutral-300">·</span>
                  <span className="font-mono text-xs text-neutral-500">{article.duree} de lecture</span>
                </div>
                <h3 className="text-lg font-bold text-neutral-900 group-hover:text-primary-700 transition-colors leading-snug">
                  {article.titre}
                </h3>
                <p className="text-sm text-neutral-500 leading-snug">
                  {article.accroche}
                </p>
              </Link>
            ))}
          </div>
        </section>

      </div>

      <Footer />
    </>
  )
}
