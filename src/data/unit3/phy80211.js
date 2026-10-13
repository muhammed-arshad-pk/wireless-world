import { RadioTower } from 'lucide-react';

export default {
  slug: 'wlan-physical-layer',
  number: 5,
  title: 'WLAN Physical Layer for IEEE 802.11',
  icon: RadioTower,
  color: '#f472b6',
  difficulty: 'Advanced',
  summary: 'Bands, channels, bandwidth, modulation and how bits become Wi-Fi radio signals.',
  tagline: 'Where bits become radio waves: bands, channels and modulation.',
  keywords: ['physical layer', 'phy', 'plcp', 'pmd', '2.4 ghz', '5 ghz', '6 ghz', 'channels', 'channel bonding', 'ofdm', 'mcs', 'dsss', 'qam'],
  intro: [
    'The physical (PHY) layer is the part of 802.11 that actually sends and receives radio signals. It decides which frequency band and channel to use, how wide the channel is, how bits are modulated onto subcarriers, and how the receiver detects and synchronises to incoming frames.',
    'Wi-Fi uses unlicensed spectrum in the 2.4 GHz, 5 GHz and (newer) 6 GHz bands. Modern PHYs use OFDM: a channel is split into many narrow subcarriers, each carrying QAM symbols, which makes the signal robust against multipath fading. The modulation and coding scheme (MCS) adapts continuously to signal quality.',
  ],
  definitions: {
    title: 'Key Terms',
    items: [
      { term: 'PLCP & PMD', text: 'PHY sublayers: PLCP adds the preamble/header for synchronisation. PMD handles the actual modulation and transmission.' },
      { term: 'Channel width', text: 'Bandwidth of one channel: 20, 40, 80, 160 or 320 MHz. Wider means faster, but fewer non-overlapping channels.' },
      { term: 'MCS', text: 'Modulation and Coding Scheme index, from robust BPSK at low rates to 1024/4096-QAM at high SNR.' },
    ],
  },
  compare: {
    title: '2.4 GHz vs 5 GHz',
    left: { title: '2.4 GHz', subtitle: 'Long range, crowded', points: ['Better range and wall penetration', 'Only 3 non-overlapping 20 MHz channels (1, 6, 11)', 'Shared with Bluetooth, microwave ovens, Zigbee', 'Lower top speeds'] },
    right: { title: '5 GHz (and 6 GHz)', subtitle: 'Fast, clean', points: ['Many non-overlapping channels', 'Supports 80/160 MHz (320 MHz at 6 GHz)', 'Shorter range, weaker through walls', 'Some channels need DFS (radar avoidance)'] },
  },
  flow: {
    title: 'Signal Transmission & Reception',
    steps: [
      { title: 'MAC frame → PHY', text: 'PLCP adds a preamble (sync) and header (rate, length).' },
      { title: 'Coding & mapping', text: 'Bits are FEC-coded, interleaved and mapped to QAM symbols on OFDM subcarriers.' },
      { title: 'RF transmission', text: 'IFFT → up-conversion to the channel’s centre frequency → antenna(s).' },
      { title: 'Reception', text: 'Detect preamble, synchronise, FFT, equalise, demodulate, decode and pass to the MAC.' },
    ],
  },
  table: {
    title: 'Wi-Fi Frequency Bands',
    columns: ['Band', 'Range (approx.)', 'Channel widths', 'Notes'],
    rows: [
      ['2.4 GHz', '2.400–2.4835 GHz', '20 / 40 MHz', 'Channels 1–13 (India), 5 MHz spacing, non-overlapping 1/6/11'],
      ['5 GHz', '5.15–5.85 GHz', '20 / 40 / 80 / 160 MHz', 'Many channels, some with DFS/TPC rules'],
      ['6 GHz', '5.925–7.125 GHz (where permitted)', 'Up to 320 MHz', 'Wi-Fi 6E/7 only, clean spectrum, WPA3 required'],
    ],
  },
  formulas: [
    { name: '2.4 GHz channel centre', expr: 'f = 2407 + 5·n MHz', note: 'Channel 1 = 2412, 6 = 2437, 11 = 2462 MHz.' },
    { name: '5 GHz channel centre', expr: 'f = 5000 + 5·n MHz', note: 'Channel 36 = 5180 MHz.' },
    { name: 'OFDM data rate', expr: 'R = N_ss · N_sd · log₂M · r / T_sym', note: 'Streams × data subcarriers × bits/symbol × code rate ÷ symbol time.' },
  ],
  cards: {
    title: 'Physical Layer Technologies',
    items: [
      { title: 'FHSS / DSSS (legacy)', text: '802.11 and 11b spread signals across the band to resist interference.' },
      { title: 'CCK', text: 'Complementary Code Keying gave 802.11b its 11 Mbps.' },
      { title: 'OFDM', text: '802.11a/g/n/ac: dozens to hundreds of subcarriers resist multipath.' },
      { title: 'OFDMA', text: '802.11ax splits subcarriers into resource units for several users.' },
      { title: 'MIMO & Beamforming', text: 'Multiple antennas add streams and focus energy toward clients.' },
      { title: 'Adaptive MCS', text: 'Rate drops gracefully as signal weakens (rate adaptation).' },
    ],
  },
  lists: [
    { title: 'Role of the Physical Layer', tone: 'info', items: ['Carrier sensing / clear channel assessment for the MAC', 'Modulation, coding and transmission of bits', 'Channel selection and transmit power control', 'Synchronisation via preambles', 'Reporting signal strength (RSSI) and quality'] },
    { title: 'Channel Planning Tips', tone: 'good', items: ['2.4 GHz: use only channels 1, 6 and 11', 'Prefer 20 MHz in 2.4 GHz to avoid overlap', 'Use 5/6 GHz with 40–80 MHz for speed', 'Avoid DFS channels if radar interrupts occur'] },
  ],
  lab: {
    key: 'w3-phy',
    title: 'Visualizer: Channel Planner & MCS Ladder',
    description: 'Assign 2.4 GHz channels to three neighbouring access points and watch their spectra overlap, until you find the non-overlapping plan. Then raise the SNR and climb the modulation ladder from BPSK to 1024-QAM.',
    badge: { name: 'Channel Planner', emoji: '📻' },
    objectives: [
      { id: 'plan', label: 'Find a non-overlapping 2.4 GHz channel plan', xp: 25 },
      { id: 'mcs', label: 'Reach 1024-QAM on the MCS ladder', xp: 20 },
    ],
  },
  quiz: [
    { q: 'Which 2.4 GHz channels don’t overlap?', options: ['1, 2, 3', '1, 6, 11', '2, 7, 12', '4, 8, 12'], answer: 1, explain: '20 MHz channels need 25 MHz (5 channel numbers) of spacing.' },
    { q: 'OFDM helps Wi-Fi mainly by…', options: ['Reducing cost', 'Resisting multipath fading with many narrow subcarriers', 'Increasing range to kilometres', 'Removing the need for antennas'], answer: 1, explain: 'Each subcarrier sees flat fading.' },
    { q: 'Which band offers the most non-overlapping wide channels?', options: ['2.4 GHz', '5/6 GHz', '900 MHz', 'Infrared'], answer: 1, explain: 'Much more spectrum is available there.' },
    { q: 'The PHY sublayer that adds the preamble for synchronisation is…', options: ['PMD', 'PLCP', 'LLC', 'NAV'], answer: 1, explain: 'Physical Layer Convergence Procedure.' },
    { q: 'What happens to the MCS when you move away from the AP?', options: ['It increases', 'It decreases to a more robust modulation', 'It stays fixed', 'Wi-Fi turns off'], answer: 1, explain: 'Rate adaptation trades speed for reliability.' },
  ],
  deep: {
    sections: [
      { title: 'Inside an OFDM symbol', points: ['A 20 MHz 802.11a/g channel has 64 subcarriers spaced 312.5 kHz apart: 48 data, 4 pilot, and nulls.', 'Each symbol lasts 4 µs, including a 0.8 µs guard interval that absorbs multipath echoes.', 'Wi-Fi 6 uses 4× more subcarriers (78.125 kHz spacing) and longer symbols for efficiency outdoors.', 'Pilots let the receiver track phase and frequency drift.'] },
      { title: 'Rate adaptation', points: ['The transmitter picks the highest MCS that keeps the error rate acceptable.', 'Each step up the ladder needs roughly 3–5 dB more SNR.', 'Far from the AP, a device may drop from 1024-QAM to BPSK, or from hundreds of Mbps to a few.', 'This is why speed tests vary so much around a home.'] },
      { title: 'Regulatory aspects', points: ['Unlicensed but regulated: power limits, DFS and TPC on some 5 GHz channels.', 'DFS: an AP must detect weather/military radar and vacate the channel.', 'Channel availability differs by country (e.g. channel 14 only in Japan).', '6 GHz availability depends on national regulators.'] },
    ],
    cases: [
      { year: '1999', title: 'OFDM enters Wi-Fi', text: '802.11a introduced OFDM at 5 GHz for 54 Mbps.' },
      { year: '2009', title: 'Channel bonding', text: '802.11n bonded two 20 MHz channels into 40 MHz.' },
      { year: '2020', title: '6 GHz opened', text: 'Regulators in several countries opened 6 GHz for Wi-Fi 6E.' },
    ],
    myths: [
      { myth: 'Wider channels are always better.', fact: 'In crowded areas wide channels overlap neighbours and can reduce throughput.' },
      { myth: 'Channel 6 is always the best.', fact: 'The best channel is the least congested one among 1, 6 and 11.' },
      { myth: '5 GHz Wi-Fi is the same as 5G mobile.', fact: '5 GHz is a Wi-Fi frequency band. 5G is a cellular generation.' },
    ],
    examNotes: [
      'PHY role: modulation, transmission, CCA, channel selection, synchronisation.',
      'Sublayers: PLCP (preamble/header) and PMD (radio).',
      'Bands: 2.4 GHz (1/6/11), 5 GHz, 6 GHz. Widths 20–320 MHz.',
      'Technologies: FHSS/DSSS/CCK → OFDM → OFDMA, MIMO, beamforming.',
      'MCS adapts modulation (BPSK → QAM) to SNR.',
    ],
    extraQuiz: [
      { q: 'Centre frequency of 2.4 GHz channel 6?', options: ['2412 MHz', '2437 MHz', '2462 MHz', '2484 MHz'], answer: 1, explain: '2407 + 5 × 6 = 2437 MHz.' },
      { q: 'DFS on 5 GHz channels is used to avoid…', options: ['Bluetooth', 'Radar', 'Microwave ovens', 'FM radio'], answer: 1, explain: 'Dynamic Frequency Selection protects radar systems.' },
    ],
  },
};
