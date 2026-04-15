import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import PlausibleScript from "@/components/PlausibleScript";
import SchemaMarkup from "@/components/SchemaMarkup";

// Fontsource imports pour CalcPatrimoine
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@fontsource/playfair-display/700.css'
import '@fontsource/roboto-mono/500.css'
import '@fontsource/roboto-mono/700.css'

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://calcpatrimoine.fr'),
  title: {
    default: 'CalcPatrimoine - Calculateur de Rente Viagère Gratuit',
    template: '%s | CalcPatrimoine'
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
  authors: [{ name: 'CalcPatrimoine', url: 'https://calcpatrimoine.fr' }],
  creator: 'CalcPatrimoine',
  publisher: 'CalcPatrimoine',
  
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
    siteName: 'CalcPatrimoine',
    url: 'https://calcpatrimoine.fr',
    title: 'CalcPatrimoine - Calculateur de Rente Viagère Gratuit',
    description: 'Calculez votre rente viagère en quelques secondes. Outil gratuit basé sur les tables de mortalité INSEE 2022. Sans inscription, open-source, données non conservées.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'CalcPatrimoine - Calculateur de Rente Viagère',
        type: 'image/png',
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    site: '@calcpatrimoine',
    creator: '@calcpatrimoine',
    title: 'CalcPatrimoine - Calculateur de Rente Viagère Gratuit',
    description: 'Calculez votre rente viagère gratuitement. Tables INSEE 2022, open-source, sans inscription.',
    images: ['/og-image.png'],
  },
  
  verification: {
    google: 'VOTRE_CODE_GOOGLE_SEARCH_CONSOLE', // À remplacer
    yandex: 'VOTRE_CODE_YANDEX', // Optionnel
    // bing: 'VOTRE_CODE_BING', // Via Bing Webmaster Tools
  },
  
  alternates: {
    canonical: 'https://calcpatrimoine.fr',
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
      <body className={`${inter.className} antialiased`}>
        {/* Schema.org JSON-LD pour SEO */}
        <SchemaMarkup />
        
        {/* Plausible Analytics - Auto-hébergé, RGPD compliant, sans cookies */}
        <PlausibleScript />
        
        {children}
      </body>
    </html>
  );
}
