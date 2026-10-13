import { Shapes } from 'lucide-react';

/** "Concept Diagrams" card: static explanatory figures for a topic. */
export default function ConceptDiagrams({ diagrams }) {
  if (!diagrams.length) return null;
  // A half-width figure with no partner in its row is stretched to full width.
  const wide = diagrams.map((d) => !!d.wide);
  for (let i = 0; i < diagrams.length; ) {
    if (wide[i]) { i += 1; continue; }
    if (i + 1 < diagrams.length && !wide[i + 1]) { i += 2; continue; }
    wide[i] = true;
    i += 1;
  }
  return (
    <section className="card">
      <h2 className="card-title"><Shapes size={18} /> Concept Diagrams</h2>
      <div className="cd-grid">
        {diagrams.map((d, i) => {
          const Render = d.render;
          return (
            <figure key={d.title} className={`cd-figure${wide[i] ? ' wide' : ''}${d.tall ? ' tall' : ''}`}>
              <figcaption className="cd-title">{d.title}</figcaption>
              <div className="cd-body"><Render /></div>
              {d.caption && <p className="cd-caption">{d.caption}</p>}
            </figure>
          );
        })}
      </div>
    </section>
  );
}
