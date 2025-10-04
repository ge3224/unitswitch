import { describe, it, expect } from 'vitest';
import { convertToInches } from '@/lib/converters/inches';
import { Units } from '@/lib/units';
import { PPI, FONT_SIZE } from '@/lib/constants';

describe('convertToInches', () => {
  describe('known constants', () => {
    it('should respect PPI constant (96 pixels = 1 inch)', () => {
      expect(convertToInches(Units.Pixels, PPI)).toBeCloseTo(1, 1);
    });

    it('should convert feet using standard relationship (1 foot = 12 inches)', () => {
      expect(convertToInches(Units.Feet, 1)).toBeCloseTo(12, 0);
    });

    it('should convert centimeters using standard relationship (1 inch = 2.54 cm)', () => {
      expect(convertToInches(Units.Centimeters, 2.54)).toBeCloseTo(1, 1);
    });

    it('should convert millimeters using standard relationship (1 inch = 25.4 mm)', () => {
      expect(convertToInches(Units.Millimeters, 25.4)).toBeCloseTo(1, 1);
    });

    it('should convert points using standard relationship (72 points = 1 inch)', () => {
      expect(convertToInches(Units.Points, 72)).toBeCloseTo(1, 1);
    });

    it('should convert picas using standard relationship (6 picas = 1 inch)', () => {
      expect(convertToInches(Units.Picas, 6)).toBeCloseTo(1, 1);
    });
  });

  describe('proportionality', () => {
    it('should scale proportionally', () => {
      const value1 = convertToInches(Units.Feet, 2);
      const value2 = convertToInches(Units.Feet, 4);
      expect(value2).toBeCloseTo(value1 * 2, 1);
    });
  });

  describe('edge cases', () => {
    it('should return -1 for negative inputs', () => {
      expect(convertToInches(Units.Pixels, -1)).toBe(-1);
      expect(convertToInches(Units.Feet, -5)).toBe(-1);
    });

    it('should handle zero correctly', () => {
      expect(convertToInches(Units.Pixels, 0)).toBeGreaterThanOrEqual(0);
      expect(convertToInches(Units.Feet, 0)).toBeGreaterThanOrEqual(0);
    });
  });

  describe('identity conversion', () => {
    it('should return the same value when converting inches to inches', () => {
      expect(convertToInches(Units.Inches, 5)).toBeCloseTo(5, 1);
      expect(convertToInches(Units.Inches, 10.5)).toBeCloseTo(10.5, 1);
    });
  });
});
