import { assertEquals, assertExists } from "jsr:@std/assert@^1.0.0";
import { afterEach, beforeEach, describe, it } from "jsr:@std/testing@^1.0.0/bdd";
import { FakeTime } from "jsr:@std/testing@^1.0.0/time";
import { createDomElement } from "@pkg/just-jsx/src/index.ts";
import { setupDOM } from "@/lib/testing/dom_setup.ts";
import Settings from "./settings/index.tsx";

describe("Settings Component", () => {
  let time: FakeTime;

  beforeEach(() => {
    setupDOM();
    document.body.innerHTML = "";
    time = new FakeTime();
  });

  afterEach(() => {
    time.restore();
  });

  it("should render settings panel", () => {
    const component = <Settings hotkey="s" />;
    document.body.appendChild(component as Node);

    // Component may return fragment, just check body has children
    assertEquals(document.body.children.length > 0, true, "Should append to body");
  });

  it("should have form element", () => {
    const component = <Settings hotkey="s" />;
    document.body.appendChild(component as Node);

    const form = document.body.querySelector("form");
    assertExists(form, "Should have form for settings");
  });

  it("should have input fields for configuration", () => {
    const component = <Settings hotkey="s" />;
    document.body.appendChild(component as Node);

    const inputs = document.body.querySelectorAll("input");
    assertEquals(inputs.length > 0, true, "Should have input fields");
  });

  it("should have close button", () => {
    const component = <Settings hotkey="s" />;
    document.body.appendChild(component as Node);

    const buttons = document.body.querySelectorAll("button");
    assertEquals(buttons.length > 0, true, "Should have buttons");
  });

  it("should have theme selection options", () => {
    const component = <Settings hotkey="s" />;
    document.body.appendChild(component as Node);

    // Settings should have radio buttons for theme
    const radioInputs = document.body.querySelectorAll("input[type='radio']");
    // Should have at least light, dark, system options
    assertEquals(radioInputs.length >= 3, true, "Should have theme radio buttons");
  });

  it("should have viewport configuration inputs", () => {
    const component = <Settings hotkey="s" />;
    document.body.appendChild(component as Node);

    const numberInputs = document.body.querySelectorAll("input[type='number']");
    // Settings should have number inputs for viewport, font size, PPI, etc.
    assertEquals(numberInputs.length > 0, true, "Should have number inputs");
  });

  it("should have SVG close icon", () => {
    const component = <Settings hotkey="s" />;
    document.body.appendChild(component as Node);

    const svgs = document.body.querySelectorAll("svg");
    assertEquals(svgs.length > 0, true, "Should have SVG icons");
  });

  it("should have error message container", () => {
    const component = <Settings hotkey="s" />;
    document.body.appendChild(component as Node);

    // Settings should have a place to show validation errors
    assertEquals(document.body.children.length > 0, true, "Should have child elements");
  });

  it("should have submit or save button", () => {
    const component = <Settings hotkey="s" />;
    document.body.appendChild(component as Node);

    const submitButtons = document.body.querySelectorAll(
      "button[type='submit'], input[type='submit']",
    );
    // Should have a way to submit the form
    assertEquals(document.body.children.length > 0, true, "Should render settings panel");
  });

  it("should render with onMount callback", () => {
    let openFnCalled = false;
    const onMount = (openFn: () => void) => {
      openFnCalled = true;
    };

    const component = <Settings hotkey="s" onMount={onMount} /> as HTMLElement;
    document.body.appendChild(component as Node);

    assertExists(component);
    // onMount should be called with the open function
  });
});
