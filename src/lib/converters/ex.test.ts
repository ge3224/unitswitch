import { describe, it } from "jsr:@std/testing/bdd";
import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
import { convertToEx } from "@/lib/converters/ex.ts";
import { Units } from "@/lib/units.ts";
import { EX_TO_EM_RATIO, FONT_SIZE } from "@/lib/constants.ts";

const EX_IN_PIXELS = EX_TO_EM_RATIO * FONT_SIZE;

describe("convertToEx", () => {
  describe("known constants", () => {
    it("should convert ex pixel equivalent to 1ex", () => {
      assertEquals(convertToEx(Units.Pixels, EX_IN_PIXELS), 1);
    });

    it("should convert rems using EX_TO_EM_RATIO", () => {
      // 1 rem = 1/EX_TO_EM_RATIO ex (assuming EX_TO_EM_RATIO = 0.5, 1 rem = 2 ex)
      assertAlmostEquals(
        convertToEx(Units.Rems, 1),
        1 / EX_TO_EM_RATIO,
        0.01,
      );
    });

    it("should convert pixels using EX_TO_EM_RATIO and FONT_SIZE", () => {
      // 1ex = EX_TO_EM_RATIO * FONT_SIZE pixels
      assertAlmostEquals(
        convertToEx(Units.Pixels, FONT_SIZE),
        FONT_SIZE / EX_IN_PIXELS,
        0.01,
      );
    });
  });

  describe("font-relative conversions", () => {
    it("should convert ch to ex using ratios", () => {
      // Both typically 0.5em, so 1ch = 1ex
      assertAlmostEquals(convertToEx(Units.Ch, 1), 1, 0.01);
    });
  });

  describe("proportionality", () => {
    it("should scale proportionally", () => {
      const value1 = convertToEx(Units.Pixels, 100);
      const value2 = convertToEx(Units.Pixels, 200);
      assertEquals(value2, value1 * 2);
    });
  });

  describe("edge cases", () => {
    it("should return -1 for negative inputs", () => {
      assertEquals(convertToEx(Units.Pixels, -1), -1);
      assertEquals(convertToEx(Units.Ex, -5), -1);
    });

    it("should handle zero correctly", () => {
      assertEquals(convertToEx(Units.Pixels, 0), 0);
      assertEquals(convertToEx(Units.Ex, 0), 0);
    });
  });

  describe("identity conversion", () => {
    it("should return the same value when converting ex to ex", () => {
      assertEquals(convertToEx(Units.Ex, 25), 25);
      assertEquals(convertToEx(Units.Ex, 100), 100);
    });
  });
});
