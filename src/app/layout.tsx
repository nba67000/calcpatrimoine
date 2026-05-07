import type { Metadata } from "next";
import { Inter, Playfair_Display, Lora } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import SchemaMarkup from "@/components/SchemaMarkup";

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: 'swap',
  weight: ['700'],
  variable: '--font-playfair',
});

const lora = Lora({
  subsets: ["latin"],
  display: 'swap',
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-lora',
});

export const metadata: Metadata = {
 metadataBase: new URL('https://calculpatrimoine.fr'),
 title: {
 default: 'CalculPatrimoine - Calculateur de Rente Viagère Gratuit',
 template: '%s | CalculPatrimoine'
 },
 description: 'Calculateur de rente viagère gratuit et open-source. Estimez vos revenus mensuels à vie basés sur les tables de mortalité officielles INSEE 2022. Sans inscription, données non conservées.',
 keywords: [
 'calculateur rente viagère',
 'rente viagère calcul',
 'viager calcul',
 'tables mortalité INSEE',
 'espérance de vie',
 'réversion',
 'capital rente',
 'revenus à vie',
 'patrimoine',
 'assurance vie',
 'PER',
 'calculateur patrimoine',
 'simulateur viager',
 'open source finance'
 ],
 authors: [{ name: 'CalculPatrimoine', url: 'https://calculpatrimoine.fr' }],
 creator: 'CalculPatrimoine',
 publisher: 'CalculPatrimoine',
 
 robots: {
 index: true,
 follow: true,
 googleBot: {
 index: true,
 follow: true,
 'max-video-preview': -1,
 'max-image-preview': 'large',
 'max-snippet': -1,
 },
 },
 
 openGraph: {
 type: 'website',
 locale: 'fr_FR',
 siteName: 'CalculPatrimoine',
 url: 'https://calculpatrimoine.fr',
 title: 'CalculPatrimoine - Calculateur de Rente Viagère Gratuit',
 description: 'Calculez votre rente viagère en quelques secondes. Outil gratuit basé sur les tables de mortalité INSEE 2022. Sans inscription, open-source, données non conservées.',
 images: [
 {
 url: '/og-image.png',
 width: 1200,
 height: 630,
 alt: 'CalculPatrimoine - Calculateur de Rente Viagère',
 type: 'image/png',
 },
 ],
 },
 
 twitter: {
 card: 'summary_large_image',
 site: '@calculpatrimoine',
 creator: '@calculpatrimoine',
 title: 'CalculPatrimoine - Calculateur de Rente Viagère Gratuit',
 description: 'Calculez votre rente viagère gratuitement. Tables INSEE 2022, open-source, sans inscription.',
 images: ['/og-image.png'],
 },
 
 verification: {
 google: 'TNiWVpRx2OUPkpd3psd01dLxb9RyaBLgsWxrN_Z-GlY', // À remplacer
 yandex: 'VOTRE_CODE_YANDEX', // Optionnel
 // bing: 'VOTRE_CODE_BING', // Via Bing Webmaster Tools
 },
 
 alternates: {
 canonical: 'https://calculpatrimoine.fr',
 },
 
 // Autres metadatas SEO
 category: 'Finance',
 classification: 'Finance Calculator',
};

export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
 <html lang="fr">
 <head>
 <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
 <link rel="alternate icon" href="/favicon.ico" />
 <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
 </head>
 <body className={`${inter.variable} ${playfair.variable} ${lora.variable} antialiased`}>
 {/* Schema.org JSON-LD pour SEO */}
 <SchemaMarkup />
 
 {children}
 
 {/* Vercel Web Analytics — page views et performance, sans cookies */}
 <Analytics />
 </body>
 </html>
 );
}
