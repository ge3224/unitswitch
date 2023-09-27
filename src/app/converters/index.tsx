import { Unit } from "@/units";

export const FIXED_POINT = 3;
export const FONT_SIZE = 16
export const DPI = 96

export interface Converter {
  convert(from: Unit, input: number): number;
  render(conversion: number): string;
}

export { default as Bootstrap } from "@/converters/Bootstrap";
export { default as Centimetres } from "@/converters/Centimetres";
export { default as Ems } from "@/converters/Ems";
export { default as Millimetres } from "@/converters/Millimetres";
export { default as Picas } from "@/converters/Picas";
export { default as Pixels } from "@/converters/Pixels";
export { default as Points } from "@/converters/Points";
export { default as Rems } from "@/converters/Rems";
export { default as Tailwind } from "@/converters/Tailwind";
