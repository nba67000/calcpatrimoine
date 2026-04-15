// src/app/mentions-legales/page.tsx
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Mentions Légales - CalcPatrimoine',
  description: 'Mentions légales et informations obligatoires du site CalcPatrimoine.fr'
}

export default function MentionsLegalesPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-neutral-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Mentions Légales</h1>

        <div className="bg-white rounded-lg border border-neutral-200 p-8 space-y-8">
          
          {/* Éditeur */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Éditeur du site</h2>
            <div className="text-neutral-700 space-y-2">
              <p><strong>Nom :</strong> Nicolas Barbier</p>
              <p><strong>Statut :</strong> Micro-entrepreneur</p>
              <p><strong>SIRET :</strong> [Ton SIRET si applicable]</p>
              <p><strong>Adresse :</strong> [Ton adresse postale complète]</p>
              <p><strong>Email :</strong> contact@calcpatrimoine.fr</p>
              <p><strong>Directeur de publication :</strong> Nicolas Barbier</p>
            </div>
          </section>

          {/* Hébergement */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Hébergement</h2>
            <div className="text-neutral-700 space-y-2">
              <p><strong>Hébergeur :</strong> Vercel Inc.</p>
              <p><strong>Adresse :</strong> 440 N Barranca Ave #4133, Covina, CA 91723, USA</p>
              <p><strong>Site :</strong> <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">https://vercel.com</a></p>
            </div>
          </section>

          {/* Propriété intellectuelle */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Propriété intellectuelle</h2>
            <div className="text-neutral-700 space-y-3">
              <p>
                Le code source de CalcPatrimoine est sous licence MIT et disponible publiquement sur GitHub.
                Toute personne peut l'utiliser, le modifier et le redistribuer selon les termes de cette licence.
              </p>
              <p>
                Les tables de mortalité utilisées sont issues de l'INSEE (Institut National de la Statistique 
                et des Études Économiques) et sont dans le domaine public.
              </p>
              <p>
                Les contenus éditoriaux (articles, textes explicatifs) sont © Nicolas Barbier et ne peuvent 
                être reproduits sans autorisation, sauf citation courte avec attribution.
              </p>
            </div>
          </section>

          {/* Cookies et données */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Cookies et données personnelles</h2>
            <div className="text-neutral-700 space-y-3">
              <p>
                Ce site utilise <strong>Plausible Analytics</strong>, une solution d'analyse respectueuse 
                de la vie privée et conforme au RGPD, qui ne collecte aucune donnée personnelle identifiable.
              </p>
              <p>
                Plausible n'utilise pas de cookies de tracking et ne nécessite donc pas de bandeau de 
                consentement aux cookies.
              </p>
              <p>
                Pour plus d'informations, consultez notre{' '}
                <a href="/politique-confidentialite" className="text-primary-600 hover:underline">
                  Politique de Confidentialité
                </a>.
              </p>
            </div>
          </section>

          {/* Crédits */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Crédits</h2>
            <div className="text-neutral-700 space-y-2">
              <p><strong>Conception et développement :</strong> Nicolas Barbier</p>
              <p><strong>Données :</strong> INSEE - Tables de mortalité France 2022</p>
              <p><strong>Framework :</strong> Next.js 16, React, TypeScript, Tailwind CSS</p>
            </div>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact</h2>
            <div className="text-neutral-700">
              <p>
                Pour toute question concernant le site : <br />
                <a href="mailto:contact@calcpatrimoine.fr" className="text-primary-600 hover:underline font-medium">
                  contact@calcpatrimoine.fr
                </a>
              </p>
            </div>
          </section>

          {/* Dernière MAJ */}
          <section className="text-sm text-neutral-500 border-t pt-4">
            <p>Dernière mise à jour : 15 avril 2026</p>
          </section>

        </div>
      </div>
    </div>
    <Footer />
    </>
  )
}
