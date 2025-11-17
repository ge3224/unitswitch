import { describe, it } from "jsr:@std/testing/bdd";
import { assertEquals, assertAlmostEquals, assert } from "jsr:@std/assert";
import { convertToPoints } from '@/lib/converters/points.ts';
import { Units } from '@/lib/units.ts';
import { PPI, FONT_SIZE, CH_TO_EM_RATIO, EX_TO_EM_RATIO, VIEWPORT_WIDTH, VIEWPORT_HEIGHT } from '@/lib/constants.ts';
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

  describe('font-based units', () => {
    it('should convert Ch to points via pixels', () => {
      // 1ch = fontSize * chToEmRatio = 16 * 0.5 = 8px
      // 8px * (72 / 96) = 6pt
      const result = convertToPoints(Units.Ch, 1);
      assert(result.ok);
      const expectedPixels = FONT_SIZE * CH_TO_EM_RATIO;
      const expectedPoints = expectedPixels * (72 / PPI);
      assertAlmostEquals(result.value, expectedPoints, 0.1);
    });

    it('should convert Ex to points via pixels', () => {
      const result = convertToPoints(Units.Ex, 1);
      assert(result.ok);
      const expectedPixels = FONT_SIZE * EX_TO_EM_RATIO;
      const expectedPoints = expectedPixels * (72 / PPI);
      assertAlmostEquals(result.value, expectedPoints, 0.1);
    });

    it('should convert Rems to points via pixels', () => {
      // 1rem = 16px = 16 * (72 / 96) = 12pt
      const result = convertToPoints(Units.Rems, 1);
      assert(result.ok);
      assertAlmostEquals(result.value, FONT_SIZE * (72 / PPI), 0.1);
    });
  });

  describe('viewport-based units', () => {
    it('should convert Vh to points via pixels', () => {
      // 1vh = 1080/100 = 10.8px
      const result = convertToPoints(Units.Vh, 1);
      assert(result.ok);
      const expectedPixels = VIEWPORT_HEIGHT / 100;
      const expectedPoints = expectedPixels * (72 / PPI);
      assertAlmostEquals(result.value, expectedPoints, 0.1);
    });

    it('should convert Vw to points via pixels', () => {
      const result = convertToPoints(Units.Vw, 1);
      assert(result.ok);
      const expectedPixels = VIEWPORT_WIDTH / 100;
      const expectedPoints = expectedPixels * (72 / PPI);
      assertAlmostEquals(result.value, expectedPoints, 0.1);
    });

    it('should convert Vmin to points via pixels', () => {
      const result = convertToPoints(Units.Vmin, 1);
      assert(result.ok);
      const expectedPixels = Math.min(VIEWPORT_WIDTH, VIEWPORT_HEIGHT) / 100;
      const expectedPoints = expectedPixels * (72 / PPI);
      assertAlmostEquals(result.value, expectedPoints, 0.1);
    });

    it('should convert Vmax to points via pixels', () => {
      const result = convertToPoints(Units.Vmax, 1);
      assert(result.ok);
      const expectedPixels = Math.max(VIEWPORT_WIDTH, VIEWPORT_HEIGHT) / 100;
      const expectedPoints = expectedPixels * (72 / PPI);
      assertAlmostEquals(result.value, expectedPoints, 0.1);
    });
  });

  describe('ratio-based units', () => {
    it('should return -1 for Golden ratio unit', () => {
      const result = convertToPoints(Units.Golden, 10);
      assert(result.ok);
      assertEquals(result.value, -1);
    });

    it('should return -1 for Root2 ratio unit', () => {
      const result = convertToPoints(Units.Root2, 10);
      assert(result.ok);
      assertEquals(result.value, -1);
    });

    it('should return -1 for SixteenNine ratio unit', () => {
      const result = convertToPoints(Units.SixteenNine, 10);
      assert(result.ok);
      assertEquals(result.value, -1);
    });
  });
});
