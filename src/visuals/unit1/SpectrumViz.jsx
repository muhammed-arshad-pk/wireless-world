import { useEffect, useState } from 'react';
import { useMission } from '../../context/GameContext';
import { sfx } from '../../effects/sfx';
import { Slider, si, wavePath, C } from '../shared';

const BANDS = [
  { id: 'VLF', lo: 3e3, hi: 30e3, color: '#7c3aed', uses: 'Submarine communication, time signals, navigation', prop: 'Ground wave (penetrates seawater slightly)' },
  { id: 'LF', lo: 30e3, hi: 300e3, color: '#6366f1', uses: 'Long-wave broadcasting, RFID (125 kHz), navigation beacons', prop: 'Ground wave' },
  { id: 'MF', lo: 300e3, hi: 3e6, color: '#3b82f6', uses: 'AM medium-wave broadcasting, maritime radio', prop: 'Ground wave by day, sky wave at night' },
  { id: 'HF', lo: 3e6, hi: 30e6, color: '#0ea5e9', uses: 'Shortwave broadcasting, amateur radio, aviation HF', prop: 'Sky wave (ionosphere)' },
  { id: 'VHF', lo: 30e6, hi: 300e6, color: '#06b6d4', uses: 'FM radio (88–108 MHz), TV, air-traffic control', prop: 'Line of sight' },
  { id: 'UHF', lo: 300e6, hi: 3e9, color: '#10b981', uses: 'Mobile phones, Wi-Fi 2.4 GHz, Bluetooth, GPS, TV', prop: 'Line of sight + reflections' },
  { id: 'SHF', lo: 3e9, hi: 30e9, color: '#f59e0b', uses: 'Wi-Fi 5/6 GHz, satellite, radar, 5G (3.5 GHz)', prop: 'Line of sight' },
  { id: 'EHF', lo: 30e9, hi: 300e9, color: '#ef4444', uses: 'mmWave 5G (26/28 GHz), satellite links, radio astronomy', prop: 'Line of sight (heavy rain/oxygen absorption)' },
];
const PRESETS = [
  ['AM radio', 1e6], ['FM radio', 100e6], ['GSM 900', 900e6], ['Wi-Fi 2.4G', 2.4e9], ['Wi-Fi 5G', 5e9], ['5G mmWave', 28e9],
];

export default function SpectrumViz() {
  const { complete } = useMission('w1-spectrum');
  const [sel, setSel] = useState('UHF');
  const [seen, setSeen] = useState(() => new Set(['UHF']));
  const [exp, setExp] = useState(6); // 1 MHz, so the 2.4 GHz goal isn't met on load
  const f = 10 ** exp;
  const lambda = C / f;
  const band = BANDS.find((b) => f >= b.lo && f < b.hi);
  const cur = BANDS.find((b) => b.id === sel);

  useEffect(() => { if (Math.abs(f - 2.4e9) / 2.4e9 < 0.01) complete('calc'); }, [f, complete]);

  const pick = (b) => {
    setSel(b.id); sfx('click');
    const n = new Set(seen).add(b.id); setSeen(n);
    if (n.size === BANDS.length) complete('bands');
  };

  // Visual wave: more cycles on screen for higher frequency (log-scaled for readability).
  const cycles = 1 + (exp - 3) * 1.6;
  const path = wavePath((x) => Math.sin((x / 600) * cycles * 2 * Math.PI), 600, 50, 34);
  const fmtLen = (m) => (m >= 1000 ? `${si(m / 1000)}km` : m >= 1 ? `${si(m)}m` : m >= 0.01 ? `${(m * 100).toPrecision(3)} cm` : `${(m * 1000).toPrecision(3)} mm`);

  return (
    <div className="viz">
      <div className="lab-card">
        <h3>📻 Radio spectrum (click a band)</h3>
        <div className="spectrum-bar">
          {BANDS.map((b) => (
            <button key={b.id} className={`spec-band ${sel === b.id ? 'on' : ''} ${seen.has(b.id) ? 'seen' : ''}`} style={{ '--c': b.color }} onClick={() => pick(b)}>
              <strong>{b.id}</strong><small>{si(b.lo)}Hz</small>
            </button>
          ))}
        </div>
        <div className="info-box" key={cur.id}>
          <b>{cur.id}</b>: {si(cur.lo)}Hz – {si(cur.hi)}Hz · wavelength {fmtLen(C / cur.hi)} – {fmtLen(C / cur.lo)}<br />
          <b>Uses:</b> {cur.uses}<br /><b>Propagation:</b> {cur.prop}
        </div>
      </div>

      <div className="viz-grid">
        <div className="viz-stage">
          <svg viewBox="0 0 600 100">
            <line x1="0" y1="50" x2="600" y2="50" className="wave-axis" />
            <path d={path} fill="none" stroke={band?.color ?? '#22d3ee'} strokeWidth="2.5" />
          </svg>
          <p className="hint" style={{ textAlign: 'center' }}>Higher frequency → more cycles in the same space → shorter wavelength (illustrative scale)</p>
        </div>
        <div className="lab-card">
          <h3>λ = c / f calculator</h3>
          <Slider label="Frequency" value={exp} min={3} max={11.4} step={0.01} onChange={setExp} fmt={() => `${si(f)}Hz`} />
          <div className="row-gap">{PRESETS.map(([l, v]) => <button key={l} className="chip" onClick={() => { setExp(Math.log10(v)); sfx('click'); }}>{l}</button>)}</div>
          <div className="readout">
            <div><small>Wavelength λ</small><strong>{fmtLen(lambda)}</strong></div>
            <div><small>Half-wave dipole</small><strong>{fmtLen(lambda / 2)}</strong></div>
            <div><small>Period T</small><strong>{si(1 / f)}s</strong></div>
            <div><small>Band</small><strong>{band?.id ?? '—'}</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
}
