// src/components/Tooltip.tsx
'use client'

import { useState } from 'react'

interface TooltipProps {
  content: string
  children?: React.ReactNode
}

export default function Tooltip({ content, children }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
        className="inline-flex items-center justify-center w-4 h-4 ml-1 text-neutral-400 hover:text-primary-600 transition-colors cursor-help"
        aria-label="Information"
      >
        {children || (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )}
      </button>

      {isVisible && (
        <div
          className="absolute z-50 px-3 py-2 text-sm text-white bg-neutral-900 rounded-lg shadow-lg -top-2 left-6 min-w-[200px] max-w-[300px]"
          role="tooltip"
        >
          {content}
          {/* Flèche pointant vers l'icône */}
          <div className="absolute w-2 h-2 bg-neutral-900 rotate-45 -left-1 top-3"></div>
        </div>
      )}
    </div>
  )
}
