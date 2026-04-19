const Landing = ({ onNav }) => (
  <div style={{minHeight:'100vh', background:'var(--neutral-50)'}}>
    {/* Hero */}
    <section style={{background:'linear-gradient(to bottom, var(--primary-50), #fff)', padding:'80px 16px', borderBottom:'1px solid var(--neutral-200)'}}>
      <div style={{maxWidth:896, margin:'0 auto', textAlign:'center'}}>
        <h1 style={{fontSize:48, fontWeight:700, color:'var(--neutral-900)', margin:'0 0 24px 0', letterSpacing:'-0.02em', lineHeight:1.1}}>
          Calculateurs gratuits pour vos décisions patrimoniales
        </h1>
        <p style={{fontSize:20, color:'var(--neutral-700)', lineHeight:1.6, margin:'0 auto 32px', maxWidth:640}}>
          Outils open-source pour simuler rente viagère, fiscalité assurance-vie,
          et optimiser votre patrimoine. Aucune donnée conservée, calculs 100% côté navigateur.
        </p>
        <div style={{display:'flex', flexWrap:'wrap', gap:24, justifyContent:'center', fontSize:14, color:'var(--neutral-600)'}}>
          {['100% gratuit','Open-source','Zéro tracking','Tables INSEE officielles'].map(t => (
            <span key={t} style={{fontWeight:500}}>{t}</span>
          ))}
        </div>
      </div>
    </section>

    {/* Calculator grid */}
    <section style={{maxWidth:1152, margin:'0 auto', padding:'64px 16px'}}>
      <h2 style={{fontSize:30, fontWeight:700, color:'var(--neutral-900)', margin:'0 0 12px 0'}}>Nos calculateurs</h2>
      <p style={{color:'var(--neutral-600)', margin:'0 0 40px 0', fontSize:18}}>Choisissez le calculateur adapté à votre situation patrimoniale</p>
      <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:24}}>
        <CalcCard title="Rente Viagère" body="Calculez votre seuil de rentabilité, comparez avec l'espérance de vie INSEE, et simulez différentes stratégies couple." cta="Accéder au calculateur" onClick={() => onNav('/rente-viagere')}/>
        <CalcCard title="Assurance-Vie" badge="2 outils" body="Deux calculateurs : fiscalité des rachats (PFU vs IR) et transmission aux bénéficiaires (succession)." cta="Voir les calculateurs" onClick={() => onNav('/assurance-vie')}/>
        <CalcCard title="PER (Retraite)" body="Optimisez votre déduction fiscale et comparez PER vs Assurance-vie selon votre situation." soon/>
        <CalcCard title="SCPI" body="Simulez vos revenus locatifs et comparez la rentabilité de différentes SCPI." soon/>
        <CalcCard title="Immobilier locatif" body="Calculez la rentabilité de votre projet immobilier (rendement, cash-flow, fiscalité)." soon/>
        <CalcCard title="TMI" body="Tranche marginale d'imposition et impact PER, dons, travaux sur votre taux moyen." soon/>
      </div>
    </section>

    {/* Articles */}
    <section style={{maxWidth:1152, margin:'0 auto 32px', padding:'64px 32px', background:'#fff', borderRadius:12, border:'1px solid var(--neutral-200)'}}>
      <h2 style={{fontSize:30, fontWeight:700, color:'var(--neutral-900)', margin:'0 0 12px 0'}}>Articles récents</h2>
      <p style={{color:'var(--neutral-600)', margin:'0 0 32px 0', fontSize:18}}>Guides complets pour comprendre avant de calculer</p>
      <div style={{display:'flex', flexDirection:'column', gap:16}}>
        <Article category="Fiscalité" read="11 min" title="Assurance-vie : combien vous allez vraiment payer sur un rachat" dek="Règle proportionnelle, abattement 8 ans, PFU vs IR, versements avant 2017. Tout le détail."/>
        <Article category="Rente viagère" read="15 min" title="Pourquoi le seuil de rentabilité est après votre espérance de vie" dek="À 72 ans avec 250 000 €, le seuil tombe à 15,8 ans. Ce n'est pas une anomalie."/>
      </div>
    </section>
  </div>
);

const CalcCard = ({ title, body, cta, badge, soon, onClick }) => {
  const [hover, setHover] = React.useState(false);
  if (soon) return (
    <div style={{background:'var(--neutral-50)', borderRadius:12, border:'2px dashed var(--neutral-300)', padding:32}}>
      <h3 style={{fontSize:22, fontWeight:700, color:'var(--neutral-500)', margin:'0 0 12px 0'}}>{title}</h3>
      <p style={{color:'var(--neutral-500)', margin:'0 0 24px 0', lineHeight:1.6, fontSize:14}}>{body}</p>
      <span style={{color:'var(--neutral-400)', fontWeight:500, fontSize:14}}>Bientôt disponible</span>
    </div>
  );
  return (
    <button onClick={onClick} onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}
      style={{
        background:'#fff', borderRadius:12, padding:32, textAlign:'left', position:'relative',
        border:`2px solid ${hover ? 'var(--primary-400)' : 'var(--neutral-200)'}`,
        boxShadow: hover ? 'var(--shadow-lg)' : 'var(--shadow-card)',
        transition:'all 200ms'
      }}>
      {badge && <span style={{position:'absolute', top:16, right:16, background:'var(--primary-100)', color:'var(--primary-700)', fontSize:11, fontWeight:700, padding:'4px 10px', borderRadius:9999}}>{badge}</span>}
      <h3 style={{fontSize:22, fontWeight:700, color: hover ? 'var(--primary-600)' : 'var(--neutral-900)', margin:'0 0 12px 0', transition:'color 200ms'}}>{title}</h3>
      <p style={{color:'var(--neutral-600)', margin:'0 0 24px 0', lineHeight:1.6, fontSize:14}}>{body}</p>
      <span style={{color:'var(--primary-600)', fontWeight:500, fontSize:14, display:'inline-flex', gap: hover ? 10 : 6, transition:'gap 200ms'}}>
        <span>{cta}</span><span>→</span>
      </span>
    </button>
  );
};

const Article = ({ category, read, title, dek }) => (
  <a href="#" style={{display:'block', padding:24, borderRadius:8, border:'1px solid var(--neutral-200)', transition:'all 200ms'}}
    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary-300)'; e.currentTarget.style.background='var(--primary-50)'; }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--neutral-200)'; e.currentTarget.style.background='transparent'; }}>
    <div style={{color:'var(--primary-600)', fontSize:13, fontWeight:500, marginBottom:8}}>{category} · {read}</div>
    <h3 style={{fontSize:20, fontWeight:700, color:'var(--neutral-900)', margin:'0 0 8px 0'}}>{title}</h3>
    <p style={{color:'var(--neutral-600)', margin:0}}>{dek}</p>
  </a>
);

window.Landing = Landing;
