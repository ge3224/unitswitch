import { describe, it } from "jsr:@std/testing/bdd";
import { assertEquals, assertAlmostEquals, assert } from "jsr:@std/assert";
import { convertToFeet } from '@/lib/converters/feet.ts';
import { Units } from '@/lib/units.ts';
import { PPI } from '@/lib/constants.ts';
import { ConversionErrorKind } from './result.ts';

describe('convertToFeet', () => {
  describe('known constants', () => {
    it('should convert inches using standard relationship (1 foot = 12 inches)', () => {
      const result = convertToFeet(Units.Inches, 12);
      assert(result.ok);
      assertAlmostEquals(result.value, 1, 0.1);
    });

    it('should convert centimeters using standard relationship (1 foot = 30.48 cm)', () => {
      const result = convertToFeet(Units.Centimeters, 30.48);
      assert(result.ok);
      assertAlmostEquals(result.value, 1, 0.1);
    });

    it('should convert millimeters using standard relationship (1 foot = 304.8 mm)', () => {
      const result = convertToFeet(Units.Millimeters, 304.8);
      assert(result.ok);
      assertAlmostEquals(result.value, 1, 0.1);
    });

    it('should convert pixels using PPI (1152 pixels = 1 foot)', () => {
      const result = convertToFeet(Units.Pixels, 12 * PPI);
      assert(result.ok);
      assertAlmostEquals(result.value, 1, 1);
    });
  });

  describe('proportionality', () => {
    it('should scale proportionally', () => {
      const result1 = convertToFeet(Units.Inches, 24);
      const result2 = convertToFeet(Units.Inches, 48);
      assert(result1.ok && result2.ok);
      assertAlmostEquals(result2.value, result1.value * 2, 0.1);
    });
  });

  describe('edge cases', () => {
    it('should return Err for negative inputs', () => {
      const result1 = convertToFeet(Units.Inches, -1);
      assert(!result1.ok);
      assertEquals(result1.error.kind, ConversionErrorKind.NegativeInput);

      const result2 = convertToFeet(Units.Pixels, -5);
      assert(!result2.ok);
      assertEquals(result2.error.kind, ConversionErrorKind.NegativeInput);
    });

    it('should handle zero correctly', () => {
      const result1 = convertToFeet(Units.Inches, 0);
      assert(result1.ok);
      assert(result1.value >= 0);

      const result2 = convertToFeet(Units.Feet, 0);
      assert(result2.ok);
      assert(result2.value >= 0);
    });
  });

  describe('identity conversion', () => {
    it('should return the same value when converting feet to feet', () => {
      const result1 = convertToFeet(Units.Feet, 3);
      assert(result1.ok);
      assertAlmostEquals(result1.value, 3, 0.1);

      const result2 = convertToFeet(Units.Feet, 10.5);
      assert(result2.ok);
      assertAlmostEquals(result2.value, 10.5, 0.1);
    });
  });
});
