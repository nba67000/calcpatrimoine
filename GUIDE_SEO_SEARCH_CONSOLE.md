# Guide SEO - Google Search Console & Bing Webmaster Tools

## 🎯 Objectif
Indexer CalcPatrimoine sur Google et Bing pour maximiser la visibilité.

---

## 1️⃣ GOOGLE SEARCH CONSOLE

### Étape 1 : Créer un compte
1. Aller sur https://search.google.com/search-console
2. Se connecter avec un compte Google
3. Cliquer sur "Ajouter une propriété"

### Étape 2 : Choisir le type de propriété
**Option recommandée** : Propriété de domaine
- Entrer : `calcpatrimoine.fr`
- Avantage : couvre www ET non-www automatiquement

**Alternative** : Préfixe d'URL
- Entrer : `https://calcpatrimoine.fr`
- Inconvénient : doit ajouter séparément www.calcpatrimoine.fr

### Étape 3 : Vérification de propriété

#### Méthode 1 : Balise HTML (recommandée)
Google va fournir un code comme :
```html
<meta name="google-site-verification" content="ABC123XYZ..." />
```

**À faire** :
1. Copier le code `ABC123XYZ...`
2. Ouvrir `src/app/layout.tsx`
3. Remplacer dans metadata :
```tsx
verification: {
  google: 'ABC123XYZ...', // ⬅️ Coller ici
},
```
4. Déployer sur Vercel/production
5. Retourner sur Search Console → Cliquer "Vérifier"

#### Méthode 2 : Fichier HTML (alternative)
1. Télécharger `googleXXX.html`
2. Placer dans `public/googleXXX.html`
3. Déployer
4. Vérifier : `https://calcpatrimoine.fr/googleXXX.html` accessible
5. Cliquer "Vérifier" dans Search Console

#### Méthode 3 : DNS TXT (si accès DNS)
1. Ajouter enregistrement TXT dans DNS :
   - Nom : `@` ou vide
   - Valeur : `google-site-verification=ABC123...`
2. Attendre propagation DNS (jusqu'à 48h)
3. Cliquer "Vérifier"

### Étape 4 : Soumettre le sitemap
1. Dans Search Console → Menu "Sitemaps"
2. Ajouter le sitemap : `https://calcpatrimoine.fr/sitemap.xml`
3. Cliquer "Envoyer"

**Résultat attendu** :
- Statut : Réussite
- Pages découvertes : 7 URLs

### Étape 5 : Demander l'indexation manuelle (optionnel)
Pour accélérer l'indexation de la page d'accueil :
1. Menu "Inspection de l'URL"
2. Entrer : `https://calcpatrimoine.fr`
3. Cliquer "Demander une indexation"

### Étape 6 : Monitoring
**Outils à surveiller** :
- **Performances** : impressions, clics, CTR, position moyenne
- **Couverture** : pages indexées vs erreurs
- **Ergonomie mobile** : problèmes d'affichage mobile
- **Expérience** : Core Web Vitals (LCP, FID, CLS)

**Délai indexation** : 3-7 jours en moyenne

---

## 2️⃣ BING WEBMASTER TOOLS

### Étape 1 : Créer un compte
1. Aller sur https://www.bing.com/webmasters
2. Se connecter avec compte Microsoft (ou créer)
3. Cliquer "Ajouter un site"

### Étape 2 : Importer depuis Google (FACILE !)
**Option recommandée si Search Console configuré** :
1. Choisir "Importer depuis Google Search Console"
2. Autoriser l'accès Bing → Google
3. Sélectionner `calcpatrimoine.fr`
4. Tout est importé automatiquement ! ✅

### Étape 3 : Vérification manuelle (si pas Google)
**Méthode 1 : Balise HTML**
```html
<meta name="msvalidate.01" content="XYZ123..." />
```
→ Ajouter dans `src/app/layout.tsx` :
```tsx
verification: {
  google: '...',
  // bing: 'XYZ123...', // Bing ne supporte pas encore via Next.js metadata
}
```
→ Alternative : Ajouter dans `<head>` via composant custom

**Méthode 2 : Fichier XML**
1. Télécharger `BingSiteAuth.xml`
2. Placer dans `public/BingSiteAuth.xml`
3. Vérifier accessible : `https://calcpatrimoine.fr/BingSiteAuth.xml`

**Méthode 3 : DNS CNAME**
1. Ajouter enregistrement CNAME :
   - Nom : fourni par Bing
   - Valeur : fourni par Bing
2. Attendre propagation DNS

### Étape 4 : Soumettre le sitemap
1. Menu "Sitemaps"
2. Ajouter : `https://calcpatrimoine.fr/sitemap.xml`
3. Cliquer "Envoyer"

### Étape 5 : Soumettre l'URL manuellement
1. Menu "Envoyer les URL"
2. Entrer : `https://calcpatrimoine.fr`
3. Limite : 10 URLs/jour (gratuit) ou 10 000/jour (avec API key)

### Étape 6 : Monitoring Bing
**Outils similaires à Google** :
- Performances des recherches
- Exploration (crawl)
- Rapport SEO (recommandations)
- Ergonomie mobile

**Délai indexation** : 5-14 jours en moyenne

---

## 3️⃣ CHECKLIST POST-CONFIGURATION

### Vérifications immédiates
- [ ] Sitemap accessible : https://calcpatrimoine.fr/sitemap.xml
- [ ] Robots.txt accessible : https://calcpatrimoine.fr/robots.txt
- [ ] Balises de vérification présentes dans le code source
- [ ] Code de vérification Google dans `layout.tsx`

### Vérifications hebdomadaires (1er mois)
- [ ] Pages indexées (Google Search Console)
- [ ] Pages indexées (Bing Webmaster)
- [ ] Erreurs d'exploration
- [ ] Core Web Vitals
- [ ] Requêtes de recherche

### Optimisations continues
- [ ] Ajouter contenu blog/guides (si applicable)
- [ ] Mettre à jour sitemap si nouvelles pages
- [ ] Surveiller position mots-clés cibles :
  - "calculateur rente viagère"
  - "calcul rente viagère gratuit"
  - "tables mortalité INSEE"
  - "simulateur viager"

---

## 4️⃣ MOTS-CLÉS CIBLES

### Primaires (forte concurrence)
- calculateur rente viagère
- calcul rente viagère
- rente viagère calcul gratuit
- simulateur rente viagère

### Secondaires (moyenne concurrence)
- tables mortalité INSEE 2022
- espérance de vie calcul
- viager calcul
- réversion rente viagère

### Longue traîne (faible concurrence)
- calculateur rente viagère gratuit sans inscription
- rente viagère couple réversion
- calcul capital pour rente viagère
- optimisation rente viagère couple

---

## 5️⃣ OUTILS COMPLÉMENTAIRES

### Analytics & Monitoring
- ✅ Plausible Analytics (déjà configuré demain)
- Google Analytics 4 (optionnel, mais + complexe RGPD)
- Hotjar (heatmaps comportement utilisateur)

### SEO Tools
- **Google PageSpeed Insights** : https://pagespeed.web.dev/
  - Vérifier : https://pagespeed.web.dev/?url=https://calcpatrimoine.fr
- **Schema Markup Validator** : https://validator.schema.org/
  - Tester JSON-LD une fois déployé
- **Rich Results Test** : https://search.google.com/test/rich-results
  - Vérifier affichage enrichi Google

### Backlinks & Autorité
- Ahrefs (payant, excellent)
- Ubersuggest (freemium)
- Moz Link Explorer (freemium)

---

## 6️⃣ TIMELINE RÉALISTE

### Jour 1 (aujourd'hui)
- [x] Sitemap.xml créé
- [x] Robots.txt créé
- [x] Schema.org ajouté
- [x] Open Graph optimisé
- [ ] Déployer sur production

### Jour 2
- [ ] Créer compte Google Search Console
- [ ] Vérifier propriété domaine
- [ ] Soumettre sitemap
- [ ] Créer compte Bing Webmaster (import Google)

### Semaine 1
- [ ] Vérifier indexation pages clés
- [ ] Corriger erreurs éventuelles
- [ ] Créer image OG (og-image.png)

### Semaine 2-4
- [ ] Surveiller Core Web Vitals
- [ ] Analyser premières requêtes
- [ ] Identifier opportunités mots-clés

### Mois 2-3
- [ ] Optimiser contenu selon données
- [ ] Créer contenu blog (optionnel)
- [ ] Construire backlinks (forum, annuaires)

---

## 7️⃣ ACTIONS PRIORITAIRES DEMAIN MATIN

1. **Déployer la version avec SEO** sur production
2. **Google Search Console** :
   - Créer compte
   - Vérifier domaine (balise HTML)
   - Soumettre sitemap
3. **Bing Webmaster** :
   - Import depuis Google (5 min)
4. **Vérifications** :
   - https://calcpatrimoine.fr/sitemap.xml → OK
   - https://calcpatrimoine.fr/robots.txt → OK
   - Code source → balise verification présente
5. **Plausible Analytics** (ta tâche déjà prévue)

---

## 📞 SUPPORT

Si problèmes :
- Forum Google Search Console : https://support.google.com/webmasters/community
- Documentation Next.js SEO : https://nextjs.org/learn/seo/introduction-to-seo

---

**Temps total configuration** : ~30-45 minutes
**Résultats visibles** : 1-2 semaines
**Impact SEO plein** : 2-3 mois

Bon courage ! 🚀
