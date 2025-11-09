import { describe, it } from "jsr:@std/testing/bdd";
import { assertEquals, assertAlmostEquals, assert } from "jsr:@std/assert";
import { convertToRems } from '@/lib/converters/rems.ts';
import { Units } from '@/lib/units.ts';
import { PPI, FONT_SIZE } from '@/lib/constants.ts';
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
});
