import { describe, it } from "jsr:@std/testing/bdd";
import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
import { convertToRems } from '@/lib/converters/rems.ts';
import { Units } from '@/lib/units.ts';
import { PPI, FONT_SIZE } from '@/lib/constants.ts';

describe('convertToRems', () => {
  describe('known constants', () => {
    it('should respect FONT_SIZE constant (1 rem = 16 pixels)', () => {
      assertEquals(convertToRems(Units.Pixels, FONT_SIZE), 1);
    });


    it('should convert inches using PPI and FONT_SIZE', () => {
      // 1 inch = 96px = 6 rems (96/16)
      assertAlmostEquals(convertToRems(Units.Inches, 1), PPI / FONT_SIZE, 0.1);
    });

    it('should convert points using standard relationship (72 points = 1 inch)', () => {
      // 72 points = 1 inch = 96px = 6 rems
      assertAlmostEquals(convertToRems(Units.Points, 72), PPI / FONT_SIZE, 0.1);
    });
  });

  describe('proportionality', () => {
    it('should scale proportionally', () => {
      const value1 = convertToRems(Units.Pixels, 32);
      const value2 = convertToRems(Units.Pixels, 64);
      assertEquals(value2, value1 * 2);
    });
  });


  describe('edge cases', () => {
    it('should return -1 for negative inputs', () => {
      assertEquals(convertToRems(Units.Pixels, -1), -1);
      assertEquals(convertToRems(Units.Rems, -5), -1);
    });

    it('should handle zero correctly', () => {
      assertEquals(convertToRems(Units.Pixels, 0), 0);
      assertEquals(convertToRems(Units.Rems, 0), 0);
    });
  });

  describe('identity conversion', () => {
    it('should return the same value when converting rems to rems', () => {
      assertEquals(convertToRems(Units.Rems, 2.5), 2.5);
      assertEquals(convertToRems(Units.Rems, 10), 10);
    });
  });
});
