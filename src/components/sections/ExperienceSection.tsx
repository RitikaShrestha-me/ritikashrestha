import { Carousel } from "@/components/work/Carousel";
import { portfolio } from "@/data";
import { PROFILE } from "@/data/profile";

export function ExperienceSection() {
  return (
    <section className="band" id="experience" aria-labelledby="h-exp">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <p className="label">Work experience</p>
            <h2 id="h-exp" style={{ marginTop: ".5rem" }}>
              Roles in industry
            </h2>
          </div>
          <p className="note">Three software roles between 2021 and 2025, kept apart from the study projects above.</p>
        </div>
        <Carousel items={portfolio.roles()} label="Work experience" style={{ marginTop: "1.5rem" }} />
        <p className="calc-note" style={{ marginTop: "1rem" }}>
          Additional projects and work experience are described in detail on my{" "}
          <a href={PROFILE.links.linkedin} target="_blank" rel="noopener">
            LinkedIn profile
          </a>
          .
        </p>
      </div>
    </section>
  );
}
