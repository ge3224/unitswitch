import { describe, it } from "jsr:@std/testing/bdd";
import { assert, assertAlmostEquals, assertEquals } from "jsr:@std/assert";
import { convertToMillimeters } from "@/lib/converters/millimeters.ts";
import { Units } from "@/lib/units.ts";
import {
  CH_TO_EM_RATIO,
  EX_TO_EM_RATIO,
  FONT_SIZE,
  PPI,
  VIEWPORT_HEIGHT,
  VIEWPORT_WIDTH,
} from "@/lib/constants.ts";
import { AppErrorKind } from "@/lib/result.ts";

describe("convertToMillimeters", () => {
  describe("known constants", () => {
    it("should convert inches using standard relationship (1 inch = 25.4 mm)", () => {
      const result = convertToMillimeters(Units.Inches, 1);
      assert(result.ok);
      assertAlmostEquals(result.value, 25.4, 0.1);
    });

    it("should convert centimeters using standard relationship (1 cm = 10 mm)", () => {
      const result = convertToMillimeters(Units.Centimeters, 1);
      assert(result.ok);
      assertAlmostEquals(result.value, 10, 0.1);
    });

    it("should convert feet using standard relationship (1 foot = 12 inches = 304.8 mm)", () => {
      const result = convertToMillimeters(Units.Feet, 1);
      assert(result.ok);
      assertAlmostEquals(result.value, 304.8, 0.1);
    });

    it("should convert pixels using PPI (96 pixels = 1 inch = 25.4 mm)", () => {
      const result = convertToMillimeters(Units.Pixels, PPI);
      assert(result.ok);
      assertAlmostEquals(result.value, 25.4, 0.1);
    });
  });

  describe("proportionality", () => {
    it("should scale proportionally", () => {
      const result1 = convertToMillimeters(Units.Inches, 2);
      const result2 = convertToMillimeters(Units.Inches, 4);
      assert(result1.ok && result2.ok);
      assertAlmostEquals(result2.value, result1.value * 2, 0.1);
    });
  });

  describe("edge cases", () => {
    it("should return Err for negative inputs", () => {
      const result1 = convertToMillimeters(Units.Inches, -1);
      assert(!result1.ok);
      assertEquals(result1.error.kind, AppErrorKind.NegativeInput);

      const result2 = convertToMillimeters(Units.Pixels, -5);
      assert(!result2.ok);
      assertEquals(result2.error.kind, AppErrorKind.NegativeInput);
    });

    it("should handle zero correctly", () => {
      const result1 = convertToMillimeters(Units.Inches, 0);
      assert(result1.ok);
      assert(result1.value >= 0);

      const result2 = convertToMillimeters(Units.Millimeters, 0);
      assert(result2.ok);
      assert(result2.value >= 0);
    });
  });

  describe("identity conversion", () => {
    it("should return the same value when converting millimeters to millimeters", () => {
      const result1 = convertToMillimeters(Units.Millimeters, 10);
      assert(result1.ok);
      assertAlmostEquals(result1.value, 10, 0.1);

      const result2 = convertToMillimeters(Units.Millimeters, 25.4);
      assert(result2.ok);
      assertAlmostEquals(result2.value, 25.4, 0.1);
    });
  });

  describe("font-based units", () => {
    it("should convert Ch to millimeters via pixels", () => {
      const result = convertToMillimeters(Units.Ch, 1);
      assert(result.ok);
      const expectedPixels = FONT_SIZE * CH_TO_EM_RATIO;
      const expectedMm = (expectedPixels / PPI) * 25.4;
      assertAlmostEquals(result.value, expectedMm, 0.1);
    });

    it("should convert Ex to millimeters via pixels", () => {
      const result = convertToMillimeters(Units.Ex, 1);
      assert(result.ok);
      const expectedPixels = FONT_SIZE * EX_TO_EM_RATIO;
      const expectedMm = (expectedPixels / PPI) * 25.4;
      assertAlmostEquals(result.value, expectedMm, 0.1);
    });

    it("should convert Rems to millimeters via pixels", () => {
      const result = convertToMillimeters(Units.Rems, 1);
      assert(result.ok);
      const expectedMm = (FONT_SIZE / PPI) * 25.4;
      assertAlmostEquals(result.value, expectedMm, 0.1);
    });
  });

  describe("viewport-based units", () => {
    it("should convert Vh to millimeters via pixels", () => {
      const result = convertToMillimeters(Units.Vh, 1);
      assert(result.ok);
      const expectedPixels = VIEWPORT_HEIGHT / 100;
      const expectedMm = (expectedPixels / PPI) * 25.4;
      assertAlmostEquals(result.value, expectedMm, 0.1);
    });

    it("should convert Vw to millimeters via pixels", () => {
      const result = convertToMillimeters(Units.Vw, 1);
      assert(result.ok);
      const expectedPixels = VIEWPORT_WIDTH / 100;
      const expectedMm = (expectedPixels / PPI) * 25.4;
      assertAlmostEquals(result.value, expectedMm, 0.1);
    });

    it("should convert Vmin to millimeters via pixels", () => {
      const result = convertToMillimeters(Units.Vmin, 1);
      assert(result.ok);
      const expectedPixels = Math.min(VIEWPORT_WIDTH, VIEWPORT_HEIGHT) / 100;
      const expectedMm = (expectedPixels / PPI) * 25.4;
      assertAlmostEquals(result.value, expectedMm, 0.1);
    });

    it("should convert Vmax to millimeters via pixels", () => {
      const result = convertToMillimeters(Units.Vmax, 1);
      assert(result.ok);
      const expectedPixels = Math.max(VIEWPORT_WIDTH, VIEWPORT_HEIGHT) / 100;
      const expectedMm = (expectedPixels / PPI) * 25.4;
      assertAlmostEquals(result.value, expectedMm, 0.1);
    });
  });

  describe("ratio-based units", () => {
    it("should return -1 for Golden ratio unit", () => {
      const result = convertToMillimeters(Units.Golden, 10);
      assert(result.ok);
      assertEquals(result.value, -1);
    });

    it("should return -1 for Root2 ratio unit", () => {
      const result = convertToMillimeters(Units.Root2, 10);
      assert(result.ok);
      assertEquals(result.value, -1);
    });

    it("should return -1 for SixteenNine ratio unit", () => {
      const result = convertToMillimeters(Units.SixteenNine, 10);
      assert(result.ok);
      assertEquals(result.value, -1);
    });
  });
});
