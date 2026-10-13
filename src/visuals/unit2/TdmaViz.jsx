import { useEffect, useRef, useState } from 'react';
import { useMission } from '../../context/GameContext';
import { Slider } from '../shared';

const TF = 2000; // µs frame
const COLORS = ['#22d3ee', '#a78bfa', '#f472b6', '#34d399', '#facc15', '#fb923c', '#60a5fa', '#e879f9', '#4ade80', '#f87171'];

export default function TdmaViz() {
  const { complete } = useMission('w2-tdma');
  const [n, setN] = useState(4);
  const [guard, setGuard] = useState(20);
  const [pre, setPre] = useState(60);
  const [view, setView] = useState('tdma');
  const [play, setPlay] = useState(0);
  const raf = useRef(null);

  const ref = pre; // reference burst ≈ one preamble long
  const overhead = (n + 1) * guard + n * pre + ref;
  const dataEach = Math.max(0, (TF - overhead) / n);
  const eff = Math.max(0, ((TF - overhead) / TF) * 100);
  useEffect(() => { if (eff >= 90 && n >= 4) complete('frame'); }, [eff, n, complete]);

  useEffect(() => {
    const t0 = performance.now();
    const step = (now) => { setPlay((((now - t0) / 3000) % 1) * TF); raf.current = requestAnimationFrame(step); };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  // Build segments along the frame.
  const segs = []; let t = 0;
  segs.push({ type: 'ref', start: t, len: ref }); t += ref;
  for (let i = 0; i < n; i++) {
    segs.push({ type: 'guard', start: t, len: guard }); t += guard;
    segs.push({ type: 'pre', start: t, len: pre, st: i }); t += pre;
    segs.push({ type: 'data', start: t, len: dataEach, st: i }); t += dataEach;
  }
  segs.push({ type: 'guard', start: t, len: guard });
  const W = 720; const px = W / TF;
  const active = segs.find((s) => play >= s.start && play < s.start + s.len);

  return (
    <div className="viz">
      <div className="seg">
        <button className={view === 'tdma' ? 'active' : ''} onClick={() => setView('tdma')}>TDMA frame</button>
        <button className={view === 'cmp' ? 'active' : ''} onClick={() => { setView('cmp'); complete('compare'); }}>FDMA vs TDMA</button>
      </div>
      {view === 'tdma' ? (
        <>
          <div className="viz-stage">
            <svg viewBox={`-10 0 ${W + 20} 170`}>
              <text x="0" y="16" className="wave-label">One 2 ms frame (repeats continuously)</text>
              {segs.map((s, k) => (
                <rect key={k} x={s.start * px} y="30" width={Math.max(0.5, s.len * px)} height="70" rx="3"
                  className={`tdma-${s.type}`} fill={s.type === 'data' ? COLORS[s.st % COLORS.length] : undefined} opacity={active === s ? 1 : 0.8} />
              ))}
              {segs.filter((s) => s.type === 'data').map((s) => <text key={s.st} x={(s.start + s.len / 2) * px} y="70" className="wave-bit" fill="#0b1530">E{s.st + 1}</text>)}
              <line x1={play * px} x2={play * px} y1="22" y2="108" stroke="#fff" strokeWidth="2" />
              <g transform="translate(0,130)">
                {[['tdma-ref', 'Reference burst'], ['tdma-guard', 'Guard time'], ['tdma-pre', 'Preamble (sync + UW)']].map(([c, l], i) => <g key={c} transform={`translate(${i * 200},0)`}><rect width="16" height="12" className={c} /><text x="22" y="11" className="wave-label">{l}</text></g>)}
              </g>
            </svg>
          </div>
          <div className="viz-grid">
            <div className="lab-card">
              <Slider label="Earth stations" value={n} min={2} max={10} onChange={setN} />
              <Slider label="Guard time" value={guard} min={0} max={60} onChange={setGuard} unit=" µs" />
              <Slider label="Preamble length" value={pre} min={10} max={150} onChange={setPre} unit=" µs" />
            </div>
            <div className="lab-card">
              <div className="readout">
                <div><small>Frame efficiency</small><strong className={eff >= 90 ? 'green' : ''}>{eff.toFixed(1)}%</strong></div>
                <div><small>Data time / station</small><strong>{dataEach.toFixed(0)} µs</strong></div>
                <div><small>Overhead</small><strong>{overhead.toFixed(0)} µs</strong></div>
                <div><small>Transmitting now</small><strong>{active?.st !== undefined ? `E${active.st + 1}` : active?.type === 'ref' ? 'REF' : '—'}</strong></div>
              </div>
              <p className="hint">Only one station transmits at any instant, so the satellite amplifier sees a single carrier and can run at full power.</p>
            </div>
          </div>
        </>
      ) : (
        <div className="viz-grid">
          <div className="viz-stage">
            <svg viewBox="0 0 420 260">
              <text x="100" y="18" className="wave-label" textAnchor="middle">FDMA: frequency ↑</text>
              {Array.from({ length: 4 }, (_, i) => <rect key={i} x="20" y={30 + i * 50} width="160" height="40" rx="4" fill={COLORS[i]} opacity=".8" />)}
              <text x="100" y="250" className="wave-label" textAnchor="middle">time →</text>
              <text x="320" y="18" className="wave-label" textAnchor="middle">TDMA: frequency ↑</text>
              {Array.from({ length: 4 }, (_, i) => <rect key={i} x={240 + i * 40} y="30" width="36" height="190" rx="4" fill={COLORS[i]} opacity=".8" />)}
              <text x="320" y="250" className="wave-label" textAnchor="middle">time →</text>
            </svg>
          </div>
          <div className="lab-card">
            <h3>Same 36 MHz transponder, 4 stations</h3>
            <div className="readout">
              <div><small>FDMA amp. back-off</small><strong>≈ 3–6 dB</strong></div>
              <div><small>FDMA usable power</small><strong>25–50%</strong></div>
              <div><small>TDMA back-off</small><strong>≈ 0 dB</strong></div>
              <div><small>TDMA overhead</small><strong>{(100 - eff).toFixed(0)}% of frame</strong></div>
            </div>
            <p className="hint">FDMA loses power to intermodulation back-off. TDMA loses a little time to guard times and preambles but keeps full power, which is why large digital networks moved to TDMA.</p>
          </div>
        </div>
      )}
    </div>
  );
}
