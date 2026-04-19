const Footer = () => (
  <footer style={{background:'var(--neutral-900)', color:'var(--neutral-300)', marginTop:64}}>
    <div style={{maxWidth:1152, margin:'0 auto', padding:'48px 16px'}}>
      <div style={{display:'grid', gridTemplateColumns:'2fr 1fr 1fr', gap:32, marginBottom:40}}>
        <div>
          <div style={{display:'flex', alignItems:'center', gap:12, marginBottom:16}}>
            <LogoMark size={40}/>
            <span style={{color:'#fff', fontSize:18, fontWeight:700}}>CalcPatrimoine</span>
          </div>
          <p style={{fontSize:13, color:'var(--neutral-400)', lineHeight:1.6, maxWidth:360, margin:0}}>
            Calculateurs patrimoniaux gratuits et open-source. Sans inscription,
            sans publicité, aucune donnée conservée.
          </p>
        </div>
        <div>
          <p style={{fontSize:11, textTransform:'uppercase', letterSpacing:'0.05em', color:'var(--neutral-500)', fontWeight:600, margin:'0 0 16px 0'}}>Calculateurs</p>
          <ul style={{listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:8, fontSize:14}}>
            <li><a href="#" style={{color:'var(--neutral-400)'}}>Rente Viagère</a></li>
            <li><a href="#" style={{color:'var(--neutral-400)'}}>Assurance-Vie</a></li>
          </ul>
        </div>
        <div>
          <p style={{fontSize:11, textTransform:'uppercase', letterSpacing:'0.05em', color:'var(--neutral-500)', fontWeight:600, margin:'0 0 16px 0'}}>Ressources</p>
          <ul style={{listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:8, fontSize:14}}>
            <li><a href="#" style={{color:'var(--neutral-400)'}}>Blog</a></li>
            <li><a href="#" style={{color:'var(--neutral-400)'}}>FAQ</a></li>
            <li><a href="#" style={{color:'var(--neutral-400)'}}>Méthodologie</a></li>
            <li><a href="#" style={{color:'var(--neutral-400)'}}>À propos</a></li>
          </ul>
        </div>
      </div>
      <div style={{paddingTop:32, borderTop:'1px solid var(--neutral-800)', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:16}}>
        <span style={{fontSize:12, color:'var(--neutral-500)'}}>© 2026 CalcPatrimoine · Tous droits réservés</span>
        <div style={{display:'flex', gap:24, flexWrap:'wrap'}}>
          <a href="#" style={{fontSize:12, color:'var(--neutral-500)'}}>Mentions légales</a>
          <a href="#" style={{fontSize:12, color:'var(--neutral-500)'}}>CGU</a>
          <a href="#" style={{fontSize:12, color:'var(--neutral-500)'}}>Confidentialité</a>
          <a href="#" style={{fontSize:12, color:'var(--neutral-500)'}}>Code source</a>
        </div>
      </div>
    </div>
  </footer>
);
window.Footer = Footer;
