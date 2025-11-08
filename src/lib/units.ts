/**
 * Enum representing various units.
 */
export const Units = {
  Bootstrap: "Bootstrap",
  Centimeters: "Centimeters",
  Ems: "Ems",
  Feet: "Feet",
  Inches: "Inches",
  Millimeters: "Millimeters",
  Picas: "Picas",
  Pixels: "Pixels",
  Points: "Points",
  Rems: "Rems",
  SixteenNine: "16:9",
  Tailwind: "Tailwind",
} as const;

export type Unit = typeof Units[keyof typeof Units];

/**
 * List of all available unit abbreviations with their full names
 */
export const UNIT_ABBREVIATIONS = [
  { abbr: "bs", name: Units.Bootstrap },
  { abbr: "cm", name: Units.Centimeters },
  { abbr: "em", name: Units.Ems },
  { abbr: "ft", name: Units.Feet },
  { abbr: "in", name: Units.Inches },
  { abbr: "mm", name: Units.Millimeters },
  { abbr: "pc", name: Units.Picas },
  { abbr: "px", name: Units.Pixels },
  { abbr: "pt", name: Units.Points },
  { abbr: "rem", name: Units.Rems },
  { abbr: "tw", name: Units.Tailwind },
] as const;

/**
 * Converts an abbreviation to the corresponding Unit value.
 *
 * @param input - The abbreviation to convert.
 * @returns The corresponding Unit value or null if the abbreviation is not recognized.
 */
export function abbreviations(input: string): Unit | null {
  switch (input) {
    case "bs": return Units.Bootstrap;
    case "cm": return Units.Centimeters;
    case "em": return Units.Ems;
    case "ft": return Units.Feet;
    case "in": return Units.Inches;
    case "mm": return Units.Millimeters;
    case "pc": return Units.Picas;
    case "px": return Units.Pixels;
    case "pt": return Units.Points;
    case "rem": return Units.Rems;
    case "tw": return Units.Tailwind;
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
  if (typeof value === 'string') {
    // If value is a string, check if it's a valid abbreviation.
    return abbreviations(value) !== null || Object.values(Units).includes(value as Unit);
  } else if (Object.values(Units).includes(value)) {
    // If value is a Unit enum value, it's always valid.
    return true;
  }
  return false;
}
