"use client";

import { useEffect, useRef, useState } from "react";
import { Chip } from "@/components/ui/Chip";
import { pipelineStages } from "@/data";
import { ScrollService } from "@/services/ScrollService";
import { LabFrame } from "./LabFrame";

const STEP_MS = 900;

export function RangerLab() {
  const [selected, setSelected] = useState(0);
  const [sending, setSending] = useState(false);
  const timers = useRef<number[]>([]);
  const lastIndex = pipelineStages.length - 1;

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach((id) => window.clearTimeout(id));
  }, []);

  const sendReading = () => {
    if (sending) return;
    if (ScrollService.prefersReducedMotion()) {
      setSelected(lastIndex);
      return;
    }
    setSending(true);
    pipelineStages.forEach((_, index) => {
      timers.current.push(
        window.setTimeout(() => {
          setSelected(index);
          if (index === lastIndex) setSending(false);
        }, index * STEP_MS),
      );
    });
  };

  const stage = pipelineStages[selected];

  return (
    <LabFrame
      id="lab-ranger"
      title="IoT Ranger: follow one reading"
      chips={<Chip>Team project</Chip>}
      intro="An IoT monitoring and device-management platform with secure device connectivity, real-time telemetry and customizable dashboards, inspired by cloud IoT services such as NETPIE and AWS IoT. Built with Shuvechhya Bajracharya and Manaswin Lertmongkolsatain. Press the button to send a reading from a device to a dashboard, or tap any stage."
    >
      <div className="row-actions">
        <button className="sm" type="button" onClick={sendReading}>
          Send a reading ▸
        </button>
      </div>
      <div className="stages" role="group" aria-label="Pipeline stages">
        {pipelineStages.map((item, index) => (
          <button
            key={item.name}
            type="button"
            className="stage"
            aria-pressed={index === selected}
            onClick={() => setSelected(index)}
          >
            {item.name}
            <small>{item.technology}</small>
          </button>
        ))}
      </div>
      <div className="stage-detail" aria-live="polite">
        <strong>{stage.name}</strong>
        <br />
        {stage.description}
      </div>
    </LabFrame>
  );
}
