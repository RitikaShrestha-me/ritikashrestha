import type { SectionSpec } from "@/models/types";
import { GlofFlowchart } from "./GlofFlowchart";

/** One block of a case study: prose, steps, bullets, stats, a table, live sites or a figure. */
export function DetailSection({ section }: { section: SectionSpec }) {
  const { h, p, stats, ol, ul, sites, table, fig } = section;
  const numericColumns = table?.num ?? [];
  const numClass = (index: number): string | undefined => (numericColumns.includes(index) ? "num" : undefined);

  return (
    <section>
      <h2>{h}</h2>
      {p?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      {stats && (
        <div className="stats">
          {stats.map(([value, caption]) => (
            <div key={value}>
              <b>{value}</b>
              <span>{caption}</span>
            </div>
          ))}
        </div>
      )}
      {ol && (
        <ol className="steps">
          {ol.map((step) => <li key={step}>{step}</li>)}
        </ol>
      )}
      {ul && (
        <ul className="bul">
          {ul.map((bullet) => <li key={bullet}>{bullet}</li>)}
        </ul>
      )}
      {sites && (
        <ul className="sites" style={{ marginTop: "1rem" }}>
          {sites.map(([name, url, note]) => (
            <li key={url}>
              <a href={url} target="_blank" rel="noopener">{name}</a>
              <span>{note}</span>
            </li>
          ))}
        </ul>
      )}
      {table && (
        <div className="tscroll">
          <table>
            <thead>
              <tr>
                {table.head.map((cell, i) => (
                  <th key={cell} scope="col" className={numClass(i)}>{cell}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.rows.map((row, rowIndex) => (
                <tr key={row[0]} className={table.hl === rowIndex ? "hl" : undefined}>
                  {row.map((cell, i) => (
                    <td key={i} className={numClass(i)}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {fig === "glof" && <GlofFlowchart />}
    </section>
  );
}
