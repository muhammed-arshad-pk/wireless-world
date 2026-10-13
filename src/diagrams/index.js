import unit1 from './unit1';
import unit2 from './unit2';
import unit3 from './unit3';
import unit4 from './unit4';
import unit5 from './unit5';

/** Concept diagrams keyed by each topic's lab key. Each entry: { title, caption, render, wide? }. */
const registry = { ...unit1, ...unit2, ...unit3, ...unit4, ...unit5 };

export function diagramsFor(topic) {
  return (topic?.lab && registry[topic.lab.key]) || [];
}
