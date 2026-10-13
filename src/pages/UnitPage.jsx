import { Link, useParams } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Gamepad2, ListChecks, Sparkles, Target, Construction } from 'lucide-react';
import { getUnit, topicKey } from '../data/units';
import { useGame } from '../context/GameContext';
import NotFound from './NotFound';
import ParticleField from '../effects/ParticleField';
import { tilt } from '../effects/interactions';

export default function UnitPage() {
  const { unitId } = useParams();
  const unit = getUnit(unitId);
  const { state } = useGame();
  if (!unit) return <NotFound />;

  const first = unit.topics.find((t) => !t.comingSoon && !state.completed[topicKey(unit.id, t.slug)]) ?? unit.topics[0];

  return (
    <div className="page">
      <section className="unit-hero">
        <ParticleField color="#a78bfa" />
        <div className="hero-copy">
          <span className="eyebrow">Unit {unit.roman}</span>
          <h1>{unit.title}</h1>
          <p>{unit.summary}</p>
          {first && (
            <Link className="btn btn-primary" to={`/unit/${unit.id}/${first.slug}`}>
              Start learning <ArrowRight size={16} />
            </Link>
          )}
        </div>
        {unit.topics.length > 0 && (
          <ul className="unit-facts">
            <li><ListChecks size={16} /> {unit.topics.length} topics</li>
            <li><Target size={16} /> Interactive visualizers</li>
            <li><Gamepad2 size={16} /> Timed knowledge checks</li>
          </ul>
        )}
      </section>

      {unit.topics.length === 0 ? (
        <div className="card empty-state">
          <Construction size={36} />
          <h3>Unit {unit.roman} is coming soon</h3>
          <p className="muted">Topics, visualizers and quizzes for this unit will be added here.</p>
        </div>
      ) : (
        <div className="topic-grid">
          {unit.topics.map((t, i) => {
            const key = topicKey(unit.id, t.slug);
            const Icon = t.icon;
            const objs = t.lab?.objectives ?? [];
            const objDone = objs.filter((o) => state.objectives[t.lab?.key]?.[o.id]).length;
            return (
              <Link key={t.slug} to={`/unit/${unit.id}/${t.slug}`} className="topic-card tilt" style={{ '--accent': t.color, animationDelay: `${i * 0.06}s` }} {...tilt}>
                <div className="topic-card-head">
                  <span className="topic-icon"><Icon size={22} /></span>
                  <span className="topic-num">{String(t.number).padStart(2, '0')}</span>
                  {state.completed[key] && <CheckCircle2 size={18} className="topic-done" />}
                </div>
                <h3>{t.title}</h3>
                <p>{t.summary}</p>
                {t.comingSoon ? (
                  <em className="soon-tag">Coming soon</em>
                ) : (
                  <div className="topic-card-foot">
                    <span><Sparkles size={13} /> {objDone}/{objs.length} objectives</span>
                    <span className="explore">Explore <ArrowRight size={14} /></span>
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
