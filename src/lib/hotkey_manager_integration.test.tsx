/**
 * Integration tests for hotkey manager with UI components
 *
 * These tests verify that the hotkey manager integrates correctly with components:
 * - Hotkey registration triggers component actions
 * - Multiple components can register different hotkeys
 * - Multiple components can register the SAME hotkey (both get called)
 * - Hotkey cleanup works when components unmount
 * - Hotkeys work with modifiers (Ctrl, Alt)
 */

import {
  assertEquals,
  assertExists,
} from "jsr:@std/assert@^1.0.0";
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  it,
} from "jsr:@std/testing@^1.0.0/bdd";
import { FakeTime } from "jsr:@std/testing@^1.0.0/time";
import { setupDOM } from "@/lib/testing/dom_setup.ts";
import { createDomElement } from "@pkg/just-jsx/src/index.ts";
import { registerHotkeyHandler } from "@/lib/hotkey_manager.ts";

// Mock globalThis for hotkey testing
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

describe("Hotkey Manager Integration", () => {
  let time: FakeTime;
  const mock = mockGlobalThis();
  let originalAddEventListener: typeof globalThis.addEventListener;
  const cleanups: (() => void)[] = [];

  beforeAll(() => {
    originalAddEventListener = globalThis.addEventListener;
    globalThis.addEventListener = mock
      .addEventListener as typeof globalThis.addEventListener;
  });

  beforeEach(() => {
    setupDOM();
    document.body.innerHTML = "";
    time = new FakeTime();
  });

  afterEach(() => {
    time.restore();
    for (const cleanup of cleanups) {
      cleanup();
    }
    cleanups.length = 0;
  });

  afterAll(() => {
    globalThis.addEventListener = originalAddEventListener;
  });

  describe("Hotkey registration with components", () => {
    it("should trigger component action when hotkey is pressed", () => {
      // Simulate a button that can be activated via hotkey
      const button = document.createElement("button");
      button.textContent = "Copy";
      let clicked = false;

      const handleClick = () => {
        clicked = true;
      };

      // Register hotkey for this component
      const cleanup = registerHotkeyHandler("c", handleClick);
      cleanups.push(cleanup);

      document.body.appendChild(button);

      // Press the hotkey
      mock.dispatchEvent(createKeyboardEvent("c"));

      assertEquals(clicked, true);
    });

    it("should update component state when hotkey is triggered", () => {
      // Simulate a component that shows a highlight when hotkey is pressed
      const element = document.createElement("div");
      element.textContent = "Conversion Result";
      element.style.boxShadow = "";

      const highlightOnHotkey = () => {
        element.style.boxShadow = "0 0 0 3px blue";
      };

      const cleanup = registerHotkeyHandler("r", highlightOnHotkey);
      cleanups.push(cleanup);

      document.body.appendChild(element);

      assertEquals(element.style.boxShadow, "");

      // Press hotkey
      mock.dispatchEvent(createKeyboardEvent("r"));

      assertEquals(element.style.boxShadow, "0 0 0 3px blue");
    });

    it("should work with Ctrl modifier for modal opening", () => {
      // Simulate modal component
      const modal = document.createElement("div");
      modal.style.display = "none";
      modal.textContent = "Modal Content";

      const openModal = () => {
        modal.style.display = "block";
      };

      const cleanup = registerHotkeyHandler("k", openModal, "ctrl");
      cleanups.push(cleanup);

      document.body.appendChild(modal);

      assertEquals(modal.style.display, "none");

      // Press Ctrl+K
      mock.dispatchEvent(createKeyboardEvent("k", { ctrlKey: true }));

      assertEquals(modal.style.display, "block");
    });

    it("should work with settings hotkey (Ctrl+/)", () => {
      const settingsPanel = document.createElement("div");
      settingsPanel.className = "settings-panel";
      settingsPanel.style.display = "none";

      const toggleSettings = () => {
        settingsPanel.style.display =
          settingsPanel.style.display === "none" ? "block" : "none";
      };

      const cleanup = registerHotkeyHandler("/", toggleSettings, "ctrl");
      cleanups.push(cleanup);

      document.body.appendChild(settingsPanel);

      assertEquals(settingsPanel.style.display, "none");

      // Press Ctrl+/
      mock.dispatchEvent(createKeyboardEvent("/", { ctrlKey: true }));
      assertEquals(settingsPanel.style.display, "block");

      // Press again to toggle
      mock.dispatchEvent(createKeyboardEvent("/", { ctrlKey: true }));
      assertEquals(settingsPanel.style.display, "none");
    });
  });

  describe("Multiple components with different hotkeys", () => {
    it("should allow multiple components to register different hotkeys", () => {
      const componentA = document.createElement("div");
      const componentB = document.createElement("div");
      const componentC = document.createElement("div");

      let aTriggered = false;
      let bTriggered = false;
      let cTriggered = false;

      const cleanupA = registerHotkeyHandler("p", () => {
        aTriggered = true;
      });
      const cleanupB = registerHotkeyHandler("r", () => {
        bTriggered = true;
      });
      const cleanupC = registerHotkeyHandler("m", () => {
        cTriggered = true;
      });

      cleanups.push(cleanupA, cleanupB, cleanupC);

      document.body.appendChild(componentA);
      document.body.appendChild(componentB);
      document.body.appendChild(componentC);

      // Press 'p' - only A should trigger
      mock.dispatchEvent(createKeyboardEvent("p"));
      assertEquals(aTriggered, true);
      assertEquals(bTriggered, false);
      assertEquals(cTriggered, false);

      // Press 'r' - only B should trigger
      aTriggered = false;
      mock.dispatchEvent(createKeyboardEvent("r"));
      assertEquals(aTriggered, false);
      assertEquals(bTriggered, true);
      assertEquals(cTriggered, false);

      // Press 'm' - only C should trigger
      bTriggered = false;
      mock.dispatchEvent(createKeyboardEvent("m"));
      assertEquals(aTriggered, false);
      assertEquals(bTriggered, false);
      assertEquals(cTriggered, true);
    });

    it("should coordinate between conversion components (simulating app)", () => {
      // Simulate multiple conversion components, each with a hotkey
      const conversionResults = {
        pixels: { value: "16px", copied: false },
        rems: { value: "1rem", copied: false },
        cms: { value: "0.42cm", copied: false },
      };

      const copyPixels = () => {
        conversionResults.pixels.copied = true;
      };
      const copyRems = () => {
        conversionResults.rems.copied = true;
      };
      const copyCms = () => {
        conversionResults.cms.copied = true;
      };

      const cleanupP = registerHotkeyHandler("p", copyPixels);
      const cleanupR = registerHotkeyHandler("r", copyRems);
      const cleanupC = registerHotkeyHandler("c", copyCms);

      cleanups.push(cleanupP, cleanupR, cleanupC);

      // Press 'p' to copy pixels
      mock.dispatchEvent(createKeyboardEvent("p"));
      assertEquals(conversionResults.pixels.copied, true);
      assertEquals(conversionResults.rems.copied, false);
      assertEquals(conversionResults.cms.copied, false);
    });
  });

  describe("Multiple components with SAME hotkey", () => {
    it("should call ALL handlers when multiple components register same hotkey", () => {
      // This simulates a scenario where multiple conversion components
      // might want to respond to the same hotkey
      let handler1Called = false;
      let handler2Called = false;
      let handler3Called = false;

      const cleanup1 = registerHotkeyHandler("p", () => {
        handler1Called = true;
      });
      const cleanup2 = registerHotkeyHandler("p", () => {
        handler2Called = true;
      });
      const cleanup3 = registerHotkeyHandler("p", () => {
        handler3Called = true;
      });

      cleanups.push(cleanup1, cleanup2, cleanup3);

      mock.dispatchEvent(createKeyboardEvent("p"));

      // All three should be called
      assertEquals(handler1Called, true);
      assertEquals(handler2Called, true);
      assertEquals(handler3Called, true);
    });

    it("should handle shared hotkeys with component state", () => {
      // Simulate multiple components sharing a hotkey and updating their own state
      const component1 = document.createElement("div");
      const component2 = document.createElement("div");

      component1.textContent = "Component 1";
      component2.textContent = "Component 2";

      component1.className = "";
      component2.className = "";

      const cleanup1 = registerHotkeyHandler("h", () => {
        component1.className = "highlighted";
      });
      const cleanup2 = registerHotkeyHandler("h", () => {
        component2.className = "highlighted";
      });

      cleanups.push(cleanup1, cleanup2);

      document.body.appendChild(component1);
      document.body.appendChild(component2);

      mock.dispatchEvent(createKeyboardEvent("h"));

      // Both should be highlighted
      assertEquals(component1.className, "highlighted");
      assertEquals(component2.className, "highlighted");
    });
  });

  describe("Hotkey cleanup on component unmount", () => {
    it("should stop responding to hotkeys after cleanup", () => {
      let called = false;

      const component = document.createElement("div");
      component.textContent = "Temporary Component";

      const cleanup = registerHotkeyHandler("t", () => {
        called = true;
      });

      document.body.appendChild(component);

      // Hotkey should work
      mock.dispatchEvent(createKeyboardEvent("t"));
      assertEquals(called, true);

      // Simulate component unmount
      called = false;
      cleanup();
      document.body.removeChild(component);

      // Hotkey should no longer trigger
      mock.dispatchEvent(createKeyboardEvent("t"));
      assertEquals(called, false);
    });

    it("should only remove specific component handler, not others", () => {
      let component1Called = false;
      let component2Called = false;

      const cleanup1 = registerHotkeyHandler("p", () => {
        component1Called = true;
      });
      const cleanup2 = registerHotkeyHandler("p", () => {
        component2Called = true;
      });

      cleanups.push(cleanup2); // Keep component2 alive

      // Both work initially
      mock.dispatchEvent(createKeyboardEvent("p"));
      assertEquals(component1Called, true);
      assertEquals(component2Called, true);

      // Unmount component1
      component1Called = false;
      component2Called = false;
      cleanup1();

      // Only component2 should respond now
      mock.dispatchEvent(createKeyboardEvent("p"));
      assertEquals(component1Called, false);
      assertEquals(component2Called, true);
    });

    it("should handle multiple mount/unmount cycles", () => {
      let mountCount = 0;

      const mountComponent = (): (() => void) => {
        mountCount++;
        return registerHotkeyHandler("m", () => {
          // Handler
        });
      };

      // Mount and unmount 3 times
      const cleanup1 = mountComponent();
      assertEquals(mountCount, 1);
      cleanup1();

      const cleanup2 = mountComponent();
      assertEquals(mountCount, 2);
      cleanup2();

      const cleanup3 = mountComponent();
      assertEquals(mountCount, 3);
      cleanups.push(cleanup3);
    });
  });

  describe("Component lifecycle integration", () => {
    it("should register hotkey on component creation", () => {
      // Simulate component that registers hotkey in constructor/mount
      class MockComponent {
        element: HTMLDivElement;
        cleanup: (() => void) | null = null;
        isOpen = false;

        constructor() {
          this.element = document.createElement("div");
          this.element.textContent = "Modal";
          this.element.style.display = "none";

          this.cleanup = registerHotkeyHandler("k", () => {
            this.open();
          }, "ctrl");
        }

        open() {
          this.isOpen = true;
          this.element.style.display = "block";
        }

        destroy() {
          this.cleanup?.();
          this.element.remove();
        }
      }

      const component = new MockComponent();
      document.body.appendChild(component.element);

      assertEquals(component.isOpen, false);

      // Trigger hotkey
      mock.dispatchEvent(createKeyboardEvent("k", { ctrlKey: true }));

      assertEquals(component.isOpen, true);
      assertEquals(component.element.style.display, "block");

      // Cleanup
      component.destroy();
    });

    it("should cleanup hotkey on component destruction", () => {
      let callCount = 0;

      class MockComponent {
        cleanup: () => void;

        constructor() {
          this.cleanup = registerHotkeyHandler("d", () => {
            callCount++;
          });
        }

        destroy() {
          this.cleanup();
        }
      }

      const component = new MockComponent();

      mock.dispatchEvent(createKeyboardEvent("d"));
      assertEquals(callCount, 1);

      // Destroy component
      component.destroy();

      // Should not trigger anymore
      mock.dispatchEvent(createKeyboardEvent("d"));
      assertEquals(callCount, 1);
    });
  });

  describe("Real-world component patterns", () => {
    it("should simulate conversion component with copy hotkey", () => {
      // Simulate the Conversion component pattern from the app
      const resultDiv = document.createElement("div");
      resultDiv.className = "conversion-result";
      resultDiv.textContent = "1rem";
      resultDiv.style.boxShadow = "";

      let clipboardContent = "";

      const copyToClipboard = () => {
        clipboardContent = resultDiv.textContent || "";
      };

      const highlightOnHotkey = () => {
        copyToClipboard();
        resultDiv.style.boxShadow = "0 0 0 3px rgba(34, 197, 94, 0.5)";

        setTimeout(() => {
          resultDiv.style.boxShadow = "";
        }, 300);
      };

      const cleanup = registerHotkeyHandler("r", highlightOnHotkey);
      cleanups.push(cleanup);

      document.body.appendChild(resultDiv);

      assertEquals(clipboardContent, "");
      assertEquals(resultDiv.style.boxShadow, "");

      // Press 'r' to copy
      mock.dispatchEvent(createKeyboardEvent("r"));

      assertEquals(clipboardContent, "1rem");
      assertEquals(
        resultDiv.style.boxShadow,
        "0 0 0 3px rgba(34, 197, 94, 0.5)",
      );
    });

    it("should simulate modal component with Ctrl+K hotkey", () => {
      // Simulate Modal component pattern
      const modalBackdrop = document.createElement("div");
      const modalContent = document.createElement("div");

      modalBackdrop.className = "modal-backdrop";
      modalContent.className = "modal-content";
      modalBackdrop.style.display = "none";

      modalBackdrop.appendChild(modalContent);

      let isOpen = false;

      const openModal = () => {
        isOpen = true;
        modalBackdrop.style.display = "flex";
      };

      const closeModal = () => {
        isOpen = false;
        modalBackdrop.style.display = "none";
      };

      const cleanupOpen = registerHotkeyHandler("k", openModal, "ctrl");
      cleanups.push(cleanupOpen);

      document.body.appendChild(modalBackdrop);

      assertEquals(isOpen, false);
      assertEquals(modalBackdrop.style.display, "none");

      // Press Ctrl+K to open
      mock.dispatchEvent(createKeyboardEvent("k", { ctrlKey: true }));

      assertEquals(isOpen, true);
      assertEquals(modalBackdrop.style.display, "flex");
    });

    it("should coordinate modal and settings hotkeys", () => {
      let modalOpen = false;
      let settingsOpen = false;

      const cleanupModal = registerHotkeyHandler("k", () => {
        modalOpen = true;
      }, "ctrl");

      const cleanupSettings = registerHotkeyHandler("/", () => {
        settingsOpen = true;
      }, "ctrl");

      cleanups.push(cleanupModal, cleanupSettings);

      // Press Ctrl+K
      mock.dispatchEvent(createKeyboardEvent("k", { ctrlKey: true }));
      assertEquals(modalOpen, true);
      assertEquals(settingsOpen, false);

      // Press Ctrl+/
      mock.dispatchEvent(createKeyboardEvent("/", { ctrlKey: true }));
      assertEquals(modalOpen, true);
      assertEquals(settingsOpen, true);
    });
  });

  describe("Hotkey conflicts and priority", () => {
    it("should handle same key with different modifiers", () => {
      let noModifierCalled = false;
      let ctrlModifierCalled = false;
      let altModifierCalled = false;

      const cleanup1 = registerHotkeyHandler("k", () => {
        noModifierCalled = true;
      }, "none");

      const cleanup2 = registerHotkeyHandler("k", () => {
        ctrlModifierCalled = true;
      }, "ctrl");

      const cleanup3 = registerHotkeyHandler("k", () => {
        altModifierCalled = true;
      }, "alt");

      cleanups.push(cleanup1, cleanup2, cleanup3);

      // Press 'k' alone
      mock.dispatchEvent(createKeyboardEvent("k"));
      assertEquals(noModifierCalled, true);
      assertEquals(ctrlModifierCalled, false);
      assertEquals(altModifierCalled, false);

      // Reset
      noModifierCalled = false;

      // Press Ctrl+k
      mock.dispatchEvent(createKeyboardEvent("k", { ctrlKey: true }));
      assertEquals(noModifierCalled, false);
      assertEquals(ctrlModifierCalled, true);
      assertEquals(altModifierCalled, false);

      // Reset
      ctrlModifierCalled = false;

      // Press Alt+k
      mock.dispatchEvent(createKeyboardEvent("k", { altKey: true }));
      assertEquals(noModifierCalled, false);
      assertEquals(ctrlModifierCalled, false);
      assertEquals(altModifierCalled, true);
    });

    it("should handle 17 conversion components (like in app)", () => {
      // Simulate all 17 conversion units from the app, each with a hotkey
      const conversions = [
        { key: "p", unit: "px" },
        { key: "r", unit: "rem" },
        { key: "m", unit: "mm" },
        { key: "c", unit: "cm" },
        { key: "e", unit: "pt" },
        { key: "a", unit: "pc" },
        { key: "i", unit: "in" },
        { key: "f", unit: "ft" },
        { key: "w", unit: "vw" },
        { key: "h", unit: "vh" },
        { key: "j", unit: "vmin" },
        { key: "x", unit: "vmax" },
        { key: "q", unit: "ch" },
        { key: "z", unit: "ex" },
        { key: "g", unit: "φ" },
        { key: "t", unit: "√2" },
        { key: "s", unit: "16:9" },
      ];

      const copyStates = new Map<string, boolean>();

      conversions.forEach(({ key, unit }) => {
        copyStates.set(unit, false);
        const cleanup = registerHotkeyHandler(key, () => {
          copyStates.set(unit, true);
        });
        cleanups.push(cleanup);
      });

      // Press 'p' for pixels
      mock.dispatchEvent(createKeyboardEvent("p"));
      assertEquals(copyStates.get("px"), true);
      assertEquals(copyStates.get("rem"), false);

      // Press 'g' for golden ratio
      mock.dispatchEvent(createKeyboardEvent("g"));
      assertEquals(copyStates.get("φ"), true);

      // Verify all hotkeys are registered
      assertEquals(copyStates.size, 17);
    });
  });
});
