export enum Unit {
  Pixels = "Pixels",
  Rems = "Rems",
  Ems = "Ems",
  Tailwind = "Tailwind",
  Bootstrap = "Bootstrap",
  Inches = "Inches",
  Millimetres = "Millimetres",
  Centimetres = "Centimetres",
  Feet = "Feet",
  Picas = "Picas",
  Points = "Points",
}

export function isUnit(value: any): value is Unit {
  return Object.values(Unit).includes(value);
}
