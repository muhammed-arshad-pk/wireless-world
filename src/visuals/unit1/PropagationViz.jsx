import { useEffect, useState } from 'react';
import { useMission } from '../../context/GameContext';
import { Slider, si } from '../shared';

// Earth drawn as a large circle; positions along the surface by angle.
const R = 900; const CX = 400; const CY = 1000;
const surf = (deg, h = 0) => { const a = ((deg - 90) * Math.PI) / 180; return [CX + (R + h) * Math.cos(a), CY + (R + h) * Math.sin(a)]; };

function modeFor(f) {
  if (f < 2e6) return 'ground';
  if (f < 30e6) return 'sky';
  return 'los';
}
const INFO = {
  ground: { title: 'Ground-wave propagation', text: 'Below about 2 MHz the wave is guided along the Earth’s surface and follows its curvature well beyond the horizon. Used for AM medium wave, LF and VLF navigation.' },
  sky: { title: 'Sky-wave propagation', text: 'Between about 2 and 30 MHz the ionosphere refracts the wave back to Earth, often thousands of km away. The zone between where the ground wave fades and the first sky-wave return is the skip zone.' },
  los: { title: 'Line-of-sight propagation', text: 'Above about 30 MHz the wave passes straight through the ionosphere. Ground stations must "see" each other (or a satellite). Range is limited by the radio horizon.' },
};

export default function PropagationViz() {
  const { complete } = useMission('w1-propagation');
  const [exp, setExp] = useState(6);
  const [seen, setSeen] = useState(() => new Set());
  const [h1, setH1] = useState(30);
  const [h2, setH2] = useState(10);
  const f = 10 ** exp;
  const mode = modeFor(f);
  const K = 4 / 3;
  const d = 3.57 * (Math.sqrt(K * h1) + Math.sqrt(K * h2));

  useEffect(() => {
    setSeen((s) => { if (s.has(mode)) return s; const n = new Set(s).add(mode); return n; });
  }, [mode]);
  useEffect(() => { if (seen.size === 3) complete('modes'); }, [seen, complete]);
  useEffect(() => { if (d >= 50) complete('horizon'); }, [d, complete]);

  const [tx, ty] = surf(-20); const [txTop, tyTop] = surf(-20, 22);
  const ionoR = R + 230;
  const ground = (() => { let p = ''; for (let a = -20; a <= 18; a += 1) { const [x, y] = surf(a, 6); p += `${a === -20 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)} `; } return p; })();
  const [ix, iy] = surf(0, 230); const [rx2, ry2] = surf(20, 4);
  const [hx, hy] = surf(-8, 0);
  const [spX, spY] = surf(0, 420);

  return (
    <div className="viz">
      <div className="viz-grid">
        <div className="viz-stage">
          <svg viewBox="0 0 800 420">
            <defs><linearGradient id="iono" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#8b5cf6" stopOpacity=".05" /><stop offset="1" stopColor="#8b5cf6" stopOpacity=".35" /></linearGradient></defs>
            <circle cx={CX} cy={CY} r={ionoR + 40} fill="url(#iono)" />
            <circle cx={CX} cy={CY} r={ionoR} fill="none" stroke="#8b5cf6" strokeDasharray="6 6" opacity=".7" />
            <text x="40" y="118" className="wave-label" fill="#c4b5fd">Ionosphere (D, E, F layers)</text>
            <circle cx={CX} cy={CY} r={R} fill="#0e3b2e" stroke="#10b981" strokeWidth="2" />
            <line x1={txTop} y1={tyTop} x2={tx} y2={ty} stroke="#e2e8f0" strokeWidth="3" />
            <text x={tx - 30} y={ty + 20} className="wave-label">Tx</text>
            {mode === 'ground' && <path d={ground} className="prop-path ground" />}
            {mode === 'sky' && <path d={`M${txTop},${tyTop} L${ix},${iy} L${rx2},${ry2}`} className="prop-path sky" />}
            {mode === 'sky' && <path d={`M${txTop},${tyTop} Q ${surf(-14, 30)[0]},${surf(-14, 30)[1]} ${surf(-10, 5)[0]},${surf(-10, 5)[1]}`} className="prop-path ground faint" />}
            {mode === 'los' && <>
              <path d={`M${txTop},${tyTop} L${hx + 120},${hy - 10}`} className="prop-path los" />
              <path d={`M${txTop},${tyTop} L${spX},${spY - 10}`} className="prop-path los faint" />
              <text x={spX - 60} y={spY - 18} className="wave-label">→ passes to space / satellites</text>
            </>}
            {mode === 'sky' && <text x={surf(-6, 20)[0] - 30} y={surf(-6, 20)[1]} className="wave-label" fill="#fca5a5">skip zone</text>}
            <circle cx={rx2} cy={ry2} r="6" fill="#fde68a" />
            <text x={rx2 + 6} y={ry2 + 22} className="wave-label">Rx</text>
          </svg>
        </div>
        <div className="lab-card">
          <Slider label="Frequency" value={exp} min={5} max={10} step={0.01} onChange={setExp} fmt={() => `${si(f)}Hz`} />
          <div className="row-gap">
            {[['AM 1 MHz', 6], ['Shortwave 10 MHz', 7], ['FM 100 MHz', 8], ['Mobile 2 GHz', 9.3]].map(([l, v]) => <button key={l} className="chip" onClick={() => setExp(v)}>{l}</button>)}
          </div>
          <div className="info-box" key={mode}><b>{INFO[mode].title}</b><br />{INFO[mode].text}</div>
          <div className="row-gap">{['ground', 'sky', 'los'].map((m) => <span key={m} className={`tag ${seen.has(m) ? '' : 'dimtag'}`}>{seen.has(m) ? '✔' : '○'} {INFO[m].title.split(' ')[0]}</span>)}</div>
        </div>
      </div>

      <div className="viz-grid">
        <div className="lab-card">
          <h3>📏 Line-of-sight range calculator</h3>
          <Slider label="Transmitter tower height h₁" value={h1} min={1} max={300} onChange={setH1} unit=" m" />
          <Slider label="Receiver height h₂" value={h2} min={1} max={300} onChange={setH2} unit=" m" />
          <div className="formula">d = 3.57 (√(K·h₁) + √(K·h₂)), K = 4/3</div>
          <div className="readout">
            <div><small>Radio horizon (Tx)</small><strong>{(3.57 * Math.sqrt(K * h1)).toFixed(1)} km</strong></div>
            <div><small>Max LOS distance</small><strong className={d >= 50 ? 'green' : ''}>{d.toFixed(1)} km</strong></div>
          </div>
        </div>
        <div className="viz-stage">
          <svg viewBox="0 0 400 160">
            <path d="M0,150 Q200,95 400,150" fill="#0e3b2e" stroke="#10b981" />
            <line x1="40" y1="140" x2="40" y2={140 - h1 / 3} stroke="#e2e8f0" strokeWidth="3" />
            <line x1="360" y1="140" x2="360" y2={140 - h2 / 3} stroke="#e2e8f0" strokeWidth="3" />
            <line x1="40" y1={140 - h1 / 3} x2="360" y2={140 - h2 / 3} className={`prop-path los ${140 - h1 / 3 > 120 && 140 - h2 / 3 > 120 ? 'blocked' : ''}`} />
            <text x="200" y="30" className="wave-label" textAnchor="middle">{d.toFixed(1)} km achievable</text>
          </svg>
        </div>
      </div>
    </div>
  );
}
