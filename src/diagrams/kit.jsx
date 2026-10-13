/* Building blocks for the static concept diagrams (light, mockup-style SVG + HTML). */
import { ArrowRight } from 'lucide-react';

export const K = {
  ink: '#0f172a', muted: '#64748b', line: '#94a3b8', grid: '#e2e8f0',
  blue: '#2563eb', cyan: '#0891b2', violet: '#7c3aed', green: '#16a34a', amber: '#d97706', red: '#dc2626', pink: '#db2777',
};
export const TONES = {
  blue: ['#eff6ff', '#93c5fd', '#1d4ed8'],
  cyan: ['#ecfeff', '#67e8f9', '#0e7490'],
  violet: ['#f5f3ff', '#c4b5fd', '#6d28d9'],
  green: ['#f0fdf4', '#86efac', '#15803d'],
  amber: ['#fffbeb', '#fcd34d', '#b45309'],
  red: ['#fef2f2', '#fca5a5', '#b91c1c'],
  slate: ['#f8fafc', '#cbd5e1', '#334155'],
};
export const USER_COLORS = ['#2563eb', '#0891b2', '#7c3aed', '#64748b', '#16a34a', '#d97706', '#db2777', '#dc2626'];

export function Svg({ w, h, label, children }) {
  return <svg viewBox={`0 0 ${w} ${h}`} className="cd-svg" role="img" aria-label={label}>{children}</svg>;
}

/** Text; '\n' splits into centred lines. */
export function T({ x, y, children, size = 12, color = K.ink, anchor = 'middle', weight = 500, italic, lh = 1.25 }) {
  const lines = String(children).split('\n');
  const y0 = y - ((lines.length - 1) * size * lh) / 2;
  return (
    <text x={x} y={y0} fontSize={size} fill={color} textAnchor={anchor} fontWeight={weight} fontStyle={italic ? 'italic' : undefined} dominantBaseline="middle" fontFamily="Inter, system-ui, sans-serif">
      {lines.map((l, i) => <tspan key={i} x={x} dy={i ? size * lh : 0}>{l}</tspan>)}
    </text>
  );
}

export function Box({ x, y, w, h, label, tone = 'blue', size = 12, r = 8, weight = 600, dashed }) {
  const [fill, stroke, text] = TONES[tone] ?? TONES.blue;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={r} fill={fill} stroke={stroke} strokeWidth={1.5} strokeDasharray={dashed ? '5 4' : undefined} />
      {label && <T x={x + w / 2} y={y + h / 2} size={size} color={text} weight={weight}>{label}</T>}
    </g>
  );
}

/** Straight arrow with a drawn head (no <marker> ids needed). */
export function Arrow({ x1, y1, x2, y2, color = K.line, width = 2, dashed, anim, head = 8, both }) {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const hd = (x, y, ang) => `${x},${y} ${x - head * Math.cos(ang - 0.4)},${y - head * Math.sin(ang - 0.4)} ${x - head * Math.cos(ang + 0.4)},${y - head * Math.sin(ang + 0.4)}`;
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2 - (head * 0.7) * Math.cos(a)} y2={y2 - (head * 0.7) * Math.sin(a)} stroke={color} strokeWidth={width} strokeDasharray={dashed ? '6 5' : undefined} className={anim ? 'dash-path' : undefined} />
      <polygon points={hd(x2, y2, a)} fill={color} />
      {both && <polygon points={hd(x1, y1, a + Math.PI)} fill={color} />}
    </g>
  );
}

/** Arrow head only, pointing along angle (radians). */
export function Head({ x, y, a, color = K.line, size = 8 }) {
  return <polygon points={`${x},${y} ${x - size * Math.cos(a - 0.4)},${y - size * Math.sin(a - 0.4)} ${x - size * Math.cos(a + 0.4)},${y - size * Math.sin(a + 0.4)}`} fill={color} />;
}

/** Radiating arcs centred at (x, y) facing angle `dir` in degrees (0 = right). */
export function Arcs({ x, y, dir = 0, n = 3, r0 = 7, step = 6, spread = 45, color = K.cyan, width = 2 }) {
  const d = (dir * Math.PI) / 180;
  const s = (spread * Math.PI) / 180;
  return (
    <g fill="none" stroke={color} strokeWidth={width} strokeLinecap="round">
      {Array.from({ length: n }, (_, i) => {
        const r = r0 + i * step;
        const p1 = [x + r * Math.cos(d - s), y + r * Math.sin(d - s)];
        const p2 = [x + r * Math.cos(d + s), y + r * Math.sin(d + s)];
        return <path key={i} d={`M${p1[0]},${p1[1]} A${r},${r} 0 0 1 ${p2[0]},${p2[1]}`} opacity={1 - i * 0.2} />;
      })}
    </g>
  );
}

/* ---------- Device glyphs (drawn centred on x, base at y unless noted) ---------- */
export function Tower({ x, y, h = 56, color = K.ink, waves = true }) {
  const w = h * 0.36;
  return (
    <g stroke={color} strokeWidth={2} fill="none" strokeLinejoin="round">
      <path d={`M${x - w / 2},${y} L${x},${y - h} L${x + w / 2},${y}`} />
      <path d={`M${x - w / 3},${y - h / 3} L${x + w / 3},${y - h / 3} M${x - w / 6},${y - (2 * h) / 3} L${x + w / 6},${y - (2 * h) / 3} M${x - w / 2},${y} L${x + w / 3},${y - h / 3} M${x + w / 2},${y} L${x - w / 3},${y - h / 3}`} strokeWidth={1.3} />
      <circle cx={x} cy={y - h} r={3} fill={color} />
      {waves && <><Arcs x={x} y={y - h} dir={0} n={2} r0={8} step={6} spread={40} /><Arcs x={x} y={y - h} dir={180} n={2} r0={8} step={6} spread={40} /></>}
    </g>
  );
}

export function Phone({ x, y, s = 1, color = K.ink }) {
  return (
    <g>
      <rect x={x - 8 * s} y={y - 14 * s} width={16 * s} height={28 * s} rx={3 * s} fill="#fff" stroke={color} strokeWidth={2} />
      <rect x={x - 5.5 * s} y={y - 10.5 * s} width={11 * s} height={18 * s} rx={1} fill="#dbeafe" />
      <circle cx={x} cy={y + 10.5 * s} r={1.3 * s} fill={color} />
    </g>
  );
}

export function Laptop({ x, y, s = 1, color = K.ink }) {
  return (
    <g>
      <rect x={x - 17 * s} y={y - 13 * s} width={34 * s} height={22 * s} rx={2} fill="#fff" stroke={color} strokeWidth={2} />
      <rect x={x - 14 * s} y={y - 10 * s} width={28 * s} height={16 * s} fill="#dbeafe" />
      <path d={`M${x - 22 * s},${y + 9 * s} L${x + 22 * s},${y + 9 * s} L${x + 19 * s},${y + 13 * s} L${x - 19 * s},${y + 13 * s} Z`} fill={color} />
    </g>
  );
}

export function Tablet({ x, y, s = 1, color = K.ink }) {
  return (
    <g>
      <rect x={x - 12 * s} y={y - 16 * s} width={24 * s} height={32 * s} rx={3 * s} fill="#fff" stroke={color} strokeWidth={2} />
      <rect x={x - 9 * s} y={y - 12.5 * s} width={18 * s} height={24 * s} fill="#dbeafe" />
    </g>
  );
}

export function Router({ x, y, s = 1, color = K.ink, waves = true }) {
  return (
    <g>
      <line x1={x - 10 * s} y1={y - 6 * s} x2={x - 13 * s} y2={y - 20 * s} stroke={color} strokeWidth={2} strokeLinecap="round" />
      <line x1={x + 10 * s} y1={y - 6 * s} x2={x + 13 * s} y2={y - 20 * s} stroke={color} strokeWidth={2} strokeLinecap="round" />
      <rect x={x - 20 * s} y={y - 7 * s} width={40 * s} height={13 * s} rx={3} fill={color} />
      {[-10, -4, 2].map((d) => <circle key={d} cx={x + d * s} cy={y - 0.5 * s} r={1.5 * s} fill="#67e8f9" />)}
      {waves && <Arcs x={x} y={y - 12 * s} dir={-90} n={3} r0={8 * s} step={5 * s} spread={50} />}
    </g>
  );
}

/** Satellite centred on (x, y). */
export function Sat({ x, y, s = 1, color = K.ink, rot = -20 }) {
  return (
    <g transform={`rotate(${rot} ${x} ${y})`}>
      <rect x={x - 38 * s} y={y - 8 * s} width={24 * s} height={16 * s} fill="#3b82f6" stroke={color} strokeWidth={1.5} />
      <rect x={x + 14 * s} y={y - 8 * s} width={24 * s} height={16 * s} fill="#3b82f6" stroke={color} strokeWidth={1.5} />
      <path d={`M${x - 30 * s},${y - 8 * s}V${y + 8 * s}M${x - 22 * s},${y - 8 * s}V${y + 8 * s}M${x + 22 * s},${y - 8 * s}V${y + 8 * s}M${x + 30 * s},${y - 8 * s}V${y + 8 * s}`} stroke="#bfdbfe" strokeWidth={1} />
      <line x1={x - 14 * s} y1={y} x2={x + 14 * s} y2={y} stroke={color} strokeWidth={2} />
      <rect x={x - 9 * s} y={y - 11 * s} width={18 * s} height={22 * s} rx={3} fill="#e2e8f0" stroke={color} strokeWidth={2} />
      <circle cx={x} cy={y + 14 * s} r={3 * s} fill={color} />
    </g>
  );
}

/** Ground-station dish, base at (x, y), facing up-right (flip = up-left). */
export function Dish({ x, y, s = 1, color = K.ink, flip }) {
  const f = flip ? -1 : 1;
  return (
    <g>
      <path d={`M${x},${y - 14 * s} L${x - 8 * s},${y} L${x + 8 * s},${y}`} fill="none" stroke={color} strokeWidth={2} />
      <path d={`M${x - f * 16 * s},${y - 30 * s} Q${x - f * 4 * s},${y - 6 * s} ${x + f * 18 * s},${y - 16 * s}`} fill="#e2e8f0" stroke={color} strokeWidth={2} />
      <line x1={x + f * 1 * s} y1={y - 17 * s} x2={x + f * 12 * s} y2={y - 34 * s} stroke={color} strokeWidth={1.5} />
      <circle cx={x + f * 12 * s} cy={y - 34 * s} r={2.5 * s} fill={color} />
    </g>
  );
}

export function Building({ x, y, w = 30, h = 60, color = '#cbd5e1' }) {
  const rows = Math.floor((h - 10) / 12);
  return (
    <g>
      <rect x={x} y={y - h} width={w} height={h} fill={color} stroke="#64748b" strokeWidth={1.2} />
      {Array.from({ length: rows }, (_, r) => [0, 1].map((c) => (
        <rect key={`${r}-${c}`} x={x + 5 + c * (w / 2 - 2)} y={y - h + 6 + r * 12} width={w / 2 - 8} height={6} fill="#f8fafc" />
      )))}
    </g>
  );
}

export function Cloud({ x, y, label }) {
  return (
    <g>
      <path d={`M${x - 30},${y + 12} a12,12 0 0 1 0,-22 a17,17 0 0 1 30,-8 a13,13 0 0 1 24,10 a11,11 0 0 1 4,20 Z`} fill="#eff6ff" stroke="#93c5fd" strokeWidth={1.5} />
      {label && <T x={x} y={y} size={11} color="#1d4ed8" weight={700}>{label}</T>}
    </g>
  );
}

/* ---------- Waveforms ---------- */
/** SVG path for fn(u) with u in [0,1], fn returning -1..1, drawn across (x..x+w) about centre y. */
export function fnPath(fn, x, y, w, amp, n = 240) {
  let d = '';
  for (let i = 0; i <= n; i++) {
    const u = i / n;
    d += `${i ? 'L' : 'M'}${(x + u * w).toFixed(1)},${(y - amp * fn(u)).toFixed(1)}`;
  }
  return d;
}

export function Wave({ fn, x, y, w, amp, color = K.blue, width = 2, dashed }) {
  return <path d={fnPath(fn, x, y, w, amp)} fill="none" stroke={color} strokeWidth={width} strokeDasharray={dashed ? '5 4' : undefined} strokeLinejoin="round" />;
}

/** NRZ square wave of a bit string. */
export function Square({ bits, x, y, w, amp, color = K.blue, labels = true }) {
  const bw = w / bits.length;
  let d = '';
  [...bits].forEach((b, i) => {
    const yy = y - (b === '1' ? amp : -amp);
    d += `${i ? 'L' : 'M'}${x + i * bw},${yy} L${x + (i + 1) * bw},${yy}`;
  });
  return (
    <g>
      <path d={d} fill="none" stroke={color} strokeWidth={2.2} />
      {labels && [...bits].map((b, i) => <T key={i} x={x + (i + 0.5) * bw} y={y - amp - 11} size={11} color={K.amber} weight={800}>{b}</T>)}
    </g>
  );
}

export function Axes({ x, y, w, h, xl, yl }) {
  return (
    <g>
      <Arrow x1={x} y1={y + h} x2={x + w} y2={y + h} color={K.muted} width={1.4} head={7} />
      <Arrow x1={x} y1={y + h} x2={x} y2={y} color={K.muted} width={1.4} head={7} />
      {xl && <T x={x + w} y={y + h + 14} size={10.5} color={K.muted} anchor="end">{xl}</T>}
      {yl && <T x={x + 6} y={y + 2} size={10.5} color={K.muted} anchor="start">{yl}</T>}
    </g>
  );
}

/* ---------- HTML diagrams ---------- */
/** Block chain. links: 'arrow' (default) | 'air' (wireless) per gap. */
export function Chain({ steps, links = [] }) {
  return (
    <div className="cd-chain">
      {steps.map((s, i) => {
        const I = s.icon;
        const link = links[i] ?? 'arrow';
        return (
          <div key={i} className="cd-chain-item">
            <div className={`cd-node tone-${s.tone ?? 'blue'}`} style={{ animationDelay: `${i * 0.08}s` }}>
              {I && <I size={22} />}
              <strong>{s.label}</strong>
              {s.sub && <small>{s.sub}</small>}
            </div>
            {i < steps.length - 1 && (
              <span className={`cd-link ${link}`} aria-hidden="true">
                {link === 'air' ? <svg width="34" height="18" viewBox="0 0 34 18"><path d="M2 9 q4 -7 8 0 t8 0 t8 0" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M27 4 l5 5 l-5 5" fill="none" stroke="currentColor" strokeWidth="2" /></svg> : <ArrowRight size={20} />}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function Tiles({ items }) {
  return (
    <div className="cd-tiles">
      {items.map((t, i) => {
        const I = t.icon;
        return (
          <div key={t.label} className="cd-tile" style={{ '--c': t.color ?? USER_COLORS[i % USER_COLORS.length], animationDelay: `${i * 0.06}s` }}>
            {I && <span className="cd-tile-ic"><I size={22} /></span>}
            <strong>{t.label}</strong>
            {t.text && <small>{t.text}</small>}
          </div>
        );
      })}
    </div>
  );
}

export function Timeline({ items }) {
  return (
    <div className="cd-timeline">
      {items.map((t, i) => (
        <div key={t.year + t.title} className="cd-tl-item" style={{ '--c': USER_COLORS[i % USER_COLORS.length], animationDelay: `${i * 0.08}s` }}>
          <span className="cd-tl-year">{t.year}</span>
          <span className="cd-tl-dot" />
          <strong>{t.title}</strong>
          <small>{t.text}</small>
        </div>
      ))}
    </div>
  );
}
