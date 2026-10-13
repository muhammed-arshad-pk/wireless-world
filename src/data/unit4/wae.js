import { Code2 } from 'lucide-react';

export default {
  slug: 'wireless-application-environment',
  number: 7,
  title: 'Wireless Application Environment (WAE)',
  icon: Code2,
  color: '#facc15',
  difficulty: 'Intermediate',
  summary: 'The application layer of WAP: WML decks and cards, WMLScript, the microbrowser and WTA.',
  tagline: 'Where WAP applications are written and run.',
  keywords: ['wae', 'wireless application environment', 'wml', 'deck', 'card', 'wmlscript', 'microbrowser', 'user agent', 'wta', 'wtai', 'wbxml', 'wbmp', 'vcard', 'vcalendar', 'xhtml mp'],
  intro: [
    'The Wireless Application Environment (WAE) is the top layer of the WAP architecture: the environment in which mobile applications are written, delivered and run. It defines the content formats (WML, WMLScript, WBMP images, vCard/vCalendar), the user agents that run them on the phone (the WML microbrowser and the WTA user agent), and how content is served from ordinary web servers through the gateway.',
    'WAE content is organised for tiny screens. A WML file is a deck made of several cards; each card is one screen. The phone downloads the whole deck at once, so moving between cards needs no new network round trip. WMLScript, a lightweight scripting language based on ECMAScript, adds logic such as checking input, doing calculations or calling phone functions. It is compiled to bytecode by the gateway so the phone can run it cheaply.',
  ],
  definitions: {
    title: 'WAE Building Blocks',
    items: [
      { term: 'WML (Wireless Markup Language)', text: 'XML-based markup for WAP pages, organised as a deck of cards with navigation, input fields and variables.' },
      { term: 'WMLScript', text: 'A light ECMAScript-based language for client-side logic; compiled to bytecode and used with standard libraries (Lang, String, Dialogs, WMLBrowser…).' },
      { term: 'Microbrowser (WML user agent)', text: 'Interprets WBXML-encoded WML, renders cards, keeps history and variables, and runs WMLScript.' },
      { term: 'WTA (Wireless Telephony Application)', text: 'Lets pages use phone features: make a call, add a phonebook entry, send DTMF (via WTAI functions).' },
    ],
  },
  compare: {
    title: 'WML vs HTML',
    left: { title: 'WML (classic WAP)', subtitle: 'Deck of cards', points: ['Strict XML: every tag must close', 'One file = deck; one card = one screen', 'Small set of tags; text, links, simple input', 'Variables and tasks (<go>, <prev>, <refresh>) built in'] },
    right: { title: 'HTML (web)', subtitle: 'One long page', points: ['Forgiving syntax (classic HTML)', 'One file = one scrolling page', 'Rich layout, images, media', 'Logic needs JavaScript'] },
  },
  flow: {
    title: 'How a Wireless Application Works',
    steps: [
      { title: 'User action', text: 'The user selects a link or fills an input on a card.' },
      { title: 'Gateway translation', text: 'The request is sent over the air; the WAP gateway turns it into HTTP.' },
      { title: 'Server fetch', text: 'The application server runs (e.g. a script) and returns a WML deck or WMLScript.' },
      { title: 'Encoding & parsing', text: 'The gateway encodes WML to WBXML and compiles WMLScript; the microbrowser parses them.' },
      { title: 'Rendering & interaction', text: 'The first card is displayed; card-to-card navigation happens locally in the deck.' },
    ],
  },
  table: {
    title: 'Common WML Elements',
    columns: ['Element', 'Purpose', 'Example'],
    rows: [
      ['<wml>', 'Root element: the deck', '<wml> … </wml>'],
      ['<card>', 'One screen with an id and title', '<card id="menu" title="News">'],
      ['<a> / <anchor>', 'Link to a card or URL', '<a href="#weather">Weather</a>'],
      ['<do> + <go>', 'Soft-key action that loads a target', '<do type="accept"><go href="#result"/></do>'],
      ['<input>', 'Text entry bound to a variable', '<input name="city"/> … $(city)'],
      ['<select> / <option>', 'Pick from a list', '<option value="del">Delhi</option>'],
      ['<timer>', 'Automatic action after a delay', '<timer value="30"/> (tenths of a second)'],
    ],
  },
  formulas: [
    { name: 'Deck navigation cost', expr: 'card → card = 0 round trips', note: 'All cards arrive together, so browsing inside a deck is instant.' },
    { name: 'Variable substitution', expr: '$(name) → value', note: 'WML variables are inserted into text and URLs at display time.' },
  ],
  cards: {
    title: 'WAE Components',
    items: [
      { title: 'WML', text: 'Markup language used by classic WAP applications.' },
      { title: 'WMLScript', text: 'Scripting language for validation, logic and phone access.' },
      { title: 'Microbrowser', text: 'Displays supported mobile content and runs scripts.' },
      { title: 'WTA / WTAI', text: 'Telephony features: call, phonebook, network events.' },
      { title: 'Content formats', text: 'WBMP images, vCard, vCalendar, WBXML encoding.' },
      { title: 'Application / web server', text: 'Supplies application content and services through the gateway.' },
    ],
  },
  lists: [
    { title: 'Applications & Advantages', tone: 'good', items: ['Mobile information services: news, weather, cricket scores', 'Mobile banking, booking and email', 'Fast local navigation thanks to decks', 'Script validation saves airtime (no round trip for bad input)', 'Telephony integration: tap a number to call'] },
    { title: 'Limitations & modern context', tone: 'warn', items: ['WAE belongs to classic WAP technology', 'Very limited layout and graphics', 'Content had to be authored separately from HTML sites', 'Modern smartphones use standard web technologies: HTML5, CSS, JS, HTTPS'] },
  ],
  lab: {
    key: 'w4-wae',
    title: 'Visualizer: WML Phone Emulator',
    description: 'Browse a real WML deck on a classic phone screen: move between cards with the keypad, type a city for the weather card, and watch the WMLScript validate your input. The source panel highlights the card being shown.',
    badge: { name: 'WML Wizard', emoji: '📱' },
    objectives: [
      { id: 'cards', label: 'Visit every card in the deck', xp: 20 },
      { id: 'script', label: 'Trigger the WMLScript input validation', xp: 20 },
    ],
  },
  quiz: [
    { q: 'Which language was used to describe content in classic WAP applications?', options: ['WML', 'HTML5', 'C++', 'XML Schema'], answer: 0, explain: 'Wireless Markup Language.' },
    { q: 'In WML, one screen is called a…', options: ['Page', 'Card', 'Frame', 'Slide'], answer: 1, explain: 'Cards are grouped into a deck.' },
    { q: 'WMLScript is based on…', options: ['ECMAScript', 'Python', 'COBOL', 'SQL'], answer: 0, explain: 'A lighter ECMAScript dialect.' },
    { q: 'Why is moving between cards of a deck fast?', options: ['The deck is downloaded at once', 'Cards are cached on the server', 'WAP uses fibre', 'Each card is a new HTTP request'], answer: 0, explain: 'No network round trip is needed.' },
    { q: 'WTA in WAE lets applications…', options: ['Access telephony features', 'Render 3D graphics', 'Use Wi-Fi', 'Print documents'], answer: 0, explain: 'Calls, phonebook, DTMF via WTAI.' },
  ],
  deep: {
    sections: [
      { title: 'Inside a WML deck', points: ['Prolog: <?xml?> and the WML DOCTYPE.', '<template> defines soft keys shared by all cards.', 'Each <card id> can have onenterforward / ontimer events.', 'Variables ($(var)) persist in the browser context across cards and decks.'] },
      { title: 'WMLScript in practice', points: ['Stored in separate .wmls files and called by URL with a function name: script.wmls#check()', 'Standard libraries: Lang, Float, String, URL, WMLBrowser, Dialogs.', 'WMLBrowser.setVar() and go() let scripts change variables and navigate.', 'Compiled to compact bytecode by the gateway; runs in a small VM on the phone.'] },
      { title: 'WAE user agent model', points: ['The WML user agent renders cards and keeps a history stack (<prev/> goes back).', 'The WTA user agent handles telephony events from the network.', 'Content types are negotiated so servers can send what the phone supports.', 'WAP 2.0 adds an XHTML MP user agent alongside WML for compatibility.'] },
    ],
    cases: [
      { year: '2000', title: 'Cricket score decks', text: 'Indian operators offered WAP cricket-score services: one deck with menu, live score and commentary cards refreshed by <timer>.' },
      { year: '2001', title: 'Mobile banking', text: 'Banks used WML input cards plus WMLScript checks before sending balance or transfer requests.' },
    ],
    myths: [
      { myth: 'WMLScript runs on the server.', fact: 'It runs on the phone, after the gateway compiles it to bytecode.' },
      { myth: 'Each card is downloaded separately.', fact: 'The whole deck is delivered in one response.' },
      { myth: 'WML is the same as HTML.', fact: 'It is a separate, stricter XML language with cards, tasks and variables.' },
    ],
    examNotes: [
      'WAE = application layer of WAP: content formats + user agents.',
      'WML: XML markup, deck of cards; elements card, a, do/go, input, select, timer.',
      'WMLScript: ECMAScript-based, compiled to bytecode, libraries (Lang, String, Dialogs, WMLBrowser).',
      'Microbrowser renders WBXML; WTA/WTAI gives telephony access.',
      'Advantages: compact, fast local navigation; limitations: classic only, replaced by HTML5.',
    ],
    extraQuiz: [
      { q: 'Which WML element defines one screen?', options: ['<deck>', '<card>', '<page>', '<div>'], answer: 1, explain: 'Cards are grouped into a <wml> deck.' },
      { q: 'Which WMLScript library shows alerts and prompts?', options: ['Dialogs', 'Float', 'URL', 'Lang'], answer: 0, explain: 'Dialogs.alert(), Dialogs.prompt().' },
    ],
  },
};
