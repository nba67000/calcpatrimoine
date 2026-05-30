// src/lib/transmission.ts

import type { CalculatorModule } from '@/lib/calculators/types'
import { FAQ_TRANSMISSION, HOWTO_TRANSMISSION } from '@/lib/schema/schemaData'

export const SOURCES_TRANSMISSION = [
  { href: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000045583309', label: 'Article 990 I du CGI', desc: 'Prélèvement sur versements avant 70 ans, abattement 152 500 € par bénéficiaire' },
  { href: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006305484', label: 'Article 757 B du CGI', desc: 'Réintégration succession versements après 70 ans, abattement 30 500 €' },
  { href: 'https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000278649', label: 'Loi TEPA 2007', desc: 'Exonération totale conjoint/PACS pour les successions' },
  { href: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000042160878', label: 'Articles 777 et suivants du CGI', desc: 'Barème des droits de succession en ligne directe' },
  { href: 'https://bofip.impots.gouv.fr/bofip/3296-PGP.html', label: 'BOFiP - Assurance-vie et successions', desc: 'Bulletin Officiel des Finances Publiques sur la transmission' },
]

import type {
 TransmissionInputs,
 TransmissionResults,
 RepartitionBeneficiaire,
 Beneficiaire
} from '@/types/transmission'
import type { Warning, Optimisation } from '@/types/alerts'
import { formatEurRounded as eur, formatPct as pct, formatLigne as ligne } from '@/lib/formatters'

// Barème droits de succession ligne directe - Art. 777 CGI (LF 2026)
const BAREME_LIGNE_DIRECTE = [
 { min: 0,       max: 8072,    taux: 0.05 },
 { min: 8072,    max: 12109,   taux: 0.10 },
 { min: 12109,   max: 15932,   taux: 0.15 },
 { min: 15932,   max: 552324,  taux: 0.20 },
 { min: 552324,  max: 902838,  taux: 0.30 },
 { min: 902838,  max: 1805677, taux: 0.40 },
 { min: 1805677, max: Infinity, taux: 0.45 },
]

// Art. 779 CGI - abattement succession enfant (ligne directe)
const ABATTEMENT_SUCCESSION_ENFANT = 100_000

// Art. 757 B CGI - abattement global versements AV après 70 ans
const ABATTEMENT_757B_GLOBAL = 30_500

// Art. 990 I CGI - abattement par bénéficiaire versements AV avant 70 ans
const ABATTEMENT_990I_PAR_BENEFICIAIRE = 152_500

// Art. 990 I CGI - taux de prélèvement et seuil
const TAUX_990I_REDUIT = 0.20
const TAUX_990I_NORMAL = 0.3125
const SEUIL_990I = 700_000

/**
 * Calcule les droits de succession selon le barème ligne directe
 */
function calculerDroitsBaremeLigneDirecte(baseTaxable: number): number {
 if (baseTaxable <= 0) return 0
 
 let droits = 0
 for (const tranche of BAREME_LIGNE_DIRECTE) {
 if (baseTaxable> tranche.min) {
 const montantDansTranche = Math.min(baseTaxable, tranche.max) - tranche.min
 droits += montantDansTranche * tranche.taux
 }
 }
 return droits
}

/**
 * Calcule les droits 990 I (versements avant 70 ans)
 * Taux : 20% jusqu'à 700 000€ au-delà abattement, 31,25% au-delà
 */
function calculerDroits990I(baseTaxable: number): number {
 if (baseTaxable <= 0) return 0
 
 if (baseTaxable <= SEUIL_990I) {
 return baseTaxable * TAUX_990I_REDUIT
 }
 
 // Au-delà du seuil
 const partReduite = SEUIL_990I * TAUX_990I_REDUIT
 const partNormale = (baseTaxable - SEUIL_990I) * TAUX_990I_NORMAL
 return partReduite + partNormale
}

/**
 * Fonction principale : calcul transmission
 */
export function calculerTransmission(inputs: TransmissionInputs): TransmissionResults {
 const {
 capitalTotal,
 versementsAvant70,
 versementsApres70,
 beneficiaires
 } = inputs
 
 const warnings: Warning[] = []
 const infos: Optimisation[] = []

 // Validation : somme des parts = 100%
 const totalParts = beneficiaires.reduce((sum, b) => sum + b.partPourcentage, 0)
 if (Math.abs(totalParts - 100)> 0.01) {
 warnings.push({ type: 'danger', message: `Les parts totalisent ${totalParts.toFixed(1)}% au lieu de 100%` })
 }

 // Plus-value totale (versements après 70 ans : intérêts exonérés)
 const plusValueTotale = capitalTotal - (versementsAvant70 + versementsApres70)

 if (plusValueTotale < 0) {
 warnings.push({ type: 'warning', message: 'Les versements dépassent le capital actuel' })
 }
 
 // Capital taxable via 990 I = capital total - versements après 70 ans
 // (car versements après 70 ans avec leurs plus-values sont taxés via 757 B sauf les intérêts)
 // Attention : les plus-values générées par versements avant 70 ans sont dans le 990 I
 
 const nombreBenef = beneficiaires.length
 
 // Abattements globaux
 const abattementTotal990I = nombreBenef * ABATTEMENT_990I_PAR_BENEFICIAIRE
 const abattement757BGlobal = ABATTEMENT_757B_GLOBAL
 
 // Capital soumis à 990 I = versements avant 70 ans + plus-values totales
 // (les plus-values des versements après 70 ans sont exonérées mais on simplifie)
 const capital990ITotal = versementsAvant70 + plusValueTotale
 
 // Capital soumis à 757 B = versements après 70 ans uniquement (les intérêts sont exonérés)
 const capital757BTotal = versementsApres70
 
 // Calcul par bénéficiaire
 const repartition: RepartitionBeneficiaire[] = beneficiaires.map((benef) => {
 const part = (benef.partPourcentage / 100) * capitalTotal
 
 // --- 990 I ---
 const capital990I = (benef.partPourcentage / 100) * capital990ITotal
 const abattement990I = ABATTEMENT_990I_PAR_BENEFICIAIRE
 
 // Conjoint exonéré totalement
 let baseTaxable990I = 0
 let impot990I = 0
 
 if (benef.lien === 'conjoint') {
 // Conjoint totalement exonéré
 baseTaxable990I = 0
 impot990I = 0
 } else {
 baseTaxable990I = Math.max(0, capital990I - abattement990I)
 impot990I = calculerDroits990I(baseTaxable990I)
 }
 
 // --- 757 B ---
 const capital757B = (benef.partPourcentage / 100) * capital757BTotal
 // Abattement 30 500€ global partagé entre bénéficiaires (sauf conjoint)
 const nbBenefNonConjoint = beneficiaires.filter(b => b.lien !== 'conjoint').length
 const abattement757B = benef.lien === 'conjoint' 
 ? 0 
 : nbBenefNonConjoint> 0 
 ? (ABATTEMENT_757B_GLOBAL / nbBenefNonConjoint)
 : 0
 
 let baseTaxable757B = 0
 let droitsSuccession757B = 0
 
 if (benef.lien === 'conjoint') {
 // Conjoint exonéré
 baseTaxable757B = 0
 droitsSuccession757B = 0
 } else if (benef.lien === 'enfant') {
 baseTaxable757B = Math.max(0, capital757B - abattement757B)
 // Barème ligne directe avec abattement 100k€ déjà utilisé ou non
 // Simplification : on applique le barème directement
 droitsSuccession757B = calculerDroitsBaremeLigneDirecte(baseTaxable757B)
 } else if (benef.lien === 'frere_soeur') {
 baseTaxable757B = Math.max(0, capital757B - abattement757B)
 // Taux frère/sœur : 35% jusqu'à 24 430€, 45% au-delà
 if (baseTaxable757B <= 24430) {
 droitsSuccession757B = baseTaxable757B * 0.35
 } else {
 droitsSuccession757B = 24430 * 0.35 + (baseTaxable757B - 24430) * 0.45
 }
 } else {
 // Autres : 55% ou 60%
 baseTaxable757B = Math.max(0, capital757B - abattement757B)
 droitsSuccession757B = baseTaxable757B * 0.60
 }
 
 const totalImpots = impot990I + droitsSuccession757B
 const montantNet = part - totalImpots
 const tauxEffectif = part> 0 ? (totalImpots / part) * 100 : 0
 
 return {
 id: benef.id,
 nom: benef.nom || `Bénéficiaire ${benef.id}`,
 lien: benef.lien,
 part,
 partPourcentage: benef.partPourcentage,
 capital990I,
 abattement990I,
 baseTaxable990I,
 impot990I,
 capital757B,
 abattement757B,
 baseTaxable757B,
 droitsSuccession757B,
 totalImpots,
 montantNet,
 tauxEffectif
 }
 })
 
 // Totaux
 const totalImpots = repartition.reduce((sum, r) => sum + r.totalImpots, 0)
 const totalNet = capitalTotal - totalImpots
 const tauxEffectifGlobal = capitalTotal> 0 ? (totalImpots / capitalTotal) * 100 : 0
 
 // Comparaison avec succession classique (si AV n'existait pas)
 // Simplification : on considère que tout irait aux enfants avec abattement 100k€ chacun
 const nbEnfants = beneficiaires.filter(b => b.lien === 'enfant').length
 let impotsSuccessionClassique = 0
 
 if (nbEnfants> 0) {
 const partParEnfant = capitalTotal / nbEnfants
 const baseTaxableEnfant = Math.max(0, partParEnfant - ABATTEMENT_SUCCESSION_ENFANT)
 const droitsParEnfant = calculerDroitsBaremeLigneDirecte(baseTaxableEnfant)
 impotsSuccessionClassique = droitsParEnfant * nbEnfants
 } else if (beneficiaires.some(b => b.lien === 'conjoint')) {
 // Conjoint exonéré dans les 2 cas
 impotsSuccessionClassique = 0
 } else {
 // Autres : estimation à 60%
 impotsSuccessionClassique = capitalTotal * 0.60
 }
 
 const economieVsClassique = impotsSuccessionClassique - totalImpots
 
 // Infos contextuelles
 if (versementsApres70> 0 && capital757BTotal - abattement757BGlobal> 0) {
 infos.push({ type: 'info', message: `Les versements après 70 ans (${versementsApres70.toLocaleString('fr-FR')} €) sont soumis à l'Article 757 B avec un abattement global de 30 500 € partagé.` })
 }

 if (plusValueTotale> 0) {
 infos.push({ type: 'info', message: 'Les plus-values générées par les versements après 70 ans sont totalement exonérées de droits.' })
 }

 if (beneficiaires.some(b => b.lien === 'conjoint')) {
 infos.push({ type: 'success', message: 'Le conjoint/partenaire PACS est totalement exonéré (Loi TEPA 2007).' })
 }
 
 return {
 capitalTotal,
 nombreBeneficiaires: nombreBenef,
 totalVersementsAvant70: versementsAvant70,
 totalVersementsApres70: versementsApres70,
 plusValueTotale,
 abattementTotal990I,
 abattement757BGlobal,
 repartition,
 totalImpots,
 totalNet,
 tauxEffectifGlobal,
 impotsSuccessionClassique,
 economieVsClassique,
 warnings,
 infos
 }
}

/**
 * Helpers
 */
export function genererIdBeneficiaire(): string {
 return `benef-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`
}

export function getLibelleLien(lien: Beneficiaire['lien']): string {
 const libelles = {
 conjoint: 'Conjoint / PACS',
 enfant: 'Enfant',
 frere_soeur: 'Frère / Sœur',
 neveu_niece: 'Neveu / Nièce',
 autre: 'Autre'
 }
 return libelles[lien] || 'Inconnu'
}

// ---------------------------------------------------------------------------
// Opérations sur la liste des bénéficiaires - fonctions pures
// Chaque fonction retourne un nouveau tableau, sans muter l'entrée.
// ---------------------------------------------------------------------------

/** Ajoute un bénéficiaire avec la part restante disponible. Max 6. */
export function ajouterBeneficiaire(beneficiaires: Beneficiaire[]): Beneficiaire[] {
 if (beneficiaires.length >= 6) return beneficiaires
 const partExistante = beneficiaires.reduce((s, b) => s + b.partPourcentage, 0)
 const partRestante = Math.max(0, 100 - partExistante)
 return [
   ...beneficiaires,
   {
     id: genererIdBeneficiaire(),
     nom: `Bénéficiaire ${beneficiaires.length + 1}`,
     lien: 'enfant',
     partPourcentage: partRestante,
   },
 ]
}

/** Supprime un bénéficiaire par id. Garde au minimum 1. */
export function supprimerBeneficiaire(beneficiaires: Beneficiaire[], id: string): Beneficiaire[] {
 if (beneficiaires.length <= 1) return beneficiaires
 return beneficiaires.filter(b => b.id !== id)
}

/** Répartit les parts à parts égales entre tous les bénéficiaires. */
export function equilibrerParts(beneficiaires: Beneficiaire[]): Beneficiaire[] {
 const partEgale = Math.round((100 / beneficiaires.length) * 100) / 100
 return beneficiaires.map(b => ({ ...b, partPourcentage: partEgale }))
}

/**
 * Modifie la part d'un bénéficiaire avec cascade proportionnelle.
 *
 * Règle : seuls les bénéficiaires situés APRÈS l'index modifié s'ajustent
 * proportionnellement pour maintenir le total à 100 %.
 * Les bénéficiaires AVANT restent figés.
 * Le dernier bénéficiaire est modifiable librement (pas de cascade possible).
 */
export function modifierPartBeneficiaire(
 beneficiaires: Beneficiaire[],
 id: string,
 nouvelleValeur: number
): Beneficiaire[] {
 const index = beneficiaires.findIndex(b => b.id === id)
 if (index === -1) return beneficiaires

 // Dernier bénéficiaire : pas de cascade, modification libre
 if (index === beneficiaires.length - 1) {
   return beneficiaires.map(b =>
     b.id === id ? { ...b, partPourcentage: nouvelleValeur } : b
   )
 }

 const partAvant = beneficiaires.slice(0, index).reduce((s, b) => s + b.partPourcentage, 0)
 const partMaxDispo = 100 - partAvant
 const partClampee = Math.max(0, Math.min(nouvelleValeur, partMaxDispo))
 const resteAPartager = partMaxDispo - partClampee

 const benefApres = beneficiaires.slice(index + 1)
 const sommePartsApres = benefApres.reduce((s, b) => s + b.partPourcentage, 0)

 return beneficiaires.map((b, i) => {
   if (i < index) return b
   if (i === index) return { ...b, partPourcentage: partClampee }
   // Bénéficiaires après : ajustement proportionnel
   if (sommePartsApres > 0) {
     const ratio = b.partPourcentage / sommePartsApres
     return { ...b, partPourcentage: Math.round(resteAPartager * ratio * 100) / 100 }
   }
   // Si toutes les parts après étaient à 0 : répartition égale
   return { ...b, partPourcentage: Math.round((resteAPartager / benefApres.length) * 100) / 100 }
 })
}

/** Formatte le contexte transmission assurance-vie pour le chatbot. */
export function formatContexteTransmission(inputs: TransmissionInputs, r: TransmissionResults): string {
  const lines = [
    'Calculateur : Transmission assurance-vie (Art. 990 I / 757 B)',
    '',
    'Contrat',
    ligne('Capital total', eur(r.capitalTotal)),
    ligne('Versements avant 70 ans', eur(r.totalVersementsAvant70)),
    ligne('Versements après 70 ans', eur(r.totalVersementsApres70)),
    ligne('Plus-value totale', eur(r.plusValueTotale)),
    '',
    'Résultats globaux',
    ligne('Total impôts / droits', eur(r.totalImpots)),
    ligne('Total net transmis', eur(r.totalNet)),
    ligne('Taux effectif global', pct(r.tauxEffectifGlobal)),
    ligne('Économie vs succession classique', eur(r.economieVsClassique)),
    '',
    `Bénéficiaires (${r.nombreBeneficiaires})`,
  ]
  r.repartition.forEach(b => {
    lines.push(`  - ${b.nom} (${b.lien}, ${b.partPourcentage} %)`)
    lines.push(`     Part brute : ${eur(b.part)}`)
    if (b.impot990I > 0) lines.push(`     Prélèvement 990 I : ${eur(b.impot990I)} (base ${eur(b.baseTaxable990I)})`)
    if (b.droitsSuccession757B > 0) lines.push(`     Droits 757 B : ${eur(b.droitsSuccession757B)} (base ${eur(b.baseTaxable757B)})`)
    lines.push(`     Net reçu : ${eur(b.montantNet)} (taux effectif ${pct(b.tauxEffectif)})`)
  })
  return lines.join('\n')
}

// Module calculateur unifié (cf. CONTEXT.md, ADR-0001)
export const moduleTransmission: CalculatorModule<TransmissionInputs, TransmissionResults> = {
  slug: 'assurance-vie/transmission',
  nom: 'Assurance-vie - transmission',
  sources: SOURCES_TRANSMISSION,
  faqSchema: FAQ_TRANSMISSION,
  howToSchema: HOWTO_TRANSMISSION,
  formatContexteChat: formatContexteTransmission,
}
