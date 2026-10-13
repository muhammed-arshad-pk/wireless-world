import { Network } from 'lucide-react';

export default {
  slug: 'wireless-networking-fundamentals',
  number: 1,
  title: 'Wireless Networking Fundamentals',
  icon: Network,
  color: '#22d3ee',
  difficulty: 'Beginner',
  summary: 'WPAN, WLAN, WMAN and WWAN: components, architectures and topologies of wireless networks.',
  tagline: 'From the earbuds in your ears to networks spanning continents.',
  keywords: ['wpan', 'wlan', 'wman', 'wwan', 'bluetooth', 'wi-fi', 'wimax', 'cellular', 'topology', 'mesh', 'ad hoc', 'access point'],
  intro: [
    'A wireless network connects devices using radio (or infrared) links instead of cables. Devices share a common radio channel, so the network must decide who transmits when, keep signals from interfering, and protect data travelling through the air.',
    'Wireless networks are classified by coverage area: Personal (WPAN), Local (WLAN), Metropolitan (WMAN) and Wide (WWAN). Each uses different standards, frequencies and power levels, and together they let a phone move smoothly between Bluetooth, Wi-Fi and cellular.',
  ],
  definitions: {
    title: 'Key Terms',
    items: [
      { term: 'Station (STA)', text: 'Any device with a wireless network interface: laptop, phone, IoT sensor.' },
      { term: 'Access point / base station', text: 'A fixed node that connects wireless devices to each other and to a wired network.' },
      { term: 'Topology', text: 'The logical arrangement of how nodes connect: star, point-to-point, mesh, ad hoc.' },
    ],
  },
  compare: {
    title: 'Infrastructure vs Ad Hoc Networks',
    left: { title: 'Infrastructure', subtitle: 'Through an access point / base station', points: ['Central device manages access', 'Connects to wired network and internet', 'Easier to manage and secure', 'E.g. home Wi-Fi, cellular'] },
    right: { title: 'Ad hoc / Mesh', subtitle: 'Device to device', points: ['No fixed infrastructure needed', 'Quick to set up (disaster zones, military)', 'Mesh nodes relay traffic for each other', 'E.g. Bluetooth piconet, Wi-Fi Direct, sensor networks'] },
  },
  flow: {
    title: 'Wireless Network Architecture',
    steps: [
      { title: 'End devices', text: 'Phones, laptops and sensors with wireless NICs and antennas.' },
      { title: 'Access layer', text: 'Access points, base stations or coordinators that devices associate with.' },
      { title: 'Distribution / core', text: 'Wired backbone, switches, controllers and the mobile core network.' },
      { title: 'Internet & services', text: 'Gateways connect the network to the internet and cloud.' },
    ],
  },
  table: {
    title: 'Types of Wireless Networks',
    columns: ['Type', 'Typical range', 'Standards / technologies', 'Example use'],
    rows: [
      ['WPAN (Personal)', '< 10 m (up to ~100 m)', 'Bluetooth, Zigbee, UWB (IEEE 802.15), NFC', 'Earbuds, smartwatch, smart-home sensors'],
      ['WLAN (Local)', '~50–100 m', 'Wi-Fi (IEEE 802.11)', 'Home, campus and office networks'],
      ['WMAN (Metropolitan)', 'Several km (city)', 'WiMAX (IEEE 802.16), point-to-multipoint links', 'City-wide broadband, last-mile access'],
      ['WWAN (Wide)', 'Regional to global', 'Cellular 2G–5G, satellite', 'Mobile internet, nationwide coverage'],
    ],
  },
  cards: {
    title: 'Components of Wireless Networks',
    items: [
      { title: 'Wireless NIC', text: 'The radio + antenna inside every device.' },
      { title: 'Access Point', text: 'Bridges wireless stations to the wired LAN.' },
      { title: 'Wireless Router', text: 'AP + router + switch (+ firewall) in one home box.' },
      { title: 'Base Station / eNB / gNB', text: 'The cellular equivalent of an AP, serving a cell.' },
      { title: 'Controller', text: 'Centrally manages many APs in enterprises.' },
      { title: 'Repeaters & Bridges', text: 'Extend coverage or link two networks wirelessly.' },
    ],
  },
  lists: [
    { title: 'Wireless Topologies', tone: 'info', items: ['Point-to-point: two nodes (microwave link, bridge)', 'Point-to-multipoint / star: one AP serves many stations', 'Mesh: nodes relay for each other, self-healing', 'Ad hoc: temporary peer-to-peer network'] },
    { title: 'Advantages', tone: 'good', items: ['Mobility and roaming', 'Easy, fast installation', 'Scalable: add users without cabling', 'Reaches places cables cannot'] },
    { title: 'Limitations', tone: 'warn', items: ['Lower and variable throughput than wired', 'Interference and congestion in shared spectrum', 'Security risks of an open medium', 'Coverage dead zones and battery drain'] },
  ],
  lab: {
    key: 'w2-netfund',
    title: 'Visualizer: Network Types & Topologies',
    description: 'Compare the coverage of WPAN, WLAN, WMAN and WWAN on a scale map, then switch between star, mesh, point-to-point and ad hoc topologies and send a packet to see how it travels.',
    badge: { name: 'Network Mapper', emoji: '🗺️' },
    objectives: [
      { id: 'types', label: 'Explore all four network types', xp: 20 },
      { id: 'topos', label: 'Send a packet in every topology', xp: 25 },
    ],
  },
  quiz: [
    { q: 'Bluetooth earbuds form which type of network?', options: ['WPAN', 'WLAN', 'WMAN', 'WWAN'], answer: 0, explain: 'A personal-area network within a few metres.' },
    { q: 'Wi-Fi is defined by which IEEE standard family?', options: ['802.3', '802.11', '802.15', '802.16'], answer: 1, explain: 'IEEE 802.11.' },
    { q: 'In which topology do nodes relay traffic for each other?', options: ['Star', 'Mesh', 'Point-to-point', 'Bus'], answer: 1, explain: 'Mesh networks forward traffic hop by hop.' },
    { q: 'Which device connects wireless stations to the wired LAN?', options: ['Access point', 'Keyboard', 'Monitor', 'Printer'], answer: 0, explain: 'The AP bridges wireless and wired networks.' },
    { q: 'A nationwide 4G network is a…', options: ['WPAN', 'WLAN', 'WMAN', 'WWAN'], answer: 3, explain: 'It covers a wide area.' },
  ],
  deep: {
    sections: [
      { title: 'How wireless differs from wired LANs', points: ['Shared medium: everyone in range hears every transmission, so access control (who transmits) is critical.', 'Half-duplex radios cannot listen while transmitting, so Wi-Fi avoids collisions instead of detecting them.', 'Signal strength varies with distance, walls and movement, so rates adapt continuously.', 'Security must be built in (encryption, authentication) because anyone can capture frames.'] },
      { title: 'Standards bodies', points: ['IEEE 802 committee: 802.11 (WLAN), 802.15 (WPAN), 802.16 (WMAN).', '3GPP: cellular standards (GSM, UMTS, LTE, 5G NR).', 'Wi-Fi Alliance and Bluetooth SIG certify interoperability.', 'ITU and national regulators (WPC in India) allocate spectrum.'] },
      { title: 'Choosing a network type', points: ['Range needed: centimetres (NFC) to kilometres (cellular).', 'Data rate: kbps (Zigbee sensors) to Gbps (Wi-Fi 7, 5G).', 'Power: coin-cell sensors need low-power WPAN.', 'Cost & licensing: Wi-Fi/Bluetooth use unlicensed bands, cellular uses licensed spectrum.'] },
    ],
    cases: [
      { year: '1971', title: 'ALOHAnet', text: 'The University of Hawaii built the first wireless packet network, inspiring Ethernet and Wi-Fi.' },
      { year: '1997', title: 'IEEE 802.11', text: 'The first WLAN standard was published.' },
      { year: '1999', title: 'Bluetooth 1.0', text: 'A short-range cable replacement for personal devices.' },
      { year: '2004', title: 'WiMAX (802.16)', text: 'Metropolitan broadband standard, later overtaken by LTE.' },
    ],
    myths: [
      { myth: 'Wireless is always slower than wired.', fact: 'Modern Wi-Fi and 5G can reach multi-gigabit speeds, though wired is more consistent.' },
      { myth: 'A mesh network needs no wired connection at all.', fact: 'At least one node usually connects to the internet. The others relay through it.' },
      { myth: 'Bluetooth and Wi-Fi interfere so much they can’t coexist.', fact: 'Both use 2.4 GHz but use hopping and coexistence mechanisms to share it.' },
    ],
    examNotes: [
      'Types by range: WPAN (Bluetooth/Zigbee), WLAN (802.11), WMAN (802.16), WWAN (cellular/satellite).',
      'Components: NIC, AP, router, base station, controller, repeater/bridge.',
      'Architecture: infrastructure vs ad hoc vs mesh.',
      'Topologies: point-to-point, point-to-multipoint (star), mesh, ad hoc.',
      'Pros: mobility, easy install, scalability. Cons: interference, security, variable speed.',
    ],
    extraQuiz: [
      { q: 'WiMAX belongs to which category?', options: ['WPAN', 'WLAN', 'WMAN', 'WWAN'], answer: 2, explain: 'IEEE 802.16 metropolitan networks.' },
      { q: 'Why does Wi-Fi avoid collisions rather than detect them?', options: ['Radios can’t easily listen while transmitting', 'It is cheaper', 'Cables are missing', 'It uses fibre'], answer: 0, explain: 'Hence CSMA/CA instead of CSMA/CD.' },
    ],
  },
};
