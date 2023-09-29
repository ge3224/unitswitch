import { toBootstrap } from "@/converters/bootstrap";
import { Unit } from "@/units";

describe("from bootstrap", () => {
  it("should map input within the range of Bootstrap sizes", () => {
    expect(toBootstrap.convert(Unit.Bootstrap, 0)).toBe(0);
    expect(toBootstrap.convert(Unit.Bootstrap, 1)).toBe(1);
    expect(toBootstrap.convert(Unit.Bootstrap, 2)).toBe(2);
    expect(toBootstrap.convert(Unit.Bootstrap, 3)).toBe(3);
    expect(toBootstrap.convert(Unit.Bootstrap, 4)).toBe(4);
    expect(toBootstrap.convert(Unit.Bootstrap, 5)).toBe(5);
  });
  it("should handle input outside the range of Bootstrap sizes", () => {
    expect(toBootstrap.convert(Unit.Bootstrap, 6)).toBe(-1);
  });
});

describe("from pixels", () => {
  it("should map input within the range of Bootstrap sizes", () => {
    expect(toBootstrap.convert(Unit.Pixels, 0)).toBe(0);
    expect(toBootstrap.convert(Unit.Pixels, 4)).toBe(1);
    expect(toBootstrap.convert(Unit.Pixels, 8)).toBe(2);
    expect(toBootstrap.convert(Unit.Pixels, 16)).toBe(3);
    expect(toBootstrap.convert(Unit.Pixels, 24)).toBe(4);
    expect(toBootstrap.convert(Unit.Pixels, 48)).toBe(5);
  });
  it("should handle input outside the range of Bootstrap sizes", () => {
    expect(toBootstrap.convert(Unit.Pixels, 1)).toBe(-1);
  });
});

describe("from ems and rems", () => {
  it("should map input within the range of Bootstrap sizes", () => {
    expect(toBootstrap.convert(Unit.Rems, 0)).toBe(0);
    expect(toBootstrap.convert(Unit.Rems, 0.25)).toBe(1);
    expect(toBootstrap.convert(Unit.Rems, 0.5)).toBe(2);
    expect(toBootstrap.convert(Unit.Rems, 1)).toBe(3);
    expect(toBootstrap.convert(Unit.Rems, 1.5)).toBe(4);
    expect(toBootstrap.convert(Unit.Rems, 3)).toBe(5);
  });
  it("should handle input outside the range of Bootstrap sizes", () => {
    expect(toBootstrap.convert(Unit.Rems, 2)).toBe(-1);
  });
});

describe("from tailwind sizes", () => {
  it("should map input within the range of Bootstrap sizes", () => {
    expect(toBootstrap.convert(Unit.Tailwind, 0)).toBe(0);
    expect(toBootstrap.convert(Unit.Tailwind, 1)).toBe(1);
    expect(toBootstrap.convert(Unit.Tailwind, 2)).toBe(2);
    expect(toBootstrap.convert(Unit.Tailwind, 4)).toBe(3);
    expect(toBootstrap.convert(Unit.Tailwind, 6)).toBe(4);
    expect(toBootstrap.convert(Unit.Tailwind, 12)).toBe(5);
  });
  it("should handle input outside the range of Bootstrap sizes", () => {
    expect(toBootstrap.convert(Unit.Tailwind, 3)).toBe(-1);
  });
});

describe("from millimeters sizes", () => {
  it("should map input within the range of Bootstrap sizes", () => {
    expect(toBootstrap.convert(Unit.Millimetres, 0)).toBe(0);
    expect(toBootstrap.convert(Unit.Millimetres, 1.06)).toBe(1);
    expect(toBootstrap.convert(Unit.Millimetres, 2.12)).toBe(2);
    expect(toBootstrap.convert(Unit.Millimetres, 4.23)).toBe(3);
    expect(toBootstrap.convert(Unit.Millimetres, 6.35)).toBe(4);
    expect(toBootstrap.convert(Unit.Millimetres, 12.7)).toBe(5);
  });
  it("should handle input outside the range of Bootstrap sizes", () => {
    expect(toBootstrap.convert(Unit.Millimetres, 3)).toBe(-1);
  });
});

describe("from feet sizes", () => {
  it("should map input within the range of Bootstrap sizes", () => {
    expect(toBootstrap.convert(Unit.Feet, 0)).toBe(0);
    expect(toBootstrap.convert(Unit.Feet, 0.006)).toBe(1);
    expect(toBootstrap.convert(Unit.Feet, 0.003)).toBe(2);
    expect(toBootstrap.convert(Unit.Feet, 0.013)).toBe(3);
    expect(toBootstrap.convert(Unit.Feet, 0.020)).toBe(4);
    expect(toBootstrap.convert(Unit.Feet, 0.041)).toBe(5);
  });
  it("should handle input outside the range of Bootstrap sizes", () => {
    expect(toBootstrap.convert(Unit.Feet, 0.05)).toBe(-1);
  });
});

describe("from picas sizes", () => {
  it("should map input within the range of Bootstrap sizes", () => {
    expect(toBootstrap.convert(Unit.Picas, 0)).toBe(0);
    expect(toBootstrap.convert(Unit.Picas, 0.24)).toBe(1);
    expect(toBootstrap.convert(Unit.Picas, 0.49)).toBe(2);
    expect(toBootstrap.convert(Unit.Picas, 0.99)).toBe(3);
    expect(toBootstrap.convert(Unit.Picas, 1.49)).toBe(4);
    expect(toBootstrap.convert(Unit.Picas, 2.99)).toBe(5);
  });
  it("should handle input outside the range of Bootstrap sizes", () => {
    expect(toBootstrap.convert(Unit.Picas, 4)).toBe(-1);
  });
});

describe("from inches sizes", () => {
  it("should map input within the range of Bootstrap sizes", () => {
    expect(toBootstrap.convert(Unit.Inches, 0)).toBe(0);
    expect(toBootstrap.convert(Unit.Inches, 0.041666661417323)).toBe(1);
    expect(toBootstrap.convert(Unit.Inches, 0.083333322834646)).toBe(2);
    expect(toBootstrap.convert(Unit.Inches, 0.16666664566929)).toBe(3);
    expect(toBootstrap.convert(Unit.Inches, 0.24999996850394)).toBe(4);
    expect(toBootstrap.convert(Unit.Inches, 0.49999993700787)).toBe(5);
  });
  it("should handle input outside the range of Bootstrap sizes", () => {
    expect(toBootstrap.convert(Unit.Inches, 0.55)).toBe(-1);
  });
});

describe("from Points sizes", () => {
  it("should map input within the range of Bootstrap sizes", () => {
    expect(toBootstrap.convert(Unit.Points, 0)).toBe(0);
    expect(toBootstrap.convert(Unit.Points, 3)).toBe(1);
    expect(toBootstrap.convert(Unit.Points, 6)).toBe(2);
    expect(toBootstrap.convert(Unit.Points, 12)).toBe(3);
    expect(toBootstrap.convert(Unit.Points, 18)).toBe(4);
    expect(toBootstrap.convert(Unit.Points, 36)).toBe(5);
  });
  it("should handle input outside the range of Bootstrap sizes", () => {
    expect(toBootstrap.convert(Unit.Points, 37)).toBe(-1);
  });
});

describe("from centimeters", () => {
  it("should map input within the range of Bootstrap sizes", () => {
    expect(toBootstrap.convert(Unit.Centimetres, 0)).toBe(0);
    expect(toBootstrap.convert(Unit.Centimetres, 0.10)).toBe(1);
    expect(toBootstrap.convert(Unit.Centimetres, 0.21)).toBe(2);
    expect(toBootstrap.convert(Unit.Centimetres, 0.42)).toBe(3);
    expect(toBootstrap.convert(Unit.Centimetres, 0.63)).toBe(4);
    expect(toBootstrap.convert(Unit.Centimetres, 1.26)).toBe(5);
  });
});
