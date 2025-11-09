import { describe, it } from "jsr:@std/testing/bdd";
import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
import { convertToCh } from "@/lib/converters/ch.ts";
import { Units } from "@/lib/units.ts";
import { CH_TO_EM_RATIO, FONT_SIZE } from "@/lib/constants.ts";

const CH_IN_PIXELS = CH_TO_EM_RATIO * FONT_SIZE;

describe("convertToCh", () => {
  describe("known constants", () => {
    it("should convert ch pixel equivalent to 1ch", () => {
      assertEquals(convertToCh(Units.Pixels, CH_IN_PIXELS), 1);
    });

    it("should convert rems using CH_TO_EM_RATIO", () => {
      // 1 rem = 1/CH_TO_EM_RATIO ch (assuming CH_TO_EM_RATIO = 0.5, 1 rem = 2 ch)
      assertAlmostEquals(
        convertToCh(Units.Rems, 1),
        1 / CH_TO_EM_RATIO,
        0.01,
      );
    });

    it("should convert pixels using CH_TO_EM_RATIO and FONT_SIZE", () => {
      // 1ch = CH_TO_EM_RATIO * FONT_SIZE pixels
      assertAlmostEquals(
        convertToCh(Units.Pixels, FONT_SIZE),
        FONT_SIZE / CH_IN_PIXELS,
        0.01,
      );
    });
  });

  describe("font-relative conversions", () => {
    it("should convert ex to ch using ratios", () => {
      // Both typically 0.5em, so 1ex = 1ch
      assertAlmostEquals(convertToCh(Units.Ex, 1), 1, 0.01);
    });
  });

  describe("proportionality", () => {
    it("should scale proportionally", () => {
      const value1 = convertToCh(Units.Pixels, 100);
      const value2 = convertToCh(Units.Pixels, 200);
      assertEquals(value2, value1 * 2);
    });
  });

  describe("edge cases", () => {
    it("should return -1 for negative inputs", () => {
      assertEquals(convertToCh(Units.Pixels, -1), -1);
      assertEquals(convertToCh(Units.Ch, -5), -1);
    });

    it("should handle zero correctly", () => {
      assertEquals(convertToCh(Units.Pixels, 0), 0);
      assertEquals(convertToCh(Units.Ch, 0), 0);
    });
  });

  describe("identity conversion", () => {
    it("should return the same value when converting ch to ch", () => {
      assertEquals(convertToCh(Units.Ch, 25), 25);
      assertEquals(convertToCh(Units.Ch, 100), 100);
    });
  });
});
