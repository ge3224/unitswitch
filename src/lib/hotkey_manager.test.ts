import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  it,
} from "jsr:@std/testing/bdd";
import { assertEquals } from "jsr:@std/assert";
import { registerHotkeyHandler } from "@/lib/hotkey_manager.ts";
import { newSimpleState } from "@pkg/simple-state/src/index.ts";

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

describe("hotkey_manager", () => {
  const mock = mockGlobalThis();
  let originalAddEventListener: typeof globalThis.addEventListener;
  const cleanups: (() => void)[] = [];

  beforeAll(() => {
    originalAddEventListener = globalThis.addEventListener;
    globalThis.addEventListener = mock
      .addEventListener as typeof globalThis.addEventListener;
  });

  afterEach(() => {
    for (const cleanup of cleanups) {
      cleanup();
    }
    cleanups.length = 0;
  });

  afterAll(() => {
    globalThis.addEventListener = originalAddEventListener;
  });

  describe("cleanup", () => {
    it("should remove handler via cleanup function", () => {
      let called = false;
      const cleanup = registerHotkeyHandler("p", () => {
        called = true;
      });
      cleanup();

      mock.dispatchEvent(createKeyboardEvent("p"));
      assertEquals(called, false);
    });

    it("should be case insensitive for cleanup", () => {
      let called = false;
      const cleanup = registerHotkeyHandler("P", () => {
        called = true;
      });
      cleanup();

      mock.dispatchEvent(createKeyboardEvent("p"));
      assertEquals(called, false);
    });

    it("should cleanup ctrl handlers correctly", () => {
      let called = false;
      const cleanup = registerHotkeyHandler("k", () => {
        called = true;
      }, "ctrl");
      cleanup();

      mock.dispatchEvent(createKeyboardEvent("k", { ctrlKey: true }));
      assertEquals(called, false);
    });

    it("should only remove specific handler when multiple registered", () => {
      let firstCalled = false;
      let secondCalled = false;

      const cleanup1 = registerHotkeyHandler("p", () => {
        firstCalled = true;
      });
      const cleanup2 = registerHotkeyHandler("p", () => {
        secondCalled = true;
      });
      cleanups.push(cleanup2);

      cleanup1();

      mock.dispatchEvent(createKeyboardEvent("p"));
      assertEquals(firstCalled, false);
      assertEquals(secondCalled, true);
    });
  });

  describe("registration", () => {
    it("should register and trigger handler for single keys", () => {
      let called = false;
      const cleanup = registerHotkeyHandler("p", () => {
        called = true;
      });
      cleanups.push(cleanup);

      const event = createKeyboardEvent("p");
      mock.dispatchEvent(event);
      assertEquals(called, true);
    });

    it("should not trigger when modifier keys are pressed", () => {
      let called = false;
      const cleanup = registerHotkeyHandler("p", () => {
        called = true;
      });
      cleanups.push(cleanup);

      const event = createKeyboardEvent("p", { ctrlKey: true });
      mock.dispatchEvent(event);
      assertEquals(called, false);
    });

    it("should support Ctrl key when specified", () => {
      let called = false;
      const cleanup = registerHotkeyHandler("k", () => {
        called = true;
      }, "ctrl");
      cleanups.push(cleanup);

      const event = createKeyboardEvent("k", { ctrlKey: true });
      mock.dispatchEvent(event);
      assertEquals(called, true);
    });

    it("should support Alt key when specified", () => {
      let called = false;
      const cleanup = registerHotkeyHandler("m", () => {
        called = true;
      }, "alt");
      cleanups.push(cleanup);

      const event = createKeyboardEvent("m", { altKey: true });
      mock.dispatchEvent(event);
      assertEquals(called, true);
    });

    it("should be case insensitive", () => {
      let called = false;
      const cleanup = registerHotkeyHandler("P", () => {
        called = true;
      });
      cleanups.push(cleanup);

      const event = createKeyboardEvent("p");
      mock.dispatchEvent(event);
      assertEquals(called, true);
    });

    it("should handle multiple registrations", () => {
      let pCalled = false;
      let rCalled = false;

      const cleanup1 = registerHotkeyHandler("p", () => {
        pCalled = true;
      });
      cleanups.push(cleanup1);

      const cleanup2 = registerHotkeyHandler("r", () => {
        rCalled = true;
      });
      cleanups.push(cleanup2);

      mock.dispatchEvent(createKeyboardEvent("p"));
      assertEquals(pCalled, true);
      assertEquals(rCalled, false);

      pCalled = false;
      mock.dispatchEvent(createKeyboardEvent("r"));
      assertEquals(pCalled, false);
      assertEquals(rCalled, true);
    });

    it("should call BOTH handlers when same key registered twice", () => {
      let firstCalled = false;
      let secondCalled = false;

      const cleanup1 = registerHotkeyHandler("p", () => {
        firstCalled = true;
      });
      cleanups.push(cleanup1);

      const cleanup2 = registerHotkeyHandler("p", () => {
        secondCalled = true;
      });
      cleanups.push(cleanup2);

      mock.dispatchEvent(createKeyboardEvent("p"));
      assertEquals(firstCalled, true);
      assertEquals(secondCalled, true);
    });
  });

  describe("event prevention", () => {
    it("should prevent default when handler exists", () => {
      const cleanup = registerHotkeyHandler("p", () => {});
      cleanups.push(cleanup);

      const event = createKeyboardEvent("p");
      mock.dispatchEvent(event);
      assertEquals(event.defaultPrevented, true);
    });

    it("should not prevent default for unregistered keys", () => {
      const cleanup = registerHotkeyHandler("p", () => {});
      cleanups.push(cleanup);

      const event = createKeyboardEvent("x");
      mock.dispatchEvent(event);
      assertEquals(event.defaultPrevented, false);
    });
  });
});
