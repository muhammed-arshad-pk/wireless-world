import { Hexagon } from 'lucide-react';

export default {
  slug: 'cellular-networks-1g',
  number: 6,
  title: 'Cellular Wireless Networks and First-Generation Analog Systems',
  icon: Hexagon,
  color: '#fb923c',
  difficulty: 'Intermediate',
  summary: 'Cells, base stations, frequency reuse, handoff and roaming, and the analog 1G systems.',
  tagline: 'Reuse the same frequencies again and again, just far enough apart.',
  keywords: ['cellular', 'cell', 'base station', 'msc', 'frequency reuse', 'cluster', 'co-channel interference', 'handoff', 'handover', 'roaming', '1g', 'amps', 'nmt', 'cell splitting'],
  intro: [
    'Spectrum is limited, but millions of people want to talk at once. The cellular concept solves this. The service area is divided into small cells, each served by a low-power base station. Neighbouring cells use different frequencies, and the same frequencies are reused in cells far enough apart that they don’t interfere.',
    'Mobiles hand off between cells as they move, and a Mobile Switching Centre (MSC) connects calls to each other and to the public telephone network. The first generation (1G) of cellular systems, launched around 1979–1983, used this architecture with analog FM voice and FDMA.',
  ],
  definitions: {
    title: 'Key Terms',
    items: [
      { term: 'Cell & cluster', text: 'A cell is the area served by one base station. A cluster is a group of N cells that together use the full set of channels.' },
      { term: 'Frequency reuse', text: 'Using the same channel set in different clusters, separated by the reuse distance D.' },
      { term: 'Handoff (handover)', text: 'Transferring an ongoing call from one cell’s base station to another as the user moves.' },
    ],
  },
  compare: {
    title: 'Handoff vs Roaming',
    left: { title: 'Handoff', subtitle: 'During a call', points: ['Moving between cells of the same network', 'Must be seamless, in milliseconds', 'Triggered by signal strength and quality', 'Hard (break-before-make) in 1G/GSM'] },
    right: { title: 'Roaming', subtitle: 'Between networks', points: ['Using a visited operator’s network (another city or country)', 'Home and visited networks exchange subscriber info (HLR/VLR)', 'Billing via inter-operator agreements', 'Needs compatible technology'] },
  },
  flow: {
    title: 'How a Cellular Call Works',
    steps: [
      { title: 'Mobile registers', text: 'The phone finds the strongest cell and registers its location.' },
      { title: 'Call setup', text: 'The base station forwards the request to the MSC, which assigns a channel.' },
      { title: 'Conversation', text: 'Voice flows mobile ↔ BS ↔ MSC ↔ other party (PSTN or another mobile).' },
      { title: 'Handoff', text: 'As the user moves, the MSC switches the call to a stronger neighbouring cell.' },
    ],
  },
  table: {
    title: 'First-Generation (1G) Analog Systems',
    columns: ['System', 'Region / year', 'Band', 'Channel spacing'],
    rows: [
      ['NTT', 'Japan, 1979', '800 MHz', '25 kHz'],
      ['NMT', 'Nordic countries, 1981', '450 / 900 MHz', '25 / 12.5 kHz'],
      ['AMPS', 'USA, 1983', '800 MHz', '30 kHz'],
      ['TACS', 'UK, 1985', '900 MHz', '25 kHz'],
    ],
  },
  formulas: [
    { name: 'Cluster size', expr: 'N = i² + i·j + j²', note: 'i, j are non-negative integers, giving N = 1, 3, 4, 7, 9, 12…' },
    { name: 'Reuse distance', expr: 'D = R · √(3N)', note: 'R = cell radius. Larger N gives more separation and less interference.' },
    { name: 'Co-channel reuse ratio', expr: 'Q = D / R = √(3N)', note: 'N = 7 gives Q ≈ 4.58.' },
    { name: 'Signal-to-interference (6 interferers)', expr: 'S/I ≈ (√(3N))ⁿ / 6', note: 'With path-loss exponent n = 4 and N = 7: S/I ≈ 18.7 dB.' },
    { name: 'Capacity', expr: 'C = M · k · N', note: 'k channels/cell, N cells/cluster, M clusters. More clusters (smaller cells) means more capacity.' },
  ],
  cards: {
    title: 'Network Elements',
    items: [
      { title: 'Mobile Station (MS)', text: 'The handset: transceiver, antenna, control unit.' },
      { title: 'Base Station (BS)', text: 'Tower + radios serving one cell (or sector).' },
      { title: 'Mobile Switching Centre', text: 'Switches calls, manages handoff, connects to the PSTN.' },
      { title: 'HLR / VLR', text: 'Home and visitor databases tracking subscribers and location.' },
      { title: 'Cell Splitting', text: 'Divide busy cells into smaller ones to add capacity.' },
      { title: 'Sectoring', text: 'Directional antennas (3 × 120°) reduce interference.' },
    ],
  },
  lists: [
    { title: 'Principles of Cellular Networks', tone: 'info', items: ['Low-power transmitters, small cells', 'Frequency reuse in distant cells', 'Hexagonal cell model for planning', 'Handoff for mobility', 'Cell splitting and sectoring for growth'] },
    { title: 'Limitations of 1G Networks', tone: 'warn', items: ['Analog voice: noisy, no encryption, easy eavesdropping', 'Cloning fraud: phone identities copied', 'Low capacity (FDMA, one call per channel)', 'No data services, large expensive handsets', 'Incompatible national standards, so poor roaming'] },
  ],
  lab: {
    key: 'w2-cellular',
    title: 'Visualizer: Frequency Reuse & Handoff',
    description: 'Paint a hexagonal network with cluster sizes N = 3, 4, 7 and 12 and see the reuse distance and signal-to-interference ratio change. Then drive a car between two base stations and watch the handoff happen.',
    badge: { name: 'Cell Planner', emoji: '⬡' },
    objectives: [
      { id: 'reuse', label: 'Try every cluster size', xp: 20 },
      { id: 'handoff', label: 'Trigger a handoff by driving between cells', xp: 25 },
    ],
  },
  quiz: [
    { q: 'What allows cellular networks to serve many users with limited spectrum?', options: ['Bigger towers', 'Frequency reuse', 'Higher power', 'Analog voice'], answer: 1, explain: 'The same channels are reused in distant cells.' },
    { q: 'For cluster size N = 7, the reuse ratio D/R is about…', options: ['2.6', '4.58', '7', '21'], answer: 1, explain: '√21 ≈ 4.58.' },
    { q: 'Transferring an ongoing call to another cell is called…', options: ['Roaming', 'Handoff', 'Paging', 'Registration'], answer: 1, explain: 'Handoff (handover).' },
    { q: 'AMPS, the US 1G system, used…', options: ['Digital TDMA', 'Analog FM with FDMA', 'CDMA', 'OFDM'], answer: 1, explain: 'Analog FM voice on 30 kHz FDMA channels.' },
    { q: 'Which is a key weakness of 1G?', options: ['Too much encryption', 'No security, so calls could be overheard and phones cloned', 'Too much data', 'Tiny handsets'], answer: 1, explain: 'Analog signals were unencrypted.' },
  ],
  deep: {
    sections: [
      { title: 'Why hexagons?', points: ['Real coverage is irregular, but hexagons tile the plane without gaps or overlaps.', 'A hexagon approximates a circle well, so the base station is near the centre.', 'Hexagon geometry gives the neat result D = R√(3N).', 'To find co-channel cells: move i cells in one direction, turn 60°, move j cells.'] },
      { title: 'Capacity vs interference trade-off', points: ['Smaller N means each cell gets more channels (more capacity), but co-channel cells are closer, giving more interference.', 'Larger N means better S/I but fewer channels per cell.', 'AMPS needed S/I ≈ 18 dB, so it used N = 7.', 'Cell splitting shrinks R so the same N is reused more often in busy areas.'] },
      { title: 'Handoff strategies', points: ['Triggered when the serving signal falls below a threshold and a neighbour is stronger by a margin (hysteresis).', 'Hysteresis prevents "ping-pong" handoffs back and forth.', 'Hard handoff (1G, GSM): break the old link then make the new one.', 'Soft handoff (CDMA): connected to several base stations at once.'] },
    ],
    cases: [
      { year: '1947', title: 'Bell Labs cellular concept', text: 'D. H. Ring and W. R. Young proposed hexagonal cells with frequency reuse.' },
      { year: '1973', title: 'First handheld call', text: 'Martin Cooper of Motorola called a rival at Bell Labs from a prototype handset.' },
      { year: '1983', title: 'AMPS launch', text: 'The Motorola DynaTAC 8000X, the "brick phone", went on sale.' },
      { year: '1995', title: 'India skips 1G', text: 'India never deployed analog 1G. Mobile service launched directly with digital GSM in 1995.' },
    ],
    myths: [
      { myth: 'Cells are really hexagons.', fact: 'Real cells are irregular. Hexagons are a planning model.' },
      { myth: 'Higher tower power always improves the network.', fact: 'It increases co-channel interference. Cellular relies on low power and reuse.' },
      { myth: 'India had 1G analog mobile networks.', fact: 'India’s first mobile call (1995) was on a 2G GSM network.' },
    ],
    examNotes: [
      'Cellular = small cells + low power + frequency reuse + handoff.',
      'N = i² + ij + j². D = R√(3N). S/I ≈ (√(3N))ⁿ/6.',
      'Elements: MS, BS, MSC, HLR/VLR, PSTN.',
      'Handoff (between cells, during a call) vs roaming (between networks).',
      '1G: analog FM + FDMA (NTT, NMT, AMPS, TACS). Weaknesses: security, capacity, no data.',
    ],
    extraQuiz: [
      { q: 'Which (i, j) gives cluster size 7?', options: ['(1,1)', '(2,0)', '(2,1)', '(2,2)'], answer: 2, explain: '4 + 2 + 1 = 7.' },
      { q: 'Hysteresis in handoff prevents…', options: ['Roaming charges', 'Ping-pong handoffs between two cells', 'Power loss', 'Dropped SMS'], answer: 1, explain: 'The neighbour must be clearly stronger.' },
    ],
  },
};
