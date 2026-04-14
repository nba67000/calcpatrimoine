// src/lib/pdfExport.ts
import type { AnnuityResult, Gender } from '@/types'
import { formatEuro } from './mortality'

/**
 * Génère un PDF avec le détail des calculs
 * Utilise window.print() avec CSS print optimisé (pas de dépendance externe)
 */
export async function exportCalculationToPDF(
  result: AnnuityResult,
  inputs: {
    age: number
    gender: Gender
    capital: number
    spouse?: {
      age: number
      percentage: number
    }
  }
): Promise<void> {
  // Créer contenu HTML pour impression
  const printContent = generatePrintContent(result, inputs)
  
  // Ouvrir fenêtre d'impression
  const printWindow = window.open('', '', 'width=800,height=600')
  
  if (!printWindow) {
    alert('Veuillez autoriser les popups pour télécharger le PDF')
    return
  }
  
  printWindow.document.write(printContent)
  printWindow.document.close()
  
  // Attendre le chargement puis imprimer
  printWindow.onload = () => {
    printWindow.print()
    // Fermer après impression (optionnel)
    setTimeout(() => printWindow.close(), 100)
  }
}

function generatePrintContent(
  result: AnnuityResult,
  inputs: {
    age: number
    gender: Gender
    capital: number
    spouse?: {
      age: number
      percentage: number
    }
  }
): string {
  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>CalcPatrimoine - Détail du calcul</title>
  <style>
    @page {
      margin: 2cm;
    }
    
    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    
    h1 {
      color: #1e40af;
      border-bottom: 3px solid #1e40af;
      padding-bottom: 10px;
      margin-bottom: 30px;
    }
    
    h2 {
      color: #1e40af;
      margin-top: 30px;
      margin-bottom: 15px;
      font-size: 18px;
    }
    
    .section {
      margin-bottom: 25px;
      page-break-inside: avoid;
    }
    
    .info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
      margin: 15px 0;
    }
    
    .info-box {
      background: #f3f4f6;
      padding: 15px;
      border-radius: 8px;
      border-left: 4px solid #1e40af;
    }
    
    .info-label {
      font-size: 12px;
      color: #6b7280;
      margin-bottom: 5px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .info-value {
      font-size: 18px;
      font-weight: bold;
      color: #1e40af;
    }
    
    .highlight {
      background: #dbeafe;
      padding: 20px;
      border-radius: 10px;
      margin: 20px 0;
      text-align: center;
    }
    
    .highlight .amount {
      font-size: 36px;
      font-weight: bold;
      color: #1e40af;
      margin: 10px 0;
    }
    
    .highlight .label {
      color: #1e40af;
      font-size: 14px;
    }
    
    .warning-box {
      background: #fef3c7;
      border-left: 4px solid #f59e0b;
      padding: 15px;
      margin: 20px 0;
      border-radius: 5px;
    }
    
    .success-box {
      background: #d1fae5;
      border-left: 4px solid #10b981;
      padding: 15px;
      margin: 20px 0;
      border-radius: 5px;
    }
    
    .formula {
      background: #f9fafb;
      border: 1px solid #e5e7eb;
      padding: 15px;
      border-radius: 5px;
      font-family: 'Courier New', monospace;
      margin: 15px 0;
    }
    
    .footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 2px solid #e5e7eb;
      font-size: 11px;
      color: #6b7280;
      text-align: center;
    }
    
    @media print {
      body {
        padding: 0;
      }
      
      .no-print {
        display: none;
      }
    }
  </style>
</head>
<body>
  <h1>📊 CalcPatrimoine - Détail du calcul</h1>
  
  <div class="section">
    <h2>Vos informations</h2>
    <div class="info-grid">
      <div class="info-box">
        <div class="info-label">Âge</div>
        <div class="info-value">${inputs.age} ans</div>
      </div>
      <div class="info-box">
        <div class="info-label">Sexe</div>
        <div class="info-value">${inputs.gender === 'homme' ? 'Homme' : 'Femme'}</div>
      </div>
      <div class="info-box">
        <div class="info-label">Capital investi</div>
        <div class="info-value">${formatEuro(inputs.capital)}</div>
      </div>
      <div class="info-box">
        <div class="info-label">Espérance de vie</div>
        <div class="info-value">${result.life_expectancy.toFixed(1)} ans</div>
      </div>
    </div>
  </div>
  
  <div class="highlight">
    <div class="label">Votre rente viagère</div>
    <div class="amount">${formatEuro(result.monthly_amount)}<span style="font-size:18px">/mois</span></div>
    <div class="label">soit ${formatEuro(result.annual_amount)}/an à vie</div>
  </div>
  
  <div class="section">
    <h2>Détails financiers</h2>
    <div class="info-grid">
      <div class="info-box">
        <div class="info-label">Total espéré</div>
        <div class="info-value">${formatEuro(result.total_expected_payout)}</div>
      </div>
      <div class="info-box">
        <div class="info-label">Retour sur investissement</div>
        <div class="info-value">${result.roi_years} ans</div>
      </div>
    </div>
  </div>
  
  ${inputs.spouse ? `
    <div class="warning-box">
      <h2 style="margin-top:0">Réversion au conjoint</h2>
      <p><strong>Âge conjoint :</strong> ${inputs.spouse.age} ans</p>
      <p><strong>Taux de réversion :</strong> ${inputs.spouse.percentage}%</p>
      <p><strong>Rente conjoint après décès :</strong> ${formatEuro(result.with_reversion?.spouse_monthly_amount || 0)}/mois</p>
      ${result.with_reversion?.deferred_years ? `
        <p style="margin-top:10px; padding:10px; background:#fef3c7; border-radius:5px;">
          ⚠️ <strong>Réversion différée :</strong> Démarre après ${result.with_reversion.deferred_years} ans
        </p>
      ` : ''}
    </div>
  ` : ''}
  
  ${result.guaranteed_payout ? `
    <div class="success-box">
      <h2 style="margin-top:0">Rente certaine (garantie)</h2>
      <p><strong>Années garanties :</strong> ${result.guaranteed_payout.years} ans</p>
      <p><strong>Total garanti minimum :</strong> ${formatEuro(result.guaranteed_payout.total_guaranteed)}</p>
      <p style="font-size:13px; margin-top:10px;">
        Ce montant sera versé quoi qu'il arrive, même en cas de décès précoce.
      </p>
    </div>
  ` : ''}
  
  ${result.custom_tech_rate_used ? `
    <div class="info-box" style="margin:20px 0;">
      <p style="margin:0;">
        ⚙️ <strong>Taux technique personnalisé :</strong> ${(result.tech_rate * 100).toFixed(2)}%
      </p>
    </div>
  ` : ''}
  
  <div class="section">
    <h2>Détails techniques</h2>
    <div class="formula">
      <strong>Formule appliquée :</strong><br><br>
      R = C / a(x)<br><br>
      R = ${formatEuro(inputs.capital)} / ${result.annuity_factor.toFixed(2)}<br><br>
      R = ${formatEuro(result.annual_amount)}/an
    </div>
    <p style="font-size:13px; color:#6b7280; margin-top:15px;">
      <strong>Facteur viager a(x) :</strong> ${result.annuity_factor.toFixed(2)}<br>
      <strong>Taux technique :</strong> ${(result.tech_rate * 100).toFixed(2)}%<br>
      <strong>Tables de mortalité :</strong> INSEE/INED 2022
    </p>
  </div>
  
  <div class="footer">
    <p><strong>Document généré par CalcPatrimoine.fr</strong></p>
    <p>Calculs basés sur les tables de mortalité INSEE/INED 2022</p>
    <p>Date d'édition : ${new Date().toLocaleDateString('fr-FR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })}</p>
    <p style="margin-top:15px; font-size:10px;">
      ⚠️ Ces estimations sont indicatives. Consultez un professionnel pour un devis personnalisé.
    </p>
  </div>
</body>
</html>
  `.trim()
}
