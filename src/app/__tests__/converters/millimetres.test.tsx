import { PPI, FONT_SIZE } from "@/converters";
import { toMillimetres } from "@/converters/millimetres";
import { Unit } from "@/units";

describe("toMillimetres.convert", () => {
  const t96 = 384 * 0.2645833;

  it("should return -1 for input less than or equal to 0", () => {
    expect(toMillimetres.convert(Unit.Bootstrap, -1)).toBe(-1);
    expect(toMillimetres.convert(Unit.Centimetres, 0)).toBeCloseTo(0);
  });

  it("should convert Bootstrap units correctly", () => {
    expect(toMillimetres.convert(Unit.Bootstrap, 0)).toBe(0);
    expect(toMillimetres.convert(Unit.Bootstrap, 1)).toBeCloseTo(1.0583332);
    expect(toMillimetres.convert(Unit.Bootstrap, 2)).toBeCloseTo(2.1166664);
  });

  it("should convert Centimetres correctly", () => {
    expect(toMillimetres.convert(Unit.Centimetres, 1)).toBeCloseTo(10);
    expect(toMillimetres.convert(Unit.Centimetres, 10.16)).toBeCloseTo(t96);
  });

  it("should convert Ems units correctly", () => {
    expect(toMillimetres.convert(Unit.Ems, 1)).toBeCloseTo(4.2175176, 1);
    expect(toMillimetres.convert(Unit.Ems, 24)).toBeCloseTo(t96, 1);
  });

  it("should convert Inches units correctly", () => {
    expect(toMillimetres.convert(Unit.Inches, 1)).toBeCloseTo(25.4);
    expect(toMillimetres.convert(Unit.Inches, 3.999999496063)).toBeCloseTo(t96, 1);
  });

  it("should convert Feet units correctly", () => {
    expect(toMillimetres.convert(Unit.Feet, 1)).toBeCloseTo(304.8);
    expect(toMillimetres.convert(Unit.Feet, 0.33333329133858)).toBeCloseTo(t96, 1);
  });

  it("should convert Picas units correctly", () => {
    expect(toMillimetres.convert(Unit.Picas, 1)).toBeCloseTo(4.23333333);
    expect(toMillimetres.convert(Unit.Picas, 23.999996995276)).toBeCloseTo(t96, 1);
  });

  it("should convert Points units correctly", () => {
    expect(toMillimetres.convert(Unit.Points, 1)).toBeCloseTo(0.352778);
    expect(toMillimetres.convert(Unit.Points, 287.99978229935)).toBeCloseTo(t96, 1);
  });

  it("should convert Tailwind units correctly", () => {
    expect(toMillimetres.convert(Unit.Tailwind, 1)).toBeCloseTo(1.0583332);
    expect(toMillimetres.convert(Unit.Tailwind, 96)).toBeCloseTo(t96, 1);
  });

  it("should convert Pixels units correctly", () => {
    expect(toMillimetres.convert(Unit.Pixels, 1)).toBeCloseTo(0.2645833);
    expect(toMillimetres.convert(Unit.Pixels, 384)).toBeCloseTo(t96, 1);
  });

  it("should convert Millimetres units correctly", () => {
    expect(toMillimetres.convert(Unit.Millimetres, 1)).toBeCloseTo(1);
    expect(toMillimetres.convert(Unit.Millimetres, 101.5999872)).toBeCloseTo(t96, 1);
  });

  it("should return -1 for unknown units", () => {
    // @ts-ignore
    expect(toMillimetres.convert(1000 as Unit, 10)).toBe(-1);
  });
});
