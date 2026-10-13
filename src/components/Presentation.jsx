import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import { sfx } from '../effects/sfx';
import { diagramsFor } from '../diagrams';

/** Builds a slide deck from a topic's data. */
function buildSlides(topic, unit) {
  const s = [];
  s.push({ kind: 'title', eyebrow: `Unit ${unit.roman} · ${unit.title}`, title: topic.title, sub: topic.tagline });
  s.push({ kind: 'text', title: `What is ${topic.title}?`, paras: topic.intro });
  s.push({ kind: 'defs', title: topic.definitions.title, items: topic.definitions.items });
  diagramsFor(topic).forEach((d) => s.push({ kind: 'diagram', title: d.title, render: d.render, caption: d.caption }));
  s.push({ kind: 'flow', title: topic.flow.title, steps: topic.flow.steps });
  s.push({ kind: 'compare', title: topic.compare.title, left: topic.compare.left, right: topic.compare.right });
  if (topic.table) s.push({ kind: 'table', ...topic.table });
  if (topic.formulas) s.push({ kind: 'defs', title: 'Key Formulas', items: topic.formulas.map((f) => ({ term: `${f.name}:  ${f.expr}`, text: f.note })) });
  s.push({ kind: 'cards', title: topic.cards.title, items: topic.cards.items });
  topic.lists.forEach((l) => s.push({ kind: 'list', title: l.title, tone: l.tone, items: l.items }));
  if (topic.checklist) s.push({ kind: 'list', title: topic.checklist.title, tone: 'good', items: topic.checklist.items });
  topic.deep?.sections.forEach((d) => s.push({ kind: 'list', title: d.title, tone: 'info', items: d.points }));
  if (topic.deep?.cases) s.push({ kind: 'cases', title: 'Real-World Cases', items: topic.deep.cases });
  if (topic.deep?.myths) s.push({ kind: 'myths', title: 'Myths vs Facts', items: topic.deep.myths });
  if (topic.caseStudy) s.push({ kind: 'text', title: topic.caseStudy.title, paras: [topic.caseStudy.text] });
  if (topic.deep?.law) s.push({ kind: 'defs', title: 'Law & Help (India)', items: topic.deep.law.map((l) => ({ term: l.title, text: l.text })) });
  if (topic.deep?.examNotes) s.push({ kind: 'list', title: 'Key Takeaways', tone: 'good', items: topic.deep.examNotes });
  s.push({ kind: 'title', eyebrow: 'Wireless World', title: 'Thank you!', sub: 'Questions? Now explore the interactive visualizer.' });
  return s;
}

function Slide({ slide }) {
  switch (slide.kind) {
    case 'title':
      return (<div className="sl-title"><span className="eyebrow">{slide.eyebrow}</span><h1>{slide.title}</h1><p>{slide.sub}</p></div>);
    case 'text':
      return (<><h2>{slide.title}</h2>{slide.paras.map((p) => <p key={p} className="sl-para">{p}</p>)}</>);
    case 'defs':
      return (<><h2>{slide.title}</h2><div className="sl-defs">{slide.items.map((d) => <div key={d.term}><strong>{d.term}</strong><span>{d.text}</span></div>)}</div></>);
    case 'flow':
      return (<><h2>{slide.title}</h2><div className="sl-flow">{slide.steps.map((st, i) => <div key={st.title} style={{ animationDelay: `${0.15 + i * 0.18}s` }}><b>{i + 1}</b><strong>{st.title}</strong><span>{st.text}</span></div>)}</div></>);
    case 'compare':
      return (<><h2>{slide.title}</h2><div className="sl-compare">{[slide.left, slide.right].map((c) => <div key={c.title}><strong>{c.title}</strong><small>{c.subtitle}</small><ul>{c.points.map((p) => <li key={p}>{p}</li>)}</ul></div>)}</div></>);
    case 'table':
      return (<><h2>{slide.title}</h2><table className="sl-table"><thead><tr>{slide.columns.map((c) => <th key={c}>{c}</th>)}</tr></thead><tbody>{slide.rows.map((r) => <tr key={r[0]}>{r.map((c, i) => <td key={i}>{c}</td>)}</tr>)}</tbody></table></>);
    case 'cards':
      return (<><h2>{slide.title}</h2><div className="sl-cards">{slide.items.map((c, i) => <div key={c.title} style={{ animationDelay: `${0.1 + i * 0.08}s` }}><strong>{c.title}</strong><span>{c.text}</span></div>)}</div></>);
    case 'list':
      return (<><h2>{slide.title}</h2><ul className={`sl-list ${slide.tone}`}>{slide.items.map((it, i) => <li key={it} style={{ animationDelay: `${0.1 + i * 0.1}s` }}>{it}</li>)}</ul></>);
    case 'cases':
      return (<><h2>{slide.title}</h2><div className="sl-cases">{slide.items.map((c) => <div key={c.title}><b>{c.year}</b><strong>{c.title}</strong><span>{c.text}</span></div>)}</div></>);
    case 'diagram': {
      const Render = slide.render;
      return (<><h2>{slide.title}</h2><div className="sl-diagram"><Render /></div>{slide.caption && <p className="sl-diagram-cap">{slide.caption}</p>}</>);
    }
    case 'myths':
      return (<><h2>{slide.title}</h2><div className="sl-myths">{slide.items.map((m) => <div key={m.myth}><span className="m">✘ {m.myth}</span><span className="f">✔ {m.fact}</span></div>)}</div></>);
    default:
      return null;
  }
}

export default function Presentation({ topic, unit, onClose }) {
  const slides = useMemo(() => buildSlides(topic, unit), [topic, unit]);
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const ref = useRef(null);

  const go = useCallback((d) => {
    const n = Math.max(0, Math.min(slides.length - 1, i + d));
    if (n === i) return;
    setDir(d);
    setI(n);
    sfx('whoosh');
  }, [i, slides.length]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') { e.preventDefault(); go(1); }
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); go(-1); }
      if (e.key === 'Escape' && !document.fullscreenElement) onClose();
      if (e.key === 'Home') setI(0);
      if (e.key === 'End') setI(slides.length - 1);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [go, onClose, slides.length]);

  const fullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else ref.current?.requestFullscreen?.();
  };

  return (
    <div className="deck" ref={ref} role="dialog" aria-label={`${topic.title} presentation`} style={{ '--accent': topic.color }}>
      <div className="deck-bar">
        <span>{topic.title}</span>
        <span className="deck-count">{i + 1} / {slides.length}</span>
        <button className="icon-btn" onClick={fullscreen} aria-label="Toggle fullscreen"><Maximize2 size={18} /></button>
        <button className="icon-btn" onClick={onClose} aria-label="Close presentation"><X size={20} /></button>
      </div>
      <div className="deck-stage" onClick={(e) => { if (e.target === e.currentTarget) go(1); }}>
        <div className={`slide ${dir > 0 ? 'fwd' : 'back'}`} key={i}>
          <Slide slide={slides[i]} />
        </div>
      </div>
      <div className="deck-nav">
        <button className="icon-btn" onClick={() => go(-1)} disabled={i === 0} aria-label="Previous slide"><ChevronLeft size={26} /></button>
        <div className="deck-dots">{slides.map((_, k) => <button key={k} className={k === i ? 'on' : k < i ? 'past' : ''} onClick={() => { setDir(k > i ? 1 : -1); setI(k); }} aria-label={`Slide ${k + 1}`} />)}</div>
        <button className="icon-btn" onClick={() => go(1)} disabled={i === slides.length - 1} aria-label="Next slide"><ChevronRight size={26} /></button>
      </div>
      <div className="deck-progress" style={{ transform: `scaleX(${(i + 1) / slides.length})` }} />
    </div>
  );
}
