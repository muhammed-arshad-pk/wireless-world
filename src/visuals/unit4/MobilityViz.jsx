import { useEffect, useState } from 'react';
import { useMission } from '../../context/GameContext';
import { sfx } from '../../effects/sfx';

const NETS = [
  { id: 'home', name: 'Home network', prefix: '10.1.0.0/16', router: '10.1.0.1', dhcp: '10.1.0.25', x: 20 },
  { id: 'cafe', name: 'Café hotspot', prefix: '172.16.5.0/24', router: '172.16.5.1', dhcp: '172.16.5.73', x: 230 },
  { id: 'campus', name: 'Campus network', prefix: '192.168.30.0/24', router: '192.168.30.1', dhcp: '192.168.30.142', x: 440 },
];
const HOME_ADDR = '10.1.0.25';
const W = 180;

export default function MobilityViz() {
  const { complete } = useMission('w4-mobility');
  const [mip, setMip] = useState(false);
  const [pos, setPos] = useState(0);
  const [alive, setAlive] = useState(true);
  const [handover, setHandover] = useState(false);
  const [visited, setVisited] = useState(['home']);
  const [secs, setSecs] = useState(0);
  const [log, setLog] = useState(['Video call started from the home network.']);

  const net = NETS[pos];
  const away = pos !== 0;
  const myIp = mip || !away ? HOME_ADDR : net.dhcp;
  const coa = mip && away ? net.router : '-';

  useEffect(() => {
    if (!alive || handover) return undefined;
    const t = setInterval(() => setSecs((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [alive, handover]);

  const reset = (m = mip) => {
    setPos(0); setAlive(true); setVisited(['home']); setSecs(0); setHandover(false);
    setLog([`Video call started from the home network${m ? ' (Mobile IP ON)' : ''}.`]);
  };

  const move = () => {
    const n = (pos + 1) % NETS.length;
    const target = NETS[n];
    setPos(n);
    const v = [...new Set([...visited, target.id])];
    setVisited(v);
    if (!mip) {
      if (n === 0) {
        setLog((l) => [`Back home: address ${HOME_ADDR} again. The old call is gone; you would have to redial.`, ...l]);
        return;
      }
      if (alive) {
        setAlive(false); sfx('bad'); complete('break');
        setLog((l) => [`Moved to ${target.name}: DHCP gave ${target.dhcp}. Peer still sends to ${HOME_ADDR} → packets lost. CALL DROPPED.`, ...l]);
      } else setLog((l) => [`Moved to ${target.name}: new address ${target.dhcp}. Still no call.`, ...l]);
      return;
    }
    setHandover(true); sfx('whoosh');
    setLog((l) => [n === 0
      ? 'Back home: deregistered with the home agent (lifetime 0). Packets reach you directly again.'
      : `Moved to ${target.name}: got CoA ${target.router}, registered with home agent. Call continues on ${HOME_ADDR}.`, ...l]);
    setTimeout(() => {
      setHandover(false);
      if (alive && v.includes('cafe') && v.includes('campus')) complete('survive');
    }, 700);
  };

  const lx = net.x + W / 2;
  return (
    <div className="viz">
      <div className="viz-grid">
        <div className="viz-stage">
          <svg viewBox="0 0 640 300">
            {/* peer */}
            <rect x="250" y="12" width="140" height="40" rx="10" fill="#1e293b" stroke="#a78bfa" />
            <text x="320" y="30" textAnchor="middle" className="wave-label" fill="#e2e8f0">📹 Video-call peer</text>
            <text x="320" y="45" textAnchor="middle" className="wave-label">sends to {HOME_ADDR}</text>
            {NETS.map((n, i) => (
              <g key={n.id}>
                <rect x={n.x} y="120" width={W} height="160" rx="14" className={`mip-zone ${i === pos ? 'on' : ''} ${i === 0 ? 'home' : ''}`} />
                <text x={n.x + W / 2} y="140" textAnchor="middle" className="wave-label" fill="#e2e8f0">{n.name}</text>
                <text x={n.x + W / 2} y="156" textAnchor="middle" className="wave-label">{n.prefix}</text>
                <rect x={n.x + W / 2 - 24} y="168" width="48" height="18" rx="5" fill="#0ea5e9" />
                <text x={n.x + W / 2} y="181" textAnchor="middle" fontSize="10" fill="#fff" fontWeight="700">{i === 0 && mip ? 'HA' : mip && i ? 'FA' : 'router'}</text>
                <line x1="320" y1="52" x2={n.x + W / 2} y2="168" className="net-link" />
              </g>
            ))}
            {/* packet path from peer */}
            {alive && !handover && (
              mip && away
                ? <path d={`M320,52 L${NETS[0].x + W / 2},168 L${lx},176`} className="mip-path tunnel" />
                : <path d={`M320,52 L${NETS[0].x + W / 2},168`} className="mip-path" />
            )}
            {!alive && <path d={`M320,52 L${NETS[0].x + W / 2},168`} className="mip-path lost" />}
            {!alive && away && <text x={NETS[0].x + W / 2} y="214" textAnchor="middle" fontSize="22">❌</text>}
            {/* laptop */}
            <g style={{ transition: 'transform .6s ease', transform: `translate(${lx - 22}px, 214px)` }}>
              <rect x="0" y="0" width="44" height="28" rx="3" fill="#e2e8f0" />
              <rect x="4" y="4" width="36" height="20" fill={alive ? '#22d3ee' : '#475569'} />
              <rect x="-6" y="28" width="56" height="5" rx="2" fill="#94a3b8" />
              <text x="22" y="50" textAnchor="middle" className="wave-label" fill="#fde68a">{myIp}</text>
            </g>
            {handover && <text x={lx} y="205" textAnchor="middle" className="wave-label" fill="#fde68a">registering…</text>}
          </svg>
        </div>
        <div className="lab-card">
          <div className="seg small">
            <button className={!mip ? 'active' : ''} onClick={() => { setMip(false); reset(false); sfx('click'); }}>Plain IP</button>
            <button className={mip ? 'active' : ''} onClick={() => { setMip(true); reset(true); sfx('click'); }}>Mobile IP ON</button>
          </div>
          <div className="row-gap">
            <button className="btn btn-primary btn-sm" onClick={move}>🚶 Move to {NETS[(pos + 1) % 3].name}</button>
            <button className="chip" onClick={() => reset()}>Reset</button>
          </div>
          <div className="readout">
            <div><small>Call</small><strong className={alive ? 'green' : 'red'}>{alive ? (handover ? 'HANDOVER' : `LIVE ${secs}s`) : 'DROPPED'}</strong></div>
            <div><small>Address in use</small><strong>{myIp}</strong></div>
            <div><small>Care-of address</small><strong>{coa}</strong></div>
            <div><small>Visited</small><strong>{visited.length}/3</strong></div>
          </div>
          <div className="log">{log.slice(0, 5).map((l, i) => <div key={log.length - i}>{l}</div>)}</div>
        </div>
      </div>
      <div className="info-box">
        {mip
          ? <><b>Mobile IP:</b> the laptop keeps its home address {HOME_ADDR}. The home agent tunnels the peer’s packets to the care-of address, so the call (identified by IP + port) never notices the move.</>
          : <><b>Plain IP:</b> the IP address is also the location. A new network means a new address, so the call’s 4-tuple changes and the connection breaks.</>}
      </div>
    </div>
  );
}
