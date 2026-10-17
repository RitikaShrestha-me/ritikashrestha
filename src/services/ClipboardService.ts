/** Copies text to the clipboard. Returns false when the browser refuses, so the caller can fall back to selecting it. */
export class ClipboardService {
  static async copy(text: string): Promise<boolean> {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  }

  /** Select the contents of a node so the visitor can press Ctrl+C. */
  static select(node: Node): void {
    const range = document.createRange();
    range.selectNodeContents(node);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
  }
}
