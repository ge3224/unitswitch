import { toRems } from "@/converters/Rems";
import { Unit } from "@/types/units";

describe("toRems Converter", () => {
  it("should convert Bootstrap units correctly", () => {
    expect(toRems.convert(Unit.Bootstrap, 1)).toBeCloseTo(0.25);
    expect(toRems.convert(Unit.Bootstrap, 6)).toBe(-1);
  });

  it("should convert Centimetres to Rems correctly", () => {
    expect(toRems.convert(Unit.Centimetres, 1)).toBeCloseTo(2.3622050220101);
  });

  it("should convert Ems to Rems correctly", () => {
    expect(toRems.convert(Unit.Ems, 1)).toBeCloseTo(0.99626412551359);
  });

  it("should convert Feet to Rems correctly", () => {
    expect(toRems.convert(Unit.Feet, 1)).toBeCloseTo(72.000009070867);
  });

  it("should convert Inches to Rems correctly", () => {
    expect(toRems.convert(Unit.Inches, 1)).toBeCloseTo(6.0000007559056);
  });

  it("should convert Millimetres to Rems correctly", () => {
    expect(toRems.convert(Unit.Millimetres, 1)).toBeCloseTo(0.23622050220101);
  });

  it("should convert Picas to Rems correctly", () => {
    expect(toRems.convert(Unit.Picas, 1)).toBeCloseTo(1.0000001251969);
  });

  it("should convert Pixels to Rems correctly", () => {
    expect(toRems.convert(Unit.Pixels, 1)).toBeCloseTo(0.0625);
  });

  it("should convert Points to Rems correctly", () => {
    expect(toRems.convert(Unit.Points, 1)).toBeCloseTo(0.083333396325467);
  });

  it("should convert Rems to Rems correctly", () => {
    expect(toRems.convert(Unit.Rems, 1)).toBeCloseTo(1);
  });

  it("should convert Tailwind to Rems correctly", () => {
    expect(toRems.convert(Unit.Tailwind, 1)).toBeCloseTo(0.25);
    expect(toRems.convert(Unit.Tailwind, 13)).toBeCloseTo(-1);
  });
});
