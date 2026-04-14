/**
 * @fileoverview Bibliothèque de calculs actuariels pour rentes viagères
 * 
 * Ce fichier contient toute la logique métier pour calculer des rentes viagères
 * basées sur les tables de mortalité INSEE/INED 2022.
 * 
 * Formules principales :
 * - Rente simple : R = C / a(x)
 * - Rente avec réversion : R = C / [a(x) + p·a_xy̅]
 * - Capital requis (inverse) : C = R · a(x)
 * 
 * @author CalcPatrimoine
 * @version 1.0.0
 */

import type { 
  MortalityTables, 
  Gender, 
  CalculatorInput, 
  AnnuityResult,
  MortalityData,
  InverseResult,
  CoupleProfile,
  CoupleCalculation
} from '@/types'

// =============================================================================
// CONSTANTES
// =============================================================================

/** Tables de mortalité INSEE/INED 2022 */
import mortalityTablesData from '../../public/mortality_tables.json'
const mortalityTables = mortalityTablesData as MortalityTables

/** Seuil de probabilité en dessous duquel on arrête les calculs */
const NEGLIGIBLE_PROBABILITY = 0.001

/** Nombre max d'années dans le futur pour les calculs de couple */
const MAX_COUPLE_YEARS = 60

// =============================================================================
// FONCTIONS UTILITAIRES - PROBABILITÉS DE SURVIE
// =============================================================================

/**
 * Calcule la probabilité qu'une personne d'âge x survive t années
 * 
 * Utilise la formule actuarielle :
 * t_px = ∏[k=0 to t-1] (1 - q_(x+k))
 * 
 * où q_(x+k) est le taux de mortalité à l'âge x+k
 * 
 * @param age - Âge actuel de la personne
 * @param gender - Sexe (homme/femme) pour utiliser la bonne table
 * @param years - Nombre d'années dans le futur
 * @returns Probabilité de survie entre 0 et 1
 * 
 * @example
 * // Probabilité qu'un homme de 65 ans survive 10 ans
 * const prob = calculateSurvivalProbability(65, 'homme', 10)
 * // prob ≈ 0.87 (87%)
 */
function calculateSurvivalProbability(
  age: number,
  gender: Gender,
  years: number
): number {
  let survivalProb = 1.0
  
  for (let k = 0; k < years; k++) {
    const data = getMortalityData(age + k, gender)
    
    if (!data) {
      // Au-delà des données disponibles, on arrête
      break
    }
    
    // p_x = 1 - q_x (taux de survie annuel)
    const annualSurvivalRate = 1 - data.mortality_rate
    survivalProb *= annualSurvivalRate
  }
  
  return survivalProb
}

/**
 * Calcule le facteur viager "dernier décès" pour un couple
 * 
 * Ce facteur représente la valeur actualisée des paiements tant qu'au moins
 * un membre du couple est en vie.
 * 
 * Formule actuarielle (Esch p.18) :
 * a̅_xy = ∑[t=1,∞] v^t · t_p̅_xy
 * 
 * où :
 * - t_p̅_xy = t_px + t_py - t_px·t_py (prob. qu'au moins un survive)
 * - v^t = (1/(1+i))^t (facteur d'actualisation)
 * 
 * @param age1 - Âge personne 1
 * @param gender1 - Sexe personne 1
 * @param age2 - Âge personne 2
 * @param gender2 - Sexe personne 2
 * @param techRate - Taux technique d'actualisation (ex: 0.005 pour 0.5%)
 * @returns Facteur viager "dernier décès"
 * 
 * @example
 * // Homme 65 ans + Femme 63 ans, taux 0.5%
 * const factor = calculateLastSurvivorFactor(65, 'homme', 63, 'femme', 0.005)
 * // factor ≈ 23.5
 */
function calculateLastSurvivorFactor(
  age1: number,
  gender1: Gender,
  age2: number,
  gender2: Gender,
  techRate: number
): number {
  let factor = 0
  
  for (let t = 1; t <= MAX_COUPLE_YEARS; t++) {
    // Probabilités individuelles de survie à t années
    const t_px = calculateSurvivalProbability(age1, gender1, t)
    const t_py = calculateSurvivalProbability(age2, gender2, t)
    
    // Optimisation : arrêter si probabilités négligeables
    if (t_px < NEGLIGIBLE_PROBABILITY && t_py < NEGLIGIBLE_PROBABILITY) {
      break
    }
    
    // Probabilité qu'au moins un des deux survive
    // Formule des probabilités : P(A ∪ B) = P(A) + P(B) - P(A ∩ B)
    const t_pxy_bar = t_px + t_py - (t_px * t_py)
    
    // Actualisation : valeur d'1€ dans t années
    const discountFactor = Math.pow(1 / (1 + techRate), t)
    
    // Accumulation de la valeur actualisée
    factor += t_pxy_bar * discountFactor
  }
  
  return factor
}

// =============================================================================
// FONCTIONS PUBLIQUES - ACCÈS AUX DONNÉES
// =============================================================================

/**
 * Récupère les données de mortalité pour un âge et sexe donnés
 * 
 * @param age - Âge recherché (50-110)
 * @param gender - Sexe (homme/femme)
 * @returns Données de mortalité ou null si âge hors limites
 * 
 * @example
 * const data = getMortalityData(65, 'homme')
 * // data = { age: 65, mortality_rate: 0.01234, annuity_factor: 15.67, ... }
 */
export function getMortalityData(
  age: number, 
  gender: Gender
): MortalityData | null {
  const table = mortalityTables.tables[gender]
  return table.find(d => d.age === age) || null
}

/**
 * Formatte un montant en euros avec séparateurs de milliers
 * 
 * @param amount - Montant à formater
 * @returns Chaîne formatée (ex: "1 234 €")
 * 
 * @example
 * formatEuro(1234.56) // "1 235 €" (arrondi)
 */
export function formatEuro(amount: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0
  }).format(amount)
}

// =============================================================================
// CALCULS PRINCIPAUX - RENTE SIMPLE
// =============================================================================

/**
 * Calcule la rente viagère immédiate (sans réversion)
 * 
 * Principe : On divise le capital par le facteur viager pour obtenir
 * la rente annuelle qui sera versée jusqu'au décès.
 * 
 * Formule de base :
 * R = C / a(x)
 * 
 * où :
 * - R = rente annuelle
 * - C = capital investi
 * - a(x) = facteur viager (somme actualisée des probabilités de survie)
 * 
 * @param capital - Capital à investir (€)
 * @param age - Âge du bénéficiaire
 * @param gender - Sexe du bénéficiaire
 * @returns Résultat détaillé du calcul ou null si données manquantes
 * 
 * @example
 * const result = calculateSimpleAnnuity(100000, 65, 'homme')
 * // result.monthly_amount ≈ 614€/mois
 * // result.annual_amount ≈ 7368€/an
 */
export function calculateSimpleAnnuity(
  capital: number,
  age: number,
  gender: Gender
): AnnuityResult | null {
  const data = getMortalityData(age, gender)
  
  if (!data) {
    console.error(`Pas de données de mortalité pour ${gender} ${age} ans`)
    return null
  }
  
  // Calculs de base
  const annualAmount = capital / data.annuity_factor
  const monthlyAmount = annualAmount / 12
  const totalExpectedPayout = annualAmount * data.life_expectancy
  const roiYears = capital / annualAmount
  
  return {
    monthly_amount: Math.round(monthlyAmount),
    annual_amount: Math.round(annualAmount),
    life_expectancy: data.life_expectancy,
    total_expected_payout: Math.round(totalExpectedPayout),
    roi_years: Math.round(roiYears * 10) / 10, // Arrondi à 0.1
    annuity_factor: data.annuity_factor,
    tech_rate: mortalityTables.metadata.tech_rate
  }
}

// =============================================================================
// CALCULS PRINCIPAUX - RENTE AVEC RÉVERSION
// =============================================================================

/**
 * Calcule la rente viagère avec réversion au conjoint
 * 
 * Principe : La rente continue à être versée au conjoint survivant à hauteur
 * d'un pourcentage donné (60%, 80% ou 100%). Le capital initial est partagé
 * entre les deux têtes.
 * 
 * Formule actuarielle exacte (Esch, Chapitre 3, p.18) :
 * R = C / [a(x) + p · a̅_xy]
 * 
 * où :
 * - a(x) = facteur viager tête principale
 * - p = pourcentage de réversion (0.6, 0.8 ou 1.0)
 * - a̅_xy = facteur viager "dernier décès"
 * 
 * @param capital - Capital total à investir (€)
 * @param age - Âge du titulaire principal
 * @param gender - Sexe du titulaire
 * @param spouseAge - Âge du conjoint
 * @param reversionPercentage - Pourcentage reversé (60, 80 ou 100)
 * @returns Résultat détaillé avec montants pour chaque membre
 * 
 * @example
 * // Homme 65 ans + Femme 63 ans, réversion 80%, 100k€
 * const result = calculateReversionAnnuity(
 *   100000, 65, 'homme', 63, 80
 * )
 * // result.monthly_amount ≈ 410€ (couple vivant)
 * // result.with_reversion.spouse_monthly_amount ≈ 328€ (après décès)
 */
export function calculateReversionAnnuity(
  capital: number,
  age: number,
  gender: Gender,
  spouseAge: number,
  reversionPercentage: 60 | 80 | 100
): AnnuityResult | null {
  const mainData = getMortalityData(age, gender)
  
  // Le conjoint a le sexe opposé
  const spouseGender: Gender = gender === 'homme' ? 'femme' : 'homme'
  const spouseData = getMortalityData(spouseAge, spouseGender)
  
  if (!mainData || !spouseData) {
    console.error('Données de mortalité manquantes pour le couple')
    return null
  }
  
  const techRate = mortalityTables.metadata.tech_rate
  const reversionRate = reversionPercentage / 100
  
  // Calcul rigoureux du facteur viager "dernier décès"
  const lastSurvivorFactor = calculateLastSurvivorFactor(
    age,
    gender,
    spouseAge,
    spouseGender,
    techRate
  )
  
  // Facteur viager total avec réversion (formule actuarielle exacte)
  const jointFactor = mainData.annuity_factor + (reversionRate * lastSurvivorFactor)
  
  // Calculs de montants
  const annualAmount = capital / jointFactor
  const monthlyAmount = annualAmount / 12
  const spouseMonthlyAmount = monthlyAmount * reversionRate
  
  // Espérance de vie conjointe = max des deux espérances
  const jointLifeExpectancy = Math.max(
    mainData.life_expectancy,
    spouseData.life_expectancy
  )
  
  return {
    monthly_amount: Math.round(monthlyAmount),
    annual_amount: Math.round(annualAmount),
    life_expectancy: mainData.life_expectancy,
    total_expected_payout: Math.round(annualAmount * jointLifeExpectancy),
    roi_years: Math.round((capital / annualAmount) * 10) / 10,
    with_reversion: {
      monthly_amount: Math.round(monthlyAmount),
      spouse_monthly_amount: Math.round(spouseMonthlyAmount),
      joint_life_expectancy: jointLifeExpectancy
    },
    annuity_factor: jointFactor,
    tech_rate: techRate
  }
}

// =============================================================================
// POINT D'ENTRÉE PRINCIPAL - CALCUL RENTE
// =============================================================================

/**
 * Point d'entrée principal pour calculer une rente (avec ou sans réversion)
 * 
 * Cette fonction délègue au bon calculateur selon si la réversion est
 * activée ou non.
 * 
 * @param input - Configuration complète du calcul
 * @returns Résultat détaillé du calcul
 * 
 * @example
 * // Rente simple
 * const simpleResult = calculateAnnuity({
 *   age: 65,
 *   capital: 100000,
 *   gender: 'homme'
 * })
 * 
 * // Rente avec réversion
 * const reversionResult = calculateAnnuity({
 *   age: 65,
 *   capital: 100000,
 *   gender: 'homme',
 *   reversion: {
 *     enabled: true,
 *     spouse_age: 63,
 *     percentage: 80
 *   }
 * })
 */
export function calculateAnnuity(input: CalculatorInput): AnnuityResult | null {
  // Cas avec réversion
  if (input.reversion?.enabled && 
      input.reversion.spouse_age && 
      input.reversion.percentage) {
    return calculateReversionAnnuity(
      input.capital,
      input.age,
      input.gender,
      input.reversion.spouse_age,
      input.reversion.percentage
    )
  }
  
  // Cas simple (sans réversion)
  return calculateSimpleAnnuity(
    input.capital,
    input.age,
    input.gender
  )
}

// =============================================================================
// CALCUL INVERSE - CAPITAL REQUIS
// =============================================================================

/**
 * Calcule le capital nécessaire pour obtenir une rente mensuelle souhaitée
 * 
 * Inverse la formule de base :
 * C = R · a(x)
 * 
 * @param desiredMonthlyAmount - Rente mensuelle souhaitée (€)
 * @param age - Âge du bénéficiaire
 * @param gender - Sexe du bénéficiaire
 * @param reversion - Configuration réversion (optionnelle)
 * @returns Capital requis et détails du calcul
 * 
 * @example
 * // Combien faut-il pour avoir 1000€/mois à 65 ans ?
 * const result = calculateRequiredCapital(1000, 65, 'homme')
 * // result.required_capital ≈ 196 000€
 */
export function calculateRequiredCapital(
  desiredMonthlyAmount: number,
  age: number,
  gender: Gender,
  reversion?: {
    enabled: boolean
    spouse_age?: number
    percentage?: 60 | 80 | 100
  }
): InverseResult | null {
  const data = getMortalityData(age, gender)
  
  if (!data) {
    console.error(`Pas de données de mortalité pour ${gender} ${age} ans`)
    return null
  }
  
  const techRate = mortalityTables.metadata.tech_rate
  const desiredAnnualAmount = desiredMonthlyAmount * 12
  
  let annuityFactor = data.annuity_factor
  
  // Ajustement si réversion
  if (reversion?.enabled && reversion.spouse_age && reversion.percentage) {
    const spouseGender: Gender = gender === 'homme' ? 'femme' : 'homme'
    const reversionRate = reversion.percentage / 100
    
    const lastSurvivorFactor = calculateLastSurvivorFactor(
      age,
      gender,
      reversion.spouse_age,
      spouseGender,
      techRate
    )
    
    annuityFactor = data.annuity_factor + (reversionRate * lastSurvivorFactor)
  }
  
  // Calcul inverse : C = R · a(x)
  const requiredCapital = desiredAnnualAmount * annuityFactor
  
  return {
    required_capital: Math.round(requiredCapital),
    annuity_factor: annuityFactor,
    life_expectancy: data.life_expectancy,
    tech_rate: techRate
  }
}

// =============================================================================
// CALCULS MODE COUPLE - 7 STRATÉGIES
// =============================================================================

/**
 * Calcule et compare 7 stratégies de rente pour un couple
 * 
 * Les 7 stratégies :
 * 1. Rentes séparées (chacun transforme son capital)
 * 2-4. Capital total sur P1 avec réversion 60/80/100% → P2
 * 5-7. Capital total sur P2 avec réversion 60/80/100% → P1
 * 
 * Important : La réversion est UNIDIRECTIONNELLE
 * - Si capital sur P1 rév. 80% → P2 :
 *   • P1 décède : P2 reçoit 80% de la rente
 *   • P2 décède : P1 garde 100% de sa rente (+ capital P2 intact)
 * 
 * @param person1 - Profil personne 1 (âge, sexe, capital)
 * @param person2 - Profil personne 2
 * @returns Comparaison détaillée des 7 stratégies
 * 
 * @example
 * const comparison = calculateCoupleStrategies(
 *   { age: 65, gender: 'homme', capital: 100000 },
 *   { age: 63, gender: 'femme', capital: 80000 }
 * )
 * // comparison contient person1_solo, joint_with_reversion_80, etc.
 */
export function calculateCoupleStrategies(
  person1: CoupleProfile,
  person2: CoupleProfile
): CoupleCalculation | null {
  const totalCapital = person1.capital + person2.capital
  
  // Stratégie 1 : Rentes séparées
  const person1_solo = calculateSimpleAnnuity(
    person1.capital,
    person1.age,
    person1.gender
  )
  
  const person2_solo = calculateSimpleAnnuity(
    person2.capital,
    person2.age,
    person2.gender
  )
  
  if (!person1_solo || !person2_solo) {
    return null
  }
  
  // Stratégies 2-4 : Capital total sur P1, réversion → P2
  const joint_60 = calculateReversionAnnuity(
    totalCapital,
    person1.age,
    person1.gender,
    person2.age,
    60
  )
  
  const joint_80 = calculateReversionAnnuity(
    totalCapital,
    person1.age,
    person1.gender,
    person2.age,
    80
  )
  
  const joint_100 = calculateReversionAnnuity(
    totalCapital,
    person1.age,
    person1.gender,
    person2.age,
    100
  )
  
  // Stratégies 5-7 : Capital total sur P2, réversion → P1
  const p2_joint_60 = calculateReversionAnnuity(
    totalCapital,
    person2.age,
    person2.gender,
    person1.age,
    60
  )
  
  const p2_joint_80 = calculateReversionAnnuity(
    totalCapital,
    person2.age,
    person2.gender,
    person1.age,
    80
  )
  
  const p2_joint_100 = calculateReversionAnnuity(
    totalCapital,
    person2.age,
    person2.gender,
    person1.age,
    100
  )
  
  if (!joint_60 || !joint_80 || !joint_100 || 
      !p2_joint_60 || !p2_joint_80 || !p2_joint_100) {
    return null
  }
  
  // Pas de recommandation automatique : on laisse l'utilisateur choisir
  // selon sa situation (santé, priorités, besoins)
  return {
    person1_solo,
    person2_solo,
    joint_with_reversion_60: joint_60,
    joint_with_reversion_80: joint_80,
    joint_with_reversion_100: joint_100,
    p2_joint_with_reversion_60: p2_joint_60,
    p2_joint_with_reversion_80: p2_joint_80,
    p2_joint_with_reversion_100: p2_joint_100,
    recommendation: 'joint_80', // Valeur par défaut (la plus courante)
    total_capital: totalCapital
  }
}
