import { useEffect, useMemo, useState } from 'react';
import { useMission } from '../../context/GameContext';
import { sfx } from '../../effects/sfx';

const BARKER = [1, -1, 1, 1, -1, 1, 1, 1, -1, -1, -1];
const HOPS = [3, 7, 1, 5, 2, 8, 4, 0, 6, 3, 9, 1, 7, 5, 2, 8];
const CH = 10;

function Fhss({ complete }) {
  const [jam, setJam] = useState(false);
  const [mode, setMode] = useState('fhss');
  const jamCh = 5;
  const slots = HOPS.map((h, t) => (mode === 'fhss' ? h : jamCh));
  const hits = slots.filter((c) => jam && c === jamCh).length;
  const ok = slots.length - hits;
  const pick = (m, j) => {
    setMode(m); setJam(j); sfx(j ? 'alarm' : 'click');
    if (m === 'fhss' && j) complete('fhss');
  };
  return (
    <div className="viz-grid">
      <div className="viz-stage">
        <svg viewBox="0 0 640 300">
          <text x="14" y="16" className="wave-label">frequency channel ↑</text>
          <text x="626" y="292" textAnchor="end" className="wave-label">time →</text>
          {Array.from({ length: CH }, (_, c) => (
            <g key={c}>
              <rect x="40" y={262 - (c + 1) * 25} width="580" height="24" className={`hop-row ${jam && c === jamCh ? 'jam' : ''}`} />
              <text x="30" y={262 - c * 25 - 8} textAnchor="end" className="wave-label">f{c}</text>
            </g>
          ))}
          {slots.map((c, t) => (
            <rect key={t} x={42 + t * 36} y={262 - (c + 1) * 25 + 2} width="32" height="20" rx="4" className={`hop-cell ${jam && c === jamCh ? 'hit' : ''}`} style={{ animationDelay: `${t * 0.08}s` }} />
          ))}
          {jam && <text x="620" y={262 - jamCh * 25 - 8} textAnchor="end" className="wave-label" fill="#fca5a5">⚡ jammer on f{jamCh}</text>}
        </svg>
      </div>
      <div className="lab-card">
        <div className="seg small">
          <button className={mode === 'narrow' ? 'active' : ''} onClick={() => pick('narrow', jam)}>Narrowband (fixed f5)</button>
          <button className={mode === 'fhss' ? 'active' : ''} onClick={() => pick('fhss', jam)}>FHSS (hopping)</button>
        </div>
        <label className="switch dark"><input type="checkbox" checked={jam} onChange={(e) => pick(mode, e.target.checked)} /><span>⚡ Switch on a jammer at f{jamCh}</span></label>
        <div className="readout">
          <div><small>Slots delivered</small><strong className={ok === slots.length ? 'green' : ok === 0 ? 'red' : ''}>{ok}/{slots.length}</strong></div>
          <div><small>Hit by jammer</small><strong>{hits}</strong></div>
        </div>
        <p className="hint">Hop sequence: {HOPS.map((h) => `f${h}`).join(' → ')}. A narrowband link parked on the jammed channel loses everything. FHSS only loses the few hops that land there, and error correction or retransmission repairs them. Without the sequence, an eavesdropper hears only fragments.</p>
      </div>
    </div>
  );
}

function Dsss({ complete }) {
  const [bits, setBits] = useState([1, 0, 1, 1]);
  const [jam, setJam] = useState(false);
  const data = bits.map((b) => (b ? 1 : -1));
  const chips = data.flatMap((d) => BARKER.map((c) => d * c));
  // narrowband jammer: a slow sinusoid added to every chip
  const rx = chips.map((c, i) => c + (jam ? 1.6 * Math.sin(i * 0.12 + 0.6) : 0));
  const corr = useMemo(() => data.map((_, k) => rx.slice(k * 11, k * 11 + 11).reduce((s, v, i) => s + v * BARKER[i], 0)), [rx, data]);
  const dec = corr.map((c) => (c > 0 ? 1 : 0));
  const allOk = dec.every((b, i) => b === bits[i]);
  const W = 600 / chips.length;
  const y = (v, mid) => mid - v * 14;
  const toggleJam = (v) => { setJam(v); sfx(v ? 'alarm' : 'click'); };
  useEffect(() => { if (jam && allOk) complete('dsss'); }, [jam, allOk]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className="viz-grid">
      <div className="viz-stage">
        <svg viewBox="0 0 640 300">
          <text x="10" y="22" className="wave-label">data bits</text>
          {data.map((d, k) => <rect key={k} x={20 + k * 11 * W} y={d > 0 ? 30 : 46} width={11 * W - 2} height={d > 0 ? 16 : 16} fill={d > 0 ? '#fde68a' : '#94a3b8'} opacity=".85" />)}
          {bits.map((b, k) => <text key={k} x={20 + (k + 0.5) * 11 * W} y="42" textAnchor="middle" fontSize="12" fontWeight="800" fill="#0b1530">{b}</text>)}
          <text x="10" y="82" className="wave-label">× Barker chips (11 per bit) = transmitted chips</text>
          <path d={chips.map((c, i) => `${i ? 'L' : 'M'}${20 + i * W},${y(c, 112)} L${20 + (i + 1) * W},${y(c, 112)}`).join(' ')} fill="none" stroke="#22d3ee" strokeWidth="1.6" />
          <text x="10" y="152" className="wave-label">received = chips {jam ? '+ narrowband jammer' : '(clean)'}</text>
          <path d={rx.map((c, i) => `${i ? 'L' : 'M'}${20 + i * W},${y(c, 192)} L${20 + (i + 1) * W},${y(c, 192)}`).join(' ')} fill="none" stroke={jam ? '#f472b6' : '#22d3ee'} strokeWidth="1.6" />
          <text x="10" y="236" className="wave-label">despread: correlate each bit with the Barker code (±11 = perfect)</text>
          {corr.map((c, k) => (
            <g key={k}>
              <rect x={20 + k * 11 * W + 10} y={c > 0 ? 270 - Math.min(26, Math.abs(c) * 2.4) : 270} width={11 * W - 20} height={Math.min(26, Math.abs(c) * 2.4)} fill={dec[k] === bits[k] ? '#4ade80' : '#f87171'} />
              <text x={20 + (k + 0.5) * 11 * W} y="296" textAnchor="middle" className="wave-label" fill="#e2e8f0">{c.toFixed(1)} → {dec[k]}</text>
            </g>
          ))}
          <line x1="20" y1="270" x2="620" y2="270" stroke="rgba(148,163,184,.4)" />
        </svg>
      </div>
      <div className="lab-card">
        <div className="row-gap">{bits.map((b, i) => <button key={i} className={`bit-btn ${b ? 'one' : ''}`} onClick={() => { setBits(bits.map((x, k) => (k === i ? 1 - x : x))); sfx('tick'); }}>{b}</button>)}</div>
        <label className="switch dark"><input type="checkbox" checked={jam} onChange={(e) => toggleJam(e.target.checked)} /><span>⚡ Add a strong narrowband jammer</span></label>
        <div className="readout">
          <div><small>Chip rate / bit rate</small><strong>11</strong></div>
          <div><small>Processing gain</small><strong>10.4 dB</strong></div>
          <div><small>Decoded</small><strong className={allOk ? 'green' : 'red'}>{dec.join('')}</strong></div>
        </div>
        <p className="hint">The jammer is bigger than the chips themselves, yet each bit is decided by summing 11 chips × code. The jammer doesn’t match the Barker pattern, so it mostly cancels out in the sum.</p>
      </div>
    </div>
  );
}

export default function SpreadViz() {
  const { complete } = useMission('w5-ss');
  const [tab, setTab] = useState('fhss');
  return (
    <div className="viz">
      <div className="seg">
        <button className={tab === 'fhss' ? 'active' : ''} onClick={() => setTab('fhss')}>FHSS: frequency hopping</button>
        <button className={tab === 'dsss' ? 'active' : ''} onClick={() => setTab('dsss')}>DSSS: direct sequence</button>
      </div>
      {tab === 'fhss' ? <Fhss complete={complete} /> : <Dsss complete={complete} />}
    </div>
  );
}
