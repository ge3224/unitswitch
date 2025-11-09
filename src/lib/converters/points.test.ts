import { describe, it } from "jsr:@std/testing/bdd";
import { assertEquals, assertAlmostEquals, assert } from "jsr:@std/assert";
import { convertToPoints } from '@/lib/converters/points.ts';
import { Units } from '@/lib/units.ts';
import { PPI } from '@/lib/constants.ts';
import { ConversionErrorKind } from './result.ts';

describe('convertToPoints', () => {
  describe('known constants', () => {
    it('should convert inches using standard relationship (1 inch = 72 points)', () => {
      const result = convertToPoints(Units.Inches, 1);
      assert(result.ok);
      assertAlmostEquals(result.value, 72, 0.1);
    });

    it('should convert picas using standard relationship (1 pica = 12 points)', () => {
      const result = convertToPoints(Units.Picas, 1);
      assert(result.ok);
      assertAlmostEquals(result.value, 12, 0.1);
    });

    it('should convert pixels using PPI (96 pixels = 1 inch = 72 points)', () => {
      const result = convertToPoints(Units.Pixels, PPI);
      assert(result.ok);
      assertAlmostEquals(result.value, 72, 1);
    });
  });

  describe('proportionality', () => {
    it('should scale proportionally', () => {
      const result1 = convertToPoints(Units.Inches, 2);
      const result2 = convertToPoints(Units.Inches, 4);
      assert(result1.ok && result2.ok);
      assertAlmostEquals(result2.value, result1.value * 2, 0.1);
    });
  });

  describe('edge cases', () => {
    it('should return Err for negative inputs', () => {
      const result1 = convertToPoints(Units.Inches, -1);
      assert(!result1.ok);
      assertEquals(result1.error.kind, ConversionErrorKind.NegativeInput);

      const result2 = convertToPoints(Units.Pixels, -5);
      assert(!result2.ok);
      assertEquals(result2.error.kind, ConversionErrorKind.NegativeInput);
    });

    it('should handle zero correctly', () => {
      const result1 = convertToPoints(Units.Inches, 0);
      assert(result1.ok);
      assert(result1.value >= 0);

      const result2 = convertToPoints(Units.Points, 0);
      assert(result2.ok);
      assert(result2.value >= 0);
    });
  });

  describe('identity conversion', () => {
    it('should return the same value when converting points to points', () => {
      const result1 = convertToPoints(Units.Points, 72);
      assert(result1.ok);
      assertAlmostEquals(result1.value, 72, 0.1);

      const result2 = convertToPoints(Units.Points, 36);
      assert(result2.ok);
      assertAlmostEquals(result2.value, 36, 0.1);
    });
  });
});
