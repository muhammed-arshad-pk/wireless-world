import { Lightbulb } from 'lucide-react';

export default {
  slug: 'infrared-systems',
  number: 7,
  title: 'Infrared (IR) Systems and Applications',
  icon: Lightbulb,
  color: '#facc15',
  difficulty: 'Beginner',
  summary: 'How infrared links send data with light: transmitters, receivers, LOS and diffuse modes.',
  tagline: 'Wireless communication with invisible light.',
  keywords: ['infrared', 'ir', 'irda', 'led', 'photodiode', 'line of sight', 'diffuse', 'remote control', '38 khz', 'nec protocol', 'optical wireless', 'li-fi'],
  intro: [
    'Infrared (IR) communication sends data using light just beyond the red end of the visible spectrum, typically 850–950 nm. An LED or laser diode in the transmitter switches on and off to represent data, and a photodiode in the receiver converts the light pulses back into electrical signals.',
    'IR needs no radio licence, causes no radio interference and cannot pass through walls, which keeps it private within a room. The same property limits it: it usually needs line of sight, works over short distances, and can be swamped by sunlight. Its most familiar use is the TV remote control. The original 1997 IEEE 802.11 standard even included an infrared physical layer.',
  ],
  definitions: {
    title: 'Key Terms',
    items: [
      { term: 'IR transmitter', text: 'An LED or laser diode, plus a driver that modulates light intensity (on-off keying or PPM).' },
      { term: 'IR receiver', text: 'A photodiode with an optical filter (to block visible light), amplifier and demodulator.' },
      { term: 'IrDA', text: 'Infrared Data Association: standards for short-range IR data links (once common on phones and laptops).' },
    ],
  },
  compare: {
    title: 'Directed (LOS) vs Diffuse IR',
    left: { title: 'Directed / line-of-sight', subtitle: 'Point the beam', points: ['Narrow beam aimed at the receiver', 'Higher data rate and range', 'Blocked by any obstacle', 'E.g. TV remotes, IrDA, building-to-building links'] },
    right: { title: 'Diffuse / reflected', subtitle: 'Bounce off surfaces', points: ['Wide beam lights up walls and ceiling', 'No aiming needed, so works around obstacles', 'Lower data rate (multipath delay)', 'E.g. original 802.11 IR WLAN, room networks'] },
  },
  flow: {
    title: 'Working Principle of IR Systems',
    steps: [
      { title: 'Encode', text: 'Data bits are encoded (e.g. pulse-distance coding) and modulated on a carrier (38 kHz for remotes).' },
      { title: 'Emit', text: 'The IR LED flashes the pattern as invisible light.' },
      { title: 'Propagate', text: 'Light travels directly (LOS) or reflects off surfaces (diffuse).' },
      { title: 'Detect & decode', text: 'The photodiode receiver filters, demodulates and decodes the bits.' },
    ],
  },
  table: {
    title: 'IR vs Radio (RF) Wireless',
    columns: ['Property', 'Infrared', 'Radio (Wi-Fi/Bluetooth)'],
    rows: [
      ['Licensing', 'Not required', 'Unlicensed bands, but regulated'],
      ['Wall penetration', 'None, contained in the room', 'Passes through walls'],
      ['Interference', 'Sunlight, lamps', 'Other radios, microwaves'],
      ['Range', 'A few metres (indoor)', 'Tens of metres'],
      ['Security', 'High (physically contained)', 'Needs encryption'],
      ['Cost', 'Very low', 'Low to moderate'],
    ],
  },
  formulas: [
    { name: 'Photon wavelength ↔ frequency', expr: 'f = c / λ', note: '850 nm ≈ 353 THz, far above radio frequencies.' },
    { name: 'NEC remote bit timing', expr: '0 = 562.5 µs burst + 562.5 µs gap; 1 = 562.5 µs burst + 1687.5 µs gap', note: 'Bursts are 38 kHz carrier pulses.' },
    { name: 'Inverse-square intensity', expr: 'I ∝ 1 / d²', note: 'Doubling distance gives a quarter of the received optical power.' },
  ],
  cards: {
    title: 'Applications of Infrared Systems',
    items: [
      { title: 'Remote Controls', text: 'TVs, ACs, set-top boxes using 38 kHz-modulated codes.' },
      { title: 'IrDA Data Transfer', text: 'Early phones, laptops and printers.' },
      { title: 'Proximity & Motion Sensors', text: 'Automatic taps, phone screen-off sensors, PIR alarms.' },
      { title: 'Optical Wireless / Li-Fi', text: 'Light-based high-speed indoor networking (visible or IR).' },
      { title: 'Night Vision & Thermal', text: 'Cameras that see IR light or heat.' },
      { title: 'Industrial & Medical', text: 'IR thermometers, pulse oximeters, short-range links.' },
    ],
  },
  lists: [
    { title: 'Advantages', tone: 'good', items: ['No licensing, no RF interference', 'Secure: does not pass through walls', 'Very cheap, low power components', 'Safe in RF-sensitive places (hospitals, aircraft)'] },
    { title: 'Limitations', tone: 'warn', items: ['Needs line of sight (directed) or a reflective room (diffuse)', 'Short range', 'Disturbed by sunlight and bright lamps', 'Lower data rates than modern Wi-Fi', 'Blocked by people and objects'] },
  ],
  lab: {
    key: 'w3-ir',
    title: 'Visualizer: Infrared Link Lab',
    description: 'Switch between directed (LOS) and diffuse IR in a room, drop an obstacle in the way and see which link survives. Then press buttons on a TV remote and watch the real NEC pulse train it sends.',
    badge: { name: 'IR Insider', emoji: '🔦' },
    objectives: [
      { id: 'block', label: 'See an obstacle block LOS but not diffuse IR', xp: 20 },
      { id: 'remote', label: 'Send three remote-control commands', xp: 20 },
    ],
  },
  quiz: [
    { q: 'IR communication uses wavelengths around…', options: ['850–950 nm', '2.4 GHz', '100 MHz', '1 cm'], answer: 0, explain: 'Near-infrared light just beyond red.' },
    { q: 'Which component detects IR light in the receiver?', options: ['Loudspeaker', 'Photodiode', 'Magnetron', 'Dipole'], answer: 1, explain: 'It converts light to current.' },
    { q: 'A key security advantage of IR is that it…', options: ['Uses strong encryption', 'Cannot pass through walls', 'Travels kilometres', 'Uses licensed spectrum'], answer: 1, explain: 'The signal stays in the room.' },
    { q: 'Which IR mode works without aiming?', options: ['Directed LOS', 'Diffuse (reflected)', 'Laser link', 'None'], answer: 1, explain: 'Diffuse IR bounces off walls and ceiling.' },
    { q: 'TV remotes typically modulate IR at…', options: ['38 kHz', '2.4 GHz', '50 Hz', '1 MHz'], answer: 0, explain: 'The 38 kHz carrier helps reject ambient light.' },
  ],
  deep: {
    sections: [
      { title: 'Why a 38 kHz carrier?', points: ['Sunlight and lamps add constant or 100 Hz-flickering IR, a huge background.', 'Modulating bursts at 38 kHz lets the receiver use a band-pass filter tuned to that frequency.', 'The integrated receiver module (TSOP-style) outputs clean logic pulses.', 'This is like AM/ASK on an optical carrier.'] },
      { title: 'IR in IEEE 802.11', points: ['The 1997 standard defined a diffuse IR PHY at 1 and 2 Mbps (850–950 nm).', 'It used pulse-position modulation (16-PPM and 4-PPM).', 'It was rarely deployed because radio Wi-Fi offered range and mobility.', 'Optical wireless ideas returned later as Li-Fi (IEEE 802.11bb, 2023).'] },
      { title: 'Eye safety and power', points: ['IR power is limited by eye-safety standards (IEC 60825).', 'LEDs (diffuse, safer) are preferred over lasers indoors.', 'Receivers use large-area photodiodes and lenses to collect more light instead of raising power.'] },
    ],
    cases: [
      { year: '1980s', title: 'IR remote controls', text: 'IR remotes replaced ultrasonic and wired remotes for TVs.' },
      { year: '1993', title: 'IrDA founded', text: 'Standardised short-range IR data exchange for laptops, PDAs and phones.' },
      { year: '1997', title: 'IR PHY in 802.11', text: 'Diffuse infrared was one of the three original 802.11 physical layers.' },
      { year: '2023', title: 'IEEE 802.11bb (Li-Fi)', text: 'Light communication was standardised within the 802.11 family.' },
    ],
    myths: [
      { myth: 'IR remotes use radio waves.', fact: 'They use invisible light. You can see the flashes through a phone camera.' },
      { myth: 'IR is obsolete.', fact: 'It is still everywhere: remotes, sensors, thermometers and optical wireless research.' },
      { myth: 'IR can control devices in other rooms.', fact: 'Walls block IR completely. That is a feature for privacy.' },
    ],
    examNotes: [
      'IR = optical wireless at ~850–950 nm. LED/laser transmitter, photodiode receiver.',
      'Modes: directed LOS (fast, needs aiming) vs diffuse/reflected (no aiming, slower).',
      'Remote controls: 38 kHz carrier with pulse-distance codes (e.g. NEC).',
      'Advantages: no licence, no RF interference, secure, cheap.',
      'Limitations: LOS, short range, sunlight, low data rate.',
    ],
    extraQuiz: [
      { q: 'How can you check if a TV remote is emitting IR?', options: ['Listen to it', 'Look at the LED through a phone camera', 'Touch it', 'Weigh it'], answer: 1, explain: 'Camera sensors can see near-IR light.' },
      { q: 'The original 802.11 IR physical layer used…', options: ['OFDM', 'Pulse-position modulation (PPM)', 'QAM', 'FM'], answer: 1, explain: '16-PPM and 4-PPM at 1 and 2 Mbps.' },
    ],
  },
};
