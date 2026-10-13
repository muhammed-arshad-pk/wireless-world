import { Route } from 'lucide-react';

export default {
  slug: 'operation-mobile-ip',
  number: 2,
  title: 'Operation of Mobile IP',
  icon: Route,
  color: '#a78bfa',
  difficulty: 'Intermediate',
  summary: 'Agent discovery, registration, tunnelling and delivery: how packets reach a moving device.',
  tagline: 'Follow a packet to a device that keeps moving.',
  keywords: ['agent discovery', 'agent advertisement', 'agent solicitation', 'registration', 'tunneling', 'encapsulation', 'ip-in-ip', 'triangular routing', 'route optimization', 'reverse tunneling', 'udp 434', 'proxy arp'],
  intro: [
    'Mobile IP works in three phases. First the mobile node (MN) discovers where it is (agent discovery). Then it tells its home agent (HA) its new care-of address (registration). Finally the home agent intercepts packets sent to the MN’s home address and tunnels them to the care-of address (tunnelling and delivery).',
    'The correspondent node (CN), the computer talking to the MN, knows nothing about any of this. It simply sends packets to the home address. Packets from the MN back to the CN can go directly, which creates the famous triangle: CN → HA → MN, then MN → CN. Two features improve on this: route optimisation, where the CN learns the CoA, and reverse tunnelling, used when firewalls require replies to go back through the HA.',
  ],
  definitions: {
    title: 'Key Terms',
    items: [
      { term: 'Agent discovery', text: 'How an MN learns whether it is home or away and finds a foreign agent: agent advertisements and solicitations (ICMP).' },
      { term: 'Registration', text: 'The MN sends its CoA to the HA (UDP port 434) and receives a reply that grants a lifetime.' },
      { term: 'Tunnelling', text: 'The HA wraps (encapsulates) each packet in a new IP header addressed to the CoA. The tunnel exit unwraps it.' },
      { term: 'Triangular routing', text: 'The path CN → HA → MN and MN → CN forms a triangle that is longer than the direct path.' },
    ],
  },
  compare: {
    title: 'Basic Mobile IP vs Route Optimisation',
    left: { title: 'Basic (triangular) routing', subtitle: 'CN unaware of mobility', points: ['CN sends to the home address', 'HA intercepts and tunnels to the CoA', 'Works with any unmodified CN', 'Extra delay if the HA is far away'] },
    right: { title: 'Route optimisation', subtitle: 'CN learns the binding', points: ['HA (MIPv4 extension) or MN (MIPv6) sends a binding update to the CN', 'CN tunnels or sends directly to the CoA', 'Shortest path, lower delay and HA load', 'CN must support it, and bindings need security'] },
  },
  flow: {
    title: 'Operation of Mobile IP Step by Step',
    steps: [
      { title: 'Agent discovery', text: 'FAs and HAs broadcast agent advertisements. An MN may also send an agent solicitation.' },
      { title: 'Movement detected', text: 'The MN sees an advertisement from a different network, so it is away from home and takes a CoA.' },
      { title: 'Registration', text: 'Registration request (via the FA) → HA. The HA creates a binding and sends a registration reply with the granted lifetime.' },
      { title: 'Interception', text: 'The HA uses proxy/gratuitous ARP to capture packets sent to the MN’s home address on the home link.' },
      { title: 'Tunnelling', text: 'The HA encapsulates each packet (IP-in-IP) toward the CoA.' },
      { title: 'Delivery & reply', text: 'The FA (tunnel end) decapsulates and delivers to the MN. Replies go directly to the CN.' },
    ],
  },
  table: {
    title: 'Mobile IP Messages',
    columns: ['Message', 'Sent by → to', 'Carried in', 'Purpose'],
    rows: [
      ['Agent advertisement', 'HA/FA → link (broadcast/multicast)', 'ICMP router advertisement + extension', 'Announce agent, list CoAs, flags (R, B, H, F)'],
      ['Agent solicitation', 'MN → link', 'ICMP router solicitation', 'Ask agents to advertise immediately'],
      ['Registration request', 'MN → (FA) → HA', 'UDP port 434', 'Request binding: home address, HA, CoA, lifetime, ID, authenticator'],
      ['Registration reply', 'HA → (FA) → MN', 'UDP', 'Accept or deny with a code, plus the granted lifetime'],
      ['Tunnelled data', 'HA → CoA', 'IP-in-IP (protocol 4), minimal encapsulation or GRE', 'Deliver packets to the current location'],
    ],
  },
  formulas: [
    { name: 'IP-in-IP overhead', expr: 'overhead = 20 bytes per packet', note: 'Outer IPv4 header (RFC 2003). Minimal encapsulation (RFC 2004) uses 8–12 bytes.' },
    { name: 'Triangle penalty', expr: 'extra delay ≈ d(CN→HA) + d(HA→MN) − d(CN→MN)', note: 'Large when the MN is near the CN but far from home.' },
    { name: 'Registration lifetime', expr: 're-register before t = lifetime', note: 'The binding expires if not refreshed; lifetime 0 means deregister.' },
  ],
  cards: {
    title: 'Important Operations',
    items: [
      { title: 'Agent Discovery', text: 'HA and FA advertise their presence so nodes can tell where they are attached.' },
      { title: 'Registration', text: 'The MN registers its new temporary CoA with its HA to set up redirection.' },
      { title: 'Tunnelling', text: 'Enclosing an IP packet inside another packet header to route it to the temporary address.' },
      { title: 'Packet Delivery', text: 'The tunnel endpoint removes the outer header and delivers the original packet.' },
      { title: 'Deregistration', text: 'Back home, the MN registers with lifetime 0 so the HA stops forwarding.' },
      { title: 'Reverse tunnelling', text: 'Optional: replies go back through the HA so the source address passes ingress filters.' },
    ],
  },
  lists: [
    { title: 'Advantages of the design', tone: 'good', items: ['Correspondents and routers need no changes', 'Works over any link layer', 'Each step uses existing protocols (ICMP, UDP, IP)', 'Lifetimes clean up stale bindings automatically'] },
    { title: 'Problems in practice', tone: 'warn', items: ['Triangular routing delay', 'Packet loss during handover until registration completes', 'Ingress filtering may drop packets whose source is the home address', 'Tunnel overhead can cause fragmentation (MTU)', 'Registration must be authenticated against spoofing'] },
  ],
  lab: {
    key: 'w4-operation',
    title: 'Visualizer: Mobile IP Packet Journey',
    description: 'Step through Mobile IP one message at a time: advertisement, registration, interception, tunnelling and delivery. Watch the packet get wrapped and unwrapped, then compare the triangle path with route optimisation.',
    badge: { name: 'Tunnel Tracer', emoji: '🚇' },
    objectives: [
      { id: 'journey', label: 'Step through the complete Mobile IP operation', xp: 30 },
      { id: 'optimise', label: 'Compare triangular routing with route optimisation', xp: 20 },
    ],
  },
  quiz: [
    { q: 'Agent advertisements are extensions of which messages?', options: ['DNS queries', 'ICMP router advertisements', 'TCP SYN', 'ARP replies'], answer: 1, explain: 'They extend ICMP router discovery messages.' },
    { q: 'Mobile IP registration messages use…', options: ['TCP port 80', 'UDP port 434', 'ICMP echo', 'UDP port 53'], answer: 1, explain: 'Registration request and reply use UDP port 434.' },
    { q: 'Who encapsulates packets for the mobile node?', options: ['Correspondent node', 'Home agent', 'DNS server', 'Mobile node'], answer: 1, explain: 'The HA tunnels intercepted packets to the CoA.' },
    { q: 'In basic Mobile IPv4, replies from the MN to the CN go…', options: ['Through the home agent always', 'Directly to the CN', 'Nowhere', 'Through DNS'], answer: 1, explain: 'That is what creates the triangle.' },
    { q: 'IP-in-IP encapsulation adds how many header bytes?', options: ['8', '20', '40', '64'], answer: 1, explain: 'A full outer IPv4 header.' },
  ],
  deep: {
    sections: [
      { title: 'Inside agent discovery', points: ['An advertisement includes the agent’s CoA list, the maximum registration lifetime and flags.', 'Flags: R = registration required via FA, B = busy, H = home agent, F = foreign agent, plus encapsulation types supported.', 'Move detection: lifetime expiry of the current agent’s advertisement, or a change of network prefix.', 'If no advertisement arrives, the MN sends a solicitation instead of waiting.'] },
      { title: 'How the home agent catches packets', points: ['Packets to the home address naturally reach the home network.', 'The HA answers ARP for the home address (proxy ARP), so the router hands those frames to the HA.', 'When the MN leaves, the HA sends a gratuitous ARP to update caches on the home link.', 'Back home, the MN sends its own gratuitous ARP to take its address back.'] },
      { title: 'Encapsulation options', points: ['IP-in-IP (RFC 2003): mandatory, outer header src = HA, dst = CoA, protocol = 4.', 'Minimal encapsulation (RFC 2004): rewrites the original header and adds a short header, saving bytes.', 'GRE (RFC 2784): generic, can carry non-IP payloads.', 'The tunnel endpoint is the FA (FA-CoA) or the MN itself (co-located CoA).'] },
      { title: 'Fixing the triangle and the filters', points: ['Route optimisation: binding updates let the CN send straight to the CoA.', 'Reverse tunnelling (RFC 3024): MN → HA → CN, so replies have a topologically correct source.', 'Smooth handoff: the old FA forwards in-flight packets to the new CoA.', 'MIPv6 builds route optimisation in, protected by the return-routability test.'] },
    ],
    cases: [
      { year: 'Campus', title: 'Lecture-hall handover', text: 'A student’s laptop moves from the department subnet to the library network. The HA tunnels its SSH session to the new CoA without a reconnect.' },
      { year: 'Ingress', title: 'Firewall drops replies', text: 'An ISP filters packets whose source is not from its own prefix. Replies carrying the home address are dropped until reverse tunnelling is enabled.' },
      { year: 'Travel', title: 'The far-away home agent', text: 'A user from India visiting a server in the next room in Germany sees ~250 ms latency: every packet crosses to the home agent and back.' },
    ],
    myths: [
      { myth: 'The correspondent node sends packets to the care-of address.', fact: 'In basic Mobile IPv4 it always sends to the home address. Only route optimisation changes that.' },
      { myth: 'Tunnelling encrypts the packet.', fact: 'Encapsulation only adds a header; it provides no confidentiality (use IPsec for that).' },
      { myth: 'Registration happens once.', fact: 'Bindings have lifetimes and must be refreshed, and there is a new registration after every move.' },
    ],
    examNotes: [
      'Three phases: agent discovery → registration → tunnelling & delivery.',
      'Discovery: agent advertisement (ICMP router advertisement extension) and agent solicitation.',
      'Registration: request/reply over UDP 434, authenticated, with a lifetime; lifetime 0 = deregister.',
      'HA intercepts using proxy ARP and tunnels with IP-in-IP (outer: HA → CoA).',
      'Triangular routing, fixed by route optimisation; reverse tunnelling for ingress filtering.',
    ],
    extraQuiz: [
      { q: 'How does the HA capture packets for an absent mobile node?', options: ['DNS redirect', 'Proxy ARP for the home address', 'Changing the CN’s routing table', 'Email'], answer: 1, explain: 'It answers ARP requests on behalf of the MN.' },
      { q: 'Reverse tunnelling helps mainly with…', options: ['Ingress filtering at firewalls', 'Faster Wi-Fi', 'DNS lookups', 'Battery life'], answer: 0, explain: 'Replies then carry a topologically correct source.' },
    ],
  },
};
