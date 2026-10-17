# Ritika Shrestha: portfolio (Next.js)

A career told as a journey: education at the top with the projects built during each programme, work
experience kept separate, case-study pages for every card, and three live demos that run in the browser
(wireless scheduler simulation, GLOF risk calculator, IoT Ranger pipeline).

Next.js 16 (App Router) · React 19 · TypeScript. No UI library; the only runtime dependencies are Next and React.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run typecheck
```

Needs Node 20.9 or newer. Deploys to Vercel with no configuration.

## Where things live

```
src/
  app/                 layout.tsx (fonts, metadata, CSS), page.tsx
  models/              WorkItem, Education, Skill/SkillGroup, PipelineStage, shared types
  data/                content only: work.ts, education.ts, skills.ts, profile.ts, lenses.ts, ...
                       index.ts builds the repository, skill index and pipeline stages
  services/            logic with no React in it
                       PortfolioRepository   find items, roles, neighbours, items by skill
                       SkillIndex            "where did I use this skill?"
                       SchedulerSimulator    Round Robin / Max SNR / Proportional Fair simulation
                       GlofRiskCalculator    hazard, exposure and risk rules, presets and bands
                       Prng                  seeded Mulberry32 generator
                       HashRoute             #work-<id> deep links and history
                       ScrollService         instant and smooth scrolling helpers
                       ClipboardService, NumberFormat
  context/             PortfolioContext: open detail page, skill highlight, back/Escape/scroll restore
  hooks/               useCarousel, useActiveSection, useScrollProgress, useTheme
  components/
    layout/            Header, Footer, SkipLink
    sections/          Hero, Summary, LensTabs, EducationSection, ExperienceSection, SkillsSection,
                       NextSection, ContactCard
    work/              Carousel, WorkCard, WorkPlate, DetailView, DetailSection, GlofFlowchart
    labs/              SchedulerLab, GlofLab, RangerLab (+ LabFrame; registry in index.ts)
    ui/                Chip, Pill, RangeControl, ThresholdMeter
  styles/              one CSS file per area, imported in app/layout.tsx
public/                portrait.webp, glof-flowchart.webp
```

## Common edits

- **Text, dates, bullets, technologies:** `src/data/work.ts` (projects and roles), `education.ts`, `profile.ts`.
- **Add a project:** add a record to `work.ts`, add its id to `WORK_ORDER` in `data/index.ts`, and list the id in
  the `built` array of its programme in `education.ts`. Roles appear under Experience automatically.
- **Add a skill:** add it to a group in `data/skills.ts` and put its id in the `skills` array of each project that used it.
- **Add a live demo:** build a component in `components/labs/`, register it in `labs/index.ts`, add its id to
  `DemoId` in `models/types.ts`, and set `demo: { id, text }` on the project.
- **Photo:** replace `public/portrait.webp` (4:5 works best; the phone avatar crops to a circle).
- **Résumé link:** `PROFILE.links.resume` in `data/profile.ts`. To host your own PDF, put it in `public/` and use `/your-file.pdf`.
