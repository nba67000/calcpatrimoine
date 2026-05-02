// src/components/Footer.tsx
'use client'

import Link from 'next/link'
import { CALCULATEURS, RESSOURCES, LIENS_LEGAUX } from '@/config/navigation'

export default function Footer() {
 return (
 <footer className="bg-neutral-900 text-neutral-300 mt-16">
 <div className="max-w-6xl mx-auto px-4 py-12">
 
 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
 
 {/* Marque */}
 <div className="col-span-2">
 <Link href="/" className="flex items-center gap-3 mb-4">
 <div className="w-10 h-10 bg-primary-700 flex items-center justify-center">
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
 {CALCULATEURS.map(item => (
 <li key={item.href}>
 <Link href={item.href} className="text-neutral-400 hover:text-white transition-colors block py-1">
 {item.label}
 </Link>
 </li>
 ))}
 </ul>
 </div>

 {/* Ressources */}
 <div>
 <p className="text-xs uppercase tracking-wider text-neutral-500 font-semibold mb-4">
 Ressources
 </p>
 <ul className="space-y-2 text-sm">
 {RESSOURCES.map(item => (
 <li key={item.href}>
 <Link href={item.href} className="text-neutral-400 hover:text-white transition-colors block py-1">
 {item.label}
 </Link>
 </li>
 ))}
 </ul>
 </div>
 </div>

 {/* Ligne bas */}
 <div className="pt-8 border-t border-neutral-800 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
 <div className="text-xs text-neutral-500">
 © {new Date().getFullYear()} CalcPatrimoine · Tous droits réservés
 </div>
 <div className="flex flex-wrap gap-x-6 gap-y-2">
 {LIENS_LEGAUX.map(item => (
 <Link key={item.href} href={item.href} className="text-xs text-neutral-500 hover:text-white transition-colors">
 {item.label}
 </Link>
 ))}
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
