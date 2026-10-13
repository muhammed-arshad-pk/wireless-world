import { useState } from 'react';
import { useMission } from '../../context/GameContext';
import { sfx } from '../../effects/sfx';

const STDS = [
  { id: '802.11', year: 1997, gen: 'Legacy', rate: 2e6, band: '2.4 GHz / IR', tech: 'FHSS, DSSS, diffuse infrared' },
  { id: '802.11b', year: 1999, gen: '—', rate: 11e6, band: '2.4 GHz', tech: 'DSSS with CCK' },
  { id: '802.11a', year: 1999, gen: '—', rate: 54e6, band: '5 GHz', tech: 'OFDM, 64-QAM' },
  { id: '802.11g', year: 2003, gen: '—', rate: 54e6, band: '2.4 GHz', tech: 'OFDM in 2.4 GHz (b-compatible)' },
  { id: '802.11n', year: 2009, gen: 'Wi-Fi 4', rate: 600e6, band: '2.4 / 5 GHz', tech: 'MIMO up to 4×4, 40 MHz channels' },
  { id: '802.11ac', year: 2013, gen: 'Wi-Fi 5', rate: 6.9e9, band: '5 GHz', tech: 'MU-MIMO downlink, 160 MHz, 256-QAM' },
  { id: '802.11ax', year: 2019, gen: 'Wi-Fi 6/6E', rate: 9.6e9, band: '2.4 / 5 / 6 GHz', tech: 'OFDMA, 1024-QAM, Target Wake Time' },
  { id: '802.11be', year: 2024, gen: 'Wi-Fi 7', rate: 46e9, band: '2.4 / 5 / 6 GHz', tech: '320 MHz, 4096-QAM, Multi-Link Operation' },
];
const fmtRate = (r) => (r >= 1e9 ? `${r / 1e9} Gbps` : `${r / 1e6} Mbps`);
const fmtTime = (s) => (s >= 3600 ? `${(s / 3600).toFixed(1)} h` : s >= 60 ? `${(s / 60).toFixed(1)} min` : `${s.toFixed(1)} s`);
const FILE_BITS = 4 * 8e9; // 4 GB

export default function EvolutionViz() {
  const { complete } = useMission('w3-evolution');
  const [sel, setSel] = useState('802.11ax');
  const [seen, setSeen] = useState(() => new Set(['802.11ax']));
  const [race, setRace] = useState(0);
  const cur = STDS.find((s) => s.id === sel);
  const pick = (s) => {
    setSel(s.id); sfx('click');
    const n = new Set(seen).add(s.id); setSeen(n);
    if (n.size === STDS.length) complete('timeline');
  };
  const maxLog = Math.log10(46e9); const minLog = Math.log10(1e6);
  const go = () => { setRace((r) => r + 1); sfx('whoosh'); complete('race'); };
  const tMax = FILE_BITS / STDS[0].rate;

  return (
    <div className="viz">
      <div className="wifi-timeline">
        {STDS.map((s) => (
          <button key={s.id} className={`wifi-node ${sel === s.id ? 'on' : ''} ${seen.has(s.id) ? 'seen' : ''}`} onClick={() => pick(s)}>
            <small>{s.year}</small><strong>{s.id}</strong><em>{s.gen}</em>
          </button>
        ))}
      </div>
      <div className="info-box" key={cur.id}><b>{cur.id}{cur.gen !== '—' && cur.gen !== 'Legacy' ? ` (${cur.gen})` : ''}</b>, {cur.year} · max {fmtRate(cur.rate)} · {cur.band}<br />Key technology: {cur.tech}</div>

      <div className="lab-card">
        <div className="row-between"><h3>🏁 Download a 4 GB movie at each standard’s maximum rate</h3><button className="btn btn-primary btn-sm" onClick={go}>{race ? 'Race again' : 'Start race'}</button></div>
        <div className="race-list">
          {STDS.map((s) => {
            const t = FILE_BITS / s.rate;
            const pct = ((Math.log10(s.rate) - minLog) / (maxLog - minLog)) * 92 + 8;
            const dur = 0.4 + 5 * (Math.log10(t) / Math.log10(tMax));
            return (
              <div key={s.id} className="race-row">
                <span className="race-name">{s.id}</span>
                <div className="race-bar"><span key={race} style={{ width: race ? '100%' : `${pct}%`, animationDuration: race ? `${dur}s` : '0s' }} className={race ? 'racing' : ''} /></div>
                <span className="race-time">{race ? fmtTime(t) : fmtRate(s.rate)}</span>
              </div>
            );
          })}
        </div>
        <p className="hint">Bars before the race show peak rate on a log scale. Real-world throughput is usually much lower than these theoretical maxima.</p>
      </div>
    </div>
  );
}
