import { CheckCircle2, Circle, Target } from 'lucide-react';
import { useMission } from '../context/GameContext';

export default function MissionHUD({ labKey }) {
  const { done, objectives } = useMission(labKey);
  const count = objectives.filter((o) => done[o.id]).length;
  const total = objectives.reduce((s, o) => s + o.xp, 0);
  return (
    <div className="mission-hud">
      <div className="mission-hud-head">
        <Target size={16} />
        <strong>Objectives</strong>
        <span>{count}/{objectives.length}</span>
      </div>
      <div className="bar"><span style={{ width: `${(count / objectives.length) * 100}%` }} /></div>
      <ul>
        {objectives.map((o) => (
          <li key={o.id} className={done[o.id] ? 'done' : ''}>
            {done[o.id] ? <CheckCircle2 size={16} /> : <Circle size={16} />}
            <span>{o.label}</span>
            <em>+{o.xp}</em>
          </li>
        ))}
      </ul>
      <small>Up to {total} XP</small>
    </div>
  );
}
