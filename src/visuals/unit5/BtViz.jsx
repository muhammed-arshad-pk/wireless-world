import { useRef, useState } from 'react';
import { useMission } from '../../context/GameContext';
import { sfx } from '../../effects/sfx';

const NEARBY = [
  { id: 'buds', name: 'WW Earbuds', icon: '🎧', rssi: -48, profile: 'A2DP audio' },
  { id: 'watch', name: 'Fit Watch', icon: '⌚', rssi: -61, profile: 'BLE GATT (heart rate)' },
  { id: 'kb', name: 'Desk Keyboard', icon: '⌨️', rssi: -70, profile: 'HID' },
];
const PERIPHS = ['🎧', '⌚', '⌨️', '🖱️', '🔊', '🎮', '🖨️', '📷', '💡', '🚗'];

function Pairing({ complete }) {
  const [stage, setStage] = useState('idle');
  const [found, setFound] = useState([]);
  const [target, setTarget] = useState(null);
  const [code] = useState(() => String(100000 + Math.floor(Math.random() * 900000)));
  const [log, setLog] = useState([]);
  const timers = useRef([]);
  const push = (m) => setLog((l) => [m, ...l].slice(0, 6));

  const scan = () => {
    setStage('scanning'); setFound([]); setTarget(null); sfx('whoosh');
    push('Phone: inquiry / scanning on advertising channels 37, 38, 39…');
    NEARBY.forEach((d, i) => timers.current.push(setTimeout(() => { setFound((f) => [...f, d]); sfx('tick'); }, 500 * (i + 1))));
    timers.current.push(setTimeout(() => setStage('found'), 500 * (NEARBY.length + 1)));
  };
  const pair = (d) => { setTarget(d); setStage('confirm'); push(`Pairing with ${d.name}: ECDH key exchange (Secure Simple Pairing)…`); sfx('click'); };
  const confirm = (yes) => {
    if (!yes) { setStage('found'); push('Pairing cancelled: codes did not match / user rejected.'); sfx('bad'); return; }
    setStage('paired'); push(`✔ Paired & bonded: link key stored for ${target.name}.`); sfx('good');
  };
  const connect = () => {
    setStage('connected'); push(`Connected: central = phone, peripheral = ${target.name}. Hopping 1600×/s over 79 channels.`);
    push(`Data exchange via ${target.profile}.`); complete('pair'); sfx('fanfare');
  };
  const reset = () => { timers.current.forEach(clearTimeout); setStage('idle'); setFound([]); setTarget(null); setLog([]); };
  const steps = ['Discovery', 'Pairing', 'Connection', 'Data exchange'];
  const idx = { idle: -1, scanning: 0, found: 0, confirm: 1, paired: 1, connected: 3 }[stage];

  return (
    <div className="viz-grid">
      <div className="viz-stage bt-stage">
        <div className="bt-steps">{steps.map((s, i) => <span key={s} className={i <= idx ? 'on' : ''}>{i + 1}. {s}</span>)}</div>
        <div className="bt-scene">
          <div className="bt-phone">
            <div className="bt-phone-screen">
              <b>Bluetooth</b>
              {stage === 'idle' && <small>Tap Scan to discover devices</small>}
              {(stage === 'scanning' || stage === 'found') && found.map((d) => <button key={d.id} className="bt-dev" onClick={() => pair(d)} disabled={stage === 'scanning'}>{d.icon} {d.name} <small>{d.rssi} dBm</small></button>)}
              {stage === 'confirm' && <div className="bt-code"><small>Confirm code on both devices</small><b>{code}</b><div><button onClick={() => confirm(true)}>Pair</button><button onClick={() => confirm(false)}>Cancel</button></div></div>}
              {(stage === 'paired' || stage === 'connected') && <div className="bt-code"><b>{target.icon} {target.name}</b><small>{stage === 'connected' ? 'Connected ✔' : 'Paired, not connected'}</small></div>}
            </div>
          </div>
          <div className={`bt-waves ${stage === 'connected' ? 'on' : stage !== 'idle' ? 'scan' : ''}`}>)))</div>
          <div className="bt-target">
            <span>{target ? target.icon : '❔'}</span>
            {stage === 'confirm' && <div className="bt-code small"><b>{code}</b><small>shown on device</small></div>}
          </div>
        </div>
      </div>
      <div className="lab-card">
        <div className="row-gap">
          <button className="btn btn-primary btn-sm" onClick={scan} disabled={stage === 'scanning'}>🔍 Scan</button>
          <button className="chip" onClick={connect} disabled={stage !== 'paired'}>🔗 Connect</button>
          <button className="chip" onClick={reset}>Reset</button>
        </div>
        <div className="log">{log.map((l, i) => <div key={`${i}-${l}`}>{l}</div>)}</div>
        <p className="hint">Numeric comparison: both devices compute the same 6-digit value from the ECDH exchange. If an attacker were in the middle, the numbers would differ.</p>
      </div>
    </div>
  );
}

function Piconet({ complete }) {
  const [a, setA] = useState(0);
  const [parked, setParked] = useState(0);
  const [bridge, setBridge] = useState(false);
  const [b, setB] = useState(2);
  const add = () => {
    if (a < 7) { const n = a + 1; setA(n); sfx('tick'); if (n === 7) { complete('piconet'); sfx('good'); } } else { setParked((p) => p + 1); sfx('bad'); }
  };
  const doBridge = () => { setBridge(true); setB(3); complete('scatter'); sfx('fanfare'); };
  const ring = (cx, cy, n, r, offset = 0) => Array.from({ length: n }, (_, i) => { const t = (i / Math.max(n, 1)) * Math.PI * 2 - Math.PI / 2 + offset; return [cx + r * Math.cos(t), cy + r * Math.sin(t)]; });
  const A = [190, 150];
  const B = [500, 150];
  const pa = ring(A[0], A[1], a, 95);
  const pb = ring(B[0], B[1], b, 80, 0.5);
  return (
    <div className="viz-grid">
      <div className="viz-stage">
        <svg viewBox="0 0 640 300">
          <circle cx={A[0]} cy={A[1]} r="125" className="pico-zone" />
          <text x={A[0]} y="16" textAnchor="middle" className="wave-label">Piconet 1 · {a}/7 active{parked ? ` · ${parked} parked` : ''}</text>
          {pa.map(([x, y], i) => <line key={i} x1={A[0]} y1={A[1]} x2={x} y2={y} className="pico-link" />)}
          {pa.map(([x, y], i) => <g key={`n${i}`}><circle cx={x} cy={y} r="17" className="pico-node" /><text x={x} y={y + 6} textAnchor="middle" fontSize="16">{PERIPHS[i]}</text></g>)}
          <circle cx={A[0]} cy={A[1]} r="24" className="pico-node central" /><text x={A[0]} y={A[1] + 7} textAnchor="middle" fontSize="20">📱</text>
          {bridge && (
            <>
              <circle cx={B[0]} cy={B[1]} r="105" className="pico-zone two" />
              <text x={B[0]} y="30" textAnchor="middle" className="wave-label">Piconet 2</text>
              {pb.map(([x, y], i) => <line key={i} x1={B[0]} y1={B[1]} x2={x} y2={y} className="pico-link" />)}
              {pb.map(([x, y], i) => <g key={`m${i}`}><circle cx={x} cy={y} r="15" className="pico-node" /><text x={x} y={y + 5} textAnchor="middle" fontSize="14">{['🔊', '🎮', '🖨️'][i]}</text></g>)}
              <circle cx={B[0]} cy={B[1]} r="22" className="pico-node central two" /><text x={B[0]} y={B[1] + 7} textAnchor="middle" fontSize="18">💻</text>
              <circle cx="345" cy="150" r="17" className="pico-node bridge" /><text x="345" y="156" textAnchor="middle" fontSize="16">⌚</text>
              <line x1={A[0]} y1={A[1]} x2="328" y2="150" className="pico-link bridge" />
              <line x1="362" y1="150" x2={B[0]} y2={B[1]} className="pico-link bridge" />
              <text x="345" y="186" textAnchor="middle" className="wave-label" fill="#fde68a">bridge</text>
            </>
          )}
        </svg>
      </div>
      <div className="lab-card">
        <div className="row-gap">
          <button className="btn btn-primary btn-sm" onClick={add}>+ Add peripheral</button>
          <button className="chip" onClick={doBridge} disabled={bridge}>🔗 Bridge to a second piconet</button>
          <button className="chip" onClick={() => { setA(0); setParked(0); setBridge(false); }}>Reset</button>
        </div>
        <div className="readout">
          <div><small>Active peripherals</small><strong className={a === 7 ? 'red' : ''}>{a}/7</strong></div>
          <div><small>Parked / waiting</small><strong>{parked}</strong></div>
          <div><small>Network</small><strong>{bridge ? 'Scatternet' : 'Piconet'}</strong></div>
        </div>
        {a === 7 && <div className="info-box">Limit reached: a central addresses peripherals with a 3-bit active member address (1–7). Extra devices must be parked (up to 255) or join another piconet.</div>}
        <p className="hint">All devices in a piconet follow the central’s clock and hopping sequence. A device in two piconets (the bridge) time-shares between them, forming a scatternet.</p>
      </div>
    </div>
  );
}

export default function BtViz() {
  const { complete } = useMission('w5-bt');
  const [tab, setTab] = useState('pair');
  return (
    <div className="viz">
      <div className="seg">
        <button className={tab === 'pair' ? 'active' : ''} onClick={() => setTab('pair')}>Pair two devices</button>
        <button className={tab === 'pico' ? 'active' : ''} onClick={() => setTab('pico')}>Piconet & scatternet</button>
      </div>
      {tab === 'pair' ? <Pairing complete={complete} /> : <Piconet complete={complete} />}
    </div>
  );
}
