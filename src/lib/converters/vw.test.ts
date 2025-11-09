import { describe, it } from "jsr:@std/testing/bdd";
import { assertEquals, assertAlmostEquals, assert } from "jsr:@std/assert";
import { convertToVw } from "@/lib/converters/vw.ts";
import { Units } from "@/lib/units.ts";
import { FONT_SIZE, VIEWPORT_HEIGHT, VIEWPORT_WIDTH } from "@/lib/constants.ts";
import { ConversionErrorKind } from './result.ts';

describe("convertToVw", () => {
  describe("known constants", () => {
    it("should convert viewport width to 100vw", () => {
      const result = convertToVw(Units.Pixels, VIEWPORT_WIDTH);
      assert(result.ok);
      assertEquals(result.value, 100);
    });

    it("should convert half viewport width to 50vw", () => {
      const result = convertToVw(Units.Pixels, VIEWPORT_WIDTH / 2);
      assert(result.ok);
      assertEquals(result.value, 50);
    });

    it("should convert rems using FONT_SIZE constant", () => {
      // 1 rem = 16px, 1920px = 100vw, so 16px = (16/1920)*100 ≈ 0.833vw
      const result = convertToVw(Units.Rems, 1);
      assert(result.ok);
      assertAlmostEquals(
        result.value,
        (FONT_SIZE / VIEWPORT_WIDTH) * 100,
        0.01,
      );
    });
  });

  describe("viewport unit conversions", () => {
    it("should convert vh to vw based on aspect ratio", () => {
      // 100vh in pixels / viewport width * 100 = vw
      const expected = (VIEWPORT_HEIGHT / VIEWPORT_WIDTH) * 100;
      const result = convertToVw(Units.Vh, 100);
      assert(result.ok);
      assertAlmostEquals(result.value, expected, 0.01);
    });

    it("should convert vmin to vw", () => {
      // For 1920×1080, vmin = 1080 (smaller dimension)
      const minDimension = Math.min(VIEWPORT_WIDTH, VIEWPORT_HEIGHT);
      const expected = (minDimension / VIEWPORT_WIDTH) * 100;
      const result = convertToVw(Units.Vmin, 100);
      assert(result.ok);
      assertAlmostEquals(result.value, expected, 0.01);
    });

    it("should convert vmax to vw", () => {
      // For 1920×1080, vmax = 1920 (larger dimension)
      const maxDimension = Math.max(VIEWPORT_WIDTH, VIEWPORT_HEIGHT);
      const expected = (maxDimension / VIEWPORT_WIDTH) * 100;
      const result = convertToVw(Units.Vmax, 100);
      assert(result.ok);
      assertAlmostEquals(result.value, expected, 0.01);
    });
  });

  describe("proportionality", () => {
    it("should scale proportionally", () => {
      const result1 = convertToVw(Units.Pixels, 100);
      const result2 = convertToVw(Units.Pixels, 200);
      assert(result1.ok && result2.ok);
      assertEquals(result2.value, result1.value * 2);
    });
  });

  describe("edge cases", () => {
    it("should return Err for negative inputs", () => {
      const result1 = convertToVw(Units.Pixels, -1);
      assert(!result1.ok);
      assertEquals(result1.error.kind, ConversionErrorKind.NegativeInput);

      const result2 = convertToVw(Units.Vw, -5);
      assert(!result2.ok);
      assertEquals(result2.error.kind, ConversionErrorKind.NegativeInput);
    });

    it("should handle zero correctly", () => {
      const result1 = convertToVw(Units.Pixels, 0);
      assert(result1.ok);
      assert(result1.value >= 0);

      const result2 = convertToVw(Units.Vw, 0);
      assert(result2.ok);
      assert(result2.value >= 0);
    });
  });

  describe("identity conversion", () => {
    it("should return the same value when converting vw to vw", () => {
      const result1 = convertToVw(Units.Vw, 25);
      assert(result1.ok);
      assertEquals(result1.value, 25);

      const result2 = convertToVw(Units.Vw, 100);
      assert(result2.ok);
      assertEquals(result2.value, 100);
    });
  });
});
