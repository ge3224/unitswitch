import { Unit } from "@/units";
import { toPicas } from "@/converters/Picas";
import { PPI } from "@/converters";

describe("toPicas.convert function", () => {
  const t96 = (384 * 6) / PPI;

  it("should return -1 for input less than or equal to 0", () => {
    expect(toPicas.convert(Unit.Bootstrap, -1)).toBe(-1);
    expect(toPicas.convert(Unit.Centimetres, 0)).toBe(0);
  });

  it("should convert Bootstrap units correctly", () => {
    expect(toPicas.convert(Unit.Bootstrap, 0)).toBe(0);
    expect(toPicas.convert(Unit.Bootstrap, 1)).toBeCloseTo(0.24999996870079);
    expect(toPicas.convert(Unit.Bootstrap, 2)).toBeCloseTo(0.49999993740157);
  });

  it("should convert Centimeters units correctly", () => {
    expect(toPicas.convert(Unit.Centimetres, 1)).toBeCloseTo(2.36220474);
    expect(toPicas.convert(Unit.Centimetres, 10.15999872)).toBeCloseTo(t96, 1);
  });

  it("should convert Ems units correctly", () => {
    expect(toPicas.convert(Unit.Ems, 1)).toBeCloseTo(0.99626400078446, 1);
    expect(toPicas.convert(Unit.Ems, 24)).toBeCloseTo(t96, 1);
  });

  it("should convert Inches units correctly", () => {
    expect(toPicas.convert(Unit.Inches, 1)).toBeCloseTo(6);
    expect(toPicas.convert(Unit.Inches, 3.999999496063)).toBeCloseTo(t96, 1);
  });

  it("should convert Feet units correctly", () => {
    expect(toPicas.convert(Unit.Feet, 1)).toBeCloseTo(72);
    expect(toPicas.convert(Unit.Feet, 0.33333329133858)).toBeCloseTo(t96, 1);
  });

  it("should convert Picas units correctly", () => {
    expect(toPicas.convert(Unit.Picas, 1)).toBeCloseTo(1);
    expect(toPicas.convert(Unit.Picas, 23.999996995276)).toBeCloseTo(t96, 1);
  });

  it("should convert Points units correctly", () => {
    expect(toPicas.convert(Unit.Points, 1)).toBeCloseTo(0.083333385892388);
    expect(toPicas.convert(Unit.Points, 287.99978229935)).toBeCloseTo(t96, 1);
  });

  it("should convert Tailwind units correctly", () => {
    expect(toPicas.convert(Unit.Tailwind, 1)).toBeCloseTo(0.24999996870079);
    expect(toPicas.convert(Unit.Tailwind, 96)).toBeCloseTo(t96, 1);
  });

  it("should convert Pixels units correctly", () => {
    expect(toPicas.convert(Unit.Pixels, 1)).toBeCloseTo(0.062499992175197);
    expect(toPicas.convert(Unit.Pixels, 384)).toBeCloseTo(t96, 1);
  });

  it("should convert Millimetres units correctly", () => {
    expect(toPicas.convert(Unit.Millimetres, 1)).toBeCloseTo(0.23622047262695);
    expect(toPicas.convert(Unit.Millimetres, 101.5999872)).toBeCloseTo(t96, 1);
  });

  it("should return -1 for unknown units", () => {
    // @ts-ignore
    expect(toPicas.convert(1000 as Unit, 10)).toBe(-1);
  });
});
