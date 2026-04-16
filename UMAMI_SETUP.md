# 📊 Setup Umami Analytics - CalcPatrimoine

## ✅ Ce qui a été fait

Le code pour Umami Analytics est déjà dans `src/app/layout.tsx`.

**Il te reste juste à remplacer 2 valeurs.**

---

## 🔧 Configuration finale (2 minutes)

### Étape 1 : Trouve tes valeurs

Après avoir déployé Umami sur Vercel (étapes 1-3 du guide), tu auras :

1. **TON-UMAMI-DOMAINE** : L'URL de ton Umami sur Vercel
   - Exemple : `umami-analytics-abc123.vercel.app`
   - Tu la trouves dans Vercel après le déploiement

2. **TON-WEBSITE-ID** : L'ID unique de ton site
   - Exemple : `a1b2c3d4-e5f6-7890-abcd-ef1234567890`
   - Tu le trouves dans Umami → Settings → Websites → CalcPatrimoine → Edit

### Étape 2 : Remplace dans le code

Ouvre `src/app/layout.tsx` et trouve ces lignes (vers la ligne 95) :

```tsx
<Script
  async
  src="https://TON-UMAMI-DOMAINE.vercel.app/script.js"
  data-website-id="TON-WEBSITE-ID"
  strategy="afterInteractive"
/>
```

Remplace :
- `TON-UMAMI-DOMAINE` → ton domaine Vercel Umami
- `TON-WEBSITE-ID` → ton Website ID

**Exemple final** :
```tsx
<Script
  async
  src="https://umami-analytics-abc123.vercel.app/script.js"
  data-website-id="a1b2c3d4-e5f6-7890-abcd-ef1234567890"
  strategy="afterInteractive"
/>
```

### Étape 3 : Deploy

```bash
git add .
git commit -m "Add Umami analytics"
git push
```

Vercel va auto-deploy en 2-3 minutes.

---

## 🧪 Test

### Vérifier que ça marche

1. **Va sur ton site** : https://calcpatrimoine.fr
2. **Navigue un peu** (clique sur les tabs, etc.)
3. **Va sur ton dashboard Umami** : https://TON-UMAMI-DOMAINE.vercel.app
4. **Clique sur "CalcPatrimoine"**
5. Tu devrais voir **ta visite en temps réel** ! 🎉

### Données trackées

Umami track automatiquement :
- ✅ Pages vues
- ✅ Visiteurs uniques
- ✅ Durée de session
- ✅ Sources de trafic (Google, direct, etc.)
- ✅ Pays/Ville des visiteurs
- ✅ Devices (mobile/desktop)
- ✅ Navigateurs
- ✅ Pages les plus visitées

### Privacy

- ❌ **Pas de cookies** → Pas besoin de bannière RGPD
- ❌ **Pas de données personnelles** → RGPD compliant
- ✅ **Data stockée en EU** (Supabase Frankfurt)
- ✅ **Script léger** : 2 KB (vs 45 KB Google Analytics)

---

## 🎯 Dashboard Umami

### Métriques disponibles

**Real-time** :
- Visiteurs actuels en ligne
- Pages vues en temps réel

**Historique** :
- Visiteurs par jour/semaine/mois
- Pages les plus vues
- Taux de rebond
- Durée moyenne session

**Sources** :
- D'où viennent tes visiteurs (Google, Reddit, direct, etc.)
- Quels mots-clés (si trackés)

**Géographie** :
- Pays
- Villes

**Tech** :
- Navigateurs (Chrome, Safari, Firefox...)
- OS (Windows, macOS, iOS...)
- Devices (Desktop, Mobile, Tablet)

---

## 📈 Events personnalisés (optionnel)

Tu peux tracker des événements spécifiques :

### Exemple : Tracker les calculs

```tsx
// Dans RenteCalculator.tsx
import { trackEvent } from '@/lib/analytics'

const handleCalculate = () => {
  // Ton calcul...
  
  // Track l'événement
  if (window.umami) {
    window.umami.track('calcul_rente', {
      age: age,
      capital: capital,
      mode: 'standard'
    })
  }
}
```

### Exemple : Tracker les conversions

```tsx
// Quand quelqu'un va sur méthodologie
window.umami?.track('page_methodologie')

// Quand quelqu'un clique sur GitHub
window.umami?.track('click_github')
```

---

## 💰 Coûts

### Supabase (Database)
- **Plan Free** : 500 MB
- **Estimation CalcPatrimoine** : ~5-10 MB/mois
- **Capacité** : ~50 mois avant upgrade
- **Upgrade** : 25$/mois si besoin (mais pas avant longtemps)

### Vercel (Hosting Umami)
- **Plan Free** : 100 GB bandwidth/mois
- **Estimation** : Umami dashboard < 1 GB/mois
- **Illimité** dans le temps

**Total : 0€/mois pour au moins 1-2 ans** 🎉

---

## 🔄 Alternatives si besoin

### Si tu dépasses les limites gratuites (dans 1-2 ans)

**Option 1** : Upgrade Supabase (25$/mois)

**Option 2** : Migrer vers Plausible Cloud (9€/mois)

**Option 3** : Self-host sur VPS (3-5€/mois)

**Option 4** : Utiliser Google Analytics (gratuit mais cookies)

Mais pour l'instant, **tu es bon pour longtemps** !

---

## 📞 Support

### Ressources

- **Doc Umami** : https://umami.is/docs
- **GitHub** : https://github.com/umami-software/umami
- **Discord** : https://discord.gg/4dz4zcXYrQ

### Problèmes courants

**"Script ne charge pas"** :
- Vérifie l'URL du script (https://...)
- Vérifie le Website ID (UUID valide)
- Check la console navigateur (F12)

**"Pas de données"** :
- Attends 5-10 minutes (propagation)
- Vide le cache navigateur (Ctrl+Shift+R)
- Vérifie que le script charge (Network tab F12)

**"Database error"** :
- Vérifie la DATABASE_URL dans Vercel
- Check que Supabase est actif
- Redéploie Umami sur Vercel

---

## ✅ Checklist finale

Avant de push le code :

- [ ] Supabase créé et Database Password sauvegardé
- [ ] Umami déployé sur Vercel
- [ ] Website "CalcPatrimoine" créé dans Umami
- [ ] Website ID copié
- [ ] `layout.tsx` mis à jour avec les bonnes valeurs
- [ ] Code committé et pushé
- [ ] Site testé (ta visite apparaît dans Umami)

---

**Tu es prêt ! Deploy et profite de tes analytics gratuits 🚀**
