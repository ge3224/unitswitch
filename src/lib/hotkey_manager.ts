/**
 * Hotkey Manager
 *
 * Centralized keyboard shortcut handler that manages multiple hotkey registrations
 * with a single window event listener for optimal performance.
 */

type HotkeyHandler = () => void;

function createHotkeyManager() {
  const handlers = new Map<string, HotkeyHandler>();
  let initialized = false;

  /**
   * Initialize the global keyboard event listener (called automatically on first registration)
   */
  function initialize(): void {
    globalThis.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.ctrlKey) {
        const handler = handlers.get(e.key.toLowerCase());
        if (handler) {
          e.preventDefault();
          handler();
        }
      }
    });
    initialized = true;
  }

  /**
   * Register a hotkey handler for Ctrl+Key combinations
   * @param key - The key to listen for (e.g., "p", "r", "e")
   * @param handler - The function to call when the hotkey is pressed
   */
  function register(key: string, handler: HotkeyHandler): void {
    handlers.set(key.toLowerCase(), handler);

    if (!initialized) {
      initialize();
    }
  }

  /**
   * Unregister a hotkey handler
   * @param key - The key to unregister
   */
  function unregister(key: string): void {
    handlers.delete(key.toLowerCase());
  }

  return { register, unregister };
}

export { createHotkeyManager };
export const hotkeyManager = createHotkeyManager();
