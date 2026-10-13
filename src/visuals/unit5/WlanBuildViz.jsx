import { useRef, useState } from 'react';
import { useMission } from '../../context/GameContext';
import { sfx } from '../../effects/sfx';

const CLIENTS = [
  { id: 'laptop', name: 'Laptop', icon: '💻', x: 90, y: 60 },
  { id: 'phone', name: 'Smartphone', icon: '📱', x: 70, y: 150 },
  { id: 'tablet', name: 'Tablet', icon: '📟', x: 90, y: 240 },
  { id: 'printer', name: 'Printer', icon: '🖨️', x: 230, y: 270 },
];
const AP = [300, 150];
const MODEM = [450, 150];
const NET = [570, 150];
const JOIN = ['Probe request → probe response (SSID “WW-Lab”)', 'Authentication (open system)', 'Association request → association response (AID)', 'WPA2 4-way handshake: keys installed', 'DHCP: IP address 192.168.1.'];

export default function WlanBuildViz() {
  const { complete } = useMission('w5-wlan');
  const [hasAp, setHasAp] = useState(false);
  const [hasModem, setHasModem] = useState(false);
  const [joined, setJoined] = useState([]);
  const [joining, setJoining] = useState(null);
  const [log, setLog] = useState(['Start by adding the access point.']);
  const [pkt, setPkt] = useState(null);
  const timers = useRef([]);

  const push = (m) => setLog((l) => [m, ...l].slice(0, 7));
  const join = (c) => {
    if (!hasAp) { push('⚠ No access point: the client finds no network.'); sfx('bad'); return; }
    if (joined.includes(c.id) || joining) return;
    setJoining(c.id);
    JOIN.forEach((m, i) => timers.current.push(setTimeout(() => { push(`${c.name}: ${i === 4 ? m + (20 + CLIENTS.indexOf(c)) : m}`); sfx('tick'); }, 300 * (i + 1))));
    timers.current.push(setTimeout(() => {
      setJoining(null);
      setJoined((j) => { const n = [...j, c.id]; if (n.length === CLIENTS.length && hasModem) complete('build'); return n; });
      sfx('good');
    }, 300 * (JOIN.length + 1)));
  };
  const send = () => {
    const c = CLIENTS.find((k) => joined.includes(k.id));
    if (!c) { push('⚠ Connect a client first.'); sfx('bad'); return; }
    if (!hasModem) { push(`${c.name} → AP → router … no modem: the Internet is unreachable (local network only).`); setPkt({ c, k: Date.now(), stop: true }); sfx('bad'); return; }
    setPkt({ c, k: Date.now() }); sfx('whoosh');
    push(`${c.name} → (radio) → AP/router → modem → Internet ✔ webpage request delivered`);
    complete('send');
  };
  const toggleAp = () => { setHasAp((v) => { if (v) { setJoined([]); push('AP removed: every client lost its connection.'); } else push('AP powered on: beaconing SSID “WW-Lab” on channel 6.'); return !v; }); sfx('click'); };
  const toggleModem = () => { setHasModem((v) => { push(v ? 'Modem unplugged: WLAN still works locally, but no Internet.' : 'Modem connected to the ISP line.'); if (!v && joined.length === CLIENTS.length) complete('build'); return !v; }); sfx('click'); };

  const path = pkt ? `M${pkt.c.x},${pkt.c.y} L${AP[0]},${AP[1]}${pkt.stop ? '' : ` L${MODEM[0]},${MODEM[1]} L${NET[0]},${NET[1]}`}` : '';
  return (
    <div className="viz">
      <div className="viz-grid">
        <div className="viz-stage">
          <svg viewBox="0 0 640 300">
            {hasAp && [40, 80, 120].map((r) => <circle key={r} cx={AP[0]} cy={AP[1]} r={r} fill="none" stroke="#22d3ee" opacity={0.25} className="pulse-ring" />)}
            {CLIENTS.map((c) => joined.includes(c.id) && <line key={c.id} x1={c.x} y1={c.y} x2={AP[0]} y2={AP[1]} stroke="#22d3ee" strokeWidth="2" strokeDasharray="6 5" className="dash-path" />)}
            {hasAp && hasModem && <line x1={AP[0]} y1={AP[1]} x2={MODEM[0]} y2={MODEM[1]} stroke="#94a3b8" strokeWidth="3" />}
            {hasModem && <line x1={MODEM[0]} y1={MODEM[1]} x2={NET[0]} y2={NET[1]} stroke="#94a3b8" strokeWidth="3" />}
            <g opacity={hasAp ? 1 : 0.25}>
              <rect x={AP[0] - 34} y={AP[1] - 16} width="68" height="32" rx="8" fill="#0ea5e9" />
              <text x={AP[0]} y={AP[1] + 5} textAnchor="middle" fontSize="12" fontWeight="800" fill="#fff">AP/Router</text>
            </g>
            <g opacity={hasModem ? 1 : 0.25}>
              <rect x={MODEM[0] - 28} y={MODEM[1] - 14} width="56" height="28" rx="6" fill="#475569" />
              <text x={MODEM[0]} y={MODEM[1] + 5} textAnchor="middle" fontSize="12" fontWeight="800" fill="#fff">Modem</text>
            </g>
            <g opacity={hasModem ? 1 : 0.25}>
              <ellipse cx={NET[0]} cy={NET[1]} rx="52" ry="30" fill="#1e3a8a" />
              <text x={NET[0]} y={NET[1] + 5} textAnchor="middle" fontSize="12" fontWeight="800" fill="#bfdbfe">Internet</text>
            </g>
            {CLIENTS.map((c) => (
              <g key={c.id} onClick={() => join(c)} style={{ cursor: 'pointer' }}>
                <circle cx={c.x} cy={c.y} r="24" className={`wlan-client ${joined.includes(c.id) ? 'on' : ''} ${joining === c.id ? 'busy' : ''}`} />
                <text x={c.x} y={c.y + 7} textAnchor="middle" fontSize="20">{c.icon}</text>
                <text x={c.x} y={c.y + 40} textAnchor="middle" className="wave-label">{c.name}</text>
              </g>
            ))}
            {pkt && <circle key={pkt.k} r="7" fill="#fde68a"><animateMotion dur="1.6s" fill="freeze" path={path} /></circle>}
          </svg>
        </div>
        <div className="lab-card">
          <div className="row-gap">
            <button className={`chip ${hasAp ? 'on' : ''}`} onClick={toggleAp}>{hasAp ? '✔ ' : '+ '}Access point</button>
            <button className={`chip ${hasModem ? 'on' : ''}`} onClick={toggleModem}>{hasModem ? '✔ ' : '+ '}Modem / ISP</button>
          </div>
          <div className="row-gap">
            {CLIENTS.map((c) => <button key={c.id} className={`chip ${joined.includes(c.id) ? 'on ok' : ''}`} disabled={!!joining} onClick={() => join(c)}>{c.icon} {c.name}</button>)}
          </div>
          <button className="btn btn-primary btn-sm" onClick={send}>📤 Send data to the Internet</button>
          <div className="readout">
            <div><small>Clients online</small><strong>{joined.length}/4</strong></div>
            <div><small>Internet</small><strong className={hasModem && hasAp ? 'green' : 'red'}>{hasModem && hasAp ? 'reachable' : 'no'}</strong></div>
          </div>
          <div className="log">{log.map((l, i) => <div key={`${i}-${l}`}>{l}</div>)}</div>
        </div>
      </div>
    </div>
  );
}
