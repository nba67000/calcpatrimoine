'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getSimHistory, type SimHistoryEntry } from '@/hooks/useSimStorage'

export default function SimHistoryWidget() {
  const [history, setHistory] = useState<SimHistoryEntry[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setHistory(getSimHistory())
  }, [])

  if (!mounted || history.length === 0) return null

  function effacer() {
    try { localStorage.removeItem('calcpatrimoine:history') } catch {}
    setHistory([])
  }

  return (
    <section className="max-w-7xl mx-auto px-6 pb-12">
      <div className="flex items-center gap-6 mb-5">
        <h2 className="font-mono text-xs uppercase tracking-widest text-neutral-500 shrink-0">
          Reprendre une simulation
        </h2>
        <div className="flex-1 h-[1px] bg-neutral-200" />
        <button
          onClick={effacer}
          className="font-mono text-xs text-neutral-300 hover:text-neutral-500 transition-colors"
        >
          Effacer
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        {history.map(entry => (
          <Link
            key={entry.slug}
            href={entry.href}
            className="group flex flex-col gap-1 border border-neutral-200 bg-white px-4 py-3 hover:border-primary-300 transition-colors"
            style={{ borderLeft: '3px solid #D4AF37' }}
          >
            <span className="font-bold text-sm text-neutral-900 group-hover:text-primary-700 transition-colors">
              {entry.nom} →
            </span>
            <span className="font-mono text-xs text-neutral-500">{entry.resume}</span>
            <span className="font-mono text-xs text-neutral-300">
              {new Date(entry.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
