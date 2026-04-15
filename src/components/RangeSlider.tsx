// src/components/RangeSlider.tsx
'use client'

import { useEffect, useRef } from 'react'

interface RangeSliderProps {
  min: number
  max: number
  step: number
  value: number
  onChange: (value: number) => void
  className?: string
}

/**
 * Composant RangeSlider avec styles forcés inline + ID unique
 * Solution RADICALE qui contourne TOUT (CSS global, Tailwind, purge, etc.)
 */
export default function RangeSlider({ min, max, step, value, onChange, className = '' }: RangeSliderProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const uniqueIdRef = useRef(`slider-${Math.random().toString(36).substr(2, 9)}`)

  useEffect(() => {
    if (!inputRef.current) return

    const input = inputRef.current
    const uniqueId = uniqueIdRef.current

    // Forcer styles inline sur l'input
    input.style.cssText = `
      width: 100%;
      height: 0.5rem;
      -webkit-appearance: none;
      appearance: none;
      background: transparent;
      cursor: pointer;
      outline: none;
    `

    // Ajouter data-attribute unique
    input.setAttribute('data-slider-id', uniqueId)

    // Créer style tag avec ID unique
    const styleId = `style-${uniqueId}`
    
    // Supprimer ancien style si existe
    const existingStyle = document.getElementById(styleId)
    if (existingStyle) existingStyle.remove()

    // Créer nouveau style tag
    const styleTag = document.createElement('style')
    styleTag.id = styleId
    
    styleTag.innerHTML = `
      /* WebKit (Chrome, Safari, Edge) */
      input[data-slider-id="${uniqueId}"]::-webkit-slider-track {
        background: linear-gradient(to right, #D1DDE9 0%, #2E4A6F 100%) !important;
        height: 0.5rem !important;
        border-radius: 0.5rem !important;
        border: 1px solid #94A3B8 !important;
      }

      input[data-slider-id="${uniqueId}"]::-webkit-slider-thumb {
        -webkit-appearance: none !important;
        appearance: none !important;
        background-color: #2E4A6F !important;
        height: 1.25rem !important;
        width: 1.25rem !important;
        border-radius: 50% !important;
        margin-top: -0.375rem !important;
        border: 3px solid white !important;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25) !important;
        cursor: grab !important;
        transition: all 0.2s ease-in-out !important;
      }

      input[data-slider-id="${uniqueId}"]::-webkit-slider-thumb:hover {
        background-color: #1E3A5F !important;
        transform: scale(1.2) !important;
        box-shadow: 0 4px 12px rgba(46, 74, 111, 0.4) !important;
      }

      input[data-slider-id="${uniqueId}"]::-webkit-slider-thumb:active {
        cursor: grabbing !important;
      }

      /* Firefox */
      input[data-slider-id="${uniqueId}"]::-moz-range-track {
        background: linear-gradient(to right, #D1DDE9 0%, #2E4A6F 100%) !important;
        height: 0.5rem !important;
        border-radius: 0.5rem !important;
        border: 1px solid #94A3B8 !important;
      }

      input[data-slider-id="${uniqueId}"]::-moz-range-thumb {
        background-color: #2E4A6F !important;
        height: 1.25rem !important;
        width: 1.25rem !important;
        border-radius: 50% !important;
        border: 3px solid white !important;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25) !important;
        cursor: grab !important;
        transition: all 0.2s ease-in-out !important;
        border: none !important;
      }

      input[data-slider-id="${uniqueId}"]::-moz-range-thumb:hover {
        background-color: #1E3A5F !important;
        transform: scale(1.2) !important;
        box-shadow: 0 4px 12px rgba(46, 74, 111, 0.4) !important;
      }

      input[data-slider-id="${uniqueId}"]::-moz-range-thumb:active {
        cursor: grabbing !important;
      }
    `

    document.head.appendChild(styleTag)

    // Cleanup
    return () => {
      const tag = document.getElementById(styleId)
      if (tag) tag.remove()
    }
  }, [])

  return (
    <input
      ref={inputRef}
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className={className}
    />
  )
}
