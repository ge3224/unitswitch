export enum Unit {
  Bootstrap = "Bootstrap",
  Centimetres = "Centimetres",
  Ems = "Ems",
  Feet = "Feet",
  Inches = "Inches",
  Millimetres = "Millimetres",
  Picas = "Picas",
  Pixels = "Pixels",
  Points = "Points",
  Rems = "Rems",
  Tailwind = "Tailwind",
}

export function isUnit(value: any): value is Unit {
  return Object.values(Unit).includes(value);
}
