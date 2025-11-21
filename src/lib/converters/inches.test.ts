import { describe, it } from "jsr:@std/testing/bdd";
import { assert, assertAlmostEquals, assertEquals } from "jsr:@std/assert";
import { convertToInches } from "@/lib/converters/inches.ts";
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

describe("convertToInches", () => {
  describe("known constants", () => {
    it("should respect PPI constant (96 pixels = 1 inch)", () => {
      const result = convertToInches(Units.Pixels, PPI);
      assert(result.ok);
      assertAlmostEquals(result.value, 1, 0.1);
    });

    it("should convert feet using standard relationship (1 foot = 12 inches)", () => {
      const result = convertToInches(Units.Feet, 1);
      assert(result.ok);
      assertAlmostEquals(result.value, 12, 1);
    });

    it("should convert centimeters using standard relationship (1 inch = 2.54 cm)", () => {
      const result = convertToInches(Units.Centimeters, 2.54);
      assert(result.ok);
      assertAlmostEquals(result.value, 1, 0.1);
    });

    it("should convert millimeters using standard relationship (1 inch = 25.4 mm)", () => {
      const result = convertToInches(Units.Millimeters, 25.4);
      assert(result.ok);
      assertAlmostEquals(result.value, 1, 0.1);
    });

    it("should convert points using standard relationship (72 points = 1 inch)", () => {
      const result = convertToInches(Units.Points, 72);
      assert(result.ok);
      assertAlmostEquals(result.value, 1, 0.1);
    });

    it("should convert picas using standard relationship (6 picas = 1 inch)", () => {
      const result = convertToInches(Units.Picas, 6);
      assert(result.ok);
      assertAlmostEquals(result.value, 1, 0.1);
    });
  });

  describe("proportionality", () => {
    it("should scale proportionally", () => {
      const result1 = convertToInches(Units.Feet, 2);
      const result2 = convertToInches(Units.Feet, 4);
      assert(result1.ok && result2.ok);
      assertAlmostEquals(result2.value, result1.value * 2, 0.1);
    });
  });

  describe("edge cases", () => {
    it("should return Err for negative inputs", () => {
      const result1 = convertToInches(Units.Pixels, -1);
      assert(!result1.ok);
      assertEquals(result1.error.kind, AppErrorKind.NegativeInput);

      const result2 = convertToInches(Units.Feet, -5);
      assert(!result2.ok);
      assertEquals(result2.error.kind, AppErrorKind.NegativeInput);
    });

    it("should handle zero correctly", () => {
      const result1 = convertToInches(Units.Pixels, 0);
      assert(result1.ok);
      assert(result1.value >= 0);

      const result2 = convertToInches(Units.Feet, 0);
      assert(result2.ok);
      assert(result2.value >= 0);
    });
  });

  describe("identity conversion", () => {
    it("should return the same value when converting inches to inches", () => {
      const result1 = convertToInches(Units.Inches, 5);
      assert(result1.ok);
      assertAlmostEquals(result1.value, 5, 0.1);

      const result2 = convertToInches(Units.Inches, 10.5);
      assert(result2.ok);
      assertAlmostEquals(result2.value, 10.5, 0.1);
    });
  });

  describe("font-based units", () => {
    it("should convert Ch to inches via pixels", () => {
      const result = convertToInches(Units.Ch, 1);
      assert(result.ok);
      const expectedPixels = FONT_SIZE * CH_TO_EM_RATIO;
      const expectedInches = expectedPixels / PPI;
      assertAlmostEquals(result.value, expectedInches, 0.1);
    });

    it("should convert Ex to inches via pixels", () => {
      const result = convertToInches(Units.Ex, 1);
      assert(result.ok);
      const expectedPixels = FONT_SIZE * EX_TO_EM_RATIO;
      const expectedInches = expectedPixels / PPI;
      assertAlmostEquals(result.value, expectedInches, 0.1);
    });

    it("should convert Rems to inches via pixels", () => {
      const result = convertToInches(Units.Rems, 1);
      assert(result.ok);
      const expectedInches = FONT_SIZE / PPI;
      assertAlmostEquals(result.value, expectedInches, 0.1);
    });
  });

  describe("viewport-based units", () => {
    it("should convert Vh to inches via pixels", () => {
      const result = convertToInches(Units.Vh, 1);
      assert(result.ok);
      const expectedPixels = VIEWPORT_HEIGHT / 100;
      const expectedInches = expectedPixels / PPI;
      assertAlmostEquals(result.value, expectedInches, 0.1);
    });

    it("should convert Vw to inches via pixels", () => {
      const result = convertToInches(Units.Vw, 1);
      assert(result.ok);
      const expectedPixels = VIEWPORT_WIDTH / 100;
      const expectedInches = expectedPixels / PPI;
      assertAlmostEquals(result.value, expectedInches, 0.1);
    });

    it("should convert Vmin to inches via pixels", () => {
      const result = convertToInches(Units.Vmin, 1);
      assert(result.ok);
      const expectedPixels = Math.min(VIEWPORT_WIDTH, VIEWPORT_HEIGHT) / 100;
      const expectedInches = expectedPixels / PPI;
      assertAlmostEquals(result.value, expectedInches, 0.1);
    });

    it("should convert Vmax to inches via pixels", () => {
      const result = convertToInches(Units.Vmax, 1);
      assert(result.ok);
      const expectedPixels = Math.max(VIEWPORT_WIDTH, VIEWPORT_HEIGHT) / 100;
      const expectedInches = expectedPixels / PPI;
      assertAlmostEquals(result.value, expectedInches, 0.1);
    });
  });

  describe("ratio-based units", () => {
    it("should return -1 for Golden ratio unit", () => {
      const result = convertToInches(Units.Golden, 10);
      assert(result.ok);
      assertEquals(result.value, -1);
    });

    it("should return -1 for Root2 ratio unit", () => {
      const result = convertToInches(Units.Root2, 10);
      assert(result.ok);
      assertEquals(result.value, -1);
    });

    it("should return -1 for SixteenNine ratio unit", () => {
      const result = convertToInches(Units.SixteenNine, 10);
      assert(result.ok);
      assertEquals(result.value, -1);
    });
  });
});
