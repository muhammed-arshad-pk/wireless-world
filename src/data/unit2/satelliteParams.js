import { Orbit } from 'lucide-react';

export default {
  slug: 'satellite-parameters-configurations',
  number: 3,
  title: 'Satellite Parameters and Configurations',
  icon: Orbit,
  color: '#34d399',
  difficulty: 'Intermediate',
  summary: 'LEO, MEO and GEO orbits: altitude, period, coverage, footprints, bands and configurations.',
  tagline: 'Higher orbits see more of Earth, but signals take longer to arrive.',
  keywords: ['orbit', 'leo', 'meo', 'geo', 'geostationary', 'orbital period', 'footprint', 'coverage', 'kepler', 'vsat', 'molniya'],
  intro: [
    'A satellite orbit is the path a satellite follows around Earth, balanced between gravity and its own motion. The orbit’s altitude decides almost everything: how fast the satellite moves, how long one orbit takes, how much of Earth it can see, how strong the signal is, and how much delay users experience.',
    'Communication systems use three main altitude classes. Low Earth Orbit (LEO) is fast-moving, low-latency, with small coverage per satellite. Medium Earth Orbit (MEO) is used by navigation systems. Geostationary Orbit (GEO) appears fixed in the sky above the equator, so dishes never need to move.',
  ],
  definitions: {
    title: 'Key Terms',
    items: [
      { term: 'Orbital period', text: 'Time taken for one complete orbit. Lower orbits are faster (LEO ≈ 90–120 min).' },
      { term: 'Footprint', text: 'The area on Earth covered by a satellite’s antenna beam, shown as signal-strength (EIRP) contours.' },
      { term: 'Geostationary', text: 'A circular, equatorial orbit at 35,786 km with a period of one sidereal day (23 h 56 min), so it appears stationary.' },
    ],
  },
  compare: {
    title: 'Geostationary vs Non-geostationary',
    left: { title: 'GEO', subtitle: 'Fixed in the sky', points: ['3 satellites cover almost the whole Earth (except poles)', 'Fixed dishes, no tracking needed', 'High delay (~240 ms), weak signals', 'Broadcasting, DTH, weather'] },
    right: { title: 'LEO / MEO constellations', subtitle: 'Moving satellites', points: ['Low latency and lower path loss', 'Need many satellites and handover between them', 'Cover the poles with inclined/polar orbits', 'Broadband (Starlink), navigation (GPS), phones (Iridium)'] },
  },
  flow: {
    title: 'How Altitude Changes Everything',
    steps: [
      { title: 'Higher altitude', text: 'Larger orbit radius.' },
      { title: 'Slower & longer period', text: 'T ∝ r^1.5 (Kepler’s third law).' },
      { title: 'Bigger footprint', text: 'Sees a larger cap of the Earth, so fewer satellites are needed.' },
      { title: 'More delay & loss', text: 'Longer path means more latency and weaker received signal.' },
    ],
  },
  table: {
    title: 'LEO vs MEO vs GEO',
    columns: ['Parameter', 'LEO', 'MEO', 'GEO'],
    rows: [
      ['Altitude', '≈ 160–2,000 km', '≈ 2,000–35,786 km', '35,786 km (equator)'],
      ['Orbital period', '≈ 88–127 min', '≈ 2–24 h (GPS ≈ 12 h)', '23 h 56 min'],
      ['One-way delay (up+down)', '≈ 5–30 ms', '≈ 70–140 ms', '≈ 240 ms'],
      ['Satellites for global cover', 'Dozens to thousands', '≈ 10–30', '3 (except poles)'],
      ['Visibility from one place', 'Minutes', 'Hours', 'Always'],
      ['Examples', 'Starlink, OneWeb, Iridium, ISS', 'GPS, Galileo, O3b', 'INSAT/GSAT, DTH, weather'],
    ],
  },
  formulas: [
    { name: 'Orbital period (Kepler III)', expr: 'T = 2π √(a³ / μ)', note: 'a = R_E + h, μ = 398,600 km³/s², R_E ≈ 6,378 km.' },
    { name: 'Orbital speed', expr: 'v = √(μ / a)', note: 'LEO ≈ 7.6 km/s, GEO ≈ 3.07 km/s.' },
    { name: 'Coverage (0° elevation)', expr: 'Fraction = ½ (1 − R_E / (R_E + h))', note: 'GEO sees ≈ 42% of Earth at the horizon (usable ≈ 1/3).' },
    { name: 'Max distance to satellite', expr: 'd = √((R_E + h)² − R_E²)', note: 'Slant range at 0° elevation.' },
  ],
  cards: {
    title: 'Satellite Parameters',
    items: [
      { title: 'Altitude', text: 'Height above Earth’s surface. Determines period, coverage, delay.' },
      { title: 'Orbital Period', text: 'Time per revolution.' },
      { title: 'Inclination', text: 'Angle of orbit to the equator: 0° for GEO, ~90° for polar.' },
      { title: 'Coverage Area', text: 'Region visible above a minimum elevation angle.' },
      { title: 'Frequency Band & Beam', text: 'C, Ku, Ka bands. Global, regional or spot beams.' },
      { title: 'Transponder Capacity', text: 'Bandwidth per transponder (e.g. 36 MHz) and number of transponders.' },
    ],
  },
  lists: [
    { title: 'Satellite Communication Configurations', tone: 'info', items: ['Point-to-point: two earth stations via satellite (trunk links)', 'Point-to-multipoint / broadcast: one uplink, many receivers (DTH)', 'Multipoint-to-point: many terminals report to a hub (data collection)', 'VSAT star: remote terminals communicate through a central hub', 'VSAT mesh: terminals communicate directly via satellite'] },
    { title: 'Applications by Orbit', tone: 'good', items: ['GEO: TV broadcasting, DTH, weather monitoring, telecom trunks', 'MEO: navigation (GPS, Galileo), some broadband (O3b)', 'LEO: low-latency broadband, satellite phones, Earth imaging', 'HEO (Molniya): high-latitude coverage (Russia)'] },
  ],
  lab: {
    key: 'w2-orbits',
    title: 'Visualizer: Orbit Comparison Simulation',
    description: 'Launch satellites into LEO, MEO and GEO and watch them circle Earth at their true relative speeds. Drag the altitude slider to compute the real period, speed, delay and coverage, and find the geostationary altitude yourself.',
    badge: { name: 'Orbit Architect', emoji: '🪐' },
    objectives: [
      { id: 'compare', label: 'Compare LEO, MEO and GEO', xp: 20 },
      { id: 'geo', label: 'Find the altitude where the period equals one sidereal day', xp: 30 },
    ],
  },
  quiz: [
    { q: 'Which orbit allows a satellite to appear stationary relative to a point on Earth?', options: ['LEO', 'MEO', 'GEO', 'Polar LEO'], answer: 2, explain: 'GEO at 35,786 km over the equator matches Earth’s rotation.' },
    { q: 'Approximate orbital period of a LEO satellite?', options: ['90 minutes', '12 hours', '24 hours', '1 week'], answer: 0, explain: 'Low orbits are fast, about 90–120 minutes.' },
    { q: 'GPS satellites are in which orbit?', options: ['LEO', 'MEO', 'GEO', 'HEO'], answer: 1, explain: 'About 20,200 km, with a 12-hour period.' },
    { q: 'What is a satellite footprint?', options: ['Its launch pad', 'The area on Earth covered by its beam', 'Its weight', 'Its solar panel area'], answer: 1, explain: 'Shown as EIRP contours.' },
    { q: 'Minimum number of GEO satellites for near-global coverage?', options: ['1', '3', '24', '1000'], answer: 1, explain: 'As Arthur C. Clarke proposed (excluding polar regions).' },
  ],
  deep: {
    sections: [
      { title: 'Why the geostationary altitude is 35,786 km', points: ['For the satellite to stay above one point, its period must equal Earth’s rotation: one sidereal day = 86,164 s.', 'From T = 2π√(a³/μ): a = (μ·T² / 4π²)^(1/3) ≈ 42,164 km from Earth’s centre.', 'Subtracting Earth’s radius (6,378 km) gives an altitude of 35,786 km.', 'It must also be circular and equatorial (0° inclination). Otherwise it traces a figure-8 (geosynchronous).'] },
      { title: 'Coverage and elevation angle', points: ['A satellite sees a spherical "cap" of Earth. Higher altitude means a bigger cap.', 'Usable coverage needs a minimum elevation angle (5–10°) to avoid obstructions and long atmospheric paths.', 'GEO coverage fades toward the poles, which is why Russia used highly elliptical Molniya orbits.', 'Spot beams shrink footprints deliberately to reuse frequencies and boost signal strength.'] },
      { title: 'LEO constellations', points: ['Each satellite is visible for only minutes, so users hand over between satellites.', 'Inter-satellite laser links route traffic in space.', 'Lower path loss allows small user terminals and phone-to-satellite links.', 'Challenges: thousands of satellites, space debris, astronomy interference.'] },
    ],
    cases: [
      { year: '1957', title: 'Sputnik 1', text: 'The first artificial satellite, in LEO with a ~96-minute period.' },
      { year: '1964', title: 'Syncom 3', text: 'The first geostationary satellite, broadcasting the Tokyo Olympics.' },
      { year: '1998', title: 'Iridium', text: 'A 66-satellite LEO constellation for global satellite phones.' },
      { year: '2016', title: 'NavIC (IRNSS)', text: 'India’s regional navigation system, using GEO and inclined geosynchronous satellites.' },
    ],
    myths: [
      { myth: 'Geostationary satellites don’t move.', fact: 'They move at about 3 km/s, exactly matching Earth’s rotation.' },
      { myth: 'Higher orbits are always better.', fact: 'They give more coverage but more delay and path loss.' },
      { myth: 'All satellites orbit above the equator.', fact: 'Many use inclined or polar orbits to cover high latitudes.' },
    ],
    examNotes: [
      'LEO 160–2,000 km (~90 min), MEO 2,000–35,786 km (GPS 12 h), GEO 35,786 km (23 h 56 m).',
      'T = 2π√(a³/μ). Higher orbit gives a longer period and bigger footprint, but more delay and loss.',
      'Footprint = beam coverage area (EIRP contours).',
      'Bands: L, S, C, X, Ku, Ka. Transponders typically 36 MHz.',
      'Configurations: point-to-point, broadcast, VSAT star and mesh.',
    ],
    extraQuiz: [
      { q: 'What is the orbital radius of a GEO satellite measured from Earth’s centre?', options: ['6,378 km', '20,200 km', '42,164 km', '384,400 km'], answer: 2, explain: '35,786 + 6,378 km.' },
      { q: 'Which orbit is best for covering polar regions?', options: ['GEO', 'Polar / highly inclined orbits', 'Equatorial LEO', 'None'], answer: 1, explain: 'GEO satellites sit too low on the horizon near the poles.' },
    ],
  },
};
