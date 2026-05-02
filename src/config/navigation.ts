export type NavItem = {
  href: string
  label: string
  category: 'calculateur' | 'ressource' | 'legal'
  showInHeader: boolean
}

/**
 * Source unique de vérité pour la navigation.
 * Pour ajouter un calculateur : ajouter une entrée category: 'calculateur'.
 * Header, Footer et sitemap lisent cette liste.
 */
export const NAV_ITEMS: NavItem[] = [
  // Calculateurs
  { href: '/tmi',           label: 'TMI / IR',        category: 'calculateur', showInHeader: true  },
  { href: '/per-individuel', label: 'PER',             category: 'calculateur', showInHeader: true  },
  { href: '/plus-value-immobiliere', label: 'Plus-value immo', category: 'calculateur', showInHeader: true  },
  { href: '/rente-viagere', label: 'Rente Viagère',    category: 'calculateur', showInHeader: true  },
  { href: '/assurance-vie', label: 'Assurance-Vie',    category: 'calculateur', showInHeader: true  },

  // Ressources
  { href: '/blog',          label: 'Blog',             category: 'ressource',   showInHeader: true  },
  { href: '/faq',           label: 'FAQ',              category: 'ressource',   showInHeader: false },
  { href: '/methodologie',  label: 'Méthodologie',     category: 'ressource',   showInHeader: false },
  { href: '/a-propos',      label: 'À propos',         category: 'ressource',   showInHeader: true  },

  // Légal (footer uniquement)
  { href: '/mentions-legales',          label: 'Mentions légales', category: 'legal', showInHeader: false },
  { href: '/cgu',                       label: 'CGU',              category: 'legal', showInHeader: false },
  { href: '/politique-confidentialite', label: 'Confidentialité',  category: 'legal', showInHeader: false },
]

export const CALCULATEURS = NAV_ITEMS.filter(i => i.category === 'calculateur')
export const RESSOURCES    = NAV_ITEMS.filter(i => i.category === 'ressource')
export const LIENS_LEGAUX  = NAV_ITEMS.filter(i => i.category === 'legal')
export const NAV_HEADER    = NAV_ITEMS.filter(i => i.showInHeader)
