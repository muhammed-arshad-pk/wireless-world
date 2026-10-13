import { useEffect, useMemo, useState } from 'react';
import { useMission } from '../../context/GameContext';
import { sfx } from '../../effects/sfx';
import { Slider } from '../shared';

const CLUSTERS = [{ n: 3, i: 1, j: 1 }, { n: 4, i: 2, j: 0 }, { n: 7, i: 2, j: 1 }, { n: 12, i: 2, j: 2 }];
const COLORS = ['#22d3ee', '#a78bfa', '#f472b6', '#34d399', '#facc15', '#fb923c', '#60a5fa', '#e879f9', '#4ade80', '#f87171', '#38bdf8', '#c084fc'];
const SIZE = 22;

function hexes(radius) {
  const out = [];
  for (let q = -radius; q <= radius; q++) for (let r = Math.max(-radius, -q - radius); r <= Math.min(radius, -q + radius); r++) out.push([q, r]);
  return out;
}
const center = ([q, r]) => [SIZE * Math.sqrt(3) * (q + r / 2), SIZE * 1.5 * r];
const corners = ([x, y]) => Array.from({ length: 6 }, (_, k) => { const a = (Math.PI / 180) * (60 * k - 30); return `${(x + SIZE * Math.cos(a)).toFixed(1)},${(y + SIZE * Math.sin(a)).toFixed(1)}`; }).join(' ');

function Reuse({ complete }) {
  const [cl, setCl] = useState(CLUSTERS[2]);
  const [seen, setSeen] = useState(() => new Set([7]));
  const [sel, setSel] = useState(null);
  const [nExp, setNExp] = useState(4);
  const cells = useMemo(() => hexes(5), []);
  // Co-channel lattice invariant: two cells share a channel set iff both residues match.
  const label = useMemo(() => {
    const map = new Map(); let next = 0;
    return (q, r) => {
      const { i, j, n } = cl;
      const a = (((i + j) * q + j * r) % n + n) % n; const b = (((-j) * q + i * r) % n + n) % n;
      const key = `${a},${b}`; if (!map.has(key)) map.set(key, next++); return map.get(key);
    };
  }, [cl]);
  const D = Math.sqrt(3 * cl.n);
  const si = 10 * Math.log10(D ** nExp / 6);
  const pick = (c) => {
    setCl(c); setSel(null); sfx('click');
    const s = new Set(seen).add(c.n); setSeen(s);
    if (s.size === CLUSTERS.length) complete('reuse');
  };
  const selLabel = sel ? label(sel[0], sel[1]) : null;
  const [ox, oy] = center([0, 0]); const [cx2, cy2] = center([cl.i, cl.j]);

  return (
    <div className="viz-grid">
      <div className="viz-stage">
        <svg viewBox="-240 -210 480 420">
          {cells.map(([q, r]) => {
            const L = label(q, r); const c = center([q, r]);
            const dim = selLabel !== null && L !== selLabel;
            return (
              <g key={`${q},${r}`} onClick={() => { setSel([q, r]); sfx('tick'); }} style={{ cursor: 'pointer' }}>
                <polygon points={corners(c)} fill={COLORS[L % COLORS.length]} fillOpacity={dim ? 0.12 : 0.75} stroke="#0b1530" strokeWidth="1.5" />
                <text x={c[0]} y={c[1] + 4} className="hex-lbl">{String.fromCharCode(65 + L)}</text>
              </g>
            );
          })}
          <line x1={ox} y1={oy} x2={cx2} y2={cy2} stroke="#fff" strokeWidth="2.5" strokeDasharray="5 4" />
          <text x={(ox + cx2) / 2 + 6} y={(oy + cy2) / 2 - 6} className="wave-label" fill="#fff">D</text>
        </svg>
      </div>
      <div className="lab-card">
        <div className="row-gap">{CLUSTERS.map((c) => <button key={c.n} className={`chip ${cl.n === c.n ? 'on' : ''} ${seen.has(c.n) ? 'seen' : ''}`} onClick={() => pick(c)}>N = {c.n} (i={c.i}, j={c.j})</button>)}</div>
        <div className="formula">N = i² + ij + j² = {cl.n} · D/R = √(3N) = {D.toFixed(2)}</div>
        <Slider label="Path-loss exponent n" value={nExp} min={2} max={5} step={0.1} onChange={setNExp} fmt={(v) => v.toFixed(1)} />
        <div className="readout">
          <div><small>Reuse ratio Q</small><strong>{D.toFixed(2)}</strong></div>
          <div><small>S/I (6 interferers)</small><strong className={si >= 18 ? 'green' : ''}>{si.toFixed(1)} dB</strong></div>
          <div><small>Channels per cell</small><strong>1/{cl.n} of total</strong></div>
        </div>
        <p className="hint">Click any cell to highlight all cells reusing its channel set (same letter). Smaller N gives more capacity but closer interferers. AMPS needed about 18 dB, hence N = 7.</p>
      </div>
    </div>
  );
}

function Handoff({ complete }) {
  const [pos, setPos] = useState(10);
  const [hyst, setHyst] = useState(4);
  const [serving, setServing] = useState('A');
  const [log, setLog] = useState([]);
  const rssi = (d) => -40 - 35 * Math.log10(Math.max(0.05, d) * 10); // dBm, illustrative
  const a = rssi(pos / 10); const b = rssi((100 - pos) / 10);
  useEffect(() => {
    const cur = serving === 'A' ? a : b; const other = serving === 'A' ? b : a;
    if (other > cur + hyst) {
      const nxt = serving === 'A' ? 'B' : 'A';
      setServing(nxt); sfx('whoosh');
      setLog((l) => [`Handoff ${serving} → ${nxt} at ${pos} km (neighbour ${other.toFixed(0)} dBm > serving ${cur.toFixed(0)} dBm + ${hyst} dB)`, ...l].slice(0, 5));
      complete('handoff');
    }
  }, [pos]); // eslint-disable-line react-hooks/exhaustive-deps
  const bar = (v) => Math.max(0, Math.min(100, ((v + 110) / 70) * 100));
  return (
    <div className="viz-grid">
      <div className="viz-stage">
        <svg viewBox="0 0 600 220">
          <circle cx="60" cy="110" r="150" fill="#22d3ee" fillOpacity=".08" />
          <circle cx="540" cy="110" r="150" fill="#f472b6" fillOpacity=".08" />
          {[['A', 60, '#22d3ee'], ['B', 540, '#f472b6']].map(([k, x, c]) => <g key={k}><path d={`M${x - 12},150 L${x},80 L${x + 12},150`} fill="none" stroke={c} strokeWidth="3" /><text x={x} y="72" className="wave-bit" fill={c}>BS {k}</text></g>)}
          <line x1="60" y1="160" x2="540" y2="160" className="wave-axis" />
          <g transform={`translate(${60 + pos * 4.8},150)`}><text fontSize="26" textAnchor="middle">🚗</text></g>
          <line x1={60 + pos * 4.8} y1="135" x2={serving === 'A' ? 60 : 540} y2="95" stroke={serving === 'A' ? '#22d3ee' : '#f472b6'} strokeWidth="2.5" strokeDasharray="6 5" className="dash-path" />
        </svg>
      </div>
      <div className="lab-card">
        <Slider label="Car position" value={pos} min={0} max={100} onChange={setPos} unit=" km" />
        <Slider label="Handoff hysteresis margin" value={hyst} min={0} max={10} onChange={setHyst} unit=" dB" />
        <div className="rssi"><span>BS A</span><div className="bar"><span style={{ width: `${bar(a)}%`, background: '#22d3ee' }} /></div><b>{a.toFixed(0)} dBm</b></div>
        <div className="rssi"><span>BS B</span><div className="bar"><span style={{ width: `${bar(b)}%`, background: '#f472b6' }} /></div><b>{b.toFixed(0)} dBm</b></div>
        <p>Serving cell: <b>{serving}</b></p>
        <div className="term log">{log.length ? log.map((l) => <div key={l}>{l}</div>) : <div className="dim">Drive the car toward the other base station…</div>}</div>
        <p className="hint">Set hysteresis to 0 and wiggle near the middle: you get rapid "ping-pong" handoffs. A margin prevents that.</p>
      </div>
    </div>
  );
}

export default function CellViz() {
  const { complete } = useMission('w2-cellular');
  const [tab, setTab] = useState('reuse');
  return (
    <div className="viz">
      <div className="seg">
        <button className={tab === 'reuse' ? 'active' : ''} onClick={() => setTab('reuse')}>Frequency reuse</button>
        <button className={tab === 'handoff' ? 'active' : ''} onClick={() => setTab('handoff')}>Handoff</button>
      </div>
      {tab === 'reuse' ? <Reuse complete={complete} /> : <Handoff complete={complete} />}
    </div>
  );
}
