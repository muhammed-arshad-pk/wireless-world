import { useEffect, useRef } from 'react';

const COLORS = ['#22d3ee', '#8b5cf6', '#facc15', '#22c55e', '#f472b6', '#60a5fa'];

/** Fire a confetti burst from anywhere: burst() or burst({ x, y, count }). */
export function burst(detail = {}) {
  window.dispatchEvent(new CustomEvent('cs-confetti', { detail }));
}

export default function Confetti() {
  const ref = useRef(null);

  useEffect(() => {
    const cv = ref.current;
    const c = cv.getContext('2d');
    let parts = [];
    let raf = null;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      cv.width = window.innerWidth * dpr;
      cv.height = window.innerHeight * dpr;
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const frame = () => {
      c.clearRect(0, 0, window.innerWidth, window.innerHeight);
      parts.forEach((p) => {
        p.vy += 0.22; p.vx *= 0.99;
        p.x += p.vx; p.y += p.vy; p.r += p.vr; p.life -= 1;
        c.save();
        c.translate(p.x, p.y);
        c.rotate(p.r);
        c.globalAlpha = Math.max(0, Math.min(1, p.life / 40));
        c.fillStyle = p.color;
        c.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        c.restore();
      });
      parts = parts.filter((p) => p.life > 0 && p.y < window.innerHeight + 40);
      if (parts.length) raf = requestAnimationFrame(frame);
      else { raf = null; c.clearRect(0, 0, window.innerWidth, window.innerHeight); }
    };

    const onBurst = (e) => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const { x = window.innerWidth / 2, y = window.innerHeight / 3, count = 140 } = e.detail || {};
      for (let i = 0; i < count; i++) {
        const a = Math.random() * Math.PI * 2;
        const s = 3 + Math.random() * 9;
        parts.push({
          x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 6,
          r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.3,
          w: 6 + Math.random() * 6, h: 4 + Math.random() * 4,
          color: COLORS[i % COLORS.length], life: 90 + Math.random() * 60,
        });
      }
      if (!raf) raf = requestAnimationFrame(frame);
    };

    window.addEventListener('cs-confetti', onBurst);
    return () => {
      window.removeEventListener('cs-confetti', onBurst);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={ref} className="confetti" aria-hidden="true" />;
}
