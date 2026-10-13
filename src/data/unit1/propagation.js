import { Waves } from 'lucide-react';

export default {
  slug: 'propagation-modes',
  number: 3,
  title: 'Propagation Modes',
  icon: Waves,
  color: '#34d399',
  difficulty: 'Intermediate',
  summary: 'Ground wave, sky wave and line of sight, plus reflection, diffraction and scattering.',
  tagline: 'How radio waves travel from transmitter to receiver.',
  keywords: ['propagation', 'ground wave', 'sky wave', 'ionosphere', 'line of sight', 'radio horizon', 'reflection', 'diffraction', 'scattering', 'fresnel'],
  intro: [
    'Radio wave propagation describes how waves travel from a transmitting antenna to a receiving antenna. The path a wave takes depends mainly on its frequency, along with the terrain, the atmosphere and the antenna heights.',
    'There are three basic modes. Ground waves (below about 2 MHz) hug the Earth’s curvature. Sky waves (about 2–30 MHz) are bent back by the ionosphere and can travel thousands of kilometres. Line-of-sight waves (above about 30 MHz) travel in straight lines and are limited by the horizon. On the way, waves are also reflected, diffracted and scattered by objects.',
  ],
  definitions: {
    title: 'Key Terms',
    items: [
      { term: 'Ionosphere', text: 'Ionised upper atmosphere (≈ 60–1000 km) with D, E and F layers that refract HF waves.' },
      { term: 'Skip distance', text: 'The minimum distance from the transmitter at which a sky wave returns to Earth.' },
      { term: 'Radio horizon', text: 'The maximum LOS range. It is about 15% beyond the optical horizon because the atmosphere bends waves slightly.' },
    ],
  },
  compare: {
    title: 'Sky Wave vs Line of Sight',
    left: { title: 'Sky wave (HF)', subtitle: 'Bounces off the ionosphere', points: ['2–30 MHz', 'Very long range (multi-hop, worldwide)', 'Varies with day/night, season and solar activity', 'Shortwave broadcast, amateur radio, OTH radar'] },
    right: { title: 'Line of sight (VHF and above)', subtitle: 'Straight-line path', points: ['Above ~30 MHz', 'Range limited by the horizon and antenna height', 'Stable and predictable, high bandwidth', 'FM, TV, mobile, Wi-Fi, satellite, microwave'] },
  },
  flow: {
    title: 'Propagation Mode by Frequency',
    steps: [
      { title: 'Below 2 MHz: ground wave', text: 'The wave follows the Earth’s surface (AM medium wave, VLF navigation).' },
      { title: '2–30 MHz: sky wave', text: 'The ionosphere refracts the wave back to Earth beyond the horizon.' },
      { title: 'Above 30 MHz: line of sight', text: 'The wave passes through the ionosphere, so a direct path is needed.' },
      { title: 'Everywhere: RDS', text: 'Reflection, diffraction and scattering create extra paths.' },
    ],
  },
  table: {
    title: 'Applications of Different Propagation Modes',
    columns: ['Mode', 'Frequency range', 'Range', 'Applications'],
    rows: [
      ['Ground wave', '< 2 MHz (VLF–MF)', 'Hundreds of km (more over sea)', 'AM broadcast, maritime, submarine VLF, navigation'],
      ['Sky wave', '2–30 MHz (HF)', 'Thousands of km', 'Shortwave radio, amateur, aviation HF, OTH radar'],
      ['Line of sight', '> 30 MHz (VHF and above)', 'Tens of km (to horizon), or to satellites', 'FM, TV, cellular, Wi-Fi, satellite, microwave links'],
      ['Tropospheric scatter', '~300 MHz–10 GHz', '100–500 km', 'Military and remote-area links'],
    ],
  },
  formulas: [
    { name: 'Radio horizon (one antenna)', expr: 'd = 3.57 √(K · h)', note: 'd in km, h in metres. K = 4/3 for standard atmosphere, so d ≈ 4.12 √h.' },
    { name: 'Max LOS distance (two antennas)', expr: 'd = 3.57 (√(K·h₁) + √(K·h₂))', note: 'Raise either antenna to extend range.' },
    { name: 'Critical frequency', expr: 'fc ≈ 9 √Nmax', note: 'Highest frequency reflected vertically. N = electron density per m³.' },
    { name: 'Maximum usable frequency', expr: 'MUF = fc / cos θ', note: 'Secant law: θ = angle of incidence at the layer.' },
    { name: 'First Fresnel-zone radius', expr: 'r = 17.32 √(d₁d₂ / (f·d))', note: 'r in m, distances in km, f in GHz. Keep about 60% of it clear.' },
  ],
  cards: {
    title: 'Reflection, Diffraction & Scattering',
    items: [
      { title: 'Reflection', text: 'Waves bounce off surfaces much larger than λ (ground, buildings, walls).' },
      { title: 'Diffraction', text: 'Waves bend around edges (hills, rooftops), so signals reach "shadow" regions.' },
      { title: 'Scattering', text: 'Objects about the size of λ or smaller (foliage, signs, rain) spread energy in many directions.' },
      { title: 'Refraction', text: 'Waves bend when passing between media of different density (atmosphere, ionosphere).' },
      { title: 'Absorption', text: 'Rain, oxygen and water vapour absorb energy, which is severe above about 10 GHz.' },
      { title: 'Ducting', text: 'Temperature inversions trap VHF/UHF waves, causing unusually long ranges.' },
    ],
  },
  lists: [
    { title: 'Ionospheric Layers', tone: 'info', items: ['D layer (60–90 km): absorbs lower HF by day and disappears at night', 'E layer (90–150 km): reflects lower HF', 'F1/F2 layers (150–500 km): main HF reflectors. F2 is highest and strongest', 'Night-time: D vanishes, so AM and HF travel much farther'] },
    { title: 'Practical Takeaways', tone: 'good', items: ['Tall towers extend LOS range', 'HF frequency must be below the MUF but above the LUF', 'Indoor Wi-Fi relies heavily on reflections', 'Microwave links need a clear first Fresnel zone'] },
  ],
  lab: {
    key: 'w1-propagation',
    title: 'Visualizer: Propagation Modes',
    description: 'Sweep the frequency from kHz to GHz and watch the wave switch between ground-wave, sky-wave and line-of-sight propagation. Then raise the antenna towers to see how far a line-of-sight link can reach.',
    badge: { name: 'Wave Tracker', emoji: '🌍' },
    objectives: [
      { id: 'modes', label: 'See all three propagation modes', xp: 25 },
      { id: 'horizon', label: 'Achieve a 50 km line-of-sight link', xp: 20 },
    ],
  },
  quiz: [
    { q: 'Which propagation mode is used by AM medium-wave broadcasting during the day?', options: ['Ground wave', 'Line of sight', 'Satellite', 'Infrared'], answer: 0, explain: 'MF signals follow the Earth’s surface.' },
    { q: 'Sky-wave propagation relies on…', options: ['The ocean', 'The ionosphere', 'Satellites', 'Optical fibre'], answer: 1, explain: 'Ionospheric layers refract HF waves back to Earth.' },
    { q: 'Why does line-of-sight range increase with antenna height?', options: ['More power', 'The radio horizon moves farther away', 'Less noise', 'Better polarization'], answer: 1, explain: 'd ≈ 4.12√h km.' },
    { q: 'Waves bending around a hill is called…', options: ['Reflection', 'Diffraction', 'Absorption', 'Ducting'], answer: 1, explain: 'Diffraction lets signals reach shadowed areas.' },
    { q: 'Mobile phones and Wi-Fi mainly use…', options: ['Ground wave', 'Sky wave', 'Line-of-sight (plus reflections)', 'VLF'], answer: 2, explain: 'UHF/SHF signals travel in straight lines and reflect off surfaces.' },
  ],
  deep: {
    sections: [
      { title: 'Ground-wave propagation in detail', points: ['A vertically polarised wave induces currents in the ground, which tilt the wavefront so it follows the curvature.', 'Losses increase with frequency, so ground waves are practical below about 2 MHz.', 'Ground conductivity matters: seawater (good conductor) carries ground waves much farther than dry sand.', 'VLF (3–30 kHz) can even penetrate seawater a little, which is used to contact submarines.'] },
      { title: 'Sky-wave propagation in detail', points: ['The ionosphere’s refractive index decreases with electron density, so waves bend away from dense regions and curve back down.', 'Critical frequency: the highest frequency reflected at vertical incidence. Above it, waves escape into space.', 'MUF (maximum usable frequency) depends on angle: lower angles give a higher MUF and longer skip.', 'Ionisation follows the sun, so HF conditions change hour by hour and with the 11-year solar cycle.'] },
      { title: 'LOS and the Fresnel zone', points: ['Earth’s curvature hides distant antennas. Atmospheric refraction (K = 4/3) extends the horizon slightly.', 'Even with a visible path, obstacles inside the first Fresnel zone cause diffraction loss.', 'Microwave link planners keep at least 60% of the first Fresnel zone clear.', 'Satellites are LOS too: the "horizon" is just very high up.'] },
    ],
    cases: [
      { year: '1901', title: 'Transatlantic signal', text: 'Marconi’s long-distance success was later explained by ionospheric reflection.' },
      { year: '1924', title: 'Ionosphere confirmed', text: 'Appleton measured the reflecting layer’s height, earning a Nobel Prize in 1947.' },
      { year: '1950s', title: 'Microwave relay networks', text: 'LOS towers every 40–50 km carried telephone and TV signals across countries.' },
    ],
    myths: [
      { myth: 'Radio waves always travel in straight lines.', fact: 'Lower frequencies follow the ground or bounce off the ionosphere.' },
      { myth: 'If you can’t see the tower, you get no signal.', fact: 'Diffraction and reflection often deliver usable signal into shadow regions.' },
      { myth: 'HF propagation is constant.', fact: 'It changes with time of day, season and the solar cycle.' },
    ],
    examNotes: [
      'Ground wave < 2 MHz (follows the Earth). Sky wave 2–30 MHz (ionosphere). LOS > 30 MHz.',
      'Ionosphere layers: D, E, F1, F2. D absorbs by day.',
      'Radio horizon d = 3.57√(Kh), K = 4/3, so d ≈ 4.12√h km.',
      'Reflection (large surfaces), diffraction (edges), scattering (small objects).',
      'Fresnel zone clearance of 60% for microwave links.',
    ],
    extraQuiz: [
      { q: 'Radio horizon of a 100 m tall antenna (K = 4/3)?', options: ['≈ 4 km', '≈ 41 km', '≈ 400 km', '≈ 4000 km'], answer: 1, explain: '4.12 × √100 = 41.2 km.' },
      { q: 'Which ionospheric layer disappears at night?', options: ['D', 'E', 'F2', 'None'], answer: 0, explain: 'Without sunlight the D layer recombines and vanishes.' },
    ],
  },
};
