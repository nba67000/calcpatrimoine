#!/bin/bash

echo "🔧 Nettoyage du cache Next.js..."

# Supprimer complètement le dossier .next
rm -rf .next

echo "✅ Cache supprimé"
echo ""
echo "🚀 Vous pouvez maintenant lancer :"
echo "  npm run build"
echo "  ou"
echo "  npm run dev"
