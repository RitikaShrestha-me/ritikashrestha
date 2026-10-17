import type { ReactNode } from "react";

interface ChipProps {
  children: ReactNode;
  live?: boolean;
  className?: string;
}

/** Small uppercase tag, such as "Live demo" or "Simulated data only". */
export function Chip({ children, live = false, className = "" }: ChipProps) {
  const classes = ["chip", live ? "live" : "", className].filter(Boolean).join(" ");
  return <span className={classes}>{children}</span>;
}
