import { describe, it, expect } from 'vitest';
import { convertToFeet } from '@/lib/converters/feet';
import { Units } from '@/lib/units';
import { PPI } from '@/lib/constants';

describe('convertToFeet', () => {
  describe('known constants', () => {
    it('should convert inches using standard relationship (1 foot = 12 inches)', () => {
      expect(convertToFeet(Units.Inches, 12)).toBeCloseTo(1, 1);
    });

    it('should convert centimeters using standard relationship (1 foot = 30.48 cm)', () => {
      expect(convertToFeet(Units.Centimeters, 30.48)).toBeCloseTo(1, 1);
    });

    it('should convert millimeters using standard relationship (1 foot = 304.8 mm)', () => {
      expect(convertToFeet(Units.Millimeters, 304.8)).toBeCloseTo(1, 1);
    });

    it('should convert pixels using PPI (1152 pixels = 1 foot)', () => {
      expect(convertToFeet(Units.Pixels, 12 * PPI)).toBeCloseTo(1, 0);
    });
  });

  describe('proportionality', () => {
    it('should scale proportionally', () => {
      const value1 = convertToFeet(Units.Inches, 24);
      const value2 = convertToFeet(Units.Inches, 48);
      expect(value2).toBeCloseTo(value1 * 2, 1);
    });
  });

  describe('edge cases', () => {
    it('should return -1 for negative inputs', () => {
      expect(convertToFeet(Units.Inches, -1)).toBe(-1);
      expect(convertToFeet(Units.Pixels, -5)).toBe(-1);
    });

    it('should handle zero correctly', () => {
      expect(convertToFeet(Units.Inches, 0)).toBeGreaterThanOrEqual(0);
      expect(convertToFeet(Units.Feet, 0)).toBeGreaterThanOrEqual(0);
    });
  });

  describe('identity conversion', () => {
    it('should return the same value when converting feet to feet', () => {
      expect(convertToFeet(Units.Feet, 3)).toBeCloseTo(3, 1);
      expect(convertToFeet(Units.Feet, 10.5)).toBeCloseTo(10.5, 1);
    });
  });
});
