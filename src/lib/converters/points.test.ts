import { describe, it } from "jsr:@std/testing/bdd";
import { assertEquals, assertAlmostEquals, assertGreaterOrEqual } from "jsr:@std/assert";
import { convertToPoints } from '@/lib/converters/points.ts';
import { Units } from '@/lib/units.ts';
import { PPI } from '@/lib/constants.ts';

describe('convertToPoints', () => {
  describe('known constants', () => {
    it('should convert inches using standard relationship (1 inch = 72 points)', () => {
      assertAlmostEquals(convertToPoints(Units.Inches, 1), 72, 0.1);
    });

    it('should convert picas using standard relationship (1 pica = 12 points)', () => {
      assertAlmostEquals(convertToPoints(Units.Picas, 1), 12, 0.1);
    });

    it('should convert pixels using PPI (96 pixels = 1 inch = 72 points)', () => {
      assertAlmostEquals(convertToPoints(Units.Pixels, PPI), 72, 1);
    });
  });

  describe('proportionality', () => {
    it('should scale proportionally', () => {
      const value1 = convertToPoints(Units.Inches, 2);
      const value2 = convertToPoints(Units.Inches, 4);
      assertAlmostEquals(value2, value1 * 2, 0.1);
    });
  });

  describe('edge cases', () => {
    it('should return -1 for negative inputs', () => {
      assertEquals(convertToPoints(Units.Inches, -1), -1);
      assertEquals(convertToPoints(Units.Pixels, -5), -1);
    });

    it('should handle zero correctly', () => {
      assertGreaterOrEqual(convertToPoints(Units.Inches, 0), 0);
      assertGreaterOrEqual(convertToPoints(Units.Points, 0), 0);
    });
  });

  describe('identity conversion', () => {
    it('should return the same value when converting points to points', () => {
      assertAlmostEquals(convertToPoints(Units.Points, 72), 72, 0.1);
      assertAlmostEquals(convertToPoints(Units.Points, 36), 36, 0.1);
    });
  });
});
