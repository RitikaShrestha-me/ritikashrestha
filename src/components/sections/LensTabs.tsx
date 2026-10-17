"use client";

import { useState, type KeyboardEvent } from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import { LENSES, type LensAction } from "@/data/lenses";

/** "Reading for a specific role?" tabs. Arrow keys move between tabs. */
export function LensTabs() {
  const { openWork, jump } = usePortfolio();
  const [selected, setSelected] = useState(0);

  const run = (action: LensAction) => {
    if (action.type === "open") openWork(action.id, "push");
    else jump(action.id);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = LENSES.length - 1;
    let target: number | null = null;
    if (event.key === "ArrowRight") target = index === last ? 0 : index + 1;
    if (event.key === "ArrowLeft") target = index === 0 ? last : index - 1;
    if (target === null) return;
    event.preventDefault();
    setSelected(target);
    document.getElementById(`tab-${LENSES[target].id}`)?.focus();
  };

  return (
    <div className="lens">
      <p className="label" id="lensLabel">
        Reading for a specific role? Pick a lens.
      </p>
      <div className="tabs" role="tablist" aria-labelledby="lensLabel">
        {LENSES.map((lens, index) => (
          <button
            key={lens.id}
            className="tab"
            role="tab"
            type="button"
            id={`tab-${lens.id}`}
            aria-selected={index === selected}
            aria-controls={`pan-${lens.id}`}
            tabIndex={index === selected ? 0 : -1}
            onClick={() => setSelected(index)}
            onKeyDown={(event) => onKeyDown(event, index)}
          >
            {lens.label}
          </button>
        ))}
      </div>
      {LENSES.map((lens, index) => (
        <div
          key={lens.id}
          role="tabpanel"
          id={`pan-${lens.id}`}
          aria-labelledby={`tab-${lens.id}`}
          hidden={index !== selected}
        >
          <ul className="jumps">
            {lens.entries.map((entry) => (
              <li key={entry.text}>
                <span>{entry.text}</span>
                <button className="link" type="button" onClick={() => run(entry.action)}>
                  {entry.cta}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
