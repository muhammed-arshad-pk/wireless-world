import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, Search, Volume2, VolumeX, Zap } from 'lucide-react';
import { sfx, sound } from '../effects/sfx';
import { allTopics, getTopic, getUnit } from '../data/units';
import { useGame, levelInfo } from '../context/GameContext';

const PAGE_NAMES = { labs: 'Interactive Wireless Lab', games: 'Quiz & Badges', about: 'About Project' };

function Crumbs() {
  const { pathname } = useLocation();
  const parts = pathname.split('/').filter(Boolean);
  const crumbs = [{ label: 'Home', to: '/' }];
  if (parts[0] === 'unit') {
    const unit = getUnit(parts[1]);
    if (unit) crumbs.push({ label: `Unit ${unit.roman}`, to: `/unit/${unit.id}` });
    const topic = parts[2] && getTopic(parts[1], parts[2]);
    if (topic) crumbs.push({ label: topic.title });
  } else if (PAGE_NAMES[parts[0]]) {
    crumbs.push({ label: PAGE_NAMES[parts[0]] });
  }
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      {crumbs.map((c, i) => (
        <span key={i}>
          {i > 0 && <span className="crumb-sep">/</span>}
          {c.to && i < crumbs.length - 1 ? <Link to={c.to}>{c.label}</Link> : <strong>{c.label}</strong>}
        </span>
      ))}
    </nav>
  );
}

function SearchBox() {
  const [q, setQ] = useState('');
  const [focus, setFocus] = useState(false);
  const navigate = useNavigate();
  const term = q.trim().toLowerCase();
  const results = term
    ? allTopics()
        .filter((t) => `${t.title} ${t.summary} ${(t.keywords ?? []).join(' ')}`.toLowerCase().includes(term))
        .slice(0, 6)
    : [];

  const go = (t) => {
    navigate(`/unit/${t.unitId}/${t.slug}`);
    setQ('');
  };

  return (
    <div className="search">
      <Search size={16} />
      <input
        value={q}
        placeholder="Search topics and concepts"
        onChange={(e) => setQ(e.target.value)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onKeyDown={(e) => e.key === 'Enter' && results[0] && go(results[0])}
      />
      {focus && term && (
        <div className="search-results" onMouseDown={(e) => e.preventDefault()}>
          {results.length === 0 && <div className="search-empty">No topics match “{q}”</div>}
          {results.map((t) => (
            <button key={t.key} onClick={() => go(t)}>
              <t.icon size={16} />
              <span><strong>{t.title}</strong><small>Unit {t.unitRoman} · {t.summary}</small></span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function SoundToggle() {
  const [on, setOn] = useState(sound.enabled);
  useEffect(() => sound.subscribe(setOn), []);
  return (
    <button
      className="icon-btn sound-btn"
      onClick={() => { sound.set(!on); if (!on) setTimeout(() => sfx('coin'), 0); }}
      aria-label={on ? 'Mute sound effects' : 'Turn on sound effects'}
      title={on ? 'Sound on' : 'Sound off'}
    >
      {on ? <Volume2 size={18} /> : <VolumeX size={18} />}
    </button>
  );
}

export default function Topbar({ onMenu }) {
  const { state } = useGame();
  const lvl = levelInfo(state.xp);
  return (
    <header className="topbar">
      <button className="icon-btn menu-btn" onClick={onMenu} aria-label="Open menu"><Menu size={20} /></button>
      <Crumbs />
      <SearchBox />
      <SoundToggle />
      <Link to="/games" className="xp-pill" title="Your XP and level">
        <Zap size={15} />
        <span>{state.xp} XP</span>
        <em>Lv {lvl.level}</em>
      </Link>
    </header>
  );
}
