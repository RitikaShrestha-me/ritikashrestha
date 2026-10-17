"use client";

import { usePortfolio } from "@/context/PortfolioContext";
import { PROFILE } from "@/data/profile";

export function Hero() {
	const { jump } = usePortfolio();
	const { availability, links, portrait } = PROFILE;

	return (
		<section className="hero" id="top">
			<div className="wrap">
				<div>
					<p className="label">{PROFILE.eyebrow}</p>
					<h1>{PROFILE.name}</h1>
					<p className="lead">{PROFILE.lead}</p>
					<p className="status">
						<b>Open to</b> <span>{availability.role}</span> <span>{availability.field}</span>{" "}
						<span>{availability.country}</span>
					</p>
					<div className="cta">
						<button className="btn" type="button" onClick={() => jump("education")}>
							Education and projects ↓
						</button>
						<button className="btn ghost" type="button" onClick={() => jump("summary")}>
							60-second version
						</button>
						<button className="btn ghost" type="button" onClick={() => jump("experience")}>
							Work experience
						</button>
					</div>
					<p className="quick">
						<a href={links.resume} download>
							Résumé (PDF)
						</a>
						<a href={links.github} target="_blank" rel="noopener">
							GitHub
						</a>
						<a href={links.linkedin} target="_blank" rel="noopener">
							LinkedIn
						</a>
					</p>
				</div>
				<figure className="portrait">
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img src={portrait.src} alt={portrait.alt} width={576} height={720} />
				</figure>
			</div>
		</section>
	);
}
