import { useState } from 'react';
import { useMission } from '../../context/GameContext';
import { sfx } from '../../effects/sfx';

const SOURCE = [
  ['all', '<?xml version="1.0"?>'],
  ['all', '<!DOCTYPE wml PUBLIC "-//WAPFORUM//DTD WML 1.1//EN" ...>'],
  ['all', '<wml>'],
  ['menu', '  <card id="menu" title="WW Info">'],
  ['menu', '    <p><a href="#news">News</a><br/>'],
  ['menu', '       <a href="#weather">Weather</a><br/>'],
  ['menu', '       <a href="#cricket">Cricket</a></p>'],
  ['menu', '  </card>'],
  ['news', '  <card id="news" title="News">'],
  ['news', '    <p>5G rollout reaches 700 cities.<br/><prev/></p>'],
  ['news', '  </card>'],
  ['weather', '  <card id="weather" title="Weather">'],
  ['weather', '    <p>City: <input name="city" maxlength="20"/></p>'],
  ['weather', '    <do type="accept" label="Get">'],
  ['weather', '      <go href="check.wmls#city()"/>'],
  ['weather', '    </do>'],
  ['weather', '  </card>'],
  ['result', '  <card id="result" title="Forecast">'],
  ['result', '    <p>$(city): $(temp)°C, $(sky)</p>'],
  ['result', '  </card>'],
  ['cricket', '  <card id="cricket" title="Cricket">'],
  ['cricket', '    <timer value="300"/>'],
  ['cricket', '    <p>IND 287/4 (45.2 ov)<br/>Need 31 off 28</p>'],
  ['cricket', '  </card>'],
  ['all', '</wml>'],
];

const SCRIPT = `extern function city() {
  var c = WMLBrowser.getVar("city");
  if (String.length(c) < 2 || !isNaN(Lang.parseInt(c))) {
    Dialogs.alert("Enter a valid city name");
    return;
  }
  WMLBrowser.setVar("temp", 24 + String.length(c) % 9);
  WMLBrowser.go("#result");
}`;

const SKIES = ['sunny', 'cloudy', 'light rain', 'humid', 'clear skies'];
const CARDS = ['menu', 'news', 'weather', 'result', 'cricket'];

export default function WaeViz() {
  const { complete } = useMission('w4-wae');
  const [card, setCard] = useState('menu');
  const [hist, setHist] = useState([]);
  const [visited, setVisited] = useState(['menu']);
  const [city, setCity] = useState('');
  const [vars, setVars] = useState({});
  const [alertMsg, setAlertMsg] = useState(null);
  const [sel, setSel] = useState(0);

  const goTo = (c) => {
    setHist((h) => [...h, card]); setCard(c); setSel(0); sfx('tick');
    const v = [...new Set([...visited, c])];
    setVisited(v);
    if (CARDS.every((k) => v.includes(k))) complete('cards');
  };
  const back = () => { if (hist.length) { setCard(hist[hist.length - 1]); setHist(hist.slice(0, -1)); sfx('click'); } };
  const runScript = () => {
    const c = city.trim();
    if (c.length < 2 || /\d/.test(c)) { setAlertMsg('Enter a valid city name'); sfx('bad'); complete('script'); return; }
    setVars({ city: c, temp: 24 + (c.length % 9), sky: SKIES[c.length % SKIES.length] });
    complete('script');
    goTo('result');
  };
  const links = { menu: ['news', 'weather', 'cricket'] }[card] || [];
  const ok = () => {
    if (alertMsg) { setAlertMsg(null); return; }
    if (card === 'menu') goTo(links[sel]);
    else if (card === 'weather') runScript();
  };

  return (
    <div className="viz-grid">
      <div className="viz-stage wap-stage">
        <div className="wap-phone">
          <div className="wap-screen">
            <div className="wml-title">{{ menu: 'WW Info', news: 'News', weather: 'Weather', result: 'Forecast', cricket: 'Cricket' }[card]}</div>
            {card === 'menu' && links.map((l, i) => <button key={l} className={`wml-link ${sel === i ? 'sel' : ''}`} onClick={() => goTo(l)}>{i + 1} {l[0].toUpperCase() + l.slice(1)}</button>)}
            {card === 'news' && <p>5G rollout reaches 700 cities.</p>}
            {card === 'weather' && <p>City:<br /><input className="wml-input" value={city} maxLength={20} onChange={(e) => setCity(e.target.value)} placeholder="type a city" /></p>}
            {card === 'result' && <p>{vars.city}: {vars.temp}°C, {vars.sky}</p>}
            {card === 'cricket' && <p>IND 287/4 (45.2 ov)<br />Need 31 off 28</p>}
            {alertMsg && <div className="wml-alert">⚠ {alertMsg}<br /><small>OK</small></div>}
            <div className="wml-soft"><span>{card === 'weather' ? 'Get' : card === 'menu' ? 'Select' : ''}</span><span>{hist.length ? 'Back' : ''}</span></div>
          </div>
          <div className="wap-nav">
            <button onClick={ok}>OK</button>
            <button onClick={() => setSel((s) => (links.length ? (s + links.length - 1) % links.length : 0))}>▲</button>
            <button onClick={() => setSel((s) => (links.length ? (s + 1) % links.length : 0))}>▼</button>
            <button onClick={back}>Back</button>
          </div>
        </div>
      </div>
      <div className="lab-card">
        <h3>deck.wml <small className="hint">· cards visited {visited.length}/{CARDS.length}</small></h3>
        <pre className="wml-src">{SOURCE.map(([c, l], i) => <div key={i} className={c === card ? 'cur' : c === 'all' ? '' : 'dim'}>{l}</div>)}</pre>
        <h3>check.wmls</h3>
        <pre className={`wml-src script ${card === 'weather' || card === 'result' ? 'cur-all' : ''}`}>{SCRIPT}</pre>
        <p className="hint">The whole deck arrived in one response, so card-to-card moves cost no airtime. The script runs on the phone after the gateway compiles it to bytecode. Try a number as a city.</p>
      </div>
    </div>
  );
}
