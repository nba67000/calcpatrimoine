const RangeField = ({ label, tooltip, value, setValue, min, max, step=1, unit, format, minLabel, maxLabel, width=90 }) => {
  const fmt = format || ((v) => v);
  return (
    <div style={{marginBottom:24}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8}}>
        <label style={{fontSize:14, color:'var(--neutral-600)', display:'inline-flex', alignItems:'center'}}>
          {label}{tooltip && <Tooltip content={tooltip}/>}
        </label>
        <div style={{display:'flex', alignItems:'center', gap:8}}>
          <input
            type="text"
            value={fmt(value)}
            onChange={(e) => {
              const raw = e.target.value.replace(/\s/g,'');
              if (raw === '' || !isNaN(Number(raw))) setValue(raw === '' ? min : Number(raw));
            }}
            onFocus={(e) => e.target.select()}
            style={{
              width,
              padding:'6px 12px', fontSize:18, fontWeight:500, textAlign:'center',
              border:'1px solid var(--neutral-300)', borderRadius:8, outline:'none',
              fontFamily:'var(--font-sans)'
            }}
          />
          <span style={{fontSize:18, fontWeight:500, color:'var(--neutral-600)'}}>{unit}</span>
        </div>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={e => setValue(Number(e.target.value))}/>
      <div style={{display:'flex', justifyContent:'space-between', fontSize:11, color:'var(--neutral-400)', marginTop:4, fontFamily:'var(--font-mono)'}}>
        <span>{minLabel}</span><span>{maxLabel}</span>
      </div>
    </div>
  );
};
window.RangeField = RangeField;
