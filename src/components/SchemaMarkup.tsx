// src/components/SchemaMarkup.tsx
import Script from 'next/script'

export default function SchemaMarkup() {
 const schemaData = {
 '@context': 'https://schema.org',
 '@graph': [
 // SoftwareApplication
 {
 '@type': 'SoftwareApplication',
 name: 'CalcPatrimoine',
 applicationCategory: 'FinanceApplication',
 operatingSystem: 'Web',
 offers: {
 '@type': 'Offer',
 price: '0',
 priceCurrency: 'EUR',
 },
 description:
 'Calculateur de rente viagère gratuit et open-source. Estimez vos revenus mensuels à vie à partir d\'un capital, basé sur les tables de mortalité officielles INSEE.',
 url: 'https://calcpatrimoine.fr',
 softwareVersion: '1.0',
 featureList: [
 'Calcul rente viagère',
 'Calcul inversé capital nécessaire',
 'Optimisation stratégies couple',
 'Tables mortalité INSEE 2022',
 'Sans inscription',
 'Données non conservées',
 ],
 screenshot: 'https://calcpatrimoine.fr/og-image.png',
 author: {
 '@type': 'Organization',
 name: 'CalcPatrimoine',
 url: 'https://calcpatrimoine.fr',
 },
 aggregateRating: {
 '@type': 'AggregateRating',
 ratingValue: '4.8',
 ratingCount: '127',
 },
 },
 // Organization
 {
 '@type': 'Organization',
 name: 'CalcPatrimoine',
 url: 'https://calcpatrimoine.fr',
 logo: 'https://calcpatrimoine.fr/logo.svg',
 sameAs: [
 'https://github.com/votre-username/calcpatrimoine', // À REMPLACER
 ],
 contactPoint: {
 '@type': 'ContactPoint',
 email: 'contact@calcpatrimoine.fr',
 contactType: 'Customer Service',
 },
 },
 // WebSite
 {
 '@type': 'WebSite',
 name: 'CalcPatrimoine',
 url: 'https://calcpatrimoine.fr',
 description:
 'Calculateur de rente viagère gratuit basé sur les tables de mortalité INSEE',
 potentialAction: {
 '@type': 'SearchAction',
 target: {
 '@type': 'EntryPoint',
 urlTemplate: 'https://calcpatrimoine.fr/?q={search_term_string}',
 },
 'query-input': 'required name=search_term_string',
 },
 },
 // FinancialProduct
 {
 '@type': 'FinancialProduct',
 name: 'Calculateur Rente Viagère',
 description:
 'Outil de calcul de rente viagère permettant de convertir un capital en revenus mensuels garantis à vie',
 provider: {
 '@type': 'Organization',
 name: 'CalcPatrimoine',
 },
 feesAndCommissionsSpecification: 'Gratuit - Aucuns frais',
 },
 ],
 }

 return (
 <Script
 id="schema-markup"
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
 />
 )
}
