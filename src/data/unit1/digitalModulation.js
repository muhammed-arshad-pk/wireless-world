import { AudioWaveform } from 'lucide-react';

export default {
  slug: 'encoding-criteria-digital-to-analog',
  number: 6,
  title: 'Signal Encoding Criteria and Digital Data to Analog Signals',
  icon: AudioWaveform,
  color: '#f472b6',
  difficulty: 'Advanced',
  summary: 'Bandwidth, data rate, SNR, and how ASK, FSK, PSK and QAM put bits on a carrier.',
  tagline: 'Exploring how digital information modifies an analog carrier wave.',
  keywords: ['ask', 'fsk', 'psk', 'bpsk', 'qpsk', 'qam', 'constellation', 'snr', 'shannon', 'nyquist', 'bandwidth', 'eb/n0', 'ber'],
  intro: [
    'Radio channels can only carry analog (sinusoidal) signals, so digital data must be modulated onto a carrier wave. A carrier has three properties we can change: amplitude, frequency and phase. Changing them according to the bits gives ASK, FSK and PSK, and changing amplitude and phase together gives QAM.',
    'Choosing a scheme is a balancing act set by the encoding criteria: the data rate needed, the bandwidth available, and the signal-to-noise ratio. More bits per symbol (like 64-QAM) means higher speed in the same bandwidth, but it needs a cleaner signal.',
  ],
  definitions: {
    title: 'Signal Encoding Criteria',
    items: [
      { term: 'Data rate (R)', text: 'Bits per second. A higher data rate at the same SNR raises the bit error rate (BER).' },
      { term: 'Signal-to-noise ratio (SNR)', text: 'Signal power ÷ noise power, often in dB. Higher SNR means fewer errors.' },
      { term: 'Bandwidth (B)', text: 'Range of frequencies used. More bandwidth supports a higher data rate.' },
    ],
  },
  compare: {
    title: 'Bit Rate vs Symbol (Baud) Rate',
    left: { title: 'Bit rate', subtitle: 'Bits per second', points: ['Measures information sent', 'Example: 100 Mbps', 'Can exceed baud with multi-bit symbols'] },
    right: { title: 'Symbol (baud) rate', subtitle: 'Symbols per second', points: ['Measures carrier changes per second', 'Bandwidth depends on it', 'Bit rate = baud × log₂(M)'] },
  },
  flow: {
    title: 'Digital Modulation Process',
    steps: [
      { title: 'Bit stream', text: 'Digital data, e.g. 1 0 1 1 0.' },
      { title: 'Group into symbols', text: 'log₂M bits per symbol (1 for BPSK, 2 for QPSK, 4 for 16-QAM).' },
      { title: 'Map to carrier change', text: 'Each symbol picks an amplitude, frequency or phase.' },
      { title: 'Transmit & demodulate', text: 'The receiver measures the carrier and decides which symbol was sent.' },
    ],
  },
  table: {
    title: 'Modulation Techniques Comparison',
    columns: ['Technique', 'Property changed', 'Advantage', 'Limitation', 'Example use'],
    rows: [
      ['ASK', 'Amplitude', 'Simple design', 'Highly sensitive to noise and fading', 'Optical fibre (on-off keying), RFID'],
      ['FSK', 'Frequency', 'Noise-resistant, constant envelope', 'Needs more bandwidth', 'Bluetooth (GFSK), pagers, old modems'],
      ['BPSK', 'Phase (0°/180°)', 'Very robust', '1 bit per symbol', 'Satellite links, GPS, weak-signal links'],
      ['QPSK', 'Phase (4 phases)', '2 bits/symbol, same bandwidth as BPSK', 'Needs better SNR', 'Satellite TV, LTE, Wi-Fi'],
      ['QAM', 'Amplitude + phase', 'Highest spectral efficiency', 'Needs high SNR, sensitive to noise', 'Wi-Fi (up to 4096-QAM), cable modems, 4G/5G'],
    ],
  },
  formulas: [
    { name: 'Shannon capacity', expr: 'C = B · log₂(1 + SNR)', note: 'The theoretical maximum error-free data rate. SNR is linear here, not dB.' },
    { name: 'SNR in decibels', expr: 'SNR(dB) = 10 · log₁₀(S / N)', note: '30 dB means signal is 1000 × noise.' },
    { name: 'Nyquist (M levels)', expr: 'C = 2B · log₂(M)', note: 'Noiseless channel limit.' },
    { name: 'Bandwidth: ASK / PSK', expr: 'B_T = (1 + r) · R', note: 'r = filter roll-off (0–1), R = bit rate.' },
    { name: 'Bandwidth: MPSK / QAM', expr: 'B_T = (1 + r) · R / log₂M', note: 'More bits per symbol means less bandwidth for the same R.' },
    { name: 'Energy per bit', expr: 'Eb/N₀ = S / (N₀ · R)', note: 'The key quantity that determines BER.' },
  ],
  cards: {
    title: 'The Four Basic Techniques',
    items: [
      { title: 'Amplitude Shift Keying', text: 'Binary 1 = carrier present (or high amplitude), 0 = absent or low.' },
      { title: 'Frequency Shift Keying', text: 'Binary 1 and 0 use two different carrier frequencies.' },
      { title: 'Phase Shift Keying', text: 'Bits change the carrier phase (BPSK: 0° and 180°).' },
      { title: 'QPSK', text: 'Four phases (45°, 135°, 225°, 315°) give 2 bits per symbol.' },
      { title: 'QAM', text: 'Combines amplitude and phase. 16-QAM gives 4 bits/symbol, 256-QAM gives 8.' },
      { title: 'Constellation Diagram', text: 'Plots each symbol as a point (I, Q). Points farther apart are more noise-tolerant.' },
    ],
  },
  lists: [
    { title: 'Trade-offs to Remember', tone: 'warn', items: ['More bits/symbol: higher speed but needs higher SNR', 'FSK uses more bandwidth than PSK', 'ASK is cheap but fragile in fading channels', 'Adaptive modulation picks the best scheme as conditions change'] },
    { title: 'Real Systems', tone: 'info', items: ['Wi-Fi 6/7: BPSK → 1024/4096-QAM (adaptive)', 'LTE/5G: QPSK, 16/64/256-QAM', 'Bluetooth: GFSK, π/4-DQPSK, 8DPSK', 'DVB-S2 satellite TV: QPSK, 8PSK, 16/32APSK'] },
  ],
  lab: {
    key: 'w1-digimod',
    title: 'Visualizer: Modulate a Digital Signal',
    description: 'Enter your bits and see them modulated as ASK, FSK and BPSK. Explore constellation diagrams from BPSK to 16-QAM, then use the Shannon calculator to find the capacity limit of a channel.',
    badge: { name: 'Modulation Master', emoji: '〰️' },
    objectives: [
      { id: 'modulate', label: 'Modulate your own bit pattern', xp: 20 },
      { id: 'constellation', label: 'Explore a 16-QAM symbol', xp: 20 },
      { id: 'shannon', label: 'Compute channel capacity with Shannon’s formula', xp: 20 },
    ],
  },
  quiz: [
    { q: 'In Amplitude Shift Keying, which carrier property changes to represent digital data?', options: ['Amplitude', 'Antenna height', 'Propagation distance', 'Cable length'], answer: 0, explain: 'ASK switches the carrier amplitude.' },
    { q: 'How many bits does each 16-QAM symbol carry?', options: ['1', '2', '4', '16'], answer: 2, explain: 'log₂16 = 4.' },
    { q: 'Shannon capacity of a 1 MHz channel with SNR = 15 (linear)?', options: ['1 Mbps', '4 Mbps', '15 Mbps', '16 Mbps'], answer: 1, explain: 'C = 1M × log₂(16) = 4 Mbps.' },
    { q: 'Which modulation is most robust to noise for a given symbol rate?', options: ['BPSK', '64-QAM', '256-QAM', '1024-QAM'], answer: 0, explain: 'With only two widely separated points, BPSK tolerates the most noise.' },
    { q: 'Bluetooth mainly uses a variant of…', options: ['ASK', 'FSK (GFSK)', 'AM', 'PCM'], answer: 1, explain: 'Gaussian Frequency Shift Keying.' },
  ],
  deep: {
    sections: [
      { title: 'I/Q and constellations', points: ['Any carrier state can be written as I·cos(ωt) + Q·sin(ωt): an in-phase plus a quadrature component.', 'Each symbol is a point (I, Q). The distance from the origin is the amplitude and the angle is the phase.', 'Noise smears points into clouds. If clouds overlap neighbours, the receiver makes errors.', 'Gray coding: neighbouring points differ by only 1 bit, so a typical error costs one bit.'] },
      { title: 'BER, Eb/N0 and choosing a scheme', points: ['BER falls as Eb/N0 rises. Each scheme has a characteristic BER curve.', 'BPSK/QPSK need about 9.6 dB Eb/N0 for BER 10⁻⁵. 16-QAM needs about 13.4 dB.', 'Adaptive modulation and coding (AMC) switches scheme every few milliseconds based on channel quality.', 'This is why your Wi-Fi speed drops as you walk away from the router.'] },
      { title: 'MFSK, DPSK and variants', points: ['MFSK uses M frequencies (more bandwidth, very robust), used in long-range and low-power links.', 'DPSK encodes bits as phase changes relative to the previous symbol, so it needs no absolute phase reference.', 'GFSK smooths frequency transitions with a Gaussian filter to limit bandwidth (Bluetooth).', 'OQPSK/π/4-QPSK avoid zero-crossings, so they are friendlier to power amplifiers.'] },
    ],
    cases: [
      { year: '1948', title: 'Shannon’s theorem', text: 'Claude Shannon proved the maximum error-free capacity of a noisy channel.' },
      { year: '1960s', title: 'Bell 103 modem', text: 'Telephone modems used FSK at 300 bps.' },
      { year: '2019', title: 'Wi-Fi 6 (1024-QAM)', text: '802.11ax packs 10 bits per symbol in good conditions.' },
      { year: '2024', title: 'Wi-Fi 7 (4096-QAM)', text: '802.11be pushes to 12 bits per symbol.' },
    ],
    myths: [
      { myth: 'Higher-order QAM is always better.', fact: 'Only with high SNR. Far from the transmitter, simpler schemes give more throughput.' },
      { myth: 'Shannon capacity can be beaten with clever coding.', fact: 'No. Modern codes (LDPC, Turbo) only approach it.' },
      { myth: 'ASK is obsolete.', fact: 'On-off keying is still widely used in optical fibre and RFID.' },
    ],
    examNotes: [
      'Criteria: data rate, SNR, bandwidth, and BER as the result.',
      'ASK (amplitude), FSK (frequency), PSK (phase), QAM (amplitude + phase).',
      'BPSK 1 bit, QPSK 2, 8PSK 3, 16-QAM 4, 64-QAM 6, 256-QAM 8 bits/symbol.',
      'Shannon C = B log₂(1+SNR). Nyquist C = 2B log₂M. SNR(dB) = 10log(S/N).',
      'Bandwidth: B_T = (1+r)R for ASK/PSK, (1+r)R/log₂M for M-ary.',
    ],
    extraQuiz: [
      { q: 'An SNR of 20 dB equals a linear ratio of…', options: ['20', '100', '200', '1000'], answer: 1, explain: '10^(20/10) = 100.' },
      { q: 'What does Gray coding achieve in a constellation?', options: ['More power', 'Adjacent symbols differ by only one bit', 'More bandwidth', 'No noise'], answer: 1, explain: 'A symbol error usually causes just one bit error.' },
    ],
  },
};
