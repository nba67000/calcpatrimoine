# 🎨 Exemple : RenteCalculator Redesigné

## Avant (style Lovable) vs Après (CalcPatrimoine)

---

## 🔵 AVANT (style Lovable générique)

```tsx
<div className="max-w-4xl mx-auto">
  {/* Card formulaire - TROP Lovable */}
  <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-6">
    <h2 className="text-xl font-medium mb-6">Vos informations</h2>
    
    {/* Input capital - basique */}
    <div className="mb-6">
      <label className="text-sm text-gray-600">Capital disponible</label>
      <input
        type="text"
        className="w-40 px-3 py-1 text-lg font-medium border border-gray-300 rounded-lg"
        value={formatCapitalInput(capital)}
      />
      
      {/* Range slider - standard */}
      <input
        type="range"
        className="w-full h-2 bg-gray-200 rounded-lg 
                   [&::-webkit-slider-thumb]:bg-blue-600"
      />
    </div>
  </div>

  {/* Résultat - gradient bleu vif */}
  <motion.div className="bg-gradient-to-br from-blue-50 to-blue-100 
                         rounded-2xl border-2 border-blue-200 p-8">
    <h3 className="text-lg text-blue-900 mb-2">Votre rente viagère estimée</h3>
    <div className="text-5xl font-bold text-blue-900">
      {formatEuro(result.monthly_amount)}
    </div>
  </motion.div>
</div>
```

---

## 🎯 APRÈS (CalcPatrimoine - professionnel)

```tsx
<div className="max-w-4xl mx-auto px-4 space-y-8">
  
  {/* Card formulaire - Élégant et sobre */}
  <div className="bg-neutral-100 rounded-lg shadow-card p-8 
                  border-l-4 border-primary-600">
    
    {/* Header avec serif */}
    <div className="mb-8">
      <h2 className="text-2xl font-serif font-bold text-neutral-900 mb-2">
        Calculez votre rente viagère
      </h2>
      <p className="text-sm text-neutral-600">
        Simulation basée sur les tables de mortalité INSEE 2022
      </p>
    </div>

    {/* Section Capital - Design premium */}
    <div className="space-y-4 mb-6">
      {/* Label + Info */}
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-neutral-700">
          Capital disponible
        </label>
        <div className="flex items-center gap-2 text-xs text-neutral-500">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Min 10k€ - Max 500k€</span>
        </div>
      </div>

      {/* Input moderne avec icône */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <span className="text-neutral-400 font-medium">€</span>
        </div>
        <input
          type="text"
          inputMode="numeric"
          value={formatCapitalInput(capital)}
          onChange={handleCapitalChange}
          className="w-full pl-10 pr-4 py-3.5 
                     bg-white text-right font-mono text-lg font-semibold
                     text-neutral-900
                     border-2 border-neutral-300 rounded-md
                     focus:border-primary-600 focus:ring-2 focus:ring-primary-600/20
                     transition-all duration-200
                     hover:border-neutral-400"
        />
      </div>

      {/* Range slider premium */}
      <div className="pt-2">
        <input
          type="range"
          min="10000"
          max="500000"
          step="5000"
          value={capital}
          onChange={(e) => setCapital(Number(e.target.value))}
          className="w-full h-1.5 bg-neutral-300 rounded-full appearance-none cursor-pointer
                     [&::-webkit-slider-thumb]:appearance-none
                     [&::-webkit-slider-thumb]:w-5
                     [&::-webkit-slider-thumb]:h-5
                     [&::-webkit-slider-thumb]:rounded-full
                     [&::-webkit-slider-thumb]:bg-primary-700
                     [&::-webkit-slider-thumb]:shadow-md
                     [&::-webkit-slider-thumb]:border-2
                     [&::-webkit-slider-thumb]:border-white
                     [&::-webkit-slider-thumb]:cursor-grab
                     [&::-webkit-slider-thumb]:active:cursor-grabbing
                     [&::-webkit-slider-thumb]:hover:bg-primary-800
                     [&::-webkit-slider-thumb]:transition-colors
                     [&::-moz-range-thumb]:w-5
                     [&::-moz-range-thumb]:h-5
                     [&::-moz-range-thumb]:rounded-full
                     [&::-moz-range-thumb]:bg-primary-700
                     [&::-moz-range-thumb]:shadow-md
                     [&::-moz-range-thumb]:border-2
                     [&::-moz-range-thumb]:border-white
                     [&::-moz-range-thumb]:cursor-grab
                     [&::-moz-range-thumb]:hover:bg-primary-800
                     [&::-moz-range-thumb]:border-0"
        />
        {/* Labels min/max discrets */}
        <div className="flex justify-between mt-1.5 text-xs text-neutral-500 font-medium">
          <span>10k€</span>
          <span className="text-neutral-400">·</span>
          <span>500k€</span>
        </div>
      </div>
    </div>

    {/* Note pédagogique - Subtile */}
    <div className="mt-6 p-4 bg-primary-50 rounded-md border-l-4 border-primary-600">
      <div className="flex gap-3">
        <div className="flex-shrink-0 mt-0.5">
          <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-medium text-primary-900 mb-1">
            Table de mortalité unisexe (réglementation 2012)
          </p>
          <p className="text-xs text-primary-700 leading-relaxed">
            Depuis décembre 2012, les assureurs utilisent une table unique pour hommes et femmes. 
            Ce calculateur applique cette réglementation obligatoire (arrêt CJUE mars 2011).
          </p>
        </div>
      </div>
    </div>
  </div>

  {/* Résultat - Card premium avec ombre */}
  {result && (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-lg shadow-result p-10 
                 border-t-4 border-success-600"
    >
      {/* Header résultat */}
      <div className="flex items-center gap-2 mb-6">
        <div className="w-10 h-10 bg-success-100 rounded-md flex items-center justify-center">
          <svg className="w-6 h-6 text-success-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-neutral-900">
          Votre rente viagère estimée
        </h3>
      </div>

      {/* Montant principal - Typographie premium */}
      <div className="mb-8">
        <div className="flex items-baseline gap-2">
          <span className="text-6xl font-bold font-mono text-neutral-900 tracking-tight">
            {formatEuro(result.monthly_amount)}
          </span>
          <span className="text-xl text-neutral-600 font-medium">/ mois</span>
        </div>
        <p className="text-sm text-neutral-500 mt-2">
          Rente mensuelle garantie à vie
        </p>
      </div>

      {/* Détails - Grid sobre */}
      <div className="grid grid-cols-2 gap-4 pb-8 border-b border-neutral-200">
        <div className="bg-neutral-50 rounded-md p-4">
          <div className="text-xs text-neutral-600 font-medium mb-1.5">
            Espérance de vie
          </div>
          <div className="text-2xl font-semibold text-neutral-900">
            {result.life_expectancy} ans
          </div>
        </div>
        <div className="bg-neutral-50 rounded-md p-4">
          <div className="text-xs text-neutral-600 font-medium mb-1.5">
            Total espéré
          </div>
          <div className="text-2xl font-semibold font-mono text-neutral-900">
            {formatEuro(result.total_expected_payout)}
          </div>
        </div>
      </div>

      {/* Call-to-action subtile */}
      <div className="mt-8 flex gap-3">
        <button className="flex-1 bg-primary-700 hover:bg-primary-800 
                          text-white px-6 py-3 rounded-md
                          font-medium tracking-wide
                          shadow-md hover:shadow-lg
                          transition-all duration-200">
          Comparer les stratégies couple
        </button>
        <button className="px-6 py-3 bg-neutral-100 hover:bg-neutral-200
                          text-neutral-700 rounded-md
                          font-medium transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
        </button>
      </div>
    </motion.div>
  )}

  {/* Disclaimer - Accent gauche au lieu de border-2 */}
  {result && (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.2, delay: 0.1 }}
      className="bg-error-50 rounded-lg shadow-subtle p-6 
                 border-l-4 border-error-600"
    >
      <div className="flex gap-3">
        <div className="flex-shrink-0">
          <svg className="w-6 h-6 text-error-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" />
          </svg>
        </div>
        <div className="flex-1">
          <h4 className="text-base font-bold text-error-900 mb-3">
            Avertissement Important
          </h4>
          {/* ... reste du disclaimer ... */}
        </div>
      </div>
    </motion.div>
  )}

</div>
```

---

## 🎨 Différences clés

### Structure
- ✅ `space-y-8` entre sections (respiration)
- ✅ `border-l-4` au lieu de `border-2` partout
- ✅ `shadow-card` au lieu de borders
- ✅ `rounded-md` max (jamais rounded-2xl)

### Couleurs
- ✅ `primary-700` (bleu marine) au lieu de `blue-600`
- ✅ `neutral-*` au lieu de `gray-*`
- ✅ `success-600` (vert émeraude) au lieu de gradients bleus
- ✅ Accents discrets (border-l, border-t)

### Typographie
- ✅ `font-serif` pour titres importants
- ✅ `font-mono` pour montants
- ✅ `tracking-tight` sur gros chiffres
- ✅ `font-medium/semibold` au lieu de bold partout

### Espacements
- ✅ `p-10` résultat (plus généreux)
- ✅ `gap-3` au lieu de gap-2
- ✅ `space-y-4` sections

### Interactions
- ✅ Range slider avec `border-white` (effet 3D)
- ✅ `cursor-grab` / `cursor-grabbing`
- ✅ Hover subtils (shadow, pas scale)
- ✅ Transitions rapides (0.2s)

---

**Cette refonte élimine totalement le style Lovable tout en gardant l'ergonomie !**
