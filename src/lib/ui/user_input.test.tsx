import { assertEquals, assertExists } from "jsr:@std/assert@^1.0.0";
import { afterEach, beforeEach, describe, it } from "jsr:@std/testing@^1.0.0/bdd";
import { FakeTime } from "jsr:@std/testing@^1.0.0/time";
import { createDomElement } from "@pkg/just-jsx/src/index.ts";
import { setupDOM } from "@/lib/testing/dom_setup.ts";
import UserInput from "./user_input.tsx";
import { ViewInputState } from "@/lib/types.ts";
import { Units } from "@/lib/units.ts";

describe("UserInput Component", () => {
  let time: FakeTime;

  beforeEach(() => {
    setupDOM();
    document.body.innerHTML = "";
    time = new FakeTime();
  });

  afterEach(() => {
    time.restore();
  });

  it("should render form with input and select", () => {
    const mockInput: ViewInputState<number> = {
      get: () => 10,
      subscribe: () => {},
    };

    const mockType: ViewInputState<typeof Units.Pixels> = {
      get: () => Units.Pixels,
      subscribe: () => {},
    };

    const mockCallback = () => {};

    const component = (
      <UserInput input={mockInput} type={mockType} callback={mockCallback} />
    ) as HTMLElement;
    document.body.appendChild(component);

    assertExists(component);
    const form = component.querySelector("form");
    assertExists(form, "Should have form element");
  });

  it("should have amount input field", () => {
    const mockInput: ViewInputState<number> = {
      get: () => 25,
      subscribe: () => {},
    };

    const mockType: ViewInputState<typeof Units.Pixels> = {
      get: () => Units.Pixels,
      subscribe: () => {},
    };

    const mockCallback = () => {};

    const component = (
      <UserInput input={mockInput} type={mockType} callback={mockCallback} />
    ) as HTMLElement;
    document.body.appendChild(component);

    const amountInput = component.querySelector(
      "input#unit_amount",
    ) as HTMLInputElement;
    assertExists(amountInput, "Should have amount input");
    assertEquals(amountInput.getAttribute("type"), "text");
    assertEquals(amountInput.value, "25");
  });

  it("should have unit select dropdown", () => {
    const mockInput: ViewInputState<number> = {
      get: () => 10,
      subscribe: () => {},
    };

    const mockType: ViewInputState<typeof Units.Pixels> = {
      get: () => Units.Pixels,
      subscribe: () => {},
    };

    const mockCallback = () => {};

    const component = (
      <UserInput input={mockInput} type={mockType} callback={mockCallback} />
    ) as HTMLElement;
    document.body.appendChild(component);

    const unitSelect = component.querySelector(
      "select#unit_select",
    ) as HTMLSelectElement;
    assertExists(unitSelect, "Should have unit select");
    assertEquals(unitSelect.value, Units.Pixels);
  });

  it("should have submit button", () => {
    const mockInput: ViewInputState<number> = {
      get: () => 10,
      subscribe: () => {},
    };

    const mockType: ViewInputState<typeof Units.Pixels> = {
      get: () => Units.Pixels,
      subscribe: () => {},
    };

    const mockCallback = () => {};

    const component = (
      <UserInput input={mockInput} type={mockType} callback={mockCallback} />
    ) as HTMLElement;
    document.body.appendChild(component);

    const submitButton = component.querySelector(
      "input[type='submit']",
    ) as HTMLInputElement;
    assertExists(submitButton, "Should have submit button");
    assertEquals(submitButton.value, "Convert");
  });

  it("should have warning div with ARIA attributes", () => {
    const mockInput: ViewInputState<number> = {
      get: () => 10,
      subscribe: () => {},
    };

    const mockType: ViewInputState<typeof Units.Pixels> = {
      get: () => Units.Pixels,
      subscribe: () => {},
    };

    const mockCallback = () => {};

    const component = (
      <UserInput input={mockInput} type={mockType} callback={mockCallback} />
    ) as HTMLElement;
    document.body.appendChild(component);

    const warningDiv = component.querySelector("#amount-error");
    assertExists(warningDiv, "Should have warning div");
    assertEquals(warningDiv.getAttribute("role"), "alert");
    assertEquals(warningDiv.getAttribute("aria-live"), "polite");
  });

  it("should display all unit options in select", () => {
    const mockInput: ViewInputState<number> = {
      get: () => 10,
      subscribe: () => {},
    };

    const mockType: ViewInputState<typeof Units.Pixels> = {
      get: () => Units.Pixels,
      subscribe: () => {},
    };

    const mockCallback = () => {};

    const component = (
      <UserInput input={mockInput} type={mockType} callback={mockCallback} />
    ) as HTMLElement;
    document.body.appendChild(component);

    const unitSelect = component.querySelector("select#unit_select");
    assertExists(unitSelect);

    const options = unitSelect.querySelectorAll("option");
    const unitCount = Object.values(Units).length;
    assertEquals(
      options.length,
      unitCount,
      `Should have ${unitCount} unit options`,
    );
  });

  it("should have proper labels for accessibility", () => {
    const mockInput: ViewInputState<number> = {
      get: () => 10,
      subscribe: () => {},
    };

    const mockType: ViewInputState<typeof Units.Pixels> = {
      get: () => Units.Pixels,
      subscribe: () => {},
    };

    const mockCallback = () => {};

    const component = (
      <UserInput input={mockInput} type={mockType} callback={mockCallback} />
    ) as HTMLElement;
    document.body.appendChild(component);

    const labels = component.querySelectorAll("label");
    assertEquals(labels.length >= 2, true, "Should have at least 2 labels");

    // Check that labels exist for the inputs
    const amountInput = component.querySelector("#unit_amount");
    const unitSelect = component.querySelector("#unit_select");
    assertExists(amountInput, "Amount input should exist");
    assertExists(unitSelect, "Unit select should exist");
  });

  it("should have keyboard shortcut hint", () => {
    const mockInput: ViewInputState<number> = {
      get: () => 10,
      subscribe: () => {},
    };

    const mockType: ViewInputState<typeof Units.Pixels> = {
      get: () => Units.Pixels,
      subscribe: () => {},
    };

    const mockCallback = () => {};

    const component = (
      <UserInput input={mockInput} type={mockType} callback={mockCallback} />
    ) as HTMLElement;
    document.body.appendChild(component);

    const kbdElements = component.querySelectorAll("kbd");
    assertEquals(kbdElements.length, 2, "Should have Ctrl and K kbd elements");
  });

  it("should render with different initial values", () => {
    const mockInput: ViewInputState<number> = {
      get: () => 99.5,
      subscribe: () => {},
    };

    const mockType: ViewInputState<typeof Units.Inches> = {
      get: () => Units.Inches,
      subscribe: () => {},
    };

    const mockCallback = () => {};

    const component = (
      <UserInput input={mockInput} type={mockType} callback={mockCallback} />
    ) as HTMLElement;
    document.body.appendChild(component);

    const amountInput = component.querySelector(
      "input#unit_amount",
    ) as HTMLInputElement;
    assertEquals(amountInput.value, "99.5");

    const unitSelect = component.querySelector(
      "select#unit_select",
    ) as HTMLSelectElement;
    assertEquals(unitSelect.value, Units.Inches);
  });

  it("should have ARIA describedby linking input to error", () => {
    const mockInput: ViewInputState<number> = {
      get: () => 10,
      subscribe: () => {},
    };

    const mockType: ViewInputState<typeof Units.Pixels> = {
      get: () => Units.Pixels,
      subscribe: () => {},
    };

    const mockCallback = () => {};

    const component = (
      <UserInput input={mockInput} type={mockType} callback={mockCallback} />
    ) as HTMLElement;
    document.body.appendChild(component);

    const amountInput = component.querySelector("input#unit_amount");
    assertExists(amountInput);
    assertEquals(amountInput.getAttribute("aria-describedby"), "amount-error");
  });
});
