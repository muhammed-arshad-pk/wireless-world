import { Activity } from 'lucide-react';

export default {
  slug: 'fading-mobile-environment',
  number: 4,
  title: 'Fading in the Mobile Environment',
  icon: Activity,
  color: '#fb923c',
  difficulty: 'Advanced',
  summary: 'Why received signal strength fluctuates: path loss, shadowing, multipath and Doppler.',
  tagline: 'Why your signal bars jump up and down even when you barely move.',
  keywords: ['fading', 'path loss', 'shadowing', 'multipath', 'rayleigh', 'rician', 'doppler', 'coherence bandwidth', 'diversity', 'equalization', 'ofdm'],
  intro: [
    'Fading is the variation of received signal strength over time, distance or frequency. In a mobile environment the signal reaches the receiver through many paths (direct, reflected, diffracted, scattered), and the user is often moving. The copies arrive with different delays and phases and add up constructively or destructively.',
    'Engineers separate fading into large-scale effects (average power falling with distance, and shadowing by buildings) and small-scale effects (rapid fluctuations over distances of half a wavelength, caused by multipath). Understanding both is essential for designing reliable mobile links.',
  ],
  definitions: {
    title: 'Key Terms',
    items: [
      { term: 'Multipath', text: 'The same signal arriving via several paths with different delays and phases.' },
      { term: 'Doppler shift', text: 'Frequency change caused by relative motion: fd = (v/λ)·cos θ.' },
      { term: 'Coherence bandwidth (Bc)', text: 'The frequency range over which the channel behaves similarly. Bc ≈ 1/(5·στ), where στ is the RMS delay spread.' },
    ],
  },
  compare: {
    title: 'Large-scale vs Small-scale Fading',
    left: { title: 'Large-scale', subtitle: 'Over hundreds of wavelengths', points: ['Path loss: average power falls with distance', 'Shadowing: buildings and hills block the signal (log-normal)', 'Changes slowly as the user moves', 'Used for coverage and cell planning'] },
    right: { title: 'Small-scale', subtitle: 'Over about half a wavelength', points: ['Multipath: copies add and cancel', 'Deep fades of 20–40 dB within centimetres', 'Rayleigh (no LOS) or Rician (with LOS) statistics', 'Handled by diversity, equalization and coding'] },
  },
  flow: {
    title: 'How Multipath Fading Happens',
    steps: [
      { title: 'One transmitted signal', text: 'The base station sends a single carrier.' },
      { title: 'Many paths', text: 'Buildings, ground and vehicles reflect and scatter copies.' },
      { title: 'Different delays & phases', text: 'Each copy arrives slightly later, with a shifted phase.' },
      { title: 'Vector sum at receiver', text: 'In-phase copies reinforce, out-of-phase copies cancel, producing a deep fade.' },
    ],
  },
  table: {
    title: 'Types of Small-scale Fading',
    columns: ['Type', 'Condition', 'Effect', 'Example'],
    rows: [
      ['Flat fading', 'Signal bandwidth < coherence bandwidth', 'Whole signal fades together, no ISI', 'Narrowband voice channel'],
      ['Frequency-selective', 'Signal bandwidth > coherence bandwidth', 'Some frequencies fade, causing intersymbol interference (ISI)', 'Wideband data in urban areas'],
      ['Slow fading', 'Symbol time < coherence time', 'Channel steady over a symbol', 'Pedestrian user'],
      ['Fast fading', 'Symbol time > coherence time', 'Channel changes within a symbol', 'High-speed train or car'],
    ],
  },
  formulas: [
    { name: 'Free-space path loss', expr: 'FSPL(dB) = 20log₁₀(d) + 20log₁₀(f) + 32.44', note: 'd in km, f in MHz. Doubling distance adds 6 dB.' },
    { name: 'Log-distance path loss', expr: 'PL(d) = PL(d₀) + 10·n·log₁₀(d/d₀) + Xσ', note: 'n = 2 (free space) to 4–6 (indoor/urban). Xσ = shadowing.' },
    { name: 'Doppler shift', expr: 'fd = (v / λ) · cos θ', note: 'Maximum when moving directly toward or away from the transmitter.' },
    { name: 'Coherence time', expr: 'Tc ≈ 0.423 / fd(max)', note: 'How long the channel stays roughly constant.' },
    { name: 'Coherence bandwidth', expr: 'Bc ≈ 1 / (5 · στ)', note: 'στ = RMS delay spread of the multipath channel.' },
  ],
  cards: {
    title: 'Causes of Fading',
    items: [
      { title: 'Path Loss', text: 'Energy spreads over a larger area with distance.' },
      { title: 'Shadowing', text: 'Large obstacles block the direct path.' },
      { title: 'Multipath', text: 'Reflections from buildings and terrain combine at the receiver.' },
      { title: 'Doppler Spread', text: 'Movement shifts frequencies and makes fading change faster.' },
      { title: 'Atmospheric Effects', text: 'Rain fade above 10 GHz, ducting and scintillation.' },
      { title: 'Delay Spread', text: 'Echoes arrive late and smear symbols into each other (ISI).' },
    ],
  },
  lists: [
    { title: 'Techniques to Reduce Fading', tone: 'good', items: ['Diversity: space (multiple antennas), frequency, time, polarization', 'Equalization: undo ISI in the receiver', 'OFDM: split data into many narrow, flat-fading subcarriers (Wi-Fi, 4G, 5G)', 'Error-correcting codes + interleaving', 'RAKE receiver (CDMA) combines multipath energy', 'MIMO: turns multipath into extra capacity', 'Power control and adaptive modulation'] },
    { title: 'Statistical Models', tone: 'info', items: ['Rayleigh fading: no line of sight, many scattered paths', 'Rician fading: a strong LOS path plus scattered paths', 'Log-normal shadowing: slow variation around the path-loss mean', 'Okumura–Hata model: empirical urban path loss for 150–1500 MHz'] },
  ],
  lab: {
    key: 'w1-fading',
    title: 'Visualizer: Multipath Fading',
    description: 'A direct wave and a reflected wave reach a moving receiver. Slide the receiver and watch the two phasors add up or cancel, producing the fading pattern. Then compute free-space path loss and Doppler shift.',
    badge: { name: 'Fade Fighter', emoji: '📉' },
    objectives: [
      { id: 'deepfade', label: 'Find a deep fade (signal below 20%)', xp: 25 },
      { id: 'fspl', label: 'Calculate path loss for a 1 km link at 900 MHz', xp: 20 },
    ],
  },
  quiz: [
    { q: 'What causes small-scale fading?', options: ['Battery drain', 'Multipath signals adding constructively and destructively', 'Antenna colour', 'Long cables'], answer: 1, explain: 'Copies with different phases interfere at the receiver.' },
    { q: 'Shadowing is part of…', options: ['Small-scale fading', 'Large-scale fading', 'Modulation', 'Encoding'], answer: 1, explain: 'Large obstacles cause slow, large-scale variation.' },
    { q: 'Frequency-selective fading occurs when the signal bandwidth is…', options: ['Smaller than the coherence bandwidth', 'Larger than the coherence bandwidth', 'Zero', 'Equal to the carrier'], answer: 1, explain: 'Different parts of the spectrum fade differently, causing ISI.' },
    { q: 'Which technique splits a wideband signal into many narrowband subcarriers?', options: ['AM', 'OFDM', 'FDMA only', 'Simplex'], answer: 1, explain: 'Each OFDM subcarrier experiences flat fading.' },
    { q: 'Doubling the distance in free space increases path loss by about…', options: ['1 dB', '3 dB', '6 dB', '20 dB'], answer: 2, explain: '20·log₁₀(2) ≈ 6 dB.' },
  ],
  deep: {
    sections: [
      { title: 'Why deep fades happen every half wavelength', points: ['Two equal-strength paths with path difference Δd have phase difference 2πΔd/λ.', 'When the phase difference reaches π (180°), they cancel almost completely.', 'Moving the receiver by λ/2 changes the relative phase enough to go from peak to null.', 'At 900 MHz (λ ≈ 33 cm), nulls can be about 16 cm apart, which is why moving a phone slightly can improve the signal.'] },
      { title: 'Rayleigh vs Rician', points: ['With many random paths and no dominant one, the envelope follows a Rayleigh distribution, giving frequent deep fades.', 'With a strong LOS component, the Rician K-factor (LOS power ÷ scattered power) describes it. Higher K means milder fading.', 'Rayleigh is the worst case and is used to design robust systems.'] },
      { title: 'Diversity: the main weapon', points: ['Idea: deep fades on independent branches rarely happen at the same time.', 'Space diversity: antennas separated by at least λ/2 (more at base stations).', 'Selection combining picks the best branch. Maximal-ratio combining (MRC) weights and adds all branches.', 'Time diversity: interleaving plus coding spreads bits so a fade hits only a few of them.'] },
    ],
    cases: [
      { year: '1968', title: 'Okumura measurements', text: 'Extensive Tokyo measurements created the basis for the widely used Okumura–Hata urban propagation model.' },
      { year: '1990s', title: 'RAKE receivers', text: 'CDMA phones collected energy from several multipath "fingers" instead of suffering from them.' },
      { year: '2009', title: 'MIMO-OFDM in 4G LTE', text: 'LTE combined OFDM and multiple antennas to turn multipath into capacity.' },
    ],
    myths: [
      { myth: 'More reflections always mean a worse signal.', fact: 'With MIMO, rich multipath actually increases capacity.' },
      { myth: 'Fading only depends on distance.', fact: 'Small movements of centimetres can cause 20–40 dB changes.' },
      { myth: 'Higher power fixes fading.', fact: 'It helps path loss, but deep multipath nulls need diversity or coding.' },
    ],
    examNotes: [
      'Fading = variation in received signal strength with time, distance or frequency.',
      'Large-scale: path loss + shadowing. Small-scale: multipath + Doppler.',
      'Flat vs frequency-selective (signal BW vs Bc). Slow vs fast (symbol time vs Tc).',
      'FSPL = 20log d + 20log f + 32.44 (km, MHz). fd = v/λ·cosθ.',
      'Mitigation: diversity, equalization, OFDM, coding + interleaving, RAKE, MIMO.',
    ],
    extraQuiz: [
      { q: 'Max Doppler shift for a car at 30 m/s with a 900 MHz carrier?', options: ['≈ 9 Hz', '≈ 90 Hz', '≈ 900 Hz', '≈ 9 kHz'], answer: 1, explain: 'λ = 0.333 m, so fd = 30 / 0.333 ≈ 90 Hz.' },
      { q: 'Fading with a strong line-of-sight component is modelled as…', options: ['Rayleigh', 'Rician', 'Gaussian', 'Uniform'], answer: 1, explain: 'Rician fading includes a dominant LOS path.' },
    ],
  },
};
