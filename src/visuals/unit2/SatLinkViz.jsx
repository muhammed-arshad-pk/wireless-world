import { useEffect, useState } from 'react';
import { useMission } from '../../context/GameContext';
import { sfx } from '../../effects/sfx';
import { Slider } from '../shared';

const BANDS = { C: { up: 6, down: 4 }, Ku: { up: 14, down: 12 }, Ka: { up: 30, down: 20 } };
const BLOCKS = [
  { id: 'rx', label: 'Receive antenna', text: 'Collects the faint uplink signal arriving from 36,000 km away. It is billions of times weaker than when it left Earth.' },
  { id: 'lna', label: 'LNA', text: 'Low-Noise Amplifier: boosts the weak signal while adding as little noise as possible. It sets the receiver’s sensitivity.' },
  { id: 'conv', label: 'Frequency converter', text: 'A mixer + local oscillator shifts the uplink frequency down to the downlink frequency, so the satellite doesn’t jam its own receiver.' },
  { id: 'hpa', label: 'HPA (TWTA/SSPA)', text: 'High-Power Amplifier: raises the signal to tens of watts for the long trip down. In FDMA it must be backed off to avoid intermodulation.' },
  { id: 'tx', label: 'Transmit antenna', text: 'Shapes the downlink beam onto the footprint: global, regional or spot beam.' },
];
const R = 6378; const Cc = 299792.458;

export default function SatLinkViz() {
  const { complete } = useMission('w2-satsys');
  const [band, setBand] = useState('C');
  const [sel, setSel] = useState(null);
  const [seen, setSeen] = useState(() => new Set());
  const [h, setH] = useState(550);
  const [el, setEl] = useState(30);
  const b = BANDS[band];

  const pick = (blk) => {
    setSel(blk.id); sfx('click');
    const n = new Set(seen).add(blk.id); setSeen(n);
    if (n.size === BLOCKS.length) complete('blocks');
  };
  const E = (el * Math.PI) / 180;
  const slant = Math.sqrt((R + h) ** 2 - (R * Math.cos(E)) ** 2) - R * Math.sin(E);
  const oneWay = (slant / Cc) * 1000; // ms, ground → satellite
  useEffect(() => { if (h >= 35000) complete('delay'); }, [h, complete]);
  const cur = BLOCKS.find((x) => x.id === sel);

  return (
    <div className="viz">
      <div className="row-gap">{Object.keys(BANDS).map((k) => <button key={k} className={`chip ${band === k ? 'on' : ''}`} onClick={() => setBand(k)}>{k}-band ({BANDS[k].up}/{BANDS[k].down} GHz)</button>)}</div>
      <div className="viz-stage">
        <svg viewBox="0 0 800 330">
          <path d="M0,300 Q400,250 800,300 L800,330 L0,330Z" fill="#0e3b2e" stroke="#10b981" />
          <g transform="translate(90,250)"><path d="M-30,0 Q0,-40 30,0" fill="#cbd5e1" /><line x1="0" y1="-10" x2="0" y2="30" stroke="#cbd5e1" strokeWidth="3" /><text y="48" className="wave-label" textAnchor="middle">Tx earth station</text></g>
          {[620, 700].map((x) => <g key={x} transform={`translate(${x},262)`}><path d="M-14,0 Q0,-18 14,0" fill="#cbd5e1" /><line x1="0" y1="-4" x2="0" y2="20" stroke="#cbd5e1" strokeWidth="2" /></g>)}
          <text x="660" y="315" className="wave-label" textAnchor="middle">Receiving stations</text>
          <path d="M90,240 L170,70" className="link-up" />
          <path d="M600,70 L640,250 M600,70 L705,255" className="link-down" />
          <text x="95" y="150" className="wave-label" fill="#f9a8d4">Uplink {b.up} GHz</text>
          <text x="630" y="150" className="wave-label" fill="#67e8f9">Downlink {b.down} GHz</text>
          <rect x="150" y="20" width="470" height="80" rx="14" className="sat-body" />
          <text x="385" y="14" className="wave-label" textAnchor="middle">Satellite transponder (bent pipe)</text>
          {BLOCKS.map((blk, i) => {
            const x = 165 + i * 90;
            return (
              <g key={blk.id} onClick={() => pick(blk)} style={{ cursor: 'pointer' }}>
                <rect x={x} y="38" width="76" height="44" rx="8" className={`sat-block ${sel === blk.id ? 'on' : ''} ${seen.has(blk.id) ? 'seen' : ''}`} />
                <text x={x + 38} y="64" className="sat-lbl">{blk.label.length > 12 ? blk.label.split(' ')[0] : blk.label}</text>
                {i < BLOCKS.length - 1 && <path d={`M${x + 76},60 L${x + 90},60`} stroke="#fde68a" strokeWidth="2" markerEnd="" />}
              </g>
            );
          })}
          <circle r="5" fill="#fde68a"><animateMotion dur="3s" repeatCount="indefinite" path="M90,240 L170,70 L600,70 L640,250" /></circle>
        </svg>
      </div>
      {cur ? <div className="info-box" key={cur.id}><b>{cur.label}:</b> {cur.text}{cur.id === 'conv' ? ` Here: ${b.up} GHz → ${b.down} GHz.` : ''}</div> : <p className="hint">Click each block inside the satellite ({seen.size}/5 inspected).</p>}

      <div className="viz-grid">
        <div className="lab-card">
          <h3>⏱ Propagation delay</h3>
          <Slider label="Satellite altitude" value={h} min={300} max={36000} step={50} onChange={setH} unit=" km" />
          <div className="row-gap">{[['LEO 550', 550], ['MEO 20,200', 20200], ['GEO 35,786', 35786]].map(([l, v]) => <button key={l} className="chip" onClick={() => setH(v)}>{l}</button>)}</div>
          <Slider label="Elevation angle at station" value={el} min={5} max={90} onChange={setEl} unit="°" />
        </div>
        <div className="lab-card">
          <div className="readout">
            <div><small>Slant range</small><strong>{Math.round(slant).toLocaleString()} km</strong></div>
            <div><small>Ground → satellite</small><strong>{oneWay.toFixed(1)} ms</strong></div>
            <div><small>One hop (up + down)</small><strong>{(2 * oneWay).toFixed(0)} ms</strong></div>
            <div><small>Reply round trip</small><strong>{(4 * oneWay).toFixed(0)} ms</strong></div>
          </div>
          <p className="hint">At GEO a conversation has a gap of nearly half a second, noticeable on calls. LEO brings it down to milliseconds.</p>
        </div>
      </div>
    </div>
  );
}
