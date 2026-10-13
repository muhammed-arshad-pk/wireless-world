import { Rss } from 'lucide-react';

export default {
  slug: 'wlan-radio-systems',
  number: 6,
  title: 'WLAN Radio Systems',
  icon: Rss,
  color: '#fb923c',
  difficulty: 'Intermediate',
  summary: 'How Wi-Fi radio signals propagate indoors, which bands are used, and how interference is managed.',
  tagline: 'Walls, microwaves and neighbours: why Wi-Fi coverage is never perfect.',
  keywords: ['radio', 'wlan', 'rssi', 'dbm', 'interference', 'co-channel', 'adjacent channel', 'attenuation', 'wall loss', 'coverage', 'heatmap', 'site survey'],
  intro: [
    'Most WLANs are radio-based: an access point’s transmitter sends signals through the air, and stations’ receivers pick them up. Unlike on a cable, the radio signal is weakened by distance and by every wall, floor and piece of furniture in its way. It is also disturbed by other devices sharing the same unlicensed frequencies.',
    'Designing a good WLAN means understanding signal strength (RSSI, in dBm), how different materials and bands attenuate signals, and the sources of interference. Engineers then place access points and choose channels so the whole area gets strong, clean signal.',
  ],
  definitions: {
    title: 'Key Terms',
    items: [
      { term: 'RSSI (dBm)', text: 'Received signal strength. −30 dBm is excellent, −67 dBm is good for voice/video, −80 dBm is poor, −90 dBm is unusable.' },
      { term: 'Co-channel interference', text: 'Other networks on the same channel. Everyone must share airtime.' },
      { term: 'Adjacent-channel interference', text: 'Partially overlapping channels (e.g. 1 and 3) that corrupt each other’s signals.' },
    ],
  },
  compare: {
    title: 'Radio Transmission vs Reception',
    left: { title: 'Transmitter', subtitle: 'At the AP or station', points: ['Baseband → RF up-conversion', 'Power amplifier (typically up to ~20–23 dBm indoors)', 'Antennas (often MIMO) and beamforming', 'Regulated power limits per band'] },
    right: { title: 'Receiver', subtitle: 'At the other end', points: ['Antenna + low-noise amplifier', 'Down-conversion and filtering', 'Sensitivity: weakest usable signal (e.g. −82 dBm for the lowest rate)', 'Needs SNR well above the noise floor (~−95 dBm)'] },
  },
  flow: {
    title: 'What Happens to a Wi-Fi Signal',
    steps: [
      { title: 'Transmitted', text: 'About 100 mW (20 dBm) leaves the AP antenna.' },
      { title: 'Spreads out', text: 'Free-space loss: about 40 dB in the first metre at 2.4 GHz, plus more with distance.' },
      { title: 'Hits obstacles', text: 'Walls, floors and glass absorb and reflect energy.' },
      { title: 'Arrives weak', text: 'At the station it may be a millionth of a millionth of the power, e.g. −65 dBm.' },
    ],
  },
  table: {
    title: 'Typical Attenuation by Material (approx.)',
    columns: ['Material', '2.4 GHz loss', '5 GHz loss', 'Comment'],
    rows: [
      ['Drywall / plywood', '≈ 3 dB', '≈ 4 dB', 'Light partition'],
      ['Glass window', '≈ 2–3 dB', '≈ 6–8 dB', 'Metal-coated glass is much worse'],
      ['Brick wall', '≈ 8–10 dB', '≈ 12–15 dB', 'Common in Indian homes'],
      ['Concrete wall', '≈ 12–15 dB', '≈ 18–25 dB', 'Load-bearing walls'],
      ['Floor / ceiling slab', '≈ 15–20 dB', '≈ 20–30 dB', 'Why one router rarely covers several floors'],
      ['Metal (lift, cupboard)', '> 25 dB', '> 30 dB', 'Practically blocks the signal'],
    ],
  },
  formulas: [
    { name: 'Received power (link budget)', expr: 'P_rx = P_tx + G_tx + G_rx − PL − L_walls', note: 'All in dB/dBm.' },
    { name: 'Indoor path loss (log-distance)', expr: 'PL(d) = PL(1 m) + 10·n·log₁₀(d)', note: 'PL(1 m) ≈ 40 dB (2.4 GHz) or 46 dB (5 GHz). n ≈ 2–3.5 indoors.' },
    { name: 'dBm ↔ mW', expr: 'P(dBm) = 10·log₁₀(P / 1 mW)', note: '20 dBm = 100 mW, −70 dBm = 0.1 nW.' },
    { name: 'SNR', expr: 'SNR(dB) = RSSI − noise floor', note: 'E.g. −65 − (−95) = 30 dB, good enough for high MCS.' },
  ],
  cards: {
    title: 'Sources of Interference',
    items: [
      { title: 'Neighbouring Wi-Fi', text: 'Co-channel and adjacent-channel networks.' },
      { title: 'Microwave Ovens', text: 'Leak energy around 2.45 GHz.' },
      { title: 'Bluetooth & Zigbee', text: 'Share 2.4 GHz (with hopping or coexistence).' },
      { title: 'Cordless Phones & Baby Monitors', text: 'Some use 2.4 or 5.8 GHz.' },
      { title: 'Radar', text: 'Some 5 GHz channels must yield to radar (DFS).' },
      { title: 'Physical Environment', text: 'Multipath, people (water absorbs 2.4 GHz) and moving objects.' },
    ],
  },
  lists: [
    { title: 'Frequency Bands Used in WLAN', tone: 'info', items: ['2.4 GHz ISM: best range, most crowded', '5 GHz U-NII: faster, cleaner, shorter range', '6 GHz: newest, widest channels (Wi-Fi 6E/7)', '60 GHz (802.11ad/ay): multi-gigabit, room-scale only'] },
    { title: 'Improving Coverage', tone: 'good', items: ['Place the AP centrally and high, away from metal', 'Use more APs (mesh/ESS) rather than higher power', 'Choose the least-congested non-overlapping channel', 'Use 5/6 GHz near the AP, 2.4 GHz for range', 'Run a site survey (heat-map) before installing'] },
  ],
  lab: {
    key: 'w3-heatmap',
    title: 'Visualizer: Wi-Fi Coverage Heat-map',
    description: 'A floor plan with brick and concrete walls. Click to place the access point and the heat-map recalculates RSSI everywhere using a real indoor path-loss model with wall attenuation. Compare 2.4 GHz and 5 GHz, and get at least 90% of the floor above −67 dBm.',
    badge: { name: 'Coverage Engineer', emoji: '🔥' },
    objectives: [
      { id: 'bands', label: 'Compare 2.4 GHz and 5 GHz coverage', xp: 20 },
      { id: 'cover', label: 'Achieve 90% coverage at −67 dBm or better', xp: 30 },
    ],
  },
  quiz: [
    { q: 'Which RSSI is generally considered good for voice and video?', options: ['−30 dBm', '−67 dBm', '−90 dBm', '−110 dBm'], answer: 1, explain: '−67 dBm or better is the common design target.' },
    { q: 'Which band penetrates walls better?', options: ['2.4 GHz', '5 GHz', '6 GHz', '60 GHz'], answer: 0, explain: 'Lower frequencies are attenuated less.' },
    { q: 'A microwave oven interferes mainly with…', options: ['2.4 GHz Wi-Fi', '5 GHz Wi-Fi', 'FM radio', 'Infrared remotes'], answer: 0, explain: 'Ovens operate near 2.45 GHz.' },
    { q: '20 dBm equals…', options: ['20 mW', '100 mW', '1 W', '2 mW'], answer: 1, explain: '10^(20/10) = 100 mW.' },
    { q: 'The best way to cover a large building is usually…', options: ['One router at maximum power', 'Several well-placed APs on non-overlapping channels', 'Hide the SSID', 'Use only 6 GHz'], answer: 1, explain: 'More cells beat more power.' },
  ],
  deep: {
    sections: [
      { title: 'Indoor propagation', points: ['Indoors, signals reach receivers through direct, reflected and diffracted paths.', 'The path-loss exponent n rises with clutter: about 2 in open halls, 3–3.5 in offices with partitions.', 'Each wall adds loss on top of distance loss. Floors add even more.', 'Multipath fading causes dead spots that can shift when people move around.'] },
      { title: 'Signal interference management', points: ['Use channel plans that keep neighbouring APs on non-overlapping channels.', 'Lower AP transmit power in dense deployments to shrink cells and reduce co-channel contention.', 'Band steering pushes capable clients to 5/6 GHz.', 'Spectrum analysers reveal non-Wi-Fi interferers like microwave ovens.'] },
      { title: 'Radio-based WLAN system design', points: ['Site survey: measure or predict coverage before installing.', 'Capacity planning: count users and applications, not just area.', 'Uplink matters too: a phone transmits with less power than the AP.', 'Controllers (or cloud management) tune channels and power automatically (RRM).'] },
    ],
    cases: [
      { year: '1985', title: 'ISM bands opened', text: 'Unlicensed use of 2.4 GHz spread-spectrum radios became legal, the basis of Wi-Fi.' },
      { year: '2010s', title: 'Dense Wi-Fi in stadiums', text: 'Venues deployed hundreds of low-power APs under seats to serve tens of thousands of fans.' },
      { year: '2018', title: 'Mesh Wi-Fi goes mainstream', text: 'Consumer mesh systems spread coverage with multiple nodes instead of one powerful router.' },
    ],
    myths: [
      { myth: 'Turning the router power to maximum fixes coverage.', fact: 'Phones still transmit weakly back, and high power increases interference.' },
      { myth: 'Signal bars equal speed.', fact: 'Congestion and interference can make a strong signal slow.' },
      { myth: 'Wi-Fi works equally well everywhere in a house.', fact: 'Walls, floors and appliances create big differences room to room.' },
    ],
    examNotes: [
      'Radio WLAN: transmitter (RF, power, antenna) and receiver (sensitivity, SNR).',
      'Bands: 2.4 (range), 5 (speed), 6 GHz (wide clean channels), 60 GHz (room-scale).',
      'RSSI targets: −67 dBm good. Noise floor ≈ −95 dBm.',
      'Interference: co-channel, adjacent channel, non-Wi-Fi (microwave, Bluetooth).',
      'Link budget: P_rx = P_tx + gains − path loss − wall losses.',
    ],
    extraQuiz: [
      { q: 'With RSSI −60 dBm and noise floor −95 dBm, the SNR is…', options: ['35 dB', '155 dB', '−35 dB', '60 dB'], answer: 0, explain: '−60 − (−95) = 35 dB.' },
      { q: 'Which interference comes from networks on the same channel?', options: ['Adjacent-channel', 'Co-channel', 'Rain fade', 'Doppler'], answer: 1, explain: 'They must share airtime.' },
    ],
  },
};
