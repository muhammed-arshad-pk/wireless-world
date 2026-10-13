import { useEffect, useState } from 'react';
import { useMission } from '../../context/GameContext';
import { Slider } from '../shared';

const COLORS = ['#22d3ee', '#f472b6', '#facc15'];
const MCS = [
  ['0', 'BPSK', '1/2', 8.6, 5], ['1', 'QPSK', '1/2', 17.2, 8], ['2', 'QPSK', '3/4', 25.8, 11], ['3', '16-QAM', '1/2', 34.4, 14],
  ['4', '16-QAM', '3/4', 51.6, 17], ['5', '64-QAM', '2/3', 68.8, 21], ['6', '64-QAM', '3/4', 77.4, 23], ['7', '64-QAM', '5/6', 86.0, 25],
  ['8', '256-QAM', '3/4', 103.2, 29], ['9', '256-QAM', '5/6', 114.7, 31], ['10', '1024-QAM', '3/4', 129.0, 34], ['11', '1024-QAM', '5/6', 143.4, 36],
];

function Planner({ complete }) {
  const [ch, setCh] = useState([1, 3, 6]);
  const centre = (n) => 2407 + 5 * n;
  const overlaps = [];
  for (let i = 0; i < 3; i++) for (let j = i + 1; j < 3; j++) if (Math.abs(ch[i] - ch[j]) < 5) overlaps.push([i, j]);
  useEffect(() => { if (overlaps.length === 0) complete('plan'); }, [overlaps.length, complete]);
  const fx = (f) => ((f - 2395) / 100) * 700;
  return (
    <div className="viz-grid">
      <div className="viz-stage">
        <svg viewBox="0 0 700 230">
          {Array.from({ length: 13 }, (_, k) => k + 1).map((n) => <g key={n}><line x1={fx(centre(n))} x2={fx(centre(n))} y1="180" y2="186" className="wave-axis" /><text x={fx(centre(n))} y="200" className="wave-label" textAnchor="middle">{n}</text></g>)}
          <text x="350" y="222" className="wave-label" textAnchor="middle">2.4 GHz channel number (centre = 2407 + 5n MHz, each ≈ 22 MHz wide)</text>
          <line x1="0" y1="180" x2="700" y2="180" className="wave-axis" />
          {ch.map((n, i) => {
            const x0 = fx(centre(n) - 11); const x1 = fx(centre(n) + 11);
            const bad = overlaps.some((p) => p.includes(i));
            return <path key={i} d={`M${x0},180 C${x0 + 10},40 ${x1 - 10},40 ${x1},180Z`} fill={COLORS[i]} fillOpacity=".35" stroke={bad ? '#ef4444' : COLORS[i]} strokeWidth={bad ? 3 : 2} />;
          })}
        </svg>
      </div>
      <div className="lab-card">
        {ch.map((n, i) => (
          <div key={i} className="ctrl">
            <span className="ctrl-row"><span style={{ color: COLORS[i] }}>AP {i + 1}</span><b>ch {n} · {centre(n)} MHz</b></span>
            <input type="range" min="1" max="13" value={n} onChange={(e) => setCh(ch.map((x, k) => (k === i ? Number(e.target.value) : x)))} />
          </div>
        ))}
        {overlaps.length
          ? <div className="info-box warn-box">⚠ Overlap between {overlaps.map(([a, b]) => `AP${a + 1}–AP${b + 1}`).join(', ')}. Channels need at least 5 numbers (25 MHz) apart.</div>
          : <div className="info-box">✔ No overlap. With 22 MHz-wide channels, the only fully non-overlapping set in 2.4 GHz is 1, 6 and 11 (or a shifted equivalent like 2/7/12).</div>}
      </div>
    </div>
  );
}

function Ladder({ complete }) {
  const [snr, setSnr] = useState(15);
  const idx = MCS.reduce((best, m, i) => (snr >= m[4] ? i : best), -1);
  useEffect(() => { if (idx >= 10) complete('mcs'); }, [idx, complete]);
  const cur = idx >= 0 ? MCS[idx] : null;
  return (
    <div className="viz-grid">
      <div className="lab-card">
        <Slider label="Signal-to-noise ratio (SNR)" value={snr} min={0} max={40} onChange={setSnr} unit=" dB" />
        <div className="readout">
          <div><small>MCS index</small><strong>{cur ? cur[0] : '—'}</strong></div>
          <div><small>Modulation</small><strong>{cur ? cur[1] : 'no link'}</strong></div>
          <div><small>Code rate</small><strong>{cur ? cur[2] : '—'}</strong></div>
          <div><small>PHY rate*</small><strong>{cur ? `${cur[3]} Mbps` : '0'}</strong></div>
        </div>
        <p className="hint">*802.11ax, 20 MHz, 1 spatial stream. Required SNRs are approximate. More streams and wider channels multiply these rates.</p>
      </div>
      <div className="mcs-ladder">
        {[...MCS].reverse().map((m) => {
          const i = Number(m[0]);
          return <div key={m[0]} className={`mcs-step ${i === idx ? 'on' : i < idx ? 'below' : ''}`}><span>MCS {m[0]}</span><b>{m[1]} {m[2]}</b><em>{m[3]} Mbps</em><small>≥ {m[4]} dB</small></div>;
        })}
      </div>
    </div>
  );
}

export default function PhyViz() {
  const { complete } = useMission('w3-phy');
  const [tab, setTab] = useState('plan');
  return (
    <div className="viz">
      <div className="seg">
        <button className={tab === 'plan' ? 'active' : ''} onClick={() => setTab('plan')}>2.4 GHz channel planner</button>
        <button className={tab === 'mcs' ? 'active' : ''} onClick={() => setTab('mcs')}>MCS ladder</button>
      </div>
      {tab === 'plan' ? <Planner complete={complete} /> : <Ladder complete={complete} />}
    </div>
  );
}
