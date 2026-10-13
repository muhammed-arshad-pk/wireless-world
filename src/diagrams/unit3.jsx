import { Binary, Cpu, Waves, Laptop as LaptopIc, Router as RouterIc, Network, Smartphone, FileText, Lightbulb, Eye, Microwave, Bluetooth, Wifi, Phone as PhoneIc, BrickWall, Users } from 'lucide-react';
import { Svg, T, Box, Arrow, Phone, Laptop, Tablet, Router, Cloud, Axes, fnPath, Chain, Tiles, Timeline, K, USER_COLORS } from './kit';

const light = (c) => `${c}22`;

/* ---------------- Topic 1: Evolution ---------------- */
function Mimo() {
  const ys = [60, 105, 150, 195];
  return (
    <Svg w={600} h={260} label="MIMO: several spatial streams on one channel">
      <Box x={8} y={104} w={70} h={42} label={'Data\nstream'} tone="slate" />
      {ys.map((y, i) => <Arrow key={`s${y}`} x1={78} y1={125} x2={124} y2={y} color={USER_COLORS[i]} width={1.5} head={6} />)}
      <rect x={130} y={36} width={40} height={184} rx={8} fill="#f1f5f9" stroke="#cbd5e1" />
      <rect x={450} y={36} width={40} height={184} rx={8} fill="#f1f5f9" stroke="#cbd5e1" />
      {ys.flatMap((a) => ys.map((b) => <line key={`${a}-${b}`} x1={170} y1={a} x2={450} y2={b} stroke="#e2e8f0" strokeWidth={1} />))}
      {ys.map((y, i) => (
        <g key={y}>
          <line x1={170} y1={y} x2={450} y2={y} stroke={USER_COLORS[i]} strokeWidth={3} className="dash-path" strokeDasharray="8 6" />
          <circle cx={160} cy={y} r={6} fill={USER_COLORS[i]} />
          <circle cx={460} cy={y} r={6} fill={USER_COLORS[i]} />
          <T x={310} y={y - 10} size={10} color={USER_COLORS[i]} weight={700}>{`stream ${i + 1}`}</T>
        </g>
      ))}
      <T x={150} y={238} size={11} weight={800}>AP (4 antennas)</T>
      <T x={470} y={238} size={11} weight={800}>Client (4 antennas)</T>
      <Box x={510} y={104} w={84} h={42} label={'Combined\n4× data'} tone="green" />
      {ys.map((y) => <line key={`r${y}`} x1={466} y1={y} x2={510} y2={125} stroke="#94a3b8" strokeWidth={1} />)}
      <T x={310} y={16} size={10.5} color={K.muted}>same channel, same time: the receiver separates streams using the channel matrix (grey paths)</T>
    </Svg>
  );
}

const evolutionDiagrams = [
  {
    title: 'IEEE 802.11 through the years',
    caption: 'Speeds are theoretical maximums. Each step added a new physical-layer idea: OFDM, MIMO, wider channels, MU-MIMO, OFDMA and multi-link operation.',
    wide: true,
    render: () => (
      <Timeline items={[
        { year: '1997', title: '802.11', text: '2 Mbps · 2.4 GHz · FHSS, DSSS, IR' },
        { year: '1999', title: '802.11b', text: '11 Mbps · 2.4 GHz · DSSS/CCK' },
        { year: '1999', title: '802.11a', text: '54 Mbps · 5 GHz · OFDM' },
        { year: '2003', title: '802.11g', text: '54 Mbps · 2.4 GHz · OFDM' },
        { year: '2009', title: '802.11n · Wi-Fi 4', text: '600 Mbps · MIMO, 40 MHz' },
        { year: '2013', title: '802.11ac · Wi-Fi 5', text: '~6.9 Gbps · 5 GHz, MU-MIMO, 160 MHz' },
        { year: '2019', title: '802.11ax · Wi-Fi 6/6E', text: '9.6 Gbps · OFDMA, busy areas, 6 GHz' },
        { year: '2024', title: '802.11be · Wi-Fi 7', text: '~46 Gbps · 320 MHz, multi-link' },
      ]} />
    ),
  },
  { title: 'MIMO: the idea behind Wi-Fi 4 onwards', caption: 'Multiple antennas at both ends send independent spatial streams on the same frequency at the same time. Throughput scales with the number of streams.', render: Mimo },
];

/* ---------------- Topic 2: Introduction ---------------- */
function WlanComponents() {
  return (
    <Svg w={680} h={270} label="Components of a WLAN">
      <Cloud x={62} y={134} label="Internet" />
      <line x1={92} y1={136} x2={170} y2={136} stroke={K.ink} strokeWidth={2.5} />
      <Router x={205} y={142} waves={false} />
      <T x={205} y={168} size={11} weight={700}>Router</T>
      <line x1={226} y1={136} x2={320} y2={136} stroke={K.ink} strokeWidth={2.5} />
      <Router x={350} y={142} />
      <T x={350} y={168} size={11} weight={700}>{'Wireless\naccess point'}</T>
      {[[540, 60, 'Laptop'], [556, 140, 'Smartphone'], [540, 218, 'Tablet']].map(([x, y, l]) => (
        <g key={l}>
          <Arrow x1={378} y1={130} x2={x - 34} y2={y} color={K.cyan} width={2} dashed anim />
          {l === 'Laptop' ? <Laptop x={x} y={y} /> : l === 'Tablet' ? <Tablet x={x} y={y} /> : <Phone x={x} y={y} />}
          <T x={x + 52} y={y} size={11} weight={700} anchor="start">{l}</T>
        </g>
      ))}
      <line x1={20} y1={238} x2={50} y2={238} stroke={K.ink} strokeWidth={2.5} /><T x={58} y={238} size={10.5} anchor="start">Wired connection</T>
      <line x1={20} y1={256} x2={50} y2={256} stroke={K.cyan} strokeWidth={2} strokeDasharray="6 5" /><T x={58} y={256} size={10.5} anchor="start" color={K.cyan}>Wireless connection</T>
    </Svg>
  );
}

function Ieee802Stack() {
  const osi = ['Application', 'Presentation', 'Session', 'Transport', 'Network'];
  return (
    <Svg w={580} h={300} label="IEEE 802 layers mapped to the OSI model">
      <T x={115} y={10} size={11} weight={800} color={K.muted}>OSI model</T>
      <T x={385} y={10} size={11} weight={800} color={K.muted}>IEEE 802 reference model</T>
      {osi.map((l, k) => <Box key={l} x={30} y={20 + k * 34} w={170} h={30} label={l} tone="slate" size={11} />)}
      <Box x={30} y={190} w={170} h={64} label="Data link" tone="blue" size={11} />
      <Box x={30} y={258} w={170} h={30} label="Physical" tone="cyan" size={11} />
      <Box x={260} y={20} w={250} h={166} label={'Upper-layer protocols\n(IP, TCP/UDP, applications)'} tone="slate" size={11} dashed />
      <Box x={260} y={190} w={250} h={30} label="LLC: Logical Link Control (802.2)" tone="blue" size={10.5} />
      <Box x={260} y={224} w={250} h={30} label="MAC: 802.11 (CSMA/CA, DCF/PCF)" tone="violet" size={10.5} />
      <Box x={260} y={258} w={250} h={30} label="PHY: 802.11 a/b/g/n/ac/ax/be" tone="cyan" size={10.5} />
      <path d="M520,224 h10 v64 h-10" fill="none" stroke={K.violet} strokeWidth={2} />
      <T x={552} y={256} size={10.5} color={K.violet} weight={800}>{'802.11\nscope'}</T>
      {[205, 239, 273].map((y) => <line key={y} x1={200} y1={y} x2={260} y2={y} stroke="#cbd5e1" strokeDasharray="3 3" />)}
    </Svg>
  );
}

const introDiagrams = [
  { title: 'Components of a WLAN', caption: 'The access point is the bridge: wired on one side (to the router and the internet) and radio on the other (to every wireless client).', render: WlanComponents, wide: true },
  { title: 'Where IEEE 802.11 fits', caption: '802.11 defines only the bottom two pieces, MAC and PHY. Above the LLC, Wi-Fi looks like any other LAN, which is why IP runs over it unchanged.', render: Ieee802Stack, wide: true },
];

/* ---------------- Topic 3: General description ---------------- */
function EssDiagram() {
  const bss = [190, 570];
  const st = [[-75, 40], [0, 70], [75, 40]];
  return (
    <Svg w={760} h={320} label="Extended Service Set: two BSSs joined by a distribution system">
      <rect x={10} y={56} width={740} height={256} rx={18} fill="none" stroke="#94a3b8" strokeDasharray="8 6" />
      <T x={380} y={300} size={12} weight={800} color={K.muted}>Extended Service Set (ESS)</T>
      <line x1={190} y1={86} x2={570} y2={86} stroke={K.ink} strokeWidth={5} />
      <T x={380} y={100} size={11} weight={800}>Distribution System (DS), usually Ethernet</T>
      <line x1={380} y1={86} x2={380} y2={44} stroke={K.ink} strokeWidth={2.5} />
      <Box x={290} y={8} w={180} h={36} label="Portal → 802.3 LAN / Internet" tone="amber" size={11} />
      {bss.map((x, b) => (
        <g key={x}>
          <ellipse cx={x} cy={190} rx={150} ry={86} fill={light(b ? K.violet : K.blue)} stroke={b ? K.violet : K.blue} strokeWidth={1.5} strokeDasharray="6 4" />
          <line x1={x} y1={86} x2={x} y2={132} stroke={K.ink} strokeWidth={2.5} />
          <Router x={x} y={146} s={0.9} waves={false} />
          <T x={x + 40} y={140} size={10.5} weight={800} anchor="start">{`AP ${b + 1}`}</T>
          {st.map(([dx, dy], k) => (
            <g key={k}>
              <line x1={x} y1={152} x2={x + dx} y2={190 + dy - 18} stroke={K.cyan} strokeWidth={1.6} strokeDasharray="5 4" className="dash-path" />
              {k === 1 ? <Phone x={x + dx} y={190 + dy} s={0.8} /> : k === 0 ? <Laptop x={x + dx} y={190 + dy} s={0.7} /> : <Tablet x={x + dx} y={190 + dy} s={0.7} />}
            </g>
          ))}
          <T x={x + (b ? 110 : -110)} y={196} size={12} weight={800} color={b ? K.violet : K.blue}>{`BSS ${b + 1}`}</T>
        </g>
      ))}
    </Svg>
  );
}

const generalDiagrams = [
  { title: 'IEEE 802.11 architecture: BSS, DS and ESS', caption: 'A BSS is one AP and its stations. Several BSSs joined by a distribution system form an ESS, which looks like one LAN to the layers above. The portal connects it to other networks.', render: EssDiagram, wide: true },
  {
    title: 'A frame crossing the ESS',
    caption: 'Station A in BSS 1 sends to station B in BSS 2. The distribution service carries the frame between the two APs.',
    wide: true,
    render: () => (
      <Chain
        steps={[
          { label: 'Station A', sub: 'in BSS 1', icon: LaptopIc, tone: 'blue' },
          { label: 'AP 1', sub: 'associated AP', icon: RouterIc, tone: 'cyan' },
          { label: 'Distribution system', sub: 'wired backbone', icon: Network, tone: 'amber' },
          { label: 'AP 2', sub: 'B’s current AP', icon: RouterIc, tone: 'cyan' },
          { label: 'Station B', sub: 'in BSS 2', icon: Smartphone, tone: 'violet' },
        ]}
        links={['air', 'arrow', 'arrow', 'air']}
      />
    ),
  },
];

/* ---------------- Topic 4: MAC ---------------- */
function RtsCts() {
  const lanes = [['Source', 60], ['Destination', 130], ['Other stations', 200]];
  const fr = [['RTS', 170, 230, 0, 'blue'], ['CTS', 250, 310, 1, 'violet'], ['DATA', 330, 560, 0, 'blue'], ['ACK', 580, 640, 1, 'violet']];
  const gaps = [['DIFS', 130, 170], ['SIFS', 230, 250], ['SIFS', 310, 330], ['SIFS', 560, 580], ['DIFS', 640, 690]];
  return (
    <Svg w={900} h={250} label="RTS/CTS exchange with NAV">
      {lanes.map(([l, y]) => <g key={l}><T x={10} y={y} size={12} weight={800} anchor="start">{l}</T><line x1={125} y1={y} x2={890} y2={y} stroke="#e2e8f0" strokeWidth={2} /></g>)}
      {gaps.map(([l, a, b], i) => <g key={i}><path d={`M${a},28 v-6 h${b - a} v6`} fill="none" stroke={K.muted} /><T x={(a + b) / 2} y={12} size={9.5} color={K.muted} weight={700}>{l}</T></g>)}
      {fr.map(([l, a, b, lane, tone]) => <Box key={l} x={a} y={lanes[lane][1] - 15} w={b - a} h={30} label={l} tone={tone} size={11.5} r={3} />)}
      <Box x={230} y={178} w={410} h={16} label="NAV (set by RTS)" tone="amber" size={10} r={2} />
      <Box x={310} y={198} w={330} h={16} label="NAV (set by CTS)" tone="red" size={10} r={2} />
      {Array.from({ length: 6 }, (_, i) => <rect key={i} x={700 + i * 20} y={192} width={16} height={16} rx={2} fill="none" stroke={K.green} />)}
      <T x={760} y={176} size={9.5} color={K.green} weight={700}>backoff slots</T>
      <T x={450} y={240} size={10.5} color={K.muted}>Stations that hear either the RTS or the CTS stay silent for the whole exchange. That solves the hidden-node problem.</T>
    </Svg>
  );
}

function CsmaFlow() {
  const cx = 200;
  const box = (y, label, tone = 'blue', w = 230) => <Box x={cx - w / 2} y={y} w={w} h={40} label={label} tone={tone} size={12.5} />;
  const diamond = (y, label) => (
    <g>
      <polygon points={`${cx},${y} ${cx + 95},${y + 30} ${cx},${y + 60} ${cx - 95},${y + 30}`} fill="#fffbeb" stroke="#fcd34d" strokeWidth={1.5} />
      <T x={cx} y={y + 30} size={12.5} weight={700} color="#b45309">{label}</T>
    </g>
  );
  return (
    <Svg w={520} h={540} label="CSMA/CA flowchart">
      <Box x={cx - 80} y={8} w={160} h={34} label="Frame ready to send" tone="slate" size={11} r={17} />
      <Arrow x1={cx} y1={42} x2={cx} y2={62} color={K.ink} />
      {box(62, 'Sense the medium (carrier sense)')}
      <Arrow x1={cx} y1={102} x2={cx} y2={122} color={K.ink} />
      {diamond(122, 'Idle for DIFS?')}
      <line x1={cx + 95} y1={152} x2={420} y2={152} stroke={K.ink} strokeWidth={2} />
      <T x={330} y={142} size={10.5} weight={700} color={K.red}>No (busy)</T>
      <Box x={360} y={66} w={130} h={40} label={'Wait until\nmedium is idle'} tone="red" size={10.5} />
      <Arrow x1={420} y1={152} x2={420} y2={108} color={K.ink} />
      <Arrow x1={360} y1={82} x2={312} y2={82} color={K.ink} />
      <Arrow x1={cx} y1={182} x2={cx} y2={204} color={K.ink} />
      <T x={cx + 18} y={192} size={10.5} weight={700} color={K.green}>Yes</T>
      {box(204, 'Choose random backoff\n0 … CW slots')}
      <Arrow x1={cx} y1={244} x2={cx} y2={264} color={K.ink} />
      {box(264, 'Count down while idle\n(freeze while busy)')}
      <Arrow x1={cx} y1={304} x2={cx} y2={324} color={K.ink} />
      {box(324, 'Transmit frame', 'violet')}
      <Arrow x1={cx} y1={364} x2={cx} y2={384} color={K.ink} />
      {diamond(384, 'ACK received?')}
      <Arrow x1={cx} y1={444} x2={cx} y2={470} color={K.ink} />
      <T x={cx + 18} y={456} size={10.5} weight={700} color={K.green}>Yes</T>
      {box(470, 'Success: reset CW to CWmin', 'green')}
      <line x1={cx + 95} y1={414} x2={420} y2={414} stroke={K.ink} strokeWidth={2} />
      <T x={330} y={404} size={10.5} weight={700} color={K.red}>No</T>
      <Box x={350} y={300} w={150} h={52} label={'Double CW (binary\nexponential backoff),\nretry'} tone="amber" size={10.5} />
      <line x1={420} y1={414} x2={420} y2={352} stroke={K.ink} strokeWidth={2} />
      <path d="M425,300 V224 H312" fill="none" stroke={K.ink} strokeWidth={2} />
      <Arrow x1={330} y1={224} x2={312} y2={224} color={K.ink} />
    </Svg>
  );
}

function DcfPcf() {
  return (
    <Svg w={560} h={240} label="802.11 MAC: PCF on top of DCF on top of PHY">
      <T x={170} y={14} size={10.5} color={K.muted} weight={700}>contention-free service</T>
      <T x={420} y={14} size={10.5} color={K.muted} weight={700}>contention service</T>
      <Arrow x1={170} y1={22} x2={170} y2={46} color={K.muted} width={1.5} head={6} />
      <Arrow x1={420} y1={22} x2={420} y2={112} color={K.muted} width={1.5} head={6} />
      <Box x={60} y={48} w={240} h={56} label={'Point Coordination Function\n(PCF): AP polls stations'} tone="violet" size={13} />
      <Box x={60} y={114} w={480} h={56} label={'Distributed Coordination Function (DCF)\nCSMA/CA with random backoff, used by every station'} tone="blue" size={13} />
      <Box x={60} y={180} w={480} h={40} label="Physical layer: FHSS · DSSS · OFDM · IR" tone="cyan" size={13} />
      <path d="M48,48 h-10 v122 h10" fill="none" stroke={K.ink} strokeWidth={1.5} />
      <T x={20} y={110} size={11} weight={800}>MAC</T>
    </Svg>
  );
}

const macDiagrams = [
  { title: 'CSMA/CA: listen, wait, back off, then talk', caption: 'Wireless stations cannot detect collisions while transmitting, so 802.11 avoids them: wait for an idle DIFS, add a random backoff, and treat a missing ACK as a collision.', render: CsmaFlow, tall: true },
  { title: 'MAC architecture: DCF and PCF', caption: 'DCF is the basic contention-based access used by everyone. PCF is an optional polling service built on top of it for time-sensitive traffic.', render: DcfPcf },
  { title: 'RTS / CTS / DATA / ACK exchange', caption: 'Short inter-frame spaces (SIFS) give the exchange priority. The Network Allocation Vector (NAV) is a virtual carrier sense that tells everyone else how long the medium is reserved.', render: RtsCts, wide: true },
];

/* ---------------- Topic 5: Physical layer ---------------- */
function ChannelWidths() {
  const rows = [[20, ['36', '40', '44', '48', '52', '56', '60', '64'], '×1'], [40, ['38', '46', '54', '62'], '×2.1'], [80, ['42', '58'], '×4.5'], [160, ['50'], '×9']];
  const x0 = 100;
  const W = 400;
  return (
    <Svg w={600} h={270} label="Channel bonding in 5 GHz: 20, 40, 80 and 160 MHz">
      <T x={x0 + W / 2} y={14} size={11} color={K.muted} weight={700}>5 GHz channels 36–64 (UNII-1/2)</T>
      <T x={555} y={14} size={10.5} color={K.muted} weight={700}>data rate</T>
      {rows.map(([mhz, ch, rate], r) => {
        const y = 32 + r * 54;
        const bw = W / ch.length;
        return (
          <g key={mhz}>
            <T x={x0 - 14} y={y + 19} size={12} weight={800} anchor="end">{`${mhz} MHz`}</T>
            {ch.map((c, i) => <Box key={c} x={x0 + i * bw + 2} y={y} w={bw - 4} h={38} label={`ch ${c}`} tone={['blue', 'cyan', 'violet', 'green'][r]} size={10.5} r={5} />)}
            <T x={555} y={y + 19} size={13} weight={800} color={USER_COLORS[r]}>{rate}</T>
          </g>
        );
      })}
      <T x={300} y={256} size={10.5} color={K.muted}>Wider channel → more subcarriers → higher speed, but fewer non-overlapping channels (more interference risk).</T>
    </Svg>
  );
}

function OfdmSubcarriers() {
  const sinc = (t) => (Math.abs(t) < 1e-6 ? 1 : Math.sin(Math.PI * t) / (Math.PI * t));
  const x0 = 50;
  const W = 500;
  const lo = -2;
  const hi = 8;
  const X = (t) => x0 + ((t - lo) / (hi - lo)) * W;
  return (
    <Svg w={600} h={270} label="OFDM orthogonal subcarriers">
      <Axes x={x0} y={20} w={W + 20} h={190} xl="frequency →" />
      {Array.from({ length: 7 }, (_, k) => (
        <g key={k}>
          <path d={fnPath((u) => 150 * sinc(lo + u * (hi - lo) - k), x0, 180, W, 1, 400)} fill="none" stroke={USER_COLORS[k]} strokeWidth={1.8} />
          <line x1={X(k)} y1={30} x2={X(k)} y2={210} stroke={USER_COLORS[k]} strokeDasharray="3 4" strokeWidth={1} opacity={0.6} />
          <circle cx={X(k)} cy={30} r={3.5} fill={USER_COLORS[k]} />
        </g>
      ))}
      <Arrow x1={X(2)} y1={222} x2={X(3)} y2={222} color={K.ink} width={1.3} head={6} both />
      <T x={(X(2) + X(3)) / 2} y={236} size={10.5} weight={700}>Δf = 312.5 kHz</T>
      <T x={300} y={258} size={10.5} color={K.muted}>Each subcarrier peaks exactly where all the others are zero, so they overlap without interfering.</T>
    </Svg>
  );
}

const phyDiagrams = [
  {
    title: 'How wireless transmission works',
    caption: 'The PHY turns MAC frames into radio waves and back: scrambling, error-correction coding, modulation and the RF front end.',
    wide: true,
    render: () => (
      <Chain
        steps={[
          { label: 'Digital data', sub: '1010…', icon: Binary, tone: 'slate' },
          { label: 'Transmitter', sub: 'FEC coding, modulation (DSSS / OFDM)', icon: Cpu },
          { label: 'Radio waves', sub: '2.4 / 5 / 6 GHz', icon: Waves, tone: 'amber' },
          { label: 'Receiver', sub: 'demodulate, decode, correct', icon: Cpu },
          { label: 'Digital data', sub: '1010…', icon: Binary, tone: 'green' },
        ]}
        links={['arrow', 'air', 'air', 'arrow']}
      />
    ),
  },
  { title: 'OFDM: many narrow subcarriers', caption: '802.11a/g/n/ac split a channel into many slow, closely spaced subcarriers (64 per 20 MHz). Slow symbols resist multipath echoes, and orthogonality removes the need for guard bands.', render: OfdmSubcarriers },
  { title: 'Channels and bandwidth (channel bonding)', caption: 'Bonding adjacent 20 MHz channels gives 40, 80 or 160 MHz (320 MHz in Wi-Fi 7). The 2.4 GHz 1/6/11 plan is in the visualizer below.', render: ChannelWidths },
];

/* ---------------- Topic 6: Radio systems ---------------- */
function PropagationEffects() {
  return (
    <Svg w={640} h={306} label="Reflection, absorption, diffraction and scattering indoors">
      <line x1={0} y1={24} x2={640} y2={24} stroke="#94a3b8" strokeWidth={3} />
      <T x={600} y={14} size={10} color={K.muted}>ceiling</T>
      <line x1={0} y1={280} x2={640} y2={280} stroke="#94a3b8" strokeWidth={3} />
      <rect x={300} y={120} width={26} height={160} fill="#fca5a5" stroke="#b91c1c" strokeWidth={1.5} />
      {Array.from({ length: 8 }, (_, i) => <line key={i} x1={300} y1={130 + i * 20} x2={326} y2={130 + i * 20} stroke="#b91c1c" strokeWidth={1} />)}
      <T x={313} y={296} size={10} color="#b91c1c" weight={700}>wall</T>
      <Router x={70} y={176} />
      <Laptop x={570} y={200} />
      {/* reflection */}
      <polyline points="84,160 240,26" fill="none" stroke={K.blue} strokeWidth={2.2} />
      <Arrow x1={240} y1={26} x2={548} y2={186} color={K.blue} width={2.2} />
      <T x={150} y={70} size={11} weight={800} color={K.blue} anchor="start">Reflection</T>
      {/* absorption */}
      <line x1={92} y1={182} x2={300} y2={210} stroke={K.red} strokeWidth={3} />
      <Arrow x1={326} y1={213} x2={540} y2={204} color={K.red} width={1.2} dashed />
      <T x={430} y={226} size={11} weight={800} color={K.red}>{'Absorption\n(weaker after wall)'}</T>
      {/* diffraction */}
      <line x1={90} y1={170} x2={313} y2={120} stroke={K.violet} strokeWidth={2.2} />
      {[16, 30, 44].map((r) => <path key={r} d={`M${313 + r},120 A${r},${r} 0 0 1 ${313},${120 + r}`} fill="none" stroke={K.violet} strokeWidth={1.6} transform={`translate(13 0)`} />)}
      <T x={372} y={178} size={11} weight={800} color={K.violet} anchor="start">{'Diffraction\n(bends around edges)'}</T>
      {/* scattering */}
      <line x1={78} y1={190} x2={170} y2={246} stroke={K.green} strokeWidth={2.2} />
      <circle cx={180} cy={256} r={16} fill="#bbf7d0" stroke={K.green} strokeWidth={1.5} />
      {[[-140, 0], [-60, 0], [-20, 0], [200, 0]].map(([deg]) => { const a = (deg * Math.PI) / 180; return <Arrow key={deg} x1={180 + 18 * Math.cos(a)} y1={256 + 18 * Math.sin(a)} x2={180 + 42 * Math.cos(a)} y2={256 + 42 * Math.sin(a)} color={K.green} width={1.4} head={5} />; })}
      <T x={170} y={296} size={11} weight={800} color={K.green}>Scattering (rough / small objects)</T>
    </Svg>
  );
}

const radioDiagrams = [
  { title: 'Signal propagation indoors', caption: 'A Wi-Fi signal rarely takes one clean path. It reflects off ceilings, is absorbed by walls, diffracts around edges and scatters off furniture. Higher frequencies (5/6 GHz) lose more through walls than 2.4 GHz.', render: PropagationEffects, wide: true },
  {
    title: 'Sources of interference and signal loss',
    caption: 'Interference, obstacles, distance and congestion all reduce link quality. The visualizer below lets you place an AP and see the coverage.',
    render: () => (
      <Tiles items={[
        { icon: Microwave, label: 'Microwave ovens', text: 'Leak energy at ~2.45 GHz, right inside the Wi-Fi band' },
        { icon: Bluetooth, label: 'Bluetooth', text: 'Hops across the same 2.4 GHz ISM band' },
        { icon: Wifi, label: 'Neighbouring Wi-Fi', text: 'Co-channel and adjacent-channel interference' },
        { icon: PhoneIc, label: 'Cordless phones', text: 'Baby monitors and wireless cameras too' },
        { icon: BrickWall, label: 'Walls, metal, water', text: 'Absorb and reflect: concrete, mirrors, fish tanks, people' },
        { icon: Users, label: 'Distance & congestion', text: 'Weaker signal plus more devices competing for airtime' },
      ]} />
    ),
  },
];

/* ---------------- Topic 7: Infrared ---------------- */
function IrLinks() {
  const tx = (x, y, rot = 0) => <g transform={`rotate(${rot} ${x} ${y})`}><rect x={x - 16} y={y - 10} width={32} height={20} rx={4} fill="#334155" /><circle cx={x + 16} cy={y} r={5} fill={K.red} /></g>;
  const rx = (x, y, rot = 0) => <g transform={`rotate(${rot} ${x} ${y})`}><rect x={x - 16} y={y - 10} width={32} height={20} rx={4} fill="#334155" /><rect x={x - 21} y={y - 6} width={6} height={12} rx={2} fill="#1e293b" stroke="#94a3b8" /></g>;
  return (
    <Svg w={900} h={260} label="Directed, non-directed and diffuse infrared links">
      {/* directed */}
      <polygon points="76,130 250,122 250,138" fill="#fecaca" />
      <line x1={76} y1={130} x2={250} y2={130} stroke={K.red} strokeWidth={2} className="dash-path" strokeDasharray="6 6" />
      {tx(60, 130)}{rx(270, 130)}
      <T x={150} y={40} size={13} weight={800}>Directed line-of-sight</T>
      <T x={150} y={196} size={10.5} color={K.muted}>{'narrow beam, must be aimed\nhighest rate (TV remote, IrDA)'}</T>
      <line x1={300} y1={20} x2={300} y2={240} stroke="#e2e8f0" />
      {/* non-directed */}
      <polygon points="378,130 560,70 560,190" fill="#fee2e2" />
      {[-20, -8, 4, 16].map((d) => <line key={d} x1={378} y1={130} x2={560} y2={130 + d * 3} stroke={K.red} strokeWidth={1.2} opacity={0.7} />)}
      {tx(362, 130)}{rx(570, 146, 10)}
      <T x={460} y={40} size={13} weight={800}>Non-directed line-of-sight</T>
      <T x={460} y={210} size={10.5} color={K.muted}>{'wide beam, no precise aiming\nstill needs a clear path'}</T>
      <line x1={610} y1={20} x2={610} y2={240} stroke="#e2e8f0" />
      {/* diffuse */}
      <line x1={620} y1={64} x2={890} y2={64} stroke="#94a3b8" strokeWidth={3} />
      <T x={860} y={54} size={10} color={K.muted}>ceiling</T>
      {[700, 740, 780].map((cx) => <g key={cx}><line x1={668} y1={168} x2={cx} y2={66} stroke={K.red} strokeWidth={1.6} /><Arrow x1={cx} y1={66} x2={826} y2={160} color={K.red} width={1.2} head={6} /></g>)}
      {[750, 800].map((cx) => <Arrow key={cx} x1={cx} y1={66} x2={cx + 20} y2={110} color="#fca5a5" width={1} head={5} />)}
      {tx(660, 180, -70)}{rx(840, 176, 70)}
      <T x={750} y={30} size={13} weight={800}>Diffuse (reflected)</T>
      <T x={750} y={218} size={10.5} color={K.muted}>{'bounces off ceiling/walls, no aiming\nworks around people, lower rate'}</T>
    </Svg>
  );
}

const irDiagrams = [
  {
    title: 'How an infrared system works',
    caption: 'IR links use light, not radio, so there is no spectrum licence and no leakage through walls. The receiver filters out ambient light by listening for a modulated carrier (often 38 kHz).',
    wide: true,
    render: () => (
      <Chain
        steps={[
          { label: 'Information', sub: 'key press, data', icon: FileText, tone: 'slate' },
          { label: 'Encoder + modulator', sub: 'e.g. 38 kHz carrier', icon: Cpu },
          { label: 'IR LED / laser', sub: '850–950 nm', icon: Lightbulb, tone: 'red' },
          { label: 'Infrared light', sub: 'invisible to the eye', icon: Eye, tone: 'amber' },
          { label: 'Photodetector', sub: 'photodiode → current', icon: Cpu, tone: 'violet' },
          { label: 'Demodulator + decoder', sub: 'recovers the data', icon: Cpu },
          { label: 'Information', sub: 'action / data out', icon: FileText, tone: 'green' },
        ]}
        links={['arrow', 'arrow', 'air', 'air', 'arrow', 'arrow']}
      />
    ),
  },
  { title: 'Types of infrared transmission', caption: 'The trade-off is aiming versus speed. Narrow directed beams are fast but need alignment, while diffuse links need no aiming but suffer multipath and lower rates.', render: IrLinks, wide: true },
];

export default {
  'w3-evolution': evolutionDiagrams,
  'w3-modes': introDiagrams,
  'w3-ess': generalDiagrams,
  'w3-csma': macDiagrams,
  'w3-phy': phyDiagrams,
  'w3-heatmap': radioDiagrams,
  'w3-ir': irDiagrams,
};
