import { useState } from 'react';
import { BookOpenCheck, ChevronDown, Gavel, History, Microscope, RefreshCw, ScrollText } from 'lucide-react';
import { sfx } from '../effects/sfx';

const TABS = [
  { id: 'deep', label: 'Deep Dive', icon: Microscope },
  { id: 'cases', label: 'Real Cases', icon: History },
  { id: 'myths', label: 'Myths vs Facts', icon: RefreshCw },
  { id: 'law', label: 'Law & Help', icon: Gavel },
  { id: 'notes', label: 'Exam Notes', icon: ScrollText },
];

function Accordion({ sections }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="accordion">
      {sections.map((s, i) => (
        <div key={s.title} className={`acc-item ${open === i ? 'open' : ''}`}>
          <button className="acc-head" onClick={() => { setOpen(open === i ? -1 : i); sfx('click'); }}>
            <span className="acc-num">{String(i + 1).padStart(2, '0')}</span>
            <strong>{s.title}</strong>
            <ChevronDown size={18} />
          </button>
          <div className="acc-body">
            <div>
              <ul>{s.points.map((p) => <li key={p}>{p}</li>)}</ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Timeline({ cases }) {
  return (
    <ol className="timeline">
      {cases.map((c, i) => (
        <li key={c.title} style={{ animationDelay: `${i * 0.12}s` }}>
          <span className="tl-year">{c.year}</span>
          <div className="tl-card">
            <strong>{c.title}</strong>
            <p>{c.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

function Myths({ myths }) {
  const [flipped, setFlipped] = useState(() => new Set());
  const flip = (i) => {
    sfx('whoosh');
    setFlipped((f) => { const n = new Set(f); n.has(i) ? n.delete(i) : n.add(i); return n; });
  };
  return (
    <>
      <p className="muted">Tap a card to reveal the truth.</p>
      <div className="myth-grid">
        {myths.map((m, i) => (
          <button key={m.myth} className={`flip ${flipped.has(i) ? 'flipped' : ''}`} onClick={() => flip(i)}>
            <span className="flip-inner">
              <span className="flip-face front"><em>MYTH</em>{m.myth}<small>tap to flip ↻</small></span>
              <span className="flip-face back"><em>FACT</em>{m.fact}</span>
            </span>
          </button>
        ))}
      </div>
    </>
  );
}

function Notes({ notes, storageKey }) {
  const [done, setDone] = useState(() => {
    try { return new Set(JSON.parse(localStorage.getItem(storageKey)) ?? []); } catch { return new Set(); }
  });
  const toggle = (i) => {
    sfx('tick');
    setDone((d) => {
      const n = new Set(d);
      n.has(i) ? n.delete(i) : n.add(i);
      try { localStorage.setItem(storageKey, JSON.stringify([...n])); } catch { /* ignore */ }
      return n;
    });
  };
  return (
    <>
      <div className="row-between">
        <p className="muted" style={{ margin: 0 }}>Tick each point once you can explain it without looking.</p>
        <span className="tag">{done.size}/{notes.length} revised</span>
      </div>
      <div className="bar" style={{ margin: '10px 0 14px' }}><span style={{ width: `${(done.size / notes.length) * 100}%` }} /></div>
      <ul className="notes">
        {notes.map((n, i) => (
          <li key={n}>
            <button className={done.has(i) ? 'on' : ''} onClick={() => toggle(i)}>
              <span className="check-box">{done.has(i) ? '✓' : ''}</span>{n}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

const TAB_DATA = { deep: 'sections', cases: 'cases', myths: 'myths', law: 'law', notes: 'examNotes' };

export default function DeepDive({ deep, topicKey }) {
  const tabs = TABS.filter((t) => deep[TAB_DATA[t.id]]?.length);
  const [tab, setTab] = useState(tabs[0]?.id);
  return (
    <section className="card deep">
      <div className="row-between">
        <h2 className="card-title"><BookOpenCheck size={20} /> Go Deeper</h2>
      </div>
      <div className="tabs" role="tablist">
        {tabs.map((t) => (
          <button key={t.id} role="tab" aria-selected={tab === t.id} className={tab === t.id ? 'active' : ''} onClick={() => { setTab(t.id); sfx('click'); }}>
            <t.icon size={15} /> {t.label}
          </button>
        ))}
      </div>
      <div className="tab-body" key={tab}>
        {tab === 'deep' && <Accordion sections={deep.sections} />}
        {tab === 'cases' && <Timeline cases={deep.cases} />}
        {tab === 'myths' && <Myths myths={deep.myths} />}
        {tab === 'law' && (
          <div className="law-grid">
            {deep.law.map((l) => <div key={l.title} className="law-card"><strong>{l.title}</strong><p>{l.text}</p></div>)}
          </div>
        )}
        {tab === 'notes' && <Notes notes={deep.examNotes} storageKey={`wirelessworld-notes-${topicKey}`} />}
      </div>
    </section>
  );
}
