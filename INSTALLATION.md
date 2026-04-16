# 🚀 Guide d'installation - Calculateur Rente Viagère

## 📋 Prérequis

- Node.js 18+ installé
- Python 3.11+ (pour scraper INSEE)
- Git
- Compte GitHub
- (Optionnel) Compte Vercel pour le déploiement

---

## 🎯 Étape 1 : Créer le repository GitHub

```bash
# Sur GitHub.com
1. New repository
   - Name: rente-viagere-calculator
   - Description: Calculateur de rente viagère fiable basé sur tables INSEE
   - Public
   - ✅ Add README
   - ✅ Add .gitignore (Node)
   - License: MIT

2. Clone en local
git clone https://github.com/[TON-USERNAME]/rente-viagere-calculator.git
cd rente-viagere-calculator

3. Créer la branche develop
git checkout -b develop
git push -u origin develop
```

---

## 📂 Étape 2 : Structure du projet

Créer l'arborescence suivante :

```
rente-viagere-calculator/
├── .github/
│   └── workflows/
│       └── update-insee-data.yml
├── public/
│   └── mortality_tables.json       # Sera généré par le script Python
├── scripts/
│   └── fetch-insee-data.py
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── Calculator/
│   │   │   └── RenteCalculator.tsx
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── TrustMarkers.tsx
│   ├── lib/
│   │   ├── mortality.ts
│   │   └── constants.ts
│   └── types/
│       └── index.ts
├── .gitignore
├── next.config.js
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## 📝 Étape 3 : Copier les fichiers générés

**Tous les fichiers ont été générés et sont disponibles dans les téléchargements ci-dessus.**

Placer chaque fichier à l'emplacement indiqué :

```bash
# Racine du projet
package.json
next.config.js
tailwind.config.ts
tsconfig.json

# src/app/
layout.tsx
page.tsx
globals.css

# src/types/
types.ts → renommer en index.ts

# src/lib/
mortality.ts
constants.ts

# src/components/
Header.tsx
Footer.tsx
TrustMarkers.tsx

# src/components/Calculator/
RenteCalculator.tsx

# scripts/
scrape_insee_mortality_tables.py → renommer en fetch-insee-data.py

# .github/workflows/
update-insee-data.yml
```

---

## 🔧 Étape 4 : Initialiser Next.js

```bash
# Installer les dépendances
npm install

# Vérifier que tout compile
npm run build
```

Si erreurs, vérifier que :
- Tous les fichiers sont aux bons emplacements
- Les imports utilisent bien `@/` (alias configuré dans tsconfig.json)

---

## 📊 Étape 5 : Récupérer les données INSEE

```bash
# Installer dépendances Python
pip install requests pandas openpyxl

# Exécuter le script
cd scripts
python fetch-insee-data.py

# Le script génère : ./mortality_data/mortality_tables.json
# Déplacer vers public/
cd ..
mkdir -p public
cp scripts/mortality_data/mortality_tables.json public/

# Vérifier le fichier
cat public/mortality_tables.json | head -20
```

**Vous devriez voir** :
```json
{
  "metadata": {
    "source": "INSEE",
    "year": 2019,
    "tech_rate": 0.005,
    ...
  },
  "tables": {
    "homme": [
      {
        "age": 50,
        "annuity_factor": 18.2345,
        ...
      }
    ]
  }
}
```

---

## 🎨 Étape 6 : Créer les assets manquants

### Favicon (optionnel pour MVP)

```bash
# Placer dans public/
public/favicon.ico
public/apple-touch-icon.png
public/og-image.png  # Image OpenGraph 1200x630px
```

Vous pouvez utiliser un générateur en ligne comme :
- https://realfavicongenerator.net/
- https://www.canva.com/ (pour og-image.png)

---

## 🚀 Étape 7 : Lancer en local

```bash
npm run dev
```

Ouvrir http://localhost:3000

**Vous devriez voir** :
- Header avec logo "R" et navigation
- Hero section avec titre et trust markers
- Formulaire calculateur (3 sliders)
- Footer avec liens

---

## ✅ Étape 8 : Tests de fonctionnement

### Test 1 : Calcul simple
1. Âge : 65 ans
2. Capital : 100 000€
3. Sexe : Homme
4. **Résultat attendu** : ~600-800€/mois

### Test 2 : Calcul avec réversion
1. Cliquer "Options avancées : réversion"
2. Âge conjoint : 63 ans
3. Réversion : 60%
4. **Résultat** : montant légèrement réduit + message réversion

### Test 3 : Responsive
1. Ouvrir DevTools (F12)
2. Tester en mode mobile (iPhone, iPad)
3. Vérifier que tout est lisible

---

## 🔍 Étape 9 : Vérifications SEO

```bash
# Lancer en mode production
npm run build
npm run start
```

Vérifier :
- `http://localhost:3000` → page charge en < 2s
- Inspecter HTML source → balises meta présentes
- Console navigateur → 0 erreurs

---

## 📤 Étape 10 : Premier commit

```bash
git add .
git commit -m "feat: initial setup with INSEE calculator MVP"
git push origin develop

# Merger vers main
git checkout main
git merge develop
git push origin main
```

---

## 🌐 Étape 11 : Déploiement Vercel (optionnel)

```bash
# Installer Vercel CLI
npm i -g vercel

# Login
vercel login

# Déployer
vercel --prod

# Suivre les instructions :
# - Link to existing project? No
# - Project name? rente-viagere-calculator
# - Directory? ./
# - Build command? npm run build
# - Output directory? .next
```

**Votre site est live** 🎉

URL : https://rente-viagere-calculator.vercel.app

---

## 🐛 Troubleshooting

### Erreur : "Cannot find module '@/types'"

**Solution** :
```bash
# Vérifier tsconfig.json contient :
"paths": {
  "@/*": ["./src/*"]
}

# Redémarrer le serveur
npm run dev
```

### Erreur : "mortality_tables.json not found"

**Solution** :
```bash
# Vérifier que le fichier existe
ls -la public/mortality_tables.json

# Si absent, relancer le script Python
cd scripts
python fetch-insee-data.py
cp mortality_data/mortality_tables.json ../public/
```

### Les sliders ne bougent pas

**Solution** :
- Vérifier que `globals.css` est bien importé dans `layout.tsx`
- Vérifier que Tailwind est configuré (tailwind.config.ts)
- Effacer `.next` et rebuild : `rm -rf .next && npm run dev`

### Erreur Python : "No module named 'pandas'"

**Solution** :
```bash
pip install --upgrade pip
pip install requests pandas openpyxl
```

---

## ✨ Prochaines étapes (V2)

Une fois le MVP fonctionnel :

1. **Créer les pages secondaires** :
   - `/methodologie` (expliquer les formules)
   - `/a-propos` (ton histoire)

2. **Ajouter analytics** :
   ```bash
   npm install next-plausible
   ```

3. **SEO avancé** :
   - Créer `sitemap.xml`
   - Créer `robots.txt`
   - Ajouter Schema.org markup

4. **Tests** :
   - Tester sur mobile réel
   - Lighthouse audit (viser 90+ score)
   - Tester avec Screen Reader

---

## 📞 Support

**Problème ?** Ouvre une issue sur GitHub ou contacte-moi.

---

**Bon dev ! 🚀**
