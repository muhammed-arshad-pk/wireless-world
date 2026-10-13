import { useEffect, useState } from 'react';
import { useMission } from '../../context/GameContext';
import { sfx } from '../../effects/sfx';
import { Slider } from '../shared';

const APS = [{ id: 'AP1', x: 120, ch: 1 }, { id: 'AP2', x: 330, ch: 6 }, { id: 'AP3', x: 540, ch: 11 }];
const rssi = (dx) => -30 - 30 * Math.log10(Math.max(1, Math.abs(dx) / 8));
const JOIN = [
  { from: 'AP', label: 'Beacon (SSID "Campus", ch 6)', note: 'APs broadcast beacons about every 102 ms. Passive scanning listens for them.' },
  { from: 'STA', label: 'Probe Request', note: 'Active scanning: "Is the network Campus here?"' },
  { from: 'AP', label: 'Probe Response', note: 'The AP replies with its capabilities and supported rates.' },
  { from: 'STA', label: 'Authentication Request', note: 'Open-system authentication (then WPA2/WPA3 keys).' },
  { from: 'AP', label: 'Authentication Response', note: 'Authentication successful.' },
  { from: 'STA', label: 'Association Request', note: 'The station asks to join this BSS.' },
  { from: 'AP', label: 'Association Response (AID = 1)', note: 'Joined! The DS now knows the station is at this AP.' },
  { from: 'STA', label: 'Data ⇄ ACK', note: 'User data flows using CSMA/CA, with every frame acknowledged.' },
];

function Roam({ complete }) {
  const [x, setX] = useState(10); // start beside AP1, where the station is associated
  const [serving, setServing] = useState('AP1');
  const [visited, setVisited] = useState(() => new Set(['AP1']));
  const [log, setLog] = useState(['Associated with AP1 (BSSID 00:1A:…:01)']);
  const pos = 60 + x * 5.4; // walker's position in diagram coordinates
  const levels = APS.map((ap) => ({ ...ap, r: rssi(pos - ap.x) }));
  useEffect(() => {
    const cur = levels.find((l) => l.id === serving);
    const best = levels.reduce((a, b) => (b.r > a.r ? b : a));
    if (best.id !== serving && cur.r < -62 && best.r > cur.r + 5) {
      setServing(best.id); sfx('whoosh');
      setLog((l) => [`Reassociation → ${best.id} (ch ${best.ch}). DS updated. ${serving} forwards buffered frames.`, ...l].slice(0, 6));
      const n = new Set(visited).add(best.id); setVisited(n);
      if (n.size === 3) complete('roam');
    }
  }, [x]); // eslint-disable-line react-hooks/exhaustive-deps
  const sv = APS.find((a) => a.id === serving);
  return (
    <div className="viz-grid">
      <div className="viz-stage">
        <svg viewBox="0 0 660 300">
          <text x="330" y="22" className="wave-label" textAnchor="middle">ESS "Campus": one SSID, three BSSs</text>
          <line x1="60" y1="60" x2="600" y2="60" stroke="#94a3b8" strokeWidth="4" />
          <text x="66" y="52" className="wave-label">Distribution System (Ethernet backbone)</text>
          <rect x="590" y="40" width="60" height="40" rx="8" className="ap-box portal" /><text x="620" y="65" className="sat-lbl" fill="#0b1530">Portal</text>
          {APS.map((ap) => (
            <g key={ap.id}>
              <circle cx={ap.x} cy="170" r="125" className={`bss-zone ${serving === ap.id ? 'on' : ''}`} />
              <line x1={ap.x} y1="60" x2={ap.x} y2="130" stroke="#94a3b8" strokeWidth="2" />
              <rect x={ap.x - 26} y="130" width="52" height="30" rx="8" className={`ap-box ${serving === ap.id ? 'on' : ''}`} />
              <text x={ap.x} y="150" className="sat-lbl" fill="#0b1530">{ap.id}</text>
              <text x={ap.x} y="285" className="wave-label" textAnchor="middle">BSS {ap.id.slice(2)} · ch {ap.ch}</text>
            </g>
          ))}
          <text x={pos} y="240" fontSize="26" textAnchor="middle">🚶</text>
          <line x1={pos} y1="220" x2={sv.x} y2="160" stroke="#fde68a" strokeWidth="2.5" strokeDasharray="6 5" className="dash-path" />
        </svg>
      </div>
      <div className="lab-card">
        <Slider label="Walk across the campus" value={x} min={0} max={100} onChange={setX} />
        {levels.map((l) => <div key={l.id} className="rssi"><span>{l.id}</span><div className="bar"><span style={{ width: `${Math.max(0, Math.min(100, ((l.r + 95) / 65) * 100))}%`, background: l.id === serving ? '#fde68a' : '#475569' }} /></div><b>{l.r.toFixed(0)} dBm</b></div>)}
        <div className="term log">{log.map((l, i) => <div key={`${log.length - i}-${l}`}>{l}</div>)}</div>
        <p className="hint">Roams when the current AP drops below −62 dBm and another is 5 dB stronger. Visited {visited.size}/3.</p>
      </div>
    </div>
  );
}

function Join({ complete }) {
  const [step, setStep] = useState(0);
  const next = () => { const s = Math.min(JOIN.length, step + 1); setStep(s); sfx('click'); if (s === JOIN.length) complete('join'); };
  return (
    <div className="viz-grid">
      <div className="viz-stage">
        <svg viewBox="0 0 420 360">
          <text x="80" y="22" className="wave-bit">STA 📱</text><text x="340" y="22" className="wave-bit">AP 📶</text>
          <line x1="80" y1="32" x2="80" y2="350" className="lifeline" /><line x1="340" y1="32" x2="340" y2="350" className="lifeline" />
          {JOIN.slice(0, step).map((m, i) => {
            const y = 52 + i * 38; const fromSta = m.from === 'STA';
            return (
              <g key={m.label} className="seq-msg">
                <line x1={fromSta ? 84 : 336} y1={y} x2={fromSta ? 336 : 84} y2={y + 10} className={`seq-arrow ${fromSta ? 'up' : 'down'}`} markerEnd="url(#ah)" />
                <text x="210" y={y - 3} className="wave-label" textAnchor="middle" fill="#e2e8f0">{m.label}</text>
              </g>
            );
          })}
          <defs><marker id="ah" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8Z" fill="#fde68a" /></marker></defs>
        </svg>
      </div>
      <div className="lab-card">
        <h3>Joining a WLAN</h3>
        {step > 0 ? <div className="info-box" key={step}><b>{JOIN[step - 1].label}:</b> {JOIN[step - 1].note}</div> : <p className="hint">Press "Next frame" to see how a phone joins the network.</p>}
        <div className="row-gap">
          <button className="btn btn-primary btn-sm" onClick={next} disabled={step === JOIN.length}>Next frame ({step}/{JOIN.length})</button>
          <button className="btn btn-ghost btn-sm" onClick={() => setStep(0)}>Restart</button>
        </div>
        <p className="hint">Scan → authenticate → associate → data.</p>
      </div>
    </div>
  );
}

export default function EssViz() {
  const { complete } = useMission('w3-ess');
  const [tab, setTab] = useState('roam');
  return (
    <div className="viz">
      <div className="seg">
        <button className={tab === 'roam' ? 'active' : ''} onClick={() => setTab('roam')}>Roaming across an ESS</button>
        <button className={tab === 'join' ? 'active' : ''} onClick={() => setTab('join')}>Joining sequence</button>
      </div>
      {tab === 'roam' ? <Roam complete={complete} /> : <Join complete={complete} />}
    </div>
  );
}
