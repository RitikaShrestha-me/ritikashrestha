"use client";

import { usePortfolio } from "@/context/PortfolioContext";
import { skillIndex } from "@/data";
import { QUIET_SKILLS } from "@/data/skills";
import { ScrollService } from "@/services/ScrollService";

function SkillResult({ skillId }: { skillId: string }) {
  const { clearSkill } = usePortfolio();
  const places = skillIndex.placesFor(skillId);
  return (
    <>
      <p>{skillIndex.summary(skillId)}</p>
      <p>
        {places.map((item) => (
          <button
            key={item.id}
            type="button"
            className="link"
            onClick={() =>
              ScrollService.smoothTo(document.querySelector(`[data-work-card="${item.id}"]`), "center", "center")
            }
          >
            {item.title} ↑
          </button>
        ))}
        <button type="button" className="link" onClick={clearSkill}>
          Clear highlight
        </button>
      </p>
    </>
  );
}

/** Skills grouped by area. Picking one highlights the cards above that used it. */
export function SkillsSection() {
  const { activeSkill, toggleSkill } = usePortfolio();

  return (
    <section className="band" id="skills">
      <div className="wrap">
        <h2>What I use, and where I used it</h2>
        <p className="prose" style={{ marginTop: ".8rem" }}>
          Tap a skill to highlight the projects and roles above where I used it. Tap it again to clear.
        </p>
        <div className="sgroups" role="group" aria-label="Skills">
          {skillIndex.groups.map((group) => (
            <div className="sgroup" key={group.title}>
              <p className="label">{group.title}</p>
              <div className="chips">
                {group.skills.map((skill) => (
                  <button
                    key={skill.id}
                    type="button"
                    className="skill"
                    aria-pressed={activeSkill === skill.id}
                    onClick={() => toggleSkill(skill.id)}
                  >
                    {skill.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="skill-out" aria-live="polite">
          {activeSkill ? <SkillResult skillId={activeSkill} /> : "Pick a skill to see where it appears."}
        </div>
        <p className="label" style={{ marginTop: "1.5rem" }}>
          Also in my toolkit
        </p>
        <div className="chips" style={{ marginTop: ".6rem" }}>
          {QUIET_SKILLS.map((name) => (
            <span key={name} className="skill quiet">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
