# 🚀 Guide SEO Post-Réorganisation CalcPatrimoine

**Date** : 18 avril 2026  
**Contexte** : Migration vers architecture multi-calculateurs + ajout calculateur Assurance-Vie

---

## 📋 **Table des matières**

1. [Changements d'URLs](#changements-urls)
2. [Redirections 301 à mettre en place](#redirections)
3. [Sitemap à soumettre](#sitemap)
4. [Google Search Console](#google-search-console)
5. [Maillage interne](#maillage-interne)
6. [Optimisations on-page](#optimisations-on-page)
7. [Stratégie de contenu](#strategie-contenu)
8. [Checklist finale](#checklist)

---

## 🔄 **1. Changements d'URLs** {#changements-urls}

### **Ancien site (1 calculateur)**
```
https://calcpatrimoine.fr/
  → Calculateur rente viagère (page unique)
```

### **Nouveau site (architecture hub)**
```
https://calcpatrimoine.fr/
  → Homepage hub (6 calculateurs)

https://calcpatrimoine.fr/rente-viagere
  → Calculateur rente viagère (migré)

https://calcpatrimoine.fr/assurance-vie
  → Calculateur assurance-vie (nouveau)

https://calcpatrimoine.fr/blog/assurance-vie-fiscalite-rachat
  → Article assurance-vie (nouveau)

https://calcpatrimoine.fr/faq/assurance-vie
  → FAQ assurance-vie (nouveau)
```

---

## 🔀 **2. Redirections 301 à mettre en place** {#redirections}

### ⚠️ **CRITIQUE : Aucune redirection nécessaire !**

**Bonne nouvelle** : La homepage (`/`) reste la homepage.

- ✅ **Avant** : `/` = Calculateur rente viagère
- ✅ **Après** : `/` = Homepage hub avec lien vers `/rente-viagere`

**Pas besoin de redirection 301** car :
- La homepage reste à la racine `/`
- Le contenu a juste évolué (calculateur unique → hub)
- Aucune URL n'a changé d'emplacement

**Par contre** : Si des utilisateurs avaient bookmarké `/` pour le calculateur rente viagère, ils arriveront sur le hub et devront cliquer sur "Rente Viagère". Ce n'est pas un problème SEO.

---

## 🗺️ **3. Sitemap à soumettre** {#sitemap}

### **Votre sitemap actuel** (`/sitemap.xml`)

```xml
https://calcpatrimoine.fr/                                    (priorité 1.0)
https://calcpatrimoine.fr/rente-viagere                       (priorité 0.9)
https://calcpatrimoine.fr/assurance-vie                       (priorité 0.9) ← NOUVEAU
https://calcpatrimoine.fr/blog                                (priorité 0.8)
https://calcpatrimoine.fr/blog/rente-viagere-seuil-rentabilite (priorité 0.7)
https://calcpatrimoine.fr/blog/assurance-vie-fiscalite-rachat (priorité 0.7) ← NOUVEAU
https://calcpatrimoine.fr/faq                                 (priorité 0.6)
https://calcpatrimoine.fr/faq/assurance-vie                   (priorité 0.7) ← NOUVEAU
https://calcpatrimoine.fr/methodologie                        (priorité 0.6)
https://calcpatrimoine.fr/a-propos                            (priorité 0.5)
https://calcpatrimoine.fr/mentions-legales                    (priorité 0.3)
https://calcpatrimoine.fr/cgu                                 (priorité 0.3)
https://calcpatrimoine.fr/politique-confidentialite           (priorité 0.3)
```

### **Actions à faire**

1. ✅ **Le sitemap est déjà à jour dans le code**
2. ✅ **Déployer le site**
3. ✅ **Vérifier que `/sitemap.xml` affiche bien toutes les URLs**
4. ✅ **Soumettre à Google Search Console** (voir section 4)

---

## 🔍 **4. Google Search Console** {#google-search-console}

### **A. Soumettre le nouveau sitemap**

1. **Aller sur** : [Google Search Console](https://search.google.com/search-console)
2. **Menu** : Sitemaps (dans la barre latérale gauche)
3. **Ajouter un sitemap** : `https://calcpatrimoine.fr/sitemap.xml`
4. **Cliquer** : Envoyer

**Résultat attendu** : Google va crawler toutes les nouvelles URLs sous 24-48h.

---

### **B. Demander une indexation rapide (optionnel mais recommandé)**

Pour les 3 nouvelles pages importantes :

1. **Aller dans** : Inspection d'URL
2. **Entrer** :
   - `https://calcpatrimoine.fr/assurance-vie`
   - `https://calcpatrimoine.fr/faq/assurance-vie`
   - `https://calcpatrimoine.fr/blog/assurance-vie-fiscalite-rachat`
3. **Cliquer** : "Demander une indexation"

**Bénéfice** : Indexation en quelques heures au lieu de quelques jours.

---

### **C. Surveiller les performances**

**Menu** : Performances

**Requêtes à surveiller** (nouvelles) :
- `calculateur assurance vie`
- `fiscalité rachat assurance vie`
- `pfu vs ir assurance vie`
- `abattement 8 ans assurance vie`
- `règle proportionnelle assurance vie`

**Astuce** : Comparer les performances avant/après pour voir l'impact de la réorganisation.

---

## 🔗 **5. Maillage interne** {#maillage-interne}

### **Liens déjà créés ✅**

#### **Homepage → Calculateurs**
```
/ → /rente-viagere (carte calculateur)
/ → /assurance-vie (carte calculateur)
```

#### **Calculateur ↔ FAQ**
```
/assurance-vie → /faq/assurance-vie (box verte)
/faq/assurance-vie → /assurance-vie (box bleue)
```

#### **Calculateur ↔ Article**
```
/assurance-vie → /blog/assurance-vie-fiscalite-rachat (box orange)
/blog/assurance-vie-fiscalite-rachat → /assurance-vie (CTA x2)
```

#### **FAQ générale ↔ FAQ AV**
```
/faq → /faq/assurance-vie (box verte)
/faq/assurance-vie → /faq (footer liens)
```

---

### **Maillage supplémentaire à ajouter (recommandé)**

#### **A. Dans article rente viagère**

Ajouter une section "Voir aussi" en bas :

```html
<div class="bg-primary-50 rounded-xl p-6">
  <h3>📚 Voir aussi</h3>
  <ul>
    <li>
      <a href="/blog/assurance-vie-fiscalite-rachat">
        Assurance-vie : combien vous allez VRAIMENT payer sur un rachat
      </a>
    </li>
    <li>
      <a href="/assurance-vie">
        Calculateur fiscalité assurance-vie
      </a>
    </li>
  </ul>
</div>
```

**Fichier à modifier** : `/src/app/blog/rente-viagere-seuil-rentabilite/page.tsx`

---

#### **B. Dans page blog (liste articles)**

Afficher les 2 articles :

```
/blog
  → Article rente viagère
  → Article assurance-vie (nouveau) ← À ajouter
```

**Fichier à modifier** : `/src/app/blog/page.tsx`

---

## 📊 **6. Optimisations on-page** {#optimisations-on-page}

### **A. Balises meta déjà optimisées ✅**

#### **Homepage**
```html
<title>CalcPatrimoine - Calculateurs gratuits patrimoine & retraite</title>
<meta name="description" content="Calculateurs gratuits et open-source pour vos décisions patrimoniales : rente viagère, assurance-vie, PER. Zéro donnée conservée." />
<meta name="keywords" content="calculateur patrimoine, rente viagère, assurance vie, PER, retraite, simulateur gratuit" />
```

#### **Calculateur Assurance-Vie**
```html
<title>Calculateur Fiscalité Assurance-Vie : PFU vs IR (gratuit 2026)</title>
<meta name="description" content="Calculez l'impôt sur votre rachat d'assurance-vie en 2 min. Règle proportionnelle, abattement 8 ans, PFU vs IR, versements 2017. Gratuit, sans inscription." />
```

#### **Article Assurance-Vie**
```html
<title>Assurance-vie : combien vous allez VRAIMENT payer sur un rachat (guide 2026)</title>
<meta name="description" content="Règle proportionnelle, abattement 8 ans, PFU vs IR, versements avant 2017. Tout comprendre avec des exemples chiffrés et les formules officielles." />
```

#### **FAQ Assurance-Vie**
```html
<title>FAQ Assurance-Vie : Fiscalité, Rachat et Optimisation | CalcPatrimoine</title>
<meta name="description" content="Questions fréquentes sur la fiscalité de l'assurance-vie : PFU vs IR, abattement 8 ans, versements avant 2017, optimisation fiscale. Réponses d'expert." />
```

---

### **B. Structure Hn optimale**

#### **Page Calculateur**
```
H1: Calculateur Fiscalité Assurance-Vie
  H2: Caractéristiques du contrat
  H2: Détails du rachat
  H2: Votre situation fiscale
  H2: Comparaison fiscale (résultats)
  H2: Méthodologie
```

#### **Article**
```
H1: Assurance-vie : combien vous allez VRAIMENT payer
  H2: Le piège n°1 : croire qu'on taxe tout le rachat
    H3: La règle proportionnelle
  H2: L'abattement magique des 8 ans
    H3: Le piège du "presque 8 ans"
  H2: PFU vs IR : le choix qui change tout
  H2: La date magique : 27 septembre 2017
  H2: Les 5 erreurs qui coûtent cher
  H2: Méthodologie et sources
```

---

### **C. Schema.org (données structurées)**

#### **Pour l'article** (ajouter dans `<head>`)

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Assurance-vie : combien vous allez VRAIMENT payer sur un rachat",
  "author": {
    "@type": "Organization",
    "name": "CalcPatrimoine"
  },
  "publisher": {
    "@type": "Organization",
    "name": "CalcPatrimoine",
    "logo": {
      "@type": "ImageObject",
      "url": "https://calcpatrimoine.fr/logo.svg"
    }
  },
  "datePublished": "2026-04-18",
  "dateModified": "2026-04-18",
  "description": "Guide complet sur la fiscalité du rachat d'assurance-vie : règle proportionnelle, PFU vs IR, abattement 8 ans."
}
```

#### **Pour la FAQ** (déjà dans le code via `<details>`)

Google détecte automatiquement les FAQPage grâce aux balises `<details>` HTML.

---

## 📝 **7. Stratégie de contenu** {#strategie-contenu}

### **Mots-clés principaux par page**

#### **Calculateur Assurance-Vie** (`/assurance-vie`)
**Mots-clés cibles** :
- `calculateur assurance vie` (500 recherches/mois)
- `simulateur fiscalité assurance vie` (300/mois)
- `calcul impôt rachat assurance vie` (200/mois)

**Volume SEO attendu** : 150-200 visites/mois à 6 mois

---

#### **Article** (`/blog/assurance-vie-fiscalite-rachat`)
**Mots-clés longue traîne** :
- `règle proportionnelle assurance vie` (150/mois)
- `abattement 8 ans assurance vie` (200/mois)
- `pfu vs ir assurance vie` (180/mois)
- `versements avant 2017 assurance vie` (90/mois)
- `fiscalité rachat assurance vie` (400/mois)

**Volume SEO attendu** : 300-400 visites/mois à 6 mois

---

#### **FAQ** (`/faq/assurance-vie`)
**Mots-clés questions** :
- `comment calculer impôt rachat assurance vie` (100/mois)
- `quelle différence pfu ir assurance vie` (80/mois)
- `quand utiliser abattement 8 ans` (50/mois)

**Volume SEO attendu** : 100-150 visites/mois à 6 mois

---

### **Synergies SEO**

```
Google: "fiscalité rachat assurance vie"
  ↓
Position #3-5: Article blog (contenu long 5600 mots)
  ↓
Utilisateur clique, lit l'article
  ↓
CTA: "Calculez votre fiscalité" (2 fois dans l'article)
  ↓
Arrive sur /assurance-vie (calculateur)
  ↓
Utilise le calculateur
  ↓
CONVERSION ✅
```

---

## ✅ **8. Checklist finale** {#checklist}

### **Avant déploiement**

- [ ] Vérifier que toutes les pages ont un `<title>` unique
- [ ] Vérifier que toutes les pages ont une `<meta description>` unique
- [ ] Vérifier que le sitemap `/sitemap.xml` fonctionne
- [ ] Tester tous les liens internes (pas de 404)
- [ ] Vérifier la structure Hn (H1 unique par page)

### **Après déploiement (J+0)**

- [ ] Soumettre sitemap.xml à Google Search Console
- [ ] Demander indexation rapide pour les 3 nouvelles pages
- [ ] Vérifier que les pages s'affichent correctement sur mobile
- [ ] Tester la vitesse de chargement (PageSpeed Insights)

### **Suivi J+7**

- [ ] Vérifier dans GSC que les nouvelles URLs sont indexées
- [ ] Surveiller "Couverture" (aucune erreur 404)
- [ ] Surveiller "Performances" (premières impressions sur nouvelles requêtes)

### **Suivi J+30**

- [ ] Analyser positions sur mots-clés cibles
- [ ] Comparer trafic avant/après réorganisation
- [ ] Identifier opportunités d'amélioration (nouveaux mots-clés détectés)

### **Suivi J+90**

- [ ] Évaluer ROI SEO (trafic organique vs objectifs)
- [ ] Décider prochains calculateurs/articles à créer
- [ ] Optimiser pages sous-performantes

---

## 🎯 **Prévisions SEO à 6 mois**

### **Trafic organique attendu**

| Page | Trafic actuel | Trafic à 6 mois | Progression |
|------|---------------|-----------------|-------------|
| Homepage | 200/mois | 400/mois | +100% |
| Rente viagère | 300/mois | 450/mois | +50% |
| **Assurance-vie** | **0** | **150-200/mois** | **NOUVEAU** |
| **Article AV** | **0** | **300-400/mois** | **NOUVEAU** |
| **FAQ AV** | **0** | **100-150/mois** | **NOUVEAU** |
| **TOTAL** | **500/mois** | **1 400-1 600/mois** | **+180%** |

---

## 📈 **Quick Wins SEO immédiats**

### **1. Backlinks internes depuis articles existants**

Si vous avez d'autres contenus (LinkedIn, Medium, etc.), ajouter des liens vers :
- `https://calcpatrimoine.fr/assurance-vie`
- `https://calcpatrimoine.fr/blog/assurance-vie-fiscalite-rachat`

---

### **2. Partage social initial**

**LinkedIn** (votre profil) :

```
🚀 Nouveau calculateur en ligne : Fiscalité Assurance-Vie

Combien allez-vous VRAIMENT payer d'impôts sur un rachat ?

Le calculateur applique automatiquement :
✅ Règle proportionnelle
✅ Abattement 8 ans (4 600€ / 9 200€)
✅ Taux réduit versements avant 2017 (24,7%)
✅ Comparaison PFU vs IR

➡️ Gratuit, sans inscription, 100% confidentiel
https://calcpatrimoine.fr/assurance-vie

+ Article complet (5 600 mots) avec tous les cas concrets
https://calcpatrimoine.fr/blog/assurance-vie-fiscalite-rachat
```

**Bénéfice SEO** : Signaux sociaux + premiers backlinks + trafic initial.

---

### **3. Soumettre article à agrégateurs**

- **Hacker News** (si pertinent pour votre audience tech)
- **Reddit** r/vosfinances (communauté francophone patrimoine)
- **Forums patrimoine** (Boursorama, etc.)

**Attention** : Présenter comme ressource utile, pas spam publicitaire.

---

## 🔧 **Outils SEO recommandés**

### **Gratuits**

1. **Google Search Console** : Performances, indexation, erreurs
2. **Google Analytics** : Trafic, comportement utilisateurs
3. **PageSpeed Insights** : Vitesse de chargement
4. **Mobile-Friendly Test** : Compatibilité mobile

### **Payants (optionnels)**

1. **Ahrefs** (~99€/mois) : Analyse backlinks, mots-clés concurrents
2. **SEMrush** (~119€/mois) : Audit SEO, suivi positions
3. **Screaming Frog** (Gratuit < 500 URLs) : Crawl technique

---

## 📌 **Résumé en 5 actions**

1. ✅ **Déployer le site** avec la nouvelle architecture
2. ✅ **Soumettre `/sitemap.xml`** à Google Search Console
3. ✅ **Demander indexation rapide** des 3 nouvelles pages
4. ✅ **Publier sur LinkedIn** pour signaux sociaux initiaux
5. ✅ **Surveiller GSC à J+7** pour vérifier l'indexation

---

**Voilà ! Ton site est prêt pour décoller en SEO.** 🚀

**Questions ? Besoin de précisions sur une section ?** 📩
