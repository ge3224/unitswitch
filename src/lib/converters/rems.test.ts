import { describe, it, expect } from 'vitest';
import { convertToRems } from '@/lib/converters/rems';
import { Units } from '@/lib/units';
import { PPI, FONT_SIZE } from '@/lib/constants';

describe('convertToRems', () => {
  describe('known constants', () => {
    it('should respect FONT_SIZE constant (1 rem = 16 pixels)', () => {
      expect(convertToRems(Units.Pixels, FONT_SIZE)).toBe(1);
    });

    it('should treat ems and rems as equivalent', () => {
      expect(convertToRems(Units.Ems, 2)).toBe(2);
      expect(convertToRems(Units.Rems, 2)).toBe(2);
    });

    it('should convert inches using PPI and FONT_SIZE', () => {
      // 1 inch = 96px = 6 rems (96/16)
      expect(convertToRems(Units.Inches, 1)).toBeCloseTo(PPI / FONT_SIZE, 1);
    });

    it('should convert points using standard relationship (72 points = 1 inch)', () => {
      // 72 points = 1 inch = 96px = 6 rems
      expect(convertToRems(Units.Points, 72)).toBeCloseTo(PPI / FONT_SIZE, 1);
    });
  });

  describe('proportionality', () => {
    it('should scale proportionally', () => {
      const value1 = convertToRems(Units.Pixels, 32);
      const value2 = convertToRems(Units.Pixels, 64);
      expect(value2).toBe(value1 * 2);
    });
  });

  describe('discrete units', () => {
    it('should handle Bootstrap spacing scale', () => {
      expect(convertToRems(Units.Bootstrap, 0)).toBe(0);
      expect(convertToRems(Units.Bootstrap, 1)).toBe(0.25);
      expect(convertToRems(Units.Bootstrap, 2)).toBe(0.5);
      expect(convertToRems(Units.Bootstrap, 3)).toBe(1);
      expect(convertToRems(Units.Bootstrap, 4)).toBe(1.5);
      expect(convertToRems(Units.Bootstrap, 5)).toBe(3);
    });

    it('should return -1 for out-of-range Bootstrap values', () => {
      expect(convertToRems(Units.Bootstrap, 6)).toBe(-1);
    });
  });

  describe('edge cases', () => {
    it('should return -1 for negative inputs', () => {
      expect(convertToRems(Units.Pixels, -1)).toBe(-1);
      expect(convertToRems(Units.Rems, -5)).toBe(-1);
    });

    it('should handle zero correctly', () => {
      expect(convertToRems(Units.Pixels, 0)).toBe(0);
      expect(convertToRems(Units.Rems, 0)).toBe(0);
    });
  });

  describe('identity conversion', () => {
    it('should return the same value when converting rems to rems', () => {
      expect(convertToRems(Units.Rems, 2.5)).toBe(2.5);
      expect(convertToRems(Units.Rems, 10)).toBe(10);
    });
  });
});
