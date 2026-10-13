import { Router } from 'lucide-react';

export default {
  slug: 'general-description-80211',
  number: 3,
  title: 'General Description of IEEE 802.11',
  icon: Router,
  color: '#34d399',
  difficulty: 'Intermediate',
  summary: 'WLAN architecture: stations, APs, BSS, ESS, distribution system, and how the network operates.',
  tagline: 'How access points join up to cover a whole campus as one network.',
  keywords: ['bss', 'ess', 'distribution system', 'portal', 'station', 'access point', 'association', 'reassociation', 'roaming', 'csma/ca', 'dcf', 'beacon'],
  intro: [
    'An IEEE 802.11 network is built from a few simple building blocks. Stations (STAs) are the user devices. An access point (AP) with its associated stations forms a Basic Service Set (BSS). Several BSSs linked by a wired or wireless Distribution System (DS) form an Extended Service Set (ESS), which appears to users as one network with one name (SSID).',
    'Within this architecture, the network operates through a defined set of services: stations discover and associate with APs, data is delivered within and between BSSs, and when users walk around, they reassociate with a new AP without dropping out. Channel access within each BSS is coordinated by CSMA/CA under the Distributed Coordination Function (covered in depth in the next topic).',
  ],
  definitions: {
    title: 'Architecture Building Blocks',
    items: [
      { term: 'Basic Service Set (BSS)', text: 'One AP and the stations associated with it. It is identified by the BSSID (the AP’s MAC address).' },
      { term: 'Extended Service Set (ESS)', text: 'Multiple BSSs connected through a DS, sharing one SSID so stations can roam.' },
      { term: 'Distribution System (DS)', text: 'The backbone (usually Ethernet) that interconnects APs and forwards frames between them.' },
    ],
  },
  compare: {
    title: 'BSS vs ESS',
    left: { title: 'BSS', subtitle: 'One cell', points: ['Single AP coverage area', 'Stations communicate via that AP', 'Identified by BSSID', 'Like one cell in a cellular network'] },
    right: { title: 'ESS', subtitle: 'Many cells, one network', points: ['Many APs joined by the DS', 'Same SSID everywhere', 'Seamless roaming between APs', 'Campus, hotel, airport networks'] },
  },
  flow: {
    title: 'Wireless Network Operation',
    steps: [
      { title: 'Scan', text: 'The station listens for beacons or sends probe requests to find APs.' },
      { title: 'Authenticate', text: 'Identity check and WPA2/WPA3 key exchange.' },
      { title: 'Associate', text: 'The station registers with one AP. The DS learns where it is.' },
      { title: 'Transfer & roam', text: 'Data flows using CSMA/CA. On moving, the station reassociates with a stronger AP.' },
    ],
  },
  table: {
    title: '802.11 Services',
    columns: ['Service', 'Provided by', 'Purpose'],
    rows: [
      ['Association', 'Distribution system', 'Link a station to an AP'],
      ['Reassociation', 'Distribution system', 'Move an association to a new AP (roaming)'],
      ['Disassociation', 'Distribution system', 'End an association'],
      ['Distribution', 'Distribution system', 'Deliver frames between APs in an ESS'],
      ['Integration', 'Portal', 'Connect the WLAN to non-802.11 LANs (e.g. the wired network)'],
      ['Authentication / deauthentication', 'Station', 'Establish or end identity'],
      ['Privacy', 'Station', 'Encrypt frames (WPA2/WPA3)'],
      ['MSDU delivery', 'Station', 'Deliver data units'],
    ],
  },
  cards: {
    title: 'Components in Detail',
    items: [
      { title: 'Stations', text: 'End devices with 802.11 MAC + PHY.' },
      { title: 'Access Points', text: 'Stations with extra functions: beacons, association, bridging to the DS.' },
      { title: 'Portal', text: 'The gateway that integrates the WLAN with other LANs and the internet.' },
      { title: 'Beacons', text: 'Periodic AP frames (≈ every 102 ms) announcing SSID, rates and timing.' },
      { title: 'CSMA/CA', text: 'Listen before talking, back off randomly, and confirm with an ACK.' },
      { title: 'DCF', text: 'The default distributed channel-access method used by all stations.' },
    ],
  },
  lists: [
    { title: 'How Channel Access Works (Overview)', tone: 'info', items: ['Carrier sense: is the channel idle?', 'Wait DIFS, then a random backoff', 'Transmit the frame', 'Receiver waits SIFS and returns an ACK', 'Optional RTS/CTS reserves the channel for big frames'] },
    { title: 'Design Tips for an ESS', tone: 'good', items: ['Overlap AP cells by about 15–20% for smooth roaming', 'Use non-overlapping channels on neighbouring APs', 'Same SSID and security settings on all APs', 'A controller can coordinate roaming and load balancing'] },
  ],
  lab: {
    key: 'w3-ess',
    title: 'Visualizer: Roaming Across an ESS',
    description: 'Three access points connected by a distribution system form one campus network. Walk a student across the campus and watch the phone reassociate from AP to AP, with each management event logged. Then step through the joining sequence frame by frame.',
    badge: { name: 'Roaming Pro', emoji: '🚶' },
    objectives: [
      { id: 'join', label: 'Step through scan → authenticate → associate', xp: 20 },
      { id: 'roam', label: 'Roam across all three BSSs', xp: 25 },
    ],
  },
  quiz: [
    { q: 'A BSS consists of…', options: ['Several APs and a router', 'One AP and its associated stations', 'Only wired devices', 'A satellite and ground station'], answer: 1, explain: 'It is the basic building block.' },
    { q: 'What connects multiple APs in an ESS?', options: ['The portal', 'The distribution system', 'A beacon', 'The SSID'], answer: 1, explain: 'Usually a wired Ethernet backbone.' },
    { q: 'Moving from one AP to another within the same ESS uses which service?', options: ['Integration', 'Reassociation', 'Privacy', 'Deauthentication'], answer: 1, explain: 'Reassociation moves the station’s association.' },
    { q: 'Which device connects the WLAN to a non-802.11 network?', options: ['Portal', 'Station', 'Beacon', 'NIC'], answer: 0, explain: 'The portal provides the integration service.' },
    { q: 'What do APs broadcast periodically?', options: ['ACKs', 'Beacon frames', 'CTS frames', 'Probe responses only'], answer: 1, explain: 'Beacons announce the network.' },
  ],
  deep: {
    sections: [
      { title: 'Addressing across the DS', points: ['802.11 data frames can carry four address fields.', 'From station to AP: receiver = AP (BSSID), transmitter = station, destination = final host.', 'Between APs over a wireless DS (WDS): all four addresses are used.', 'The DS learns each station’s location from association, so frames go to the right AP.'] },
      { title: 'Roaming in practice', points: ['The station decides when to roam, usually when RSSI drops below a threshold.', 'It scans for a stronger AP with the same SSID, then sends a reassociation request.', 'The new AP informs the DS, and the old AP forwards any buffered frames.', 'Fast roaming (802.11r) and assisted roaming (802.11k/v) cut handover time for voice calls.'] },
      { title: 'Power-save operation', points: ['A station tells the AP it will sleep. The AP buffers its frames.', 'Beacons carry a TIM (Traffic Indication Map) listing stations with waiting data.', 'Sleeping stations wake for beacons and poll for their frames.', 'Wi-Fi 6 Target Wake Time schedules wake-ups precisely for IoT devices.'] },
    ],
    cases: [
      { year: '1997', title: 'BSS/ESS architecture defined', text: 'The original 802.11 standard defined the BSS, ESS and DS model still used today.' },
      { year: '2008', title: '802.11r fast roaming', text: 'Reduced handover delay for voice over Wi-Fi.' },
      { year: '2010s', title: 'Campus-wide Wi-Fi', text: 'Universities like those under India’s NKN rolled out ESS networks with thousands of APs.' },
    ],
    myths: [
      { myth: 'Each AP is a separate network.', fact: 'In an ESS, many APs share one SSID and act as a single network.' },
      { myth: 'The AP decides when your phone roams.', fact: 'In standard 802.11 the client decides. APs can only suggest it (802.11k/v).' },
      { myth: 'The distribution system must be wireless.', fact: 'It is usually wired Ethernet, though a wireless DS (mesh/WDS) is possible.' },
    ],
    examNotes: [
      'Architecture: STA, AP, BSS (BSSID), ESS (SSID), DS, portal.',
      'IBSS = ad hoc. Infrastructure BSS uses an AP.',
      'Services: association, reassociation, disassociation, distribution, integration, authentication, privacy, delivery.',
      'Operation: scan → authenticate → associate → data → reassociate (roam).',
      'Channel access via CSMA/CA under DCF, with RTS/CTS and ACK.',
    ],
    extraQuiz: [
      { q: 'BSSID is usually…', options: ['The network name', 'The AP’s MAC address', 'The channel number', 'A password'], answer: 1, explain: 'It uniquely identifies the BSS.' },
      { q: 'Which amendment provides fast BSS transition (fast roaming)?', options: ['802.11r', '802.11b', '802.11a', '802.11g'], answer: 0, explain: '802.11r.' },
    ],
  },
};
