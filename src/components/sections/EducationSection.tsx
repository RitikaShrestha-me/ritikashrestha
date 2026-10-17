import { Carousel } from "@/components/work/Carousel";
import { portfolio } from "@/data";
import type { Education } from "@/models/Education";

function EducationEntry({ education }: { education: Education }) {
  return (
    <article className="edu" id={education.sectionId()} aria-labelledby={education.headingId()}>
      <div className="edu-head">
        <div className="yrs">
          {education.from}
          <span className="yto"> – {education.to}</span>
        </div>
        <h3 id={education.headingId()}>{education.degree}</h3>
        <p className="edu-school">{education.school}</p>
        {education.hasGrade() && <p className="edu-grade">{education.grade}</p>}
        <p className="edu-blurb">{education.blurb}</p>
      </div>
      <div className="edu-built">
        <p className="label">Built during this study</p>
        <Carousel items={portfolio.builtDuring(education)} label={education.carouselLabel()} />
      </div>
    </article>
  );
}

/** Education at the top, with the projects built during each programme inside it. */
export function EducationSection() {
  return (
    <section className="band" id="education" aria-labelledby="h-edu">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <p className="label">Education</p>
            <h2 id="h-edu" style={{ marginTop: ".5rem" }}>
              Where I studied and what I built there
            </h2>
          </div>
          <p className="note">
            Most recent first. Under each programme are the projects I built during it. Open a card for the full story
            and, where there is one, a live demo you can play with.
          </p>
        </div>
        <div className="edus">
          {portfolio.educations().map((education) => (
            <EducationEntry key={education.id} education={education} />
          ))}
        </div>
      </div>
    </section>
  );
}
