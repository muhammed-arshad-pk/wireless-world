import { useState } from 'react';
import { useMission } from '../../context/GameContext';
import { sfx } from '../../effects/sfx';

const WALSH = [[1, 1, 1, 1], [1, -1, 1, -1], [1, 1, -1, -1], [1, -1, -1, 1]];
const CHIP = 22; // px per chip

function Steps({ values, y0, amp = 16, color, max = 2 }) {
  let d = '';
  values.forEach((v, i) => { const y = y0 - (v / max) * amp * (max === 1 ? 1 : 1); d += `${i ? 'L' : 'M'}${i * CHIP},${y} L${(i + 1) * CHIP},${y} `; });
  return <path d={d} fill="none" stroke={color} strokeWidth="2.5" />;
}

export default function CdmaViz() {
  const { complete } = useMission('w2-cdma');
  const [bitsA, setBitsA] = useState([1, 0, 1]);
  const [bitsB, setBitsB] = useState([1, 1, 0]);
  const [codeA, setCodeA] = useState(1);
  const [codeB, setCodeB] = useState(2);
  const [rx, setRx] = useState(null);
  const [decoded, setDecoded] = useState(() => new Set());

  const sym = (b) => (b ? 1 : -1);
  const spread = (bits, c) => bits.flatMap((b) => WALSH[c].map((x) => sym(b) * x));
  const sA = spread(bitsA, codeA); const sB = spread(bitsB, codeB);
  const sum = sA.map((v, i) => v + sB[i]);
  const despread = (c) => bitsA.map((_, k) => sum.slice(k * 4, k * 4 + 4).reduce((acc, v, i) => acc + v * WALSH[c][i], 0) / 4);
  const result = rx !== null ? despread(rx) : null;

  const listen = (c) => {
    setRx(c); sfx('click');
    if (c === codeA || c === codeB) {
      const n = new Set(decoded).add(c === codeA ? 'A' : 'B'); setDecoded(n);
      if (n.size === 2) complete('decode');
    } else complete('wrongcode');
  };
  const flip = (setter, arr, i) => { setter(arr.map((x, k) => (k === i ? 1 - x : x))); setRx(null); };
  const W = 12 * CHIP;
  const free = [0, 1, 2, 3].filter((c) => c !== codeA && c !== codeB);

  return (
    <div className="viz">
      <div className="viz-grid">
        <div className="lab-card">
          <h3 className="ua">User A</h3>
          <div className="row-gap">{bitsA.map((b, i) => <button key={i} className={`bit-btn ${b ? 'one' : ''}`} onClick={() => flip(setBitsA, bitsA, i)}>{b}</button>)}</div>
          <div className="row-gap">{[0, 1, 2, 3].map((c) => <button key={c} disabled={c === codeB} className={`chip ${codeA === c ? 'on' : ''}`} onClick={() => { setCodeA(c); setRx(null); }}>W{c} [{WALSH[c].map((x) => (x > 0 ? '+' : '−')).join('')}]</button>)}</div>
        </div>
        <div className="lab-card">
          <h3 className="ub">User B</h3>
          <div className="row-gap">{bitsB.map((b, i) => <button key={i} className={`bit-btn ${b ? 'one' : ''}`} onClick={() => flip(setBitsB, bitsB, i)}>{b}</button>)}</div>
          <div className="row-gap">{[0, 1, 2, 3].map((c) => <button key={c} disabled={c === codeA} className={`chip ${codeB === c ? 'on' : ''}`} onClick={() => { setCodeB(c); setRx(null); }}>W{c} [{WALSH[c].map((x) => (x > 0 ? '+' : '−')).join('')}]</button>)}</div>
        </div>
      </div>

      <div className="viz-stage">
        <svg viewBox={`-130 0 ${W + 150} 300`}>
          {[0, 1, 2].map((k) => <g key={k}><rect x={k * 4 * CHIP} y="10" width={4 * CHIP} height="280" className={k % 2 ? 'bitcol odd' : 'bitcol'} /><text x={k * 4 * CHIP + 2 * CHIP} y="26" className="wave-label" textAnchor="middle">bit {k + 1}</text></g>)}
          {[['A spread (bit × code)', sA, 70, '#22d3ee', 1], ['B spread (bit × code)', sB, 130, '#f472b6', 1], ['Channel sum (A + B)', sum, 205, '#fde68a', 2]].map(([l, v, y, c, m]) => (
            <g key={l}><text x="-126" y={y + 4} className="wave-label lc-name">{l}</text><line x1="0" x2={W} y1={y} y2={y} className="wave-axis" /><Steps values={v} y0={y} amp={m === 2 ? 32 : 18} max={m} color={c} />
              {v.map((x, i) => <text key={i} x={i * CHIP + CHIP / 2} y={y + (m === 2 ? 50 : 34)} className="chip-val">{x > 0 ? `+${x}` : x}</text>)}
            </g>
          ))}
        </svg>
      </div>

      <div className="viz-grid">
        <div className="lab-card">
          <h3>📻 Receiver: despread with code…</h3>
          <div className="row-gap">
            <button className={`btn btn-sm ${rx === codeA ? 'btn-primary' : 'btn-ghost'}`} onClick={() => listen(codeA)}>W{codeA} (User A)</button>
            <button className={`btn btn-sm ${rx === codeB ? 'btn-primary' : 'btn-ghost'}`} onClick={() => listen(codeB)}>W{codeB} (User B)</button>
            {free.map((c) => <button key={c} className={`btn btn-sm ${rx === c ? 'btn-primary' : 'btn-ghost'}`} onClick={() => listen(c)}>W{c} (unused)</button>)}
          </div>
          <p className="hint">Despreading = multiply the sum by the code chip-by-chip, then average over each bit.</p>
        </div>
        <div className="lab-card">
          {result ? (
            <>
              <div className="readout">{result.map((v, k) => <div key={k}><small>bit {k + 1} correlation</small><strong className={v === 0 ? '' : 'green'}>{v > 0 ? '+1 → 1' : v < 0 ? '−1 → 0' : '0 → nothing'}</strong></div>)}</div>
              <div className="info-box">
                {rx === codeA ? `Recovered User A: ${result.map((v) => (v > 0 ? 1 : 0)).join(' ')}. Matches ${bitsA.join(' ')} ✔. User B cancelled out completely.`
                  : rx === codeB ? `Recovered User B: ${result.map((v) => (v > 0 ? 1 : 0)).join(' ')}. Matches ${bitsB.join(' ')} ✔. User A cancelled out completely.`
                    : 'Correlation is 0 for every bit: no one is using this code. Orthogonal codes are invisible to each other.'}
              </div>
            </>
          ) : <p className="hint">Pick a code to listen with. Decoded: {[...decoded].join(', ') || 'none yet'}</p>}
        </div>
      </div>
    </div>
  );
}
