import { Unit } from '@/units';
import { toCentimetres } from "@/converters/Centimetres";

describe('toCentimetres.convert function', () => {
  const t96 = 10.16;

  it('should return -1 for input less than or equal to 0', () => {
    expect(toCentimetres.convert(Unit.Bootstrap, -1)).toBe(-1);
    expect(toCentimetres.convert(Unit.Centimetres, 0)).toBe(0);
  });

  it('should convert Bootstrap units correctly', () => {
    expect(toCentimetres.convert(Unit.Bootstrap, 0)).toBe(0);
    expect(toCentimetres.convert(Unit.Bootstrap, 1)).toBeCloseTo(0.041);
    expect(toCentimetres.convert(Unit.Bootstrap, 2)).toBeCloseTo(0.083);
  });

  it('should convert Centimeters units correctly', () => {
    expect(toCentimetres.convert(Unit.Centimetres, 1)).toBeCloseTo(1);
    expect(toCentimetres.convert(Unit.Centimetres, 10.16)).toBeCloseTo(t96, 1);
  });

  it('should convert Ems units correctly', () => {
    expect(toCentimetres.convert(Unit.Ems, 1)).toBeCloseTo(0.42175176, 1);
    expect(toCentimetres.convert(Unit.Ems, 24.089997205939)).toBeCloseTo(t96, 1);
  });

  it('should convert Inches units correctly', () => {
    expect(toCentimetres.convert(Unit.Inches, 1)).toBeCloseTo(2.54);
    expect(toCentimetres.convert(Unit.Inches, 3.999999496063)).toBeCloseTo(t96, 1);
  });

  it('should convert Feet units correctly', () => {
    expect(toCentimetres.convert(Unit.Feet, 1)).toBeCloseTo(30.48);
    expect(toCentimetres.convert(Unit.Feet, 0.33333329133858)).toBeCloseTo(t96, 1);
  });

  it('should convert Picas units correctly', () => {
    expect(toCentimetres.convert(Unit.Picas, 1)).toBeCloseTo(0.423333333);
    expect(toCentimetres.convert(Unit.Picas, 23.999996995276)).toBeCloseTo(t96, 1);
  });

  it('should convert Points units correctly', () => {
    expect(toCentimetres.convert(Unit.Points, 1)).toBeCloseTo(0.0352778);
    expect(toCentimetres.convert(Unit.Points, 287.99978229935)).toBeCloseTo(t96, 1);
  });

  it('should convert Tailwind units correctly', () => {
    expect(toCentimetres.convert(Unit.Tailwind, 1)).toBeCloseTo(0.1058);
    expect(toCentimetres.convert(Unit.Tailwind, 96)).toBeCloseTo(t96, 1);
  });

  it('should convert Pixels units correctly', () => {
    expect(toCentimetres.convert(Unit.Pixels, 1)).toBeCloseTo(0.02645833);
    expect(toCentimetres.convert(Unit.Pixels, 384)).toBeCloseTo(t96, 1);
  });

  it('should convert Millimetres units correctly', () => {
    expect(toCentimetres.convert(Unit.Millimetres, 1)).toBeCloseTo(0.1);
    expect(toCentimetres.convert(Unit.Millimetres, 101.5999872)).toBeCloseTo(t96, 1);
  });

  it('should return -1 for unknown units', () => {
    // @ts-ignore
    expect(toCentimetres.convert(1000 as Unit, 10)).toBe(-1);
  });
});
