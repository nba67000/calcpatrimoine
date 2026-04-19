const fmtEuro = (n) => Math.round(n).toLocaleString('fr-FR');

// Stubbed calculation — linear approximation so the UI kit renders
// without shipping INSEE mortality tables. Not for production.
function stubAnnuity(age, capital, reversion) {
  const lifeExp = Math.max(8, 85 - age + (Math.random()*0.001)); // ~anchor
  // Very rough: capital / (lifeExp * 12) with mild adjustment
  let monthly = capital / (lifeExp * 12) * 1.02;
  if (reversion.enabled) {
    const reductionFactor = 1 - (reversion.percentage / 100) * 0.08;
    monthly *= reductionFactor;
  }
  return {
    monthly_amount: monthly,
    life_expectancy: lifeExp,
    total_expected_payout: monthly * 12 * lifeExp,
    with_reversion: reversion.enabled ? {
      spouse_monthly_amount: monthly * (reversion.percentage / 100)
    } : null
  };
}

const LegalDisclaimer = () => (
  <div style={{marginBottom:24, padding:20, background:'var(--primary-50)', border:'2px solid var(--primary-200)', borderRadius:8}}>
    <h3 style={{fontSize:16, fontWeight:700, color:'var(--primary-900)', margin:'0 0 12px 0'}}>Avertissement important</h3>
    <p style={{fontSize:13, color:'var(--primary-800)', margin:0, lineHeight:1.6}}>
      CalcPatrimoine est un outil pédagogique à titre indicatif. Il ne constitue pas un conseil
      en investissement personnalisé. Avant toute décision, consultez un conseiller en
      gestion de patrimoine certifié (CGP).
    </p>
  </div>
);

const RenteCalculator = () => {
  const [age, setAge] = React.useState(65);
  const [capital, setCapital] = React.useState(150000);
  const [reversionOn, setReversionOn] = React.useState(false);
  const [spouseAge, setSpouseAge] = React.useState(63);
  const [pct, setPct] = React.useState(60);

  const result = React.useMemo(() => stubAnnuity(age, capital, {
    enabled: reversionOn, percentage: pct, spouse_age: spouseAge
  }), [age, capital, reversionOn, pct, spouseAge]);

  return (
    <main style={{minHeight:'100vh', background:'linear-gradient(to bottom, var(--neutral-50), #fff)'}}>
      <div style={{maxWidth:896, margin:'0 auto', padding:'40px 16px'}}>
        <div style={{fontSize:13, color:'var(--neutral-500)', marginBottom:12}}>Accueil · Rente Viagère</div>
        <h1 style={{fontSize:40, fontWeight:700, color:'var(--neutral-900)', letterSpacing:'-0.02em', margin:'0 0 12px 0', lineHeight:1.1}}>
          Calculateur de rente viagère
        </h1>
        <p style={{fontSize:18, color:'var(--neutral-600)', lineHeight:1.6, margin:'0 0 32px 0', maxWidth:640}}>
          Estimez vos revenus mensuels à vie selon les tables de mortalité INSEE 2022.
        </p>

        <LegalDisclaimer/>

        {/* Form */}
        <div style={{background:'var(--neutral-100)', borderRadius:8, boxShadow:'var(--shadow-md)', padding:32, marginBottom:24, borderLeft:'4px solid var(--primary-600)'}}>
          <h2 style={{fontSize:22, fontWeight:600, color:'var(--neutral-900)', margin:'0 0 6px 0'}}>Calculez votre rente viagère</h2>
          <p style={{fontSize:13, color:'var(--neutral-600)', margin:'0 0 24px 0'}}>Simulation basée sur les tables de mortalité INSEE 2022</p>

          <RangeField
            label="Votre âge"
            value={age} setValue={setAge}
            min={50} max={90} unit="ans"
            minLabel="50 ans" maxLabel="90 ans"
            width={74}
          />

          <RangeField
            label="Capital disponible"
            tooltip="Montant total de votre épargne (PER, Assurance-vie, livrets...) que vous souhaitez convertir en rente viagère."
            value={capital} setValue={setCapital}
            min={10000} max={500000} step={5000} unit="€"
            format={(v) => v.toLocaleString('fr-FR')}
            minLabel="10 k€" maxLabel="500 k€"
            width={130}
          />

          <div style={{marginBottom:24, padding:16, background:'var(--primary-50)', border:'1px solid var(--primary-200)', borderRadius:8}}>
            <p style={{fontSize:13, color:'var(--primary-900)', fontWeight:600, margin:'0 0 4px 0'}}>Table de mortalité unisexe (réglementation 2012)</p>
            <p style={{fontSize:13, color:'var(--primary-900)', margin:0, lineHeight:1.5}}>
              Depuis décembre 2012, les assureurs utilisent une table unique pour hommes et
              femmes (moyenne pondérée).
            </p>
          </div>

          {/* Reversion */}
          <div style={{borderTop:'1px solid var(--neutral-200)', paddingTop:24}}>
            <div style={{background:'var(--primary-50)', borderRadius:8, borderLeft:'4px solid var(--primary-300)', padding:24}}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:reversionOn?16:0}}>
                <div>
                  <h3 style={{fontSize:17, fontWeight:500, color:'var(--neutral-900)', margin:'0 0 6px 0', display:'inline-flex', alignItems:'center'}}>
                    Réversion au conjoint
                    <Tooltip content="Permet à votre conjoint de continuer à percevoir une partie de la rente après votre décès."/>
                  </h3>
                  <p style={{fontSize:13, color:'var(--neutral-600)', margin:0}}>Garantir un revenu à votre conjoint après votre décès</p>
                </div>
                <button onClick={() => setReversionOn(v => !v)}
                  style={{
                    position:'relative', display:'inline-flex', height:32, width:56,
                    alignItems:'center', borderRadius:9999,
                    background: reversionOn ? 'var(--primary-600)' : 'var(--neutral-300)',
                    transition:'background 200ms'
                  }}>
                  <span style={{
                    height:24, width:24, borderRadius:9999, background:'#fff',
                    transform: `translateX(${reversionOn?28:4}px)`,
                    transition:'transform 200ms'
                  }}/>
                </button>
              </div>

              {reversionOn && (
                <div style={{borderTop:'1px solid var(--primary-200)', paddingTop:16, marginTop:8}}>
                  <RangeField
                    label="Âge du conjoint"
                    value={spouseAge} setValue={setSpouseAge}
                    min={50} max={90} unit="ans"
                    minLabel="50 ans" maxLabel="90 ans"
                    width={70}
                  />
                  <label style={{fontSize:13, fontWeight:500, color:'var(--neutral-700)', display:'block', marginBottom:12}}>
                    Pourcentage de réversion
                  </label>
                  <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:12}}>
                    {[60,80,100].map(p => (
                      <button key={p} onClick={() => setPct(p)}
                        style={{
                          padding:'12px 16px', borderRadius:8, fontSize:14, fontWeight:500,
                          border: `2px solid ${pct===p ? 'var(--primary-600)' : 'var(--neutral-200)'}`,
                          background: pct===p ? 'var(--primary-100)' : '#fff',
                          color: pct===p ? 'var(--primary-900)' : 'var(--neutral-700)',
                          transition:'all 200ms'
                        }}>{p} %</button>
                    ))}
                  </div>
                  <p style={{fontSize:12, color:'var(--neutral-500)', marginTop:10, marginBottom:0}}>
                    {pct===60 && 'Rente couple maximale, protection modérée'}
                    {pct===80 && 'Équilibre entre les deux (le plus courant)'}
                    {pct===100 && 'Protection maximale du conjoint'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Result */}
        <div style={{background:'#fff', borderRadius:8, boxShadow:'var(--shadow-result)', padding:40, borderTop:'4px solid var(--primary-600)'}}>
          <h3 style={{fontSize:20, fontWeight:600, color:'var(--neutral-900)', margin:'0 0 24px 0'}}>Votre rente viagère estimée</h3>
          <div style={{display:'flex', alignItems:'baseline', gap:8, marginBottom:8}}>
            <span className="tabular" style={{fontSize:60, fontWeight:700, color:'var(--neutral-900)', letterSpacing:'-0.02em', lineHeight:1}}>
              {fmtEuro(result.monthly_amount)}&nbsp;€
            </span>
            <span style={{fontSize:20, color:'var(--neutral-600)', fontWeight:500}}>/ mois</span>
          </div>
          <div style={{fontSize:13, color:'var(--neutral-500)', marginBottom:24}}>Rente mensuelle garantie à vie</div>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, paddingTop:24, borderTop:'1px solid var(--neutral-200)'}}>
            <div style={{background:'var(--neutral-50)', borderRadius:6, padding:16}}>
              <div style={{fontSize:11, color:'var(--neutral-600)', fontWeight:500, marginBottom:4}}>Espérance de vie</div>
              <div className="tabular" style={{fontSize:22, fontWeight:600, color:'var(--neutral-900)'}}>{result.life_expectancy.toFixed(1)} ans</div>
            </div>
            <div style={{background:'var(--neutral-50)', borderRadius:6, padding:16}}>
              <div style={{fontSize:11, color:'var(--neutral-600)', fontWeight:500, marginBottom:4}}>Total espéré</div>
              <div className="tabular" style={{fontSize:22, fontWeight:600, color:'var(--neutral-900)'}}>{fmtEuro(result.total_expected_payout)}&nbsp;€</div>
            </div>
          </div>
          {result.with_reversion && (
            <div style={{marginTop:24, background:'var(--primary-50)', border:'1px solid var(--primary-200)', borderRadius:8, padding:16}}>
              <div style={{fontSize:11, color:'var(--primary-900)', marginBottom:6, fontWeight:500}}>Avec réversion {pct} %</div>
              <div style={{fontSize:14, color:'var(--primary-900)'}}>
                Après votre décès, votre conjoint percevra <strong>{fmtEuro(result.with_reversion.spouse_monthly_amount)}&nbsp;€/mois</strong>
              </div>
            </div>
          )}
        </div>

        {/* Warning block */}
        <div style={{marginTop:24, padding:24, background:'var(--warning-50)', border:'2px solid var(--warning-300)', borderRadius:8}}>
          <h4 style={{fontSize:15, fontWeight:700, color:'var(--warning-900)', margin:'0 0 12px 0', display:'flex', alignItems:'center', gap:8}}>
            <Icon name="warning" size={22}/> Avertissement important
          </h4>
          <p style={{fontSize:13, color:'var(--warning-900)', margin:'0 0 12px 0', lineHeight:1.6}}>
            Les calculs sont basés sur des formules actuarielles standard mais ne tiennent pas
            compte de votre situation fiscale personnelle, état de santé, régime matrimonial,
            ni des frais des assureurs.
          </p>
          <div style={{paddingTop:12, borderTop:'1px solid var(--warning-300)'}}>
            <p style={{fontSize:11, color:'var(--warning-900)', margin:0, lineHeight:1.5}}>
              Dernière mise à jour : avril 2026. CalcPatrimoine décline toute responsabilité
              en cas de décision prise uniquement sur la base des calculs fournis.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};
window.RenteCalculator = RenteCalculator;
