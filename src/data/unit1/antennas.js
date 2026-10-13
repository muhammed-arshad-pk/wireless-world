import { Antenna } from 'lucide-react';

export default {
  slug: 'antennas-and-types',
  number: 2,
  title: 'Antennas and Their Types',
  icon: Antenna,
  color: '#a78bfa',
  difficulty: 'Intermediate',
  summary: 'How antennas transmit and receive EM waves: gain, patterns, polarization and types.',
  tagline: 'Understanding how antennas transmit and receive electromagnetic waves.',
  keywords: ['antenna', 'dipole', 'monopole', 'yagi', 'parabolic', 'horn', 'patch', 'gain', 'radiation pattern', 'polarization', 'beamwidth'],
  intro: [
    'An antenna is a device that converts electrical signals (alternating current) into electromagnetic waves for transmission, and converts incoming electromagnetic waves back into electrical signals during reception. It is the interface between a wired circuit and free space.',
    'By the principle of reciprocity, an antenna has the same gain and radiation pattern whether it transmits or receives. The antenna’s size is closely tied to wavelength: a half-wave dipole for 2.4 GHz is only about 6 cm long, while one for an FM station near 100 MHz is about 1.5 m.',
  ],
  definitions: {
    title: 'Antenna Characteristics',
    items: [
      { term: 'Radiation pattern', text: 'A plot of how radiated power varies with direction, usually drawn in polar form.' },
      { term: 'Gain (dBi)', text: 'How much an antenna concentrates power in its best direction compared with an ideal isotropic antenna.' },
      { term: 'Polarization', text: 'Orientation of the electric field: vertical, horizontal or circular.' },
    ],
  },
  compare: {
    title: 'Omnidirectional vs Directional Antennas',
    left: { title: 'Omnidirectional', subtitle: 'Doughnut-shaped pattern', points: ['Radiates/receives equally in all horizontal directions', 'Broad local coverage, low gain (2–8 dBi)', 'E.g. Wi-Fi access points, FM car antennas, mobile phones'] },
    right: { title: 'Directional', subtitle: 'Focused beam', points: ['Concentrates energy in one direction', 'High gain (10–60 dBi), long range', 'E.g. satellite dishes, Yagi TV antennas, point-to-point links'] },
  },
  flow: {
    title: 'Working Principle of an Antenna',
    steps: [
      { title: 'Information signal', text: 'The transmitter produces a modulated RF current.' },
      { title: 'Transmitting antenna', text: 'Accelerating electrons in the conductor create changing electric and magnetic fields.' },
      { title: 'Radio waves', text: 'The fields detach and propagate as an EM wave at the speed of light.' },
      { title: 'Receiving antenna', text: 'The arriving wave induces a small current, which the receiver amplifies and demodulates.' },
    ],
  },
  table: {
    title: 'Types of Antennas',
    columns: ['Antenna', 'Pattern', 'Typical gain', 'Key application'],
    rows: [
      ['Dipole (λ/2)', 'Omnidirectional (doughnut)', '2.15 dBi', 'FM/TV reception, reference antenna'],
      ['Monopole (λ/4)', 'Omnidirectional over ground plane', '~2–5 dBi', 'Car radios, mobile phones, walkie-talkies'],
      ['Yagi-Uda', 'Directional', '7–15 dBi', 'Rooftop TV, point-to-point links'],
      ['Parabolic dish', 'Highly directional, pencil beam', '30–60 dBi', 'Satellite TV/DTH, radar, deep-space links'],
      ['Horn', 'Directional', '10–25 dBi', 'Microwave feeds, measurements'],
      ['Patch (microstrip)', 'Broadside, directional', '6–9 dBi', 'Phones, GPS, Wi-Fi routers, 5G arrays'],
      ['Helical', 'Directional, circular polarization', '10–15 dBi', 'Satellite and space communication'],
    ],
  },
  formulas: [
    { name: 'Half-wave dipole length', expr: 'L ≈ λ / 2 = c / (2f)', note: 'About 6.2 cm at 2.4 GHz.' },
    { name: 'Gain and directivity', expr: 'G = η · D', note: 'η = radiation efficiency (0–1), D = directivity.' },
    { name: 'Parabolic dish gain', expr: 'G = η (πD / λ)²', note: 'Bigger dish or higher frequency gives more gain. η is typically 0.55–0.7.' },
    { name: 'Effective aperture', expr: 'Aₑ = G λ² / 4π', note: 'The area over which an antenna captures incoming power.' },
    { name: 'Friis transmission', expr: 'Pr = Pt · Gt · Gr · (λ / 4πd)²', note: 'Received power over a free-space link.' },
    { name: 'dBd ↔ dBi', expr: 'dBi = dBd + 2.15', note: 'dBd is relative to a dipole, dBi relative to isotropic.' },
  ],
  cards: {
    title: 'Transmitting & Receiving Antennas',
    items: [
      { title: 'Transmitting antenna', text: 'Converts RF power into radiated waves. It must handle power and match the transmitter impedance.' },
      { title: 'Receiving antenna', text: 'Captures very weak fields (microvolts) and converts them to current for the receiver.' },
      { title: 'Reciprocity', text: 'The same antenna has an identical pattern and gain in both roles.' },
      { title: 'Impedance matching', text: 'Antenna and cable impedances (e.g. 50 Ω) must match to avoid reflected power (VSWR).' },
      { title: 'Beamwidth', text: 'The angle between half-power (−3 dB) points of the main lobe.' },
      { title: 'Front-to-back ratio', text: 'Power in the main direction vs directly behind it.' },
    ],
  },
  lists: [
    { title: 'Applications of Antennas', tone: 'good', items: ['Mobile phones and base stations', 'Wi-Fi routers and Bluetooth devices', 'Satellite TV (DTH) and VSAT', 'Radar and navigation (GPS, NavIC)', 'Radio astronomy and space probes'] },
    { title: 'Polarization Matters', tone: 'info', items: ['Vertical: most mobile and land-mobile radio', 'Horizontal: much TV broadcasting', 'Circular: satellites and GPS, unaffected by orientation', 'A 90° mismatch can lose 20 dB or more of signal'] },
  ],
  lab: {
    key: 'w1-antenna',
    title: 'Visualizer: Antenna Radiation Patterns',
    description: 'Switch between antenna types and watch their radiation pattern change from a doughnut to a pencil beam. Rotate the beam, then explore how polarization affects reception.',
    badge: { name: 'Antenna Engineer', emoji: '📡' },
    objectives: [
      { id: 'types', label: 'View the pattern of every antenna type', xp: 25 },
      { id: 'polar', label: 'Find the polarization mismatch that kills reception', xp: 20 },
    ],
  },
  quiz: [
    { q: 'Which antenna is commonly used for highly directional satellite links?', options: ['Parabolic dish', 'Omnidirectional whip', 'Simple wire', 'Infrared sensor'], answer: 0, explain: 'A dish focuses energy into a narrow, high-gain beam.' },
    { q: 'The gain of a half-wave dipole is about…', options: ['0 dBi', '2.15 dBi', '30 dBi', '60 dBi'], answer: 1, explain: 'That is why dBi = dBd + 2.15.' },
    { q: 'Reciprocity means an antenna…', options: ['Works only for transmission', 'Has the same pattern for transmitting and receiving', 'Needs two feeds', 'Has no gain'], answer: 1, explain: 'Transmit and receive characteristics are identical.' },
    { q: 'What does the radiation pattern show?', options: ['Antenna weight', 'How radiated power varies with direction', 'Cable length', 'Battery life'], answer: 1, explain: 'Usually plotted on polar axes.' },
    { q: 'Which polarization is used by GPS satellites?', options: ['Vertical', 'Horizontal', 'Circular', 'None'], answer: 2, explain: 'Circular polarization (RHCP) works regardless of receiver orientation.' },
  ],
  deep: {
    sections: [
      { title: 'How radiation happens', points: ['A time-varying current means accelerating charges, which produce time-varying fields.', 'Near the antenna (near field) the energy oscillates back and forth. Beyond about 2D²/λ (far field) it radiates away as a plane wave.', 'Resonance: when the antenna length is about λ/2 (dipole) or λ/4 (monopole), current standing waves radiate efficiently.', 'Radiation resistance of a half-wave dipole is about 73 Ω, and a quarter-wave monopole about 36.5 Ω.'] },
      { title: 'Reading a radiation pattern', points: ['Main lobe: the direction of maximum radiation. Side lobes and back lobes are unwanted radiation.', 'HPBW (half-power beamwidth): the angle between −3 dB points. Narrow beams mean high gain.', 'Isotropic antenna: an imaginary point source radiating equally in all directions (0 dBi reference).', 'Gain and beamwidth trade off: doubling gain roughly halves the beam solid angle.'] },
      { title: 'Choosing an antenna', points: ['Coverage area: omnidirectional for broadcast-like coverage, directional for long links.', 'Frequency: size scales with λ, so microwave antennas can be tiny and array-based.', 'Polarization: match the transmitter, or use circular for moving or satellite links.', 'Arrays and beamforming (MIMO, 5G massive MIMO) electronically steer beams without moving parts.'] },
    ],
    cases: [
      { year: '1887', title: 'Hertz’s dipole', text: 'Heinrich Hertz used a dipole transmitter and loop receiver to prove EM waves exist.' },
      { year: '1926', title: 'Yagi-Uda antenna', text: 'Developed by Shintaro Uda and Hidetsugu Yagi in Japan. It is still the classic rooftop TV antenna.' },
      { year: '1960s', title: 'Deep-space dishes', text: 'Giant parabolic dishes (up to 70 m) began communicating with spacecraft across the solar system.' },
      { year: '2019', title: 'Massive MIMO in 5G', text: 'Base stations use 64 or more antenna elements to form steerable beams for many users at once.' },
    ],
    myths: [
      { myth: 'A bigger antenna is always better.', fact: 'An antenna should be sized for its wavelength. Mismatched size reduces efficiency.' },
      { myth: 'Antennas create power.', fact: 'Gain only redistributes power in space. Total radiated power never exceeds input power.' },
      { myth: 'Omnidirectional means a sphere.', fact: 'Most "omni" antennas are omnidirectional only horizontally. The pattern is a doughnut.' },
    ],
    examNotes: [
      'Antenna: converts current ↔ EM waves. Reciprocity: same Tx/Rx behaviour.',
      'Characteristics: radiation pattern, gain (dBi), directivity, beamwidth, polarization, impedance.',
      'Omni (doughnut, low gain) vs directional (beam, high gain).',
      'Types: dipole, monopole, Yagi-Uda, dish, horn, patch, helical.',
      'Formulas: L = λ/2, G = ηD, dish G = η(πD/λ)², Friis equation.',
      'Polarization: vertical, horizontal, circular. Mismatch causes heavy loss.',
    ],
    extraQuiz: [
      { q: 'HPBW is measured between points where power falls by…', options: ['1 dB', '3 dB', '10 dB', '20 dB'], answer: 1, explain: 'Half power = −3 dB.' },
      { q: 'Approximate length of a half-wave dipole at 100 MHz?', options: ['15 cm', '1.5 m', '15 m', '150 m'], answer: 1, explain: 'λ = 3 m, so λ/2 = 1.5 m.' },
    ],
  },
};
