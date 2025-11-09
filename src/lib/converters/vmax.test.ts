import { describe, it } from "jsr:@std/testing/bdd";
import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
import { convertToVmax } from "@/lib/converters/vmax.ts";
import { Units } from "@/lib/units.ts";
import { FONT_SIZE, VIEWPORT_HEIGHT, VIEWPORT_WIDTH } from "@/lib/constants.ts";

const VIEWPORT_MAX = Math.max(VIEWPORT_WIDTH, VIEWPORT_HEIGHT);

describe("convertToVmax", () => {
  describe("known constants", () => {
    it("should convert viewport max dimension to 100vmax", () => {
      assertEquals(convertToVmax(Units.Pixels, VIEWPORT_MAX), 100);
    });

    it("should convert half viewport max to 50vmax", () => {
      assertEquals(convertToVmax(Units.Pixels, VIEWPORT_MAX / 2), 50);
    });

    it("should convert rems using FONT_SIZE constant", () => {
      assertAlmostEquals(
        convertToVmax(Units.Rems, 1),
        (FONT_SIZE / VIEWPORT_MAX) * 100,
        0.01,
      );
    });
  });

  describe("viewport unit conversions", () => {
    it("should convert vw to vmax", () => {
      const expected = (VIEWPORT_WIDTH / VIEWPORT_MAX) * 100;
      assertAlmostEquals(convertToVmax(Units.Vw, 100), expected, 0.01);
    });

    it("should convert vh to vmax", () => {
      const expected = (VIEWPORT_HEIGHT / VIEWPORT_MAX) * 100;
      assertAlmostEquals(convertToVmax(Units.Vh, 100), expected, 0.01);
    });

    it("should convert vmin to vmax", () => {
      const minDimension = Math.min(VIEWPORT_WIDTH, VIEWPORT_HEIGHT);
      const expected = (minDimension / VIEWPORT_MAX) * 100;
      assertAlmostEquals(convertToVmax(Units.Vmin, 100), expected, 0.01);
    });
  });

  describe("proportionality", () => {
    it("should scale proportionally", () => {
      const value1 = convertToVmax(Units.Pixels, 100);
      const value2 = convertToVmax(Units.Pixels, 200);
      assertEquals(value2, value1 * 2);
    });
  });

  describe("edge cases", () => {
    it("should return -1 for negative inputs", () => {
      assertEquals(convertToVmax(Units.Pixels, -1), -1);
      assertEquals(convertToVmax(Units.Vmax, -5), -1);
    });

    it("should handle zero correctly", () => {
      assertEquals(convertToVmax(Units.Pixels, 0), 0);
      assertEquals(convertToVmax(Units.Vmax, 0), 0);
    });
  });

  describe("identity conversion", () => {
    it("should return the same value when converting vmax to vmax", () => {
      assertEquals(convertToVmax(Units.Vmax, 25), 25);
      assertEquals(convertToVmax(Units.Vmax, 100), 100);
    });
  });
});
