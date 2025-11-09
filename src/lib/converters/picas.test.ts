import { describe, it } from "jsr:@std/testing/bdd";
import { assertEquals, assertAlmostEquals, assert } from "jsr:@std/assert";
import { convertToPicas } from '@/lib/converters/picas.ts';
import { Units } from '@/lib/units.ts';
import { PPI } from '@/lib/constants.ts';
import { ConversionErrorKind } from './result.ts';

describe('convertToPicas', () => {
  describe('known constants', () => {
    it('should convert inches using standard relationship (1 inch = 6 picas)', () => {
      const result = convertToPicas(Units.Inches, 1);
      assert(result.ok);
      assertAlmostEquals(result.value, 6, 0.1);
    });

    it('should convert points using standard relationship (1 pica = 12 points)', () => {
      const result = convertToPicas(Units.Points, 12);
      assert(result.ok);
      assertAlmostEquals(result.value, 1, 0.1);
    });

    it('should convert pixels using PPI (96 pixels = 1 inch = 6 picas)', () => {
      const result = convertToPicas(Units.Pixels, PPI);
      assert(result.ok);
      assertAlmostEquals(result.value, 6, 1);
    });
  });

  describe('proportionality', () => {
    it('should scale proportionally', () => {
      const result1 = convertToPicas(Units.Inches, 2);
      const result2 = convertToPicas(Units.Inches, 4);
      assert(result1.ok && result2.ok);
      assertAlmostEquals(result2.value, result1.value * 2, 0.1);
    });
  });

  describe('edge cases', () => {
    it('should return Err for negative inputs', () => {
      const result1 = convertToPicas(Units.Inches, -1);
      assert(!result1.ok);
      assertEquals(result1.error.kind, ConversionErrorKind.NegativeInput);

      const result2 = convertToPicas(Units.Pixels, -5);
      assert(!result2.ok);
      assertEquals(result2.error.kind, ConversionErrorKind.NegativeInput);
    });

    it('should handle zero correctly', () => {
      const result1 = convertToPicas(Units.Inches, 0);
      assert(result1.ok);
      assert(result1.value >= 0);

      const result2 = convertToPicas(Units.Picas, 0);
      assert(result2.ok);
      assert(result2.value >= 0);
    });
  });

  describe('identity conversion', () => {
    it('should return the same value when converting picas to picas', () => {
      const result1 = convertToPicas(Units.Picas, 6);
      assert(result1.ok);
      assertAlmostEquals(result1.value, 6, 0.1);

      const result2 = convertToPicas(Units.Picas, 12);
      assert(result2.ok);
      assertAlmostEquals(result2.value, 12, 0.1);
    });
  });
});
