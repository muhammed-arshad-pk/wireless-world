import { useEffect, useRef, useState } from 'react';
import { useMission } from '../../context/GameContext';
import { sfx } from '../../effects/sfx';

const BEARERS = [
  { id: 'csd', name: 'GSM CSD', rate: 9.6, rtt: 1.0, year: '1999' },
  { id: 'gprs', name: 'GPRS', rate: 40, rtt: 0.7, year: '2001' },
  { id: 'edge', name: 'EDGE', rate: 150, rtt: 0.4, year: '2003' },
  { id: '3g', name: '3G UMTS', rate: 384, rtt: 0.2, year: '2004' },
];
const FORMATS = {
  html: { name: 'Desktop HTML page', parts: [['HTML text', 18], ['CSS', 6], ['Images (5)', 24]], rtts: 2 + 5 },
  wap: { name: 'WAP WML deck', parts: [['WML deck (WBXML)', 1.4]], rtts: 1 },
};

const size = (f) => FORMATS[f].parts.reduce((s, [, kb]) => s + kb, 0);
const timeFor = (f, b) => (size(f) * 8) / b.rate + FORMATS[f].rtts * b.rtt;

export default function WapIntroViz() {
  const { complete } = useMission('w4-wap-intro');
  const [fmt, setFmt] = useState('wap');
  const [bearer, setBearer] = useState(BEARERS[0]);
  const [progress, setProgress] = useState(1);
  const [loadedFmts, setLoadedFmts] = useState([]);
  const raf = useRef(0);

  const t = timeFor(fmt, bearer);
  const load = () => {
    cancelAnimationFrame(raf.current);
    const dur = Math.min(6000, Math.max(600, t * 120));
    const start = performance.now();
    setProgress(0); sfx('whoosh');
    const step = (now) => {
      const p = Math.min(1, (now - start) / dur);
      setProgress(p);
      if (p < 1) raf.current = requestAnimationFrame(step);
      else {
        sfx('good');
        const n = [...new Set([...loadedFmts, fmt])];
        setLoadedFmts(n);
        if (n.length === 2) complete('both');
        if (bearer.id === 'csd') complete('csd');
      }
    };
    raf.current = requestAnimationFrame(step);
  };
  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const done = progress >= 1;
  return (
    <div className="viz">
      <div className="viz-grid">
        <div className="lab-card">
          <h3>1 · Content format</h3>
          <div className="seg small">
            {Object.entries(FORMATS).map(([k, f]) => <button key={k} className={fmt === k ? 'active' : ''} onClick={() => { setFmt(k); setProgress(1); sfx('click'); }}>{f.name}</button>)}
          </div>
          <h3>2 · Wireless bearer</h3>
          <div className="row-gap">
            {BEARERS.map((b) => <button key={b.id} className={`chip ${bearer.id === b.id ? 'on' : ''}`} onClick={() => { setBearer(b); setProgress(1); sfx('click'); }}>{b.name} · {b.rate} kbps</button>)}
          </div>
          <button className="btn btn-primary btn-sm" onClick={load}>▶ Load “Train times”</button>
          <div className="readout">
            <div><small>Size over the air</small><strong>{size(fmt).toFixed(1)} kB</strong></div>
            <div><small>Round trips</small><strong>{FORMATS[fmt].rtts}</strong></div>
            <div><small>Load time</small><strong className={t > 10 ? 'red' : 'green'}>{t.toFixed(1)} s</strong></div>
          </div>
          <div className="size-bars">
            {Object.entries(FORMATS).map(([k, f]) => (
              <div key={k}><span>{f.name}</span><div className="size-bar"><i style={{ width: `${(size(k) / 48) * 100}%` }} className={k} /></div><b>{timeFor(k, bearer).toFixed(1)} s</b></div>
            ))}
          </div>
        </div>
        <div className="viz-stage wap-stage">
          <div className="wap-phone">
            <div className="wap-screen">
              {!done && (
                <div className="wap-loading">
                  <span>Connecting… {bearer.name}</span>
                  <div className="wap-bar"><i style={{ width: `${progress * 100}%` }} /></div>
                  <small>{(t * progress).toFixed(1)} / {t.toFixed(1)} s</small>
                </div>
              )}
              {done && fmt === 'wap' && (
                <div className="wml-card">
                  <b>Train Times</b>
                  <span>1 Mumbai → Pune</span>
                  <span>2 Delhi → Agra</span>
                  <span>3 Chennai → Bengaluru</span>
                  <em>Options · Back</em>
                </div>
              )}
              {done && fmt === 'html' && (
                <div className="html-squash">
                  <div className="hs-banner">RAIL PORTAL ▒▒ [image] ▒▒ Login | Search | Offers |</div>
                  <div className="hs-text">Welcome to our new website! Check out our ama… [scroll →] [image] [image]</div>
                  <div className="hs-warn">Page too large · images not supported · scroll 9 screens</div>
                </div>
              )}
            </div>
            <div className="wap-keys">{['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((k) => <span key={k}>{k}</span>)}</div>
          </div>
        </div>
      </div>
      <div className="info-box">
        Download time ≈ size × 8 / rate + round trips × RTT. On 1999 GSM CSD at 9.6 kbps the desktop page takes <b>{timeFor('html', BEARERS[0]).toFixed(0)} s</b> (and would not even fit the screen), while the WAP deck takes <b>{timeFor('wap', BEARERS[0]).toFixed(1)} s</b>. That gap is why WAP existed.
      </div>
    </div>
  );
}
