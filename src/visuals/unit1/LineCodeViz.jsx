import { useState } from 'react';
import { useMission } from '../../context/GameContext';
import { sfx } from '../../effects/sfx';
import { BitEditor } from '../shared';

// Each encoder returns an array of [level for 1st half, level for 2nd half] per bit (+1 high, 0 zero, -1 low).
const SCHEMES = [
  { id: 'nrzl', name: 'NRZ-L', rule: '0 = high level, 1 = low level for the whole bit.', enc: (bits) => bits.map((b) => (b ? [-1, -1] : [1, 1])) },
  { id: 'nrzi', name: 'NRZI', rule: '1 = transition at the start of the bit, 0 = no transition.', enc: (bits) => { let l = -1; return bits.map((b) => { if (b) l = -l; return [l, l]; }); } },
  { id: 'ami', name: 'Bipolar-AMI', rule: '0 = no signal, 1 = pulse alternating between + and −.', enc: (bits) => { let p = 1; return bits.map((b) => { if (!b) return [0, 0]; const v = p; p = -p; return [v, v]; }); } },
  { id: 'man', name: 'Manchester', rule: 'Transition at mid-bit: 0 = high→low, 1 = low→high.', enc: (bits) => bits.map((b) => (b ? [-1, 1] : [1, -1])) },
  { id: 'dman', name: 'Differential Manchester', rule: 'Always a mid-bit transition. 0 = extra transition at the start, 1 = none.', enc: (bits) => { let l = 1; return bits.map((b) => { let first = l; if (!b) first = -l; const second = -first; l = second; return [first, second]; }); } },
];

const W = 52; const ROW = 70; const AMP = 20;

function trace(levels, y0) {
  let d = ''; let x = 0;
  levels.forEach(([a, b], i) => {
    const ya = y0 - a * AMP; const yb = y0 - b * AMP;
    d += i === 0 ? `M0,${ya} ` : `L${x},${ya} `;
    d += `L${x + W / 2},${ya} L${x + W / 2},${yb} L${x + W},${yb} `;
    x += W;
  });
  return d;
}

export default function LineCodeViz() {
  const { complete } = useMission('w1-linecode');
  const [bits, setBitsRaw] = useState([0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1]);
  const [focus, setFocus] = useState('man');
  const [seen, setSeen] = useState(() => new Set(['man']));
  const setBits = (b) => { setBitsRaw(b); sfx('click'); complete('edit'); };
  const pick = (id) => {
    setFocus(id); sfx('click');
    const n = new Set(seen).add(id); setSeen(n);
    if (n.size === SCHEMES.length) complete('schemes');
  };
  const width = bits.length * W + 120;
  const cur = SCHEMES.find((s) => s.id === focus);

  return (
    <div className="viz">
      <div className="lab-card">
        <h3>Your bits (click to flip)</h3>
        <BitEditor bits={bits} setBits={setBits} max={14} />
      </div>
      <div className="viz-stage">
        <svg viewBox={`-110 0 ${width} ${SCHEMES.length * ROW + 30}`}>
          {bits.map((b, i) => (
            <g key={i}>
              <line x1={i * W} y1="18" x2={i * W} y2={SCHEMES.length * ROW + 24} className="wave-grid" />
              <text x={i * W + W / 2} y="14" className="wave-bit">{b}</text>
            </g>
          ))}
          {SCHEMES.map((s, k) => {
            const y0 = 30 + k * ROW + ROW / 2;
            return (
              <g key={s.id} className={`lc-row ${focus === s.id ? 'on' : ''}`} onClick={() => pick(s.id)} style={{ cursor: 'pointer' }}>
                <rect x="-110" y={y0 - ROW / 2 + 4} width={width} height={ROW - 8} className="lc-bg" />
                <text x="-104" y={y0 + 4} className="wave-label lc-name">{s.name}</text>
                <line x1="0" y1={y0} x2={bits.length * W} y2={y0} className="wave-axis" />
                <path d={trace(s.enc(bits), y0)} className="lc-trace" />
              </g>
            );
          })}
        </svg>
      </div>
      <div className="info-box" key={focus}><b>{cur.name}:</b> {cur.rule} <span className="hint">(click a row to focus it, {seen.size}/{SCHEMES.length} explored)</span></div>
    </div>
  );
}
