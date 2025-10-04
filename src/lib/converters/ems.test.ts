import { describe, it, expect } from 'vitest';
import { convertToEms } from '@/lib/converters/ems';
import { Units } from '@/lib/units';
import { FONT_SIZE } from '@/lib/constants';

describe('convertToEms', () => {
  describe('known constants', () => {
    it('should respect FONT_SIZE constant (1 em = 16 pixels)', () => {
      expect(convertToEms(Units.Pixels, FONT_SIZE)).toBe(1);
    });

    it('should treat ems and rems as equivalent', () => {
      expect(convertToEms(Units.Rems, 2)).toBe(2);
      expect(convertToEms(Units.Ems, 2)).toBe(2);
    });
  });

  describe('proportionality', () => {
    it('should scale proportionally', () => {
      const value1 = convertToEms(Units.Pixels, 32);
      const value2 = convertToEms(Units.Pixels, 64);
      expect(value2).toBe(value1 * 2);
    });
  });

  describe('edge cases', () => {
    it('should return -1 for negative inputs', () => {
      expect(convertToEms(Units.Pixels, -1)).toBe(-1);
      expect(convertToEms(Units.Ems, -5)).toBe(-1);
    });

    it('should handle zero correctly', () => {
      expect(convertToEms(Units.Pixels, 0)).toBe(0);
      expect(convertToEms(Units.Ems, 0)).toBe(0);
    });
  });

  describe('identity conversion', () => {
    it('should return the same value when converting ems to ems', () => {
      expect(convertToEms(Units.Ems, 2.5)).toBe(2.5);
      expect(convertToEms(Units.Ems, 10)).toBe(10);
    });
  });
});
