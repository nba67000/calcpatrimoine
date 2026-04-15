# 📊 Guide Installation Plausible Analytics Auto-hébergé

## 🎯 Vue d'ensemble

Plausible est une alternative respectueuse de la vie privée à Google Analytics :
- ✅ Léger (< 1KB)
- ✅ Sans cookies
- ✅ RGPD compliant par défaut
- ✅ Open-source
- ✅ Auto-hébergé (tes données)

---

## 📦 Installation serveur Plausible

### Prérequis

- Serveur Linux (Ubuntu 22.04 LTS recommandé)
- Docker + Docker Compose
- Domaine (ex: analytics.calcpatrimoine.fr)
- 2GB RAM minimum

### Étape 1 : Préparer serveur

```bash
# 1. Se connecter au serveur
ssh user@ton-serveur.com

# 2. Installer Docker
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
newgrp docker

# 3. Installer Docker Compose
sudo apt update
sudo apt install docker-compose

# 4. Vérifier
docker --version
docker-compose --version
```

### Étape 2 : Installer Plausible

```bash
# 1. Créer dossier
mkdir -p ~/plausible-analytics
cd ~/plausible-analytics

# 2. Télécharger fichiers officiels
curl -o docker-compose.yml https://raw.githubusercontent.com/plausible/hosting/master/docker-compose.yml
curl -o plausible-conf.env https://raw.githubusercontent.com/plausible/hosting/master/plausible-conf.env

# 3. Créer dossier ClickHouse
mkdir -p clickhouse
```

### Étape 3 : Configurer

```bash
# 1. Générer secret key
openssl rand -base64 64

# 2. Éditer configuration
nano plausible-conf.env
```

**Modifier dans `plausible-conf.env`** :

```bash
# URL publique
BASE_URL=https://analytics.calcpatrimoine.fr

# Secret (coller celui généré)
SECRET_KEY_BASE=TON_SECRET_GENERE_ICI

# SMTP (optionnel mais recommandé)
SMTP_HOST_ADDR=smtp.gmail.com
SMTP_HOST_PORT=587
SMTP_USER_NAME=ton-email@gmail.com
SMTP_USER_PWD=ton-app-password
MAILER_EMAIL=noreply@calcpatrimoine.fr

# Désactiver inscriptions publiques
DISABLE_REGISTRATION=invite_only
```

### Étape 4 : Configurer ClickHouse

```bash
# Créer fichiers config
cat > clickhouse/clickhouse-config.xml << 'EOF'
<?xml version="1.0"?>
<clickhouse>
    <logger>
        <level>warning</level>
        <console>true</console>
    </logger>
    <listen_host>0.0.0.0</listen_host>
</clickhouse>
EOF

cat > clickhouse/clickhouse-user-config.xml << 'EOF'
<?xml version="1.0"?>
<clickhouse>
    <profiles>
        <default>
            <log_queries>0</log_queries>
            <log_query_threads>0</log_query_threads>
        </default>
    </profiles>
</clickhouse>
EOF
```

### Étape 5 : Lancer Plausible

```bash
# 1. Démarrer services
docker-compose up -d

# 2. Vérifier status
docker-compose ps

# 3. Voir logs
docker-compose logs -f plausible

# 4. Attendre ~1 minute le démarrage complet
```

---

## 🌐 Configuration DNS

### Créer sous-domaine analytics

Chez ton registrar (Gandi, OVH, etc.) :

```
Type: A
Nom: analytics
Valeur: [IP de ton serveur]
TTL: 3600
```

Ou si proxy Cloudflare :

```
Type: CNAME
Nom: analytics
Valeur: ton-serveur.com
Proxy: Activé (orange)
```

---

## 🔐 Configuration HTTPS (Nginx + Let's Encrypt)

### Option A : Avec Nginx Proxy Manager (Recommandé)

```bash
# 1. Installer NPM
docker run -d \
  --name nginx-proxy-manager \
  -p 80:80 \
  -p 443:443 \
  -p 81:81 \
  -v npm-data:/data \
  -v npm-letsencrypt:/etc/letsencrypt \
  --restart always \
  jc21/nginx-proxy-manager:latest

# 2. Accéder à http://ton-serveur:81
# Email: admin@example.com
# Password: changeme

# 3. Ajouter Proxy Host :
# Domain: analytics.calcpatrimoine.fr
# Forward Hostname: plausible
# Forward Port: 8000
# SSL: Request New Certificate (Let's Encrypt)
```

### Option B : Avec Caddy (Simple)

```bash
# 1. Installer Caddy
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt update
sudo apt install caddy

# 2. Configurer
sudo nano /etc/caddy/Caddyfile
```

**Contenu Caddyfile** :

```
analytics.calcpatrimoine.fr {
    reverse_proxy localhost:8000
}
```

```bash
# 3. Recharger
sudo systemctl reload caddy
```

---

## 👤 Créer compte admin

```bash
# 1. Accéder à Plausible
https://analytics.calcpatrimoine.fr

# 2. Cliquer "Register"

# 3. Créer compte admin
Email: ton-email@gmail.com
Nom: Ton Nom
Password: ***

# 4. Confirmer email (si SMTP configuré)
# Ou activer manuellement :
docker-compose exec plausible /app/bin/plausible rpc "Plausible.Auth.User.verify_email('ton-email@gmail.com')"
```

---

## 🌐 Ajouter site CalcPatrimoine

```bash
# Dans interface Plausible

1. Cliquer "+ Add website"
2. Domain: calcpatrimoine.fr
3. Timezone: Europe/Paris
4. Cliquer "Add"

# Récupérer code tracking
# Copier le script fourni
```

---

## 🔧 Intégration CalcPatrimoine

### Déjà fait dans le ZIP !

Fichiers ajoutés :
- ✅ `src/lib/plausible.ts` - Configuration + helpers
- ✅ `src/components/PlausibleScript.tsx` - Composant script
- ✅ `src/app/layout.tsx` - Intégration automatique
- ✅ Tracking dans calculateurs

### Vérifier intégration

```bash
# 1. Build local
npm run build

# 2. Lancer
npm start

# 3. Ouvrir http://localhost:3000

# 4. Vérifier console navigateur (F12)
# Doit charger : https://analytics.calcpatrimoine.fr/js/script.js

# 5. Faire un calcul

# 6. Vérifier dans Plausible
# https://analytics.calcpatrimoine.fr
# → Page views doivent apparaître en temps réel
```

---

## 📊 Événements trackés

### Pages vues (automatique)
- `/` - Page d'accueil
- `/faq` - FAQ
- `/methodologie` - Méthodologie
- `/a-propos` - À propos

### Événements personnalisés

```typescript
// Calculs
- "Calcul Rente Simple"
- "Calcul Rente Réversion"  
- "Calcul Inverse"
- "Calcul Mode Couple"

// Interactions
- "Toggle Réversion"
- "Change Pourcentage Réversion"

// Navigation
- "View FAQ"
- "View Méthodologie"
- "View À Propos"
```

---

## 🔧 Maintenance

### Voir logs

```bash
cd ~/plausible-analytics

# Tous les services
docker-compose logs -f

# Seulement Plausible
docker-compose logs -f plausible

# Dernières 50 lignes
docker-compose logs --tail=50
```

### Redémarrer

```bash
docker-compose restart
```

### Mettre à jour

```bash
# 1. Arrêter
docker-compose down

# 2. Télécharger dernière version
docker-compose pull

# 3. Redémarrer
docker-compose up -d
```

### Backup

```bash
# Backup PostgreSQL (données analytics)
docker-compose exec plausible_db pg_dump -U plausible plausible_db > backup_$(date +%Y%m%d).sql

# Backup ClickHouse (événements)
docker-compose exec plausible_events_db clickhouse-client --query "BACKUP DATABASE plausible_events_db TO Disk('backups', 'backup_$(date +%Y%m%d)')"
```

---

## 🐛 Dépannage

### Plausible ne démarre pas

```bash
# Vérifier logs
docker-compose logs plausible

# Si erreur SECRET_KEY_BASE
# → Vérifier plausible-conf.env configuré

# Si erreur DATABASE
# → Attendre 1-2 minutes (init DB)

# Recréer containers
docker-compose down -v
docker-compose up -d
```

### Script ne se charge pas

```bash
# Vérifier CORS
# Dans plausible-conf.env :
DISABLE_REGISTRATION=invite_only

# Vérifier URL
# Doit être HTTPS en production
BASE_URL=https://analytics.calcpatrimoine.fr
```

### Pas de données

```bash
# Vérifier console navigateur (F12)
# Doit voir : GET https://analytics.calcpatrimoine.fr/js/script.js

# Vérifier bloqueur pub
# Désactiver AdBlock/uBlock sur analytics.*

# Vérifier mode dev
# Plausible ne track qu'en production
```

---

## 📈 Métriques importantes

### Dashboard Plausible montre :

- ✅ **Visiteurs uniques** (aujourd'hui/hier/7j/30j)
- ✅ **Pages vues** par page
- ✅ **Sources de trafic** (direct, Google, réseaux sociaux)
- ✅ **Pays/villes** des visiteurs
- ✅ **Appareils** (desktop/mobile/tablet)
- ✅ **Navigateurs** utilisés
- ✅ **Événements personnalisés** (calculs effectués)
- ✅ **Temps réel** (visiteurs actifs maintenant)

### KPIs CalcPatrimoine

- Taux calcul rente simple vs réversion
- Âge moyen utilisateurs (via événements)
- Capital moyen utilisé
- Taux rebond par page
- Pages/session
- Durée session

---

## 🎯 Prochaines étapes

1. ✅ Installer Plausible sur serveur
2. ✅ Configurer DNS + HTTPS
3. ✅ Créer compte admin
4. ✅ Ajouter site calcpatrimoine.fr
5. ✅ Déployer CalcPatrimoine (intégration déjà faite)
6. ✅ Vérifier données temps réel
7. ✅ Analyser métriques chaque semaine

---

**Questions ?** Relis ce guide ou check logs Docker.

**Version** : 1.0.0  
**Date** : 14 avril 2026
