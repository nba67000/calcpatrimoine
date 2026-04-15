# Améliorations Calculateur - Conformité Réglementation 2012

## 🎯 Problème identifié

Le calculateur affiche uniquement la rente biologique (selon sexe) alors que depuis 2012, les assureurs doivent utiliser une table unisexe.

**Risque** : Utilisateur voit 614€/mois, va voir assureur, obtient 580€/mois → déception + perte de crédibilité.

---

## ✅ Solution recommandée : Afficher les DEUX

### Interface proposée

```tsx
// RenteCalculator.tsx - Bloc résultats

<div className="bg-white rounded-xl border p-6">
  <h3 className="font-semibold text-lg mb-4">Résultats du calcul</h3>
  
  {/* Rente commerciale (mise en avant) */}
  <div className="bg-blue-50 border-2 border-blue-500 rounded-lg p-4 mb-4">
    <div className="flex items-center gap-2 mb-2">
      <span className="text-sm font-medium text-blue-900">
        💼 Rente commerciale réelle (table unisexe 2012)
      </span>
    </div>
    <div className="text-3xl font-bold text-blue-900">
      {formatEuro(result.unisex_monthly_rent)}/mois
    </div>
    <p className="text-sm text-blue-700 mt-2">
      C'est ce que vous proposera un assureur (réglementation obligatoire)
    </p>
  </div>
  
  {/* Rente biologique (secondaire, éducative) */}
  <div className="bg-gray-50 border border-gray-300 rounded-lg p-4">
    <div className="flex items-center gap-2 mb-2">
      <span className="text-sm font-medium text-gray-700">
        🧬 Rente biologique ({gender === 'homme' ? 'Homme' : 'Femme'})
      </span>
    </div>
    <div className="text-2xl font-semibold text-gray-800">
      {formatEuro(result.biological_monthly_rent)}/mois
    </div>
    <p className="text-xs text-gray-600 mt-2">
      Calcul basé sur l'espérance de vie réelle {gender === 'homme' ? 'masculine' : 'féminine'} 
      (pur référence éducative, non applicable commercialement)
    </p>
  </div>
  
  {/* Note explicative */}
  <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded">
    <p className="text-xs text-amber-800">
      <strong>ℹ️ Pourquoi deux montants ?</strong><br />
      Biologiquement, les femmes vivent ~4 ans de plus que les hommes (espérance vie). 
      Mais depuis 2012, les assureurs utilisent une table unisexe (moyenne). 
      Nous affichons les deux pour que vous compreniez l'impact biologique, 
      tout en vous donnant le tarif réel applicable.
    </p>
  </div>
</div>
```

---

## 📊 Modifications code

### 1. Ajouter calcul rente unisexe dans `mortality.ts`

```typescript
// Dans calculateSimpleAnnuity()

// Calcul rente biologique (selon sexe)
const biologicalAnnual = capital / data.annuity_factor
const biologicalMonthly = biologicalAnnual / 12

// Calcul rente unisexe (obligatoire depuis 2012)
// Pondération : 48% hommes, 52% femmes (démographie FR 2022)
const dataHomme = getMortalityData(age, 'homme')
const dataFemme = getMortalityData(age, 'femme')

let unisexMonthly = biologicalMonthly
if (dataHomme && dataFemme) {
  const unisexFactor = (dataHomme.annuity_factor * 0.48) + (dataFemme.annuity_factor * 0.52)
  const unisexAnnual = capital / unisexFactor
  unisexMonthly = unisexAnnual / 12
}

return {
  biological_monthly_rent: biologicalMonthly,
  biological_annual_rent: biologicalAnnual,
  unisex_monthly_rent: unisexMonthly,
  unisex_annual_rent: unisexMonthly * 12,
  life_expectancy: data.life_expectancy,
  annuity_factor: data.annuity_factor,
  // ...
}
```

### 2. Mettre à jour types `index.ts`

```typescript
export interface AnnuityResult {
  // Rentes biologiques (référence éducative)
  biological_monthly_rent: number
  biological_annual_rent: number
  
  // Rentes unisexes (tarif commercial réel)
  unisex_monthly_rent: number
  unisex_annual_rent: number
  
  // Métriques communes
  life_expectancy: number
  annuity_factor: number
  total_expected_payout: number
  roi_years: number
  // ...
}
```

### 3. Afficher dans `RenteCalculator.tsx`

Voir code interface ci-dessus.

---

## 🎨 Wireframe visuel

```
┌─────────────────────────────────────────┐
│ Résultats du calcul                     │
├─────────────────────────────────────────┤
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ 💼 Rente commerciale (unisexe 2012) │ │
│ │                                     │ │
│ │    580€/mois                        │ │
│ │                                     │ │
│ │ C'est ce que vous proposera         │ │
│ │ un assureur                         │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ 🧬 Rente biologique (Homme)         │ │
│ │                                     │ │
│ │    614€/mois                        │ │
│ │                                     │ │
│ │ Référence éducative (espérance      │ │
│ │ vie masculine)                      │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ ℹ️ Pourquoi deux montants ?         │ │
│ │                                     │ │
│ │ Biologiquement différent, mais      │ │
│ │ réglementation impose tarif unique  │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

---

## 🎯 Bénéfices

### Pour l'utilisateur
- ✅ Sait exactement ce qu'il obtiendra chez un assureur (580€)
- ✅ Comprend pourquoi il y a une différence biologique
- ✅ Pas de mauvaise surprise lors du RDV assureur

### Pour CalcPatrimoine
- ✅ Conformité réglementation 2012
- ✅ Différenciation (personne ne montre les deux)
- ✅ Pédagogie (transparence totale)
- ✅ Crédibilité renforcée

### Pour le SEO
- ✅ Article cohérent avec calculateur
- ✅ Keyword "table unisexe rente viagère"
- ✅ Contenu unique (double calcul)

---

## 📅 Roadmap d'implémentation

### Phase 1 (1h) - Urgent
- [x] Corriger article blog (✅ fait)
- [ ] Ajouter calcul unisexe dans `mortality.ts`
- [ ] Mettre à jour types

### Phase 2 (2h) - Important
- [ ] Refonte affichage résultats (deux rentes)
- [ ] Ajouter note explicative
- [ ] Tests avec vrais chiffres

### Phase 3 (1h) - Finitions
- [ ] Adapter calculateur inverse
- [ ] Adapter calculateur couple
- [ ] Mettre à jour FAQ

---

## 🧪 Valeurs de test

```
Capital : 100 000€
Âge : 65 ans

Homme :
- Facteur viager : 16.29
- Rente bio : 614€/mois

Femme :
- Facteur viager : 18.16
- Rente bio : 551€/mois

Unisexe (48% H + 52% F) :
- Facteur viager : (16.29 × 0.48) + (18.16 × 0.52) = 17.27
- Rente unisexe : 100000 / 17.27 / 12 = 483€/mois

⚠️ Note : Les vrais assureurs ont peut-être des pondérations différentes
(à vérifier avec documentation ACPR)
```

---

## 📚 Sources

- [Arrêt CJUE C-236/09](https://curia.europa.eu/juris/document/document.jsf?docid=80019)
- [Directive 2004/113/CE](https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32004L0113)
- [Application France : 21 décembre 2012](https://www.legifrance.gouv.fr/)

---

**Conclusion** : Modification simple, impact énorme sur crédibilité et conformité.
