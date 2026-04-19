// src/lib/transmission.ts

import type {
 TransmissionInputs,
 TransmissionResults,
 RepartitionBeneficiaire,
 Beneficiaire
} from '@/types/transmission'

import {
 ABATTEMENT_757B_GLOBAL,
 ABATTEMENT_990I_PAR_BENEFICIAIRE,
 TAUX_990I_REDUIT,
 TAUX_990I_NORMAL,
 SEUIL_990I,
 BAREME_LIGNE_DIRECTE,
 ABATTEMENT_SUCCESSION_ENFANT
} from '@/types/transmission'

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
 
 const warnings: string[] = []
 const infos: string[] = []
 
 // Validation : somme des parts = 100%
 const totalParts = beneficiaires.reduce((sum, b) => sum + b.partPourcentage, 0)
 if (Math.abs(totalParts - 100)> 0.01) {
 warnings.push(`Les parts totalisent ${totalParts.toFixed(1)}% au lieu de 100%`)
 }
 
 // Plus-value totale (versements après 70 ans : intérêts exonérés)
 const plusValueTotale = capitalTotal - (versementsAvant70 + versementsApres70)
 
 if (plusValueTotale < 0) {
 warnings.push('Les versements dépassent le capital actuel')
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
 infos.push(`Les versements après 70 ans (${versementsApres70.toLocaleString('fr-FR')}€) sont soumis à l'Article 757 B avec un abattement global de 30 500€ partagé.`)
 }
 
 if (plusValueTotale> 0) {
 infos.push(`Les plus-values générées par les versements après 70 ans sont totalement exonérées de droits.`)
 }
 
 if (beneficiaires.some(b => b.lien === 'conjoint')) {
 infos.push(`Le conjoint/partenaire PACS est totalement exonéré (Loi TEPA 2007).`)
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
