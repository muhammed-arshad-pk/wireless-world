import { useEffect, useState } from 'react';
import { useMission } from '../../context/GameContext';
import { sfx } from '../../effects/sfx';
import { Slider } from '../shared';

const CHANNELS = [5.725, 5.745, 5.765, 5.785, 5.805, 5.825];
const LICENSED = 18.0;

export default function NarrowViz() {
  const { complete } = useMission('w5-nb');
  const [ch, setCh] = useState(2);
  const [licensed, setLicensed] = useState(false);
  const [bw, setBw] = useState(10);
  const [pw, setPw] = useState(20);
  const [dist, setDist] = useState(100);
  const [intf, setIntf] = useState(null);
  const [hadIntf, setHadIntf] = useState(false);

  const f = licensed ? LICENSED : CHANNELS[ch];
  const pl = 20 * Math.log10(dist) + 20 * Math.log10(f * 1000) - 27.55; // FSPL, d in m, f in MHz
  const gains = licensed ? 30 : 12; // directional licensed link vs small antennas
  const prx = pw + gains - pl;
  const noise = -174 + 10 * Math.log10(bw * 1e6) + 6;
  const iHit = !licensed && intf !== null && intf === ch;
  const iPow = iHit ? -62 : -200;
  const nPlusI = 10 * Math.log10(10 ** (noise / 10) + 10 ** (iPow / 10));
  const snr = prx - nPlusI;
  const rate = snr > 0 ? bw * Math.log2(1 + 10 ** (snr / 10)) * 0.5 : 0;
  const quality = snr > 20 ? 'Excellent' : snr > 10 ? 'Good' : snr > 3 ? 'Poor' : 'No link';
  const good = snr > 10;

  useEffect(() => {
    if (hadIntf && good && !iHit && (intf !== null || licensed)) complete('escape');
    if (good && dist >= 400) complete('far');
  }, [hadIntf, good, intf, dist, iHit, licensed]); // eslint-disable-line react-hooks/exhaustive-deps

  const addIntf = () => { setIntf(ch); setHadIntf(true); sfx('alarm'); };
  const X = (i) => 70 + i * 90;
  return (
    <div className="viz">
      <div className="viz-grid">
        <div className="viz-stage">
          <svg viewBox="0 0 640 300">
            <text x="20" y="18" className="wave-label">{licensed ? 'Licensed 18 GHz channel (exclusive)' : '5.8 GHz unlicensed band: 6 channels'}</text>
            <line x1="30" y1="230" x2="620" y2="230" className="wave-axis" />
            <text x="620" y="248" textAnchor="end" className="wave-label">frequency →</text>
            <line x1="30" y1={230 - Math.max(0, (noise + 120) * 2.2)} x2="620" y2={230 - Math.max(0, (noise + 120) * 2.2)} stroke="#64748b" strokeDasharray="4 4" />
            <text x="34" y={224 - Math.max(0, (noise + 120) * 2.2)} className="wave-label">noise floor {noise.toFixed(0)} dBm</text>
            {!licensed && CHANNELS.map((c, i) => (
              <g key={c} onClick={() => { setCh(i); sfx('click'); }} style={{ cursor: 'pointer' }}>
                <rect x={X(i) - 38} y="40" width="76" height="190" className={`nb-slot ${i === ch ? 'on' : ''}`} />
                <text x={X(i)} y="268" textAnchor="middle" className="wave-label">{c.toFixed(3)} GHz</text>
                {intf === i && <path d={`M${X(i) - 14},230 Q${X(i)},70 ${X(i) + 14},230`} fill="rgba(248,113,113,.5)" stroke="#f87171" />}
              </g>
            ))}
            {(() => {
              const cx = licensed ? 330 : X(ch);
              const w = Math.max(6, bw * 1.5);
              const h = Math.max(4, Math.min(170, (prx + 120) * 2.2));
              return <path d={`M${cx - w},230 C${cx - w * 0.6},${230 - h} ${cx + w * 0.6},${230 - h} ${cx + w},230`} fill="rgba(34,211,238,.45)" stroke="#22d3ee" strokeWidth="2" />;
            })()}
            <text x={licensed ? 330 : X(ch)} y="290" textAnchor="middle" className="wave-label" fill="#67e8f9">your signal ({bw} MHz)</text>
          </svg>
        </div>
        <div className="lab-card">
          <div className="seg small">
            <button className={!licensed ? 'active' : ''} onClick={() => { setLicensed(false); sfx('click'); }}>Unlicensed 5.8 GHz</button>
            <button className={licensed ? 'active' : ''} onClick={() => { setLicensed(true); sfx('click'); }}>Licensed 18 GHz</button>
          </div>
          {!licensed && <div className="row-gap">{CHANNELS.map((c, i) => <button key={c} className={`chip ${ch === i ? 'on' : ''}`} onClick={() => { setCh(i); sfx('click'); }}>ch {i + 1}</button>)}</div>}
          <Slider label="Channel bandwidth" value={bw} min={1} max={40} unit=" MHz" onChange={setBw} />
          <Slider label="Transmit power" value={pw} min={0} max={30} unit=" dBm" onChange={setPw} />
          <Slider label="Distance" value={dist} min={10} max={1000} step={10} unit=" m" onChange={setDist} />
          <div className="row-gap">
            <button className="chip" onClick={addIntf} disabled={licensed}>⚡ Introduce interference on this channel</button>
            {intf !== null && <button className="chip" onClick={() => setIntf(null)}>Clear</button>}
          </div>
        </div>
      </div>
      <div className="readout">
        <div><small>Received power</small><strong>{prx.toFixed(0)} dBm</strong></div>
        <div><small>Noise{iHit ? ' + interference' : ''}</small><strong>{nPlusI.toFixed(0)} dBm</strong></div>
        <div><small>SNR</small><strong className={good ? 'green' : 'red'}>{snr.toFixed(1)} dB</strong></div>
        <div><small>Link quality</small><strong className={good ? 'green' : 'red'}>{quality}</strong></div>
        <div><small>Est. data rate</small><strong>{rate.toFixed(0)} Mbps</strong></div>
      </div>
      <div className="info-box">
        {iHit ? <>⚡ Interference sits inside your narrow channel, so the receiver filter can’t remove it. <b>Retune to another channel</b> or move to a licensed channel.</> : <>A narrower channel lets in less noise (−174 + 10 log B), so SNR rises, but Shannon (C = B log₂(1+SNR)) caps the speed. Licensed links add exclusive spectrum and directional antennas for long range.</>}
      </div>
    </div>
  );
}
