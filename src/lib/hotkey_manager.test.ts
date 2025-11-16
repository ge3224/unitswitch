import { describe, it } from "jsr:@std/testing/bdd";
import { assertEquals } from "jsr:@std/assert";
import { createHotkeyManager } from "@/lib/hotkey_manager.ts";

// Mock globalThis for testing
const mockGlobalThis = () => {
  const listeners: Map<string, ((e: KeyboardEvent) => void)[]> = new Map();

  return {
    addEventListener: (event: string, handler: (e: KeyboardEvent) => void) => {
      if (!listeners.has(event)) {
        listeners.set(event, []);
      }
      listeners.get(event)!.push(handler);
    },
    dispatchEvent: (event: KeyboardEvent) => {
      const handlers = listeners.get("keydown") || [];
      handlers.forEach((handler) => handler(event));
    },
  };
};

const createKeyboardEvent = (
  key: string,
  options: {
    ctrlKey?: boolean;
    altKey?: boolean;
    metaKey?: boolean;
    shiftKey?: boolean;
  } = {},
): KeyboardEvent => {
  let prevented = false;
  return {
    key,
    ctrlKey: options.ctrlKey ?? false,
    altKey: options.altKey ?? false,
    metaKey: options.metaKey ?? false,
    shiftKey: options.shiftKey ?? false,
    preventDefault: () => {
      prevented = true;
    },
    get defaultPrevented() {
      return prevented;
    },
  } as KeyboardEvent;
};

describe("hotkeyManager", () => {
  describe("registration", () => {
    it("should register and trigger handler for single keys", () => {
      const originalAddEventListener = globalThis.addEventListener;
      const mock = mockGlobalThis();
      globalThis.addEventListener = mock.addEventListener as typeof globalThis.addEventListener;

      const manager = createHotkeyManager();
      let called = false;

      manager.register("p", () => {
        called = true;
      });

      const event = createKeyboardEvent("p");
      mock.dispatchEvent(event);

      assertEquals(called, true);
      globalThis.addEventListener = originalAddEventListener;
    });

    it("should not trigger when modifier keys are pressed", () => {
      const originalAddEventListener = globalThis.addEventListener;
      const mock = mockGlobalThis();
      globalThis.addEventListener = mock.addEventListener as typeof globalThis.addEventListener;

      const manager = createHotkeyManager();
      let called = false;

      manager.register("p", () => {
        called = true;
      });

      const event = createKeyboardEvent("p", { ctrlKey: true });
      mock.dispatchEvent(event);

      assertEquals(called, false);
      globalThis.addEventListener = originalAddEventListener;
    });

    it("should support Ctrl key when specified", () => {
      const originalAddEventListener = globalThis.addEventListener;
      const mock = mockGlobalThis();
      globalThis.addEventListener = mock.addEventListener as typeof globalThis.addEventListener;

      const manager = createHotkeyManager();
      let called = false;

      manager.register("k", () => {
        called = true;
      }, "ctrl");

      const event = createKeyboardEvent("k", { ctrlKey: true });
      mock.dispatchEvent(event);

      assertEquals(called, true);
      globalThis.addEventListener = originalAddEventListener;
    });

    it("should support Alt key when specified", () => {
      const originalAddEventListener = globalThis.addEventListener;
      const mock = mockGlobalThis();
      globalThis.addEventListener = mock.addEventListener as typeof globalThis.addEventListener;

      const manager = createHotkeyManager();
      let called = false;

      manager.register("m", () => {
        called = true;
      }, "alt");

      const event = createKeyboardEvent("m", { altKey: true });
      mock.dispatchEvent(event);

      assertEquals(called, true);
      globalThis.addEventListener = originalAddEventListener;
    });

    it("should be case insensitive", () => {
      const originalAddEventListener = globalThis.addEventListener;
      const mock = mockGlobalThis();
      globalThis.addEventListener = mock.addEventListener as typeof globalThis.addEventListener;

      const manager = createHotkeyManager();
      let called = false;

      manager.register("P", () => {
        called = true;
      });

      const event = createKeyboardEvent("p");
      mock.dispatchEvent(event);

      assertEquals(called, true);
      globalThis.addEventListener = originalAddEventListener;
    });

    it("should handle multiple registrations", () => {
      const originalAddEventListener = globalThis.addEventListener;
      const mock = mockGlobalThis();
      globalThis.addEventListener = mock.addEventListener as typeof globalThis.addEventListener;

      const manager = createHotkeyManager();
      let pCalled = false;
      let rCalled = false;

      manager.register("p", () => {
        pCalled = true;
      });
      manager.register("r", () => {
        rCalled = true;
      });

      mock.dispatchEvent(createKeyboardEvent("p"));
      assertEquals(pCalled, true);
      assertEquals(rCalled, false);

      pCalled = false;
      mock.dispatchEvent(createKeyboardEvent("r"));
      assertEquals(pCalled, false);
      assertEquals(rCalled, true);

      globalThis.addEventListener = originalAddEventListener;
    });

    it("should overwrite existing handler for same key", () => {
      const originalAddEventListener = globalThis.addEventListener;
      const mock = mockGlobalThis();
      globalThis.addEventListener = mock.addEventListener as typeof globalThis.addEventListener;

      const manager = createHotkeyManager();
      let firstCalled = false;
      let secondCalled = false;

      manager.register("p", () => {
        firstCalled = true;
      });
      manager.register("p", () => {
        secondCalled = true;
      });

      mock.dispatchEvent(createKeyboardEvent("p"));

      assertEquals(firstCalled, false);
      assertEquals(secondCalled, true);

      globalThis.addEventListener = originalAddEventListener;
    });
  });

  describe("event prevention", () => {
    it("should prevent default when handler exists", () => {
      const originalAddEventListener = globalThis.addEventListener;
      const mock = mockGlobalThis();
      globalThis.addEventListener = mock.addEventListener as typeof globalThis.addEventListener;

      const manager = createHotkeyManager();
      manager.register("p", () => {});

      const event = createKeyboardEvent("p");
      mock.dispatchEvent(event);

      assertEquals(event.defaultPrevented, true);
      globalThis.addEventListener = originalAddEventListener;
    });

    it("should not prevent default for unregistered keys", () => {
      const originalAddEventListener = globalThis.addEventListener;
      const mock = mockGlobalThis();
      globalThis.addEventListener = mock.addEventListener as typeof globalThis.addEventListener;

      const manager = createHotkeyManager();
      manager.register("p", () => {});

      const event = createKeyboardEvent("x");
      mock.dispatchEvent(event);

      assertEquals(event.defaultPrevented, false);
      globalThis.addEventListener = originalAddEventListener;
    });
  });

  describe("unregistration", () => {
    it("should remove handler", () => {
      const originalAddEventListener = globalThis.addEventListener;
      const mock = mockGlobalThis();
      globalThis.addEventListener = mock.addEventListener as typeof globalThis.addEventListener;

      const manager = createHotkeyManager();
      let called = false;

      manager.register("p", () => {
        called = true;
      });
      manager.unregister("p");

      mock.dispatchEvent(createKeyboardEvent("p"));
      assertEquals(called, false);

      globalThis.addEventListener = originalAddEventListener;
    });

    it("should be case insensitive", () => {
      const originalAddEventListener = globalThis.addEventListener;
      const mock = mockGlobalThis();
      globalThis.addEventListener = mock.addEventListener as typeof globalThis.addEventListener;

      const manager = createHotkeyManager();
      let called = false;

      manager.register("p", () => {
        called = true;
      });
      manager.unregister("P");

      mock.dispatchEvent(createKeyboardEvent("p"));
      assertEquals(called, false);

      globalThis.addEventListener = originalAddEventListener;
    });

    it("should unregister ctrl handlers correctly", () => {
      const originalAddEventListener = globalThis.addEventListener;
      const mock = mockGlobalThis();
      globalThis.addEventListener = mock.addEventListener as typeof globalThis.addEventListener;

      const manager = createHotkeyManager();
      let called = false;

      manager.register("k", () => {
        called = true;
      }, "ctrl");
      manager.unregister("k", "ctrl");

      mock.dispatchEvent(createKeyboardEvent("k", { ctrlKey: true }));
      assertEquals(called, false);

      globalThis.addEventListener = originalAddEventListener;
    });
  });

  // Note: Input focus detection tests are skipped because DOM classes (HTMLInputElement, etc.)
  // are not available in Deno's test environment. This functionality is tested manually in the browser.
});
