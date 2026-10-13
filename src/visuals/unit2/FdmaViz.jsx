import { useEffect, useState } from 'react';
import { useMission } from '../../context/GameContext';
import { Slider } from '../shared';

const BT = 36; // MHz transponder
const COLORS = ['#22d3ee', '#a78bfa', '#f472b6', '#34d399', '#facc15', '#fb923c', '#60a5fa', '#e879f9', '#4ade80', '#f87171', '#38bdf8', '#c084fc'];

export default function FdmaViz() {
  const { complete } = useMission('w2-fdma');
  const [n, setN] = useState(4);
  const [g, setG] = useState(0.5); // MHz guard
  const [nonlinear, setNonlinear] = useState(false);
  const [backoff, setBackoff] = useState(0);
  const ch = Math.max(0, (BT - (n + 1) * g) / n);
  const eff = ((n * ch) / BT) * 100;
  useEffect(() => { if (n >= 6 && ch > 0) complete('alloc'); }, [n, ch, complete]);
  useEffect(() => { if (nonlinear && backoff >= 4) complete('im'); }, [nonlinear, backoff, complete]);

  const W = 720; const px = W / BT; const base = 180;
  const centers = Array.from({ length: n }, (_, i) => g + ch / 2 + i * (ch + g));
  const imLevel = nonlinear ? Math.max(0.05, 0.55 - backoff * 0.12) : 0;
  const ims = [];
  if (nonlinear && n >= 2) {
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) if (i !== j) { const f = 2 * centers[i] - centers[j]; if (f > 0 && f < BT) ims.push(f); }
  }
  const power = 100 * 10 ** (-backoff / 10);

  return (
    <div className="viz">
      <div className="viz-stage">
        <svg viewBox={`-10 0 ${W + 20} 220`}>
          <rect x="0" y="20" width={W} height={base - 20} className="fdma-band" />
          <text x={W / 2} y="14" className="wave-label" textAnchor="middle">36 MHz transponder</text>
          {centers.map((c, i) => {
            const x0 = (c - ch / 2) * px; const x1 = (c + ch / 2) * px; const top = base - 120;
            return <g key={i}><path d={`M${x0},${base} C${x0},${top} ${x1},${top} ${x1},${base}Z`} fill={COLORS[i % COLORS.length]} fillOpacity=".75" /><text x={c * px} y={base - 50} className="wave-bit" fill="#0b1530">E{i + 1}</text></g>;
          })}
          {g > 0 && Array.from({ length: n + 1 }, (_, i) => <rect key={i} x={(i * (ch + g)) * px} y="30" width={Math.max(1, g * px)} height={base - 30} className="guard" />)}
          {ims.map((f, k) => <line key={k} x1={f * px} x2={f * px} y1={base} y2={base - 140 * imLevel} className="im-spike" />)}
          <line x1="0" y1={base} x2={W} y2={base} className="wave-axis" />
          {[0, 9, 18, 27, 36].map((m) => <text key={m} x={m * px} y={base + 18} className="wave-label" textAnchor="middle">{m} MHz</text>)}
        </svg>
      </div>
      <div className="viz-grid">
        <div className="lab-card">
          <Slider label="Earth stations (channels)" value={n} min={1} max={12} onChange={setN} />
          <Slider label="Guard band" value={g} min={0} max={2} step={0.1} onChange={setG} unit=" MHz" />
          <div className="readout">
            <div><small>Channel width</small><strong>{ch.toFixed(2)} MHz</strong></div>
            <div><small>Spectrum efficiency</small><strong>{eff.toFixed(1)}%</strong></div>
          </div>
        </div>
        <div className="lab-card">
          <label className="switch dark"><input type="checkbox" checked={nonlinear} onChange={(e) => setNonlinear(e.target.checked)} /><span>Drive the TWTA near saturation (non-linear)</span></label>
          <Slider label="Amplifier back-off" value={backoff} min={0} max={8} step={0.5} onChange={setBackoff} unit=" dB" />
          <div className="readout">
            <div><small>IM products</small><strong className={imLevel > 0.3 ? 'red' : ''}>{nonlinear ? `${ims.length} (${imLevel > 0.3 ? 'strong' : 'weak'})` : 'none'}</strong></div>
            <div><small>Output power</small><strong>{power.toFixed(0)}%</strong></div>
          </div>
          <p className="hint">Red spikes at 2f₁ − f₂ land inside other users’ channels. Back-off weakens them but costs output power, FDMA’s classic trade-off.</p>
        </div>
      </div>
    </div>
  );
}
