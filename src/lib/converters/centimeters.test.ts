import { describe, it, expect } from 'vitest';
import { convertToCentimeters } from '@/lib/converters/centimeters';
import { Units } from '@/lib/units';
import { PPI } from '@/lib/constants';

describe('convertToCentimeters', () => {
  describe('known constants', () => {
    it('should convert inches using standard relationship (1 inch = 2.54 cm)', () => {
      expect(convertToCentimeters(Units.Inches, 1)).toBeCloseTo(2.54, 1);
    });

    it('should convert millimeters using standard relationship (1 cm = 10 mm)', () => {
      expect(convertToCentimeters(Units.Millimeters, 10)).toBeCloseTo(1, 1);
    });

    it('should convert feet using standard relationship (1 foot = 12 inches = 30.48 cm)', () => {
      expect(convertToCentimeters(Units.Feet, 1)).toBeCloseTo(30.48, 1);
    });

    it('should convert pixels using PPI (96 pixels = 1 inch = 2.54 cm)', () => {
      expect(convertToCentimeters(Units.Pixels, PPI)).toBeCloseTo(2.54, 1);
    });
  });

  describe('proportionality', () => {
    it('should scale proportionally', () => {
      const value1 = convertToCentimeters(Units.Inches, 2);
      const value2 = convertToCentimeters(Units.Inches, 4);
      expect(value2).toBeCloseTo(value1 * 2, 1);
    });
  });

  describe('edge cases', () => {
    it('should return -1 for negative inputs', () => {
      expect(convertToCentimeters(Units.Inches, -1)).toBe(-1);
      expect(convertToCentimeters(Units.Pixels, -5)).toBe(-1);
    });

    it('should handle zero correctly', () => {
      expect(convertToCentimeters(Units.Inches, 0)).toBeGreaterThanOrEqual(0);
      expect(convertToCentimeters(Units.Centimeters, 0)).toBeGreaterThanOrEqual(0);
    });
  });

  describe('identity conversion', () => {
    it('should return the same value when converting centimeters to centimeters', () => {
      expect(convertToCentimeters(Units.Centimeters, 5)).toBeCloseTo(5, 1);
      expect(convertToCentimeters(Units.Centimeters, 2.54)).toBeCloseTo(2.54, 1);
    });
  });
});
