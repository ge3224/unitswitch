import { describe, it } from "jsr:@std/testing/bdd";
import { assertEquals, assertAlmostEquals, assertGreaterOrEqual, assertGreater } from "jsr:@std/assert";
import { convertToPixels } from '@/lib/converters/pixels.ts';
import { Units } from '@/lib/units.ts';
import { PPI, FONT_SIZE } from '@/lib/constants.ts';

describe('convertToPixels', () => {
  describe('known constants', () => {
    it('should respect PPI constant (96 pixels per inch)', () => {
      assertEquals(convertToPixels(Units.Inches, 1), PPI);
    });

    it('should respect FONT_SIZE constant (16 pixels per rem)', () => {
      assertEquals(convertToPixels(Units.Rems, 1), FONT_SIZE);
    });

    it('should convert feet using inch relationship (1 foot = 12 inches)', () => {
      assertEquals(convertToPixels(Units.Feet, 1), 12 * PPI);
    });

    it('should convert points using standard relationship (72 points = 1 inch)', () => {
      assertAlmostEquals(convertToPixels(Units.Points, 72), PPI, 1);
    });

    it('should convert picas using standard relationship (6 picas = 1 inch)', () => {
      assertAlmostEquals(convertToPixels(Units.Picas, 6), PPI, 1);
    });

    it('should convert centimeters using inch relationship (1 inch = 2.54 cm)', () => {
      assertAlmostEquals(convertToPixels(Units.Centimeters, 2.54), PPI, 1);
    });

    it('should convert millimeters using inch relationship (1 inch = 25.4 mm)', () => {
      assertAlmostEquals(convertToPixels(Units.Millimeters, 25.4), PPI, 1);
    });
  });

  describe('proportionality', () => {
    it('should scale proportionally for rems', () => {
      const value1 = convertToPixels(Units.Rems, 2);
      const value2 = convertToPixels(Units.Rems, 4);
      assertEquals(value2, value1 * 2);
    });

    it('should scale proportionally for inches', () => {
      const value1 = convertToPixels(Units.Inches, 3);
      const value2 = convertToPixels(Units.Inches, 6);
      assertEquals(value2, value1 * 2);
    });
  });

  describe('edge cases', () => {
    it('should return -1 for negative inputs', () => {
      assertEquals(convertToPixels(Units.Pixels, -1), -1);
      assertEquals(convertToPixels(Units.Rems, -5), -1);
      assertEquals(convertToPixels(Units.Inches, -10), -1);
    });

    it('should handle zero correctly', () => {
      assertGreaterOrEqual(convertToPixels(Units.Pixels, 0), 0);
      assertGreaterOrEqual(convertToPixels(Units.Rems, 0), 0);
    });

    it('should return positive values for all valid positive inputs', () => {
      const units = [
        Units.Pixels, Units.Rems, Units.Inches,
        Units.Centimeters, Units.Millimeters, Units.Points, Units.Picas
      ];
      units.forEach(unit => {
        assertGreater(convertToPixels(unit, 10), 0);
      });
    });
  });

  describe('identity conversion', () => {
    it('should return the same value when converting pixels to pixels', () => {
      assertEquals(convertToPixels(Units.Pixels, 100), 100);
      assertEquals(convertToPixels(Units.Pixels, 42), 42);
    });
  });
});
