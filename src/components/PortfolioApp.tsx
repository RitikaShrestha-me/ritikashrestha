"use client";

import { PortfolioProvider, usePortfolio } from "@/context/PortfolioContext";
import { NAV_LINKS } from "@/data/navigation";
import { useActiveSection } from "@/hooks/useActiveSection";
import { Footer } from "./layout/Footer";
import { Header } from "./layout/Header";
import { SkipLink } from "./layout/SkipLink";
import { EducationSection } from "./sections/EducationSection";
import { ExperienceSection } from "./sections/ExperienceSection";
import { Hero } from "./sections/Hero";
import { NextSection } from "./sections/NextSection";
import { SkillsSection } from "./sections/SkillsSection";
import { Summary } from "./sections/Summary";
import { DetailView } from "./work/DetailView";

const NAV_IDS = NAV_LINKS.map((link) => link.id);

function Page() {
  const { detail } = usePortfolio();
  const scrolledTo = useActiveSection(NAV_IDS, detail === null);
  // While a case study is open, the nav points at the section it belongs to.
  const current = detail ? detail.chapterId() : scrolledTo;

  return (
    <>
      <SkipLink />
      <Header current={current} />
      <main id="main" hidden={detail !== null}>
        <Hero />
        <Summary />
        <EducationSection />
        <ExperienceSection />
        <SkillsSection />
        <NextSection />
      </main>
      {detail && <DetailView key={detail.id} item={detail} />}
      <Footer />
    </>
  );
}

/** Client entry point: provides shared state and lays the page out. */
export function PortfolioApp() {
  return (
    <PortfolioProvider>
      <Page />
    </PortfolioProvider>
  );
}
