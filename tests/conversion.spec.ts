/// <reference lib="deno.ns" />
import { launch, Page, ElementHandle } from "https://deno.land/x/astral/mod.ts";
import { assertEquals, assert } from "https://deno.land/std/assert/mod.ts";
import { delay } from "https://deno.land/std/async/delay.ts";

// Utility function to wait for an element to appear
async function waitForElement(page: Page, selector: string, timeout = 5000, pollInterval = 100): Promise<ElementHandle | null> {
  const startTime = Date.now();
  while (Date.now() - startTime < timeout) {
    const element: ElementHandle | null = await page.$(selector);
    if (element !== null) {
      return element;
    }
    await delay(pollInterval);
  }
  return null;
}

// NOTE: Before running these tests, ensure your web server is running in a separate terminal:
// deno task dev
//
// To run these tests:
// deno test --allow-net --allow-run --allow-env --allow-read --allow-write tests/conversion.spec.ts

Deno.test("Unit Conversion - should display the UnitSwitch logo and title", async () => {
  let browser;
  try {
    browser = await launch();
    const page = await browser.newPage("http://localhost:5173");

    // Check for logo
    const logo = await page.$("svg[role='img']");
    assert(logo !== null, "Logo SVG should be visible");

    // Check for title
    const h1 = await page.$("h1");
    const h1Text = await h1?.evaluate((el) => (el as HTMLElement).textContent);
    assert(typeof h1Text === 'string' && h1Text.includes("UnitSwitch"), "H1 should contain 'UnitSwitch'");
  } finally {
    await browser?.close();
  }
});

Deno.test("Unit Conversion - should convert pixels to other units", async () => {
  let browser;
  try {
    browser = await launch();
    const page = await browser.newPage("http://localhost:5173");

            // Fill in amount
            const amountInput = await page.$("#unit_amount");
            assert(amountInput !== null, "#unit_amount input not found");
            await amountInput.type("96");
            await delay(100); // ADDED: delay after typing
    
            // Select pixels
            await page.evaluate((val) => {
              const select = document.querySelector("#unit_select") as HTMLSelectElement;
              if (select) select.value = val;
              select?.dispatchEvent(new Event('change', { bubbles: true })); // Trigger change event
            }, { args: ["px"] });
            await delay(100); // ADDED: delay after select event
    
            // Click convert button
            const convertButton = await page.$("button:not([type]), input[type='submit']");
            assert(convertButton !== null, "Convert button not found");
            await convertButton.click();
    
                // Wait for conversions to appear using the custom utility, specifically looking for the pixels output
                const conversionResult = await waitForElement(page, "#to-Pixels", 10000);
                assert(conversionResult !== null, "Conversion results should be visible");    // Check body content for sanity
    const bodyText = await page.evaluate(() => document.body?.textContent);
    assert(typeof bodyText === 'string' && bodyText.length > 0, "Body should have content after conversion");

  } finally {
    await browser?.close();
  }
});

Deno.test("Unit Conversion - should show conversion results for different units", async () => {
  let browser;
  try {
    browser = await launch();
    const page = await browser.newPage("http://localhost:5173");

    // Fill in amount
    const amountInput = await page.$("#unit_amount");
    assert(amountInput !== null, "#unit_amount input not found");
    await amountInput.type("10");

    // Select centimeters
    await page.evaluate((val) => {
      const select = document.querySelector("#unit_select") as HTMLSelectElement;
      if (select) select.value = val;
      select?.dispatchEvent(new Event('change', { bubbles: true })); // Trigger change event
    }, { args: ["cm"] });

    // Submit
    const submitButton = await page.$("input[type='submit']");
    assert(submitButton !== null, "Submit button not found");
    await submitButton.click();

    await delay(200);

    // Results should be visible on the page
    const bodyText = await page.evaluate(() => document.body?.textContent);
    assert(typeof bodyText === 'string' && bodyText.length > 0, "Body should have content after conversion results");

  } finally {
    await browser?.close();
  }
});

Deno.test("Unit Conversion - should handle invalid input gracefully", async () => {
  let browser;
  try {
    browser = await launch();
    const page = await browser.newPage("http://localhost:5173");

    // Fill in invalid amount (negative)
    const amountInput = await page.$("#unit_amount");
    assert(amountInput !== null, "#unit_amount input not found");
    await amountInput.type("-10");

    // Select any unit (px)
    await page.evaluate((val) => {
      const select = document.querySelector("#unit_select") as HTMLSelectElement;
      if (select) select.value = val;
      select?.dispatchEvent(new Event('change', { bubbles: true })); // Trigger change event
    }, { args: ["px"] });

    // Submit
    const submitButton = await page.$("input[type='submit']");
    assert(submitButton !== null, "Submit button not found");
    await submitButton.click();

    await delay(200);

    // Should show an error message
    const errorDiv = await page.$("#amount-error, [role='alert']");
    assert(errorDiv !== null, "Error message (amount-error or role='alert') should be visible");

  } finally {
    await browser?.close();
  }
});

Deno.test("Unit Conversion - should allow changing units in the dropdown", async () => {
  let browser;
  try {
    browser = await launch();
    const page = await browser.newPage("http://localhost:5173");

    const unitSelect = await page.$("#unit_select");
    assert(unitSelect !== null, "#unit_select dropdown not found");

    // Should have multiple unit options
    const optionsCount = await page.evaluate(() => document.querySelectorAll("#unit_select option").length) as number;
    assert(optionsCount > 5, "Unit select should have more than 5 options");

    // Can select different units and check value for "Inches"
    await page.evaluate((val) => {
      const select = document.querySelector("#unit_select") as HTMLSelectElement;
      if (select) select.value = val;
      select?.dispatchEvent(new Event('change', { bubbles: true })); // Trigger change event
    }, { args: ["Inches"] });
    let inputValue = await page.evaluate(() => (document.querySelector("#unit_select") as HTMLSelectElement)?.value);
    assertEquals(inputValue, "Inches", "Unit select value should be 'Inches' after selection");

    // Can select different units and check value for "Rems/Ems"
    await page.evaluate((val) => {
      const select = document.querySelector("#unit_select") as HTMLSelectElement;
      if (select) select.value = val;
      select?.dispatchEvent(new Event('change', { bubbles: true })); // Trigger change event
    }, { args: ["Rems/Ems"] });
    inputValue = await page.evaluate(() => (document.querySelector("#unit_select") as HTMLSelectElement)?.value);
    assertEquals(inputValue, "Rems/Ems", "Unit select value should be 'Rems/Ems' after selection");

  } finally {
    await browser?.close();
  }
});

Deno.test("Unit Conversion - should persist user input when changing units", async () => {
  let browser;
  try {
    browser = await launch();
    const page = await browser.newPage("http://localhost:5173");

    // Enter amount
    const amountInput = await page.$("#unit_amount");
    assert(amountInput !== null, "#unit_amount input not found");
    await amountInput.evaluate((el) => (el as HTMLInputElement).value = ''); // Clear input
    await amountInput.type("42");
    await delay(100); // delay after typing

    // Change unit to Pixels
    await page.evaluate((val) => {
      const select = document.querySelector("#unit_select") as HTMLSelectElement;
      if (select) select.value = val;
      select?.dispatchEvent(new Event('change', { bubbles: true })); // Trigger change event
    }, { args: ["Pixels"] });
    await delay(200); // Give time for app to react

    // Amount should still be there
    let amountInputValue = await page.evaluate(() => (document.querySelector("#unit_amount") as HTMLInputElement)?.value);
    assertEquals(amountInputValue, "42", "Amount input value should be '42' after first unit change");

    // Change unit again to Rems/Ems
    await page.evaluate((val) => {
      const select = document.querySelector("#unit_select") as HTMLSelectElement;
      if (select) select.value = val;
      select?.dispatchEvent(new Event('change', { bubbles: true })); // Trigger change event
    }, { args: ["Rems/Ems"] });
    await delay(200); // Give time for app to react

    // Amount should still be preserved
    amountInputValue = await page.evaluate(() => (document.querySelector("#unit_amount") as HTMLInputElement)?.value);
    assertEquals(amountInputValue, "42", "Amount input value should be '42' after second unit change");

  } finally {
    await browser?.close();
  }
});

Deno.test("Unit Conversion - should display form with proper labels", async () => {
  let browser;
  try {
    browser = await launch();
    const page = await browser.newPage("http://localhost:5173");

    // Check for Amount label
    const amountLabelExists = await page.evaluate((text) =>
      Array.from(document.querySelectorAll('label')).some(label => label.textContent?.includes(text))
    , { args: ['Amount'] });
    assert(amountLabelExists, "Amount label should be visible");

    // Check for Unit label
    const unitLabelExists = await page.evaluate((text) =>
      Array.from(document.querySelectorAll('label')).some(label => label.textContent?.includes(text))
    , { args: ['Unit'] });
    assert(unitLabelExists, "Unit label should be visible");

  } finally {
    await browser?.close();
  }
});

