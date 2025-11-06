import { describe, it } from "jsr:@std/testing/bdd";
import { assertEquals, assertAlmostEquals, assertGreaterOrEqual } from "jsr:@std/assert";
import { convertToPicas } from '@/lib/converters/picas.ts';
import { Units } from '@/lib/units.ts';
import { PPI } from '@/lib/constants.ts';

describe('convertToPicas', () => {
  describe('known constants', () => {
    it('should convert inches using standard relationship (1 inch = 6 picas)', () => {
      assertAlmostEquals(convertToPicas(Units.Inches, 1), 6, 0.1);
    });

    it('should convert points using standard relationship (1 pica = 12 points)', () => {
      assertAlmostEquals(convertToPicas(Units.Points, 12), 1, 0.1);
    });

    it('should convert pixels using PPI (96 pixels = 1 inch = 6 picas)', () => {
      assertAlmostEquals(convertToPicas(Units.Pixels, PPI), 6, 1);
    });
  });

  describe('proportionality', () => {
    it('should scale proportionally', () => {
      const value1 = convertToPicas(Units.Inches, 2);
      const value2 = convertToPicas(Units.Inches, 4);
      assertAlmostEquals(value2, value1 * 2, 0.1);
    });
  });

  describe('edge cases', () => {
    it('should return -1 for negative inputs', () => {
      assertEquals(convertToPicas(Units.Inches, -1), -1);
      assertEquals(convertToPicas(Units.Pixels, -5), -1);
    });

    it('should handle zero correctly', () => {
      assertGreaterOrEqual(convertToPicas(Units.Inches, 0), 0);
      assertGreaterOrEqual(convertToPicas(Units.Picas, 0), 0);
    });
  });

  describe('identity conversion', () => {
    it('should return the same value when converting picas to picas', () => {
      assertAlmostEquals(convertToPicas(Units.Picas, 6), 6, 0.1);
      assertAlmostEquals(convertToPicas(Units.Picas, 12), 12, 0.1);
    });
  });
});
