import { Gauge, MapPin, ShieldCheck, Battery, Layers, Activity, Repeat, House, Building2, GraduationCap, Hospital, Plane, Factory, Cable, Building, Footprints, Users, Laptop as LaptopIc, Router as RouterIc, Network, Globe } from 'lucide-react';
import { Svg, T, Box, Arrow, Arcs, Phone, Laptop, Tablet, Router, Cloud, Building as BuildingG, Wave, Axes, fnPath, Chain, Tiles, Timeline, K, USER_COLORS } from './kit';

const light = (c) => `${c}22`;
const TAU = Math.PI * 2;

/* ---------------- Topic 1: Introduction to WLAN ---------------- */
function WlanScene() {
  const clients = [[90, 60, 'Laptop'], [90, 150, 'Smartphone'], [90, 240, 'Tablet']];
  return (
    <Svg w={760} h={305} label="WLAN: clients, access point, modem and Internet">
      <T x={90} y={14} size={12} weight={800} color={K.blue}>Wireless clients</T>
      {clients.map(([x, y, l]) => (
        <g key={l}>
          {l === 'Laptop' ? <Laptop x={x} y={y} /> : l === 'Tablet' ? <Tablet x={x} y={y} /> : <Phone x={x} y={y} />}
          <T x={x} y={y + 30} size={11} weight={700}>{l}</T>
          <Arrow x1={x + 30} y1={y} x2={290} y2={150} color={K.cyan} width={2} dashed anim both />
        </g>
      ))}
      <Router x={330} y={160} s={1.4} />
      <T x={330} y={196} size={11.5} weight={800}>{'Access point (AP)\n/ router'}</T>
      <Arc3 />
      <line x1={366} y1={155} x2={470} y2={155} stroke={K.ink} strokeWidth={3} />
      <rect x={472} y={140} width={70} height={30} rx={6} fill="#334155" />
      <T x={507} y={155} size={11} weight={800} color="#fff">Modem</T>
      <line x1={542} y1={155} x2={610} y2={155} stroke={K.ink} strokeWidth={3} />
      <Cloud x={670} y={150} label="Internet" />
      <T x={670} y={190} size={10.5} color={K.muted}>ISP connection</T>
      <line x1={480} y1={292} x2={510} y2={292} stroke={K.cyan} strokeWidth={2} strokeDasharray="6 5" /><T x={516} y={292} size={10.5} anchor="start" color={K.cyan}>radio link (Wi-Fi)</T>
      <line x1={480} y1={272} x2={510} y2={272} stroke={K.ink} strokeWidth={3} /><T x={516} y={272} size={10.5} anchor="start">cable (Ethernet / ISP line)</T>
    </Svg>
  );
}
const Arc3 = () => <Arcs x={330} y={128} dir={-90} n={3} r0={14} step={10} spread={55} />;

const introDiagrams = [
  { title: 'How devices connect without cables', caption: 'Clients reach the access point by radio; from there the network is wired to the modem and the Internet. The AP is the bridge between the two worlds.', render: WlanScene, wide: true },
  {
    title: 'WLAN architecture: the path of a packet',
    caption: 'Only the first hop is wireless; everything behind the AP is an ordinary wired LAN.',
    wide: true,
    render: () => (
      <Chain
        steps={[
          { label: 'Wireless client', sub: 'NIC + antenna', icon: LaptopIc, tone: 'slate' },
          { label: 'Access point', sub: '802.11 ↔ 802.3 bridge', icon: RouterIc, tone: 'cyan' },
          { label: 'Switch / backbone', sub: 'wired LAN', icon: Network, tone: 'blue' },
          { label: 'Router', sub: 'routes to other networks', icon: RouterIc, tone: 'violet' },
          { label: 'Modem → ISP', sub: 'fibre / DSL / cable', icon: Cable, tone: 'amber' },
          { label: 'Internet', sub: 'web & cloud', icon: Globe, tone: 'green' },
        ]}
        links={['air', 'arrow', 'arrow', 'arrow', 'arrow']}
      />
    ),
  },
];

/* ---------------- Topic 2: Applications ---------------- */
function DeploymentHub() {
  const nodes = [
    [140, 70, 'Homes', 'home'], [380, 34, 'Enterprise / office', 'office'], [610, 70, 'Campus', 'campus'],
    [120, 220, 'Mobile users', 'mobile'], [380, 250, 'Airports & hotels', 'office'], [630, 220, 'Healthcare', 'hospital'],
  ];
  return (
    <Svg w={760} h={290} label="Universal WLAN deployment">
      <Cloud x={384} y={146} label="Backbone / ISP" />
      {nodes.map(([x, y, l, k], i) => (
        <g key={l}>
          <line x1={x} y1={y < 142 ? y + 46 : y - 30} x2={384 + (x - 384) * 0.18} y2={142 + ((y < 142 ? y + 46 : y - 30) - 142) * 0.25} stroke={USER_COLORS[i]} strokeWidth={1.6} strokeDasharray="5 4" className="dash-path" />
          {k === 'mobile' ? <><Phone x={x - 14} y={y} /><Laptop x={x + 22} y={y + 4} s={0.7} /></>
            : k === 'home' ? <g><path d={`M${x - 22},${y} L${x},${y - 20} L${x + 22},${y} Z`} fill="#bfdbfe" stroke={K.ink} /><rect x={x - 16} y={y} width={32} height={22} fill="#eff6ff" stroke={K.ink} /></g>
              : <BuildingG x={x - 18} y={y + 20} w={36} h={k === 'hospital' ? 44 : 52} color={k === 'hospital' ? '#fecaca' : '#cbd5e1'} />}
          <Arcs x={x + 26} y={y - 6} dir={-45} n={2} r0={5} step={5} spread={40} />
          <T x={x} y={y + 36} size={11} weight={800}>{l}</T>
        </g>
      ))}
    </Svg>
  );
}

const appsDiagrams = [
  { title: 'Universal WLAN deployment', caption: 'The same technology serves very different places, each joined to the Internet through its own access points and backbone.', render: DeploymentHub, wide: true },
  {
    title: 'WLANs by environment',
    caption: 'Every environment has its own users and special needs.',
    render: () => (
      <Tiles items={[
        { icon: House, label: 'Homes', text: 'Phones, laptops, smart TVs and IoT devices' },
        { icon: Building2, label: 'Offices', text: 'Employee connectivity and shared resources' },
        { icon: GraduationCap, label: 'Educational institutions', text: 'Classrooms, libraries and campus Wi-Fi' },
        { icon: Hospital, label: 'Hospitals', text: 'Mobile access to records and monitors' },
        { icon: Plane, label: 'Airports & hotels', text: 'Public Wi-Fi with guest isolation' },
        { icon: Factory, label: 'Industries', text: 'Wireless monitoring, scanners, robots' },
      ]} />
    ),
  },
  {
    title: 'Four classic application types',
    caption: 'Stallings’ classification of WLAN applications.',
    render: () => (
      <Tiles items={[
        { icon: Network, label: 'LAN extension', text: 'Wireless coverage added to a wired backbone' },
        { icon: Building, label: 'Cross-building interconnect', text: 'Point-to-point bridges between nearby buildings' },
        { icon: Footprints, label: 'Nomadic access', text: 'Laptops roam between hubs across a campus' },
        { icon: Users, label: 'Ad hoc networking', text: 'Temporary peer-to-peer groups, e.g. meetings' },
      ]} />
    ),
  },
];

/* ---------------- Topic 3: Requirements ---------------- */
function ReqHub() {
  const req = ['Speed', 'Range', 'Reliability', 'Security', 'Power', 'Scalability', 'Interference / QoS'];
  const cx = 380;
  const cy = 150;
  return (
    <Svg w={760} h={300} label="WLAN requirements around the access point">
      <circle cx={cx} cy={cy} r={58} fill={light(K.cyan)} stroke={K.cyan} />
      <Router x={cx} y={cy + 10} s={1.3} />
      <T x={cx} y={cy + 40} size={11} weight={800}>WLAN design</T>
      {req.map((r, i) => {
        const a = (i / req.length) * TAU - Math.PI / 2;
        const x = cx + 270 * Math.cos(a) * 0.95;
        const y = cy + 120 * Math.sin(a);
        return (
          <g key={r}>
            <Arrow x1={cx + 60 * Math.cos(a)} y1={cy + 60 * Math.sin(a) * 0.9} x2={x - 60 * Math.cos(a) * 0.9} y2={y - 16 * Math.sin(a)} color={USER_COLORS[i]} width={1.8} />
            <Box x={x - 62} y={y - 15} w={124} h={30} label={r} tone={['blue', 'cyan', 'violet', 'red', 'green', 'amber', 'slate'][i]} size={11.5} r={15} />
          </g>
        );
      })}
    </Svg>
  );
}

const reqDiagrams = [
  { title: 'Balancing the requirements', caption: 'A WLAN design pulls in seven directions at once. Improving one, like more power for range, can hurt another, like interference or battery life.', render: ReqHub, wide: true },
  {
    title: 'The seven requirements',
    caption: 'What each requirement asks of the network.',
    wide: true,
    render: () => (
      <Tiles items={[
        { icon: Gauge, label: 'Data rate', text: 'Sufficient speed for intended applications' },
        { icon: MapPin, label: 'Coverage & mobility', text: 'Seamless connectivity throughout the area' },
        { icon: ShieldCheck, label: 'Reliability & availability', text: 'Stable, continuous communication links' },
        { icon: ShieldCheck, label: 'Security & privacy', text: 'Protect data and control access' },
        { icon: Battery, label: 'Low power consumption', text: 'Essential for battery-powered devices' },
        { icon: Layers, label: 'Scalability & compatibility', text: 'More devices, standard technologies' },
        { icon: Activity, label: 'Interference & QoS', text: 'Manage congestion, prioritise traffic' },
      ]} />
    ),
  },
];

/* ---------------- Topic 4: Infrared ---------------- */
function IrScene() {
  return (
    <Svg w={760} h={250} label="How infrared transmission works">
      <Laptop x={110} y={130} s={2} />
      <T x={110} y={190} size={12} weight={800}>IR transmitter</T>
      <circle cx={162} cy={134} r={6} fill={K.red} />
      <T x={150} y={84} size={10.5} color={K.red} weight={700} anchor="start">tiny blinking IR LED</T>
      <line x1={162} y1={90} x2={162} y2={126} stroke={K.red} strokeWidth={1} />
      <polygon points="170,134 520,100 520,168" fill="rgba(239,68,68,.12)" />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => <rect key={i} x={200 + i * 36} y={126} width={i % 3 === 1 ? 8 : 18} height={16} rx={3} fill={K.red} opacity={0.35 + i * 0.07} />)}
      <Arcs x={500} y={134} dir={0} n={3} r0={8} step={8} color={K.red} />
      <T x={350} y={170} size={11} color={K.red} weight={700}>infrared light signal (invisible, 850–950 nm)</T>
      <rect x={540} y={124} width={10} height={20} fill="#1e293b" />
      <T x={548} y={160} size={10.5} weight={700} anchor="end">photodiode</T>
      <rect x={560} y={110} width={150} height={70} rx={8} fill="#cbd5e1" stroke={K.ink} strokeWidth={2} />
      <rect x={580} y={92} width={110} height={20} fill="#f8fafc" stroke={K.ink} />
      <rect x={585} y={180} width={100} height={18} fill="#f8fafc" stroke={K.ink} />
      <T x={635} y={218} size={12} weight={800}>IR receiver (printer)</T>
      <Arrow x1={110} y1={236} x2={640} y2={236} color={K.blue} width={1.6} />
      <T x={380} y={226} size={10.5} color={K.blue}>data → electrical pulses → light pulses → current → data</T>
    </Svg>
  );
}

function IrTechniques() {
  const dev = (x, y, rot = 0, c = '#334155') => <g transform={`rotate(${rot} ${x} ${y})`}><rect x={x - 14} y={y - 9} width={28} height={18} rx={4} fill={c} /><circle cx={x + 14} cy={y} r={4} fill={K.red} /></g>;
  return (
    <Svg w={900} h={270} label="Directed beam, omnidirectional and diffused infrared">
      <T x={150} y={20} size={13} weight={800}>Directed beam</T>
      {dev(50, 140)}{dev(250, 140, 180)}
      <polygon points="66,140 234,132 234,148" fill="rgba(239,68,68,.25)" />
      <T x={150} y={210} size={10.5} color={K.muted}>{'point-to-point, aimed\nlongest range, fastest'}</T>
      <line x1={300} y1={20} x2={300} y2={250} stroke="#e2e8f0" />
      <T x={450} y={20} size={13} weight={800}>Omnidirectional</T>
      <line x1={320} y1={50} x2={580} y2={50} stroke="#94a3b8" strokeWidth={3} />
      <rect x={430} y={52} width={40} height={16} rx={4} fill="#1d4ed8" />
      <T x={476} y={62} size={9.5} color={K.blue} weight={700} anchor="start">base station</T>
      {[350, 450, 550].map((x) => <g key={x}><line x1={450} y1={68} x2={x} y2={160} stroke={K.red} strokeWidth={1.4} />{dev(x, 170, -90)}</g>)}
      <T x={450} y={220} size={10.5} color={K.muted}>{'broadcasts to every\ntransceiver in the room'}</T>
      <line x1={610} y1={20} x2={610} y2={250} stroke="#e2e8f0" />
      <T x={755} y={20} size={13} weight={800}>Diffused</T>
      <line x1={630} y1={50} x2={890} y2={50} stroke="#94a3b8" strokeWidth={3} />
      <T x={865} y={40} size={9.5} color={K.muted}>reflective ceiling</T>
      {[690, 740, 790, 840].map((x) => <line key={x} x1={665} y1={160} x2={x} y2={52} stroke={K.red} strokeWidth={1.2} opacity={0.7} />)}
      {[700, 760, 820].map((x) => <Arrow key={x} x1={x + 20} y1={52} x2={845} y2={160} color={K.red} width={1} head={6} />)}
      {dev(660, 170, -60)}{dev(850, 170, -120)}
      <T x={755} y={220} size={10.5} color={K.muted}>{'aim at ceiling, light bounces\nto everyone; no aiming'}</T>
    </Svg>
  );
}

function IrSpectrum() {
  const segs = [['Radio', 0, 220, '#bfdbfe'], ['Microwave (Wi-Fi 2.4/5 GHz)', 220, 220, '#a5f3fc'], ['Infrared 850–950 nm', 440, 150, '#fecaca'], ['Visible', 590, 90, 'url(#vis)'], ['UV', 680, 60, '#ddd6fe']];
  return (
    <Svg w={760} h={130} label="Infrared in the electromagnetic spectrum">
      <defs><linearGradient id="vis" x1="0" x2="1"><stop offset="0" stopColor="#ef4444" /><stop offset=".33" stopColor="#facc15" /><stop offset=".66" stopColor="#22c55e" /><stop offset="1" stopColor="#6366f1" /></linearGradient></defs>
      {segs.map(([l, x, w, c]) => <g key={l}><rect x={20 + x} y={30} width={w} height={40} fill={c} stroke="#fff" /><T x={20 + x + w / 2} y={50} size={10.5} weight={700}>{l}</T></g>)}
      <Arrow x1={20} y1={92} x2={760} y2={92} color={K.muted} width={1.4} />
      <T x={390} y={110} size={10.5} color={K.muted}>increasing frequency → (IR ≈ 300+ THz: unlicensed, blocked by walls)</T>
    </Svg>
  );
}

const irDiagrams = [
  { title: 'How infrared transmission works', caption: 'An LED flickers the data as invisible light; a photodiode in the receiver turns the light back into an electrical signal.', render: IrScene, wide: true },
  { title: 'Infrared LAN techniques', caption: 'Directed beam for point-to-point links, a ceiling base station for omnidirectional cells, or diffused light bouncing off the ceiling.', render: IrTechniques, wide: true },
  { title: 'Where infrared sits in the spectrum', caption: 'Above radio and microwaves, just below visible red light. That is why IR needs no licence and cannot pass through walls.', render: IrSpectrum, wide: true },
];

/* ---------------- Topic 5: Spread spectrum ---------------- */
function SpreadPsd() {
  return (
    <Svg w={620} h={260} label="Narrowband vs spread spectrum power">
      <Axes x={50} y={20} w={550} h={200} xl="Frequency" yl="Power" />
      <path d={fnPath((u) => 210 - 180 * Math.exp(-(((u - 0.2) / 0.025) ** 2)), 60, 0, 520, -1)} fill={light(K.cyan)} stroke={K.cyan} strokeWidth={2.5} />
      <path d={fnPath((u) => 210 - 48 * Math.exp(-(((u - 0.65) / 0.2) ** 4)), 60, 0, 520, -1)} fill={light(K.blue)} stroke={K.blue} strokeWidth={2.5} />
      <T x={160} y={22} size={11.5} weight={800} color={K.cyan}>Narrowband signal</T>
      <T x={398} y={140} size={11.5} weight={800} color={K.blue}>Spread spectrum signal</T>
      <T x={398} y={156} size={10} color={K.muted}>same energy, spread wide and low</T>
      <line x1={60} y1={196} x2={580} y2={196} stroke={K.red} strokeDasharray="4 4" /><T x={575} y={188} size={9.5} anchor="end" color={K.red}>noise level</T>
    </Svg>
  );
}

function FhssGrid() {
  const hops = [1, 4, 2, 5, 3, 0, 4, 1, 5, 2];
  return (
    <Svg w={600} h={270} label="FHSS hop pattern over time">
      <T x={300} y={14} size={11} weight={700}>Data bits 1 1 0 1 1 · hop sequence f1 → f4 → f2 → f5 …</T>
      <Axes x={60} y={26} w={520} h={210} xl="Time" yl="Frequency" />
      {Array.from({ length: 6 }, (_, r) => <g key={r}>{Array.from({ length: 10 }, (_, c) => <rect key={c} x={70 + c * 48} y={210 - r * 30} width={46} height={28} fill={hops[c] === r ? K.blue : '#f1f5f9'} stroke="#e2e8f0" opacity={hops[c] === r ? 0.85 : 1} />)}<T x={56} y={224 - r * 30} size={10} anchor="end" color={K.muted}>{`f${r}`}</T></g>)}
      <path d={hops.map((h, c) => `${c ? 'L' : 'M'}${94 + c * 48},${224 - h * 30}`).join(' ')} fill="none" stroke={K.amber} strokeWidth={1.6} strokeDasharray="4 3" />
    </Svg>
  );
}

function DsssDiagram() {
  const barker = [1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0];
  const bits = [1, 0];
  const W = 22;
  const row = (y, arr, color) => arr.map((b, i) => <rect key={i} x={110 + i * W} y={b ? y : y + 18} width={W - 1} height={b ? 18 : 4} fill={color} />);
  const chips = bits.flatMap((b) => barker.map((c) => (b === 1 ? c : 1 - c)));
  return (
    <Svg w={620} h={250} label="DSSS: data bits XOR Barker chips">
      <T x={10} y={44} size={11} weight={800} anchor="start">Data bits</T>
      {bits.map((b, k) => <g key={k}><rect x={110 + k * 11 * W} y={b ? 30 : 48} width={11 * W - 2} height={b ? 18 : 4} fill={K.amber} /><T x={110 + (k + 0.5) * 11 * W} y={22} size={11} weight={800} color={K.amber}>{b}</T></g>)}
      <T x={10} y={104} size={11} weight={800} anchor="start">⊕ Barker</T>
      {row(90, [...barker, ...barker], K.violet)}
      <T x={10} y={164} size={11} weight={800} anchor="start">= Chips sent</T>
      {row(150, chips, K.blue)}
      <T x={350} y={208} size={10.5} color={K.muted}>Each bit becomes 11 chips (11 Mchip/s for 1 Mbps) → 22 MHz wide signal</T>
      <T x={350} y={228} size={10.5} color={K.muted}>Receiver XORs with the same code to get the bit back; processing gain ≈ 10.4 dB</T>
    </Svg>
  );
}

const ssDiagrams = [
  { title: 'Understanding spread spectrum', caption: 'The same power spread over a wide band sits close to the noise level: hard to detect, hard to jam, and many users can share the band.', render: SpreadPsd },
  { title: 'Frequency-Hopping Spread Spectrum (FHSS)', caption: 'The carrier jumps between channels in a pseudo-random order known to both ends. Bluetooth makes 1600 hops per second.', render: FhssGrid },
  { title: 'Direct-Sequence Spread Spectrum (DSSS)', caption: 'Each data bit is combined with a fast chip code (here the 11-chip Barker code used by 802.11).', render: DsssDiagram, wide: true },
];

/* ---------------- Topic 6: Narrowband microwave ---------------- */
function NbPrinciple() {
  return (
    <Svg w={860} h={210} label="Narrowband radio working principle">
      <Box x={10} y={70} w={120} h={50} label={'Information\nsource'} tone="slate" />
      <Arrow x1={130} y1={95} x2={168} y2={95} color={K.ink} />
      <Box x={170} y={70} w={120} h={50} label={'Radio\ntransmitter'} tone="cyan" />
      <line x1={290} y1={95} x2={320} y2={95} stroke={K.ink} strokeWidth={2} />
      <path d="M320,95 V50 M308,40 L320,52 L332,40" fill="none" stroke={K.ink} strokeWidth={2.5} />
      <T x={320} y={132} size={10.5} weight={700}>antenna</T>
      <Wave fn={(u) => Math.sin(TAU * 7 * u)} x={350} y={50} w={160} amp={10} color={K.cyan} />
      <T x={430} y={26} size={11} weight={700} color={K.cyan}>radio signal (one narrow channel)</T>
      <path d="M540,95 V50 M528,40 L540,52 L552,40" fill="none" stroke={K.ink} strokeWidth={2.5} />
      <T x={540} y={132} size={10.5} weight={700}>{'receiving\nantenna'}</T>
      <line x1={540} y1={95} x2={570} y2={95} stroke={K.ink} strokeWidth={2} />
      <Box x={570} y={70} w={120} h={50} label={'Radio\nreceiver'} tone="cyan" />
      <Arrow x1={690} y1={95} x2={728} y2={95} color={K.ink} />
      <Box x={730} y={70} w={120} h={50} label="Destination" tone="violet" />
      <Arrow x1={290} y1={176} x2={10} y2={176} color={K.blue} width={1.5} both />
      <T x={150} y={194} size={10.5} color={K.blue}>encoding / modulation</T>
      <Arrow x1={570} y1={176} x2={850} y2={176} color={K.violet} width={1.5} both />
      <T x={710} y={194} size={10.5} color={K.violet}>demodulation / data recovery</T>
    </Svg>
  );
}

function NbSpectrum() {
  return (
    <Svg w={600} h={250} label="Narrowband channel among frequency channels">
      <Axes x={50} y={20} w={530} h={200} xl="Frequency" yl="Power" />
      {[0, 1, 2, 3, 4].map((i) => <path key={i} d={`M${80 + i * 95},220 C${100 + i * 95},120 ${150 + i * 95},120 ${170 + i * 95},220`} fill={light(K.cyan)} stroke={K.cyan} />)}
      <path d="M300,220 C312,30 318,30 330,220" fill={light(K.blue)} stroke={K.blue} strokeWidth={2.5} />
      <T x={430} y={60} size={11} weight={800} color={K.blue}>{'assigned narrowband\nchannel'}</T>
      <Arrow x1={392} y1={66} x2={330} y2={90} color={K.blue} width={1.4} head={6} />
      <T x={140} y={100} size={11} weight={700} color="#0e7490">frequency channels</T>
      <Arrow x1={300} y1={236} x2={330} y2={236} color={K.ink} width={1} head={5} both />
      <T x={315} y={248} size={9.5}>bandwidth</T>
    </Svg>
  );
}

const nbDiagrams = [
  { title: 'Working principle', caption: 'A conventional radio link: modulate onto one carrier, radiate, receive through a filter tuned to that channel, then demodulate.', render: NbPrinciple, wide: true },
  { title: 'Frequency and bandwidth', caption: 'The band is divided into channels; a narrowband system occupies one slice, so its receiver filter keeps out everything else.', render: NbSpectrum },
  {
    title: 'Licensed vs unlicensed narrowband',
    caption: 'Stallings’ two examples of narrowband microwave LANs.',
    render: () => (
      <Tiles items={[
        { icon: ShieldCheck, label: 'Licensed: Motorola ALTAIR', text: '18 GHz, exclusive frequency per area, interference-free' },
        { icon: Repeat, label: 'Unlicensed: RadioLAN', text: '5.8 GHz ISM, 10 Mbps, ~50 m, must coexist' },
        { icon: Gauge, label: 'Narrow bandwidth', text: 'Less noise, but a lower maximum data rate' },
        { icon: Activity, label: 'Interference', text: 'Anything inside the channel hits the whole signal' },
      ]} />
    ),
  },
];

/* ---------------- Topic 7: Bluetooth ---------------- */
function BtEcosystem() {
  const around = [[110, 70, 'Wireless earbuds', '🎧'], [650, 70, 'Smartwatch', '⌚'], [110, 220, 'Laptop', '💻'], [650, 220, 'Keyboard', '⌨️']];
  return (
    <Svg w={760} h={290} label="The Bluetooth ecosystem">
      {[50, 80, 110].map((r) => <circle key={r} cx={380} cy={145} r={r} fill="none" stroke={K.blue} opacity={0.25} />)}
      {around.map(([x, y, l, ic]) => (
        <g key={l}>
          <Arrow x1={380 + (x - 380) * 0.2} y1={145 + (y - 145) * 0.2} x2={x + (x < 380 ? 40 : -40)} y2={y} color={K.blue} width={1.8} both />
          <T x={x} y={y} size={36}>{ic}</T>
          <T x={x} y={y + 34} size={11.5} weight={800}>{l}</T>
        </g>
      ))}
      <rect x={358} y={105} width={44} height={80} rx={8} fill="#1d4ed8" />
      <rect x={363} y={112} width={34} height={60} rx={3} fill="#dbeafe" />
      <T x={380} y={142} size={22} weight={800} color="#1d4ed8">ᛒ</T>
      <T x={380} y={208} size={11.5} weight={800}>Smartphone (central)</T>
      <line x1={20} y1={276} x2={50} y2={276} stroke={K.blue} strokeWidth={2} /><T x={56} y={276} size={10.5} anchor="start" color={K.blue}>Bluetooth links (2.4 GHz, ~10 m)</T>
    </Svg>
  );
}

function PicoScatter() {
  const tag = { 'central (master)': 'C', 'central A': 'C', 'central B': 'C', peripheral: 'P', bridge: 'B' };
  const node = (x, y, label, c) => <g key={`${x}-${y}`}><circle cx={x} cy={y} r={16} fill={c} stroke="#fff" strokeWidth={2} /><T x={x} y={y + 0.5} size={11} weight={800} color="#fff">{tag[label]}</T></g>;
  const star = (cx, cy, pts, c) => pts.map(([x, y]) => <line key={`${x}${y}`} x1={cx} y1={cy} x2={x} y2={y} stroke={c} strokeWidth={1.8} />);
  const p1 = [[60, 170], [120, 210], [190, 210], [250, 170]];
  return (
    <Svg w={880} h={270} label="Bluetooth piconet and scatternet">
      <T x={155} y={18} size={13} weight={800}>Piconet</T>
      <ellipse cx={155} cy={150} rx={140} ry={100} fill={light(K.blue)} stroke={K.blue} strokeDasharray="6 4" />
      {star(155, 90, p1, K.blue)}
      {node(155, 90, 'central (master)', '#1d4ed8')}
      {p1.map(([x, y]) => node(x, y, 'peripheral', '#60a5fa'))}
      <T x={155} y={262} size={10.5} color={K.muted}>1 central + up to 7 active peripherals</T>
      <line x1={330} y1={20} x2={330} y2={260} stroke="#e2e8f0" />
      <T x={605} y={18} size={13} weight={800}>Scatternet</T>
      <ellipse cx={490} cy={150} rx={130} ry={95} fill={light(K.blue)} stroke={K.blue} strokeDasharray="6 4" />
      <ellipse cx={720} cy={150} rx={130} ry={95} fill={light(K.violet)} stroke={K.violet} strokeDasharray="6 4" />
      {star(470, 90, [[400, 180], [470, 210], [605, 150]], K.blue)}
      {star(740, 90, [[605, 150], [740, 210], [810, 180]], K.violet)}
      {node(470, 90, 'central A', '#1d4ed8')}
      {node(740, 90, 'central B', '#6d28d9')}
      {[[400, 180], [470, 210]].map(([x, y]) => node(x, y, 'peripheral', '#60a5fa'))}
      {[[740, 210], [810, 180]].map(([x, y]) => node(x, y, 'peripheral', '#a78bfa'))}
      {node(605, 150, 'bridge', K.amber)}
      <T x={605} y={262} size={10.5} color={K.muted}>a bridge device time-shares between two piconets</T>
      <T x={605} y={40} size={10} color={K.muted}>C = central (master) · P = peripheral (slave) · B = bridge</T>
    </Svg>
  );
}

const btDiagrams = [
  { title: 'The Bluetooth ecosystem', caption: 'The phone acts as the central device, keeping short, low-power links to personal accessories all around it.', render: BtEcosystem, wide: true },
  { title: 'Piconets and scatternets', caption: 'Bluetooth networking topologies. A piconet shares one hopping sequence set by its central; a device in two piconets links them into a scatternet.', render: PicoScatter, wide: true },
  {
    title: 'Bluetooth through the years',
    caption: 'From cable replacement to low-energy wearables and LE Audio.',
    wide: true,
    render: () => (
      <Timeline items={[
        { year: '1998', title: 'SIG founded', text: 'Ericsson, IBM, Intel, Nokia, Toshiba' },
        { year: '1999', title: 'Bluetooth 1.0', text: '1 Mbps, cable replacement' },
        { year: '2004', title: '2.0 + EDR', text: 'Up to 3 Mbps' },
        { year: '2007', title: '2.1 SSP', text: 'Secure Simple Pairing' },
        { year: '2010', title: '4.0 BLE', text: 'Low Energy for wearables' },
        { year: '2016', title: '5.0', text: '2 Mbps LE, long range' },
        { year: '2020', title: '5.2', text: 'LE Audio' },
        { year: '2024', title: '6.0', text: 'Channel sounding' },
      ]} />
    ),
  },
];

export default {
  'w5-wlan': introDiagrams,
  'w5-apps': appsDiagrams,
  'w5-req': reqDiagrams,
  'w5-ir': irDiagrams,
  'w5-ss': ssDiagrams,
  'w5-nb': nbDiagrams,
  'w5-bt': btDiagrams,
};
