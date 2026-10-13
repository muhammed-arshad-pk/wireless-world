import { Binary } from 'lucide-react';

export default {
  slug: 'signal-encoding-techniques',
  number: 5,
  title: 'Signal Encoding Techniques',
  icon: Binary,
  color: '#60a5fa',
  difficulty: 'Intermediate',
  summary: 'Analog and digital data and signals, line coding, and the four data-to-signal conversions.',
  tagline: 'Turning data into signals that can actually travel.',
  keywords: ['encoding', 'line coding', 'nrz', 'nrzi', 'manchester', 'differential manchester', 'ami', 'pseudoternary', 'analog', 'digital'],
  intro: [
    'Data is what we want to send: text, voice, video. A signal is the electrical or electromagnetic representation that actually travels. Both data and signals can be analog (continuous values) or digital (discrete values), so there are four combinations, each with its own encoding technique.',
    'Signal encoding chooses how to represent data on the medium so that the receiver can recover it reliably and efficiently: using little bandwidth, staying synchronised, avoiding DC components and resisting noise.',
  ],
  definitions: {
    title: 'Data vs Signals',
    items: [
      { term: 'Analog data', text: 'Continuous values, e.g. voice, temperature, video brightness.' },
      { term: 'Digital data', text: 'Discrete values, e.g. text, integers, binary files.' },
      { term: 'Signal element', text: 'The smallest unit of a signal (a pulse or symbol). One element may carry one or more bits.' },
    ],
  },
  compare: {
    title: 'Analog vs Digital Signals',
    left: { title: 'Analog signal', subtitle: 'Continuously varying', points: ['Infinite possible values', 'Noise accumulates through amplifiers', 'Natural for radio carriers', 'E.g. AM/FM broadcast'] },
    right: { title: 'Digital signal', subtitle: 'Discrete levels', points: ['Finite levels (e.g. 0/1)', 'Repeaters regenerate clean pulses', 'Easy to encrypt, compress and correct errors', 'E.g. Ethernet, digital baseband'] },
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
    title: 'Digital-to-Digital Line Coding Schemes',
    columns: ['Scheme', 'Rule', 'Strength', 'Weakness'],
    rows: [
      ['NRZ-L', '0 = high level, 1 = low level', 'Simple, efficient bandwidth', 'DC component, loses sync on long runs'],
      ['NRZI', '1 = transition at start of bit, 0 = no transition', 'Differential: polarity errors don’t matter', 'Long runs of 0s lose sync'],
      ['Bipolar-AMI', '0 = no signal, 1 = alternating +/−', 'No DC, detects single errors', 'Long runs of 0s lose sync (fixed by B8ZS/HDB3)'],
      ['Pseudoternary', '1 = no signal, 0 = alternating +/−', 'Same as AMI, mirrored', 'Long runs of 1s lose sync'],
      ['Manchester', 'Mid-bit transition: 0 = high→low, 1 = low→high', 'Self-clocking, no DC (10 Mbps Ethernet)', 'Needs twice the bandwidth'],
      ['Differential Manchester', 'Always mid-bit transition. 0 = transition at start, 1 = none', 'Self-clocking, polarity-independent (Token Ring)', 'Twice the bandwidth'],
    ],
  },
  formulas: [
    { name: 'Data rate vs signal rate', expr: 'S = N / r', note: 'S = signal elements/s (baud), N = bits/s, r = bits per signal element.' },
    { name: 'Bits per level', expr: 'r = log₂ L', note: 'L = number of signal levels. 4 levels carry 2 bits each.' },
    { name: 'Nyquist bit rate (noiseless)', expr: 'C = 2B · log₂ L', note: 'Maximum data rate over bandwidth B with L levels.' },
  ],
  cards: {
    title: 'What Makes a Good Line Code?',
    items: [
      { title: 'Signal Spectrum', text: 'No DC component and low bandwidth.' },
      { title: 'Clocking / Synchronisation', text: 'Enough transitions for the receiver to recover timing.' },
      { title: 'Error Detection', text: 'Built-in rules (like AMI alternation) reveal errors.' },
      { title: 'Noise Immunity', text: 'Levels far enough apart to survive noise.' },
      { title: 'Cost & Complexity', text: 'Simple circuits at both ends.' },
      { title: 'Scrambling', text: 'B8ZS/HDB3 replace long zero runs to keep sync.' },
    ],
  },
  lists: [
    { title: 'Where You Meet Each Combination', tone: 'info', items: ['Digital→Digital: Ethernet, USB, serial links', 'Digital→Analog: Wi-Fi, 4G/5G, DSL, cable modems', 'Analog→Digital: phone calls, music recording, voice in mobiles', 'Analog→Analog: AM/FM radio, analog TV'] },
    { title: 'Key Ideas to Remember', tone: 'good', items: ['Data ≠ signal: either can be analog or digital', 'Baud (signal rate) ≠ bit rate when r > 1', 'Self-clocking codes trade bandwidth for synchronisation', 'Biphase codes (Manchester) have no DC component'] },
  ],
  lab: {
    key: 'w1-linecode',
    title: 'Visualizer: Line Coding Waveforms',
    description: 'Type your own bit pattern and watch it drawn as NRZ-L, NRZI, Bipolar-AMI, Manchester and Differential Manchester signals side by side. Notice where transitions happen, and where they don’t.',
    badge: { name: 'Bit Encoder', emoji: '0️⃣' },
    objectives: [
      { id: 'edit', label: 'Create your own bit pattern', xp: 15 },
      { id: 'schemes', label: 'Compare every line-coding scheme', xp: 25 },
    ],
  },
  quiz: [
    { q: 'Converting digital data to a digital signal is called…', options: ['Modulation', 'Line coding', 'Sampling', 'Multiplexing'], answer: 1, explain: 'Line codes like NRZ and Manchester do this.' },
    { q: 'Which line code is self-clocking?', options: ['NRZ-L', 'Manchester', 'NRZI', 'None'], answer: 1, explain: 'Every bit has a mid-bit transition.' },
    { q: 'In Bipolar-AMI, binary 1 is represented by…', options: ['No signal', 'Alternating positive and negative pulses', 'A constant high level', 'A transition at mid-bit'], answer: 1, explain: 'And binary 0 is no signal.' },
    { q: 'Voice converted to a bit stream is an example of…', options: ['Analog → digital', 'Digital → analog', 'Analog → analog', 'Digital → digital'], answer: 0, explain: 'PCM samples and quantizes analog voice.' },
    { q: 'A drawback of Manchester coding is…', options: ['DC component', 'No synchronisation', 'Twice the bandwidth', 'No transitions'], answer: 2, explain: 'Two signal changes per bit double the signalling rate.' },
  ],
  deep: {
    sections: [
      { title: 'Data and signal representation', points: ['Bit rate (bps) counts data. Baud (signal elements per second) counts changes on the line.', 'Multilevel signalling (e.g. 4 voltage levels) carries 2 bits per element, raising bit rate without raising baud.', 'A long run of identical bits with no transitions makes the receiver’s clock drift.', 'A DC component cannot pass through transformers or capacitively coupled lines.'] },
      { title: 'Scrambling: B8ZS and HDB3', points: ['B8ZS (North America): replaces 8 consecutive zeros with a pattern containing intentional "bipolar violations".', 'HDB3 (Europe/India E1 lines): replaces 4 consecutive zeros similarly.', 'The receiver recognises the violation pattern and restores the zeros.', 'This keeps AMI’s benefits while maintaining synchronisation.'] },
      { title: 'Why Ethernet changed codes', points: ['10 Mbps Ethernet: Manchester (self-clocking but bandwidth-hungry).', '100BASE-TX: 4B/5B block coding + MLT-3 for efficiency.', '1000BASE-T: PAM-5 multilevel signalling over 4 pairs.', 'Faster links use multilevel codes (PAM-4) to pack more bits per symbol.'] },
    ],
    cases: [
      { year: '1980', title: 'Ethernet (DIX)', text: '10 Mbps Ethernet adopted Manchester encoding for simple, self-clocked transmission.' },
      { year: '1962', title: 'T1 carrier', text: 'The first digital telephone carrier used bipolar AMI, later B8ZS.' },
      { year: '2017', title: 'PAM-4 in 400G Ethernet', text: 'Four-level signalling doubled bits per symbol for data-centre links.' },
    ],
    myths: [
      { myth: 'Baud and bits per second are always equal.', fact: 'They are only equal when each signal element carries exactly 1 bit.' },
      { myth: 'Digital signals don’t suffer noise.', fact: 'They do, but repeaters can regenerate clean pulses if the noise stays below threshold.' },
      { myth: 'Manchester is more efficient than NRZ.', fact: 'It is more robust (self-clocking), but needs about twice the bandwidth.' },
    ],
    examNotes: [
      'Four combinations: D→D (line coding), D→A (ASK/FSK/PSK/QAM), A→D (PCM), A→A (AM/FM/PM).',
      'NRZ-L, NRZI, AMI, pseudoternary, Manchester, differential Manchester: know the rules and draw them.',
      'Criteria: spectrum (no DC), clocking, error detection, noise immunity, cost.',
      'S = N/r, r = log₂L, Nyquist C = 2B log₂L.',
      'B8ZS/HDB3 scramble long zero runs.',
    ],
    extraQuiz: [
      { q: 'With 4 signal levels, each element carries…', options: ['1 bit', '2 bits', '4 bits', '8 bits'], answer: 1, explain: 'log₂4 = 2.' },
      { q: 'Which scheme is used on E1 lines (as in India) to handle long zero runs?', options: ['B8ZS', 'HDB3', 'NRZ-L', 'Manchester'], answer: 1, explain: 'HDB3 replaces runs of 4 zeros.' },
    ],
  },
};
