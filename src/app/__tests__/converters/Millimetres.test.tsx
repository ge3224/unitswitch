import { DPI, FONT_SIZE } from "@/converters";
import { toMillimetres } from "@/converters/Millimetres";
import { Unit } from "@/units";

describe("toMillimetres.convert", () => {
  it("should convert Bootstrap units correctly", () => {
    expect(toMillimetres.convert(Unit.Bootstrap, 2)).toBeCloseTo(0.21166664, 3);
    expect(toMillimetres.convert(Unit.Bootstrap, 7)).toBe(-1);
    expect(toMillimetres.convert(Unit.Bootstrap, -1)).toBe(-1);
  });

  it("should convert Centimetres correctly", () => {
    expect(toMillimetres.convert(Unit.Centimetres, 1)).toBeCloseTo(10);
    expect(toMillimetres.convert(Unit.Centimetres, 10.16)).toBeCloseTo(101.6);
  });

  it("should convert Feet correctly", () => {
    expect(toMillimetres.convert(Unit.Feet, 1)).toBeCloseTo(304.8);
    expect(toMillimetres.convert(Unit.Feet, 0.33333329133858)).toBeCloseTo(
      101.6,
    );
  });

  it("should convert Inches correctly", () => {
    expect(toMillimetres.convert(Unit.Inches, 1)).toBeCloseTo(25.4);
    expect(toMillimetres.convert(Unit.Inches, 3.999999496063)).toBeCloseTo(
      101.6,
    );
  });

  it("should handle Rems correctly", () => {
    const expectedValue = ((3 * FONT_SIZE) / DPI) * 25.4;
    expect(toMillimetres.convert(Unit.Rems, 3)).toBeCloseTo(expectedValue, 3);
  });

  it("should convert Ems correctly", () => {
    const expectedValue = ((2 * FONT_SIZE) / DPI) * 25.4;
    expect(toMillimetres.convert(Unit.Ems, 2)).toBeCloseTo(expectedValue, 3);
  });

  it("should return -1 for unsupported units", () => {
    // @ts-ignore
    expect(toMillimetres.convert(Unit.UnknownUnit, 10)).toBe(-1);
  });

  it("should return -1 for negative input values", () => {
    expect(toMillimetres.convert(Unit.Millimetres, -5)).toBe(-1);
  });

  it("should round to the specified number of decimal places", () => {
    expect(toMillimetres.convert(Unit.Centimetres, 1.23456789)).toBeCloseTo(
      12.346,
      3,
    );
    expect(toMillimetres.convert(Unit.Inches, 2.71828)).toBeCloseTo(69.052, 1);
  });

  it('should handle Tailwind units correctly', () => {
    expect(toMillimetres.convert(Unit.Tailwind, 1)).toBeCloseTo(1.058333);
    expect(toMillimetres.convert(Unit.Tailwind, 96)).toBeCloseTo(101.6);
  });
});
