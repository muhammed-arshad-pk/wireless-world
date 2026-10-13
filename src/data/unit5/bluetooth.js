import { Bluetooth } from 'lucide-react';

export default {
  slug: 'introduction-bluetooth',
  number: 7,
  title: 'Introduction to Bluetooth Technology: Overview',
  icon: Bluetooth,
  color: '#3b82f6',
  difficulty: 'Beginner',
  summary: 'Bluetooth basics: architecture, device roles, pairing, piconets and scatternets, Classic vs BLE, Bluetooth vs Wi-Fi.',
  tagline: 'Short-range wireless that connects your personal devices.',
  keywords: ['bluetooth', 'piconet', 'scatternet', 'master', 'slave', 'central', 'peripheral', 'pairing', 'bonding', 'ble', 'bluetooth low energy', 'classic', 'br/edr', 'fhss', 'afh', '2.4 ghz', 'wpan', 'ieee 802.15.1', 'profiles', 'a2dp', 'hid', 'gatt'],
  intro: [
    'Bluetooth is a short-range wireless technology for connecting personal devices such as earbuds, keyboards, watches, phones, laptops and cars over a few metres, replacing cables. It works in the 2.4 GHz ISM band using frequency hopping, needs little power, and is built into billions of devices each year. The Bluetooth Special Interest Group (SIG) was founded in 1998 by Ericsson, IBM, Intel, Nokia and Toshiba. The name comes from Harald “Bluetooth” Gormsson, the 10th-century king who united Denmark and Norway, just as the technology unites devices.',
    'Devices form small networks called piconets: one central (master) device coordinates up to seven active peripherals (slaves), which all follow its clock and frequency-hopping pattern. Piconets can link into a scatternet when a device takes part in two of them. Today Bluetooth has two flavours. Bluetooth Classic (BR/EDR) handles continuous streams like audio. Bluetooth Low Energy (BLE, since version 4.0 in 2010) handles brief data bursts from sensors and wearables at extremely low power.',
  ],
  definitions: {
    title: 'Key Terms',
    items: [
      { term: 'Piconet', text: 'One central (master) and up to 7 active peripherals (slaves) sharing a hopping sequence; more devices can be parked.' },
      { term: 'Scatternet', text: 'Two or more piconets joined by a device that participates in both (as a bridge).' },
      { term: 'Pairing / bonding', text: 'Authenticating two devices and creating shared keys; bonding stores the keys for future connections.' },
      { term: 'Profile', text: 'A standard for a use case: A2DP (stereo audio), HFP (hands-free), HID (keyboards/mice), GATT services (BLE).' },
    ],
  },
  compare: {
    title: 'Bluetooth Classic vs Bluetooth Low Energy',
    left: { title: 'Bluetooth Classic (BR/EDR)', subtitle: 'Continuous streams', points: ['Continuous voice/audio, file transfer', '79 × 1 MHz channels, 1600 hops/s', '1 Mbps (BR), 2–3 Mbps (EDR)', 'Medium power: headsets, car kits, speakers'] },
    right: { title: 'Bluetooth Low Energy (BLE)', subtitle: 'Brief bursts', points: ['Short bursts of sensor/control data', '40 × 2 MHz channels (3 for advertising)', '1 Mbps, 2 Mbps (5.0), long-range coded PHY', 'Extremely low power: wearables, beacons, fitness trackers'] },
  },
  flow: {
    title: 'How Bluetooth Works',
    steps: [
      { title: 'Discovery', text: 'Devices scan (inquiry / advertising) for nearby devices that are discoverable.' },
      { title: 'Pairing', text: 'Security authentication and key exchange: Just Works, numeric comparison, passkey or out-of-band.' },
      { title: 'Connection', text: 'Devices establish a secure link; the central sets the hopping pattern and timing.' },
      { title: 'Data exchange', text: 'Information is transmitted using a profile: audio, keystrokes, sensor readings, files.' },
    ],
  },
  table: {
    title: 'Bluetooth vs Wi-Fi',
    columns: ['Feature', 'Bluetooth', 'Wi-Fi'],
    rows: [
      ['Typical use', 'Short-range personal area network (WPAN)', 'High-speed LAN / Internet'],
      ['Standard', 'Bluetooth SIG (originally IEEE 802.15.1)', 'IEEE 802.11'],
      ['Indoor range', 'Typically up to ~10 m (Class 2)', 'Typically up to 50–100 m'],
      ['Data rate', '1–3 Mbps (Classic), 1–2 Mbps (BLE)', 'Hundreds of Mbps to Gbps'],
      ['Power usage', 'Low (BLE extremely low)', 'Higher'],
      ['Network', 'Piconet: 1 central + 7 active', 'BSS: one AP + many clients'],
    ],
  },
  formulas: [
    { name: 'Hop timing (Classic)', expr: '1600 hops/s → slot = 625 µs', note: 'The central transmits in even slots and peripherals in odd slots (TDD).' },
    { name: 'Classic channels', expr: 'f = 2402 + k MHz, k = 0…78', note: '79 channels of 1 MHz in the 2.4 GHz ISM band.' },
    { name: 'Power classes', expr: 'Class 1: 100 mW (~100 m) · Class 2: 2.5 mW (~10 m) · Class 3: 1 mW (~1 m)', note: 'Range depends heavily on environment.' },
  ],
  cards: {
    title: 'Common Applications',
    items: [
      { title: 'Audio devices', text: 'Earbuds, headsets and speakers (A2DP, HFP, LE Audio).' },
      { title: 'Wearables', text: 'Smartwatches and fitness bands (BLE).' },
      { title: 'Keyboards & mice', text: 'HID profile, low latency, long battery life.' },
      { title: 'File / data exchange', text: 'Phone-to-phone and phone-to-laptop transfers.' },
      { title: 'Sensors & beacons', text: 'Health sensors, indoor positioning, asset tags.' },
      { title: 'Smart home & car', text: 'Locks, lights, car kits and digital keys.' },
    ],
  },
  lists: [
    { title: 'Advantages', tone: 'good', items: ['Low power and low cost', 'Universal in phones and laptops', 'No infrastructure needed', 'Robust: adaptive frequency hopping', 'Built-in security (pairing and encryption)'] },
    { title: 'Limitations', tone: 'warn', items: ['Short range', 'Low data rate compared with Wi-Fi', 'Small piconet: 7 active peripherals', 'Shares the crowded 2.4 GHz band', 'Pairing complexity and occasional compatibility issues'] },
  ],
  lab: {
    key: 'w5-bt',
    title: 'Visualizer: Pair Devices & Build a Piconet',
    description: 'Scan, pair (with numeric comparison) and connect a phone to earbuds. Then build a piconet: add peripherals to the central until you hit the 7-active limit, and bridge a second piconet to form a scatternet.',
    badge: { name: 'Blue Connector', emoji: '🔵' },
    objectives: [
      { id: 'pair', label: 'Scan, pair and connect two devices', xp: 20 },
      { id: 'piconet', label: 'Fill a piconet to its 7-active limit', xp: 15 },
      { id: 'scatter', label: 'Bridge two piconets into a scatternet', xp: 15 },
    ],
  },
  quiz: [
    { q: 'Which technology is commonly used to connect wireless earbuds directly to a smartphone?', options: ['Wi-Fi', 'Bluetooth', 'Infrared', 'Satellite'], answer: 1, explain: 'Bluetooth (A2DP / LE Audio).' },
    { q: 'A piconet has at most how many active peripherals?', options: ['3', '7', '15', '255'], answer: 1, explain: 'One central + 7 active.' },
    { q: 'Bluetooth Classic hops how many times per second?', options: ['10', '160', '1600', '16000'], answer: 2, explain: '625 µs slots.' },
    { q: 'BLE is best suited for…', options: ['HD video', 'Brief sensor data bursts', 'Gigabit LAN', 'Satellite TV'], answer: 1, explain: 'Extremely low power for small data.' },
    { q: 'Two piconets linked by a shared device form a…', options: ['Mesh', 'Scatternet', 'BSS', 'ESS'], answer: 1, explain: 'The bridge device joins both.' },
  ],
  deep: {
    sections: [
      { title: 'Bluetooth architecture (protocol stack)', points: ['Radio: 2.4 GHz GFSK (BR), π/4-DQPSK and 8DPSK (EDR).', 'Baseband / Link Controller: hopping, timing, packets; Link Manager: setup, security.', 'HCI separates the host (OS) from the controller (chip).', 'L2CAP multiplexes; above it RFCOMM, SDP, profiles (Classic) or ATT/GATT (BLE).'] },
      { title: 'Pairing methods', points: ['Secure Simple Pairing (v2.1, 2007) uses ECDH key exchange.', 'Just Works: no confirmation, vulnerable to man-in-the-middle.', 'Numeric Comparison: both screens show a 6-digit code to confirm.', 'Passkey Entry and Out-of-Band (e.g. NFC tap) add protection; LE Secure Connections arrived in 4.2.'] },
      { title: 'Versions timeline', points: ['1.0 (1999) · 2.0 + EDR (2004, up to 3 Mbps) · 2.1 SSP (2007).', '4.0 (2010) introduced Bluetooth Low Energy.', '5.0 (2016): 2 Mbps LE, long range, larger advertising.', '5.2 LE Audio (2020), 5.4 (2023), 6.0 channel sounding (2024).'] },
    ],
    cases: [
      { year: '1998', title: 'SIG founded', text: 'Ericsson, IBM, Intel, Nokia and Toshiba formed the Bluetooth Special Interest Group.' },
      { year: '2010', title: 'Bluetooth 4.0 LE', text: 'Low Energy enabled coin-cell wearables and beacons.' },
      { year: '2020', title: 'Exposure notifications', text: 'BLE signal strength was used for contact tracing apps during COVID-19.' },
    ],
    myths: [
      { myth: 'Bluetooth and Wi-Fi can’t work together.', fact: 'Both use 2.4 GHz, but adaptive hopping and coexistence schemes let them share; phones run both at once.' },
      { myth: 'BLE is just slow Bluetooth.', fact: 'BLE is a different protocol designed for low power and short bursts, not a slowed-down Classic.' },
    ],
    examNotes: [
      'Bluetooth: short-range WPAN, 2.4 GHz ISM, FHSS (79 ch, 1600 hops/s), SIG 1998.',
      'Roles: central/master and peripheral/slave; piconet = 1 + 7 active; scatternet = linked piconets.',
      'Steps: discovery → pairing → connection → data exchange.',
      'Classic (audio, streams) vs BLE (bursts, very low power).',
      'Bluetooth vs Wi-Fi: range, rate, power, topology.',
    ],
    extraQuiz: [
      { q: 'Which pairing method shows the same 6-digit number on both devices?', options: ['Just Works', 'Numeric Comparison', 'Out-of-band', 'Legacy PIN'], answer: 1, explain: 'User confirms the codes match.' },
      { q: 'BLE advertises on how many channels?', options: ['1', '3', '40', '79'], answer: 1, explain: 'Channels 37, 38 and 39.' },
    ],
  },
};
