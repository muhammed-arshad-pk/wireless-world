import { SlidersHorizontal } from 'lucide-react';

export default {
  slug: 'analog-modulation-and-pcm',
  number: 7,
  title: 'Analog Data to Analog Signals and Analog Data to Digital Signals',
  icon: SlidersHorizontal,
  color: '#facc15',
  difficulty: 'Advanced',
  summary: 'AM, FM and PM for analog signals, and sampling, quantization and PCM for digitising them.',
  tagline: 'From your voice to radio waves, and from radio waves to bits.',
  keywords: ['am', 'fm', 'pm', 'modulation index', 'carson', 'sidebands', 'sampling theorem', 'nyquist', 'aliasing', 'quantization', 'pcm', 'companding', 'delta modulation'],
  intro: [
    'Analog data such as voice or music is a continuous signal. To send it by radio we shift it to a high-frequency carrier using analog modulation: Amplitude Modulation (AM), Frequency Modulation (FM) or Phase Modulation (PM).',
    'To send it over digital systems such as mobile networks, CDs or the internet, we convert it into bits. Sample it fast enough (the Sampling Theorem), round each sample to a fixed level (quantization), and encode each level as a binary number. This is Pulse Code Modulation (PCM).',
  ],
  definitions: {
    title: 'Key Terms',
    items: [
      { term: 'Modulation index', text: 'How strongly the message changes the carrier: AM index nₐ, FM index β = Δf/fₘ.' },
      { term: 'Sampling rate (fₛ)', text: 'Samples taken per second. It must be at least 2× the highest frequency (Nyquist rate).' },
      { term: 'Quantization', text: 'Rounding each sample to the nearest of 2ⁿ levels. The rounding error is quantization noise.' },
    ],
  },
  compare: {
    title: 'AM vs FM',
    left: { title: 'Amplitude Modulation', subtitle: 'Carrier amplitude follows the message', points: ['Bandwidth = 2 × message bandwidth', 'Simple receivers (envelope detector)', 'Very sensitive to noise and static', 'MW/SW broadcasting, aviation radio'] },
    right: { title: 'Frequency Modulation', subtitle: 'Carrier frequency follows the message', points: ['Bandwidth ≈ 2(Δf + B) (Carson’s rule)', 'Constant amplitude, so it rejects amplitude noise', 'Higher fidelity, capture effect', 'FM broadcasting (88–108 MHz), two-way radio'] },
  },
  flow: {
    title: 'Pulse Code Modulation (Analog → Digital)',
    steps: [
      { title: 'Low-pass filter', text: 'Remove frequencies above B to prevent aliasing.' },
      { title: 'Sampling', text: 'Measure the signal at fₛ ≥ 2B samples/s (PAM samples).' },
      { title: 'Quantization', text: 'Round each sample to one of 2ⁿ levels.' },
      { title: 'Encoding', text: 'Represent each level with n bits, giving a bit rate of n × fₛ.' },
    ],
  },
  table: {
    title: 'AM vs FM vs PM',
    columns: ['Property', 'AM', 'FM', 'PM'],
    rows: [
      ['What varies', 'Carrier amplitude', 'Carrier frequency', 'Carrier phase'],
      ['Bandwidth', '2B', '2(Δf + B)', '2(Δφ·fₘ + B), approx.'],
      ['Noise immunity', 'Poor', 'Good', 'Good'],
      ['Power efficiency', 'Low (most power in carrier)', 'High (constant envelope)', 'High'],
      ['Typical use', 'MW/SW broadcast, aviation', 'FM radio, TV sound, two-way radio', 'Basis of digital PSK, some telemetry'],
    ],
  },
  formulas: [
    { name: 'AM signal', expr: 's(t) = [1 + nₐ·cos(2πfₘt)]·cos(2πf꜀t)', note: 'nₐ ≤ 1 to avoid overmodulation distortion.' },
    { name: 'AM total power', expr: 'Pₜ = P꜀ (1 + nₐ² / 2)', note: 'Even at nₐ = 1, only 1/3 of the power is in the sidebands.' },
    { name: 'FM index & Carson’s rule', expr: 'β = Δf / fₘ ;  B_T = 2(β + 1)·B', note: 'FM radio: Δf = 75 kHz, B = 15 kHz, so B_T ≈ 180 kHz.' },
    { name: 'Nyquist sampling theorem', expr: 'fₛ ≥ 2 · f_max', note: 'Telephone voice (≤ 4 kHz) is sampled at 8 kHz.' },
    { name: 'PCM bit rate', expr: 'R = n · fₛ', note: '8 bits × 8000 samples/s = 64 kbps (one voice channel).' },
    { name: 'Quantization SNR', expr: 'SNR_q ≈ 6.02n + 1.76 dB', note: 'Each extra bit adds about 6 dB.' },
  ],
  cards: {
    title: 'Key Concepts',
    items: [
      { title: 'Sidebands', text: 'AM creates copies at f꜀ ± fₘ. SSB transmits just one to save bandwidth and power.' },
      { title: 'Overmodulation', text: 'AM with nₐ > 1 distorts the envelope and splatters spectrum.' },
      { title: 'Aliasing', text: 'Sampling below 2f_max makes high frequencies masquerade as low ones.' },
      { title: 'Companding', text: 'μ-law (USA/Japan) and A-law (Europe/India) give finer steps to quiet sounds.' },
      { title: 'Delta Modulation', text: 'Sends 1 bit per sample: up or down. Simple, but suffers slope overload.' },
      { title: 'E1 / T1 Carriers', text: 'E1 multiplexes 32 × 64 kbps = 2.048 Mbps (used in India). T1 = 1.544 Mbps.' },
    ],
  },
  lists: [
    { title: 'Applications of Conversion', tone: 'info', items: ['AM: medium-wave and shortwave broadcasting, aircraft VHF radio', 'FM: FM radio, walkie-talkies, analog TV sound', 'PCM: telephone networks, CD audio (44.1 kHz, 16-bit), digital recorders', 'Digitised voice in mobiles is further compressed by codecs (AMR, EVS)'] },
    { title: 'Common Mistakes', tone: 'warn', items: ['Forgetting the anti-aliasing filter before sampling', 'Using dB SNR inside Shannon’s formula (use the linear value)', 'Confusing frequency deviation (Δf) with bandwidth', 'Allowing AM overmodulation (nₐ > 1)'] },
  ],
  lab: {
    key: 'w1-analog',
    title: 'Visualizer: AM, FM, PM & PCM',
    description: 'Adjust message frequency and modulation index to see AM, FM and PM waveforms change live. Then walk through PCM: lower the sampling rate below the Nyquist rate to cause aliasing, and change the number of bits to see quantization error shrink.',
    badge: { name: 'Signal Sculptor', emoji: '🎚️' },
    objectives: [
      { id: 'overmod', label: 'Overmodulate an AM signal (nₐ > 1)', xp: 20 },
      { id: 'alias', label: 'Cause aliasing by under-sampling', xp: 25 },
      { id: 'bits', label: 'Reduce quantization error with more bits', xp: 15 },
    ],
  },
  quiz: [
    { q: 'In FM, what changes with the message?', options: ['Amplitude', 'Frequency', 'Antenna height', 'Polarization'], answer: 1, explain: 'The instantaneous frequency follows the message.' },
    { q: 'Minimum sampling rate for a signal with highest frequency 4 kHz?', options: ['4 kHz', '8 kHz', '2 kHz', '16 kHz'], answer: 1, explain: 'Nyquist: fₛ ≥ 2 × 4 kHz.' },
    { q: 'A standard PCM telephone channel uses…', options: ['8 kbps', '64 kbps', '1 Mbps', '2.048 Mbps'], answer: 1, explain: '8 bits × 8000 samples/s.' },
    { q: 'What happens if an AM modulation index exceeds 1?', options: ['Better quality', 'Overmodulation distortion', 'Lower bandwidth', 'Nothing'], answer: 1, explain: 'The envelope crosses zero and is distorted.' },
    { q: 'Each extra PCM bit improves quantization SNR by about…', options: ['1 dB', '3 dB', '6 dB', '10 dB'], answer: 2, explain: 'SNR ≈ 6.02n + 1.76 dB.' },
  ],
  deep: {
    sections: [
      { title: 'AM spectrum and variants', points: ['Multiplying a carrier by (1 + message) creates the carrier plus upper and lower sidebands.', 'DSB-SC suppresses the carrier to save power but needs coherent detection.', 'SSB transmits one sideband, halving bandwidth. It is used in HF voice links.', 'VSB (vestigial sideband) was used for analog TV video.'] },
      { title: 'FM and PM in depth', points: ['FM and PM are closely related: FM of m(t) equals PM of the integral of m(t).', 'Narrowband FM (β < 1) occupies about 2B. Wideband FM gains noise immunity at the cost of bandwidth.', 'Capture effect: an FM receiver locks onto the stronger of two signals.', 'Pre-emphasis and de-emphasis boost high audio frequencies to improve FM SNR.'] },
      { title: 'From samples to bits', points: ['Ideal sampling produces spectral copies at multiples of fₛ. If they overlap, aliasing occurs.', 'Uniform quantization step Δ = range / 2ⁿ. The maximum error is Δ/2.', 'Non-uniform (companded) quantization keeps quiet speech intelligible with 8 bits.', 'Differential PCM and ADPCM send differences between samples, reducing bit rate.'] },
    ],
    cases: [
      { year: '1906', title: 'First AM voice broadcast', text: 'Reginald Fessenden transmitted voice and music on Christmas Eve.' },
      { year: '1933', title: 'Armstrong patents FM', text: 'Wideband FM showed dramatic noise reduction over AM.' },
      { year: '1937', title: 'PCM invented', text: 'Alec Reeves patented pulse code modulation.' },
      { year: '1982', title: 'Compact Disc', text: 'Digital audio at 44.1 kHz, 16-bit PCM reached consumers.' },
    ],
    myths: [
      { myth: 'FM sounds better because it uses more power.', fact: 'It sounds better because amplitude noise is ignored and it uses wider bandwidth.' },
      { myth: 'Sampling at exactly 2f_max is always enough.', fact: 'Practical systems sample higher, e.g. 8 kHz for 3.4 kHz voice, because filters aren’t ideal.' },
      { myth: 'More quantization bits are always worth it.', fact: 'Each bit raises the data rate. Designers balance quality against bandwidth.' },
    ],
    examNotes: [
      'Analog → analog: AM (amplitude), FM (frequency), PM (phase).',
      'AM: nₐ ≤ 1, B_T = 2B, Pₜ = P꜀(1 + nₐ²/2). FM: β = Δf/fₘ, Carson B_T = 2(β+1)B.',
      'Sampling theorem: fₛ ≥ 2f_max. Aliasing if violated.',
      'PCM: filter → sample → quantize → encode. R = n·fₛ (64 kbps for voice).',
      'SNR_q ≈ 6.02n + 1.76 dB. Companding: μ-law and A-law.',
    ],
    extraQuiz: [
      { q: 'Using Carson’s rule, an FM signal with Δf = 75 kHz and B = 15 kHz needs…', options: ['30 kHz', '90 kHz', '180 kHz', '1 MHz'], answer: 2, explain: '2 × (75 + 15) = 180 kHz.' },
      { q: 'CD audio is sampled at…', options: ['8 kHz', '22 kHz', '44.1 kHz', '1 MHz'], answer: 2, explain: '44.1 kHz covers the audible range up to about 20 kHz.' },
    ],
  },
};
