'use client'

import { useState, useEffect } from 'react'
import { getSimHistory, hasStoredState } from '@/hooks/useSimStorage'

const DISMISSED_PREFIX = 'calcpatrimoine:banner-dismissed:'

interface Props {
  slug: string
  onReset: () => void
}

export default function SimResumeBanner({ slug, onReset }: Props) {
  const [resume, setResume] = useState<string | null>(null)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    try {
      if (sessionStorage.getItem(DISMISSED_PREFIX + slug)) return
    } catch {}
    if (!hasStoredState(slug)) return
    const entry = getSimHistory().find(e => e.slug === slug)
    if (entry) setResume(entry.resume)
  }, [slug])

  if (!resume || dismissed) return null

  const handleDismiss = () => {
    try { sessionStorage.setItem(DISMISSED_PREFIX + slug, '1') } catch {}
    setDismissed(true)
  }

  const handleReset = () => {
    onReset()
    handleDismiss()
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 bg-primary-50 border border-primary-200 rounded-xl px-4 py-3 mb-6 text-sm">
      <div className="flex items-center gap-2 text-primary-900 min-w-0">
        <span className="shrink-0 font-mono text-[10px] uppercase tracking-widest bg-primary-600 text-white px-2 py-0.5 rounded">
          Restaurée
        </span>
        <span className="text-primary-700 truncate">{resume}</span>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={handleReset}
          className="text-xs text-primary-700 hover:text-primary-900 border border-primary-300 hover:border-primary-500 rounded px-2.5 py-1 transition-colors"
        >
          Réinitialiser
        </button>
        <button
          onClick={handleDismiss}
          className="text-primary-400 hover:text-primary-700 transition-colors font-bold leading-none px-1 text-base"
          aria-label="Fermer la bannière"
        >
          &times;
        </button>
      </div>
    </div>
  )
}
