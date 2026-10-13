import { useEffect, useRef, useState } from 'react';
import { Pause, Play, RotateCcw } from 'lucide-react';
import { sfx } from '../effects/sfx';

/** Attack/process flow that can be "played" step by step. */
export default function FlowPlayer({ title, steps }) {
  const [active, setActive] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const timer = useRef(null);

  useEffect(() => {
    if (!playing) return undefined;
    timer.current = setTimeout(() => {
      if (active + 1 >= steps.length) { setPlaying(false); sfx('good'); return; }
      setActive(active + 1);
      sfx('whoosh');
    }, active === -1 ? 150 : 1600);
    return () => clearTimeout(timer.current);
  }, [playing, active, steps.length]);

  const toggle = () => {
    if (playing) { setPlaying(false); return; }
    if (active >= steps.length - 1) setActive(-1);
    setPlaying(true);
  };

  const pct = active < 0 ? 0 : ((active + 1) / steps.length) * 100;

  return (
    <section className="card flow-card">
      <div className="row-between">
        <h2 className="card-title">{title}</h2>
        <div className="row-gap">
          <button className="btn btn-primary btn-sm" onClick={toggle}>
            {playing ? <><Pause size={14} /> Pause</> : <><Play size={14} /> {active >= steps.length - 1 ? 'Replay' : 'Play'} animation</>}
          </button>
          {active >= 0 && !playing && (
            <button className="btn btn-ghost btn-sm" onClick={() => setActive(-1)} aria-label="Reset"><RotateCcw size={14} /></button>
          )}
        </div>
      </div>
      <div className="flow-track"><span style={{ width: `${pct}%` }} /></div>
      <div className="flow">
        {steps.map((s, i) => (
          <button
            key={s.title}
            className={`flow-step ${i === active ? 'active' : ''} ${i < active ? 'past' : ''}`}
            onClick={() => { setPlaying(false); setActive(i); sfx('click'); }}
          >
            <span className="flow-num">{i + 1}</span>
            <strong>{s.title}</strong>
            <p>{s.text}</p>
          </button>
        ))}
      </div>
    </section>
  );
}
