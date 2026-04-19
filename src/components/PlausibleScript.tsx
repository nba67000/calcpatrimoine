// src/components/PlausibleScript.tsx

import Script from 'next/script'
import { PLAUSIBLE_CONFIG } from '@/lib/plausible'

/**
 * Composant pour charger Plausible Analytics
 * 
 * À ajouter dans src/app/layout.tsx
 * 
 * Caractéristiques :
 * - Léger (~1KB)
 * - Sans cookies
 * - Respecte vie privée
 * - RGPD compliant par défaut
 */
export default function PlausibleScript() {
 // Ne charger qu'en production
 if (process.env.NODE_ENV !== 'production') {
 return null
 }

 return (
 <Script
 defer
 data-domain={PLAUSIBLE_CONFIG.site}
 src={PLAUSIBLE_CONFIG.scriptUrl}
 strategy="afterInteractive"
 />
 )
}
