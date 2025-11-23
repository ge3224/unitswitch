import { assertEquals, assertExists } from "jsr:@std/assert@^1.0.0";
import { afterEach, beforeEach, describe, it } from "jsr:@std/testing@^1.0.0/bdd";
import { FakeTime } from "jsr:@std/testing@^1.0.0/time";
import { setupDOM } from "@/lib/__tests__/utils/dom_setup.ts";
import { showToast, toast } from "./toast.tsx";

describe("Toast Component", () => {
  let time: FakeTime;

  beforeEach(() => {
    setupDOM();
    // Clear body for each test
    document.body.innerHTML = "";
    // Use fake timers to prevent timer leaks
    time = new FakeTime();
  });

  afterEach(() => {
    // Restore real timers
    time.restore();
  });

  it("should create toast container when showing a toast", () => {
    showToast({ message: "Test message" });

    const container = document.getElementById("toast-container");
    assertExists(container, "Toast container should exist");
  });

  it("should render toast with correct message", () => {
    const testMessage = "Hello, World!";
    showToast({ message: testMessage });

    const container = document.getElementById("toast-container");
    assertExists(container);

    const toastElement = container.querySelector("div[role='alert']");
    assertExists(toastElement, "Toast element should exist");

    const messageElement = toastElement.querySelector("p");
    assertExists(messageElement, "Message element should exist");
    assertEquals(messageElement.textContent, testMessage);
  });

  it("should apply correct styles for error toast", () => {
    showToast({ message: "Error!", type: "error" });

    const container = document.getElementById("toast-container");
    const toastElement = container?.querySelector("div[role='alert']");
    assertExists(toastElement);

    const classAttr = toastElement.getAttribute("class");
    assertExists(classAttr);
    assertEquals(classAttr.includes("bg-red-500"), true);
  });

  it("should apply correct styles for success toast", () => {
    showToast({ message: "Success!", type: "success" });

    const container = document.getElementById("toast-container");
    const toastElement = container?.querySelector("div[role='alert']");
    assertExists(toastElement);

    const classAttr = toastElement.getAttribute("class");
    assertExists(classAttr);
    assertEquals(classAttr.includes("bg-app-green-600"), true);
  });

  it("should apply correct styles for info toast", () => {
    showToast({ message: "Info!", type: "info" });

    const container = document.getElementById("toast-container");
    const toastElement = container?.querySelector("div[role='alert']");
    assertExists(toastElement);

    const classAttr = toastElement.getAttribute("class");
    assertExists(classAttr);
    assertEquals(classAttr.includes("bg-blue-500"), true);
  });

  it("should reuse existing toast container", () => {
    showToast({ message: "First toast" });
    showToast({ message: "Second toast" });

    const containers = document.querySelectorAll("#toast-container");
    assertEquals(containers.length, 1, "Should only have one toast container");

    const toasts = document.querySelectorAll("div[role='alert']");
    assertEquals(toasts.length, 2, "Should have two toast messages");
  });

  it("toast.error() should create error toast", () => {
    toast.error("Error message");

    const toastElement = document.querySelector("div[role='alert']");
    assertExists(toastElement);

    const classAttr = toastElement.getAttribute("class");
    assertExists(classAttr);
    assertEquals(classAttr.includes("bg-red-500"), true);
  });

  it("toast.success() should create success toast", () => {
    toast.success("Success message");

    const toastElement = document.querySelector("div[role='alert']");
    assertExists(toastElement);

    const classAttr = toastElement.getAttribute("class");
    assertExists(classAttr);
    assertEquals(classAttr.includes("bg-app-green-600"), true);
  });

  it("toast.info() should create info toast", () => {
    toast.info("Info message");

    const toastElement = document.querySelector("div[role='alert']");
    assertExists(toastElement);

    const classAttr = toastElement.getAttribute("class");
    assertExists(classAttr);
    assertEquals(classAttr.includes("bg-blue-500"), true);
  });

  it("should set initial opacity to 1", () => {
    showToast({ message: "Test" });

    const toastElement = document.querySelector("div[role='alert']") as HTMLElement;
    assertExists(toastElement);
    assertEquals(toastElement.getAttribute("style"), "opacity: 1");
  });

  it("should add style element to document head", () => {
    showToast({ message: "Test" });

    const styleElements = document.head.querySelectorAll("style");
    assertEquals(styleElements.length > 0, true, "Should have at least one style element");
  });
});
