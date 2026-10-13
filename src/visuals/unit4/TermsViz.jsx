import { useState } from 'react';
import { useMission } from '../../context/GameContext';
import { sfx } from '../../effects/sfx';

const TERMS = [
  { id: 'MN', name: 'Mobile Node (MN)', def: 'A device that changes its point of attachment but keeps its IP address.' },
  { id: 'HN', name: 'Home Network', def: 'The network whose prefix matches the device’s permanent address.' },
  { id: 'HoA', name: 'Home Address', def: 'The permanent IP address that correspondents always use.' },
  { id: 'HA', name: 'Home Agent (HA)', def: 'Router at home that stores the binding and tunnels packets to the device.' },
  { id: 'FN', name: 'Foreign Network', def: 'Any network the device is visiting other than its home.' },
  { id: 'FA', name: 'Foreign Agent (FA)', def: 'Router in the visited network that offers a CoA and decapsulates packets.' },
  { id: 'CoA', name: 'Care-of Address (CoA)', def: 'Temporary address showing where the device is right now: the tunnel endpoint.' },
  { id: 'CN', name: 'Correspondent Node (CN)', def: 'Any host talking to the device, with no Mobile IP support needed.' },
];

const shuffle = (a) => { const b = [...a]; for (let i = b.length - 1; i > 0; i -= 1) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };

export default function TermsViz() {
  const { complete } = useMission('w4-terms');
  const [defs, setDefs] = useState(() => shuffle(TERMS));
  const [pick, setPick] = useState(null);
  const [done, setDone] = useState([]);
  const [wrong, setWrong] = useState(null);
  const [mistakes, setMistakes] = useState(0);

  const choose = (d) => {
    if (!pick || done.includes(d.id)) return;
    if (d.id === pick) {
      const n = [...done, d.id];
      setDone(n); setPick(null); sfx('good');
      if (n.length === TERMS.length) {
        complete('all');
        if (mistakes <= 1) complete('flawless');
        sfx('fanfare');
      }
    } else {
      setWrong(d.id); setMistakes((m) => m + 1); sfx('bad');
      setTimeout(() => setWrong(null), 500);
    }
  };
  const reset = () => { setDefs(shuffle(TERMS)); setPick(null); setDone([]); setMistakes(0); sfx('click'); };
  const lit = (id) => (done.includes(id) ? 'lit' : '');

  return (
    <div className="viz">
      <div className="viz-stage">
        <svg viewBox="0 0 640 210">
          <rect x="20" y="30" width="130" height="160" rx="12" className={`term-zone ${lit('CN')}`} />
          <text x="85" y="52" textAnchor="middle" className="wave-label">Internet</text>
          <circle cx="85" cy="115" r="22" className={`term-node ${lit('CN')}`} /><text x="85" y="119" textAnchor="middle" className="term-lbl">CN</text>
          <rect x="190" y="30" width="190" height="160" rx="12" className={`term-zone ${lit('HN')}`} />
          <text x="285" y="52" textAnchor="middle" className="wave-label">{done.includes('HN') ? 'Home Network' : '?'}</text>
          <circle cx="250" cy="115" r="22" className={`term-node ${lit('HA')}`} /><text x="250" y="119" textAnchor="middle" className="term-lbl">HA</text>
          <text x="300" y="150" textAnchor="middle" className={`term-tag ${lit('HoA')}`}>HoA 10.1.0.25</text>
          <rect x="420" y="30" width="200" height="160" rx="12" className={`term-zone ${lit('FN')}`} />
          <text x="520" y="52" textAnchor="middle" className="wave-label">{done.includes('FN') ? 'Foreign Network' : '?'}</text>
          <circle cx="470" cy="115" r="22" className={`term-node ${lit('FA')}`} /><text x="470" y="119" textAnchor="middle" className="term-lbl">FA</text>
          <circle cx="570" cy="115" r="20" className={`term-node mn ${lit('MN')}`} /><text x="570" y="119" textAnchor="middle" className="term-lbl">MN</text>
          <text x="520" y="160" textAnchor="middle" className={`term-tag ${lit('CoA')}`}>CoA 172.16.5.1</text>
          <line x1="107" y1="115" x2="228" y2="115" className="net-link" />
          <line x1="272" y1="115" x2="448" y2="115" className={`net-link ${done.includes('CoA') && done.includes('HA') ? 'tunnel-on' : ''}`} />
          <line x1="492" y1="115" x2="550" y2="115" className="net-link" />
          <text x="360" y="105" textAnchor="middle" className="wave-label">{done.includes('CoA') && done.includes('HA') ? 'tunnel HA → CoA' : ''}</text>
        </svg>
      </div>
      <div className="match-grid">
        <div className="match-col">
          {TERMS.map((t) => (
            <button key={t.id} className={`match-term ${pick === t.id ? 'pick' : ''} ${done.includes(t.id) ? 'ok' : ''}`} disabled={done.includes(t.id)} onClick={() => { setPick(t.id); sfx('tick'); }}>{t.name}</button>
          ))}
        </div>
        <div className="match-col">
          {defs.map((d) => (
            <button key={d.id} className={`match-def ${done.includes(d.id) ? 'ok' : ''} ${wrong === d.id ? 'bad' : ''}`} onClick={() => choose(d)} disabled={done.includes(d.id)}>
              {done.includes(d.id) && <b>{d.id} · </b>}{d.def}
            </button>
          ))}
        </div>
      </div>
      <div className="row-gap">
        <span className="chip">Matched {done.length}/8</span>
        <span className="chip">Mistakes {mistakes}</span>
        <button className="chip" onClick={reset}>New round</button>
        <span className="hint">{pick ? 'Now click the matching definition →' : 'Pick a term on the left first.'}</span>
      </div>
    </div>
  );
}
