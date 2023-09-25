import { toPixels } from '@/converters/Pixels';
import { Unit } from '@/unitswitch/types/units';

describe('toPixels', () => {
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
    expect(toPixels.convert(Unit.Centimetres, 1)).toEqual(38);
  });

  it('should convert Ems to pixels correctly', () => {
    expect(toPixels.convert(Unit.Ems, 1)).toEqual(16);
    // Add more test cases for Ems
  });

  it('should convert Feet to pixels correctly', () => {
    expect(toPixels.convert(Unit.Feet, 1)).toEqual(1152);
  });

  it('should convert Inches to pixels correctly', () => {
    expect(toPixels.convert(Unit.Inches, 1)).toEqual(96);
  });

  it('should convert Millimetres to pixels correctly', () => {
    expect(toPixels.convert(Unit.Millimetres, 1)).toEqual(4);
  });

  it('should convert Picas to pixels correctly', () => {
    expect(toPixels.convert(Unit.Picas, 1)).toEqual(16);
  });

  it('should convert Pixels to pixels correctly', () => {
    expect(toPixels.convert(Unit.Pixels, 1)).toEqual(1);
  });

  it('should convert Points to pixels correctly', () => {
    expect(toPixels.convert(Unit.Points, 1)).toEqual(2);
  });

  it('should convert Rems to pixels correctly', () => {
    expect(toPixels.convert(Unit.Rems, 1)).toEqual(16);
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
