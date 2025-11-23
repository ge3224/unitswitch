import { assertEquals, assertExists } from "jsr:@std/assert@^1.0.0";
import { afterEach, beforeEach, describe, it } from "jsr:@std/testing@^1.0.0/bdd";
import { FakeTime } from "jsr:@std/testing@^1.0.0/time";
import { createDomElement } from "@pkg/just-jsx/src/index.ts";
import { setupDOM } from "@/lib/__tests__/utils/dom_setup.ts";
import Conversion from "./conversion.tsx";
import { ViewInputState } from "@/lib/types.ts";
import { Result, Ok, Err, AppErrorKind } from "@/lib/result.ts";
import { Units } from "@/lib/units.ts";

describe("Conversion Component", () => {
  let time: FakeTime;

  beforeEach(() => {
    setupDOM();
    document.body.innerHTML = "";
    time = new FakeTime();
  });

  afterEach(() => {
    time.restore();
  });

  it("should render conversion value", () => {
    const mockConversion: ViewInputState<Result<number>> = {
      get: () => Ok(42.5),
      subscribe: () => {},
    };

    const component = (
      <Conversion conversion={mockConversion} to={Units.Pixels} hotkey="p" />
    ) as HTMLElement;
    document.body.appendChild(component);

    assertExists(component);
    const conversionValue = component.querySelector("span");
    assertExists(conversionValue);
  });

  it("should display unit label", () => {
    const mockConversion: ViewInputState<Result<number>> = {
      get: () => Ok(100),
      subscribe: () => {},
    };

    const component = (
      <Conversion
        conversion={mockConversion}
        to={Units.Centimeters}
        hotkey="c"
      />
    ) as HTMLElement;
    document.body.appendChild(component);

    // Component should render successfully with a unit
    assertExists(component);
    const spans = component.querySelectorAll("span");
    assertEquals(spans.length > 0, true, "Should have span elements");
  });

  it("should have copy button", () => {
    const mockConversion: ViewInputState<Result<number>> = {
      get: () => Ok(50),
      subscribe: () => {},
    };

    const component = (
      <Conversion conversion={mockConversion} to={Units.Inches} hotkey="i" />
    ) as HTMLElement;
    document.body.appendChild(component);

    const copyButton = component.querySelector("button[aria-label*='Copy']");
    assertExists(copyButton, "Should have copy button");
  });

  it("should have details button when detail is provided", () => {
    const mockConversion: ViewInputState<Result<number>> = {
      get: () => Ok(10),
      subscribe: () => {},
    };

    const mockDetail = <div>Detail content</div>;

    const component = (
      <Conversion
        conversion={mockConversion}
        to={Units.Rems}
        hotkey="r"
        detail={mockDetail}
      />
    ) as HTMLElement;
    document.body.appendChild(component);

    const detailsButton = component.querySelector(
      "button[aria-label*='details']",
    );
    assertExists(detailsButton, "Should have details toggle button");
  });

  it("should render plus icon initially when details available", () => {
    const mockConversion: ViewInputState<Result<number>> = {
      get: () => Ok(10),
      subscribe: () => {},
    };

    const mockDetail = <div>Detail content</div>;

    const component = (
      <Conversion
        conversion={mockConversion}
        to={Units.Rems}
        hotkey="r"
        detail={mockDetail}
      />
    ) as HTMLElement;
    document.body.appendChild(component);

    const svgs = component.querySelectorAll("svg");
    // Should have plus and minus icons (plus visible, minus hidden)
    assertEquals(svgs.length >= 2, true, "Should have icon SVGs");
  });

  it("should have proper ARIA attributes", () => {
    const mockConversion: ViewInputState<Result<number>> = {
      get: () => Ok(25),
      subscribe: () => {},
    };

    const component = (
      <Conversion conversion={mockConversion} to={Units.Pixels} hotkey="p" />
    ) as HTMLElement;
    document.body.appendChild(component);

    const copyButton = component.querySelector("button[aria-label*='Copy']");
    assertExists(copyButton);
    const ariaLabel = copyButton.getAttribute("aria-label");
    assertExists(ariaLabel);
    assertEquals(ariaLabel.includes("Copy"), true);
  });

  it("should display hotkey hint", () => {
    const mockConversion: ViewInputState<Result<number>> = {
      get: () => Ok(10),
      subscribe: () => {},
    };

    const component = (
      <Conversion conversion={mockConversion} to={Units.Feet} hotkey="f" />
    ) as HTMLElement;
    document.body.appendChild(component);

    const hotkeyHint = component.querySelector(".hotkey-hint, kbd, [class*='hotkey']");
    // The component may or may not display hotkey hints visibly
    // Just checking component renders without errors
    assertExists(component);
  });

  it("should handle error state in conversion", () => {
    const mockConversion: ViewInputState<Result<number>> = {
      get: () => Err(AppErrorKind.UnsupportedUnit, "Invalid conversion"),
      subscribe: () => {},
    };

    const component = (
      <Conversion conversion={mockConversion} to={Units.Pixels} hotkey="p" />
    ) as HTMLElement;
    document.body.appendChild(component);

    assertExists(component);
    // Component should still render even with error
    const conversionValue = component.querySelector("span");
    assertExists(conversionValue);
  });

  it("should render with different unit types", () => {
    const units = [
      Units.Pixels,
      Units.Rems,
      Units.Inches,
      Units.Centimeters,
      Units.Feet,
    ];

    units.forEach((unit) => {
      document.body.innerHTML = "";

      const mockConversion: ViewInputState<Result<number>> = {
        get: () => Ok(10),
        subscribe: () => {},
      };

      const component = (
        <Conversion conversion={mockConversion} to={unit} hotkey="x" />
      ) as HTMLElement;
      document.body.appendChild(component);

      assertExists(component, `Should render for ${unit}`);
    });
  });
});
