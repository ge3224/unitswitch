import { describe, it } from "jsr:@std/testing/bdd";
import { assertEquals, assertAlmostEquals, assertGreaterOrEqual } from "jsr:@std/assert";
import { convertToMillimeters } from '@/lib/converters/millimeters';
import { Units } from '@/lib/units';
import { PPI } from '@/lib/constants';

describe('convertToMillimeters', () => {
  describe('known constants', () => {
    it('should convert inches using standard relationship (1 inch = 25.4 mm)', () => {
      assertAlmostEquals(convertToMillimeters(Units.Inches, 1), 25.4, 0.1);
    });

    it('should convert centimeters using standard relationship (1 cm = 10 mm)', () => {
      assertAlmostEquals(convertToMillimeters(Units.Centimeters, 1), 10, 0.1);
    });

    it('should convert feet using standard relationship (1 foot = 12 inches = 304.8 mm)', () => {
      assertAlmostEquals(convertToMillimeters(Units.Feet, 1), 304.8, 0.1);
    });

    it('should convert pixels using PPI (96 pixels = 1 inch = 25.4 mm)', () => {
      assertAlmostEquals(convertToMillimeters(Units.Pixels, PPI), 25.4, 0.1);
    });
  });

  describe('proportionality', () => {
    it('should scale proportionally', () => {
      const value1 = convertToMillimeters(Units.Inches, 2);
      const value2 = convertToMillimeters(Units.Inches, 4);
      assertAlmostEquals(value2, value1 * 2, 0.1);
    });
  });

  describe('edge cases', () => {
    it('should return -1 for negative inputs', () => {
      assertEquals(convertToMillimeters(Units.Inches, -1), -1);
      assertEquals(convertToMillimeters(Units.Pixels, -5), -1);
    });

    it('should handle zero correctly', () => {
      assertGreaterOrEqual(convertToMillimeters(Units.Inches, 0), 0);
      assertGreaterOrEqual(convertToMillimeters(Units.Millimeters, 0), 0);
    });
  });

  describe('identity conversion', () => {
    it('should return the same value when converting millimeters to millimeters', () => {
      assertAlmostEquals(convertToMillimeters(Units.Millimeters, 10), 10, 0.1);
      assertAlmostEquals(convertToMillimeters(Units.Millimeters, 25.4), 25.4, 0.1);
    });
  });
});
