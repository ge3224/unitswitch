import { describe, it } from "jsr:@std/testing/bdd";
import { assertEquals } from "jsr:@std/assert";
import { convertToEms } from '@/lib/converters/ems.ts';
import { Units } from '@/lib/units.ts';
import { FONT_SIZE } from '@/lib/constants.ts';

describe('convertToEms', () => {
  describe('known constants', () => {
    it('should respect FONT_SIZE constant (1 em = 16 pixels)', () => {
      assertEquals(convertToEms(Units.Pixels, FONT_SIZE), 1);
    });

    it('should treat ems and rems as equivalent', () => {
      assertEquals(convertToEms(Units.Rems, 2), 2);
      assertEquals(convertToEms(Units.Ems, 2), 2);
    });
  });

  describe('proportionality', () => {
    it('should scale proportionally', () => {
      const value1 = convertToEms(Units.Pixels, 32);
      const value2 = convertToEms(Units.Pixels, 64);
      assertEquals(value2, value1 * 2);
    });
  });

  describe('edge cases', () => {
    it('should return -1 for negative inputs', () => {
      assertEquals(convertToEms(Units.Pixels, -1), -1);
      assertEquals(convertToEms(Units.Ems, -5), -1);
    });

    it('should handle zero correctly', () => {
      assertEquals(convertToEms(Units.Pixels, 0), 0);
      assertEquals(convertToEms(Units.Ems, 0), 0);
    });
  });

  describe('identity conversion', () => {
    it('should return the same value when converting ems to ems', () => {
      assertEquals(convertToEms(Units.Ems, 2.5), 2.5);
      assertEquals(convertToEms(Units.Ems, 10), 10);
    });
  });
});
