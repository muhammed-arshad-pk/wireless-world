import { Server } from 'lucide-react';

export default {
  slug: 'wap-architecture',
  number: 6,
  title: 'Wireless Application Protocol (WAP) Architecture Overview',
  icon: Server,
  color: '#60a5fa',
  difficulty: 'Intermediate',
  summary: 'The WAP client, gateway and origin server, the WAP protocol stack, and the request–response flow.',
  tagline: 'Follow a request from a phone to a web server and back.',
  keywords: ['wap architecture', 'wap client', 'microbrowser', 'wap gateway', 'proxy', 'origin server', 'bearer', 'wae', 'wsp', 'wtp', 'wtls', 'wdp', 'wbxml', 'protocol stack', 'request response'],
  intro: [
    'WAP uses a proxy-based client–server architecture with three parts. The WAP client is a phone with a microbrowser. The WAP gateway (proxy) is usually run by the mobile operator. The origin web server holds the content. The phone talks WAP protocols over the wireless network to the gateway, and the gateway talks standard HTTP over the Internet to the server. Content providers keep using ordinary web servers and simply serve WML.',
    'Inside, WAP defines a layered protocol stack that mirrors the Internet stack but is tuned for wireless links. From top to bottom: WAE (application environment: WML, WMLScript), WSP (session, like compact HTTP), WTP (reliable transactions, lighter than TCP), WTLS (security, like TLS), WDP (datagrams, like UDP), and finally the bearer services (SMS, CSD, GPRS, CDMA…).',
  ],
  definitions: {
    title: 'The Five WAP Components',
    items: [
      { term: 'Mobile device with microbrowser', text: 'Sends WAP requests and renders compact WML content on a small screen.' },
      { term: 'Wireless network (bearer)', text: 'The carrier network that transports data over the air: GSM, GPRS, CDMA…' },
      { term: 'WAP gateway / proxy', text: 'Bridge that translates WAP protocols to HTTP/TCP, encodes WML to WBXML and compiles WMLScript.' },
      { term: 'Internet', text: 'The global network carrying HTTP between the gateway and web servers.' },
      { term: 'Origin web server', text: 'Hosts and serves the requested content (WML, WMLScript, or HTML to be converted).' },
    ],
  },
  compare: {
    title: 'WAP vs Traditional Web Access',
    left: { title: 'Traditional web (HTTP/HTTPS)', subtitle: 'Client talks to server directly', points: ['Browser connects end-to-end over TCP', 'Text HTTP headers, HTML/CSS/JS', 'Needs bandwidth and processing power', 'End-to-end TLS'] },
    right: { title: 'Classic WAP', subtitle: 'Via a gateway', points: ['Phone talks WSP/WTP to the gateway', 'Binary-encoded WML and compiled WMLScript', 'Optimised for low bandwidth and high latency', 'WTLS to the gateway, then TLS (the “WAP gap”)'] },
  },
  flow: {
    title: 'Request and Response Flow',
    steps: [
      { title: 'User request', text: 'The user opens a link; the microbrowser sends a WSP GET over WTP/WDP on the bearer.' },
      { title: 'Wireless transmission', text: 'The request crosses the air interface and the operator network to the gateway.' },
      { title: 'Gateway processing', text: 'The gateway decodes WSP and issues a standard HTTP GET to the origin server.' },
      { title: 'Server response', text: 'The origin server processes the request and returns WML (or HTML) over HTTP.' },
      { title: 'Content delivery', text: 'The gateway encodes WML to WBXML, compiles scripts, and sends a WSP reply to the phone.' },
    ],
  },
  table: {
    title: 'WAP Protocol Stack vs Internet Stack',
    columns: ['WAP layer', 'Role', 'Internet equivalent'],
    rows: [
      ['WAE: Wireless Application Environment', 'WML, WMLScript, WTA, content formats', 'HTML, JavaScript'],
      ['WSP: Wireless Session Protocol', 'Sessions, compact binary HTTP-like methods, push, suspend/resume', 'HTTP'],
      ['WTP: Wireless Transaction Protocol', 'Reliable request/response transactions (classes 0, 1, 2)', 'TCP (partly)'],
      ['WTLS: Wireless Transport Layer Security', 'Privacy, integrity, authentication', 'TLS / SSL'],
      ['WDP: Wireless Datagram Protocol', 'Port addressing over any bearer', 'UDP'],
      ['Bearers', 'SMS, USSD, CSD, GPRS, CDMA, …', 'IP over links'],
    ],
  },
  formulas: [
    { name: 'Round trips: HTTP/TCP', expr: 'TCP handshake (1 RTT) + request (1 RTT) ≈ 2 RTT', note: 'Plus slow start; on a 1-second-RTT 1999 network that is very noticeable.' },
    { name: 'Round trips: WSP/WTP', expr: 'connectionless WSP over WTP class 2 ≈ 1 RTT', note: 'One request and one result, with an implicit acknowledgement.' },
  ],
  cards: {
    title: 'What the Gateway Does',
    items: [
      { title: 'Protocol conversion', text: 'WSP/WTP ↔ HTTP/TCP.' },
      { title: 'Content encoding', text: 'WML text → compact WBXML binary.' },
      { title: 'Script compilation', text: 'WMLScript source → bytecode for the phone’s virtual machine.' },
      { title: 'Caching', text: 'Keeps popular content close to users to save time and airtime.' },
      { title: 'Security endpoint', text: 'Terminates WTLS and opens TLS to the server.' },
      { title: 'Push proxy', text: 'Push Proxy Gateway delivers server-initiated content to phones.' },
    ],
  },
  lists: [
    { title: 'Strengths of the architecture', tone: 'good', items: ['Content providers use normal web servers', 'Heavy work moves from the phone to the gateway', 'Fewer bytes and round trips over the air', 'Bearer-independent: the same content works over SMS, CSD or GPRS'] },
    { title: 'Weaknesses', tone: 'warn', items: ['Gateway is a bottleneck and single point of failure', 'Security gap at the gateway', 'Operators controlled which gateway (and portal) users saw', 'Separate content formats from the normal web'] },
  ],
  lab: {
    key: 'w4-wap-arch',
    title: 'Visualizer: Trace a WAP Request',
    description: 'Send a request from a WAP phone and step it through the stack: down the WAP layers, over the bearer, through the gateway’s conversion to HTTP and back. Click any layer of the WAP stack to compare it with its Internet equivalent.',
    badge: { name: 'Gateway Guru', emoji: '🛰️' },
    objectives: [
      { id: 'trace', label: 'Trace a full request and response round trip', xp: 25 },
      { id: 'stack', label: 'Explore every layer of the WAP stack', xp: 20 },
    ],
  },
  quiz: [
    { q: 'What is the main role of the WAP gateway?', options: ['Powering devices', 'Intermediary translating WAP to web protocols', 'Connecting to satellites', 'Translating Wi-Fi into Bluetooth'], answer: 1, explain: 'It bridges the wireless client and the web server.' },
    { q: 'Which WAP layer corresponds to UDP?', options: ['WSP', 'WTP', 'WDP', 'WAE'], answer: 2, explain: 'Wireless Datagram Protocol.' },
    { q: 'WTLS provides…', options: ['Session management', 'Security', 'Markup', 'Datagrams'], answer: 1, explain: 'Like TLS for wireless.' },
    { q: 'WML content is sent to phones as…', options: ['Plain text always', 'Binary WBXML', 'PDF', 'JPEG'], answer: 1, explain: 'The gateway binary-encodes it.' },
    { q: 'Which layer is HTTP-like in WAP?', options: ['WSP', 'WDP', 'WTLS', 'Bearer'], answer: 0, explain: 'Wireless Session Protocol.' },
  ],
  deep: {
    sections: [
      { title: 'WTP transaction classes', points: ['Class 0: unreliable one-way message (no acknowledgement).', 'Class 1: reliable one-way: the receiver acknowledges.', 'Class 2: reliable request/result: the result implicitly acknowledges the request (used for browsing).', 'Retransmission and duplicate removal are built in, without TCP’s connection setup.'] },
      { title: 'WSP modes', points: ['Connection-oriented WSP runs over WTP and supports long-lived sessions that can be suspended and resumed.', 'Connectionless WSP runs directly over WDP for simple exchanges.', 'Headers are binary-encoded with well-known tokens.', 'Supports push and capability negotiation (e.g. maximum message size).'] },
      { title: 'WAP 2.0 changes the picture', points: ['Adds wireless profiles of TCP (wTCP) and HTTP (wHTTP) running directly over IP bearers.', 'The proxy becomes optional; end-to-end TLS becomes possible.', 'Content moves to XHTML Mobile Profile with Wireless CSS.', 'The legacy WSP/WTP stack stays for older devices.'] },
    ],
    cases: [
      { year: 'Operator', title: 'Operator portals', text: 'Mobile operators ran WAP gateways and set their own portal as the start page, controlling what users saw first.' },
      { year: 'Bank', title: 'Private gateways', text: 'Because of the WAP gap, some banks ran their own WAP gateways to keep data encrypted end-to-end within their control.' },
    ],
    myths: [
      { myth: 'Web servers had to speak WAP protocols.', fact: 'Origin servers spoke normal HTTP. Only the gateway handled WAP protocols.' },
      { myth: 'WDP is a new transport for IP networks.', fact: 'On IP bearers WDP is simply UDP; it only adds adaptation for non-IP bearers like SMS.' },
    ],
    examNotes: [
      'Architecture: WAP client (microbrowser) ↔ wireless network ↔ WAP gateway ↔ Internet ↔ origin server.',
      'Stack: WAE / WSP / WTP / WTLS / WDP / bearers (≈ HTML-JS / HTTP / TCP / TLS / UDP / IP).',
      'Gateway: protocol conversion, WBXML encoding, WMLScript compilation, caching, security.',
      'Flow: request → wireless → gateway → HTTP → server → response → encode → phone.',
      'WAP vs web: gateway-based, compact binary, optimised for wireless; but has the WAP gap.',
    ],
    extraQuiz: [
      { q: 'Which WTP class is used for normal browsing request/response?', options: ['Class 0', 'Class 1', 'Class 2', 'Class 3'], answer: 2, explain: 'Reliable request with result.' },
      { q: 'Which layer of WAP provides HTML-like content?', options: ['WAE', 'WDP', 'WTP', 'WTLS'], answer: 0, explain: 'WML in the Wireless Application Environment.' },
    ],
  },
};
