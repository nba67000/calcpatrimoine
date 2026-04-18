#!/bin/bash

# Script de migration Option A - CalcPatrimoine
# Exécuter depuis la racine du projet

echo "🚀 Migration CalcPatrimoine vers architecture multi-calculateurs"
echo ""

# Vérification présence fichiers
if [ ! -f "src/app/page.tsx" ]; then
    echo "❌ Erreur : fichier src/app/page.tsx introuvable"
    exit 1
fi

echo "✅ Fichiers détectés"
echo ""

# Backup
echo "📦 Backup de l'ancienne homepage..."
cp src/app/page.tsx src/app/page.tsx.backup
echo "✅ Backup créé : src/app/page.tsx.backup"
echo ""

# Migration calculateur rente viagère
echo "📦 Migration calculateur rente viagère..."
mkdir -p src/app/rente-viagere
cp src/app/page.tsx src/app/rente-viagere/page.tsx
echo "✅ Calculateur rente viagère déplacé vers /rente-viagere"
echo ""

# Activation nouvelle homepage
echo "📦 Activation nouvelle homepage..."
mv src/app/page-new.tsx src/app/page.tsx
echo "✅ Nouvelle homepage activée"
echo ""

# Récapitulatif
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ MIGRATION TERMINÉE"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Structure finale :"
echo "  / → Homepage hub calculateurs"
echo "  /rente-viagere → Calculateur rente (ancien /)"
echo "  /assurance-vie → À créer"
echo ""
echo "Fichiers modifiés :"
echo "  ✓ src/app/page.tsx (nouvelle homepage)"
echo "  ✓ src/app/rente-viagere/page.tsx (calculateur)"
echo "  ✓ src/components/Header.tsx (navigation)"
echo "  ✓ src/app/sitemap.ts (SEO)"
echo ""
echo "Backup disponible : src/app/page.tsx.backup"
echo ""
echo "🧪 Test local :"
echo "  npm run dev"
echo "  http://localhost:3000 → Homepage"
echo "  http://localhost:3000/rente-viagere → Calculateur"
echo ""
