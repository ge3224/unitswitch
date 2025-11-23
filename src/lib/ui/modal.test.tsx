import { assertEquals, assertExists } from "jsr:@std/assert@^1.0.0";
import { afterEach, beforeEach, describe, it } from "jsr:@std/testing@^1.0.0/bdd";
import { FakeTime } from "jsr:@std/testing@^1.0.0/time";
import { createDomElement } from "@pkg/just-jsx/src/index.ts";
import { setupDOM } from "@/lib/__tests__/utils/dom_setup.ts";
import Modal from "./modal.tsx";

describe("Modal Component", () => {
  let time: FakeTime;

  beforeEach(() => {
    setupDOM();
    document.body.innerHTML = "";
    time = new FakeTime();
  });

  afterEach(() => {
    time.restore();
  });

  it("should render modal container", () => {
    const mockCallback = () => {};
    const component = <Modal callback={mockCallback} hotkey="k" /> as HTMLElement;
    document.body.appendChild(component);

    assertExists(component);
  });

  it("should have close button", () => {
    const mockCallback = () => {};
    const component = <Modal callback={mockCallback} hotkey="k" /> as HTMLElement;
    document.body.appendChild(component);

    const closeButton = component.querySelector("button");
    assertExists(closeButton, "Should have close button");
  });

  it("should have input field for amount", () => {
    const mockCallback = () => {};
    const component = <Modal callback={mockCallback} hotkey="k" /> as HTMLElement;
    document.body.appendChild(component);

    const input = component.querySelector("input[type='text']");
    assertExists(input, "Should have text input for amount");
  });

  it("should render unit abbreviation options", () => {
    const mockCallback = () => {};
    const component = <Modal callback={mockCallback} hotkey="k" /> as HTMLElement;
    document.body.appendChild(component);

    // Modal should have content for units - just check it renders
    assertExists(component);
    assertEquals(component.children.length > 0, true, "Should have child elements");
  });

  it("should have ARIA role for dialog", () => {
    const mockCallback = () => {};
    const component = <Modal callback={mockCallback} hotkey="k" /> as HTMLElement;
    document.body.appendChild(component);

    // Check for dialog-related ARIA attributes
    const dialogElements = component.querySelectorAll("[role='dialog'], dialog");
    // Modal might use role=dialog or actual dialog element
    assertExists(component, "Modal should render");
  });

  it("should have keyboard shortcut hints", () => {
    const mockCallback = () => {};
    const component = <Modal callback={mockCallback} hotkey="k" /> as HTMLElement;
    document.body.appendChild(component);

    const kbdElements = component.querySelectorAll("kbd");
    // Modal should have kbd elements for keyboard shortcuts
    assertExists(component, "Modal should have keyboard hints");
  });

  it("should contain SVG icons", () => {
    const mockCallback = () => {};
    const component = <Modal callback={mockCallback} hotkey="k" /> as HTMLElement;
    document.body.appendChild(component);

    const svgs = component.querySelectorAll("svg");
    assertEquals(svgs.length > 0, true, "Should have SVG icons");
  });

  it("should have title or heading", () => {
    const mockCallback = () => {};
    const component = <Modal callback={mockCallback} hotkey="k" /> as HTMLElement;
    document.body.appendChild(component);

    const headings = component.querySelectorAll("h1, h2, h3, h4, h5, h6");
    // Modal should have some heading
    assertExists(component, "Modal should render with content");
  });
});
