import { toRems } from "@/converters/rems";
import { Unit } from "@/units";

describe("toRems Converter", () => {
  const t96 = 24;

  it('should return -1 for input less than or equal to 0', () => {
    expect(toRems.convert(Unit.Bootstrap, -1)).toBe(-1);
    expect(toRems.convert(Unit.Centimetres, 0)).toBe(0);
  });

  it('should convert Bootstrap units correctly', () => {
    expect(toRems.convert(Unit.Bootstrap, 0)).toBe(0);
    expect(toRems.convert(Unit.Bootstrap, 1)).toBeCloseTo(0.25);
    expect(toRems.convert(Unit.Bootstrap, 2)).toBeCloseTo(0.5);
  });

  it('should convert Centimeters units correctly', () => {
    expect(toRems.convert(Unit.Centimetres, 1)).toBeCloseTo(2.3622050220101);
    expect(toRems.convert(Unit.Centimetres, 10.15999872)).toBeCloseTo(t96, 1);
  });

  it('should convert Ems units correctly', () => {
    expect(toRems.convert(Unit.Ems, 1)).toBeCloseTo(0.99626412551359);
    expect(toRems.convert(Unit.Ems, 24)).toBeCloseTo(t96, 1);
  });

  it('should convert Inches units correctly', () => {
    expect(toRems.convert(Unit.Inches, 1)).toBeCloseTo(6.0000007559056);
    expect(toRems.convert(Unit.Inches, 3.999999496063)).toBeCloseTo(t96, 1);
  });

  it('should convert Feet units correctly', () => {
    expect(toRems.convert(Unit.Feet, 1)).toBeCloseTo(72.000009070867);
    expect(toRems.convert(Unit.Feet, 0.33333329133858)).toBeCloseTo(t96, 1);
  });

  it('should convert Picas units correctly', () => {
    expect(toRems.convert(Unit.Picas, 1)).toBeCloseTo(1.0000001251969);
    expect(toRems.convert(Unit.Picas, 23.999996995276)).toBeCloseTo(t96, 1);
  });

  it('should convert Points units correctly', () => {
    expect(toRems.convert(Unit.Points, 1)).toBeCloseTo(0.083333396325467);
    expect(toRems.convert(Unit.Points, 287.99978229935)).toBeCloseTo(t96, 1);
  });

  it('should convert Tailwind units correctly', () => {
    expect(toRems.convert(Unit.Tailwind, 1)).toBeCloseTo(0.25);
    expect(toRems.convert(Unit.Tailwind, 96)).toBeCloseTo(t96, 1);
  });

  it('should convert Pixels units correctly', () => {
    expect(toRems.convert(Unit.Pixels, 1)).toBeCloseTo(0.0625);
    expect(toRems.convert(Unit.Pixels, 384)).toBeCloseTo(t96, 1);
  });

  it('should convert Millimetres units correctly', () => {
    expect(toRems.convert(Unit.Millimetres, 1)).toBeCloseTo(0.23622050220101);
    expect(toRems.convert(Unit.Millimetres, 101.5999872)).toBeCloseTo(t96, 1);
  });

  it('should return -1 for unknown units', () => {
    // @ts-ignore
    expect(toRems.convert(1000 as Unit, 10)).toBe(-1);
  });
});
