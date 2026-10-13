import { Shuffle } from 'lucide-react';

export default {
  slug: 'wlan-technology-spread-spectrum',
  number: 5,
  title: 'Wireless LAN Technology: Spread Spectrum',
  icon: Shuffle,
  color: '#60a5fa',
  difficulty: 'Intermediate',
  summary: 'How spreading a signal over a wide band makes it robust: FHSS, DSSS, processing gain and WLAN uses.',
  tagline: 'Hide in plain sight by spreading out.',
  keywords: ['spread spectrum', 'fhss', 'dsss', 'frequency hopping', 'direct sequence', 'chips', 'barker code', 'processing gain', 'jamming', 'pseudo-noise', 'pn sequence', 'hedy lamarr', 'ism band', '802.11b', 'bluetooth'],
  intro: [
    'Spread spectrum transmits a signal over a much wider frequency range than the minimum it needs. A pseudo-noise (PN) code, known only to the transmitter and receiver, controls the spreading. The receiver uses the same code to collect the energy back into a narrow signal, while interference, which does not match the code, gets spread out and mostly ignored. The result is robustness against interference, jamming and eavesdropping, and the ability for many systems to share the same band.',
    'There are two main methods. Frequency-Hopping Spread Spectrum (FHSS) jumps the carrier between many narrow channels in a pseudo-random sequence. Direct-Sequence Spread Spectrum (DSSS) multiplies each data bit by a fast chip sequence, so the signal occupies a wide band all the time. Both were used by the original IEEE 802.11 (1–2 Mbps). DSSS evolved into 802.11b (11 Mbps), and FHSS lives on in Bluetooth. The idea was patented in 1942 by actress Hedy Lamarr and composer George Antheil for jam-proof torpedo guidance.',
  ],
  definitions: {
    title: 'Key Terms',
    items: [
      { term: 'PN (pseudo-noise) code', text: 'A deterministic sequence that looks random; both ends generate the same one.' },
      { term: 'Chip', text: 'One bit of the spreading code in DSSS; chips are much shorter than data bits.' },
      { term: 'Hop sequence / dwell time', text: 'In FHSS, the order of channels used and how long the carrier stays on each.' },
      { term: 'Processing gain', text: 'How much the despreading improves the signal over narrowband interference: Gp = spread bandwidth / data bandwidth.' },
    ],
  },
  compare: {
    title: 'FHSS vs DSSS',
    left: { title: 'Frequency-Hopping (FHSS)', subtitle: 'Narrowband, moving', points: ['Rapid frequency hopping over many channels', 'Narrowband at any instant', 'Avoids interference by hopping away from it', 'Bluetooth: 79 × 1 MHz channels, 1600 hops/s'] },
    right: { title: 'Direct-Sequence (DSSS)', subtitle: 'Wideband, continuous', points: ['Each bit spread by a chip code (e.g. 11-chip Barker)', 'Continuous wideband signal', 'Mitigates interference by spreading and despreading', '802.11/802.11b: 22 MHz channels, 1–11 Mbps'] },
  },
  flow: {
    title: 'Basic Working Principle',
    steps: [
      { title: 'Modulate data', text: 'Data is modulated onto a carrier as usual (narrowband).' },
      { title: 'Spread', text: 'A PN code spreads it: by hopping frequencies (FHSS) or by multiplying with chips (DSSS).' },
      { title: 'Transmit', text: 'The wideband signal looks like low-level noise to other receivers.' },
      { title: 'Despread', text: 'The receiver applies the same code; the wanted signal reappears and interference is spread away.' },
    ],
  },
  table: {
    title: 'Spread Spectrum in Wireless Systems',
    columns: ['System', 'Method', 'Details'],
    rows: [
      ['IEEE 802.11 (1997)', 'FHSS or DSSS', '2.4 GHz, 1–2 Mbps; FHSS 79 × 1 MHz; DSSS 11-chip Barker'],
      ['IEEE 802.11b (1999)', 'DSSS / CCK', 'Up to 11 Mbps in 22 MHz channels'],
      ['Bluetooth', 'FHSS (adaptive)', '79 channels (Classic), 1600 hops/s; AFH skips busy channels'],
      ['GPS', 'DSSS', 'C/A code 1.023 Mchip/s; signals below the noise floor'],
      ['CDMA cellular (IS-95, WCDMA)', 'DSSS', 'Code division multiple access'],
      ['Military radios', 'FHSS / DSSS', 'Anti-jam, low probability of intercept'],
    ],
  },
  formulas: [
    { name: 'Processing gain', expr: 'Gp(dB) = 10 log₁₀(chip rate / bit rate)', note: '802.11 DSSS: 11 chips per bit → 10 log 11 ≈ 10.4 dB.' },
    { name: 'DSSS spreading', expr: 'tx chip = data bit ⊕ PN chip', note: 'Despreading XORs with the same PN code to get the bit back.' },
    { name: 'FHSS bandwidth', expr: 'B_total = N_channels × B_channel', note: '79 × 1 MHz ≈ 79 MHz of the 2.4 GHz band.' },
  ],
  cards: {
    title: 'Advantages of Spread Spectrum',
    items: [
      { title: 'Robustness', text: 'Resists narrowband interference and multipath.' },
      { title: 'Difficult to jam', text: 'A jammer must cover the whole wide band.' },
      { title: 'Low probability of intercept', text: 'Looks like background noise without the code.' },
      { title: 'Coexistence', text: 'Multiple networks can use the same band with different codes or hop patterns.' },
      { title: 'Multiple access', text: 'Different codes allow CDMA.' },
      { title: 'Licence-free ISM use', text: 'Regulators allowed unlicensed 2.4 GHz use with spreading.' },
    ],
  },
  lists: [
    { title: 'Considerations', tone: 'warn', items: ['Complexity: precise synchronisation required', 'Cost: more advanced hardware', 'Overhead: spreading uses more bandwidth per bit', 'Security is not encryption: codes in standards are public'] },
    { title: 'Applications in WLANs', tone: 'good', items: ['Original 802.11 FHSS and DSSS PHYs', '802.11b DSSS/CCK (Wi-Fi’s first mass market)', 'Bluetooth personal area networks', 'Industrial and military radio links'] },
  ],
  lab: {
    key: 'w5-ss',
    title: 'Visualizer: Explore Spread Spectrum',
    description: 'Switch on a jammer and compare. In FHSS the carrier hops across a time-frequency grid and only the hops that land on the jammed channel are hit. In DSSS each bit is multiplied by an 11-chip Barker code, and despreading recovers the bits despite the jammer.',
    badge: { name: 'Spectrum Spreader', emoji: '🎛️' },
    objectives: [
      { id: 'fhss', label: 'Survive a jammer with FHSS', xp: 20 },
      { id: 'dsss', label: 'Recover all bits through a jammer with DSSS', xp: 20 },
    ],
  },
  quiz: [
    { q: 'Which method changes its transmission frequency according to a hopping sequence?', options: ['FHSS', 'DSSS', 'OFDM', 'AM'], answer: 0, explain: 'Frequency-Hopping Spread Spectrum.' },
    { q: 'In DSSS, each data bit is replaced by…', options: ['A sequence of chips', 'A single tone', 'A frequency hop', 'A light pulse'], answer: 0, explain: 'E.g. an 11-chip Barker code.' },
    { q: 'Processing gain of an 11-chip Barker code is about…', options: ['3 dB', '10.4 dB', '20 dB', '0 dB'], answer: 1, explain: '10 log₁₀ 11.' },
    { q: 'Which technology uses FHSS today?', options: ['Bluetooth', '802.11ac', 'FM radio', 'Ethernet'], answer: 0, explain: '1600 hops per second.' },
    { q: 'Spread spectrum was invented with help from…', options: ['Hedy Lamarr', 'Marconi', 'Tesla', 'Shannon'], answer: 0, explain: 'Lamarr and Antheil patented frequency hopping in 1942.' },
  ],
  deep: {
    sections: [
      { title: 'How despreading rejects interference', points: ['The wanted signal × PN code = original narrowband signal (the code squares to 1).', 'A narrowband jammer × PN code = a wideband, low-density signal.', 'A narrow filter keeps the wanted signal and removes most of the spread jammer.', 'Improvement ≈ processing gain.'] },
      { title: 'Fast vs slow hopping', points: ['Slow FHSS: several bits per hop (original 802.11: ≥ 2.5 hops/s).', 'Fast FHSS: several hops per bit, more robust but harder to build.', 'A hit hop loses only a few bits, which error correction can repair.', 'Adaptive hopping (Bluetooth AFH) skips channels used by Wi-Fi.'] },
      { title: 'Barker code', points: ['802.11 DSSS uses +1 −1 +1 +1 −1 +1 +1 +1 −1 −1 −1.', 'It has excellent autocorrelation: a sharp peak only when aligned.', 'Chip rate 11 Mchip/s at 1 Mbps (DBPSK) or 2 Mbps (DQPSK).', '802.11b replaced it with CCK codes for 5.5 and 11 Mbps.'] },
    ],
    cases: [
      { year: '1942', title: 'Lamarr–Antheil patent', text: 'Frequency hopping, synchronised like piano rolls, to stop torpedo radio control being jammed.' },
      { year: '1985', title: 'FCC opens ISM bands', text: 'Unlicensed spread spectrum use of 902 MHz, 2.4 GHz and 5.8 GHz paved the way for Wi-Fi.' },
      { year: '1999', title: '802.11b', text: 'DSSS/CCK at 11 Mbps made Wi-Fi a mass-market product.' },
    ],
    myths: [
      { myth: 'Spread spectrum encrypts data.', fact: 'It hides and protects the signal, but standard codes are public; encryption is still needed.' },
      { myth: 'Spreading wastes the spectrum.', fact: 'Many users can share the same wide band with different codes, which uses spectrum efficiently overall.' },
    ],
    examNotes: [
      'Spread spectrum: signal bandwidth ≫ data bandwidth, controlled by a PN code.',
      'FHSS: hop among narrow channels (Bluetooth, original 802.11).',
      'DSSS: XOR bits with fast chips (802.11 Barker 11, 802.11b, GPS, CDMA).',
      'Benefits: anti-jam, anti-interference, low intercept, coexistence, CDMA.',
      'Processing gain Gp = chip rate / bit rate.',
    ],
    extraQuiz: [
      { q: 'Bluetooth avoids busy Wi-Fi channels using…', options: ['AFH', 'CCK', 'OFDM', 'PPM'], answer: 0, explain: 'Adaptive Frequency Hopping.' },
      { q: 'GPS signals use…', options: ['FHSS', 'DSSS', 'AM', 'IR'], answer: 1, explain: 'C/A code at 1.023 Mchip/s.' },
    ],
  },
};
