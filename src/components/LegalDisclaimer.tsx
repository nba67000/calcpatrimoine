export default function LegalDisclaimer() {
  return (
    <div className="border-l-4 border-warning-400 bg-warning-50 px-5 py-4 mb-6">
      <p className="font-mono text-xs font-bold text-warning-800 uppercase tracking-wider mb-1">
        Avertissement
      </p>
      <p className="text-sm text-warning-700 leading-relaxed">
        Ce calculateur fait des simulations. Il ne remplace pas un conseiller. Les résultats
        dépendent uniquement des données que vous saisissez et des barèmes officiels en vigueur.
        CalculPatrimoine n&apos;est pas un conseiller financier agréé (non enregistré comme CIF
        auprès de l&apos;AMF/ACPR, au sens de la directive MIF II). Consultez un professionnel
        qualifié avant toute décision.
      </p>
    </div>
  )
}
