import { describe, it } from "jsr:@std/testing/bdd";
import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
import { convertToVw } from "@/lib/converters/vw.ts";
import { Units } from "@/lib/units.ts";
import { FONT_SIZE, VIEWPORT_HEIGHT, VIEWPORT_WIDTH } from "@/lib/constants.ts";

describe("convertToVw", () => {
  describe("known constants", () => {
    it("should convert viewport width to 100vw", () => {
      assertEquals(convertToVw(Units.Pixels, VIEWPORT_WIDTH), 100);
    });

    it("should convert half viewport width to 50vw", () => {
      assertEquals(convertToVw(Units.Pixels, VIEWPORT_WIDTH / 2), 50);
    });

    it("should convert rems using FONT_SIZE constant", () => {
      // 1 rem = 16px, 1920px = 100vw, so 16px = (16/1920)*100 ≈ 0.833vw
      assertAlmostEquals(
        convertToVw(Units.Rems, 1),
        (FONT_SIZE / VIEWPORT_WIDTH) * 100,
        0.01,
      );
    });
  });

  describe("viewport unit conversions", () => {
    it("should convert vh to vw based on aspect ratio", () => {
      // 100vh in pixels / viewport width * 100 = vw
      const expected = (VIEWPORT_HEIGHT / VIEWPORT_WIDTH) * 100;
      assertAlmostEquals(convertToVw(Units.Vh, 100), expected, 0.01);
    });

    it("should convert vmin to vw", () => {
      // For 1920×1080, vmin = 1080 (smaller dimension)
      const minDimension = Math.min(VIEWPORT_WIDTH, VIEWPORT_HEIGHT);
      const expected = (minDimension / VIEWPORT_WIDTH) * 100;
      assertAlmostEquals(convertToVw(Units.Vmin, 100), expected, 0.01);
    });

    it("should convert vmax to vw", () => {
      // For 1920×1080, vmax = 1920 (larger dimension)
      const maxDimension = Math.max(VIEWPORT_WIDTH, VIEWPORT_HEIGHT);
      const expected = (maxDimension / VIEWPORT_WIDTH) * 100;
      assertAlmostEquals(convertToVw(Units.Vmax, 100), expected, 0.01);
    });
  });

  describe("proportionality", () => {
    it("should scale proportionally", () => {
      const value1 = convertToVw(Units.Pixels, 100);
      const value2 = convertToVw(Units.Pixels, 200);
      assertEquals(value2, value1 * 2);
    });
  });

  describe("edge cases", () => {
    it("should return -1 for negative inputs", () => {
      assertEquals(convertToVw(Units.Pixels, -1), -1);
      assertEquals(convertToVw(Units.Vw, -5), -1);
    });

    it("should handle zero correctly", () => {
      assertEquals(convertToVw(Units.Pixels, 0), 0);
      assertEquals(convertToVw(Units.Vw, 0), 0);
    });
  });

  describe("identity conversion", () => {
    it("should return the same value when converting vw to vw", () => {
      assertEquals(convertToVw(Units.Vw, 25), 25);
      assertEquals(convertToVw(Units.Vw, 100), 100);
    });
  });
});
