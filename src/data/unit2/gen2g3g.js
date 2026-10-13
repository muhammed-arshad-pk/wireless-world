import { Signal } from 'lucide-react';

export default {
  slug: 'second-generation-tdma-cdma-3g',
  number: 7,
  title: 'Second-Generation Systems: TDMA, CDMA, and 3G',
  icon: Signal,
  color: '#facc15',
  difficulty: 'Advanced',
  summary: 'Digital 2G (GSM, IS-95), TDMA vs CDMA, and the evolution to 3G (WCDMA, CDMA2000).',
  tagline: 'When phones went digital, then went online.',
  keywords: ['2g', 'gsm', 'tdma', 'cdma', 'is-95', 'walsh code', 'spread spectrum', 'soft handoff', '3g', 'wcdma', 'umts', 'cdma2000', 'gprs', 'edge', 'hspa'],
  intro: [
    'Second-generation (2G) systems, launched in the early 1990s, replaced analog voice with digital transmission. Speech is digitised, compressed by a codec, protected with error-correcting codes and encrypted. Channels are shared using TDMA (GSM) or CDMA (IS-95). Digital technology brought better voice quality, security, SMS and much higher capacity.',
    'Third-generation (3G) systems (IMT-2000), from about 2001, were designed for mobile data and multimedia. Both main 3G standards use wideband CDMA: WCDMA/UMTS (3GPP, evolved from GSM) and CDMA2000 (3GPP2, evolved from IS-95). Stepping stones like GPRS and EDGE ("2.5G") added packet data on top of GSM.',
  ],
  definitions: {
    title: 'Key Terms',
    items: [
      { term: 'CDMA', text: 'Code Division Multiple Access: all users share the same frequency at the same time, separated by unique spreading codes.' },
      { term: 'Spreading code / chips', text: 'A fast code sequence (chips) that each data bit is multiplied by, spreading it over a wide band.' },
      { term: 'Processing gain', text: 'Chip rate ÷ bit rate. It sets how much interference CDMA can tolerate.' },
    ],
  },
  compare: {
    title: 'TDMA vs CDMA',
    left: { title: 'TDMA (GSM)', subtitle: 'Separate by time', points: ['Each user gets time slots on a carrier', 'Frequency reuse with clusters (N = 3–4 typical)', 'Hard handoff', 'Capacity limited by slots'] },
    right: { title: 'CDMA (IS-95)', subtitle: 'Separate by code', points: ['All users share frequency and time', 'Frequency reuse of 1: every cell uses the same carrier', 'Soft handoff (several base stations at once)', 'Interference-limited ("soft") capacity, needs tight power control'] },
  },
  flow: {
    title: 'Evolution from 2G to 3G',
    steps: [
      { title: '2G (1991)', text: 'GSM / IS-95: digital voice, SMS, about 9.6–14.4 kbps data.' },
      { title: '2.5G (2000)', text: 'GPRS (~40–115 kbps) and EDGE (up to ~384 kbps) add packet data to GSM.' },
      { title: '3G (2001)', text: 'WCDMA/UMTS and CDMA2000: 384 kbps to 2 Mbps, video calls, mobile internet.' },
      { title: '3.5G (2006+)', text: 'HSPA/HSPA+ and EV-DO push to several, then tens of, Mbps.' },
    ],
  },
  table: {
    title: 'GSM vs IS-95 Overview',
    columns: ['Feature', 'GSM', 'IS-95 (cdmaOne)'],
    rows: [
      ['Access', 'TDMA/FDMA (8 slots per carrier)', 'CDMA'],
      ['Carrier bandwidth', '200 kHz', '1.25 MHz'],
      ['Modulation', 'GMSK', 'QPSK / OQPSK'],
      ['Frequency reuse', 'Clusters (N ≈ 3–4, 7 in early networks)', '1 (all cells same carrier)'],
      ['Handoff', 'Hard', 'Soft'],
      ['Key ideas', 'SIM card, encryption, SMS', 'Walsh codes, RAKE receiver, power control'],
      ['Bands in India', '900 / 1800 MHz', '800 MHz (earlier CDMA operators)'],
    ],
  },
  formulas: [
    { name: 'Processing gain', expr: 'G_p = R_chip / R_bit', note: 'IS-95: 1.2288 Mcps ÷ 9.6 kbps = 128 (≈ 21 dB).' },
    { name: 'CDMA user capacity (approx.)', expr: 'N ≈ 1 + G_p / (Eb/I₀)', note: 'More processing gain or a lower required Eb/I₀ means more users.' },
    { name: 'GSM gross rate', expr: '270.833 kbps per carrier', note: 'Shared by 8 time slots in a 4.615 ms frame.' },
    { name: 'WCDMA chip rate', expr: '3.84 Mcps in 5 MHz', note: 'The UMTS radio interface.' },
  ],
  cards: {
    title: 'Key 2G/3G Technologies',
    items: [
      { title: 'Digital Voice Codecs', text: 'Compress speech to about 13 kbps (GSM full-rate) or less.' },
      { title: 'Walsh Codes', text: 'Orthogonal codes separate users on the same carrier (IS-95 uses 64).' },
      { title: 'Power Control', text: 'Solves the near-far problem: every signal arrives at equal power.' },
      { title: 'RAKE Receiver', text: 'Combines multipath copies instead of suffering from them.' },
      { title: 'SIM Card', text: 'GSM’s removable identity and security module.' },
      { title: 'Packet Data', text: 'GPRS/EDGE and then 3G HSPA introduced always-on internet.' },
    ],
  },
  lists: [
    { title: 'Advantages of 3G', tone: 'good', items: ['Mobile internet and multimedia', 'Video calling', 'Higher capacity and better spectral efficiency', 'Global roaming (IMT-2000 framework)'] },
    { title: 'Limitations of 3G', tone: 'warn', items: ['Expensive spectrum auctions and rollout', 'Higher battery consumption', 'Speeds well below fixed broadband initially', 'Two incompatible families (UMTS vs CDMA2000)'] },
    { title: '3G Standards', tone: 'info', items: ['WCDMA/UMTS (3GPP): 5 MHz, 3.84 Mcps, evolved to HSPA/HSPA+', 'CDMA2000 (3GPP2): 1x RTT, EV-DO', 'TD-SCDMA: China’s 3G standard', 'India: 3G auction in 2010, services from 2008 (BSNL) onward'] },
  ],
  lab: {
    key: 'w2-cdma',
    title: 'Visualizer: CDMA with Walsh Codes',
    description: 'Two users transmit at the same time on the same frequency. Choose their bits, spread them with orthogonal Walsh codes, add them in the channel, then despread at the receiver. Each user’s data pops back out, untouched by the other.',
    badge: { name: 'Code Breaker', emoji: '🔢' },
    objectives: [
      { id: 'decode', label: 'Recover both users’ bits from the combined signal', xp: 30 },
      { id: 'wrongcode', label: 'Try despreading with an unassigned code', xp: 15 },
    ],
  },
  quiz: [
    { q: 'GSM uses which access method?', options: ['CDMA', 'TDMA/FDMA', 'OFDMA', 'Analog FDMA only'], answer: 1, explain: '8 time slots on each 200 kHz carrier.' },
    { q: 'In CDMA, users are separated by…', options: ['Time slots', 'Frequency channels', 'Unique spreading codes', 'Different satellites'], answer: 2, explain: 'All share frequency and time.' },
    { q: 'Soft handoff is a feature of…', options: ['AMPS', 'GSM', 'CDMA', 'FM radio'], answer: 2, explain: 'A mobile can be connected to several base stations at once.' },
    { q: 'Which is a 3G standard?', options: ['AMPS', 'WCDMA (UMTS)', 'NMT', 'TACS'], answer: 1, explain: 'WCDMA uses 5 MHz carriers.' },
    { q: 'CDMA power control is needed to solve…', options: ['The near-far problem', 'Rain fade', 'Antenna height', 'SIM cloning'], answer: 0, explain: 'A nearby mobile would otherwise drown distant users.' },
  ],
  deep: {
    sections: [
      { title: 'How CDMA spreading works', points: ['Each user has a code of +1/−1 chips. Codes are orthogonal: their dot product is zero.', 'Transmit: each data bit (±1) is multiplied by the whole code, sending the code or its inverse.', 'The channel adds everyone’s chips together.', 'Receive: multiply the sum by your code and average. Your bit comes back (±1), while other users’ contributions cancel to 0.', 'This works perfectly only if codes stay synchronised and orthogonal. Real systems also use PN codes and power control.'] },
      { title: 'GSM architecture', points: ['MS (with SIM) ↔ BTS (base transceiver) ↔ BSC (controller), forming the BSS.', 'MSC with HLR, VLR, AuC (authentication) and EIR (equipment register): the NSS.', 'Security: A3 authentication and A5 encryption over the air.', 'GPRS added SGSN/GGSN nodes for packet data, the foundation of mobile internet.'] },
      { title: 'From 3G to beyond', points: ['HSPA added fast scheduling, HARQ and 16/64-QAM to WCDMA.', '4G LTE (2009) switched to OFDMA, giving all-IP and much higher capacity.', '5G (2019) adds massive MIMO, mmWave and network slicing.', 'Concepts from 2G/3G (codes, power control, scheduling) still underpin modern systems.'] },
    ],
    cases: [
      { year: '1991', title: 'First GSM call', text: 'Made in Finland on the Radiolinja network.' },
      { year: '1995', title: 'India’s first mobile call', text: 'Jyoti Basu called Sukh Ram over Modi Telstra’s GSM network in Kolkata.' },
      { year: '1995', title: 'IS-95 launch', text: 'Qualcomm’s cdmaOne launched commercially in Hong Kong.' },
      { year: '2001', title: 'First 3G network', text: 'NTT DoCoMo launched FOMA (WCDMA) in Japan.' },
    ],
    myths: [
      { myth: 'CDMA users interfere so much the system fails.', fact: 'With orthogonal codes and power control, other users appear as small, manageable noise.' },
      { myth: '3G was just faster 2G.', fact: 'It was a new radio interface (wideband CDMA) designed around packet data.' },
      { myth: 'GSM is completely gone.', fact: 'Many countries still run 2G for voice, SMS and IoT, although some are switching off.' },
    ],
    examNotes: [
      '2G: digital voice, encryption, SMS. GSM (TDMA/FDMA, 200 kHz, 8 slots, GMSK) and IS-95 (CDMA, 1.25 MHz).',
      'TDMA (time slots, hard handoff) vs CDMA (codes, reuse 1, soft handoff, power control).',
      'Processing gain G_p = R_chip/R_bit.',
      '2.5G GPRS/EDGE leads to 3G WCDMA (5 MHz, 3.84 Mcps) and CDMA2000, then HSPA/EV-DO.',
      '3G advantages: data, video calls, capacity. Limitations: cost, battery, competing standards.',
    ],
    extraQuiz: [
      { q: 'Two Walsh codes are orthogonal if their dot product is…', options: ['1', '0', '−1', 'Infinite'], answer: 1, explain: 'Zero cross-correlation lets users be separated perfectly.' },
      { q: 'India’s first mobile call in 1995 used…', options: ['AMPS', 'GSM', 'WCDMA', 'LTE'], answer: 1, explain: 'A GSM network in Kolkata.' },
    ],
  },
};
