"use client";

import type { MouseEvent } from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import { skillIndex } from "@/data";
import type { WorkItem } from "@/models/WorkItem";
import { WorkPlate } from "./WorkPlate";

/** Card in a slideshow. Opens the item's detail page. */
export function WorkCard({ item }: { item: WorkItem }) {
  const { openWork, activeSkill } = usePortfolio();
  const hit = skillIndex.isHighlighted(item, activeSkill);
  const classes = ["wcard", hit ? "hit" : "", activeSkill !== null && !hit ? "dim" : ""]
    .filter(Boolean)
    .join(" ");

  const open = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    openWork(item.id, "push");
  };

  return (
    <a className={classes} href={item.hash()} data-work-card={item.id} draggable={false} onClick={open}>
      <WorkPlate item={item} />
      <div className="wbody">
        <p className="wmeta">{item.metaLine()}</p>
        <h3>{item.title}</h3>
        <p className="sum">{item.sum}</p>
        <p className="wres">
          <b>{item.resLabel}</b>
          {item.res}
        </p>
        <div className="tags">
          {item.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <span className="wgo">Read the case study →</span>
      </div>
    </a>
  );
}
