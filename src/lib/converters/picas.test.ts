import { describe, it } from "jsr:@std/testing/bdd";
import { assert, assertAlmostEquals, assertEquals } from "jsr:@std/assert";
import { convertToPicas } from "@/lib/converters/picas.ts";
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

describe("convertToPicas", () => {
  describe("known constants", () => {
    it("should convert inches using standard relationship (1 inch = 6 picas)", () => {
      const result = convertToPicas(Units.Inches, 1);
      assert(result.ok);
      assertAlmostEquals(result.value, 6, 0.1);
    });

    it("should convert points using standard relationship (1 pica = 12 points)", () => {
      const result = convertToPicas(Units.Points, 12);
      assert(result.ok);
      assertAlmostEquals(result.value, 1, 0.1);
    });

    it("should convert pixels using PPI (96 pixels = 1 inch = 6 picas)", () => {
      const result = convertToPicas(Units.Pixels, PPI);
      assert(result.ok);
      assertAlmostEquals(result.value, 6, 1);
    });
  });

  describe("proportionality", () => {
    it("should scale proportionally", () => {
      const result1 = convertToPicas(Units.Inches, 2);
      const result2 = convertToPicas(Units.Inches, 4);
      assert(result1.ok && result2.ok);
      assertAlmostEquals(result2.value, result1.value * 2, 0.1);
    });
  });

  describe("edge cases", () => {
    it("should return Err for negative inputs", () => {
      const result1 = convertToPicas(Units.Inches, -1);
      assert(!result1.ok);
      assertEquals(result1.error.kind, AppErrorKind.NegativeInput);

      const result2 = convertToPicas(Units.Pixels, -5);
      assert(!result2.ok);
      assertEquals(result2.error.kind, AppErrorKind.NegativeInput);
    });

    it("should handle zero correctly", () => {
      const result1 = convertToPicas(Units.Inches, 0);
      assert(result1.ok);
      assert(result1.value >= 0);

      const result2 = convertToPicas(Units.Picas, 0);
      assert(result2.ok);
      assert(result2.value >= 0);
    });
  });

  describe("identity conversion", () => {
    it("should return the same value when converting picas to picas", () => {
      const result1 = convertToPicas(Units.Picas, 6);
      assert(result1.ok);
      assertAlmostEquals(result1.value, 6, 0.1);

      const result2 = convertToPicas(Units.Picas, 12);
      assert(result2.ok);
      assertAlmostEquals(result2.value, 12, 0.1);
    });
  });

  describe("font-based units", () => {
    it("should convert Ch to picas via pixels", () => {
      const result = convertToPicas(Units.Ch, 1);
      assert(result.ok);
      const expectedPixels = FONT_SIZE * CH_TO_EM_RATIO;
      const expectedPicas = (expectedPixels / PPI) * 6;
      assertAlmostEquals(result.value, expectedPicas, 0.1);
    });

    it("should convert Ex to picas via pixels", () => {
      const result = convertToPicas(Units.Ex, 1);
      assert(result.ok);
      const expectedPixels = FONT_SIZE * EX_TO_EM_RATIO;
      const expectedPicas = (expectedPixels / PPI) * 6;
      assertAlmostEquals(result.value, expectedPicas, 0.1);
    });

    it("should convert Rems to picas via pixels", () => {
      const result = convertToPicas(Units.Rems, 1);
      assert(result.ok);
      const expectedPicas = (FONT_SIZE / PPI) * 6;
      assertAlmostEquals(result.value, expectedPicas, 0.1);
    });
  });

  describe("viewport-based units", () => {
    it("should convert Vh to picas via pixels", () => {
      const result = convertToPicas(Units.Vh, 1);
      assert(result.ok);
      const expectedPixels = VIEWPORT_HEIGHT / 100;
      const expectedPicas = (expectedPixels / PPI) * 6;
      assertAlmostEquals(result.value, expectedPicas, 0.1);
    });

    it("should convert Vw to picas via pixels", () => {
      const result = convertToPicas(Units.Vw, 1);
      assert(result.ok);
      const expectedPixels = VIEWPORT_WIDTH / 100;
      const expectedPicas = (expectedPixels / PPI) * 6;
      assertAlmostEquals(result.value, expectedPicas, 0.1);
    });

    it("should convert Vmin to picas via pixels", () => {
      const result = convertToPicas(Units.Vmin, 1);
      assert(result.ok);
      const expectedPixels = Math.min(VIEWPORT_WIDTH, VIEWPORT_HEIGHT) / 100;
      const expectedPicas = (expectedPixels / PPI) * 6;
      assertAlmostEquals(result.value, expectedPicas, 0.1);
    });

    it("should convert Vmax to picas via pixels", () => {
      const result = convertToPicas(Units.Vmax, 1);
      assert(result.ok);
      const expectedPixels = Math.max(VIEWPORT_WIDTH, VIEWPORT_HEIGHT) / 100;
      const expectedPicas = (expectedPixels / PPI) * 6;
      assertAlmostEquals(result.value, expectedPicas, 0.1);
    });
  });

  describe("ratio-based units", () => {
    it("should return -1 for Golden ratio unit", () => {
      const result = convertToPicas(Units.Golden, 10);
      assert(result.ok);
      assertEquals(result.value, -1);
    });

    it("should return -1 for Root2 ratio unit", () => {
      const result = convertToPicas(Units.Root2, 10);
      assert(result.ok);
      assertEquals(result.value, -1);
    });

    it("should return -1 for SixteenNine ratio unit", () => {
      const result = convertToPicas(Units.SixteenNine, 10);
      assert(result.ok);
      assertEquals(result.value, -1);
    });
  });
});
