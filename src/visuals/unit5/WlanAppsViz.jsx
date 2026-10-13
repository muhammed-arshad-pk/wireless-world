import { useState } from 'react';
import { useMission } from '../../context/GameContext';
import { sfx } from '../../effects/sfx';
import { Slider } from '../shared';

const ENVS = {
  home: { name: 'Home', icon: '🏠', users: 12, area: 150, perAp: 30, areaPerAp: 200, security: 'WPA3-Personal', band: '2.4 + 5 GHz', needs: ['Whole-home coverage (mesh if large)', 'Smart TV streaming, gaming', 'Easy setup, parental controls'], rooms: [[20, 20, 140, 110], [170, 20, 150, 110], [20, 140, 300, 90]] },
  campus: { name: 'Campus', icon: '🎓', users: 400, area: 2000, perAp: 40, areaPerAp: 180, security: 'WPA3-Enterprise (eduroam, 802.1X)', band: '5 + 6 GHz', needs: ['Very high density in lecture halls', 'Per-student logins', 'Roaming between buildings'], rooms: [[20, 20, 200, 100], [230, 20, 90, 100], [20, 130, 120, 100], [150, 130, 170, 100]] },
  office: { name: 'Office', icon: '🏢', users: 120, area: 900, perAp: 35, areaPerAp: 200, security: 'WPA3-Enterprise + guest VLAN', band: '5 GHz', needs: ['Video calls (QoS)', 'Meeting-room capacity', 'Separate guest network'], rooms: [[20, 20, 300, 60], [20, 90, 140, 140], [170, 90, 150, 140]] },
  hospital: { name: 'Hospital', icon: '🏥', users: 250, area: 3000, perAp: 30, areaPerAp: 150, security: 'WPA3-Enterprise, segmented device VLANs', band: '5 GHz', needs: ['Very high reliability, redundant APs', 'Priority for alarms & voice badges', 'Avoid interference with medical equipment'], rooms: [[20, 20, 90, 90], [120, 20, 90, 90], [220, 20, 100, 90], [20, 120, 300, 110]] },
  airport: { name: 'Airport / Hotel', icon: '✈️', users: 800, area: 6000, perAp: 50, areaPerAp: 300, security: 'Captive portal + client isolation (OWE)', band: '5 + 6 GHz', needs: ['Huge peaks at gates', 'Guest isolation, terms page', 'Bandwidth limits per user'], rooms: [[20, 20, 300, 70], [20, 100, 140, 130], [170, 100, 150, 130]] },
  factory: { name: 'Factory', icon: '🏭', users: 80, area: 5000, perAp: 30, areaPerAp: 400, security: 'WPA3-Enterprise, device certificates', band: '5 GHz (+ private 5G for control)', needs: ['Fast roaming for robots/AGVs', 'Metal racks → multipath, careful survey', 'Low latency for scanners'], rooms: [[20, 20, 300, 210]] },
};

export default function WlanAppsViz() {
  const { complete } = useMission('w5-apps');
  const [env, setEnv] = useState('home');
  const [seen, setSeen] = useState(['home']);
  const e = ENVS[env];
  const [users, setUsers] = useState(e.users);
  const [area, setArea] = useState(e.area);

  const pick = (k) => {
    setEnv(k); setUsers(ENVS[k].users); setArea(ENVS[k].area); sfx('click');
    const n = [...new Set([...seen, k])]; setSeen(n);
    if (n.length === Object.keys(ENVS).length) complete('explore');
    if (ENVS[k].users >= 400) complete('dense');
  };
  const capAps = Math.ceil(users / e.perAp);
  const covAps = Math.ceil(area / e.areaPerAp);
  const aps = Math.max(capAps, covAps, 1);
  const cols = Math.ceil(Math.sqrt(aps * 1.5));
  const rows = Math.ceil(aps / cols);

  return (
    <div className="viz">
      <div className="seg">
        {Object.entries(ENVS).map(([k, v]) => <button key={k} className={env === k ? 'active' : ''} onClick={() => pick(k)}>{v.icon} {v.name}</button>)}
      </div>
      <div className="viz-grid">
        <div className="viz-stage">
          <svg viewBox="0 0 340 250">
            {e.rooms.map(([x, y, w, h], i) => <rect key={i} x={x} y={y} width={w} height={h} rx="6" className="floor-room" />)}
            {Array.from({ length: aps }, (_, i) => {
              const cx = 20 + ((i % cols) + 0.5) * (300 / cols);
              const cy = 20 + (Math.floor(i / cols) + 0.5) * (210 / rows);
              const r = Math.min(70, 300 / cols / 1.3);
              return (
                <g key={i}>
                  <circle cx={cx} cy={cy} r={r} fill="rgba(34,211,238,.12)" stroke="rgba(34,211,238,.4)" />
                  <circle cx={cx} cy={cy} r={aps > 30 ? 2.5 : 5} fill="#22d3ee" />
                </g>
              );
            })}
            <text x="170" y="245" textAnchor="middle" className="wave-label">{e.icon} {e.name}: {aps} access point{aps > 1 ? 's' : ''}</text>
          </svg>
        </div>
        <div className="lab-card">
          <Slider label="Active users" value={users} min={5} max={1200} step={5} onChange={(v) => { setUsers(v); if (v >= 400) complete('dense'); }} />
          <Slider label="Floor area" value={area} min={50} max={8000} step={50} unit=" m²" onChange={setArea} />
          <div className="readout">
            <div><small>APs for capacity</small><strong>{capAps}</strong></div>
            <div><small>APs for coverage</small><strong>{covAps}</strong></div>
            <div><small>APs to deploy</small><strong className="green">{aps}</strong></div>
            <div><small>Bands</small><strong style={{ fontSize: 13 }}>{e.band}</strong></div>
          </div>
          <p><b>Security:</b> {e.security}</p>
          <ul className="need-list">{e.needs.map((n) => <li key={n}>{n}</li>)}</ul>
          <p className="hint">Deploy the larger of the capacity count (users ÷ {e.perAp} per AP) and the coverage count (area ÷ {e.areaPerAp} m² per AP). Explored {seen.length}/6.</p>
        </div>
      </div>
    </div>
  );
}
