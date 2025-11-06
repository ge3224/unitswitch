import { describe, it } from "jsr:@std/testing/bdd";
import { assertEquals, assertAlmostEquals, assertGreaterOrEqual } from "jsr:@std/assert";
import { convertToInches } from '@/lib/converters/inches.ts';
import { Units } from '@/lib/units.ts';
import { PPI } from '@/lib/constants.ts';

describe('convertToInches', () => {
  describe('known constants', () => {
    it('should respect PPI constant (96 pixels = 1 inch)', () => {
      assertAlmostEquals(convertToInches(Units.Pixels, PPI), 1, 0.1);
    });

    it('should convert feet using standard relationship (1 foot = 12 inches)', () => {
      assertAlmostEquals(convertToInches(Units.Feet, 1), 12, 1);
    });

    it('should convert centimeters using standard relationship (1 inch = 2.54 cm)', () => {
      assertAlmostEquals(convertToInches(Units.Centimeters, 2.54), 1, 0.1);
    });

    it('should convert millimeters using standard relationship (1 inch = 25.4 mm)', () => {
      assertAlmostEquals(convertToInches(Units.Millimeters, 25.4), 1, 0.1);
    });

    it('should convert points using standard relationship (72 points = 1 inch)', () => {
      assertAlmostEquals(convertToInches(Units.Points, 72), 1, 0.1);
    });

    it('should convert picas using standard relationship (6 picas = 1 inch)', () => {
      assertAlmostEquals(convertToInches(Units.Picas, 6), 1, 0.1);
    });
  });

  describe('proportionality', () => {
    it('should scale proportionally', () => {
      const value1 = convertToInches(Units.Feet, 2);
      const value2 = convertToInches(Units.Feet, 4);
      assertAlmostEquals(value2, value1 * 2, 0.1);
    });
  });

  describe('edge cases', () => {
    it('should return -1 for negative inputs', () => {
      assertEquals(convertToInches(Units.Pixels, -1), -1);
      assertEquals(convertToInches(Units.Feet, -5), -1);
    });

    it('should handle zero correctly', () => {
      assertGreaterOrEqual(convertToInches(Units.Pixels, 0), 0);
      assertGreaterOrEqual(convertToInches(Units.Feet, 0), 0);
    });
  });

  describe('identity conversion', () => {
    it('should return the same value when converting inches to inches', () => {
      assertAlmostEquals(convertToInches(Units.Inches, 5), 5, 0.1);
      assertAlmostEquals(convertToInches(Units.Inches, 10.5), 10.5, 0.1);
    });
  });
});
