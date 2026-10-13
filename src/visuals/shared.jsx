// Shared helpers for SVG visualizers.

/** Builds an SVG path by sampling y = fn(x) for x in [0, width]. */
export function wavePath(fn, width, mid, amp, step = 1.5) {
  let d = '';
  for (let x = 0; x <= width; x += step) {
    const y = mid - fn(x) * amp;
    d += `${x === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)} `;
  }
  return d;
}

export function Slider({ label, value, min, max, step = 1, onChange, unit = '', fmt }) {
  return (
    <label className="ctrl">
      <span className="ctrl-row"><span>{label}</span><b>{fmt ? fmt(value) : value}{unit}</b></span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} />
    </label>
  );
}

export function BitEditor({ bits, setBits, max = 10 }) {
  return (
    <div className="row-gap">
      {bits.map((b, i) => (
        <button key={i} className={`bit-btn ${b ? 'one' : ''}`} onClick={() => setBits(bits.map((x, k) => (k === i ? 1 - x : x)))}>{b}</button>
      ))}
      {bits.length < max && <button className="chip" onClick={() => setBits([...bits, 0])}>+ bit</button>}
      {bits.length > 3 && <button className="chip" onClick={() => setBits(bits.slice(0, -1))}>− bit</button>}
    </div>
  );
}

/** Formats a number with SI prefixes, e.g. 2.4e9 → "2.4 G". */
export function si(n, digits = 3) {
  const units = [[1e12, 'T'], [1e9, 'G'], [1e6, 'M'], [1e3, 'k'], [1, ''], [1e-3, 'm'], [1e-6, 'µ']];
  for (const [v, u] of units) if (Math.abs(n) >= v) return `${Number((n / v).toPrecision(digits))} ${u}`;
  return `${Number(n.toPrecision(digits))} `;
}

export const C = 299792458; // speed of light, m/s
