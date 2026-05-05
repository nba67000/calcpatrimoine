// src/config/navigation.ts

export type NavItem = {
  href: string
  label: string
  category: 'categorie' | 'ressource' | 'legal'
  showInHeader: boolean
}

export type Calculateur = {
  href: string
  nom: string
  desc: string
  disponible: boolean
}

export type CategorieCalc = {
  id: string
  slug: string
  label: string
  description: string
  calculateurs: Calculateur[]
}

/**
 * Source unique de vérité pour les catégories et calculateurs.
 * Pour ajouter un calculateur : l'insérer dans la catégorie concernée.
 * Pour ajouter une catégorie : ajouter une entrée dans CATEGORIES_CALC.
 */
export const CATEGORIES_CALC: CategorieCalc[] = [
  {
    id: 'epargne-retraite',
    slug: 'epargne-retraite',
    label: 'Épargne & Retraite',
    description: 'Préparer et optimiser vos revenus futurs',
    calculateurs: [
      {
        href: '/rente-viagere',
        nom: 'Rente Viagère',
        desc: 'Capital converti en revenu garanti à vie. Seuil de rentabilité, espérance INSEE, stratégies couple.',
        disponible: true,
      },
      {
        href: '/per-individuel',
        nom: 'PER Individuel',
        desc: "Économie d'impôt sur versement et comparaison avec l'assurance-vie selon votre TMI.",
        disponible: true,
      },
    ],
  },
  {
    id: 'assurance-vie',
    slug: 'assurance-vie',
    label: 'Assurance-Vie & Succession',
    description: 'Fiscalité des rachats et transmission du patrimoine',
    calculateurs: [
      {
        href: '/assurance-vie',
        nom: 'Assurance-Vie',
        desc: 'Fiscalité des rachats (PFU vs barème IR) et transmission aux bénéficiaires.',
        disponible: true,
      },
      {
        href: '/succession',
        nom: 'Droits de succession',
        desc: 'Calcul des droits par héritier selon les abattements légaux et le barème progressif.',
        disponible: false,
      },
    ],
  },
  {
    id: 'fiscalite',
    slug: 'fiscalite',
    label: 'Fiscalité',
    description: 'Comprendre et anticiper votre imposition',
    calculateurs: [
      {
        href: '/tmi',
        nom: 'TMI — Impôt sur le revenu',
        desc: "Tranches marginales, taux effectif et impôt annuel selon le barème en vigueur.",
        disponible: true,
      },
      {
        href: '/plus-value-mobiliere',
        nom: 'Plus-value mobilière',
        desc: "Imposition sur cession de titres hors PEA selon durée de détention.",
        disponible: false,
      },
    ],
  },
  {
    id: 'immobilier',
    slug: 'immobilier',
    label: 'Immobilier',
    description: 'Rendement et fiscalité de vos investissements locatifs',
    calculateurs: [
      {
        href: '/plus-value-immobiliere',
        nom: 'Plus-value immobilière',
        desc: 'Fiscalité de la cession : IR 19 %, PS 17,2 %, abattements par durée de détention, surtaxe.',
        disponible: true,
      },
      {
        href: '/scpi',
        nom: 'SCPI',
        desc: 'Revenus locatifs papier et rentabilité comparée entre véhicules.',
        disponible: false,
      },
      {
        href: '/immobilier-locatif',
        nom: 'Immobilier locatif',
        desc: 'Rendement brut/net, cash-flow, fiscalité LMNP et SCI.',
        disponible: false,
      },
    ],
  },
]

export const NAV_ITEMS: NavItem[] = [
  // Catégories
  { href: '/calculateurs/epargne-retraite',  label: 'Épargne & Retraite',        category: 'categorie', showInHeader: true  },
  { href: '/calculateurs/assurance-vie',     label: 'Assurance-Vie & Succession', category: 'categorie', showInHeader: true  },
  { href: '/calculateurs/fiscalite',         label: 'Fiscalité',                  category: 'categorie', showInHeader: true  },
  { href: '/calculateurs/immobilier',        label: 'Immobilier',                 category: 'categorie', showInHeader: true  },

  // Ressources
  { href: '/blog',         label: 'Blog',         category: 'ressource', showInHeader: true  },
  { href: '/faq',          label: 'FAQ',          category: 'ressource', showInHeader: false },
  { href: '/methodologie', label: 'Méthodologie', category: 'ressource', showInHeader: false },
  { href: '/a-propos',     label: 'À propos',     category: 'ressource', showInHeader: true  },

  // Légal (footer uniquement)
  { href: '/mentions-legales',           label: 'Mentions légales', category: 'legal', showInHeader: false },
  { href: '/cgu',                        label: 'CGU',              category: 'legal', showInHeader: false },
  { href: '/politique-confidentialite',  label: 'Confidentialité',  category: 'legal', showInHeader: false },
]

export const CATEGORIES    = NAV_ITEMS.filter(i => i.category === 'categorie')
export const RESSOURCES    = NAV_ITEMS.filter(i => i.category === 'ressource')
export const LIENS_LEGAUX  = NAV_ITEMS.filter(i => i.category === 'legal')
export const NAV_HEADER    = NAV_ITEMS.filter(i => i.showInHeader)

// Alias compat Footer (liste les catégories dans la colonne "Calculateurs")
export const CALCULATEURS  = CATEGORIES
