// src/lib/chatContext.ts
// Formateurs de contexte calculateur → texte lisible pour le système prompt du chatbot.
// Chaque formateur produit un résumé concis que Claude peut citer directement.

import { formatEurRounded as eur, formatPct as pct } from '@/lib/formatters'
import type { TMIInputs, TMIResults } from '@/types/tmi'
import type { PERInputs, PERResults } from '@/types/per'
import type { AssuranceVieInputs, AssuranceVieResults } from '@/types/assuranceVie'
import type { TransmissionInputs, TransmissionResults } from '@/types/transmission'
import type { CalculatorInput, AnnuityResult } from '@/types'

// ---------------------------------------------------------------------------
// Type discriminant
// ---------------------------------------------------------------------------

export type ContexteChat =
  | { calculateur: 'tmi'; inputs: TMIInputs; results: TMIResults }
  | { calculateur: 'per-individuel'; inputs: PERInputs; results: PERResults }
  | { calculateur: 'rente-viagere'; inputs: CalculatorInput; results: AnnuityResult }
  | { calculateur: 'assurance-vie/fiscalite-rachat'; inputs: AssuranceVieInputs; results: AssuranceVieResults }
  | { calculateur: 'assurance-vie/transmission'; inputs: TransmissionInputs; results: TransmissionResults }

// ---------------------------------------------------------------------------
// Helpers de formatage
// ---------------------------------------------------------------------------

const ligne = (label: string, valeur: string) => `  ${label} : ${valeur}`

// ---------------------------------------------------------------------------
// Formateurs par calculateur
// ---------------------------------------------------------------------------

function formatTMI(inputs: TMIInputs, r: TMIResults): string {
  const situation: Record<string, string> = {
    'celibataire': 'célibataire',
    'marie-pacse': 'marié / pacsé',
    'parent-isole': 'parent isolé',
  }
  const lines = [
    'Calculateur : Tranche marginale d\'imposition (TMI / IR)',
    '',
    'Situation fiscale',
    ligne('Revenu net imposable', eur(inputs.revenuNetImposable)),
    ligne('Situation familiale', situation[inputs.situationFamiliale] ?? inputs.situationFamiliale),
    ligne('Enfants à charge', String(inputs.nombreEnfants)),
    ligne('Nombre de parts QF', r.nombreParts.toFixed(2)),
    '',
    'Résultats',
    ligne('IR brut (avant décote)', eur(r.irBrut)),
    ligne('Décote appliquée', eur(r.decoteApplicable)),
    ligne('IR net à payer', eur(r.irNet)),
    ligne('Tranche marginale (TMI)', pct(r.tmi, 0)),
    ligne('Taux moyen d\'imposition', pct(r.tauxMoyen)),
  ]
  if (r.plafonnementActif) {
    lines.push(ligne('Plafonnement QF', `actif — réduction limitée à ${eur(r.reductionQFPlafond)}`))
  }
  if (r.detailTranches.length > 0) {
    lines.push('', 'Détail par tranche')
    r.detailTranches
      .filter(t => t.revenuDansLaTranche > 0)
      .forEach(t => lines.push(
        ligne(`Tranche ${pct(t.taux, 0)}`, `${eur(t.revenuDansLaTranche)} imposés → ${eur(t.impotDansLaTranche)}`)
      ))
  }
  return lines.join('\n')
}

function formatPER(inputs: PERInputs, r: PERResults): string {
  const d = r.detail
  const lines = [
    'Calculateur : PER individuel — économie d\'impôt sur versement',
    '',
    'Situation fiscale',
    ligne('Salaire net annuel', eur(inputs.salaireNetAnnuel)),
    ligne('TMI', pct(inputs.tmi, 0)),
    ligne('Versement PER envisagé', eur(inputs.versementEnvisage)),
    '',
    'Plafond disponible',
    ligne('Plafond de l\'année (10 % du revenu net)', eur(d.plafondAnnuel)),
    ligne('Reports N-1 à N-5 cumulés', eur(d.plafondsReportesTotal)),
    ligne('Plafond total utilisable', eur(d.plafondTotal)),
    ligne('Montant effectivement déductible', eur(d.montantDeductible)),
  ]
  if (d.partNonDeductible > 0) {
    lines.push(ligne('Part non déductible (dépassement plafond)', eur(d.partNonDeductible)))
  }
  lines.push(
    '',
    'Résultats',
    ligne('Économie fiscale', eur(r.economieFiscale)),
    ligne('Coût net réel du versement', eur(r.coutNetReel)),
    ligne('Rendement fiscal immédiat', pct(r.rendementFiscal)),
  )
  return lines.join('\n')
}

function formatRenteViagere(inputs: CalculatorInput, r: AnnuityResult): string {
  const lines = [
    'Calculateur : Rente viagère',
    '',
    'Paramètres',
    ligne('Âge du souscripteur', `${inputs.age} ans`),
    ligne('Capital converti', eur(inputs.capital)),
    ligne('Taux technique', pct(r.tech_rate * 100)),
    ligne('Facteur de rente (a(x))', r.annuity_factor.toFixed(4)),
  ]
  if (inputs.reversion?.enabled) {
    lines.push(
      ligne('Réversion', `activée à ${inputs.reversion.percentage} %`),
      ligne('Âge du conjoint', `${inputs.reversion.spouse_age} ans`),
    )
  }
  lines.push(
    '',
    'Résultats',
    ligne('Rente mensuelle', eur(r.monthly_amount)),
    ligne('Rente annuelle', eur(r.annual_amount)),
    ligne('Espérance de vie résiduelle', `${r.life_expectancy.toFixed(1)} ans`),
    ligne('Total attendu sur espérance de vie', eur(r.total_expected_payout)),
    ligne('Seuil de rentabilité', `${r.roi_years.toFixed(1)} ans`),
  )
  if (r.with_reversion) {
    lines.push(
      '',
      'Après décès du souscripteur (réversion)',
      ligne('Rente réversionnaire mensuelle', eur(r.with_reversion.spouse_monthly_amount)),
    )
  }
  return lines.join('\n')
}

function formatAVRachat(inputs: AssuranceVieInputs, r: AssuranceVieResults): string {
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
    ligne('Option PFU — total prélèvements', eur(r.optionPFU.totalPrelevement)),
    ligne('Option PFU — net perçu', eur(r.optionPFU.netPercu)),
    ligne('Option IR — total prélèvements', eur(r.optionIR.totalPrelevement)),
    ligne('Option IR — net perçu', eur(r.optionIR.netPercu)),
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

function formatTransmission(inputs: TransmissionInputs, r: TransmissionResults): string {
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
    lines.push(
      `  — ${b.nom} (${b.lien}, ${b.partPourcentage} %)`,
      `     Part brute : ${eur(b.part)}`,
    )
    if (b.impot990I > 0) lines.push(`     Prélèvement 990 I : ${eur(b.impot990I)} (base ${eur(b.baseTaxable990I)})`)
    if (b.droitsSuccession757B > 0) lines.push(`     Droits 757 B : ${eur(b.droitsSuccession757B)} (base ${eur(b.baseTaxable757B)})`)
    lines.push(`     Net reçu : ${eur(b.montantNet)} (taux effectif ${pct(b.tauxEffectif)})`)
  })
  return lines.join('\n')
}

// ---------------------------------------------------------------------------
// Point d'entrée unique
// ---------------------------------------------------------------------------

export function formatContexteChat(contexte: ContexteChat): string {
  switch (contexte.calculateur) {
    case 'tmi':
      return formatTMI(contexte.inputs, contexte.results)
    case 'per-individuel':
      return formatPER(contexte.inputs, contexte.results)
    case 'rente-viagere':
      return formatRenteViagere(contexte.inputs, contexte.results)
    case 'assurance-vie/fiscalite-rachat':
      return formatAVRachat(contexte.inputs, contexte.results)
    case 'assurance-vie/transmission':
      return formatTransmission(contexte.inputs, contexte.results)
  }
}
