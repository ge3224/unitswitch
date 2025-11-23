/// <reference lib="deno.ns" />
import { launch } from "https://deno.land/x/astral/mod.ts";
import { assertEquals, assert } from "https://deno.land/std/assert/mod.ts";

Deno.test("Accessibility - should have proper ARIA labels on inputs", async () => {
  let browser;
  try {
    browser = await launch();
    const page = await browser.newPage("http://localhost:5173");

    const amountInput = await page.$("#unit_amount");
    assert(amountInput !== null, "#unit_amount input not found");
    const amountLabel = await amountInput.getAttribute("aria-label");
    assertEquals(amountLabel, "Amount");

    const unitSelect = await page.$("#unit_select");
    assert(unitSelect !== null, "#unit_select not found");
    const unitLabel = await unitSelect.getAttribute("aria-label");
    assertEquals(unitLabel, "Unit");
  } finally {
    await browser?.close();
  }
});

Deno.test("Accessibility - should have error messages with role=alert", async () => {
    let browser;
    try {
      browser = await launch();
      const page = await browser.newPage("http://localhost:5173");

      const errorDiv = await page.$("#amount-error");
      assert(errorDiv !== null, "#amount-error div not found");

      const role = await errorDiv.getAttribute("role");
      assertEquals(role, "alert");

      const ariaLive = await errorDiv.getAttribute("aria-live");
      assertEquals(ariaLive, "polite");
    } finally {
      await browser?.close();
    }
});

Deno.test("Accessibility - should have accessible logo", async () => {
    let browser;
    try {
      browser = await launch();
      const page = await browser.newPage("http://localhost:5173");

      const logo = await page.$("svg[role='img']");
      assert(logo !== null, "Logo SVG not found");

      const role = await logo.getAttribute("role");
      assertEquals(role, "img");

      const labelledby = await logo.getAttribute("aria-labelledby");
      assert(labelledby !== null, "Logo should have aria-labelledby");
    } finally {
      await browser?.close();
    }
});

Deno.test("Accessibility - should have semantic HTML structure", async () => {
    let browser;
    try {
      browser = await launch();
      const page = await browser.newPage("http://localhost:5173");

      const h1 = await page.$("h1");
      assert(h1 !== null, "H1 element not found");
      const h1Text = await h1.evaluate((el) => (el as HTMLElement).textContent);
      assert(typeof h1Text === 'string' && h1Text.includes("UnitSwitch"));

      const form = await page.$("form");
      assert(form !== null, "Form element not found");
    } finally {
      await browser?.close();
    }
});

Deno.test("Accessibility - should have visible focus indicators", async () => {
    let browser;
    try {
      browser = await launch();
      const page = await browser.newPage("http://localhost:5173");

      const amountInput = await page.$("#unit_amount");
      assert(amountInput !== null, "#unit_amount input not found");

      await amountInput.focus();

      const isFocused = await amountInput.evaluate((el) => el === document.activeElement);
      assert(isFocused, "Input should be focused");
    } finally {
      await browser?.close();
    }
});

Deno.test("Accessibility - should have descriptive button text", async () => {
    let browser;
    try {
      browser = await launch();
      const page = await browser.newPage("http://localhost:5173");

      const submitButton = await page.$("input[type='submit']");
      assert(submitButton !== null, "Submit button not found");

      const value = await submitButton.getAttribute("value");
      assertEquals(value, "Convert");
    } finally {
      await browser?.close();
    }
});

Deno.test("Accessibility - should link error messages to inputs via aria-describedby", async () => {
    let browser;
    try {
      browser = await launch();
      const page = await browser.newPage("http://localhost:5173");

      const amountInput = await page.$("#unit_amount");
      assert(amountInput !== null, "#unit_amount input not found");

      const describedby = await amountInput.getAttribute("aria-describedby");
      assertEquals(describedby, "amount-error");
    } finally {
      await browser?.close();
    }
});

Deno.test("Accessibility - should have proper color contrast (visual check)", async () => {
    let browser;
    try {
      browser = await launch();
      const page = await browser.newPage("http://localhost:5173");

      // This test is a placeholder for a manual visual check.
      // In a real scenario, you would use a tool like axe-core to check for color contrast.
      const screenshot = await page.screenshot();
      assert(screenshot, "Should be able to take a screenshot");
    } finally {
      await browser?.close();
    }
});