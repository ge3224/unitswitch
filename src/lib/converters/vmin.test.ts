import { describe, it } from "jsr:@std/testing/bdd";
import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
import { convertToVmin } from "@/lib/converters/vmin.ts";
import { Units } from "@/lib/units.ts";
import { FONT_SIZE, VIEWPORT_HEIGHT, VIEWPORT_WIDTH } from "@/lib/constants.ts";

const VIEWPORT_MIN = Math.min(VIEWPORT_WIDTH, VIEWPORT_HEIGHT);

describe("convertToVmin", () => {
  describe("known constants", () => {
    it("should convert viewport min dimension to 100vmin", () => {
      assertEquals(convertToVmin(Units.Pixels, VIEWPORT_MIN), 100);
    });

    it("should convert half viewport min to 50vmin", () => {
      assertEquals(convertToVmin(Units.Pixels, VIEWPORT_MIN / 2), 50);
    });

    it("should convert rems using FONT_SIZE constant", () => {
      assertAlmostEquals(
        convertToVmin(Units.Rems, 1),
        (FONT_SIZE / VIEWPORT_MIN) * 100,
        0.01,
      );
    });
  });

  describe("viewport unit conversions", () => {
    it("should convert vw to vmin", () => {
      const expected = (VIEWPORT_WIDTH / VIEWPORT_MIN) * 100;
      assertAlmostEquals(convertToVmin(Units.Vw, 100), expected, 0.01);
    });

    it("should convert vh to vmin", () => {
      const expected = (VIEWPORT_HEIGHT / VIEWPORT_MIN) * 100;
      assertAlmostEquals(convertToVmin(Units.Vh, 100), expected, 0.01);
    });

    it("should convert vmax to vmin", () => {
      const maxDimension = Math.max(VIEWPORT_WIDTH, VIEWPORT_HEIGHT);
      const expected = (maxDimension / VIEWPORT_MIN) * 100;
      assertAlmostEquals(convertToVmin(Units.Vmax, 100), expected, 0.01);
    });
  });

  describe("proportionality", () => {
    it("should scale proportionally", () => {
      const value1 = convertToVmin(Units.Pixels, 100);
      const value2 = convertToVmin(Units.Pixels, 200);
      assertEquals(value2, value1 * 2);
    });
  });

  describe("edge cases", () => {
    it("should return -1 for negative inputs", () => {
      assertEquals(convertToVmin(Units.Pixels, -1), -1);
      assertEquals(convertToVmin(Units.Vmin, -5), -1);
    });

    it("should handle zero correctly", () => {
      assertEquals(convertToVmin(Units.Pixels, 0), 0);
      assertEquals(convertToVmin(Units.Vmin, 0), 0);
    });
  });

  describe("identity conversion", () => {
    it("should return the same value when converting vmin to vmin", () => {
      assertEquals(convertToVmin(Units.Vmin, 25), 25);
      assertEquals(convertToVmin(Units.Vmin, 100), 100);
    });
  });
});
