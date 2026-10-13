import { Wifi } from 'lucide-react';

export default {
  slug: 'introduction-ieee-80211',
  number: 2,
  title: 'Introduction to IEEE 802.11',
  icon: Wifi,
  color: '#a78bfa',
  difficulty: 'Beginner',
  summary: 'What IEEE 802.11 defines, WLAN basics, components, and infrastructure vs ad hoc modes.',
  tagline: 'The rulebook every Wi-Fi device follows.',
  keywords: ['ieee 802.11', 'wlan', 'wi-fi alliance', 'station', 'access point', 'infrastructure mode', 'ad hoc', 'ibss', 'wi-fi direct', 'ssid'],
  intro: [
    'IEEE 802.11 is a set of standards from the Institute of Electrical and Electronics Engineers that defines how wireless local area networks (WLANs) work. It specifies the lowest two layers of the network stack: the Physical layer (how bits become radio signals) and the Medium Access Control (MAC) sublayer (how devices share the channel).',
    'Because everything above the MAC (IP, TCP, apps) works just like Ethernet, a Wi-Fi laptop runs the same internet applications as a wired one. The Wi-Fi Alliance tests and certifies products so devices from different makers work together. That certification is what the "Wi-Fi" logo means.',
  ],
  definitions: {
    title: 'Key Terms',
    items: [
      { term: 'WLAN', text: 'A local network where devices connect by radio, typically within a building or campus.' },
      { term: 'SSID', text: 'Service Set Identifier: the network name, e.g. "College_WiFi".' },
      { term: 'Wi-Fi Alliance', text: 'The industry body that certifies 802.11 products for interoperability and owns the "Wi-Fi" trademark.' },
    ],
  },
  compare: {
    title: 'Infrastructure Mode vs Ad Hoc Mode',
    left: { title: 'Infrastructure mode', subtitle: 'BSS with an access point', points: ['All traffic goes through the AP', 'AP connects to wired LAN and internet', 'Range extended with more APs (ESS)', 'Used in homes, offices, campuses'] },
    right: { title: 'Ad hoc mode', subtitle: 'IBSS: Independent BSS', points: ['Stations talk directly, with no AP', 'Quick temporary networks', 'Every station must be in range of the others', 'Modern equivalent: Wi-Fi Direct'] },
  },
  flow: {
    title: 'Where 802.11 Sits in the Network Stack',
    steps: [
      { title: 'Applications', text: 'Browser, WhatsApp, video: unchanged on Wi-Fi.' },
      { title: 'TCP/IP', text: 'The same as on wired networks.' },
      { title: '802.2 LLC + 802.11 MAC', text: 'Addressing, channel access (CSMA/CA), acknowledgements, security.' },
      { title: '802.11 PHY', text: 'Radio: frequency bands, modulation (OFDM/QAM), channels.' },
    ],
  },
  table: {
    title: 'Basic WLAN Components',
    columns: ['Component', 'Role', 'Example'],
    rows: [
      ['Station (STA)', 'Any device with an 802.11 interface', 'Laptop, phone, smart TV'],
      ['Access Point (AP)', 'Central station that bridges wireless and wired', 'Ceiling AP in a college'],
      ['Wireless router', 'AP + router + switch + firewall', 'Home Wi-Fi router'],
      ['Wireless NIC', 'Radio + antenna inside each device', 'Wi-Fi chip in a phone'],
      ['Distribution system', 'Backbone connecting APs', 'Ethernet switches in a building'],
      ['WLAN controller', 'Central management of many APs', 'Enterprise campus networks'],
    ],
  },
  cards: {
    title: 'Purpose of IEEE 802.11',
    items: [
      { title: 'Interoperability', text: 'Any certified device works with any certified AP.' },
      { title: 'Shared Medium Rules', text: 'Defines how many devices share one radio channel fairly.' },
      { title: 'Mobility', text: 'Roaming between APs within the same network.' },
      { title: 'Security', text: 'Authentication and encryption (WPA2/WPA3 via 802.11i).' },
      { title: 'Ethernet Compatibility', text: 'Uses 48-bit MAC addresses, so it bridges easily to wired LANs.' },
      { title: 'Power Saving', text: 'Stations can sleep and wake for buffered frames.' },
    ],
  },
  lists: [
    { title: 'IEEE Standard vs Wi-Fi Brand', tone: 'info', items: ['IEEE 802.11: the technical specification', 'Wi-Fi Alliance: tests and certifies products', 'Wi-Fi 4/5/6/7: consumer-friendly generation names', 'A device can follow 802.11 without being Wi-Fi certified'] },
    { title: 'Advantages of WLANs', tone: 'good', items: ['Mobility within the coverage area', 'No cabling, so faster and cheaper installation', 'Easy to add users', 'Supports guest and public access'] },
  ],
  lab: {
    key: 'w3-modes',
    title: 'Visualizer: Infrastructure vs Ad Hoc',
    description: 'Switch between infrastructure and ad hoc modes and send a frame from Laptop A to Phone C. In infrastructure mode it hops through the AP. In ad hoc mode it goes direct, if the devices are in range of each other.',
    badge: { name: 'Mode Switcher', emoji: '🔀' },
    objectives: [
      { id: 'infra', label: 'Send a frame in infrastructure mode', xp: 15 },
      { id: 'adhoc', label: 'Send a frame in ad hoc mode', xp: 15 },
      { id: 'range', label: 'See an ad hoc frame fail when out of range', xp: 15 },
    ],
  },
  quiz: [
    { q: 'IEEE 802.11 defines which layers?', options: ['Application and transport', 'Physical and MAC', 'Network only', 'Session and presentation'], answer: 1, explain: 'PHY + MAC sublayer of the data-link layer.' },
    { q: 'In infrastructure mode, stations communicate through…', options: ['Each other directly', 'An access point', 'A satellite', 'A modem cable'], answer: 1, explain: 'The AP forms and manages the BSS.' },
    { q: 'An ad hoc network is also called…', options: ['ESS', 'IBSS', 'DS', 'WAN'], answer: 1, explain: 'Independent Basic Service Set.' },
    { q: 'What is an SSID?', options: ['The network name', 'Encryption key', 'MAC address', 'Channel number'], answer: 0, explain: 'Service Set Identifier.' },
    { q: 'Who certifies Wi-Fi products?', options: ['IEEE', 'Wi-Fi Alliance', 'ITU', 'Bluetooth SIG'], answer: 1, explain: 'IEEE writes the standard. The Wi-Fi Alliance certifies interoperability.' },
  ],
  deep: {
    sections: [
      { title: 'Why the MAC matters', points: ['Ethernet’s CSMA/CD detects collisions on a wire. Radios can’t, because their own transmission drowns out others.', '802.11 therefore uses CSMA/CA, avoiding collisions with random backoff and acknowledgements.', 'The MAC also handles retransmission, fragmentation, power saving and security.', 'Frames have up to four MAC addresses (source, destination, transmitter, receiver) to cross APs.'] },
      { title: 'Joining a network', points: ['Scanning: passive (listen for beacons with the SSID) or active (send probe requests).', 'Authentication: open system, followed by WPA2/WPA3 key exchange.', 'Association: the station registers with one AP and gets an association ID.', 'Then data flows, and the station may later re-associate with another AP while roaming.'] },
      { title: 'Wi-Fi Direct and mesh', points: ['Wi-Fi Direct: one device acts like a soft AP, so phones can share files or cast screens without a router.', '802.11s and EasyMesh: multiple APs forward traffic wirelessly to cover large homes.', 'Both build on the basic infrastructure and ad hoc concepts.'] },
    ],
    cases: [
      { year: '1990', title: 'IEEE 802.11 working group', text: 'Formed to create a wireless LAN standard.' },
      { year: '1999', title: 'Wi-Fi Alliance (WECA)', text: 'Founded to certify interoperability.' },
      { year: '2010', title: 'Wi-Fi Direct', text: 'Device-to-device Wi-Fi without an access point.' },
    ],
    myths: [
      { myth: 'Wi-Fi and the internet are the same thing.', fact: 'Wi-Fi is just the local wireless link. The internet connection comes through the router’s broadband.' },
      { myth: 'Ad hoc mode is the same as a mesh network.', fact: 'Basic ad hoc has no relaying. Each station must reach the others directly.' },
      { myth: 'Hiding the SSID makes Wi-Fi secure.', fact: 'Hidden SSIDs are easily discovered. Strong WPA2/WPA3 encryption is what protects you.' },
    ],
    examNotes: [
      'IEEE 802.11 = WLAN standard covering the PHY and MAC layers.',
      'Wi-Fi Alliance certifies. Wi-Fi 4/5/6/7 are generation names.',
      'Components: STA, AP, wireless router, NIC, distribution system, controller.',
      'Infrastructure (BSS with AP) vs ad hoc (IBSS, peer-to-peer).',
      'Joining: scan → authenticate → associate → data.',
    ],
    extraQuiz: [
      { q: 'Why does 802.11 use collision avoidance instead of detection?', options: ['A radio can’t hear others while it transmits', 'It is cheaper', 'Cables are faster', 'Regulations'], answer: 0, explain: 'Its own strong signal masks others.' },
      { q: 'Which frame does an AP broadcast periodically to announce its network?', options: ['ACK', 'Beacon', 'RTS', 'CTS'], answer: 1, explain: 'Beacons carry the SSID and capabilities.' },
    ],
  },
};
