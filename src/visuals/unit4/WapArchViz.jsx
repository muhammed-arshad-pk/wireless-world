import { useState } from 'react';
import { useMission } from '../../context/GameContext';
import { sfx } from '../../effects/sfx';

const NODES = [
  { id: 'phone', label: 'WAP phone', sub: 'microbrowser', x: 60, icon: '📱' },
  { id: 'bearer', label: 'Wireless network', sub: 'GSM / GPRS bearer', x: 185, icon: '📡' },
  { id: 'gw', label: 'WAP gateway', sub: 'proxy', x: 320, icon: '🖧' },
  { id: 'net', label: 'Internet', sub: 'TCP/IP', x: 455, icon: '🌐' },
  { id: 'server', label: 'Origin server', sub: 'web server', x: 580, icon: '🗄️' },
];
const X = Object.fromEntries(NODES.map((n) => [n.id, n.x]));

const STEPS = [
  { from: 'phone', to: 'phone', dir: 1, proto: 'WAE → WSP → WTP → WTLS → WDP', title: 'Phone builds the request', text: 'The user selects “Cricket score”. The microbrowser creates a binary WSP GET, WTP makes it a reliable class-2 transaction, WTLS encrypts it and WDP addresses the port.', size: '~60 bytes' },
  { from: 'phone', to: 'gw', dir: 1, proto: 'WSP/WTP over bearer', title: 'Over the air', text: 'The compact request crosses the GSM/GPRS bearer to the operator’s WAP gateway.', size: '~60 bytes' },
  { from: 'gw', to: 'gw', dir: 1, proto: 'WSP → HTTP', title: 'Gateway converts', text: 'The gateway ends WTLS, decodes the binary WSP headers and rebuilds a normal text HTTP/1.1 GET request.', size: '~350 bytes' },
  { from: 'gw', to: 'server', dir: 1, proto: 'HTTP over TCP/IP', title: 'HTTP to origin server', text: 'The gateway opens a TCP connection to the content provider’s ordinary web server and sends the GET.', size: '~350 bytes' },
  { from: 'server', to: 'gw', dir: -1, proto: 'HTTP 200 · text/vnd.wap.wml', title: 'Server responds', text: 'The server returns a WML deck (text XML) with the cricket score cards.', size: '3.1 kB text' },
  { from: 'gw', to: 'gw', dir: -1, proto: 'WML → WBXML', title: 'Gateway encodes', text: 'Tags and attributes become one-byte tokens (WBXML) and any WMLScript is compiled to bytecode.', size: '1.4 kB binary' },
  { from: 'gw', to: 'phone', dir: -1, proto: 'WSP reply over bearer', title: 'Reply over the air', text: 'The compact WSP reply goes back across the wireless network; the WTP result also acknowledges the request.', size: '1.4 kB' },
  { from: 'phone', to: 'phone', dir: -1, proto: 'WAE renders', title: 'Microbrowser displays', text: 'The phone parses the WBXML deck and shows the first card. Moving between cards needs no more airtime.', size: 'done ✔' },
];

const STACK = [
  { wap: 'WAE', inet: 'HTML / JavaScript', text: 'Application environment: WML, WMLScript, WTA telephony, content formats (WBMP, vCard).' },
  { wap: 'WSP', inet: 'HTTP', text: 'Session layer: binary-encoded HTTP-like methods, long-lived sessions that can be suspended/resumed, push.' },
  { wap: 'WTP', inet: 'TCP (transactions)', text: 'Lightweight reliable transactions: class 0 (unreliable), 1 (reliable one-way), 2 (request + result). No 3-way handshake.' },
  { wap: 'WTLS', inet: 'TLS / SSL', text: 'Security: encryption, integrity, authentication, tuned for small devices and datagrams.' },
  { wap: 'WDP', inet: 'UDP', text: 'Datagram transport with ports; on IP bearers it is UDP, on SMS/USSD it adapts to the bearer.' },
  { wap: 'Bearers', inet: 'IP over links', text: 'GSM SMS, USSD, CSD, GPRS, CDMA, iDEN…: WAP is bearer-independent.' },
];

export default function WapArchViz() {
  const { complete } = useMission('w4-wap-arch');
  const [tab, setTab] = useState('trace');
  const [step, setStep] = useState(-1);
  const [layer, setLayer] = useState(null);
  const [seenLayers, setSeenLayers] = useState([]);

  const go = (n) => {
    const k = Math.max(-1, Math.min(STEPS.length - 1, n));
    setStep(k); sfx('tick');
    if (k === STEPS.length - 1) complete('trace');
  };
  const pickLayer = (i) => {
    setLayer(i); sfx('click');
    const n = [...new Set([...seenLayers, i])];
    setSeenLayers(n);
    if (n.length === STACK.length) complete('stack');
  };
  const s = STEPS[step];

  return (
    <div className="viz">
      <div className="seg">
        <button className={tab === 'trace' ? 'active' : ''} onClick={() => setTab('trace')}>Trace a request</button>
        <button className={tab === 'stack' ? 'active' : ''} onClick={() => setTab('stack')}>WAP vs Internet stack</button>
      </div>
      {tab === 'trace' ? (
        <>
          <div className="viz-stage">
            <svg viewBox="0 0 640 200">
              <rect x="10" y="20" width="370" height="165" rx="14" className="zone-wap" />
              <text x="195" y="38" textAnchor="middle" className="wave-label" fill="#fdba74">WAP protocols (WSP/WTP/WTLS/WDP)</text>
              <rect x="320" y="26" width="310" height="153" rx="14" className="zone-web" />
              <text x="520" y="44" textAnchor="middle" className="wave-label" fill="#93c5fd">Internet protocols (HTTP/TCP/IP)</text>
              <line x1="60" y1="105" x2="580" y2="105" className="net-link" />
              {NODES.map((n) => (
                <g key={n.id}>
                  <circle cx={n.x} cy="105" r="26" className={`wap-node ${s && (s.from === n.id || s.to === n.id) ? 'on' : ''}`} />
                  <text x={n.x} y="113" textAnchor="middle" fontSize="22">{n.icon}</text>
                  <text x={n.x} y="148" textAnchor="middle" className="wave-label" fill="#e2e8f0">{n.label}</text>
                  <text x={n.x} y="162" textAnchor="middle" className="wave-label">{n.sub}</text>
                </g>
              ))}
              {s && s.from !== s.to && (
                <g key={step}>
                  <circle r="9" fill={s.dir > 0 ? '#fde68a' : '#67e8f9'} stroke="#fff" strokeWidth="2">
                    <animateMotion dur="1.2s" repeatCount="indefinite" path={`M${X[s.from]},78 L${X[s.to]},78`} />
                  </circle>
                  <text x={(X[s.from] + X[s.to]) / 2} y="68" textAnchor="middle" className="wave-label" fill={s.dir > 0 ? '#fde68a' : '#67e8f9'}>{s.proto}</text>
                </g>
              )}
              {s && s.from === s.to && <text x={X[s.from]} y="68" textAnchor="middle" className="wave-label" fill="#fde68a">⚙ {s.proto}</text>}
            </svg>
          </div>
          <div className="viz-grid">
            <div className="lab-card">
              <h3>{s ? `${step + 1}. ${s.title}` : 'Request: “Cricket score”'}</h3>
              <p>{s ? s.text : 'Press Next to send a request from the WAP phone and follow it to the origin server and back.'}</p>
              <div className="row-gap">
                <button className="chip" onClick={() => go(step - 1)} disabled={step < 0}>◀ Back</button>
                <button className="btn btn-primary btn-sm" onClick={() => go(step + 1)} disabled={step === STEPS.length - 1}>Next ▶</button>
                <button className="chip" onClick={() => go(-1)}>Reset</button>
              </div>
            </div>
            <div className="lab-card">
              <div className="readout">
                <div><small>Direction</small><strong>{s ? (s.dir > 0 ? 'Request →' : '← Response') : '-'}</strong></div>
                <div><small>Protocol</small><strong style={{ fontSize: 13 }}>{s ? s.proto : '-'}</strong></div>
                <div><small>Data size</small><strong>{s ? s.size : '-'}</strong></div>
              </div>
              <div className="mip-steps">{STEPS.map((x, i) => <span key={x.title} className={i === step ? 'on' : i < step ? 'done' : ''} onClick={() => go(i)}>{i + 1}</span>)}</div>
            </div>
          </div>
        </>
      ) : (
        <div className="viz-grid">
          <div className="stack-cols">
            <div>
              <h4>WAP stack</h4>
              {STACK.map((l, i) => <button key={l.wap} className={`stack-layer wap ${layer === i ? 'on' : ''} ${seenLayers.includes(i) ? 'seen' : ''}`} onClick={() => pickLayer(i)}>{l.wap}</button>)}
            </div>
            <div>
              <h4>Internet stack</h4>
              {STACK.map((l, i) => <div key={l.inet} className={`stack-layer inet ${layer === i ? 'on' : ''}`}>{l.inet}</div>)}
            </div>
          </div>
          <div className="lab-card">
            {layer === null ? <p>Click a layer of the WAP stack to see what it does and which Internet protocol it replaces.</p> : (
              <>
                <h3>{STACK[layer].wap} ≈ {STACK[layer].inet}</h3>
                <p>{STACK[layer].text}</p>
              </>
            )}
            <span className="chip">Explored {seenLayers.length}/{STACK.length}</span>
          </div>
        </div>
      )}
    </div>
  );
}
