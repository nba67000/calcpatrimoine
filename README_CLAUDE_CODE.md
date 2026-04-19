# Utiliser Claude Code sur calcpatrimoine

Guide pratique pour Nicolas. À lire une fois, à garder sous la main.

---

## 1. Installation (une fois)

### Prérequis

- Node.js ≥ 20 (déjà le cas, tu es sur Next 16).
- Un compte Claude.ai Pro (c'est ton cas).

### Installer Claude Code

```bash
npm install -g @anthropic-ai/claude-code
```

Au premier lancement, il te demandera de te connecter à ton compte Anthropic.
Choisis **l'option "Claude Pro / Max subscription"** pour utiliser ton
abonnement existant plutôt que l'API facturée à l'usage.

**Note** : avant de lancer pour la première fois, vérifie la doc officielle
— l'outil évolue vite. Page à consulter :
`https://docs.claude.com/en/docs/claude-code/overview`.

---

## 2. Lancement d'une session

### Dans le repo calcpatrimoine

```bash
cd ~/chemin/vers/calcpatrimoine
claude
```

Claude Code lit automatiquement `CLAUDE.md` à la racine. Tu n'as rien à
injecter manuellement.

### Première commande utile

Quand la session démarre, tape simplement :

```
/nouveau-calculateur
```

Il va :
1. Lire `BACKLOG.md`.
2. Prendre le premier `todo` priorité P1.
3. Rechercher les sources légales.
4. Créer types + lib + composant + page + sources.
5. Lancer type-check / lint / build.
6. Commiter.
7. S'arrêter en te disant ce qu'il a fait.

Relire le commit, tester en `npm run dev`, pousser quand tu es content.

---

## 3. Commandes disponibles

| Commande | Effet |
|----------|-------|
| `/nouveau-calculateur` | Implémente **un** calculateur de bout en bout depuis la backlog. |
| `/mode-autonome` | Enchaîne jusqu'à 3 calculateurs avec pauses de contrôle. |
| `/verif-sources` | Audit des sources légales existantes (à lancer ~chaque trimestre). |
| `/init` | Commande native de Claude Code (re-scanne le repo, rafraîchit le contexte). |
| `/help` | Liste les commandes natives. |
| `/compact` | Compacte la conversation si elle devient longue (géré automatiquement sinon). |

---

## 4. Bonnes pratiques au quotidien

### Avant une session

- `git status` : être sur une branche propre.
- Éventuellement créer une branche dédiée : `git checkout -b feat/calc-tmi`.
- Ouvrir `BACKLOG.md` dans ton éditeur pour suivre en parallèle.

### Pendant

- Claude Code te demande confirmation avant chaque modification de fichier.
  **Relis systématiquement** les diffs la première semaine — c'est comme ça
  que tu calibres ta confiance.
- Si une réponse commence à dériver (verbeuse, hors-sujet, bug qui tourne en
  boucle), utilise `Esc` pour interrompre et reformule.
- Si tu veux que Claude Code **teste manuellement** un calculateur : demande-lui
  explicitement "lance npm run dev et dis-moi si ça compile" — il sait le faire.

### Après

- `git log --oneline -10` pour voir ce qui a été commité.
- `npm run dev` et tester le calculateur toi-même sur 2-3 cas.
- Si tout est bon : `git push`.
- Si un détail cloche : tu peux soit corriger à la main, soit relancer une
  session `claude` et lui demander "corrige <X> dans le calculateur <slug>".

---

## 5. Gestion du budget Claude Pro

Ton abonnement Pro inclut Claude Code avec des limites d'usage qui se
réinitialisent toutes les 5 heures. Quelques repères :

- Un calculateur complet consomme, d'expérience, entre **10 et 30 %** d'une
  fenêtre de 5h selon sa complexité.
- Si tu atteins la limite, l'outil te le dira et tu pourras simplement attendre
  la prochaine réinitialisation.
- **Les chiffres exacts de limites évoluent** — consulte la page tarifs
  Anthropic si besoin, je n'invente rien ici.

### Économiser des tokens

- Lance `/compact` si la conversation devient très longue (>50 échanges) avant
  de donner une nouvelle grosse tâche.
- Préfère `/nouveau-calculateur` à des prompts libres : il est cadré, donc
  court et efficace.
- Évite de lui faire lire tout le repo à chaque session : le `CLAUDE.md` lui
  donne déjà 90 % de ce qu'il doit savoir.

---

## 6. Que faire quand il bloque

| Symptôme | Que faire |
|----------|-----------|
| Erreur de build qu'il n'arrive pas à réparer en 2 tentatives | Stoppe. Colle l'erreur et demande-lui de diagnostiquer sans corriger. |
| Source légale introuvable | Stoppe. Cherche toi-même l'article sur Légifrance, colle l'URL dans la conversation. |
| Barème qui ne correspond pas à ton résultat attendu | Stoppe. Vérifie toi-même avec simulateur impôts.gouv.fr, confronte. |
| Il invente un chiffre sans source | **Bug critique.** Rejette le commit. Dis-lui : "Tu as écrit 14% sans source. Vérifie sur Légifrance et corrige." |
| Il propose de faire un calculateur pas dans la backlog | Refuse. Demande-lui d'abord d'ajouter l'idée en `proposed` dans `BACKLOG.md`. |

---

## 7. Workflow recommandé pour la première semaine

Pour te rassurer et calibrer ta confiance :

1. **Jour 1** : session `claude`, tu tapes `/nouveau-calculateur`, il te sort
   le calculateur TMI. Tu relis **tout** : les sources, les types, la logique,
   l'UI. Tu testes 5-6 cas dans le simulateur impôts.gouv. Si OK, `git push`.
2. **Jour 2-3** : tu laisses tourner `/nouveau-calculateur` pour le PER. Même
   process de relecture. Tu commences à avoir une intuition de ce qu'il fait
   bien et moins bien.
3. **Jour 4+** : tu commences à utiliser `/mode-autonome` pour enchaîner 2-3
   calculateurs d'affilée. Tu relis a posteriori.
4. **Hebdo** : tu regardes `BACKLOG.md`, tu re-priorises si besoin, tu ajoutes
   des `todo` ou des `proposed`.
5. **Trimestriel** : tu lances `/verif-sources` pour auditer les barèmes et
   détecter les évolutions légales.

---

## 8. Limites à garder en tête

Claude Code est puissant mais **ce n'est pas un expert fiscaliste**. Il va :

- Parfaitement respecter tes conventions de code.
- Correctement implémenter des calculs simples à moyennement complexes.
- Chercher les bonnes sources dans 95% des cas.

Il peut :

- **Se tromper sur un cas particulier** fiscalement exotique (rare mais
  possible). D'où la relecture.
- **Rater une évolution récente** si les sources en ligne n'ont pas été
  mises à jour.
- **Approximer un cas limite** sans que ce soit flagrant.

C'est pour ça que :
- Le disclaimer du site est solide.
- Chaque calculateur a ses sources tracées.
- Tu relis les commits avant de pousser.
- `/verif-sources` tourne régulièrement.

Tu restes le garant éditorial du site. Claude Code est ton compagnon
d'écriture, pas ton remplaçant.

---

## 9. Fichiers du kit

```
CLAUDE.md                              ← Instructions principales (racine)
BACKLOG.md                             ← Liste priorisée des calculateurs
docs/
  CONVENTIONS_CALCULATEUR.md           ← Détail technique
  sources/
    _TEMPLATE.md                       ← Template à copier pour chaque calc
    <slug>.md                          ← Sources par calculateur
.claude/
  commands/
    nouveau-calculateur.md             ← /nouveau-calculateur
    mode-autonome.md                   ← /mode-autonome
    verif-sources.md                   ← /verif-sources
README_CLAUDE_CODE.md                  ← Ce fichier
```

Tout ça va à la racine de ton repo `calcpatrimoine`.

---

Bonne session.
