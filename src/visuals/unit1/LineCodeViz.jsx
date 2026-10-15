import { useState } from 'react';
import { useMission } from '../../context/GameContext';
import { sfx } from '../../effects/sfx';
import { BitEditor } from '../shared';

// Four data → signal conversions, each shown as: input wave → conversion box → output wave.
const W = 600; // drawing width of each waveform
const AMP = 26;
const TAU = Math.PI * 2;

const MODES = [
  { id: 'dd', label: 'Digital → Digital', device: 'Line coder', example: 'Ethernet, USB, computer buses', inKind: 'digital', outKind: 'digital',
    techs: [
      { id: 'nrz', name: 'NRZ', rule: '1 = high level, 0 = low level for the whole bit.' },
      { id: 'man', name: 'Manchester', rule: 'Every bit has a transition in the middle: 1 = low→high, 0 = high→low. Self-clocking.' },
      { id: 'ami', name: 'Bipolar-AMI', rule: '0 = zero volts, each 1 alternates + and −. Errors break the pattern, so they can be detected.' },
    ] },
  { id: 'da', label: 'Digital → Analog', device: 'Modem (modulator)', example: 'Wi-Fi, mobile data, dial-up modems', inKind: 'digital', outKind: 'analog',
    techs: [
      { id: 'ask', name: 'ASK', rule: 'Amplitude shift keying: carrier ON for 1, OFF (or small) for 0.' },
      { id: 'fsk', name: 'FSK', rule: 'Frequency shift keying: high frequency for 1, low frequency for 0.' },
      { id: 'psk', name: 'PSK', rule: 'Phase shift keying: the carrier phase flips by 180° when the bit is 0.' },
    ] },
  { id: 'ad', label: 'Analog → Digital', device: 'Codec (PCM)', example: 'Digital phone calls, voice recording, music CDs', inKind: 'analog', outKind: 'digital',
    techs: [{ id: 'pcm', name: 'PCM', rule: 'Sample the wave at regular times, round each sample to a level (quantize), then write each level as bits.' }] },
  { id: 'aa', label: 'Analog → Analog', device: 'Analog modulator', example: 'AM and FM radio broadcasting', inKind: 'analog', outKind: 'analog',
    techs: [
      { id: 'am', name: 'AM', rule: 'Amplitude modulation: the carrier’s height follows the message.' },
      { id: 'fm', name: 'FM', rule: 'Frequency modulation: the carrier squeezes together where the message is high and spreads out where it is low.' },
    ] },
];

const path = (fn, n = 400) => {
  let d = '';
  for (let i = 0; i <= n; i += 1) { const u = i / n; d += `${i ? 'L' : 'M'}${(u * W).toFixed(1)},${(-AMP * fn(u)).toFixed(1)}`; }
  return d;
};
const stepPath = (levels) => {
  const bw = W / levels.length;
  return levels.map(([a, b], i) => `${i ? 'L' : 'M'}${i * bw},${-AMP * a} L${i * bw + bw / 2},${-AMP * a} L${i * bw + bw / 2},${-AMP * b} L${(i + 1) * bw},${-AMP * b}`).join(' ');
};

function lineCode(tech, bits) {
  if (tech === 'nrz') return bits.map((b) => (b ? [1, 1] : [-1, -1]));
  if (tech === 'man') return bits.map((b) => (b ? [-1, 1] : [1, -1]));
  let p = 1;
  return bits.map((b) => { if (!b) return [0, 0]; const v = p; p = -p; return [v, v]; });
}

function Wave({ label, sub, children, h = 100, marks }) {
  return (
    <div className="enc-wave">
      <div className="enc-wave-head"><b>{label}</b><small>{sub}</small></div>
      <svg viewBox={`-10 ${-h / 2} ${W + 20} ${h}`}>
        <line x1="0" y1="0" x2={W} y2="0" className="wave-axis" />
        {marks}
        {children}
      </svg>
    </div>
  );
}

export default function LineCodeViz() {
  const { complete } = useMission('w1-linecode');
  const [mode, setMode] = useState('dd');
  const [tech, setTech] = useState({ dd: 'nrz', da: 'ask', ad: 'pcm', aa: 'am' });
  const [bits, setBitsRaw] = useState([1, 0, 1, 1, 0, 0, 1, 0]);
  const [samples, setSamples] = useState(8);
  const [nbits, setNbits] = useState(3);
  const [seen, setSeen] = useState(() => new Set(['dd']));

  const m = MODES.find((x) => x.id === mode);
  const t = m.techs.find((x) => x.id === tech[mode]);
  const pickMode = (id) => {
    setMode(id); sfx('click');
    const n = new Set(seen).add(id); setSeen(n);
    if (n.size === MODES.length) complete('schemes');
  };
  const pickTech = (id) => { setTech({ ...tech, [mode]: id }); sfx('tick'); };
  const setBits = (b) => { setBitsRaw(b); sfx('click'); complete('edit'); };

  const bw = W / bits.length;
  const bitMarks = bits.map((b, i) => (
    <g key={i}>
      <line x1={i * bw} y1={-AMP - 8} x2={i * bw} y2={AMP + 8} className="wave-grid" />
      <text x={i * bw + bw / 2} y={-AMP - 12} className="wave-bit">{b}</text>
    </g>
  ));

  // analog message used by A→D and A→A
  const msg = (u) => 0.85 * Math.sin(TAU * 1.5 * u);

  // ---- input wave ----
  const input = m.inKind === 'digital'
    ? <Wave label="Input: digital data" sub="discrete bits (0 / 1)" marks={bitMarks}><path d={stepPath(bits.map((b) => (b ? [1, 1] : [-1, -1])))} className="enc-in" /></Wave>
    : <Wave label="Input: analog data" sub="continuous wave (e.g. voice)"><path d={path(msg)} className="enc-in" /></Wave>;

  // ---- output wave ----
  let output;
  let code = null;
  if (mode === 'dd') {
    output = <Wave label={`Output: ${t.name} digital signal`} sub="voltage levels on a wire" marks={bitMarks}><path d={stepPath(lineCode(t.id, bits))} className="enc-out" /></Wave>;
  } else if (mode === 'da') {
    const fn = (u) => {
      const k = Math.min(bits.length - 1, Math.floor(u * bits.length));
      const b = bits[k];
      const cyc = bits.length * 3;
      if (t.id === 'ask') return (b ? 1 : 0.12) * Math.sin(TAU * cyc * u);
      if (t.id === 'fsk') return Math.sin(TAU * (b ? cyc * 1.6 : cyc * 0.6) * u);
      return Math.sin(TAU * cyc * u + (b ? 0 : Math.PI));
    };
    output = <Wave label={`Output: ${t.name} analog signal`} sub="modulated carrier for the air" marks={bitMarks}><path d={path(fn, 1200)} className="enc-out" /></Wave>;
  } else if (mode === 'ad') {
    const L = 2 ** nbits;
    const pts = Array.from({ length: samples }, (_, i) => {
      const u = (i + 0.5) / samples;
      const v = msg(u);
      const q = Math.min(L - 1, Math.round(((v + 1) / 2) * (L - 1)));
      return { u, v, q, qv: (q / (L - 1)) * 2 - 1 };
    });
    code = pts.map((p) => p.q.toString(2).padStart(nbits, '0'));
    const stair = pts.map((p) => [p.qv, p.qv]);
    output = (
      <>
        <Wave label="Step 1–2: sample & quantize" sub={`${samples} samples · ${L} levels`}>
          {Array.from({ length: L }, (_, k) => <line key={k} x1="0" x2={W} y1={-AMP * ((k / (L - 1)) * 2 - 1)} y2={-AMP * ((k / (L - 1)) * 2 - 1)} className="wave-grid" />)}
          <path d={path(msg)} className="enc-in faint" />
          <path d={stepPath(stair)} className="enc-q" />
          {pts.map((p) => <g key={p.u}><line x1={p.u * W} y1="0" x2={p.u * W} y2={-AMP * p.v} className="enc-stem" /><circle cx={p.u * W} cy={-AMP * p.v} r="3.5" className="enc-dot" /></g>)}
        </Wave>
        <div className="enc-code">
          <span className="enc-wave-head"><b>Step 3: encode → output bit stream</b><small>{nbits} bits per sample</small></span>
          <div>{code.map((c, i) => <code key={i}>{c}</code>)}</div>
        </div>
      </>
    );
  } else {
    const fn = t.id === 'am'
      ? (u) => ((1 + 0.75 * msg(u)) / 1.75) * Math.sin(TAU * 24 * u)
      : (() => { let ph = 0; const N = 1200; const arr = []; for (let i = 0; i <= N; i += 1) { const u = i / N; ph += (TAU * (24 + 14 * msg(u))) / N; arr.push(Math.sin(ph)); } return (u) => arr[Math.round(u * N)]; })();
    output = (
      <Wave label={`Output: ${t.name} signal`} sub="message carried on a high-frequency carrier">
        <path d={path(fn, 1200)} className="enc-out" />
        {t.id === 'am' && <path d={path((u) => (1 + 0.75 * msg(u)) / 1.75)} className="enc-env" />}
      </Wave>
    );
  }

  return (
    <div className="viz">
      <div className="seg">
        {MODES.map((x) => <button key={x.id} className={mode === x.id ? 'active' : ''} onClick={() => pickMode(x.id)}>{x.label}</button>)}
      </div>

      <div className="enc-flow">
        <div className="viz-stage">{input}</div>
        <div className="enc-box">
          <span className="enc-arrow">▼</span>
          <div>
            <b>{m.device}</b>
            {m.techs.length > 1
              ? <div className="row-gap">{m.techs.map((x) => <button key={x.id} className={`chip ${tech[mode] === x.id ? 'on' : ''}`} onClick={() => pickTech(x.id)}>{x.name}</button>)}</div>
              : <span className="chip on">{t.name}</span>}
          </div>
          <span className="enc-arrow">▼</span>
        </div>
        <div className="viz-stage">{output}</div>
      </div>

      <div className="viz-grid">
        <div className="lab-card">
          {m.inKind === 'digital' ? (
            <>
              <h3>Your data bits (click to flip)</h3>
              <BitEditor bits={bits} setBits={setBits} max={10} />
            </>
          ) : mode === 'ad' ? (
            <>
              <h3>PCM settings</h3>
              <div className="row-gap">
                <span className="hint">Samples:</span>
                {[4, 8, 16].map((n) => <button key={n} className={`chip ${samples === n ? 'on' : ''}`} onClick={() => { setSamples(n); sfx('tick'); complete('edit'); }}>{n}</button>)}
              </div>
              <div className="row-gap">
                <span className="hint">Bits per sample:</span>
                {[2, 3, 4].map((n) => <button key={n} className={`chip ${nbits === n ? 'on' : ''}`} onClick={() => { setNbits(n); sfx('tick'); complete('edit'); }}>{n}</button>)}
              </div>
              <p className="hint">More samples and more bits = closer copy of the wave, but more data to send.</p>
            </>
          ) : (
            <>
              <h3>The message</h3>
              <p>A smooth analog wave, like a voice signal, is too low in frequency to radiate from an antenna, so it rides on a high-frequency carrier.</p>
            </>
          )}
        </div>
        <div className="info-box enc-info" key={mode + t.id}>
          <b>{m.label} · {t.name}</b><br />
          {t.rule}<br />
          <span className="hint">Used in: {m.example}. Explored {seen.size}/4 conversions.</span>
        </div>
      </div>
    </div>
  );
}
