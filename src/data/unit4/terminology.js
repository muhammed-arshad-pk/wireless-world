import { BookOpen } from 'lucide-react';

export default {
  slug: 'mobile-ip-terminologies',
  number: 3,
  title: 'Mobile IP Terminologies',
  icon: BookOpen,
  color: '#34d399',
  difficulty: 'Beginner',
  summary: 'Mobile node, home and foreign networks and agents, care-of address, correspondent node.',
  tagline: 'Meet the cast behind mobile connectivity.',
  keywords: ['mobile node', 'home network', 'home address', 'home agent', 'foreign network', 'foreign agent', 'care-of address', 'coa', 'correspondent node', 'agent advertisement', 'agent solicitation', 'co-located care-of address', 'mobility binding', 'tunnel'],
  intro: [
    'Mobile IP introduces a small set of entities and addresses. Once you know who they are and what each one does, the whole protocol becomes a simple story: a mobile node away from home keeps its home address, picks up a care-of address in the foreign network, and its home agent forwards its traffic there.',
    'A useful analogy is the post office. Your home address stays printed on every letter. When you move temporarily, you give the post office at home (the home agent) a forwarding address (the care-of address). The local post office in the new town (the foreign agent) hands the redirected letters to you. People writing to you (correspondents) never need to know you moved.',
  ],
  definitions: {
    title: 'The Core Terms',
    items: [
      { term: 'Mobile Node (MN)', text: 'A host or router that changes its point of attachment from one network to another while keeping its home address.' },
      { term: 'Home Network', text: 'The network whose prefix matches the MN’s home address. The MN’s “permanent residence”.' },
      { term: 'Home Address', text: 'The permanent IP address assigned to the MN on its home network. It never changes.' },
      { term: 'Home Agent (HA)', text: 'A router on the home network that keeps the MN’s current location (binding) and tunnels its packets when it is away.' },
      { term: 'Foreign Network', text: 'Any network other than the home network that the MN is visiting.' },
      { term: 'Foreign Agent (FA)', text: 'A router on the foreign network that offers a CoA, relays registrations and decapsulates tunnelled packets for visiting MNs (Mobile IPv4).' },
      { term: 'Care-of Address (CoA)', text: 'The temporary address marking the MN’s current location: the tunnel’s endpoint.' },
      { term: 'Correspondent Node (CN)', text: 'Any host communicating with the MN. It can be fixed or mobile and needs no Mobile IP support.' },
    ],
  },
  compare: {
    title: 'Home Address vs Care-of Address',
    left: { title: 'Home address', subtitle: 'Permanent · identity', points: ['Assigned once on the home network', 'Used by CNs, DNS and applications', 'Stays the same wherever the MN goes', 'Source address of the MN’s packets'] },
    right: { title: 'Care-of address', subtitle: 'Temporary · location', points: ['Obtained in each foreign network', 'Known only to the HA (and the CN with route optimisation)', 'Changes on every move', 'Destination of the tunnel from the HA'] },
  },
  flow: {
    title: 'How the Terms Fit Together',
    steps: [
      { title: 'MN on home network', text: 'Uses its home address; the HA does nothing special.' },
      { title: 'MN visits a foreign network', text: 'Hears an agent advertisement from the FA and takes a CoA.' },
      { title: 'Binding at HA', text: 'Home address ↔ CoA, plus a lifetime, is stored as a mobility binding.' },
      { title: 'CN sends to home address', text: 'The HA tunnels it to the CoA, and the FA delivers it to the MN.' },
    ],
  },
  table: {
    title: 'Two Kinds of Care-of Address',
    columns: ['Type', 'Who owns it', 'Tunnel ends at', 'Pros', 'Cons'],
    rows: [
      ['Foreign agent CoA', 'The FA’s own address', 'Foreign agent', 'Many MNs share one CoA, saving addresses', 'Needs an FA in every visited network'],
      ['Co-located CoA', 'The MN (got via DHCP/manual)', 'Mobile node itself', 'No FA needed', 'Uses one address per MN; MN does decapsulation'],
    ],
  },
  formulas: [
    { name: 'Mobility binding', expr: '⟨home address, CoA, lifetime⟩', note: 'The record the home agent keeps for each away-from-home MN.' },
    { name: 'Tunnel addressing', expr: 'outer: HA → CoA · inner: CN → home address', note: 'The inner (original) packet is untouched.' },
  ],
  cards: {
    title: 'More Terms You Will Meet',
    items: [
      { title: 'Agent Advertisement', text: 'Periodic message from HA/FA announcing its presence, CoAs and capabilities.' },
      { title: 'Agent Solicitation', text: 'Message from an MN asking any agent to advertise now.' },
      { title: 'Mobility Agent', text: 'Common name for a home agent or foreign agent.' },
      { title: 'Tunnel', text: 'The path along which packets travel while encapsulated: HA → CoA.' },
      { title: 'Visitor List', text: 'The FA’s table of MNs currently visiting its network.' },
      { title: 'Registration Lifetime', text: 'Seconds the binding stays valid before it must be renewed.' },
    ],
  },
  lists: [
    { title: 'Remember this', tone: 'info', items: ['Home address = who you are (permanent)', 'Care-of address = where you are (temporary)', 'HA forwards, FA delivers, CN just talks normally', 'The FA exists only in Mobile IPv4'] },
    { title: 'Common confusions', tone: 'warn', items: ['The CN does not need to be on the home network', 'The CoA is not always the MN’s own address (FA CoA)', 'The HA is a router, not a server or DNS', 'Foreign network ≠ foreign country: any network except home'] },
  ],
  lab: {
    key: 'w4-terms',
    title: 'Visualizer: Match the Term',
    description: 'Pick a term, then click the definition it belongs to. Each correct match lights up that part of the live Mobile IP diagram so you see where every term sits.',
    badge: { name: 'Term Tamer', emoji: '🏷️' },
    objectives: [
      { id: 'all', label: 'Match all eight Mobile IP terms', xp: 25 },
      { id: 'flawless', label: 'Finish a round with at most one mistake', xp: 20 },
    ],
  },
  quiz: [
    { q: 'Which address represents the mobile node’s current location?', options: ['Home address', 'Care-of address', 'MAC address', 'Gateway address'], answer: 1, explain: 'The CoA is where the MN currently is.' },
    { q: 'Which entity keeps the binding between home address and CoA?', options: ['Foreign agent', 'Correspondent node', 'Home agent', 'DNS server'], answer: 2, explain: 'The HA stores the mobility binding.' },
    { q: 'The correspondent node is…', options: ['The MN’s home router', 'Any host communicating with the MN', 'The foreign agent', 'The DHCP server'], answer: 1, explain: 'It can be any host on the Internet.' },
    { q: 'A co-located care-of address means…', options: ['The FA owns the CoA', 'The MN itself owns the CoA and decapsulates', 'Two MNs share an address', 'The HA and FA are one box'], answer: 1, explain: 'The MN gets the address, e.g. from DHCP.' },
    { q: 'An agent solicitation is sent by…', options: ['The home agent', 'The mobile node', 'The CN', 'The DNS server'], answer: 1, explain: 'The MN asks agents to advertise.' },
  ],
  deep: {
    sections: [
      { title: 'Home agent duties', points: ['Keeps mobility bindings and authenticates registrations.', 'Intercepts packets for away MNs (proxy ARP) and tunnels them to the CoA.', 'Removes bindings when the lifetime expires or the MN deregisters.', 'Can serve many MNs; may be a dedicated router or a function in the home router.'] },
      { title: 'Foreign agent duties', points: ['Sends agent advertisements and offers its address as the CoA.', 'Relays registration requests to the HA and replies back to the MN.', 'Decapsulates tunnelled packets and delivers them on the local link.', 'Can act as the default router for visiting MNs and keeps a visitor list.'] },
      { title: 'Terms in Mobile IPv6', points: ['No foreign agent: the MN forms a CoA by stateless autoconfiguration.', 'Binding Update / Binding Acknowledgement replace registration request/reply.', 'Correspondent nodes may keep a binding cache for route optimisation.', 'Home Agent Address Discovery replaces agent advertisements for finding the HA.'] },
    ],
    cases: [
      { year: 'Post', title: 'The postal analogy', text: 'Home address = your house; HA = your home post office forwarding mail; CoA = your hotel; FA = the hotel desk handing you the letters.' },
      { year: 'Phone', title: 'Call forwarding', text: 'People dial your usual number (home address); the exchange (HA) forwards to wherever you set (CoA).' },
    ],
    myths: [
      { myth: 'The home agent must be the MN’s Wi-Fi router.', fact: 'It is any router on the home network that runs the HA function.' },
      { myth: 'Foreign agents are required.', fact: 'With a co-located CoA, Mobile IPv4 works without an FA, and Mobile IPv6 has no FA at all.' },
      { myth: 'Each MN needs its own unique CoA.', fact: 'With FA CoAs, many visiting MNs can share the FA’s single address.' },
    ],
    examNotes: [
      'MN: moves, keeps home address. CN: any host it talks to.',
      'Home network, home address, home agent (stores binding, tunnels packets).',
      'Foreign network, foreign agent (advertises, relays registration, decapsulates).',
      'CoA: FA CoA (shared, FA ends tunnel) or co-located CoA (MN’s own, MN ends tunnel).',
      'Agent advertisement (from agents) and agent solicitation (from MN).',
    ],
    extraQuiz: [
      { q: 'Which is the tunnel endpoint with an FA care-of address?', options: ['The mobile node', 'The foreign agent', 'The correspondent node', 'The home agent'], answer: 1, explain: 'The FA decapsulates and delivers locally.' },
      { q: 'Which list does a foreign agent keep?', options: ['Visitor list', 'Binding cache of CNs', 'DNS cache', 'Routing table of the HA'], answer: 0, explain: 'MNs currently visiting its network.' },
    ],
  },
};
