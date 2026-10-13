import { useGame } from '../context/GameContext';

export default function Toasts() {
  const { toasts } = useGame();
  return (
    <div className="toasts" aria-live="polite">
      {toasts.map((t) => (
        <div key={t.id} className={`toast toast-${t.kind}`}>
          <span className="toast-emoji">{t.emoji}</span>
          <div>
            <strong>{t.title}</strong>
            <p>{t.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
