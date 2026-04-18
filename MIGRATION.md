# 🔄 Migration Option A - Architecture Multi-Calculateurs

## 📋 Vue d'ensemble

Cette migration transforme CalcPatrimoine d'un site mono-calculateur vers une architecture scalable multi-calculateurs.

### Avant
```
/ → Calculateur rente viagère directement
```

### Après
```
/ → Homepage hub avec tous les calculateurs
/rente-viagere → Calculateur rente viagère
/assurance-vie → Calculateur assurance-vie
```

---

## 🚀 Instructions migration

### Option 1 : Script automatique (recommandé)

```bash
# Depuis la racine du projet
./migrate.sh
```

Le script va :
1. ✅ Backup l'ancienne homepage
2. ✅ Créer `/rente-viagere` avec le calculateur actuel
3. ✅ Activer la nouvelle homepage hub
4. ✅ Mettre à jour navigation et sitemap

---

### Option 2 : Migration manuelle

Si tu préfères faire étape par étape :

#### 1. Backup
```bash
cp src/app/page.tsx src/app/page.tsx.backup
```

#### 2. Créer dossier rente-viagere
```bash
mkdir -p src/app/rente-viagere
cp src/app/page.tsx src/app/rente-viagere/page.tsx
```

#### 3. Activer nouvelle homepage
```bash
mv src/app/page-new.tsx src/app/page.tsx
```

#### 4. Test local
```bash
npm run dev
```

Vérifier :
- `http://localhost:3000` → Homepage hub
- `http://localhost:3000/rente-viagere` → Calculateur rente

---

## ✅ Fichiers modifiés

| Fichier | Modification |
|---------|-------------|
| `src/app/page.tsx` | Nouvelle homepage hub |
| `src/app/rente-viagere/page.tsx` | Calculateur rente (ancien /) |
| `src/components/Header.tsx` | Navigation mise à jour |
| `src/app/sitemap.ts` | SEO multi-calculateurs |

---

## 🧪 Checklist validation

Après migration, vérifier :

- [ ] Homepage s'affiche correctement
- [ ] Lien "Rente Viagère" fonctionne
- [ ] Calculateur rente viagère fonctionne (ancien /)
- [ ] Navigation Header mise à jour
- [ ] Liens blog fonctionnent
- [ ] Footer fonctionne
- [ ] Mobile responsive OK

---

## 🔙 Rollback (si problème)

Si un problème survient :

```bash
# Restaurer l'ancienne homepage
cp src/app/page.tsx.backup src/app/page.tsx

# Supprimer le dossier rente-viagere
rm -rf src/app/rente-viagere

# Redémarrer dev
npm run dev
```

---

## 📦 Prochaines étapes

Après validation migration :

1. ✅ Créer calculateur assurance-vie
2. ✅ Déployer sur Lovable
3. ✅ Tester production
4. ✅ Soumettre nouveau sitemap à Google

---

## ❓ FAQ

**Q : Les anciennes URLs vont casser ?**  
R : Non. L'ancienne homepage (`/`) devient hub. Le calculateur est maintenant sur `/rente-viagere`.

**Q : Faut-il faire une redirection 301 ?**  
R : Pas nécessaire car c'est une nouvelle feature, pas un déplacement de contenu existant indexé.

**Q : Et pour Google Search Console ?**  
R : Soumettre le nouveau sitemap après déploiement.

---

**Prêt à migrer ? Exécute `./migrate.sh` ! 🚀**
