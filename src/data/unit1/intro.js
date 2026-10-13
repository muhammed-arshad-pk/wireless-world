import { Radio } from 'lucide-react';

export default {
  slug: 'introduction-wireless-communication',
  number: 1,
  title: 'Introduction to Wireless Communication Technology',
  icon: Radio,
  color: '#22d3ee',
  difficulty: 'Beginner',
  summary: 'What wireless communication is, how it evolved, and where it is used.',
  tagline: 'Information carried by invisible waves, with no wires attached.',
  keywords: ['wireless', 'electromagnetic', 'spectrum', 'frequency', 'wavelength', 'marconi', 'evolution', 'simplex', 'duplex'],
  intro: [
    'Wireless communication is the transfer of information between two or more points that are not connected by a physical conductor. The information travels as electromagnetic (EM) waves (radio, microwave or infrared) through air, space or even water.',
    'Every wireless system has the same basic chain: a transmitter converts information into an electrical signal and puts it onto a carrier wave, an antenna radiates it, the wave propagates through the channel, and a receiver’s antenna and circuits recover the original information. Everything else in this course explains one part of that chain.',
  ],
  definitions: {
    title: 'Key Terms',
    items: [
      { term: 'Frequency (f)', text: 'Number of wave cycles per second, measured in hertz (Hz). Wi-Fi uses 2.4 GHz = 2.4 billion cycles per second.' },
      { term: 'Wavelength (λ)', text: 'Distance one cycle occupies in space. λ = c / f, so higher frequency means a shorter wavelength.' },
      { term: 'Bandwidth', text: 'The range of frequencies a signal occupies. More bandwidth allows a higher data rate.' },
    ],
  },
  compare: {
    title: 'Wired vs Wireless Communication',
    left: { title: 'Wired', subtitle: 'Copper, coaxial, optical fibre', points: ['Very high, stable data rates', 'Little interference, easier to secure', 'Fixed locations, costly to lay cables', 'No mobility'] },
    right: { title: 'Wireless', subtitle: 'Radio, microwave, infrared', points: ['Mobility and quick deployment', 'Reaches remote and difficult areas', 'Shared medium: interference, fading, eavesdropping', 'Limited, licensed spectrum'] },
  },
  flow: {
    title: 'Basic Wireless Communication System',
    steps: [
      { title: 'Source & transmitter', text: 'Information (voice, data, video) is encoded and modulated onto a high-frequency carrier.' },
      { title: 'Transmitting antenna', text: 'Converts the electrical signal into an electromagnetic wave.' },
      { title: 'Wireless channel', text: 'The wave travels and suffers path loss, noise, interference and fading.' },
      { title: 'Receiver & destination', text: 'The receiving antenna captures the wave, and the receiver demodulates and decodes the information.' },
    ],
  },
  table: {
    title: 'Radio Frequency Bands (ITU)',
    columns: ['Band', 'Frequency', 'Wavelength', 'Typical uses'],
    rows: [
      ['VLF', '3–30 kHz', '100–10 km', 'Submarine communication, navigation'],
      ['LF', '30–300 kHz', '10–1 km', 'Long-wave broadcasting, RFID'],
      ['MF', '300 kHz–3 MHz', '1 km–100 m', 'AM broadcasting'],
      ['HF', '3–30 MHz', '100–10 m', 'Shortwave radio, amateur radio'],
      ['VHF', '30–300 MHz', '10–1 m', 'FM radio, TV, air-traffic radio'],
      ['UHF', '300 MHz–3 GHz', '1 m–10 cm', 'Mobile phones, Wi-Fi 2.4 GHz, GPS, Bluetooth'],
      ['SHF', '3–30 GHz', '10–1 cm', 'Wi-Fi 5/6 GHz, satellite, radar, 5G'],
      ['EHF', '30–300 GHz', '10–1 mm', 'mmWave 5G, satellite links, radio astronomy'],
    ],
  },
  formulas: [
    { name: 'Wavelength', expr: 'λ = c / f', note: 'c ≈ 3 × 10⁸ m/s. Example: 2.4 GHz gives λ ≈ 12.5 cm.' },
    { name: 'Period', expr: 'T = 1 / f', note: 'Time taken by one cycle of the wave.' },
    { name: 'Decibel (power ratio)', expr: 'dB = 10 log₁₀(P₂ / P₁)', note: '+3 dB doubles power, +10 dB is ×10.' },
  ],
  cards: {
    title: 'Types of Wireless Communication Systems',
    items: [
      { title: 'Broadcast Radio & TV', text: 'One transmitter to many receivers (AM, FM, DTH).' },
      { title: 'Cellular Networks', text: '1G–5G mobile phone systems using cells and base stations.' },
      { title: 'Satellite Systems', text: 'Communication, navigation (GPS, NavIC) and broadcasting from orbit.' },
      { title: 'Wireless LAN (Wi-Fi)', text: 'IEEE 802.11 networks in homes, campuses and offices.' },
      { title: 'Short-range WPAN', text: 'Bluetooth, Zigbee, NFC, RFID and infrared links.' },
      { title: 'Microwave & Point-to-Point', text: 'Line-of-sight links between towers.' },
    ],
  },
  lists: [
    { title: 'Applications & Advantages', tone: 'good', items: ['Mobility: communicate anywhere', 'Fast, low-cost deployment (no cabling)', 'Reaches rural, hilly and disaster areas', 'Enables IoT, smart cities and vehicles', 'Broadcasting to millions at once'] },
    { title: 'Limitations & Challenges', tone: 'warn', items: ['Limited, expensive radio spectrum', 'Interference and noise', 'Fading and multipath distortion', 'Security: anyone in range can listen', 'Battery and power constraints in mobile devices'] },
    { title: 'Modes of Communication', tone: 'info', items: ['Simplex: one direction only (radio broadcast)', 'Half duplex: both directions, one at a time (walkie-talkie)', 'Full duplex: both directions simultaneously (mobile call)'] },
  ],
  lab: {
    key: 'w1-spectrum',
    title: 'Visualizer: The Electromagnetic Spectrum',
    description: 'Explore the radio spectrum band by band, and use the wavelength calculator to see how frequency and wavelength trade off: the reason antennas, range and data rates differ so much between technologies.',
    badge: { name: 'Spectrum Explorer', emoji: '🌈' },
    objectives: [
      { id: 'bands', label: 'Explore every radio band', xp: 25 },
      { id: 'calc', label: 'Find the wavelength of a 2.4 GHz Wi-Fi signal', xp: 20 },
    ],
  },
  quiz: [
    { q: 'What does a wireless system use to carry information?', options: ['Copper wires', 'Electromagnetic waves', 'Sound waves only', 'Optical fibre'], answer: 1, explain: 'Radio, microwave and infrared are all electromagnetic waves.' },
    { q: 'If frequency increases, wavelength…', options: ['Increases', 'Decreases', 'Stays the same', 'Becomes zero'], answer: 1, explain: 'λ = c/f, so wavelength is inversely proportional to frequency.' },
    { q: 'A walkie-talkie is an example of…', options: ['Simplex', 'Half duplex', 'Full duplex', 'Broadcast'], answer: 1, explain: 'Both sides can talk, but only one at a time ("over").' },
    { q: 'Which band contains mobile phones, Wi-Fi 2.4 GHz and GPS?', options: ['VLF', 'MF', 'UHF', 'EHF'], answer: 2, explain: 'UHF spans 300 MHz to 3 GHz.' },
    { q: 'Which is a key limitation of wireless communication?', options: ['Mobility', 'Fading and interference', 'Fast deployment', 'Wide coverage'], answer: 1, explain: 'The shared radio channel suffers noise, interference and fading.' },
  ],
  deep: {
    sections: [
      { title: 'How EM waves carry information', points: ['A changing electric field creates a changing magnetic field and vice versa, so the pair propagates as a wave at the speed of light (Maxwell’s equations).', 'The carrier itself carries no information. Information is added by modulating its amplitude, frequency or phase.', 'Higher carrier frequencies offer more bandwidth (higher data rates) but travel shorter distances and are blocked more easily.', 'Spectrum is a limited natural resource, allocated by the ITU internationally and by the DoT/WPC wing in India.'] },
      { title: 'Evolution at a glance', points: ['Theory and experiments: Maxwell (1864), Hertz (1887), J. C. Bose (millimetre waves, 1895), Marconi (transatlantic signal, 1901).', 'Broadcasting: AM voice (1906), FM by Armstrong (1933), television (1930s–50s).', 'Mobile telephony: 1G analog (1979–83), 2G digital GSM (1991), 3G (2001), 4G LTE (2009), 5G (2019; India 2022).', 'Data networks: Wi-Fi (IEEE 802.11, 1997), Bluetooth (1999), IoT and satellite internet constellations.'] },
      { title: 'Challenges designers fight', points: ['Path loss: power falls with the square of distance (or faster).', 'Multipath fading: reflected copies add and cancel.', 'Noise and interference limit the usable data rate (Shannon’s limit).', 'Mobility: Doppler shift and handoffs.', 'Security: encryption and authentication are essential because the medium is open.'] },
    ],
    cases: [
      { year: '1895', title: 'J. C. Bose', text: 'Demonstrated millimetre-wave signalling in Kolkata, pioneering microwave optics and receivers.' },
      { year: '1901', title: 'Marconi’s transatlantic signal', text: 'The letter "S" in Morse code crossed the Atlantic by radio.' },
      { year: '1983', title: 'AMPS (1G)', text: 'Commercial analog cellular service launched in the USA.' },
      { year: '1997', title: 'IEEE 802.11', text: 'The first Wi-Fi standard (2 Mbps) was published.' },
      { year: '2022', title: '5G in India', text: 'Commercial 5G services began in October 2022.' },
    ],
    myths: [
      { myth: 'Wireless signals need air to travel.', fact: 'EM waves travel through vacuum, which is how satellites communicate with Earth.' },
      { myth: 'Higher frequency always means better.', fact: 'It gives more bandwidth but shorter range and poorer wall penetration.' },
      { myth: 'Wi-Fi and mobile data are the same thing.', fact: 'Wi-Fi is a local network (IEEE 802.11). Mobile data uses the cellular operator’s network.' },
    ],
    examNotes: [
      'Wireless communication = information transfer via EM waves without physical conductors.',
      'Basic system: source → transmitter → antenna → channel → antenna → receiver → destination.',
      'λ = c/f. Bands: VLF, LF, MF, HF, VHF, UHF, SHF, EHF.',
      'Wired vs wireless: reliability and speed vs mobility and easy deployment.',
      'Types: broadcast, cellular, satellite, WLAN, WPAN, point-to-point.',
      'Challenges: spectrum, interference, fading, security, power.',
    ],
    extraQuiz: [
      { q: 'What is the wavelength of a 300 MHz signal?', options: ['1 m', '10 m', '1 cm', '100 m'], answer: 0, explain: 'λ = 3×10⁸ / 3×10⁸ = 1 m.' },
      { q: 'Who demonstrated millimetre-wave communication in Kolkata in 1895?', options: ['Marconi', 'J. C. Bose', 'Hertz', 'Tesla'], answer: 1, explain: 'Sir Jagadish Chandra Bose.' },
    ],
  },
};
