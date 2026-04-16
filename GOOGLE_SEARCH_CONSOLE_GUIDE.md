# 🔍 Google Search Console - Guide Complet CalcPatrimoine

## 🎯 Objectif

Configurer Google Search Console pour :
1. Soumettre le sitemap
2. Suivre l'indexation
3. Voir les performances SEO
4. Détecter les erreurs

**Temps requis** : 10 minutes

---

## Étape 1 : Créer un compte Search Console

### 1.1 Aller sur Search Console

🔗 **URL** : [https://search.google.com/search-console](https://search.google.com/search-console)

### 1.2 Ajouter une propriété

1. Clic sur **"Ajouter une propriété"**
2. Choisir **"Préfixe d'URL"** (recommandé)
3. Entre : `https://calcpatrimoine.fr`
4. Clic **"Continuer"**

---

## Étape 2 : Vérifier la propriété

Google propose plusieurs méthodes. La **plus simple** : Balise HTML.

### Méthode 1 : Balise HTML (recommandée)

#### 2.1 Récupérer le code

Google te donne un code comme :
```html
<meta name="google-site-verification" content="ABC123DEF456..." />
```

Copie la partie **`ABC123DEF456...`** (ton code unique).

#### 2.2 Ajouter dans layout.tsx

**Fichier** : `src/app/layout.tsx`

**Chercher la ligne** :
```tsx
verification: {
  google: 'VOTRE_CODE_GOOGLE_SEARCH_CONSOLE', // À remplacer
```

**Remplacer par** :
```tsx
verification: {
  google: 'ABC123DEF456...', // ← Ton code ici
```

**Exemple complet** :
```tsx
verification: {
  google: 'mXyZ123AbC456DeF789GhI012JkL345', // Ton code unique
  yandex: 'VOTRE_CODE_YANDEX', // Optionnel
},
```

#### 2.3 Déployer

```bash
git add src/app/layout.tsx
git commit -m "feat: add Google Search Console verification"
git push
```

Attends 2-3 minutes (déploiement Vercel/Netlify).

#### 2.4 Vérifier dans Search Console

Retourne sur Search Console → Clic **"Vérifier"**.

✅ Si succès : "Propriété vérifiée"

---

### Méthode 2 : Fichier HTML (alternative)

Si tu préfères un fichier :

1. Google te donne un fichier `google123abc.html`
2. Place-le dans `public/google123abc.html`
3. Déploie
4. Vérifie l'URL : `https://calcpatrimoine.fr/google123abc.html`
5. Retourne Search Console → "Vérifier"

---

### Méthode 3 : DNS (pour experts)

Ajouter un enregistrement TXT chez ton hébergeur DNS (OVH, Cloudflare, etc.).

---

## Étape 3 : Soumettre le sitemap

### 3.1 Aller dans Sitemaps

Menu gauche → **"Sitemaps"**

### 3.2 Ajouter le sitemap

Dans le champ "Ajouter un sitemap" :

```
sitemap.xml
```

Clic **"Envoyer"**.

### 3.3 Vérification

**État attendu** :
```
✅ Réussite
6 URL détectées
Dernière lecture : [date du jour]
```

**Erreur possible** :
```
❌ Sitemap inaccessible
```

**Solution** : Vérifie que `https://calcpatrimoine.fr/sitemap.xml` est accessible.

---

## Étape 4 : Demander l'indexation manuelle

### 4.1 Outil Inspection d'URL

Menu haut → **Barre de recherche** → Entre :
```
https://calcpatrimoine.fr
```

### 4.2 Demander l'indexation

Résultat : "L'URL n'est pas dans l'index Google"

Clic **"Demander une indexation"**

Attends 1-2 minutes (Google crawle la page).

### 4.3 Répéter pour les pages importantes

Fais pareil pour :
- `https://calcpatrimoine.fr/blog`
- `https://calcpatrimoine.fr/blog/rente-viagere-seuil-rentabilite`
- `https://calcpatrimoine.fr/faq`

---

## Étape 5 : Vérifier l'indexation (J+7)

### Test rapide

Dans Google, cherche :
```
site:calcpatrimoine.fr
```

**Résultat attendu (J+7)** :
```
6 résultats environ
- calcpatrimoine.fr
- calcpatrimoine.fr/blog
- calcpatrimoine.fr/blog/rente-viagere...
- calcpatrimoine.fr/faq
- calcpatrimoine.fr/methodologie
- calcpatrimoine.fr/a-propos
```

---

## 📊 Fonctionnalités Search Console

### Vue d'ensemble

- **Performances** : Clics, impressions, CTR, position moyenne
- **Couverture** : Pages indexées, erreurs
- **Améliorations** : Ergonomie mobile, Core Web Vitals
- **Liens** : Backlinks externes et internes

### Performances (après 28 jours)

Tu verras :
- **Requêtes** : "calculateur rente viagère", "rente viagère calcul", etc.
- **Pages** : Quelles pages génèrent du trafic
- **Pays** : France (normalement)
- **Appareils** : Mobile vs Desktop

### Couverture

**Pages valides** : Vert ✅
```
Envoyées et indexées : 6
```

**Erreurs possibles** :
- 404 Not Found → Répare les liens cassés
- Bloqué par robots.txt → Vérifie robots.txt
- Exclues par balise noindex → Retire noindex

### Améliorations

**Ergonomie mobile** : Google teste si ton site est mobile-friendly.

**Core Web Vitals** : Vitesse de chargement, stabilité visuelle.

**Objectif** : Tout en vert.

---

## 🎯 Timeline indexation

### J+0 (Aujourd'hui)
- [x] Créer compte Search Console
- [x] Vérifier propriété (balise HTML)
- [x] Soumettre sitemap.xml
- [x] Demander indexation pages principales

### J+1-3
- [ ] Première visite Googlebot (visible dans "Couverture")

### J+7
- [ ] Tester `site:calcpatrimoine.fr` dans Google
- [ ] Vérifier 6 pages indexées

### J+14
- [ ] Premières impressions dans "Performances"
- [ ] Vérifier requêtes de recherche

### J+28
- [ ] Analyser performances SEO
- [ ] Ajuster titres/descriptions si besoin

---

## 🔧 Debug : Problèmes courants

### Problème 1 : Propriété non vérifiée

**Erreur** : "Impossible de vérifier la propriété"

**Solutions** :
1. Vérifie que le code est bien dans `layout.tsx`
2. Redéploie le site
3. Attends 5 minutes
4. Vide cache navigateur (Ctrl+Shift+R)
5. Teste `view-source:https://calcpatrimoine.fr` → Cherche `google-site-verification`

### Problème 2 : Sitemap non détecté

**Erreur** : "Sitemap inaccessible"

**Solutions** :
1. Teste `https://calcpatrimoine.fr/sitemap.xml` dans le navigateur
2. Vérifie `robots.txt` : doit contenir `Sitemap: https://calcpatrimoine.fr/sitemap.xml`
3. Attends 24h
4. Resoumets le sitemap

### Problème 3 : Pages non indexées après 14 jours

**Causes** :
- Site trop récent (patience)
- Contenu dupliqué
- Problème technique (404, 500)

**Solutions** :
1. Vérifie "Couverture" dans Search Console
2. Lis les erreurs spécifiques
3. Corrige les erreurs
4. Demande réindexation manuelle

---

## 🎓 Bonnes pratiques

### 1. Suivi régulier

Connecte-toi **1x par semaine** :
- Vérifier nouvelles erreurs
- Analyser requêtes performantes
- Optimiser pages faibles

### 2. Alertes email

Search Console → Paramètres → **Activer notifications email** pour :
- Problèmes d'indexation
- Pénalités manuelles
- Nouveaux backlinks

### 3. Optimisation continue

Si une requête génère des impressions mais peu de clics :
- Améliore le titre/description
- Ajoute du contenu sur le sujet

### 4. Mobile-first

90% du trafic sera mobile → Teste toujours sur téléphone.

---

## 📈 Objectifs à 3 mois

### Indexation
- ✅ 6+ pages indexées
- ✅ 0 erreur critique

### Trafic
- 🎯 50-200 impressions/semaine
- 🎯 5-20 clics/semaine
- 🎯 CTR > 3%

### Requêtes
- "calculateur rente viagère"
- "rente viagère calcul"
- "seuil rentabilité rente viagère"
- "CalcPatrimoine"

### Position moyenne
- 🎯 Top 10 sur "calculateur rente viagère gratuit"
- 🎯 Top 20 sur "rente viagère calcul"

---

## 🔗 Ressources

**Google Search Console** :
- [Guide officiel](https://support.google.com/webmasters/answer/9128668)
- [Aide vérification](https://support.google.com/webmasters/answer/9008080)
- [Soumettre sitemap](https://support.google.com/webmasters/answer/183668)

**Outils complémentaires** :
- [Google Analytics](https://analytics.google.com) (trafic détaillé)
- [Plausible](https://plausible.io) (analytics simple, déjà configuré)
- [Ubersuggest](https://neilpatel.com/ubersuggest/) (recherche mots-clés)

---

## ✅ Checklist complète

### Setup initial
- [ ] Compte Search Console créé
- [ ] Propriété `https://calcpatrimoine.fr` ajoutée
- [ ] Balise vérification dans `layout.tsx`
- [ ] Site déployé
- [ ] Propriété vérifiée ✅
- [ ] Sitemap soumis
- [ ] Pages principales indexées manuellement

### Suivi (J+7)
- [ ] Test `site:calcpatrimoine.fr` dans Google
- [ ] 6 pages indexées visible
- [ ] Aucune erreur critique

### Optimisation (J+14)
- [ ] Premières requêtes visibles
- [ ] Analyse CTR par page
- [ ] Ajustements titres si besoin

### Maintenance (mensuel)
- [ ] Vérifier nouvelles erreurs
- [ ] Analyser requêtes top 10
- [ ] Optimiser pages faibles CTR

---

**Une fois configuré, Search Console est automatique. Tu reçois des emails si problème ! 🚀**
