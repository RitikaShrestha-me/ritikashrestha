/** Reads and writes the `#work-<id>` URL hash that deep-links to a detail page. */
export class HashRoute {
  private static readonly PATTERN = /^#work-([a-z0-9-]+)$/;

  static readId(): string | null {
    if (typeof window === "undefined") return null;
    const match = HashRoute.PATTERN.exec(window.location.hash || "");
    return match ? match[1] : null;
  }

  static push(id: string): void {
    HashRoute.safely(() => window.history.pushState({ detail: id }, "", `#work-${id}`));
  }

  static replace(id: string): void {
    HashRoute.safely(() => window.history.replaceState({ detail: id }, "", `#work-${id}`));
  }

  /** Remove the hash without adding a history entry. */
  static strip(): void {
    HashRoute.safely(() => {
      if (window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
      }
    });
  }

  /** True when the current history entry was created by opening a detail page from the list. */
  static hasDetailState(): boolean {
    try {
      const state = window.history.state as { detail?: string } | null;
      return Boolean(state && state.detail);
    } catch {
      return false;
    }
  }

  private static safely(action: () => void): void {
    try {
      action();
    } catch {
      /* History can be unavailable in sandboxed frames. */
    }
  }
}
