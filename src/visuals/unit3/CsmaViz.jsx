import { useEffect, useMemo, useRef, useState } from 'react';
import { useMission } from '../../context/GameContext';
import { sfx } from '../../effects/sfx';

// Times in slot units (illustrative): DIFS 2, frame 6, SIFS 1, ACK 2.
const DIFS = 2; const FRAME = 6; const SIFS = 1; const ACK = 2;
function rng(seed) { let s = seed; return () => { s = (s * 16807) % 2147483647; return s / 2147483647; }; }

function simulate(initial, seed) {
  const rand = rng(seed);
  const st = initial.map((b, i) => ({ name: `STA ${String.fromCharCode(65 + i)}`, backoff: b, cw: 7, done: false, segs: [] }));
  const channel = []; let t = 0; let collisions = 0; let guard = 0;
  while (st.some((s) => !s.done) && guard++ < 40) {
    const act = st.filter((s) => !s.done);
    act.forEach((s) => s.segs.push({ type: 'difs', start: t, len: DIFS }));
    t += DIFS;
    const m = Math.min(...act.map((s) => s.backoff));
    if (m > 0) act.forEach((s) => { s.segs.push({ type: 'backoff', start: t, len: m, label: `${s.backoff}→${s.backoff - m}` }); s.backoff -= m; });
    t += m;
    const win = act.filter((s) => s.backoff === 0);
    const others = act.filter((s) => s.backoff > 0);
    if (win.length === 1) {
      const w = win[0];
      w.segs.push({ type: 'tx', start: t, len: FRAME, label: 'DATA' });
      w.segs.push({ type: 'ack', start: t + FRAME + SIFS, len: ACK, label: 'ACK' });
      channel.push({ type: 'tx', start: t, len: FRAME, label: `${w.name} data` }, { type: 'ack', start: t + FRAME + SIFS, len: ACK, label: 'ACK' });
      others.forEach((s) => s.segs.push({ type: 'frozen', start: t, len: FRAME + SIFS + ACK, label: `frozen at ${s.backoff}` }));
      w.done = true; t += FRAME + SIFS + ACK;
    } else {
      collisions += 1;
      win.forEach((s) => { s.segs.push({ type: 'collision', start: t, len: FRAME, label: 'COLLISION' }); });
      channel.push({ type: 'collision', start: t, len: FRAME, label: '✖ collision' });
      others.forEach((s) => s.segs.push({ type: 'frozen', start: t, len: FRAME + SIFS + ACK, label: `frozen at ${s.backoff}` }));
      t += FRAME;
      win.forEach((s) => { s.segs.push({ type: 'timeout', start: t, len: SIFS + ACK, label: 'no ACK' }); s.cw = Math.min(2 * (s.cw + 1) - 1, 63); s.backoff = Math.floor(rand() * (s.cw + 1)); s.segs.push({ type: 'note', start: t + SIFS + ACK, len: 0, label: `CW→${s.cw}, new backoff ${s.backoff}` }); });
      t += SIFS + ACK;
    }
  }
  return { st, channel, total: t, collisions };
}

function Timeline({ complete }) {
  const [seed, setSeed] = useState(7);
  const [force, setForce] = useState(true);
  const [play, setPlay] = useState(null);
  const raf = useRef(null);
  const sim = useMemo(() => {
    const r = rng(seed);
    const init = force ? [3, 3, 5] : [0, 1, 2].map(() => Math.floor(r() * 8));
    return simulate(init, seed + 11);
  }, [seed, force]);
  const S = 14; const W = sim.total * S;

  const run = () => {
    cancelAnimationFrame(raf.current);
    const t0 = performance.now(); sfx('whoosh');
    const step = (now) => {
      const p = ((now - t0) / 1000) * 6; // slots per second
      if (p >= sim.total) { setPlay(sim.total); complete('run'); if (sim.collisions) complete('collision'); sfx('good'); return; }
      setPlay(p); raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
  };
  useEffect(() => () => cancelAnimationFrame(raf.current), []);
  useEffect(() => { setPlay(null); }, [sim]);
  const vis = (s) => play === null || s.start <= play;

  const rows = [...sim.st.map((s) => ({ name: s.name, segs: s.segs })), { name: 'Channel', segs: sim.channel }];
  return (
    <>
      <div className="row-gap">
        <button className="btn btn-primary btn-sm" onClick={run}>▶ Run CSMA/CA</button>
        <label className="switch dark"><input type="checkbox" checked={force} onChange={(e) => setForce(e.target.checked)} /><span>Force equal backoffs (A and B pick 3)</span></label>
        <button className="chip" onClick={() => { setForce(false); setSeed((s) => s + 1); }}>🎲 New random backoffs</button>
      </div>
      <div className="viz-stage csma-stage">
        <svg viewBox={`-90 0 ${W + 110} ${rows.length * 56 + 30}`}>
          {rows.map((r, k) => (
            <g key={r.name} transform={`translate(0,${20 + k * 56})`}>
              <text x="-86" y="24" className="wave-label lc-name">{r.name}</text>
              <line x1="0" x2={W} y1="36" y2="36" className="wave-grid" />
              {r.segs.filter((s) => s.type !== 'note').map((s, i) => (
                <g key={i} opacity={vis(s) ? 1 : 0.08}>
                  <rect x={s.start * S} y="6" width={Math.max(2, s.len * S)} height="30" rx="4" className={`csma-${s.type}`} />
                  {s.len * S > 34 && <text x={(s.start + s.len / 2) * S} y="26" className="csma-lbl">{s.label ?? s.type.toUpperCase()}</text>}
                </g>
              ))}
              {r.segs.filter((s) => s.type === 'note').map((s, i) => vis(s) && <text key={`n${i}`} x={s.start * S + 2} y="50" className="csma-note">{s.label}</text>)}
            </g>
          ))}
          {play !== null && <line x1={play * S} x2={play * S} y1="10" y2={rows.length * 56 + 22} stroke="#fff" strokeWidth="2" />}
        </svg>
      </div>
      <div className="row-gap legend">{[['difs', 'DIFS wait'], ['backoff', 'Backoff countdown'], ['tx', 'Transmit'], ['ack', 'SIFS → ACK'], ['frozen', 'Frozen (channel busy)'], ['collision', 'Collision'], ['timeout', 'ACK timeout']].map(([c, l]) => <span key={c}><i className={`csma-${c}`} /> {l}</span>)}</div>
      <p className="hint">{sim.collisions ? `${sim.collisions} collision(s). The stations that collided doubled their contention window and drew new backoffs.` : 'No collisions this time: the random backoffs separated everyone.'} Stations that lost contention keep their remaining count, so they’re more likely to win next time.</p>
    </>
  );
}

const HIDDEN = {
  plain: [
    { who: 'A', text: 'A senses the channel idle and sends DATA to the AP.', arrows: [['A', 'AP', 'data']] },
    { who: 'C', text: 'C can’t hear A (out of range), so it also senses idle and sends DATA.', arrows: [['A', 'AP', 'data'], ['C', 'AP', 'data']] },
    { who: 'AP', text: '✖ Both frames overlap at the AP: collision! Neither gets an ACK, and both must back off and retry.', arrows: [['A', 'AP', 'bad'], ['C', 'AP', 'bad']], fail: true },
  ],
  rts: [
    { who: 'A', text: 'A sends a short RTS (Request To Send) with the duration it needs.', arrows: [['A', 'AP', 'rts']] },
    { who: 'AP', text: 'The AP replies CTS (Clear To Send). Both A and C hear it.', arrows: [['AP', 'A', 'cts'], ['AP', 'C', 'cts']] },
    { who: 'C', text: 'C reads the duration in the CTS, sets its NAV and stays silent.', arrows: [], nav: true },
    { who: 'A', text: 'A sends DATA safely.', arrows: [['A', 'AP', 'data']], nav: true },
    { who: 'AP', text: 'The AP returns an ACK ✔. When C’s NAV expires, C contends normally.', arrows: [['AP', 'A', 'ack']], ok: true },
  ],
};
const POS = { A: [90, 150], AP: [300, 150], C: [510, 150] };

function Hidden({ complete }) {
  const [mode, setMode] = useState('plain');
  const [step, setStep] = useState(0);
  const steps = HIDDEN[mode];
  const cur = steps[step - 1];
  const next = () => {
    const s = Math.min(steps.length, step + 1); setStep(s); sfx(steps[s - 1].fail ? 'bad' : 'click');
    if (s === steps.length && mode === 'rts') { complete('rtscts'); sfx('good'); }
  };
  return (
    <div className="viz-grid">
      <div className="viz-stage">
        <svg viewBox="0 0 600 290">
          <circle cx={POS.A[0]} cy="150" r="250" className="range-zone pink" />
          <circle cx={POS.C[0]} cy="150" r="250" className="range-zone" />
          <text x="20" y="30" className="wave-label" fill="#f9a8d4">A’s range</text>
          <text x="520" y="30" className="wave-label" fill="#67e8f9">C’s range</text>
          {cur?.arrows.map(([f, to, kind], i) => <line key={`${step}${i}`} x1={POS[f][0]} y1={POS[f][1] - 6} x2={POS[to][0]} y2={POS[to][1] - 6} className={`hn-arrow ${kind}`} />)}
          {Object.entries(POS).map(([k, [x, y]]) => (
            <g key={k}>
              <circle cx={x} cy={y} r="24" className={`net-node ${k === 'AP' ? 'ap' : ''} ${cur?.fail && k === 'AP' ? 'boom' : ''}`} />
              <text x={x} y={y + 5} className="wave-bit" fill="#0b1530">{k}</text>
            </g>
          ))}
          {cur?.nav && <text x={POS.C[0]} y="205" className="wave-label" textAnchor="middle" fill="#fde68a">NAV set ⏳</text>}
          <text x="300" y="275" className="wave-label" textAnchor="middle">A and C are hidden from each other</text>
        </svg>
      </div>
      <div className="lab-card">
        <div className="seg small">
          <button className={mode === 'plain' ? 'active' : ''} onClick={() => { setMode('plain'); setStep(0); }}>Without RTS/CTS</button>
          <button className={mode === 'rts' ? 'active' : ''} onClick={() => { setMode('rts'); setStep(0); }}>With RTS/CTS</button>
        </div>
        {cur ? <div className={`info-box ${cur.fail ? 'warn-box' : ''}`} key={`${mode}${step}`}>{cur.text}</div> : <p className="hint">Step through what happens.</p>}
        <button className="btn btn-primary btn-sm" onClick={next} disabled={step === steps.length}>Next step ({step}/{steps.length})</button>
      </div>
    </div>
  );
}

export default function CsmaViz() {
  const { complete } = useMission('w3-csma');
  const [tab, setTab] = useState('time');
  return (
    <div className="viz">
      <div className="seg">
        <button className={tab === 'time' ? 'active' : ''} onClick={() => setTab('time')}>CSMA/CA timeline</button>
        <button className={tab === 'hidden' ? 'active' : ''} onClick={() => setTab('hidden')}>Hidden node & RTS/CTS</button>
      </div>
      {tab === 'time' ? <Timeline complete={complete} /> : <Hidden complete={complete} />}
    </div>
  );
}
