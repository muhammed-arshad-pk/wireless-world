import { useEffect, useRef, useState } from 'react';
import { Flame, RotateCcw, Timer, Trophy } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { sfx } from '../effects/sfx';

const SECONDS = 20;

export default function Quiz({ questions, quizKey, title = 'Knowledge Check' }) {
  const { state, recordQuiz } = useGame();
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState(null); // index, or -1 for timeout
  const [correct, setCorrect] = useState(0);
  const [points, setPoints] = useState(0);
  const [streak, setStreak] = useState(0);
  const [left, setLeft] = useState(SECONDS);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [gain, setGain] = useState(null);
  const timer = useRef(null);

  const q = questions[i];
  const best = state.quizBest[quizKey];

  useEffect(() => {
    if (!started || finished || picked !== null) return undefined;
    timer.current = setInterval(() => setLeft((l) => l - 0.1), 100);
    return () => clearInterval(timer.current);
  }, [started, finished, picked, i]);

  useEffect(() => {
    if (left <= 0 && picked === null && started) {
      setPicked(-1);
      setStreak(0);
      sfx('bad');
    }
  }, [left, picked, started]);

  // Clock ticks during the last 5 seconds.
  const whole = Math.ceil(left);
  useEffect(() => {
    if (started && picked === null && whole <= 5 && whole > 0) sfx('tick');
  }, [whole, started, picked]);

  const pick = (idx) => {
    if (picked !== null) return;
    setPicked(idx);
    if (idx === q.answer) {
      const s = streak + 1;
      setStreak(s);
      setCorrect((c) => c + 1);
      const earned = Math.round((100 + Math.max(0, left) * 5) * (s >= 3 ? 1.5 : 1));
      setPoints((p) => p + earned);
      setGain(earned);
      sfx(s >= 3 ? 'coin' : 'good');
    } else {
      setStreak(0);
      setGain(null);
      sfx('bad');
    }
  };

  const next = () => {
    if (i + 1 < questions.length) {
      setI(i + 1);
      setPicked(null);
      setLeft(SECONDS);
      setGain(null);
    } else {
      setFinished(true);
      recordQuiz(quizKey, Math.round((correct / questions.length) * 100));
    }
  };

  const restart = () => {
    setI(0); setPicked(null); setCorrect(0); setPoints(0); setStreak(0);
    setLeft(SECONDS); setFinished(false); setGain(null); setStarted(true);
  };

  if (!started) {
    return (
      <div className="quiz quiz-intro">
        <Trophy size={36} />
        <h3>{title}</h3>
        <p>{questions.length} questions · {SECONDS}s each · answer fast for bonus points · 3 in a row = 🔥 1.5× combo</p>
        {best !== undefined && <p className="muted">Your best: <strong>{best}%</strong></p>}
        <button className="btn btn-primary" onClick={() => setStarted(true)}>Start challenge</button>
      </div>
    );
  }

  if (finished) {
    const pct = Math.round((correct / questions.length) * 100);
    return (
      <div className="quiz quiz-done">
        <div className={`score-ring ${pct >= 60 ? 'pass' : 'fail'}`}><span>{pct}%</span></div>
        <h3>{pct === 100 ? 'Flawless! 🎯' : pct >= 60 ? 'Topic cleared! ✅' : 'Almost — try again 💪'}</h3>
        <p>{correct} / {questions.length} correct · <strong>{points}</strong> points</p>
        {pct < 60 && <p className="muted">Score 60% or more to mark this topic complete.</p>}
        <button className="btn btn-ghost" onClick={restart}><RotateCcw size={16} /> Play again</button>
      </div>
    );
  }

  return (
    <div className="quiz">
      <div className="quiz-hud">
        <span>Q {i + 1}/{questions.length}</span>
        <span className={`streak ${streak >= 3 ? 'hot' : ''}`}><Flame size={15} /> {streak}</span>
        <span><strong>{points}</strong> pts</span>
        <span className="quiz-time"><Timer size={15} /> {Math.max(0, Math.ceil(left))}s</span>
      </div>
      <div className="timebar"><span style={{ width: `${(Math.max(0, left) / SECONDS) * 100}%` }} className={left < 6 ? 'low' : ''} /></div>
      <h4 className="quiz-q" key={i}>{q.q}</h4>
      <div className="quiz-options">
        {q.options.map((o, idx) => {
          let cls = 'quiz-option';
          if (picked !== null) {
            if (idx === q.answer) cls += ' correct';
            else if (idx === picked) cls += ' wrong';
            else cls += ' dim';
          }
          return (
            <button key={idx} className={cls} onClick={() => pick(idx)} disabled={picked !== null}>
              <span className="opt-letter">{String.fromCharCode(65 + idx)}</span>{o}
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <div className={`explain ${picked === q.answer ? 'good' : 'bad'}`}>
          {gain && <span className="float-points">+{gain}</span>}
          <strong>{picked === q.answer ? 'Correct!' : picked === -1 ? 'Time’s up!' : 'Not quite.'}</strong> {q.explain}
          <button className="btn btn-primary btn-sm" onClick={next}>{i + 1 < questions.length ? 'Next' : 'Finish'}</button>
        </div>
      )}
    </div>
  );
}
