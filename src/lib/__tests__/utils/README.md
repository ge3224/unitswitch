# Testing Utilities

Shared testing utilities for the UnitSwitch project.

## DOM Setup for Component Testing

The `dom_setup.ts` module provides utilities for testing UI components with deno-dom and just-jsx.

### Quick Start

```typescript
import { setupDOM } from "@/lib/__tests__/utils/dom_setup.ts";
import { beforeEach, describe, it } from "jsr:@std/testing@^1.0.0/bdd";
import { FakeTime } from "jsr:@std/testing@^1.0.0/time";
import { assertEquals } from "jsr:@std/assert@^1.0.0";

describe("My Component", () => {
  let time: FakeTime;

  beforeEach(() => {
    setupDOM();
    document.body.innerHTML = ""; // Clear DOM for each test
    time = new FakeTime(); // Prevent timer leaks
  });

  afterEach(() => {
    time.restore();
  });

  it("should render correctly", () => {
    const element = <div>Hello, World!</div>;
    document.body.appendChild(element);

    assertEquals(document.body.innerHTML, "<div>Hello, World!</div>");
  });
});
```

### What setupDOM() Does

1. Creates a fresh HTML document using deno-dom
2. Sets up global `document` and `window` objects
3. Adds `Node` and `DocumentFragment` to global scope
4. Applies polyfill for `.style` property (deno-dom limitation)

### Known deno-dom Limitations & Workarounds

#### 1. Style Property
deno-dom doesn't implement `CSSStyleDeclaration` properly. The `setupDOM()` function includes a polyfill that syncs `.style` property access with the `style` attribute.

```typescript
element.style.opacity = "0.5"; // Works with polyfill
// Internally sets: element.setAttribute("style", "opacity: 0.5")
```

#### 2. Timer Leaks
Components that use `setTimeout`/`setInterval` need `FakeTime`:

```typescript
import { FakeTime } from "jsr:@std/testing@^1.0.0/time";

let time: FakeTime;

beforeEach(() => {
  time = new FakeTime();
});

afterEach(() => {
  time.restore();
});
```

#### 3. Event Listeners
Event listeners work, but you must dispatch events manually:

```typescript
const button = <button onClick={handler}>Click</button>;
document.body.appendChild(button);

// Simulate click
button.dispatchEvent(new MouseEvent("click"));
```

### Complete Example

See `src/lib/ui/toast.test.tsx` for a complete working example testing:
- Element creation and rendering
- Style application
- Event handlers
- DOM manipulation
- Multiple test scenarios

### Why deno-dom?

This project uses deno-dom (dev dependency only) because:
- ✅ Native Deno solution (no npm: imports needed for core testing)
- ✅ Aligns with Deno's development ergonomics
- ✅ Zero runtime dependencies (only dev dependency)
- ✅ Compatible with just-jsx after polyfilling

Alternative: jsdom via `npm:jsdom` is also available if needed for better compatibility.
