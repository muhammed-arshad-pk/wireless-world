import { Radio } from 'lucide-react';

export default {
  slug: 'wlan-technology-narrowband-microwave',
  number: 6,
  title: 'Wireless LAN Technology: Narrowband Microwave (Radio)',
  icon: Radio,
  color: '#fb923c',
  difficulty: 'Intermediate',
  summary: 'Narrowband radio LANs: one narrow channel, licensed or unlicensed, transmitter and receiver, bandwidth and interference.',
  tagline: 'Wireless communication on a single slice of spectrum.',
  keywords: ['narrowband', 'microwave', 'radio lan', 'licensed', 'unlicensed', 'channel', 'bandwidth', 'carrier', 'snr', 'noise floor', 'interference', 'transmitter', 'receiver', 'filter', 'altair', 'radiolan', 'path loss'],
  intro: [
    'Narrowband microwave (radio) LANs transmit within a relatively narrow, assigned frequency band. The signal uses only as much bandwidth as it needs to carry the data, with no deliberate spreading. Because the receiver can use a tight filter tuned to that slice, it lets in very little noise. The cost is that any interference landing in that same slice hits the whole signal.',
    'Stallings distinguishes two kinds. Licensed narrowband RF uses frequencies the regulator assigns to one user in an area, so there is no interference from other systems; Motorola’s ALTAIR at 18 GHz was an example, with the licence covering a geographic area. Unlicensed narrowband RF uses ISM bands; RadioLAN (1995) worked at 5.8 GHz at 10 Mbps over about 50 m with low power. Licensed systems guarantee a clean channel; unlicensed systems are cheaper and quicker to deploy but must coexist with others.',
  ],
  definitions: {
    title: 'Key Terms',
    items: [
      { term: 'Narrowband', text: 'Signal bandwidth roughly equal to what the data rate requires, the opposite of spread spectrum.' },
      { term: 'Channel', text: 'A specific frequency slice (centre frequency + bandwidth) assigned to a link.' },
      { term: 'Bandwidth', text: 'The frequency range occupied by or available to a signal or channel.' },
      { term: 'SNR', text: 'Signal-to-noise ratio at the receiver; sets which data rate works reliably.' },
    ],
  },
  compare: {
    title: 'Licensed vs Unlicensed Narrowband',
    left: { title: 'Licensed', subtitle: 'e.g. Motorola ALTAIR, 18 GHz', points: ['Exclusive use of the frequency in an area', 'Interference-free, predictable performance', 'Licence fees and regulatory paperwork', 'Used for enterprise links and backhaul'] },
    right: { title: 'Unlicensed (ISM)', subtitle: 'e.g. RadioLAN, 5.8 GHz', points: ['No licence: deploy immediately', 'Must accept interference from others', 'Power limits set by regulators', 'Cheaper consumer and campus equipment'] },
  },
  flow: {
    title: 'Working Principle',
    steps: [
      { title: 'Information source', text: 'Data to be sent from a computer or device.' },
      { title: 'Radio transmitter', text: 'Encodes and modulates the data onto a carrier at the channel frequency, amplifies it.' },
      { title: 'Antenna → radio signal', text: 'The antenna radiates the narrowband signal through the air.' },
      { title: 'Radio receiver', text: 'Receiving antenna + tuned filter select the channel; the receiver demodulates and recovers the data.' },
    ],
  },
  table: {
    title: 'Narrowband vs Spread Spectrum vs Infrared WLANs',
    columns: ['Property', 'Narrowband radio', 'Spread spectrum', 'Infrared'],
    rows: [
      ['Bandwidth use', 'Just enough for the data', 'Much wider than needed', 'Optical, huge'],
      ['Interference handling', 'Filtering; licensed channel avoids it', 'Spreading / hopping', 'Walls isolate rooms'],
      ['Licence', 'Licensed or ISM', 'ISM (licence-free)', 'None'],
      ['Through walls', 'Yes', 'Yes', 'No'],
      ['Typical range', 'Tens of m to km (licensed)', 'Tens of metres indoors', 'A few metres'],
    ],
  },
  formulas: [
    { name: 'Thermal noise power', expr: 'N(dBm) = −174 + 10 log₁₀(B in Hz) + NF', note: 'Narrower bandwidth means less noise: 1 MHz ≈ −114 dBm + NF.' },
    { name: 'SNR', expr: 'SNR(dB) = P_rx(dBm) − N(dBm)', note: 'Higher SNR permits faster modulation.' },
    { name: 'Shannon capacity', expr: 'C = B log₂(1 + SNR)', note: 'Narrow bandwidth limits the maximum data rate.' },
  ],
  cards: {
    title: 'Factors Affecting Performance',
    items: [
      { title: 'Frequency', text: 'Higher frequencies give more bandwidth but more loss and less wall penetration.' },
      { title: 'Transmit power', text: 'More power means more range, within regulatory limits.' },
      { title: 'Antenna type', text: 'Directional antennas focus energy for long links.' },
      { title: 'Obstacles / line of sight', text: 'Walls and buildings attenuate microwave signals.' },
      { title: 'Distance / path loss', text: 'Received power falls with distance.' },
      { title: 'Interference', text: 'Other signals in the same channel reduce SNR.' },
    ],
  },
  lists: [
    { title: 'Advantages', tone: 'good', items: ['Efficient use of assigned spectrum', 'Tight filtering means low noise', 'Licensed: guaranteed interference-free channel', 'Simple transmitter/receiver design', 'Good range, passes through walls'] },
    { title: 'Limitations', tone: 'warn', items: ['Regulatory licensing requirements (licensed)', 'Limited data throughput compared with wideband', 'Vulnerable to interference inside its channel (unlicensed)', 'Range restricted by power limits and obstruction', 'Easier to jam or intercept than spread spectrum'] },
  ],
  lab: {
    key: 'w5-nb',
    title: 'Visualizer: Trace a Radio Signal',
    description: 'Tune a narrowband transmitter and receiver: pick the channel, bandwidth, power and distance. Then introduce interference on a channel and watch the spectrum, noise floor, SNR and link quality respond. Retune or switch to a licensed channel to escape it.',
    badge: { name: 'Channel Tuner', emoji: '📻' },
    objectives: [
      { id: 'escape', label: 'Restore a clean link after interference appears', xp: 20 },
      { id: 'far', label: 'Hold a good link at 400 m or more', xp: 20 },
    ],
  },
  quiz: [
    { q: 'What does bandwidth describe?', options: ['The frequency range occupied by or available to a signal or channel', 'The physical distance between antennas', 'The antenna height', 'The number of users'], answer: 0, explain: 'Bandwidth is a frequency range.' },
    { q: 'A licensed narrowband system mainly offers…', options: ['Free spectrum', 'An interference-free channel', 'Infrared links', 'Frequency hopping'], answer: 1, explain: 'The regulator gives exclusive use.' },
    { q: 'Narrowing the receiver bandwidth…', options: ['Increases noise', 'Reduces noise power', 'Has no effect', 'Increases path loss'], answer: 1, explain: 'Noise ∝ bandwidth.' },
    { q: 'Motorola ALTAIR operated at about…', options: ['18 GHz (licensed)', '2.4 GHz FHSS', '850 nm IR', '900 MHz CDMA'], answer: 0, explain: 'A licensed narrowband microwave LAN.' },
    { q: 'Which is a limitation of narrowband radio?', options: ['Cannot pass walls', 'Interference in its channel hits the whole signal', 'Needs line of sight like IR', 'Requires chips'], answer: 1, explain: 'No spreading to dilute interference.' },
  ],
  deep: {
    sections: [
      { title: 'Inside the transmitter and receiver', points: ['Transmitter: data → encoder → modulator (e.g. FSK/QPSK) → up-converter → power amplifier → antenna.', 'Receiver: antenna → low-noise amplifier → band-pass filter → down-converter → demodulator → decoder.', 'The channel filter rejects everything outside the assigned slice.', 'Oscillators must be stable so the narrow signal stays inside its filter.'] },
      { title: 'Frequency channels and planning', points: ['A band is divided into channels with guard bands between them.', 'Licensed operators coordinate so nearby links use different channels.', 'Unlicensed devices may use listen-before-talk or channel selection.', 'Microwave (GHz) bands give enough bandwidth for LAN speeds.'] },
      { title: 'Interference, range and security', points: ['Co-channel interference directly lowers SNR; adjacent-channel interference leaks through filters.', 'Range follows the link budget: power + antenna gains − path loss vs receiver sensitivity.', 'Narrowband signals are easy to locate and jam, so encryption is still needed.', 'Licensed spectrum provides legal protection against interferers.'] },
    ],
    cases: [
      { year: '1990', title: 'Motorola ALTAIR', text: 'An early licensed 18 GHz narrowband WLAN; Motorola handled the licences for customers.' },
      { year: '1995', title: 'RadioLAN', text: 'Unlicensed narrowband WLAN at 5.8 GHz, 10 Mbps, about 50 m range in a semi-open office.' },
      { year: 'Today', title: 'Licensed microwave backhaul', text: 'Point-to-point narrowband microwave links connect cell towers and campuses over kilometres.' },
    ],
    myths: [
      { myth: 'Narrowband means slow.', fact: 'Narrowband is relative: a 20–40 MHz microwave channel is still narrowband if it is not spread.' },
      { myth: 'Unlicensed means unregulated.', fact: 'ISM devices must follow power, bandwidth and spurious-emission limits.' },
    ],
    examNotes: [
      'Narrowband microwave: single assigned frequency slice, no spreading.',
      'Licensed (ALTAIR, 18 GHz): exclusive, interference-free. Unlicensed (RadioLAN, 5.8 GHz): cheap, must coexist.',
      'Transmitter → antenna → radio signal → receiving antenna → receiver.',
      'Noise ∝ bandwidth; SNR = signal − noise; C = B log₂(1+SNR).',
      'Factors: frequency, power, antenna, obstacles, distance, interference.',
    ],
    extraQuiz: [
      { q: 'Thermal noise in a 1 MHz bandwidth (NF = 0) is about…', options: ['−174 dBm', '−114 dBm', '−60 dBm', '0 dBm'], answer: 1, explain: '−174 + 60 = −114 dBm.' },
      { q: 'RadioLAN used which band?', options: ['5.8 GHz unlicensed', '18 GHz licensed', 'Infrared', '900 MHz licensed'], answer: 0, explain: 'Unlicensed narrowband at 10 Mbps.' },
    ],
  },
};
