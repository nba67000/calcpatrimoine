// src/components/FAQAccordionClient.tsx
'use client'

import { useState, type ReactNode } from 'react'

interface Props {
  question: string
  children: ReactNode
}

export default function FAQAccordionClient({ question, children }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border border-neutral-200 mb-2 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-4 flex justify-between items-center bg-white hover:bg-[#F7F3EC] transition-colors text-left"
      >
        <span className="font-medium text-neutral-900 pr-4">{question}</span>
        <svg
          className={`w-5 h-5 text-neutral-400 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-200">
          <div className="text-neutral-700 leading-relaxed prose prose-sm max-w-none">
            {children}
          </div>
        </div>
      )}
    </div>
  )
}
