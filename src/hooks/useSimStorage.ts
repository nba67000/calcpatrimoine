import { useState, useCallback } from 'react'

const PREFIX = 'calcpatrimoine:state:'
const HISTORY_KEY = 'calcpatrimoine:history'
const MAX_HISTORY = 5

export interface SimHistoryEntry {
  slug: string
  nom: string
  href: string
  resume: string
  date: string // ISO 8601
}

/**
 * Persiste les inputs d'un calculateur dans localStorage.
 * Drop-in replacement pour useState — les valeurs survivent aux rechargements.
 * Fusionne avec l'objet `initial` pour résister aux évolutions de schéma.
 */
export function useSimStorage<T>(slug: string, initial: T): [T, (val: T | ((prev: T) => T)) => void] {
  const key = PREFIX + slug

  const [state, setStateRaw] = useState<T>(() => {
    if (typeof window === 'undefined') return initial
    try {
      const stored = localStorage.getItem(key)
      if (!stored) return initial
      const parsed = JSON.parse(stored)
      return typeof initial === 'object' && initial !== null
        ? { ...initial, ...parsed }
        : parsed
    } catch {
      return initial
    }
  })

  const setState = useCallback(
    (val: T | ((prev: T) => T)) => {
      setStateRaw(prev => {
        const next = typeof val === 'function' ? (val as (p: T) => T)(prev) : val
        try { localStorage.setItem(key, JSON.stringify(next)) } catch {}
        return next
      })
    },
    [key]
  )

  return [state, setState]
}

/** Enregistre un résultat de simulation dans l'historique local (1 entrée par slug). */
export function saveSimHistory(entry: SimHistoryEntry): void {
  if (typeof window === 'undefined') return
  try {
    const raw = localStorage.getItem(HISTORY_KEY)
    const history: SimHistoryEntry[] = raw ? JSON.parse(raw) : []
    const filtered = history.filter(e => e.slug !== entry.slug)
    const updated = [entry, ...filtered].slice(0, MAX_HISTORY)
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated))
  } catch {}
}

/** Lit l'historique des simulations depuis localStorage. */
export function getSimHistory(): SimHistoryEntry[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(HISTORY_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}
