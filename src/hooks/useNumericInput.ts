import { useState } from 'react'

type Options = {
  min?: number
  max?: number
}

type NumericInput = {
  value: number
  display: string
  onChange: (raw: string) => void
  onBlur: () => void
  set: (n: number) => void  // mise à jour programmatique (slider, reset)
}

/**
 * Gère un champ numérique avec affichage libre pendant la frappe.
 * La valeur numérique ne se met à jour que si la saisie est valide et dans les bornes.
 * Au blur, le display est normalisé vers la dernière valeur valide.
 */
export function useNumericInput(initial: number, options: Options = {}): NumericInput {
  const { min = 0, max = Infinity } = options
  const [value, setValue] = useState(initial)
  const [display, setDisplay] = useState(String(initial))

  function onChange(raw: string) {
    const cleaned = raw.replace(/\s/g, '')
    setDisplay(cleaned)
    const n = parseFloat(cleaned)
    if (!isNaN(n) && n >= min && n <= max) {
      setValue(n)
    }
  }

  function onBlur() {
    setDisplay(String(value))
  }

  function set(n: number) {
    const clamped = Math.min(max, Math.max(min, n))
    setValue(clamped)
    setDisplay(String(clamped))
  }

  return { value, display, onChange, onBlur, set }
}
