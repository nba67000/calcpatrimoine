# 🖼️ Créer l'image Open Graph (OG) pour CalcPatrimoine

## 🎯 Objectif

Créer une image 1200x630px qui s'affiche quand tu partages le lien sur :
- Discord, Slack, Teams
- LinkedIn, Twitter/X, Facebook
- WhatsApp, Telegram
- Reddit

---

## Option 1 : Template HTML fourni (5 min)

### Étapes

1. **Ouvrir le fichier** : `og-image-template.html` (dans le ZIP)
2. **Navigateur** : Ouvre avec Chrome ou Firefox
3. **Zoom 100%** : Ctrl+0 (Windows) ou Cmd+0 (Mac)
4. **Screenshot** :
   - **Windows** : Snipping Tool → Mode fenêtre
   - **Mac** : Cmd+Shift+4 puis Espace → Clic sur fenêtre
   - **Chrome DevTools** : F12 → Ctrl+Shift+P → "Capture full size screenshot"
5. **Recadrer** : Garde uniquement la zone bleue (1200x630px)
6. **Sauvegarder** : `og-image.png`
7. **Placer** : `public/og-image.png` dans ton projet

---

## Option 2 : Canva (10 min)

### Étapes Canva

1. **Aller sur** : [canva.com](https://www.canva.com)
2. **Créer un design** : 1200 x 630 px (ou cherche "Open Graph")
3. **Design** :

```
┌────────────────────────────────────────────────────┐
│                  [GRATUIT • OPEN-SOURCE]            │
│                                                     │
│                        📊                           │
│                                                     │
│                CalcPatrimoine                       │
│                                                     │
│           Calculateur de Rente Viagère             │
│                                                     │
│   ✓ Tables INSEE 2022  ✓ Sans inscription         │
│   ✓ Données privées                                │
│                                                     │
│                calcpatrimoine.fr                    │
└────────────────────────────────────────────────────┘
```

### Couleurs Canva

- **Fond** : Dégradé
  - Couleur 1 : `#1E3A5F` (bleu marine foncé)
  - Couleur 2 : `#2E4A6F` (bleu marine)
  - Direction : Diagonal 135°

- **Texte** :
  - Titre "CalcPatrimoine" : Blanc `#FFFFFF`
  - Sous-titre : Gris clair `#D1DDE9`
  - Badge : Vert `#10B981`
  - URL : Vert `#10B981`

### Polices Canva

- **Titre** : Inter Bold, 72pt
- **Sous-titre** : Inter SemiBold, 36pt
- **Features** : Inter Regular, 24pt
- **URL** : Inter SemiBold, 32pt

### Éléments

- Badge "GRATUIT • OPEN-SOURCE" :
  - Fond transparent avec bordure verte
  - Border radius : 30px
  - Padding : 8px 20px

- Emoji 📊 : Taille 80px

- Checkmarks ✓ : Vert `#10B981`

### Export Canva

1. **Télécharger** → PNG
2. **Qualité** : Maximum
3. **Nom** : `og-image.png`

---

## Option 3 : Figma (15 min)

### Frame Figma

1. **Créer frame** : 1200 x 630 px
2. **Nom** : "CalcPatrimoine OG"

### Design Figma

**Background** :
- Type : Linear gradient
- Angle : 135°
- Stop 1 : `#1E3A5F` (0%)
- Stop 2 : `#2E4A6F` (100%)

**Layers** :
```
Frame 1200x630
├── Background (Gradient)
├── Pattern Circle 1 (Radial gradient, opacity 5%)
├── Pattern Circle 2 (Radial gradient, opacity 10%)
├── Badge "GRATUIT • OPEN-SOURCE"
│   └── Auto layout H, gap 8px, padding 8x20
├── Icon 📊 (80px)
├── Title "CalcPatrimoine" (Inter Bold 72)
├── Subtitle (Inter SemiBold 36)
├── Features Group
│   ├── Feature 1 (Auto layout H)
│   ├── Feature 2
│   └── Feature 3
└── URL "calcpatrimoine.fr" (Inter SemiBold 32)
```

### Export Figma

1. **Sélectionner frame**
2. **Export settings** :
   - Format : PNG
   - Scale : 1x
   - Nom : `og-image.png`
3. **Export**

---

## Option 4 : Photoshop / GIMP (20 min)

### Nouveau document

- **Taille** : 1200 x 630 px
- **Résolution** : 72 ppi
- **Mode** : RVB

### Calques

1. Background dégradé bleu
2. Texte blanc centré
3. Badge vert en haut
4. URL verte en bas

---

## 🔍 Vérification

### Avant déploiement

1. **Taille exacte** : 1200 x 630 px
2. **Format** : PNG
3. **Poids** : < 1 MB (idéalement < 500 KB)
4. **Nom** : `og-image.png` (exactement)
5. **Emplacement** : `public/og-image.png`

### Après déploiement

**Tester avec** :
- [OpenGraph.xyz](https://www.opengraph.xyz/) → Entre `https://calcpatrimoine.fr`
- [Facebook Debugger](https://developers.facebook.com/tools/debug/)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)

### Debug si image ne s'affiche pas

1. **Vider cache** : Ctrl+Shift+R sur la page
2. **Attendre** : 5-10 minutes (CDN propagation)
3. **Forcer refresh** : 
   - Facebook : Colle URL dans debugger → "Scrape Again"
   - LinkedIn : Post Inspector → "Inspect"
4. **Vérifier** : `https://calcpatrimoine.fr/og-image.png` accessible

---

## 📊 Specs techniques complètes

### Open Graph (Discord, Slack, LinkedIn, Facebook)
- **Taille recommandée** : 1200 x 630 px
- **Ratio** : 1.91:1
- **Format** : PNG ou JPG
- **Poids max** : 8 MB (recommandé < 500 KB)

### Twitter/X Card
- **Taille** : 1200 x 630 px (summary_large_image)
- **Ratio** : 2:1
- **Format** : PNG, JPG, WebP
- **Poids max** : 5 MB

### WhatsApp
- **Taille min** : 300 x 157 px
- **Taille recommandée** : 1200 x 630 px
- **Format** : PNG, JPG

---

## ✅ Checklist finale

- [ ] Image créée 1200x630px
- [ ] Nom : `og-image.png`
- [ ] Placée dans `public/og-image.png`
- [ ] Poids < 500 KB
- [ ] Déployé sur production
- [ ] Testé sur OpenGraph.xyz
- [ ] Partagé sur Discord → Image visible ✅

---

## 🎨 Variantes possibles

### Variante 1 : Focus chiffres
```
CalcPatrimoine
─────────────────
250 000€ → 1 340€/mois
Seuil : 15,8 ans
─────────────────
Tables INSEE 2022 • Gratuit
calcpatrimoine.fr
```

### Variante 2 : Focus transparence
```
📊 CalcPatrimoine

La vérité sur la rente viagère
que votre conseiller ne vous dit pas

✓ Calculs transparents
✓ Open-source
✓ Gratuit

calcpatrimoine.fr
```

### Variante 3 : Focus article blog
```
📊 CalcPatrimoine

Pourquoi le seuil de rentabilité
est APRÈS l'espérance de vie

(et c'est normal)

Lire l'article →
calcpatrimoine.fr/blog
```

---

**Choisis l'option qui te convient le mieux et crée l'image ! 🚀**
