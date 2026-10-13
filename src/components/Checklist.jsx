import { useState } from 'react';
import { ListChecks } from 'lucide-react';
import { sfx } from '../effects/sfx';

/** Tickable checklist whose state is remembered per topic in this browser. */
export default function Checklist({ title, items, storageKey }) {
  const [done, setDone] = useState(() => {
    try { return new Set(JSON.parse(localStorage.getItem(storageKey)) ?? []); } catch { return new Set(); }
  });
  const toggle = (i) => {
    sfx('tick');
    const n = new Set(done);
    n.has(i) ? n.delete(i) : n.add(i);
    setDone(n);
    try { localStorage.setItem(storageKey, JSON.stringify([...n])); } catch { /* ignore */ }
  };
  return (
    <section className="card">
      <div className="row-between">
        <h2 className="card-title"><ListChecks size={20} /> {title}</h2>
        <span className="tag">{done.size}/{items.length} done</span>
      </div>
      <div className="bar" style={{ margin: '4px 0 14px' }}><span style={{ width: `${(done.size / items.length) * 100}%` }} /></div>
      <ul className="notes">
        {items.map((it, i) => (
          <li key={it}>
            <button className={done.has(i) ? 'on' : ''} onClick={() => toggle(i)}>
              <span className="check-box">{done.has(i) ? '✓' : ''}</span>{it}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
