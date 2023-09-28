import { toPixels } from '@/converters/Pixels';
import { Unit } from '@/units';

describe('toPixels', () => {
  const t96 = 384;

  it('should convert Bootstrap units correctly', () => {
    expect(toPixels.convert(Unit.Bootstrap, 0)).toEqual(0);
    expect(toPixels.convert(Unit.Bootstrap, 1)).toEqual(4);
    expect(toPixels.convert(Unit.Bootstrap, 2)).toEqual(8);
    expect(toPixels.convert(Unit.Bootstrap, 3)).toEqual(16);
    expect(toPixels.convert(Unit.Bootstrap, 4)).toEqual(24);
    expect(toPixels.convert(Unit.Bootstrap, 5)).toEqual(48);
    expect(toPixels.convert(Unit.Bootstrap, 6)).toEqual(-1);
  });

  it('should convert Centimetres to pixels correctly', () => {
    expect(toPixels.convert(Unit.Centimetres, 1)).toBeCloseTo(37.795280352161);
    expect(toPixels.convert(Unit.Centimetres, 10.15999872)).toBeCloseTo(t96);
  });

  it('should convert Ems/Rems to pixels correctly', () => {
    expect(toPixels.convert(Unit.Ems, 1)).toBeCloseTo(16);
    expect(toPixels.convert(Unit.Ems, 24)).toBeCloseTo(t96, 1);
  });

  it('should convert Feet to pixels correctly', () => {
    expect(toPixels.convert(Unit.Feet, 1)).toBeCloseTo(1152);
    expect(toPixels.convert(Unit.Feet, 0.33333329133858)).toBeCloseTo(t96, 1);
  });

  it('should convert Inches to pixels correctly', () => {
    expect(toPixels.convert(Unit.Inches, 1)).toBeCloseTo(96);
    expect(toPixels.convert(Unit.Inches, 3.999999496063)).toBeCloseTo(t96, 1);
  });

  it('should convert Millimetres to pixels correctly', () => {
    expect(toPixels.convert(Unit.Millimetres, 1)).toBeCloseTo(3.7795280352161);
    expect(toPixels.convert(Unit.Millimetres, 101.5999872)).toBeCloseTo(t96, 1);
  });

  it('should convert Picas to pixels correctly', () => {
    expect(toPixels.convert(Unit.Picas, 1)).toBeCloseTo(16);
    expect(toPixels.convert(Unit.Millimetres, 101.5999872)).toBeCloseTo(t96, 1);
  });

  it('should convert Pixels to pixels correctly', () => {
    expect(toPixels.convert(Unit.Pixels, 1)).toBeCloseTo(1);
    expect(toPixels.convert(Unit.Pixels, 384)).toBeCloseTo(t96, 1);
  });

  it('should convert Points to pixels correctly', () => {
    expect(toPixels.convert(Unit.Points, 1)).toBeCloseTo(1.3333343412075);
    expect(toPixels.convert(Unit.Points, 287.99978229935)).toBeCloseTo(t96, 1);
  });

  it('should convert Tailwind to pixels correctly', () => {
    expect(toPixels.convert(Unit.Tailwind, 0)).toEqual(0);
    expect(toPixels.convert(Unit.Tailwind, 0.25)).toEqual(1);
    expect(toPixels.convert(Unit.Tailwind, 0.5)).toEqual(2);
    expect(toPixels.convert(Unit.Tailwind, 1)).toEqual(4);
    expect(toPixels.convert(Unit.Tailwind, 12)).toEqual(48);
    expect(toPixels.convert(Unit.Tailwind, 13)).toEqual(-1);
  });

  it('should return -1 for unsupported units', () => {
    // @ts-ignore
    expect(toPixels.convert("Unsupported", 1)).toEqual(-1);
  });
});
