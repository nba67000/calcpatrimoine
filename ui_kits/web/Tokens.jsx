const Tokens = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@700&family=Roboto+Mono:wght@500;700&display=swap');
    :root {
      --primary-50:#E8EEF5; --primary-100:#D1DDE9; --primary-200:#A3BBD3;
      --primary-300:#7599BD; --primary-400:#4777A7; --primary-500:#2E5A8F;
      --primary-600:#2E4A6F; --primary-700:#1E3A5F; --primary-800:#1A2F4F; --primary-900:#0A2540;
      --neutral-50:#F8FAFC; --neutral-100:#F1F5F9; --neutral-200:#E2E8F0;
      --neutral-300:#CBD5E1; --neutral-400:#94A3B8; --neutral-500:#64748B;
      --neutral-600:#475569; --neutral-700:#334155; --neutral-800:#1E293B; --neutral-900:#0F172A;
      --warning-50:#FFFBEB; --warning-100:#FEF3C7; --warning-200:#FDE68A;
      --warning-300:#FCD34D; --warning-500:#F59E0B; --warning-700:#B45309; --warning-900:#78350F;
      --font-sans:'Inter',ui-sans-serif,system-ui,sans-serif;
      --font-serif:'Playfair Display',Georgia,serif;
      --font-mono:'Roboto Mono',ui-monospace,monospace;
      --radius-md:6px; --radius-lg:8px; --radius-xl:12px;
      --shadow-subtle:0 1px 2px 0 rgba(0,0,0,0.05);
      --shadow-card:0 1px 3px 0 rgba(0,0,0,0.1),0 1px 2px 0 rgba(0,0,0,0.06);
      --shadow-card-hover:0 4px 6px -1px rgba(0,0,0,0.1),0 2px 4px -1px rgba(0,0,0,0.06);
      --shadow-md:0 4px 6px -1px rgba(0,0,0,0.1),0 2px 4px -1px rgba(0,0,0,0.06);
      --shadow-lg:0 10px 15px -3px rgba(0,0,0,0.1),0 4px 6px -2px rgba(0,0,0,0.05);
      --shadow-result:0 10px 15px -3px rgba(0,0,0,0.1),0 4px 6px -2px rgba(0,0,0,0.05);
    }
    *,*::before,*::after{box-sizing:border-box}
    html,body{margin:0;padding:0;font-family:var(--font-sans);background:#fff;color:var(--neutral-900);-webkit-font-smoothing:antialiased}
    button{font:inherit;cursor:pointer;border:none;background:none;padding:0;color:inherit}
    a{color:inherit;text-decoration:none}
    input,select,textarea{font:inherit}
    /* Slider — visible track on WebKit + Firefox */
    input[type=range]{-webkit-appearance:none;-moz-appearance:none;appearance:none;background:transparent;width:100%;height:24px;margin:0;padding:0;cursor:pointer;display:block}
    input[type=range]:focus{outline:none}
    /* WebKit */
    input[type=range]::-webkit-slider-runnable-track{-webkit-appearance:none;appearance:none;width:100%;height:8px;background:linear-gradient(to right,#D1DDE9 0%,#2E4A6F 100%);border:1px solid #CBD5E1;border-radius:9999px;box-shadow:inset 0 1px 2px rgba(15,23,42,0.08)}
    input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;background:#2E4A6F;height:22px;width:22px;border-radius:50%;margin-top:-8px;border:3px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.25);transition:transform .15s, background .15s}
    input[type=range]::-webkit-slider-thumb:hover{background:#1E3A5F;transform:scale(1.12)}
    /* Firefox */
    input[type=range]::-moz-range-track{width:100%;height:8px;background:linear-gradient(to right,#D1DDE9 0%,#2E4A6F 100%);border:1px solid #CBD5E1;border-radius:9999px;box-shadow:inset 0 1px 2px rgba(15,23,42,0.08)}
    input[type=range]::-moz-range-progress{background:#2E4A6F;height:8px;border-radius:9999px}
    input[type=range]::-moz-range-thumb{background:#2E4A6F;height:22px;width:22px;border-radius:50%;border:3px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.25)}
    :focus-visible{outline:2px solid #2E4A6F;outline-offset:2px}
    .tabular{font-variant-numeric:tabular-nums}
  `}</style>
);
window.Tokens = Tokens;
