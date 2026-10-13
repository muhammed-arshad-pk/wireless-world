import { Globe } from 'lucide-react';

export default {
  slug: 'wireless-access-protocols-intro',
  number: 5,
  title: 'Wireless Access Protocols: Introduction',
  icon: Globe,
  color: '#fb923c',
  difficulty: 'Beginner',
  summary: 'Why early phones needed special protocols to reach Internet services, and how WAP delivered them.',
  tagline: 'Bringing the Internet to tiny screens and slow links.',
  keywords: ['wireless access protocols', 'wap', 'wap forum', 'wml', 'microbrowser', 'gateway', 'gsm', 'csd', 'gprs', 'oma', 'wap push', 'xhtml mp', 'mobile internet'],
  intro: [
    'Wireless access protocols are the rules that let mobile devices reach information services over wireless networks. The best-known example is the Wireless Application Protocol (WAP), an open standard created in 1997 by the WAP Forum (founded by Ericsson, Motorola, Nokia and Unwired Planet). It brought news, email, banking, train times and more to mobile phones years before smartphones.',
    'The ordinary web was a poor fit for the phones of the late 1990s: tiny monochrome screens, numeric keypads, weak processors, little memory and battery, and network links of only 9.6 kbps with long, variable delays. WAP adapted everything to these limits. Pages became compact WML decks, text was binary-encoded, and protocols were lighter. A WAP gateway in the operator’s network translated between the phone and normal web servers.',
  ],
  definitions: {
    title: 'Key Terms',
    items: [
      { term: 'WAP', text: 'Wireless Application Protocol: an open, bearer-independent suite of protocols and content formats for mobile Internet access.' },
      { term: 'Microbrowser', text: 'A small browser in the phone that displays WML content and runs WMLScript.' },
      { term: 'WAP gateway / proxy', text: 'A server between the wireless network and the Internet that translates WAP requests to HTTP and compresses responses.' },
      { term: 'Bearer', text: 'The underlying wireless transport: GSM SMS, CSD (9.6 kbps), GPRS, CDMA, USSD and so on.' },
    ],
  },
  compare: {
    title: 'Wired Web vs Wireless Environment (late 1990s)',
    left: { title: 'Desktop web', subtitle: 'Rich and fast', points: ['Large colour screen, mouse and keyboard', 'Fast, low-delay links', 'Powerful CPU and lots of memory', 'HTML, images, plug-ins'] },
    right: { title: 'Mobile phone', subtitle: 'Constrained', points: ['Few lines of monochrome text, keypad input', '9.6 kbps CSD with high, variable latency', 'Small CPU, memory and battery', 'Needed compact, binary content and light protocols'] },
  },
  flow: {
    title: 'Wireless Application Communication',
    steps: [
      { title: 'Request', text: 'The user picks a link in the microbrowser; the phone sends a compact WAP request (WSP) over the bearer.' },
      { title: 'Gateway', text: 'The WAP gateway decodes it and makes a normal HTTP request to the web server.' },
      { title: 'Content', text: 'The server returns WML (or HTML that the gateway converts).' },
      { title: 'Encode & reply', text: 'The gateway binary-encodes the WML (WBXML), compiles WMLScript and sends it back for display.' },
    ],
  },
  table: {
    title: 'Evolution of WAP',
    columns: ['Year', 'Milestone', 'What changed'],
    rows: [
      ['1997', 'WAP Forum founded', 'Ericsson, Motorola, Nokia, Unwired Planet start an open standard'],
      ['1998', 'WAP 1.0', 'First specifications: WML, WMLScript, WSP/WTP/WTLS/WDP'],
      ['1999', 'WAP 1.1', 'First widely deployed version; first WAP phones (e.g. Nokia 7110)'],
      ['2000', 'WAP 1.2', 'WAP Push, WTLS improvements; GPRS bearers'],
      ['2001', 'WAP 2.0', 'XHTML Mobile Profile + CSS, and standard TCP/HTTP wireless profiles'],
      ['2002', 'Open Mobile Alliance (OMA)', 'WAP Forum merged into OMA; WAP becomes part of OMA specs'],
    ],
  },
  formulas: [
    { name: 'Download time', expr: 't = page size (bits) / bearer rate (bps) + latency', note: 'A 40 kB HTML page over 9.6 kbps CSD ≈ 34 s; a 1.4 kB WML deck ≈ 1.2 s.' },
    { name: 'Content saving', expr: 'saving = 1 − (WBXML size / text size)', note: 'Binary tokens for tags and attributes typically shrink WML by around half or more.' },
  ],
  cards: {
    title: 'Features of WAP',
    items: [
      { title: 'Bearer independence', text: 'Runs over SMS, CSD, GPRS, CDMA, USSD and more.' },
      { title: 'Device independence', text: 'Works across manufacturers and screen sizes.' },
      { title: 'Compact content', text: 'WML decks and binary WBXML minimise airtime.' },
      { title: 'Optimised protocols', text: 'WSP/WTP replace HTTP/TCP with fewer round trips.' },
      { title: 'Security', text: 'WTLS provides privacy, integrity and authentication.' },
      { title: 'Push & telephony', text: 'WAP Push messages and WTAI calls from pages.' },
    ],
  },
  lists: [
    { title: 'Applications', tone: 'good', items: ['Mobile information services: news, sport, weather, stocks', 'Email and messaging', 'Mobile banking and ticket booking', 'Ringtones, logos and game downloads (WAP Push)', 'Early mobile web browsing and portals (e.g. i-mode rivals)'] },
    { title: 'Limitations', tone: 'warn', items: ['Very small screens and awkward keypad input', 'Slow, expensive circuit-switched connections (CSD)', 'Content had to be rewritten in WML', 'The “WAP gap”: data was decrypted at the gateway', 'Overtaken by smartphones and the full mobile web (HTML5, HTTPS)'] },
  ],
  lab: {
    key: 'w4-wap-intro',
    title: 'Visualizer: Web Page vs WAP Deck',
    description: 'Load the same “train times” service as a desktop HTML page and as a WAP WML deck over different bearers, from 9.6 kbps GSM to 3G. See the size, airtime and cost difference that made WAP necessary.',
    badge: { name: 'WAP Pioneer', emoji: '📟' },
    objectives: [
      { id: 'both', label: 'Load the service both as HTML and as WAP', xp: 20 },
      { id: 'csd', label: 'Try the slowest 9.6 kbps CSD bearer', xp: 15 },
    ],
  },
  quiz: [
    { q: 'WAP was designed mainly for…', options: ['Desktop PCs', 'Constrained mobile devices', 'Satellite TV', 'Optical fibre'], answer: 1, explain: 'Small screens, slow links, limited CPU and battery.' },
    { q: 'The markup language of classic WAP is…', options: ['HTML5', 'WML', 'XML Schema', 'LaTeX'], answer: 1, explain: 'Wireless Markup Language.' },
    { q: 'Which element translates between WAP and HTTP?', options: ['WAP gateway', 'Base station', 'Router', 'Antenna'], answer: 0, explain: 'The gateway/proxy sits between the wireless network and the Internet.' },
    { q: '“Bearer independent” means WAP…', options: ['Works over many wireless transports', 'Needs no battery', 'Uses only GPRS', 'Has no security'], answer: 0, explain: 'SMS, CSD, GPRS, CDMA, USSD…' },
    { q: 'WAP 2.0 adopted which markup?', options: ['XHTML Mobile Profile', 'Flash', 'PDF', 'RTF'], answer: 0, explain: 'XHTML MP with CSS.' },
  ],
  deep: {
    sections: [
      { title: 'Why not just use HTTP and TCP?', points: ['TCP’s three-way handshake and slow start cost several round trips, each seconds long on 1999 networks.', 'Text HTTP headers and HTML were large for 9.6 kbps links.', 'Phones lacked the memory to render arbitrary HTML.', 'WSP/WTP cut round trips (connectionless or lightweight transactions) and used binary headers.'] },
      { title: 'The WAP gap', points: ['WTLS secured the phone ↔ gateway leg; SSL/TLS secured gateway ↔ server.', 'The gateway decrypted and re-encrypted, so data briefly existed in clear text there.', 'Banks therefore ran their own gateways.', 'WAP 2.0 allowed end-to-end TLS through the proxy, closing the gap.'] },
      { title: 'What replaced WAP', points: ['WAP 2.0 moved to XHTML MP over standard Internet protocols.', 'Faster networks (3G/4G) and smartphones (2007 onward) ran full browsers.', 'Today’s mobile web uses responsive HTML5, CSS, JavaScript and HTTPS.', 'WAP Push survived for years in MMS notifications and configuration messages.'] },
    ],
    cases: [
      { year: '1999', title: 'Nokia 7110', text: 'One of the first WAP phones with a microbrowser and “Navi roller”.' },
      { year: '1999', title: 'i-mode in Japan', text: 'NTT DoCoMo’s rival mobile Internet used cHTML over packet networks and became hugely popular.' },
      { year: '2000', title: '“WAP is crap”', text: 'Slow CSD connections and per-minute billing disappointed early users; GPRS improved things.' },
      { year: '2002', title: 'OMA formed', text: 'The WAP Forum joined other groups to form the Open Mobile Alliance.' },
    ],
    myths: [
      { myth: 'WAP was a network technology like GSM.', fact: 'WAP is an application-level protocol suite that runs on top of networks like GSM and GPRS.' },
      { myth: 'WAP pages were just tiny HTML pages.', fact: 'Classic WAP used WML, a different XML-based language organised into decks and cards.' },
      { myth: 'WAP failed completely.', fact: 'It carried mobile email, banking and downloads for millions of users, and WAP Push lived on in MMS.' },
    ],
    examNotes: [
      'Wireless access protocols let constrained mobile devices reach Internet services.',
      'WAP: WAP Forum 1997, open, bearer- and device-independent.',
      'Components: microbrowser, wireless network, WAP gateway, web server.',
      'Features: WML/WMLScript, binary encoding, optimised protocols, WTLS, push.',
      'Limitations: small screens, slow links, WAP gap; superseded by WAP 2.0 / mobile web.',
    ],
    extraQuiz: [
      { q: 'The “WAP gap” refers to…', options: ['Slow downloads', 'Decryption of secure traffic at the gateway', 'Missing keypad keys', 'Gaps between cards'], answer: 1, explain: 'WTLS ended at the gateway before TLS began.' },
      { q: 'Which organisation absorbed the WAP Forum in 2002?', options: ['IEEE', 'IETF', 'Open Mobile Alliance', '3GPP'], answer: 2, explain: 'OMA.' },
    ],
  },
};
