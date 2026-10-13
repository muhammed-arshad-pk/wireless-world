import { Building2 } from 'lucide-react';

export default {
  slug: 'applications-wireless-lan',
  number: 2,
  title: 'Applications of Wireless LAN',
  icon: Building2,
  color: '#a78bfa',
  difficulty: 'Beginner',
  summary: 'Where WLANs are used, from homes and campuses to hospitals, airports and factories, and why.',
  tagline: 'Discover where wireless networks are used.',
  keywords: ['applications', 'home network', 'office', 'campus', 'hospital', 'airport', 'hotel', 'public wi-fi', 'industrial', 'enterprise', 'lan extension', 'cross-building', 'nomadic access', 'ad hoc networking', 'iot'],
  intro: [
    'Wireless LANs are used wherever people or machines need network access without being tied to a cable: homes, offices, classrooms, hospital wards, airport lounges, factory floors and warehouses. In each environment the WLAN solves a slightly different problem, such as mobility for nurses, flexible seating for offices, or connectivity for robots that move.',
    'The classic textbook view (Stallings) groups WLAN applications into four types. LAN extension adds wireless coverage to an existing wired LAN. Cross-building interconnect links LANs in nearby buildings with point-to-point wireless bridges. Nomadic access lets laptops and handhelds roam among hubs. Ad hoc networking forms a temporary peer-to-peer network, for example in a meeting. Modern uses build on all four.',
  ],
  definitions: {
    title: 'Four Classic Application Types',
    items: [
      { term: 'LAN extension', text: 'WLAN coverage attached to a wired backbone, for areas where cabling is hard: old buildings, open halls, temporary sites.' },
      { term: 'Cross-building interconnect', text: 'Point-to-point wireless bridges linking LANs in buildings a few hundred metres to kilometres apart.' },
      { term: 'Nomadic access', text: 'Mobile users moving between locations (e.g. campus buildings) and accessing servers from wherever they are.' },
      { term: 'Ad hoc networking', text: 'A temporary peer-to-peer network set up without infrastructure, e.g. a meeting or a rescue team.' },
    ],
  },
  compare: {
    title: 'Home WLAN vs Enterprise WLAN',
    left: { title: 'Home', subtitle: 'One router does it all', points: ['Single AP/router, a few to ~30 devices', 'Pre-shared key (WPA2/WPA3-Personal)', 'Self-managed, consumer equipment', 'Streaming, gaming, smart-home devices'] },
    right: { title: 'Enterprise / campus', subtitle: 'Planned & managed', points: ['Hundreds of APs with a controller or cloud management', 'WPA3-Enterprise with 802.1X/RADIUS user logins', 'Site surveys, channel and power planning', 'Guest VLANs, roaming, monitoring'] },
  },
  flow: {
    title: 'Universal WLAN Deployment',
    steps: [
      { title: 'Users & devices', text: 'Phones, laptops, sensors and machines in each environment.' },
      { title: 'Access points', text: 'Placed for coverage and capacity in each room or area.' },
      { title: 'Backbone & controller', text: 'Wired switches and a controller tie APs together and apply policies.' },
      { title: 'Internet & services', text: 'Via the router/ISP to cloud apps, hospital records, booking systems…' },
    ],
  },
  table: {
    title: 'Applications by Environment',
    columns: ['Environment', 'Typical use', 'Special requirement'],
    rows: [
      ['Homes', 'Streaming, gaming, smart TVs, IoT', 'Easy setup, good coverage in every room'],
      ['Offices', 'Laptops, video calls, hot-desking', 'Security, roaming, capacity in meeting rooms'],
      ['Educational campuses', 'Classrooms, libraries, hostels (e.g. eduroam)', 'Very high user density, user authentication'],
      ['Hospitals', 'Mobile nursing carts, patient monitors, records', 'Reliability, low interference with medical equipment, QoS'],
      ['Airports & hotels', 'Public Wi-Fi, check-in kiosks', 'Guest isolation, captive portals, huge peaks'],
      ['Industry & warehouses', 'Scanners, AGVs, robots, sensors', 'Seamless roaming, metal-rich RF environment, low latency'],
    ],
  },
  formulas: [
    { name: 'AP count (capacity)', expr: 'APs ≈ ⌈active users / users per AP⌉', note: 'Typically 25–50 active users per AP radio for good experience.' },
    { name: 'AP count (coverage)', expr: 'APs ≈ ⌈floor area / area per AP⌉', note: 'Indoor ≈ 150–250 m² per AP at 5 GHz; use the larger of the two counts.' },
  ],
  cards: {
    title: 'Benefits of WLAN Applications',
    items: [
      { title: 'Mobility', text: 'Work and communicate on the go.' },
      { title: 'Flexibility', text: 'Easily scale and move systems.' },
      { title: 'Collaboration', text: 'Teams connect anywhere, any time.' },
      { title: 'Convenient connectivity', text: 'Tether-free access to data.' },
      { title: 'Cost savings', text: 'No rewiring when layouts change.' },
      { title: 'IoT enablement', text: 'Sensors and smart devices join easily.' },
    ],
  },
  lists: [
    { title: 'Mobile device connectivity', tone: 'info', items: ['Phones offload data from cellular to Wi-Fi', 'Wi-Fi calling uses the WLAN for voice', 'Tablets and handheld scanners in shops and warehouses', 'Hotspots let phones share their mobile data'] },
    { title: 'Application challenges', tone: 'warn', items: ['Security on public networks', 'Congestion at peak times', 'Coverage gaps (lifts, basements, metal racks)', 'Interference from neighbours and equipment'] },
  ],
  lab: {
    key: 'w5-apps',
    title: 'Visualizer: Choose a WLAN Environment',
    description: 'Pick an environment (home, campus, office, hospital, airport, factory) and analyse it: see the floor plan with access points, set the number of users and area, and watch the AP count, security mode and special needs change.',
    badge: { name: 'Deployment Planner', emoji: '🗺️' },
    objectives: [
      { id: 'explore', label: 'Analyse all six environments', xp: 20 },
      { id: 'dense', label: 'Plan a WLAN for 400 or more users', xp: 20 },
    ],
  },
  quiz: [
    { q: 'Which technology commonly provides wireless local connectivity in a college campus?', options: ['Bluetooth', 'Wi-Fi', 'Satellite link', 'Fibre optics'], answer: 1, explain: 'Campus WLANs use Wi-Fi (e.g. eduroam).' },
    { q: 'Linking LANs in two nearby buildings with wireless bridges is…', options: ['Nomadic access', 'Cross-building interconnect', 'Ad hoc networking', 'LAN extension'], answer: 1, explain: 'Point-to-point wireless bridges.' },
    { q: 'Which application type has no infrastructure at all?', options: ['LAN extension', 'Ad hoc networking', 'Nomadic access', 'Cross-building'], answer: 1, explain: 'Peer-to-peer, temporary.' },
    { q: 'A key WLAN requirement in hospitals is…', options: ['Gaming speed', 'Reliability and QoS', 'No security', 'Infrared only'], answer: 1, explain: 'Patient monitoring must not drop.' },
    { q: 'Airports and hotels mainly need…', options: ['Guest isolation and captive portals', 'Licensed spectrum', 'Fibre to every seat', 'Ad hoc only'], answer: 0, explain: 'Public users must be separated.' },
  ],
  deep: {
    sections: [
      { title: 'Designing for density', points: ['Stadiums and lecture halls need many small cells, not one powerful AP.', 'Lower transmit power and directional antennas create small cells that reuse channels.', 'Use 5/6 GHz for more non-overlapping channels.', 'Wi-Fi 6/7 OFDMA serves many small transmissions efficiently.'] },
      { title: 'Healthcare WLANs', points: ['Carry patient monitors, infusion pumps, voice badges and records.', 'Need very high availability, so redundant APs and controllers.', 'Strict security (patient data) with 802.1X and segmentation.', 'QoS prioritises alarms and voice over bulk traffic.'] },
      { title: 'Industrial WLANs', points: ['Autonomous guided vehicles and robots need seamless, fast roaming.', 'Metal shelves cause heavy multipath, so careful surveys are needed.', 'Deterministic, low-latency traffic is a challenge for CSMA/CA.', 'Private 5G is sometimes chosen alongside Wi-Fi for critical control.'] },
    ],
    cases: [
      { year: 'eduroam', title: 'Roaming for education', text: 'Students log in once with university credentials and get Wi-Fi at thousands of institutions worldwide.' },
      { year: 'Hospital', title: 'Mobile nursing', text: 'Bedside carts and tablets let nurses update records at the patient’s side instead of at a fixed terminal.' },
      { year: 'Warehouse', title: 'Scanner fleets', text: 'Handheld barcode scanners stream inventory updates over WLAN as workers move between aisles.' },
    ],
    myths: [
      { myth: 'One powerful router covers a whole campus.', fact: 'Large sites need many APs on a planned channel layout; one big AP cannot hear small phones far away.' },
      { myth: 'Public Wi-Fi is safe for everything.', fact: 'Open networks can be monitored; use HTTPS/VPN and prefer WPA3/OWE networks.' },
    ],
    examNotes: [
      'Classic types: LAN extension, cross-building interconnect, nomadic access, ad hoc networking.',
      'Environments: home, office, campus, hospital, airport/hotel, industry; plus mobile device connectivity.',
      'Benefits: mobility, flexibility, collaboration, convenience, cost.',
      'Challenges: security, congestion, coverage gaps, interference.',
    ],
    extraQuiz: [
      { q: 'Users moving between campus buildings and accessing servers is…', options: ['Nomadic access', 'Cross-building interconnect', 'LAN extension', 'Satellite'], answer: 0, explain: 'Mobile users roam among hubs.' },
      { q: 'To serve many users in a lecture hall you should use…', options: ['One very high-power AP', 'Several low-power APs on different channels', 'Infrared only', 'Longer cables'], answer: 1, explain: 'Small cells increase capacity.' },
    ],
  },
};
