import { describe, it } from "jsr:@std/testing/bdd";
import { assertEquals, assertStringIncludes } from "jsr:@std/assert";
import {
  validateViewportWidth,
  validateViewportHeight,
  validateFontSize,
  validatePpi,
  validateChToEmRatio,
  validateExToEmRatio,
  validateConversionInput,
} from "@/lib/validation.ts";
import { AppErrorKind } from "@/lib/result.ts";

describe("validateViewportWidth", () => {
  it("should accept valid viewport widths", () => {
    assertEquals(validateViewportWidth(1920).ok, true);
    assertEquals(validateViewportWidth(1).ok, true);
    assertEquals(validateViewportWidth(7680).ok, true);
    assertEquals(validateViewportWidth(3840).ok, true);
  });

  it("should reject NaN", () => {
    const result = validateViewportWidth(NaN);
    assertEquals(result.ok, false);
    if (!result.ok) {
      assertEquals(result.error.kind, AppErrorKind.InvalidInput);
      assertStringIncludes(result.error.message, "Must be a number");
    }
  });

  it("should reject non-integers", () => {
    const result = validateViewportWidth(1920.5);
    assertEquals(result.ok, false);
    if (!result.ok) {
      assertEquals(result.error.kind, AppErrorKind.InvalidInput);
      assertStringIncludes(result.error.message, "Must be a whole number");
    }
  });

  it("should reject zero", () => {
    const result = validateViewportWidth(0);
    assertEquals(result.ok, false);
    if (!result.ok) {
      assertEquals(result.error.kind, AppErrorKind.InvalidInput);
      assertStringIncludes(result.error.message, "Must be greater than 0");
    }
  });

  it("should reject negative values", () => {
    const result = validateViewportWidth(-100);
    assertEquals(result.ok, false);
    if (!result.ok) {
      assertEquals(result.error.kind, AppErrorKind.InvalidInput);
      assertStringIncludes(result.error.message, "Must be greater than 0");
    }
  });

  it("should reject values above maximum", () => {
    const result = validateViewportWidth(10000);
    assertEquals(result.ok, false);
    if (!result.ok) {
      assertEquals(result.error.kind, AppErrorKind.InvalidInput);
      assertStringIncludes(result.error.message, "Exceeds maximum");
    }
  });
});

describe("validateViewportHeight", () => {
  it("should accept valid viewport heights", () => {
    assertEquals(validateViewportHeight(1080).ok, true);
    assertEquals(validateViewportHeight(1).ok, true);
    assertEquals(validateViewportHeight(4320).ok, true);
    assertEquals(validateViewportHeight(2160).ok, true);
  });

  it("should reject NaN", () => {
    const result = validateViewportHeight(NaN);
    assertEquals(result.ok, false);
    if (!result.ok) {
      assertEquals(result.error.kind, AppErrorKind.InvalidInput);
      assertStringIncludes(result.error.message, "Must be a number");
    }
  });

  it("should reject non-integers", () => {
    const result = validateViewportHeight(1080.7);
    assertEquals(result.ok, false);
    if (!result.ok) {
      assertEquals(result.error.kind, AppErrorKind.InvalidInput);
      assertStringIncludes(result.error.message, "Must be a whole number");
    }
  });

  it("should reject zero and negative values", () => {
    assertEquals(validateViewportHeight(0).ok, false);
    assertEquals(validateViewportHeight(-50).ok, false);
  });

  it("should reject values above maximum", () => {
    const result = validateViewportHeight(5000);
    assertEquals(result.ok, false);
    if (!result.ok) {
      assertEquals(result.error.kind, AppErrorKind.InvalidInput);
      assertStringIncludes(result.error.message, "Exceeds maximum");
    }
  });
});

describe("validateFontSize", () => {
  it("should accept valid font sizes", () => {
    assertEquals(validateFontSize(16).ok, true);
    assertEquals(validateFontSize(1).ok, true);
    assertEquals(validateFontSize(500).ok, true);
    assertEquals(validateFontSize(14.5).ok, true); // Decimals allowed
    assertEquals(validateFontSize(16.25).ok, true);
  });

  it("should reject NaN", () => {
    const result = validateFontSize(NaN);
    assertEquals(result.ok, false);
    if (!result.ok) {
      assertEquals(result.error.kind, AppErrorKind.InvalidInput);
      assertStringIncludes(result.error.message, "Must be a number");
    }
  });

  it("should reject zero and negative values", () => {
    assertEquals(validateFontSize(0).ok, false);
    assertEquals(validateFontSize(-10).ok, false);
  });

  it("should reject values above maximum", () => {
    const result = validateFontSize(600);
    assertEquals(result.ok, false);
    if (!result.ok) {
      assertEquals(result.error.kind, AppErrorKind.InvalidInput);
      assertStringIncludes(result.error.message, "Exceeds maximum");
    }
  });
});

describe("validatePpi", () => {
  it("should accept valid PPI values", () => {
    assertEquals(validatePpi(96).ok, true);
    assertEquals(validatePpi(1).ok, true);
    assertEquals(validatePpi(800).ok, true);
    assertEquals(validatePpi(220).ok, true);
  });

  it("should reject NaN", () => {
    const result = validatePpi(NaN);
    assertEquals(result.ok, false);
    if (!result.ok) {
      assertEquals(result.error.kind, AppErrorKind.InvalidInput);
      assertStringIncludes(result.error.message, "Must be a number");
    }
  });

  it("should reject non-integers", () => {
    const result = validatePpi(96.5);
    assertEquals(result.ok, false);
    if (!result.ok) {
      assertEquals(result.error.kind, AppErrorKind.InvalidInput);
      assertStringIncludes(result.error.message, "Must be a whole number");
    }
  });

  it("should reject zero and negative values", () => {
    assertEquals(validatePpi(0).ok, false);
    assertEquals(validatePpi(-96).ok, false);
  });

  it("should reject values above maximum", () => {
    const result = validatePpi(1000);
    assertEquals(result.ok, false);
    if (!result.ok) {
      assertEquals(result.error.kind, AppErrorKind.InvalidInput);
      assertStringIncludes(result.error.message, "Exceeds maximum");
    }
  });
});

describe("validateChToEmRatio", () => {
  it("should accept valid ratios", () => {
    assertEquals(validateChToEmRatio(0.5).ok, true);
    assertEquals(validateChToEmRatio(0.01).ok, true);
    assertEquals(validateChToEmRatio(1).ok, true);
    assertEquals(validateChToEmRatio(0.625).ok, true);
  });

  it("should reject NaN", () => {
    const result = validateChToEmRatio(NaN);
    assertEquals(result.ok, false);
    if (!result.ok) {
      assertEquals(result.error.kind, AppErrorKind.InvalidInput);
      assertStringIncludes(result.error.message, "Must be a number");
    }
  });

  it("should reject values below minimum", () => {
    const result = validateChToEmRatio(0.005);
    assertEquals(result.ok, false);
    if (!result.ok) {
      assertEquals(result.error.kind, AppErrorKind.InvalidInput);
      assertStringIncludes(result.error.message, "Must be at least 0.01");
    }
  });

  it("should reject zero and negative values", () => {
    assertEquals(validateChToEmRatio(0).ok, false);
    assertEquals(validateChToEmRatio(-0.5).ok, false);
  });

  it("should reject values above maximum", () => {
    const result = validateChToEmRatio(1.5);
    assertEquals(result.ok, false);
    if (!result.ok) {
      assertEquals(result.error.kind, AppErrorKind.InvalidInput);
      assertStringIncludes(result.error.message, "Exceeds maximum");
    }
  });
});

describe("validateExToEmRatio", () => {
  it("should accept valid ratios", () => {
    assertEquals(validateExToEmRatio(0.5).ok, true);
    assertEquals(validateExToEmRatio(0.01).ok, true);
    assertEquals(validateExToEmRatio(1).ok, true);
    assertEquals(validateExToEmRatio(0.45).ok, true);
  });

  it("should reject NaN", () => {
    const result = validateExToEmRatio(NaN);
    assertEquals(result.ok, false);
    if (!result.ok) {
      assertEquals(result.error.kind, AppErrorKind.InvalidInput);
      assertStringIncludes(result.error.message, "Must be a number");
    }
  });

  it("should reject values below minimum", () => {
    const result = validateExToEmRatio(0.005);
    assertEquals(result.ok, false);
    if (!result.ok) {
      assertEquals(result.error.kind, AppErrorKind.InvalidInput);
      assertStringIncludes(result.error.message, "Must be at least 0.01");
    }
  });

  it("should reject zero and negative values", () => {
    assertEquals(validateExToEmRatio(0).ok, false);
    assertEquals(validateExToEmRatio(-0.5).ok, false);
  });

  it("should reject values above maximum", () => {
    const result = validateExToEmRatio(2);
    assertEquals(result.ok, false);
    if (!result.ok) {
      assertEquals(result.error.kind, AppErrorKind.InvalidInput);
      assertStringIncludes(result.error.message, "Exceeds maximum");
    }
  });
});

describe("validateConversionInput", () => {
  it("should accept valid positive numbers", () => {
    assertEquals(validateConversionInput(10).ok, true);
    assertEquals(validateConversionInput(0.5).ok, true);
    assertEquals(validateConversionInput(1000).ok, true);
    assertEquals(validateConversionInput(999999999).ok, true);
  });

  it("should reject NaN", () => {
    const result = validateConversionInput(NaN);
    assertEquals(result.ok, false);
    if (!result.ok) {
      assertEquals(result.error.kind, AppErrorKind.InvalidInput);
      assertStringIncludes(result.error.message, "Must be a valid number");
    }
  });

  it("should reject Infinity", () => {
    const result = validateConversionInput(Infinity);
    assertEquals(result.ok, false);
    if (!result.ok) {
      assertEquals(result.error.kind, AppErrorKind.InvalidInput);
      assertStringIncludes(result.error.message, "Cannot be infinity");
    }
  });

  it("should reject negative Infinity", () => {
    const result = validateConversionInput(-Infinity);
    assertEquals(result.ok, false);
    if (!result.ok) {
      assertEquals(result.error.kind, AppErrorKind.InvalidInput);
    }
  });

  it("should reject negative values", () => {
    const result = validateConversionInput(-10);
    assertEquals(result.ok, false);
    if (!result.ok) {
      assertEquals(result.error.kind, AppErrorKind.InvalidInput);
      assertStringIncludes(result.error.message, "Cannot be negative");
    }
  });

  it("should accept zero", () => {
    const result = validateConversionInput(0);
    assertEquals(result.ok, true);
  });

  it("should reject extremely large values", () => {
    const result = validateConversionInput(2000000000);
    assertEquals(result.ok, false);
    if (!result.ok) {
      assertEquals(result.error.kind, AppErrorKind.InvalidInput);
      assertStringIncludes(result.error.message, "Value too large");
    }
  });

  it("should accept values at the boundary (1 billion)", () => {
    const result = validateConversionInput(1000000000);
    assertEquals(result.ok, true);
  });
});
