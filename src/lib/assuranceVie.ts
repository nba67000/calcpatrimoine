// src/lib/assuranceVie.ts

import type { AssuranceVieInputs, AssuranceVieResults, FiscaliteOption } from '@/types/assuranceVie'
import { formatEurRounded as eur, formatPct as pct, formatLigne as ligne } from '@/lib/formatters'

export const SOURCES_ASSURANCE_VIE = [
  { href: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000047956718', label: 'Article 125-0 A du CGI', desc: "Fiscalité des rachats d'assurance-vie, abattements annuels" },
  { href: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000045583309', label: 'Article 990 I du CGI', desc: 'Prélèvement spécifique sur versements > 150 000 €' },
  { href: 'https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000036339197', label: 'Loi de finances 2018 (article 28)', desc: 'Réforme PFU (flat tax), date pivot du 27 septembre 2017' },
  { href: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000047958086', label: 'Article L136-7 du Code de la Sécurité Sociale', desc: 'Prélèvements sociaux : CSG 9,2 % + CRDS 0,5 % + PS 7,5 % = 17,2 %' },
  { href: 'https://bofip.impots.gouv.fr/bofip/2823-PGP.html', label: 'BOFiP RPPM-RCM-20-10-20', desc: 'Règle proportionnelle, exemples de calculs détaillés' },
]

/**
 * Calcule l'ancienneté du contrat en années et mois
 */
export function calculerAnciennete(dateOuverture: Date): { annees: number; mois: number } {
 const aujourdhui = new Date()
 const diffMs = aujourdhui.getTime() - dateOuverture.getTime()
 const diffJours = diffMs / (1000 * 60 * 60 * 24)
 const diffAnnees = diffJours / 365.25
 
 const annees = Math.floor(diffAnnees)
 const mois = Math.floor((diffAnnees - annees) * 12)
 
 return { annees, mois }
}

// Art. 125-0 A CGI - seuil encours pour PFU réduit à 7,5% (versements post-27/09/2017, contrat > 8 ans)
const SEUIL_ENCOURS_PFU_REDUIT = 150_000

/**
 * Taux IR PFU applicable aux versements post-27/09/2017 dans un contrat > 8 ans.
 * 7,5% si encours total ≤ 150 000€, sinon prorata 7,5%/12,8% (Art. 125-0 A CGI).
 */
function tauxIRPost2017(encoursTotalContrats: number): number {
 if (encoursTotalContrats <= SEUIL_ENCOURS_PFU_REDUIT) return 0.075
 const ratioReduit = SEUIL_ENCOURS_PFU_REDUIT / encoursTotalContrats
 return ratioReduit * 0.075 + (1 - ratioReduit) * 0.128
}

/**
 * Calcule le taux PFU selon ancienneté, versements avant 2017 et encours total
 */
function calculerTauxPFU(
 anciennete: number,
 versementAvant2017: number,
 plusValueDansRachat: number,
 versementTotal: number,
 encoursTotalContrats: number
): { tauxMoyen: number; detailAvant2017: null | { plusValueAvant2017: number; plusValueApres2017: number; tauxAvant: number; tauxApres: number; avantage: number } } {

 if (anciennete < 8) {
 // Contrat < 8 ans : 30% (12,8% IR + 17,2% PS)
 return { tauxMoyen: 0.30, detailAvant2017: null }
 }

 // Contrat > 8 ans : taux post-2017 dépend du seuil 150 000€
 const tauxPost = tauxIRPost2017(encoursTotalContrats) + 0.172

 if (versementAvant2017 === 0) {
 return { tauxMoyen: tauxPost, detailAvant2017: null }
 }

 // Versements mixtes avant/après 2017
 const ratioAvant2017 = versementAvant2017 / versementTotal
 const plusValueAvant2017 = plusValueDansRachat * ratioAvant2017
 const plusValueApres2017 = plusValueDansRachat - plusValueAvant2017

 // Avant 2017 : toujours 7,5% + 17,2% = 24,7%
 const impotAvant = plusValueAvant2017 * 0.247
 const impotApres = plusValueApres2017 * tauxPost

 const tauxMoyen = plusValueDansRachat > 0
 ? (impotAvant + impotApres) / plusValueDansRachat
 : 0.247

 return {
 tauxMoyen,
 detailAvant2017: {
 plusValueAvant2017,
 plusValueApres2017,
 tauxAvant: 0.247,
 tauxApres: tauxPost,
 avantage: plusValueAvant2017 * (tauxPost - 0.247)
 }
 }
}

function evaluerAlertesAV(p: {
  tmi: AssuranceVieInputs['tmi']
  montantRachat: number
  ancienneteAnnees: number
  ancienneteMois: number
  partPlusValue: number
  abattementApplicable: number
  plusValueTaxable: number
  tauxPlusValue: number
  tauxMoyenPFU: number
  detailAvant2017: null | { plusValueAvant2017: number; tauxApres: number; avantage: number }
  partAvant2017: AssuranceVieResults['partAvant2017']
  optionPFU: FiscaliteOption
  optionIR: FiscaliteOption
  optionMoinsImposee: 'PFU' | 'IR'
  difference: number
}): { warnings: AssuranceVieResults['warnings']; optimisations: AssuranceVieResults['optimisations'] } {
  const warnings: AssuranceVieResults['warnings'] = []
  const optimisations: AssuranceVieResults['optimisations'] = []

  if (p.ancienneteAnnees < 8) {
    const moisRestants = (8 * 12) - (p.ancienneteAnnees * 12 + p.ancienneteMois)
    const anneesRestantes = Math.floor(moisRestants / 12)
    const moisSeuls = moisRestants % 12
    let dureeTexte = ''
    if (anneesRestantes > 0) {
      dureeTexte = `${anneesRestantes} an${anneesRestantes > 1 ? 's' : ''}`
      if (moisSeuls > 0) dureeTexte += ` et ${moisSeuls} mois`
    } else {
      dureeTexte = `${moisSeuls} mois`
    }
    const impotActuel = Math.min(p.optionPFU.totalPrelevement, p.optionIR.totalPrelevement)
    const impotApresAbattement = Math.max(0, p.partPlusValue - p.abattementApplicable) * p.tauxMoyenPFU
    const economieAttente = impotActuel - impotApresAbattement
    if (economieAttente > 500) {
      warnings.push({
        type: 'danger',
        message: `Votre contrat a moins de 8 ans (${p.ancienneteAnnees} ans et ${p.ancienneteMois} mois). En attendant ${dureeTexte}, vous économiserez environ ${Math.round(economieAttente).toLocaleString('fr-FR')}€ grâce à l'abattement de ${p.abattementApplicable.toLocaleString('fr-FR')}€.`,
      })
    } else {
      warnings.push({
        type: 'warning',
        message: `Votre contrat a ${p.ancienneteAnnees} ans et ${p.ancienneteMois} mois. Dans ${dureeTexte}, vous bénéficierez d'un abattement de ${p.abattementApplicable.toLocaleString('fr-FR')}€.`,
      })
    }
  }

  if (p.ancienneteAnnees >= 8 && p.plusValueTaxable > 0) {
    const depassement = p.partPlusValue - p.abattementApplicable
    if (depassement > p.abattementApplicable * 0.5) {
      const rachatAnnee1 = p.montantRachat * 0.4
      const rachatAnnee2 = p.montantRachat * 0.6
      const pvTaxableAnnee1 = Math.max(0, rachatAnnee1 * p.tauxPlusValue - p.abattementApplicable)
      const pvTaxableAnnee2 = Math.max(0, rachatAnnee2 * p.tauxPlusValue - p.abattementApplicable)
      const impotFractionne = (pvTaxableAnnee1 + pvTaxableAnnee2) * p.tauxMoyenPFU
      const gainFractionnement = Math.min(p.optionPFU.totalPrelevement, p.optionIR.totalPrelevement) - impotFractionne
      if (gainFractionnement > 300) {
        optimisations.push({
          type: 'success',
          message: ` En fractionnant votre rachat sur 2 ans (${Math.round(rachatAnnee1).toLocaleString('fr-FR')}€ cette année + ${Math.round(rachatAnnee2).toLocaleString('fr-FR')}€ l'année prochaine), vous économisez environ ${Math.round(gainFractionnement).toLocaleString('fr-FR')}€.`,
          gain: gainFractionnement,
        })
      }
    }
  }

  if (p.partAvant2017 && p.partAvant2017.avantage > 100 && p.detailAvant2017) {
    const tauxApresPct = (p.detailAvant2017.tauxApres * 100).toFixed(1)
    optimisations.push({
      type: 'info',
      message: `Vos versements avant le 27/09/2017 bénéficient d'un taux réduit (24,7% au lieu de ${tauxApresPct}%), ce qui vous fait économiser ${Math.round(p.partAvant2017.avantage).toLocaleString('fr-FR')}€.`,
    })
  }

  if (p.tmi <= 11 && p.optionMoinsImposee !== 'IR') {
    warnings.push({
      type: 'info',
      message: ` Avec votre TMI à ${p.tmi}%, l'option IR + PS génère ${Math.round(p.difference).toLocaleString('fr-FR')}€ de différence par rapport au PFU. Vérifiez quelle option correspond le mieux à votre situation.`,
    })
  }

  return { warnings, optimisations }
}

/**
 * Calcule la fiscalité complète du rachat
 */
export function calculerFiscaliteRachat(inputs: AssuranceVieInputs): AssuranceVieResults {
 
 // 1. Calcul ancienneté
 const { annees: ancienneteAnnees, mois: ancienneteMois } = calculerAnciennete(inputs.dateOuverture)
 const ancienneteContrat = ancienneteAnnees + (ancienneteMois / 12)
 
 // 2. Calcul plus-value totale
 const plusValueTotale = inputs.capitalTotal - inputs.versementTotal
 
 // 3. Calcul taux de plus-value dans le contrat
 const tauxPlusValue = plusValueTotale / inputs.capitalTotal
 
 // 4. Calcul répartition du rachat (règle proportionnelle)
 const partPlusValue = inputs.montantRachat * tauxPlusValue
 const partCapital = inputs.montantRachat - partPlusValue
 
 // 5. Application abattement si> 8 ans
 let abattementApplicable = 0
 if (ancienneteAnnees>= 8) {
 abattementApplicable = inputs.enCouple ? 9200 : 4600
 }
 
 const plusValueTaxable = Math.max(0, partPlusValue - abattementApplicable)
 
 // 6. Calcul OPTION PFU
 const calculPFU = calculerTauxPFU(
 ancienneteAnnees,
 inputs.versementAvant2017,
 partPlusValue,
 inputs.versementTotal,
 inputs.encoursTotalContrats
 )
 
 const impotPFU = plusValueTaxable * calculPFU.tauxMoyen
 
 const optionPFU: FiscaliteOption = {
 nom: 'PFU',
 description: 'Prélèvement Forfaitaire Unique (Flat Tax)',
 impotSurRevenu: plusValueTaxable * (calculPFU.tauxMoyen - 0.172), // IR seul
 prelevementsSociaux: plusValueTaxable * 0.172,
 totalPrelevement: impotPFU,
 netPercu: inputs.montantRachat - impotPFU,
 tauxEffectif: (impotPFU / inputs.montantRachat) * 100
 }
 
 // 7. Calcul OPTION IR + PS
 const tauxIR = inputs.tmi / 100
 const impotIR = plusValueTaxable * tauxIR
 const prelevementsSociaux = plusValueTaxable * 0.172
 const totalIR = impotIR + prelevementsSociaux
 
 const optionIR: FiscaliteOption = {
 nom: 'IR',
 description: 'Impôt sur le Revenu + Prélèvements Sociaux',
 impotSurRevenu: impotIR,
 prelevementsSociaux: prelevementsSociaux,
 totalPrelevement: totalIR,
 netPercu: inputs.montantRachat - totalIR,
 tauxEffectif: (totalIR / inputs.montantRachat) * 100
 }
 
 // 8. Comparaison (SANS recommandation, juste comparaison factuelle)
 const optionMoinsImposee = optionPFU.totalPrelevement < optionIR.totalPrelevement ? 'PFU' : 'IR'
 const difference = Math.abs(optionPFU.totalPrelevement - optionIR.totalPrelevement)
 
 // 9. Détail versements avant 2017
 const partAvant2017 = calculPFU.detailAvant2017 ? {
 montant: calculPFU.detailAvant2017.plusValueAvant2017,
 tauxFiscal: 24.7,
 avantage: calculPFU.detailAvant2017.avantage
 } : null
 
 // 10. Warnings et optimisations
 const { warnings, optimisations } = evaluerAlertesAV({
   tmi: inputs.tmi,
   montantRachat: inputs.montantRachat,
   ancienneteAnnees,
   ancienneteMois,
   partPlusValue,
   abattementApplicable,
   plusValueTaxable,
   tauxPlusValue,
   tauxMoyenPFU: calculPFU.tauxMoyen,
   detailAvant2017: calculPFU.detailAvant2017,
   partAvant2017,
   optionPFU,
   optionIR,
   optionMoinsImposee,
   difference,
 })

 return {
 plusValueTotale,
 plusValueDansRachat: partPlusValue,
 tauxPlusValue: tauxPlusValue * 100,
 ancienneteContrat: ancienneteAnnees,
 ancienneteMois: ancienneteMois,
 partCapital,
 partPlusValue,
 abattementApplicable,
 plusValueTaxable,
 optionPFU,
 optionIR,
 optionMoinsImposee,
 difference,
 partAvant2017,
 warnings,
 optimisations
 }
}

/**
 * Formatte une date pour l'input type="date"
 */
export function formatDateForInput(date: Date): string {
 const year = date.getFullYear()
 const month = String(date.getMonth() + 1).padStart(2, '0')
 const day = String(date.getDate()).padStart(2, '0')
 return `${year}-${month}-${day}`
}

/**
 * Parse une date depuis l'input type="date"
 */
export function parseDateFromInput(dateString: string): Date {
 return new Date(dateString)
}

/** Formatte le contexte assurance-vie (rachat) pour le chatbot. */
export function formatContexteAVRachat(inputs: AssuranceVieInputs, r: AssuranceVieResults): string {
  const regimePFU = inputs.encoursTotalContrats <= 150_000
    ? `PFU réduit 7,5 % (encours ${Math.round(inputs.encoursTotalContrats / 1000)}k€ ≤ 150 000€)`
    : `PFU normal 12,8 % (encours ${Math.round(inputs.encoursTotalContrats / 1000)}k€ > 150 000€)`
  const lines = [
    'Calculateur : Fiscalité rachat assurance-vie',
    '',
    'Contrat',
    ligne('Ancienneté', `${r.ancienneteContrat} ans et ${r.ancienneteMois} mois`),
    ligne('Capital actuel', eur(inputs.capitalTotal)),
    ligne('Versements totaux', eur(inputs.versementTotal)),
    ligne('Versements avant 27/09/2017', eur(inputs.versementAvant2017)),
    ligne('Encours total tous contrats AV', eur(inputs.encoursTotalContrats)),
    ligne('Plus-value totale du contrat', eur(r.plusValueTotale)),
    ligne('Taux de plus-value', pct(r.tauxPlusValue)),
    '',
    'Rachat envisagé',
    ligne('Montant du rachat', eur(inputs.montantRachat)),
    ligne('Part capital (non taxée)', eur(r.partCapital)),
    ligne('Part plus-value (taxable)', eur(r.partPlusValue)),
    ligne('Abattement applicable', eur(r.abattementApplicable)),
    ligne('Plus-value taxable finale', eur(r.plusValueTaxable)),
    '',
    'Règle PFU appliquée',
    `  ${regimePFU}`,
    '',
    'Comparaison fiscale',
    ligne('Option PFU - total prélèvements', eur(r.optionPFU.totalPrelevement)),
    ligne('Option PFU - net perçu', eur(r.optionPFU.netPercu)),
    ligne('Option IR - total prélèvements', eur(r.optionIR.totalPrelevement)),
    ligne('Option IR - net perçu', eur(r.optionIR.netPercu)),
    ligne('Écart entre les deux options', eur(r.difference)),
    ligne('TMI retenue', pct(inputs.tmi, 0)),
    ligne('Situation', inputs.enCouple ? 'Couple' : 'Personne seule'),
  ]
  if (r.partAvant2017) {
    lines.push(
      '',
      'Avantage versements avant 2017',
      ligne('Plus-value concernée', eur(r.partAvant2017.montant)),
      ligne('Taux réduit appliqué', pct(r.partAvant2017.tauxFiscal)),
      ligne('Économie vs taux normal', eur(r.partAvant2017.avantage)),
    )
  }
  return lines.join('\n')
}
