import { Timer } from 'lucide-react';

export default {
  slug: 'satellite-capacity-tdma',
  number: 5,
  title: 'Satellite Capacity Allocation: Time Division',
  icon: Timer,
  color: '#f472b6',
  difficulty: 'Intermediate',
  summary: 'Sharing a transponder by giving each earth station short time slots in a repeating frame.',
  tagline: 'Everyone uses the whole band, just not at the same time.',
  keywords: ['tdma', 'time division', 'frame', 'time slot', 'burst', 'guard time', 'preamble', 'reference burst', 'synchronization', 'frame efficiency'],
  intro: [
    'In Time Division Multiple Access (TDMA), each earth station transmits a short burst using the entire transponder bandwidth, but only during its own time slot. The slots are arranged in a repeating frame, so every station gets a regular turn.',
    'Because only one carrier passes through the satellite amplifier at any instant, the amplifier can run at full power without intermodulation. This is TDMA’s big efficiency win over FDMA. The price is strict synchronisation: every station must know exactly when to transmit, despite its own distance to the satellite.',
  ],
  definitions: {
    title: 'Key Terms',
    items: [
      { term: 'Frame', text: 'The repeating time period containing every station’s slot (often around 2 ms in satellite TDMA).' },
      { term: 'Burst', text: 'A station’s short transmission inside its slot: preamble + traffic data.' },
      { term: 'Guard time', text: 'A small idle gap between bursts so timing errors don’t cause overlap.' },
    ],
  },
  compare: {
    title: 'FDMA vs TDMA',
    left: { title: 'FDMA', subtitle: 'Divide by frequency', points: ['Each station has its own frequency, transmitting continuously', 'Simple, no network timing', 'Intermodulation forces amplifier back-off', 'Guard bands waste spectrum'] },
    right: { title: 'TDMA', subtitle: 'Divide by time', points: ['Each station uses the full band in its time slot', 'Single carrier, so the amplifier runs at saturation', 'Needs precise frame synchronisation', 'Guard times and preambles add overhead'] },
  },
  flow: {
    title: 'Working Principle of TDMA',
    steps: [
      { title: 'Reference burst', text: 'A reference station transmits a timing burst marking the start of each frame.' },
      { title: 'Stations synchronise', text: 'Each station times its burst relative to the reference, compensating for its own distance.' },
      { title: 'Bursts in slots', text: 'Stations send preamble + data at the full transponder rate in their slot.' },
      { title: 'Receivers extract', text: 'Each receiver picks the bursts (and sub-slots) addressed to it.' },
    ],
  },
  table: {
    title: 'Frame Structure',
    columns: ['Element', 'Purpose', 'Contains'],
    rows: [
      ['Reference burst', 'Marks frame timing, network control', 'Carrier/bit-timing recovery, unique word, control data'],
      ['Preamble', 'Lets receivers lock onto each burst', 'Carrier & bit timing recovery (CBTR), unique word (UW), station ID'],
      ['Traffic data', 'User information', 'Voice/data channels for different destinations'],
      ['Guard time', 'Absorbs timing errors and range variation', 'No transmission'],
    ],
  },
  formulas: [
    { name: 'Frame efficiency', expr: 'η = (T_F − overhead) / T_F', note: 'overhead = guard times + preambles + reference bursts in one frame.' },
    { name: 'Overhead per frame', expr: 'overhead = N·(t_g + t_p) + t_ref', note: 'N = number of traffic bursts.' },
    { name: 'Station data rate', expr: 'R_station = R_burst · (t_data / T_F)', note: 'Burst rate × fraction of the frame the station uses.' },
  ],
  cards: {
    title: 'Key Concepts',
    items: [
      { title: 'Time Slots', text: 'Each station owns slots within every frame.' },
      { title: 'Slot Allocation', text: 'Fixed, or demand-assigned (more slots for busier stations).' },
      { title: 'Synchronisation', text: 'Open-loop or closed-loop timing correction via the reference burst.' },
      { title: 'Guard Time', text: 'Protects against clock drift and satellite motion.' },
      { title: 'Burst Buffering', text: 'Continuous user data is stored and sent in fast bursts.' },
      { title: 'Full-power Operation', text: 'One carrier at a time, so no intermodulation.' },
    ],
  },
  lists: [
    { title: 'Advantages of TDMA', tone: 'good', items: ['Amplifier at saturation, so more power and capacity', 'No intermodulation', 'Flexible: reassign slots as traffic changes', 'Digital-friendly, easy to combine with switching'] },
    { title: 'Limitations of TDMA', tone: 'warn', items: ['Complex network-wide synchronisation', 'High peak (burst) rate needs powerful earth stations', 'Buffering adds delay', 'Overhead from guard times and preambles'] },
    { title: 'Applications', tone: 'info', items: ['INTELSAT digital TDMA trunks', 'VSAT networks (often MF-TDMA)', 'GSM mobile (8 time slots per carrier)', 'Satellite broadband return links'] },
  ],
  lab: {
    key: 'w2-tdma',
    title: 'Visualizer: TDMA Frame Builder',
    description: 'Build a TDMA frame: choose the number of earth stations, guard time and preamble length, and watch the bursts take turns while the efficiency meter updates. Then compare the same transponder under FDMA.',
    badge: { name: 'Time Keeper', emoji: '⏱️' },
    objectives: [
      { id: 'frame', label: 'Build a frame with 90%+ efficiency', xp: 25 },
      { id: 'compare', label: 'Compare FDMA and TDMA on the same transponder', xp: 20 },
    ],
  },
  quiz: [
    { q: 'In TDMA, each station transmits…', options: ['Continuously on its own frequency', 'In its own time slot using the full bandwidth', 'With a unique code at all times', 'Only at night'], answer: 1, explain: 'Time division: turns in a repeating frame.' },
    { q: 'Why can a TDMA transponder run at saturation?', options: ['Only one carrier is present at a time, so there is no intermodulation', 'It uses less bandwidth', 'Satellites are cooler', 'Guard bands'], answer: 0, explain: 'Back-off is unnecessary.' },
    { q: 'What is the purpose of guard time?', options: ['Encryption', 'Prevent bursts overlapping due to timing errors', 'Increase power', 'Store data'], answer: 1, explain: 'It is a small idle gap between bursts.' },
    { q: 'The reference burst is used for…', options: ['Frame timing and synchronisation', 'Weather data', 'User voice', 'Power supply'], answer: 0, explain: 'All stations time their bursts from it.' },
    { q: 'GSM divides each carrier into how many time slots?', options: ['2', '4', '8', '64'], answer: 2, explain: 'GSM uses 8 slots per 200 kHz carrier.' },
  ],
  deep: {
    sections: [
      { title: 'Synchronisation challenge', points: ['Different earth stations are at different distances from the satellite, so signals take different times to arrive.', 'A GEO satellite also drifts slightly, changing the range by tens of kilometres daily.', 'Stations measure their own burst position in the downlink relative to the reference burst and adjust (closed-loop).', 'Accurate timing keeps guard times short, which keeps efficiency high.'] },
      { title: 'Burst mode and buffering', points: ['A station collects continuous traffic in a buffer during the frame.', 'It sends the buffer as a fast burst in its slot: burst rate ≫ average rate.', 'At the receiver, data is buffered again and played out smoothly.', 'Longer frames mean less overhead but more buffering delay.'] },
      { title: 'Hybrid schemes', points: ['MF-TDMA: several carriers (FDMA), each shared in time (TDMA). This is standard in modern VSAT.', 'SS-TDMA: satellite-switched TDMA routes bursts between spot beams on board.', 'GSM: FDMA (200 kHz carriers) + TDMA (8 slots), with frequency hopping optional.'] },
    ],
    cases: [
      { year: '1980s', title: 'INTELSAT TDMA', text: 'International digital trunks moved from FDMA to TDMA (120 Mbps bursts, 2 ms frames).' },
      { year: '1991', title: 'GSM', text: 'Brought TDMA to mobile phones worldwide.' },
      { year: '2000s', title: 'DVB-RCS', text: 'Satellite interactive return channels standardised MF-TDMA.' },
    ],
    myths: [
      { myth: 'TDMA has no overhead.', fact: 'Guard times, preambles and reference bursts consume part of every frame.' },
      { myth: 'TDMA users only get a fraction of the bandwidth.', fact: 'They get all of the bandwidth for a fraction of the time.' },
      { myth: 'TDMA needs no buffering.', fact: 'Continuous data must be stored and sent in bursts.' },
    ],
    examNotes: [
      'TDMA: stations share time slots in a frame, each using the full bandwidth.',
      'Frame = reference burst + traffic bursts (preamble + data) + guard times.',
      'Efficiency η = (T_F − overhead)/T_F.',
      'vs FDMA: no IM and full power, but needs synchronisation and burst buffering.',
      'Applications: INTELSAT, VSAT (MF-TDMA), GSM.',
    ],
    extraQuiz: [
      { q: 'A 2 ms frame with 0.2 ms total overhead has efficiency…', options: ['80%', '90%', '95%', '99%'], answer: 1, explain: '(2 − 0.2)/2 = 0.9.' },
      { q: 'MF-TDMA combines…', options: ['FDMA and TDMA', 'CDMA and AM', 'FM and PM', 'GEO and LEO'], answer: 0, explain: 'Multiple frequencies, each time-shared.' },
    ],
  },
};
