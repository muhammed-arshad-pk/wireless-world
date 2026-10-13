import { useMemo, useState } from 'react';
import { useMission } from '../../context/GameContext';
import { sfx } from '../../effects/sfx';
import { BitEditor, Slider, si } from '../shared';

const BW = 70; // pixels per bit
const ROWS = [
  { id: 'ask', name: 'ASK', fn: (b, t) => (b ? 1 : 0.12) * Math.sin(2 * Math.PI * 3 * t) },
  { id: 'fsk', name: 'FSK', fn: (b, t) => Math.sin(2 * Math.PI * (b ? 4 : 2) * t) },
  { id: 'bpsk', name: 'BPSK', fn: (b, t) => Math.sin(2 * Math.PI * 3 * t + (b ? 0 : Math.PI)) },
];

function Waveforms({ complete }) {
  const [bits, setBitsRaw] = useState([1, 0, 1, 1, 0, 1, 0]);
  const setBits = (b) => { setBitsRaw(b); sfx('click'); complete('modulate'); };
  const W = bits.length * BW;
  const paths = useMemo(() => ROWS.map((r, k) => {
    const y0 = 60 + k * 90; let d = '';
    for (let x = 0; x <= W; x += 1) { const i = Math.min(bits.length - 1, Math.floor(x / BW)); const t = (x % BW) / BW; d += `${x ? 'L' : 'M'}${x},${(y0 - r.fn(bits[i], t) * 30).toFixed(1)} `; }
    return d;
  }), [bits, W]);
  return (
    <>
      <div className="lab-card"><h3>Binary input</h3><BitEditor bits={bits} setBits={setBits} max={10} /></div>
      <div className="viz-stage">
        <svg viewBox={`-70 0 ${W + 80} 300`}>
          {bits.map((b, i) => <g key={i}><line x1={i * BW} y1="20" x2={i * BW} y2="290" className="wave-grid" /><text x={i * BW + BW / 2} y="16" className="wave-bit">{b}</text></g>)}
          {ROWS.map((r, k) => <g key={r.id}><text x="-64" y={64 + k * 90} className="wave-label lc-name">{r.name}</text><line x1="0" y1={60 + k * 90} x2={W} y2={60 + k * 90} className="wave-axis" /><path d={paths[k]} className={`mod-trace m${k}`} /></g>)}
        </svg>
      </div>
      <p className="hint">ASK: amplitude switches. FSK: frequency switches. BPSK: the wave flips 180° wherever the bit changes. Look at the phase jumps.</p>
    </>
  );
}

// Constellations with Gray-coded labels.
function points(kind) {
  if (kind === 'BPSK') return [{ i: 1, q: 0, bits: '1' }, { i: -1, q: 0, bits: '0' }];
  if (kind === 'QPSK') return [['00', 45], ['01', 135], ['11', 225], ['10', 315]].map(([bits, a]) => ({ i: Math.cos((a * Math.PI) / 180), q: Math.sin((a * Math.PI) / 180), bits }));
  if (kind === '8PSK') return ['000', '001', '011', '010', '110', '111', '101', '100'].map((bits, k) => ({ i: Math.cos((k * Math.PI) / 4), q: Math.sin((k * Math.PI) / 4), bits }));
  const g = { '-3': '00', '-1': '01', 1: '11', 3: '10' };
  const out = [];
  [-3, -1, 1, 3].forEach((I) => [-3, -1, 1, 3].forEach((Q) => out.push({ i: I / 3, q: Q / 3, bits: g[I] + g[Q] })));
  return out;
}
// Deterministic pseudo-random noise so clouds don't jump on every render.
function rng(seed) { let s = seed; return () => { s = (s * 16807) % 2147483647; return s / 2147483647; }; }
function gauss(r) { return Math.sqrt(-2 * Math.log(r() + 1e-9)) * Math.cos(2 * Math.PI * r()); }

function Constellation({ complete }) {
  const [kind, setKind] = useState('16QAM');
  const [noise, setNoise] = useState(0.06);
  const [sel, setSel] = useState(null);
  const pts = points(kind);
  const cloud = useMemo(() => { const r = rng(42); const out = []; pts.forEach((p) => { for (let k = 0; k < 24; k++) out.push([p.i + gauss(r) * noise, p.q + gauss(r) * noise]); }); return out; }, [kind, noise]); // eslint-disable-line react-hooks/exhaustive-deps
  const S = 130; const cx = 160; const cy = 160;
  const p = sel !== null ? pts[sel] : null;
  const amp = p ? Math.hypot(p.i, p.q) : 0; const ph = p ? (Math.atan2(p.q, p.i) * 180) / Math.PI : 0;
  const choose = (k) => { setSel(k); sfx('click'); if (kind === '16QAM') complete('constellation'); };
  return (
    <div className="viz-grid">
      <div className="viz-stage">
        <svg viewBox="0 0 320 320">
          <line x1="20" y1={cy} x2="300" y2={cy} className="wave-axis" /><line x1={cx} y1="20" x2={cx} y2="300" className="wave-axis" />
          <text x="296" y={cy - 6} className="wave-label" textAnchor="end">I</text><text x={cx + 6} y="28" className="wave-label">Q</text>
          {cloud.map(([i, q], k) => <circle key={k} cx={cx + i * S} cy={cy - q * S} r="1.6" fill="#64748b" opacity=".6" />)}
          {pts.map((pt, k) => (
            <g key={pt.bits} onClick={() => choose(k)} style={{ cursor: 'pointer' }}>
              <circle cx={cx + pt.i * S} cy={cy - pt.q * S} r={sel === k ? 9 : 6} className={`const-pt ${sel === k ? 'on' : ''}`} />
              <text x={cx + pt.i * S} y={cy - pt.q * S - 11} className="const-lbl">{pt.bits}</text>
            </g>
          ))}
        </svg>
      </div>
      <div className="lab-card">
        <div className="row-gap">{['BPSK', 'QPSK', '8PSK', '16QAM'].map((k) => <button key={k} className={`chip ${kind === k ? 'on' : ''}`} onClick={() => { setKind(k); setSel(null); }}>{k}</button>)}</div>
        <div className="readout">
          <div><small>Bits / symbol</small><strong>{Math.log2(pts.length)}</strong></div>
          <div><small>Symbols</small><strong>{pts.length}</strong></div>
        </div>
        <Slider label="Channel noise" value={noise} min={0} max={0.3} step={0.01} onChange={setNoise} fmt={(v) => v.toFixed(2)} />
        {p ? <div className="info-box"><b>Symbol {p.bits}</b>: amplitude {amp.toFixed(2)}, phase {ph.toFixed(0)}°. Neighbouring points differ by one bit (Gray code).</div>
          : <p className="hint">Click a point to see which bits it carries. Increase the noise: when clouds overlap, errors begin, which is why dense QAM needs a high SNR.</p>}
      </div>
    </div>
  );
}

function Shannon({ complete }) {
  const [bExp, setBExp] = useState(6.3);
  const [snrDb, setSnrDb] = useState(20);
  const B = 10 ** bExp; const snr = 10 ** (snrDb / 10);
  const Cap = B * Math.log2(1 + snr);
  const touch = (fn) => (v) => { fn(v); complete('shannon'); };
  return (
    <div className="viz-grid">
      <div className="lab-card">
        <h3>Shannon capacity calculator</h3>
        <Slider label="Bandwidth B" value={bExp} min={3} max={9} step={0.01} onChange={touch(setBExp)} fmt={() => `${si(B)}Hz`} />
        <Slider label="SNR" value={snrDb} min={-10} max={50} onChange={touch(setSnrDb)} unit=" dB" />
        <div className="formula">C = B · log₂(1 + SNR) &nbsp; (SNR linear = 10^(dB/10) = {snr.toFixed(snr < 10 ? 2 : 0)})</div>
        <div className="readout">
          <div><small>Capacity C</small><strong>{si(Cap)}bps</strong></div>
          <div><small>Spectral efficiency</small><strong>{(Cap / B).toFixed(2)} b/s/Hz</strong></div>
        </div>
      </div>
      <div className="lab-card">
        <h3>What does this mean?</h3>
        <p>The capacity is an upper limit: no modulation and coding can beat it. A spectral efficiency of {(Cap / B).toFixed(1)} b/s/Hz suggests roughly {Math.max(1, Math.floor(Cap / B))}-bit symbols{Cap / B >= 8 ? ' (256-QAM territory)' : Cap / B >= 6 ? ' (64-QAM territory)' : Cap / B >= 4 ? ' (16-QAM territory)' : Cap / B >= 2 ? ' (QPSK territory)' : ' (BPSK territory)'}.</p>
        <p className="hint">Try a Wi-Fi channel: B = 20 MHz, SNR = 25 dB gives about 166 Mbps.</p>
      </div>
    </div>
  );
}

export default function DigiModViz() {
  const { complete } = useMission('w1-digimod');
  const [tab, setTab] = useState('wave');
  return (
    <div className="viz">
      <div className="seg">
        <button className={tab === 'wave' ? 'active' : ''} onClick={() => setTab('wave')}>ASK / FSK / BPSK</button>
        <button className={tab === 'const' ? 'active' : ''} onClick={() => setTab('const')}>Constellations</button>
        <button className={tab === 'cap' ? 'active' : ''} onClick={() => setTab('cap')}>Shannon capacity</button>
      </div>
      {tab === 'wave' && <Waveforms complete={complete} />}
      {tab === 'const' && <Constellation complete={complete} />}
      {tab === 'cap' && <Shannon complete={complete} />}
    </div>
  );
}
