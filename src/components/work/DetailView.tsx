"use client";

import { usePortfolio } from "@/context/PortfolioContext";
import { portfolio } from "@/data";
import { PROFILE } from "@/data/profile";
import { LAB_COMPONENTS } from "@/components/labs";
import type { WorkItem } from "@/models/WorkItem";
import { ScrollService } from "@/services/ScrollService";
import { DetailSection } from "./DetailSection";

function NeighbourButton({
	item,
	direction,
	alone = false,
}: {
	item: WorkItem;
	direction: "previous" | "next";
	/** True when there is no previous item, so the next button spans the full row. */
	alone?: boolean;
}) {
	const { openWork } = usePortfolio();
	const isNext = direction === "next";
	const className = isNext ? `nbtn next${alone ? " only" : ""}` : "nbtn";
	return (
		<button className={className} type="button" onClick={() => openWork(item.id, "replace")}>
			<span className="label">{isNext ? "Next →" : "← Previous"}</span>
			<strong>{item.title}</strong>
			<span>{item.where}</span>
		</button>
	);
}

/** Full case-study page for one project or role, including its live demo when it has one. */
export function DetailView({ item }: { item: WorkItem }) {
	const { goBack } = usePortfolio();
	const { previous, next } = portfolio.neighbours(item);
	const Lab = item.demo ? LAB_COMPONENTS[item.demo.id] : null;

	return (
		<div id="detail">
			<div className="wrap">
				<nav className="crumbs" aria-label="Breadcrumb">
					<button className="back" type="button" onClick={goBack}>
						← Back
					</button>
					<p className="crumb-path">
						{item.sectionName()} / <b>{item.title}</b>
					</p>
					<span className="pos">
						{portfolio.position(item)} of {portfolio.count()}
					</span>
				</nav>

				<header className="dhead">
					<p className="label">{item.metaLine()}</p>
					<h1 id="dtitle" tabIndex={-1}>
						{item.title}
					</h1>
					<p className="lede">{item.sum}</p>
				</header>

				<div className="dgrid">
					<aside className="dfacts" aria-label="Key facts">
						<dl>
							{item.facts.map(([term, description]) => (
								<div key={term}>
									<dt>{term}</dt>
									<dd>{description}</dd>
								</div>
							))}
						</dl>
						<div className="tags">
							{item.stack.map((tech) => (
								<span key={tech}>{tech}</span>
							))}
						</div>
						<div className="btns">
							{item.demo && (
								<button
									className="btn"
									type="button"
									onClick={() => ScrollService.smoothTo(document.getElementById("demoSlot"))}
								>
									{item.demo.text} ↓
								</button>
							)}
							<a className="btn ghost" href={PROFILE.links.resume} download>
								Résumé (PDF)
							</a>
							{item.showsGithubLink() && (
								<a className="btn ghost" href={PROFILE.links.github} target="_blank" rel="noopener">
									GitHub profile
								</a>
							)}
						</div>
					</aside>

					<article className="dbody">
						<div className="resultbox">
							<span className="label">{item.resLabel}</span>
							<p>{item.res}</p>
						</div>
						{Lab && (
							<section id="demoSlot">
								<h2>Try it</h2>
								<Lab />
							</section>
						)}
						{item.sections.map((section) => (
							<DetailSection key={section.h} section={section} />
						))}
					</article>
				</div>

				<nav className="dnext" aria-label="More work">
					{previous && <NeighbourButton item={previous} direction="previous" />}
					{next && <NeighbourButton item={next} direction="next" alone={!previous} />}
				</nav>
			</div>
		</div>
	);
}
