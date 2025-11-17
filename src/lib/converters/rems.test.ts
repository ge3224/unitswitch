import { describe, it } from "jsr:@std/testing/bdd";
import { assertEquals, assertAlmostEquals, assert } from "jsr:@std/assert";
import { convertToRems } from '@/lib/converters/rems.ts';
import { Units } from '@/lib/units.ts';
import { PPI, FONT_SIZE, CH_TO_EM_RATIO, EX_TO_EM_RATIO, VIEWPORT_WIDTH, VIEWPORT_HEIGHT } from '@/lib/constants.ts';
import { ConversionErrorKind } from './result.ts';

describe('convertToRems', () => {
  describe('known constants', () => {
    it('should respect FONT_SIZE constant (1 rem = 16 pixels)', () => {
      const result = convertToRems(Units.Pixels, FONT_SIZE);
      assert(result.ok);
      assertEquals(result.value, 1);
    });


    it('should convert inches using PPI and FONT_SIZE', () => {
      // 1 inch = 96px = 6 rems (96/16)
      const result = convertToRems(Units.Inches, 1);
      assert(result.ok);
      assertAlmostEquals(result.value, PPI / FONT_SIZE, 0.1);
    });

    it('should convert points using standard relationship (72 points = 1 inch)', () => {
      // 72 points = 1 inch = 96px = 6 rems
      const result = convertToRems(Units.Points, 72);
      assert(result.ok);
      assertAlmostEquals(result.value, PPI / FONT_SIZE, 0.1);
    });
  });

  describe('proportionality', () => {
    it('should scale proportionally', () => {
      const result1 = convertToRems(Units.Pixels, 32);
      const result2 = convertToRems(Units.Pixels, 64);
      assert(result1.ok && result2.ok);
      assertEquals(result2.value, result1.value * 2);
    });
  });


  describe('edge cases', () => {
    it('should return Err for negative inputs', () => {
      const result1 = convertToRems(Units.Pixels, -1);
      assert(!result1.ok);
      assertEquals(result1.error.kind, ConversionErrorKind.NegativeInput);

      const result2 = convertToRems(Units.Rems, -5);
      assert(!result2.ok);
      assertEquals(result2.error.kind, ConversionErrorKind.NegativeInput);
    });

    it('should handle zero correctly', () => {
      const result1 = convertToRems(Units.Pixels, 0);
      assert(result1.ok);
      assert(result1.value >= 0);

      const result2 = convertToRems(Units.Rems, 0);
      assert(result2.ok);
      assert(result2.value >= 0);
    });
  });

  describe('identity conversion', () => {
    it('should return the same value when converting rems to rems', () => {
      const result1 = convertToRems(Units.Rems, 2.5);
      assert(result1.ok);
      assertEquals(result1.value, 2.5);

      const result2 = convertToRems(Units.Rems, 10);
      assert(result2.ok);
      assertEquals(result2.value, 10);
    });
  });

  describe('font-based units', () => {
    it('should convert Ch to rems using chToEmRatio', () => {
      // 1ch = chToEmRatio = 0.5rem
      const result = convertToRems(Units.Ch, 1);
      assert(result.ok);
      assertEquals(result.value, CH_TO_EM_RATIO);
    });

    it('should convert Ex to rems using exToEmRatio', () => {
      // 1ex = exToEmRatio = 0.5rem
      const result = convertToRems(Units.Ex, 1);
      assert(result.ok);
      assertEquals(result.value, EX_TO_EM_RATIO);
    });

    it('should convert 2ch to 1rem', () => {
      // 2ch = 2 * 0.5 = 1rem
      const result = convertToRems(Units.Ch, 2);
      assert(result.ok);
      assertEquals(result.value, 1);
    });
  });

  describe('viewport-based units', () => {
    it('should convert Vh to rems via pixels', () => {
      // 1vh = 1080/100 = 10.8px = 10.8/16 = 0.675rem
      const result = convertToRems(Units.Vh, 1);
      assert(result.ok);
      const expectedPixels = VIEWPORT_HEIGHT / 100;
      const expectedRems = expectedPixels / FONT_SIZE;
      assertAlmostEquals(result.value, expectedRems, 0.01);
    });

    it('should convert Vw to rems via pixels', () => {
      const result = convertToRems(Units.Vw, 1);
      assert(result.ok);
      const expectedPixels = VIEWPORT_WIDTH / 100;
      const expectedRems = expectedPixels / FONT_SIZE;
      assertAlmostEquals(result.value, expectedRems, 0.01);
    });

    it('should convert Vmin to rems via pixels', () => {
      const result = convertToRems(Units.Vmin, 1);
      assert(result.ok);
      const expectedPixels = Math.min(VIEWPORT_WIDTH, VIEWPORT_HEIGHT) / 100;
      const expectedRems = expectedPixels / FONT_SIZE;
      assertAlmostEquals(result.value, expectedRems, 0.01);
    });

    it('should convert Vmax to rems via pixels', () => {
      const result = convertToRems(Units.Vmax, 1);
      assert(result.ok);
      const expectedPixels = Math.max(VIEWPORT_WIDTH, VIEWPORT_HEIGHT) / 100;
      const expectedRems = expectedPixels / FONT_SIZE;
      assertAlmostEquals(result.value, expectedRems, 0.01);
    });

    it('should convert 30vh to 20.25 rems', () => {
      // 30vh = 324px = 20.25rem (as verified earlier)
      const result = convertToRems(Units.Vh, 30);
      assert(result.ok);
      assertEquals(result.value, 20.25);
    });
  });

  describe('ratio-based units', () => {
    it('should return -1 for Golden ratio unit', () => {
      const result = convertToRems(Units.Golden, 10);
      assert(result.ok);
      assertEquals(result.value, -1);
    });

    it('should return -1 for Root2 ratio unit', () => {
      const result = convertToRems(Units.Root2, 10);
      assert(result.ok);
      assertEquals(result.value, -1);
    });

    it('should return -1 for SixteenNine ratio unit', () => {
      const result = convertToRems(Units.SixteenNine, 10);
      assert(result.ok);
      assertEquals(result.value, -1);
    });
  });
});
