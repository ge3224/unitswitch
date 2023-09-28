/**
 * Enum representing various units.
 */
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

/**
 * Converts an abbreviation to the corresponding Unit value.
 *
 * @param input - The abbreviation to convert.
 * @returns The corresponding Unit value or null if the abbreviation is not recognized.
 */
export function abbreviations(input: string): Unit | null {
  switch (input) {
    case "bs": return Unit.Bootstrap;
    case "cm": return Unit.Centimetres;
    case "em": return Unit.Ems;
    case "ft": return Unit.Feet;
    case "in": return Unit.Inches;
    case "mm": return Unit.Millimetres;
    case "pc": return Unit.Picas;
    case "px": return Unit.Pixels;
    case "pt": return Unit.Points;
    case "rem": return Unit.Rems;
    case "tw": return Unit.Tailwind;
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
    return abbreviations(value) !== null || Object.values(Unit).includes(value as Unit);
  } else if (Object.values(Unit).includes(value)) {
    // If value is a Unit enum value, it's always valid.
    return true;
  }
  return false;
}
