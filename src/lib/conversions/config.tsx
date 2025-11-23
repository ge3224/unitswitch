import { createDomElement } from "@pkg/just-jsx/src/index.ts";

import { DetailsGoldenRatio, DetailsPixels, DetailsRemsEms, DetailsRootTwo, DetailsSixteenNine } from "@/lib/ui/details.tsx";
import { Unit, Units } from "@/lib/units.ts";
import type { Converter } from "@/lib/converters/index.ts";
import {
  convertToCentimeters,
  convertToCh,
  convertToEx,
  convertToFeet,
  convertToGoldenRatio,
  convertToInches,
  convertToMillimeters,
  convertToPicas,
  convertToPixels,
  convertToPoints,
  convertToRems,
  convertToRootTwo,
  convertToSixteenNine,
  convertToVh,
  convertToVmax,
  convertToVmin,
  convertToVw,
} from "@/lib/converters/index.ts";
import { SimpleState } from "@pkg/simple-state/src/index.ts";

export type ConversionConfig = {
  unit: Unit;
  converter: Converter;
  hotkey: string;
  detail?: (input: SimpleState<number>) => JSX.Element;
};

const detailPixels: () => JSX.Element = function detailPixels(): JSX.Element {
  return <DetailsPixels />;
};

const detailRemsEms: () => JSX.Element = function detailRemsEms(): JSX.Element {
  return <DetailsRemsEms />;
};

export const CONVERSIONS: ConversionConfig[] = [
  {
    unit: Units.Pixels,
    converter: convertToPixels,
    hotkey: "p",
    detail: detailPixels,
  },
  {
    unit: Units.Rems,
    converter: convertToRems,
    hotkey: "r",
    detail: detailRemsEms,
  },
  { unit: Units.Millimeters, converter: convertToMillimeters, hotkey: "m" },
  { unit: Units.Centimeters, converter: convertToCentimeters, hotkey: "c" },
  { unit: Units.Points, converter: convertToPoints, hotkey: "e" },
  { unit: Units.Picas, converter: convertToPicas, hotkey: "a" },
  { unit: Units.Inches, converter: convertToInches, hotkey: "i" },
  { unit: Units.Feet, converter: convertToFeet, hotkey: "f" },
  { unit: Units.Vw, converter: convertToVw, hotkey: "w" },
  { unit: Units.Vh, converter: convertToVh, hotkey: "h" },
  { unit: Units.Vmin, converter: convertToVmin, hotkey: "j" },
  { unit: Units.Vmax, converter: convertToVmax, hotkey: "x" },
  { unit: Units.Ch, converter: convertToCh, hotkey: "q" },
  { unit: Units.Ex, converter: convertToEx, hotkey: "z" },
  {
    unit: Units.Golden,
    converter: convertToGoldenRatio,
    hotkey: "g",
    detail: function detailGoldenRatio(
      input: SimpleState<number>,
    ): JSX.Element {
      return <DetailsGoldenRatio input={input} />;
    },
  },
  {
    unit: Units.Root2,
    converter: convertToRootTwo,
    hotkey: "t",
    detail: function detailRootTwo(input: SimpleState<number>): JSX.Element {
      return <DetailsRootTwo input={input} />;
    },
  },
  {
    unit: Units.SixteenNine,
    converter: convertToSixteenNine,
    hotkey: "s",
    detail: function detailSixteenNine(
      input: SimpleState<number>,
    ): JSX.Element {
      return <DetailsSixteenNine input={input} />;
    },
  },
];
