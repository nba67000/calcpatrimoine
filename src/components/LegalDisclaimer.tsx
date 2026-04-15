// src/components/LegalDisclaimer.tsx

export default function LegalDisclaimer() {
  return (
    <div className="mb-6 p-6 bg-red-50 border-2 border-red-200 rounded-lg">
      <h3 className="text-lg font-bold text-red-900 mb-3 flex items-center gap-2">
        <span className="text-2xl">⚠️</span>
        Avertissement Important
      </h3>
      
      <div className="text-sm text-red-800 space-y-3">
        <p className="font-semibold">
          CalcPatrimoine est un outil pédagogique gratuit à titre indicatif uniquement. 
          Il ne constitue en aucun cas :
        </p>
        
        <ul className="list-disc list-inside space-y-1 ml-4 text-red-700">
          <li>Un conseil en investissement personnalisé</li>
          <li>Une recommandation de souscription</li>
          <li>Une garantie de résultat</li>
          <li>Un avis juridique, fiscal ou patrimonial</li>
        </ul>
        
        <div className="bg-red-100 p-3 rounded mt-3">
          <p className="font-semibold text-red-900 mb-2">
            Les calculs sont basés sur des formules actuarielles standard mais ne tiennent PAS compte de :
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4 text-red-700 text-xs">
            <li>Votre situation fiscale personnelle</li>
            <li>Votre état de santé spécifique</li>
            <li>Votre régime matrimonial</li>
            <li>Les frais et commissions des assureurs (variables selon contrats)</li>
            <li>Les clauses particulières des contrats</li>
            <li>Les évolutions réglementaires futures</li>
          </ul>
        </div>
        
        <p className="font-bold text-red-900 mt-4">
          ⚖️ Avant toute décision d'investissement, consultez IMPÉRATIVEMENT :
        </p>
        
        <ul className="list-disc list-inside space-y-1 ml-4 text-red-700">
          <li>Un <strong>conseiller en gestion de patrimoine</strong> certifié (CGP)</li>
          <li>Un <strong>notaire</strong> pour les aspects successoraux et matrimoniaux</li>
          <li>Un <strong>expert-comptable</strong> pour optimiser la fiscalité</li>
        </ul>
        
        <div className="border-t border-red-300 pt-3 mt-4">
          <p className="text-xs text-red-700">
            <strong>Limitation de responsabilité :</strong> CalcPatrimoine décline toute responsabilité 
            en cas de décision prise uniquement sur la base des calculs fournis. L'éditeur ne peut être 
            tenu responsable d'éventuelles erreurs de calcul, bugs logiciels, ou évolutions réglementaires 
            postérieures à la dernière mise à jour (avril 2026).
          </p>
        </div>
      </div>
    </div>
  )
}
