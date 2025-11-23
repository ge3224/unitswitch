/**
 * Integration tests for state management with UI components
 *
 * These tests verify that simple-state integrates correctly with just-jsx components:
 * - State updates trigger component re-renders
 * - Multiple components can subscribe to the same state
 * - State cleanup works properly
 * - State synchronization across components
 */

import {
  assertEquals,
  assertExists,
  assertNotEquals,
} from "jsr:@std/assert@^1.0.0";
import {
  afterEach,
  beforeEach,
  describe,
  it,
} from "jsr:@std/testing@^1.0.0/bdd";
import { FakeTime } from "jsr:@std/testing@^1.0.0/time";
import { setupDOM } from "@/lib/testing/dom_setup.ts";
import { createDomElement } from "@pkg/just-jsx/src/index.ts";
import { newSimpleState, SimpleState } from "@pkg/simple-state/src/index.ts";

describe("State Management Integration", () => {
  let time: FakeTime;

  beforeEach(() => {
    setupDOM();
    document.body.innerHTML = "";
    time = new FakeTime();
  });

  afterEach(() => {
    time.restore();
  });

  describe("State updates trigger component re-renders", () => {
    it("should update text content when state changes", async () => {
      const countState = newSimpleState<number>(0);
      const display = document.createElement("div");
      display.textContent = `Count: ${countState.get()}`;
      document.body.appendChild(display);

      // Subscribe to update display
      countState.subscribe((newCount: number) => {
        display.textContent = `Count: ${newCount}`;
      });

      assertEquals(display.textContent, "Count: 0");

      // Update state
      countState.set(5);

      // Wait for microtask (state uses queueMicrotask)
      await Promise.resolve();

      assertEquals(display.textContent, "Count: 5");
    });

    it("should update DOM attributes when state changes", async () => {
      const valueState = newSimpleState<string>("initial");
      const input = document.createElement("input");
      input.value = valueState.get();
      document.body.appendChild(input);

      valueState.subscribe((newValue: string) => {
        input.value = newValue;
      });

      assertEquals(input.value, "initial");

      valueState.set("updated");
      await Promise.resolve();

      assertEquals(input.value, "updated");
    });

    it("should update visibility when state changes", async () => {
      const visibleState = newSimpleState<boolean>(true);
      const element = document.createElement("div");
      element.style.display = visibleState.get() ? "block" : "none";
      document.body.appendChild(element);

      visibleState.subscribe((isVisible: boolean) => {
        element.style.display = isVisible ? "block" : "none";
      });

      assertEquals(element.style.display, "block");

      visibleState.set(false);
      await Promise.resolve();

      assertEquals(element.style.display, "none");
    });
  });

  describe("Multiple subscribers to same state", () => {
    it("should notify all subscribers when state changes", async () => {
      const state = newSimpleState<number>(10);
      const updates: number[] = [];

      // Add multiple subscribers
      state.subscribe((value: number) => updates.push(value * 1));
      state.subscribe((value: number) => updates.push(value * 2));
      state.subscribe((value: number) => updates.push(value * 3));

      state.set(5);
      await Promise.resolve();

      // All three subscribers should have been called
      assertEquals(updates.length, 3);
      assertEquals(updates, [5, 10, 15]);
    });

    it("should update multiple components from same state", async () => {
      const countState = newSimpleState<number>(0);

      // Create multiple displays
      const display1 = document.createElement("div");
      const display2 = document.createElement("div");
      const display3 = document.createElement("div");

      display1.textContent = `Display 1: ${countState.get()}`;
      display2.textContent = `Display 2: ${countState.get()}`;
      display3.textContent = `Display 3: ${countState.get()}`;

      document.body.appendChild(display1);
      document.body.appendChild(display2);
      document.body.appendChild(display3);

      // Subscribe all displays
      countState.subscribe((count: number) => {
        display1.textContent = `Display 1: ${count}`;
      });
      countState.subscribe((count: number) => {
        display2.textContent = `Display 2: ${count}`;
      });
      countState.subscribe((count: number) => {
        display3.textContent = `Display 3: ${count}`;
      });

      countState.set(42);
      await Promise.resolve();

      assertEquals(display1.textContent, "Display 1: 42");
      assertEquals(display2.textContent, "Display 2: 42");
      assertEquals(display3.textContent, "Display 3: 42");
    });

    it("should maintain subscriber order", async () => {
      const state = newSimpleState<number>(0);
      const order: string[] = [];

      state.subscribe(() => order.push("first"));
      state.subscribe(() => order.push("second"));
      state.subscribe(() => order.push("third"));

      state.set(1);
      await Promise.resolve();

      assertEquals(order, ["first", "second", "third"]);
    });
  });

  describe("State cleanup and unsubscribe", () => {
    it("should stop receiving updates after unsubscribe", async () => {
      const state = newSimpleState<number>(0);
      let callCount = 0;

      const subscriptionId = state.subscribe(() => {
        callCount++;
      });

      state.set(1);
      await Promise.resolve();
      assertEquals(callCount, 1);

      // Unsubscribe
      state.unsubscribe(subscriptionId);

      state.set(2);
      await Promise.resolve();

      // Should not have been called again
      assertEquals(callCount, 1);
    });

    it("should allow selective unsubscribe with multiple subscribers", async () => {
      const state = newSimpleState<number>(0);
      const counts = { a: 0, b: 0, c: 0 };

      const subA = state.subscribe(() => counts.a++);
      const subB = state.subscribe(() => counts.b++);
      const subC = state.subscribe(() => counts.c++);

      state.set(1);
      await Promise.resolve();
      assertEquals(counts, { a: 1, b: 1, c: 1 });

      // Unsubscribe B only
      state.unsubscribe(subB);

      state.set(2);
      await Promise.resolve();

      assertEquals(counts.a, 2);
      assertEquals(counts.b, 1); // Should not have updated
      assertEquals(counts.c, 2);
    });

    it("should clean up component subscriptions on unmount", async () => {
      const state = newSimpleState<string>("initial");
      const container = document.createElement("div");
      document.body.appendChild(container);

      // Simulate component mount
      const component = document.createElement("div");
      component.textContent = state.get();
      container.appendChild(component);

      const subId = state.subscribe((value: string) => {
        component.textContent = value;
      });

      state.set("mounted");
      await Promise.resolve();
      assertEquals(component.textContent, "mounted");

      // Simulate component unmount
      state.unsubscribe(subId);
      container.removeChild(component);

      state.set("unmounted");
      await Promise.resolve();

      // Component should not have updated
      assertEquals(component.textContent, "mounted");
    });
  });

  describe("Cross-component state synchronization", () => {
    it("should synchronize input and display components", async () => {
      const valueState = newSimpleState<string>("");

      const input = document.createElement("input");
      input.type = "text";
      input.value = valueState.get();

      const display = document.createElement("div");
      display.textContent = valueState.get();

      document.body.appendChild(input);
      document.body.appendChild(display);

      // Subscribe display to state
      valueState.subscribe((value: string) => {
        display.textContent = value;
      });

      // Simulate user input
      input.value = "Hello, World!";
      valueState.set(input.value);

      await Promise.resolve();

      assertEquals(display.textContent, "Hello, World!");
    });

    it("should coordinate multiple dependent states", async () => {
      // Simulate input state and conversion state (like the app)
      const inputState = newSimpleState<number>(16);
      const remState = newSimpleState<number>(1); // 16px = 1rem

      // Subscribe remState to inputState changes
      inputState.subscribe((pixels: number) => {
        const rems = pixels / 16;
        remState.set(rems);
      });

      const pixelDisplay = document.createElement("div");
      const remDisplay = document.createElement("div");

      pixelDisplay.textContent = `${inputState.get()}px`;
      remDisplay.textContent = `${remState.get()}rem`;

      document.body.appendChild(pixelDisplay);
      document.body.appendChild(remDisplay);

      inputState.subscribe((px: number) => {
        pixelDisplay.textContent = `${px}px`;
      });

      remState.subscribe((rem: number) => {
        remDisplay.textContent = `${rem}rem`;
      });

      // Update input
      inputState.set(32);
      await Promise.resolve();
      await Promise.resolve(); // Need two awaits for chained state updates

      assertEquals(pixelDisplay.textContent, "32px");
      assertEquals(remDisplay.textContent, "2rem");
    });

    it("should handle state changes from multiple sources", async () => {
      const countState = newSimpleState<number>(0);
      const display = document.createElement("div");
      display.textContent = `Count: ${countState.get()}`;
      document.body.appendChild(display);

      countState.subscribe((count: number) => {
        display.textContent = `Count: ${count}`;
      });

      // Create multiple buttons that update the same state
      const incrementBtn = document.createElement("button");
      const decrementBtn = document.createElement("button");
      const resetBtn = document.createElement("button");

      incrementBtn.onclick = () => countState.set(countState.get() + 1);
      decrementBtn.onclick = () => countState.set(countState.get() - 1);
      resetBtn.onclick = () => countState.set(0);

      document.body.appendChild(incrementBtn);
      document.body.appendChild(decrementBtn);
      document.body.appendChild(resetBtn);

      // Simulate clicks (deno-dom doesn't have .click(), so call onclick directly)
      incrementBtn.onclick?.({} as PointerEvent);
      await Promise.resolve();
      assertEquals(display.textContent, "Count: 1");

      incrementBtn.onclick?.({} as PointerEvent);
      await Promise.resolve();
      assertEquals(display.textContent, "Count: 2");

      decrementBtn.onclick?.({} as PointerEvent);
      await Promise.resolve();
      assertEquals(display.textContent, "Count: 1");

      resetBtn.onclick?.({} as PointerEvent);
      await Promise.resolve();
      assertEquals(display.textContent, "Count: 0");
    });
  });

  describe("State with complex data types", () => {
    it("should handle object state changes", async () => {
      type User = { name: string; age: number };
      const userState = newSimpleState<User>({ name: "Alice", age: 30 });

      const display = document.createElement("div");
      const user = userState.get();
      display.textContent = `${user.name}, ${user.age}`;
      document.body.appendChild(display);

      userState.subscribe((user: User) => {
        display.textContent = `${user.name}, ${user.age}`;
      });

      userState.set({ name: "Bob", age: 25 });
      await Promise.resolve();

      assertEquals(display.textContent, "Bob, 25");
    });

    it("should handle array state changes", async () => {
      const itemsState = newSimpleState<string[]>(["apple", "banana"]);

      const list = document.createElement("ul");
      document.body.appendChild(list);

      function renderList(items: string[]): void {
        list.innerHTML = "";
        items.forEach((item) => {
          const li = document.createElement("li");
          li.textContent = item;
          list.appendChild(li);
        });
      }

      renderList(itemsState.get());
      itemsState.subscribe(renderList);

      assertEquals(list.children.length, 2);

      itemsState.set(["apple", "banana", "cherry"]);
      await Promise.resolve();

      assertEquals(list.children.length, 3);
      assertEquals(list.children[2].textContent, "cherry");
    });

    it("should clone objects to prevent external mutation", async () => {
      type Config = { value: number };
      const configState = newSimpleState<Config>({ value: 10 });

      const config1 = configState.get();
      const config2 = configState.get();

      // Should be clones (not same reference)
      // Note: We can't use assertNotEquals because deno-dom may have issues with object equality
      // Instead, verify that mutations don't affect state
      config1.value = 999;

      // Getting state again should give original value, not mutated one
      const config3 = configState.get();
      assertEquals(config3.value, 10);
    });
  });

  describe("State batching and performance", () => {
    it("should batch multiple updates in single microtask", async () => {
      const state = newSimpleState<number>(0);
      let updateCount = 0;

      state.subscribe(() => {
        updateCount++;
      });

      // Multiple synchronous updates
      state.set(1);
      state.set(2);
      state.set(3);

      // Should not have notified yet
      assertEquals(updateCount, 0);

      await Promise.resolve();

      // Should have notified only once
      assertEquals(updateCount, 1);
    });

    it("should handle rapid state updates efficiently", async () => {
      const state = newSimpleState<number>(0);
      const updates: number[] = [];

      state.subscribe((value: number) => {
        updates.push(value);
      });

      // Rapid updates
      for (let i = 1; i <= 100; i++) {
        state.set(i);
      }

      await Promise.resolve();

      // Should have final value
      assertEquals(state.get(), 100);
      // Should have been notified once per microtask batch
      assertEquals(updates[updates.length - 1], 100);
    });
  });

  describe("Real-world integration patterns", () => {
    it("should simulate UserInput and Conversion component integration", async () => {
      // Simulate the pattern from app.tsx
      const inputState = newSimpleState<number>(16);
      const unitState = newSimpleState<string>("px");
      const conversionState = newSimpleState<string>("1rem");

      // Create mock components
      const inputElement = document.createElement("input");
      inputElement.type = "number";
      inputElement.value = String(inputState.get());

      const unitSelect = document.createElement("select");
      unitSelect.value = unitState.get();

      const conversionDisplay = document.createElement("div");
      conversionDisplay.textContent = conversionState.get();

      document.body.appendChild(inputElement);
      document.body.appendChild(unitSelect);
      document.body.appendChild(conversionDisplay);

      // Subscribe conversion to input changes
      inputState.subscribe((pixels: number) => {
        const rems = pixels / 16;
        conversionState.set(`${rems}rem`);
      });

      conversionState.subscribe((conversion: string) => {
        conversionDisplay.textContent = conversion;
      });

      // Simulate user input
      inputElement.value = "32";
      inputState.set(Number(inputElement.value));

      await Promise.resolve();
      await Promise.resolve(); // Need two awaits for chained state updates

      assertEquals(conversionDisplay.textContent, "2rem");
    });

    it("should simulate config state persistence pattern", async () => {
      type Config = { fontSize: number; viewportWidth: number };
      const configState = newSimpleState<Config>({
        fontSize: 16,
        viewportWidth: 1920,
      });

      const savedConfigs: Config[] = [];

      // Simulate localStorage save
      configState.subscribe((config: Config) => {
        savedConfigs.push(config);
      });

      configState.set({ fontSize: 18, viewportWidth: 1920 });
      await Promise.resolve();

      assertEquals(savedConfigs.length, 1);
      assertEquals(savedConfigs[0].fontSize, 18);

      configState.set({ fontSize: 18, viewportWidth: 1280 });
      await Promise.resolve();

      assertEquals(savedConfigs.length, 2);
      assertEquals(savedConfigs[1].viewportWidth, 1280);
    });
  });
});
