// src/components/Footer.tsx
'use client'

import Link from 'next/link'

export default function Footer() {
 return (
 <footer className="bg-neutral-900 text-neutral-300 mt-16">
 <div className="max-w-6xl mx-auto px-4 py-12">
 
 <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
 
 {/* Marque */}
 <div className="col-span-2">
 <Link href="/" className="flex items-center gap-3 mb-4">
 <div className="w-10 h-10 bg-primary-700 rounded-md flex items-center justify-center">
 <span className="text-white font-bold text-xl">C</span>
 </div>
 <span className="text-white text-lg font-bold">CalcPatrimoine</span>
 </Link>
 <p className="text-sm text-neutral-400 leading-relaxed max-w-sm">
 Calculateurs patrimoniaux gratuits et open-source. Sans inscription, 
 sans publicité, aucune donnée conservée.
 </p>
 </div>

 {/* Calculateurs */}
 <div>
 <p className="text-xs uppercase tracking-wider text-neutral-500 font-semibold mb-4">
 Calculateurs
 </p>
 <ul className="space-y-2 text-sm">
 <li>
 <Link href="/rente-viagere" className="text-neutral-400 hover:text-white transition-colors">
 Rente Viagère
 </Link>
 </li>
 <li>
 <Link href="/assurance-vie" className="text-neutral-400 hover:text-white transition-colors">
 Assurance-Vie
 </Link>
 </li>
 </ul>
 </div>

 {/* Ressources */}
 <div>
 <p className="text-xs uppercase tracking-wider text-neutral-500 font-semibold mb-4">
 Ressources
 </p>
 <ul className="space-y-2 text-sm">
 <li>
 <Link href="/blog" className="text-neutral-400 hover:text-white transition-colors">
 Blog
 </Link>
 </li>
 <li>
 <Link href="/faq" className="text-neutral-400 hover:text-white transition-colors">
 FAQ
 </Link>
 </li>
 <li>
 <Link href="/methodologie" className="text-neutral-400 hover:text-white transition-colors">
 Méthodologie
 </Link>
 </li>
 <li>
 <Link href="/a-propos" className="text-neutral-400 hover:text-white transition-colors">
 À propos
 </Link>
 </li>
 </ul>
 </div>
 </div>

 {/* Ligne bas */}
 <div className="pt-8 border-t border-neutral-800 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
 <div className="text-xs text-neutral-500">
 © {new Date().getFullYear()} CalcPatrimoine · Tous droits réservés
 </div>
 <div className="flex flex-wrap gap-x-6 gap-y-2">
 <Link href="/mentions-legales" className="text-xs text-neutral-500 hover:text-white transition-colors">
 Mentions légales
 </Link>
 <Link href="/cgu" className="text-xs text-neutral-500 hover:text-white transition-colors">
 CGU
 </Link>
 <Link href="/politique-confidentialite" className="text-xs text-neutral-500 hover:text-white transition-colors">
 Confidentialité
 </Link>
 <a
 href="https://github.com/nba67000/calcpatrimoine"
 target="_blank"
 rel="noopener noreferrer"
 className="text-xs text-neutral-500 hover:text-white transition-colors"
>
 Code source
 </a>
 </div>
 </div>
 </div>
 </footer>
 )
}
