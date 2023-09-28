import { isUnit, Unit } from '@/units';

describe('isUnit', () => {
  it('should return true for valid abbreviations', () => {
    expect(isUnit('bs')).toBe(true);
    expect(isUnit('cm')).toBe(true);
    expect(isUnit('em')).toBe(true);
    expect(isUnit('ft')).toBe(true);
    expect(isUnit('in')).toBe(true);
    expect(isUnit('mm')).toBe(true);
    expect(isUnit('pc')).toBe(true);
    expect(isUnit('px')).toBe(true);
    expect(isUnit('pt')).toBe(true);
    expect(isUnit('rem')).toBe(true);
    expect(isUnit('tw')).toBe(true);
  });

  it('should return true for valid enum values', () => {
    expect(isUnit(Unit.Bootstrap)).toBe(true);
    expect(isUnit(Unit.Centimetres)).toBe(true);
    expect(isUnit(Unit.Ems)).toBe(true);
    expect(isUnit(Unit.Feet)).toBe(true);
    expect(isUnit(Unit.Inches)).toBe(true);
    expect(isUnit(Unit.Millimetres)).toBe(true);
    expect(isUnit(Unit.Picas)).toBe(true);
    expect(isUnit(Unit.Pixels)).toBe(true);
    expect(isUnit(Unit.Points)).toBe(true);
    expect(isUnit(Unit.Rems)).toBe(true);
    expect(isUnit(Unit.Tailwind)).toBe(true);
  });

  it('should return true for valid enum keys', () => {
    expect(isUnit("Bootstrap")).toBe(true);
    expect(isUnit("Centimetres")).toBe(true);
    expect(isUnit("Ems")).toBe(true);
    expect(isUnit("Feet")).toBe(true);
    expect(isUnit("Inches")).toBe(true);
    expect(isUnit("Millimetres")).toBe(true);
    expect(isUnit("Picas")).toBe(true);
    expect(isUnit("Pixels")).toBe(true);
    expect(isUnit("Points")).toBe(true);
    expect(isUnit("Rems")).toBe(true);
    expect(isUnit("Tailwind")).toBe(true);
  });

  it('should return false for invalid values', () => {
    expect(isUnit('invalid')).toBe(false);
    // @ts-ignore
    expect(isUnit(123)).toBe(false);
    // @ts-ignore
    expect(isUnit(true)).toBe(false);
    // @ts-ignore
    expect(isUnit(null)).toBe(false);
    // @ts-ignore
    expect(isUnit(undefined)).toBe(false);
  });
});
