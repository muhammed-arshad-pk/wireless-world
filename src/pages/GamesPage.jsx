import { useMemo, useState } from 'react';
import { Shuffle } from 'lucide-react';
import { allTopics, units } from '../data/units';
import { useGame, levelInfo, BADGES, LEVELS } from '../context/GameContext';
import Quiz from '../components/Quiz';

function shuffled(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function GamesPage() {
  const { state, reset } = useGame();
  const [round, setRound] = useState(0);
  const quizUnits = units.filter((u) => u.topics.some((t) => t.quiz));
  const [unitId, setUnitId] = useState(quizUnits[0]?.id);
  const lvl = levelInfo(state.xp);
  const unit = quizUnits.find((u) => u.id === unitId);
  const mixed = useMemo(
    () => shuffled(allTopics().filter((t) => t.quiz && t.unitId === unitId).flatMap((t) => t.quiz)).slice(0, 10),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [round, unitId],
  );

  return (
    <div className="page">
      <section className="unit-hero">
        <div>
          <span className="eyebrow">Quiz & Badges</span>
          <h1>Level {lvl.level}: {lvl.name}</h1>
          <p>{state.xp} XP{lvl.next ? `, ${lvl.next.min - state.xp} XP to ${lvl.next.name}` : ', max level reached!'}</p>
          <div className="bar xp big"><span style={{ width: `${lvl.pct}%` }} /></div>
        </div>
        <ul className="level-ladder">
          {LEVELS.map((l, i) => <li key={l.name} className={i < lvl.level ? 'on' : ''}><b>{i + 1}</b> {l.name} <small>{l.min} XP</small></li>)}
        </ul>
      </section>

      <section className="card">
        <div className="row-between">
          <h2 className="card-title">🎲 Mixed Challenge</h2>
          <div className="row-gap">
            {quizUnits.map((u) => (
              <button key={u.id} className={`btn btn-sm ${u.id === unitId ? 'btn-primary' : 'btn-ghost'}`} onClick={() => { setUnitId(u.id); setRound((r) => r + 1); }}>Unit {u.roman}</button>
            ))}
            <button className="btn btn-ghost btn-sm" onClick={() => setRound((r) => r + 1)}><Shuffle size={14} /> New questions</button>
          </div>
        </div>
        {unit && <Quiz key={`${unitId}-${round}`} questions={mixed} quizKey={`unit-${unitId}-mixed`} title={`10 random questions from every Unit ${unit.roman} topic`} />}
      </section>

      <section className="card">
        <h2 className="card-title">🏅 Badges</h2>
        <div className="badge-grid">
          {BADGES.map((b) => {
            const got = state.badges[b.id];
            return (
              <div key={b.id} className={`badge ${got ? 'got' : ''}`}>
                <span className="badge-emoji">{got ? b.emoji : '🔒'}</span>
                <strong>{b.name}</strong>
                <small>{b.desc}</small>
              </div>
            );
          })}
        </div>
      </section>

      <div className="complete-row">
        <button className="btn btn-ghost btn-sm" onClick={() => window.confirm('Reset all XP, badges and progress?') && reset()}>Reset my progress</button>
      </div>
    </div>
  );
}
