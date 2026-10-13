import { Link } from 'react-router-dom';
import { ArrowRight, FlaskConical, Trophy, Sparkles, Zap, Radio } from 'lucide-react';
import { units, allTopics } from '../data/units';
import { useGame, levelInfo, BADGES } from '../context/GameContext';
import Logo from '../components/Logo';
import ParticleField from '../effects/ParticleField';
import { tilt } from '../effects/interactions';

export default function Dashboard() {
  const { state } = useGame();
  const topics = allTopics().filter((t) => !t.comingSoon);
  const nextTopic = topics.find((t) => !state.completed[t.key]);
  const lvl = levelInfo(state.xp);
  const objectivesDone = Object.values(state.objectives).reduce((n, o) => n + Object.keys(o).length, 0);
  const objectivesTotal = topics.reduce((n, t) => n + (t.lab?.objectives.length ?? 0), 0);

  return (
    <div className="page">
      <section className="dash-hero">
        <ParticleField />
        <div className="hero-copy">
          <span className="eyebrow">Wireless Communication · Learning Hub</span>
          <h1>See how wireless <span className="grad">really works.</span></h1>
          <p>From antennas and radio waves to satellites, cellular networks and Wi-Fi. Every topic comes with clear diagrams and live visualizers you can adjust: modulate your own bits, launch satellites into orbit, plan Wi-Fi channels.</p>
          <div className="hero-actions">
            {nextTopic && (
              <Link className="btn btn-primary" to={`/unit/${nextTopic.unitId}/${nextTopic.slug}`}>
                <Sparkles size={16} /> {Object.keys(state.completed).length ? 'Continue' : 'Start'}: {nextTopic.title}
              </Link>
            )}
            <Link className="btn btn-glass" to="/labs"><Radio size={16} /> Browse visualizers</Link>
          </div>
        </div>
        <div className="dash-hero-art" aria-hidden="true">
          <div className="ring r1" /><div className="ring r2" /><div className="ring r3" />
          <Logo size={120} />
        </div>
      </section>

      <div className="stats">
        <div className="stat"><Zap size={20} /><div><strong>{state.xp}</strong><span>XP · Level {lvl.level}</span></div></div>
        <div className="stat"><FlaskConical size={20} /><div><strong>{objectivesDone}/{objectivesTotal}</strong><span>Visualizer objectives</span></div></div>
        <div className="stat"><Trophy size={20} /><div><strong>{Object.keys(state.badges).length}/{BADGES.length}</strong><span>Badges earned</span></div></div>
        <div className="stat"><Sparkles size={20} /><div><strong>{topics.filter((t) => state.completed[t.key]).length}/{topics.length}</strong><span>Topics completed</span></div></div>
      </div>

      <h2 className="section-title">Learn by Units</h2>
      <div className="unit-grid">
        {units.map((u) => {
          const ts = u.topics.filter((t) => !t.comingSoon);
          const done = ts.filter((t) => state.completed[`${u.id}/${t.slug}`]).length;
          const empty = u.topics.length === 0;
          return (
            <Link key={u.id} to={`/unit/${u.id}`} className={`unit-card tilt ${empty ? 'soon' : ''}`} {...tilt}>
              <span className="unit-badge">Unit {u.roman}</span>
              <h3>{u.title}</h3>
              <p>{u.summary}</p>
              {empty ? <em className="soon-tag">Coming soon</em> : (
                <>
                  <div className="bar"><span style={{ width: `${ts.length ? (done / ts.length) * 100 : 0}%` }} /></div>
                  <small>{done}/{ts.length} topics <ArrowRight size={14} /></small>
                </>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
