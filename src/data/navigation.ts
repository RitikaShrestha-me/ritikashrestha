export interface NavLink {
  id: string;
  label: string;
}

/** Sections shown in the sticky header, in page order. */
export const NAV_LINKS: NavLink[] = [
  { id: "education", label: "Education" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "ch5", label: "Contact" },
];
