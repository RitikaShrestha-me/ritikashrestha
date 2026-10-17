import type { ReactNode } from "react";

interface LabFrameProps {
  id: string;
  title: string;
  chips: ReactNode;
  intro: string;
  children: ReactNode;
}

/** Shared shell for the three live demos. */
export function LabFrame({ id, title, chips, intro, children }: LabFrameProps) {
  return (
    <div className="lab" id={id}>
      <div className="lab-head">
        {chips}
        <h3>{title}</h3>
      </div>
      <p className="intro">{intro}</p>
      {children}
    </div>
  );
}
