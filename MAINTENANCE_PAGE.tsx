// src/app/page.tsx - REMPLACER TEMPORAIREMENT

export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-12 text-center">
        
        {/* Logo */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            CalcPatrimoine
          </h1>
          <p className="text-sm text-gray-500">Calculateur de rente viagère</p>
        </div>

        {/* Icône */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-blue-100 rounded-full">
            <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
        </div>

        {/* Message */}
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Mise à jour en cours
        </h2>
        
        <p className="text-lg text-gray-600 mb-8">
          CalcPatrimoine est temporairement indisponible pour une mise à jour importante 
          (migration table unisexe conforme réglementation 2012).
        </p>

        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-8">
          <p className="text-sm text-blue-900">
            <strong>⏱️ Durée estimée :</strong> 30 minutes<br />
            <strong>🔄 Retour prévu :</strong> {new Date(Date.now() + 30 * 60 * 1000).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>

        {/* Contact */}
        <p className="text-sm text-gray-500">
          Questions ? Contactez-nous : 
          <a href="mailto:contact@calcpatrimoine.fr" className="text-blue-600 hover:underline ml-1">
            contact@calcpatrimoine.fr
          </a>
        </p>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} CalcPatrimoine - Outil open-source
          </p>
        </div>

      </div>
    </div>
  )
}
