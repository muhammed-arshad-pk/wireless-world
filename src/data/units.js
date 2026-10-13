import { unit1Topics } from './unit1';
import { unit2Topics } from './unit2';
import { unit3Topics } from './unit3';
import { unit4Topics } from './unit4';
import { unit5Topics } from './unit5';

// Add each unit's topics as they are built. A unit with an empty `topics` array shows as "Coming soon".
export const units = [
  {
    id: 1,
    roman: 'I',
    title: 'Introduction to Wireless Communication',
    summary: 'Antennas, propagation, fading, and how data is encoded and modulated onto signals.',
    topics: unit1Topics,
  },
  {
    id: 2,
    roman: 'II',
    title: 'Satellite Communications',
    summary: 'Wireless networking, satellite systems and orbits, FDMA/TDMA, and cellular networks from 1G to 3G.',
    topics: unit2Topics,
  },
  {
    id: 3,
    roman: 'III',
    title: 'Wireless LAN Standards',
    summary: 'IEEE 802.11: its evolution, architecture, MAC and physical layers, radio systems and infrared.',
    topics: unit3Topics,
  },
  {
    id: 4,
    roman: 'IV',
    title: 'Mobile IP & Wireless Access Protocols',
    summary: 'How devices keep one IP address while roaming, and how WAP brought web services to early mobile phones.',
    topics: unit4Topics,
  },
  {
    id: 5,
    roman: 'V',
    title: 'Wireless LAN Technology',
    summary: 'WLAN basics, applications and requirements; infrared, spread spectrum and narrowband radio LANs; and Bluetooth.',
    topics: unit5Topics,
  },
];

export const topicKey = (unitId, slug) => `${unitId}/${slug}`;

export const getUnit = (id) => units.find((u) => String(u.id) === String(id));

export const getTopic = (unitId, slug) => getUnit(unitId)?.topics.find((t) => t.slug === slug);

export const allTopics = () =>
  units.flatMap((u) =>
    u.topics.map((t) => ({ ...t, unitId: u.id, unitRoman: u.roman, key: topicKey(u.id, t.slug) })),
  );

export const findTopicByLab = (labKey) => allTopics().find((t) => t.lab?.key === labKey);
