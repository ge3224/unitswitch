import { describe, it } from "jsr:@std/testing/bdd";
import {
  assertAlmostEquals,
  assertEquals,
  assert,
} from "jsr:@std/assert";
import { convertToCentimeters } from "@/lib/converters/centimeters.ts";
import { Units } from "@/lib/units.ts";
import { PPI } from "@/lib/constants.ts";
import { ConversionErrorKind } from './result.ts';

describe("convertToCentimeters", () => {
  describe("known constants", () => {
    it("should convert inches using standard relationship (1 inch = 2.54 cm)", () => {
      const result = convertToCentimeters(Units.Inches, 1);
      assert(result.ok);
      assertAlmostEquals(result.value, 2.54, 0.1);
    });

    it("should convert millimeters using standard relationship (1 cm = 10 mm)", () => {
      const result = convertToCentimeters(Units.Millimeters, 10);
      assert(result.ok);
      assertAlmostEquals(result.value, 1, 0.1);
    });

    it("should convert feet using standard relationship (1 foot = 12 inches = 30.48 cm)", () => {
      const result = convertToCentimeters(Units.Feet, 1);
      assert(result.ok);
      assertAlmostEquals(result.value, 30.48, 0.1);
    });

    it("should convert pixels using PPI (96 pixels = 1 inch = 2.54 cm)", () => {
      const result = convertToCentimeters(Units.Pixels, PPI);
      assert(result.ok);
      assertAlmostEquals(result.value, 2.54, 0.1);
    });
  });

  describe("proportionality", () => {
    it("should scale proportionally", () => {
      const result1 = convertToCentimeters(Units.Inches, 2);
      const result2 = convertToCentimeters(Units.Inches, 4);
      assert(result1.ok && result2.ok);
      assertAlmostEquals(result2.value, result1.value * 2, 0.1);
    });
  });

  describe("edge cases", () => {
    it("should return Err for negative inputs", () => {
      const result1 = convertToCentimeters(Units.Inches, -1);
      assert(!result1.ok);
      assertEquals(result1.error.kind, ConversionErrorKind.NegativeInput);

      const result2 = convertToCentimeters(Units.Pixels, -5);
      assert(!result2.ok);
      assertEquals(result2.error.kind, ConversionErrorKind.NegativeInput);
    });

    it("should handle zero correctly", () => {
      const result1 = convertToCentimeters(Units.Inches, 0);
      assert(result1.ok);
      assert(result1.value >= 0);

      const result2 = convertToCentimeters(Units.Centimeters, 0);
      assert(result2.ok);
      assert(result2.value >= 0);
    });
  });

  describe("identity conversion", () => {
    it("should return the same value when converting centimeters to centimeters", () => {
      const result1 = convertToCentimeters(Units.Centimeters, 5);
      assert(result1.ok);
      assertAlmostEquals(result1.value, 5, 0.1);

      const result2 = convertToCentimeters(Units.Centimeters, 2.54);
      assert(result2.ok);
      assertAlmostEquals(result2.value, 2.54, 0.1);
    });
  });
});
