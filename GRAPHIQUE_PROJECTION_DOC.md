# 📊 Graphique de Projection - Documentation

## 🎯 Objectif

Le graphique de projection transforme CalcPatrimoine d'un **simple calculateur** en un **outil de décision** en visualisant l'évolution du capital vs rente cumulée sur 30 ans.

---

## 💡 Ce que le graphique montre

### Ligne bleue : Capital initial
Reste constant à travers le temps (votre capital de départ).

### Ligne verte : Rente cumulée
Augmente linéairement chaque année (somme de toutes les rentes perçues).

### Point mort (🎯)
**Année où la rente cumulée dépasse le capital initial.**

**Formule** : `Point mort = Capital / (Rente mensuelle × 12)`

**Exemple** :
- Capital : 100 000 €
- Rente : 401 €/mois
- Point mort : 100 000 / (401 × 12) = **20,8 ans**

**Signification** :
- **Avant le point mort** : Vous auriez mieux fait de garder votre capital
- **Après le point mort** : La rente viagère devient rentable
- **Plus vous vivez longtemps** : Plus la rente est avantageuse

---

## 📐 Détails techniques

### Composant : `src/components/ProjectionChart.tsx`

**Props** :
```typescript
interface ProjectionChartProps {
  capital: number           // Capital initial
  monthlyRent: number       // Rente mensuelle
  lifeExpectancy: number    // Espérance de vie
}
```

**Bibliothèque** : Recharts 2.15.0

**Responsive** : Oui (ResponsiveContainer)

**Hauteur** : 350px

**Données générées** : 0 à 30 ans (ou espérance + 5 ans, le minimum)

---

## 🎨 Design

### Couleurs
- **Ligne capital** : `#2E4A6F` (primary-600, bleu marine)
- **Ligne rente** : `#059669` (success-600, vert émeraude)
- **Point mort** : `#F59E0B` (warning-500, orange)
- **Grille** : `#E2E8F0` (neutral-200, gris clair)

### Éléments UI
- **CartesianGrid** : Grille pointillée (strokeDasharray="3 3")
- **ReferenceLine** : Ligne verticale orange au point mort avec emoji 🎯
- **Tooltip** : Card blanche avec montants formatés
- **Legend** : Légendes "Capital initial" et "Rente cumulée"

---

## 📊 Formatter des axes

### Axe Y (montants)
```typescript
const formatYAxis = (value: number) => {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M€`
  if (value >= 1000) return `${(value / 1000).toFixed(0)}k€`
  return `${value}€`
}
```

**Exemples** :
- 50 000 € → "50k€"
- 150 000 € → "150k€"
- 1 200 000 € → "1.2M€"

### Axe X (années)
Valeurs brutes : 0, 5, 10, 15, 20, 25, 30

---

## 💬 Tooltip personnalisé

Au survol d'une année, affiche :
```
┌─────────────────────────┐
│ Année 15                │
│ Capital initial : 100k€ │
│ Rente cumulée : 72k€    │
│ 🎯 Point mort !         │ (si année = point mort)
└─────────────────────────┘
```

---

## 🎓 Explication pédagogique

Sous le graphique, un bloc bleu clair explique :

```tsx
<div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
  💡 Comment lire ce graphique ?
  
  - La ligne bleue = votre capital initial
  - La ligne verte = total des rentes perçues
  
  Point mort (X ans) : À partir de cette année, 
  vous aurez perçu plus que votre capital initial.
  
  Plus vous vivez longtemps après ce point, 
  plus la rente viagère devient avantageuse.
</div>
```

---

## 📱 Responsive

Le graphique s'adapte automatiquement :
- **Desktop** : 100% largeur container, 350px hauteur
- **Mobile** : Idem (Recharts gère le responsive)
- **Tooltip** : Se positionne intelligemment pour rester visible

---

## 🧮 Cas d'usage concrets

### Exemple 1 : Retraité 65 ans
- Capital : 150 000 €
- Rente : 620 €/mois
- Point mort : **20 ans** (85 ans)
- Espérance : 22 ans (87 ans)

**Interprétation** : Viable, dépasse le point mort

---

### Exemple 2 : Senior 75 ans
- Capital : 100 000 €
- Rente : 800 €/mois
- Point mort : **10,4 ans** (85 ans)
- Espérance : 13 ans (88 ans)

**Interprétation** : Très rentable, large marge après point mort

---

### Exemple 3 : Jeune retraité 60 ans
- Capital : 200 000 €
- Rente : 650 €/mois
- Point mort : **25,6 ans** (85 ans)
- Espérance : 26 ans (86 ans)

**Interprétation** : Limite, juste au point mort

---

## ⚡ Performance

### Optimisations
- **Calcul data** : Une seule fois au render (pas dans useEffect)
- **Recharts** : Léger, tree-shakeable
- **ResponsiveContainer** : Pas de re-render inutiles

### Bundle impact
- Recharts : ~120 KB minified
- Acceptable pour la valeur ajoutée

---

## 🚀 Impact UX

### Avant le graphique
```
Utilisateur : "J'aurai 401€/mois."
Réaction : "OK... c'est bien ou pas ?"
```

### Après le graphique
```
Utilisateur : "J'aurai 401€/mois."
Voir le graphique : "Ah ! Après 20 ans je suis gagnant.
                     Et si je vis jusqu'à 90 ans, 
                     j'aurai touché 144k€ pour 100k€ placés !"
```

**Résultat** : Transformation de l'outil en aide à la décision.

---

## 🔧 Maintenance

### Ajouter une année supplémentaire
Modifier `maxYears` dans `ProjectionChart.tsx` :
```typescript
const maxYears = Math.min(40, Math.ceil(lifeExpectancy) + 5)
```

### Changer les couleurs
Modifier les propriétés `stroke` des `<Line>` :
```typescript
<Line stroke="#VOTRE_COULEUR" ... />
```

### Ajouter un élément au graphique
Recharts supporte :
- `<Area>` : Zones colorées
- `<Bar>` : Barres verticales
- `<Scatter>` : Points dispersés
- `<Brush>` : Zoom interactif

---

## ✅ Checklist déploiement

- [x] Recharts installé (2.15.0)
- [x] Composant ProjectionChart créé
- [x] Intégré dans RenteCalculator
- [x] Intégré dans InverseCalculator
- [x] Design cohérent (palette CalcPatrimoine)
- [x] Responsive (mobile OK)
- [x] Tooltip accessible
- [x] Explication pédagogique
- [ ] Tester visuellement tous scénarios
- [ ] Vérifier performance mobile

---

## 🎉 Résultat attendu

**CalcPatrimoine passe de** :
- ❌ "Outil calculatrice" → ⭐ "Assistant décision retraite"
- ❌ "Résultat sec" → ⭐ "Projection long terme"
- ❌ "Chiffre incompris" → ⭐ "Visualisation claire"

**C'est LA fonctionnalité qui fait la différence !** 🚀
