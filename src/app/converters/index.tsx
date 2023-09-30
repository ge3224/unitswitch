import { Unit } from "@/units";

export const FIXED_POINT = 3;
export const FONT_SIZE = 16;
export const PPI = 96;

export interface Converter {
  convert(from: Unit, input: number): number;
  render(conversion: number): string;
}

export type ConverterProps = {
  input: number;
  from: Unit;
  hotkey: string;
};

export { default as Bootstrap } from "@/converters/bootstrap";
export { default as Centimetres } from "@/converters/centimetres";
export { default as Ems } from "@/converters/ems";
export { default as Feet } from "@/converters/feet";
export { default as GoldenRatio } from "@/converters/golden_ratio";
export { default as Inches } from "@/converters/inches";
export { default as Millimetres } from "@/converters/millimetres";
export { default as Picas } from "@/converters/picas";
export { default as Pixels } from "@/converters/pixels";
export { default as Points } from "@/converters/points";
export { default as Rems } from "@/converters/rems";
export { default as RootTwo } from "@/converters/root_two";
export { default as SixteenNine } from "@/converters/sixteen_nine";
export { default as Tailwind } from "@/converters/tailwind";
