// src/components/CalculateurPageLayout.tsx
//
// PERF — Core Web Vitals fixes (CLS) :
//   • contain:layout sur le hero → isole les re-flows du reste de la page
//   • minHeight sur h1 → absorbe le layout shift FOUT quand Playfair Display charge
//   • minHeight sur nav/features → réserve l'espace avant les styles Tailwind
//   • style explicit height sur les dividers décoratifs (h-[3px] → height:3px)
import type { ReactNode } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LegalDisclaimer from '@/components/LegalDisclaimer'
import RelatedCalcSection from '@/components/RelatedCalcSection'

interface BreadcrumbItem {
  href?: string
  label: string
}

interface Props {
  breadcrumb: BreadcrumbItem[]
  titre: ReactNode
  description: ReactNode
  features?: string[]
  /** Contenu à insérer entre la section héro et le disclaimer */
  aboveCalculator?: ReactNode
  calculator: ReactNode
  /** Slug href du calculateur courant. Active RelatedCalcSection. */
  currentHref?: string
  children?: ReactNode
}

export default function CalculateurPageLayout({
  breadcrumb,
  titre,
  description,
  features,
  aboveCalculator,
  calculator,
  currentHref,
  children,
}: Props) {
  return (
    <>
      <Header />
      {/*
        CLS FIX : hauteur explicite pour que le navigateur réserve l'espace
        avant que les classes Tailwind soient appliquées côté client.
      */}
      <div className="h-[3px] bg-accent-400 w-full" style={{ height: '3px' }} />
      <div style={{ backgroundColor: '#F7F3EC' }}>

        {/*
          CLS FIX : contain:layout isole les re-flows de cette section.
          minHeight réserve l'espace pour breadcrumb + h1 + description
          avant que Playfair Display (police serif) soit chargée.
          Sans ça, le FOUT cause un shift visible sur mobile (texte qui grandit
          quand la police arrive).
        */}
        <section
          className="max-w-6xl mx-auto px-6 py-12"
          style={{ minHeight: '220px', contain: 'layout' }}
        >
          {/* CLS FIX : minHeight sur le nav pour éviter le shift du breadcrumb */}
          <nav
            className="flex items-center gap-2 font-mono text-xs text-neutral-400 mb-8"
            style={{ minHeight: '16px' }}
            aria-label="Fil d'Ariane"
          >
            {breadcrumb.map((item, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden="true">/</span>}
                {item.href ? (
                  <Link href={item.href} className="hover:text-primary-600 transition-colors">
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-neutral-600">{item.label}</span>
                )}
              </span>
            ))}
          </nav>

          <div className="h-[2px] w-10 bg-accent-400 mb-6" style={{ height: '2px' }} />

          {/*
            CLS FIX : minHeight sur h1.
            Playfair Display a un ascent plus élevé que le fallback Georgia.
            La police metrics @font-face dans globals.css réduit l'écart,
            mais le minHeight absorbe le résidu.
            5xl = 3rem line-height × ~2 lignes pour les titres sur <br/>
          */}
          <h1
            className="font-serif text-5xl font-bold text-neutral-900 mb-4 leading-tight"
            style={{ minHeight: '3.5rem' }}
          >
            {titre}
          </h1>

          <p className="text-lg text-neutral-600 max-w-3xl leading-relaxed mb-8">
            {description}
          </p>

          {features && features.length > 0 && (
            <div className="flex flex-wrap gap-x-8 gap-y-2" style={{ minHeight: '20px' }}>
              {features.map(t => (
                <span key={t} className="font-mono text-xs text-neutral-500">{t}</span>
              ))}
            </div>
          )}
        </section>

        {aboveCalculator}

        <div className="max-w-6xl mx-auto px-6 pb-4">
          <LegalDisclaimer />
        </div>

        <div className="max-w-6xl mx-auto px-6 py-4 pb-12">
          {calculator}
        </div>

        {children}

        {currentHref && <RelatedCalcSection currentHref={currentHref} />}

      </div>
      <Footer />
    </>
  )
}
