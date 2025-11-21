import { describe, it } from "jsr:@std/testing/bdd";
import { assert, assertAlmostEquals, assertEquals } from "jsr:@std/assert";
import { convertToVh } from "@/lib/converters/vh.ts";
import { Units } from "@/lib/units.ts";
import { FONT_SIZE, VIEWPORT_HEIGHT, VIEWPORT_WIDTH } from "@/lib/constants.ts";
import { AppErrorKind } from "@/lib/result.ts";

describe("convertToVh", () => {
  describe("known constants", () => {
    it("should convert viewport height to 100vh", () => {
      const result = convertToVh(Units.Pixels, VIEWPORT_HEIGHT);
      assert(result.ok);
      assertEquals(result.value, 100);
    });

    it("should convert half viewport height to 50vh", () => {
      const result = convertToVh(Units.Pixels, VIEWPORT_HEIGHT / 2);
      assert(result.ok);
      assertEquals(result.value, 50);
    });

    it("should convert rems using FONT_SIZE constant", () => {
      // 1 rem = 16px, 1080px = 100vh, so 16px = (16/1080)*100 ≈ 1.48vh
      const result = convertToVh(Units.Rems, 1);
      assert(result.ok);
      assertAlmostEquals(
        result.value,
        (FONT_SIZE / VIEWPORT_HEIGHT) * 100,
        0.01,
      );
    });
  });

  describe("viewport unit conversions", () => {
    it("should convert vw to vh based on aspect ratio", () => {
      // 100vw in pixels / viewport height * 100 = vh
      const expected = (VIEWPORT_WIDTH / VIEWPORT_HEIGHT) * 100;
      const result = convertToVh(Units.Vw, 100);
      assert(result.ok);
      assertAlmostEquals(result.value, expected, 0.01);
    });

    it("should convert vmin to vh", () => {
      // For 1920×1080, vmin = 1080 (smaller dimension)
      const minDimension = Math.min(VIEWPORT_WIDTH, VIEWPORT_HEIGHT);
      const expected = (minDimension / VIEWPORT_HEIGHT) * 100;
      const result = convertToVh(Units.Vmin, 100);
      assert(result.ok);
      assertAlmostEquals(result.value, expected, 0.01);
    });

    it("should convert vmax to vh", () => {
      // For 1920×1080, vmax = 1920 (larger dimension)
      const maxDimension = Math.max(VIEWPORT_WIDTH, VIEWPORT_HEIGHT);
      const expected = (maxDimension / VIEWPORT_HEIGHT) * 100;
      const result = convertToVh(Units.Vmax, 100);
      assert(result.ok);
      assertAlmostEquals(result.value, expected, 0.01);
    });
  });

  describe("font-relative conversions", () => {
    it("should convert ch to vh", () => {
      const result = convertToVh(Units.Ch, 10);
      assert(result.ok);
      // ch is font-relative, converts via pixels
      assert(result.value > 0);
    });

    it("should convert ex to vh", () => {
      const result = convertToVh(Units.Ex, 10);
      assert(result.ok);
      // ex is font-relative, converts via pixels
      assert(result.value > 0);
    });
  });

  describe("proportionality", () => {
    it("should scale proportionally", () => {
      const result1 = convertToVh(Units.Pixels, 100);
      const result2 = convertToVh(Units.Pixels, 200);
      assert(result1.ok && result2.ok);
      assertEquals(result2.value, result1.value * 2);
    });
  });

  describe("edge cases", () => {
    it("should return Err for negative inputs", () => {
      const result1 = convertToVh(Units.Pixels, -1);
      assert(!result1.ok);
      assertEquals(result1.error.kind, AppErrorKind.NegativeInput);

      const result2 = convertToVh(Units.Vh, -5);
      assert(!result2.ok);
      assertEquals(result2.error.kind, AppErrorKind.NegativeInput);
    });

    it("should handle zero correctly", () => {
      const result1 = convertToVh(Units.Pixels, 0);
      assert(result1.ok);
      assert(result1.value >= 0);

      const result2 = convertToVh(Units.Vh, 0);
      assert(result2.ok);
      assert(result2.value >= 0);
    });
  });

  describe("identity conversion", () => {
    it("should return the same value when converting vh to vh", () => {
      const result1 = convertToVh(Units.Vh, 25);
      assert(result1.ok);
      assertEquals(result1.value, 25);

      const result2 = convertToVh(Units.Vh, 100);
      assert(result2.ok);
      assertEquals(result2.value, 100);
    });
  });

  describe("ratio-based units", () => {
    it("should return -1 for Golden ratio unit", () => {
      const result = convertToVh(Units.Golden, 10);
      assert(result.ok);
      assertEquals(result.value, -1);
    });

    it("should return -1 for Root2 ratio unit", () => {
      const result = convertToVh(Units.Root2, 10);
      assert(result.ok);
      assertEquals(result.value, -1);
    });

    it("should return -1 for SixteenNine ratio unit", () => {
      const result = convertToVh(Units.SixteenNine, 10);
      assert(result.ok);
      assertEquals(result.value, -1);
    });
  });
});
