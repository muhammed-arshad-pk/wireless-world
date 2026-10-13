import { useEffect, useMemo, useState } from 'react';
import { useMission } from '../../context/GameContext';
import { Slider } from '../shared';

const BANDS = [['900 MHz', 900], ['2.4 GHz', 2400], ['5 GHz', 5000]];

export default function FadingViz() {
  const { complete } = useMission('w1-fading');
  const [fMHz, setF] = useState(900);
  const [x, setX] = useState(20); // receiver position, cm
  const [a, setA] = useState(0.85); // reflected path strength
  const [dKm, setD] = useState(2);
  const [fsplF, setFsplF] = useState(2400);
  const [speed, setSpeed] = useState(60); // km/h

  const lambda = 30000 / fMHz; // cm (c / f with f in MHz → 3e10 cm/s / f)
  const amp = (pos) => { const ph = (4 * Math.PI * pos) / lambda; return Math.hypot(1 + a * Math.cos(ph), a * Math.sin(ph)) / (1 + a); };
  const cur = amp(x);
  const phase = (4 * Math.PI * x) / lambda;

  useEffect(() => { if (cur < 0.2) complete('deepfade'); }, [cur, complete]);
  const fspl = 20 * Math.log10(dKm) + 20 * Math.log10(fsplF) + 32.44;
  useEffect(() => { if (Math.abs(dKm - 1) < 0.05 && fsplF === 900) complete('fspl'); }, [dKm, fsplF, complete]);

  const plot = useMemo(() => {
    let p = '';
    for (let i = 0; i <= 600; i += 2) { const pos = (i / 600) * 100; const y = 150 - amp(pos) * 130; p += `${i ? 'L' : 'M'}${i},${y.toFixed(1)} `; }
    return p;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lambda, a]);

  const v = speed / 3.6; const fd = v / ((lambda / 100));
  // Phasor drawing
  const s = 60;
  const dx = s * a * Math.cos(phase); const dy = -s * a * Math.sin(phase);

  return (
    <div className="viz">
      <div className="viz-grid">
        <div className="viz-stage">
          <svg viewBox="0 0 600 260">
            <rect x="560" y="20" width="18" height="150" fill="#475569" />
            <text x="569" y="190" className="wave-label" textAnchor="middle">wall</text>
            <text x="10" y="18" className="wave-label">Received amplitude vs receiver position (0–100 cm)</text>
            <line x1="0" y1="150" x2="600" y2="150" className="wave-axis" />
            <line x1="0" y1={150 - 0.2 * 130} x2="600" y2={150 - 0.2 * 130} stroke="#ef4444" strokeDasharray="4 6" opacity=".6" />
            <text x="4" y={150 - 0.2 * 130 - 4} className="wave-label" fill="#fca5a5">deep fade (20%)</text>
            <path d={plot} fill="none" stroke="#22d3ee" strokeWidth="2.5" />
            <line x1={x * 6} y1="20" x2={x * 6} y2="150" stroke="#fde68a" strokeDasharray="3 4" />
            <circle cx={x * 6} cy={150 - cur * 130} r="7" fill={cur < 0.2 ? '#ef4444' : '#fde68a'} />
            <g transform="translate(110,215)">
              <text x="-100" y="-28" className="wave-label">Phasors:</text>
              <line x1="0" y1="0" x2={s} y2="0" stroke="#22d3ee" strokeWidth="3" markerEnd="url(#arr)" />
              <line x1={s} y1="0" x2={s + dx} y2={dy} stroke="#f472b6" strokeWidth="3" />
              <line x1="0" y1="0" x2={s + dx} y2={dy} stroke="#fde68a" strokeWidth="2" strokeDasharray="4 3" />
              <text x="-100" y="4" className="wave-label" fill="#67e8f9">direct</text>
              <text x="-100" y="20" className="wave-label" fill="#f9a8d4">reflected</text>
              <text x="-100" y="36" className="wave-label" fill="#fde68a">sum</text>
            </g>
            <text x="300" y="225" className="wave-label">Phase difference: {((phase * 180) / Math.PI % 360).toFixed(0)}°</text>
          </svg>
        </div>
        <div className="lab-card">
          <h3>Two-ray multipath</h3>
          <div className="row-gap">{BANDS.map(([l, v2]) => <button key={l} className={`chip ${fMHz === v2 ? 'on' : ''}`} onClick={() => setF(v2)}>{l}</button>)}</div>
          <Slider label="Receiver position" value={x} min={0} max={100} step={0.5} onChange={setX} unit=" cm" />
          <Slider label="Reflected-path strength" value={a} min={0} max={1} step={0.01} onChange={setA} fmt={(v2) => v2.toFixed(2)} />
          <div className="readout">
            <div><small>Wavelength λ</small><strong>{lambda.toFixed(1)} cm</strong></div>
            <div><small>Null spacing (λ/2)</small><strong>{(lambda / 2).toFixed(1)} cm</strong></div>
            <div><small>Signal now</small><strong className={cur < 0.2 ? 'red' : ''}>{(cur * 100).toFixed(0)}%</strong></div>
          </div>
          <p className="hint">Move just a few centimetres: the signal swings from peak to deep fade every λ/2. That’s small-scale fading.</p>
        </div>
      </div>

      <div className="viz-grid">
        <div className="lab-card">
          <h3>📉 Free-space path loss</h3>
          <Slider label="Distance" value={dKm} min={0.01} max={50} step={0.01} onChange={setD} unit=" km" />
          <div className="row-gap">{[[900, '900 MHz'], [1800, '1800 MHz'], [2400, '2.4 GHz'], [5000, '5 GHz']].map(([v2, l]) => <button key={l} className={`chip ${fsplF === v2 ? 'on' : ''}`} onClick={() => setFsplF(v2)}>{l}</button>)}</div>
          <div className="formula">FSPL = 20log₁₀(d km) + 20log₁₀(f MHz) + 32.44</div>
          <div className="readout"><div><small>Path loss</small><strong>{fspl.toFixed(1)} dB</strong></div><div><small>Power fraction left</small><strong>10^−{(fspl / 10).toFixed(1)}</strong></div></div>
        </div>
        <div className="lab-card">
          <h3>🚗 Doppler shift</h3>
          <Slider label="Vehicle speed" value={speed} min={0} max={350} onChange={setSpeed} unit=" km/h" />
          <div className="readout">
            <div><small>Max Doppler fd</small><strong>{fd.toFixed(1)} Hz</strong></div>
            <div><small>Coherence time</small><strong>{fd > 0 ? `${((0.423 / fd) * 1000).toFixed(1)} ms` : '∞'}</strong></div>
          </div>
          <p className="hint">At {BANDS.find((b) => b[1] === fMHz)?.[0]}, a high-speed train (300 km/h) sees the channel change every few milliseconds: fast fading.</p>
        </div>
      </div>
    </div>
  );
}
