// TEST DE VALIDATION - Formule rigoureuse réversion
// Ce fichier peut être supprimé après validation

import { calculateReversionAnnuity, calculateSimpleAnnuity } from './src/lib/mortality'

console.log('=== TEST FORMULE RÉVERSION RIGOUREUSE ===\n')

// Test 1 : Homme 65 ans + Femme 63 ans, réversion 80%
console.log('Test 1 : Homme 65 ans + Femme 63 ans, 100k€, réversion 80%')
const test1 = calculateReversionAnnuity(100000, 65, 'homme', 63, 80)
if (test1) {
  console.log(`- Rente mensuelle : ${test1.monthly_amount}€`)
  console.log(`- Réversion conjoint : ${test1.with_reversion?.spouse_monthly_amount}€`)
  console.log(`- Facteur viager : ${test1.annuity_factor.toFixed(2)}`)
}

console.log('\n---\n')

// Test 2 : Comparaison réversion 60% / 80% / 100%
console.log('Test 2 : Comparaison taux réversion (même couple)')
const rev60 = calculateReversionAnnuity(100000, 65, 'homme', 63, 60)
const rev80 = calculateReversionAnnuity(100000, 65, 'homme', 63, 80)
const rev100 = calculateReversionAnnuity(100000, 65, 'homme', 63, 100)

if (rev60 && rev80 && rev100) {
  console.log(`Réversion 60%  : ${rev60.monthly_amount}€/mois`)
  console.log(`Réversion 80%  : ${rev80.monthly_amount}€/mois`)
  console.log(`Réversion 100% : ${rev100.monthly_amount}€/mois`)
  console.log('\nAttente : rente décroissante (plus de réversion = rente initiale plus basse)')
  console.log(`Vérification : ${rev60.monthly_amount} > ${rev80.monthly_amount} > ${rev100.monthly_amount} ?`)
  console.log(`Résultat : ${rev60.monthly_amount > rev80.monthly_amount && rev80.monthly_amount > rev100.monthly_amount ? '✅ OK' : '❌ ERREUR'}`)
}

console.log('\n---\n')

// Test 3 : Cohérence avec rente simple
console.log('Test 3 : Rente avec réversion doit être < rente simple')
const simple = calculateSimpleAnnuity(100000, 65, 'homme')
const withRev = calculateReversionAnnuity(100000, 65, 'homme', 63, 80)

if (simple && withRev) {
  console.log(`Rente simple       : ${simple.monthly_amount}€/mois`)
  console.log(`Rente réversion 80%: ${withRev.monthly_amount}€/mois`)
  console.log(`Écart              : -${simple.monthly_amount - withRev.monthly_amount}€/mois`)
  console.log(`Vérification       : ${simple.monthly_amount > withRev.monthly_amount ? '✅ OK' : '❌ ERREUR'}`)
}

console.log('\n=== FIN DES TESTS ===')
