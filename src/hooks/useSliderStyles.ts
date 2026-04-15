// src/hooks/useSliderStyles.ts
'use client'

import { useEffect } from 'react'

/**
 * Force les styles des sliders en injectant du CSS dynamique
 * Contourne les problèmes de purge Tailwind et de spécificité CSS
 */
export function useSliderStyles() {
  useEffect(() => {
    // Vérifier si les styles sont déjà injectés
    if (document.getElementById('slider-force-styles')) {
      return
    }

    // Créer une balise <style> avec les styles forcés
    const styleTag = document.createElement('style')
    styleTag.id = 'slider-force-styles'
    styleTag.innerHTML = `
      /* Styles forcés pour sliders - CalcPatrimoine */
      input[type="range"] {
        -webkit-appearance: none !important;
        appearance: none !important;
        background: transparent !important;
        cursor: pointer !important;
        width: 100% !important;
        height: 0.5rem !important;
      }

      /* Track WebKit (Chrome, Safari, Edge) */
      input[type="range"]::-webkit-slider-track {
        background: linear-gradient(to right, #D1DDE9 0%, #2E4A6F 100%) !important;
        height: 0.5rem !important;
        border-radius: 0.5rem !important;
        border: 1px solid #94A3B8 !important;
      }

      input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none !important;
        appearance: none !important;
        background-color: #2E4A6F !important;
        height: 1.25rem !important;
        width: 1.25rem !important;
        border-radius: 50% !important;
        margin-top: -0.375rem !important;
        border: 3px solid white !important;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25) !important;
        transition: all 0.2s ease-in-out !important;
        cursor: grab !important;
      }

      input[type="range"]::-webkit-slider-thumb:active {
        cursor: grabbing !important;
      }

      input[type="range"]::-webkit-slider-thumb:hover {
        background-color: #1E3A5F !important;
        transform: scale(1.2) !important;
        box-shadow: 0 4px 12px rgba(46, 74, 111, 0.4) !important;
      }

      /* Track Firefox */
      input[type="range"]::-moz-range-track {
        background: linear-gradient(to right, #D1DDE9 0%, #2E4A6F 100%) !important;
        height: 0.5rem !important;
        border-radius: 0.5rem !important;
        border: 1px solid #94A3B8 !important;
      }

      input[type="range"]::-moz-range-thumb {
        background-color: #2E4A6F !important;
        height: 1.25rem !important;
        width: 1.25rem !important;
        border-radius: 50% !important;
        border: 3px solid white !important;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25) !important;
        transition: all 0.2s ease-in-out !important;
        cursor: grab !important;
        border: none !important;
      }

      input[type="range"]::-moz-range-thumb:active {
        cursor: grabbing !important;
      }

      input[type="range"]::-moz-range-thumb:hover {
        background-color: #1E3A5F !important;
        transform: scale(1.2) !important;
        box-shadow: 0 4px 12px rgba(46, 74, 111, 0.4) !important;
      }
    `

    // Injecter dans le <head>
    document.head.appendChild(styleTag)

    return () => {
      // Cleanup au démontage
      const existingTag = document.getElementById('slider-force-styles')
      if (existingTag) {
        existingTag.remove()
      }
    }
  }, [])
}
