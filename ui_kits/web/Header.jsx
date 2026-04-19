const LogoMark = ({ size = 44 }) => (
  <div style={{
    width:size, height:size,
    borderRadius: size >= 40 ? 6 : 4,
    background:'linear-gradient(135deg,#2E4A6F,#1E3A5F)',
    display:'flex', alignItems:'center', justifyContent:'center',
    color:'#fff', fontWeight:700, fontSize: size*0.6, letterSpacing:'-0.5px',
    boxShadow:'var(--shadow-card)'
  }}>C</div>
);

const Header = ({ route, onNav }) => {
  const links = [
    { href:'/rente-viagere', label:'Rente Viagère' },
    { href:'/assurance-vie', label:'Assurance-Vie' },
    { href:'/blog', label:'Blog' },
    { href:'/a-propos', label:'À propos' },
  ];
  return (
    <header style={{
      borderBottom:'1px solid var(--neutral-200)',
      background:'#fff',
      position:'sticky', top:0, zIndex:50,
      boxShadow:'var(--shadow-subtle)'
    }}>
      <div style={{maxWidth:1152, margin:'0 auto', padding:'16px 16px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <button onClick={() => onNav('/')} style={{display:'flex', alignItems:'center', gap:12}}>
          <LogoMark size={44}/>
          <div style={{display:'flex', flexDirection:'column', textAlign:'left'}}>
            <span style={{fontWeight:700, color:'var(--neutral-900)', fontSize:18, lineHeight:1.1}}>CalcPatrimoine</span>
            <span style={{fontSize:11, color:'var(--neutral-500)', lineHeight:1.1}}>Calculateurs open-source</span>
          </div>
        </button>
        <nav style={{display:'flex', gap:24, fontSize:14}}>
          {links.map(l => (
            <button key={l.href} onClick={() => onNav(l.href)}
              style={{
                fontWeight:500,
                color: route === l.href ? 'var(--primary-700)' : 'var(--neutral-600)',
                transition:'color 200ms'
              }}>
              {l.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};
window.Header = Header;
window.LogoMark = LogoMark;
