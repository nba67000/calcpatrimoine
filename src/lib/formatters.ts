// src/lib/formatters.ts

export function formatEur(n: number): string {
  return n.toLocaleString('fr-FR') + ' €'
}

export function formatEurRounded(n: number): string {
  return Math.round(n).toLocaleString('fr-FR') + ' €'
}

export function formatPct(n: number, decimals = 1): string {
  return n.toFixed(decimals) + ' %'
}

/** Nombre avec séparateurs de milliers, sans symbole monétaire (ex: "100 000"). */
export function formatNombre(n: number): string {
  return n.toLocaleString('fr-FR')
}

/** Parse un nombre formaté fr-FR vers un entier (ex: "100 000" → 100000). */
export function parseNombre(s: string): number {
  return Number(s.replace(/\s/g, ''))
}

/** Ligne de résumé indentée pour le contexte chat (ex: "  Label : Valeur"). */
export function formatLigne(label: string, valeur: string): string {
  return `  ${label} : ${valeur}`
}
