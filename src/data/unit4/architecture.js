import { Network } from 'lucide-react';

export default {
  slug: 'mobile-ip-architecture',
  number: 4,
  title: 'Mobile IP Architecture and Components',
  icon: Network,
  color: '#f472b6',
  difficulty: 'Intermediate',
  summary: 'How home and foreign networks, agents, care-of addresses and authenticated registration fit together.',
  tagline: 'Build a Mobile IP network piece by piece.',
  keywords: ['architecture', 'home network', 'foreign network', 'home agent', 'foreign agent', 'care-of address assignment', 'co-located', 'registration request', 'registration reply', 'authentication extension', 'mobility binding', 'visitor list', 'packet delivery'],
  intro: [
    'A Mobile IP network has three places: the home network (where the mobile node’s home address and home agent live), one or more foreign networks (where the MN may visit, possibly with a foreign agent), and the wider Internet, where correspondent nodes sit. Ordinary routers connect them; only the MN and the agents run Mobile IP.',
    'The architecture is held together by two data structures and one exchange. The home agent’s binding table maps each away MN’s home address to its current care-of address. The foreign agent’s visitor list records who is visiting. The authenticated registration exchange keeps both up to date. Packet delivery then follows directly: CN → home network → HA tunnel → CoA → MN.',
  ],
  definitions: {
    title: 'Architecture Building Blocks',
    items: [
      { term: 'Binding table (HA)', text: 'Home address → care-of address, registration lifetime, identification. One entry per away MN.' },
      { term: 'Visitor list (FA)', text: 'MN home address, its HA, MAC address, remaining lifetime. Used to deliver decapsulated packets.' },
      { term: 'Mobility security association', text: 'A shared key and algorithm between MN and HA used to authenticate registration messages.' },
      { term: 'Identification field', text: 'A 64-bit timestamp or nonce in each registration that defeats replay attacks.' },
    ],
  },
  compare: {
    title: 'Foreign-Agent CoA vs Co-located CoA',
    left: { title: 'FA care-of address', subtitle: 'Agent-based', points: ['CoA = the foreign agent’s IP address', 'Registration is relayed through the FA', 'FA decapsulates and delivers on the link', 'Saves IPv4 addresses: many MNs share one CoA'] },
    right: { title: 'Co-located care-of address', subtitle: 'Self-service', points: ['MN gets a local address (DHCP or manual)', 'MN registers directly with its HA', 'MN decapsulates the tunnel itself', 'Works where no FA exists, but uses an address per MN'] },
  },
  flow: {
    title: 'How the Components Work Together',
    steps: [
      { title: 'Discovery', text: 'The MN detects the foreign network through an agent advertisement and picks a CoA.' },
      { title: 'Registration', text: 'The MN sends a registration request (home address, HA, CoA, lifetime, ID, authenticator), relayed by the FA.' },
      { title: 'Authentication & binding', text: 'The HA checks the authenticator and ID, stores the binding and replies with the granted lifetime.' },
      { title: 'Interception', text: 'The HA captures packets addressed to the MN’s home address on the home network.' },
      { title: 'Tunnelling', text: 'The HA encapsulates the packets toward the CoA.' },
      { title: 'Delivery', text: 'The tunnel end (FA or MN) decapsulates and the packet reaches the MN unchanged.' },
    ],
  },
  table: {
    title: 'Fields of a Registration Request (Mobile IPv4)',
    columns: ['Field', 'Size', 'Meaning'],
    rows: [
      ['Type = 1', '8 bits', 'Registration request (reply is type 3)'],
      ['Flags S B D M G r T x', '8 bits', 'Simultaneous bindings, broadcast, decapsulation by MN (co-located), minimal/GRE encapsulation, reverse tunnel'],
      ['Lifetime', '16 bits', 'Seconds requested (0 = deregister)'],
      ['Home address', '32 bits', 'MN’s permanent address'],
      ['Home agent', '32 bits', 'Address of the MN’s HA'],
      ['Care-of address', '32 bits', 'Tunnel endpoint'],
      ['Identification', '64 bits', 'Timestamp/nonce against replay'],
      ['Extensions', 'variable', 'Mobile–Home authentication (mandatory), Mobile–Foreign, Foreign–Home'],
    ],
  },
  formulas: [
    { name: 'Authenticator', expr: 'auth = HMAC-MD5(key, registration data)', note: 'Computed over the message with the MN–HA shared key (RFC 5944 default).' },
    { name: 'Binding validity', expr: 'valid while now < registered_at + lifetime', note: 'The MN re-registers before expiry; the HA deletes stale bindings.' },
  ],
  cards: {
    title: 'Roles of the Components',
    items: [
      { title: 'Mobile Node', text: 'Detects movement, obtains a CoA, registers, and (with co-located CoA) decapsulates.' },
      { title: 'Home Agent', text: 'Authenticates registrations, stores bindings, intercepts and tunnels packets.' },
      { title: 'Foreign Agent', text: 'Advertises, provides a CoA, relays registrations, decapsulates and delivers.' },
      { title: 'Correspondent Node', text: 'Sends to the home address as usual; no changes needed.' },
      { title: 'Routers in between', text: 'Ordinary IP routers: they just forward the outer headers.' },
      { title: 'AAA servers (optional)', text: 'Operators may add AAA (RADIUS/Diameter) to authorise visitors in foreign domains.' },
    ],
  },
  lists: [
    { title: 'Security features', tone: 'good', items: ['Mandatory Mobile–Home authentication extension', 'Identification field stops replayed registrations', 'Optional Mobile–Foreign and Foreign–Home authentication', 'IPsec can protect the tunnel contents'] },
    { title: 'Design considerations', tone: 'warn', items: ['The HA is a single point of failure, so deploy redundant HAs', 'Address shortage favours FA CoAs in IPv4', 'Firewalls must allow UDP 434 and IP protocol 4', 'Short lifetimes = more signalling; long lifetimes = stale bindings'] },
  ],
  lab: {
    key: 'w4-arch',
    title: 'Visualizer: Build a Mobile IP Network',
    description: 'Move the mobile node between its home network and two foreign networks: one with a foreign agent, one using a co-located CoA via DHCP. Watch the registration messages, the HA binding table and the FA visitor list update live.',
    badge: { name: 'Mobility Architect', emoji: '🏗️' },
    objectives: [
      { id: 'fa', label: 'Register through a foreign agent', xp: 20 },
      { id: 'colocated', label: 'Register with a co-located care-of address', xp: 20 },
      { id: 'home', label: 'Return home and deregister (lifetime 0)', xp: 15 },
    ],
  },
  quiz: [
    { q: 'Which component authenticates registration requests?', options: ['Correspondent node', 'Home agent', 'DNS server', 'Every router'], answer: 1, explain: 'The HA checks the Mobile–Home authenticator.' },
    { q: 'With a co-located CoA, who decapsulates tunnelled packets?', options: ['Foreign agent', 'Home agent', 'Mobile node', 'Correspondent node'], answer: 2, explain: 'The MN is the tunnel endpoint.' },
    { q: 'A registration request with lifetime 0 means…', options: ['Register forever', 'Deregister', 'Error', 'Use default lifetime'], answer: 1, explain: 'It removes the binding.' },
    { q: 'The identification field protects against…', options: ['Replay attacks', 'Packet loss', 'Fragmentation', 'Interference'], answer: 0, explain: 'Old messages cannot be replayed.' },
    { q: 'An advantage of FA care-of addresses in IPv4 is…', options: ['No HA needed', 'Many MNs can share one CoA', 'No encryption needed', 'Faster Wi-Fi'], answer: 1, explain: 'Saves scarce IPv4 addresses.' },
  ],
  deep: {
    sections: [
      { title: 'Packet delivery architecture', points: ['CN → Internet → home network (normal routing on the home prefix).', 'HA intercepts and encapsulates: outer src = HA, dst = CoA.', 'Internet routes the outer packet to the foreign network.', 'FA (or MN) strips the outer header and delivers the original packet.', 'MN → CN directly (or reverse-tunnelled through the HA).'] },
      { title: 'Registration timeline', points: ['MN → FA: registration request (UDP 434).', 'FA checks it (e.g. requested lifetime) and adds it to a pending visitor entry, then relays it to the HA.', 'HA verifies authentication and identification, creates the binding and sends the reply to the FA.', 'FA updates the visitor list and relays the reply to the MN, which starts using the binding.'] },
      { title: 'Scaling the architecture', points: ['Hierarchical Mobile IP adds regional agents so local moves don’t reach the far HA.', 'HA redundancy (VRRP-style) avoids a single point of failure.', 'Proxy Mobile IPv6 puts the MN’s role in the network (MAG + LMA).', 'Mobile networks (NEMO) let a whole router and its subnet move together.'] },
    ],
    cases: [
      { year: 'Enterprise', title: 'Two campuses, one HA', text: 'An organisation places its HA in the head office. Laptops at the branch campus use FA CoAs on the branch router and keep head-office addresses for licensing servers.' },
      { year: 'Hotspot', title: 'No FA available', text: 'In a public café there is no foreign agent, so the laptop gets a DHCP address and registers it as a co-located CoA, decapsulating the tunnel itself.' },
    ],
    myths: [
      { myth: 'Every router on the path must understand Mobile IP.', fact: 'Only the MN, HA and (optionally) FA do. All other routers see normal IP packets.' },
      { myth: 'Registration is unauthenticated.', fact: 'The Mobile–Home authentication extension is mandatory in every request and reply.' },
    ],
    examNotes: [
      'Architecture: home network (HA, home address), foreign network (FA, CoA), Internet (CN).',
      'HA: binding table; FA: visitor list.',
      'CoA assignment: FA CoA (via advertisement) or co-located CoA (DHCP/manual).',
      'Registration request/reply: lifetime, home address, HA, CoA, ID, authentication extension.',
      'Delivery: CN → HA → tunnel → FA/MN → MN; reply MN → CN.',
    ],
    extraQuiz: [
      { q: 'Which table does the home agent maintain?', options: ['Visitor list', 'Binding table', 'ARP cache only', 'DNS zone'], answer: 1, explain: 'Home address → CoA bindings.' },
      { q: 'Which message type number is a registration reply?', options: ['1', '2', '3', '4'], answer: 2, explain: 'Request = 1, reply = 3.' },
    ],
  },
};
