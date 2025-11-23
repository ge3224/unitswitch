import { assertEquals, assertExists } from "jsr:@std/assert@^1.0.0";
import { beforeEach, describe, it } from "jsr:@std/testing@^1.0.0/bdd";
import { createDomElement } from "@pkg/just-jsx/src/index.ts";
import { setupDOM } from "@/lib/testing/dom_setup.ts";
import Logo from "./logo.tsx";

describe("Logo Component", () => {
  beforeEach(() => {
    setupDOM();
    document.body.innerHTML = "";
  });

  it("should render the logo container", () => {
    const logo = <Logo /> as HTMLElement;
    document.body.appendChild(logo);

    assertExists(logo);
    assertEquals(logo.tagName, "DIV");
    const classAttr = logo.getAttribute("class");
    assertExists(classAttr);
    assertEquals(classAttr.includes("flex"), true);
    assertEquals(classAttr.includes("items-center"), true);
    assertEquals(classAttr.includes("justify-center"), true);
  });

  it("should render SVG with correct dimensions", () => {
    const logo = <Logo /> as HTMLElement;
    document.body.appendChild(logo);

    const svg = logo.querySelector("svg");
    assertExists(svg, "SVG element should exist");
    assertEquals(svg.getAttribute("width"), "50");
    assertEquals(svg.getAttribute("height"), "35");
    assertEquals(svg.getAttribute("viewBox"), "0 0 67 46");
  });

  it("should have proper accessibility attributes", () => {
    const logo = <Logo /> as HTMLElement;
    document.body.appendChild(logo);

    const svg = logo.querySelector("svg");
    assertExists(svg);

    assertEquals(svg.getAttribute("role"), "img");
    assertEquals(svg.getAttribute("aria-labelledby"), "logo-title");

    const title = svg.querySelector("title");
    assertExists(title, "Title element should exist for accessibility");
    assertEquals(title.getAttribute("id"), "logo-title");
    assertEquals(title.textContent, "UnitSwitch logo");
  });

  it("should render three SVG paths", () => {
    const logo = <Logo /> as HTMLElement;
    document.body.appendChild(logo);

    const svg = logo.querySelector("svg");
    assertExists(svg);

    const paths = svg.querySelectorAll("path");
    assertEquals(paths.length, 3, "Should have 3 path elements for logo shapes");
  });

  it("should render h1 with correct text", () => {
    const logo = <Logo /> as HTMLElement;
    document.body.appendChild(logo);

    const h1 = logo.querySelector("h1");
    assertExists(h1, "H1 element should exist");
    assertEquals(h1.textContent, "UnitSwitch");
  });

  it("should apply correct styles to h1", () => {
    const logo = <Logo /> as HTMLElement;
    document.body.appendChild(logo);

    const h1 = logo.querySelector("h1");
    assertExists(h1);

    const classAttr = h1.getAttribute("class");
    assertExists(classAttr);
    assertEquals(classAttr.includes("ml-1"), true);
    assertEquals(classAttr.includes("text-2xl"), true);
    assertEquals(classAttr.includes("font-bold"), true);
    assertEquals(classAttr.includes("text-app-black"), true);
  });

  it("should have SVG in correct namespace", () => {
    const logo = <Logo /> as HTMLElement;
    document.body.appendChild(logo);

    const svg = logo.querySelector("svg");
    assertExists(svg);
    assertEquals(svg.namespaceURI, "http://www.w3.org/2000/svg");
  });

  it("should have all paths in SVG namespace", () => {
    const logo = <Logo /> as HTMLElement;
    document.body.appendChild(logo);

    const paths = logo.querySelectorAll("path");
    paths.forEach((path) => {
      assertEquals(path.namespaceURI, "http://www.w3.org/2000/svg");
    });
  });
});
