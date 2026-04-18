// src/lib/assuranceVie.ts

import type { AssuranceVieInputs, AssuranceVieResults, FiscaliteOption } from '@/types/assuranceVie'

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

/**
 * Calcule le taux PFU selon ancienneté et versements avant 2017
 */
function calculerTauxPFU(
  anciennete: number,
  versementAvant2017: number,
  plusValueDansRachat: number,
  versementTotal: number
): { tauxMoyen: number; detailAvant2017: any } {
  
  if (anciennete < 8) {
    // Contrat < 8 ans : 30% (12,8% IR + 17,2% PS)
    return {
      tauxMoyen: 0.30,
      detailAvant2017: null
    }
  }
  
  // Contrat > 8 ans
  if (versementAvant2017 === 0) {
    // Pas de versements avant 2017 : 30% (12,8% IR + 17,2% PS)
    return {
      tauxMoyen: 0.30,
      detailAvant2017: null
    }
  }
  
  // Il y a des versements avant 2017
  // Calcul de la répartition de la plus-value
  const ratioAvant2017 = versementAvant2017 / versementTotal
  const plusValueAvant2017 = plusValueDansRachat * ratioAvant2017
  const plusValueApres2017 = plusValueDansRachat - plusValueAvant2017
  
  // Taux pour versements avant 2017 : 7,5% + 17,2% = 24,7%
  // Taux pour versements après 2017 : 12,8% + 17,2% = 30%
  const impotAvant = plusValueAvant2017 * 0.247
  const impotApres = plusValueApres2017 * 0.30
  
  const tauxMoyen = (impotAvant + impotApres) / plusValueDansRachat
  
  return {
    tauxMoyen,
    detailAvant2017: {
      plusValueAvant2017,
      plusValueApres2017,
      tauxAvant: 0.247,
      tauxApres: 0.30,
      avantage: plusValueAvant2017 * (0.30 - 0.247)
    }
  }
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
  
  // 5. Application abattement si > 8 ans
  let abattementApplicable = 0
  if (ancienneteAnnees >= 8) {
    abattementApplicable = inputs.enCouple ? 9200 : 4600
  }
  
  const plusValueTaxable = Math.max(0, partPlusValue - abattementApplicable)
  
  // 6. Calcul OPTION PFU
  const calculPFU = calculerTauxPFU(
    ancienneteAnnees,
    inputs.versementAvant2017,
    partPlusValue,
    inputs.versementTotal
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
  const warnings: AssuranceVieResults['warnings'] = []
  const optimisations: AssuranceVieResults['optimisations'] = []
  
  // Warning : contrat < 8 ans
  if (ancienneteAnnees < 8) {
    const moisRestants = (8 * 12) - (ancienneteAnnees * 12 + ancienneteMois)
    const anneesRestantes = Math.floor(moisRestants / 12)
    const moisSeuls = moisRestants % 12
    
    let dureeTexte = ''
    if (anneesRestantes > 0) {
      dureeTexte = `${anneesRestantes} an${anneesRestantes > 1 ? 's' : ''}`
      if (moisSeuls > 0) dureeTexte += ` et ${moisSeuls} mois`
    } else {
      dureeTexte = `${moisSeuls} mois`
    }
    
    // Calcul économie potentielle si on attend
    const impotActuel = Math.min(optionPFU.totalPrelevement, optionIR.totalPrelevement)
    const impotApresAbattement = Math.max(0, partPlusValue - abattementApplicable) * calculPFU.tauxMoyen
    const economieAttente = impotActuel - impotApresAbattement
    
    if (economieAttente > 500) {
      warnings.push({
        type: 'danger',
        message: `⏰ Votre contrat a moins de 8 ans (${ancienneteAnnees} ans et ${ancienneteMois} mois). En attendant ${dureeTexte}, vous économiserez environ ${Math.round(economieAttente).toLocaleString('fr-FR')}€ grâce à l'abattement de ${abattementApplicable.toLocaleString('fr-FR')}€.`
      })
    } else {
      warnings.push({
        type: 'warning',
        message: `Votre contrat a ${ancienneteAnnees} ans et ${ancienneteMois} mois. Dans ${dureeTexte}, vous bénéficierez d'un abattement de ${abattementApplicable.toLocaleString('fr-FR')}€.`
      })
    }
  }
  
  // Optimisation : fractionnement si dépassement abattement
  if (ancienneteAnnees >= 8 && plusValueTaxable > 0) {
    const depassement = partPlusValue - abattementApplicable
    if (depassement > abattementApplicable * 0.5) {
      // Calcul gain potentiel fractionnement
      const rachatAnnee1 = inputs.montantRachat * 0.4
      const rachatAnnee2 = inputs.montantRachat * 0.6
      
      const pvAnnee1 = rachatAnnee1 * tauxPlusValue
      const pvAnnee2 = rachatAnnee2 * tauxPlusValue
      
      const pvTaxableAnnee1 = Math.max(0, pvAnnee1 - abattementApplicable)
      const pvTaxableAnnee2 = Math.max(0, pvAnnee2 - abattementApplicable)
      
      const impotFractionne = (pvTaxableAnnee1 + pvTaxableAnnee2) * calculPFU.tauxMoyen
      const gainFractionnement = Math.min(optionPFU.totalPrelevement, optionIR.totalPrelevement) - impotFractionne
      
      if (gainFractionnement > 300) {
        optimisations.push({
          type: 'success',
          message: `💡 En fractionnant votre rachat sur 2 ans (${Math.round(rachatAnnee1).toLocaleString('fr-FR')}€ cette année + ${Math.round(rachatAnnee2).toLocaleString('fr-FR')}€ l'année prochaine), vous économisez environ ${Math.round(gainFractionnement).toLocaleString('fr-FR')}€.`,
          gain: gainFractionnement
        })
      }
    }
  }
  
  // Info : versements avant 2017
  if (partAvant2017 && partAvant2017.avantage > 100) {
    optimisations.push({
      type: 'info',
      message: `✓ Vos versements avant le 27/09/2017 bénéficient d'un taux réduit (24,7% au lieu de 30%), ce qui vous fait économiser ${Math.round(partAvant2017.avantage).toLocaleString('fr-FR')}€.`
    })
  }
  
  // Warning : TMI faible avec PFU
  if (inputs.tmi <= 11 && optionMoinsImposee !== 'IR') {
    warnings.push({
      type: 'info',
      message: `ℹ️ Avec votre TMI à ${inputs.tmi}%, l'option IR + PS génère ${Math.round(difference).toLocaleString('fr-FR')}€ de différence par rapport au PFU. Vérifiez quelle option correspond le mieux à votre situation.`
    })
  }
  
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
