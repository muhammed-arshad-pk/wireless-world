import { useEffect, useState } from 'react';
import { useMission } from '../../context/GameContext';
import { sfx } from '../../effects/sfx';

const BUTTONS = [['Power', 0x08], ['Vol +', 0x02], ['Vol −', 0x03], ['Ch +', 0x00], ['Ch −', 0x01], ['Mute', 0x09]];
const ADDR = 0x04;
const bits8 = (v) => Array.from({ length: 8 }, (_, i) => (v >> i) & 1); // LSB first

function Link({ complete }) {
  const [mode, setMode] = useState('los');
  const [blocked, setBlocked] = useState(false);
  const [flags, setFlags] = useState({ losBlocked: false, diffuseOk: false });
  const ok = mode === 'diffuse' || !blocked;
  useEffect(() => {
    const f = { losBlocked: flags.losBlocked || (mode === 'los' && blocked), diffuseOk: flags.diffuseOk || (mode === 'diffuse' && blocked) };
    setFlags(f);
    if (f.losBlocked && f.diffuseOk) complete('block');
  }, [mode, blocked]); // eslint-disable-line react-hooks/exhaustive-deps
  const TX = [80, 200]; const RX = [520, 200];
  const ceil = [180, 300, 420].map((x) => [x, 40]);
  return (
    <div className="viz-grid">
      <div className="viz-stage">
        <svg viewBox="0 0 600 270">
          <rect x="20" y="30" width="560" height="220" className="room" />
          <text x="300" y="24" className="wave-label" textAnchor="middle">Ceiling (reflective)</text>
          {mode === 'los'
            ? <line x1={TX[0]} y1={TX[1]} x2={blocked ? 290 : RX[0]} y2={RX[1]} className="ir-beam" />
            : ceil.map(([x, y]) => <path key={x} d={`M${TX[0]},${TX[1]} L${x},${y} L${RX[0]},${RX[1]}`} className="ir-beam diffuse" />)}
          {blocked && <text x="300" y="232" fontSize="64" textAnchor="middle">🧍</text>}
          <g><rect x={TX[0] - 18} y={TX[1] - 12} width="36" height="24" rx="5" className="ir-dev" /><circle cx={TX[0] + 18} cy={TX[1]} r="5" fill="#ef4444" /><text x={TX[0]} y={TX[1] + 34} className="wave-label" textAnchor="middle">IR LED Tx</text></g>
          <g><rect x={RX[0] - 18} y={RX[1] - 12} width="36" height="24" rx="5" className={`ir-dev ${ok ? 'lit' : ''}`} /><text x={RX[0]} y={RX[1] + 34} className="wave-label" textAnchor="middle">Photodiode Rx</text></g>
          <text x="590" y="150" className="wave-label" textAnchor="end" fill="#94a3b8">wall ▌ no IR leaks out</text>
        </svg>
      </div>
      <div className="lab-card">
        <div className="seg small">
          <button className={mode === 'los' ? 'active' : ''} onClick={() => { setMode('los'); sfx('click'); }}>Directed (LOS)</button>
          <button className={mode === 'diffuse' ? 'active' : ''} onClick={() => { setMode('diffuse'); sfx('click'); }}>Diffuse (reflected)</button>
        </div>
        <label className="switch dark"><input type="checkbox" checked={blocked} onChange={(e) => { setBlocked(e.target.checked); sfx(e.target.checked ? 'bad' : 'click'); }} /><span>Person walks into the room</span></label>
        <div className="readout">
          <div><small>Link</small><strong className={ok ? 'green' : 'red'}>{ok ? 'CONNECTED' : 'BLOCKED'}</strong></div>
          <div><small>Relative power</small><strong>{!ok ? '0%' : mode === 'los' ? '100%' : '≈ 20%'}</strong></div>
          <div><small>Data rate</small><strong>{mode === 'los' ? 'Higher' : 'Lower'}</strong></div>
        </div>
        <p className="hint">Directed IR is efficient but any obstacle breaks it. Diffuse IR floods the room via reflections. It survives obstacles but delivers less power, and multipath delay limits its speed.</p>
      </div>
    </div>
  );
}

function Remote({ complete }) {
  const [last, setLast] = useState(null);
  const [count, setCount] = useState(0);
  const [vol, setVol] = useState(10);
  const [on, setOn] = useState(true);
  const press = ([name, code]) => {
    setLast({ name, code, k: Date.now() }); sfx('tick');
    const c = count + 1; setCount(c); if (c >= 3) complete('remote');
    if (name === 'Power') setOn((v) => !v);
    if (name === 'Vol +') setVol((v) => Math.min(20, v + 1));
    if (name === 'Vol −') setVol((v) => Math.max(0, v - 1));
    if (name === 'Mute') setVol(0);
  };
  // NEC frame: 9 ms burst, 4.5 ms space, 32 bits (addr, ~addr, cmd, ~cmd), final 562.5 µs burst.
  const frame = last ? [...bits8(ADDR), ...bits8(~ADDR & 0xff), ...bits8(last.code), ...bits8(~last.code & 0xff)] : [];
  const pulses = []; let t = 0;
  if (last) {
    pulses.push([0, 9]); t = 13.5;
    frame.forEach((b) => { pulses.push([t, 0.5625]); t += 0.5625 + (b ? 1.6875 : 0.5625); });
    pulses.push([t, 0.5625]); t += 0.5625;
  }
  const px = 700 / 70;
  return (
    <div className="viz">
      <div className="viz-grid">
        <div className="lab-card remote">
          {BUTTONS.map((b) => <button key={b[0]} className="remote-btn" onClick={() => press(b)}>{b[0]}</button>)}
        </div>
        <div className="viz-stage tv">
          <div className={`tv-screen ${on ? 'on' : ''}`}>{on ? <><span>📺 Channel 7</span><div className="bar"><span style={{ width: `${vol * 5}%` }} /></div><small>Volume {vol}</small></> : <small>off</small>}</div>
        </div>
      </div>
      <div className="viz-stage">
        <svg viewBox="-10 0 720 120">
          <line x1="0" y1="80" x2="700" y2="80" className="wave-axis" />
          {pulses.map(([s, len], i) => <rect key={`${last?.k}-${i}`} x={s * px} y="40" width={Math.max(1.5, len * px)} height="40" className="ir-pulse" />)}
          {last && <><text x={4.5 * px} y="32" className="wave-label" textAnchor="middle">9 ms leader</text><text x="350" y="108" className="wave-label" textAnchor="middle">address 0x{ADDR.toString(16).padStart(2, '0')} · ~address · command 0x{last.code.toString(16).padStart(2, '0')} · ~command (LSB first)</text></>}
          {!last && <text x="350" y="70" className="wave-label" textAnchor="middle">Press a remote button to see its NEC infrared pulse train</text>}
        </svg>
      </div>
      {last && <div className="info-box"><b>{last.name}</b> sent as 32 bits: {frame.join('')}. Each burst is a 38 kHz flicker of the IR LED. Bit 0 = short gap, bit 1 = long gap (pulse-distance coding).</div>}
    </div>
  );
}

export default function IrViz() {
  const { complete } = useMission('w3-ir');
  const [tab, setTab] = useState('link');
  return (
    <div className="viz">
      <div className="seg">
        <button className={tab === 'link' ? 'active' : ''} onClick={() => setTab('link')}>LOS vs diffuse</button>
        <button className={tab === 'remote' ? 'active' : ''} onClick={() => setTab('remote')}>TV remote (NEC code)</button>
      </div>
      {tab === 'link' ? <Link complete={complete} /> : <Remote complete={complete} />}
    </div>
  );
}
