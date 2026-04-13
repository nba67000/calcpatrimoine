#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Générateur de tables de mortalité INSEE pour calculateur de rente viagère
Basé sur les formules actuarielles standards et données INED 2020-2022
"""

import json
import os
from datetime import datetime

# Données INSEE/INED 2020-2022 (espérance de vie par âge)
# Source: https://www.ined.fr/fr/tout-savoir-population/chiffres/france/mortalite-cause-deces/table-mortalite/

LIFE_EXPECTANCY_HOMME = {
    50: 32.91, 51: 32.03, 52: 31.15, 53: 30.28, 54: 29.41,
    55: 28.55, 56: 27.69, 57: 26.84, 58: 26.00, 59: 25.17,
    60: 24.35, 61: 23.53, 62: 22.72, 63: 21.92, 64: 21.13,
    65: 20.35, 66: 19.58, 67: 18.82, 68: 18.07, 69: 17.33,
    70: 16.61, 71: 15.90, 72: 15.20, 73: 14.51, 74: 13.84,
    75: 13.19, 76: 12.55, 77: 11.93, 78: 11.33, 79: 10.75,
    80: 10.19, 81: 9.65, 82: 9.14, 83: 8.64, 84: 8.17,
    85: 7.73, 86: 7.31, 87: 6.91, 88: 6.54, 89: 6.19,
    90: 5.86
}

LIFE_EXPECTANCY_FEMME = {
    50: 37.15, 51: 36.23, 52: 35.31, 53: 34.40, 54: 33.49,
    55: 32.58, 56: 31.67, 57: 30.77, 58: 29.87, 59: 28.98,
    60: 28.09, 61: 27.20, 62: 26.32, 63: 25.45, 64: 24.58,
    65: 23.71, 66: 22.85, 67: 22.00, 68: 21.16, 69: 20.32,
    70: 19.49, 71: 18.67, 72: 17.86, 73: 17.06, 74: 16.27,
    75: 15.50, 76: 14.73, 77: 13.99, 78: 13.26, 79: 12.55,
    80: 11.85, 81: 11.18, 82: 10.53, 83: 9.90, 84: 9.30,
    85: 8.72, 86: 8.17, 87: 7.64, 88: 7.14, 89: 6.67,
    90: 6.23
}

# Taux de mortalité approximatifs par âge (qx)
# Calculés à partir des tables de survie INED
MORTALITY_RATE_HOMME = {
    50: 0.00342, 51: 0.00365, 52: 0.00391, 53: 0.00420, 54: 0.00452,
    55: 0.00487, 56: 0.00526, 57: 0.00569, 58: 0.00618, 59: 0.00671,
    60: 0.00731, 61: 0.00797, 62: 0.00871, 63: 0.00952, 64: 0.01042,
    65: 0.01142, 66: 0.01253, 67: 0.01375, 68: 0.01510, 69: 0.01659,
    70: 0.01824, 71: 0.02006, 72: 0.02207, 73: 0.02429, 74: 0.02674,
    75: 0.02944, 76: 0.03242, 77: 0.03571, 78: 0.03933, 79: 0.04332,
    80: 0.04772, 81: 0.05256, 82: 0.05789, 83: 0.06376, 84: 0.07022,
    85: 0.07733, 86: 0.08515, 87: 0.09376, 88: 0.10322, 89: 0.11364,
    90: 0.12511
}

MORTALITY_RATE_FEMME = {
    50: 0.00215, 51: 0.00230, 52: 0.00247, 53: 0.00265, 54: 0.00286,
    55: 0.00309, 56: 0.00334, 57: 0.00362, 58: 0.00394, 59: 0.00428,
    60: 0.00466, 61: 0.00509, 62: 0.00556, 63: 0.00608, 64: 0.00666,
    65: 0.00730, 66: 0.00801, 67: 0.00880, 68: 0.00968, 69: 0.01066,
    70: 0.01174, 71: 0.01294, 72: 0.01427, 73: 0.01574, 74: 0.01738,
    75: 0.01919, 76: 0.02119, 77: 0.02341, 78: 0.02586, 79: 0.02856,
    80: 0.03155, 81: 0.03485, 82: 0.03849, 83: 0.04252, 84: 0.04698,
    85: 0.05190, 86: 0.05735, 87: 0.06337, 88: 0.07003, 89: 0.07740,
    90: 0.08555
}

def calculate_annuity_factor(age, gender, tech_rate=0.005):
    """
    Calcule le facteur viager a(x) pour un âge donné
    Formule: a(x) = Σ (v^t * t_p_x) où:
    - v = 1/(1+i) avec i = taux technique
    - t_p_x = probabilité de survie à t années
    """
    life_exp = LIFE_EXPECTANCY_HOMME[age] if gender == 'homme' else LIFE_EXPECTANCY_FEMME[age]
    mortality_rates = MORTALITY_RATE_HOMME if gender == 'homme' else MORTALITY_RATE_FEMME
    
    # Calcul simplifié du facteur viager
    # a(x) ≈ espérance de vie / (1 + taux technique * espérance de vie / 2)
    # Cette formule approximative est utilisée en pratique
    v = 1 / (1 + tech_rate)
    
    # Méthode précise : somme actualisée des probabilités de survie
    annuity_factor = 0
    p_x = 1.0  # probabilité de survie initiale
    
    for t in range(int(life_exp * 2)):  # On va au double de l'espérance
        if p_x < 0.001:  # Probabilité négligeable
            break
        annuity_factor += (v ** t) * p_x
        
        # Mise à jour probabilité de survie pour l'année suivante
        current_age = age + t
        if current_age <= 90 and current_age in mortality_rates:
            q_x = mortality_rates[current_age]
            p_x = p_x * (1 - q_x)
        else:
            # Au-delà de 90 ans, on suppose un taux de mortalité élevé
            p_x = p_x * 0.85
    
    return round(annuity_factor, 4)

def generate_mortality_tables():
    """Génère les tables de mortalité complètes"""
    print("🚀 Génération des tables de mortalité")
    print("=" * 50)
    
    tables = {
        "homme": [],
        "femme": []
    }
    
    tech_rate = 0.005  # 0.5% standard du marché
    
    for gender in ["homme", "femme"]:
        print(f"\n📊 Traitement {gender}...")
        life_exp_data = LIFE_EXPECTANCY_HOMME if gender == "homme" else LIFE_EXPECTANCY_FEMME
        mortality_data = MORTALITY_RATE_HOMME if gender == "homme" else MORTALITY_RATE_FEMME
        
        for age in range(50, 91):
            annuity_factor = calculate_annuity_factor(age, gender, tech_rate)
            
            tables[gender].append({
                "age": age,
                "annuity_factor": annuity_factor,
                "life_expectancy": round(life_exp_data[age], 2),
                "mortality_rate": mortality_data[age]
            })
        
        print(f"  ✅ {len(tables[gender])} lignes générées")
    
    # Construction du JSON final
    output = {
        "metadata": {
            "source": "INSEE/INED",
            "year": 2022,
            "tech_rate": tech_rate,
            "description": "Tables de mortalité par génération avec facteurs viagers précalculés",
            "last_updated": datetime.now().isoformat(),
            "generation_method": "Calcul actuariel basé sur données INED 2020-2022",
            "note": "Conforme aux pratiques du marché français de l'assurance-vie"
        },
        "tables": tables
    }
    
    return output

def save_json(data, output_dir="mortality_data"):
    """Sauvegarde les données au format JSON"""
    os.makedirs(output_dir, exist_ok=True)
    output_path = os.path.join(output_dir, "mortality_tables.json")
    
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    print(f"\n✅ Fichier généré : {output_path}")
    print(f"   Taille : {os.path.getsize(output_path) / 1024:.1f} Ko")
    
    return output_path

def main():
    print("""
╔════════════════════════════════════════════════════════╗
║  Générateur de Tables de Mortalité INSEE              ║
║  Pour calculateur de rente viagère                     ║
╚════════════════════════════════════════════════════════╝
    """)
    
    try:
        # Génération des tables
        mortality_data = generate_mortality_tables()
        
        # Sauvegarde
        output_path = save_json(mortality_data)
        
        # Statistiques
        print("\n📈 Statistiques :")
        print(f"   • Hommes 50-90 ans : {len(mortality_data['tables']['homme'])} entrées")
        print(f"   • Femmes 50-90 ans : {len(mortality_data['tables']['femme'])} entrées")
        print(f"   • Taux technique : {mortality_data['metadata']['tech_rate']*100}%")
        
        # Exemples
        print("\n💡 Exemples de données :")
        homme_65 = next(d for d in mortality_data['tables']['homme'] if d['age'] == 65)
        femme_65 = next(d for d in mortality_data['tables']['femme'] if d['age'] == 65)
        
        print(f"   Homme 65 ans :")
        print(f"      • Espérance de vie : {homme_65['life_expectancy']} ans")
        print(f"      • Facteur viager : {homme_65['annuity_factor']}")
        print(f"      • Rente pour 100k€ : {100000 / homme_65['annuity_factor']:.0f}€/an")
        
        print(f"   Femme 65 ans :")
        print(f"      • Espérance de vie : {femme_65['life_expectancy']} ans")
        print(f"      • Facteur viager : {femme_65['annuity_factor']}")
        print(f"      • Rente pour 100k€ : {100000 / femme_65['annuity_factor']:.0f}€/an")
        
        print("\n✨ SUCCÈS ! Les tables sont prêtes à être utilisées.")
        print(f"\n📁 Prochaine étape : cp {output_path} ../public/\n")
        
    except Exception as e:
        print(f"\n❌ ERREUR : {str(e)}")
        import traceback
        traceback.print_exc()
        return 1
    
    return 0

if __name__ == "__main__":
    exit(main())
