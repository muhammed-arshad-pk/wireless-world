import { AudioWaveform, Cpu, FileText, RadioTower, Smartphone, Waves, Binary, Radio } from 'lucide-react';
import { Svg, T, Box, Arrow, Arcs, Tower, Phone, Laptop, Router, Sat, Dish, Building, Wave, Square, Axes, fnPath, Chain, Timeline, K } from './kit';

const TAU = Math.PI * 2;

/* ---------------- Topic 1: Introduction ---------------- */
function WirelessScene() {
  return (
    <Svg w={680} h={300} label="Wireless links around us: cellular, satellite and Wi-Fi">
      <rect x={0} y={268} width={680} height={32} fill="#ecfdf5" />
      <line x1={0} y1={268} x2={680} y2={268} stroke="#86efac" strokeWidth={2} />
      <Tower x={90} y={268} h={120} />
      <T x={90} y={286} size={11} color={K.muted}>Cell tower</T>
      <Phone x={232} y={238} s={1.2} />
      <T x={232} y={286} size={11} color={K.muted}>Mobile phone</T>
      <Arrow x1={104} y1={152} x2={222} y2={218} color={K.blue} dashed anim />
      <T x={178} y={160} size={11.5} color={K.blue} weight={700}>Cellular (4G/5G)</T>
      <Sat x={330} y={52} s={0.9} />
      <Dish x={392} y={268} s={1.3} />
      <T x={392} y={286} size={11} color={K.muted}>Satellite dish</T>
      <Arrow x1={338} y1={74} x2={404} y2={222} color={K.violet} dashed anim />
      <T x={384} y={130} size={11.5} color={K.violet} weight={700} anchor="start">Satellite TV / internet</T>
      <Router x={510} y={250} s={1.1} />
      <T x={510} y={286} size={11} color={K.muted}>Wi-Fi router</T>
      <Laptop x={620} y={248} />
      <T x={620} y={286} size={11} color={K.muted}>Laptop</T>
      <Arrow x1={534} y1={226} x2={598} y2={232} color={K.cyan} dashed anim />
      <T x={566} y={206} size={11.5} color={K.cyan} weight={700}>Wi-Fi</T>
      <T x={560} y={40} size={12} color={K.muted} italic>{'All of these carry information\non electromagnetic waves: no cables.'}</T>
    </Svg>
  );
}

const introDiagrams = [
  { title: 'Wireless communication around us', caption: 'The same idea in different forms: a tower serves phones, a satellite serves dishes, and a router serves laptops. Each link is an electromagnetic wave at its own frequency.', render: WirelessScene, wide: true },
  {
    title: 'Components of a wireless communication system',
    caption: 'Every wireless link follows this chain. The channel in the middle is where path loss, noise, interference and fading happen.',
    wide: true,
    render: () => (
      <Chain
        steps={[
          { label: 'Information source', sub: 'voice, data, video', icon: FileText, tone: 'slate' },
          { label: 'Transmitter', sub: 'encode + modulate', icon: Cpu },
          { label: 'Tx antenna', sub: 'signal → EM wave', icon: RadioTower, tone: 'cyan' },
          { label: 'Wireless channel', sub: 'noise, fading, interference', icon: Waves, tone: 'amber' },
          { label: 'Rx antenna', sub: 'EM wave → signal', icon: RadioTower, tone: 'cyan' },
          { label: 'Receiver', sub: 'demodulate + decode', icon: Cpu },
          { label: 'Destination', sub: 'user / device', icon: Smartphone, tone: 'slate' },
        ]}
        links={['arrow', 'arrow', 'air', 'air', 'arrow', 'arrow']}
      />
    ),
  },
  {
    title: 'Evolution of wireless communication',
    caption: 'From Marconi’s telegraph to 5G: each generation brought a new technology and a jump in capability.',
    wide: true,
    render: () => (
      <Timeline items={[
        { year: '1895', title: 'Marconi radio', text: 'First wireless telegraph signals using radio waves.' },
        { year: '1980s', title: '1G', text: 'Analog voice calls (AMPS, NMT). FDMA.' },
        { year: '1991', title: '2G', text: 'Digital voice and SMS (GSM, IS-95).' },
        { year: '2001', title: '3G', text: 'Mobile internet and video calls (UMTS, CDMA2000).' },
        { year: '2009', title: '4G', text: 'All-IP broadband, HD streaming (LTE).' },
        { year: '2019', title: '5G', text: 'Gbps speeds, low latency, massive IoT (NR).' },
      ]} />
    ),
  },
];

/* ---------------- Topic 2: Antennas ---------------- */
function AntennaTypes() {
  const cells = [
    { name: 'Dipole', sub: 'λ/2 · omnidirectional\nFM/TV, reference antenna', draw: (cx, cy) => (
      <g>
        <g stroke={K.ink} strokeWidth={4} strokeLinecap="round">
          <line x1={cx} y1={cy - 42} x2={cx} y2={cy - 5} /><line x1={cx} y1={cy + 5} x2={cx} y2={cy + 42} />
          <path d={`M${cx + 2},${cy - 4} H${cx + 30} M${cx + 2},${cy + 4} H${cx + 30}`} strokeWidth={1.5} />
          <rect x={cx + 30} y={cy - 8} width={16} height={16} fill="#e2e8f0" strokeWidth={1.5} />
        </g>
        <T x={cx - 22} y={cy} size={11} color={K.blue} weight={700}>λ/2</T>
      </g>
    ) },
    { name: 'Monopole', sub: 'λ/4 over a ground plane\ncar radio, walkie-talkies', draw: (cx, cy) => (
      <g>
        <line x1={cx} y1={cy - 42} x2={cx} y2={cy + 22} stroke={K.ink} strokeWidth={4} strokeLinecap="round" />
        <line x1={cx - 48} y1={cy + 26} x2={cx + 48} y2={cy + 26} stroke={K.ink} strokeWidth={3} />
        {Array.from({ length: 10 }, (_, i) => <line key={i} x1={cx - 46 + i * 10} y1={cy + 28} x2={cx - 52 + i * 10} y2={cy + 36} stroke={K.muted} strokeWidth={1.2} />)}
        <T x={cx + 22} y={cy - 10} size={11} color={K.blue} weight={700}>λ/4</T>
      </g>
    ) },
    { name: 'Yagi-Uda', sub: 'directional (end-fire)\nrooftop TV, point links', draw: (cx, cy) => (
      <g strokeLinecap="round">
        <line x1={cx - 62} y1={cy} x2={cx + 58} y2={cy} strokeWidth={3} stroke={K.ink} />
        {[[-52, 36], [-28, 31], [-4, 26], [18, 24], [40, 22]].map(([dx, h]) => (
          <line key={dx} x1={cx + dx} y1={cy - h} x2={cx + dx} y2={cy + h} strokeWidth={3} stroke={dx === -28 ? K.blue : K.ink} />
        ))}
        <T x={cx - 52} y={cy + 46} size={9.5} color={K.muted}>reflector</T>
        <T x={cx - 28} y={cy - 40} size={9.5} color={K.blue} weight={700}>driven</T>
        <T x={cx + 22} y={cy + 38} size={9.5} color={K.muted}>directors</T>
        <Arrow x1={cx + 64} y1={cy} x2={cx + 94} y2={cy} color={K.cyan} />
      </g>
    ) },
    { name: 'Parabolic dish', sub: 'very high gain, narrow beam\nsatellite, radar, backhaul', draw: (cx, cy) => (
      <g>
        <path d={`M${cx - 18},${cy - 46} Q${cx - 62},${cy} ${cx - 18},${cy + 46}`} fill="#e2e8f0" stroke={K.ink} strokeWidth={3} />
        <path d={`M${cx - 18},${cy - 46} L${cx + 10},${cy} L${cx - 18},${cy + 46}`} fill="none" stroke={K.muted} strokeWidth={1.2} />
        <circle cx={cx + 10} cy={cy} r={4} fill={K.red} />
        {[-30, -12, 12, 30].map((dy) => <Arrow key={dy} x1={cx - 30} y1={cy + dy} x2={cx + 70} y2={cy + dy} color={K.cyan} width={1.5} head={6} />)}
      </g>
    ) },
    { name: 'Horn', sub: 'flared waveguide, directional\nmicrowave, dish feeds', draw: (cx, cy) => (
      <g>
        <rect x={cx - 60} y={cy - 9} width={34} height={18} fill="#cbd5e1" stroke={K.ink} strokeWidth={2} />
        <polygon points={`${cx - 26},${cy - 9} ${cx + 30},${cy - 38} ${cx + 30},${cy + 38} ${cx - 26},${cy + 9}`} fill="#e2e8f0" stroke={K.ink} strokeWidth={2} />
        <Arcs x={cx + 30} y={cy} dir={0} n={3} r0={14} step={10} spread={35} />
      </g>
    ) },
    { name: 'Patch (microstrip)', sub: 'flat, low-profile\nphones, GPS, Wi-Fi boards', draw: (cx, cy) => (
      <g>
        <polygon points={`${cx - 56},${cy + 22} ${cx + 30},${cy + 22} ${cx + 58},${cy - 6} ${cx - 28},${cy - 6}`} fill="#bbf7d0" stroke={K.ink} strokeWidth={1.5} />
        <polygon points={`${cx - 26},${cy + 14} ${cx + 8},${cy + 14} ${cx + 24},${cy - 1} ${cx - 10},${cy - 1}`} fill="#f59e0b" stroke="#b45309" strokeWidth={1.5} />
        <polygon points={`${cx - 12},${cy + 14} ${cx - 6},${cy + 14} ${cx - 12},${cy + 22} ${cx - 18},${cy + 22}`} fill="#f59e0b" />
        <Arcs x={cx} y={cy - 8} dir={-90} n={3} r0={10} step={8} spread={40} />
        <T x={cx + 50} y={cy + 32} size={9} color={K.muted}>substrate</T>
      </g>
    ) },
  ];
  return (
    <Svg w={690} h={340} label="Common antenna types">
      {cells.map((c, i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        const x = col * 230;
        const y = row * 170;
        return (
          <g key={c.name}>
            <rect x={x + 6} y={y + 6} width={218} height={158} rx={12} fill="#f8fafc" stroke="#e2e8f0" />
            {c.draw(x + 115, y + 62)}
            <T x={x + 115} y={y + 122} size={13} weight={800}>{c.name}</T>
            <T x={x + 115} y={y + 145} size={10.5} color={K.muted}>{c.sub}</T>
          </g>
        );
      })}
    </Svg>
  );
}

const antennaDiagrams = [
  {
    title: 'Working principle of an antenna',
    caption: 'An antenna is a transducer. At the transmitter it turns an oscillating current into a radiated wave, and at the receiver it turns the wave back into a tiny current. The same antenna works both ways (reciprocity).',
    wide: true,
    render: () => (
      <Chain
        steps={[
          { label: 'Information signal', sub: 'electrical', icon: AudioWaveform, tone: 'slate' },
          { label: 'Transmitter', sub: 'RF current', icon: Cpu },
          { label: 'Transmit antenna', sub: 'current → EM wave', icon: RadioTower, tone: 'cyan' },
          { label: 'Radio waves', sub: 'E and H fields at c', icon: Waves, tone: 'amber' },
          { label: 'Receiving antenna', sub: 'EM wave → current', icon: RadioTower, tone: 'cyan' },
          { label: 'Receiver', sub: 'recovers information', icon: Radio },
        ]}
        links={['arrow', 'arrow', 'air', 'air', 'arrow']}
      />
    ),
  },
  { title: 'Types of antennas', caption: 'Simple wire antennas (dipole, monopole) radiate all around. Adding elements (Yagi), reflectors (dish) or a flare (horn) focuses the energy into a beam with higher gain. The radiation patterns are in the visualizer below.', render: AntennaTypes, wide: true },
];

/* ---------------- Topic 3: Propagation ---------------- */
function PropagationModes() {
  const ground = (x0, ctrl) => `M${x0},300 L${x0},260 Q${x0 + 160},${ctrl} ${x0 + 320},260 L${x0 + 320},300 Z`;
  return (
    <Svg w={960} h={300} label="Ground wave, sky wave and line-of-sight propagation">
      {/* Panel 1: ground wave */}
      <path d={ground(0, 200)} fill="#dcfce7" stroke="#86efac" strokeWidth={1.5} />
      <T x={160} y={20} size={14} weight={800}>Ground wave</T>
      <T x={160} y={40} size={11} color={K.muted}>below ~2 MHz (LF/MF) · AM radio</T>
      <Tower x={40} y={250} h={50} waves={false} />
      <Tower x={280} y={250} h={50} waves={false} />
      <path d="M48,228 Q160,170 272,228" fill="none" stroke={K.cyan} strokeWidth={3} className="dash-path" strokeDasharray="6 6" />
      <path d="M48,214 Q160,150 272,214" fill="none" stroke={K.cyan} strokeWidth={1.5} opacity={0.5} />
      <Arrow x1={262} y1={222} x2={272} y2={228} color={K.cyan} />
      <T x={160} y={150} size={11} color={K.cyan} weight={700}>follows the Earth’s curve</T>
      <T x={160} y={285} size={10.5} color="#166534">Earth</T>

      <line x1={320} y1={10} x2={320} y2={290} stroke="#e2e8f0" strokeWidth={1.5} />
      {/* Panel 2: sky wave */}
      <rect x={322} y={58} width={316} height={26} fill="#ede9fe" />
      <T x={480} y={71} size={10.5} color={K.violet} weight={700}>Ionosphere (D, E, F layers: 60–400 km)</T>
      <path d={ground(320, 200)} fill="#dcfce7" stroke="#86efac" strokeWidth={1.5} />
      <T x={480} y={20} size={14} weight={800}>Sky wave</T>
      <T x={480} y={40} size={11} color={K.muted}>~2–30 MHz (HF) · shortwave, amateur radio</T>
      <Tower x={360} y={250} h={50} waves={false} />
      <Tower x={600} y={250} h={50} waves={false} />
      <polyline points="360,200 420,86 480,229 540,86 600,200" fill="none" stroke={K.violet} strokeWidth={3} strokeLinejoin="round" />
      <Arrow x1={570} y1={143} x2={600} y2={200} color={K.violet} width={3} />
      <T x={446} y={100} size={10} color={K.violet} anchor="start">refracted back</T>
      <T x={480} y={250} size={10} color={K.violet}>ground reflection</T>
      <T x={480} y={285} size={10.5} color="#166534">long distance by multiple hops</T>

      <line x1={640} y1={10} x2={640} y2={290} stroke="#e2e8f0" strokeWidth={1.5} />
      {/* Panel 3: line of sight */}
      <path d={ground(640, 190)} fill="#dcfce7" stroke="#86efac" strokeWidth={1.5} />
      <T x={800} y={20} size={14} weight={800}>Space wave (line-of-sight)</T>
      <T x={800} y={40} size={11} color={K.muted}>above ~30 MHz · FM, TV, mobile, satellite</T>
      <Tower x={680} y={248} h={80} waves={false} />
      <Tower x={920} y={248} h={80} waves={false} />
      <Arrow x1={684} y1={168} x2={916} y2={168} color={K.blue} width={3} />
      <T x={800} y={156} size={10.5} color={K.blue} weight={700}>direct ray</T>
      <polyline points="684,170 800,224 916,170" fill="none" stroke={K.blue} strokeWidth={1.5} strokeDasharray="5 4" />
      <T x={800} y={198} size={10} color={K.blue}>ground-reflected ray</T>
      <T x={800} y={285} size={10.5} color="#166534">range ≈ 4.12 (√h₁ + √h₂) km</T>
    </Svg>
  );
}

const propagationDiagrams = [
  { title: 'The three propagation modes', caption: 'Low frequencies hug the ground, HF bounces off the ionosphere, and VHF and above travel in straight lines, so range is set by antenna height and the radio horizon.', render: PropagationModes, wide: true },
];

/* ---------------- Topic 4: Fading ---------------- */
function MultipathScene() {
  return (
    <Svg w={560} h={300} label="Multipath: direct, reflected and ground-reflected paths">
      <rect x={0} y={270} width={560} height={30} fill="#f1f5f9" />
      <line x1={0} y1={270} x2={560} y2={270} stroke="#94a3b8" strokeWidth={1.5} />
      <Tower x={60} y={270} h={110} />
      <Building x={235} y={270} w={40} h={46} />
      <Building x={510} y={270} w={44} h={170} />
      <Building x={150} y={270} w={34} h={70} />
      <Phone x={470} y={240} s={1.2} />
      {/* direct */}
      <Arrow x1={66} y1={160} x2={458} y2={234} color={K.blue} width={2.5} />
      <T x={250} y={180} size={11} color={K.blue} weight={700}>direct path (LOS)</T>
      {/* building reflection */}
      <polyline points="66,158 510,150" fill="none" stroke={K.violet} strokeWidth={2} strokeDasharray="6 5" />
      <Arrow x1={510} y1={150} x2={480} y2={228} color={K.violet} width={2} dashed />
      <T x={330} y={140} size={11} color={K.violet} weight={700}>reflected off building</T>
      {/* ground reflection */}
      <polyline points="64,162 330,270" fill="none" stroke={K.amber} strokeWidth={2} strokeDasharray="6 5" />
      <Arrow x1={330} y1={270} x2={460} y2={246} color={K.amber} width={2} dashed />
      <T x={300} y={252} size={11} color={K.amber} weight={700}>ground reflection</T>
      <T x={300} y={30} size={11.5} color={K.ink} weight={700}>{'At the phone the copies arrive\nwith different delays and phases:'}</T>
      <T x={300} y={68} size={11} color={K.green} weight={700}>in phase → add up (strong)</T>
      <T x={300} y={86} size={11} color={K.red} weight={700}>out of phase → cancel (deep fade)</T>
    </Svg>
  );
}

function FadingLayers() {
  const mean = (u) => 70 + 130 * u;
  const shadow = (u) => mean(u) + 13 * Math.sin(u * 9) + 6 * Math.sin(u * 23 + 1);
  const fast = (u) => shadow(u) - 2.4 * 11 * Math.log10(0.1 + 0.9 * Math.abs(Math.cos(u * 70 + 2 * Math.sin(u * 31))));
  const P = (fn) => fnPath(fn, 60, 0, 460, -1, 500);
  return (
    <Svg w={560} h={290} label="Path loss, shadowing and multipath fading on one plot">
      <Axes x={50} y={24} w={490} h={216} xl="distance →" yl="received power (dB)" />
      <path d={P(fast)} fill="none" stroke="#93c5fd" strokeWidth={1.3} />
      <path d={P(shadow)} fill="none" stroke={K.violet} strokeWidth={2.5} />
      <path d={P(mean)} fill="none" stroke={K.ink} strokeWidth={2} strokeDasharray="7 5" />
      <g transform="translate(330 30)">
        <rect width={210} height={70} rx={8} fill="#fff" stroke="#e2e8f0" />
        <line x1={10} y1={16} x2={34} y2={16} stroke={K.ink} strokeWidth={2} strokeDasharray="7 5" /><T x={40} y={16} size={10.5} anchor="start">Path loss (large-scale)</T>
        <line x1={10} y1={35} x2={34} y2={35} stroke={K.violet} strokeWidth={2.5} /><T x={40} y={35} size={10.5} anchor="start">+ Shadowing (slow, obstacles)</T>
        <line x1={10} y1={54} x2={34} y2={54} stroke="#93c5fd" strokeWidth={2} /><T x={40} y={54} size={10.5} anchor="start">+ Multipath (small-scale, fast)</T>
      </g>
      <T x={290} y={276} size={10.5} color={K.muted}>large-scale: changes over 100s of metres · small-scale: fades every ~λ/2 (6 cm at 2.4 GHz)</T>
    </Svg>
  );
}

const fadingDiagrams = [
  { title: 'Visualising multipath fading', caption: 'Buildings and the ground create extra copies of the signal. Moving the phone a few centimetres changes the phase relationship, so the received strength rises and collapses rapidly.', render: MultipathScene },
  { title: 'Large-scale vs small-scale fading', caption: 'The received signal is three effects stacked: average path loss with distance, slow shadowing by obstacles, and fast multipath fading with deep notches.', render: FadingLayers },
];

/* ---------------- Topic 5: Signal encoding ---------------- */
function FourCombos() {
  const bits = '1011001';
  const W = 200;
  const panel = (i, title, tech, note, body) => (
    <g key={i}>
      <rect x={i * 240 + 6} y={6} width={228} height={288} rx={12} fill="#f8fafc" stroke="#e2e8f0" />
      <T x={i * 240 + 120} y={28} size={12.5} weight={800}>{title}</T>
      <T x={i * 240 + 120} y={50} size={11} color={K.blue} weight={700}>{tech}</T>
      {body(i * 240 + 20)}
      <T x={i * 240 + 120} y={258} size={10.5} color={K.muted}>{note}</T>
    </g>
  );
  const levels = 7;
  const N = 10;
  const sig = (u) => 0.85 * Math.sin(TAU * 1.1 * u + 0.3);
  return (
    <Svg w={960} h={300} label="Four combinations of data and signal">
      {panel(0, 'Digital data → digital signal', 'Line coding', 'NRZ, Manchester, AMI\non wires and buses', (x) => (
        <><line x1={x} y1={150} x2={x + W} y2={150} stroke={K.grid} /><Square bits={bits} x={x} y={150} w={W} amp={34} /></>
      ))}
      {panel(1, 'Digital data → analog signal', 'Modulation (modem)', 'ASK, FSK, PSK, QAM\nWi-Fi, cellular, satellite', (x) => (
        <>
          {[...bits].map((b, k) => <T key={k} x={x + (k + 0.5) * (W / 7)} y={100} size={11} color={K.amber} weight={800}>{b}</T>)}
          <Wave fn={(u) => (bits[Math.min(6, Math.floor(u * 7))] === '1' ? 1 : 0.18) * Math.sin(TAU * 21 * u)} x={x} y={155} w={W} amp={38} color={K.violet} />
          <T x={x + W / 2} y={210} size={10} color={K.muted}>ASK shown: amplitude carries the bits</T>
        </>
      ))}
      {panel(2, 'Analog data → digital signal', 'Digitisation (codec)', 'PCM, delta modulation\nvoice in digital phones', (x) => {
        const pts = Array.from({ length: N }, (_, k) => { const u = (k + 0.5) / N; const q = Math.round(((sig(u) + 1) / 2) * levels); return { u, q, y: 155 - ((q / levels) * 2 - 1) * 40 }; });
        let stair = '';
        pts.forEach((p, k) => { const x0 = x + (k / N) * W; stair += `${k ? 'L' : 'M'}${x0},${p.y} L${x0 + W / N},${p.y}`; });
        return (
          <>
            <Wave fn={sig} x={x} y={155} w={W} amp={40} color="#94a3b8" dashed width={1.5} />
            <path d={stair} fill="none" stroke={K.green} strokeWidth={2.2} />
            {pts.map((p) => <circle key={p.u} cx={x + p.u * W} cy={155 - 40 * sig(p.u)} r={2.8} fill={K.red} />)}
            <T x={x + W / 2} y={215} size={10.5} color={K.ink} weight={700}>{pts.slice(0, 5).map((p) => p.q.toString(2).padStart(3, '0')).join(' ')} …</T>
          </>
        );
      })}
      {panel(3, 'Analog data → analog signal', 'Analog modulation', 'AM, FM, PM\nradio broadcasting', (x) => (
        <>
          <Wave fn={(u) => (1 + 0.7 * Math.sin(TAU * 1.5 * u)) / 1.7 * Math.sin(TAU * 26 * u)} x={x} y={155} w={W} amp={44} color={K.cyan} width={1.6} />
          <Wave fn={(u) => (1 + 0.7 * Math.sin(TAU * 1.5 * u)) / 1.7} x={x} y={155} w={W} amp={44} color={K.red} dashed width={1.5} />
          <T x={x + W / 2} y={215} size={10} color={K.muted}>AM shown: envelope = message</T>
        </>
      ))}
    </Svg>
  );
}

const encodingDiagrams = [
  { title: 'The four encoding combinations', caption: 'Data can be digital or analog, and so can the signal that carries it. Each pairing has its own technique and its own device: line coder, modem, codec or analog modulator.', render: FourCombos, wide: true },
  {
    title: 'Where encoding sits in a link',
    caption: 'The encoder or modulator shapes the data to suit the medium. The decoder or demodulator at the far end reverses the process.',
    wide: true,
    render: () => (
      <Chain
        steps={[
          { label: 'Source data', sub: 'digital or analog', icon: Binary, tone: 'slate' },
          { label: 'Encoder / modulator', sub: 'g(t) or s(t)', icon: Cpu },
          { label: 'Transmitted signal', sub: 'suited to the medium', icon: AudioWaveform, tone: 'cyan' },
          { label: 'Medium', sub: 'wire, fibre, air', icon: Waves, tone: 'amber' },
          { label: 'Decoder / demodulator', sub: 'reverses the mapping', icon: Cpu },
          { label: 'Recovered data', sub: 'ideally identical', icon: Binary, tone: 'green' },
        ]}
        links={['arrow', 'arrow', 'air', 'air', 'arrow']}
      />
    ),
  },
];

/* ---------------- Topic 6: Digital modulation ---------------- */
function ModulatorBlock() {
  return (
    <Svg w={680} h={240} label="Block diagram of a digital modulator">
      <Box x={10} y={80} w={110} h={52} label={'Binary data\n1 0 1 1'} tone="slate" />
      <Arrow x1={120} y1={106} x2={158} y2={106} color={K.ink} />
      <Box x={160} y={80} w={130} h={52} label={'Symbol mapper\n(bits → levels)'} />
      <Arrow x1={290} y1={106} x2={330} y2={106} color={K.ink} />
      <circle cx={350} cy={106} r={20} fill="#fff" stroke={K.ink} strokeWidth={2} />
      <T x={350} y={107} size={20} weight={700}>×</T>
      <circle cx={350} cy={196} r={20} fill="#fff7ed" stroke={K.amber} strokeWidth={2} />
      <Wave fn={(u) => Math.sin(TAU * 2 * u)} x={338} y={196} w={24} amp={7} color={K.amber} />
      <Arrow x1={350} y1={176} x2={350} y2={128} color={K.amber} />
      <T x={376} y={196} size={11} color={K.amber} anchor="start" weight={700}>Carrier oscillator: cos 2πf_c t</T>
      <Arrow x1={370} y1={106} x2={418} y2={106} color={K.ink} />
      <Box x={420} y={80} w={110} h={52} label={'Band-pass\nfilter + PA'} tone="violet" />
      <Arrow x1={530} y1={106} x2={590} y2={106} color={K.ink} />
      <line x1={600} y1={106} x2={600} y2={56} stroke={K.ink} strokeWidth={3} />
      <path d="M588,56 L600,44 L612,56" fill="none" stroke={K.ink} strokeWidth={3} />
      <line x1={590} y1={106} x2={600} y2={106} stroke={K.ink} strokeWidth={2} />
      <Arcs x={600} y={46} dir={0} n={3} r0={10} step={8} />
      <Square bits="1011" x={170} y={40} w={110} amp={12} labels={false} color={K.ink} />
      <T x={225} y={20} size={10} color={K.muted}>baseband m(t)</T>
      <Wave fn={(u) => Math.sin(TAU * 10 * u + ([0, Math.PI, 0, 0][Math.min(3, Math.floor(u * 4))]))} x={420} y={40} w={110} amp={12} color={K.violet} />
      <T x={475} y={20} size={10} color={K.muted}>modulated s(t) = m(t)·cos 2πf_c t</T>
      <T x={340} y={228} size={11} color={K.muted} italic>The demodulator reverses this: multiply by the same carrier, low-pass filter, then decide 1 or 0.</T>
    </Svg>
  );
}

const digiModDiagrams = [
  { title: 'Inside a digital modulator (BPSK example)', caption: 'Bits become a baseband level signal, which is multiplied by a high-frequency carrier. Changing what the bits control (amplitude, frequency or phase) gives ASK, FSK or PSK. Compare them live in the visualizer below.', render: ModulatorBlock, wide: true },
];

/* ---------------- Topic 7: Analog modulation & PCM ---------------- */
function PcmPipeline() {
  const N = 8;
  const L = 7;
  const m = (u) => 0.85 * Math.sin(TAU * u);
  const samples = Array.from({ length: N }, (_, k) => { const u = (k + 0.5) / N; const q = Math.round(((m(u) + 1) / 2) * L); return { u, v: m(u), q }; });
  const stages = ['Analog message\nm(t)', 'Sampler\nfs ≥ 2·f_max', 'Quantizer\n2ⁿ = 8 levels', 'Encoder\nn = 3 bits/sample', 'PCM output\nbit stream'];
  const X = (i) => 14 + i * 190;
  const W = 160;
  const cy = 175;
  const A = 48;
  const bitsOut = samples.slice(0, 4).map((s) => s.q.toString(2).padStart(3, '0')).join('');
  return (
    <Svg w={960} h={290} label="PCM: sampling, quantization and encoding">
      {stages.map((s, i) => (
        <g key={s}>
          <Box x={X(i)} y={14} w={W} h={50} label={s} tone={['slate', 'blue', 'violet', 'cyan', 'green'][i]} />
          {i < 4 && <Arrow x1={X(i) + W} y1={39} x2={X(i + 1)} y2={39} color={K.ink} />}
          <rect x={X(i)} y={96} width={W} height={160} rx={10} fill="#f8fafc" stroke="#e2e8f0" />
        </g>
      ))}
      {/* 1 analog */}
      <Wave fn={m} x={X(0) + 10} y={cy} w={W - 20} amp={A} color={K.blue} width={2.5} />
      {/* 2 samples */}
      <Wave fn={m} x={X(1) + 10} y={cy} w={W - 20} amp={A} color="#cbd5e1" dashed width={1.3} />
      {samples.map((s) => { const x = X(1) + 10 + s.u * (W - 20); return <g key={s.u}><line x1={x} y1={cy} x2={x} y2={cy - A * s.v} stroke={K.blue} strokeWidth={2.5} /><circle cx={x} cy={cy - A * s.v} r={3} fill={K.red} /></g>; })}
      <T x={X(1) + W / 2} y={244} size={10} color={K.muted}>PAM: samples at fixed intervals</T>
      {/* 3 quantize */}
      {Array.from({ length: L + 1 }, (_, q) => { const y = cy - A * ((q / L) * 2 - 1); return <g key={q}><line x1={X(2) + 22} y1={y} x2={X(2) + W - 8} y2={y} stroke="#e2e8f0" /><T x={X(2) + 12} y={y} size={8.5} color={K.muted}>{q}</T></g>; })}
      {samples.map((s, k) => { const x0 = X(2) + 22 + (k / N) * (W - 30); const y = cy - A * ((s.q / L) * 2 - 1); return <line key={k} x1={x0} y1={y} x2={x0 + (W - 30) / N} y2={y} stroke={K.violet} strokeWidth={3} />; })}
      <T x={X(2) + W / 2} y={244} size={10} color={K.muted}>rounded to nearest level</T>
      {/* 4 codes */}
      {samples.map((s, k) => <T key={k} x={X(3) + 22 + (k % 4) * 38} y={130 + Math.floor(k / 4) * 50} size={12} weight={800} color={K.cyan}>{s.q.toString(2).padStart(3, '0')}</T>)}
      {samples.map((s, k) => <T key={`l${k}`} x={X(3) + 22 + (k % 4) * 38} y={148 + Math.floor(k / 4) * 50} size={9} color={K.muted}>{`level ${s.q}`}</T>)}
      <T x={X(3) + W / 2} y={244} size={10} color={K.muted}>each level → n-bit code</T>
      {/* 5 bit stream */}
      <Square bits={bitsOut} x={X(4) + 8} y={cy} w={W - 16} amp={22} color={K.green} labels={false} />
      <T x={X(4) + W / 2} y={128} size={11} weight={800} color={K.amber}>{bitsOut.match(/.{3}/g).join(' ')}</T>
      <T x={X(4) + W / 2} y={244} size={10} color={K.muted}>bit rate = n × fs</T>
    </Svg>
  );
}

function AmFmPm() {
  const m = (u) => Math.sin(TAU * u);
  const rows = [
    { name: 'Message m(t)', note: 'the information', fn: m, color: K.red },
    { name: 'Carrier', note: 'high-frequency sine', fn: (u) => Math.sin(TAU * 14 * u), color: '#94a3b8' },
    { name: 'AM', note: 'amplitude follows m(t)', fn: (u) => ((1 + 0.7 * m(u)) / 1.7) * Math.sin(TAU * 14 * u), color: K.blue },
    { name: 'FM', note: 'frequency follows m(t)', fn: (u) => Math.sin(TAU * (14 * u + (6 * (1 - Math.cos(TAU * u))) / TAU)), color: K.violet },
    { name: 'PM', note: 'phase follows m(t)', fn: (u) => Math.sin(TAU * 14 * u + 2.2 * m(u)), color: K.cyan },
  ];
  return (
    <Svg w={600} h={340} label="AM, FM and PM produced from the same message">
      {rows.map((r, i) => {
        const y = 36 + i * 66;
        return (
          <g key={r.name}>
            <T x={10} y={y - 8} size={13} weight={800} anchor="start" color={r.color === '#94a3b8' ? K.ink : r.color}>{r.name}</T>
            <T x={10} y={y + 10} size={10} anchor="start" color={K.muted}>{r.note}</T>
            <line x1={150} y1={y} x2={590} y2={y} stroke={K.grid} />
            <Wave fn={r.fn} x={150} y={y} w={440} amp={24} color={r.color} width={1.7} />
          </g>
        );
      })}
    </Svg>
  );
}

const analogDiagrams = [
  { title: 'AM, FM and PM from the same message', caption: 'One message, three ways to impress it on a carrier. Watch where the message “hides” in each modulated wave.', render: AmFmPm, wide: true },
  { title: 'Pulse Code Modulation (PCM), step by step', caption: 'Sample (Nyquist: at least twice the highest frequency), quantize to 2ⁿ levels (this adds quantization noise), and encode each level as n bits. Telephone voice: 8 kHz × 8 bits = 64 kbps.', render: PcmPipeline, wide: true },
];

export default {
  'w1-spectrum': introDiagrams,
  'w1-antenna': antennaDiagrams,
  'w1-propagation': propagationDiagrams,
  'w1-fading': fadingDiagrams,
  'w1-linecode': encodingDiagrams,
  'w1-digimod': digiModDiagrams,
  'w1-analog': analogDiagrams,
};
