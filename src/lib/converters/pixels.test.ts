import { describe, it } from "jsr:@std/testing/bdd";
import { assertEquals, assertAlmostEquals, assert } from "jsr:@std/assert";
import { convertToPixels } from '@/lib/converters/pixels.ts';
import { Units } from '@/lib/units.ts';
import { PPI, FONT_SIZE, CH_TO_EM_RATIO, EX_TO_EM_RATIO, VIEWPORT_WIDTH, VIEWPORT_HEIGHT } from '@/lib/constants.ts';
import { ConversionErrorKind } from './result.ts';

describe('convertToPixels', () => {
  describe('known constants', () => {
    it('should respect PPI constant (96 pixels per inch)', () => {
      const result = convertToPixels(Units.Inches, 1);
      assert(result.ok);
      assertEquals(result.value, PPI);
    });

    it('should respect FONT_SIZE constant (16 pixels per rem)', () => {
      const result = convertToPixels(Units.Rems, 1);
      assert(result.ok);
      assertEquals(result.value, FONT_SIZE);
    });

    it('should convert feet using inch relationship (1 foot = 12 inches)', () => {
      const result = convertToPixels(Units.Feet, 1);
      assert(result.ok);
      assertEquals(result.value, 12 * PPI);
    });

    it('should convert points using standard relationship (72 points = 1 inch)', () => {
      const result = convertToPixels(Units.Points, 72);
      assert(result.ok);
      assertAlmostEquals(result.value, PPI, 1);
    });

    it('should convert picas using standard relationship (6 picas = 1 inch)', () => {
      const result = convertToPixels(Units.Picas, 6);
      assert(result.ok);
      assertAlmostEquals(result.value, PPI, 1);
    });

    it('should convert centimeters using inch relationship (1 inch = 2.54 cm)', () => {
      const result = convertToPixels(Units.Centimeters, 2.54);
      assert(result.ok);
      assertAlmostEquals(result.value, PPI, 1);
    });

    it('should convert millimeters using inch relationship (1 inch = 25.4 mm)', () => {
      const result = convertToPixels(Units.Millimeters, 25.4);
      assert(result.ok);
      assertAlmostEquals(result.value, PPI, 1);
    });
  });

  describe('proportionality', () => {
    it('should scale proportionally for rems', () => {
      const result1 = convertToPixels(Units.Rems, 2);
      const result2 = convertToPixels(Units.Rems, 4);
      assert(result1.ok && result2.ok);
      assertEquals(result2.value, result1.value * 2);
    });

    it('should scale proportionally for inches', () => {
      const result1 = convertToPixels(Units.Inches, 3);
      const result2 = convertToPixels(Units.Inches, 6);
      assert(result1.ok && result2.ok);
      assertEquals(result2.value, result1.value * 2);
    });
  });

  describe('edge cases', () => {
    it('should return Err for negative inputs', () => {
      const result1 = convertToPixels(Units.Pixels, -1);
      assert(!result1.ok);
      assertEquals(result1.error.kind, ConversionErrorKind.NegativeInput);

      const result2 = convertToPixels(Units.Rems, -5);
      assert(!result2.ok);
      assertEquals(result2.error.kind, ConversionErrorKind.NegativeInput);

      const result3 = convertToPixels(Units.Inches, -10);
      assert(!result3.ok);
      assertEquals(result3.error.kind, ConversionErrorKind.NegativeInput);
    });

    it('should handle zero correctly', () => {
      const result1 = convertToPixels(Units.Pixels, 0);
      assert(result1.ok);
      assert(result1.value >= 0);

      const result2 = convertToPixels(Units.Rems, 0);
      assert(result2.ok);
      assert(result2.value >= 0);
    });

    it('should return Ok with positive values for all valid positive inputs', () => {
      const units = [
        Units.Pixels, Units.Rems, Units.Inches,
        Units.Centimeters, Units.Millimeters, Units.Points, Units.Picas
      ];
      units.forEach(unit => {
        const result = convertToPixels(unit, 10);
        assert(result.ok);
        assert(result.value > 0);
      });
    });
  });

  describe('identity conversion', () => {
    it('should return the same value when converting pixels to pixels', () => {
      const result1 = convertToPixels(Units.Pixels, 100);
      assert(result1.ok);
      assertEquals(result1.value, 100);

      const result2 = convertToPixels(Units.Pixels, 42);
      assert(result2.ok);
      assertEquals(result2.value, 42);
    });
  });

  describe('font-based units', () => {
    it('should convert Ch to pixels using chToEmRatio and fontSize', () => {
      // 1ch = fontSize * chToEmRatio = 16 * 0.5 = 8px
      const result = convertToPixels(Units.Ch, 1);
      assert(result.ok);
      assertEquals(result.value, Math.ceil(FONT_SIZE * CH_TO_EM_RATIO));
    });

    it('should convert Ex to pixels using exToEmRatio and fontSize', () => {
      // 1ex = fontSize * exToEmRatio = 16 * 0.5 = 8px
      const result = convertToPixels(Units.Ex, 1);
      assert(result.ok);
      assertEquals(result.value, Math.ceil(FONT_SIZE * EX_TO_EM_RATIO));
    });

    it('should scale Ch proportionally', () => {
      const result1 = convertToPixels(Units.Ch, 2);
      const result2 = convertToPixels(Units.Ch, 4);
      assert(result1.ok && result2.ok);
      assertEquals(result2.value, result1.value * 2);
    });
  });

  describe('viewport-based units', () => {
    it('should convert Vh to pixels', () => {
      // 1vh = viewportHeight / 100 = 1080 / 100 = 10.8px
      const result = convertToPixels(Units.Vh, 1);
      assert(result.ok);
      assertEquals(result.value, Math.round(VIEWPORT_HEIGHT / 100));
    });

    it('should convert Vw to pixels', () => {
      // 1vw = viewportWidth / 100 = 1920 / 100 = 19.2px
      const result = convertToPixels(Units.Vw, 1);
      assert(result.ok);
      assertEquals(result.value, Math.round(VIEWPORT_WIDTH / 100));
    });

    it('should convert Vmin to pixels', () => {
      // 1vmin = min(1920, 1080) / 100 = 1080 / 100 = 10.8px
      const result = convertToPixels(Units.Vmin, 1);
      assert(result.ok);
      assertEquals(result.value, Math.round(Math.min(VIEWPORT_WIDTH, VIEWPORT_HEIGHT) / 100));
    });

    it('should convert Vmax to pixels', () => {
      // 1vmax = max(1920, 1080) / 100 = 1920 / 100 = 19.2px
      const result = convertToPixels(Units.Vmax, 1);
      assert(result.ok);
      assertEquals(result.value, Math.round(Math.max(VIEWPORT_WIDTH, VIEWPORT_HEIGHT) / 100));
    });

    it('should convert 100vh to viewport height', () => {
      const result = convertToPixels(Units.Vh, 100);
      assert(result.ok);
      assertEquals(result.value, Math.round(VIEWPORT_HEIGHT));
    });

    it('should convert 100vw to viewport width', () => {
      const result = convertToPixels(Units.Vw, 100);
      assert(result.ok);
      assertEquals(result.value, Math.round(VIEWPORT_WIDTH));
    });
  });

  describe('ratio-based units', () => {
    it('should return -1 for Golden ratio unit', () => {
      const result = convertToPixels(Units.Golden, 10);
      assert(result.ok);
      assertEquals(result.value, -1);
    });

    it('should return -1 for Root2 ratio unit', () => {
      const result = convertToPixels(Units.Root2, 10);
      assert(result.ok);
      assertEquals(result.value, -1);
    });

    it('should return -1 for SixteenNine ratio unit', () => {
      const result = convertToPixels(Units.SixteenNine, 10);
      assert(result.ok);
      assertEquals(result.value, -1);
    });
  });
});
