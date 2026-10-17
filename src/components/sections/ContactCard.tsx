"use client";

import { useRef, useState } from "react";
import { PROFILE, SHARE_SUMMARY } from "@/data/profile";
import { ClipboardService } from "@/services/ClipboardService";

/** Email, links and a copy-ready summary for recruiters who forward the page. */
export function ContactCard() {
	const mailRef = useRef<HTMLElement>(null);
	const summaryRef = useRef<HTMLPreElement>(null);
	const [status, setStatus] = useState("");

	const copy = async (node: Node | null, text: string, success: string) => {
		if (await ClipboardService.copy(text)) {
			setStatus(success);
		} else {
			if (node) ClipboardService.select(node);
			setStatus("Selected. Press Ctrl+C (or Cmd+C) to copy.");
		}
	};

	return (
		<div className="contact">
			<h3>Let&apos;s talk about the internship</h3>
			<div className="mail">
				<code ref={mailRef}>{PROFILE.email}</code>
				<button className="btn" type="button" onClick={() => copy(mailRef.current, PROFILE.email, "Email address copied.")}>
					Copy email
				</button>
			</div>
			<p className="calc-note" style={{ marginTop: ".8rem" }}>
				{PROFILE.languages}
			</p>
			<p className="quick">
				<a href={PROFILE.links.linkedin} target="_blank" rel="noopener">LinkedIn</a>
				<a href={PROFILE.links.github} target="_blank" rel="noopener">GitHub</a>
				<a href={PROFILE.links.resume} target="_blank" download>Résumé (PDF)</a>
			</p>
			<div className="copyblock">
				<p className="label" style={{ color: "inherit", opacity: 0.8 }}>
					Forwarding me to your team? Copy this summary.
				</p>
				<pre ref={summaryRef}>{SHARE_SUMMARY}</pre>
				<div className="row-actions">
					<button
						className="btn"
						type="button"
						onClick={() => copy(summaryRef.current, SHARE_SUMMARY, "Summary copied.")}
					>
						Copy summary
					</button>
				</div>
			</div>
			<p className="status-line" role="status">
				{status}
			</p>
		</div>
	);
}
