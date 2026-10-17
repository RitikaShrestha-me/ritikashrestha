/** Personal details and links. Change them here and every section updates. */
export const PROFILE = {
	name: "Ritika Shrestha",
	shortName: "RS",
	documentTitle: "Ritika Shrestha",
	description:
		"Master's student in data science and network intelligence. IoT data pipelines, machine-learning wireless scheduling and production frontends.",
	eyebrow: "Data science · AI · intelligent systems",
	lead: "Master's student in data science and network intelligence. I build reliable data systems and practical AI, after more than two years shipping production software.",
	availability: {
		role: "PFE, 6 months from February 2027",
		field: "Data / AI engineering",
		country: "France",
	},
	email: "ritika.shrestha@telecom-sudparis.eu",
	languages:
		"Languages: English (C1), French (A1, learning). International student in France (VLS-TS).",
	links: {
		resume: "/Ritika-Shrestha-Resume.pdf",
		github: "https://github.com/RitikaShrestha-me",
		linkedin: "https://linkedin.com/in/ritikashrestha/",
	},
	portrait: { src: "/portrait.webp", alt: "Portrait of Ritika Shrestha" },
	footer:
		"Ritika Shrestha · Data science and AI · The demos on this page run in your browser. Data in the GLOF prototype is simulated.",
} as const;

export const SUMMARY_FACTS: ReadonlyArray<{ title: string; body: string }> = [
	{
		title: "Now",
		body: "M2 Data Science and Network Intelligence at Télécom SudParis (Institut Polytechnique de Paris). M.Eng in IoT Systems Engineering at the Asian Institute of Technology, first-year Grade A (3.94/4), HM King's Scholarship recipient.",
	},
	{
		title: "Before",
		body: "Frontend and software roles from 2021 to 2025 at three companies, including a US health-insurance platform serving 450K+ users.",
	},
	{
		title: "Built",
		body: "An IoT flood early-warning pipeline, an IoT monitoring platform, and a machine-learning wireless scheduler that reproduces Proportional Fair decisions with 92.95% accuracy.",
	},
	{
		title: "Next",
		body: "A 6-month end-of-studies internship (PFE) from February 2027 in France, working on data and AI systems that have to run reliably.",
	},
];

export const NEXT_PITCHES: ReadonlyArray<{ title: string; body: string }> = [
	{
		title: "Pipelines that run end to end",
		body: "Ingestion, validation, storage, decisions and alerts, as in the GLOF system and IoT Ranger.",
	},
	{
		title: "Models that are checked",
		body: "Baselines, a held-out test set and a theory-versus-simulation check, as in the scheduler paper.",
	},
	{
		title: "Production habits",
		body: "More than two years in shipped software, including a platform for 450K+ users.",
	},
];

/** The text visitors can copy and forward to their team. */
export const SHARE_SUMMARY = `Ritika Shrestha
M2 Data Science and Network Intelligence (Télécom SudParis, IP Paris). M.Eng IoT Systems Engineering (AIT, 3.94/4).
Seeking a 6-month Data/AI Engineering PFE from February 2027, France.
Built: IoT flood early-warning pipeline (MQTT, InfluxDB, n8n); IoT monitoring platform (FastAPI, SvelteKit); ML wireless scheduler (Random Forest, 92.95% accuracy).
Before: 2+ years of production frontend work, including a health-insurance platform for 450K+ users.
linkedin.com/in/ritikashrestha | github.com/RitikaShrestha-me | ${PROFILE.email}`;
