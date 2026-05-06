'use client'

import { useState } from 'react'
import Link from 'next/link'
import RenteCalculator from '@/components/Calculator/RenteCalculator'
import InverseCalculator from '@/components/Calculator/InverseCalculator'
import CoupleCalculator from '@/components/Calculator/CoupleCalculator'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LegalDisclaimer from '@/components/LegalDisclaimer'
import { SOURCES_RENTE_VIAGERE } from '@/lib/mortality'
import SourcesSection from '@/components/SourcesSection'

type CalculatorMode = 'standard' | 'inverse' | 'couple'

const MODES: { id: CalculatorMode; label: string; desc: string }[] = [
  { id: 'standard', label: 'Calculateur classique', desc: 'Calculez le montant de votre rente mensuelle à partir d\'un capital.' },
  { id: 'inverse',  label: 'Calculateur inverse',   desc: 'Découvrez quel capital est nécessaire pour obtenir la rente souhaitée.' },
  { id: 'couple',   label: 'Mode couple',            desc: 'Comparez toutes les stratégies pour optimiser vos rentes à deux.' },
]

const CROSS_LINKS = [
  { href: '/assurance-vie/fiscalite-rachat', label: 'Plutôt un rachat qu\'une rente ?', desc: 'Calculez la fiscalité exacte d\'un rachat partiel ou total d\'assurance-vie.' },
  { href: '/blog/rente-viagere-seuil-rentabilite', label: 'Article — Le seuil de rentabilité', desc: 'À 72 ans avec 250 000 €, le seuil tombe à 15,8 ans. Ce n\'est pas une anomalie.' },
  { href: '/faq/rente-viagere', label: 'FAQ rente viagère', desc: 'Espérance de vie, réversion, fiscalité, couple, bon âge pour souscrire.' },
]

const SOURCES = SOURCES_RENTE_VIAGERE

export default function RenteViagerePage() {
  const [mode, setMode] = useState<CalculatorMode>('standard')

  return (
    <>
      <Header />
      <div className="h-[3px] bg-accent-400 w-full" />
      <div style={{ backgroundColor: '#F7F3EC' }}>

        {/* Hero */}
        <section className="max-w-6xl mx-auto px-6 py-12">
          <nav className="flex items-center gap-2 font-mono text-xs text-neutral-400 mb-8">
            <Link href="/" className="hover:text-primary-600 transition-colors">Accueil</Link>
            <span>/</span>
            <span className="text-neutral-600">Rente Viagère</span>
          </nav>

          <div className="h-[2px] w-10 bg-accent-400 mb-6" />

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 mb-4 leading-tight">
            Calculateur<br />
            Rente Viagère
          </h1>

          <p className="text-lg text-neutral-600 max-w-3xl leading-relaxed mb-8">
            Convertissez votre épargne (PER, assurance-vie, capital) en revenus versés à vie.
            Estimations basées sur les tables de mortalité officielles INSEE,
            avec gestion de la réversion au conjoint.
          </p>

          <div className="flex flex-wrap gap-x-8 gap-y-2">
            {['Tables INSEE 2021', 'Réversion 60/80/100 %', '3 modes de calcul', 'Zéro donnée conservée'].map(t => (
              <span key={t} className="font-mono text-xs text-neutral-500">{t}</span>
            ))}
          </div>
        </section>

        {/* Note viager immobilier */}
        <div className="max-w-4xl mx-auto px-6 mb-0">
          <div className="bg-white border-l-4 border-warning-400 px-5 py-4">
            <p className="text-sm text-neutral-700">
              <strong>À ne pas confondre :</strong>{' '}
              La <strong>rente viagère</strong> (ce calculateur) convertit un capital financier en revenus mensuels versés à vie.
              Le <strong>viager immobilier</strong> est la vente d&apos;un bien avec bouquet + rente.
            </p>
          </div>
        </div>

        {/* Calculateur + tabs */}
        <div className="max-w-6xl mx-auto px-6 pt-6">
          <LegalDisclaimer />
        </div>
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="flex mb-2">
            <div className="flex border border-neutral-300 overflow-x-auto">
              {MODES.map(m => (
                <button
                  key={m.id}
                  onClick={() => setMode(m.id)}
                  className={`px-4 sm:px-6 py-3 font-mono text-xs font-medium transition-colors whitespace-nowrap ${
                    mode === m.id
                      ? 'bg-primary-700 text-white'
                      : 'bg-white text-neutral-600 hover:bg-neutral-50'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>
          <p className="font-mono text-xs text-neutral-500 mb-8">
            {MODES.find(m => m.id === mode)?.desc}
          </p>

          {mode === 'standard' && <RenteCalculator />}
          {mode === 'inverse'  && <InverseCalculator />}
          {mode === 'couple'   && <CoupleCalculator />}
        </div>

        {/* Explications */}
        <section className="max-w-4xl mx-auto px-6 py-8">
          <div className="bg-white border border-neutral-200 p-8 space-y-5">
            <h2 className="font-serif text-2xl font-bold text-neutral-900">
              Comment ça marche ?
            </h2>
            <div className="space-y-4 text-neutral-700 leading-relaxed">
              <p>
                <strong>La rente dépend de l&apos;espérance de vie.</strong>{' '}
                Plus vous êtes âgé au moment de la conversion, plus la rente est élevée
                à capital égal : l&apos;assureur répartit votre capital sur moins d&apos;années statistiques.
                À 65 ans, l&apos;espérance résiduelle INSEE est d&apos;environ 20 ans ; à 75 ans, 12 ans.
              </p>
              <p>
                <strong>Tables unisexes depuis 2012.</strong>{' '}
                Depuis l&apos;arrêt <em>Test-Achats</em> (CJUE 2011), les assureurs utilisent des tables de mortalité unisexes.
                Un homme et une femme du même âge obtiennent donc la même rente à capital identique.
              </p>
              <p>
                <strong>Le taux technique gonfle la rente initiale.</strong>{' '}
                Les assureurs anticipent un rendement futur pour majorer votre rente dès le départ.
                Notre calculateur utilise 0,5 % par défaut.
              </p>
              <p>
                <strong>La réversion réduit la rente, mais protège le conjoint.</strong>{' '}
                Opter pour une réversion à 60, 80 ou 100 % diminue votre rente personnelle,
                mais garantit le versement au conjoint survivant jusqu&apos;à son décès.
              </p>
            </div>
          </div>
        </section>

        {/* Liens croisés */}
        <section className="max-w-4xl mx-auto px-6 pb-8">
          <div className="border-t border-neutral-300">
            {CROSS_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex items-center justify-between py-5 border-b border-neutral-200 hover:bg-white transition-colors pr-4"
                style={{ borderLeft: '3px solid #D4AF37', paddingLeft: '1.25rem' }}
              >
                <div>
                  <p className="font-bold text-neutral-900 group-hover:text-primary-700 transition-colors mb-0.5">{link.label}</p>
                  <p className="text-sm text-neutral-500">{link.desc}</p>
                </div>
                <span className="font-mono text-primary-600 group-hover:translate-x-1 transition-transform ml-4 shrink-0">→</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Méthodologie */}
        <section className="max-w-4xl mx-auto px-6 py-8 pb-16">
          <div className="bg-white border border-neutral-200 p-8">
            <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-6">
              Méthodologie et sources officielles
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-500 mb-3">Formules actuarielles</h3>
                <div className="bg-neutral-50 border border-neutral-200 p-4 sm:p-5 grid sm:grid-cols-2 gap-x-8 gap-y-3 overflow-hidden">
                  {[
                    ['Annuité viagère (äx)', 'Σ (ₖpₓ × vᵏ) pour k = 0 à ω-x'],
                    ['Facteur d\'actualisation', 'v = 1 / (1 + i) — i = taux technique'],
                    ['Probabilité de survie', 'ₖpₓ = lₓ₊ₖ / lₓ (tables TGH05/TGF05)'],
                    ['Rente annuelle', 'Rente = Capital / äx'],
                    ['Avec réversion', 'Capital / (äx + α × äy|x)'],
                    ['Taux technique défaut', '0,5 % (standard marché)'],
                  ].map(([label, val]) => (
                    <div key={label} className="font-mono">
                      <p className="text-xs text-neutral-400 mb-0.5">{label}</p>
                      <p className="text-xs text-neutral-700 break-all">{val}</p>
                    </div>
                  ))}
                </div>
              </div>

              <SourcesSection sources={SOURCES} title="Textes réglementaires" />

              <div className="border-l-4 border-primary-200 bg-primary-50 px-4 py-3">
                <p className="text-sm text-primary-800">
                  <strong>Méthodologie vérifiée</strong> — calculs conformes aux formules actuarielles standard,
                  tables générationnelles TGH05 / TGF05 homologuées par arrêté du 1er août 2006 (art. A335-1 Code des assurances).
                  Taux technique : 0,5 %. Table unisexe : pondération 48 % hommes / 52 % femmes. Dernière vérification : mai 2026.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-neutral-200 mt-8 pt-6 text-center">
            <p className="font-mono text-xs text-neutral-400 leading-relaxed">
              Outil indicatif uniquement. Ne constitue pas un conseil patrimonial. Consultez un professionnel qualifié avant toute décision.{' '}
              <a href="https://github.com/nba67000/calculpatrimoine" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                Code source ouvert
              </a>
            </p>
          </div>
        </section>

      </div>
      <Footer />
    </>
  )
}
