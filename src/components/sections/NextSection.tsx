import { NEXT_PITCHES } from "@/data/profile";
import { ContactCard } from "./ContactCard";

/** The closing chapter: what I am looking for, and how to reach me. */
export function NextSection() {
  return (
    <section className="chap" id="ch5" aria-labelledby="h-ch5">
      <div className="wrap chapter">
        <div className="when">
          <div className="yrs">2027</div>
          <span className="label">What&apos;s next</span>
        </div>
        <div className="content">
          <h2 id="h-ch5">Looking for a PFE where the data has to work in the real world</h2>
          <div className="prose">
            <p>
              I&apos;m looking for a 6-month end-of-studies internship (stage de fin d&apos;études) starting February
              2027 in France, in data or AI engineering.
            </p>
          </div>
          <div className="cols">
            {NEXT_PITCHES.map((pitch) => (
              <div key={pitch.title}>
                <h3>{pitch.title}</h3>
                <p>{pitch.body}</p>
              </div>
            ))}
          </div>
          <ContactCard />
        </div>
      </div>
    </section>
  );
}
