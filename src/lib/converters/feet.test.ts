import { describe, it } from "jsr:@std/testing/bdd";
import { assertEquals, assertAlmostEquals, assert } from "jsr:@std/assert";
import { convertToFeet } from '@/lib/converters/feet.ts';
import { Units } from '@/lib/units.ts';
import { PPI, FONT_SIZE, CH_TO_EM_RATIO, EX_TO_EM_RATIO, VIEWPORT_WIDTH, VIEWPORT_HEIGHT } from '@/lib/constants.ts';
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

  describe('font-based units', () => {
    it('should convert Ch to feet via pixels', () => {
      const result = convertToFeet(Units.Ch, 1);
      assert(result.ok);
      const expectedPixels = FONT_SIZE * CH_TO_EM_RATIO;
      const expectedFeet = (expectedPixels / PPI) / 12;
      assertAlmostEquals(result.value, expectedFeet, 0.1);
    });

    it('should convert Ex to feet via pixels', () => {
      const result = convertToFeet(Units.Ex, 1);
      assert(result.ok);
      const expectedPixels = FONT_SIZE * EX_TO_EM_RATIO;
      const expectedFeet = (expectedPixels / PPI) / 12;
      assertAlmostEquals(result.value, expectedFeet, 0.1);
    });

    it('should convert Rems to feet via pixels', () => {
      const result = convertToFeet(Units.Rems, 1);
      assert(result.ok);
      const expectedFeet = (FONT_SIZE / PPI) / 12;
      assertAlmostEquals(result.value, expectedFeet, 0.1);
    });
  });

  describe('viewport-based units', () => {
    it('should convert Vh to feet via pixels', () => {
      const result = convertToFeet(Units.Vh, 1);
      assert(result.ok);
      const expectedPixels = VIEWPORT_HEIGHT / 100;
      const expectedFeet = (expectedPixels / PPI) / 12;
      assertAlmostEquals(result.value, expectedFeet, 0.1);
    });

    it('should convert Vw to feet via pixels', () => {
      const result = convertToFeet(Units.Vw, 1);
      assert(result.ok);
      const expectedPixels = VIEWPORT_WIDTH / 100;
      const expectedFeet = (expectedPixels / PPI) / 12;
      assertAlmostEquals(result.value, expectedFeet, 0.1);
    });

    it('should convert Vmin to feet via pixels', () => {
      const result = convertToFeet(Units.Vmin, 1);
      assert(result.ok);
      const expectedPixels = Math.min(VIEWPORT_WIDTH, VIEWPORT_HEIGHT) / 100;
      const expectedFeet = (expectedPixels / PPI) / 12;
      assertAlmostEquals(result.value, expectedFeet, 0.1);
    });

    it('should convert Vmax to feet via pixels', () => {
      const result = convertToFeet(Units.Vmax, 1);
      assert(result.ok);
      const expectedPixels = Math.max(VIEWPORT_WIDTH, VIEWPORT_HEIGHT) / 100;
      const expectedFeet = (expectedPixels / PPI) / 12;
      assertAlmostEquals(result.value, expectedFeet, 0.1);
    });
  });

  describe('ratio-based units', () => {
    it('should return -1 for Golden ratio unit', () => {
      const result = convertToFeet(Units.Golden, 10);
      assert(result.ok);
      assertEquals(result.value, -1);
    });

    it('should return -1 for Root2 ratio unit', () => {
      const result = convertToFeet(Units.Root2, 10);
      assert(result.ok);
      assertEquals(result.value, -1);
    });

    it('should return -1 for SixteenNine ratio unit', () => {
      const result = convertToFeet(Units.SixteenNine, 10);
      assert(result.ok);
      assertEquals(result.value, -1);
    });
  });
});
