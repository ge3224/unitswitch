# Testing Guide

Comprehensive testing strategy for UnitSwitch.

## Test Suites

### 1. Unit Tests (deno-dom)
**Location:** `src/**/*.test.ts`, `src/**/*.test.tsx`

**Purpose:** Fast, isolated component and converter tests

**Run:**
```bash
deno task test              # Run all unit tests
deno task test:watch        # Watch mode
deno test path/to/test.ts   # Specific file
```

**Coverage:**
- ✅ Unit converters (14 test suites, 374 steps)
- ✅ UI components (8 test suites, 114 steps)
  - Toast notifications
  - Logo & Icons
  - Details visualizations
  - Conversion display
  - User input form
  - Modal dialog
  - Settings panel
- ✅ State management integration (1 test suite, 26 steps)
  - State updates trigger component re-renders
  - Multiple subscribers to same state
  - State cleanup and unsubscribe
  - Cross-component state synchronization
  - Complex data types (objects, arrays)
  - State batching and performance
  - Real-world integration patterns
- ✅ Hotkey manager integration (1 test suite, 25 steps)
  - Hotkey registration with components
  - Multiple components with different hotkeys
  - Multiple components with SAME hotkey
  - Hotkey cleanup on component unmount
  - Component lifecycle integration
  - Real-world component patterns (Modal, Settings, Conversions)
  - Hotkey conflicts and priority
- ✅ Edge cases and boundary conditions (2 test suites, 44 steps)
  - NaN and Infinity handling
  - Very large and very small numbers
  - Negative value handling
  - Floating point precision and rounding
  - Numerical stability and round-trip conversions
  - Error message quality
- ✅ Accessibility attributes
- ✅ Hotkey manager (1 test suite)

**Total:** 34 test suites, 583 test steps

### 2. End-to-End Tests (Astral)
**Location:** `testing/e2e/*.spec.ts`

**Purpose:** Real browser testing of user workflows

**Run:**
```bash
deno task test:e2e           # Run all E2E tests
```

**Coverage:**
- ✅ Core conversion flows
- ✅ Keyboard shortcuts (Ctrl+K, Ctrl+/, Enter, Escape)
- ✅ Accessibility compliance
- ✅ Settings configuration

**Test files:**
- `conversion.spec.ts` - Form interactions, validation, results
- `keyboard-shortcuts.spec.ts` - Hotkeys and navigation
- `accessibility.spec.ts` - ARIA, focus, semantic HTML
- `settings.spec.ts` - Configuration and preferences

## Testing Philosophy

### Unit Tests - FAST feedback
- **When:** During development
- **Speed:** ~1 second for all 488 tests
- **Focus:** Individual components and functions
- **Tools:** deno-dom (DOM simulation)

### E2E Tests - CONFIDENCE before deploy
- **When:** Before commits/deploys
- **Speed:** ~30 seconds for 25 tests
- **Focus:** User journeys and integration
- **Tools:** Astral (real browsers via Chrome DevTools Protocol)

## Test Infrastructure

### Unit Testing Setup
**File:** `src/lib/testing/dom_setup.ts`

Provides:
- deno-dom environment initialization
- SVG namespace support (polyfilled `createElementNS`)
- Style property support (polyfilled `.style`)
- Global `document`, `window`, `Node`, `DocumentFragment`

**Usage:**
```typescript
import { setupDOM } from "@/lib/testing/dom_setup.ts";
import { FakeTime } from "jsr:@std/testing@^1.0.0/time";

describe("My Component", () => {
  let time: FakeTime;

  beforeEach(() => {
    setupDOM();
    document.body.innerHTML = "";
    time = new FakeTime(); // Prevent timer leaks
  });

  afterEach(() => {
    time.restore();
  });

  it("should render", () => {
    const component = <MyComponent />;
    document.body.appendChild(component);
    // ... assertions
  });
});
```

### E2E Testing Setup

Uses Astral for browser automation via Chrome DevTools Protocol.

**Usage:**
```typescript
import { launch } from "https://deno.land/x/astral/mod.ts";
import { assertEquals, assert } from "https://deno.land/std/assert/mod.ts";
import { delay } from "https://deno.land/std/async/delay.ts";

Deno.test("Feature - should work", async () => {
  let browser;
  try {
    browser = await launch();
    const page = await browser.newPage("http://localhost:5173");

    const input = await page.$("#input");
    await input?.type("value");

    const result = await page.$(".result");
    assert(result !== null, "Result should be visible");
  } finally {
    await browser?.close();
  }
});
```

## Running All Tests

### Development workflow
```bash
# Fast unit tests (run frequently)
deno task test:watch

# E2E tests (run before commit)
deno task test:e2e
```

### CI/CD workflow
```bash
# Unit tests
deno task test

# Type checking
deno task typecheck

# Build
deno task build

# E2E tests on built app
deno task preview &  # Start preview server
deno task test:e2e   # Run against preview
```

## Test Organization

```
unitswitch/
├── src/
│   ├── lib/
│   │   ├── converters/
│   │   │   ├── pixels.ts
│   │   │   └── pixels.test.ts        # Unit tests next to source
│   │   ├── ui/
│   │   │   ├── toast.tsx
│   │   │   └── toast.test.tsx        # Component tests
│   │   └── testing/
│   │       ├── dom_setup.ts          # Shared test utilities
│   │       └── README.md             # Unit test guide
├── testing/
│   └── e2e/
│       ├── conversion.spec.ts        # E2E test specs
│       ├── keyboard-shortcuts.spec.ts
│       ├── accessibility.spec.ts
│       ├── settings.spec.ts
│       └── README.md                 # E2E test guide
└── docs/
    └── TESTING.md                    # This file
```

## Writing New Tests

### Adding a Unit Test

1. Create `component.test.tsx` next to `component.tsx`
2. Import test utilities:
```typescript
import { assertEquals, assertExists } from "jsr:@std/assert@^1.0.0";
import { beforeEach, describe, it } from "jsr:@std/testing@^1.0.0/bdd";
import { setupDOM } from "@/lib/testing/dom_setup.ts";
import { createDomElement } from "@pkg/just-jsx/src/index.ts";
```
3. Write focused tests for the component
4. Run: `deno test path/to/component.test.tsx`

### Adding an E2E Test

1. Create `feature.spec.ts` in `testing/e2e/`
2. Import Astral:
```typescript
import { launch } from "https://deno.land/x/astral/mod.ts";
import { assertEquals, assert } from "https://deno.land/std/assert/mod.ts";
import { delay } from "https://deno.land/std/async/delay.ts";
```
3. Write user journey tests
4. Run: `deno task test:e2e`

**Note:** When triggering events in Astral, use JavaScript event dispatching for better reliability:
```typescript
// Keyboard events
await page.evaluate(() => {
  const event = new KeyboardEvent('keydown', {
    key: 'Escape',
    bubbles: true,
    cancelable: true
  });
  window.dispatchEvent(event);
});

// Clicks
await element.evaluate((el: HTMLElement) => {
  el.querySelector('button')?.click();
});
```

## Debugging Tests

### Unit Tests
```typescript
// Add console.log
console.log(component.innerHTML);

// Check specific file
deno test --filter="should render" path/to/test.ts

// See full error traces
deno test --trace-ops
```

### E2E Tests
```bash
# Run with headed mode (visible browser)
const browser = await launch({ headless: false });

# Add delays to observe behavior
await delay(2000);

# Debug with console.log in browser
await page.evaluate(() => {
  console.log('Debug info:', document.body.innerHTML);
});

# Take screenshots
const screenshot = await page.screenshot();
Deno.writeFileSync("debug.png", screenshot);
```

## Coverage Goals

- [x] **Converters:** 100% (all 14 units tested)
- [x] **UI Components:** 100% (all 8 components tested)
- [x] **State Management:** Integration tests with components ✅
- [x] **Hotkey Manager:** Integration tests with components ✅
- [x] **User Flows:** Basic conversion, keyboard shortcuts, accessibility ✅
- [x] **Edge Cases:** NaN, Infinity, extreme values, floating point precision ✅
- [ ] **Visual Regression:** Screenshot comparison (future)
- [ ] **Performance:** Load time, conversion speed (future)

## Known Limitations

### deno-dom Limitations (Unit Tests)
- ❌ No real JavaScript execution
- ❌ No CSS rendering
- ❌ No network requests
- ⚠️ Limited `style` property support (polyfilled)
- ⚠️ No SVG `createElementNS` (polyfilled)

**Workaround:** E2E tests cover these cases

### Astral Limitations (E2E Tests)
- ⚠️ Slower than unit tests (~30s for 25 tests)
- ⚠️ Keyboard/click events require JavaScript dispatching for reliability
- ⚠️ More complex debugging than unit tests

**Workaround:** Keep E2E tests focused on critical paths

## Best Practices

### Unit Tests
1. ✅ Test one thing per test
2. ✅ Use descriptive test names
3. ✅ Clean up with beforeEach/afterEach
4. ✅ Use FakeTime for timers
5. ✅ Prefer Edit/Write over snapshots

### E2E Tests
1. ✅ Test user journeys, not implementation
2. ✅ Use stable selectors (IDs > text > CSS)
3. ✅ Explicit waits over timeouts
4. ✅ One assertion per test (when possible)
5. ✅ Run locally before committing

## CI Integration Example

```yaml
# .github/workflows/test.yml
name: Tests
on: [push, pull_request]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: denoland/setup-deno@v1
      - run: deno task test
      - run: deno task typecheck

  e2e-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: denoland/setup-deno@v1
      - run: deno task build
      - run: deno task dev &  # Start dev server in background
      - run: sleep 5  # Wait for server to start
      - run: deno task test:e2e
```

## Resources

- [Deno Testing](https://docs.deno.com/runtime/fundamentals/testing/)
- [Astral](https://astral.deno.dev/)
- [deno-dom](https://deno.land/x/deno_dom)
- [Web Accessibility](https://www.w3.org/WAI/WCAG21/quickref/)
