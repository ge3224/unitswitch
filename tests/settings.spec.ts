/// <reference lib="deno.ns" />
import { launch } from "https://deno.land/x/astral/mod.ts";
import { assertEquals, assert } from "https://deno.land/std/assert/mod.ts";
import { delay } from "https://deno.land/std/async/delay.ts";

async function openSettings(page: any) {
  // Wait for page to be fully loaded
  await delay(200);
  const settingsButton = await page.$("button[aria-label*='Open settings']");
  assert(settingsButton !== null, "Settings button not found");
  await settingsButton.click();
  await delay(100); // Wait for animation to start
  const panel = await page.$("div[aria-labelledby='settings-title']");
  assert(panel !== null, "Settings panel not found");
  return panel;
}

Deno.test("Settings - should open settings panel with button click", async () => {
  let browser;
  try {
    browser = await launch();
    const page = await browser.newPage("http://localhost:5173");
    const panel = await openSettings(page);
    await delay(500); // Wait for animation to complete
    const transform = await panel.evaluate((el: HTMLElement) => el.style.transform);
    assertEquals(transform, "translateX(0px)", "Panel should be visible");
  } finally {
    await browser?.close();
  }
});

Deno.test("Settings - should open settings panel with hotkey", async () => {
    let browser;
    try {
      browser = await launch();
      const page = await browser.newPage("http://localhost:5173");
      await delay(200); // Wait for page to load

      // Trigger keyboard event directly via JavaScript
      await page.evaluate(() => {
        const event = new KeyboardEvent('keydown', {
          key: '/',
          ctrlKey: true,
          bubbles: true,
          cancelable: true
        });
        window.dispatchEvent(event);
      });

      await delay(500); // Wait for animation to complete
      const panel = await page.$("div[aria-labelledby='settings-title']");
      assert(panel !== null, "Settings panel not found");
      const transform = await panel.evaluate((el: HTMLElement) => el.style.transform);
      assertEquals(transform, "translateX(0px)", "Panel should be visible after hotkey");
    } finally {
      await browser?.close();
    }
});

Deno.test("Settings - should close settings panel with close button", async () => {
    let browser;
    try {
      browser = await launch();
      const page = await browser.newPage("http://localhost:5173");
      const panel = await openSettings(page);

      // Click via JavaScript instead of element.click()
      await panel.evaluate((el: HTMLElement) => {
        const closeButton = el.querySelector("button[aria-label='Close panel']") as HTMLButtonElement;
        if (closeButton) {
          closeButton.click();
        }
      });
      await delay(100); // Wait for transform to be set

      const transform = await panel.evaluate((el: HTMLElement) => el.style.transform);
      assertEquals(transform, "translateX(100%)", "Panel should be hidden");
    } finally {
      await browser?.close();
    }
});

Deno.test("Settings - should close settings panel with Escape key", async () => {
    let browser;
    try {
        browser = await launch();
        const page = await browser.newPage("http://localhost:5173");
        const panel = await openSettings(page);

        // Trigger Escape key directly via JavaScript
        await page.evaluate(() => {
          const event = new KeyboardEvent('keydown', {
            key: 'Escape',
            bubbles: true,
            cancelable: true
          });
          window.dispatchEvent(event);
        });

        await delay(100); // Wait for transform to be set

        const transform = await panel.evaluate((el: HTMLElement) => el.style.transform);
        assertEquals(transform, "translateX(100%)", "Panel should be hidden after Escape");
    } finally {
        await browser?.close();
    }
});

Deno.test("Settings - should update viewport width and save settings", async () => {
    let browser;
    try {
        browser = await launch();
        const page = await browser.newPage("http://localhost:5173");
        
        // Open panel, change value, and save
        let panel = await openSettings(page);
        const viewportWidthInput = await panel.$("#viewport-width");
        assert(viewportWidthInput !== null, "Viewport width input not found");

        await viewportWidthInput.evaluate((el: HTMLInputElement) => el.value = ""); // Clear input
        await viewportWidthInput.type("2000");

        const saveButton = await panel.$("button[type='submit']");
        assert(saveButton !== null, "Save button not found");
        await saveButton.click();
        await delay(350);

        // Re-open panel to check if value was saved
        panel = await openSettings(page);
        const newViewportWidthInput = await panel.$("#viewport-width");
        assert(newViewportWidthInput !== null, "Viewport width input not found on reopen");

        const newValue = await newViewportWidthInput.evaluate((el: HTMLInputElement) => el.value);
        assertEquals(newValue, "2000", "Viewport width should be updated after saving");

    } finally {
        await browser?.close();
    }
});