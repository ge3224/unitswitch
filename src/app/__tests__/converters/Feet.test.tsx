import { Unit } from "@/units";
import { toFeet } from "@/converters/Feet";
import { DPI } from "@/converters";

describe("toFeet.convert function", () => {
  const t96 = 384 / DPI / 12;
  it("should return -1 for input less than or equal to 0", () => {
    expect(toFeet.convert(Unit.Bootstrap, -1)).toBe(-1);
    expect(toFeet.convert(Unit.Centimetres, 0)).toBe(0);
  });

  it("should convert Bootstrap units correctly", () => {
    expect(toFeet.convert(Unit.Bootstrap, 0)).toBe(0);
    expect(toFeet.convert(Unit.Bootstrap, 1)).toBeCloseTo(0.0034722217847769);
    expect(toFeet.convert(Unit.Bootstrap, 2)).toBeCloseTo(0.0069444435695538);
  });

  it("should convert Centimeters units correctly", () => {
    expect(toFeet.convert(Unit.Centimetres, 1)).toBeCloseTo(0.032808398950131);
    expect(toFeet.convert(Unit.Centimetres, 10.15999872)).toBeCloseTo(t96, 1);
  });

  it("should convert Ems units correctly", () => {
    expect(toFeet.convert(Unit.Ems, 1)).toBeCloseTo(0.013837);
    expect(toFeet.convert(Unit.Ems, 24)).toBeCloseTo(t96, 1);
  });

  it("should convert Inches units correctly", () => {
    expect(toFeet.convert(Unit.Inches, 1)).toBeCloseTo(0.083333333333333);
    expect(toFeet.convert(Unit.Inches, 3.999999496063)).toBeCloseTo(t96, 1);
  });

  it("should convert Feet units correctly", () => {
    expect(toFeet.convert(Unit.Feet, 1)).toBeCloseTo(1);
    expect(toFeet.convert(Unit.Feet, 0.33333329133858)).toBeCloseTo(t96, 1);
  });

  it("should convert Picas units correctly", () => {
    expect(toFeet.convert(Unit.Picas, 1)).toBeCloseTo(0.013888888877953);
    expect(toFeet.convert(Unit.Picas, 23.999996995276)).toBeCloseTo(t96, 1);
  });

  it("should convert Points units correctly", () => {
    expect(toFeet.convert(Unit.Points, 1)).toBeCloseTo(0.0011574081364829);
    expect(toFeet.convert(Unit.Points, 287.99978229935)).toBeCloseTo(t96, 1);
  });

  it("should convert Tailwind units correctly", () => {
    expect(toFeet.convert(Unit.Tailwind, 1)).toBeCloseTo(0.0034722217847769);
    expect(toFeet.convert(Unit.Tailwind, 96)).toBeCloseTo(t96, 1);
  });

  it("should convert Pixels units correctly", () => {
    expect(toFeet.convert(Unit.Pixels, 1)).toBeCloseTo(0.00086805544619423);
    expect(toFeet.convert(Unit.Pixels, 384)).toBeCloseTo(t96, 1);
  });

  it("should convert Millimetres units correctly", () => {
    expect(toFeet.convert(Unit.Millimetres, 1)).toBeCloseTo(0.0032808398950131);
    expect(toFeet.convert(Unit.Millimetres, 101.5999872)).toBeCloseTo(t96, 1);
  });

  it("should return -1 for unknown units", () => {
    // @ts-ignore
    expect(toFeet.convert(1000 as Unit, 10)).toBe(-1);
  });
});
