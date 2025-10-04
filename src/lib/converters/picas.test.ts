import { describe, it, expect } from 'vitest';
import { convertToPicas } from '@/lib/converters/picas';
import { Units } from '@/lib/units';
import { PPI } from '@/lib/constants';

describe('convertToPicas', () => {
  describe('known constants', () => {
    it('should convert inches using standard relationship (1 inch = 6 picas)', () => {
      expect(convertToPicas(Units.Inches, 1)).toBeCloseTo(6, 1);
    });

    it('should convert points using standard relationship (1 pica = 12 points)', () => {
      expect(convertToPicas(Units.Points, 12)).toBeCloseTo(1, 1);
    });

    it('should convert pixels using PPI (96 pixels = 1 inch = 6 picas)', () => {
      expect(convertToPicas(Units.Pixels, PPI)).toBeCloseTo(6, 0);
    });
  });

  describe('proportionality', () => {
    it('should scale proportionally', () => {
      const value1 = convertToPicas(Units.Inches, 2);
      const value2 = convertToPicas(Units.Inches, 4);
      expect(value2).toBeCloseTo(value1 * 2, 1);
    });
  });

  describe('edge cases', () => {
    it('should return -1 for negative inputs', () => {
      expect(convertToPicas(Units.Inches, -1)).toBe(-1);
      expect(convertToPicas(Units.Pixels, -5)).toBe(-1);
    });

    it('should handle zero correctly', () => {
      expect(convertToPicas(Units.Inches, 0)).toBeGreaterThanOrEqual(0);
      expect(convertToPicas(Units.Picas, 0)).toBeGreaterThanOrEqual(0);
    });
  });

  describe('identity conversion', () => {
    it('should return the same value when converting picas to picas', () => {
      expect(convertToPicas(Units.Picas, 6)).toBeCloseTo(6, 1);
      expect(convertToPicas(Units.Picas, 12)).toBeCloseTo(12, 1);
    });
  });
});
