// src/components/CalculateurPageLayout.tsx
import type { ReactNode } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LegalDisclaimer from '@/components/LegalDisclaimer'

interface BreadcrumbItem {
  href?: string
  label: string
}

interface Props {
  breadcrumb: BreadcrumbItem[]
  titre: ReactNode
  description: ReactNode
  features?: string[]
  /** Contenu à insérer entre la section héro et le disclaimer (ex. : note d'avertissement). */
  aboveCalculator?: ReactNode
  calculator: ReactNode
  children?: ReactNode
}

export default function CalculateurPageLayout({
  breadcrumb,
  titre,
  description,
  features,
  aboveCalculator,
  calculator,
  children,
}: Props) {
  return (
    <>
      <Header />
      <div className="h-[3px] bg-accent-400 w-full" />
      <div style={{ backgroundColor: '#F7F3EC' }}>

        <section className="max-w-6xl mx-auto px-6 py-12">
          <nav className="flex items-center gap-2 font-mono text-xs text-neutral-400 mb-8">
            {breadcrumb.map((item, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && <span>/</span>}
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

          <div className="h-[2px] w-10 bg-accent-400 mb-6" />

          <h1 className="font-serif text-5xl font-bold text-neutral-900 mb-4 leading-tight">
            {titre}
          </h1>

          <p className="text-lg text-neutral-600 max-w-3xl leading-relaxed mb-8">
            {description}
          </p>

          {features && features.length > 0 && (
            <div className="flex flex-wrap gap-x-8 gap-y-2">
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

      </div>
      <Footer />
    </>
  )
}
