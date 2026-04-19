// src/lib/constants.ts

export const LIMITS = {
 AGE_MIN: 50,
 AGE_MAX: 90,
 CAPITAL_MIN: 10000,
 CAPITAL_MAX: 500000,
 CAPITAL_STEP: 5000,
} as const

export const DEFAULT_VALUES = {
 AGE: 65,
 CAPITAL: 100000,
 GENDER: 'homme' as const,
 SPOUSE_AGE_DIFF: 2, // Différence d'âge par défaut avec le conjoint
 TECH_RATE: 0.005, // 0.5% - taux technique standard
} as const

export const REVERSION_OPTIONS = [60, 80, 100] as const

export const TRUST_MARKERS = [
 {
 icon: '✓',
 text: 'Formules INSEE certifiées',
 color: 'text-primary-600'
 },
 {
 icon: '✓',
 text: '100% gratuit',
 color: 'text-primary-600'
 },
 {
 icon: '✓',
 text: 'Sans engagement',
 color: 'text-primary-600'
 },
 {
 icon: '✓',
 text: 'Aucune donnée conservée',
 color: 'text-primary-600'
 }
] as const

export const SEO_KEYWORDS = [
 'rente viagère',
 'calcul rente viagère',
 'simulateur rente viagère',
 'tables mortalité INSEE',
 'réversion',
 'calculateur viager',
 'rente viagère 65 ans',
 'rente viagère avec réversion',
 'estimation rente viagère'
] as const

export const SOCIAL_PROOF = {
 monthly_simulations: 12483,
 year: new Date().getFullYear(),
} as const

// Messages d'aide contextuels
export const TOOLTIPS = {
 age: "Votre âge actuel. Les tables de mortalité INSEE sont disponibles de 50 à 90 ans.",
 capital: "Le capital que vous souhaitez convertir en rente viagère.",
 gender: "L'espérance de vie diffère selon le sexe (tables INSEE TGH05/TGF05).",
 reversion: "La réversion garantit qu'une partie de votre rente continuera d'être versée à votre conjoint après votre décès.",
 spouse_age: "L'âge de votre conjoint impacte le calcul de la réversion.",
 percentage: "Le pourcentage de votre rente qui sera versé à votre conjoint. Plus il est élevé, plus votre rente initiale sera réduite.",
} as const

// Disclaimer légal
export const LEGAL_DISCLAIMER = `
Cette estimation est indicative et basée sur les tables de mortalité INSEE (TGH05/TGF05) 
et un taux technique de 0,5%. Les montants réels peuvent varier selon l'assureur, 
votre état de santé et les frais appliqués. Ceci ne constitue pas un conseil en 
investissement personnalisé. Pour une offre définitive, consultez un courtier ou 
conseiller en gestion de patrimoine.
` as const

// URLs utiles
export const LINKS = {
 insee_data: 'https://www.insee.fr/fr/statistiques/3303333',
 methodology: '/methodologie',
 about: '/a-propos',
 contact: 'mailto:contact@calcpatrimoine.fr',
 github: 'https://github.com/nba67000/calcpatrimoine',
} as const
