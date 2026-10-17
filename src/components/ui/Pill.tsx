interface PillProps {
  /** Risk level, which sets the colour. "none" is used when no score exists. */
  level: string | null;
  label: string;
}

export function Pill({ level, label }: PillProps) {
  return (
    <span className="pill" data-l={level ?? "none"}>
      {label}
    </span>
  );
}
