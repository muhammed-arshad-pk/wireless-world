import { useState } from 'react';
import { useMission } from '../../context/GameContext';
import { sfx } from '../../effects/sfx';

const TYPES = [
  { id: 'WPAN', r: 40, color: '#f472b6', range: '≈ 10 m', tech: 'Bluetooth, Zigbee, NFC, UWB', ex: 'Earbuds, smartwatch, fitness band' },
  { id: 'WLAN', r: 85, color: '#22d3ee', range: '≈ 50–100 m', tech: 'Wi-Fi (IEEE 802.11)', ex: 'Home, college campus, office' },
  { id: 'WMAN', r: 135, color: '#a78bfa', range: 'Several km', tech: 'WiMAX (802.16), microwave links', ex: 'City-wide broadband' },
  { id: 'WWAN', r: 185, color: '#facc15', range: 'Country / global', tech: 'Cellular 2G–5G, satellite', ex: 'Mobile data anywhere' },
];

const TOPOS = {
  star: { name: 'Star (infrastructure)', nodes: { AP: [200, 120], A: [80, 50], B: [320, 50], C: [80, 190], D: [320, 190] }, links: [['AP', 'A'], ['AP', 'B'], ['AP', 'C'], ['AP', 'D']], route: ['A', 'AP', 'D'], note: 'All traffic flows through the access point, like home Wi-Fi.' },
  mesh: { name: 'Mesh', nodes: { A: [60, 120], B: [160, 50], C: [160, 190], E: [250, 120], D: [340, 120] }, links: [['A', 'B'], ['A', 'C'], ['B', 'C'], ['B', 'E'], ['C', 'E'], ['E', 'D']], route: ['A', 'B', 'E', 'D'], note: 'Nodes relay for each other. If one link fails, traffic takes another path.' },
  p2p: { name: 'Point-to-point', nodes: { A: [60, 120], D: [340, 120] }, links: [['A', 'D']], route: ['A', 'D'], note: 'A dedicated link between two nodes, e.g. a microwave link between towers.' },
  adhoc: { name: 'Ad hoc (peer-to-peer)', nodes: { A: [100, 80], B: [300, 70], C: [110, 190], D: [290, 180] }, links: [['A', 'B'], ['A', 'C'], ['A', 'D'], ['B', 'D'], ['C', 'D']], route: ['A', 'D'], note: 'Devices talk directly without any access point, like Wi-Fi Direct or Bluetooth.' },
};

export default function NetFundViz() {
  const { complete } = useMission('w2-netfund');
  const [type, setType] = useState('WLAN');
  const [seenT, setSeenT] = useState(() => new Set());
  const [topo, setTopo] = useState('star');
  const [sent, setSent] = useState(() => new Set());
  const [anim, setAnim] = useState(0);
  const t = TYPES.find((x) => x.id === type);
  const T = TOPOS[topo];

  const pickType = (id) => {
    setType(id); sfx('click');
    const n = new Set(seenT).add(id); setSeenT(n);
    if (n.size === TYPES.length) complete('types');
  };
  const send = () => {
    setAnim((a) => a + 1); sfx('whoosh');
    const n = new Set(sent).add(topo); setSent(n);
    if (n.size === Object.keys(TOPOS).length) complete('topos');
  };
  const routePath = T.route.map((k, i) => `${i ? 'L' : 'M'}${T.nodes[k][0]},${T.nodes[k][1]}`).join(' ');

  return (
    <div className="viz">
      <div className="viz-grid">
        <div className="viz-stage">
          <svg viewBox="0 0 400 400">
            {[...TYPES].reverse().map((x) => (
              <circle key={x.id} cx="200" cy="200" r={x.r} fill={x.color} fillOpacity={type === x.id ? 0.22 : 0.06} stroke={x.color} strokeWidth={type === x.id ? 3 : 1} style={{ cursor: 'pointer' }} onClick={() => pickType(x.id)} />
            ))}
            {TYPES.map((x) => <text key={x.id} x="200" y={200 - x.r + 16} className="wave-label" textAnchor="middle" fill={x.color}>{x.id}</text>)}
            <text x="200" y="205" textAnchor="middle" fontSize="20">📱</text>
          </svg>
          <p className="hint" style={{ textAlign: 'center' }}>Rings not to scale. Click a ring.</p>
        </div>
        <div className="lab-card">
          <h3 style={{ color: t.color }}>{t.id}</h3>
          <div className="readout">
            <div><small>Range</small><strong>{t.range}</strong></div>
          </div>
          <p><b>Technologies:</b> {t.tech}</p>
          <p><b>Examples:</b> {t.ex}</p>
          <p className="hint">{seenT.size}/4 explored</p>
        </div>
      </div>

      <div className="viz-grid">
        <div className="viz-stage">
          <svg viewBox="0 0 400 240">
            {T.links.map(([a, b]) => <line key={a + b} x1={T.nodes[a][0]} y1={T.nodes[a][1]} x2={T.nodes[b][0]} y2={T.nodes[b][1]} className="net-link" />)}
            {anim > 0 && <path key={`${topo}${anim}`} d={routePath} className="net-route" />}
            {anim > 0 && (
              <circle key={`p${topo}${anim}`} r="7" fill="#fde68a">
                <animateMotion dur={`${0.6 * T.route.length}s`} fill="freeze" path={routePath} />
              </circle>
            )}
            {Object.entries(T.nodes).map(([k, [x, y]]) => (
              <g key={k}>
                <circle cx={x} cy={y} r={k === 'AP' ? 20 : 16} className={`net-node ${k === 'AP' ? 'ap' : ''} ${k === T.route[0] ? 'src' : ''} ${k === T.route[T.route.length - 1] ? 'dst' : ''}`} />
                <text x={x} y={y + 4} className="wave-bit" fill="#0b1530">{k}</text>
              </g>
            ))}
          </svg>
        </div>
        <div className="lab-card">
          <div className="row-gap">{Object.entries(TOPOS).map(([k, v]) => <button key={k} className={`chip ${topo === k ? 'on' : ''} ${sent.has(k) ? 'seen' : ''}`} onClick={() => { setTopo(k); setAnim(0); }}>{v.name}</button>)}</div>
          <p>{T.note}</p>
          <button className="btn btn-primary btn-sm" onClick={send}>Send packet A → D</button>
          <p className="hint">Path: {T.route.join(' → ')} · {sent.size}/4 topologies tested</p>
        </div>
      </div>
    </div>
  );
}
