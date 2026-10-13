import { useMemo, useState } from 'react';
import { useMission } from '../../context/GameContext';
import { sfx } from '../../effects/sfx';
import { Slider } from '../shared';

const toBits = (s) => [...s].flatMap((ch) => ch.charCodeAt(0).toString(2).padStart(8, '0').split('').map(Number));
const fromBits = (b) => Array.from({ length: Math.floor(b.length / 8) }, (_, i) => String.fromCharCode(parseInt(b.slice(i * 8, i * 8 + 8).join(''), 2))).join('');
// deterministic pseudo-random so the same settings give the same errors
const rnd = (i, seed) => { const x = Math.sin(i * 12.9898 + seed * 78.233) * 43758.5453; return x - Math.floor(x); };

export default function IrSendViz() {
  const { complete } = useMission('w5-ir');
  const [msg, setMsg] = useState('HELLO');
  const [dist, setDist] = useState(3);
  const [sun, setSun] = useState(false);
  const [block, setBlock] = useState(false);
  const [sent, setSent] = useState(null);

  const pRx = block ? 0 : 1 / (dist * dist);
  const noise = 0.004 + (sun ? 0.05 : 0);
  const snr = pRx / noise;
  const ber = block ? 0.5 : Math.min(0.5, 0.5 * Math.exp(-snr / 2.2));

  const result = useMemo(() => {
    if (!sent) return null;
    const bits = toBits(sent.msg);
    const rx = bits.map((b, i) => (rnd(i, sent.seed) < sent.ber ? 1 - b : b));
    const errors = rx.reduce((n, b, i) => n + (b !== bits[i] ? 1 : 0), 0);
    return { bits, rx, errors, text: fromBits(rx) };
  }, [sent]);

  const send = () => {
    const s = { msg: msg.slice(0, 8) || 'HI', ber, seed: Math.round(dist * 10) + (sun ? 7 : 0) };
    setSent(s); sfx('whoosh');
    const bits = toBits(s.msg);
    const errs = bits.filter((b, i) => rnd(i, s.seed) < s.ber).length;
    if (errs === 0 && !block) { complete('clean'); sfx('good'); }
    if (errs > 0 && (sun || dist > 6) && !block) complete('noisy');
    if (errs > 0) sfx('bad');
  };

  const shown = result ? result.bits.slice(0, 40) : toBits(msg.slice(0, 5) || 'HI').slice(0, 40);
  const rxX = 120 + dist * 42;
  return (
    <div className="viz">
      <div className="viz-stage">
        <svg viewBox="0 0 640 220">
          {sun && <g><circle cx="560" cy="34" r="22" fill="#facc15" /><text x="560" y="74" textAnchor="middle" className="wave-label" fill="#fde68a">sunlight (IR noise)</text></g>}
          <rect x="40" y="96" width="60" height="40" rx="8" fill="#334155" />
          <circle cx="104" cy="116" r="7" fill="#ef4444" className={sent ? 'ir-led' : ''} />
          <text x="70" y="156" textAnchor="middle" className="wave-label">IR LED Tx</text>
          {!block && <polygon points={`110,116 ${rxX - 12},${116 - dist * 6} ${rxX - 12},${116 + dist * 6}`} fill="rgba(239,68,68,.18)" />}
          <line x1="110" y1="116" x2={block ? 300 : rxX - 12} y2="116" stroke="#ef4444" strokeWidth="2" strokeDasharray="5 5" className="dash-path" />
          {block && <text x="315" y="138" textAnchor="middle" fontSize="54">🧍</text>}
          <rect x={rxX - 12} y="100" width="40" height="32" rx="6" fill={pRx > 0.02 && !block ? '#22c55e' : '#475569'} />
          <text x={rxX + 8} y="156" textAnchor="middle" className="wave-label">Photodiode Rx</text>
          <text x={rxX + 8} y="92" textAnchor="middle" className="wave-label" fill="#fde68a">{dist} m</text>
          {shown.map((b, i) => <rect key={i} x={40 + i * 14} y={b ? 184 : 204} width="12" height={b ? 24 : 4} fill={result && result.rx[i] !== result.bits[i] ? '#f87171' : '#fca5a5'} opacity={b ? 1 : 0.4} />)}
          <text x="40" y="180" className="wave-label">pulses (on-off keying) · red = flipped bit</text>
        </svg>
      </div>
      <div className="viz-grid">
        <div className="lab-card">
          <label className="ctrl"><span className="ctrl-row"><span>Message (max 8 chars)</span></span>
            <input className="dark-input" value={msg} maxLength={8} onChange={(e) => setMsg(e.target.value.toUpperCase())} />
          </label>
          <Slider label="Distance" value={dist} min={1} max={10} step={0.5} unit=" m" onChange={setDist} />
          <label className="switch dark"><input type="checkbox" checked={sun} onChange={(e) => setSun(e.target.checked)} /><span>☀️ Bright sunlight through the window</span></label>
          <label className="switch dark"><input type="checkbox" checked={block} onChange={(e) => setBlock(e.target.checked)} /><span>🧍 Person blocks the beam</span></label>
          <button className="btn btn-primary btn-sm" onClick={send}>🔴 Transmit</button>
        </div>
        <div className="lab-card">
          <div className="readout">
            <div><small>Received power (rel.)</small><strong>{block ? '0' : (pRx * 100).toFixed(1)}%</strong></div>
            <div><small>SNR (rel.)</small><strong>{block ? '-' : snr.toFixed(1)}</strong></div>
            <div><small>Bit error rate</small><strong className={ber < 0.001 ? 'green' : 'red'}>{ber < 0.0001 ? '≈ 0' : ber.toFixed(3)}</strong></div>
          </div>
          {result && (
            <div className={`info-box ${result.errors ? 'bad' : ''}`}>
              Sent <b>{sent.msg}</b> → received <b>{block ? '(nothing)' : result.text.replace(/[^\x20-\x7e]/g, '�')}</b> · {block ? 'link blocked' : `${result.errors} bit error${result.errors === 1 ? '' : 's'}`}
            </div>
          )}
          <p className="hint">Received IR power falls with 1/d² (inverse-square law). Sunlight adds background IR noise, and a person blocks line of sight completely. That's why IR WLANs are short-range and room-sized.</p>
        </div>
      </div>
    </div>
  );
}
