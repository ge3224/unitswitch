import { describe, it, expect } from 'vitest';
import { convertToPixels } from '@/lib/converters/pixels';
import { Units } from '@/lib/units';
import { PPI, FONT_SIZE } from '@/lib/constants';

describe('convertToPixels', () => {
  describe('known constants', () => {
    it('should respect PPI constant (96 pixels per inch)', () => {
      expect(convertToPixels(Units.Inches, 1)).toBe(PPI);
    });

    it('should respect FONT_SIZE constant (16 pixels per rem/em)', () => {
      expect(convertToPixels(Units.Rems, 1)).toBe(FONT_SIZE);
      expect(convertToPixels(Units.Ems, 1)).toBe(FONT_SIZE);
    });

    it('should convert feet using inch relationship (1 foot = 12 inches)', () => {
      expect(convertToPixels(Units.Feet, 1)).toBe(12 * PPI);
    });

    it('should convert points using standard relationship (72 points = 1 inch)', () => {
      expect(convertToPixels(Units.Points, 72)).toBeCloseTo(PPI, 0);
    });

    it('should convert picas using standard relationship (6 picas = 1 inch)', () => {
      expect(convertToPixels(Units.Picas, 6)).toBeCloseTo(PPI, 0);
    });

    it('should convert centimeters using inch relationship (1 inch = 2.54 cm)', () => {
      expect(convertToPixels(Units.Centimeters, 2.54)).toBeCloseTo(PPI, 0);
    });

    it('should convert millimeters using inch relationship (1 inch = 25.4 mm)', () => {
      expect(convertToPixels(Units.Millimeters, 25.4)).toBeCloseTo(PPI, 0);
    });
  });

  describe('proportionality', () => {
    it('should scale proportionally for rems', () => {
      const value1 = convertToPixels(Units.Rems, 2);
      const value2 = convertToPixels(Units.Rems, 4);
      expect(value2).toBe(value1 * 2);
    });

    it('should scale proportionally for inches', () => {
      const value1 = convertToPixels(Units.Inches, 3);
      const value2 = convertToPixels(Units.Inches, 6);
      expect(value2).toBe(value1 * 2);
    });
  });

  describe('edge cases', () => {
    it('should return -1 for negative inputs', () => {
      expect(convertToPixels(Units.Pixels, -1)).toBe(-1);
      expect(convertToPixels(Units.Rems, -5)).toBe(-1);
      expect(convertToPixels(Units.Inches, -10)).toBe(-1);
    });

    it('should handle zero correctly', () => {
      expect(convertToPixels(Units.Pixels, 0)).toBeGreaterThanOrEqual(0);
      expect(convertToPixels(Units.Rems, 0)).toBeGreaterThanOrEqual(0);
      expect(convertToPixels(Units.Bootstrap, 0)).toBe(0);
    });

    it('should return positive values for all valid positive inputs', () => {
      const units = [
        Units.Pixels, Units.Rems, Units.Ems, Units.Inches,
        Units.Centimeters, Units.Millimeters, Units.Points, Units.Picas
      ];
      units.forEach(unit => {
        expect(convertToPixels(unit, 10)).toBeGreaterThan(0);
      });
    });
  });

  describe('identity conversion', () => {
    it('should return the same value when converting pixels to pixels', () => {
      expect(convertToPixels(Units.Pixels, 100)).toBe(100);
      expect(convertToPixels(Units.Pixels, 42)).toBe(42);
    });
  });
});
