#!/bin/bash

# Script d'activation page de maintenance
# Usage: ./activate-maintenance.sh

echo ""
echo "🛑 ============================================"
echo "   ACTIVATION PAGE DE MAINTENANCE"
echo "============================================"
echo ""

# Vérifier qu'on est dans le bon dossier
if [ ! -d "src/app" ]; then
    echo "❌ Erreur : Exécute ce script depuis la racine du projet"
    exit 1
fi

# Sauvegarder page actuelle
echo "📦 Sauvegarde de la page actuelle..."
cd src/app
cp page.tsx page.BACKUP.$(date +%Y%m%d_%H%M%S).tsx
cp page.tsx page.BACKUP.tsx

# Activer maintenance
echo "🔄 Activation de la page maintenance..."
cp ../../maintenance/maintenance-page.tsx page.tsx

# Demander durée estimée
echo ""
read -p "⏱️  Durée estimée (en minutes) [45] : " duration
duration=${duration:-45}

# Modifier durée dans le fichier
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    sed -i '' "s/+ 45 \* 60 \* 1000/+ $duration * 60 * 1000/" page.tsx
else
    # Linux
    sed -i "s/+ 45 \* 60 \* 1000/+ $duration * 60 * 1000/" page.tsx
fi

echo "✅ Durée configurée : $duration minutes"

# Git
echo ""
read -p "📤 Déployer maintenant ? (y/n) [y] : " deploy
deploy=${deploy:-y}

if [ "$deploy" = "y" ] || [ "$deploy" = "Y" ]; then
    cd ../..
    git add src/app/page.tsx
    git commit -m "maintenance: activation page temporaire ($duration min)"
    git push
    
    echo ""
    echo "✅ ============================================"
    echo "   PAGE MAINTENANCE ACTIVÉE !"
    echo "============================================"
    echo ""
    echo "⏱️  Durée estimée : $duration minutes"
    echo "🔄 Pour désactiver : ./deactivate-maintenance.sh"
    echo ""
else
    echo ""
    echo "⚠️  Page prête mais pas déployée"
    echo "📤 Pour déployer : git add . && git commit -m 'maintenance' && git push"
    echo ""
fi
