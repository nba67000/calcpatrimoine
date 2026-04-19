const Icon = ({ name, size = 20 }) => {
  const s = size;
  if (name === 'check') return (
    <svg width={s} height={s} viewBox="0 0 24 24" style={{flexShrink:0}}>
      <circle cx="12" cy="12" r="11" fill="#10B981"/>
      <path d="M7 12.5L10.5 16L17 9" stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
  if (name === 'cross') return (
    <svg width={s} height={s} viewBox="0 0 24 24" style={{flexShrink:0}}>
      <circle cx="12" cy="12" r="11" fill="#DC2626"/>
      <path d="M8 8L16 16M16 8L8 16" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  );
  if (name === 'warning') return (
    <svg width={s} height={s} viewBox="0 0 24 24" style={{flexShrink:0}}>
      <path d="M12 2L23 21H1L12 2Z" fill="#F59E0B" stroke="#F59E0B" strokeLinejoin="round"/>
      <path d="M12 9V14" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="12" cy="17.5" r="1.2" fill="#fff"/>
    </svg>
  );
  if (name === 'info') return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
  );
  return null;
};
window.Icon = Icon;

const Tooltip = ({ content }) => {
  const [show, setShow] = React.useState(false);
  return (
    <span style={{position:'relative',display:'inline-block',marginLeft:4}}>
      <button
        type="button"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onFocus={() => setShow(true)}
        onBlur={() => setShow(false)}
        aria-label="Information"
        style={{display:'inline-flex',alignItems:'center',justifyContent:'center',width:16,height:16,color:'#94A3B8',cursor:'help'}}
      >
        <Icon name="info" size={16} />
      </button>
      {show && (
        <span role="tooltip" style={{position:'absolute',zIndex:50,top:-4,left:22,minWidth:200,maxWidth:260,padding:'8px 12px',background:'#0F172A',color:'#fff',borderRadius:8,fontSize:12,lineHeight:1.45,boxShadow:'var(--shadow-lg)'}}>
          {content}
          <span style={{position:'absolute',width:8,height:8,background:'#0F172A',transform:'rotate(45deg)',left:-3,top:12}} />
        </span>
      )}
    </span>
  );
};
window.Tooltip = Tooltip;
