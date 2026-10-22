import { JourneySummary } from "./JourneySummary";
import { LensTabs } from "./LensTabs";

export function Summary() {
  return (
    <section className="band" id="summary">
      <div className="wrap">
        <h2>The 60-second version</h2>
        <p className="prose" style={{ marginTop: ".6rem" }}>
          Four stops, from the first job to the internship I am looking for.
        </p>
        <JourneySummary />
        <LensTabs />
      </div>
    </section>
  );
}
