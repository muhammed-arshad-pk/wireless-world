import { History } from 'lucide-react';

export default {
  slug: 'evolution-ieee-80211',
  number: 1,
  title: 'Evolution of IEEE 802.11',
  icon: History,
  color: '#22d3ee',
  difficulty: 'Beginner',
  summary: 'From 2 Mbps in 1997 to multi-gigabit Wi-Fi 7: how the standard grew.',
  tagline: 'From 2 Mbps to 46 Gbps in under three decades.',
  keywords: ['802.11', '802.11b', '802.11a', '802.11g', '802.11n', '802.11ac', '802.11ax', '802.11be', 'wi-fi 4', 'wi-fi 5', 'wi-fi 6', 'wi-fi 7', 'mimo', 'ofdma'],
  intro: [
    'IEEE 802.11 is the family of standards behind Wi-Fi. The first version, published in 1997, offered just 1–2 Mbps. Since then, each amendment has added new techniques (OFDM, MIMO, wider channels, higher-order QAM, OFDMA), multiplying speed and efficiency while staying backward compatible.',
    'In 2018 the Wi-Fi Alliance introduced simple generation names: Wi-Fi 4 (802.11n), Wi-Fi 5 (802.11ac), Wi-Fi 6/6E (802.11ax) and Wi-Fi 7 (802.11be). Today Wi-Fi carries most of the world’s internet traffic on phones and laptops.',
  ],
  definitions: {
    title: 'Key Terms',
    items: [
      { term: 'Amendment', text: 'A lettered addition to 802.11 (b, a, g, n…) that adds features. All are folded into the main standard periodically.' },
      { term: 'MIMO', text: 'Multiple-Input Multiple-Output: multiple antennas send parallel spatial streams.' },
      { term: 'OFDMA', text: 'Orthogonal Frequency-Division Multiple Access: splits a channel into resource units for many users at once (Wi-Fi 6).' },
    ],
  },
  compare: {
    title: 'Early WLANs vs Modern Wi-Fi',
    left: { title: 'Early (802.11, 11b)', subtitle: '1997–1999', points: ['1–11 Mbps', '2.4 GHz only, DSSS/FHSS/infrared', 'Single antenna, 20/22 MHz channels', 'Weak WEP security'] },
    right: { title: 'Modern (Wi-Fi 6/7)', subtitle: '2019–2024', points: ['Multi-gigabit (9.6–46 Gbps max)', '2.4 + 5 + 6 GHz', 'MU-MIMO, OFDMA, up to 320 MHz channels', 'WPA3 security'] },
  },
  flow: {
    title: 'Key Leaps in Performance',
    steps: [
      { title: 'DSSS/CCK (11b)', text: '11 Mbps made Wi-Fi mainstream in 2.4 GHz.' },
      { title: 'OFDM (11a/g)', text: '54 Mbps with robust multicarrier modulation.' },
      { title: 'MIMO + wider channels (11n/ac)', text: 'Spatial streams, 40/80/160 MHz, 256-QAM.' },
      { title: 'OFDMA + 6 GHz (11ax/be)', text: 'Efficiency in crowded networks, 4096-QAM, multi-link operation.' },
    ],
  },
  table: {
    title: 'Evolution of Wi-Fi Generations',
    columns: ['Standard', 'Year', 'Band', 'Max data rate', 'Key technology'],
    rows: [
      ['802.11 (legacy)', '1997', '2.4 GHz / IR', '2 Mbps', 'FHSS, DSSS, infrared'],
      ['802.11b', '1999', '2.4 GHz', '11 Mbps', 'DSSS / CCK'],
      ['802.11a', '1999', '5 GHz', '54 Mbps', 'OFDM'],
      ['802.11g', '2003', '2.4 GHz', '54 Mbps', 'OFDM (backward compatible with b)'],
      ['802.11n (Wi-Fi 4)', '2009', '2.4 / 5 GHz', '600 Mbps', 'MIMO (4×4), 40 MHz'],
      ['802.11ac (Wi-Fi 5)', '2013', '5 GHz', '≈ 6.9 Gbps', 'MU-MIMO (DL), 160 MHz, 256-QAM'],
      ['802.11ax (Wi-Fi 6/6E)', '2019 / 2021', '2.4 / 5 / 6 GHz', '≈ 9.6 Gbps', 'OFDMA, 1024-QAM, TWT'],
      ['802.11be (Wi-Fi 7)', '2024', '2.4 / 5 / 6 GHz', '≈ 46 Gbps', '320 MHz, 4096-QAM, MLO'],
    ],
  },
  cards: {
    title: 'Improvements in Speed & Performance',
    items: [
      { title: 'Better Modulation', text: 'From DBPSK to 4096-QAM: more bits per symbol.' },
      { title: 'Wider Channels', text: '20 → 40 → 80 → 160 → 320 MHz.' },
      { title: 'More Spatial Streams', text: 'Up to 8 (Wi-Fi 5/6) and 16 in Wi-Fi 7 specs.' },
      { title: 'Multi-user Access', text: 'MU-MIMO and OFDMA serve many clients simultaneously.' },
      { title: 'New Spectrum', text: '6 GHz (Wi-Fi 6E/7) brings clean, wide channels.' },
      { title: 'Security', text: 'WEP → WPA → WPA2 → WPA3.' },
    ],
  },
  lists: [
    { title: 'Importance of IEEE 802.11', tone: 'good', items: ['A global, interoperable WLAN standard', 'Unlicensed spectrum, so anyone can deploy', 'Backbone of home, campus and public internet access', 'Offloads mobile data from cellular networks', 'Foundation for IoT and smart homes'] },
    { title: 'Security Evolution', tone: 'info', items: ['WEP (1997): broken RC4-based encryption', 'WPA (2003): TKIP interim fix', 'WPA2 (2004): AES-CCMP, long-time standard', 'WPA3 (2018): SAE handshake, stronger protection'] },
  ],
  lab: {
    key: 'w3-evolution',
    title: 'Visualizer: Wi-Fi Through the Generations',
    description: 'Step through every 802.11 amendment on a timeline. Then race the generations: see how long each would take to download a 4 GB movie at its maximum rate.',
    badge: { name: 'Wi-Fi Historian', emoji: '📶' },
    objectives: [
      { id: 'timeline', label: 'Explore every generation on the timeline', xp: 20 },
      { id: 'race', label: 'Run the download race', xp: 20 },
    ],
  },
  quiz: [
    { q: 'What was the maximum data rate of the original 1997 IEEE 802.11 standard?', options: ['2 Mbps', '11 Mbps', '54 Mbps', '600 Mbps'], answer: 0, explain: '1–2 Mbps.' },
    { q: 'Wi-Fi 6 corresponds to…', options: ['802.11n', '802.11ac', '802.11ax', '802.11be'], answer: 2, explain: '802.11ax, with OFDMA and 1024-QAM.' },
    { q: 'Which amendment first introduced MIMO?', options: ['802.11b', '802.11g', '802.11n', '802.11a'], answer: 2, explain: 'Wi-Fi 4 (2009).' },
    { q: 'Which band did Wi-Fi 6E add?', options: ['900 MHz', '2.4 GHz', '5 GHz', '6 GHz'], answer: 3, explain: 'Wi-Fi 6E extends 802.11ax into 6 GHz.' },
    { q: '802.11a and 802.11g both reach…', options: ['11 Mbps', '54 Mbps', '600 Mbps', '1 Gbps'], answer: 1, explain: 'Both use OFDM at 54 Mbps (a in 5 GHz, g in 2.4 GHz).' },
  ],
  deep: {
    sections: [
      { title: 'Why each generation got faster', points: ['Data rate ≈ spatial streams × subcarriers × bits per subcarrier × coding rate ÷ symbol time.', 'Wi-Fi 4 doubled channel width (40 MHz) and added up to 4 streams.', 'Wi-Fi 5 added 80/160 MHz and 256-QAM (8 bits per subcarrier).', 'Wi-Fi 6 added 1024-QAM and 4× longer OFDM symbols for efficiency. Wi-Fi 7 adds 320 MHz and 4096-QAM.'] },
      { title: 'From peak speed to efficiency', points: ['Wi-Fi 6’s main goal was not just peak rate but performance in crowded places (stadiums, campuses).', 'OFDMA lets one transmission carry data for many users at once.', 'BSS colouring reduces needless deferral between neighbouring networks.', 'Target Wake Time (TWT) saves battery for phones and IoT devices.'] },
      { title: 'Wi-Fi 7 highlights', points: ['Multi-Link Operation (MLO): use 2.4, 5 and 6 GHz links simultaneously.', '320 MHz channels in 6 GHz.', '4096-QAM: 12 bits per subcarrier.', 'Lower latency for AR/VR and cloud gaming.'] },
    ],
    cases: [
      { year: '1985', title: 'ISM bands opened', text: 'The US FCC allowed unlicensed spread-spectrum use of ISM bands, paving the way for Wi-Fi.' },
      { year: '1997', title: 'IEEE 802.11', text: 'The first WLAN standard was published, with 1–2 Mbps.' },
      { year: '1999', title: 'Wi-Fi Alliance & 802.11b', text: 'The brand "Wi-Fi" was born. Apple’s AirPort (1999) brought it to consumers.' },
      { year: '2018', title: 'Generation names', text: 'The Wi-Fi Alliance introduced Wi-Fi 4/5/6 naming.' },
      { year: '2024', title: 'Wi-Fi 7 certification', text: 'Certification of 802.11be devices began.' },
    ],
    myths: [
      { myth: 'Wi-Fi stands for "Wireless Fidelity".', fact: 'It is a brand name created for marketing. It doesn’t officially stand for anything.' },
      { myth: 'Maximum rate = what you get.', fact: 'Peak rates assume ideal conditions. Real throughput is often a fraction of them.' },
      { myth: 'New Wi-Fi routers don’t work with old devices.', fact: 'Wi-Fi is backward compatible. Old devices simply connect at older rates.' },
    ],
    examNotes: [
      '802.11 (1997, 2 Mbps) → b (11) → a/g (54, OFDM) → n/Wi-Fi 4 (600 Mbps, MIMO) → ac/Wi-Fi 5 (6.9 Gbps) → ax/Wi-Fi 6 (9.6 Gbps, OFDMA) → be/Wi-Fi 7 (46 Gbps).',
      'Speed gains: modulation (QAM), channel width, spatial streams, multi-user access.',
      'Bands: 2.4 GHz → 5 GHz → 6 GHz.',
      'Security: WEP → WPA → WPA2 → WPA3.',
      'Importance: global, unlicensed, interoperable WLAN standard.',
    ],
    extraQuiz: [
      { q: 'Which Wi-Fi 7 feature uses several bands at once?', options: ['OFDMA', 'MLO (Multi-Link Operation)', 'WEP', 'CCK'], answer: 1, explain: 'Multi-Link Operation aggregates 2.4/5/6 GHz links.' },
      { q: 'Wi-Fi 5 operates in…', options: ['2.4 GHz only', '5 GHz', '6 GHz only', '60 GHz only'], answer: 1, explain: '802.11ac is a 5 GHz standard.' },
    ],
  },
};
