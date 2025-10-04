import { describe, it, expect } from 'vitest';
import { convertToPoints } from '@/lib/converters/points';
import { Units } from '@/lib/units';
import { PPI } from '@/lib/constants';

describe('convertToPoints', () => {
  describe('known constants', () => {
    it('should convert inches using standard relationship (1 inch = 72 points)', () => {
      expect(convertToPoints(Units.Inches, 1)).toBeCloseTo(72, 1);
    });

    it('should convert picas using standard relationship (1 pica = 12 points)', () => {
      expect(convertToPoints(Units.Picas, 1)).toBeCloseTo(12, 1);
    });

    it('should convert pixels using PPI (96 pixels = 1 inch = 72 points)', () => {
      expect(convertToPoints(Units.Pixels, PPI)).toBeCloseTo(72, 0);
    });
  });

  describe('proportionality', () => {
    it('should scale proportionally', () => {
      const value1 = convertToPoints(Units.Inches, 2);
      const value2 = convertToPoints(Units.Inches, 4);
      expect(value2).toBeCloseTo(value1 * 2, 1);
    });
  });

  describe('edge cases', () => {
    it('should return -1 for negative inputs', () => {
      expect(convertToPoints(Units.Inches, -1)).toBe(-1);
      expect(convertToPoints(Units.Pixels, -5)).toBe(-1);
    });

    it('should handle zero correctly', () => {
      expect(convertToPoints(Units.Inches, 0)).toBeGreaterThanOrEqual(0);
      expect(convertToPoints(Units.Points, 0)).toBeGreaterThanOrEqual(0);
    });
  });

  describe('identity conversion', () => {
    it('should return the same value when converting points to points', () => {
      expect(convertToPoints(Units.Points, 72)).toBeCloseTo(72, 1);
      expect(convertToPoints(Units.Points, 36)).toBeCloseTo(36, 1);
    });
  });
});
