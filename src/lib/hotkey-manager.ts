/**
 * Hotkey Manager
 *
 * Centralized keyboard shortcut handler that manages multiple hotkey registrations
 * with a single window event listener for optimal performance.
 */

type HotkeyHandler = () => void;

class HotkeyManager {
  private handlers = new Map<string, HotkeyHandler>();
  private initialized = false;

  /**
   * Register a hotkey handler for Ctrl+Key combinations
   * @param key - The key to listen for (e.g., "p", "r", "e")
   * @param handler - The function to call when the hotkey is pressed
   */
  register(key: string, handler: HotkeyHandler): void {
    this.handlers.set(key.toLowerCase(), handler);

    if (!this.initialized) {
      this.initialize();
    }
  }

  /**
   * Unregister a hotkey handler
   * @param key - The key to unregister
   */
  unregister(key: string): void {
    this.handlers.delete(key.toLowerCase());
  }

  /**
   * Initialize the global keyboard event listener (called automatically on first registration)
   */
  private initialize(): void {
    window.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.ctrlKey) {
        const handler = this.handlers.get(e.key.toLowerCase());
        if (handler) {
          e.preventDefault();
          handler();
        }
      }
    });
    this.initialized = true;
  }
}

export const hotkeyManager = new HotkeyManager();
