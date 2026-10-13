import { useState } from 'react';
import { useMission } from '../../context/GameContext';
import { sfx } from '../../effects/sfx';
import { Slider } from '../shared';

const AP = [300, 150]; const A = [110, 150];
const AP_RANGE = 230; const STA_RANGE = 200;

export default function ModesViz() {
  const { complete } = useMission('w3-modes');
  const [mode, setMode] = useState('infra');
  const [cx, setCx] = useState(260);
  const [shot, setShot] = useState(null);
  const C = [110 + cx, 150];
  const dAC = Math.abs(C[0] - A[0]);
  const dAPC = Math.hypot(C[0] - AP[0], C[1] - (AP[1] - 40)); // AP box is drawn 40 px above AP[1]
  const ok = mode === 'infra' ? dAPC <= AP_RANGE : dAC <= STA_RANGE;
  const path = mode === 'infra' ? `M${A[0]},${A[1]} L${AP[0]},${AP[1] - 40} L${C[0]},${C[1]}` : `M${A[0]},${A[1]} L${C[0]},${C[1]}`;

  const send = () => {
    setShot({ k: Date.now(), ok, mode });
    sfx(ok ? 'good' : 'bad');
    if (ok && mode === 'infra') complete('infra');
    if (ok && mode === 'adhoc') complete('adhoc');
    if (!ok && mode === 'adhoc') complete('range');
  };

  return (
    <div className="viz">
      <div className="seg">
        <button className={mode === 'infra' ? 'active' : ''} onClick={() => { setMode('infra'); setShot(null); }}>Infrastructure (BSS)</button>
        <button className={mode === 'adhoc' ? 'active' : ''} onClick={() => { setMode('adhoc'); setShot(null); }}>Ad hoc (IBSS)</button>
      </div>
      <div className="viz-grid">
        <div className="viz-stage">
          <svg viewBox="0 0 600 300">
            {mode === 'infra'
              ? <circle cx={AP[0]} cy={AP[1] - 40} r={AP_RANGE} className="range-zone" />
              : <circle cx={A[0]} cy={A[1]} r={STA_RANGE} className="range-zone pink" />}
            {mode === 'infra' && <g><rect x={AP[0] - 26} y={AP[1] - 60} width="52" height="34" rx="8" className="ap-box" /><text x={AP[0]} y={AP[1] - 38} className="wave-bit" fill="#0b1530">AP</text><line x1={AP[0]} y1={AP[1] - 26} x2={AP[0]} y2="290" stroke="#64748b" strokeDasharray="4 4" /><text x={AP[0] + 6} y="286" className="wave-label">wired LAN →</text></g>}
            <text x={A[0]} y={A[1] + 8} fontSize="30" textAnchor="middle">💻</text>
            <text x={A[0]} y={A[1] + 34} className="wave-label" textAnchor="middle">A</text>
            <text x={C[0]} y={C[1] + 8} fontSize="30" textAnchor="middle">📱</text>
            <text x={C[0]} y={C[1] + 34} className="wave-label" textAnchor="middle">C</text>
            {shot && (
              <g key={shot.k}>
                <path d={path} className={`net-route ${shot.ok ? '' : 'fail'}`} />
                <circle r="7" fill={shot.ok ? '#fde68a' : '#ef4444'}><animateMotion dur="1.2s" fill="freeze" path={path} keyPoints={shot.ok ? '0;1' : '0;0.55'} keyTimes="0;1" calcMode="linear" /></circle>
              </g>
            )}
          </svg>
        </div>
        <div className="lab-card">
          <Slider label="Move phone C" value={cx} min={80} max={440} onChange={(v) => { setCx(v); setShot(null); }} unit=" px" />
          <button className="btn btn-primary btn-sm" onClick={send}>Send frame A → C</button>
          {shot && <div className={`info-box ${shot.ok ? '' : 'warn-box'}`}>
            {shot.mode === 'infra'
              ? (shot.ok ? 'Delivered via the AP: A → AP → C. The AP relays every frame, even between two stations in the same room.' : 'C is outside the AP’s coverage, so the frame can’t be delivered.')
              : (shot.ok ? 'Delivered directly A → C. No AP needed, as long as both are in range.' : 'Lost! In ad hoc mode A must reach C directly. There is no AP to relay.')}
          </div>}
          <p className="hint">Infrastructure mode extends reach through the AP (and the wired network). Ad hoc is quick to set up but limited by each device’s own range.</p>
        </div>
      </div>
    </div>
  );
}
