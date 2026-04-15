// src/components/Header.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const navLinks = [
    { href: '/faq', label: 'FAQ' },
    { href: '/methodologie', label: 'Méthodologie' },
    { href: '/a-propos', label: 'À propos' },
  ]

  return (
    <header className="border-b border-neutral-200 bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link 
          href="/" 
          className="flex items-center gap-3 hover:opacity-90 transition-opacity group"
          onClick={() => setMobileMenuOpen(false)}
        >
          {/* Logo avec accent or */}
          <div className="w-11 h-11 bg-primary-700 rounded-md flex items-center justify-center shadow-md 
                          group-hover:shadow-lg group-hover:bg-primary-800 transition-all duration-200">
            <span className="text-white font-bold text-2xl">C</span>
          </div>
          
          {/* Nom de marque */}
          <div className="flex flex-col">
            <span className="font-bold text-neutral-900 text-lg leading-tight">CalcPatrimoine</span>
            <span className="text-xs text-neutral-500 leading-tight">Calculateurs open-source</span>
          </div>
        </Link>
        
        {/* Navigation desktop */}
        <nav className="hidden md:flex gap-6 text-sm">
          {navLinks.map((link) => (
            <Link 
              key={link.href}
              href={link.href} 
              className={`transition-colors font-medium ${
                pathname === link.href 
                  ? 'text-primary-700' 
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2 text-neutral-600 hover:text-neutral-900 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menu"
        >
          {mobileMenuOpen ? (
            // Icône X (fermer)
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            // Icône hamburger (ouvrir)
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <nav className="md:hidden border-t border-neutral-200 bg-white">
          <div className="max-w-6xl mx-auto px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-3 rounded-md transition-colors ${
                  pathname === link.href
                    ? 'bg-primary-50 text-primary-700 font-medium'
                    : 'text-neutral-700 hover:bg-neutral-50'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
