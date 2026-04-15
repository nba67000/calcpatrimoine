// src/app/page.tsx - PAGE DE MAINTENANCE TEMPORAIRE

export const metadata = {
  title: 'Maintenance en cours - CalcPatrimoine',
  description: 'CalcPatrimoine est temporairement indisponible pour mise à jour'
}

export default function MaintenancePage() {
  const estimatedReturnTime = new Date(Date.now() + 45 * 60 * 1000) // +45 min
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        
        {/* Card principale */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center border border-gray-100">
          
          {/* Logo/Titre */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
              CalcPatrimoine
            </h1>
            <p className="text-sm text-gray-500 font-medium">
              Calculateur de rente viagère open-source
            </p>
          </div>

          {/* Icône animée */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-blue-100 rounded-full">
              <svg 
                className="w-12 h-12 text-blue-600 animate-spin" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
                />
              </svg>
            </div>
          </div>

          {/* Message principal */}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Mise à jour en cours
          </h2>
          
          <p className="text-lg text-gray-600 mb-6 max-w-xl mx-auto">
            CalcPatrimoine est temporairement indisponible pour une mise à jour importante.
          </p>

          {/* Détails mise à jour */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6 mb-6">
            <h3 className="font-semibold text-blue-900 mb-3 text-lg">
              🔄 Nouveautés de cette mise à jour
            </h3>
            <ul className="text-sm text-blue-800 space-y-2 text-left max-w-md mx-auto">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">✓</span>
                <span>Migration table de mortalité unisexe (conformité réglementation 2012)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">✓</span>
                <span>Amélioration des disclaimers juridiques</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">✓</span>
                <span>Ajout pages légales complètes (CGU, confidentialité)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">✓</span>
                <span>Corrections et optimisations diverses</span>
              </li>
            </ul>
          </div>

          {/* Timing */}
          <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-5 mb-6">
            <div className="flex items-center justify-center gap-3 mb-2">
              <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="font-semibold text-amber-900">
                Durée estimée : 30-45 minutes
              </p>
            </div>
            <p className="text-sm text-amber-700">
              Retour prévu : {estimatedReturnTime.toLocaleTimeString('fr-FR', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </p>
          </div>

          {/* Contact */}
          <div className="pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Une question urgente ?
            </p>
            <a 
              href="mailto:contact@calcpatrimoine.fr" 
              className="text-blue-600 hover:text-blue-700 font-medium hover:underline inline-flex items-center gap-1 mt-2"
            >
              contact@calcpatrimoine.fr
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>

        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} CalcPatrimoine - Code source open-source sous licence MIT
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Merci de votre patience 🙏
          </p>
        </div>

      </div>
    </div>
  )
}
