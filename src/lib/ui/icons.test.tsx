import { assertEquals, assertExists } from "jsr:@std/assert@^1.0.0";
import { beforeEach, describe, it } from "jsr:@std/testing@^1.0.0/bdd";
import { createDomElement, createRef } from "@pkg/just-jsx/src/index.ts";
import { setupDOM } from "@/lib/__tests__/utils/dom_setup.ts";
import {
  CloseIcon,
  CopyIconSvg,
  GrayPlusIcon,
  MinusIcon,
  PlusIcon,
  SettingsIcon,
} from "./icons.tsx";

describe("Icon Components", () => {
  beforeEach(() => {
    setupDOM();
    document.body.innerHTML = "";
  });

  describe("CopyIconSvg", () => {
    it("should render SVG with correct dimensions", () => {
      const icon = <CopyIconSvg /> as SVGElement;
      document.body.appendChild(icon);

      assertEquals(icon.getAttribute("width"), "21");
      assertEquals(icon.getAttribute("height"), "21");
      assertEquals(icon.getAttribute("viewBox"), "0 0 21 21");
    });

    it("should have inline class", () => {
      const icon = <CopyIconSvg /> as SVGElement;
      document.body.appendChild(icon);

      const classAttr = icon.getAttribute("class");
      assertExists(classAttr);
      assertEquals(classAttr, "inline");
    });

    it("should be hidden from screen readers", () => {
      const icon = <CopyIconSvg /> as SVGElement;
      document.body.appendChild(icon);

      assertEquals(icon.getAttribute("aria-hidden"), "true");
    });

    it("should have two path elements", () => {
      const icon = <CopyIconSvg /> as SVGElement;
      document.body.appendChild(icon);

      const paths = icon.querySelectorAll("path");
      assertEquals(paths.length, 2);
    });

    it("should be in SVG namespace", () => {
      const icon = <CopyIconSvg /> as SVGElement;
      document.body.appendChild(icon);

      assertEquals(icon.namespaceURI, "http://www.w3.org/2000/svg");
    });
  });

  describe("PlusIcon", () => {
    it("should render SVG with correct dimensions", () => {
      const ref = createRef<SVGElement>();
      const icon = <PlusIcon ref={ref} /> as SVGElement;
      document.body.appendChild(icon);

      assertEquals(icon.getAttribute("width"), "14");
      assertEquals(icon.getAttribute("height"), "14");
      assertEquals(icon.getAttribute("viewBox"), "0 0 14 14");
    });

    it("should support ref", () => {
      const ref = createRef<SVGElement>();
      const icon = <PlusIcon ref={ref} /> as SVGElement;
      document.body.appendChild(icon);

      assertExists(ref.current);
      assertEquals(ref.current, icon);
    });

    it("should have two paths for plus symbol", () => {
      const ref = createRef<SVGElement>();
      const icon = <PlusIcon ref={ref} /> as SVGElement;
      document.body.appendChild(icon);

      const paths = icon.querySelectorAll("path");
      assertEquals(paths.length, 2, "Plus icon should have horizontal and vertical lines");
    });

    it("should be hidden from screen readers", () => {
      const ref = createRef<SVGElement>();
      const icon = <PlusIcon ref={ref} /> as SVGElement;
      document.body.appendChild(icon);

      assertEquals(icon.getAttribute("aria-hidden"), "true");
    });

    it("should apply stroke color class", () => {
      const ref = createRef<SVGElement>();
      const icon = <PlusIcon ref={ref} /> as SVGElement;
      document.body.appendChild(icon);

      const paths = icon.querySelectorAll("path");
      paths.forEach((path) => {
        const classAttr = path.getAttribute("class");
        assertExists(classAttr);
        assertEquals(classAttr.includes("stroke-app-green-500"), true);
      });
    });
  });

  describe("MinusIcon", () => {
    it("should render SVG with correct dimensions", () => {
      const ref = createRef<SVGElement>();
      const icon = <MinusIcon ref={ref} /> as SVGElement;
      document.body.appendChild(icon);

      assertEquals(icon.getAttribute("width"), "14");
      assertEquals(icon.getAttribute("height"), "14");
      assertEquals(icon.getAttribute("viewBox"), "0 0 14 14");
    });

    it("should support ref", () => {
      const ref = createRef<SVGElement>();
      const icon = <MinusIcon ref={ref} /> as SVGElement;
      document.body.appendChild(icon);

      assertExists(ref.current);
      assertEquals(ref.current, icon);
    });

    it("should be hidden by default", () => {
      const ref = createRef<SVGElement>();
      const icon = <MinusIcon ref={ref} /> as SVGElement;
      document.body.appendChild(icon);

      const classAttr = icon.getAttribute("class");
      assertExists(classAttr);
      assertEquals(classAttr, "hidden");
    });

    it("should have one path for minus symbol", () => {
      const ref = createRef<SVGElement>();
      const icon = <MinusIcon ref={ref} /> as SVGElement;
      document.body.appendChild(icon);

      const paths = icon.querySelectorAll("path");
      assertEquals(paths.length, 1, "Minus icon should have only horizontal line");
    });

    it("should be hidden from screen readers", () => {
      const ref = createRef<SVGElement>();
      const icon = <MinusIcon ref={ref} /> as SVGElement;
      document.body.appendChild(icon);

      assertEquals(icon.getAttribute("aria-hidden"), "true");
    });
  });

  describe("GrayPlusIcon", () => {
    it("should render SVG with correct dimensions", () => {
      const icon = <GrayPlusIcon /> as SVGElement;
      document.body.appendChild(icon);

      assertEquals(icon.getAttribute("width"), "14");
      assertEquals(icon.getAttribute("height"), "14");
      assertEquals(icon.getAttribute("viewBox"), "0 0 14 14");
    });

    it("should have gray stroke color", () => {
      const icon = <GrayPlusIcon /> as SVGElement;
      document.body.appendChild(icon);

      const paths = icon.querySelectorAll("path");
      paths.forEach((path) => {
        const classAttr = path.getAttribute("class");
        assertExists(classAttr);
        assertEquals(classAttr.includes("stroke-app-gray-100"), true);
      });
    });

    it("should have two paths for plus symbol", () => {
      const icon = <GrayPlusIcon /> as SVGElement;
      document.body.appendChild(icon);

      const paths = icon.querySelectorAll("path");
      assertEquals(paths.length, 2);
    });

    it("should be hidden from screen readers", () => {
      const icon = <GrayPlusIcon /> as SVGElement;
      document.body.appendChild(icon);

      assertEquals(icon.getAttribute("aria-hidden"), "true");
    });
  });

  describe("CloseIcon", () => {
    it("should render SVG with correct dimensions", () => {
      const icon = <CloseIcon /> as SVGElement;
      document.body.appendChild(icon);

      assertEquals(icon.getAttribute("width"), "24");
      assertEquals(icon.getAttribute("height"), "24");
      assertEquals(icon.getAttribute("viewBox"), "0 0 48 48");
    });

    it("should have two paths for X symbol", () => {
      const icon = <CloseIcon /> as SVGElement;
      document.body.appendChild(icon);

      const paths = icon.querySelectorAll("path");
      assertEquals(paths.length, 2, "Close icon should have two diagonal lines");
    });

    it("should apply stroke color class", () => {
      const icon = <CloseIcon /> as SVGElement;
      document.body.appendChild(icon);

      const paths = icon.querySelectorAll("path");
      paths.forEach((path) => {
        const classAttr = path.getAttribute("class");
        assertExists(classAttr);
        assertEquals(classAttr.includes("stroke-app-green-500"), true);
      });
    });

    it("should be hidden from screen readers", () => {
      const icon = <CloseIcon /> as SVGElement;
      document.body.appendChild(icon);

      assertEquals(icon.getAttribute("aria-hidden"), "true");
    });
  });

  describe("SettingsIcon", () => {
    it("should render SVG with correct dimensions", () => {
      const icon = <SettingsIcon /> as SVGElement;
      document.body.appendChild(icon);

      assertEquals(icon.getAttribute("width"), "20");
      assertEquals(icon.getAttribute("height"), "20");
      assertEquals(icon.getAttribute("viewBox"), "0 0 24 24");
    });

    it("should have two paths for settings gear", () => {
      const icon = <SettingsIcon /> as SVGElement;
      document.body.appendChild(icon);

      const paths = icon.querySelectorAll("path");
      assertEquals(paths.length, 2, "Settings icon should have center circle and outer gear");
    });

    it("should use currentColor for stroke", () => {
      const icon = <SettingsIcon /> as SVGElement;
      document.body.appendChild(icon);

      const paths = icon.querySelectorAll("path");
      paths.forEach((path) => {
        assertEquals(path.getAttribute("stroke"), "currentColor");
      });
    });

    it("should be hidden from screen readers", () => {
      const icon = <SettingsIcon /> as SVGElement;
      document.body.appendChild(icon);

      assertEquals(icon.getAttribute("aria-hidden"), "true");
    });

    it("should be in SVG namespace", () => {
      const icon = <SettingsIcon /> as SVGElement;
      document.body.appendChild(icon);

      assertEquals(icon.namespaceURI, "http://www.w3.org/2000/svg");
    });
  });
});
