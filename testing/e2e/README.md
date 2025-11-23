# End-to-End Tests

E2E tests for UnitSwitch using Astral (Chrome DevTools Protocol browser automation).

## Running Tests

### Run all E2E tests
```bash
deno task test:e2e
```

### Run specific test file
```bash
deno test --allow-net --allow-run --allow-env --allow-read --allow-write testing/e2e/conversion.spec.ts
```

### Run with visible browser (for debugging)
Modify the test to use:
```typescript
const browser = await launch({ headless: false });
```

## Test Structure

- **conversion.spec.ts** - Core unit conversion functionality (7 tests)
  - Form interactions
  - Input validation
  - Unit selection
  - Conversion results

- **keyboard-shortcuts.spec.ts** - Keyboard navigation and shortcuts (5 tests)
  - Ctrl+K modal
  - Enter to submit
  - Escape to close
  - Tab navigation

- **accessibility.spec.ts** - Accessibility compliance (8 tests)
  - ARIA labels and roles
  - Semantic HTML
  - Focus management
  - Screen reader support

- **settings.spec.ts** - Configuration and settings (5 tests)
  - Opening/closing settings panel
  - Ctrl+/ hotkey
  - Escape key
  - Viewport configuration
  - Settings persistence

**Total: 25 tests**

## How It Works

1. **Astral** launches a real Chromium browser via Chrome DevTools Protocol
2. **Before tests run**:
   - Ensure dev server is running (`deno task dev`)
   - Browser navigates to http://localhost:5173
3. **Each test**:
   - Interacts with real DOM
   - Validates behavior
   - Can take screenshots on failure
4. **After tests**:
   - Closes browser

## Writing Tests

### Basic test structure

```typescript
import { launch } from "https://deno.land/x/astral/mod.ts";
import { assertEquals, assert } from "https://deno.land/std/assert/mod.ts";
import { delay } from "https://deno.land/std/async/delay.ts";

Deno.test("Feature Name - should do something", async () => {
  let browser;
  try {
    browser = await launch();
    const page = await browser.newPage("http://localhost:5173");

    // Interact with page
    const input = await page.$("#input");
    await input?.type("value");

    // Assert expectations
    const result = await page.$(".result");
    assert(result !== null, "Result should be visible");
  } finally {
    await browser?.close();
  }
});
```

### Common actions

```typescript
// Navigate
const page = await browser.newPage("http://localhost:5173");

// Find element
const element = await page.$("#selector");

// Type into input
await element?.type("100");

// Get attribute
const label = await element?.getAttribute("aria-label");

// Evaluate JavaScript in browser
const value = await element?.evaluate((el: HTMLInputElement) => el.value);

// Click (use JavaScript for reliability)
await element?.evaluate((el: HTMLElement) => el.click());

// Keyboard events (use JavaScript for reliability)
await page.evaluate(() => {
  const event = new KeyboardEvent('keydown', {
    key: 'Escape',
    bubbles: true,
    cancelable: true
  });
  window.dispatchEvent(event);
});

// Wait
await delay(100);

// Take screenshot
const screenshot = await page.screenshot();
Deno.writeFileSync("debug.png", screenshot);
```

## Debugging

### Run with browser visible
```typescript
const browser = await launch({ headless: false });
```

### Add delays to observe behavior
```typescript
await delay(2000); // 2 second pause
```

### Debug with console.log in browser
```typescript
await page.evaluate(() => {
  console.log('Current state:', document.body.innerHTML);
});
```

### Screenshots
```typescript
const screenshot = await page.screenshot();
Deno.writeFileSync("screenshot.png", screenshot);
```

## Key Differences from Playwright

| Feature | Playwright | Astral |
|---------|-----------|--------|
| Event simulation | Native API | JavaScript dispatch recommended |
| Setup | Browser download required | Uses system Chrome/Chromium |
| Speed | ~10-30s | ~30s for 25 tests |
| API | Comprehensive | Simpler, Puppeteer-like |

### Event Handling Best Practices

For keyboard shortcuts and clicks, use JavaScript event dispatching for better reliability:

```typescript
// ✅ Recommended: JavaScript dispatch
await page.evaluate(() => {
  const event = new KeyboardEvent('keydown', {
    key: '/',
    ctrlKey: true,
    bubbles: true,
    cancelable: true
  });
  window.dispatchEvent(event);
});

// ❌ May not work reliably
await page.keyboard.press("Control+/");
```

## Best Practices

1. **Keep tests focused** - One feature per test
2. **Use specific selectors** - Prefer IDs and aria-labelledby over generic role selectors
3. **Add delays after interactions** - Give time for animations and state updates
4. **Use JavaScript event dispatch** - For keyboard shortcuts and clicks
5. **Test user journeys** - Not implementation details
6. **Run locally first** - Before committing

## Troubleshooting

### "Element not found"
```typescript
// Add delay to wait for page load
await delay(200);
const element = await page.$("#selector");
```

### "Events not triggering"
Use JavaScript event dispatching instead of Astral's keyboard/click APIs.

### "Tests timing out"
Increase delays or check that dev server is running.
