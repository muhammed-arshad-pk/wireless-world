import { BarChart3 } from 'lucide-react';

export default {
  slug: 'satellite-capacity-fdma',
  number: 4,
  title: 'Satellite Capacity Allocation: Frequency Division',
  icon: BarChart3,
  color: '#60a5fa',
  difficulty: 'Intermediate',
  summary: 'Sharing a satellite transponder by dividing its bandwidth into frequency channels.',
  tagline: 'Give every user their own lane on the frequency highway.',
  keywords: ['fdma', 'frequency division', 'guard band', 'transponder', 'scpc', 'mcpc', 'intermodulation', 'back-off', 'capacity allocation'],
  intro: [
    'A satellite transponder has a fixed bandwidth (commonly 36 MHz) and a fixed power. Many earth stations want to use it at the same time, so capacity must be shared. Frequency Division Multiple Access (FDMA) splits the transponder bandwidth into separate frequency channels. Each earth station transmits continuously, but only on its assigned slice.',
    'Small guard bands between channels stop neighbouring signals from overlapping. FDMA is simple and mature, but because many carriers pass through one non-linear power amplifier at once, intermodulation distortion forces the amplifier to run below full power (back-off), which reduces efficiency.',
  ],
  definitions: {
    title: 'Key Terms',
    items: [
      { term: 'Capacity allocation', text: 'How a satellite’s bandwidth and power are divided among many users.' },
      { term: 'Guard band', text: 'Unused frequency gap between channels that prevents adjacent-channel interference.' },
      { term: 'Intermodulation (IM)', text: 'Unwanted mixing products created when multiple carriers pass through a non-linear amplifier.' },
    ],
  },
  compare: {
    title: 'SCPC vs MCPC (FDMA variants)',
    left: { title: 'SCPC', subtitle: 'Single Channel Per Carrier', points: ['Each carrier carries one voice or data channel', 'Can be demand-assigned (switched on only when needed)', 'Efficient for light, bursty traffic', 'Used in thin-route and VSAT links'] },
    right: { title: 'MCPC', subtitle: 'Multiple Channels Per Carrier', points: ['Many channels multiplexed onto one carrier (e.g. FDM-FM-FDMA)', 'Fixed (pre-assigned) allocation', 'Efficient for heavy trunk traffic', 'Less flexible'] },
  },
  flow: {
    title: 'Working Principle of FDMA',
    steps: [
      { title: 'Divide the transponder', text: 'The 36 MHz band is split into N channels with guard bands.' },
      { title: 'Assign channels', text: 'Each earth station gets its own carrier frequency (fixed or on demand).' },
      { title: 'Transmit simultaneously', text: 'All stations send continuously at the same time, each on its own frequency.' },
      { title: 'Filter at receiver', text: 'Receivers tune a band-pass filter to pick out their channel.' },
    ],
  },
  table: {
    title: 'FDMA Assignment Methods',
    columns: ['Method', 'How channels are given', 'Best for', 'Drawback'],
    rows: [
      ['Fixed (pre-assigned) FDMA', 'Permanently allocated to stations', 'Steady, heavy traffic', 'Wasted capacity when idle'],
      ['Demand-assigned (DAMA)', 'Allocated on request from a pool', 'Bursty or occasional traffic', 'Needs signalling and control'],
      ['FDM-FM-FDMA', 'Many voice channels FDM-multiplexed onto one FM carrier', 'Early analog trunks', 'Low efficiency, IM noise'],
      ['SCPC-FDMA', 'One carrier per channel', 'Thin routes, rural telephony, VSAT', 'Many carriers mean more IM'],
    ],
  },
  formulas: [
    { name: 'Channel bandwidth', expr: 'B_ch = (B_T − (N + 1)·B_g) / N', note: 'B_T = transponder bandwidth, B_g = guard band, N = channels (guards at both edges).' },
    { name: 'Bandwidth efficiency', expr: 'η = N·B_ch / B_T', note: 'More channels means more guard overhead.' },
    { name: 'Amplifier back-off', expr: 'Usable power = P_sat − back-off (dB)', note: 'Typically 3–6 dB of back-off to limit intermodulation.' },
  ],
  cards: {
    title: 'Frequency Allocation among Users',
    items: [
      { title: 'Frequency Channels', text: 'Each user owns a slice of spectrum for the whole session.' },
      { title: 'Guard Bands', text: 'Gaps that absorb filter roll-off and frequency drift.' },
      { title: 'Continuous Transmission', text: 'No timing synchronization needed between stations.' },
      { title: 'Power Sharing', text: 'All carriers share the transponder power, so strong carriers can suppress weak ones.' },
      { title: 'Intermodulation', text: 'Non-linear TWTA creates spurious products inside other channels.' },
      { title: 'Back-off', text: 'Running the amplifier below saturation reduces IM but also power.' },
    ],
  },
  lists: [
    { title: 'Advantages of FDMA', tone: 'good', items: ['Simple, mature, low-cost equipment', 'No network-wide time synchronisation', 'Continuous transmission suits analog and voice', 'Easy to add stations with DAMA'] },
    { title: 'Limitations of FDMA', tone: 'warn', items: ['Intermodulation in shared amplifiers', 'Power back-off lowers capacity', 'Guard bands waste spectrum', 'Inflexible: hard to give one user more capacity quickly', 'Strong carriers can "capture" amplifier power from weak ones'] },
    { title: 'Applications in Satellite Communication', tone: 'info', items: ['Early INTELSAT telephone trunks (FDM-FM-FDMA)', 'SCPC rural telephony and VSAT return links', 'TV distribution (one carrier per channel)', 'Combined with TDMA in MF-TDMA broadband systems'] },
  ],
  lab: {
    key: 'w2-fdma',
    title: 'Visualizer: Divide the Transponder',
    description: 'Split a 36 MHz transponder among earth stations. Adjust the number of users and the guard band and watch channel width and efficiency change. Then turn on amplifier non-linearity to see intermodulation products appear.',
    badge: { name: 'Spectrum Divider', emoji: '📊' },
    objectives: [
      { id: 'alloc', label: 'Allocate channels to 6 or more stations', xp: 20 },
      { id: 'im', label: 'Reveal intermodulation and fix it with back-off', xp: 25 },
    ],
  },
  quiz: [
    { q: 'In FDMA, each earth station is given…', options: ['A time slot', 'A unique frequency band', 'A spreading code', 'A different satellite'], answer: 1, explain: 'Frequency division: separate channels.' },
    { q: 'What is the purpose of a guard band?', options: ['Increase power', 'Prevent adjacent-channel interference', 'Encrypt data', 'Synchronise clocks'], answer: 1, explain: 'It absorbs filter roll-off and drift.' },
    { q: 'Why must FDMA transponders use power back-off?', options: ['To save fuel', 'To reduce intermodulation in the non-linear amplifier', 'To cool the satellite', 'It is not needed'], answer: 1, explain: 'Many carriers in a non-linear TWTA create IM products.' },
    { q: 'SCPC stands for…', options: ['Single Channel Per Carrier', 'Satellite Control Power Circuit', 'Spread Code Phase Carrier', 'Signal Clock Per Channel'], answer: 0, explain: 'One channel modulates one carrier.' },
    { q: 'A typical transponder bandwidth is…', options: ['36 kHz', '36 MHz', '36 GHz', '3.6 Hz'], answer: 1, explain: '36 MHz is the classic value (also 54/72 MHz).' },
  ],
  deep: {
    sections: [
      { title: 'Intermodulation explained', points: ['A perfectly linear amplifier just scales signals. A real TWTA near saturation is non-linear.', 'With carriers at f₁ and f₂, third-order IM products appear at 2f₁ − f₂ and 2f₂ − f₁, often inside other users’ channels.', 'More carriers means more IM products and more interference.', 'Input/output back-off moves the amplifier into its linear region at the cost of lower output power.'] },
      { title: 'Power-limited vs bandwidth-limited', points: ['Satellite links are often limited by power (the weak downlink) rather than bandwidth.', 'In FDMA, back-off loses power, so the transponder may be power-limited long before its bandwidth is used up.', 'Small terminals (VSAT) are usually power-limited and benefit from efficient coding.'] },
      { title: 'Demand assignment (DAMA)', points: ['A central controller or distributed protocol assigns frequencies when a call starts.', 'Channels return to the pool when the call ends.', 'This greatly improves utilisation for bursty or occasional traffic.', 'SPADE (Single-channel-per-carrier PCM multiple Access Demand assignment Equipment) was an early INTELSAT DAMA system.'] },
    ],
    cases: [
      { year: '1965', title: 'Early Bird (Intelsat I)', text: 'The first commercial GEO satellite carried 240 telephone circuits using frequency-division techniques.' },
      { year: '1973', title: 'SPADE DAMA', text: 'INTELSAT introduced demand-assigned SCPC for thin-route international calls.' },
      { year: '2000s', title: 'MF-TDMA', text: 'Modern VSAT networks combine FDMA (several carriers) with TDMA on each carrier.' },
    ],
    myths: [
      { myth: 'More guard band is always safer.', fact: 'It wastes spectrum. Designers use just enough for filter roll-off and drift.' },
      { myth: 'FDMA can use the full transponder power.', fact: 'Back-off is required to limit intermodulation.' },
      { myth: 'FDMA is obsolete.', fact: 'It is still used in SCPC links and as part of MF-TDMA.' },
    ],
    examNotes: [
      'Capacity allocation: sharing transponder bandwidth and power among earth stations.',
      'FDMA: separate frequency channels, continuous transmission, guard bands.',
      'Fixed vs demand-assigned (DAMA). SCPC vs MCPC (FDM-FM-FDMA).',
      'Problems: intermodulation (2f₁ − f₂), back-off, guard-band waste.',
      'Channel BW = (B_T − (N+1)B_g)/N.',
    ],
    extraQuiz: [
      { q: 'Third-order intermodulation products occur at…', options: ['f₁ + f₂', '2f₁ − f₂ and 2f₂ − f₁', 'f₁ × f₂', 'f₁ / f₂'], answer: 1, explain: 'These fall close to the original carriers.' },
      { q: 'DAMA improves…', options: ['Antenna size', 'Channel utilisation for bursty traffic', 'Orbit height', 'Rain fade'], answer: 1, explain: 'Channels are assigned only when needed.' },
    ],
  },
};
