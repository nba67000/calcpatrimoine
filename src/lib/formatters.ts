// src/lib/formatters.ts

export function formatEur(n: number): string {
  return n.toLocaleString('fr-FR') + ' €'
}

export function formatPct(n: number, decimals = 1): string {
  return n.toFixed(decimals) + ' %'
}
