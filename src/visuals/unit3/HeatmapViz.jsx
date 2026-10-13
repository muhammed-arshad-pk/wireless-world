import { useEffect, useMemo, useState } from 'react';
import { useMission } from '../../context/GameContext';
import { sfx } from '../../effects/sfx';

const COLS = 32; const ROWS = 20; const CELL = 20; const M_PER_CELL = 0.5; // 16 m × 10 m floor
const LOSS = { drywall: { '2.4': 3, '5': 4 }, brick: { '2.4': 8, '5': 13 }, concrete: { '2.4': 12, '5': 20 } };
// Walls in cell coordinates [x1, y1, x2, y2, material]. Gaps are doorways.
const WALLS = [
  [11, 0, 11, 8, 'brick'], [11, 11, 11, 20, 'brick'],
  [11, 12, 17, 12, 'drywall'], [20, 12, 32, 12, 'concrete'],
  [22, 0, 22, 5, 'drywall'], [22, 8, 22, 12, 'drywall'],
];
const BAND = { '2.4': { pl1: 40, n: 2.6 }, '5': { pl1: 46.4, n: 2.9 } };

function cross(ax, ay, bx, by, cx, cy, dx, dy) {
  const d = (bx - ax) * (dy - cy) - (by - ay) * (dx - cx);
  if (d === 0) return false;
  const u = ((cx - ax) * (dy - cy) - (cy - ay) * (dx - cx)) / d;
  const v = ((cx - ax) * (by - ay) - (cy - ay) * (bx - ax)) / d;
  return u > 0 && u < 1 && v > 0 && v < 1;
}
const color = (r) => (r >= -50 ? '#15803d' : r >= -60 ? '#22c55e' : r >= -67 ? '#a3e635' : r >= -75 ? '#f59e0b' : r >= -82 ? '#ef4444' : '#334155');

export default function HeatmapViz() {
  const { complete } = useMission('w3-heatmap');
  const [ap, setAp] = useState([1, 1]);
  const [moved, setMoved] = useState(false); // the goal only counts once the learner places the AP
  const [band, setBand] = useState('2.4');
  const [seen, setSeen] = useState(() => new Set(['2.4']));
  const grid = useMemo(() => {
    const { pl1, n } = BAND[band];
    const ax = ap[0] + 0.5; const ay = ap[1] + 0.5;
    const out = [];
    for (let y = 0; y < ROWS; y++) for (let x = 0; x < COLS; x++) {
      const cx = x + 0.5; const cy = y + 0.5;
      const d = Math.max(0.5, Math.hypot(cx - ax, cy - ay) * M_PER_CELL);
      let walls = 0;
      WALLS.forEach(([x1, y1, x2, y2, mat]) => { if (cross(ax, ay, cx, cy, x1, y1, x2, y2)) walls += LOSS[mat][band]; });
      out.push(20 - (pl1 + 10 * n * Math.log10(d)) - walls);
    }
    return out;
  }, [ap, band]);
  const coverage = (grid.filter((r) => r >= -67).length / grid.length) * 100;
  useEffect(() => { if (moved && coverage >= 90) complete('cover'); }, [moved, coverage, complete]);

  const pickBand = (b) => { setBand(b); sfx('click'); const n = new Set(seen).add(b); setSeen(n); if (n.size === 2) complete('bands'); };
  const place = (e) => {
    const svg = e.currentTarget; const pt = svg.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY;
    const p = pt.matrixTransform(svg.getScreenCTM().inverse());
    setAp([Math.max(0, Math.min(COLS - 1, Math.floor(p.x / CELL))), Math.max(0, Math.min(ROWS - 1, Math.floor(p.y / CELL)))]); setMoved(true); sfx('tick');
  };

  return (
    <div className="viz">
      <div className="row-gap">
        {['2.4', '5'].map((b) => <button key={b} className={`chip ${band === b ? 'on' : ''} ${seen.has(b) ? 'seen' : ''}`} onClick={() => pickBand(b)}>{b} GHz</button>)}
        <span className="hint">Click anywhere on the floor plan to move the access point.</span>
      </div>
      <div className="viz-grid">
        <div className="viz-stage">
          <svg viewBox={`0 0 ${COLS * CELL} ${ROWS * CELL}`} onClick={place} style={{ cursor: 'crosshair' }}>
            {grid.map((r, i) => <rect key={i} x={(i % COLS) * CELL} y={Math.floor(i / COLS) * CELL} width={CELL} height={CELL} fill={color(r)} opacity=".85" />)}
            {WALLS.map(([x1, y1, x2, y2, m], i) => <line key={i} x1={x1 * CELL} y1={y1 * CELL} x2={x2 * CELL} y2={y2 * CELL} className={`wall ${m}`} />)}
            <circle cx={(ap[0] + 0.5) * CELL} cy={(ap[1] + 0.5) * CELL} r="11" fill="#fff" stroke="#0b1530" strokeWidth="3" />
            <text x={(ap[0] + 0.5) * CELL} y={(ap[1] + 0.5) * CELL + 4} className="wave-bit" fill="#0b1530" fontSize="10">AP</text>
          </svg>
        </div>
        <div className="lab-card">
          <div className="readout">
            <div><small>Area ≥ −67 dBm</small><strong className={coverage >= 90 ? 'green' : ''}>{coverage.toFixed(0)}%</strong></div>
            <div><small>Weakest spot</small><strong>{Math.min(...grid).toFixed(0)} dBm</strong></div>
          </div>
          <div className="heat-legend">{[['≥ −50', '#15803d'], ['−60', '#22c55e'], ['−67', '#a3e635'], ['−75', '#f59e0b'], ['−82', '#ef4444'], ['worse', '#334155']].map(([l, c]) => <span key={l}><i style={{ background: c }} />{l}</span>)}</div>
          <div className="heat-legend walls"><span><i className="wl drywall" />Drywall</span><span><i className="wl brick" />Brick</span><span><i className="wl concrete" />Concrete</span></div>
          <div className="formula">RSSI = 20 dBm − [PL(1 m) + 10·n·log₁₀d] − walls</div>
          <p className="hint">{band === '2.4' ? '2.4 GHz: PL(1 m) ≈ 40 dB, n = 2.6.' : '5 GHz: PL(1 m) ≈ 46 dB, n = 2.9. Walls cost more, so coverage shrinks.'} Goal: 90% of the floor at −67 dBm or better.</p>
        </div>
      </div>
    </div>
  );
}
