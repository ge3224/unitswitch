/**
 * Comprehensive edge case and boundary condition tests
 *
 * This file tests scenarios that go beyond normal usage:
 * - Extreme numerical values (NaN, Infinity, very large/small numbers)
 * - Invalid inputs and error conditions
 * - Boundary conditions
 * - Floating point precision edge cases
 */

import { describe, it } from "jsr:@std/testing/bdd";
import { assert, assertEquals, assertAlmostEquals } from "jsr:@std/assert";
import { convertToPixels } from "@/lib/converters/pixels.ts";
import { convertToRems } from "@/lib/converters/rems.ts";
import { convertToInches } from "@/lib/converters/inches.ts";
import { Units } from "@/lib/units.ts";
import { AppErrorKind } from "@/lib/result.ts";

describe("Converter Edge Cases", () => {
  describe("NaN handling", () => {
    it("should return Err for NaN input to pixels", () => {
      const result = convertToPixels(Units.Rems, NaN);
      assert(!result.ok);
      assertEquals(result.error.kind, AppErrorKind.InvalidInput);
    });

    it("should return Err for NaN input to rems", () => {
      const result = convertToRems(Units.Pixels, NaN);
      assert(!result.ok);
      assertEquals(result.error.kind, AppErrorKind.InvalidInput);
    });

    it("should return Err for NaN input to inches", () => {
      const result = convertToInches(Units.Pixels, NaN);
      assert(!result.ok);
      assertEquals(result.error.kind, AppErrorKind.InvalidInput);
    });
  });

  describe("Infinity handling", () => {
    it("should return Err for positive Infinity", () => {
      const result = convertToPixels(Units.Rems, Infinity);
      assert(!result.ok);
      assertEquals(result.error.kind, AppErrorKind.InvalidInput);
    });

    it("should return Err for negative Infinity", () => {
      const result = convertToPixels(Units.Rems, -Infinity);
      assert(!result.ok);
      // Could be InvalidInput or NegativeInput depending on check order
      assert(
        result.error.kind === AppErrorKind.InvalidInput ||
          result.error.kind === AppErrorKind.NegativeInput,
      );
    });

    it("should handle Infinity in all converters", () => {
      const result1 = convertToRems(Units.Pixels, Infinity);
      const result2 = convertToInches(Units.Pixels, Infinity);

      assert(!result1.ok);
      assert(!result2.ok);
    });
  });

  describe("Very large numbers", () => {
    it("should handle numbers near MAX_SAFE_INTEGER", () => {
      const largeNumber = Number.MAX_SAFE_INTEGER - 1;
      const result = convertToPixels(Units.Pixels, largeNumber);

      assert(result.ok);
      assertEquals(result.value, largeNumber);
    });

    it("should handle very large inch values", () => {
      const largeInches = 1000000; // 1 million inches
      const result = convertToPixels(Units.Inches, largeInches);

      assert(result.ok);
      assertEquals(result.value, largeInches * 96); // PPI = 96
    });

    it("should handle conversion that results in very large numbers", () => {
      const largeRems = 100000;
      const result = convertToPixels(Units.Rems, largeRems);

      assert(result.ok);
      assertEquals(result.value, largeRems * 16); // FONT_SIZE = 16
    });
  });

  describe("Very small numbers", () => {
    it("should round very small positive numbers", () => {
      const tiny = 0.0000001;
      const result = convertToPixels(Units.Pixels, tiny);

      assert(result.ok);
      // Very small numbers round to 0 (pixels must be integers)
      assertEquals(result.value, 0);
    });

    it("should handle floating point precision with rounding", () => {
      // Test case that might cause floating point errors
      const result = convertToPixels(Units.Rems, 0.1 + 0.2); // 0.30000000000000004

      assert(result.ok);
      // Should round (0.1 + 0.2) * 16 = 4.8... to 5
      assertEquals(result.value, 5);
    });

    it("should handle very small fractions", () => {
      const result = convertToRems(Units.Pixels, 0.001);

      assert(result.ok);
      assertAlmostEquals(result.value, 0.001 / 16, 0.000001);
    });
  });

  describe("Zero edge cases", () => {
    it("should handle zero in all converters", () => {
      const result1 = convertToPixels(Units.Rems, 0);
      const result2 = convertToRems(Units.Pixels, 0);
      const result3 = convertToInches(Units.Pixels, 0);

      assert(result1.ok && result1.value === 0);
      assert(result2.ok && result2.value === 0);
      assert(result3.ok && result3.value === 0);
    });

    it("should handle negative zero", () => {
      const result = convertToPixels(Units.Rems, -0);

      assert(result.ok);
      assertEquals(result.value, 0);
    });
  });

  describe("Negative value handling", () => {
    it("should reject all negative values consistently", () => {
      const negatives = [-1, -0.5, -100, -1000];

      negatives.forEach((neg) => {
        const result = convertToPixels(Units.Rems, neg);
        assert(!result.ok);
        assertEquals(result.error.kind, AppErrorKind.NegativeInput);
      });
    });

    it("should reject negative values in all converters", () => {
      const result1 = convertToPixels(Units.Rems, -1);
      const result2 = convertToRems(Units.Pixels, -1);
      const result3 = convertToInches(Units.Pixels, -1);

      assert(!result1.ok);
      assert(!result2.ok);
      assert(!result3.ok);
    });
  });

  describe("Unit conversion precision", () => {
    it("should maintain precision in round-trip conversions", () => {
      // Convert 16px -> rem -> px
      const pixels = 16;
      const toRems = convertToRems(Units.Pixels, pixels);
      assert(toRems.ok);

      const backToPixels = convertToPixels(Units.Rems, toRems.value);
      assert(backToPixels.ok);

      assertAlmostEquals(backToPixels.value, pixels, 0.001);
    });

    it("should handle metric to imperial round trips", () => {
      // Convert cm -> inches -> cm
      const cm = 10;
      const toInches = convertToInches(Units.Centimeters, cm);
      assert(toInches.ok);

      const toPx = convertToPixels(Units.Inches, toInches.value);
      assert(toPx.ok);

      const backToInches = convertToInches(Units.Pixels, toPx.value);
      assert(backToInches.ok);

      assertAlmostEquals(backToInches.value, toInches.value, 0.001);
    });
  });

  describe("Boundary transitions", () => {
    it("should handle conversion at the 1px boundary", () => {
      const result = convertToRems(Units.Pixels, 1);
      assert(result.ok);
      assertEquals(result.value, 1 / 16);
    });

    it("should handle conversion at the 1rem boundary", () => {
      const result = convertToPixels(Units.Rems, 1);
      assert(result.ok);
      assertEquals(result.value, 16);
    });

    it("should round fractional pixel values", () => {
      // Sub-pixel values get rounded (pixels must be integers)
      const result = convertToPixels(Units.Pixels, 0.5);
      assert(result.ok);
      // 0.5 rounds to 1 (Math.round behavior)
      assertEquals(result.value, 1);
    });
  });

  describe("Unusual but valid inputs", () => {
    it("should round extremely long decimal representations", () => {
      const longDecimal = 1.123456789012345;
      const result = convertToPixels(Units.Rems, longDecimal);

      assert(result.ok);
      // 1.123... * 16 ≈ 17.97... rounds to 18
      assertEquals(result.value, 18);
    });

    it("should handle scientific notation", () => {
      const scientific = 1e3; // 1000
      const result = convertToPixels(Units.Rems, scientific);

      assert(result.ok);
      assertEquals(result.value, 16000);
    });

    it("should round very small scientific notation to zero", () => {
      const tiny = 1e-6; // 0.000001
      const result = convertToPixels(Units.Pixels, tiny);

      assert(result.ok);
      // Very small values round to 0
      assertEquals(result.value, 0);
    });
  });

  describe("Conversion consistency", () => {
    it("should produce consistent results for same input", () => {
      const input = 42;
      const result1 = convertToPixels(Units.Rems, input);
      const result2 = convertToPixels(Units.Rems, input);

      assert(result1.ok && result2.ok);
      assertEquals(result1.value, result2.value);
    });

    it("should be commutative for identity conversions", () => {
      const pixels = 100;
      const result = convertToPixels(Units.Pixels, pixels);

      assert(result.ok);
      assertEquals(result.value, pixels);
    });
  });

  describe("Error message quality", () => {
    it("should provide helpful error message for NaN", () => {
      const result = convertToPixels(Units.Rems, NaN);
      assert(!result.ok);
      assert(result.error.message.includes("finite"));
    });

    it("should provide helpful error message for negative values", () => {
      const result = convertToPixels(Units.Rems, -10);
      assert(!result.ok);
      assert(result.error.message.includes("negative"));
    });

    it("should include context in error properties", () => {
      const result = convertToPixels(Units.Rems, -5);
      assert(!result.ok);
      // Error should have input value in its properties
      assertEquals(result.error.input, -5);
    });
  });
});

describe("Numerical Stability", () => {
  describe("Floating point operations", () => {
    it("should handle 0.1 + 0.2 edge case with rounding", () => {
      const floatQuirk = 0.1 + 0.2; // 0.30000000000000004
      const result = convertToPixels(Units.Rems, floatQuirk);

      assert(result.ok);
      // 0.3 * 16 = 4.8, rounds to 5
      assertEquals(result.value, 5);
    });

    it("should handle repeated division and multiplication", () => {
      let value = 100;

      // Divide by 16 (px to rem)
      const rem = convertToRems(Units.Pixels, value);
      assert(rem.ok);

      // Multiply by 16 (rem to px)
      const px = convertToPixels(Units.Rems, rem.value);
      assert(px.ok);

      // Should get back close to original value
      assertAlmostEquals(px.value, value, 0.001);
    });

    it("should handle accumulation of small errors", () => {
      // Multiple conversions might accumulate floating point errors
      let current = 1;

      for (let i = 0; i < 10; i++) {
        const toRem = convertToRems(Units.Pixels, current);
        assert(toRem.ok);

        const toPx = convertToPixels(Units.Rems, toRem.value);
        assert(toPx.ok);

        current = toPx.value;
      }

      // Should still be close to 1 after 10 round trips
      assertAlmostEquals(current, 1, 0.001);
    });
  });
});
