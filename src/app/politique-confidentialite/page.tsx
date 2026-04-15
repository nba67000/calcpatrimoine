// src/app/politique-confidentialite/page.tsx

export const metadata = {
  title: 'Politique de Confidentialité - CalcPatrimoine',
  description: 'Politique de confidentialité et protection des données personnelles sur CalcPatrimoine'
}

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Politique de Confidentialité</h1>

        <div className="bg-white rounded-2xl border border-gray-200 p-8 space-y-8">
          
          {/* Intro */}
          <section>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-green-900 font-medium">
                ✅ CalcPatrimoine ne collecte <strong>AUCUNE donnée personnelle identifiable</strong>.
              </p>
            </div>
            <p className="text-gray-700">
              Cette politique de confidentialité explique comment nous traitons les informations 
              dans le cadre de votre utilisation du site CalcPatrimoine.fr.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Dernière mise à jour : 15 avril 2026
            </p>
          </section>

          {/* Ce que nous NE collectons PAS */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Ce que nous NE collectons PAS</h2>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">❌</span>
                  <span>Nom, prénom, adresse email ou numéro de téléphone</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">❌</span>
                  <span>Adresse postale ou adresse IP complète</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">❌</span>
                  <span>Montants de capital, âges ou situations personnelles que vous saisissez dans les calculateurs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">❌</span>
                  <span>Cookies de tracking, publicité ou réseaux sociaux</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">❌</span>
                  <span>Données de navigation cross-site (pas de fingerprinting)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">❌</span>
                  <span>Compte utilisateur, historique de calculs ou profils personnalisés</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Ce que nous collectons */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Ce que nous collectons (anonyme)</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <p className="text-gray-700 mb-4">
                Nous utilisons <strong>Plausible Analytics</strong>, une solution d&apos;analyse 
                respectueuse de la vie privée, conforme au RGPD et qui ne nécessite pas de 
                bandeau de consentement aux cookies.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>Pages visitées (sans identification de l&apos;utilisateur)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>Pays d&apos;origine (niveau pays uniquement, pas de ville)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>Appareil utilisé (desktop/mobile/tablette, de manière agrégée)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>Source de trafic (Google, lien direct, etc., sans tracking individuel)</span>
                </li>
              </ul>
              <p className="text-sm text-gray-600 mt-4">
                <strong>Important :</strong> Ces statistiques sont entièrement anonymes et agrégées. 
                Nous ne pouvons identifier aucun utilisateur individuel.
              </p>
            </div>
          </section>

          {/* Calculs locaux */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Calculs effectués localement</h2>
            <div className="text-gray-700 space-y-3">
              <p>
                <strong>Tous les calculs de rente viagère sont effectués directement dans votre navigateur</strong>, 
                côté client (frontend), grâce à JavaScript.
              </p>
              <p className="font-semibold text-green-700">
                ✅ Aucune donnée que vous saisissez (âge, capital, situation familiale) n&apos;est 
                transmise à nos serveurs ou stockée quelque part.
              </p>
              <p>
                Vos informations restent 100% privées et disparaissent dès que vous fermez votre navigateur 
                ou rechargez la page.
              </p>
            </div>
          </section>

          {/* Plausible */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Pourquoi Plausible Analytics ?</h2>
            <div className="text-gray-700 space-y-3">
              <p>
                Nous avons choisi Plausible car c&apos;est une alternative éthique à Google Analytics :
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Open-source et transparent</li>
                <li>Hébergé en Europe (conformité RGPD)</li>
                <li>Pas de cookies de tracking</li>
                <li>Pas de collecte de données personnelles</li>
                <li>Pas de vente de données à des tiers</li>
                <li>Statistiques entièrement anonymes</li>
              </ul>
              <p className="mt-4">
                Pour en savoir plus : <a href="https://plausible.io/privacy-focused-web-analytics" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Documentation Plausible</a>
              </p>
            </div>
          </section>

          {/* Vos droits RGPD */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Vos droits (RGPD)</h2>
            <div className="text-gray-700 space-y-3">
              <p>
                Bien que nous ne collections aucune donnée personnelle identifiable, 
                conformément au Règlement Général sur la Protection des Données (RGPD), 
                vous disposez des droits suivants :
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Droit d&apos;accès à vos données</li>
                <li>Droit de rectification</li>
                <li>Droit à l&apos;effacement</li>
                <li>Droit d&apos;opposition au traitement</li>
                <li>Droit à la portabilité</li>
              </ul>
              <p className="mt-4">
                Pour exercer ces droits ou pour toute question concernant vos données personnelles, 
                contactez-nous à : <a href="mailto:contact@calcpatrimoine.fr" className="text-blue-600 hover:underline font-medium">contact@calcpatrimoine.fr</a>
              </p>
            </div>
          </section>

          {/* Conservation */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Conservation des données</h2>
            <div className="text-gray-700">
              <p>
                Les statistiques anonymes collectées via Plausible Analytics sont conservées 
                pour une durée maximale de <strong>24 mois</strong>, après quoi elles sont 
                automatiquement supprimées.
              </p>
            </div>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Cookies</h2>
            <div className="text-gray-700 space-y-3">
              <p>
                CalcPatrimoine <strong>n&apos;utilise pas de cookies de tracking</strong> nécessitant 
                votre consentement.
              </p>
              <p>
                Plausible Analytics n&apos;utilise aucun cookie. C&apos;est pourquoi vous ne voyez 
                pas de bandeau de consentement aux cookies sur ce site (conformément à la réglementation, 
                un tel bandeau n&apos;est obligatoire que si des cookies de tracking sont utilisés).
              </p>
            </div>
          </section>

          {/* Sécurité */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Sécurité</h2>
            <div className="text-gray-700">
              <p>
                Nous mettons en œuvre des mesures de sécurité appropriées pour protéger nos systèmes, 
                notamment :
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                <li>Connexion HTTPS sécurisée (chiffrement SSL/TLS)</li>
                <li>Hébergement sur infrastructure Vercel (certifiée et sécurisée)</li>
                <li>Code source ouvert et auditable publiquement</li>
              </ul>
            </div>
          </section>

          {/* Modifications */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Modifications de cette politique</h2>
            <div className="text-gray-700">
              <p>
                Nous pouvons être amenés à mettre à jour cette politique de confidentialité. 
                La date de dernière modification est indiquée en haut de cette page. 
                Toute modification substantielle sera communiquée de manière appropriée.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact</h2>
            <div className="text-gray-700">
              <p>
                Pour toute question concernant cette politique de confidentialité ou 
                le traitement de vos données :
              </p>
              <p className="mt-2">
                <strong>Email :</strong>{' '}
                <a href="mailto:contact@calcpatrimoine.fr" className="text-blue-600 hover:underline font-medium">
                  contact@calcpatrimoine.fr
                </a>
              </p>
            </div>
          </section>

          {/* Footer */}
          <section className="text-sm text-gray-500 border-t pt-4">
            <p>Version 1.0 - Dernière mise à jour : 15 avril 2026</p>
          </section>

        </div>
      </div>
    </div>
  )
}
