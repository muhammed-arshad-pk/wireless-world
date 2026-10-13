import { Router, Wifi, Network, Laptop as LaptopIc, RadioTower, Cable, Globe, Tv, Phone as PhoneIc, Navigation, CloudSun, ScanEye, Mountain, Clock, Radio, SatelliteDish, Gauge, Compass, Timer } from 'lucide-react';
import { Svg, T, Box, Arrow, Tower, Phone, Laptop, Tablet, Router as RouterG, Sat, Dish, Axes, fnPath, Chain, Tiles, Timeline, K, USER_COLORS } from './kit';

const TAU = Math.PI * 2;
const light = (c) => `${c}22`;

/* ---------------- Topic 1: Networking fundamentals ---------------- */
function RangeRings() {
  const cx = 190;
  const cy = 150;
  const rings = [
    { r: 132, name: 'WWAN', text: 'Wide area · regional to global\n4G/5G cellular, satellite', c: K.amber },
    { r: 96, name: 'WMAN', text: 'Metropolitan · up to ~50 km\nWiMAX (802.16), city Wi-Fi', c: K.violet },
    { r: 62, name: 'WLAN', text: 'Local area · ~50–100 m\nWi-Fi (IEEE 802.11)', c: K.cyan },
    { r: 30, name: 'WPAN', text: 'Personal · ~10 m\nBluetooth, Zigbee, NFC', c: K.blue },
  ];
  return (
    <Svg w={600} h={300} label="Coverage of WPAN, WLAN, WMAN and WWAN">
      {rings.map((g) => <circle key={g.name} cx={cx} cy={cy} r={g.r} fill={light(g.c)} stroke={g.c} strokeWidth={1.5} />)}
      <Phone x={cx} y={cy} s={0.9} />
      {rings.map((g, i) => {
        const ly = 48 + (3 - i) * 64;
        const a = Math.atan2(ly - cy, 360 - cx);
        const px = cx + g.r * Math.cos(a);
        const py = cy + g.r * Math.sin(a);
        return (
          <g key={g.name}>
            <line x1={px} y1={py} x2={360} y2={ly} stroke={g.c} strokeWidth={1.2} strokeDasharray="4 3" />
            <circle cx={360} cy={ly} r={4} fill={g.c} />
            <T x={372} y={ly - 12} size={15} weight={800} anchor="start" color={g.c}>{g.name}</T>
            <T x={372} y={ly + 12} size={12} anchor="start" color={K.muted}>{g.text}</T>
          </g>
        );
      })}
    </Svg>
  );
}

function Topologies() {
  const dev = (x, y, k) => [<Laptop key={k} x={x} y={y} s={0.8} />, <Phone key={k} x={x} y={y} s={0.9} />, <Tablet key={k} x={x} y={y} s={0.8} />][k % 3];
  const link = (a, b, c = K.cyan) => <line key={`${a}-${b}`} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={c} strokeWidth={1.8} strokeDasharray="5 4" className="dash-path" />;
  const infra = [[60, 70], [240, 70], [60, 190], [240, 190]];
  const adhoc = [[380, 70], [540, 80], [400, 190], [530, 185]];
  const mesh = Array.from({ length: 6 }, (_, i) => [750 + 85 * Math.cos((i * TAU) / 6), 128 + 70 * Math.sin((i * TAU) / 6)]);
  return (
    <Svg w={900} h={260} label="Infrastructure, ad hoc and mesh topologies">
      {infra.map((p) => link(p, [150, 128]))}
      <RouterG x={150} y={134} waves={false} />
      {infra.map((p, k) => dev(p[0], p[1], k))}
      <T x={150} y={232} size={13} weight={800}>Infrastructure mode</T>
      <T x={150} y={250} size={10.5} color={K.muted}>all traffic goes through the access point</T>
      <line x1={300} y1={20} x2={300} y2={240} stroke="#e2e8f0" />
      {[[0, 1], [0, 2], [1, 3], [2, 3], [0, 3]].map(([a, b]) => link(adhoc[a], adhoc[b], K.violet))}
      {adhoc.map((p, k) => dev(p[0], p[1], k + 1))}
      <T x={460} y={232} size={13} weight={800}>Ad hoc (peer-to-peer)</T>
      <T x={460} y={250} size={10.5} color={K.muted}>devices talk directly, no AP (IBSS)</T>
      <line x1={610} y1={20} x2={610} y2={240} stroke="#e2e8f0" />
      {mesh.flatMap((p, i) => [link(p, mesh[(i + 1) % 6], K.green), i < 3 ? link(p, mesh[i + 3], K.green) : null])}
      {mesh.map((p, i) => <RouterG key={i}x={p[0]} y={p[1] + 6} s={0.7} waves={false} />)}
      <T x={750} y={232} size={13} weight={800}>Mesh network</T>
      <T x={750} y={250} size={10.5} color={K.muted}>multi-hop, reroutes if a node fails</T>
    </Svg>
  );
}

const netfundDiagrams = [
  { title: 'Types of wireless networks by coverage', caption: 'Wireless networks are classified by how far they reach. Each larger area needs more power, bigger antennas and usually licensed spectrum.', render: RangeRings },
  {
    title: 'Components of a wireless network',
    caption: 'The building blocks that appear in almost every wireless network.',
    render: () => (
      <Tiles items={[
        { icon: Router, label: 'Wireless router', text: 'Routes between LAN and internet, often with a built-in AP' },
        { icon: Wifi, label: 'Access point', text: 'Bridges wireless clients onto the wired LAN' },
        { icon: Network, label: 'Switch', text: 'Wired backbone joining APs and servers' },
        { icon: LaptopIc, label: 'Client device', text: 'Laptop, phone or IoT node with a wireless NIC' },
        { icon: RadioTower, label: 'Base station', text: 'Cellular cell site serving a wide area' },
        { icon: Cable, label: 'Wireless link', text: 'The radio channel: frequency, bandwidth, power' },
      ]} />
    ),
  },
  {
    title: 'Wireless network architecture',
    caption: 'Wired up to the access point, wireless for the last few metres to the user.',
    wide: true,
    render: () => (
      <Chain
        steps={[
          { label: 'Internet', sub: 'ISP network', icon: Globe, tone: 'slate' },
          { label: 'Router', sub: 'gateway, NAT, DHCP', icon: Router },
          { label: 'Wireless access point', sub: 'radio ↔ Ethernet bridge', icon: Wifi, tone: 'cyan' },
          { label: 'Laptop & smartphone', sub: 'wireless clients', icon: LaptopIc, tone: 'green' },
        ]}
        links={['arrow', 'arrow', 'air']}
      />
    ),
  },
  { title: 'Wireless network topologies', caption: 'Infrastructure mode is used at home and in offices. Ad hoc links are quick device-to-device connections. Mesh networks extend coverage hop by hop.', render: Topologies, wide: true },
];

/* ---------------- Topic 2: Satellite systems ---------------- */
function UplinkDownlink() {
  return (
    <Svg w={760} h={310} label="Uplink, transponder and downlink">
      <polygon points="380,92 150,262 610,262" fill={light(K.cyan)} />
      <path d="M0,310 L0,300 Q380,190 760,300 L760,310 Z" fill="#bfdbfe" stroke="#60a5fa" strokeWidth={1.5} />
      <Dish x={110} y={273} s={1.3} />
      <Dish x={650} y={273} s={1.3} flip />
      <Sat x={380} y={70} s={1.05} />
      <Arrow x1={128} y1={226} x2={344} y2={92} color={K.blue} width={3.5} dashed anim />
      <Arrow x1={416} y1={92} x2={632} y2={226} color={K.green} width={3.5} dashed anim />
      <T x={150} y={140} size={12.5} color={K.blue} weight={800}>Uplink</T>
      <T x={150} y={158} size={10.5} color={K.blue}>e.g. 6 GHz (C-band)</T>
      <T x={620} y={140} size={12.5} color={K.green} weight={800}>Downlink</T>
      <T x={620} y={158} size={10.5} color={K.green}>e.g. 4 GHz</T>
      <Box x={470} y={8} w={260} h={50} label={'Transponder: receive → amplify →\nshift frequency → retransmit'} tone="violet" size={11} />
      <line x1={470} y1={44} x2={404} y2={64} stroke={K.violet} strokeWidth={1.5} />
      <T x={380} y={238} size={11} color="#0e7490" weight={700}>Footprint (coverage area)</T>
      <T x={110} y={297} size={11} weight={700}>Earth station A (Tx)</T>
      <T x={650} y={297} size={11} weight={700}>Earth station B (Rx)</T>
    </Svg>
  );
}

const satsysDiagrams = [
  { title: 'How satellite communication works', caption: 'The satellite is a repeater in the sky. Uplink and downlink use different frequencies so the powerful retransmission does not drown the weak signal arriving from Earth.', render: UplinkDownlink, wide: true },
  {
    title: 'Types and applications',
    caption: 'One technology, many services.',
    render: () => (
      <Tiles items={[
        { icon: Tv, label: 'Broadcasting', text: 'DTH satellite TV and radio' },
        { icon: PhoneIc, label: 'Telecommunication', text: 'Trunk links, remote telephony' },
        { icon: Globe, label: 'Satellite internet', text: 'VSAT, LEO constellations' },
        { icon: Navigation, label: 'Navigation', text: 'GPS, NavIC, Galileo' },
        { icon: CloudSun, label: 'Weather monitoring', text: 'INSAT, cyclone tracking' },
        { icon: ScanEye, label: 'Remote sensing', text: 'Earth imaging, disaster mapping' },
      ]} />
    ),
  },
];

/* ---------------- Topic 3: Satellite parameters ---------------- */
function GeoCoverage() {
  const cx = 260;
  const cy = 168;
  const R = 58;
  const D = 138;
  const beta = Math.acos(R / D);
  return (
    <Svg w={520} h={330} label="Three geostationary satellites covering the Earth">
      <circle cx={cx} cy={cy} r={D} fill="none" stroke="#94a3b8" strokeDasharray="6 5" />
      {[-90, 30, 150].map((deg, i) => {
        const a = (deg * Math.PI) / 180;
        const sx = cx + D * Math.cos(a);
        const sy = cy + D * Math.sin(a);
        const t1 = [cx + R * Math.cos(a - beta), cy + R * Math.sin(a - beta)];
        const t2 = [cx + R * Math.cos(a + beta), cy + R * Math.sin(a + beta)];
        return (
          <g key={deg}>
            <polygon points={`${sx},${sy} ${t1} ${t2}`} fill={light(USER_COLORS[i])} stroke={USER_COLORS[i]} strokeWidth={1} />
            <Sat x={sx} y={sy} s={0.55} rot={deg + 90} />
            <T x={sx + (deg === -90 ? 50 : deg === 30 ? 10 : -10)} y={sy + (deg === -90 ? 0 : 30)} size={11} weight={800} color={USER_COLORS[i]}>{`GEO-${i + 1}`}</T>
          </g>
        );
      })}
      <circle cx={cx} cy={cy} r={R} fill="#3b82f6" stroke="#1d4ed8" strokeWidth={2} />
      <ellipse cx={cx} cy={cy} rx={R} ry={10} fill="none" stroke="#bfdbfe" strokeWidth={1} />
      <path d={`M${cx - 30},${cy - 30} q15,-10 30,0 q10,10 22,2 M${cx - 36},${cy + 18} q14,10 30,4`} fill="none" stroke="#86efac" strokeWidth={5} strokeLinecap="round" />
      <T x={cx} y={cy + 4} size={12} weight={800} color="#fff">Earth</T>
      <T x={512} y={30} size={10.5} color={K.muted} anchor="end">{'Geostationary orbit\n35,786 km above equator\nperiod = 23 h 56 min'}</T>
      <T x={cx} y={318} size={10.5} color={K.muted} italic>Each GEO satellite sees ~42% of Earth: three 120° apart cover all but the poles (not to scale)</T>
    </Svg>
  );
}

const paramDiagrams = [
  { title: 'Global coverage with three GEO satellites', caption: 'Arthur C. Clarke’s 1945 idea: three geostationary satellites spaced 120° apart can relay signals almost anywhere on Earth. Above about 81° latitude the satellites sit below the horizon.', render: GeoCoverage },
  {
    title: 'Key satellite parameters',
    caption: 'The numbers engineers check when designing a satellite link.',
    render: () => (
      <Tiles items={[
        { icon: Mountain, label: 'Altitude', text: 'LEO 500–2,000 km · MEO ~20,000 km · GEO 35,786 km' },
        { icon: Clock, label: 'Orbital period', text: 'LEO ~90–120 min · GEO 23 h 56 min (Kepler’s 3rd law)' },
        { icon: Globe, label: 'Coverage / footprint', text: 'Higher orbit → bigger footprint, fewer satellites' },
        { icon: Radio, label: 'Frequency band', text: 'C 6/4 GHz · Ku 14/12 GHz · Ka 30/20 GHz' },
        { icon: SatelliteDish, label: 'Antenna beam', text: 'Global, zone or spot beams (frequency reuse)' },
        { icon: Gauge, label: 'Transponder capacity', text: 'Typically 36 MHz or 72 MHz per transponder' },
        { icon: Compass, label: 'Elevation & look angle', text: 'Where to point the dish; low elevation = more loss' },
        { icon: Timer, label: 'Propagation delay', text: 'GEO: ~120 ms one hop up, ~240 ms Earth-to-Earth' },
      ]} />
    ),
  },
];

/* ---------------- Topic 4: FDMA ---------------- */
function FdmaGrid() {
  return (
    <Svg w={560} h={290} label="FDMA: each user has its own frequency band for all time">
      <Axes x={70} y={20} w={450} h={230} xl="Time →" yl="Frequency ↑" />
      {[0, 1, 2, 3].map((k) => {
        const y = 210 - k * 50;
        return (
          <g key={k}>
            <rect x={80} y={y} width={380} height={36} rx={6} fill={light(USER_COLORS[k])} stroke={USER_COLORS[k]} strokeWidth={1.5} />
            <T x={270} y={y + 18} size={12} weight={800} color={USER_COLORS[k]}>{`User ${k + 1}  ·  carrier f${k + 1}`}</T>
            {k < 3 && <rect x={80} y={y - 14} width={380} height={14} fill="url(#hatch)" />}
          </g>
        );
      })}
      <defs><pattern id="hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="8" stroke="#cbd5e1" strokeWidth="3" /></pattern></defs>
      <Arrow x1={500} y1={118} x2={466} y2={104} color={K.red} width={1.5} head={6} />
      <T x={502} y={130} size={10.5} color={K.red} weight={700}>guard band</T>
      <T x={70} y={278} size={10.5} color={K.muted} anchor="start">Each user transmits continuously, but only inside its own frequency slice.</T>
    </Svg>
  );
}

function SatFdma() {
  const st = [110, 280, 450];
  const hump = (x, w, h) => `M${x},${120} C${x + w * 0.15},${120 - h} ${x + w * 0.85},${120 - h} ${x + w},${120}`;
  return (
    <Svg w={560} h={300} label="Earth stations sharing a transponder by frequency">
      <Sat x={280} y={34} s={0.75} rot={0} />
      <rect x={160} y={70} width={240} height={60} rx={8} fill="#fff" stroke="#cbd5e1" />
      {st.map((_, k) => <path key={k} d={hump(176 + k * 74, 60, 40)} fill={light(USER_COLORS[k])} stroke={USER_COLORS[k]} strokeWidth={2} />)}
      <T x={280} y={142} size={10} color={K.muted}>transponder bandwidth (e.g. 36 MHz) split into f1 | f2 | f3</T>
      <line x1={0} y1={280} x2={560} y2={280} stroke="#94a3b8" />
      {st.map((x, k) => (
        <g key={x}>
          <Dish x={x} y={280} s={1.1} flip={k === 2} />
          <Arrow x1={x + (k === 2 ? -13 : 13)} y1={240} x2={206 + k * 74} y2={150} color={USER_COLORS[k]} width={2.5} dashed anim />
          <T x={x} y={294} size={11} weight={800} color={USER_COLORS[k]}>{`Station ${'ABC'[k]} → f${k + 1}`}</T>
        </g>
      ))}
    </Svg>
  );
}

const fdmaDiagrams = [
  { title: 'How FDMA works', caption: 'Frequency is divided and time is shared continuously. Guard bands stop neighbouring channels from leaking into each other.', render: FdmaGrid },
  { title: 'FDMA on a satellite transponder', caption: 'Each earth station is given its own carrier frequency inside the transponder. Many carriers in one amplifier cause intermodulation, which is why the power amplifier is backed off.', render: SatFdma },
];

/* ---------------- Topic 5: TDMA ---------------- */
function TdmaFrame() {
  const slotW = 92;
  const gap = 8;
  const frameW = 4 * (slotW + gap);
  const x0 = 60;
  const seg = [['Guard\ntime', 60, 'slate'], ['Preamble /\nsync', 130, 'amber'], ['Address &\ncontrol', 110, 'violet'], ['User data (payload)', 240, 'blue'], ['Guard\ntime', 60, 'slate']];
  let sx = 150;
  return (
    <Svg w={900} h={300} label="TDMA frame structure and slot detail">
      {[0, 1].map((f) => (
        <g key={f}>
          <path d={`M${x0 + f * frameW},34 v-8 h${frameW - gap} v8`} fill="none" stroke={K.muted} />
          <T x={x0 + f * frameW + (frameW - gap) / 2} y={16} size={12} weight={800}>{`Frame ${f + 1}`}</T>
          {[0, 1, 2, 3].map((k) => <Box key={k} x={x0 + f * frameW + k * (slotW + gap)} y={42} w={slotW} h={38} label={`User ${k + 1}`} tone={['blue', 'cyan', 'violet', 'slate'][k]} />)}
        </g>
      ))}
      <Arrow x1={x0} y1={96} x2={x0 + 2 * frameW} y2={96} color={K.muted} width={1.5} />
      <T x={x0 + 2 * frameW + 4} y={96} size={11} color={K.muted} anchor="start">time</T>
      <line x1={x0 + slotW + gap} y1={80} x2={150} y2={160} stroke="#94a3b8" strokeDasharray="4 3" />
      <line x1={x0 + 2 * slotW + gap} y1={80} x2={750} y2={160} stroke="#94a3b8" strokeDasharray="4 3" />
      {seg.map(([l, w, tone], i) => { const el = <Box key={i}x={sx} y={160} w={w} h={50} label={l} tone={tone} size={11} r={2} />; sx += w; return el; })}
      <T x={450} y={232} size={11.5} weight={700}>Inside one time slot (one burst)</T>
      <T x={450} y={256} size={10.5} color={K.muted}>Guard time absorbs timing and propagation-delay differences so bursts never overlap.</T>
      <T x={450} y={274} size={10.5} color={K.muted}>The preamble lets the receiver synchronise (lock carrier and bit timing) to each new burst.</T>
    </Svg>
  );
}

function TdmaBursts() {
  return (
    <Svg w={620} h={290} label="Earth stations send bursts in their own slots">
      {[0, 1, 2, 3].map((k) => {
        const y = 40 + k * 62;
        return (
          <g key={k}>
            <Box x={10} y={y - 16} w={84} h={32} label={`Station ${'ABCD'[k]}`} tone={['blue', 'cyan', 'violet', 'slate'][k]} size={11} />
            <rect x={110} y={y - 12} width={200} height={24} rx={4} fill="#f8fafc" stroke="#e2e8f0" />
            {[0, 1, 2, 3].map((s) => <rect key={s} x={112 + s * 49.5} y={y - 10} width={46} height={20} rx={3} fill={s === k ? USER_COLORS[k] : 'transparent'} />)}
            <Arrow x1={316} y1={y} x2={500} y2={112} color={USER_COLORS[k]} width={1.8} dashed />
          </g>
        );
      })}
      <T x={210} y={14} size={10.5} color={K.muted}>each transmits only in its slot</T>
      <Sat x={540} y={94} s={0.7} rot={0} />
      <rect x={430} y={190} width={184} height={34} rx={6} fill="#fff" stroke="#cbd5e1" />
      {[0, 1, 2, 3].map((s) => <rect key={s} x={434 + s * 44.5} y={194} width={41} height={26} rx={3} fill={USER_COLORS[s]} />)}
      <Arrow x1={540} y1={130} x2={522} y2={186} color={K.ink} width={1.5} />
      <T x={522} y={246} size={10.5} color={K.ink} weight={700}>{'Frame at the satellite:\nbursts interleave, no overlap'}</T>
    </Svg>
  );
}

const tdmaDiagrams = [
  { title: 'TDMA frame and slot structure', caption: 'All users share one carrier, taking turns in fixed time slots that repeat every frame. Each slot also carries overhead (guard, preamble, address), which costs some efficiency.', render: TdmaFrame, wide: true },
  { title: 'Time-slot allocation on a satellite', caption: 'Only one carrier is in the transponder at a time, so the amplifier can run at full power with no intermodulation. That is TDMA’s big advantage over FDMA.', render: TdmaBursts },
];

/* ---------------- Topic 6: Cellular & 1G ---------------- */
function hexPath(cx, cy, R) {
  return Array.from({ length: 6 }, (_, i) => { const a = ((60 * i - 90) * Math.PI) / 180; return `${i ? 'L' : 'M'}${cx + R * Math.cos(a)},${cy + R * Math.sin(a)}`; }).join(' ') + 'Z';
}

function CellArchitecture() {
  const R = 46;
  const c = [170, 152];
  const cells = [c, ...Array.from({ length: 6 }, (_, i) => { const a = (60 * i * Math.PI) / 180; return [c[0] + Math.sqrt(3) * R * Math.cos(a), c[1] + Math.sqrt(3) * R * Math.sin(a)]; })];
  return (
    <Svg w={640} h={310} label="Cells, base stations, MSC and PSTN">
      {cells.map(([x, y], i) => <path key={i} d={hexPath(x, y, R)} fill={i ? '#f8fafc' : '#eff6ff'} stroke="#93c5fd" strokeWidth={1.5} />)}
      {[0, 1, 2].map((i) => <line key={i} x1={cells[i][0]} y1={cells[i][1] - 18} x2={440} y2={120} stroke="#94a3b8" strokeWidth={1.3} strokeDasharray="5 4" />)}
      {cells.map(([x, y], i) => <Tower key={i} x={x} y={y + 8} h={26} waves={false} />)}
      <Phone x={198} y={190} s={0.75} />
      <Box x={440} y={92} w={180} h={56} label={'MSC\nMobile Switching Center'} tone="violet" />
      <Arrow x1={530} y1={148} x2={530} y2={210} color={K.ink} both />
      <Box x={440} y={212} w={180} h={44} label="PSTN / Internet" tone="slate" />
      <T x={170} y={18} size={11} color={K.muted}>cell = area served by one base station</T>
      <T x={250} y={232} size={10.5} color={K.blue} weight={700} anchor="start">mobile station</T>
      <T x={530} y={60} size={10.5} color={K.muted}>{'controls calls, handoff,\nbilling, location (HLR/VLR)'}</T>
      <T x={330} y={292} size={10.5} color={K.muted}>Base stations connect to the MSC by wired or microwave backhaul</T>
    </Svg>
  );
}

function HandoffPlot() {
  const yA = (u) => 150 + 105 * Math.pow(u, 0.7);
  const yB = (u) => 150 + 105 * Math.pow(1 - u, 0.7);
  const uH = 0.62;
  return (
    <Svg w={640} h={310} label="Handoff based on signal strength">
      <line x1={0} y1={112} x2={640} y2={112} stroke="#94a3b8" />
      <Tower x={70} y={112} h={60} />
      <Tower x={570} y={112} h={60} />
      <T x={70} y={20} size={12} weight={800} color={K.blue}>BS A</T>
      <T x={570} y={20} size={12} weight={800} color={K.violet}>BS B</T>
      <Phone x={300} y={88} s={0.8} />
      <Arrow x1={180} y1={88} x2={440} y2={88} color={K.ink} width={1.5} dashed />
      <T x={310} y={62} size={10.5} color={K.muted}>mobile moving from cell A to cell B</T>
      <Axes x={60} y={130} w={560} h={140} xl="position of mobile →" yl="received signal strength" />
      <path d={fnPath(yA, 70, 0, 520, -1)} fill="none" stroke={K.blue} strokeWidth={2.5} />
      <path d={fnPath(yB, 70, 0, 520, -1)} fill="none" stroke={K.violet} strokeWidth={2.5} />
      <line x1={70} y1={238} x2={590} y2={238} stroke={K.red} strokeDasharray="6 4" strokeWidth={1.3} />
      <T x={588} y={248} size={10} color={K.red} anchor="end">minimum usable level</T>
      <line x1={70 + uH * 520} y1={140} x2={70 + uH * 520} y2={270} stroke={K.green} strokeWidth={2} strokeDasharray="4 3" />
      <T x={70 + uH * 520 + 6} y={160} size={10.5} color={K.green} weight={700} anchor="start">{'handoff: B stronger\nthan A by margin Δ'}</T>
      <T x={140} y={148} size={10.5} color={K.blue} weight={700}>signal from A</T>
      <T x={545} y={148} size={10.5} color={K.violet} weight={700}>signal from B</T>
      <T x={320} y={296} size={10.5} color={K.muted}>The margin (hysteresis) stops “ping-pong” handoffs near the cell edge.</T>
    </Svg>
  );
}

const cellularDiagrams = [
  { title: 'Cellular network architecture', caption: 'The area is tiled with cells, each with its own base station. The MSC ties the base stations together and connects calls to the public telephone network.', render: CellArchitecture },
  { title: 'Handoff between cells', caption: 'As the mobile moves, the signal from A fades and the signal from B grows. The network switches the call when B is clearly better. Try it in the visualizer below.', render: HandoffPlot },
];

/* ---------------- Topic 7: 2G / 3G ---------------- */
function AccessCubes() {
  const P = (i) => i * 300;
  const area = (x) => ({ x: x + 60, y: 40, w: 200, h: 160 });
  const axes = (x) => <><Axes x={x + 50} y={30} w={225} h={180} xl="Time" yl="Freq" /></>;
  return (
    <Svg w={900} h={270} label="FDMA, TDMA and CDMA compared on time-frequency axes">
      {/* FDMA */}
      {axes(P(0))}
      {[0, 1, 2, 3].map((k) => { const a = area(P(0)); return <Box key={k} x={a.x} y={a.y + k * 40 + 2} w={a.w} h={34} label={`User ${4 - k}`} tone={['slate', 'violet', 'cyan', 'blue'][k]} size={11} r={3} />; })}
      <T x={P(0) + 160} y={240} size={13} weight={800}>FDMA</T>
      <T x={P(0) + 160} y={258} size={10.5} color={K.muted}>separate frequencies</T>
      {/* TDMA */}
      {axes(P(1))}
      {[0, 1, 2, 3].map((k) => { const a = area(P(1)); return <Box key={k} x={a.x + k * 50 + 2} y={a.y} w={46} h={a.h} label={`U${k + 1}`} tone={['blue', 'cyan', 'violet', 'slate'][k]} size={11} r={3} />; })}
      <T x={P(1) + 160} y={240} size={13} weight={800}>TDMA</T>
      <T x={P(1) + 160} y={258} size={10.5} color={K.muted}>separate time slots</T>
      {/* CDMA */}
      {axes(P(2))}
      {[2, 1, 0].map((k) => {
        const a = area(P(2));
        const x = a.x + k * 20;
        const y = a.y - k * 20 + 40;
        return (
          <g key={k}>
            <rect x={x} y={y} width={a.w - 40} height={a.h - 40} rx={4} fill={k ? light(USER_COLORS[k]) : '#dbeafe'} stroke={USER_COLORS[k]} strokeWidth={1.5} />
            {k ? <T x={x + a.w - 46} y={y + 10} size={10.5} weight={800} color={USER_COLORS[k]} anchor="end">{`code ${k + 1}`}</T>
              : <T x={x + (a.w - 40) / 2} y={y + (a.h - 40) / 2} size={11} weight={800} color={USER_COLORS[0]}>{'code 1\n(all users overlap)'}</T>}
          </g>
        );
      })}
      <T x={P(2) + 160} y={240} size={13} weight={800}>CDMA</T>
      <T x={P(2) + 160} y={258} size={10.5} color={K.muted}>same time and band, separate codes</T>
    </Svg>
  );
}

function GsmGrid() {
  const cols = 16;
  const rows = 5;
  const cw = 29;
  const ch = 30;
  const x0 = 80;
  const y0 = 46;
  const on = (r, c) => (r === 2 && c % 8 === 2 ? 0 : r === 0 && c % 8 === 5 ? 2 : null);
  return (
    <Svg w={600} h={290} label="GSM combines FDMA carriers with 8 TDMA slots">
      {[0, 1].map((f) => <T key={f} x={x0 + f * 8 * cw + 4 * cw} y={20} size={11.5} weight={800}>{`TDMA frame ${f + 1} (8 slots ≈ 4.615 ms)`}</T>)}
      {Array.from({ length: rows }, (_, r) => (
        <g key={r}>
          <T x={x0 - 10} y={y0 + r * ch + ch / 2} size={10.5} anchor="end" color={K.muted}>{`carrier f${rows - r}`}</T>
          {Array.from({ length: cols }, (_, c) => {
            const u = on(r, c);
            return <rect key={c} x={x0 + c * cw} y={y0 + r * ch} width={cw - 2} height={ch - 2} rx={3} fill={u === null ? '#f1f5f9' : USER_COLORS[u]} stroke={u === null ? '#e2e8f0' : 'none'} />;
          })}
        </g>
      ))}
      {Array.from({ length: cols }, (_, c) => <T key={c} x={x0 + c * cw + cw / 2 - 1} y={y0 + rows * ch + 10} size={8.5} color={K.muted}>{`TS${c % 8}`}</T>)}
      <line x1={x0 + 8 * cw - 1} y1={y0 - 6} x2={x0 + 8 * cw - 1} y2={y0 + rows * ch + 4} stroke={K.ink} strokeWidth={2} />
      <Arrow x1={x0 + cols * cw + 8} y1={y0 + 2.5 * ch} x2={x0 + cols * cw + 8} y2={y0 + 1.6 * ch} color={K.muted} width={1} head={5} />
      <T x={x0 + cols * cw + 14} y={y0 + 2.5 * ch} size={9.5} color={K.muted} anchor="start">200 kHz</T>
      <rect x={x0} y={232} width={14} height={14} rx={3} fill={USER_COLORS[0]} /><T x={x0 + 20} y={239} size={10.5} anchor="start">User X: carrier f3, slot 2 in every frame</T>
      <rect x={x0} y={256} width={14} height={14} rx={3} fill={USER_COLORS[2]} /><T x={x0 + 20} y={263} size={10.5} anchor="start">User Y: carrier f5, slot 5 in every frame</T>
    </Svg>
  );
}

const genDiagrams = [
  {
    title: 'Evolution of mobile networks: 1G to 3G',
    caption: 'Each generation changed the access method and what users could do.',
    wide: true,
    render: () => (
      <Timeline items={[
        { year: '1G · 1980s', title: 'Analog voice', text: 'AMPS, NMT, TACS. FM voice, FDMA, no encryption.' },
        { year: '2G · 1991', title: 'Digital voice + SMS', text: 'GSM (TDMA) and IS-95 (CDMA). Encrypted, ~9.6–14.4 kbps.' },
        { year: '2.5G · 2000', title: 'Packet data', text: 'GPRS (~114 kbps) and EDGE (~384 kbps). Always-on data.' },
        { year: '3G · 2001', title: 'Mobile broadband', text: 'UMTS/WCDMA, CDMA2000. 384 kbps–2 Mbps, video calls.' },
        { year: '3.5G · 2006', title: 'HSPA', text: 'HSDPA/HSUPA, up to ~14 Mbps down. Bridge to 4G LTE.' },
      ]} />
    ),
  },
  { title: 'FDMA vs TDMA vs CDMA', caption: 'Three ways to share the same radio resource. FDMA slices frequency, TDMA slices time, and CDMA lets everyone overlap and separates them with orthogonal codes.', render: AccessCubes, wide: true },
  { title: 'GSM: FDMA and TDMA together', caption: 'GSM first divides its band into 200 kHz carriers (FDMA), then divides each carrier into 8 time slots (TDMA). A call owns one slot on one carrier.', render: GsmGrid },
];

export default {
  'w2-netfund': netfundDiagrams,
  'w2-satsys': satsysDiagrams,
  'w2-orbits': paramDiagrams,
  'w2-fdma': fdmaDiagrams,
  'w2-tdma': tdmaDiagrams,
  'w2-cellular': cellularDiagrams,
  'w2-cdma': genDiagrams,
};
