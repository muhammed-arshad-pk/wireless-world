import { useEffect, useState } from 'react';
import { useMission } from '../../context/GameContext';
import { sfx } from '../../effects/sfx';
import { Slider } from '../shared';

const BANDS = { '2.4': { rate: 150, range: 45, ch: 3 }, '5': { rate: 600, range: 30, ch: 9 }, '6': { rate: 1200, range: 22, ch: 14 } };
const SEC = { open: 0, wpa2: 2, wpa3: 3, ent: 4 };

export default function ReqViz() {
  const { complete } = useMission('w5-req');
  const [area, setArea] = useState(1500);
  const [devices, setDevices] = useState(60);
  const [need, setNeed] = useState(20);
  const [band, setBand] = useState('5');
  const [aps, setAps] = useState(2);
  const [sec, setSec] = useState('wpa2');
  const [psm, setPsm] = useState(false);
  const [qos, setQos] = useState(false);

  const b = BANDS[band];
  const cellArea = Math.PI * b.range * b.range * 0.6;
  const coverage = Math.min(1, (aps * cellArea) / area);
  const perAp = devices / aps;
  const throughput = (b.rate * 0.55) / Math.max(1, perAp * 0.4);
  const chanUse = aps / b.ch;

  const req = [
    { k: 'Data rate', ok: throughput >= need, v: `${throughput.toFixed(0)} Mbps/device` },
    { k: 'Coverage & mobility', ok: coverage >= 0.95, v: `${(coverage * 100).toFixed(0)}% of area` },
    { k: 'Reliability & availability', ok: aps >= 2 && coverage >= 0.95 && chanUse <= 1, v: aps >= 2 ? (chanUse <= 1 ? 'redundant cells' : 'co-channel overlap') : 'single point of failure' },
    { k: 'Security & privacy', ok: SEC[sec] >= 3, v: { open: 'open network!', wpa2: 'WPA2 (ok, aging)', wpa3: 'WPA3', ent: 'WPA3-Enterprise' }[sec] },
    { k: 'Low power consumption', ok: psm, v: psm ? 'power save + TWT' : 'radios always awake' },
    { k: 'Scalability & compatibility', ok: perAp <= 40, v: `${perAp.toFixed(0)} devices per AP` },
    { k: 'Interference & QoS', ok: qos && chanUse <= 1, v: `${qos ? 'WMM on' : 'no QoS'} · ${Math.min(aps, b.ch)}/${b.ch} channels` },
  ];
  const met = req.filter((r) => r.ok).length;

  useEffect(() => {
    if (met === req.length) { complete('all'); sfx('fanfare'); }
    if (perAp > 60 && throughput < need) complete('overload');
  }, [met, perAp, throughput, need]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="viz-grid">
      <div className="lab-card">
        <h3>Site & users</h3>
        <Slider label="Floor area" value={area} min={200} max={6000} step={100} unit=" m²" onChange={setArea} />
        <Slider label="Number of devices" value={devices} min={5} max={500} step={5} onChange={setDevices} />
        <Slider label="Speed needed per device" value={need} min={2} max={100} unit=" Mbps" onChange={setNeed} />
        <h3>Your design</h3>
        <Slider label="Access points" value={aps} min={1} max={20} onChange={setAps} />
        <div className="seg small">{Object.keys(BANDS).map((k) => <button key={k} className={band === k ? 'active' : ''} onClick={() => { setBand(k); sfx('click'); }}>{k} GHz</button>)}</div>
        <div className="seg small">{Object.entries({ open: 'Open', wpa2: 'WPA2', wpa3: 'WPA3', ent: 'WPA3-Ent' }).map(([k, l]) => <button key={k} className={sec === k ? 'active' : ''} onClick={() => { setSec(k); sfx('click'); }}>{l}</button>)}</div>
        <label className="switch dark"><input type="checkbox" checked={psm} onChange={(e) => setPsm(e.target.checked)} /><span>Power save / Target Wake Time</span></label>
        <label className="switch dark"><input type="checkbox" checked={qos} onChange={(e) => setQos(e.target.checked)} /><span>QoS (WMM) for voice & video</span></label>
      </div>
      <div className="lab-card">
        <h3>Requirements met: {met}/7</h3>
        <div className="req-meters">
          {req.map((r) => (
            <div key={r.k} className={`req-row ${r.ok ? 'ok' : 'bad'}`}>
              <span>{r.ok ? '✔' : '✘'}</span><b>{r.k}</b><small>{r.v}</small>
            </div>
          ))}
        </div>
        <p className="hint">Model: each {band} GHz AP covers ≈ {cellArea.toFixed(0)} m² indoors and delivers ≈ {(b.rate * 0.55).toFixed(0)} Mbps real throughput shared by its devices. More APs than non-overlapping channels ({b.ch}) cause co-channel interference.</p>
      </div>
    </div>
  );
}
