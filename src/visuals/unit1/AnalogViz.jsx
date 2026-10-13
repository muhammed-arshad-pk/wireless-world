import { useEffect, useMemo, useState } from 'react';
import { useMission } from '../../context/GameContext';
import { Slider } from '../shared';

const W = 600;
function series(fn, y0, amp) { let d = ''; for (let x = 0; x <= W; x += 1) d += `${x ? 'L' : 'M'}${x},${(y0 - fn(x / W) * amp).toFixed(1)} `; return d; }

function Modulation({ complete }) {
  const [fm, setFm] = useState(2);
  const [fc, setFc] = useState(30);
  const [na, setNa] = useState(0.7);
  const [beta, setBeta] = useState(5);
  const [kp, setKp] = useState(1.5);
  useEffect(() => { if (na > 1) complete('overmod'); }, [na, complete]);
  const msg = (t) => Math.cos(2 * Math.PI * fm * t);
  const rows = useMemo(() => [
    { name: 'Message', d: series(msg, 50, 30), cls: 'msg' },
    { name: 'AM', d: series((t) => ((1 + na * msg(t)) / (1 + na)) * Math.cos(2 * Math.PI * fc * t), 140, 34), env: series((t) => (1 + na * msg(t)) / (1 + na), 140, 34), cls: 'am' },
    { name: 'FM', d: series((t) => Math.cos(2 * Math.PI * fc * t + beta * Math.sin(2 * Math.PI * fm * t)), 230, 30), cls: 'fm' },
    { name: 'PM', d: series((t) => Math.cos(2 * Math.PI * fc * t + kp * msg(t)), 320, 30), cls: 'pm' },
  ], [fm, fc, na, beta, kp]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className="viz-grid">
      <div className="viz-stage">
        <svg viewBox={`-60 10 ${W + 70} 350`}>
          {rows.map((r, k) => (
            <g key={r.name}>
              <text x="-56" y={54 + k * 90} className="wave-label lc-name">{r.name}</text>
              <path d={r.d} className={`mod-trace ${r.cls}`} />
              {r.env && <path d={r.env} className="env-trace" />}
            </g>
          ))}
        </svg>
      </div>
      <div className="lab-card">
        <Slider label="Message frequency fₘ" value={fm} min={1} max={5} step={0.5} onChange={setFm} unit=" (rel.)" />
        <Slider label="Carrier frequency f꜀" value={fc} min={15} max={50} onChange={setFc} unit=" (rel.)" />
        <Slider label="AM index nₐ" value={na} min={0} max={1.6} step={0.05} onChange={setNa} fmt={(v) => v.toFixed(2)} />
        <Slider label="FM index β = Δf/fₘ" value={beta} min={0} max={12} step={0.5} onChange={setBeta} />
        <Slider label="PM phase deviation (rad)" value={kp} min={0} max={3.14} step={0.05} onChange={setKp} fmt={(v) => v.toFixed(2)} />
        {na > 1 ? <div className="info-box warn-box">⚠ <b>Overmodulation!</b> nₐ &gt; 1 makes the envelope (dashed) cross zero, so an envelope detector can’t recover the message.</div>
          : <p className="hint">AM: the envelope follows the message. FM: the wave bunches up and spreads out. PM: phase shifts follow the message itself (FM follows its slope).</p>}
      </div>
    </div>
  );
}

function Pcm({ complete }) {
  const [fSig, setFSig] = useState(3);
  const [fs, setFs] = useState(20);
  const [bits, setBits] = useState(3);
  const aliasing = fs < 2 * fSig;
  const L = 2 ** bits;
  const fAlias = Math.abs(fSig - fs * Math.round(fSig / fs));
  useEffect(() => { if (aliasing) complete('alias'); }, [aliasing, complete]);
  useEffect(() => { if (bits >= 6) complete('bits'); }, [bits, complete]);

  const sig = (t) => Math.sin(2 * Math.PI * fSig * t);
  const q = (v) => { const step = 2 / L; const idx = Math.min(L - 1, Math.floor((v + 1) / step)); return { idx, val: -1 + step * (idx + 0.5) }; };
  const samples = useMemo(() => Array.from({ length: Math.floor(fs) + 1 }, (_, k) => { const t = k / fs; const v = sig(t); return { t, v, ...q(v) }; }), [fs, fSig, bits]); // eslint-disable-line react-hooks/exhaustive-deps
  const Y0 = 150; const A = 110;
  const hold = samples.map((s, k) => { const x0 = s.t * W; const x1 = (samples[k + 1]?.t ?? 1) * W; return `${k ? 'L' : 'M'}${x0},${Y0 - s.val * A} L${x1},${Y0 - s.val * A}`; }).join(' ');
  // Signed alias frequency: this lower-frequency sine passes exactly through every sample.
  const fA = fSig - fs * Math.round(fSig / fs);
  const aliasPath = series((t) => Math.sin(2 * Math.PI * fA * t), Y0, A);
  const maxErr = (2 / L / 2 / 2) * 100; // half step as % of full range (range = 2)

  return (
    <div className="viz-grid">
      <div className="viz-stage">
        <svg viewBox={`-10 20 ${W + 20} 270`}>
          {Array.from({ length: L + 1 }, (_, k) => <line key={k} x1="0" x2={W} y1={Y0 - (-1 + (2 / L) * k) * A} y2={Y0 - (-1 + (2 / L) * k) * A} className="wave-grid" />)}
          <path d={series(sig, Y0, A)} className="mod-trace msg" />
          <path d={hold} className="pcm-hold" />
          {aliasing && <path d={aliasPath} className="alias-trace" />}
          {samples.map((s, k) => <g key={k}><line x1={s.t * W} x2={s.t * W} y1={Y0} y2={Y0 - s.v * A} className="stem" /><circle cx={s.t * W} cy={Y0 - s.v * A} r="3.5" fill="#fde68a" /></g>)}
        </svg>
        <p className="hint" style={{ textAlign: 'center' }}>cyan = original · yellow dots = samples · green steps = quantized output {aliasing ? '· red dashed = what the samples look like (alias)' : ''}</p>
      </div>
      <div className="lab-card">
        <Slider label="Signal frequency" value={fSig} min={1} max={12} step={0.5} onChange={setFSig} unit=" Hz" />
        <Slider label="Sampling rate fₛ" value={fs} min={2} max={60} onChange={setFs} unit=" Hz" />
        <Slider label="Bits per sample n" value={bits} min={1} max={8} onChange={setBits} />
        <div className="readout">
          <div><small>Nyquist rate</small><strong>{2 * fSig} Hz</strong></div>
          <div><small>Levels 2ⁿ</small><strong>{L}</strong></div>
          <div><small>Max quant. error</small><strong>±{maxErr.toFixed(1)}%</strong></div>
          <div><small>SNRq ≈</small><strong>{(6.02 * bits + 1.76).toFixed(1)} dB</strong></div>
        </div>
        {aliasing
          ? <div className="info-box warn-box">⚠ <b>Aliasing!</b> fₛ = {fs} Hz &lt; 2 × {fSig} Hz. The samples now describe a {fAlias.toFixed(1)} Hz wave instead.</div>
          : <div className="info-box">✔ fₛ ≥ 2f: the signal can be reconstructed. First codes: {samples.slice(0, 4).map((s) => s.idx.toString(2).padStart(bits, '0')).join(' ')}</div>}
      </div>
    </div>
  );
}

export default function AnalogViz() {
  const { complete } = useMission('w1-analog');
  const [tab, setTab] = useState('mod');
  return (
    <div className="viz">
      <div className="seg">
        <button className={tab === 'mod' ? 'active' : ''} onClick={() => setTab('mod')}>AM / FM / PM</button>
        <button className={tab === 'pcm' ? 'active' : ''} onClick={() => setTab('pcm')}>Sampling & PCM</button>
      </div>
      {tab === 'mod' ? <Modulation complete={complete} /> : <Pcm complete={complete} />}
    </div>
  );
}
