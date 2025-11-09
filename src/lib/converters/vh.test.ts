import { describe, it } from "jsr:@std/testing/bdd";
import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
import { convertToVh } from "@/lib/converters/vh.ts";
import { Units } from "@/lib/units.ts";
import { FONT_SIZE, VIEWPORT_HEIGHT, VIEWPORT_WIDTH } from "@/lib/constants.ts";

describe("convertToVh", () => {
  describe("known constants", () => {
    it("should convert viewport height to 100vh", () => {
      assertEquals(convertToVh(Units.Pixels, VIEWPORT_HEIGHT), 100);
    });

    it("should convert half viewport height to 50vh", () => {
      assertEquals(convertToVh(Units.Pixels, VIEWPORT_HEIGHT / 2), 50);
    });

    it("should convert rems using FONT_SIZE constant", () => {
      // 1 rem = 16px, 1080px = 100vh, so 16px = (16/1080)*100 ≈ 1.48vh
      assertAlmostEquals(
        convertToVh(Units.Rems, 1),
        (FONT_SIZE / VIEWPORT_HEIGHT) * 100,
        0.01,
      );
    });
  });

  describe("viewport unit conversions", () => {
    it("should convert vw to vh based on aspect ratio", () => {
      // 100vw in pixels / viewport height * 100 = vh
      const expected = (VIEWPORT_WIDTH / VIEWPORT_HEIGHT) * 100;
      assertAlmostEquals(convertToVh(Units.Vw, 100), expected, 0.01);
    });

    it("should convert vmin to vh", () => {
      // For 1920×1080, vmin = 1080 (smaller dimension)
      const minDimension = Math.min(VIEWPORT_WIDTH, VIEWPORT_HEIGHT);
      const expected = (minDimension / VIEWPORT_HEIGHT) * 100;
      assertAlmostEquals(convertToVh(Units.Vmin, 100), expected, 0.01);
    });

    it("should convert vmax to vh", () => {
      // For 1920×1080, vmax = 1920 (larger dimension)
      const maxDimension = Math.max(VIEWPORT_WIDTH, VIEWPORT_HEIGHT);
      const expected = (maxDimension / VIEWPORT_HEIGHT) * 100;
      assertAlmostEquals(convertToVh(Units.Vmax, 100), expected, 0.01);
    });
  });

  describe("proportionality", () => {
    it("should scale proportionally", () => {
      const value1 = convertToVh(Units.Pixels, 100);
      const value2 = convertToVh(Units.Pixels, 200);
      assertEquals(value2, value1 * 2);
    });
  });

  describe("edge cases", () => {
    it("should return -1 for negative inputs", () => {
      assertEquals(convertToVh(Units.Pixels, -1), -1);
      assertEquals(convertToVh(Units.Vh, -5), -1);
    });

    it("should handle zero correctly", () => {
      assertEquals(convertToVh(Units.Pixels, 0), 0);
      assertEquals(convertToVh(Units.Vh, 0), 0);
    });
  });

  describe("identity conversion", () => {
    it("should return the same value when converting vh to vh", () => {
      assertEquals(convertToVh(Units.Vh, 25), 25);
      assertEquals(convertToVh(Units.Vh, 100), 100);
    });
  });
});
