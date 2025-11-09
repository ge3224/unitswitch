import { describe, it } from "jsr:@std/testing/bdd";
import { assertEquals, assertAlmostEquals, assert } from "jsr:@std/assert";
import { convertToVmin } from "@/lib/converters/vmin.ts";
import { Units } from "@/lib/units.ts";
import { FONT_SIZE, VIEWPORT_HEIGHT, VIEWPORT_WIDTH } from "@/lib/constants.ts";
import { ConversionErrorKind } from './result.ts';

const VIEWPORT_MIN = Math.min(VIEWPORT_WIDTH, VIEWPORT_HEIGHT);

describe("convertToVmin", () => {
  describe("known constants", () => {
    it("should convert viewport min dimension to 100vmin", () => {
      const result = convertToVmin(Units.Pixels, VIEWPORT_MIN);
      assert(result.ok);
      assertEquals(result.value, 100);
    });

    it("should convert half viewport min to 50vmin", () => {
      const result = convertToVmin(Units.Pixels, VIEWPORT_MIN / 2);
      assert(result.ok);
      assertEquals(result.value, 50);
    });

    it("should convert rems using FONT_SIZE constant", () => {
      const result = convertToVmin(Units.Rems, 1);
      assert(result.ok);
      assertAlmostEquals(
        result.value,
        (FONT_SIZE / VIEWPORT_MIN) * 100,
        0.01,
      );
    });
  });

  describe("viewport unit conversions", () => {
    it("should convert vw to vmin", () => {
      const expected = (VIEWPORT_WIDTH / VIEWPORT_MIN) * 100;
      const result = convertToVmin(Units.Vw, 100);
      assert(result.ok);
      assertAlmostEquals(result.value, expected, 0.01);
    });

    it("should convert vh to vmin", () => {
      const expected = (VIEWPORT_HEIGHT / VIEWPORT_MIN) * 100;
      const result = convertToVmin(Units.Vh, 100);
      assert(result.ok);
      assertAlmostEquals(result.value, expected, 0.01);
    });

    it("should convert vmax to vmin", () => {
      const maxDimension = Math.max(VIEWPORT_WIDTH, VIEWPORT_HEIGHT);
      const expected = (maxDimension / VIEWPORT_MIN) * 100;
      const result = convertToVmin(Units.Vmax, 100);
      assert(result.ok);
      assertAlmostEquals(result.value, expected, 0.01);
    });
  });

  describe("proportionality", () => {
    it("should scale proportionally", () => {
      const result1 = convertToVmin(Units.Pixels, 100);
      const result2 = convertToVmin(Units.Pixels, 200);
      assert(result1.ok && result2.ok);
      assertEquals(result2.value, result1.value * 2);
    });
  });

  describe("edge cases", () => {
    it("should return Err for negative inputs", () => {
      const result1 = convertToVmin(Units.Pixels, -1);
      assert(!result1.ok);
      assertEquals(result1.error.kind, ConversionErrorKind.NegativeInput);

      const result2 = convertToVmin(Units.Vmin, -5);
      assert(!result2.ok);
      assertEquals(result2.error.kind, ConversionErrorKind.NegativeInput);
    });

    it("should handle zero correctly", () => {
      const result1 = convertToVmin(Units.Pixels, 0);
      assert(result1.ok);
      assert(result1.value >= 0);

      const result2 = convertToVmin(Units.Vmin, 0);
      assert(result2.ok);
      assert(result2.value >= 0);
    });
  });

  describe("identity conversion", () => {
    it("should return the same value when converting vmin to vmin", () => {
      const result1 = convertToVmin(Units.Vmin, 25);
      assert(result1.ok);
      assertEquals(result1.value, 25);

      const result2 = convertToVmin(Units.Vmin, 100);
      assert(result2.ok);
      assertEquals(result2.value, 100);
    });
  });
});
