import { AppErrorKind, Err, Ok, type Result } from "./result.ts";

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
  Rems: "Rems/Ems",
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
 * @returns Result containing the corresponding Unit value, or an error if the abbreviation is not recognized.
 */
export function abbreviations(input: string): Result<Unit> {
  switch (input) {
    case "ch":
      return Ok(Units.Ch);
    case "cm":
      return Ok(Units.Centimeters);
    case "ex":
      return Ok(Units.Ex);
    case "ft":
      return Ok(Units.Feet);
    case "in":
      return Ok(Units.Inches);
    case "mm":
      return Ok(Units.Millimeters);
    case "pc":
      return Ok(Units.Picas);
    case "px":
      return Ok(Units.Pixels);
    case "pt":
      return Ok(Units.Points);
    case "rem":
      return Ok(Units.Rems);
    case "vh":
      return Ok(Units.Vh);
    case "vmax":
      return Ok(Units.Vmax);
    case "vmin":
      return Ok(Units.Vmin);
    case "vw":
      return Ok(Units.Vw);
    default:
      return Err(
        AppErrorKind.InvalidInput,
        `Unrecognized unit abbreviation: "${input}"`,
        { unit: input },
      );
  }
}

export function isUnit(value: string | Unit): boolean {
  if (typeof value === "string") {
    // If value is a string, check if it's a valid abbreviation.
    return abbreviations(value).ok ||
      Object.values(Units).includes(value as Unit);
  } else if (Object.values(Units).includes(value)) {
    // If value is a Unit enum value, it's always valid.
    return true;
  }
  return false;
}
