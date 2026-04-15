# 🛑 Page de Maintenance - Guide d'utilisation

## 📁 Emplacement

```
maintenance/
├── maintenance-page.tsx    ← Page de maintenance complète
└── README.md              ← Ce fichier
```

---

## 🎯 Quand l'utiliser

Utilise cette page quand tu dois :
- Faire des mises à jour importantes du code
- Migrer la base de données
- Corriger un bug critique en production
- Effectuer de la maintenance serveur
- Faire des changements qui cassent temporairement le site

**Durée recommandée** : 30 min - 2h max (au-delà, les utilisateurs s'impatientent)

---

## 🚀 Activation rapide (2 min)

### Étape 1 : Sauvegarder page actuelle

```bash
cd src/app
cp page.tsx page.BACKUP.tsx
```

### Étape 2 : Activer maintenance

```bash
cp ../../maintenance/maintenance-page.tsx page.tsx
```

### Étape 3 : Personnaliser message (optionnel)

Modifier dans `page.tsx` :

```typescript
// Durée estimée
const estimatedReturnTime = new Date(Date.now() + 45 * 60 * 1000) // +45 min
// Change 45 par durée souhaitée en minutes

// Message des nouveautés (ligne ~58)
<li className="flex items-start gap-2">
  <span className="text-blue-600 mt-0.5">✓</span>
  <span>TON MESSAGE ICI</span>
</li>
```

### Étape 4 : Déployer

```bash
git add src/app/page.tsx
git commit -m "maintenance: activation page temporaire"
git push
```

✅ **Site en maintenance !**

---

## 🔄 Désactivation (retour normal)

### Quand maintenance terminée

```bash
cd src/app
rm page.tsx
mv page.BACKUP.tsx page.tsx
git add page.tsx
git commit -m "maintenance: site réactivé"
git push
```

✅ **Site de retour en ligne !**

---

## 🎨 Personnalisation avancée

### Changer durée estimée

```typescript
// 30 minutes
const estimatedReturnTime = new Date(Date.now() + 30 * 60 * 1000)

// 1 heure
const estimatedReturnTime = new Date(Date.now() + 60 * 60 * 1000)

// 2 heures
const estimatedReturnTime = new Date(Date.now() + 120 * 60 * 1000)
```

### Changer titre/message

```typescript
// Ligne ~45
<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
  Mise à jour en cours  {/* ← Change ici */}
</h2>

// Ligne ~49
<p className="text-lg text-gray-600 mb-6 max-w-xl mx-auto">
  CalcPatrimoine est temporairement indisponible...  {/* ← Change ici */}
</p>
```

### Changer liste nouveautés

Remplace le bloc ligne ~58-80 :

```typescript
<ul className="text-sm text-blue-800 space-y-2 text-left max-w-md mx-auto">
  <li className="flex items-start gap-2">
    <span className="text-blue-600 mt-0.5">✓</span>
    <span>Correction bug calcul réversion</span>
  </li>
  <li className="flex items-start gap-2">
    <span className="text-blue-600 mt-0.5">✓</span>
    <span>Amélioration performance</span>
  </li>
  {/* Ajoute autant que nécessaire */}
</ul>
```

---

## ⚡ Activation ultra-rapide (script bash)

Créer un script `activate-maintenance.sh` :

```bash
#!/bin/bash

echo "🛑 Activation page maintenance..."

cd src/app
cp page.tsx page.BACKUP.tsx
cp ../../maintenance/maintenance-page.tsx page.tsx

git add page.tsx
git commit -m "maintenance: activation"
git push

echo "✅ Page maintenance activée !"
echo "⏱️  Pour désactiver : ./deactivate-maintenance.sh"
```

Créer un script `deactivate-maintenance.sh` :

```bash
#!/bin/bash

echo "🔄 Désactivation page maintenance..."

cd src/app
rm page.tsx
mv page.BACKUP.tsx page.tsx

git add page.tsx
git commit -m "maintenance: désactivation"
git push

echo "✅ Site réactivé !"
```

**Utilisation** :

```bash
chmod +x activate-maintenance.sh deactivate-maintenance.sh
./activate-maintenance.sh    # Active
./deactivate-maintenance.sh  # Désactive
```

---

## 📋 Checklist avant activation

- [ ] Prévenir les utilisateurs à l'avance (email, Twitter, etc.) si possible
- [ ] Choisir heure creuse (tôt le matin, tard le soir)
- [ ] Estimer durée réaliste (ajouter 50% de marge)
- [ ] Sauvegarder page actuelle (`page.BACKUP.tsx`)
- [ ] Personnaliser message si nécessaire
- [ ] Tester en local avant (`npm run dev`)
- [ ] Déployer

---

## 🚨 En cas d'urgence

Si tu dois activer la maintenance immédiatement sans personnalisation :

```bash
# 1 seule commande
cp maintenance/maintenance-page.tsx src/app/page.tsx && git add . && git commit -m "maintenance" && git push
```

---

## 💡 Bonnes pratiques

### ✅ À faire
- Activer maintenance AVANT de commencer les modifs critiques
- Donner une durée estimée réaliste
- Laisser email de contact accessible
- Tester la page en local avant de déployer
- Documenter ce que tu fais pendant la maintenance

### ❌ À éviter
- Maintenance > 2 heures (frustrant pour utilisateurs)
- Message vague type "Bientôt de retour" sans durée
- Activer maintenance pour petits changements (utilise Vercel preview)
- Oublier de désactiver après (ça arrive !)

---

## 🎯 Exemples messages selon situation

### Bug critique
```typescript
<h2>Correction en cours</h2>
<p>
  Nous corrigeons actuellement un bug affectant le calcul de réversion. 
  Le site sera de retour très prochainement.
</p>
```

### Mise à jour majeure
```typescript
<h2>Mise à jour importante</h2>
<p>
  Nous déployons de nouvelles fonctionnalités qui nécessitent une 
  interruption temporaire du service.
</p>
```

### Migration base de données
```typescript
<h2>Migration en cours</h2>
<p>
  Nous mettons à jour nos tables de données pour améliorer les performances. 
  Cette opération prendra environ 1 heure.
</p>
```

---

## 📊 Statistiques utilisation

**Garde une trace** dans ce fichier :

```
[2026-04-15] Durée : 45 min - Raison : Migration table unisexe
[Date]       Durée : XX min - Raison : ...
```

Cela t'aidera à :
- Estimer mieux les prochaines durées
- Voir si tu fais trop souvent de la maintenance
- Communiquer de façon transparente avec utilisateurs

---

## 🔗 Ressources

- Page actuelle : `src/app/page.tsx`
- Page maintenance : `maintenance/maintenance-page.tsx`
- Backup : `src/app/page.BACKUP.tsx` (créé automatiquement)

---

**La page est maintenant sauvegardée et réutilisable à l'infini ! 🎉**
