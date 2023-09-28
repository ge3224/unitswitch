import { PPI } from "@/converters";
import { toEms } from "@/converters/Ems";
import { Unit } from "@/units";

describe("toEms Converter", () => {
  const t96 = (384 * 6) / PPI;

  it("should return -1 for input less than or equal to 0", () => {
    expect(toEms.convert(Unit.Bootstrap, -1)).toBe(-1);
    expect(toEms.convert(Unit.Centimetres, 0)).toBe(0);
  });

  it("should convert Bootstrap units correctly", () => {
    expect(toEms.convert(Unit.Bootstrap, 0)).toBe(0);
    expect(toEms.convert(Unit.Bootstrap, 1)).toBeCloseTo(0.25);
    expect(toEms.convert(Unit.Bootstrap, 2)).toBeCloseTo(0.5);
  });

  it("should convert Centimeters units correctly", () => {
    expect(toEms.convert(Unit.Centimetres, 1)).toBeCloseTo(2.3622050220101);
    expect(toEms.convert(Unit.Centimetres, 10.15999872)).toBeCloseTo(t96, 1);
  });

  it("should convert Ems units correctly", () => {
    expect(toEms.convert(Unit.Ems, 1)).toBeCloseTo(1);
    expect(toEms.convert(Unit.Ems, 24)).toBeCloseTo(t96, 1);
  });

  it("should convert Inches units correctly", () => {
    expect(toEms.convert(Unit.Inches, 1)).toBeCloseTo(6.0000007559056);
    expect(toEms.convert(Unit.Inches, 3.999999496063)).toBeCloseTo(t96, 1);
  });

  it("should convert Feet units correctly", () => {
    expect(toEms.convert(Unit.Feet, 1)).toBeCloseTo(72.000009070867);
    expect(toEms.convert(Unit.Feet, 0.33333329133858)).toBeCloseTo(t96, 1);
  });

  it("should convert Picas units correctly", () => {
    expect(toEms.convert(Unit.Picas, 1)).toBeCloseTo(1.0000001251969);
    expect(toEms.convert(Unit.Picas, 23.999996995276)).toBeCloseTo(t96, 1);
  });

  it("should convert Points units correctly", () => {
    expect(toEms.convert(Unit.Points, 1)).toBeCloseTo(0.083333396325467);
    expect(toEms.convert(Unit.Points, 287.99978229935)).toBeCloseTo(t96, 1);
  });

  it("should convert Tailwind units correctly", () => {
    expect(toEms.convert(Unit.Tailwind, 1)).toBeCloseTo(0.25);
    expect(toEms.convert(Unit.Tailwind, 96)).toBeCloseTo(t96, 1);
  });

  it("should convert Pixels units correctly", () => {
    expect(toEms.convert(Unit.Pixels, 1)).toBeCloseTo(0.0627343677238);
    expect(toEms.convert(Unit.Pixels, 384)).toBeCloseTo(t96, 1);
  });

  it("should convert Millimetres units correctly", () => {
    expect(toEms.convert(Unit.Millimetres, 1)).toBeCloseTo(0.23622050220101);
    expect(toEms.convert(Unit.Millimetres, 101.5999872)).toBeCloseTo(t96, 1);
  });

  it("should return -1 for unknown units", () => {
    // @ts-ignore
    expect(toEms.convert(1000 as Unit, 10)).toBe(-1);
  });
});
