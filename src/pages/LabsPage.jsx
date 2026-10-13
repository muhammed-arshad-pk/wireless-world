import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { allTopics } from '../data/units';
import { useGame } from '../context/GameContext';
import { tilt } from '../effects/interactions';

export default function LabsPage() {
  const { state } = useGame();
  const labs = allTopics().filter((t) => t.lab);
  return (
    <div className="page">
      <section className="unit-hero">
        <div>
          <span className="eyebrow">Interactive Wireless Lab</span>
          <h1>Visualizers</h1>
          <p>Every topic has an interactive visualizer: live diagrams you can adjust to see the concept work. Explore objectives to earn XP and badges.</p>
        </div>
      </section>
      <div className="topic-grid">
        {labs.map((t) => {
          const done = state.objectives[t.lab.key] ?? {};
          const n = t.lab.objectives.filter((o) => done[o.id]).length;
          const Icon = t.icon;
          return (
            <Link key={t.key} to={`/unit/${t.unitId}/${t.slug}?section=lab`} className="topic-card lab-card-link tilt" style={{ '--accent': t.color }} {...tilt}>
              <div className="topic-card-head">
                <span className="topic-icon"><Icon size={22} /></span>
                <span className="topic-num">Unit {t.unitRoman}</span>
                {n === t.lab.objectives.length && <CheckCircle2 size={18} className="topic-done" />}
              </div>
              <h3>{t.lab.title.replace('Visualizer: ', '')}</h3>
              <p>{t.lab.description}</p>
              <div className="bar"><span style={{ width: `${(n / t.lab.objectives.length) * 100}%` }} /></div>
              <div className="topic-card-foot">
                <span>{n}/{t.lab.objectives.length} objectives</span>
                <span className="explore">Launch <ArrowRight size={14} /></span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
