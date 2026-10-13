import { useEffect, useState } from 'react';

export default function Typewriter({ text, speed = 22 }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setN(text.length); return undefined; }
    setN(0);
    const id = setInterval(() => setN((v) => (v >= text.length ? (clearInterval(id), v) : v + 1)), speed);
    return () => clearInterval(id);
  }, [text, speed]);

  return (
    <span className="typewriter" aria-label={text}>
      <span aria-hidden="true">{text.slice(0, n)}</span>
      <span className={`caret ${n >= text.length ? 'done' : ''}`} aria-hidden="true" />
    </span>
  );
}
