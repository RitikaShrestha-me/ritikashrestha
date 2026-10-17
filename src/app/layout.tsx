import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { PROFILE } from "@/data/profile";
import "@/styles/tokens.css";
import "@/styles/base.css";
import "@/styles/header.css";
import "@/styles/hero.css";
import "@/styles/summary.css";
import "@/styles/chapters.css";
import "@/styles/work.css";
import "@/styles/detail.css";
import "@/styles/education.css";
import "@/styles/labs.css";
import "@/styles/skills.css";
import "@/styles/contact.css";

export const metadata: Metadata = {
  title: PROFILE.documentTitle,
  description: PROFILE.description,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const FONTS_URL =
  "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500..800&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href={FONTS_URL} />
      </head>
      <body>{children}</body>
    </html>
  );
}
