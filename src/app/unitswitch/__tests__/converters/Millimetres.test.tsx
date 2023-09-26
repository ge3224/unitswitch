import { toMillimetres } from "@/converters/Millimetres";
import { Unit } from "@/units";

describe("from pixels", () => {
  it("should calculate valid input", () => {
    expect(toMillimetres.convert(Unit.Pixels, 1)).toBeCloseTo(0.2645833);
    expect(toMillimetres.convert(Unit.Pixels, 4)).toBeCloseTo(1.0583332);
    expect(toMillimetres.convert(Unit.Pixels, 192)).toBeCloseTo(50.7999936);
    expect(toMillimetres.convert(Unit.Pixels, 384)).toBeCloseTo(101.5999872);
  });

  it("should not calculate invalid input", () => {
    expect(toMillimetres.convert(Unit.Pixels, -1)).toBe(-1);
  });
});

describe("from centimeters", () => {
  it("should calculate valid input", () => {
    expect(toMillimetres.convert(Unit.Centimetres, 1)).toBeCloseTo(10);
    expect(toMillimetres.convert(Unit.Centimetres, 4)).toBeCloseTo(40);
    expect(toMillimetres.convert(Unit.Centimetres, 192)).toBeCloseTo(1920);
    expect(toMillimetres.convert(Unit.Centimetres, 384)).toBeCloseTo(3840);
  });

  it("should not calculate invalid input", () => {
    expect(toMillimetres.convert(Unit.Centimetres, -1)).toBe(-1);
  });
});

describe("from feet", () => {
  it("should calculate valid input", () => {
    expect(toMillimetres.convert(Unit.Feet, 1)).toBeCloseTo(304.8);
    expect(toMillimetres.convert(Unit.Feet, 4)).toBeCloseTo(1219.2);
    expect(toMillimetres.convert(Unit.Feet, 192)).toBeCloseTo(58521.6);
    expect(toMillimetres.convert(Unit.Feet, 384)).toBeCloseTo(117043.2);
  });

  it("should not calculate invalid input", () => {
    expect(toMillimetres.convert(Unit.Feet, -1)).toBe(-1);
  });
});

describe("from inches", () => {
  it("should calculate valid input", () => {
    expect(toMillimetres.convert(Unit.Inches, 1)).toBeCloseTo(25.4);
    expect(toMillimetres.convert(Unit.Inches, 4)).toBeCloseTo(101.6);
    expect(toMillimetres.convert(Unit.Inches, 192)).toBeCloseTo(4876.8);
    expect(toMillimetres.convert(Unit.Inches, 384)).toBeCloseTo(9753.6);
  });

  it("should not calculate invalid input", () => {
    expect(toMillimetres.convert(Unit.Inches, -1)).toBe(-1);
  });
});
