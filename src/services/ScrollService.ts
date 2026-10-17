/** Thin wrapper around browser scrolling. Every method is a no-op during server rendering. */
export class ScrollService {
  static prefersReducedMotion(): boolean {
    return (
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }

  /** Jump without animation, even though the page has `scroll-behavior: smooth`. */
  static instantTo(y: number): void {
    if (typeof window === "undefined") return;
    const root = document.documentElement;
    const previous = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    window.scrollTo({ top: y, left: 0, behavior: "instant" as ScrollBehavior });
    requestAnimationFrame(() => {
      root.style.scrollBehavior = previous;
    });
  }

  static smoothTo(element: Element | null, block: ScrollLogicalPosition = "start", inline: ScrollLogicalPosition = "nearest"): void {
    element?.scrollIntoView({
      behavior: ScrollService.prefersReducedMotion() ? "auto" : "smooth",
      block,
      inline,
    });
  }

  static smoothToId(id: string): void {
    ScrollService.smoothTo(document.getElementById(id));
  }

  static instantToId(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: "instant" as ScrollBehavior, block: "start" });
  }

  /** Scroll a horizontal carousel so a card sits in the middle. */
  static centerCard(card: HTMLElement): void {
    const track = card.closest<HTMLElement>(".slides");
    if (!track) return;
    track.scrollLeft = Math.max(0, card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2);
  }
}
