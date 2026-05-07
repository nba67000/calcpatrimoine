// src/app/faq/ifi/page.tsx
'use client'

import { useState } from 'react'
import type { ReactElement } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LegalDisclaimer from '@/components/LegalDisclaimer'

interface FAQItem {
  question: string
  answer: string | ReactElement
}

interface FAQSection {
  title: string
  items: FAQItem[]
}

function FAQAccordion({ item }: { item: FAQItem }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border border-neutral-200 mb-2 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-4 flex justify-between items-center bg-white hover:bg-[#F7F3EC] transition-colors text-left"
      >
        <span className="font-medium text-neutral-900 pr-4">{item.question}</span>
        <svg
          className={`w-5 h-5 text-neutral-400 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-200">
          <div className="text-neutral-700 leading-relaxed prose prose-sm max-w-none">
            {item.answer}
          </div>
        </div>
      )}
    </div>
  )
}

const sections: FAQSection[] = [
  {
    title: 'Principes généraux',
    items: [
      {
        question: "Qu'est-ce que l'IFI et qui est concerné ?",
        answer: (
          <>
            <p className="mb-3">
              L&apos;impôt sur la fortune immobilière (IFI) est un impôt annuel qui remplace l&apos;ISF depuis 2018.
              Il est dû par les personnes physiques dont le patrimoine immobilier net dépasse <strong>1 300 000 €</strong> au 1er janvier de l&apos;année d&apos;imposition (Art. 964 CGI).
            </p>
            <p className="mb-3">
              Ce seuil s&apos;apprécie au niveau du <strong>foyer fiscal</strong>, pas par individu. Un couple marié ou pacsé n&apos;a qu&apos;un seul seuil à 1 300 000 €, même si les biens sont détenus séparément.
            </p>
            <p>
              Les non-résidents fiscaux sont assujettis uniquement sur leurs biens situés en France. Les résidents sont taxés sur l&apos;ensemble de leur patrimoine immobilier mondial, sous réserve des conventions fiscales internationales.
            </p>
          </>
        ),
      },
      {
        question: 'Quels biens immobiliers entrent dans l\'assiette IFI ?',
        answer: (
          <>
            <p className="mb-3">Entrent dans l&apos;assiette IFI :</p>
            <ul className="list-disc pl-5 mb-3 space-y-1">
              <li>Biens détenus directement : maisons, appartements, terrains, garages, parkings</li>
              <li>Biens détenus via des sociétés : quote-part des actifs immobiliers (SCI, SCPI, sociétés opérationnelles)</li>
              <li>Droits réels immobiliers : usufruit, nue-propriété (avec règles spécifiques)</li>
              <li>Contrats d&apos;assurance-vie en unités de compte immobilières (fraction représentative de l&apos;immobilier)</li>
            </ul>
            <p>Sont exclus de l&apos;assiette : les biens professionnels, les œuvres d&apos;art, les bois et forêts (75 % exonérés), les biens ruraux loués par bail à long terme (75 % exonérés selon conditions Art. 976 CGI).</p>
          </>
        ),
      },
      {
        question: "Comment fonctionne l'abattement de 30 % sur la résidence principale ?",
        answer: (
          <>
            <p className="mb-3">
              La résidence principale bénéficie d&apos;un abattement forfaitaire de 30 % sur sa valeur vénale (Art. 973 CGI).
              Cet abattement est automatique, sans démarche particulière.
            </p>
            <p className="mb-3">
              Exemple : une résidence principale estimée à 800 000 € n&apos;entre dans l&apos;assiette IFI que pour 560 000 € (800 000 × 70 %).
            </p>
            <p>
              Cet abattement ne s&apos;applique qu&apos;à la résidence principale effective du foyer, pas à une résidence secondaire même très utilisée. En cas de détention en indivision, l&apos;abattement s&apos;applique sur la part détenue.
            </p>
          </>
        ),
      },
    ],
  },
  {
    title: 'Calcul et barème',
    items: [
      {
        question: 'Quel est le barème IFI 2026 ?',
        answer: (
          <>
            <p className="mb-3">Le barème IFI est progressif, inchangé depuis 2018 (Art. 977 CGI) :</p>
            <table className="w-full text-sm mb-3 border border-neutral-200">
              <thead>
                <tr className="bg-neutral-50">
                  <th className="text-left px-3 py-2 border-b border-neutral-200 font-mono text-xs">Tranche de patrimoine net</th>
                  <th className="text-right px-3 py-2 border-b border-neutral-200 font-mono text-xs">Taux</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['0 € à 800 000 €', '0 %'],
                  ['800 000 € à 1 300 000 €', '0,50 %'],
                  ['1 300 000 € à 2 570 000 €', '0,70 %'],
                  ['2 570 000 € à 5 000 000 €', '1,00 %'],
                  ['5 000 000 € à 10 000 000 €', '1,25 %'],
                  ['Au-delà de 10 000 000 €', '1,50 %'],
                ].map(([tr, tx]) => (
                  <tr key={tr} className="border-b border-neutral-100">
                    <td className="px-3 py-2 text-neutral-700">{tr}</td>
                    <td className="px-3 py-2 text-right font-bold">{tx}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-sm text-neutral-600">
              Rappel : le barème s&apos;applique sur la totalité du patrimoine net taxable, mais chaque tranche ne s&apos;applique qu&apos;à la fraction correspondante. Un patrimoine de 2 000 000 € génère un IFI de 7 400 €, soit un taux effectif de 0,37 %.
            </p>
          </>
        ),
      },
      {
        question: "Qu'est-ce que la décote progressive IFI ?",
        answer: (
          <>
            <p className="mb-3">
              Pour les patrimoines entre 1 300 000 € et 1 400 000 €, une décote atténue l&apos;entrée dans l&apos;IFI.
              La formule est : <strong>17 500 € − 1,25 % × patrimoine net taxable</strong>.
            </p>
            <p className="mb-3">
              Cette décote vise à éviter un effet de seuil brutal. Sans elle, un contribuable à 1 305 000 € paierait
              brutalement le même IFI qu&apos;un contribuable à 1 350 000 € selon le barème brut.
            </p>
            <div className="bg-neutral-100 p-4 font-mono text-sm mb-3">
              <p>Patrimoine 1 300 000 € → décote = 17 500 − 1,25 % × 1 300 000 = <strong>1 250 €</strong></p>
              <p>Patrimoine 1 350 000 € → décote = 17 500 − 1,25 % × 1 350 000 = <strong>625 €</strong></p>
              <p>Patrimoine 1 400 000 € → décote = 17 500 − 1,25 % × 1 400 000 = <strong>0 €</strong></p>
            </div>
            <p>Au-delà de 1 400 000 €, la décote s&apos;annule et c&apos;est le barème brut qui s&apos;applique intégralement.</p>
          </>
        ),
      },
      {
        question: 'Quelles dettes peut-on déduire de l\'assiette IFI ?',
        answer: (
          <>
            <p className="mb-3">Sont déductibles les dettes existantes au 1er janvier et contractées pour (Art. 974 CGI) :</p>
            <ul className="list-disc pl-5 mb-3 space-y-1">
              <li><strong>L&apos;acquisition</strong> de biens taxables : capital restant dû des emprunts immobiliers</li>
              <li><strong>La construction, réparation ou amélioration</strong> des biens : solde des prêts travaux</li>
              <li><strong>Les taxes foncières</strong> dues sur les biens au 1er janvier</li>
            </ul>
            <p className="mb-3">
              Ne sont pas déductibles : les prêts à la consommation, les crédits non liés aux biens taxables,
              les dettes envers des proches sous certaines conditions.
            </p>
            <p className="text-sm text-neutral-600">
              Important : depuis 2018, les dettes déductibles sont plafonnées pour les patrimoines supérieurs
              à 5 000 000 € (Art. 974 II CGI). Ce calculateur ne gère pas ce plafond.
            </p>
          </>
        ),
      },
    ],
  },
  {
    title: 'Plafonnement et optimisation',
    items: [
      {
        question: 'Comment fonctionne le plafonnement IFI + IR ?',
        answer: (
          <>
            <p className="mb-3">
              Selon l&apos;Art. 979 CGI, la somme IFI + impôt sur le revenu ne peut excéder 75 % des revenus
              imposables de l&apos;année. Si ce seuil est dépassé, l&apos;IFI est réduit à due concurrence.
            </p>
            <p className="mb-3">
              Exemple : revenus = 60 000 €, IR = 40 000 €, IFI calculé = 15 000 €.
              Seuil = 75 % × 60 000 = 45 000 €. IFI + IR = 55 000 € &gt; 45 000 €.
              IFI plafonné = 45 000 − 40 000 = <strong>5 000 €</strong>.
            </p>
            <p>
              Ce mécanisme bénéficie principalement aux contribuables dont les revenus sont faibles par
              rapport au patrimoine : retraités avec un patrimoine immobilier important peu rentable,
              propriétaires d&apos;un bien familial de valeur non loué.
            </p>
          </>
        ),
      },
      {
        question: 'Quand et comment déclarer l\'IFI ?',
        answer: (
          <p>
            L&apos;IFI est déclaré en même temps que la déclaration de revenus (formulaire 2042-IFI, annexe).
            La date limite est celle de la déclaration d&apos;IR, soit fin mai ou début juin selon le département.
            Le paiement intervient en septembre de l&apos;année de déclaration. Si le patrimoine net
            dépasse 1 300 000 €, il est obligatoire de remplir cette annexe, même si le solde IFI
            après décote et plafonnement est nul.
          </p>
        ),
      },
      {
        question: 'La nue-propriété est-elle taxée à l\'IFI ?',
        answer: (
          <p>
            En principe, la nue-propriété seule est exonérée d&apos;IFI : c&apos;est l&apos;usufruitier qui déclare
            la valeur en pleine propriété dans son patrimoine (Art. 968 CGI). Cette règle incite certains
            contribuables à consentir des donations avec réserve d&apos;usufruit pour réduire leur patrimoine
            IFI — les enfants nus-propriétaires n&apos;ont rien à déclarer. Ce calculateur ne modélise pas
            les démembrements de propriété.
          </p>
        ),
      },
      {
        question: 'Les parts de SCPI entrent-elles dans l\'IFI ?',
        answer: (
          <p>
            Oui. Les parts de SCPI (sociétés civiles de placement immobilier) entrent dans l&apos;assiette IFI
            à hauteur de la fraction représentant des actifs immobiliers. En pratique, la SCPI communique
            chaque année le coefficient de déductibilité ou d&apos;imposition à ses associés. Ce calculateur
            part du principe que vous intégrez directement la valeur IFI de vos parts dans le montant
            total renseigné.
          </p>
        ),
      },
    ],
  },
  {
    title: 'Limites et cas non couverts',
    items: [
      {
        question: 'Ce calculateur est-il fiable pour une SCI ?',
        answer: (
          <p>
            Partiellement. Pour une SCI, seule la fraction des actifs immobiliers représentant des biens
            taxables doit être déclarée, proportionnellement aux parts détenues. Ce calculateur vous
            permet de saisir directement la valeur IFI de vos parts, si vous l&apos;avez calculée par ailleurs.
            Le calcul interne de la quote-part taxable d&apos;une SCI n&apos;est pas automatisé ici — il dépend de
            la structure bilancielle de la société.
          </p>
        ),
      },
      {
        question: 'Les biens professionnels sont-ils exonérés ?',
        answer: (
          <p>
            Oui, les biens nécessaires à l&apos;exercice d&apos;une activité professionnelle principale sont exonérés
            d&apos;IFI (Art. 975 CGI). Cette exonération s&apos;applique aux biens utilisés dans le cadre d&apos;une
            activité industrielle, commerciale, artisanale, agricole ou libérale, exercée par le propriétaire
            ou un membre du foyer. Ce calculateur ne modélise pas cette exonération : déduisez directement
            la valeur des biens professionnels avant de saisir le total.
          </p>
        ),
      },
    ],
  },
]

export default function FAQIFIPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: sections.flatMap(s => s.items).map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: typeof item.answer === 'string' ? item.answer : item.question,
      },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <div className="h-[3px] bg-accent-400 w-full" />
      <div style={{ backgroundColor: '#F7F3EC' }}>

        <section className="max-w-4xl mx-auto px-6 py-12">
          <nav className="flex items-center gap-2 font-mono text-xs text-neutral-400 mb-8">
            <Link href="/" className="hover:text-primary-600 transition-colors">Accueil</Link>
            <span>/</span>
            <Link href="/faq" className="hover:text-primary-600 transition-colors">FAQ</Link>
            <span>/</span>
            <span className="text-neutral-600">IFI</span>
          </nav>

          <div className="h-[2px] w-10 bg-accent-400 mb-6" />

          <h1 className="font-serif text-4xl font-bold text-neutral-900 mb-4">
            FAQ — Impôt sur la fortune immobilière (IFI)
          </h1>
          <p className="text-lg text-neutral-600 max-w-2xl leading-relaxed mb-8">
            Tout ce qu&apos;il faut savoir sur l&apos;IFI : seuil, barème, abattement résidence principale,
            dettes déductibles, décote et plafonnement.
          </p>

          <LegalDisclaimer />
        </section>

        <section className="max-w-4xl mx-auto px-6 pb-12 space-y-10">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="font-serif text-xl font-bold text-neutral-900 mb-4 pb-2 border-b border-neutral-200">
                {section.title}
              </h2>
              <div>
                {section.items.map((item) => (
                  <FAQAccordion key={item.question} item={item} />
                ))}
              </div>
            </div>
          ))}

          <div className="bg-white border border-neutral-200 p-6 text-center">
            <p className="text-neutral-700 mb-4">
              Vous avez calculé votre IFI estimatif ?
            </p>
            <Link
              href="/ifi"
              className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              Simuler mon IFI 2026
            </Link>
          </div>

          <p className="font-mono text-xs text-neutral-400 text-center leading-relaxed">
            Outil indicatif uniquement. Ne constitue pas un conseil fiscal personnalisé.
            Consultez un notaire ou un conseiller en gestion de patrimoine avant toute décision.
          </p>
        </section>

      </div>
      <Footer />
    </>
  )
}
