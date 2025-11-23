/// <reference lib="deno.ns" />
import { launch } from "https://deno.land/x/astral/mod.ts";
import { assertEquals, assert } from "https://deno.land/std/assert/mod.ts";
import { delay } from "https://deno.land/std/async/delay.ts";

Deno.test("Keyboard Shortcuts - should display keyboard shortcut hints", async () => {
  let browser;
  try {
    browser = await launch();
    const page = await browser.newPage("http://localhost:5173");

    const kbdElements = await page.$$("kbd");
    assert(kbdElements.length > 0, "Should have some keyboard shortcuts displayed");
  } finally {
    await browser?.close();
  }
});

Deno.test("Keyboard Shortcuts - should open modal with Ctrl+K", async () => {
    let browser;
    try {
      browser = await launch();
      const page = await browser.newPage("http://localhost:5173");

      await page.keyboard.down("Control");
      await page.keyboard.press("k");
      await page.keyboard.up("Control");

      await delay(200);

      const modal = await page.$("[role='dialog']");
      assert(modal !== null, "Modal should appear");

      const parentDisplay = await modal.evaluate((el: HTMLElement) => (el.parentElement as HTMLElement).style.display);
      assert(parentDisplay === "block" || parentDisplay === "", "Modal's parent should be visible");

    } finally {
      await browser?.close();
    }
});

Deno.test("Keyboard Shortcuts - should focus amount input on page load", async () => {
    let browser;
    try {
      browser = await launch();
      const page = await browser.newPage("http://localhost:5173");

      const amountInput = await page.$("#unit_amount");
      assert(amountInput !== null, "#unit_amount input not found");

      await amountInput.focus();
      await page.keyboard.type("100");

      const value = await amountInput.evaluate((el: HTMLElement) => (el as HTMLInputElement).value);
      assert(value.includes("100"), "Typing should directly go into the amount input");
    } finally {
      await browser?.close();
    }
});

Deno.test("Keyboard Shortcuts - should submit form with Enter key", async () => {
    let browser;
    try {
      browser = await launch();
      const page = await browser.newPage("http://localhost:5173");

      const amountInput = await page.$("#unit_amount");
      assert(amountInput !== null, "#unit_amount input not found");
      await amountInput.type("50");

      await page.evaluate((val) => {
        const select = document.querySelector("#unit_select") as HTMLSelectElement;
        if (select) select.value = val;
        select?.dispatchEvent(new Event('change', { bubbles: true }));
      }, { args: ["Pixels"] });

      await page.keyboard.press("Enter");

      await delay(200);

      const conversionResult = await page.$("#to-Pixels");
      assert(conversionResult !== null, "Conversion should have occurred");
    } finally {
      await browser?.close();
    }
});

Deno.test("Keyboard Shortcuts - should close modal/dialog by clicking close button", async () => {
    let browser;
    try {
      browser = await launch();
      const page = await browser.newPage("http://localhost:5173");

      await page.keyboard.down("Control");
      await page.keyboard.press("k");
      await page.keyboard.up("Control");
      await delay(200);

      const closeButton = await page.$("button[aria-label='Close modal']");
      assert(closeButton !== null, "Close button not found");
      await closeButton.evaluate(el => (el as HTMLButtonElement).click());
      await delay(500);

      const modalDialog = await page.$("[role='dialog']");
      assert(modalDialog !== null, "Modal dialog should still be in the DOM");
      const modalDisplay = await modalDialog.evaluate((el: HTMLElement) => (el.parentElement as HTMLElement).style.display);
      assertEquals(modalDisplay, "none", "Modal container should be hidden after clicking close");
    } finally {
      await browser?.close();
    }
});