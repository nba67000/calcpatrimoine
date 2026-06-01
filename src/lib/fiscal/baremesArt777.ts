// src/lib/fiscal/baremesArt777.ts
//
// Barèmes des droits de mutation à titre gratuit (Art. 777 CGI) et
// abattements personnels (Art. 779/790 E CGI). Utilisés par les calculs
// de donation, succession, donation-démembrement et prêt intrafamilial.
//
// Extraction réalisée le 2026-06-01 pour éviter la duplication entre
// `src/lib/{donation,succession,donationDemembrement,pretIntrafamilial}.ts`
// (cf. candidat #1 du scan `/improve-codebase-architecture`).
//
// Tous les chiffres sont applicables au millésime 2026.

// ─────────────────────────────────────────────────────────────
// Barèmes par tranches (Art. 777 CGI)
// ─────────────────────────────────────────────────────────────

export interface Tranche {
  taux: number   // en %
  min: number    // borne inférieure (base taxable cumulée)
  max: number    // borne supérieure (exclusive)
}

/** Tableau I - ligne directe (enfant, parent, petit-enfant). */
export const BAREME_LIGNE_DIRECTE: Tranche[] = [
  { taux: 5,  min: 0,       max: 8072 },
  { taux: 10, min: 8072,    max: 12109 },
  { taux: 15, min: 12109,   max: 15932 },
  { taux: 20, min: 15932,   max: 552324 },
  { taux: 30, min: 552324,  max: 902838 },
  { taux: 40, min: 902838,  max: 1805677 },
  { taux: 45, min: 1805677, max: Number.MAX_VALUE },
]

/** Tableau II - époux / partenaires de PACS (donation seulement ; en succession
 * le conjoint est exonéré par la Loi TEPA, ce barème n'est pas appliqué). */
export const BAREME_EPOUX_PACS: Tranche[] = [
  { taux: 5,  min: 0,       max: 8072 },
  { taux: 10, min: 8072,    max: 15932 },
  { taux: 15, min: 15932,   max: 31865 },
  { taux: 20, min: 31865,   max: 552324 },
  { taux: 30, min: 552324,  max: 902838 },
  { taux: 40, min: 902838,  max: 1805677 },
  { taux: 45, min: 1805677, max: Number.MAX_VALUE },
]

/** Tableau III - frères et sœurs. */
export const BAREME_FRERE_SOEUR: Tranche[] = [
  { taux: 35, min: 0,     max: 24430 },
  { taux: 45, min: 24430, max: Number.MAX_VALUE },
]

/** Tableau IV - neveux/nièces, parents jusqu'au 4e degré (55 %). */
export const BAREME_NEVEU_NIECE: Tranche[] = [
  { taux: 55, min: 0, max: Number.MAX_VALUE },
]

/** Tableau IV bis - non parents ou au-delà du 4e degré (60 %). */
export const BAREME_NON_PARENT: Tranche[] = [
  { taux: 60, min: 0, max: Number.MAX_VALUE },
]

// ─────────────────────────────────────────────────────────────
// Abattements (Art. 779 / 790 E CGI)
// ─────────────────────────────────────────────────────────────

/** Abattements de base par lien de parenté (montants 2026, indexation gelée
 *  depuis 2012). Les clés sont volontairement génériques (string) pour
 *  s'adapter aux enums spécifiques de chaque calc (LienParente, LienHeritier,
 *  LienEmprunteur). */
export const ABATTEMENTS_ART_779: Record<string, number> = {
  enfant:       100000, // Art. 779-I CGI
  parent:       100000, // Art. 779-I CGI (ligne directe ascendante)
  petit_enfant: 31865,  // Art. 790 B CGI (donation) / Art. 779-I (succession - voir note)
  epoux_pacs:   80724,  // Art. 790 E CGI
  frere_soeur:  15932,  // Art. 779-IV CGI
  neveu_niece:  7967,   // Art. 779-V CGI
  autre_4e:     0,
  non_parent:   0,
  autre:        0,
}

/** Abattement spécifique petit-enfant en SUCCESSION (et non en donation).
 *  En donation, l'abattement Art. 790 B s'applique (31 865 €). En succession,
 *  le petit-enfant n'a en principe pas d'abattement personnel , on applique
 *  l'abattement par défaut Art. 788 (1 594 €) sauf représentation. */
export const ABATTEMENT_PETIT_ENFANT_SUCCESSION = 1594

/** Abattement par défaut Art. 788 CGI (héritier sans abattement spécifique). */
export const ABATTEMENT_DEFAUT_ART_788 = 1594

/** Abattement complémentaire personne handicapée (Art. 779-II CGI). Cumulable. */
export const ABATTEMENT_HANDICAP = 159325

/** Abattement complémentaire don familial somme d'argent (Art. 790 G CGI).
 *  Cumulable avec l'abattement personnel. */
export const ABATTEMENT_790G = 31865

// ─────────────────────────────────────────────────────────────
// Application du barème
// ─────────────────────────────────────────────────────────────

export interface TrancheAppliquee {
  taux: number
  borneInf: number
  borneSup: number | null
  baseDansLaTranche: number
  droitsDansLaTranche: number
}

/**
 * Applique un barème par tranches à une base taxable, en tenant compte du
 * rappel fiscal Art. 784 CGI : si des donations antérieures (au même
 * bénéficiaire, dans les 15 dernières années) consomment déjà certaines
 * tranches basses, on les exclut du calcul de la nouvelle donation.
 *
 * @param baseTaxable Le montant à taxer (après abattement personnel résiduel).
 * @param tranchesConsommees Le montant déjà parcouru par les donations
 *   antérieures (au-delà de l'abattement). Le barème démarre à cette borne.
 * @param bareme Le barème applicable selon le lien.
 */
export function appliquerBareme(
  baseTaxable: number,
  tranchesConsommees: number,
  bareme: Tranche[],
): { droits: number; detail: TrancheAppliquee[] } {
  const detail: TrancheAppliquee[] = []
  let droits = 0
  const debut = tranchesConsommees
  const fin = debut + baseTaxable

  for (const t of bareme) {
    if (fin <= t.min) break

    const borneBasse = Math.max(t.min, debut)
    const borneHaute = Math.min(t.max, fin)

    if (borneHaute <= borneBasse) continue

    const baseDansLaTranche = borneHaute - borneBasse
    const droitsDansLaTranche = baseDansLaTranche * (t.taux / 100)
    droits += droitsDansLaTranche

    detail.push({
      taux: t.taux,
      borneInf: t.min,
      borneSup: t.max === Number.MAX_VALUE ? null : t.max,
      baseDansLaTranche: Math.round(baseDansLaTranche),
      droitsDansLaTranche: Math.round(droitsDansLaTranche),
    })
  }

  return { droits, detail }
}

/**
 * Type union des liens supportés par `getBaremePourLien`. Les enums propres
 * à chaque calc (LienParente, LienHeritier, LienEmprunteur) sont compatibles
 * via leur valeur string.
 */
export type LienFiscal =
  | 'enfant' | 'parent' | 'petit_enfant'
  | 'epoux_pacs'
  | 'frere_soeur'
  | 'neveu_niece' | 'autre_4e'
  | 'non_parent' | 'autre'

/**
 * Retourne le barème applicable selon le lien. Le conjoint/PACS reçoit le
 * barème époux (utilisé en donation ; en succession il faut traiter
 * l'exonération TEPA en amont).
 */
export function getBaremePourLien(lien: LienFiscal): Tranche[] {
  switch (lien) {
    case 'enfant':
    case 'parent':
    case 'petit_enfant':
      return BAREME_LIGNE_DIRECTE
    case 'epoux_pacs':
      return BAREME_EPOUX_PACS
    case 'frere_soeur':
      return BAREME_FRERE_SOEUR
    case 'neveu_niece':
    case 'autre_4e':
      return BAREME_NEVEU_NIECE
    case 'non_parent':
    case 'autre':
      return BAREME_NON_PARENT
  }
}
