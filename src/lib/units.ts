/**
 * Enum representing various units.
 */
export const Units = {
  Centimeters: "Centimeters",
  Ch: "Character Width",
  Ex: "X-Height",
  Feet: "Feet",
  Golden: "Golden Ratio",
  Inches: "Inches",
  Millimeters: "Millimeters",
  Picas: "Picas",
  Pixels: "Pixels",
  Points: "Points",
  Rems: "Rems",
  Root2: "Root 2 Rectangle",
  SixteenNine: "16:9",
  Vh: "Viewport Height",
  Vmax: "Viewport Max",
  Vmin: "Viewport Min",
  Vw: "Viewport Width",
} as const;

export type Unit = typeof Units[keyof typeof Units];

/**
 * List of all available unit abbreviations with their full names
 */
export const UNIT_ABBREVIATIONS = [
  { abbr: "ch", name: Units.Ch },
  { abbr: "cm", name: Units.Centimeters },
  { abbr: "ex", name: Units.Ex },
  { abbr: "ft", name: Units.Feet },
  { abbr: "in", name: Units.Inches },
  { abbr: "mm", name: Units.Millimeters },
  { abbr: "pc", name: Units.Picas },
  { abbr: "px", name: Units.Pixels },
  { abbr: "pt", name: Units.Points },
  { abbr: "rem", name: Units.Rems },
  { abbr: "vh", name: Units.Vh },
  { abbr: "vmax", name: Units.Vmax },
  { abbr: "vmin", name: Units.Vmin },
  { abbr: "vw", name: Units.Vw },
] as const;

/**
 * Converts an abbreviation to the corresponding Unit value.
 *
 * @param input - The abbreviation to convert.
 * @returns The corresponding Unit value or null if the abbreviation is not recognized.
 */
export function abbreviations(input: string): Unit | null {
  switch (input) {
    case "ch":
      return Units.Ch;
    case "cm":
      return Units.Centimeters;
    case "ex":
      return Units.Ex;
    case "ft":
      return Units.Feet;
    case "in":
      return Units.Inches;
    case "mm":
      return Units.Millimeters;
    case "pc":
      return Units.Picas;
    case "px":
      return Units.Pixels;
    case "pt":
      return Units.Points;
    case "rem":
      return Units.Rems;
    case "vh":
      return Units.Vh;
    case "vmax":
      return Units.Vmax;
    case "vmin":
      return Units.Vmin;
    case "vw":
      return Units.Vw;
    default:
      return null;
  }
}

/**
 * Checks if a value is a valid Unit.
 *
 * @param value - The value to check.
 * @returns True if the value is a valid Unit, false otherwise.
 */
export function isUnit(value: string | Unit): boolean {
  if (typeof value === "string") {
    // If value is a string, check if it's a valid abbreviation.
    return abbreviations(value) !== null ||
      Object.values(Units).includes(value as Unit);
  } else if (Object.values(Units).includes(value)) {
    // If value is a Unit enum value, it's always valid.
    return true;
  }
  return false;
}
