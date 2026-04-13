import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://calcpatrimoine.fr'),
  title: {
    default: 'CalcPatrimoine | Calculateurs Patrimoniaux Open Source',
    template: '%s | CalcPatrimoine'
  },
  description: 'Calculateurs patrimoniaux gratuits et transparents : rente viagère, TMI, assurance-vie, PER. Basés sur les données officielles INSEE.',
  keywords: [
    'calculateur patrimoine',
    'rente viagère',
    'TMI',
    'tranche marginale imposition',
    'assurance-vie',
    'PER',
    'simulateur fiscal',
    'optimisation fiscale',
    'calcul rente viagère',
    'tables mortalité INSEE',
    'réversion',
    'calculateur viager',
    'rachat assurance-vie',
    'IFI',
    'plus-value immobilière'
  ],
  authors: [{ name: 'Nicolas Barbier' }],
  creator: 'Nicolas Barbier',
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
    title: 'CalcPatrimoine - Calculateurs Patrimoniaux Open Source',
    description: 'Calculateurs gratuits et transparents pour gérer votre patrimoine : rente viagère, TMI, assurance-vie, optimisations fiscales.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'CalcPatrimoine - Calculateurs Patrimoniaux',
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'CalcPatrimoine - Calculateurs Patrimoniaux Open Source',
    description: 'Outils gratuits et transparents basés sur les données officielles',
    images: ['/og-image.png'],
  },
  
  verification: {
    google: 'votre-code-google-search-console',
  },
  
  alternates: {
    canonical: 'https://calcpatrimoine.fr',
  },
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
        {children}
      </body>
    </html>
  );
}
