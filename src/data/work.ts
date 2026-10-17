import type { WorkRecord } from "@/models/types";

/** Raw content for every project and role. Hydrated into WorkItem objects by the repository. */
export const WORK_RECORDS: WorkRecord[] = [
    {
      id: "glof", kind: "project", label: "Project", where: "Télécom SudParis", period: "2026", plate: "glof", live: "Live demo",
      title: "GLOF Early Warning System",
      sum: "A Glacial Lake Outburst Flood early-warning prototype for the IoT & Digital Twins course: synthetic sensor data in, risk scores and tiered alerts out.",
      resLabel: "Result", res: "Weighted hazard score plus population and distance exposure, mapped to Low, Moderate and High risk. 5 scenarios tested.",
      tags: ["MQTT", "InfluxDB", "n8n", "Docker"],
      skills: ["mqtt", "mosquitto", "influxdb", "n8n", "javascript", "sheets", "docker", "nextjs", "telegram", "sms8", "c4"],
      stack: ["MQTT", "Eclipse Mosquitto", "InfluxDB", "n8n", "JavaScript", "Google Sheets", "Docker", "Next.js", "Telegram", "SMS8", "C4/UML"],
      facts: [
        ["Course", "Internet of Things and Digital Twins, M2 in Data Science and Network Intelligence"],
        ["Submitted to", "Professor Roberto Minerva"],
        ["Team", "Shuvam Shrestha, Ritika Shrestha, Meron Temesgen"],
        ["Submitted", "1 October 2026"],
        ["Data", "Synthetic. Prototype only."]
      ],
      demo: { id: "lab-glof", text: "Try the risk calculator" },
      sections: [
        { h: "Highlights", ul: [
          "Designed a prototype early-warning system for glacial lake floods: weighted hazard score (water level 30%, discharge 30%, rainfall 20%, glacier movement 20%) combined with population and distance exposure into Low, Moderate and High risk.",
          "Built the pipeline and backend logic: synthetic sensor streams over MQTT into InfluxDB, validated and scored by a modular n8n workflow in JavaScript (range checks, missing-value handling, sensor-health flags, timestamp alignment).",
          "Automated Telegram and SMS alerts with operator review and a sensor watchdog, built a live Next.js dashboard, and specified the system with 5 requirements and C4/UML diagrams. Tested 5 scenarios."
        ] },
        { h: "The problem", p: [
          "Glacial lakes in the Himalaya are growing. The report cites a worldwide rise of about 53% in lake number, 51% in area and 48% in volume since 1990, and roughly one million people living within 10 km of a glacial lake. A sudden release of water can develop quickly and travel down steep valleys.",
          "The data that could warn people arrives from different sources, at different rates and with different quality. In remote valleys the link to a central platform can also fail."
        ] },
        { h: "The challenge", p: [
          "Design a dependable warning workflow for remote, high-risk locations where connectivity or individual sensors may fail. Keep a human in the loop for the intermediate state, and escalate urgent warnings quickly."
        ] },
        { h: "How it works", ol: [
          "A sensor layer of a rain gauge, a GNSS ground-movement sensor and an RQ-30 water-flow sensor, feeding an edge gateway that buffers and forwards telemetry over MQTT to an Eclipse Mosquitto broker. The prototype streams synthetic readings with the same topics and message format real sensors would use.",
          "InfluxDB for time-series storage and a heartbeat from every sensor. Thresholds, exposure data and configuration live in a Google Sheet that non-developers can edit.",
          "One n8n workflow written in JavaScript code nodes. It parses, validates (range checks, missing values), merges the streams, flags sensor health, aligns timestamps and computes the indicators.",
          "A Hazard Engine and an Exposure Engine, combined by a Risk Analysis node into a numerical score and a risk state. Thresholds and weights come from configuration.",
          "State-based routing. Normal is logged. Warning sends a Telegram message to the operator, who confirms, escalates or dismisses it. Critical sends Telegram and SMS alerts to the authorities with a recommended action.",
          "A sensor watchdog that raises a failure alert even when no score can be computed, so a silent sensor is never read as a safe lake.",
          "A Next.js dashboard with the live risk state, recent measurements, sensor health and alert history, plus a logger for traceability. The whole stack runs locally in Docker.",
          "Design documentation: C4 levels 1 to 3, a use-case model and a state machine that includes a Local Fail-Safe Warning state for loss of connectivity."
        ] },
        { h: "How a score becomes an alert", p: [
          "Four weighted indicators (water level 0.30, discharge 0.30, rainfall 0.20, glacier movement 0.20) give a 0–100 hazard score. An exposure score from population and distance to the lake scales it into a combined risk of low (below 35), moderate (35–59) or high (60 and above). The report names the three states Normal, Warning and Critical. Weights and thresholds are illustrative."
        ], fig: "glof" },
        { h: "How it was tested", p: [
          "Five scenarios were run on synthetic data to check that each stage behaves as specified."
        ], table: { head: ["Scenario", "Injected condition", "Expected behaviour"], rows: [
          ["Low-Normal", "Stable water level, low rainfall, no vibration", "State Normal, no alert, dashboard updated"],
          ["Warning", "Rising water level with moderate rainfall", "State Warning, Telegram message to the operator for review"],
          ["Critical", "Rapid water rise, heavy rainfall, strong vibration", "State Critical, Telegram and SMS alert to authorities"],
          ["Invalid data", "Out-of-range or missing values", "Values flagged by the validator, health flags set"],
          ["Sensor failure", "Heartbeat stops", "Watchdog alert raised through Alert Orchestration"]
        ] } },
        { h: "Limits", ul: [
          "All results rely on synthetic data. Weights and thresholds are illustrative and would need calibration against site observations before any operational use.",
          "The workflow polls on a schedule, so detection latency depends on the interval and the Wait nodes. The report does not measure it.",
          "Notifications need internet or cellular access at the central host, which runs on a single machine.",
          "The local siren and edge safety controller are specified at architecture level. The n8n prototype does not exercise them."
        ] },
        { h: "Next steps", ul: [
          "Calibrate the scoring with long-term, site-specific lake observations.",
          "Compare it with data-driven models, evaluated on historical events.",
          "Test field hardware, connectivity-loss scenarios and the local fail-safe.",
          "Replace polling with event-driven ingestion and add redundant hosting."
        ] }
      ]
    },
    {
      id: "ranger", kind: "project", label: "Project", where: "IoT systems", period: "Team", plate: "ranger", live: "Live demo",
      title: "IoT Ranger",
      sum: "A full-stack IoT monitoring and device management platform inspired by NETPIE and AWS IoT.",
      resLabel: "Result", res: "MQTT and HTTP device connectivity, real-time WebSocket telemetry, JWT and Firebase authentication, and a custom dashboard builder.",
      tags: ["FastAPI", "SvelteKit", "MQTT", "EMQX"],
      skills: ["fastapi", "python", "sveltekit", "mqtt", "emqx", "websockets", "mongodb", "influxdb", "grafana", "firebase", "jwt", "rest", "openapi", "docker"],
      stack: ["FastAPI", "Python", "SvelteKit", "MQTT", "EMQX", "WebSockets", "MongoDB", "InfluxDB", "Grafana", "Firebase", "JWT", "REST APIs", "Docker"],
      facts: [
        ["Type", "IoT systems project, built as a team"],
        ["Team", "Shuvechhya Bajracharya, Manaswin Lertmongkolsatain, Ritika Shrestha"],
        ["Inspired by", "NETPIE and AWS IoT"]
      ],
      demo: { id: "lab-ranger", text: "Follow one reading" },
      sections: [
        { h: "Highlights", ul: [
          "Built a full-stack IoT monitoring and device management platform inspired by NETPIE and AWS IoT: MQTT (EMQX broker) and HTTP device connectivity, real-time telemetry over WebSockets, and device shadow / live-feed synchronization.",
          "Designed a modular FastAPI backend (data pipeline, configuration, device registry, historical-data and WebSocket services) with Swagger/OpenAPI documentation, JWT and Firebase authentication, and broker-level device authentication.",
          "Stored the latest values and 5-minute history in MongoDB (device registry, user accounts, dashboard configs) and 1-second sensor readings in InfluxDB (7-day retention). Built a SvelteKit app with a custom dashboard builder, alerts and Grafana monitoring."
        ] },
        { h: "The challenge", p: [
          "Design an event-driven IoT communication pipeline that stays secure and scalable: real-time device monitoring and control, time-series processing and a secure device authentication workflow, all in a modular, microservice-style architecture."
        ] },
        { h: "How it is built", ol: [
          "Devices connect over MQTT and HTTP. Telemetry reaches the platform through an EMQX broker and streams to the browser over WebSockets, with each device's shadow state kept in sync with the live feed.",
          "FastAPI backend services in a modular, microservice-style layout, documented with Swagger/OpenAPI.",
          "Authentication with JWT and Firebase, plus broker-level device authentication so each device only sees its own topics.",
          "MongoDB for application data (device registry, user accounts, dashboard configurations, the latest values and 5-minute history) and InfluxDB for 1-second sensor readings with 7-day retention.",
          "A SvelteKit frontend with a custom dashboard builder (live charts, gauges and indicators), alerts, and Grafana for monitoring."
        ] },
        { h: "Outcome", p: [
          "A working end-to-end IoT platform covering secure connectivity, live telemetry and interactive monitoring, built together as a team. It gave me hands-on practice with scalable IoT systems and real-time architectures."
        ] }
      ]
    },
    {
      id: "scheduler", kind: "project", label: "Project", where: "AIT", period: "Individual", plate: "sched", live: "Live demo",
      title: "AI-Assisted Wireless User Scheduling",
      sum: "A Random Forest trained on Monte Carlo data to imitate Proportional Fair scheduling in a 5-user single-cell wireless network.",
      resLabel: "Result", res: "92.95% test accuracy. Within 0.5% of PF throughput, +40% vs Round Robin and 1.8x the fairness of Max-SNR.",
      tags: ["Python", "Random Forest", "Monte Carlo", "Cross-validation"],
      skills: ["python", "ml", "rf", "mc", "grid", "cv"],
      stack: ["Python", "Random Forest", "Monte Carlo simulation", "Grid search", "Cross-validation"],
      facts: [
        ["Context", "M.Eng in IoT Systems Engineering, Asian Institute of Technology"],
        ["Author", "Ritika Shrestha (individual paper)"],
        ["Data", "Synthetic, 20,000 Monte Carlo samples"],
        ["Test set", "4,000 held-out samples"]
      ],
      demo: { id: "lab-sched", text: "Run the baselines" },
      sections: [
        { h: "Highlights", ul: [
          "Generated a 20,000-sample Monte Carlo dataset and trained a Random Forest on 15 features to imitate Proportional Fair (PF) scheduling: 92.95% test accuracy, tuned with grid search and 5-fold cross-validation.",
          "Benchmarked on 4,000 held-out samples: within 0.5% of PF throughput, +40% vs Round Robin and 1.8x the fairness of Max-SNR. A closed-form capacity model was validated against simulation."
        ] },
        { h: "The problem", p: [
          "A base station serves one user per time slot. Round Robin shares slots equally and ignores the channel. Max-SNR always serves the strongest channel and leaves distant users with almost nothing. Proportional Fair balances the two and is a cornerstone of wireless resource management.",
          "The question: can a classifier learn the Proportional Fair rule from examples, and so replace a fixed rule with a model that can later adapt?"
        ] },
        { h: "What I did", ol: [
          "Modelled five users with fixed path-loss factors (1.0, 0.7, 0.4, 0.2 and 0.1), SNR drawn as U(0, 20) times that factor, Shannon rates, and an 80% chance that each user has data in a slot.",
          "Generated 20,000 Monte Carlo samples. Each has 15 features (5 SNRs, 5 recent average rates, 5 activity flags) and is labelled with the Proportional Fair decision.",
          "Trained a Random Forest with an 80/20 split, five-fold cross-validation and a grid search over 100 or 200 trees and depths of 5, 10 or unlimited. The best setting was 200 trees with no depth limit.",
          "Evaluated Proportional Fair, the Random Forest, Round Robin and Max-SNR on the same 4,000-sample held-out set, using total throughput and Jain's fairness index.",
          "Derived a closed-form ergodic capacity for the channel model and checked it against simulation, user by user.",
          "Read the model with feature importance and a confusion matrix."
        ] },
        { h: "Results", p: [
          "The model reproduces Proportional Fair's choice 92.95% of the time on unseen data. Five-fold cross-validation gave 92.34%, so there is no sign of overfitting.",
          "Max-SNR serves user 1 in 2,099 slots and user 5 in only 23. The learned scheduler serves every user within 3% of Proportional Fair's frequency."
        ], table: { head: ["Scheduler", "Throughput (bits)", "Fairness (Jain)", "Against PF"], num: [1, 2], hl: 1, rows: [
          ["Proportional Fair (labels)", "11,587.3", "0.824", "Baseline"],
          ["Random Forest (mine)", "11,647.8", "0.816", "+0.5% throughput, −0.008 fairness"],
          ["Round Robin", "8,293.1", "0.864", "−28.4% throughput"],
          ["Max-SNR", "13,486.5", "0.460", "+16.4% throughput, −44% fairness"]
        ] } },
        { h: "What the model learned", ul: [
          "SNR features matter most, historical average rate comes second and activity flags matter least. That matches the Proportional Fair rule: current channel quality against past service.",
          "Mistakes mostly fall between neighbouring users such as 2 and 3, where Proportional Fair scores nearly tie and either choice costs little. There are no systematic errors between distant users.",
          "Simulated per-user rates beat the unconditional theoretical prediction by 23% to 52% (30% overall). That gap is multiuser diversity gain, and it validates the channel and rate models."
        ] },
        { h: "Limits", ul: [
          "The model slightly over-schedules strong users, a small fairness bias that is the main weakness of imitating a rule.",
          "The test data comes from the same distribution as the training data. If channel conditions change, the model would need retraining.",
          "The study assumes perfect channel information and a single cell."
        ] },
        { h: "Next steps", ul: [
          "Reinforcement learning that adapts without labelled data.",
          "Multipath channel models, multi-cell and multi-antenna scenarios.",
          "Online learning for changing traffic and mobile users."
        ] }
      ]
    },
    {
      id: "viveka", kind: "role", label: "Experience", where: "Viveka Services", period: "2023–25", plate: "text",
      title: "Associate Frontend Developer",
      sum: "Micro-frontends, an accessible component library and the FindCare app on a US health-insurance platform for 450K+ users.",
      resLabel: "Impact", res: "FindCare page load speed up 30% and bundle size down about 25%. Component library compliant with WCAG 2.1 AA.",
      tags: ["React", "TypeScript", "Next.js", "Redux"],
      skills: ["react", "typescript", "nextjs", "singlespa", "redux", "reactquery", "swr", "mui", "styled", "webpack", "vite", "gitlab", "jest", "rtl", "tdd", "jira", "rest", "axios", "wcag"],
      stack: ["React", "TypeScript", "Next.js", "Single-SPA", "Redux", "React Query", "SWR", "Material UI", "Styled-components", "Webpack", "Vite", "GitLab CI", "Jest", "React Testing Library", "Jira"],
      facts: [
        ["Role", "Associate Frontend Developer"],
        ["Company", "Viveka Services"],
        ["Period", "November 2023 to February 2025"],
        ["Product", "US health-insurance platform serving 450K+ users"]
      ],
      sections: [
        { h: "Highlights", ul: [
          "Shipped Single-SPA micro-frontends for a US health-insurance platform serving 450K+ users, enabling independent squad deployments. Built a shared, Figma-accurate React component library (Material UI, Styled-components) compliant with WCAG 2.1 AA, reducing duplicated UI work.",
          "Re-architected global and asynchronous state management using React and Redux across eligibility, contract configuration and employee data. Developed FindCare with Next.js SSR, React Query and SWR, improving page load speed by 30% and reducing bundle size by about 25% through code splitting, lazy loading and tree shaking.",
          "Owned GitLab CI/CD and frontend testing using Jest, React Testing Library and TDD. Integrated REST APIs with Axios, reviewed pull requests for architecture and accessibility, collaborated with QA, product, backend, Security and DevOps teams, and resolved vulnerabilities identified through penetration testing."
        ] },
        { h: "By the numbers", stats: [
          ["450K+", "users on the platform"],
          ["30%", "faster page load on FindCare"],
          ["~25%", "smaller bundle, from code splitting, lazy loading and tree shaking"],
          ["WCAG 2.1 AA", "target met by the shared component library"]
        ] },
        { h: "Why it matters for data work", p: [
          "Healthcare data has to be correct and responsive at the same time. I carry the same habits into data projects: keep latency in view, make state explicit and test what ships."
        ] }
      ]
    },
    {
      id: "baloochat", kind: "role", label: "Experience", where: "BalooChat Technology", period: "2022–23", plate: "text",
      title: "Software Development Engineer",
      sum: "Built the React Native chat app UI and integrated REST APIs with backend and design teams.",
      resLabel: "Impact", res: "Reusable components and efficient caching for a scalable codebase, with better app performance and load times.",
      tags: ["React Native", "JavaScript", "TypeScript", "REST APIs"],
      skills: ["reactnative", "javascript", "typescript", "rest"],
      stack: ["React Native", "JavaScript", "TypeScript", "REST APIs"],
      facts: [
        ["Role", "Software Development Engineer"],
        ["Company", "BalooChat Technology"],
        ["Period", "September 2022 to April 2023"]
      ],
      sections: [
        { h: "Highlights", ul: [
          "Built the React Native chat app UI with reusable components and efficient caching for a scalable, maintainable codebase.",
          "Integrated REST API data with backend and design teams, improving app performance and load times."
        ] }
      ]
    },
    {
      id: "taxadda", kind: "role", label: "Experience", where: "TaxAdda", period: "2021", plate: "text",
      title: "React Frontend Developer",
      sum: "Built a seller dashboard from scratch with authentication and backend APIs for importing and processing online-platform transaction files.",
      resLabel: "Impact", res: "Filtered-transaction moving, JSON table downloads, and Google reCAPTCHA to block bot access to the API.",
      tags: ["React", "JavaScript", "TypeScript", "reCAPTCHA"],
      skills: ["react", "javascript", "typescript", "rest", "recaptcha"],
      stack: ["React", "JavaScript", "TypeScript", "REST APIs", "Google reCAPTCHA"],
      facts: [
        ["Role", "React Frontend Developer"],
        ["Company", "TaxAdda Private Limited"],
        ["Period", "June to December 2021"]
      ],
      sections: [
        { h: "Highlights", ul: [
          "Built a seller dashboard from scratch with authentication and backend APIs to import and process online-platform transaction files.",
          "Added filtered-transaction moving, JSON table downloads and Google reCAPTCHA to block bot access to the API."
        ] }
      ]
    },
    {
      id: "interfaces", kind: "project", label: "Project", where: "College and self-directed", period: "2018–22", plate: "sites",
      title: "Early interface projects",
      sum: "Six interface projects built in college and on my own, each live online.",
      resLabel: "Shows", res: "Frontend craft from before I moved into data and AI.",
      tags: ["Frontend", "Live sites"], skills: [],
      stack: ["Frontend", "Web interfaces"],
      facts: [
        ["Period", "During my B.E., 2018 to 2022"],
        ["Type", "College and self-directed projects"]
      ],
      sections: [
        { h: "Live sites", p: ["Open any of these to see the interface."], sites: [
          ["Aurify", "https://aurify-yourself.vercel.app/", "Beauty services and marketplace"],
          ["Closet by Aras", "https://closetbyaras.vercel.app/", "Fashion e-commerce"],
          ["Tactical Communication Interface", "https://warfare-communication.vercel.app/", "College UI project"],
          ["Quantum Education", "https://quantum-consultancy.vercel.app/", "Educational consultancy"],
          ["Momo Khau", "https://momokhau.vercel.app/", "Food ordering interface"],
          ["Hope: New Normal", "https://hope-newnormal.netlify.app/", "Health and social awareness"]
        ] }
      ]
    }
  ];
