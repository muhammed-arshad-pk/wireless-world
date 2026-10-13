import { Satellite } from 'lucide-react';

export default {
  slug: 'satellite-communication-systems',
  number: 2,
  title: 'Satellite Communication Systems',
  icon: Satellite,
  color: '#a78bfa',
  difficulty: 'Intermediate',
  summary: 'How satellites relay signals: uplink, downlink, transponders, types and applications.',
  tagline: 'A repeater in the sky, 36,000 km above your head.',
  keywords: ['satellite', 'uplink', 'downlink', 'transponder', 'earth station', 'c band', 'ku band', 'ka band', 'propagation delay', 'insat', 'gsat', 'dth'],
  intro: [
    'A communication satellite is essentially a microwave repeater in space. An earth station sends a signal up to the satellite (uplink), the satellite’s transponder receives it, shifts it to a different frequency, amplifies it and sends it back down (downlink) to receivers spread over a huge area.',
    'Because one satellite can see a large part of the Earth, satellites are ideal for broadcasting (DTH TV), connecting remote areas, ships and aircraft, backhaul, navigation and disaster communication. India’s INSAT/GSAT series, built by ISRO, carries TV, telecom, weather and emergency services.',
  ],
  definitions: {
    title: 'Key Terms',
    items: [
      { term: 'Uplink', text: 'Earth station → satellite. It uses the higher frequency of the pair (e.g. 6 GHz in C-band).' },
      { term: 'Downlink', text: 'Satellite → earth. It uses the lower frequency (e.g. 4 GHz in C-band).' },
      { term: 'Transponder', text: 'Satellite channel that receives, frequency-converts, amplifies and retransmits signals (typically 36 MHz wide).' },
    ],
  },
  compare: {
    title: 'Satellite vs Terrestrial Communication',
    left: { title: 'Satellite', subtitle: 'From space', points: ['Huge coverage: one GEO sees about 1/3 of Earth', 'Distance-independent cost', 'Fast deployment to remote areas', 'Long delay (~250 ms one hop for GEO)'] },
    right: { title: 'Terrestrial', subtitle: 'Towers and cables', points: ['Coverage built tower by tower', 'Low latency', 'Cheaper per bit in dense areas', 'Vulnerable to disasters and difficult terrain'] },
  },
  flow: {
    title: 'Working Principle of Satellite Communication',
    steps: [
      { title: 'Transmitting earth station', text: 'Modulates data and beams it up with a large dish (uplink).' },
      { title: 'Satellite transponder', text: 'Receives → amplifies (LNA) → down-converts frequency → power-amplifies.' },
      { title: 'Downlink beam', text: 'Retransmits towards the footprint on Earth.' },
      { title: 'Receiving earth stations', text: 'Small or large dishes capture, amplify and demodulate.' },
    ],
  },
  table: {
    title: 'Satellite Frequency Bands',
    columns: ['Band', 'Uplink / downlink (typical)', 'Characteristics', 'Uses'],
    rows: [
      ['L-band', '~1.6 / 1.5 GHz', 'Penetrates weather, small antennas', 'Mobile satellite phones, GPS/NavIC'],
      ['C-band', '6 / 4 GHz', 'Rain-resistant, larger dishes', 'TV distribution, telecom backhaul'],
      ['Ku-band', '14 / 11–12 GHz', 'Small dishes, some rain fade', 'DTH TV (e.g. Indian DTH), VSAT'],
      ['Ka-band', '30 / 20 GHz', 'High throughput, strong rain fade', 'Satellite broadband, HTS'],
    ],
  },
  formulas: [
    { name: 'One-way delay', expr: 't = d / c', note: 'GEO at 35,786 km: about 0.12 s up and 0.12 s down, so ≈ 0.24 s per hop.' },
    { name: 'Round-trip (conversation)', expr: '≈ 2 × 0.24 s ≈ 0.48 s', note: 'Why GEO voice calls feel delayed.' },
    { name: 'Free-space path loss', expr: 'L(dB) = 20log₁₀(4πd / λ)', note: 'About 196 dB for GEO at 4 GHz, so very sensitive receivers are needed.' },
    { name: 'EIRP', expr: 'EIRP(dBW) = P_t(dBW) + G_t(dBi)', note: 'Effective radiated power of the satellite or earth station.' },
  ],
  cards: {
    title: 'Types of Communication Satellites',
    items: [
      { title: 'Fixed Satellite Service', text: 'Links between fixed earth stations: telecom, TV distribution.' },
      { title: 'Broadcast Satellite (DTH)', text: 'TV straight to home dishes (Tata Play, DD Free Dish).' },
      { title: 'Mobile Satellite Service', text: 'Phones and terminals on ships, aircraft, vehicles.' },
      { title: 'Navigation', text: 'GPS, NavIC (India), GLONASS, Galileo.' },
      { title: 'Earth Observation & Weather', text: 'INSAT-3D, Cartosat and similar.' },
      { title: 'Broadband Constellations', text: 'LEO networks like Starlink and OneWeb for internet.' },
    ],
  },
  lists: [
    { title: 'Advantages', tone: 'good', items: ['Very wide coverage, including oceans and mountains', 'Broadcast to millions simultaneously', 'Cost independent of distance', 'Quick to deploy, resilient in disasters'] },
    { title: 'Limitations', tone: 'warn', items: ['High propagation delay (GEO)', 'Expensive to build and launch, limited lifetime (~15 years)', 'Rain fade at Ku/Ka bands', 'Sun outages, need for line of sight to the sky'] },
    { title: 'Why Uplink Frequency > Downlink', tone: 'info', items: ['Higher frequencies suffer more path and atmospheric loss', 'Earth stations have plenty of power to overcome it', 'Satellites are power-limited (solar), so they use the lower-loss frequency', 'Separate frequencies prevent the satellite’s transmitter from jamming its own receiver'] },
  ],
  lab: {
    key: 'w2-satsys',
    title: 'Visualizer: Inside a Satellite Link',
    description: 'Follow a signal from an earth station up to a geostationary satellite and back down. Click each block of the transponder to see what it does, then calculate how long the journey takes.',
    badge: { name: 'Link Tracer', emoji: '🛰️' },
    objectives: [
      { id: 'blocks', label: 'Inspect every block in the transponder chain', xp: 25 },
      { id: 'delay', label: 'Compute the propagation delay of a GEO hop', xp: 20 },
    ],
  },
  quiz: [
    { q: 'Signal from earth station to satellite is called…', options: ['Downlink', 'Uplink', 'Crosslink', 'Backhaul'], answer: 1, explain: 'Uplink: Earth → satellite.' },
    { q: 'In C-band, the uplink/downlink pair is about…', options: ['4 / 6 GHz', '6 / 4 GHz', '14 / 12 GHz', '30 / 20 GHz'], answer: 1, explain: 'Uplink is at the higher frequency.' },
    { q: 'What does a transponder do?', options: ['Launches the satellite', 'Receives, converts frequency, amplifies and retransmits', 'Stores TV programmes', 'Controls orbit'], answer: 1, explain: 'It is the satellite’s repeater channel.' },
    { q: 'Approximate one-hop delay via GEO satellite?', options: ['2 ms', '24 ms', '240 ms', '2.4 s'], answer: 2, explain: 'About 72,000 km ÷ c.' },
    { q: 'Indian DTH TV commonly uses…', options: ['L-band', 'C-band', 'Ku-band', 'VHF'], answer: 2, explain: 'Ku-band allows small home dishes.' },
  ],
  deep: {
    sections: [
      { title: 'Inside a transponder (bent-pipe)', points: ['Receive antenna collects the faint uplink.', 'LNA (low-noise amplifier) boosts it while adding minimal noise.', 'Frequency converter (mixer + local oscillator) shifts uplink to downlink frequency, e.g. 6 GHz → 4 GHz.', 'HPA (TWTA or SSPA) amplifies for the long trip down, then the transmit antenna sends it to the footprint.', 'Regenerative (on-board processing) satellites demodulate and remodulate, cleaning up noise.'] },
      { title: 'The earth segment', points: ['Earth station: antenna, LNB/LNA, up/down converters, modems, high-power amplifiers.', 'Teleport / hub stations serve many remote terminals (VSAT).', 'TT&C (telemetry, tracking and command) stations control the satellite.', 'Home DTH dish: an offset parabolic reflector + LNB (low-noise block down-converter).'] },
      { title: 'Space segment subsystems', points: ['Power: solar panels + batteries for eclipse periods.', 'Attitude and orbit control: keeps antennas pointed (station-keeping thrusters).', 'Thermal control: survives −150 °C to +150 °C.', 'Payload: antennas and transponders. Bus: everything else.'] },
    ],
    cases: [
      { year: '1945', title: 'Arthur C. Clarke’s idea', text: 'Proposed three geostationary satellites for global communication.' },
      { year: '1962', title: 'Telstar', text: 'The first active communications satellite relayed live TV across the Atlantic.' },
      { year: '1975', title: 'SITE experiment, India', text: 'TV programmes reached 2,400 Indian villages via the ATS-6 satellite.' },
      { year: '1982', title: 'INSAT-1A', text: 'India’s first multipurpose communication and weather satellite system began.' },
    ],
    myths: [
      { myth: 'Satellites are only used for TV.', fact: 'They carry phone, internet, navigation, weather, banking (VSAT ATMs) and disaster links.' },
      { myth: 'Satellite internet is always laggy.', fact: 'GEO is (~600 ms ping), but LEO constellations achieve about 25–50 ms.' },
      { myth: 'A satellite generates its own signals.', fact: 'Most are bent-pipe repeaters relaying what the ground sends.' },
    ],
    examNotes: [
      'Satellite = microwave repeater in space. Uplink (higher f) and downlink (lower f).',
      'Transponder chain: receive antenna → LNA → frequency converter → HPA → transmit antenna.',
      'Bands: L, C (6/4), Ku (14/12), Ka (30/20) GHz.',
      'GEO delay ≈ 0.24 s per hop, about 0.5 s round trip.',
      'Types: FSS, BSS/DTH, MSS, navigation, observation, broadband.',
    ],
    extraQuiz: [
      { q: 'Which amplifier is placed first in the transponder to keep noise low?', options: ['HPA', 'LNA', 'TWTA', 'Mixer'], answer: 1, explain: 'The low-noise amplifier sets the receiver noise figure.' },
      { q: 'Why is the downlink frequency lower than the uplink?', options: ['Satellites are power-limited and lower frequencies suffer less loss', 'It is cheaper', 'Regulations only', 'No reason'], answer: 0, explain: 'The ground station can afford more power for the lossier uplink.' },
    ],
  },
};
