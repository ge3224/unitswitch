import { describe, it, expect } from 'vitest';
import { convertToMillimeters } from '@/lib/converters/millimeters';
import { Units } from '@/lib/units';
import { PPI } from '@/lib/constants';

describe('convertToMillimeters', () => {
  describe('known constants', () => {
    it('should convert inches using standard relationship (1 inch = 25.4 mm)', () => {
      expect(convertToMillimeters(Units.Inches, 1)).toBeCloseTo(25.4, 1);
    });

    it('should convert centimeters using standard relationship (1 cm = 10 mm)', () => {
      expect(convertToMillimeters(Units.Centimeters, 1)).toBeCloseTo(10, 1);
    });

    it('should convert feet using standard relationship (1 foot = 12 inches = 304.8 mm)', () => {
      expect(convertToMillimeters(Units.Feet, 1)).toBeCloseTo(304.8, 1);
    });

    it('should convert pixels using PPI (96 pixels = 1 inch = 25.4 mm)', () => {
      expect(convertToMillimeters(Units.Pixels, PPI)).toBeCloseTo(25.4, 1);
    });
  });

  describe('proportionality', () => {
    it('should scale proportionally', () => {
      const value1 = convertToMillimeters(Units.Inches, 2);
      const value2 = convertToMillimeters(Units.Inches, 4);
      expect(value2).toBeCloseTo(value1 * 2, 1);
    });
  });

  describe('edge cases', () => {
    it('should return -1 for negative inputs', () => {
      expect(convertToMillimeters(Units.Inches, -1)).toBe(-1);
      expect(convertToMillimeters(Units.Pixels, -5)).toBe(-1);
    });

    it('should handle zero correctly', () => {
      expect(convertToMillimeters(Units.Inches, 0)).toBeGreaterThanOrEqual(0);
      expect(convertToMillimeters(Units.Millimeters, 0)).toBeGreaterThanOrEqual(0);
    });
  });

  describe('identity conversion', () => {
    it('should return the same value when converting millimeters to millimeters', () => {
      expect(convertToMillimeters(Units.Millimeters, 10)).toBeCloseTo(10, 1);
      expect(convertToMillimeters(Units.Millimeters, 25.4)).toBeCloseTo(25.4, 1);
    });
  });
});
