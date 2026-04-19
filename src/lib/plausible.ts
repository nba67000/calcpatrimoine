// src/lib/plausible.ts

/**
 * Configuration Plausible Analytics auto-hébergé
 * 
 * Script léger, respectueux vie privée, sans cookies
 * Conforme RGPD par défaut
 */

export const PLAUSIBLE_CONFIG = {
 // Domaine Plausible auto-hébergé
 domain: 'analytics.calcpatrimoine.fr',
 
 // Site à tracker
 site: 'calcpatrimoine.fr',
 
 // URL du script
 scriptUrl: 'https://analytics.calcpatrimoine.fr/js/script.js'
}

/**
 * Track un événement personnalisé
 * 
 * @param eventName - Nom de l'événement
 * @param props - Propriétés additionnelles (optionnel)
 * 
 * @example
 * trackEvent('Calcul Rente', { capital: 100000, age: 65 })
 */
export function trackEvent(
 eventName: string, 
 props?: Record<string, string | number>
): void {
 // Vérifier que Plausible est chargé
 if (typeof window === 'undefined' || !(window as any).plausible) {
 console.warn('Plausible not loaded')
 return
 }

 try {
 (window as any).plausible(eventName, { props })
 } catch (error) {
 console.error('Plausible tracking error:', error)
 }
}

/**
 * Track une page vue
 * (appelé automatiquement par le script Plausible)
 */
export function trackPageView(): void {
 if (typeof window === 'undefined' || !(window as any).plausible) {
 return
 }

 try {
 (window as any).plausible('pageview')
 } catch (error) {
 console.error('Plausible pageview error:', error)
 }
}

/**
 * Événements personnalisés CalcPatrimoine
 */
export const PlausibleEvents = {
 // Calculs
 RENTE_SIMPLE: 'Calcul Rente Simple',
 RENTE_REVERSION: 'Calcul Rente Réversion',
 CALCUL_INVERSE: 'Calcul Inverse',
 MODE_COUPLE: 'Calcul Mode Couple',
 
 // Interactions
 TOGGLE_REVERSION: 'Toggle Réversion',
 CHANGE_POURCENTAGE: 'Change Pourcentage Réversion',
 
 // Navigation
 VIEW_FAQ: 'View FAQ',
 VIEW_METHODOLOGIE: 'View Méthodologie',
 VIEW_APROPOS: 'View À Propos',
 
 // Engagement
 SCROLL_50: 'Scroll 50%',
 SCROLL_100: 'Scroll 100%',
 TIME_30S: 'Time on Page 30s',
 TIME_60S: 'Time on Page 60s',
} as const
