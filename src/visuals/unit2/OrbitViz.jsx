import { useEffect, useRef, useState } from 'react';
import { useMission } from '../../context/GameContext';
import { sfx } from '../../effects/sfx';
import { Slider } from '../shared';

const MU = 398600.4418; const RE = 6378; const DAY = 86164;
const period = (h) => 2 * Math.PI * Math.sqrt((RE + h) ** 3 / MU); // seconds
const rpx = (h) => 55 + 135 * Math.sqrt(h / 35786);
const ORBITS = [
  { id: 'LEO', h: 550, color: '#f472b6', ex: 'Starlink, ISS, Earth imaging' },
  { id: 'MEO', h: 20200, color: '#a78bfa', ex: 'GPS, Galileo' },
  { id: 'GEO', h: 35786, color: '#22d3ee', ex: 'INSAT/GSAT, DTH TV, weather' },
];
const fmtT = (s) => (s >= 3600 ? `${Math.floor(s / 3600)} h ${Math.round((s % 3600) / 60)} min` : `${Math.round(s / 60)} min`);
const WARP = 1800; // simulated seconds per real second

export default function OrbitViz() {
  const { complete } = useMission('w2-orbits');
  const [seen, setSeen] = useState(() => new Set());
  const [focus, setFocus] = useState('GEO');
  const [custom, setCustom] = useState(8000);
  const [t, setT] = useState(0);
  const raf = useRef(null);

  useEffect(() => {
    const t0 = performance.now();
    const step = (now) => { setT(((now - t0) / 1000) * WARP); raf.current = requestAnimationFrame(step); };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, []);
  const Tc = period(custom);
  useEffect(() => { if (Math.abs(Tc - DAY) < 120) complete('geo'); }, [Tc, complete]);

  const pick = (id) => {
    setFocus(id); sfx('click');
    const n = new Set(seen).add(id); setSeen(n);
    if (n.size === 3) complete('compare');
  };

  const cx = 210; const cy = 210;
  const earthAngle = (2 * Math.PI * t) / DAY;
  const sat = (h) => { const a = (2 * Math.PI * t) / period(h); const r = rpx(h); return [cx + r * Math.cos(a), cy - r * Math.sin(a), a]; };
  const f = ORBITS.find((o) => o.id === focus);
  const shown = { id: 'Custom', h: custom, color: '#fde68a' };
  const beta = Math.acos(RE / (RE + custom));
  const [sx, sy, sa] = sat(custom);
  const tan1 = [cx + 55 * Math.cos(sa - beta), cy - 55 * Math.sin(sa - beta)];
  const tan2 = [cx + 55 * Math.cos(sa + beta), cy - 55 * Math.sin(sa + beta)];
  const v = Math.sqrt(MU / (RE + custom));
  const coverage = 50 * (1 - RE / (RE + custom));

  return (
    <div className="viz">
      <div className="viz-grid">
        <div className="viz-stage">
          <svg viewBox="0 0 420 420">
            {ORBITS.map((o) => <circle key={o.id} cx={cx} cy={cy} r={rpx(o.h)} fill="none" stroke={o.color} strokeOpacity={focus === o.id ? 0.9 : 0.35} strokeDasharray="4 6" strokeWidth={focus === o.id ? 2 : 1} />)}
            <circle cx={cx} cy={cy} r={rpx(custom)} fill="none" stroke="#fde68a" strokeOpacity=".5" />
            <path d={`M${sx},${sy} L${tan1[0]},${tan1[1]} M${sx},${sy} L${tan2[0]},${tan2[1]}`} stroke="#fde68a" strokeOpacity=".5" />
            <path d={`M${tan1[0]},${tan1[1]} A55,55 0 0 1 ${tan2[0]},${tan2[1]}`} stroke="#fde68a" strokeWidth="5" fill="none" />
            <circle cx={cx} cy={cy} r="55" fill="url(#earth)" />
            <defs><radialGradient id="earth"><stop offset="0" stopColor="#38bdf8" /><stop offset="1" stopColor="#0e7490" /></radialGradient></defs>
            <circle cx={cx + 55 * Math.cos(earthAngle)} cy={cy - 55 * Math.sin(earthAngle)} r="5" fill="#ef4444" />
            {ORBITS.map((o) => { const [x, y] = sat(o.h); return <g key={o.id}><circle cx={x} cy={y} r="7" fill={o.color} /><text x={x + 9} y={y - 6} className="wave-label" fill={o.color}>{o.id}</text></g>; })}
            <circle cx={sx} cy={sy} r="6" fill={shown.color} stroke="#fff" />
          </svg>
          <p className="hint" style={{ textAlign: 'center' }}>Time ×{WARP}. The red dot is a point on Earth: the GEO satellite stays above it. Yellow arc = your custom satellite’s coverage.</p>
        </div>
        <div className="lab-card">
          <div className="row-gap">{ORBITS.map((o) => <button key={o.id} className={`chip ${focus === o.id ? 'on' : ''} ${seen.has(o.id) ? 'seen' : ''}`} onClick={() => pick(o.id)}>{o.id}</button>)}</div>
          <div className="info-box" key={f.id}><b style={{ color: f.color }}>{f.id}</b> at {f.h.toLocaleString()} km: period {fmtT(period(f.h))}, speed {Math.sqrt(MU / (RE + f.h)).toFixed(2)} km/s, coverage ≈ {(50 * (1 - RE / (RE + f.h))).toFixed(0)}% of Earth. <br />Examples: {f.ex}</div>
          <h3>🛰 Your satellite</h3>
          <Slider label="Altitude" value={custom} min={200} max={40000} step={10} onChange={setCustom} unit=" km" />
          <div className="readout">
            <div><small>Period</small><strong>{fmtT(Tc)}</strong></div>
            <div><small>Speed</small><strong>{v.toFixed(2)} km/s</strong></div>
            <div><small>Coverage</small><strong>{coverage.toFixed(1)}%</strong></div>
            <div><small>Min. delay (up)</small><strong>{(custom / 299.792).toFixed(1)} ms</strong></div>
          </div>
          {Math.abs(Tc - DAY) < 120 ? <p className="result good">✔ Geostationary! Period ≈ one sidereal day (23 h 56 min).</p> : <p className="hint">Goal: make the period equal 23 h 56 min.</p>}
        </div>
      </div>
    </div>
  );
}
