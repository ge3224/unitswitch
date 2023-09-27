import { Unit } from '@/units';
import { toPoints } from "@/converters/Points";
import { DPI } from '@/converters';

describe('toPoints.convert function', () => {

  const t96 = 384 * (72 / DPI);

  it('should return -1 for input less than or equal to 0', () => {
    expect(toPoints.convert(Unit.Bootstrap, -1)).toBe(-1);
    expect(toPoints.convert(Unit.Centimetres, 0)).toBe(0);
  });

  it('should convert Bootstrap units correctly', () => {
    expect(toPoints.convert(Unit.Bootstrap, 0)).toBe(0);
    expect(toPoints.convert(Unit.Bootstrap, 1)).toBeCloseTo(5.333);
    expect(toPoints.convert(Unit.Bootstrap, 2)).toBeCloseTo(10.666);
  });

  it('should convert Centimeters units correctly', () => {
    expect(toPoints.convert(Unit.Centimetres, 1)).toBeCloseTo(28.346438836889);
    expect(toPoints.convert(Unit.Centimetres, 10.15999872)).toBeCloseTo(t96, 1);
  });

  it('should convert Ems units correctly', () => {
    expect(toPoints.convert(Unit.Ems, 1)).toBeCloseTo(11.95516046919, 1);
    expect(toPoints.convert(Unit.Ems, 24)).toBeCloseTo(t96, 1);
  });

  it('should convert Inches units correctly', () => {
    expect(toPoints.convert(Unit.Inches, 1)).toBeCloseTo(71.999954645698);
    expect(toPoints.convert(Unit.Inches, 3.999999496063)).toBeCloseTo(t96, 1);
  });

  it('should convert Feet units correctly', () => {
    expect(toPoints.convert(Unit.Feet, 1)).toBeCloseTo(863.99945574837);
    expect(toPoints.convert(Unit.Feet, 0.33333329133858)).toBeCloseTo(t96, 1);
  });

  it('should convert Picas units correctly', () => {
    expect(toPoints.convert(Unit.Picas, 1)).toBeCloseTo(11.999992431501);
    expect(toPoints.convert(Unit.Picas, 23.999996995276)).toBeCloseTo(t96, 1);
  });

  it('should convert Points units correctly', () => {
    expect(toPoints.convert(Unit.Points, 1)).toBeCloseTo(1);
    expect(toPoints.convert(Unit.Points, 287.99978229935)).toBeCloseTo(t96, 1);
  });

  it('should convert Tailwind units correctly', () => {
    expect(toPoints.convert(Unit.Tailwind, 1)).toBeCloseTo(2.9999977322849);
    expect(toPoints.convert(Unit.Tailwind, 96)).toBeCloseTo(t96, 1);
  });

  it('should convert Pixels units correctly', () => {
    expect(toPoints.convert(Unit.Pixels, 1)).toBeCloseTo(0.74999943307122);
    expect(toPoints.convert(Unit.Pixels, 384)).toBeCloseTo(t96, 1);
  });

  it('should convert Millimetres units correctly', () => {
    expect(toPoints.convert(Unit.Millimetres, 1)).toBeCloseTo(2.8346438836889);
    expect(toPoints.convert(Unit.Millimetres, 101.5999872)).toBeCloseTo(t96, 1);
  });

  it('should return -1 for unknown units', () => {
    // @ts-ignore
    expect(toPoints.convert(1000 as Unit, 10)).toBe(-1);
  });
});
