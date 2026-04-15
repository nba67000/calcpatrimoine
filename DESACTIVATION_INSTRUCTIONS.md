# 🛑 DÉSACTIVATION TEMPORAIRE CALCPATRIMOINE

## MÉTHODE RECOMMANDÉE : Vercel Dashboard (30 secondes)

### Étape 1 : Connexion
```
https://vercel.com
```

### Étape 2 : Trouver projet
- Cliquer sur "calcpatrimoine"

### Étape 3 : Protection par mot de passe
1. Aller dans **Settings**
2. Cliquer **Deployment Protection**
3. Activer **"Password Protection"**
4. Définir mot de passe temporaire : `maintenance2026`
5. **Save**

✅ **Résultat** : Site demande mot de passe à tous les visiteurs

---

## ALTERNATIVE 1 : Page maintenance rapide

### Si tu veux une vraie page "En maintenance"

1. **Sauvegarder page actuelle** :
```bash
cd calcpatrimoine-main/src/app
mv page.tsx page.BACKUP.tsx
```

2. **Copier page maintenance** :
```bash
cp ../../MAINTENANCE_PAGE.tsx page.tsx
```

3. **Deploy** :
```bash
git add .
git commit -m "maintenance temporaire"
git push
```

4. **Quand tu as fini** :
```bash
mv page.BACKUP.tsx page.tsx
git add .
git commit -m "retour en ligne"
git push
```

---

## ALTERNATIVE 2 : Supprimer domaine temporairement

### Dans Vercel Dashboard

1. **Settings → Domains**
2. Cliquer sur `calcpatrimoine.fr`
3. **Remove domain**

✅ Site devient inaccessible via calcpatrimoine.fr
✅ Reste accessible via URL Vercel (xxx.vercel.app)

4. **Quand fini, re-ajouter le domaine**

---

## ⏱️ COMBIEN DE TEMPS ?

- **Vercel Password Protection** : 30 secondes
- **Page maintenance** : 5 minutes
- **Remove domain** : 1 minute

**Je recommande : Password Protection** (le plus simple)

---

## 🔄 RÉACTIVER LE SITE

### Si Password Protection :
1. Settings → Deployment Protection
2. Désactiver "Password Protection"
3. Save

### Si page maintenance :
```bash
mv page.BACKUP.tsx page.tsx
git push
```

### Si domain removed :
1. Settings → Domains
2. Add domain : calcpatrimoine.fr
3. Confirmer DNS

---

**Quelle méthode préfères-tu ?**
