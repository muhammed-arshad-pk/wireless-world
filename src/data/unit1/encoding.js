import { Binary } from 'lucide-react';

export default {
  slug: 'signal-encoding-techniques',
  number: 5,
  title: 'Signal Encoding Techniques',
  icon: Binary,
  color: '#60a5fa',
  difficulty: 'Intermediate',
  summary: 'Analog and digital data and signals, and the four data-to-signal conversions: line coding, modulation, PCM and AM/FM.',
  tagline: 'Turning data into signals that can actually travel.',
  keywords: ['encoding', 'line coding', 'nrz', 'manchester', 'ami', 'modulation', 'ask', 'fsk', 'psk', 'qam', 'pcm', 'sampling', 'quantization', 'nyquist', 'delta modulation', 'am', 'fm', 'pm', 'analog', 'digital', 'modem', 'codec'],
  intro: [
    'Data is what we want to send: text, voice, video. A signal is the electrical or electromagnetic representation that actually travels. Both data and signals can be analog (continuous values) or digital (discrete values), so there are four combinations, each with its own encoding technique and its own device.',
    'Digital data on a wire becomes a digital signal through line coding. Digital data sent over the air must ride on an analog carrier, so it is modulated (ASK, FSK, PSK, QAM) by a modem. Analog data such as voice is digitised by a codec using PCM, so it can be stored, encrypted and sent as bits. Analog data can also stay analog and be carried by AM, FM or PM, as in radio broadcasting. In every case the goal is the same: a signal that suits the medium, uses little bandwidth, stays synchronised and resists noise.',
  ],
  definitions: {
    title: 'Data vs Signals',
    items: [
      { term: 'Analog data', text: 'Continuous values, e.g. voice, temperature, video brightness.' },
      { term: 'Digital data', text: 'Discrete values, e.g. text, integers, binary files.' },
      { term: 'Carrier', text: 'A high-frequency sine wave that is changed (modulated) to carry the data through the air.' },
      { term: 'Signal element', text: 'The smallest unit of a signal (a pulse or symbol). One element may carry one or more bits.' },
    ],
  },
  compare: {
    title: 'Analog vs Digital Signals',
    left: { title: 'Analog signal', subtitle: 'Continuously varying', points: ['Infinite possible values', 'Noise accumulates through amplifiers', 'Needed to travel by radio (carriers)', 'E.g. AM/FM broadcast, modulated Wi-Fi carrier'] },
    right: { title: 'Digital signal', subtitle: 'Discrete levels', points: ['Finite levels (e.g. 0/1)', 'Repeaters regenerate clean pulses', 'Easy to encrypt, compress and correct errors', 'E.g. Ethernet cable, USB'] },
  },
  flow: {
    title: 'The Four Encoding Combinations',
    steps: [
      { title: 'Digital → Digital', text: 'Line coding: NRZ, Manchester, AMI (e.g. Ethernet, LAN cables).' },
      { title: 'Digital → Analog', text: 'Modulation: ASK, FSK, PSK, QAM (modems, Wi-Fi, mobile).' },
      { title: 'Analog → Digital', text: 'Sampling and quantization: PCM, delta modulation (digital voice).' },
      { title: 'Analog → Analog', text: 'AM, FM, PM (radio broadcasting).' },
    ],
  },
  table: {
    title: 'The Four Combinations at a Glance',
    columns: ['Combination', 'Techniques', 'How it works', 'Device', 'Example'],
    rows: [
      ['Digital → Digital', 'NRZ, Manchester, AMI', 'Bits become voltage levels or transitions on a wire', 'Line coder / transceiver', 'Ethernet, USB'],
      ['Digital → Analog', 'ASK, FSK, PSK, QAM', 'Bits change the amplitude, frequency or phase of a carrier', 'Modem', 'Wi-Fi, 4G/5G, DSL'],
      ['Analog → Digital', 'PCM, delta modulation', 'Sample → quantize → encode each sample as bits', 'Codec', 'Digital phone calls, CDs'],
      ['Analog → Analog', 'AM, FM, PM', 'The message changes the amplitude, frequency or phase of a carrier', 'Analog modulator', 'AM/FM radio, analog TV'],
    ],
  },
  formulas: [
    { name: 'Data rate vs signal rate', expr: 'S = N / r,  r = log₂ L', note: 'S = baud, N = bits/s, r = bits per element, L = number of levels (QAM-16 → 4 bits).' },
    { name: 'Nyquist sampling (A → D)', expr: 'fs ≥ 2 · fmax', note: 'Sample at least twice the highest frequency, or aliasing distorts the signal. Voice: 4 kHz → 8 kHz.' },
    { name: 'PCM bit rate (A → D)', expr: 'R = n · fs', note: 'n bits per sample × samples per second. Telephone: 8 × 8000 = 64 kbps.' },
    { name: 'AM signal (A → A)', expr: 's(t) = [1 + m·x(t)] · cos 2πfc t', note: 'm = modulation index (keep m ≤ 1 to avoid distortion).' },
  ],
  cards: {
    title: 'Key Techniques in Each Combination',
    items: [
      { title: 'NRZ (D → D)', text: 'High for 1, low for 0. Simple, but long runs lose sync and have a DC component.' },
      { title: 'Manchester (D → D)', text: 'A mid-bit transition in every bit: self-clocking, used by 10 Mbps Ethernet; needs double bandwidth.' },
      { title: 'ASK / FSK / PSK (D → A)', text: 'Bits switch the carrier’s amplitude, frequency or phase. PSK resists noise best.' },
      { title: 'QAM (D → A)', text: 'Amplitude + phase together carry many bits per symbol (16-QAM = 4 bits). Used by Wi-Fi and 4G.' },
      { title: 'PCM (A → D)', text: 'Sample, quantize to 2ⁿ levels, encode as n bits. Quantization adds a small rounding error.' },
      { title: 'Delta modulation (A → D)', text: 'Sends just 1 bit per sample: up or down. Simple, but can’t follow steep changes (slope overload).' },
      { title: 'AM (A → A)', text: 'Carrier amplitude follows the message. Simple receivers, but noise affects it easily.' },
      { title: 'FM / PM (A → A)', text: 'Carrier frequency or phase follows the message. Better sound quality and noise immunity, more bandwidth.' },
    ],
  },
  lists: [
    { title: 'Where You Meet Each Combination', tone: 'info', items: ['Digital→Digital: Ethernet, USB, serial links', 'Digital→Analog: Wi-Fi, 4G/5G, DSL, cable modems', 'Analog→Digital: phone calls, music recording, voice in mobiles', 'Analog→Analog: AM/FM radio, analog TV'] },
    { title: 'Key Ideas to Remember', tone: 'good', items: ['Data ≠ signal: either can be analog or digital', 'Anything sent by radio must use an analog carrier', 'Nyquist: sample at least twice the highest frequency', 'More levels or bits = more data, but needs a cleaner signal', 'FM resists noise better than AM'] },
  ],
  lab: {
    key: 'w1-linecode',
    title: 'Visualizer: The Four Encoding Combinations',
    description: 'See all four ways data becomes a signal: Digital → Digital (line coding), Digital → Analog (ASK/FSK/PSK), Analog → Digital (PCM) and Analog → Analog (AM/FM). Each one shows the input, the conversion and the output.',
    badge: { name: 'Bit Encoder', emoji: '0️⃣' },
    objectives: [
      { id: 'edit', label: 'Change the input (flip a bit or a PCM setting)', xp: 15 },
      { id: 'schemes', label: 'Explore all four conversions', xp: 25 },
    ],
  },
  quiz: [
    { q: 'Converting digital data to a digital signal is called…', options: ['Modulation', 'Line coding', 'Sampling', 'Multiplexing'], answer: 1, explain: 'Line codes like NRZ and Manchester do this.' },
    { q: 'Which technique sends digital data over a radio carrier?', options: ['Line coding', 'PCM', 'Modulation (ASK/FSK/PSK)', 'AM broadcasting'], answer: 2, explain: 'A modem changes the carrier to represent bits.' },
    { q: 'Voice converted to a bit stream is an example of…', options: ['Analog → digital', 'Digital → analog', 'Analog → analog', 'Digital → digital'], answer: 0, explain: 'PCM samples and quantizes analog voice.' },
    { q: 'By Nyquist, a 4 kHz voice signal must be sampled at least at…', options: ['2 kHz', '4 kHz', '8 kHz', '16 kHz'], answer: 2, explain: 'fs ≥ 2 × 4 kHz.' },
    { q: 'FM radio is an example of…', options: ['Digital → digital', 'Analog → analog', 'Analog → digital', 'Digital → analog'], answer: 1, explain: 'An analog message on an analog carrier.' },
  ],
  deep: {
    sections: [
      { title: 'Digital → Digital: line coding', points: ['NRZ is simplest but a long run of identical bits has no transitions, so the clock drifts.', 'Manchester puts a transition in every bit (self-clocking) at the cost of double bandwidth.', 'Bipolar-AMI alternates + and − for 1s: no DC, and errors break the pattern.', 'Faster Ethernet uses block codes and multilevel signals (4B/5B, PAM-4).'] },
      { title: 'Digital → Analog: modulation', points: ['ASK is cheapest but most affected by noise; FSK is robust; PSK uses bandwidth best.', 'QAM combines amplitude and phase: 16-QAM = 4 bits, 256-QAM = 8 bits per symbol.', 'Higher-order QAM needs a cleaner signal (higher SNR), so Wi-Fi lowers it as you move away.', 'The receiver (demodulator) reverses the process to recover the bits.'] },
      { title: 'Analog → Digital: PCM step by step', points: ['Sampling: measure the wave at regular intervals (fs ≥ 2fmax).', 'Quantization: round each sample to one of 2ⁿ levels; the rounding error is quantization noise.', 'Encoding: write each level as an n-bit code.', 'Each extra bit doubles the levels and adds about 6 dB of signal-to-quantization-noise ratio.'] },
      { title: 'Analog → Analog: AM, FM, PM', points: ['A baseband message (e.g. voice) is too low in frequency to radiate, so it rides on a carrier.', 'AM: simple, narrow bandwidth (2 × message bandwidth), sensitive to noise.', 'FM: constant amplitude, so noise spikes are clipped; wider bandwidth (Carson’s rule ≈ 2(Δf + fm)).', 'PM is closely related to FM; both are “angle modulation”.'] },
    ],
    cases: [
      { year: '1906', title: 'First AM voice broadcast', text: 'Reginald Fessenden transmitted voice and music using amplitude modulation.' },
      { year: '1933', title: 'FM invented', text: 'Edwin Armstrong patented wideband FM, which was far less affected by static.' },
      { year: '1962', title: 'T1 digital telephony', text: 'Bell’s T1 carrier sent 24 PCM voice channels (64 kbps each) over copper with AMI line coding.' },
      { year: '1980', title: 'Ethernet', text: '10 Mbps Ethernet adopted Manchester line coding for self-clocked transmission.' },
      { year: 'Today', title: 'Wi-Fi 6/7', text: 'Uses up to 1024- and 4096-QAM, carrying 10–12 bits per symbol.' },
    ],
    myths: [
      { myth: 'Baud and bits per second are always equal.', fact: 'They are only equal when each signal element carries exactly 1 bit; QAM carries several.' },
      { myth: 'Digital signals don’t suffer noise.', fact: 'They do, but repeaters can regenerate clean pulses if the noise stays below threshold.' },
      { myth: 'Sampling faster always helps a lot.', fact: 'Beyond the Nyquist rate there is no gain in captured information, only more data.' },
      { myth: 'Wireless data is sent as digital pulses through the air.', fact: 'Bits are always carried on an analog carrier wave by modulation.' },
    ],
    examNotes: [
      'Four combinations: D→D (line coding), D→A (ASK/FSK/PSK/QAM), A→D (PCM, delta), A→A (AM/FM/PM).',
      'Devices: line coder, modem, codec, analog modulator.',
      'Line codes: NRZ, Manchester (self-clocking), AMI (no DC).',
      'PCM: sampling (fs ≥ 2fmax) → quantization (2ⁿ levels) → encoding; R = n·fs.',
      'S = N/r, r = log₂L. FM resists noise better than AM.',
    ],
    extraQuiz: [
      { q: 'With 16-QAM, each symbol carries…', options: ['1 bit', '2 bits', '4 bits', '16 bits'], answer: 2, explain: 'log₂16 = 4.' },
      { q: 'Which line code is self-clocking?', options: ['NRZ', 'Manchester', 'AMI', 'None'], answer: 1, explain: 'Every bit has a mid-bit transition.' },
      { q: 'Telephone PCM (8 kHz, 8 bits) has a bit rate of…', options: ['8 kbps', '16 kbps', '64 kbps', '128 kbps'], answer: 2, explain: '8 × 8000 = 64 kbps.' },
    ],
  },
};
