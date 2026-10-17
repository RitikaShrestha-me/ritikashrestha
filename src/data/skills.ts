import type { SkillGroupRecord } from "@/models/types";

export const SKILL_GROUP_RECORDS: SkillGroupRecord[] = [
    ["Machine learning", [["python", "Python"], ["ml", "Machine learning"], ["rf", "Random Forest"], ["mc", "Monte Carlo simulation"], ["grid", "Grid search"], ["cv", "Cross-validation"]]],
    ["IoT and data", [["mqtt", "MQTT"], ["emqx", "EMQX"], ["mosquitto", "Eclipse Mosquitto"], ["websockets", "WebSockets"], ["influxdb", "InfluxDB"], ["mongodb", "MongoDB"], ["n8n", "n8n"], ["grafana", "Grafana"]]],
    ["Backend and APIs", [["fastapi", "FastAPI"], ["rest", "REST APIs"], ["openapi", "Swagger/OpenAPI"], ["jwt", "JWT"], ["firebase", "Firebase"], ["axios", "Axios"]]],
    ["Frontend", [["react", "React"], ["reactnative", "React Native"], ["nextjs", "Next.js"], ["sveltekit", "SvelteKit"], ["typescript", "TypeScript"], ["javascript", "JavaScript"], ["redux", "Redux"], ["reactquery", "React Query"], ["swr", "SWR"], ["singlespa", "Single-SPA"], ["mui", "Material UI"], ["styled", "Styled-components"], ["wcag", "WCAG 2.1 AA"]]],
    ["Delivery and testing", [["docker", "Docker"], ["gitlab", "GitLab CI"], ["jest", "Jest"], ["rtl", "React Testing Library"], ["tdd", "TDD"], ["webpack", "Webpack"], ["vite", "Vite"], ["jira", "Jira"]]],
    ["Integrations and design", [["telegram", "Telegram"], ["sms8", "SMS8"], ["sheets", "Google Sheets"], ["recaptcha", "Google reCAPTCHA"], ["c4", "C4/UML"]]]
  ];

/** Tools listed under "Also in my toolkit" that are not tied to a project. */
export const QUIET_SKILLS = ["SQL", "Neo4j", "AWS", "Generative AI", "LLMs"];
