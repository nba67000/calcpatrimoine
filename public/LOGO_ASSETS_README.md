# Logo Assets - Instructions de génération

## Fichiers SVG créés
- `public/logo.svg` - Logo complet avec point d'accent (44x44)
- `public/favicon.svg` - Logo simplifié pour favicon (32x32)

## Assets PNG à générer

### Option 1 : Avec outil en ligne (recommandé)

**Étape 1 : Générer favicon.ico**
1. Va sur https://realfavicongenerator.net/
2. Upload `public/favicon.svg`
3. Télécharge le package complet
4. Extrais les fichiers dans `public/`

**Étape 2 : Générer OG image**
1. Va sur https://www.canva.com/ (gratuit)
2. Crée un design 1200x630 px
3. Fond : Dégradé bleu (#3b82f6 → #2563eb)
4. Centre : Logo SVG importé (grand, 300x300)
5. Texte : "CalcPatrimoine - Calculateurs Patrimoniaux Open Source"
6. Export PNG : `public/og-image.png`

### Option 2 : Avec Figma/Sketch

1. Importe `logo.svg`
2. Exporte en PNG :
   - `favicon-16x16.png`
   - `favicon-32x32.png`
   - `apple-touch-icon.png` (180x180)
   - `og-image.png` (1200x630)

### Option 3 : Avec ImageMagick (ligne de commande)

```bash
# Installer ImageMagick
# Windows: choco install imagemagick
# Mac: brew install imagemagick
# Linux: apt-get install imagemagick

# Générer favicons
convert public/favicon.svg -resize 16x16 public/favicon-16x16.png
convert public/favicon.svg -resize 32x32 public/favicon-32x32.png
convert public/logo.svg -resize 180x180 public/apple-touch-icon.png
```

## Fichiers nécessaires (checklist)

- [ ] `public/favicon.svg` ✅ (créé)
- [ ] `public/favicon.ico` (générer)
- [ ] `public/favicon-16x16.png` (générer)
- [ ] `public/favicon-32x32.png` (générer)
- [ ] `public/apple-touch-icon.png` (180x180, générer)
- [ ] `public/logo.svg` ✅ (créé)
- [ ] `public/og-image.png` (1200x630, générer)

## Utilisation dans le code

Les fichiers SVG sont déjà prêts. Les PNG peuvent être générés plus tard.

Pour l'instant, le site utilisera `favicon.svg` (moderne, supporté par tous les navigateurs récents).

## Template OG Image (dimensions)

```
┌─────────────────────────────────────┐
│  1200 x 630 px                      │
│                                     │
│  [Fond dégradé bleu #3b82f6-#2563eb]│
│                                     │
│         ╔═══╗                       │
│         ║ C ║  (Logo 200x200)       │
│         ╚═══╝                       │
│                                     │
│    CalcPatrimoine                   │
│    Calculateurs Patrimoniaux        │
│    Open Source                      │
│                                     │
└─────────────────────────────────────┘
```
