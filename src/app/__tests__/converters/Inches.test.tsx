import { Unit } from "@/units";
import { toInches } from "@/converters/Inches";
import { PPI } from "@/converters";

describe("toInches.convert function", () => {
  const t96 = 384 / PPI;

  it("should return -1 for input less than or equal to 0", () => {
    expect(toInches.convert(Unit.Bootstrap, -1)).toBe(-1);
    expect(toInches.convert(Unit.Centimetres, 0)).toBe(0);
  });

  it("should convert Bootstrap units correctly", () => {
    expect(toInches.convert(Unit.Bootstrap, 0)).toBe(0);
    expect(toInches.convert(Unit.Bootstrap, 1)).toBeCloseTo(0.04167);
    expect(toInches.convert(Unit.Bootstrap, 2)).toBeCloseTo(0.08334);
  });

  it("should convert Centimeters units correctly", () => {
    expect(toInches.convert(Unit.Centimetres, 1)).toBeCloseTo(0.39370078740157);
    expect(toInches.convert(Unit.Centimetres, 10.15999872)).toBeCloseTo(t96, 1);
  });

  it("should convert Ems units correctly", () => {
    expect(toInches.convert(Unit.Ems, 1)).toBeCloseTo(0.166044);
    expect(toInches.convert(Unit.Ems, 24)).toBeCloseTo(t96, 1);
  });

  it("should convert Inches units correctly", () => {
    expect(toInches.convert(Unit.Inches, 1)).toBeCloseTo(1);
    expect(toInches.convert(Unit.Inches, 3.999999496063)).toBeCloseTo(t96, 1);
  });

  it("should convert Feet units correctly", () => {
    expect(toInches.convert(Unit.Feet, 1)).toBeCloseTo(12);
    expect(toInches.convert(Unit.Feet, 0.33333329133858)).toBeCloseTo(t96, 1);
  });

  it("should convert Picas units correctly", () => {
    expect(toInches.convert(Unit.Picas, 1)).toBeCloseTo(0.16666666653543);
    expect(toInches.convert(Unit.Picas, 23.999996995276)).toBeCloseTo(t96, 1);
  });

  it("should convert Points units correctly", () => {
    expect(toInches.convert(Unit.Points, 1)).toBeCloseTo(0.013888897637795);
    expect(toInches.convert(Unit.Points, 287.99978229935)).toBeCloseTo(t96, 1);
  });

  it("should convert Tailwind units correctly", () => {
    expect(toInches.convert(Unit.Tailwind, 1)).toBeCloseTo(0.041666661417323);
    expect(toInches.convert(Unit.Tailwind, 96)).toBeCloseTo(t96, 1);
  });

  it("should convert Pixels units correctly", () => {
    expect(toInches.convert(Unit.Pixels, 1)).toBeCloseTo(0.010416665354331);
    expect(toInches.convert(Unit.Pixels, 384)).toBeCloseTo(t96, 1);
  });

  it("should convert Millimetres units correctly", () => {
    expect(toInches.convert(Unit.Millimetres, 1)).toBeCloseTo(
      0.039370078740157,
    );
    expect(toInches.convert(Unit.Millimetres, 101.5999872)).toBeCloseTo(t96, 1);
  });

  it("should return -1 for unknown units", () => {
    // @ts-ignore
    expect(toInches.convert(1000 as Unit, 10)).toBe(-1);
  });
});
