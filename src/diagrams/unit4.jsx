import { Smartphone, RadioTower, Server, Globe, Router as RouterIc, Monitor, House, MapPin, User, Cpu, Code2, Layers, Network } from 'lucide-react';
import { Svg, T, Box, Arrow, Phone, Laptop, Router, Cloud, Tower, Chain, Tiles, Timeline, K, USER_COLORS } from './kit';

const light = (c) => `${c}22`;
const Badge = ({ x, y, n, c = K.blue }) => (
  <g><circle cx={x} cy={y} r={11} fill={c} /><T x={x} y={y + 0.5} size={11} weight={800} color="#fff">{n}</T></g>
);
const Zone = ({ x, y, w, h, label, c }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} rx={14} fill={light(c)} stroke={c} strokeWidth={1.5} strokeDasharray="6 4" />
    <T x={x + w / 2} y={y + 16} size={12} weight={800} color={c}>{label}</T>
  </g>
);
const ServerG = ({ x, y }) => (
  <g>{[0, 1, 2].map((i) => <g key={i}><rect x={x - 16} y={y - 24 + i * 15} width={32} height={13} rx={2} fill="#334155" /><circle cx={x + 10} cy={y - 17.5 + i * 15} r={2} fill="#4ade80" /></g>)}</g>
);

/* ---------------- Topic 1: Introduction ---------------- */
function MobilityProblem() {
  return (
    <Svg w={780} h={300} label="Why plain IP breaks when a device moves">
      <Cloud x={390} y={58} label="Internet" />
      <T x={478} y={50} size={10.5} color={K.muted} anchor="start">routers forward by network prefix</T>
      <Zone x={20} y={120} w={240} h={150} label="Home network 10.1.0.0/16" c={K.blue} />
      <Zone x={520} y={120} w={240} h={150} label="Foreign network 172.16.5.0/24" c={K.violet} />
      <Router x={140} y={175} waves={false} />
      <Router x={640} y={175} waves={false} />
      <line x1={360} y1={70} x2={240} y2={120} stroke={K.red} strokeWidth={2.5} />
      <line x1={420} y1={70} x2={540} y2={120} stroke="#cbd5e1" strokeWidth={2} />
      <T x={210} y={86} size={10.5} color={K.red} weight={700}>{'packets for 10.1.0.25\nstill go to home'}</T>
      <g opacity={0.35}><Laptop x={140} y={228} /></g>
      <T x={140} y={258} size={10.5} color={K.muted}>was here: 10.1.0.25</T>
      <T x={170} y={212} size={22}>❌</T>
      <Laptop x={640} y={228} />
      <T x={640} y={258} size={10.5} color={K.violet} weight={700}>now here</T>
      <Arrow x1={190} y1={232} x2={590} y2={232} color={K.ink} dashed width={1.6} />
      <T x={390} y={220} size={11} weight={700}>device moves</T>
      <Box x={290} y={250} w={200} h={44} label={'Keep old IP → unreachable\nTake new IP → connections break'} tone="red" size={10.5} />
    </Svg>
  );
}

function IdLoc() {
  return (
    <Svg w={720} h={230} label="An IP address is both identifier and locator">
      <Box x={20} y={85} w={170} h={56} label={'IP address\n10.1.0.25'} tone="slate" size={13} />
      <Arrow x1={190} y1={102} x2={258} y2={62} color={K.ink} />
      <Arrow x1={190} y1={124} x2={258} y2={168} color={K.ink} />
      <Box x={260} y={34} w={170} h={56} label={'Identifier: WHO\nused by TCP & apps'} tone="cyan" size={11.5} />
      <Box x={260} y={140} w={170} h={56} label={'Locator: WHERE\nused by routers'} tone="amber" size={11.5} />
      <Arrow x1={430} y1={62} x2={500} y2={62} color={K.green} width={2.5} />
      <Arrow x1={430} y1={168} x2={500} y2={168} color={K.green} width={2.5} />
      <Box x={502} y={34} w={200} h={56} label={'Home address\npermanent (never changes)'} tone="blue" size={11.5} />
      <Box x={502} y={140} w={200} h={56} label={'Care-of address\ntemporary (changes on move)'} tone="violet" size={11.5} />
      <T x={600} y={16} size={11} color={K.green} weight={800}>Mobile IP splits the two jobs</T>
      <T x={345} y={118} size={10.5} color={K.muted}>plain IP: one address, both jobs</T>
    </Svg>
  );
}

const introDiagrams = [
  { title: 'The mobility problem', caption: 'Routers deliver by prefix, so a moved device keeping 10.1.0.25 is unreachable. Taking a new address breaks every open connection. Mobile IP solves both.', render: MobilityProblem, wide: true },
  { title: 'Identifier vs locator', caption: 'The root cause: one address does two jobs. Mobile IP gives each job its own address.', render: IdLoc, wide: true },
  {
    title: 'Mobile devices moving between networks',
    caption: 'One permanent identity, many temporary locations.',
    wide: true,
    render: () => (
      <Chain
        steps={[
          { label: 'Home network', sub: 'home address 10.1.0.25', icon: House, tone: 'blue' },
          { label: 'Café Wi-Fi', sub: 'CoA 172.16.5.1', icon: MapPin, tone: 'violet' },
          { label: 'Campus LAN', sub: 'CoA 192.168.30.1', icon: MapPin, tone: 'violet' },
          { label: 'Cellular data', sub: 'CoA 100.64.7.9', icon: RadioTower, tone: 'violet' },
          { label: 'Correspondents', sub: 'always use 10.1.0.25', icon: Monitor, tone: 'green' },
        ]}
      />
    ),
  },
];

/* ---------------- Topic 2: Operation ---------------- */
function OperationFlow() {
  return (
    <Svg w={900} h={320} label="Operation of Mobile IP in seven steps">
      <Zone x={200} y={95} w={200} h={135} label="Home network" c={K.blue} />
      <Zone x={560} y={95} w={320} h={135} label="Foreign network" c={K.violet} />
      <Laptop x={70} y={165} />
      <T x={70} y={198} size={11} weight={700}>Correspondent</T>
      <Router x={300} y={170} waves={false} />
      <T x={300} y={198} size={11} weight={800} color={K.blue}>Home Agent</T>
      <Router x={640} y={170} />
      <T x={640} y={198} size={11} weight={800} color={K.violet}>Foreign Agent</T>
      <Phone x={820} y={165} s={1.1} />
      <T x={820} y={198} size={11} weight={700}>Mobile Node</T>
      <Arrow x1={98} y1={160} x2={276} y2={160} color={K.cyan} width={2.5} />
      <T x={185} y={148} size={10} color={K.cyan} weight={700}>to home address</T>
      <rect x={326} y={150} width={290} height={20} rx={10} fill={light(K.pink)} stroke={K.pink} />
      <line x1={330} y1={160} x2={612} y2={160} stroke={K.pink} strokeWidth={3} strokeDasharray="8 6" className="dash-path" />
      <rect x={455} y={153} width={22} height={14} rx={2} fill="#fde68a" stroke={K.amber} />
      <Arrow x1={662} y1={160} x2={804} y2={160} color={K.green} width={2.5} />
      <path d="M640,220 C600,262 360,262 300,220" fill="none" stroke={K.violet} strokeWidth={2} strokeDasharray="5 4" />
      <path d="M820,215 C820,312 70,312 70,215" fill="none" stroke={K.amber} strokeWidth={2} strokeDasharray="2 4" />
      <Badge x={260} y={60} n={1} />
      <T x={276} y={60} size={10.5} anchor="start">MN leaves its home network</T>
      <Badge x={640} y={60} n={2} />
      <T x={656} y={60} size={10.5} anchor="start">MN hears the FA’s advertisement</T>
      <Badge x={730} y={130} n={3} c={K.violet} />
      <T x={746} y={130} size={10.5} anchor="start">gets a care-of address</T>
      <Badge x={420} y={238} n={4} c={K.violet} />
      <T x={436} y={238} size={10.5} anchor="start" color={K.violet}>registers CoA with HA</T>
      <Badge x={470} y={130} n={5} c={K.pink} />
      <T x={486} y={130} size={10.5} anchor="start" color={K.pink}>HA tunnels to CoA</T>
      <Badge x={735} y={182} n={6} c={K.green} />
      <Badge x={430} y={298} n={7} c={K.amber} />
      <T x={446} y={298} size={10.5} anchor="start" color={K.amber}>MN replies directly to CN (triangle)</T>
    </Svg>
  );
}

function Encapsulation() {
  const row = (y, segs) => {
    let x = 30;
    return segs.map(([l, w, tone]) => { const el = <Box key={l + y} x={x} y={y} w={w} h={44} label={l} tone={tone} size={11} r={4} />; x += w + 4; return el; });
  };
  return (
    <Svg w={760} h={260} label="IP-in-IP encapsulation">
      <T x={20} y={18} size={11.5} weight={800} anchor="start">Original packet from CN</T>
      {row(30, [['IP header\nsrc CN · dst HoA', 200, 'cyan'], ['Payload (TCP/UDP data)', 260, 'slate']])}
      <Arrow x1={160} y1={80} x2={160} y2={112} color={K.pink} width={2} />
      <T x={176} y={96} size={10.5} anchor="start" color={K.pink} weight={700}>Home agent encapsulates (IP-in-IP, protocol 4, +20 bytes)</T>
      <T x={20} y={120} size={11.5} weight={800} anchor="start">Tunnelled packet HA → CoA</T>
      {row(132, [['Outer IP header\nsrc HA · dst CoA', 200, 'red'], ['Inner IP header\nsrc CN · dst HoA', 200, 'cyan'], ['Payload', 180, 'slate']])}
      <Arrow x1={160} y1={182} x2={160} y2={212} color={K.green} width={2} />
      <T x={176} y={197} size={10.5} anchor="start" color={K.green} weight={700}>Tunnel exit (FA or MN) strips the outer header → original packet delivered</T>
      <T x={380} y={244} size={10.5} color={K.muted}>The inner packet is untouched, so the MN sees a normal packet addressed to its home address.</T>
    </Svg>
  );
}

const operationDiagrams = [
  { title: 'Operation of Mobile IP flow', caption: 'Steps 1–4 set things up (discovery and registration). Steps 5–7 move data: tunnelled in, then the reply goes directly back, forming the triangle.', render: OperationFlow, wide: true },
  { title: 'Tunnelling and encapsulation', caption: 'The home agent wraps the original packet inside a new one addressed to the care-of address. Routers on the way only read the outer header.', render: Encapsulation, wide: true },
  {
    title: 'The four important operations',
    caption: 'Every Mobile IP exchange is built from these four.',
    wide: true,
    render: () => (
      <Chain
        steps={[
          { label: 'Agent discovery', sub: 'advertisement / solicitation', icon: RadioTower, tone: 'amber' },
          { label: 'Registration', sub: 'request + reply, UDP 434', icon: Network, tone: 'violet' },
          { label: 'Tunnelling', sub: 'HA encapsulates to CoA', icon: Layers, tone: 'red' },
          { label: 'Packet delivery', sub: 'tunnel end decapsulates', icon: Smartphone, tone: 'green' },
        ]}
      />
    ),
  },
];

/* ---------------- Topic 3: Terminology ---------------- */
function TermsArch() {
  return (
    <Svg w={820} h={270} label="Mobile IP entities and addresses">
      <Zone x={20} y={30} w={160} h={210} label="Internet" c={K.violet} />
      <Laptop x={100} y={130} />
      <T x={100} y={162} size={11} weight={800}>{'Correspondent\nNode (CN)'}</T>
      <Zone x={230} y={30} w={250} h={210} label="Home Network" c={K.blue} />
      <Router x={300} y={120} waves={false} />
      <T x={300} y={146} size={11} weight={800} color={K.blue}>Home Agent (HA)</T>
      <g opacity={0.4}><Phone x={420} y={190} /></g>
      <T x={420} y={222} size={10} color={K.muted}>{'Home Address\n(permanent IP)'}</T>
      <Zone x={540} y={30} w={260} h={210} label="Foreign Network" c={K.pink} />
      <Router x={610} y={120} />
      <T x={610} y={146} size={11} weight={800} color={K.pink}>Foreign Agent (FA)</T>
      <Phone x={730} y={170} s={1.1} />
      <T x={730} y={202} size={11} weight={800}>Mobile Node (MN)</T>
      <T x={610} y={196} size={10} color={K.muted}>{'Care-of Address\n(temporary IP)'}</T>
      <Arrow x1={130} y1={115} x2={276} y2={112} color={K.cyan} width={2} both />
      <T x={200} y={100} size={10} color={K.cyan} weight={700}>packet forwarding</T>
      <line x1={324} y1={112} x2={586} y2={112} stroke={K.pink} strokeWidth={3} strokeDasharray="8 6" className="dash-path" />
      <T x={455} y={100} size={10} color={K.pink} weight={700}>tunnel</T>
      <Arrow x1={634} y1={126} x2={712} y2={156} color={K.green} width={2} />
    </Svg>
  );
}

const termDiagrams = [
  { title: 'Mobile IP architecture diagram', caption: 'Where each term lives: the CN anywhere on the Internet, the HA and home address on the home network, and the FA, CoA and visiting MN on the foreign network.', render: TermsArch, wide: true },
  {
    title: 'Individual definition cards',
    caption: 'The eight terms you must know, at a glance.',
    wide: true,
    render: () => (
      <Tiles items={[
        { icon: Smartphone, label: 'Mobile Node (MN)', text: 'Device that changes its point of network attachment' },
        { icon: House, label: 'Home Network', text: 'Network associated with the MN’s permanent address' },
        { icon: MapPin, label: 'Home Address', text: 'Permanent IP address of the MN' },
        { icon: RouterIc, label: 'Home Agent (HA)', text: 'Tracks the MN’s location and forwards its packets' },
        { icon: Globe, label: 'Foreign Network', text: 'A network the MN visits' },
        { icon: RouterIc, label: 'Foreign Agent (FA)', text: 'Assists visiting MNs in Mobile IPv4' },
        { icon: MapPin, label: 'Care-of Address', text: 'Represents the MN’s current location' },
        { icon: Monitor, label: 'Correspondent Node', text: 'Any host communicating with the MN' },
      ]} />
    ),
  },
];

/* ---------------- Topic 4: Architecture ---------------- */
function RegistrationSeq() {
  const L = [['Mobile Node', 110, K.green], ['Foreign Agent', 360, K.pink], ['Home Agent', 610, K.blue]];
  const msg = (y, a, b, label, c, dashed) => (
    <g>
      <Arrow x1={a} y1={y} x2={b} y2={y} color={c} width={2} dashed={dashed} />
      <T x={(a + b) / 2} y={y - 10} size={10.5} color={c} weight={700}>{label}</T>
    </g>
  );
  return (
    <Svg w={720} h={340} label="Registration message sequence">
      {L.map(([l, x, c]) => (
        <g key={l}>
          <Box x={x - 65} y={10} w={130} h={32} label={l} tone={c === K.green ? 'green' : c === K.pink ? 'red' : 'blue'} size={12} />
          <line x1={x} y1={42} x2={x} y2={330} stroke="#cbd5e1" strokeDasharray="4 4" strokeWidth={1.5} />
        </g>
      ))}
      {msg(80, 360, 110, 'Agent Advertisement (CoA, F/R flags)', K.amber, true)}
      {msg(130, 110, 360, 'Registration Request (HoA, HA, CoA, lifetime, ID, auth)', K.violet)}
      {msg(180, 360, 610, 'Request relayed (+ visitor entry pending)', K.violet)}
      <Box x={540} y={204} w={140} h={44} label={'verify auth + ID\ncreate binding'} tone="blue" size={10.5} />
      {msg(280, 610, 360, 'Registration Reply (code 0, lifetime)', K.blue)}
      {msg(320, 360, 110, 'Reply relayed → visitor list updated', K.blue)}
    </Svg>
  );
}

function CoaTypes() {
  return (
    <Svg w={860} h={260} label="Foreign agent care-of address vs co-located care-of address">
      <T x={210} y={18} size={13} weight={800}>Foreign-agent CoA</T>
      <Router x={60} y={120} waves={false} />
      <T x={60} y={146} size={10.5} weight={700} color={K.blue}>HA</T>
      <line x1={84} y1={112} x2={236} y2={112} stroke={K.pink} strokeWidth={3} strokeDasharray="8 6" className="dash-path" />
      <T x={160} y={100} size={10} color={K.pink} weight={700}>tunnel to FA</T>
      <Router x={260} y={120} />
      <T x={260} y={146} size={10.5} weight={700} color={K.pink}>{'FA = CoA\n172.16.5.1'}</T>
      {[[350, 70], [370, 140], [350, 205]].map(([x, y], i) => (
        <g key={i}><Arrow x1={284} y1={116} x2={x - 14} y2={y} color={K.green} width={1.6} /><Phone x={x} y={y} s={0.8} /></g>
      ))}
      <T x={210} y={245} size={10.5} color={K.muted}>FA decapsulates · many MNs share one CoA</T>
      <line x1={440} y1={20} x2={440} y2={250} stroke="#e2e8f0" />
      <T x={650} y={18} size={13} weight={800}>Co-located CoA</T>
      <Router x={500} y={120} waves={false} />
      <T x={500} y={146} size={10.5} weight={700} color={K.blue}>HA</T>
      <line x1={524} y1={112} x2={770} y2={112} stroke={K.pink} strokeWidth={3} strokeDasharray="8 6" className="dash-path" />
      <T x={650} y={100} size={10} color={K.pink} weight={700}>tunnel straight to the MN</T>
      <Phone x={790} y={115} s={1.1} />
      <T x={790} y={150} size={10.5} weight={700}>{'MN = CoA\n192.168.30.57'}</T>
      <ServerG x={680} y={210} />
      <T x={720} y={200} size={10.5} anchor="start" color={K.muted}>DHCP</T>
      <Arrow x1={700} y1={190} x2={776} y2={136} color={K.muted} width={1.4} dashed />
      <T x={650} y={245} size={10.5} color={K.muted}>MN decapsulates itself · no FA needed · one address per MN</T>
    </Svg>
  );
}

const archDiagrams = [
  { title: 'Registration and authentication sequence', caption: 'The FA relays, but only the HA can accept: it checks the Mobile–Home authenticator (shared key) and the identification field (anti-replay) before creating the binding.', render: RegistrationSeq, wide: true },
  { title: 'Care-of address assignment', caption: 'Two ways to get a CoA. The tunnel always starts at the HA; what changes is who ends it.', render: CoaTypes, wide: true },
  {
    title: 'How the components work together',
    caption: 'Packet delivery architecture from discovery to delivery.',
    wide: true,
    render: () => (
      <Chain
        steps={[
          { label: 'Discovery', sub: 'MN finds FA / foreign network', icon: RadioTower, tone: 'amber' },
          { label: 'Registration', sub: 'MN registers CoA with HA', icon: Network, tone: 'violet' },
          { label: 'Interception', sub: 'HA captures packets for the MN', icon: RouterIc, tone: 'blue' },
          { label: 'Tunnelling', sub: 'HA encapsulates to the CoA', icon: Layers, tone: 'red' },
          { label: 'Delivery', sub: 'decapsulated, delivered to MN', icon: Smartphone, tone: 'green' },
        ]}
      />
    ),
  },
];

/* ---------------- Topic 5: WAP intro ---------------- */
const wapIntroDiagrams = [
  {
    title: 'Wireless access: how a phone reaches web content',
    caption: 'The gateway is the key idea: it lets constrained phones use content from ordinary web servers.',
    wide: true,
    render: () => (
      <Chain
        steps={[
          { label: 'Mobile phone', sub: 'device requesting data', icon: Smartphone, tone: 'slate' },
          { label: 'Wireless network', sub: 'wireless link (bearer)', icon: RadioTower, tone: 'cyan' },
          { label: 'WAP gateway / proxy', sub: 'translates WAP ↔ web standards', icon: Cpu, tone: 'amber' },
          { label: 'Web server', sub: 'hosts original web content', icon: Server, tone: 'blue' },
        ]}
        links={['air', 'arrow', 'arrow']}
      />
    ),
  },
  {
    title: 'Evolution and purpose of WAP',
    caption: 'From the WAP Forum to the Open Mobile Alliance in five years.',
    wide: true,
    render: () => (
      <Timeline items={[
        { year: '1997', title: 'WAP Forum', text: 'Ericsson, Motorola, Nokia, Unwired Planet' },
        { year: '1998', title: 'WAP 1.0', text: 'WML, WMLScript, WSP/WTP/WTLS/WDP' },
        { year: '1999', title: 'WAP 1.1', text: 'First WAP phones, e.g. Nokia 7110' },
        { year: '2000', title: 'WAP 1.2', text: 'WAP Push, GPRS bearers' },
        { year: '2001', title: 'WAP 2.0', text: 'XHTML MP, TCP/HTTP profiles' },
        { year: '2002', title: 'OMA', text: 'WAP Forum joins the Open Mobile Alliance' },
      ]} />
    ),
  },
];

/* ---------------- Topic 6: WAP architecture ---------------- */
function WapArchDiagram() {
  const xs = [60, 230, 430, 620, 800];
  return (
    <Svg w={880} h={280} label="WAP architecture: request and response path">
      <rect x={10} y={40} width={440} height={200} rx={14} fill={light(K.amber)} stroke={K.amber} strokeDasharray="6 4" />
      <T x={230} y={56} size={11} weight={800} color="#b45309">WAP protocols over the air</T>
      <rect x={410} y={48} width={460} height={184} rx={14} fill={light(K.blue)} stroke={K.blue} strokeDasharray="6 4" />
      <T x={700} y={64} size={11} weight={800} color="#1d4ed8">Standard Internet protocols</T>
      <Phone x={xs[0]} y={150} s={1.3} />
      <T x={xs[0]} y={196} size={11} weight={800}>{'Mobile device\n(microbrowser)'}</T>
      <Tower x={xs[1]} y={180} h={60} />
      <T x={xs[1]} y={200} size={11} weight={800}>Wireless network</T>
      <ServerG x={xs[2]} y={170} />
      <T x={xs[2]} y={212} size={11} weight={800}>{'WAP gateway\n/ proxy'}</T>
      <Cloud x={xs[3]} y={150} label="Internet" />
      <ServerG x={xs[4]} y={170} />
      <T x={xs[4]} y={212} size={11} weight={800}>{'Origin web\nserver'}</T>
      {[0, 1, 2, 3].map((i) => {
        const a = xs[i] + (i === 3 ? 34 : 26);
        const b = xs[i + 1] - (i === 2 ? 36 : 22);
        const req = i < 2 ? 'WSP/WTP request' : 'HTTP request';
        const res = i < 2 ? 'WSP/WTP response' : 'HTTP response';
        return (
          <g key={i}>
            <Arrow x1={a} y1={118} x2={b} y2={118} color={K.blue} width={2} />
            <T x={(a + b) / 2} y={106} size={9.5} color={K.blue} weight={700}>{req}</T>
            <Arrow x1={b} y1={136} x2={a} y2={136} color={K.cyan} width={2} dashed />
            <T x={(a + b) / 2} y={148} size={9.5} color={K.cyan}>{res}</T>
          </g>
        );
      })}
      <Box x={330} y={4} w={200} h={30} label="Gateway: translates WAP ↔ HTTP" tone="amber" size={10.5} />
      <line x1={430} y1={34} x2={430} y2={124} stroke={K.amber} strokeWidth={1.2} strokeDasharray="3 3" />
      <T x={440} y={262} size={10.5} color={K.muted}>Solid: request path · dashed: response path. Encoding (WML → WBXML) and script compilation happen at the gateway.</T>
    </Svg>
  );
}

function StackDiagram() {
  const L = [['WAE', 'HTML · JavaScript', 'amber'], ['WSP', 'HTTP', 'amber'], ['WTP', 'TCP', 'amber'], ['WTLS', 'TLS / SSL', 'amber'], ['WDP', 'UDP', 'amber'], ['Bearers: SMS · CSD · GPRS · CDMA', 'IP over links', 'slate']];
  return (
    <Svg w={640} h={330} label="WAP protocol stack compared with the Internet stack">
      <T x={180} y={14} size={12} weight={800} color="#b45309">WAP stack</T>
      <T x={480} y={14} size={12} weight={800} color="#1d4ed8">Internet stack</T>
      {L.map(([w, i, tone], k) => (
        <g key={w}>
          <Box x={60} y={28 + k * 49} w={240} h={42} label={w} tone={tone} size={12} />
          <Box x={380} y={28 + k * 49} w={200} h={42} label={i} tone={k === 5 ? 'slate' : 'blue'} size={12} />
          <line x1={300} y1={49 + k * 49} x2={380} y2={49 + k * 49} stroke="#cbd5e1" strokeDasharray="4 4" />
        </g>
      ))}
      <path d="M50,28 h-10 v287 h10" fill="none" stroke={K.ink} strokeWidth={1.4} />
      <T x={22} y={170} size={10.5} weight={800}>{'W\nA\nP'}</T>
    </Svg>
  );
}

const wapArchDiagrams = [
  { title: 'WAP architecture overview', caption: 'Five components: the device with a microbrowser, the wireless network, the gateway/proxy, the Internet and the origin server. WAP protocols are used only on the wireless side.', render: WapArchDiagram, wide: true },
  { title: 'WAP protocol stack vs Internet stack', caption: 'Each WAP layer is a lighter, wireless-tuned counterpart of an Internet protocol. WDP adapts to whatever bearer is available.', render: StackDiagram, wide: true },
];

/* ---------------- Topic 7: WAE ---------------- */
function DeckCards() {
  const cards = [['menu', 'WW Info', ['1 News', '2 Weather', '3 Cricket']], ['news', 'News', ['5G rollout…', '<prev/>']], ['weather', 'Weather', ['City: [____]', 'Get ▸ script']], ['result', 'Forecast', ['$(city): 27°C', 'sunny']]];
  return (
    <Svg w={820} h={280} label="A WML deck containing cards">
      <Box x={10} y={100} w={110} h={56} label={'WAP gateway\nWBXML deck'} tone="amber" size={11} />
      <Arrow x1={120} y1={128} x2={156} y2={128} color={K.ink} width={2} />
      <T x={138} y={108} size={9} color={K.muted}>{'1\ndownload'}</T>
      <rect x={160} y={30} width={650} height={210} rx={16} fill="#f8fafc" stroke="#cbd5e1" strokeWidth={1.5} />
      <T x={485} y={48} size={12} weight={800}>deck.wml (one file = one deck)</T>
      {cards.map(([id, title, lines], i) => {
        const x = 180 + i * 158;
        return (
          <g key={id}>
            <rect x={x} y={66} width={130} height={150} rx={12} fill="#334155" />
            <rect x={x + 8} y={76} width={114} height={112} rx={4} fill="#b8cc8f" />
            <T x={x + 65} y={88} size={10.5} weight={800} color="#1f2d0f">{title}</T>
            <line x1={x + 14} y1={97} x2={x + 116} y2={97} stroke="#1f2d0f" />
            {lines.map((l, k) => <T key={l} x={x + 16} y={112 + k * 16} size={10} anchor="start" color="#1f2d0f">{l}</T>)}
            <T x={x + 65} y={202} size={10} color="#e2e8f0" weight={700}>{`<card id="${id}">`}</T>
            {i < 3 && <Arrow x1={x + 132} y1={140} x2={x + 156} y2={140} color={USER_COLORS[i]} width={2} />}
          </g>
        );
      })}
      <T x={485} y={258} size={10.5} color={K.muted}>Card-to-card links (href="#news") are followed locally: no extra network round trip.</T>
    </Svg>
  );
}

const waeDiagrams = [
  {
    title: 'WAE architecture',
    caption: 'From the user’s key press to the application server and back.',
    wide: true,
    render: () => (
      <Chain
        steps={[
          { label: 'Mobile user', sub: 'keypad input', icon: User, tone: 'slate' },
          { label: 'Microbrowser', sub: 'WML user agent', icon: Smartphone, tone: 'cyan' },
          { label: 'WAE components', sub: 'WML, WMLScript, WTA', icon: Code2, tone: 'blue' },
          { label: 'WAP protocol stack', sub: 'WSP / WTP / WTLS / WDP', icon: Layers, tone: 'violet' },
          { label: 'WAP gateway', sub: 'encodes and compiles', icon: Cpu, tone: 'amber' },
          { label: 'Application / web server', sub: 'serves WML content', icon: Server, tone: 'green' },
        ]}
        links={['arrow', 'arrow', 'arrow', 'air', 'arrow']}
      />
    ),
  },
  { title: 'WML: a deck of cards', caption: 'The phone downloads a whole deck and shows one card at a time. Variables such as $(city) carry values between cards, and WMLScript adds logic like input checks.', render: DeckCards, wide: true },
];

export default {
  'w4-mobility': introDiagrams,
  'w4-operation': operationDiagrams,
  'w4-terms': termDiagrams,
  'w4-arch': archDiagrams,
  'w4-wap-intro': wapIntroDiagrams,
  'w4-wap-arch': wapArchDiagrams,
  'w4-wae': waeDiagrams,
};
