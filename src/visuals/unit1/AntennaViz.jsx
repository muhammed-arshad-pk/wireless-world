import { useEffect, useMemo, useState } from 'react';
import { useMission } from '../../context/GameContext';
import { sfx } from '../../effects/sfx';
import { Slider } from '../shared';

// Normalised field patterns (illustrative) as a function of angle φ (radians) from the beam direction / horizontal.
const raised = (p, n) => ((1 + Math.cos(p)) / 2) ** n;
// Vertical half-wave dipole, p = elevation angle: |cos(π/2·sin p) / cos p|.
const dipole = (p) => { const c = Math.cos(p); return Math.abs(c) < 1e-3 ? 0 : Math.abs(Math.cos((Math.PI / 2) * Math.sin(p)) / c); };
const TYPES = [
  { id: 'iso', name: 'Isotropic (reference)', gain: '0 dBi', steer: false, f: () => 1, note: 'An ideal point source radiating equally everywhere. It is the 0 dBi reference, and doesn’t physically exist.' },
  { id: 'dipole', name: 'Half-wave dipole', gain: '2.15 dBi', steer: false, f: (p) => dipole(p), note: 'Side view of a vertical dipole: a doughnut. Maximum broadside and zero along the wire axis. Omnidirectional in the horizontal plane.' },
  { id: 'mono', name: 'Quarter-wave monopole', gain: '≈ 5 dBi (ideal ground)', steer: false, f: (p) => (Math.sin(p) < 0 ? 0 : dipole(p)), note: 'Half a dipole over a ground plane: the same shape as a dipole, but radiation only above ground. Used on cars and handsets.' },
  { id: 'yagi', name: 'Yagi-Uda', gain: '7–15 dBi', steer: true, f: (p) => Math.max(raised(p, 4), 0.18 * raised(p + Math.PI, 6)), note: 'A driven dipole plus a reflector and directors gives a directional beam with a small back lobe.' },
  { id: 'patch', name: 'Patch (microstrip)', gain: '6–9 dBi', steer: true, f: (p) => (Math.cos(p) > 0 ? Math.cos(p) ** 1.4 : 0.04), note: 'A flat radiator over a ground plane radiates broadside (one hemisphere). Used in phones, GPS and 5G arrays.' },
  { id: 'horn', name: 'Horn', gain: '10–25 dBi', steer: true, f: (p) => raised(p, 10), note: 'A flared waveguide gives a clean, moderately narrow beam. Used as a feed for dishes.' },
  { id: 'dish', name: 'Parabolic dish', gain: '30–60 dBi', steer: true, f: (p) => { const m = Math.exp(-((p / 0.13) ** 2)); const side = 0.07 * Math.abs(Math.sin(p * 9)) * Math.exp(-Math.abs(p) * 1.2); return Math.max(m, side); }, note: 'A reflector focuses energy into a pencil beam with tiny side lobes. Used for satellite TV, radar and deep space.' },
];

function hpbw(f) {
  // Numerically find the beamwidth where power (field²) ≥ 0.5 around the maximum direction 0.
  let a = 0;
  while (a < Math.PI && f(a) ** 2 >= 0.5 * f(0) ** 2) a += 0.002;
  return a >= Math.PI ? 360 : Math.round((a * 2 * 180) / Math.PI);
}

export default function AntennaViz() {
  const { complete } = useMission('w1-antenna');
  const [type, setType] = useState('dipole');
  const [seen, setSeen] = useState(() => new Set(['dipole']));
  const [steer, setSteer] = useState(0);
  const [tx, setTx] = useState('v');
  const [rx, setRx] = useState(90); // start aligned with the vertical transmitter
  const t = TYPES.find((x) => x.id === type);

  const pathD = useMemo(() => {
    let max = 0; const pts = [];
    for (let a = 0; a <= 360; a += 1) {
      const p = (a * Math.PI) / 180;
      const rel = t.steer ? Math.atan2(Math.sin(p - (steer * Math.PI) / 180), Math.cos(p - (steer * Math.PI) / 180)) : p;
      const v = t.f(rel); max = Math.max(max, v); pts.push([p, v]);
    }
    return pts.map(([p, v], i) => { const r = (v / (max || 1)) * 140; return `${i ? 'L' : 'M'}${(180 + r * Math.cos(p)).toFixed(1)},${(180 - r * Math.sin(p)).toFixed(1)}`; }).join(' ') + 'Z';
  }, [t, steer]);

  const bw = t.steer ? `${hpbw(t.f)}°` : t.id === 'iso' ? '360°' : t.id === 'dipole' ? '78° (E-plane)' : '≈ 39° above ground';

  const pick = (id) => {
    setType(id); sfx('whoosh');
    const n = new Set(seen).add(id); setSeen(n);
    if (n.size === TYPES.length) complete('types');
  };

  // Polarization loss: linear vs linear = cos²(Δ), circular vs linear = 0.5.
  const txAngle = tx === 'v' ? 90 : tx === 'h' ? 0 : null;
  const factor = txAngle === null ? 0.5 : Math.cos(((rx - txAngle) * Math.PI) / 180) ** 2;
  const lossDb = factor < 1e-4 ? 40 : -10 * Math.log10(factor);
  useEffect(() => { if (lossDb >= 20) complete('polar'); }, [lossDb, complete]);

  return (
    <div className="viz">
      <div className="row-gap">{TYPES.map((x) => <button key={x.id} className={`chip ${type === x.id ? 'on' : ''} ${seen.has(x.id) ? 'seen' : ''}`} onClick={() => pick(x.id)}>{x.name}</button>)}</div>
      <div className="viz-grid">
        <div className="viz-stage">
          <svg viewBox="0 0 360 360">
            {[35, 70, 105, 140].map((r) => <circle key={r} cx="180" cy="180" r={r} className="polar-grid" />)}
            {[0, 30, 60, 90, 120, 150].map((a) => { const p = (a * Math.PI) / 180; return <line key={a} x1={180 - 150 * Math.cos(p)} y1={180 + 150 * Math.sin(p)} x2={180 + 150 * Math.cos(p)} y2={180 - 150 * Math.sin(p)} className="polar-grid" />; })}
            <circle cx="180" cy="180" r={140 * Math.SQRT1_2} className="polar-3db" />
            <path key={type} d={pathD} className="polar-pattern" />
            <circle cx="180" cy="180" r="4" fill="#fde68a" />
            <text x="180" y="22" className="wave-label" textAnchor="middle">90°</text>
            <text x="345" y="184" className="wave-label">0°</text>
          </svg>
          <p className="hint" style={{ textAlign: 'center' }}>Dashed circle = −3 dB (half-power) level</p>
        </div>
        <div className="lab-card">
          <h3>{t.name}</h3>
          <p>{t.note}</p>
          <div className="readout">
            <div><small>Typical gain</small><strong>{t.gain}</strong></div>
            <div><small>Half-power beamwidth</small><strong>{bw}</strong></div>
          </div>
          {t.steer && <Slider label="Point the beam" value={steer} min={0} max={359} onChange={setSteer} unit="°" />}
        </div>
      </div>

      <div className="viz-grid">
        <div className="lab-card">
          <h3>Polarization match</h3>
          <div className="row-gap">
            {[['v', 'Vertical'], ['h', 'Horizontal'], ['c', 'Circular']].map(([k, l]) => <button key={k} className={`chip ${tx === k ? 'on' : ''}`} onClick={() => setTx(k)}>Tx: {l}</button>)}
          </div>
          <Slider label="Receiving antenna angle" value={rx} min={0} max={180} onChange={setRx} unit="°" />
          <div className="readout">
            <div><small>Power received</small><strong>{(factor * 100).toFixed(1)}%</strong></div>
            <div><small>Polarization loss</small><strong className={lossDb >= 20 ? 'red' : ''}>{lossDb >= 40 ? '> 40' : lossDb.toFixed(1)} dB</strong></div>
          </div>
          <p className="hint">Linear vs linear: power ∝ cos²(angle difference). A circular transmitter received on a linear antenna always loses 3 dB.</p>
        </div>
        <div className="viz-stage">
          <svg viewBox="0 0 300 160">
            <g transform="translate(80,80)">
              {tx === 'c'
                ? <circle r="40" className="efield-circ" />
                : <line x1={-40 * Math.cos(((txAngle) * Math.PI) / 180)} y1={40 * Math.sin(((txAngle) * Math.PI) / 180)} x2={40 * Math.cos(((txAngle) * Math.PI) / 180)} y2={-40 * Math.sin(((txAngle) * Math.PI) / 180)} className="efield" />}
              <text y="66" className="wave-label" textAnchor="middle">Tx E-field</text>
            </g>
            <g transform="translate(220,80)">
              <line x1={-40 * Math.cos((rx * Math.PI) / 180)} y1={40 * Math.sin((rx * Math.PI) / 180)} x2={40 * Math.cos((rx * Math.PI) / 180)} y2={-40 * Math.sin((rx * Math.PI) / 180)} className="rx-ant" />
              <text y="66" className="wave-label" textAnchor="middle">Rx antenna</text>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
