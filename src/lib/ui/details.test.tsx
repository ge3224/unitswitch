import { assertEquals, assertExists } from "jsr:@std/assert@^1.0.0";
import { afterEach, beforeEach, describe, it } from "jsr:@std/testing@^1.0.0/bdd";
import { FakeTime } from "jsr:@std/testing@^1.0.0/time";
import { createDomElement } from "@pkg/just-jsx/src/index.ts";
import { setupDOM } from "@/lib/testing/dom_setup.ts";
import {
  DetailsGoldenRatio,
  DetailsPixels,
  DetailsRemsEms,
  DetailsRootTwo,
  DetailsSixteenNine,
} from "./details.tsx";
import { ViewInputState } from "@/lib/types.ts";
import { configState } from "@/lib/config.ts";

describe("Details Components", () => {
  let time: FakeTime;

  beforeEach(() => {
    setupDOM();
    document.body.innerHTML = "";
    time = new FakeTime();
  });

  afterEach(() => {
    time.restore();
  });

  describe("DetailsRemsEms", () => {
    it("should render font size information", () => {
      const component = <DetailsRemsEms /> as HTMLElement;
      document.body.appendChild(component);

      assertExists(component);
      assertEquals(component.tagName, "DIV");

      const span = component.querySelector("span.font-bold");
      assertExists(span, "Should have bold span for font size");
    });

    it("should display current font size from config", () => {
      const currentConfig = configState.get();
      const component = <DetailsRemsEms /> as HTMLElement;
      document.body.appendChild(component);

      const span = component.querySelector("span.font-bold");
      assertExists(span);
      assertEquals(span.textContent, `${currentConfig.fontSize}px`);
    });

    it("should have button with root hint", () => {
      const component = <DetailsRemsEms /> as HTMLElement;
      document.body.appendChild(component);

      const button = component.querySelector("button");
      assertExists(button);
      assertEquals(button.textContent, "root*");
      assertEquals(button.getAttribute("type"), "button");
      assertExists(button.getAttribute("title"));
    });

    it("should have accessibility label on button", () => {
      const component = <DetailsRemsEms /> as HTMLElement;
      document.body.appendChild(component);

      const button = component.querySelector("button");
      assertExists(button);
      assertEquals(
        button.getAttribute("aria-label"),
        "Click for explanation of root font size",
      );
    });
  });

  describe("DetailsPixels", () => {
    it("should render PPI information", () => {
      const component = <DetailsPixels /> as HTMLElement;
      document.body.appendChild(component);

      assertExists(component);
      assertEquals(component.tagName, "DIV");

      const span = component.querySelector("span.font-bold");
      assertExists(span, "Should have bold span for PPI");
    });

    it("should display current PPI from config", () => {
      const currentConfig = configState.get();
      const component = <DetailsPixels /> as HTMLElement;
      document.body.appendChild(component);

      const span = component.querySelector("span.font-bold");
      assertExists(span);
      assertEquals(span.textContent, `${currentConfig.ppi} DPI`);
    });

    it("should contain resolution text", () => {
      const component = <DetailsPixels /> as HTMLElement;
      document.body.appendChild(component);

      const text = component.textContent || "";
      assertEquals(text.includes("Based on a resolution of"), true);
    });
  });

  describe("DetailsGoldenRatio", () => {
    it("should render SVG visualization", () => {
      const mockInput: ViewInputState<number> = {
        get: () => 10,
        subscribe: () => {},
      };

      const component = <DetailsGoldenRatio input={mockInput} /> as HTMLElement;
      document.body.appendChild(component);

      const svg = component.querySelector("svg");
      assertExists(svg, "Should have SVG element");
      assertEquals(svg.getAttribute("width"), "327");
      assertEquals(svg.getAttribute("height"), "149");
    });

    it("should have rect elements for golden ratio visualization", () => {
      const mockInput: ViewInputState<number> = {
        get: () => 10,
        subscribe: () => {},
      };

      const component = <DetailsGoldenRatio input={mockInput} /> as HTMLElement;
      document.body.appendChild(component);

      const rects = component.querySelectorAll("rect");
      assertEquals(rects.length, 2, "Should have 2 rectangles for golden ratio");
    });

    it("should have text elements for dimensions", () => {
      const mockInput: ViewInputState<number> = {
        get: () => 10,
        subscribe: () => {},
      };

      const component = <DetailsGoldenRatio input={mockInput} /> as HTMLElement;
      document.body.appendChild(component);

      const textElements = component.querySelectorAll("text");
      assertEquals(textElements.length, 4, "Should have 4 text labels for dimensions");
    });

    it("should display initial value correctly", () => {
      const initialValue = 100;
      const mockInput: ViewInputState<number> = {
        get: () => initialValue,
        subscribe: () => {},
      };

      const component = <DetailsGoldenRatio input={mockInput} /> as HTMLElement;
      document.body.appendChild(component);

      const textElements = component.querySelectorAll("text");
      const hasInitialValue = Array.from(textElements).some(
        (text) => text.textContent === initialValue.toFixed(2),
      );
      assertEquals(hasInitialValue, true, "Should display initial value");
    });
  });

  describe("DetailsSixteenNine", () => {
    it("should render SVG visualization", () => {
      const mockInput: ViewInputState<number> = {
        get: () => 16,
        subscribe: () => {},
      };

      const component = <DetailsSixteenNine input={mockInput} /> as HTMLElement;
      document.body.appendChild(component);

      const svg = component.querySelector("svg");
      assertExists(svg, "Should have SVG element");
      assertEquals(svg.getAttribute("width"), "263");
      assertEquals(svg.getAttribute("height"), "149");
    });

    it("should have path elements for 16:9 visualization", () => {
      const mockInput: ViewInputState<number> = {
        get: () => 16,
        subscribe: () => {},
      };

      const component = <DetailsSixteenNine input={mockInput} /> as HTMLElement;
      document.body.appendChild(component);

      const paths = component.querySelectorAll("path");
      assertEquals(paths.length > 0, true, "Should have path elements");
    });

    it("should have text elements for dimensions", () => {
      const mockInput: ViewInputState<number> = {
        get: () => 16,
        subscribe: () => {},
      };

      const component = <DetailsSixteenNine input={mockInput} /> as HTMLElement;
      document.body.appendChild(component);

      const textElements = component.querySelectorAll("text");
      assertEquals(textElements.length, 4, "Should have 4 text labels");
    });

    it("should display initial value correctly", () => {
      const initialValue = 90;
      const mockInput: ViewInputState<number> = {
        get: () => initialValue,
        subscribe: () => {},
      };

      const component = <DetailsSixteenNine input={mockInput} /> as HTMLElement;
      document.body.appendChild(component);

      const textElements = component.querySelectorAll("text");
      const values = Array.from(textElements).map((t) => t.textContent);
      const hasInitialValue = values.includes(initialValue.toFixed(2));
      assertEquals(hasInitialValue, true, "Should display initial value");
    });
  });

  describe("DetailsRootTwo", () => {
    it("should render SVG visualization", () => {
      const mockInput: ViewInputState<number> = {
        get: () => 10,
        subscribe: () => {},
      };

      const component = <DetailsRootTwo input={mockInput} /> as HTMLElement;
      document.body.appendChild(component);

      const svg = component.querySelector("svg");
      assertExists(svg, "Should have SVG element");
      assertEquals(svg.getAttribute("width"), "293");
      assertEquals(svg.getAttribute("height"), "149");
    });

    it("should have path elements for root-2 visualization", () => {
      const mockInput: ViewInputState<number> = {
        get: () => 10,
        subscribe: () => {},
      };

      const component = <DetailsRootTwo input={mockInput} /> as HTMLElement;
      document.body.appendChild(component);

      const paths = component.querySelectorAll("path");
      assertEquals(paths.length > 0, true, "Should have path elements");
    });

    it("should have text elements for dimensions", () => {
      const mockInput: ViewInputState<number> = {
        get: () => 10,
        subscribe: () => {},
      };

      const component = <DetailsRootTwo input={mockInput} /> as HTMLElement;
      document.body.appendChild(component);

      const textElements = component.querySelectorAll("text");
      assertEquals(textElements.length, 4, "Should have 4 text labels for dimensions");
    });

    it("should display initial value correctly", () => {
      const initialValue = 50;
      const mockInput: ViewInputState<number> = {
        get: () => initialValue,
        subscribe: () => {},
      };

      const component = <DetailsRootTwo input={mockInput} /> as HTMLElement;
      document.body.appendChild(component);

      const textElements = component.querySelectorAll("text");
      const hasInitialValue = Array.from(textElements).some(
        (text) => text.textContent === initialValue.toFixed(2),
      );
      assertEquals(hasInitialValue, true, "Should display initial value");
    });
  });
});
