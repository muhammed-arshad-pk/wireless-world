import { useState } from 'react';
import { useMission } from '../../context/GameContext';
import { sfx } from '../../effects/sfx';

const HOA = '10.1.0.25';
const PLACES = {
  home: { name: 'Home network', x: 110, color: '#38bdf8' },
  a: { name: 'Foreign net A (has FA)', x: 320, color: '#f472b6' },
  b: { name: 'Foreign net B (no FA)', x: 530, color: '#facc15' },
};

const SEQS = {
  a: [
    ['FA → MN', 'Agent Advertisement: CoA 172.16.5.1, F and R flags'],
    ['MN → FA', 'Registration Request: HoA 10.1.0.25, HA 10.1.0.1, CoA 172.16.5.1, lifetime 600 s, ID, auth'],
    ['FA → HA', 'FA relays the request (visitor entry pending)'],
    ['HA', 'Mobile–Home authenticator ✔ · identification fresh ✔ → binding created'],
    ['HA → FA', 'Registration Reply: code 0 accepted, lifetime 600 s'],
    ['FA → MN', 'Reply relayed · MN added to visitor list'],
  ],
  b: [
    ['MN', 'No agent advertisement heard → MN asks DHCP'],
    ['DHCP → MN', 'Local address 192.168.30.57 assigned (co-located CoA)'],
    ['MN → HA', 'Registration Request directly to HA, D flag set (MN decapsulates)'],
    ['HA', 'Authenticator ✔ → binding HoA → 192.168.30.57'],
    ['HA → MN', 'Registration Reply: code 0 accepted, lifetime 600 s'],
  ],
  home: [
    ['HA → MN', 'Agent Advertisement with H flag: “you are home”'],
    ['MN → HA', 'Registration Request with lifetime 0 (deregister)'],
    ['HA', 'Binding removed · gratuitous ARP so packets reach the MN directly'],
    ['HA → MN', 'Registration Reply: code 0 accepted'],
  ],
  forged: [
    ['Attacker → HA', 'Forged Registration Request: HoA 10.1.0.25 → CoA 198.51.100.66 (attacker)'],
    ['HA', 'Mobile–Home authenticator ✘ (no shared key)'],
    ['HA → Attacker', 'Registration Reply: code 131 “mobile node failed authentication”. Binding unchanged.'],
  ],
};

export default function ArchViz() {
  const { complete } = useMission('w4-arch');
  const [where, setWhere] = useState('home');
  const [seq, setSeq] = useState(null);
  const [binding, setBinding] = useState(null);
  const [visitors, setVisitors] = useState([]);
  const [busy, setBusy] = useState(false);

  const run = (key, after) => {
    setBusy(true);
    setSeq({ key, n: 0 });
    SEQS[key].forEach((_, i) => setTimeout(() => { setSeq({ key, n: i + 1 }); sfx('tick'); }, 450 * (i + 1)));
    setTimeout(() => { setBusy(false); after?.(); }, 450 * (SEQS[key].length + 1));
  };

  const moveTo = (p) => {
    if (busy || p === where) return;
    setWhere(p); sfx('whoosh');
    if (p === 'a') run('a', () => { setBinding({ coa: '172.16.5.1', via: 'FA', life: 600 }); setVisitors([{ hoa: HOA, ha: '10.1.0.1', mac: '3c:22:fb:10:8e:01', life: 600 }]); complete('fa'); sfx('good'); });
    if (p === 'b') run('b', () => { setBinding({ coa: '192.168.30.57', via: 'co-located', life: 600 }); setVisitors([]); complete('colocated'); sfx('good'); });
    if (p === 'home') run('home', () => { setBinding(null); setVisitors([]); complete('home'); sfx('good'); });
  };
  const forge = () => { if (!busy) { run('forged', () => sfx('bad')); } };

  const mx = PLACES[where].x;
  return (
    <div className="viz">
      <div className="viz-stage">
        <svg viewBox="0 0 640 230">
          <ellipse cx="320" cy="40" rx="90" ry="24" fill="#0f2547" stroke="#334155" />
          <text x="320" y="44" textAnchor="middle" className="wave-label" fill="#cbd5e1">Internet · CN</text>
          {Object.entries(PLACES).map(([k, p]) => (
            <g key={k} onClick={() => moveTo(k)} style={{ cursor: busy ? 'wait' : 'pointer' }}>
              <line x1="320" y1="64" x2={p.x} y2="100" className="net-link" />
              <rect x={p.x - 95} y="100" width="190" height="115" rx="14" className={`mip-zone ${where === k ? 'on' : ''}`} style={{ stroke: p.color }} />
              <text x={p.x} y="120" textAnchor="middle" className="wave-label" fill="#e2e8f0">{p.name}</text>
              <rect x={p.x - 70} y="132" width="56" height="20" rx="5" fill={k === 'b' ? '#64748b' : '#0ea5e9'} />
              <text x={p.x - 42} y="146" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">{k === 'home' ? 'HA' : k === 'a' ? 'FA' : 'DHCP'}</text>
            </g>
          ))}
          {binding && <path d={`M${PLACES.home.x - 42},152 Q320,250 ${mx + 30},170`} fill="none" stroke="#f472b6" strokeWidth="3" strokeDasharray="8 6" className="dash-path" />}
          <g style={{ transition: 'transform .6s ease', transform: `translate(${mx + 20}px, 150px)` }}>
            <rect x="0" y="0" width="22" height="34" rx="4" fill="#e2e8f0" />
            <rect x="3" y="4" width="16" height="22" fill="#4ade80" />
            <text x="11" y="50" textAnchor="middle" className="wave-label" fill="#fde68a">MN</text>
          </g>
        </svg>
      </div>
      <div className="row-gap">
        {Object.entries(PLACES).map(([k, p]) => <button key={k} className={`chip ${where === k ? 'on' : ''}`} disabled={busy} onClick={() => moveTo(k)}>Move to {p.name}</button>)}
        <button className="chip" disabled={busy} onClick={forge}>🕵️ Forge a registration</button>
      </div>
      <div className="viz-grid">
        <div className="lab-card">
          <h3>Message sequence</h3>
          {seq ? (
            <ol className="seq-list">
              {SEQS[seq.key].slice(0, seq.n).map(([who, what]) => <li key={what} className={seq.key === 'forged' ? 'bad' : ''}><b>{who}</b> {what}</li>)}
            </ol>
          ) : <p className="hint">Move the mobile node to a foreign network to watch registration.</p>}
        </div>
        <div className="lab-card">
          <h3>HA binding table</h3>
          <table className="mini-table">
            <thead><tr><th>Home address</th><th>Care-of address</th><th>Lifetime</th></tr></thead>
            <tbody>{binding ? <tr><td>{HOA}</td><td>{binding.coa} <small>({binding.via})</small></td><td>{binding.life} s</td></tr> : <tr><td colSpan="3" className="muted-cell">empty: MN is at home</td></tr>}</tbody>
          </table>
          <h3>FA visitor list (net A)</h3>
          <table className="mini-table">
            <thead><tr><th>Home address</th><th>HA</th><th>MAC</th></tr></thead>
            <tbody>{visitors.length ? visitors.map((v) => <tr key={v.hoa}><td>{v.hoa}</td><td>{v.ha}</td><td>{v.mac}</td></tr>) : <tr><td colSpan="3" className="muted-cell">no visitors</td></tr>}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
