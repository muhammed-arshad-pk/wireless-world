import { Smartphone } from 'lucide-react';

export default {
  slug: 'introduction-mobile-ip',
  number: 1,
  title: 'Introduction to Mobile IP',
  icon: Smartphone,
  color: '#38bdf8',
  difficulty: 'Beginner',
  summary: 'Why ordinary IP breaks when a device moves, and how Mobile IP keeps one permanent address.',
  tagline: 'Keep your IP address, wherever you roam.',
  keywords: ['mobile ip', 'mobility', 'ip address', 'roaming', 'home address', 'care-of address', 'rfc 5944', 'tcp session', 'handover', 'network layer mobility'],
  intro: [
    'Mobile IP is an IETF standard (RFC 5944 for IPv4, RFC 6275 for IPv6) that lets a device move from one IP network to another without changing the IP address that other computers use to reach it. Its connections, such as a video call, an SSH session or a VPN, keep running while it changes its point of attachment.',
    'The problem it solves comes from how IP addresses work. An IP address does two jobs at once: it identifies the device (“who”) and it locates the network the device is attached to (“where”). Routers forward packets using only the network part of the address. If a laptop moves to another network but keeps its old address, packets still go to the old network. If it takes a new address, every TCP connection, which is tied to the old address, breaks. Mobile IP separates the two jobs: a permanent home address for identity and a temporary care-of address for location.',
  ],
  definitions: {
    title: 'Key Terms',
    items: [
      { term: 'Mobility', text: 'Changing the point of attachment to the Internet (a new subnet or a new network) while communicating.' },
      { term: 'Home address', text: 'The permanent IP address of the mobile node, used by everyone who wants to reach it.' },
      { term: 'Care-of address (CoA)', text: 'A temporary address that says where the mobile node currently is. It changes every time the node moves.' },
      { term: 'Network-layer mobility', text: 'Mobility handled at the IP layer, invisible to TCP/UDP and to applications.' },
    ],
  },
  compare: {
    title: 'Plain IP vs Mobile IP when a device moves',
    left: { title: 'Plain IP', subtitle: 'Address = location', points: ['Device gets a new IP address (DHCP) on every network', 'Ongoing TCP connections break and must restart', 'Others cannot reach the device at a fixed address', 'Fine for short web browsing, bad for calls, VPNs and servers'] },
    right: { title: 'Mobile IP', subtitle: 'Identity separate from location', points: ['Home address never changes', 'Home agent forwards packets to the current care-of address', 'Connections survive the move, invisible to applications', 'Costs some extra delay (tunnelling) and signalling'] },
  },
  flow: {
    title: 'Mobility in IP Networks: What Happens When You Move',
    steps: [
      { title: 'At home', text: 'The node uses its home address on its home network. Normal IP routing delivers its packets.' },
      { title: 'Moves away', text: 'It attaches to a foreign network (another campus, café or operator) where its home prefix is not routed.' },
      { title: 'Gets a care-of address', text: 'It learns a temporary address on the foreign network that shows where it now is.' },
      { title: 'Tells the home agent', text: 'It registers the CoA with its home agent, which then forwards its traffic. Correspondents never notice.' },
    ],
  },
  table: {
    title: 'Ways to Handle Mobility',
    columns: ['Layer', 'Example', 'What moves seamlessly', 'Limitation'],
    rows: [
      ['Link layer', 'Wi-Fi roaming within one ESS', 'Between APs of the same subnet', 'Stops at the subnet boundary'],
      ['Network layer', 'Mobile IPv4 / IPv6', 'Any IP traffic, across networks', 'Needs agents, adds tunnelling overhead'],
      ['Transport layer', 'SCTP multihoming, MPTCP', 'Connections that support it', 'Both ends must support the protocol'],
      ['Application layer', 'SIP re-INVITE, app reconnects', 'That application only', 'Every app must handle it itself'],
    ],
  },
  formulas: [
    { name: 'TCP connection identity', expr: '(src IP, src port, dst IP, dst port)', note: 'Change any IP address and it becomes a different connection, so the old one breaks.' },
    { name: 'Routing decision', expr: 'route = longest-prefix-match(dst IP)', note: 'Routers only look at the network prefix, so a moved device’s home address still points home.' },
    { name: 'Mobile IP idea', expr: 'identity = home address · location = care-of address', note: 'Mobility binding at the home agent: home address ↔ CoA, valid for a lifetime.' },
  ],
  cards: {
    title: 'Where Mobile IP Matters',
    items: [
      { title: 'Mobile workers & VPNs', text: 'Laptops moving between office, home and hotspot keep the same VPN identity.' },
      { title: 'Vehicles & trains', text: 'On-board routers (network mobility, NEMO) change networks along the route.' },
      { title: 'Public safety', text: 'Police and ambulance terminals roam across agencies’ networks.' },
      { title: 'Cellular cores', text: 'Ideas from Mobile IP (home agent, tunnelling) appear in 3G/4G mobility, e.g. PMIPv6 and GTP tunnels.' },
      { title: 'Always-reachable servers', text: 'A moving device can still be contacted at its fixed home address.' },
      { title: 'IoT & sensors', text: 'Mobile sensors keep one address for monitoring systems.' },
    ],
  },
  lists: [
    { title: 'Benefits', tone: 'good', items: ['Seamless, uninterrupted connections while moving', 'Transparent to TCP/UDP and applications', 'Device is always reachable at one permanent address', 'Works over any link technology (Wi-Fi, cellular, Ethernet)', 'Only the mobile node and agents need changes, not the whole Internet'] },
    { title: 'Challenges', tone: 'warn', items: ['Triangular routing adds delay (packets detour via the home agent)', 'Tunnelling overhead: an extra 20-byte IP header', 'Handover delay while re-registering, so packets can be lost', 'Security: registrations must be authenticated to stop hijacking', 'Firewalls and ingress filtering may drop packets with a home source address'] },
    { title: 'Requirements of a Mobility Solution', tone: 'info', items: ['Transparency: keep the same IP address', 'Compatibility: no changes to routers or correspondents', 'Security: authenticate all registration messages', 'Efficiency: few extra messages, small overhead', 'Scalability: work across the whole Internet'] },
  ],
  lab: {
    key: 'w4-mobility',
    title: 'Visualizer: Why Do We Need Mobile IP?',
    description: 'Carry a laptop on a live video call from home to a café and then a campus. Without Mobile IP the address changes and the call drops. Switch Mobile IP on and watch the same trip keep the call alive.',
    badge: { name: 'Roaming Rookie', emoji: '🧳' },
    objectives: [
      { id: 'break', label: 'Watch a call drop when plain IP changes address', xp: 20 },
      { id: 'survive', label: 'Complete the whole trip with Mobile IP and keep the call', xp: 25 },
    ],
  },
  quiz: [
    { q: 'Mobile IP mainly solves which problem?', options: ['Slow Wi-Fi speeds', 'Keeping connections alive when a device changes networks', 'Encrypting web pages', 'Assigning MAC addresses'], answer: 1, explain: 'It keeps one IP address for identity while the location changes.' },
    { q: 'Which address never changes in Mobile IP?', options: ['Care-of address', 'Home address', 'Gateway address', 'DHCP address'], answer: 1, explain: 'The home address is permanent.' },
    { q: 'Why does a TCP connection break when the IP address changes?', options: ['TCP has no ports', 'The connection is identified by both IP addresses and ports', 'Routers block TCP', 'TCP uses MAC addresses'], answer: 1, explain: 'A new IP address makes it a different connection 4-tuple.' },
    { q: 'At which layer does Mobile IP work?', options: ['Physical', 'Data link', 'Network', 'Application'], answer: 2, explain: 'It is network-layer mobility, invisible to upper layers.' },
    { q: 'A drawback of basic Mobile IPv4 is…', options: ['Triangular routing', 'No support for TCP', 'It needs a new MAC address', 'It only works on Ethernet'], answer: 0, explain: 'Packets to the mobile node detour via the home agent.' },
  ],
  deep: {
    sections: [
      { title: 'The two jobs of an IP address', points: ['Identifier: transport protocols and applications use it to recognise the endpoint.', 'Locator: routers use its prefix to find the network.', 'Fixed networks never notice the conflict because the device never moves.', 'Mobile IP (and later HIP and LISP) split identifier from locator.'] },
      { title: 'Why not just use DHCP?', points: ['DHCP gives a new, valid local address on each network, which is perfect for reaching out.', 'But all existing connections die and nobody can reach you at a fixed address.', 'Short-lived web requests survive this, so phones often just reconnect apps.', 'Long-lived sessions (VoIP, SSH, VPN, remote monitoring) need network-layer mobility.'] },
      { title: 'Mobile IPv4 vs Mobile IPv6', points: ['MIPv4 (RFC 5944) uses home and foreign agents and has triangular routing.', 'MIPv6 (RFC 6275) needs no foreign agent: the node forms its CoA by autoconfiguration.', 'MIPv6 has built-in route optimisation: correspondents learn the CoA through binding updates.', 'Proxy Mobile IPv6 (RFC 5213) moves the signalling into the network, so the host needs no changes.'] },
    ],
    cases: [
      { year: '1996', title: 'RFC 2002', text: 'The first Mobile IP standard for IPv4 was published by the IETF.' },
      { year: '2002', title: 'RFC 3344', text: 'Revised Mobile IPv4 with clarified registration and security.' },
      { year: '2004', title: 'Mobile IPv6', text: 'RFC 3775 (updated by RFC 6275 in 2011) brought mobility with route optimisation to IPv6.' },
      { year: '2008', title: 'Proxy Mobile IPv6', text: 'RFC 5213: network-based mobility, later used in operator cores alongside GTP.' },
    ],
    myths: [
      { myth: 'Mobile IP is about mobile phones only.', fact: 'It works for any IP device: laptops, vehicles, sensors, even whole routers.' },
      { myth: 'Wi-Fi roaming already gives you Mobile IP.', fact: 'Wi-Fi roaming only works within one subnet. Crossing into another network needs network-layer mobility.' },
      { myth: 'Correspondents must support Mobile IP.', fact: 'In Mobile IPv4 the correspondent node needs no changes at all.' },
    ],
    examNotes: [
      'Mobile IP = network-layer mobility. The device keeps a permanent home address while moving.',
      'Problem: an IP address is both identifier and locator; moving breaks routing or connections.',
      'Solution: home address (identity) + care-of address (location), bound at the home agent.',
      'Benefits: transparency, reachability, link independence.',
      'Challenges: triangular routing, tunnel overhead, handover delay, security, ingress filtering.',
    ],
    extraQuiz: [
      { q: 'Wi-Fi roaming between APs of the same subnet is handled at the…', options: ['Network layer', 'Link layer', 'Application layer', 'Transport layer'], answer: 1, explain: 'The IP address stays valid inside one subnet.' },
      { q: 'Which Mobile IP version needs no foreign agent?', options: ['Mobile IPv4', 'Mobile IPv6', 'Both', 'Neither'], answer: 1, explain: 'MIPv6 nodes form their own CoA.' },
    ],
  },
};
