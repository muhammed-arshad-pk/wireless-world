import { Lightbulb } from 'lucide-react';

export default {
  slug: 'wlan-technology-infrared',
  number: 4,
  title: 'Wireless LAN Technology: Infrared',
  icon: Lightbulb,
  color: '#f87171',
  difficulty: 'Beginner',
  summary: 'Infrared WLANs: how light carries data, transmitters and receivers, LOS and diffuse modes, pros and cons.',
  tagline: 'Short-range communication using infrared light.',
  keywords: ['infrared', 'ir lan', 'irda', 'led', 'laser diode', 'photodiode', 'line of sight', 'directed beam', 'omnidirectional', 'diffuse', 'ppm', 'ook', 'eye safety', 'background light'],
  intro: [
    'Infrared (IR) wireless LANs carry data on infrared light, just beyond visible red, at about 850–950 nm. A transmitter (an LED or laser diode) switches its light on and off very quickly to represent bits, and a receiver (a photodiode) converts the light pulses back into an electrical signal. Because light does not pass through walls, every room is its own isolated cell.',
    'Stallings describes three IR LAN techniques. Directed beam IR uses point-to-point links, for example between buildings or across a room. Omnidirectional IR places a base station on the ceiling that broadcasts to all transceivers in the room. Diffused IR has every transmitter aim at a reflective ceiling, so the light bounces down to everyone. The original IEEE 802.11 (1997) even included a diffuse IR physical layer at 1 and 2 Mbps.',
  ],
  definitions: {
    title: 'Key Terms',
    items: [
      { term: 'IR transmitter', text: 'LED (cheap, eye-safe, diffuse) or laser diode (fast, narrow beam) plus a driver that modulates intensity.' },
      { term: 'IR receiver', text: 'Photodiode with optical filter, amplifier and demodulator; large area collects more light.' },
      { term: 'Intensity modulation', text: 'Data changes light brightness: on-off keying (OOK) or pulse-position modulation (PPM).' },
      { term: 'Background radiation', text: 'Sunlight and lamps add IR noise that can swamp the receiver.' },
    ],
  },
  compare: {
    title: 'Line-of-Sight vs Diffuse Infrared',
    left: { title: 'Line-of-sight (directed)', subtitle: 'Point the beam', points: ['Narrow beam aimed at the receiver', 'Higher data rate and range', 'Any obstacle breaks the link', 'TV remotes, IrDA, building-to-building'] },
    right: { title: 'Diffuse', subtitle: 'Bounce off the ceiling', points: ['Wide beam lights the room’s surfaces', 'No aiming; robust to people moving', 'Multipath delay limits rate', 'Room-wide IR LANs (802.11 IR PHY)'] },
  },
  flow: {
    title: 'Working Principle of Infrared WLAN',
    steps: [
      { title: 'Data encoding', text: 'Bits are encoded into electrical pulses (OOK or PPM).' },
      { title: 'Infrared emission', text: 'The LED or laser converts the pulses into flashes of IR light.' },
      { title: 'Signal propagation', text: 'Light travels directly (LOS) or reflects off walls and ceiling (diffuse).' },
      { title: 'Reception & decoding', text: 'The photodiode converts light back to current; the receiver filters and decodes the bits.' },
    ],
  },
  table: {
    title: 'Three Infrared LAN Techniques (Stallings)',
    columns: ['Technique', 'How it works', 'Use'],
    rows: [
      ['Directed beam', 'Point-to-point focused beam', 'Links between buildings, token-ring style rooms'],
      ['Omnidirectional', 'Ceiling base station broadcasts to all; transceivers aim at it', 'Single-room cell, like a LAN hub'],
      ['Diffused', 'All transmitters aim at a reflective ceiling', 'Room-wide WLAN without aiming'],
    ],
  },
  formulas: [
    { name: 'Wavelength ↔ frequency', expr: 'f = c / λ', note: '850 nm ≈ 353 THz: far above radio, no spectrum licence needed.' },
    { name: 'Inverse-square law', expr: 'P_rx ∝ 1 / d²', note: 'Double the distance gives a quarter of the received light.' },
    { name: '16-PPM (802.11 IR, 1 Mbps)', expr: '4 bits → 1 pulse in one of 16 slots', note: 'Position encodes data; low average power, eye-safe.' },
  ],
  cards: {
    title: 'Applications',
    items: [
      { title: 'Remote controls', text: 'TVs, ACs and set-top boxes.' },
      { title: 'Short-range device links', text: 'IrDA on legacy phones, PDAs and printers.' },
      { title: 'Localised indoor WLAN', text: 'Room-contained networks where RF is unwanted.' },
      { title: 'Secure rooms', text: 'Defence and finance areas: signals cannot leave the room.' },
      { title: 'Hospitals & aircraft', text: 'No radio interference with sensitive equipment.' },
      { title: 'Optical wireless / Li-Fi', text: 'Modern light-based networking (IEEE 802.11bb).' },
    ],
  },
  lists: [
    { title: 'Advantages', tone: 'good', items: ['No RF interference; does not disturb Wi-Fi or radio', 'Localised security: contained within walls', 'Unregulated, licence-free, huge bandwidth', 'Cheap, low-power components', 'Every room can reuse the same “channel”'] },
    { title: 'Limitations', tone: 'warn', items: ['Blockage sensitivity: people and objects block it', 'Short range, typically under 10 m', 'Environmental interference: sunlight and lamps', 'Power limited by eye-safety rules', 'No coverage through walls; needs one cell per room'] },
  ],
  lab: {
    key: 'w5-ir',
    title: 'Visualizer: Send an Infrared Signal',
    description: 'Type a short message and transmit it as IR light pulses. Move the receiver further away, switch on sunlight or step an obstacle into the beam, and watch the received signal and bit errors change.',
    badge: { name: 'Light Messenger', emoji: '💡' },
    objectives: [
      { id: 'clean', label: 'Deliver a message with zero bit errors', xp: 20 },
      { id: 'noisy', label: 'Make sunlight or distance corrupt the message', xp: 20 },
    ],
  },
  quiz: [
    { q: 'Which type of infrared communication generally needs a direct optical path?', options: ['Line-of-sight infrared', 'Diffuse infrared', 'Omnidirectional radio', 'FHSS'], answer: 0, explain: 'The beam must reach the receiver directly.' },
    { q: 'Why is IR considered secure?', options: ['Strong encryption', 'It cannot pass through walls', 'It uses licensed bands', 'It has long range'], answer: 1, explain: 'The signal stays in the room.' },
    { q: 'The main noise source for IR receivers is…', options: ['Microwave ovens', 'Sunlight and lamps', 'Bluetooth', 'Thunder'], answer: 1, explain: 'Ambient IR light.' },
    { q: 'Which device converts IR light to an electrical signal?', options: ['LED', 'Photodiode', 'Magnetron', 'Speaker'], answer: 1, explain: 'The photodiode is the detector.' },
    { q: 'In diffused IR, transmitters aim at…', options: ['The receiver', 'A reflective ceiling', 'The window', 'The floor only'], answer: 1, explain: 'The light reflects to all receivers.' },
  ],
  deep: {
    sections: [
      { title: 'Why IR power is limited', points: ['Near-IR light focuses on the retina but triggers no blink reflex.', 'IEC 60825 sets maximum exposure, which caps transmitter power.', 'Diffuse LEDs spread power over a large area and are safer than lasers.', 'Receivers compensate with large photodiodes and optical concentrators.'] },
      { title: 'Fighting background light', points: ['Optical filters pass only the IR band of the LED.', 'Modulating onto a carrier (e.g. 38 kHz for remotes) lets the receiver filter out steady sunlight.', 'PPM concentrates energy in short pulses that stand out from noise.', 'Direct sunlight can still overwhelm the photodiode.'] },
      { title: 'IR vs radio WLAN', points: ['IR: huge unregulated bandwidth, room isolation, no RF interference.', 'Radio: passes walls, longer range, mobility, no aiming.', 'Radio won the WLAN market; IR remained in remotes, sensors and niche secure links.', 'Li-Fi revives optical WLANs using LED lighting.'] },
    ],
    cases: [
      { year: '1993', title: 'IrDA', text: 'The Infrared Data Association standardised short IR links used on laptops, PDAs and printers.' },
      { year: '1997', title: 'IR PHY in 802.11', text: 'Diffuse IR at 1–2 Mbps using 16-PPM and 4-PPM, rarely deployed.' },
      { year: '2023', title: 'IEEE 802.11bb', text: 'Light Communication (Li-Fi) standardised in the 802.11 family.' },
    ],
    myths: [
      { myth: 'IR goes through walls like Wi-Fi.', fact: 'Walls block IR completely: one reason it is secure but limited.' },
      { myth: 'IR LANs need a licence.', fact: 'Optical frequencies are unregulated, so no licence is required.' },
    ],
    examNotes: [
      'IR WLAN: 850–950 nm light; LED/laser transmitter, photodiode receiver.',
      'Techniques: directed beam, omnidirectional (ceiling base), diffused.',
      'Working: encoding → emission → propagation (LOS/diffuse) → reception & decoding.',
      'Advantages: no RF interference, security, licence-free, cheap.',
      'Limitations: blockage, short range, sunlight noise, eye-safety power limits.',
    ],
    extraQuiz: [
      { q: 'Which IR technique uses a ceiling-mounted base station broadcasting to all?', options: ['Directed beam', 'Omnidirectional', 'Diffused', 'FHSS'], answer: 1, explain: 'It acts like a room hub.' },
      { q: 'Doubling IR link distance changes received power by…', options: ['×2', '×½', '×¼', 'no change'], answer: 2, explain: 'Inverse-square law.' },
    ],
  },
};
