import { useEffect } from 'react';

/** Spread onto any element with class "tilt" for a 3D hover tilt + glare. */
export const tilt = {
  onMouseMove(e) {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty('--rx', `${(-y * 8).toFixed(2)}deg`);
    el.style.setProperty('--ry', `${(x * 10).toFixed(2)}deg`);
    el.style.setProperty('--mx', `${((x + 0.5) * 100).toFixed(1)}%`);
    el.style.setProperty('--my', `${((y + 0.5) * 100).toFixed(1)}%`);
  },
  onMouseLeave(e) {
    e.currentTarget.style.setProperty('--rx', '0deg');
    e.currentTarget.style.setProperty('--ry', '0deg');
  },
};

/** Cursor-following spotlight: sets --mx / --my on the element. */
export function spotlight(e) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty('--mx', `${e.clientX - r.left}px`);
  el.style.setProperty('--my', `${e.clientY - r.top}px`);
}

/** Fades page sections in as they scroll into view. */
export function useScrollReveal(dep) {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined;
    // Re-runs (route change, StrictMode) must pick up sections an earlier run hid but never revealed.
    const els = document.querySelectorAll('.page > *:not(.in):not(.reading-progress)');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.06, rootMargin: '0px 0px -40px 0px' });
    els.forEach((el) => {
      // Anything already on screen is shown straight away; only content below the fold animates in.
      if (el.getBoundingClientRect().top < window.innerHeight) { el.classList.add('in'); return; }
      el.classList.add('rv');
      io.observe(el);
    });
    // Safety net: never leave content hidden if the observer doesn't fire.
    const fallback = setTimeout(() => els.forEach((el) => el.classList.add('in')), 4000);
    return () => { io.disconnect(); clearTimeout(fallback); };
  }, [dep]);
}
