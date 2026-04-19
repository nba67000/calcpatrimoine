// src/hooks/useCountUp.ts
'use client'

import { useEffect, useRef, useState } from 'react'

interface UseCountUpOptions {
 duration?: number
 decimals?: number
 easing?: (t: number) => number
}

// easeOutExpo — très smooth, ralentit vers la fin
const defaultEasing = (t: number): number => {
 return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
}

/**
 * Anime un nombre de 0 vers `target` quand il change.
 * Utilise requestAnimationFrame pour une interpolation fluide.
 */
export function useCountUp(
 target: number,
 { duration = 800, decimals = 0, easing = defaultEasing }: UseCountUpOptions = {}
): number {
 const [current, setCurrent] = useState(target)
 const rafRef = useRef<number | null>(null)
 const startRef = useRef<number | null>(null)
 const fromRef = useRef(0)
 const prevTargetRef = useRef(target)
 const isFirstRender = useRef(true)

 useEffect(() => {
 // Premier rendu → démarrer depuis 0
 const from = isFirstRender.current ? 0 : prevTargetRef.current
 isFirstRender.current = false
 fromRef.current = from
 prevTargetRef.current = target
 startRef.current = null

 const step = (timestamp: number) => {
 if (startRef.current === null) startRef.current = timestamp
 const elapsed = timestamp - startRef.current
 const progress = Math.min(elapsed / duration, 1)
 const eased = easing(progress)
 const value = fromRef.current + (target - fromRef.current) * eased
 const rounded = Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals)
 setCurrent(rounded)
 if (progress < 1) {
 rafRef.current = requestAnimationFrame(step)
 }
 }

 rafRef.current = requestAnimationFrame(step)

 return () => {
 if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
 }
 }, [target, duration, decimals, easing])

 return current
}
