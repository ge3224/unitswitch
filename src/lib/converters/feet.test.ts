import { describe, it } from "jsr:@std/testing/bdd";
import { assertEquals, assertAlmostEquals, assertGreaterOrEqual } from "jsr:@std/assert";
import { convertToFeet } from '@/lib/converters/feet';
import { Units } from '@/lib/units';
import { PPI } from '@/lib/constants';

describe('convertToFeet', () => {
  describe('known constants', () => {
    it('should convert inches using standard relationship (1 foot = 12 inches)', () => {
      assertAlmostEquals(convertToFeet(Units.Inches, 12), 1, 0.1);
    });

    it('should convert centimeters using standard relationship (1 foot = 30.48 cm)', () => {
      assertAlmostEquals(convertToFeet(Units.Centimeters, 30.48), 1, 0.1);
    });

    it('should convert millimeters using standard relationship (1 foot = 304.8 mm)', () => {
      assertAlmostEquals(convertToFeet(Units.Millimeters, 304.8), 1, 0.1);
    });

    it('should convert pixels using PPI (1152 pixels = 1 foot)', () => {
      assertAlmostEquals(convertToFeet(Units.Pixels, 12 * PPI), 1, 1);
    });
  });

  describe('proportionality', () => {
    it('should scale proportionally', () => {
      const value1 = convertToFeet(Units.Inches, 24);
      const value2 = convertToFeet(Units.Inches, 48);
      assertAlmostEquals(value2, value1 * 2, 0.1);
    });
  });

  describe('edge cases', () => {
    it('should return -1 for negative inputs', () => {
      assertEquals(convertToFeet(Units.Inches, -1), -1);
      assertEquals(convertToFeet(Units.Pixels, -5), -1);
    });

    it('should handle zero correctly', () => {
      assertGreaterOrEqual(convertToFeet(Units.Inches, 0), 0);
      assertGreaterOrEqual(convertToFeet(Units.Feet, 0), 0);
    });
  });

  describe('identity conversion', () => {
    it('should return the same value when converting feet to feet', () => {
      assertAlmostEquals(convertToFeet(Units.Feet, 3), 3, 0.1);
      assertAlmostEquals(convertToFeet(Units.Feet, 10.5), 10.5, 0.1);
    });
  });
});
