/**
 * Hotkey Manager
 *
 * Centralized keyboard shortcut handler that manages multiple hotkey registrations
 * with a single window event listener for optimal performance.
 */

type HotkeyHandler = () => void;
type Modifier = "ctrl" | "alt" | "none";

function createHotkeyManager() {
  const handlers = new Map<string, HotkeyHandler>();
  let initialized = false;

  /**
   * Check if the user is currently typing in an input field
   */
  function isTypingInInput(): boolean {
    // Check if document exists (not available in Deno test environment)
    if (typeof document === "undefined") {
      return false;
    }
    const activeElement = document.activeElement;
    return activeElement instanceof HTMLInputElement ||
           activeElement instanceof HTMLTextAreaElement ||
           (activeElement instanceof HTMLElement && activeElement.isContentEditable);
  }

  /**
   * Initialize the global keyboard event listener (called automatically on first registration)
   */
  function initialize(): void {
    globalThis.addEventListener("keydown", (e: KeyboardEvent) => {
      // For single key hotkeys (no modifier), don't trigger if user is typing in an input
      if (!e.ctrlKey && !e.altKey && !e.metaKey && !e.shiftKey) {
        if (isTypingInInput()) {
          return;
        }
        const handler = handlers.get(`none+${e.key.toLowerCase()}`);
        if (handler) {
          e.preventDefault();
          handler();
        }
      }

      if (e.ctrlKey && !e.altKey && !e.metaKey && !e.shiftKey) {
        const ctrlHandler = handlers.get(`ctrl+${e.key.toLowerCase()}`);
        if (ctrlHandler) {
          e.preventDefault();
          ctrlHandler();
        }
      }

      if (e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
        const altHandler = handlers.get(`alt+${e.key.toLowerCase()}`);
        if (altHandler) {
          e.preventDefault();
          altHandler();
        }
      }
    });
    initialized = true;
  }

  /**
   * Register a hotkey handler for key combinations
   * @param key - The key to listen for (e.g., "p", "r", "e")
   * @param handler - The function to call when the hotkey is pressed
   * @param modifier - The modifier key to use ("ctrl", "alt", or "none" for single keys, defaults to "none")
   */
  function register(key: string, handler: HotkeyHandler, modifier: Modifier = "none"): void {
    handlers.set(`${modifier}+${key.toLowerCase()}`, handler);

    if (!initialized) {
      initialize();
    }
  }

  /**
   * Unregister a hotkey handler
   * @param key - The key to unregister
   * @param modifier - The modifier key that was used ("ctrl", "alt", or "none", defaults to "none")
   */
  function unregister(key: string, modifier: Modifier = "none"): void {
    handlers.delete(`${modifier}+${key.toLowerCase()}`);
  }

  return { register, unregister };
}

export { createHotkeyManager };
export const hotkeyManager = createHotkeyManager();
