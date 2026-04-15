#!/bin/bash

# Script de désactivation page de maintenance
# Usage: ./deactivate-maintenance.sh

echo ""
echo "🔄 ============================================"
echo "   DÉSACTIVATION PAGE DE MAINTENANCE"
echo "============================================"
echo ""

# Vérifier qu'on est dans le bon dossier
if [ ! -d "src/app" ]; then
    echo "❌ Erreur : Exécute ce script depuis la racine du projet"
    exit 1
fi

# Vérifier qu'il y a un backup
if [ ! -f "src/app/page.BACKUP.tsx" ] && [ ! -f "src/app/page.PRODUCTION.tsx" ]; then
    echo "❌ Erreur : Pas de backup trouvé (page.BACKUP.tsx ou page.PRODUCTION.tsx)"
    echo "⚠️  Tu dois restaurer manuellement la page de production"
    exit 1
fi

# Confirmer
echo "⚠️  Cela va restaurer la page de production"
read -p "📋 Continuer ? (y/n) [y] : " confirm
confirm=${confirm:-y}

if [ "$confirm" != "y" ] && [ "$confirm" != "Y" ]; then
    echo "❌ Annulé"
    exit 0
fi

# Restaurer (priorité à BACKUP.tsx, sinon PRODUCTION.tsx)
echo ""
echo "🔄 Restauration de la page de production..."
cd src/app
rm page.tsx

if [ -f "page.BACKUP.tsx" ]; then
    mv page.BACKUP.tsx page.tsx
elif [ -f "page.PRODUCTION.tsx" ]; then
    mv page.PRODUCTION.tsx page.tsx
fi

# Git
echo ""
read -p "📤 Déployer maintenant ? (y/n) [y] : " deploy
deploy=${deploy:-y}

if [ "$deploy" = "y" ] || [ "$deploy" = "Y" ]; then
    cd ../..
    git add src/app/page.tsx
    git commit -m "maintenance: site réactivé"
    git push
    
    echo ""
    echo "✅ ============================================"
    echo "   SITE RÉACTIVÉ !"
    echo "============================================"
    echo ""
    echo "🌐 Le site est de nouveau accessible"
    echo "📊 Vérifie : https://calcpatrimoine.fr"
    echo ""
else
    echo ""
    echo "⚠️  Page restaurée mais pas déployée"
    echo "📤 Pour déployer : git add . && git commit -m 'site réactivé' && git push"
    echo ""
fi
