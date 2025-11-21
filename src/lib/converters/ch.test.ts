import { describe, it } from "jsr:@std/testing/bdd";
import { assert, assertAlmostEquals, assertEquals } from "jsr:@std/assert";
import { convertToCh } from "@/lib/converters/ch.ts";
import { Units } from "@/lib/units.ts";
import { CH_TO_EM_RATIO, FONT_SIZE } from "@/lib/constants.ts";
import { AppErrorKind } from "@/lib/result.ts";

const CH_IN_PIXELS = CH_TO_EM_RATIO * FONT_SIZE;

describe("convertToCh", () => {
  describe("known constants", () => {
    it("should convert ch pixel equivalent to 1ch", () => {
      const result = convertToCh(Units.Pixels, CH_IN_PIXELS);
      assert(result.ok);
      assertEquals(result.value, 1);
    });

    it("should convert rems using CH_TO_EM_RATIO", () => {
      // 1 rem = 1/CH_TO_EM_RATIO ch (assuming CH_TO_EM_RATIO = 0.5, 1 rem = 2 ch)
      const result = convertToCh(Units.Rems, 1);
      assert(result.ok);
      assertAlmostEquals(
        result.value,
        1 / CH_TO_EM_RATIO,
        0.01,
      );
    });

    it("should convert pixels using CH_TO_EM_RATIO and FONT_SIZE", () => {
      // 1ch = CH_TO_EM_RATIO * FONT_SIZE pixels
      const result = convertToCh(Units.Pixels, FONT_SIZE);
      assert(result.ok);
      assertAlmostEquals(
        result.value,
        FONT_SIZE / CH_IN_PIXELS,
        0.01,
      );
    });
  });

  describe("font-relative conversions", () => {
    it("should convert ex to ch using ratios", () => {
      // Both typically 0.5em, so 1ex = 1ch
      const result = convertToCh(Units.Ex, 1);
      assert(result.ok);
      assertAlmostEquals(result.value, 1, 0.01);
    });
  });

  describe("proportionality", () => {
    it("should scale proportionally", () => {
      const result1 = convertToCh(Units.Pixels, 100);
      const result2 = convertToCh(Units.Pixels, 200);
      assert(result1.ok && result2.ok);
      assertEquals(result2.value, result1.value * 2);
    });
  });

  describe("edge cases", () => {
    it("should return Err for negative inputs", () => {
      const result1 = convertToCh(Units.Pixels, -1);
      assert(!result1.ok);
      assertEquals(result1.error.kind, AppErrorKind.NegativeInput);

      const result2 = convertToCh(Units.Ch, -5);
      assert(!result2.ok);
      assertEquals(result2.error.kind, AppErrorKind.NegativeInput);
    });

    it("should handle zero correctly", () => {
      const result1 = convertToCh(Units.Pixels, 0);
      assert(result1.ok);
      assert(result1.value >= 0);

      const result2 = convertToCh(Units.Ch, 0);
      assert(result2.ok);
      assert(result2.value >= 0);
    });
  });

  describe("identity conversion", () => {
    it("should return the same value when converting ch to ch", () => {
      const result1 = convertToCh(Units.Ch, 25);
      assert(result1.ok);
      assertEquals(result1.value, 25);

      const result2 = convertToCh(Units.Ch, 100);
      assert(result2.ok);
      assertEquals(result2.value, 100);
    });
  });

  describe("ratio-based units", () => {
    it("should return -1 for Golden ratio unit", () => {
      const result = convertToCh(Units.Golden, 10);
      assert(result.ok);
      assertEquals(result.value, -1);
    });

    it("should return -1 for Root2 ratio unit", () => {
      const result = convertToCh(Units.Root2, 10);
      assert(result.ok);
      assertEquals(result.value, -1);
    });

    it("should return -1 for SixteenNine ratio unit", () => {
      const result = convertToCh(Units.SixteenNine, 10);
      assert(result.ok);
      assertEquals(result.value, -1);
    });
  });
});
