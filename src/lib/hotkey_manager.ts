/**
 * Hotkey Manager
 *
 * Centralized keyboard shortcut handler that manages multiple hotkey registrations
 * with a single window event listener for optimal performance.
 */

import { newSimpleState } from "@pkg/simple-state/src/index.ts";

type HotkeyHandler = () => void;
type HotkeyCleanUp = () => void;
type Modifier = "ctrl" | "alt" | "none";

const handlers = new Map<string, Set<HotkeyHandler>>();
const initialized = newSimpleState<boolean>(false);

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

function initialize(): void {
  const handleKeyDown: (e: KeyboardEvent) => void = function handleKeyDown(
    e: KeyboardEvent,
  ): void {
    // For single key hotkeys (no modifier), don't trigger if user is typing in an input
    if (!e.ctrlKey && !e.altKey && !e.metaKey && !e.shiftKey) {
      if (isTypingInInput()) {
        return;
      }
      const matched = handlers.get(`none+${e.key.toLowerCase()}`);
      if (matched) {
        e.preventDefault();
        for (const handler of matched) {
          handler();
        }
      }
    }

    if (e.ctrlKey && !e.altKey && !e.metaKey && !e.shiftKey) {
      const matched = handlers.get(`ctrl+${e.key.toLowerCase()}`);
      if (matched) {
        e.preventDefault();
        for (const handler of matched) {
          handler();
        }
      }
    }

    if (e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
      const matched = handlers.get(`alt+${e.key.toLowerCase()}`);
      if (matched) {
        e.preventDefault();
        for (const handler of matched) {
          handler();
        }
      }
    }
  };

  globalThis.addEventListener("keydown", handleKeyDown);

  initialized.set(true);
}

export function registerHotkeyHandler(
  key: string,
  handler: HotkeyHandler,
  modifier: Modifier = "none",
): HotkeyCleanUp {
  const keymap = `${modifier}+${key.toLowerCase()}`;

  if (!handlers.has(keymap)) {
    handlers.set(keymap, new Set<HotkeyHandler>());
  }

  handlers.get(keymap)!.add(handler);

  if (!initialized.get()) {
    initialize();
  }

  return function cleanUpHotkeyHandler(): void {
    const handlerSet = handlers.get(keymap);
    if (handlerSet) {
      handlerSet.delete(handler);

      if (handlerSet.size === 0) {
        handlers.delete(keymap);
      }
    }
  };
}

/**
 * Reset the hotkey manager state (for testing only)
 * @internal
 */
export function __resetForTesting(): void {
  handlers.clear();
  initialized.set(false);
}
