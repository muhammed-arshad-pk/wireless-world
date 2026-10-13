import { useState } from 'react';
import { useMission } from '../../context/GameContext';
import { sfx } from '../../effects/sfx';

const P = { CN: [320, 46], NET: [320, 150], HA: [110, 250], FA: [480, 250], MN: [580, 262] };
const pts = (...k) => k.map((n) => P[n].join(',')).join(' ');
const pathOf = (...k) => `M${k.map((n) => P[n].join(',')).join(' L')}`;

const HOA = '10.1.0.25';
const COA = '172.16.5.1';
const CN = '203.0.113.9';
const HA = '10.1.0.1';

const STEPS = [
  { title: 'Agent discovery', route: ['FA', 'MN'], color: '#facc15', text: 'The foreign agent broadcasts an Agent Advertisement (ICMP router advertisement + mobility extension). The MN sees a new network prefix, so it is away from home.', pkt: [['ICMP Agent Advertisement', 'adv'], [`CoA ${COA}`, 'meta'], ['flags: F, R · lifetime 1800 s', 'meta']] },
  { title: 'Registration request', route: ['MN', 'FA', 'NET', 'HA'], color: '#a78bfa', text: 'The MN sends a Registration Request (UDP 434) through the FA to its home agent: home address, HA, CoA, lifetime, identification and the Mobile–Home authenticator.', pkt: [['UDP 434 · Reg Request', 'adv'], [`HoA ${HOA}`, 'meta'], [`CoA ${COA}`, 'meta'], ['lifetime 1800 · auth ✔', 'meta']] },
  { title: 'Registration reply', route: ['HA', 'NET', 'FA', 'MN'], color: '#a78bfa', text: 'The HA verifies the authenticator, stores the binding HoA → CoA and replies “accepted” (code 0). The FA adds the MN to its visitor list.', pkt: [['Reg Reply · code 0 (accepted)', 'adv'], ['granted lifetime 1800 s', 'meta']] },
  { title: 'CN sends a packet', route: ['CN', 'NET', 'HA'], color: '#22d3ee', text: 'The correspondent node knows nothing about mobility. It sends to the home address, so normal routing delivers the packet to the home network, where the HA intercepts it (proxy ARP).', pkt: [[`src ${CN}`, 'inner'], [`dst ${HOA}`, 'inner'], ['data', 'data']] },
  { title: 'HA tunnels it', route: ['HA', 'NET', 'FA'], color: '#f472b6', text: 'The HA encapsulates the whole packet inside a new IP header (IP-in-IP, protocol 4) addressed to the care-of address: +20 bytes.', pkt: [[`outer src ${HA}`, 'outer'], [`outer dst ${COA}`, 'outer'], [`src ${CN}`, 'inner'], [`dst ${HOA}`, 'inner'], ['data', 'data']] },
  { title: 'FA delivers', route: ['FA', 'MN'], color: '#4ade80', text: 'The FA (tunnel endpoint) strips the outer header and delivers the original packet on its local link, using the MN’s MAC address from the visitor list.', pkt: [[`src ${CN}`, 'inner'], [`dst ${HOA}`, 'inner'], ['data', 'data']] },
  { title: 'MN replies directly', route: ['MN', 'FA', 'NET', 'CN'], color: '#fb923c', text: 'Replies use the home address as source and go straight to the CN, with no tunnel. Together with the inbound detour this forms the triangle CN → HA → MN → CN.', pkt: [[`src ${HOA}`, 'inner'], [`dst ${CN}`, 'inner'], ['data', 'data']] },
];

const DELAY = { 'CN-HA': 120, 'HA-FA': 130, 'CN-FA': 15, 'FA-MN': 2 };

export default function OperationViz() {
  const { complete } = useMission('w4-operation');
  const [step, setStep] = useState(-1);
  const [ro, setRo] = useState(false);
  const [seen, setSeen] = useState({ tri: true, ro: false });
  const s = STEPS[step];

  const go = (n) => {
    const k = Math.max(-1, Math.min(STEPS.length - 1, n));
    setStep(k); sfx('tick');
    if (k === STEPS.length - 1) complete('journey');
  };
  const view = (v) => {
    setRo(v); sfx('click');
    const n = { tri: seen.tri || !v, ro: seen.ro || v };
    setSeen(n);
    if (n.tri && n.ro) complete('optimise');
  };

  const triangle = DELAY['CN-HA'] + DELAY['HA-FA'] + DELAY['FA-MN'];
  const direct = DELAY['CN-FA'] + DELAY['FA-MN'];

  return (
    <div className="viz">
      <div className="seg">
        <button className={!ro ? 'active' : ''} onClick={() => view(false)}>Step-by-step operation</button>
        <button className={ro ? 'active' : ''} onClick={() => view(true)}>Triangle vs route optimisation</button>
      </div>
      <div className="viz-grid">
        <div className="viz-stage">
          <svg viewBox="0 0 640 320">
            <rect x="20" y="205" width="200" height="100" rx="14" className="mip-zone home" />
            <text x="120" y="296" textAnchor="middle" className="wave-label">Home network 10.1.0.0/16</text>
            <rect x="390" y="205" width="235" height="100" rx="14" className="mip-zone" />
            <text x="507" y="296" textAnchor="middle" className="wave-label">Foreign network 172.16.5.0/24</text>
            <ellipse cx="320" cy="150" rx="70" ry="34" fill="#0f2547" stroke="#334155" />
            <text x="320" y="154" textAnchor="middle" className="wave-label" fill="#cbd5e1">Internet</text>
            <polyline points={pts('CN', 'NET', 'HA')} className="net-link" fill="none" />
            <polyline points={pts('NET', 'FA', 'MN')} className="net-link" fill="none" />
            {[['CN', 'Correspondent', '#a78bfa'], ['HA', 'Home agent', '#0ea5e9'], ['FA', 'Foreign agent', '#0ea5e9'], ['MN', 'Mobile node', '#4ade80']].map(([k, l, c]) => (
              <g key={k}>
                <circle cx={P[k][0]} cy={P[k][1]} r="17" fill={c} stroke="#fff" strokeWidth="2" />
                <text x={P[k][0]} y={P[k][1] + 4} textAnchor="middle" fontSize="11" fontWeight="800" fill="#0b1530">{k}</text>
                <text x={P[k][0]} y={P[k][1] - 24} textAnchor="middle" className="wave-label">{l}</text>
              </g>
            ))}
            {!ro && s && (
              <g key={step}>
                <path d={pathOf(...s.route)} fill="none" stroke={s.color} strokeWidth={step === 4 ? 7 : 3} strokeDasharray={step === 4 ? '10 6' : undefined} opacity=".9" className={step === 4 ? 'dash-path' : undefined} />
                <circle r="8" fill={s.color} stroke="#fff" strokeWidth="2">
                  <animateMotion dur="1.4s" repeatCount="indefinite" path={pathOf(...s.route)} />
                </circle>
                {step === 0 && [14, 26, 38].map((r) => <circle key={r} cx={P.FA[0]} cy={P.FA[1]} r={r} fill="none" stroke="#facc15" opacity=".5" />)}
              </g>
            )}
            {ro && (
              <g>
                <path d={pathOf('CN', 'NET', 'HA')} fill="none" stroke="#f87171" strokeWidth="3" />
                <path d={pathOf('HA', 'NET', 'FA', 'MN')} fill="none" stroke="#f87171" strokeWidth="5" strokeDasharray="8 6" className="dash-path" />
                <path d="M330,52 L490,240" fill="none" stroke="#4ade80" strokeWidth="3" />
                <circle r="7" fill="#f87171"><animateMotion dur="2.6s" repeatCount="indefinite" path={pathOf('CN', 'NET', 'HA', 'NET', 'FA', 'MN')} /></circle>
                <circle r="7" fill="#4ade80"><animateMotion dur="0.9s" repeatCount="indefinite" path="M330,52 L490,240 L580,262" /></circle>
                <text x="190" y="110" className="wave-label" fill="#fca5a5">triangle: {triangle} ms</text>
                <text x="420" y="110" className="wave-label" fill="#86efac">optimised: {direct} ms</text>
              </g>
            )}
          </svg>
        </div>
        <div className="lab-card">
          {!ro ? (
            <>
              <h3>{s ? `${step + 1}. ${s.title}` : 'Ready'}</h3>
              <p>{s ? s.text : 'The mobile node has just walked into a foreign network. Press Next to follow Mobile IP one message at a time.'}</p>
              <div className="row-gap">
                <button className="chip" onClick={() => go(step - 1)} disabled={step < 0}>◀ Back</button>
                <button className="btn btn-primary btn-sm" onClick={() => go(step + 1)} disabled={step === STEPS.length - 1}>Next ▶</button>
                <button className="chip" onClick={() => go(-1)}>Reset</button>
              </div>
              <div className="mip-steps">{STEPS.map((x, i) => <span key={x.title} className={i === step ? 'on' : i < step ? 'done' : ''} onClick={() => go(i)}>{i + 1}</span>)}</div>
            </>
          ) : (
            <>
              <h3>Why the triangle hurts</h3>
              <p>The MN is in Germany next to the CN, but its home agent is in India. Every packet to the MN crosses the world twice.</p>
              <div className="readout">
                <div><small>Triangle (CN→HA→FA→MN)</small><strong className="red">{triangle} ms</strong></div>
                <div><small>Route optimised (CN→CoA)</small><strong className="green">{direct} ms</strong></div>
              </div>
              <p className="hint">Route optimisation: the CN receives a binding update and tunnels straight to the CoA. It must support the extension, and bindings must be authenticated. Mobile IPv6 builds this in.</p>
            </>
          )}
        </div>
      </div>
      {!ro && s && (
        <div className="pkt-strip">
          {s.pkt.map(([t, k], i) => <span key={i} className={`pkt-seg ${k}`}>{t}</span>)}
        </div>
      )}
    </div>
  );
}
