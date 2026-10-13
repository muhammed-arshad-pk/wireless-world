import { BookOpen, Gamepad2, Layers, Radio } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="page">
      <section className="unit-hero">
        <div>
          <span className="eyebrow">About Project</span>
          <h1>Wireless World: Learn, Explore, Connect</h1>
          <p>An interactive learning hub for the Wireless Communication course. Each topic combines in-depth notes, clear diagrams and live visualizers, so abstract ideas like modulation, fading and multiple access become something you can see.</p>
        </div>
      </section>

      <div className="grid-2">
        <section className="card">
          <h2 className="card-title"><BookOpen size={18} /> Learning approach</h2>
          <ul className="plain-list">
            <li><b>Understand:</b> concise theory, key terms, formulas and comparison tables.</li>
            <li><b>Visualise:</b> animated flow diagrams and interactive models for every topic.</li>
            <li><b>Go deeper:</b> derivations, real-world systems, myths vs facts and exam notes.</li>
            <li><b>Check:</b> timed knowledge checks with instant explanations, plus Present mode for seminars.</li>
          </ul>
        </section>
        <section className="card">
          <h2 className="card-title"><Radio size={18} /> Visualizers</h2>
          <ul className="plain-list">
            <li>Spectrum explorer, antenna radiation patterns, propagation modes</li>
            <li>Multipath fading, line coding, ASK/FSK/PSK/QAM, AM/FM/PM, PCM</li>
            <li>Satellite orbits & footprints, FDMA/TDMA, frequency reuse, CDMA codes</li>
            <li>Wi-Fi evolution, BSS/ESS, CSMA/CA, channel planning, coverage, infrared</li>
          </ul>
        </section>
        <section className="card">
          <h2 className="card-title"><Gamepad2 size={18} /> Progress & badges</h2>
          <ul className="plain-list">
            <li>XP for visualizer objectives and quiz improvements</li>
            <li>6 levels from Signal Seeker to Wireless Wizard</li>
            <li>Progress saved automatically in the browser</li>
          </ul>
        </section>
        <section className="card">
          <h2 className="card-title"><Layers size={18} /> Technology</h2>
          <ul className="plain-list">
            <li>React 18 + Vite, React Router (hash routing)</li>
            <li>Hand-built SVG diagrams and animations</li>
            <li>No backend: everything runs in the browser</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
