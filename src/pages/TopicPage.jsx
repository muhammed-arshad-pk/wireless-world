import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { AlertTriangle, ArrowLeft, ArrowRight, BookOpen, CheckCircle2, Info, Lightbulb, ShieldCheck, Sparkles } from 'lucide-react';
import { getTopic, getUnit, topicKey } from '../data/units';
import { useGame } from '../context/GameContext';
import { labRegistry } from '../labs';
import MissionHUD from '../components/MissionHUD';
import Quiz from '../components/Quiz';
import FlowPlayer from '../components/FlowPlayer';
import DeepDive from '../components/DeepDive';
import ParticleField from '../effects/ParticleField';
import Typewriter from '../effects/Typewriter';
import ReadingProgress from '../effects/ReadingProgress';
import { spotlight } from '../effects/interactions';
import Presentation from '../components/Presentation';
import Checklist from '../components/Checklist';
import ConceptDiagrams from '../components/ConceptDiagrams';
import { diagramsFor } from '../diagrams';
import { Clock, Gauge, Presentation as PresentIcon } from 'lucide-react';

// Rough reading time from all text in the topic (≈200 words per minute).
function readingMinutes(topic) {
  const words = JSON.stringify([topic.intro, topic.definitions, topic.flow, topic.compare, topic.table, topic.cards, topic.lists, topic.deep?.sections, topic.deep?.cases, topic.caseStudy])
    .split(/\s+/).length;
  return Math.max(5, Math.round(words / 200));
}
import NotFound from './NotFound';

const TONE_ICON = { warn: AlertTriangle, good: ShieldCheck, info: Info };

export default function TopicPage() {
  const { unitId, slug } = useParams();
  const [params] = useSearchParams();
  const labRef = useRef(null);
  const quizRef = useRef(null);
  const { state, markComplete } = useGame();
  const unit = getUnit(unitId);
  const topic = getTopic(unitId, slug);
  const [presenting, setPresenting] = useState(false);
  const minutes = useMemo(() => (topic && !topic.comingSoon ? readingMinutes(topic) : 0), [topic]);

  useEffect(() => {
    const section = params.get('section');
    const el = section === 'lab' ? labRef.current : section === 'quiz' ? quizRef.current : null;
    // Wait for Layout's scroll-to-top on navigation before jumping to the section.
    if (el) {
      const t = setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [params, slug]);

  if (!unit || !topic) return <NotFound />;

  const key = topicKey(unit.id, topic.slug);
  const idx = unit.topics.indexOf(topic);
  const prev = unit.topics[idx - 1];
  const next = unit.topics[idx + 1];
  const Icon = topic.icon;
  const Lab = topic.lab && labRegistry[topic.lab.key];
  const isDone = !!state.completed[key];

  const hero = (
    <section className="topic-hero" style={{ '--accent': topic.color }}>
      <ParticleField key={topic.slug} color={topic.color} />
      <div className="hero-copy">
        <span className="eyebrow">Unit {unit.roman} · Topic {String(topic.number).padStart(2, '0')}</span>
        <h1>{topic.title}</h1>
        <p><Typewriter text={topic.tagline} /></p>
        {!topic.comingSoon && (
          <div className="hero-meta">
            <span><Clock size={13} /> ~{minutes} min read</span>
            {topic.difficulty && <span><Gauge size={13} /> {topic.difficulty}</span>}
            {topic.lab && <span>🎯 {topic.lab.objectives.length} objectives</span>}
          </div>
        )}
        {topic.disclaimer && <p className="disclaimer">⚖️ Academic study material only. Not legal advice. Legal outcomes depend on facts, evidence and court process.</p>}
        {!topic.comingSoon && (
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={() => labRef.current?.scrollIntoView({ behavior: 'smooth' })}>
              <Sparkles size={16} /> Explore visually
            </button>
            <button className="btn btn-glass" onClick={() => setPresenting(true)}>
              <PresentIcon size={16} /> Present
            </button>
            <button className="btn btn-glass" onClick={() => quizRef.current?.scrollIntoView({ behavior: 'smooth' })}>
              Knowledge check
            </button>
            {isDone && <span className="done-chip"><CheckCircle2 size={15} /> Completed</span>}
          </div>
        )}
      </div>
      <div className="hero-art" aria-hidden="true">
        <div className="ring r1" /><div className="ring r2" /><div className="ring r3" />
        <Icon size={64} />
      </div>
    </section>
  );

  if (topic.comingSoon) {
    return (
      <div className="page">
        {hero}
        <div className="card empty-state">
          <BookOpen size={32} />
          <h3>Content coming soon</h3>
          <p className="muted">This topic hasn’t been added yet.</p>
        </div>
        {topic.related && (
          <section className="card">
            <h2 className="card-title"><Sparkles size={18} /> Related labs available now</h2>
            <div className="topic-grid">
              {topic.related.map((r) => (
                <Link key={r.to} to={r.to} className="topic-card">
                  <h3>{r.title}</h3>
                  <p>{r.text}</p>
                  <span className="explore">Open <ArrowRight size={14} /></span>
                </Link>
              ))}
            </div>
          </section>
        )}
        <TopicNav unit={unit} prev={prev} next={next} />
      </div>
    );
  }

  return (
    <div className="page">
      <ReadingProgress />
      {hero}

      <div className="grid-2">
        <section className="card">
          <h2 className="card-title">What is {topic.title}?</h2>
          {topic.intro.map((p, i) => <p key={i}>{p}</p>)}
        </section>
        <section className="card">
          <h2 className="card-title">{topic.definitions.title}</h2>
          <div className="defs">
            {topic.definitions.items.map((d) => (
              <div key={d.term} className="def"><strong>{d.term}</strong><span>{d.text}</span></div>
            ))}
          </div>
        </section>
      </div>

      <ConceptDiagrams diagrams={diagramsFor(topic)} />

      <FlowPlayer key={`flow-${topic.slug}`} title={topic.flow.title} steps={topic.flow.steps} />

      {/* ---------- The interactive visualizer ---------- */}
      {Lab && (
        <section className="lab-panel" ref={labRef} id="lab" onMouseMove={spotlight}>
          <div className="lab-head">
            <div>
              <span className="lab-tag"><Sparkles size={14} /> Interactive Visualizer</span>
              <h2>{topic.lab.title}</h2>
              <p>{topic.lab.description}</p>
            </div>
            <MissionHUD labKey={topic.lab.key} />
          </div>
          <Lab key={topic.slug} />
          <p className="lab-safe">📐 Interactive visual model. Values are calculated with standard textbook formulas; some figures are simplified for clarity.</p>
        </section>
      )}

      {topic.table && (
        <section className="card">
          <h2 className="card-title">{topic.table.title}</h2>
          <div className="table-wrap">
            <table className="cmp-table">
              <thead><tr>{topic.table.columns.map((c) => <th key={c}>{c}</th>)}</tr></thead>
              <tbody>{topic.table.rows.map((r) => <tr key={r[0]}>{r.map((c, i) => <td key={i}>{c}</td>)}</tr>)}</tbody>
            </table>
          </div>
        </section>
      )}

      {topic.formulas && (
        <section className="card">
          <h2 className="card-title">∑ Key Formulas</h2>
          <div className="formula-grid">
            {topic.formulas.map((f) => (
              <div key={f.name} className="formula-card">
                <strong>{f.name}</strong>
                <code>{f.expr}</code>
                <small>{f.note}</small>
              </div>
            ))}
          </div>
        </section>
      )}

      {topic.deep && <DeepDive key={key} deep={topic.deep} topicKey={key} />}

      <div className="grid-2">
        <section className="card">
          <h2 className="card-title">{topic.compare.title}</h2>
          <div className="compare">
            {[topic.compare.left, topic.compare.right].map((c, i) => (
              <div key={c.title} className={`compare-col ${i ? 'right' : 'left'}`}>
                <strong>{c.title}</strong>
                <small>{c.subtitle}</small>
                <ul>{c.points.map((p) => <li key={p}>{p}</li>)}</ul>
              </div>
            ))}
          </div>
        </section>
        <section className="card">
          <h2 className="card-title">{topic.cards.title}</h2>
          <div className="mini-cards">
            {topic.cards.items.map((c) => (
              <div key={c.title} className="mini-card"><strong>{c.title}</strong><span>{c.text}</span></div>
            ))}
          </div>
        </section>
      </div>

      <div className={`grid-${topic.lists.length}`}>
        {topic.lists.map((l) => {
          const TI = TONE_ICON[l.tone];
          return (
            <section key={l.title} className={`card list-card tone-${l.tone}`}>
              <h2 className="card-title"><TI size={18} /> {l.title}</h2>
              <ul>{l.items.map((it) => <li key={it}>{it}</li>)}</ul>
            </section>
          );
        })}
      </div>

      {topic.checklist && <Checklist key={`cl-${key}`} title={topic.checklist.title} items={topic.checklist.items} storageKey={`wirelessworld-checklist-${key}`} />}

      {(topic.caseStudy || topic.callout) && (
        <div className="grid-2">
          {topic.caseStudy && (
            <section className="card case">
              <span className="tag">Story</span>
              <h2 className="card-title">{topic.caseStudy.title}</h2>
              <p>{topic.caseStudy.text}</p>
            </section>
          )}
          {topic.callout && (
            <section className="card callout">
              <h2 className="card-title"><Lightbulb size={18} /> {topic.callout.title}</h2>
              <p>{topic.callout.text}</p>
            </section>
          )}
        </div>
      )}

      <section className="card" ref={quizRef} id="quiz">
        <Quiz key={key} questions={topic.quiz} quizKey={key} title={`${topic.title}: Knowledge Check`} />
      </section>

      {!isDone && (
        <div className="complete-row">
          <span className="muted">Pass the knowledge check (60%+) to complete this topic, or</span>
          <button className="btn btn-ghost btn-sm" onClick={() => markComplete(key)}>mark as complete</button>
        </div>
      )}

      <TopicNav unit={unit} prev={prev} next={next} />
      {presenting && <Presentation topic={topic} unit={unit} onClose={() => setPresenting(false)} />}
    </div>
  );
}

function TopicNav({ unit, prev, next }) {
  return (
    <div className="topic-nav">
      {prev ? (
        <Link to={`/unit/${unit.id}/${prev.slug}`} className="topic-nav-link">
          <ArrowLeft size={16} /><span><small>Previous</small>{prev.title}</span>
        </Link>
      ) : <span />}
      {next ? (
        <Link to={`/unit/${unit.id}/${next.slug}`} className="topic-nav-link right">
          <span><small>Next</small>{next.title}</span><ArrowRight size={16} />
        </Link>
      ) : (
        <Link to={`/unit/${unit.id}`} className="topic-nav-link right">
          <span><small>Finished</small>Back to Unit {unit.roman}</span><ArrowRight size={16} />
        </Link>
      )}
    </div>
  );
}
