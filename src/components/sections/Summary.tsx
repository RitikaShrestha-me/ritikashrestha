import { SUMMARY_FACTS } from "@/data/profile";
import { LensTabs } from "./LensTabs";

export function Summary() {
  return (
    <section className="band" id="summary">
      <div className="wrap">
        <h2>The 60-second version</h2>
        <dl className="facts">
          {SUMMARY_FACTS.map((fact) => (
            <div key={fact.title}>
              <dt>{fact.title}</dt>
              <dd>{fact.body}</dd>
            </div>
          ))}
        </dl>
        <LensTabs />
      </div>
    </section>
  );
}
