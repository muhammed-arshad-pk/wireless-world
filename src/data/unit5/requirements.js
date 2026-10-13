import { ClipboardCheck } from 'lucide-react';

export default {
  slug: 'wireless-lan-requirements',
  number: 3,
  title: 'Wireless LAN Requirements',
  icon: ClipboardCheck,
  color: '#34d399',
  difficulty: 'Intermediate',
  summary: 'What makes a wireless network effective: data rate, coverage, reliability, security, power, scalability and QoS.',
  tagline: 'What makes a wireless network effective?',
  keywords: ['requirements', 'throughput', 'data rate', 'coverage', 'mobility', 'roaming', 'reliability', 'availability', 'security', 'privacy', 'power consumption', 'battery', 'scalability', 'compatibility', 'interference', 'qos', 'license-free', 'collocated networks'],
  intro: [
    'A WLAN must do everything a wired LAN does, such as high capacity, connectivity for many devices and broadcast support, while coping with problems a cable never has: mobile, battery-powered users, a shared and noisy radio channel, and signals that leak outside the building. WLAN design is therefore a balance between performance, coverage, reliability, security, power use and compatibility.',
    'Stallings lists the classic WLAN requirements: throughput, number of nodes, connection to the backbone LAN, service area (a typical diameter of 100–300 m), battery power consumption, transmission robustness and security, collocated network operation, license-free operation, handoff/roaming and dynamic configuration. Modern Wi-Fi standards answer each one with a specific feature: MIMO and OFDM for throughput, WPA3 for security, power-save modes for battery life, and so on.',
  ],
  definitions: {
    title: 'Key Terms',
    items: [
      { term: 'Throughput', text: 'Actual user data delivered per second. Always lower than the PHY rate because of overhead and contention.' },
      { term: 'Service area', text: 'The region a WLAN must cover; set by AP count, power, antennas and walls.' },
      { term: 'Quality of Service (QoS)', text: 'Prioritising delay-sensitive traffic (voice, video) over bulk data, e.g. 802.11e/WMM access categories.' },
      { term: 'Dynamic configuration', text: 'Adding, removing or moving devices automatically, without manual network setup.' },
    ],
  },
  compare: {
    title: 'Performance vs Battery Life',
    left: { title: 'Always awake', subtitle: 'Maximum performance', points: ['Lowest latency, instant delivery', 'Radio constantly listening', 'Drains phones and sensors fast', 'Suits laptops on power'] },
    right: { title: 'Power-save mode', subtitle: 'Sleep between beacons', points: ['AP buffers frames for sleeping clients (TIM in beacons)', 'Target Wake Time (Wi-Fi 6) schedules wake-ups', 'Days to years of battery for IoT', 'Adds some delay'] },
  },
  flow: {
    title: 'Designing to Meet Requirements',
    steps: [
      { title: 'Gather needs', text: 'Number of users and devices, applications (voice, video, data), area and building materials.' },
      { title: 'Survey & plan', text: 'Site survey; choose bands, AP locations, channels and transmit power.' },
      { title: 'Secure & prioritise', text: 'WPA3 (Enterprise for organisations), VLANs, QoS for voice/video.' },
      { title: 'Validate & monitor', text: 'Measure coverage and throughput, and adjust as usage grows.' },
    ],
  },
  table: {
    title: 'Requirement vs Design Solution',
    columns: ['Requirement / issue', 'Design solution'],
    rows: [
      ['High data rate', 'Wider channels, MIMO, OFDM/OFDMA, 5/6 GHz bands, Wi-Fi 6/7'],
      ['Weak coverage', 'Better AP placement, more APs, directional antennas'],
      ['Mobility', 'Same SSID on all APs, fast roaming (802.11r/k/v)'],
      ['Reliability & availability', 'Overlapping coverage, redundant controllers and power (PoE + UPS)'],
      ['Unauthorised access', 'Strong authentication and encryption: WPA3, 802.1X'],
      ['Battery life', 'Power-save mode, Target Wake Time, low-power IoT radios'],
      ['Many devices', 'More APs, smaller cells, OFDMA, client load balancing'],
      ['Interference & QoS', 'Proper channel planning, band steering, WMM priorities'],
    ],
  },
  formulas: [
    { name: 'Airtime per user', expr: 'airtime share ≈ 1 / active stations', note: 'A slow client uses more airtime per bit, slowing everyone (rate anomaly).' },
    { name: 'Real throughput', expr: 'throughput ≈ 50–70% × PHY rate', note: 'MAC overhead, ACKs, inter-frame spaces and contention take the rest.' },
    { name: 'Coverage radius', expr: 'received power = Pt + Gt + Gr − path loss ≥ receiver sensitivity', note: 'The link budget sets how far a given data rate reaches.' },
  ],
  cards: {
    title: 'The Requirements',
    items: [
      { title: 'Data Rate', text: 'Sufficient speed for the intended applications.' },
      { title: 'Coverage & Mobility', text: 'Seamless connectivity throughout the area, including roaming.' },
      { title: 'Reliability & Availability', text: 'Stable, continuous communication links.' },
      { title: 'Security & Privacy', text: 'Protect data and control network access.' },
      { title: 'Low Power Consumption', text: 'Essential for battery-powered client devices.' },
      { title: 'Scalability & Compatibility', text: 'Accommodate more devices and standard technologies.' },
      { title: 'Interference & QoS', text: 'Manage congestion and prioritise traffic.' },
      { title: 'License-free operation', text: 'Use ISM/UNII bands so users can deploy without a licence.' },
    ],
  },
  lists: [
    { title: 'Classic Stallings list', tone: 'info', items: ['Throughput · number of nodes', 'Connection to backbone LAN · service area', 'Battery power consumption', 'Transmission robustness & security', 'Collocated network operation · license-free operation', 'Handoff/roaming · dynamic configuration'] },
    { title: 'What goes wrong if ignored', tone: 'warn', items: ['Dead zones and dropped calls when coverage is weak', 'Slow network when too many users share one AP', 'Data theft on unencrypted networks', 'Flat batteries on always-awake devices', 'Neighbours’ networks overlapping on the same channel'] },
  ],
  lab: {
    key: 'w5-req',
    title: 'Visualizer: Design Your WLAN',
    description: 'Set the area, number of devices, the speed each needs, and choose band, AP count, security and power-saving. Seven requirement meters show live whether your design meets data rate, coverage, reliability, security, power, scalability and QoS.',
    badge: { name: 'Requirement Engineer', emoji: '📐' },
    objectives: [
      { id: 'all', label: 'Meet all seven requirements at once', xp: 30 },
      { id: 'overload', label: 'Overload the network and see requirements fail', xp: 15 },
    ],
  },
  quiz: [
    { q: 'Which requirement protects a WLAN from unauthorised access?', options: ['Data rate', 'Coverage and mobility', 'Security and privacy', 'Low power consumption'], answer: 2, explain: 'Authentication and encryption.' },
    { q: 'Target Wake Time mainly improves…', options: ['Security', 'Battery life', 'Range', 'Licensing'], answer: 1, explain: 'Devices sleep until scheduled wake-ups.' },
    { q: 'Real throughput is usually…', options: ['Equal to the PHY rate', 'Lower than the PHY rate', 'Double the PHY rate', 'Unrelated to the PHY rate'], answer: 1, explain: 'Overhead and contention reduce it.' },
    { q: 'Fast roaming between APs supports which requirement?', options: ['Mobility', 'Licensing', 'Power', 'Cost'], answer: 0, explain: 'Seamless handoff keeps sessions alive.' },
    { q: 'QoS ensures that…', options: ['All traffic is equal', 'Voice/video get priority', 'Encryption is off', 'Only one user connects'], answer: 1, explain: 'Delay-sensitive traffic goes first.' },
  ],
  deep: {
    sections: [
      { title: 'Why throughput is lower than the headline rate', points: ['Every frame has preamble, headers and an ACK; SIFS/DIFS gaps and backoff waste airtime.', 'Clients far from the AP use slower modulation and hog airtime.', 'Half duplex: only one station talks at a time on a channel.', 'Rule of thumb: real TCP throughput ≈ half to two-thirds of the PHY rate.'] },
      { title: 'Collocated networks', points: ['Neighbouring WLANs (flats, offices) share the same bands.', 'In 2.4 GHz only channels 1, 6 and 11 avoid overlap.', 'BSS colouring (Wi-Fi 6) helps stations ignore distant same-channel networks.', 'Good design lowers power so cells don’t needlessly overlap.'] },
      { title: 'Security requirement in depth', points: ['WEP (1997) was broken; WPA (2003) was an interim fix; WPA2 (2004) uses AES-CCMP.', 'WPA3 (2018) adds SAE (protection from offline password guessing) and 192-bit Enterprise mode.', 'Enterprise networks use 802.1X with a RADIUS server for per-user credentials.', 'Wireless intrusion detection spots rogue APs and attacks.'] },
    ],
    cases: [
      { year: 'Exam hall', title: 'Too many users', text: 'One AP serving 300 students’ online exam collapsed; adding six low-power APs on separate 5 GHz channels fixed it.' },
      { year: 'IoT', title: 'Battery sensors', text: 'Moisture sensors on Wi-Fi 6 with Target Wake Time run for years by waking only when scheduled.' },
    ],
    myths: [
      { myth: 'Maximum transmit power gives the best WLAN.', fact: 'Too much power causes co-channel interference and mismatched links with weak clients; balanced power is better.' },
      { myth: 'Hiding the SSID secures the network.', fact: 'Hidden SSIDs are easily discovered; only strong encryption and authentication protect it.' },
    ],
    examNotes: [
      'Requirements: data rate, coverage & mobility, reliability & availability, security & privacy, low power, scalability & compatibility, interference & QoS.',
      'Stallings: throughput, nodes, backbone connection, service area, battery, robustness & security, collocated networks, license-free, handoff/roaming, dynamic configuration.',
      'Solutions: AP placement, channel planning, WPA3/802.1X, power save/TWT, OFDMA, WMM QoS.',
    ],
    extraQuiz: [
      { q: 'Which 2.4 GHz channels do not overlap?', options: ['1, 2, 3', '1, 6, 11', '2, 7, 12', '5, 10, 13'], answer: 1, explain: 'They are 25 MHz apart.' },
      { q: 'WPA3 improved password security using…', options: ['WEP', 'SAE', 'TKIP', 'MAC filtering'], answer: 1, explain: 'Simultaneous Authentication of Equals.' },
    ],
  },
};
