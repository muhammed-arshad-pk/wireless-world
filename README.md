# Wireless World: Learn, Explore, Connect

An interactive learning hub for **Wireless Communication**. Each topic combines in-depth notes,
formulas, comparison tables, animated flow diagrams, a live **interactive visualizer**, a
"Go Deeper" section, a timed knowledge check and a **Present** (slideshow) mode.

## Run it

```bash
npm install      # first time only
npm run dev      # open the printed localhost URL
npm run build    # production build in dist/
```

## Units

| Unit | Topics |
|---|---|
| I: Introduction to Wireless Communication | Introduction · Antennas · Propagation modes · Fading · Signal encoding · Digital→analog (ASK/FSK/PSK/QAM) · Analog modulation & PCM |
| II: Satellite Communications | Networking fundamentals · Satellite systems · Orbits & parameters · FDMA · TDMA · Cellular & 1G · 2G/3G (TDMA, CDMA) |
| III: Wireless LAN Standards | Evolution of 802.11 · Introduction · General description (BSS/ESS) · MAC (CSMA/CA) · Physical layer · Radio systems · Infrared |
| IV: Mobile IP & Wireless Access Protocols | Introduction to Mobile IP · Operation of Mobile IP · Terminologies · Architecture & components · Wireless access protocols (WAP) · WAP architecture · Wireless Application Environment (WAE) |
| V: Wireless LAN Technology | Introduction to WLAN · Applications · Requirements · Infrared · Spread spectrum (FHSS/DSSS) · Narrowband microwave · Bluetooth overview |

## Visualizers (one per topic)

Spectrum explorer, antenna radiation patterns & polarization, propagation modes & radio horizon,
two-ray multipath fading & FSPL, line-coding waveforms, ASK/FSK/BPSK + constellations + Shannon,
AM/FM/PM + sampling/aliasing/PCM, network types & topologies, satellite transponder chain & delay,
LEO/MEO/GEO orbit simulator, FDMA spectrum with intermodulation, TDMA frame builder,
hexagonal frequency reuse + handoff, CDMA Walsh-code spreading, Wi-Fi generations race,
infrastructure vs ad hoc, ESS roaming & joining sequence, CSMA/CA timeline + hidden node,
2.4 GHz channel planner + MCS ladder, Wi-Fi coverage heat-map, infrared LOS/diffuse + NEC remote,
plain IP vs Mobile IP roaming call, Mobile IP packet journey + route optimisation, match-the-term,
Mobile IP network builder (binding table, visitor list, forged registration), HTML vs WAP load
times, WAP request trace + stack explorer, WML phone emulator with WMLScript, WLAN builder,
WLAN environment planner, WLAN requirements designer, IR message link with bit errors,
FHSS hopping vs jammer + DSSS Barker despreading, narrowband channel/SNR tuner,
Bluetooth pairing + piconet/scatternet builder.

## Deploy (Vercel)

Import the GitHub repo in Vercel. `vercel.json` already sets the Vite framework, `npm run build`
and the `dist` output folder; no environment variables are needed.

## Concept diagrams

Every topic also has a **Concept Diagrams** section (also shown as slides in Present mode) with
hand-drawn SVG figures based on the reference designs: block diagrams, timelines, propagation
scenes, frame structures, access-method comparisons and more. They live in `src/diagrams/`
(`kit.jsx` holds the shared shapes) and are keyed by each topic's `lab.key`.

## Adding a topic

1. Add a topic file in `src/data/unitN/` (copy any existing topic as a template) and list it in that unit's `index.js`.
2. For a visualizer: add a component in `src/visuals/unitN/`, register it in `src/labs/index.js`
   under the topic's `lab.key`, and call `useMission(key).complete('objective-id')` from it.
3. For concept diagrams: add entries under the same `lab.key` in `src/diagrams/unitN.jsx`.
