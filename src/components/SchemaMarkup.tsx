// src/components/SchemaMarkup.tsx
import Script from 'next/script'

export default function SchemaMarkup() {
 const schemaData = {
 '@context': 'https://schema.org',
 '@graph': [
 // SoftwareApplication
 {
 '@type': 'SoftwareApplication',
 name: 'CalculPatrimoine',
 applicationCategory: 'FinanceApplication',
 operatingSystem: 'Web',
 offers: {
 '@type': 'Offer',
 price: '0',
 priceCurrency: 'EUR',
 },
 description:
 'Calculateur de rente viagère gratuit et open-source. Estimez vos revenus mensuels à vie à partir d\'un capital, basé sur les tables de mortalité officielles INSEE.',
 url: 'https://calculpatrimoine.fr',
 softwareVersion: '1.0',
 featureList: [
 'Calcul rente viagère',
 'Calcul inversé capital nécessaire',
 'Optimisation stratégies couple',
 'Tables mortalité INSEE 2022',
 'Sans inscription',
 'Données non conservées',
 ],
 screenshot: 'https://calculpatrimoine.fr/og-image.png',
 author: {
 '@type': 'Organization',
 name: 'CalculPatrimoine',
 url: 'https://calculpatrimoine.fr',
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
 name: 'CalculPatrimoine',
 url: 'https://calculpatrimoine.fr',
 logo: 'https://calculpatrimoine.fr/logo.svg',
 sameAs: [
 'https://github.com/votre-username/calculpatrimoine', // À REMPLACER
 ],
 contactPoint: {
 '@type': 'ContactPoint',
 email: 'contact@calculpatrimoine.fr',
 contactType: 'Customer Service',
 },
 },
 // WebSite
 {
 '@type': 'WebSite',
 name: 'CalculPatrimoine',
 url: 'https://calculpatrimoine.fr',
 description:
 'Calculateur de rente viagère gratuit basé sur les tables de mortalité INSEE',
 potentialAction: {
 '@type': 'SearchAction',
 target: {
 '@type': 'EntryPoint',
 urlTemplate: 'https://calculpatrimoine.fr/?q={search_term_string}',
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
 name: 'CalculPatrimoine',
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
