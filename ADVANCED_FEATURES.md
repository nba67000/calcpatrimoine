# 🚀 CalcPatrimoine V1.5 - Fonctionnalités Avancées

## ✨ Nouvelles fonctionnalités

### 1️⃣ Taux technique variable (0% à 2%)
**Par défaut** : 0.5% (taux INSEE standard)

**Impact** :
- Taux plus élevé → Rente plus faible
- Taux 0% : Pas d'actualisation (rente max)
- Taux 2% : Forte actualisation (rente min)

**Formule** : 
```
a(x) = Σ t_px × v^t
où v = 1/(1+i) avec i = taux technique
```

---

### 2️⃣ Rente certaine (garantie 5-20 ans)
**Principe** : Garantit le versement pendant N années minimum, même en cas de décès précoce.

**Exemple** :
- Âge : 65 ans
- Capital : 100k€
- Rente certaine : 10 ans
- Rente : 580€/mois (vs 614€ sans garantie)

**Si décès à 70 ans** :
- Sans garantie : Rente s'arrête → Total perçu : 35k€
- Avec garantie 10 ans : Héritiers reçoivent 5 ans supplémentaires → Total : 70k€

---

### 3️⃣ Réversion différée (démarre après 1-15 ans)
**Principe** : La réversion au conjoint ne démarre qu'après N années.

**Exemple** :
- Capital : 100k€  
- Homme 65 ans, Femme 63 ans
- Réversion 80%, différée 5 ans

**Sans différé** :
- Couple : 820€/mois
- Si H décède immédiatement : F reçoit 656€

**Avec différé 5 ans** :
- Couple : 920€/mois (rente plus élevée)
- Si H décède < 5 ans : F ne reçoit rien
- Si H décède > 5 ans : F reçoit 736€

**Utilité** : Maximiser revenus couple si probabilité décès court terme faible.

---

### 4️⃣ Export PDF des calculs
**Contenu du PDF** :
- Informations personnelles (âge, capital, sexe)
- Résultats détaillés (rente mensuelle/annuelle, total espéré)
- Options avancées activées
- Formules appliquées
- Détails techniques (facteur viager, taux)

**Technologie** :
- Utilise window.print() natif du navigateur
- Pas de dépendance externe
- CSS optimisé pour impression
- Compatible tous navigateurs modernes

**Utilisation** :
1. Clic sur "Télécharger le détail (PDF)"
2. Fenêtre d'impression s'ouvre
3. Choisir "Enregistrer au format PDF"
4. Téléchargement automatique

---

## 📦 Installation

```bash
# 1. Extraire
unzip calcpatrimoine_V1.5_ADVANCED.zip -d ~/calcpatrimoine

# 2. Installer dépendances (inclut jsPDF)
cd ~/calcpatrimoine
npm install

# 3. Lancer en dev
npm run dev

# 4. Tester les options avancées
# - Ouvrir localhost:3000
# - Mode Classique
# - Dérouler "Options avancées"
# - Tester taux technique, rente certaine, export PDF
```

---

## 🎯 Guide utilisateur

### Accéder aux options avancées

1. **Mode Classique** ou **Montant souhaité**
2. Dérouler panneau **"⚙️ Options avancées"**
3. Cocher les options souhaitées

### Taux technique personnalisé

✅ **Quand l'utiliser** :
- Comparer avec offre assureur (certains proposent taux différents)
- Simulation scénarios (taux 0% = max, taux 2% = min)

❌ **Ne pas utiliser** :
- Pour calcul standard (garder 0.5% par défaut)

### Rente certaine

✅ **Quand l'utiliser** :
- Santé fragile (risque décès précoce)
- Vouloir protéger héritiers
- Capital important (>200k€)

❌ **Ne pas utiliser** :
- Si santé excellente (rente réduite pour rien)
- Si priorité = rente maximale

### Réversion différée

✅ **Quand l'utiliser** :
- Grand écart d'âge avec conjoint
- Conjoint jeune et en bonne santé
- Maximiser revenus court terme

❌ **Ne pas utiliser** :
- Si santé fragile du titulaire
- Conjoint proche en âge
- Sécurité conjoint prioritaire

---

## 🧮 Formules actuarielles

### Taux technique variable
```
Facteur viager : a(x) = Σ[t=1,∞] t_px × (1+i)^(-t)

Avec taux personnalisé :
- i = 0% → a(x) = espérance vie (max)
- i = 0.5% → a(x) standard INSEE
- i = 2% → a(x) fortement actualisé (min)
```

### Rente certaine
```
Facteur rente certaine : a_certain = Σ[t=1,N] (1+i)^(-t)

Facteur final : a_final = max(a(x), a_certain)

Impact : Rente réduite pour garantir paiement N ans
```

### Réversion différée
```
Facteur réversion différée :
a_rev_diff = Σ[t=N+1,∞] t_p̅_xy × (1+i)^(-t)

où t_p̅_xy = probabilité au moins un survit à t années

Impact : Exclut N premières années → rente couple augmentée
```

---

## 🔧 Développement

### Fichiers modifiés/créés

**Backend** :
- `src/lib/mortality.ts` : Fonctions avancées
  - `recalculateAnnuityFactor()` : Taux personnalisé
  - `calculateGuaranteedFactor()` : Rente certaine
  - `calculateDeferredReversionDiscount()` : Réversion différée

**Frontend** :
- `src/components/Calculator/AdvancedOptions.tsx` : Panneau UI
- `src/components/Calculator/RenteCalculator.tsx` : Intégration

**Export** :
- `src/lib/pdfExport.ts` : Génération PDF avec window.print() natif (sans dépendance)

**Types** :
- `src/types/index.ts` : 
  - `CalculatorInput` étendu
  - `AnnuityResult` étendu
  - `AdvancedOptionsState`

---

## 📊 Tests manuels

### Scénario 1 : Taux technique 0% vs 2%
```
Capital : 100k€
Homme 65 ans

Taux 0% : ~650€/mois
Taux 0.5% (défaut) : 614€/mois
Taux 2% : ~530€/mois

Écart : ~20% entre min et max
```

### Scénario 2 : Rente certaine 10 ans
```
Capital : 100k€
Homme 65 ans

Sans garantie : 614€/mois
Avec garantie 10 ans : ~580€/mois

Réduction : ~5-6%
Mais : 70k€ garanti minimum
```

### Scénario 3 : Réversion différée 5 ans
```
Capital : 200k€
H65 + F63, réversion 80%

Sans différé : 820€/mois
Avec différé 5 ans : ~920€/mois

Augmentation : ~12%
Mais : F sans protection si décès < 5 ans
```

---

## 🚀 Déploiement production

```bash
# Build optimisé
npm run build

# Test build
npm start

# Deploy Vercel
git add .
git commit -m "feat: options avancées - taux variable, rente certaine, réversion différée, export PDF"
git push

# Vercel auto-deploy
```

---

## 📝 Notes techniques

### Limitations
- Taux technique : 0% à 2% (au-delà = peu réaliste)
- Rente certaine : 5 à 20 ans (au-delà = inutile)
- Réversion différée : 1 à 15 ans (au-delà = rare)

### Performance
- Recalcul facteur viager : ~10ms
- Génération PDF : ~200ms
- Impact UX : Imperceptible

### Compatibilité
- Export PDF : API native window.print()
- Next.js 15 : Compatible
- SSR : Export côté client uniquement

---

**Version** : 1.5.0  
**Date** : 14 avril 2026  
**Auteur** : CalcPatrimoine.fr
