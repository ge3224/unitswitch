import { Unit } from "@/unitswitch/types/units";

export const FIXED_POINT = 3;
export const FONT_SIZE = 16
export const DPI = 96

export interface Converter {
  convert(from: Unit, input: number): number;
}

export { default as Pixels } from "@/converters/Pixels";
