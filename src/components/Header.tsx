// src/components/Header.tsx
import Link from 'next/link'

export default function Header() {
  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity group">
          {/* Logo monogramme C */}
          <div className="relative">
            <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl 
                            flex items-center justify-center shadow-md 
                            group-hover:shadow-lg group-hover:scale-105 transition-all duration-200">
              <span className="text-white font-bold text-2xl tracking-tight">C</span>
            </div>
            {/* Point d'accent subtil */}
            <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-cyan-400 rounded-full 
                            ring-2 ring-white"></div>
          </div>
          
          {/* Nom de marque */}
          <div className="flex flex-col">
            <span className="font-bold text-gray-900 text-lg leading-tight">CalcPatrimoine</span>
            <span className="text-xs text-gray-500 leading-tight">Calculateurs open-source</span>
          </div>
        </Link>
        
        <nav className="hidden md:flex gap-6 text-sm">
          <Link 
            href="/methodologie" 
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Méthodologie
          </Link>
          <Link 
            href="/a-propos" 
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            À propos
          </Link>
        </nav>

        {/* Mobile menu button - to be implemented in V2 */}
        <button className="md:hidden p-2 text-gray-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  )
}
