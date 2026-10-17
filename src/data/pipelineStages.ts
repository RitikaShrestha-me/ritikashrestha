import type { PipelineStageRecord } from "@/models/types";

export const PIPELINE_STAGES: PipelineStageRecord[] = [
    { n: "Devices", s: "MQTT or HTTP", d: "Devices connect over MQTT or HTTP. Each device has its own credentials, an online status and a live shadow state, all visible in the device detail view." },
    { n: "Broker", s: "EMQX", d: "An EMQX broker carries the event-driven message flow between devices and the platform's services." },
    { n: "Services", s: "FastAPI · JWT · Firebase", d: "Backend services written in FastAPI, split into modular, microservice-style parts. Device authentication runs on JWT and Firebase." },
    { n: "Storage", s: "MongoDB · InfluxDB", d: "MongoDB holds application data. InfluxDB holds the time-series sensor readings." },
    { n: "Live delivery", s: "WebSockets", d: "Telemetry streams to the browser over WebSockets. Device shadow state stays in sync with the live feed." },
    { n: "Dashboards", s: "SvelteKit · Grafana", d: "Operators see historical and real-time sensor data in a SvelteKit app with a custom dashboard builder (live charts, gauges, indicators). Grafana adds monitoring and alerting." }
  ];
