import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, FlaskConical, Gamepad2, Info, LayoutDashboard, BookOpen, Check, RotateCcw } from 'lucide-react';
import { units, allTopics, topicKey } from '../data/units';
import { useGame, levelInfo } from '../context/GameContext';
import Logo from './Logo';

export default function Sidebar({ open }) {
  const { pathname } = useLocation();
  const { state, reset } = useGame();
  const activeUnit = pathname.match(/^\/unit\/(\d+)/)?.[1];
  const [expanded, setExpanded] = useState(() => new Set([activeUnit ?? '2']));

  useEffect(() => {
    if (activeUnit) setExpanded((s) => new Set(s).add(activeUnit));
  }, [activeUnit]);

  const toggle = (id) =>
    setExpanded((s) => {
      const n = new Set(s);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });

  const topics = allTopics().filter((t) => !t.comingSoon);
  const done = topics.filter((t) => state.completed[t.key]).length;
  const pct = topics.length ? Math.round((done / topics.length) * 100) : 0;
  const lvl = levelInfo(state.xp);

  return (
    <aside className={`sidebar${open ? ' open' : ''}`}>
      <NavLink to="/" className="brand">
        <Logo />
        <div>
          <strong>WIRELESS WORLD</strong>
          <small>Learn, Explore, Connect</small>
        </div>
      </NavLink>

      <nav className="nav">
        <NavLink to="/" end className="nav-link">
          <LayoutDashboard size={18} /> Dashboard
        </NavLink>

        <div className="nav-label"><BookOpen size={14} /> Learn by Units</div>
        {units.map((u) => {
          const id = String(u.id);
          const isOpen = expanded.has(id);
          return (
            <div key={u.id} className="nav-group">
              <div className="nav-unit">
                <NavLink to={`/unit/${u.id}`} end className="nav-link nav-unit-link">
                  <span className="unit-roman">{u.roman}</span>
                  <span className="nav-unit-title">{u.title}</span>
                </NavLink>
                <button className="nav-toggle" onClick={() => toggle(id)} aria-label={`Toggle Unit ${u.roman}`}>
                  <ChevronDown size={16} className={isOpen ? 'rot' : ''} />
                </button>
              </div>
              {isOpen && (
                <div className="nav-sub">
                  {u.topics.length === 0 && <span className="nav-soon">Coming soon</span>}
                  {u.topics.map((t) => (
                    <NavLink key={t.slug} to={`/unit/${u.id}/${t.slug}`} className="nav-sub-link">
                      <span>{t.title}</span>
                      {state.completed[topicKey(u.id, t.slug)] && <Check size={14} className="nav-check" />}
                      {t.comingSoon && <em className="soon-tag">soon</em>}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        <div className="nav-label">Practice</div>
        <NavLink to="/labs" className="nav-link"><FlaskConical size={18} /> Interactive Wireless Lab</NavLink>
        <NavLink to="/games" className="nav-link"><Gamepad2 size={18} /> Quiz & Badges</NavLink>
        <NavLink to="/about" className="nav-link"><Info size={18} /> About Project</NavLink>
      </nav>

      <div className="side-progress">
        <div className="side-progress-row">
          <span>Level {lvl.level} · {lvl.name}</span>
        </div>
        <div className="bar xp"><span style={{ width: `${lvl.pct}%` }} /></div>
        <div className="side-progress-row muted-light">
          <span>{state.xp} XP</span>
          <span>{lvl.next ? `${lvl.next.min} next` : 'Max level'}</span>
        </div>
        <div className="side-progress-row" style={{ marginTop: 12 }}>
          <span>Learning Progress</span><strong>{pct}%</strong>
        </div>
        <div className="bar"><span style={{ width: `${pct}%` }} /></div>
        <small className="muted-light">{done} of {topics.length} topics completed</small>
        <button
          className="side-reset"
          onClick={() => window.confirm('Clear all learning history? Completed topics, XP, badges, quiz scores and checklists will be reset.') && reset()}
        >
          <RotateCcw size={13} /> Clear progress
        </button>
      </div>
    </aside>
  );
}
