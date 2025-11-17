import { describe, it } from "jsr:@std/testing/bdd";
import { assertEquals, assertAlmostEquals, assert } from "jsr:@std/assert";
import { convertToVmax } from "@/lib/converters/vmax.ts";
import { Units } from "@/lib/units.ts";
import { FONT_SIZE, VIEWPORT_HEIGHT, VIEWPORT_WIDTH } from "@/lib/constants.ts";
import { ConversionErrorKind } from './result.ts';

const VIEWPORT_MAX = Math.max(VIEWPORT_WIDTH, VIEWPORT_HEIGHT);

describe("convertToVmax", () => {
  describe("known constants", () => {
    it("should convert viewport max dimension to 100vmax", () => {
      const result = convertToVmax(Units.Pixels, VIEWPORT_MAX);
      assert(result.ok);
      assertEquals(result.value, 100);
    });

    it("should convert half viewport max to 50vmax", () => {
      const result = convertToVmax(Units.Pixels, VIEWPORT_MAX / 2);
      assert(result.ok);
      assertEquals(result.value, 50);
    });

    it("should convert rems using FONT_SIZE constant", () => {
      const result = convertToVmax(Units.Rems, 1);
      assert(result.ok);
      assertAlmostEquals(
        result.value,
        (FONT_SIZE / VIEWPORT_MAX) * 100,
        0.01,
      );
    });
  });

  describe("viewport unit conversions", () => {
    it("should convert vw to vmax", () => {
      const expected = (VIEWPORT_WIDTH / VIEWPORT_MAX) * 100;
      const result = convertToVmax(Units.Vw, 100);
      assert(result.ok);
      assertAlmostEquals(result.value, expected, 0.01);
    });

    it("should convert vh to vmax", () => {
      const expected = (VIEWPORT_HEIGHT / VIEWPORT_MAX) * 100;
      const result = convertToVmax(Units.Vh, 100);
      assert(result.ok);
      assertAlmostEquals(result.value, expected, 0.01);
    });

    it("should convert vmin to vmax", () => {
      const minDimension = Math.min(VIEWPORT_WIDTH, VIEWPORT_HEIGHT);
      const expected = (minDimension / VIEWPORT_MAX) * 100;
      const result = convertToVmax(Units.Vmin, 100);
      assert(result.ok);
      assertAlmostEquals(result.value, expected, 0.01);
    });
  });

  describe("proportionality", () => {
    it("should scale proportionally", () => {
      const result1 = convertToVmax(Units.Pixels, 100);
      const result2 = convertToVmax(Units.Pixels, 200);
      assert(result1.ok && result2.ok);
      assertEquals(result2.value, result1.value * 2);
    });
  });

  describe("edge cases", () => {
    it("should return Err for negative inputs", () => {
      const result1 = convertToVmax(Units.Pixels, -1);
      assert(!result1.ok);
      assertEquals(result1.error.kind, ConversionErrorKind.NegativeInput);

      const result2 = convertToVmax(Units.Vmax, -5);
      assert(!result2.ok);
      assertEquals(result2.error.kind, ConversionErrorKind.NegativeInput);
    });

    it("should handle zero correctly", () => {
      const result1 = convertToVmax(Units.Pixels, 0);
      assert(result1.ok);
      assert(result1.value >= 0);

      const result2 = convertToVmax(Units.Vmax, 0);
      assert(result2.ok);
      assert(result2.value >= 0);
    });
  });

  describe("identity conversion", () => {
    it("should return the same value when converting vmax to vmax", () => {
      const result1 = convertToVmax(Units.Vmax, 25);
      assert(result1.ok);
      assertEquals(result1.value, 25);

      const result2 = convertToVmax(Units.Vmax, 100);
      assert(result2.ok);
      assertEquals(result2.value, 100);
    });
  });

  describe("ratio-based units", () => {
    it("should return -1 for Golden ratio unit", () => {
      const result = convertToVmax(Units.Golden, 10);
      assert(result.ok);
      assertEquals(result.value, -1);
    });

    it("should return -1 for Root2 ratio unit", () => {
      const result = convertToVmax(Units.Root2, 10);
      assert(result.ok);
      assertEquals(result.value, -1);
    });

    it("should return -1 for SixteenNine ratio unit", () => {
      const result = convertToVmax(Units.SixteenNine, 10);
      assert(result.ok);
      assertEquals(result.value, -1);
    });
  });
});
