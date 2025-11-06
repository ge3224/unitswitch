import { describe, it } from "jsr:@std/testing/bdd";
import { assertEquals, assertAlmostEquals, assertGreaterOrEqual } from "jsr:@std/assert";
import { convertToCentimeters } from '@/lib/converters/centimeters';
import { Units } from '@/lib/units';
import { PPI } from '@/lib/constants';

describe('convertToCentimeters', () => {
  describe('known constants', () => {
    it('should convert inches using standard relationship (1 inch = 2.54 cm)', () => {
      assertAlmostEquals(convertToCentimeters(Units.Inches, 1), 2.54, 0.1);
    });

    it('should convert millimeters using standard relationship (1 cm = 10 mm)', () => {
      assertAlmostEquals(convertToCentimeters(Units.Millimeters, 10), 1, 0.1);
    });

    it('should convert feet using standard relationship (1 foot = 12 inches = 30.48 cm)', () => {
      assertAlmostEquals(convertToCentimeters(Units.Feet, 1), 30.48, 0.1);
    });

    it('should convert pixels using PPI (96 pixels = 1 inch = 2.54 cm)', () => {
      assertAlmostEquals(convertToCentimeters(Units.Pixels, PPI), 2.54, 0.1);
    });
  });

  describe('proportionality', () => {
    it('should scale proportionally', () => {
      const value1 = convertToCentimeters(Units.Inches, 2);
      const value2 = convertToCentimeters(Units.Inches, 4);
      assertAlmostEquals(value2, value1 * 2, 0.1);
    });
  });

  describe('edge cases', () => {
    it('should return -1 for negative inputs', () => {
      assertEquals(convertToCentimeters(Units.Inches, -1), -1);
      assertEquals(convertToCentimeters(Units.Pixels, -5), -1);
    });

    it('should handle zero correctly', () => {
      assertGreaterOrEqual(convertToCentimeters(Units.Inches, 0), 0);
      assertGreaterOrEqual(convertToCentimeters(Units.Centimeters, 0), 0);
    });
  });

  describe('identity conversion', () => {
    it('should return the same value when converting centimeters to centimeters', () => {
      assertAlmostEquals(convertToCentimeters(Units.Centimeters, 5), 5, 0.1);
      assertAlmostEquals(convertToCentimeters(Units.Centimeters, 2.54), 2.54, 0.1);
    });
  });
});
