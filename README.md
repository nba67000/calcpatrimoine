# CalcPatrimoine

**Calculateurs patrimoniaux open-source et transparents pour la France**

[![Next.js](https://img.shields.io/badge/Next.js-15.1.6-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green)](./LICENSE)

🌐 **Site web** : [calcpatrimoine.fr](https://calcpatrimoine.fr)  
📊 **GitHub** : [github.com/nba67000/calcpatrimoine](https://github.com/nba67000/calcpatrimoine)

---

## 🎯 Mission

Fournir des outils de calcul **fiables**, **gratuits** et **transparents** pour la gestion de patrimoine en France.

### Pourquoi CalcPatrimoine existe

En 2026, il est difficile de trouver des calculateurs patrimoniaux qui sont à la fois :
- ✅ **Fiables** (basés sur données officielles INSEE, formules vérifiées)
- ✅ **Transparents** (code open-source, méthodologie publique)
- ✅ **Modernes** (UX temps réel, mobile-first, rapides)
- ✅ **Gratuits** (sans formulaire caché, sans vente forcée)

CalcPatrimoine comble ce manque avec des outils **créés par un développeur qui travaille dans l'assurance-vie**.

---

## 🧮 Calculateurs disponibles

### ✅ V1.0 - Rente Viagère (Disponible)

**3 modes de calcul** :

1. **Calculateur classique** : Quel montant mensuel pour mon capital ?
   - Calcul avec/sans réversion
   - Tables mortalité INSEE 2020-2022
   - Temps réel sans bouton "Calculer"

2. **Calculateur inverse** : Quel capital pour obtenir X€/mois ?
   - Feature unique (aucun concurrent ne le propose)
   - Projection sur espérance de vie

3. **Mode couple** : Quelle stratégie optimale à deux ?
   - Comparaison automatique de 5 stratégies
   - Recommandation IA basée sur rendement/sécurité
   - Visualisation claire des trade-offs

**URL** : [calcpatrimoine.fr](https://calcpatrimoine.fr)

---

### 🚧 V1.1 - TMI (En développement)

**Calculateur Tranche Marginale d'Imposition**

- Calcul TMI et taux moyen
- Projection année N+1
- Impact PER, dons, travaux
- Comparaison célibataire/marié/pacsé

**Lancement prévu** : T2 2026

---

### 📋 Roadmap 2026-2027

| Calculateur | Volume recherche/mois | Lancement prévu | Statut |
|-------------|----------------------|-----------------|--------|
| **Rente viagère** | 2 500 | ✅ Avril 2026 | Live |
| **TMI** | 12 000 | 🚧 Juin 2026 | Dev |
| **Assurance-vie** | 8 000 | 📋 Sept 2026 | Planifié |
| **PER** | 6 500 | 📋 Nov 2026 | Planifié |
| **IFI** | 3 000 | 📋 T1 2027 | Planifié |
| **Plus-value immo** | 5 000 | 📋 T2 2027 | Planifié |

---

## 🛠️ Stack technique

### Frontend
- **Next.js 15** (App Router, React 19, Server Components)
- **TypeScript** (typage strict)
- **Tailwind CSS** (design system)
- **Framer Motion** (animations)
- **Recharts** (graphiques)

### Data & Déploiement
- **Python** (scraping tables INSEE)
- **GitHub Actions** (MAJ automatique annuelle)
- **Vercel** (hébergement, CDN global)
- **JSON** (stockage tables mortalité)

### Performance
- ⚡ Lighthouse score : **95+** mobile
- 📦 Bundle size : **< 160 KB**
- 🚀 Temps de calcul : **< 10 ms**
- 🌍 SSG/ISR : génération statique

---

## 📊 Sources de données

### Actuellement utilisées
- **INSEE** : Tables de mortalité 2020-2022 (TGH/TGF)
- **INED** : Espérance de vie par âge et sexe
- **Données publiques** : Barèmes fiscaux, taux techniques

### Mise à jour
- **Automatique** : GitHub Actions (1er octobre chaque année)
- **Manuelle** : À chaque changement réglementaire

---

## 🚀 Installation locale

### Prérequis
- Node.js ≥ 20.11.0
- npm ou yarn

### Setup

```bash
# Cloner le repo
git clone https://github.com/nba67000/calcpatrimoine.git
cd calcpatrimoine

# Installer les dépendances
npm install

# Générer les tables de mortalité (optionnel, déjà présent)
python scripts/fetch-insee-data-v2.py

# Lancer en dev
npm run dev
```

Ouvrir http://localhost:3000

### Build production

```bash
npm run build
npm start
```

---

## 📁 Structure du projet

```
calcpatrimoine/
├── src/
│   ├── app/                    # Pages Next.js
│   │   ├── page.tsx           # Accueil (Rente viagère)
│   │   ├── methodologie/      # Explications formules
│   │   └── a-propos/          # Story & mission
│   ├── components/
│   │   ├── Calculator/        # Calculateurs
│   │   │   ├── RenteCalculator.tsx
│   │   │   ├── InverseCalculator.tsx
│   │   │   └── CoupleCalculator.tsx
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── TrustMarkers.tsx
│   ├── lib/
│   │   ├── mortality.ts       # Formules actuarielles
│   │   └── constants.ts       # Config
│   └── types/
│       └── index.ts           # Types TypeScript
├── public/
│   └── mortality_tables.json  # Tables INSEE
├── scripts/
│   └── fetch-insee-data-v2.py # Scraper Python
└── .github/workflows/
    └── update-insee-data.yml  # MAJ auto annuelle
```

---

## 🤝 Contribution

Les contributions sont les bienvenues !

### Comment contribuer

1. **Fork** le repo
2. **Créer une branche** : `git checkout -b feature/amelioration`
3. **Commit** : `git commit -m "feat: ajout calcul X"`
4. **Push** : `git push origin feature/amelioration`
5. **Pull Request**

### Idées de contribution

- 🐛 Reporter des bugs
- 💡 Proposer de nouveaux calculateurs
- 📚 Améliorer la documentation
- 🎨 Améliorer l'UX/UI
- ⚡ Optimiser les performances
- 🌍 Ajouter des traductions (Belgique, Suisse)

---

## 📜 License

MIT License - voir [LICENSE](./LICENSE)

**En bref** : Vous pouvez utiliser, modifier et redistribuer ce code librement, même commercialement.

---

## 👨‍💻 Créateur

**Nicolas Barbier**  
Développeur COBOL/AS400 chez Império Assurances (groupe SMABTP)

- 🌐 Site : [calcpatrimoine.fr](https://calcpatrimoine.fr)
- 💼 LinkedIn : [nicolas-barbier](https://www.linkedin.com/in/nicolas-barbier)
- 📧 Email : contact@calcpatrimoine.fr
- 🐙 GitHub : [@nba67000](https://github.com/nba67000)

---

## 🙏 Remerciements

- **INSEE** & **INED** pour les données publiques
- **Vercel** pour l'hébergement gratuit
- **Next.js** pour le framework
- **Communauté open-source** pour les outils

---

## 📈 Roadmap détaillée

### Phase 1 : Validation (Q2 2026) ✅
- [x] Lancement rente viagère
- [x] Acquisition 1000 premiers visiteurs
- [x] Feedback utilisateurs
- [x] SEO de base

### Phase 2 : Extension (Q3 2026)
- [ ] Calculateur TMI
- [ ] Analytics Plausible
- [ ] Google Search Console
- [ ] 3-5 articles SEO
- [ ] Launch Reddit r/vosfinances

### Phase 3 : Monétisation (Q4 2026)
- [ ] Assurance-vie & PER
- [ ] Partenariats courtiers (optionnel)
- [ ] Newsletter mensuelle
- [ ] 5000+ visiteurs/mois

### Phase 4 : Scale (2027)
- [ ] IFI, Plus-value, Succession
- [ ] API publique
- [ ] Widgets intégrables
- [ ] Version Belgique/Suisse

---

## ⭐ Support

Si ce projet vous est utile :
- ⭐ **Star** le repo GitHub
- 🐦 **Partager** sur les réseaux sociaux
- 🐛 **Reporter** des bugs
- 💡 **Proposer** des améliorations

---

**CalcPatrimoine** - *Calculateurs patrimoniaux open-source pour la France*  
© 2026 Nicolas Barbier | MIT License
