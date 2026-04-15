# 🔄 RÉACTIVATION DU SITE

## ✅ Quand tes modifications sont terminées

### Étape 1 : Restaurer page de production

```bash
cd calcpatrimoine-main/src/app
rm page.tsx
mv page.PRODUCTION.tsx page.tsx
```

### Étape 2 : Vérifier que tout compile

```bash
npm run build
```

**Résultat attendu** : ✅ Build réussi sans erreur

### Étape 3 : Deploy

```bash
git add .
git commit -m "feat: migration unisexe + pages légales complètes"
git push
```

**OU via Vercel CLI** :
```bash
vercel --prod
```

---

## ⏱️ Timeline

1. **Maintenant** : Site en maintenance (page visible)
2. **Dans 30-45 min** : Tes modifications terminées
3. **Restauration** : 2 minutes (commandes ci-dessus)
4. **Site en ligne** : Avec toutes les améliorations !

---

## 📋 Checklist avant réactivation

- [ ] Tous les disclaimers ajoutés
- [ ] Pages légales complètes (mentions, CGU, confidentialité)
- [ ] `npm run build` sans erreur
- [ ] Tests manuels des 3 calculateurs
- [ ] Article blog prêt à publier

---

## 🚨 En cas de problème

Si le build ne passe pas après restauration :

```bash
# Revenir à la maintenance
cp page.tsx page.FAILED.tsx
cp page.PRODUCTION.tsx page.tsx
git push
# Debug le problème tranquillement
```

---

**Bon courage pour les modifications ! 💪**
