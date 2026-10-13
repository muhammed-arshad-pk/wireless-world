import { useEffect, useRef } from 'react';

/** Animated "network" of drifting nodes and links, used behind hero banners. */
export default function ParticleField({ color = '#22d3ee', density = 0.00009 }) {
  const ref = useRef(null);

  useEffect(() => {
    const cv = ref.current;
    const c = cv.getContext('2d');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0; let h = 0; let nodes = []; let raf = null;
    const mouse = { x: -999, y: -999 };

    const setup = () => {
      const dpr = window.devicePixelRatio || 1;
      w = cv.clientWidth; h = cv.clientHeight;
      cv.width = w * dpr; cv.height = h * dpr;
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.max(18, Math.round(w * h * density));
      nodes = Array.from({ length: n }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
      }));
    };

    const draw = () => {
      c.clearRect(0, 0, w, h);
      nodes.forEach((p) => {
        if (!reduced) { p.x += p.vx; p.y += p.vy; }
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      });
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 120) {
            c.strokeStyle = color;
            c.globalAlpha = (1 - d / 120) * 0.35;
            c.lineWidth = 1;
            c.beginPath(); c.moveTo(a.x, a.y); c.lineTo(b.x, b.y); c.stroke();
          }
        }
        const md = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        c.globalAlpha = md < 140 ? 1 : 0.6;
        c.fillStyle = color;
        c.beginPath(); c.arc(a.x, a.y, md < 140 ? 2.6 : 1.6, 0, Math.PI * 2); c.fill();
        if (md < 140) {
          c.globalAlpha = (1 - md / 140) * 0.6;
          c.strokeStyle = color;
          c.beginPath(); c.moveTo(a.x, a.y); c.lineTo(mouse.x, mouse.y); c.stroke();
        }
      }
      c.globalAlpha = 1;
      if (!reduced) raf = requestAnimationFrame(draw);
    };

    const onMove = (e) => {
      const r = cv.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    };
    const onLeave = () => { mouse.x = -999; mouse.y = -999; };

    setup(); draw();
    const ro = new ResizeObserver(() => { setup(); if (reduced) draw(); });
    ro.observe(cv);
    const host = cv.parentElement;
    host.addEventListener('mousemove', onMove);
    host.addEventListener('mouseleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      host.removeEventListener('mousemove', onMove);
      host.removeEventListener('mouseleave', onLeave);
    };
  }, [color, density]);

  return <canvas ref={ref} className="particle-field" aria-hidden="true" />;
}
