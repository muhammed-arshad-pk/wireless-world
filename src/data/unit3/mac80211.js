import { Clock } from 'lucide-react';

export default {
  slug: 'mac-ieee-80211',
  number: 4,
  title: 'Medium Access Control (MAC) for IEEE 802.11',
  icon: Clock,
  color: '#60a5fa',
  difficulty: 'Advanced',
  summary: 'CSMA/CA, DCF, interframe spaces, random backoff, RTS/CTS and acknowledgements.',
  tagline: 'Listen first, wait your turn, and confirm every delivery.',
  keywords: ['mac', 'csma/ca', 'dcf', 'pcf', 'difs', 'sifs', 'backoff', 'contention window', 'rts', 'cts', 'ack', 'nav', 'hidden node', 'exposed node'],
  intro: [
    'The Medium Access Control (MAC) sublayer coordinates access to the shared wireless medium. Every station in a BSS uses the same channel, so the MAC decides who may transmit and when. It also adds addresses, checks for errors, acknowledges frames and retransmits lost ones.',
    'Radios cannot detect collisions while transmitting, so 802.11 uses Carrier Sense Multiple Access with Collision Avoidance (CSMA/CA). Stations listen before transmitting, wait a defined interval, count down a random backoff to spread out their attempts, and expect an acknowledgement for every frame. RTS/CTS can additionally reserve the channel to beat the hidden-node problem.',
  ],
  definitions: {
    title: 'Key Terms',
    items: [
      { term: 'Interframe spaces', text: 'Fixed idle gaps that set priority: SIFS (shortest, for ACK/CTS) < PIFS < DIFS (normal data).' },
      { term: 'Contention window (CW)', text: 'The range for the random backoff (0…CW slots). It doubles after each failed attempt (binary exponential backoff).' },
      { term: 'NAV', text: 'Network Allocation Vector: a virtual carrier-sense timer set from the duration field of overheard frames.' },
    ],
  },
  compare: {
    title: 'DCF vs PCF',
    left: { title: 'DCF', subtitle: 'Distributed Coordination Function', points: ['Mandatory, contention-based', 'Every station runs CSMA/CA itself', 'Fair, but no delay guarantees', 'Used by virtually all Wi-Fi'] },
    right: { title: 'PCF', subtitle: 'Point Coordination Function', points: ['Optional, contention-free', 'AP polls stations in turn', 'Uses PIFS to grab the channel', 'Rarely implemented. Replaced by HCF/EDCA (802.11e QoS)'] },
  },
  flow: {
    title: 'CSMA/CA Procedure',
    steps: [
      { title: 'Data ready → sense channel', text: 'Physical and virtual (NAV) carrier sense.' },
      { title: 'Idle for DIFS', text: 'If busy, wait until idle for a full DIFS.' },
      { title: 'Random backoff', text: 'Count down random slots. Freeze if the channel becomes busy.' },
      { title: 'Transmit → SIFS → ACK', text: 'No ACK means a collision is assumed: double the CW and retry.' },
    ],
  },
  table: {
    title: 'Timing Parameters (examples)',
    columns: ['Parameter', '802.11b (DSSS)', '802.11a/g/n (OFDM)', 'Meaning'],
    rows: [
      ['Slot time', '20 µs', '9 µs', 'Unit of backoff countdown'],
      ['SIFS', '10 µs', '16 µs (5 GHz)', 'Gap before ACK/CTS (highest priority)'],
      ['DIFS', '50 µs', '34 µs', 'SIFS + 2 slots, before new data'],
      ['CWmin', '31', '15', 'Initial contention window'],
      ['CWmax', '1023', '1023', 'Maximum after repeated failures'],
    ],
  },
  formulas: [
    { name: 'DIFS', expr: 'DIFS = SIFS + 2 × slot', note: 'OFDM 5 GHz: 16 + 2 × 9 = 34 µs.' },
    { name: 'PIFS', expr: 'PIFS = SIFS + slot', note: 'Lets the AP (PCF) seize the channel before DCF stations.' },
    { name: 'Backoff time', expr: 'Backoff = random(0, CW) × slot', note: 'CW doubles after each collision, up to CWmax.' },
    { name: 'Contention window growth', expr: 'CW_new = min(2·(CW+1) − 1, CWmax)', note: '15 → 31 → 63 → 127… 1023.' },
  ],
  cards: {
    title: 'Main MAC Functions',
    items: [
      { title: 'Channel Access', text: 'CSMA/CA decides who transmits.' },
      { title: 'Frame Addressing', text: 'Up to 4 MAC addresses per frame.' },
      { title: 'Acknowledgements', text: 'Every unicast data frame is ACKed after SIFS.' },
      { title: 'Retransmission', text: 'Missing ACK leads to backoff and retry (up to a limit).' },
      { title: 'Error Handling', text: 'A CRC-32 frame check sequence detects corrupted frames.' },
      { title: 'Fragmentation & Power Save', text: 'Split large frames, and buffer frames for sleeping stations.' },
    ],
  },
  lists: [
    { title: 'The Hidden-Node Problem', tone: 'warn', items: ['Stations A and C both reach the AP but can’t hear each other', 'Both sense "idle" and transmit, colliding at the AP', 'RTS/CTS fix: A sends RTS, the AP replies CTS (heard by C)', 'C sets its NAV and stays quiet until the exchange ends'] },
    { title: 'Frame Types', tone: 'info', items: ['Management: beacon, probe, authentication, association', 'Control: RTS, CTS, ACK, block ACK', 'Data: user payload (and QoS data)', 'Frame fields: control, duration, addresses, sequence, body, FCS'] },
  ],
  lab: {
    key: 'w3-csma',
    title: 'Visualizer: CSMA/CA Simulation',
    description: 'Three stations want to send at once. Run the CSMA/CA timeline and watch DIFS waits, random backoff countdowns, transmissions, SIFS and ACKs. Force a collision to see the contention window double. Then solve the hidden-node problem with RTS/CTS.',
    badge: { name: 'Collision Avoider', emoji: '🚦' },
    objectives: [
      { id: 'run', label: 'Run a CSMA/CA timeline to completion', xp: 20 },
      { id: 'collision', label: 'Observe a collision and binary exponential backoff', xp: 20 },
      { id: 'rtscts', label: 'Solve the hidden-node problem with RTS/CTS', xp: 25 },
    ],
  },
  quiz: [
    { q: 'What does CSMA/CA primarily help wireless devices do?', options: ['Avoid or reduce collisions', 'Increase satellite altitude', 'Assign IP addresses', 'Replace antennas'], answer: 0, explain: 'Collision avoidance via listening, backoff and ACKs.' },
    { q: 'Which interframe space is the shortest?', options: ['DIFS', 'PIFS', 'SIFS', 'EIFS'], answer: 2, explain: 'SIFS gives ACK/CTS the highest priority.' },
    { q: 'After a failed transmission (no ACK), the contention window…', options: ['Halves', 'Doubles', 'Stays the same', 'Becomes zero'], answer: 1, explain: 'Binary exponential backoff.' },
    { q: 'RTS/CTS mainly solves…', options: ['The hidden-node problem', 'Rain fade', 'Low battery', 'IP conflicts'], answer: 0, explain: 'The CTS warns stations that can’t hear the sender.' },
    { q: 'NAV stands for…', options: ['Network Allocation Vector', 'New Access Value', 'Node Address Variable', 'None'], answer: 0, explain: 'A virtual carrier-sense timer.' },
  ],
  deep: {
    sections: [
      { title: 'Backoff in detail', points: ['Pick a random integer in [0, CW] and multiply by the slot time.', 'Count down only while the medium is idle. Freeze when busy, resume after the next DIFS.', 'The station whose counter reaches zero first transmits. Others keep their remaining count, which rewards waiting.', 'A collision happens only if two counters hit zero in the same slot. Both then double their CW.'] },
      { title: 'Why ACKs are needed', points: ['The sender cannot detect a collision itself.', 'The receiver sends an ACK after SIFS. Since SIFS < DIFS, nobody else can grab the channel first.', 'No ACK within the timeout means the frame is retransmitted with a bigger CW.', 'Block ACKs (802.11n onward) acknowledge many frames at once for efficiency.'] },
      { title: 'QoS: HCF and EDCA (802.11e)', points: ['Traffic is split into access categories: voice, video, best effort, background.', 'Higher priorities get shorter AIFS and smaller contention windows.', 'Voice frames therefore usually win the channel, lowering latency for calls.', 'Wi-Fi 6 adds AP-scheduled uplink OFDMA (trigger frames) on top.'] },
    ],
    cases: [
      { year: '1997', title: 'DCF defined', text: 'The original standard made CSMA/CA with ACKs the mandatory access method.' },
      { year: '2005', title: '802.11e QoS', text: 'EDCA/HCCA added traffic priorities for voice and video.' },
      { year: '2019', title: 'Trigger-based access (Wi-Fi 6)', text: 'The AP schedules uplink transmissions, reducing contention in dense networks.' },
    ],
    myths: [
      { myth: 'Wi-Fi never has collisions.', fact: 'CSMA/CA only reduces them. Collisions still happen, especially in crowded networks.' },
      { myth: 'RTS/CTS should always be enabled.', fact: 'It adds overhead. It is mainly useful for large frames or hidden-node situations.' },
      { myth: 'More devices just share bandwidth equally.', fact: 'Contention overhead grows with users, so total throughput can drop.' },
    ],
    examNotes: [
      'MAC: channel access, addressing, ACK, retransmission, error check (FCS), fragmentation, power save.',
      'CSMA/CA under DCF: sense → DIFS → random backoff → transmit → SIFS → ACK.',
      'IFS priority: SIFS < PIFS < DIFS. DIFS = SIFS + 2 slots.',
      'Binary exponential backoff: CW 15 → 31 → … → 1023.',
      'RTS/CTS + NAV solve the hidden-node problem. PCF/HCF give contention-free/QoS access.',
    ],
    extraQuiz: [
      { q: 'DIFS for 802.11a (SIFS = 16 µs, slot = 9 µs) is…', options: ['25 µs', '34 µs', '50 µs', '9 µs'], answer: 1, explain: '16 + 2 × 9 = 34 µs.' },
      { q: 'Which frame does the AP send in reply to an RTS?', options: ['ACK', 'CTS', 'Beacon', 'Probe'], answer: 1, explain: 'Clear To Send.' },
    ],
  },
};
