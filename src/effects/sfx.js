// Tiny synthesized sound effects (Web Audio), so no audio files are needed.
let ctx = null;
let enabled = (() => {
  try { return localStorage.getItem('wirelessworld-sound') !== 'off'; } catch { return true; }
})();
const listeners = new Set();

export const sound = {
  get enabled() { return enabled; },
  set(v) {
    enabled = v;
    try { localStorage.setItem('wirelessworld-sound', v ? 'on' : 'off'); } catch { /* ignore */ }
    listeners.forEach((l) => l(v));
  },
  subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); },
};

function audio() {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

function tone(freq, start, dur, { type = 'sine', vol = 0.08, slide } = {}) {
  const c = audio();
  if (!c) return;
  const t = c.currentTime + start;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, t);
  if (slide) o.frequency.exponentialRampToValueAtTime(slide, t + dur);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(c.destination);
  o.start(t);
  o.stop(t + dur + 0.02);
}

const SOUNDS = {
  click: () => tone(620, 0, 0.05, { type: 'square', vol: 0.025 }),
  good: () => { tone(660, 0, 0.12); tone(990, 0.08, 0.2); },
  bad: () => tone(240, 0, 0.3, { type: 'sawtooth', vol: 0.045, slide: 110 }),
  coin: () => { tone(988, 0, 0.08, { type: 'square', vol: 0.035 }); tone(1319, 0.07, 0.22, { type: 'square', vol: 0.035 }); },
  fanfare: () => [523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.1, 0.28, { type: 'triangle', vol: 0.08 })),
  alarm: () => { tone(880, 0, 0.14, { type: 'square', vol: 0.035 }); tone(660, 0.16, 0.14, { type: 'square', vol: 0.035 }); },
  key: () => tone(1200 + Math.random() * 500, 0, 0.03, { type: 'square', vol: 0.012 }),
  whoosh: () => tone(260, 0, 0.28, { vol: 0.04, slide: 1000 }),
  tick: () => tone(1500, 0, 0.025, { type: 'square', vol: 0.012 }),
  message: () => { tone(880, 0, 0.07, { type: 'triangle', vol: 0.05 }); tone(1175, 0.06, 0.1, { type: 'triangle', vol: 0.05 }); },
};

export function sfx(name) {
  if (!enabled) return;
  try { SOUNDS[name]?.(); } catch { /* audio not available */ }
}
