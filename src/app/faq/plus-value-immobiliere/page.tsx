// src/app/faq/plus-value-immobiliere/page.tsx
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FAQAccordionClient from '@/components/FAQAccordionClient'

export const metadata: Metadata = {
  title: 'FAQ Plus-Value Immobilière — Résidence secondaire | CalculPatrimoine',
  description: "Abattements pour durée de détention, IR 19 %, prélèvements sociaux 17,2 %, surtaxe. Questions fréquentes sur la plus-value immobilière.",
}

interface FAQItem {
  question: string
  answer: ReactNode
}

interface FAQSection {
  title: string
  items: FAQItem[]
}

const ABATTEMENTS = [
  { annees: 5,  ir: '0 %',    ps: '0 %' },
  { annees: 6,  ir: '6 %',    ps: '1,65 %' },
  { annees: 10, ir: '30 %',   ps: '8,25 %' },
  { annees: 15, ir: '60 %',   ps: '16,5 %' },
  { annees: 20, ir: '90 %',   ps: '24,75 %' },
  { annees: 22, ir: '100 %',  ps: '28 %' },
  { annees: 25, ir: '100 %',  ps: '55 %' },
  { annees: 30, ir: '100 %',  ps: '100 %' },
]

const sections: FAQSection[] = [
  {
    title: 'Prix de revient, frais et travaux',
    items: [
      {
        question: "Qu'est-ce que le prix de revient ajusté ?",
        answer: (
          <>
            <p className="mb-3">
              Le prix de revient ajusté est le montant qui sert à calculer la plus-value brute.
              Il est supérieur au seul prix d&apos;acquisition car il intègre les <strong>frais et les travaux</strong>.
            </p>
            <div className="bg-neutral-100 border border-neutral-200 p-4 mb-3 font-mono text-sm space-y-1">
              <p>Prix de revient = Prix d&apos;acquisition</p>
              <p>+ Frais d&apos;acquisition (droits + notaire)</p>
              <p>+ Travaux</p>
            </div>
            <p className="mb-3">
              Plus le prix de revient est élevé, plus la plus-value brute est faible, et donc moins vous payez d&apos;impôts.
              C&apos;est pourquoi il est utile de bien justifier ou d&apos;utiliser les forfaits disponibles.
            </p>
          </>
        ),
      },
      {
        question: 'Le forfait frais de 7,5 % est-il toujours applicable ?',
        answer: (
          <>
            <p className="mb-3">
              Oui, le forfait de 7,5 % est applicable à <strong>toute cession immobilière</strong>,
              quelle que soit la durée de détention. Il couvre les droits d&apos;enregistrement et les
              frais de notaire payés lors de l&apos;acquisition.
            </p>
            <p className="mb-3">
              Si vos frais réels dépassent 7,5 % du prix d&apos;achat, utilisez le mode &quot;montant réel&quot; pour déduire
              la somme exacte que vous avez payée (vous aurez besoin de l&apos;acte notarié).
            </p>
            <div className="bg-primary-50 border-l-4 border-primary-400 p-4">
              <p className="text-sm text-primary-900">
                <strong>Exemple :</strong> achat à 200 000 €. Forfait = 15 000 €.
                Si vos frais réels étaient 16 500 €, utilisez le montant réel, cela réduit la plus-value
                imposable de 1 500 € supplémentaires.
              </p>
            </div>
          </>
        ),
      },
      {
        question: 'Le forfait travaux de 15 % est-il toujours applicable ?',
        answer: (
          <>
            <p className="mb-3">
              Non. Le forfait travaux de 15 % n&apos;est applicable que si <strong>deux conditions sont réunies</strong> :
            </p>
            <ul className="list-disc pl-6 mb-3 space-y-2">
              <li>Le bien est détenu depuis <strong>plus de 5 ans complets</strong> à la date de cession.</li>
              <li>
                Les travaux concernés <strong>n&apos;ont pas déjà été déduits</strong> des revenus fonciers
                (pas déductibles en régime réel ni en micro-foncier pour ce qui concerne leur imputation
                sur les revenus locatifs).
              </li>
            </ul>
            <p className="mb-3">
              Si vos travaux réels sont supérieurs à 15 %, utilisez les montants réels justifiés par
              factures. Si vous êtes en dessous, le forfait s&apos;applique sans justificatif.
            </p>
            <div className="bg-orange-50 border-l-4 border-orange-400 p-4">
              <p className="text-sm text-orange-900">
                <strong>Attention :</strong> si vous avez déduit des travaux en charges de revenus fonciers
                au cours des années précédentes, vous ne pouvez pas aussi les inclure dans le prix de revient.
                Vous pouvez utiliser le forfait global de 15 % pour les dépenses non déduites.
              </p>
            </div>
          </>
        ),
      },
      {
        question: 'Quels travaux sont déductibles en montant réel ?',
        answer: (
          <>
            <p className="mb-3">
              Sont déductibles en montant réel (sur justificatifs, Art. 150 VB CGI) :
            </p>
            <ul className="list-disc pl-6 mb-3 space-y-1">
              <li>Les travaux de construction, reconstruction ou agrandissement</li>
              <li>Les travaux d&apos;amélioration (isolation, chauffage, etc.)</li>
              <li>Les travaux de réparation et d&apos;entretien <strong>uniquement</strong> si non déductibles des revenus fonciers</li>
            </ul>
            <p className="mb-3">
              Ne sont <strong>pas déductibles</strong> : les dépenses d&apos;entretien courant (nettoyage,
              petites réparations), les dépenses supportées par le locataire, et les travaux déjà pris
              en compte dans un autre avantage fiscal (MaPrimeRénov&apos;, CITE, etc.) dans les cas
              où ils sont imputables sur les revenus fonciers.
            </p>
          </>
        ),
      },
    ],
  },
  {
    title: 'Abattements et durée de détention',
    items: [
      {
        question: "Pourquoi IR et prélèvements sociaux ont-ils des abattements différents ?",
        answer: (
          <>
            <p className="mb-3">
              L&apos;IR et les prélèvements sociaux sont deux impôts distincts, avec chacun leur propre barème d&apos;exonération.
              Le législateur n&apos;a pas aligné les durées — résultat : entre 22 et 30 ans de détention, l&apos;IR de 19 % est à zéro mais vous payez encore une partie des prélèvements sociaux.
            </p>
            <ul className="list-disc pl-6 mb-3 space-y-2">
              <li>
                <strong>IR 19 %</strong> (Art. 150 VC CGI) : exonération totale après <strong>22 ans</strong>.
              </li>
              <li>
                <strong>PS 17,2 %</strong> (Art. 150 VD CGI) : exonération totale seulement après <strong>30 ans</strong>.
              </li>
            </ul>
            <p className="mb-3">
              Conséquence pratique : entre 22 et 30 ans de détention, vous ne payez plus l&apos;IR de 19 %
              mais vous devez toujours les prélèvements sociaux, en proportion décroissante.
            </p>
            <table className="w-full text-sm border-collapse mb-3">
              <thead>
                <tr className="bg-neutral-100">
                  <th className="border border-neutral-300 px-3 py-2 text-left">Durée</th>
                  <th className="border border-neutral-300 px-3 py-2 text-center">Abatt. IR</th>
                  <th className="border border-neutral-300 px-3 py-2 text-center">Abatt. PS</th>
                </tr>
              </thead>
              <tbody>
                {ABATTEMENTS.map(({ annees, ir, ps }) => (
                  <tr key={annees} className={ir === '100 %' && ps === '100 %' ? 'bg-green-50' : ir === '100 %' ? 'bg-primary-50' : ''}>
                    <td className="border border-neutral-300 px-3 py-1.5">{annees} ans</td>
                    <td className={`border border-neutral-300 px-3 py-1.5 text-center font-medium ${ir === '100 %' ? 'text-green-700' : ''}`}>{ir}</td>
                    <td className={`border border-neutral-300 px-3 py-1.5 text-center font-medium ${ps === '100 %' ? 'text-green-700' : ''}`}>{ps}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ),
      },
      {
        question: "Comment la durée de détention est-elle comptée ?",
        answer: (
          <>
            <p className="mb-3">
              La durée de détention est comptée en <strong>années complètes</strong> entre la date
              de l&apos;acte d&apos;acquisition et la date de l&apos;acte de cession (les deux actes notariés).
            </p>
            <div className="bg-primary-50 border-l-4 border-primary-400 p-4 mb-3">
              <p className="text-sm text-primary-900">
                <strong>Exemple :</strong> achat le 15 mars 2020, vente le 10 mars 2026 = 5 ans complets
                (l&apos;anniversaire du 15 mars 2026 n&apos;est pas encore atteint) → 0 % d&apos;abattement.
                Si la vente est le 20 mars 2026 = 6 ans complets → 6 % d&apos;abattement IR.
              </p>
            </div>
            <p>
              Chaque année compte, y compris la 6e. L&apos;abattement s&apos;acquiert
              au <strong>jour anniversaire</strong> de l&apos;acquisition.
            </p>
          </>
        ),
      },
      {
        question: "À partir de combien d'années la vente devient-elle fiscalement intéressante ?",
        answer: (
          <>
            <p className="mb-3">
              Trois seuils clés à retenir :
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-3">
              <li>
                <strong>6 ans :</strong> premiers abattements (6 % IR et 1,65 % PS).
                Impact limité mais il commence à réduire l&apos;imposition.
              </li>
              <li>
                <strong>22 ans :</strong> exonération totale de l&apos;IR (19 %).
                Il ne reste que les prélèvements sociaux.
              </li>
              <li>
                <strong>30 ans :</strong> exonération totale, IR et PS. Zéro impôt sur la plus-value.
              </li>
            </ul>
            <p className="text-sm text-neutral-600">
              Si vous êtes à quelques mois d&apos;un anniversaire important (notamment 22 ou 30 ans),
              l&apos;économie réalisée en attendant quelques semaines peut être significative.
              Le calculateur affiche cette information en temps réel.
            </p>
          </>
        ),
      },
    ],
  },
  {
    title: 'Surtaxe',
    items: [
      {
        question: "Qu'est-ce que la surtaxe sur les plus-values élevées ?",
        answer: (
          <>
            <p className="mb-3">
              La surtaxe (Art. 1609 nonies G CGI) est une taxe additionnelle qui s&apos;applique en plus
              de l&apos;IR de 19 % lorsque la <strong>plus-value nette imposable dépasse 50 000 €</strong>.
            </p>
            <p className="mb-3">Son taux dépend du montant de la plus-value nette :</p>
            <table className="w-full text-sm border-collapse mb-3">
              <thead>
                <tr className="bg-neutral-100">
                  <th className="border border-neutral-300 px-3 py-2 text-left">Plus-value nette IR</th>
                  <th className="border border-neutral-300 px-3 py-2 text-center">Taux de surtaxe</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['50 001 € à 100 000 €', '2 %'],
                  ['100 001 € à 150 000 €', '3 %'],
                  ['150 001 € à 200 000 €', '4 %'],
                  ['200 001 € à 250 000 €', '5 %'],
                  ['Au-delà de 250 000 €', '6 %'],
                ].map(([tranche, taux]) => (
                  <tr key={tranche}>
                    <td className="border border-neutral-300 px-3 py-1.5">{tranche}</td>
                    <td className="border border-neutral-300 px-3 py-1.5 text-center font-bold">{taux}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-sm text-neutral-600">
              À chaque seuil, un lissage automatique réduit l&apos;effet de palier.
              Le notaire calcule et prélève la surtaxe définitive lors de l&apos;acte de vente.
            </p>
          </>
        ),
      },
      {
        question: "La surtaxe s'applique-t-elle avant ou après les abattements pour durée de détention ?",
        answer: (
          <>
            <p className="mb-3">
              La surtaxe s&apos;applique <strong>après</strong> les abattements pour durée de détention,
              sur la même base que l&apos;impôt sur le revenu de 19 %.
            </p>
            <div className="bg-neutral-100 border border-neutral-200 p-4 mb-3 font-mono text-sm space-y-1">
              <p>PV brute : 200 000 €</p>
              <p>Abattement IR (15 ans) : 60 % = 120 000 €</p>
              <p>PV nette IR : 80 000 €</p>
              <p>Surtaxe s&apos;applique sur : 80 000 € (= 2 %)</p>
            </div>
            <p className="mb-3">
              Si la plus-value nette IR est inférieure ou égale à 50 000 €, aucune surtaxe
              n&apos;est due même si la plus-value brute est bien supérieure à ce montant.
            </p>
          </>
        ),
      },
      {
        question: "Peut-on réduire la surtaxe en fractionnant la vente ?",
        answer: (
          <>
            <p className="mb-3">
              Non. La surtaxe s&apos;applique par cession, non par année calendaire. Fractionner
              la <strong>même vente</strong> (par exemple vendre une maison en plusieurs lots distincts)
              peut techniquement réduire la plus-value par cession, mais cela n&apos;est pas toujours
              possible et comporte des contraintes juridiques.
            </p>
            <p className="mb-3">
              En revanche, si vous détenez <strong>plusieurs biens distincts</strong>, les vendre
              en deux années fiscales différentes évite l&apos;accumulation sur la même base de calcul.
              Chaque cession est imposée séparément.
            </p>
            <p className="text-sm text-neutral-600">
              Ce calculateur est indicatif. Pour des stratégies de cession sur plusieurs biens,
              consultez un notaire ou un conseiller en gestion de patrimoine.
            </p>
          </>
        ),
      },
    ],
  },
  {
    title: 'Exonérations',
    items: [
      {
        question: "La résidence principale est-elle toujours exonérée ?",
        answer: (
          <>
            <p className="mb-3">
              Oui. La cession de la <strong>résidence principale</strong> est exonérée de toute
              imposition sur la plus-value, quelle que soit la durée de détention ou le montant
              (Art. 150 U II 1° CGI).
            </p>
            <p className="mb-3">
              Pour être qualifié de résidence principale, le bien doit être la résidence
              <strong> habituelle et effective</strong> du vendeur au jour de la cession. Un bien
              loué, vacant ou occupé à titre secondaire ne bénéficie pas de cette exonération.
            </p>
            <div className="bg-orange-50 border-l-4 border-orange-400 p-4">
              <p className="text-sm text-orange-900">
                <strong>Point d&apos;attention :</strong> si vous avez quitté le logement avant
                la vente (par exemple pour emménager dans un autre bien), l&apos;exonération
                peut être remise en cause si le délai entre le départ et la cession est trop long.
                Le délai raisonnable admis en pratique est d&apos;environ 12 mois.
              </p>
            </div>
          </>
        ),
      },
      {
        question: "C'est quoi l'exonération de 1ère cession hors résidence principale ?",
        answer: (
          <>
            <p className="mb-3">
              L&apos;Art. 150 U II 7° CGI prévoit une exonération totale pour la <strong>première
              cession d&apos;un logement autre que la résidence principale</strong>, sous trois
              conditions cumulatives :
            </p>
            <ol className="list-decimal pl-6 mb-3 space-y-2">
              <li>
                Le vendeur <strong>n&apos;a pas été propriétaire</strong> de sa résidence principale
                (directement ou par l&apos;intermédiaire de son conjoint ou partenaire pacsé) au
                cours des <strong>4 années précédant la cession</strong>.
              </li>
              <li>
                La cession porte sur un logement (pas un terrain nu, pas un local commercial).
              </li>
              <li>
                Le prix de cession est <strong>remployé dans l&apos;acquisition ou la construction
                d&apos;un logement affecté à la résidence principale</strong> dans un délai de
                24 mois suivant la cession.
              </li>
            </ol>
            <p className="text-sm text-neutral-600">
              Seule la fraction du prix réinvestie dans la résidence principale est exonérée
              si le remploi est partiel. Consultez un notaire pour vérifier votre éligibilité.
            </p>
          </>
        ),
      },
      {
        question: "Qu'est-ce que l'exonération pour prix de cession inférieur à 15 000 € ?",
        answer: (
          <>
            <p className="mb-3">
              Toute plus-value réalisée lors de la cession d&apos;un bien dont le prix de vente
              est <strong>inférieur ou égal à 15 000 €</strong> est exonérée (Art. 150 U II 6° CGI).
            </p>
            <p className="mb-3">
              Cette exonération s&apos;apprécie par cession. Pour une vente en indivision ou en
              détention conjointe, le seuil de 15 000 € s&apos;applique à la part de chaque vendeur,
              et non au prix global du bien.
            </p>
          </>
        ),
      },
      {
        question: "Existe-t-il d'autres cas d'exonération non couverts par ce calculateur ?",
        answer: (
          <>
            <p className="mb-3">
              Oui. Ce calculateur traite les cas les plus fréquents. Il existe d&apos;autres
              exonérations prévues à l&apos;Art. 150 U II du CGI, notamment :
            </p>
            <ul className="list-disc pl-6 mb-3 space-y-2">
              <li>
                <strong>Expropriation :</strong> cession forcée à un organisme public dans le cadre
                d&apos;une procédure d&apos;utilité publique.
              </li>
              <li>
                <strong>Vente à un organisme HLM :</strong> sous conditions.
              </li>
              <li>
                <strong>Personnes âgées ou invalides :</strong> sous conditions de ressources et
                d&apos;hébergement en établissement.
              </li>
              <li>
                <strong>Non-résidents :</strong> des règles spécifiques s&apos;appliquent pour les
                ventes réalisées par des non-résidents fiscaux.
              </li>
            </ul>
            <p className="text-sm text-neutral-600">
              Pour ces cas particuliers, consultez un notaire ou un avocat fiscaliste.
            </p>
          </>
        ),
      },
    ],
  },
  {
    title: 'Moins-value et cas particuliers',
    items: [
      {
        question: "Que se passe-t-il si je vends à perte (moins-value) ?",
        answer: (
          <>
            <p className="mb-3">
              Si le prix de vente est inférieur au prix de revient ajusté (acquisition + frais + travaux),
              vous réalisez une <strong>moins-value</strong>. Dans ce cas :
            </p>
            <ul className="list-disc pl-6 mb-3 space-y-2">
              <li><strong>Aucun impôt n&apos;est dû.</strong></li>
              <li>
                La moins-value immobilière des particuliers <strong>n&apos;est pas imputable</strong> sur
                d&apos;autres revenus (contrairement aux moins-values mobilières sur PEA ou
                compte-titres, qui peuvent être imputées sur des plus-values de même nature).
              </li>
              <li>Elle n&apos;est pas reportable sur des cessions futures.</li>
            </ul>
            <p className="text-sm text-neutral-600">
              Elle est définitivement perdue fiscalement. La prise en compte des frais et travaux
              dans le prix de revient peut toutefois transformer une légère plus-value brute en
              moins-value après retraitement.
            </p>
          </>
        ),
      },
      {
        question: "Qui calcule et prélève les impôts lors de la vente ?",
        answer: (
          <>
            <p className="mb-3">
              C&apos;est le <strong>notaire</strong> qui calcule et prélève l&apos;intégralité des
              impôts lors de la signature de l&apos;acte authentique de vente :
            </p>
            <ul className="list-disc pl-6 mb-3 space-y-1">
              <li>IR 19 % (Art. 200 B CGI)</li>
              <li>Prélèvements sociaux 17,2 %</li>
              <li>Surtaxe éventuelle (Art. 1609 nonies G CGI)</li>
            </ul>
            <p className="mb-3">
              Le vendeur perçoit directement le <strong>prix net après déduction</strong> de l&apos;impôt.
              Le notaire verse ensuite les prélèvements au Trésor Public. Il n&apos;y a pas de
              déclaration séparée à remplir pour les cessions soumises au régime d&apos;imposition
              des plus-values des particuliers.
            </p>
            <div className="bg-primary-50 border-l-4 border-primary-400 p-4">
              <p className="text-sm text-primary-900">
                Ce calculateur est indicatif. Le notaire dispose des informations précises
                (actes d&apos;acquisition, justificatifs de travaux, etc.) pour calculer le montant définitif.
              </p>
            </div>
          </>
        ),
      },
      {
        question: "Le calcul est-il le même pour une résidence secondaire et un bien locatif ?",
        answer: (
          <>
            <p className="mb-3">
              Oui, pour l&apos;essentiel. La résidence secondaire et les biens locatifs (immeubles de rapport,
              appartements loués) sont imposés selon les <strong>mêmes règles</strong> : IR 19 %, PS 17,2 %,
              abattements identiques pour durée de détention, surtaxe éventuelle.
            </p>
            <p className="mb-3">
              La principale différence concerne les <strong>travaux déductibles</strong> pour un bien locatif :
              si vous avez déduit des charges d&apos;entretien ou de réparation de vos revenus fonciers,
              ces mêmes travaux ne peuvent pas être inclus dans le prix de revient pour réduire la
              plus-value. En revanche, le forfait global de 15 % reste disponible pour les dépenses
              non encore prises en compte dans les revenus fonciers.
            </p>
          </>
        ),
      },
    ],
  },
  {
    title: "Outil et données",
    items: [
      {
        question: "Mes données saisies sont-elles conservées ou envoyées quelque part ?",
        answer: (
          <>
            <p className="mb-3">
              <strong>Non, absolument pas.</strong> Tous les calculs sont effectués localement dans votre
              navigateur. Aucune donnée n&apos;est transmise à un serveur ni conservée après fermeture
              de la page.
            </p>
            <p>
              Le code source est open-source et vérifiable sur{' '}
              <a href="https://github.com/nba67000/calculpatrimoine" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                GitHub
              </a>.
            </p>
          </>
        ),
      },
      {
        question: "Le calculateur tient-il compte des non-résidents fiscaux ?",
        answer: (
          <p>
            Non. Ce calculateur est conçu pour les <strong>résidents fiscaux français</strong>.
            Les non-résidents qui cèdent un bien immobilier en France sont soumis à des règles
            spécifiques (taux de 19 % également mais avec des prélèvements sociaux spécifiques,
            désignation d&apos;un représentant fiscal, etc.). Consultez un conseiller fiscal spécialisé
            en fiscalité internationale.
          </p>
        ),
      },
    ],
  },
]

export default function FAQPlusValueImmobilierePage() {
  return (
    <>
      <Header />
      <div className="h-[3px] bg-accent-400 w-full" />
      <main style={{ backgroundColor: '#F7F3EC' }}>
        <div className="max-w-4xl mx-auto px-6 py-16">

          <header className="mb-12">
            <nav className="flex items-center gap-2 font-mono text-xs text-neutral-400 mb-8">
              <Link href="/" className="hover:text-primary-600 transition-colors">Accueil</Link>
              <span>/</span>
              <Link href="/faq" className="hover:text-primary-600 transition-colors">FAQ</Link>
              <span>/</span>
              <span className="text-neutral-600">Plus-value immobilière</span>
            </nav>

            <div className="h-[2px] w-10 bg-accent-400 mb-6" />

            <h1 className="font-serif text-4xl font-bold text-neutral-900 mb-4">
              Questions fréquentes<br />Plus-value immobilière
            </h1>
            <p className="text-lg text-neutral-600 max-w-2xl mb-10">
              Frais déductibles, abattements IR vs PS, surtaxe, exonérations —
              tout comprendre sur l&apos;imposition d&apos;une cession immobilière.
            </p>

            <Link
              href="/plus-value-immobiliere"
              className="block bg-primary-600 text-white rounded-xl p-6 hover:bg-primary-700 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium mb-1 text-primary-100">Calculateur</div>
                  <div className="text-lg font-bold">Simulez votre plus-value immobilière 2026</div>
                </div>
                <div className="text-2xl group-hover:translate-x-1 transition-transform">→</div>
              </div>
            </Link>
          </header>

          {sections.map((section, i) => (
            <section key={i} className="mb-12">
              <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-6">{section.title}</h2>
              <div>
                {section.items.map((item, j) => (
                  <FAQAccordionClient key={j} question={item.question}>{item.answer}</FAQAccordionClient>
                ))}
              </div>
            </section>
          ))}

          <div className="border-t border-neutral-300">
            {[
              { href: '/faq/tmi', label: 'FAQ TMI', desc: 'Connaître sa TMI est utile pour comprendre l\'impact d\'une plus-value sur votre IR global.' },
              { href: '/faq/assurance-vie', label: 'FAQ Assurance-Vie', desc: 'Les règles d\'imposition de l\'assurance-vie sont très différentes de l\'immobilier.' },
              { href: '/faq', label: 'Toutes les FAQ', desc: 'Rente viagère, PER, TMI, transmission — retrouvez chaque FAQ.' },
            ].map((link) => (
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

          <div className="bg-primary-700 p-8 text-center text-white mt-12">
            <h3 className="font-serif text-2xl font-bold mb-3">Vous avez d&apos;autres questions ?</h3>
            <p className="text-primary-200 mb-6 font-mono text-sm">Réponse par email sous 48h.</p>
            <a href="mailto:contact@calculpatrimoine.fr" className="inline-block bg-white text-primary-700 px-8 py-3 font-medium hover:bg-neutral-100 transition-colors">
              Nous contacter →
            </a>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
