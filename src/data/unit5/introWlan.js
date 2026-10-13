import { Wifi } from 'lucide-react';

export default {
  slug: 'introduction-wireless-lan',
  number: 1,
  title: 'Introduction to Wireless LAN',
  icon: Wifi,
  color: '#22d3ee',
  difficulty: 'Beginner',
  summary: 'What a WLAN is, its components and architecture, how it works, and how it compares with wired LANs.',
  tagline: 'Connect devices without cables.',
  keywords: ['wlan', 'wireless lan', 'wi-fi', 'access point', 'wireless client', 'router', 'modem', 'ssid', 'infrastructure', 'ad hoc', 'wired lan', 'ethernet', 'nic'],
  intro: [
    'A Wireless Local Area Network (WLAN) connects devices within a limited area, such as a home, college, office or library, using radio (or infrared) signals instead of cables. Most WLANs today follow the IEEE 802.11 standards and are known as Wi-Fi. Each device has a wireless network interface card (NIC) with an antenna, and an access point (AP) links the wireless devices to the wired network and the Internet.',
    'WLANs began as a way to extend wired Ethernet into places where cabling was hard or costly, such as old buildings, warehouses, hospitals and lecture halls. Today they are the default way most people get online. The trade-off is that the medium is shared and open: every device in range hears every transmission. Data rate, interference and security therefore need more care than on a cable.',
  ],
  definitions: {
    title: 'Basic Concepts',
    items: [
      { term: 'Access Point (AP)', text: 'A central device that broadcasts the wireless signal and bridges wireless clients to the wired LAN.' },
      { term: 'Wireless client (station)', text: 'Any device with a wireless NIC (laptop, phone, tablet, printer) that connects to the AP.' },
      { term: 'SSID', text: 'Service Set Identifier: the network name the AP advertises in beacons.' },
      { term: 'Cell / coverage area', text: 'The area around an AP where clients get a usable signal, typically tens of metres indoors.' },
    ],
  },
  compare: {
    title: 'WLAN vs Wired LAN',
    left: { title: 'Wireless LAN', subtitle: 'Radio waves', points: ['High mobility: roam anywhere in coverage', 'Easy, flexible installation, no drilling', 'Shared medium, subject to interference', 'Needs encryption (WPA2/WPA3)', 'Speed varies with distance and load'] },
    right: { title: 'Wired LAN (Ethernet)', subtitle: 'Cables', points: ['Fixed location at the wall socket', 'Labour-intensive cabling', 'Dedicated link per port, high reliability', 'Physically harder to tap', 'Stable full speed (1–10 Gbps)'] },
  },
  flow: {
    title: 'Working Principle of a WLAN',
    steps: [
      { title: 'Beacon', text: 'The AP periodically broadcasts beacons announcing its SSID, channel and capabilities.' },
      { title: 'Join', text: 'A client scans, then authenticates and associates with the AP (WPA2/WPA3 key exchange).' },
      { title: 'Transmit', text: 'Data is converted to radio signals by the NIC and sent over the air using CSMA/CA.' },
      { title: 'Bridge', text: 'The AP receives the frame and forwards it to the wired LAN, router and Internet, and back again.' },
    ],
  },
  table: {
    title: 'WLAN Architecture Types',
    columns: ['Architecture', 'Description', 'Typical use'],
    rows: [
      ['Infrastructure (BSS)', 'All clients talk through one AP', 'Homes, small offices'],
      ['Extended (ESS)', 'Many APs joined by a wired backbone, same SSID', 'Campuses, hospitals, airports'],
      ['Ad hoc (IBSS)', 'Devices talk directly, no AP', 'Quick file sharing, temporary groups'],
      ['Mesh', 'APs relay traffic wirelessly to each other', 'Large homes, outdoor and city Wi-Fi'],
    ],
  },
  formulas: [
    { name: 'Shared capacity', expr: 'per-user throughput ≈ cell throughput / active users', note: 'All clients on a channel share its airtime.' },
    { name: 'Free-space loss at 2.4 GHz', expr: 'FSPL(dB) ≈ 40 + 20 log₁₀(d in m)', note: 'At 10 m ≈ 60 dB; walls add more.' },
  ],
  cards: {
    title: 'Key Components',
    items: [
      { title: 'Access Point', text: 'Broadcasts the wireless signal and bridges to the wired network.' },
      { title: 'Wireless Client', text: 'Laptops, phones and IoT devices with wireless NICs.' },
      { title: 'Router', text: 'Routes packets between the LAN and the Internet (often combined with the AP at home).' },
      { title: 'Modem', text: 'Connects to the ISP line (fibre, DSL, cable).' },
      { title: 'Switch & backbone', text: 'Wired distribution connecting several APs.' },
      { title: 'Antennas', text: 'Omni or directional antennas shape the coverage area.' },
    ],
  },
  lists: [
    { title: 'Advantages', tone: 'good', items: ['Mobility within the building or campus', 'Flexible installation, no cabling', 'Easy expansion: add users instantly', 'Lower cost in hard-to-wire places', 'Supports phones, tablets and IoT natively'] },
    { title: 'Limitations', tone: 'warn', items: ['Signal interference and noise', 'Security risks: anyone in range can listen', 'Lower, variable speed compared with cable', 'Limited range; walls weaken signals', 'Shared airtime slows down with many users'] },
  ],
  lab: {
    key: 'w5-wlan',
    title: 'Visualizer: Build a Simple WLAN',
    description: 'Add the modem, router/AP and clients one by one. Each client scans, authenticates and associates, then you can send data and watch it travel through the AP to the Internet. Remove a piece to see what breaks.',
    badge: { name: 'WLAN Builder', emoji: '📶' },
    objectives: [
      { id: 'build', label: 'Get all four clients online', xp: 20 },
      { id: 'send', label: 'Send data from a client to the Internet', xp: 20 },
    ],
  },
  quiz: [
    { q: 'What does WLAN stand for?', options: ['Wireless Local Area Network', 'Wide Local Area Network', 'Wireless Local Access Network', 'Wired Local Area Network'], answer: 0, explain: 'A LAN that uses wireless links.' },
    { q: 'Which device bridges wireless clients to the wired LAN?', options: ['Modem', 'Access point', 'Repeater cable', 'Printer'], answer: 1, explain: 'The AP connects the two worlds.' },
    { q: 'The network name broadcast by an AP is the…', options: ['MAC', 'SSID', 'IP', 'DNS'], answer: 1, explain: 'Service Set Identifier.' },
    { q: 'Which is a limitation of WLANs?', options: ['No mobility', 'Interference', 'Needs cables', 'Cannot connect phones'], answer: 1, explain: 'The shared radio medium suffers interference.' },
    { q: 'In ad hoc mode, devices…', options: ['Use two APs', 'Talk directly without an AP', 'Need fibre', 'Only use infrared'], answer: 1, explain: 'An IBSS has no AP.' },
  ],
  deep: {
    sections: [
      { title: 'Joining a WLAN step by step', points: ['Passive scanning: listen for beacons; active scanning: send probe requests.', '802.11 authentication (open system) then association with the AP.', 'WPA2/WPA3 4-way handshake derives per-session encryption keys.', 'DHCP gives the client an IP address; now it can send data.'] },
      { title: 'Why a WLAN is a LAN extension', points: ['To upper layers, Wi-Fi frames look like Ethernet frames.', 'The AP translates between 802.11 frames and 802.3 frames.', 'One IP subnet can span both wired and wireless devices.', 'Roaming between APs keeps the same IP inside one subnet.'] },
      { title: 'Radio vs infrared WLANs', points: ['Almost all WLANs use radio: spread spectrum or OFDM in the 2.4/5/6 GHz ISM/UNII bands.', 'Infrared WLANs (and the 802.11 IR PHY) exist but need line of sight or diffuse reflection.', 'Narrowband microwave WLANs use a single licensed or unlicensed channel.', 'Later topics in this unit cover each technology.'] },
    ],
    cases: [
      { year: '1997', title: 'IEEE 802.11', text: 'The first WLAN standard: 1–2 Mbps using FHSS, DSSS or infrared.' },
      { year: '1999', title: 'Wi-Fi Alliance', text: 'Formed to certify interoperability; “Wi-Fi” became the brand.' },
      { year: '2003', title: 'Laptops go wireless', text: 'Built-in Wi-Fi (e.g. Intel Centrino) made WLAN access standard.' },
      { year: 'Today', title: 'Most traffic is wireless', text: 'Most home Internet traffic now reaches devices over Wi-Fi.' },
    ],
    myths: [
      { myth: 'Wi-Fi and the Internet are the same thing.', fact: 'Wi-Fi is only the local wireless link; the Internet comes through the router and modem.' },
      { myth: 'More bars always means more speed.', fact: 'Signal strength is one factor; channel congestion and the number of users matter too.' },
    ],
    examNotes: [
      'WLAN: LAN using radio/IR within a limited area; IEEE 802.11 = Wi-Fi.',
      'Components: AP, wireless clients (NIC), router, modem, backbone.',
      'Architectures: infrastructure (BSS/ESS), ad hoc (IBSS), mesh.',
      'Working: beacon → scan → authenticate/associate → transmit (CSMA/CA) → AP bridges.',
      'WLAN vs wired: mobility and flexibility vs reliability, speed and security.',
    ],
    extraQuiz: [
      { q: 'Before associating, a client can find APs by sending…', options: ['Probe requests', 'ARP replies', 'DNS queries', 'Pings'], answer: 0, explain: 'Active scanning uses probe requests.' },
      { q: 'At home, the AP is usually built into the…', options: ['Router', 'Printer', 'Monitor', 'Keyboard'], answer: 0, explain: 'A “wireless router” combines AP, router and switch.' },
    ],
  },
};
