import { createDomElement } from "@pkg/just-jsx/src/index.ts";

import Conversion from "@/lib/ui/conversion.tsx";
import Logo from "@/lib/ui/logo.tsx";
import Modal from "@/lib/ui/modal.tsx";
import UserInput from "@/lib/ui/user_input.tsx";
import {
  DetailsGoldenRatio,
  DetailsPixels,
  DetailsRemsEms,
  DetailsRootTwo,
  DetailsSixteenNine,
} from "@/lib/ui/details.tsx";
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
import { unwrapOr } from "@/lib/converters/result.ts";
import { newSimpleState, SimpleState } from "@pkg/simple-state/src/index.ts";

/**
 * Configuration for each unit conversion
 */
type ConversionConfig = {
  unit: Unit;
  converter: Converter;
  hotkey: string;
  detail?: (input: SimpleState<number>) => JSX.Element;
};

const CONVERSIONS: ConversionConfig[] = [
  {
    unit: Units.Pixels,
    converter: convertToPixels,
    hotkey: "p",
    detail: () => <DetailsPixels />,
  },
  {
    unit: Units.Rems,
    converter: convertToRems,
    hotkey: "r",
    detail: () => <DetailsRemsEms />,
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
    detail: (input) => <DetailsGoldenRatio input={input} />,
  },
  {
    unit: Units.Root2,
    converter: convertToRootTwo,
    hotkey: "t",
    detail: (input) => <DetailsRootTwo input={input} />,
  },
  {
    unit: Units.SixteenNine,
    converter: convertToSixteenNine,
    hotkey: "s",
    detail: (input) => <DetailsSixteenNine input={input} />,
  },
];

export function App(): Node {
  const inputState = newSimpleState<number>(16);
  const unitState = newSimpleState<Unit>(Units.Pixels);

  // Create a map of unit -> state for easy lookup
  const conversionStates = new Map<Unit, SimpleState<number>>();

  // Initialize all conversion states
  for (const config of CONVERSIONS) {
    const result = config.converter(unitState.get(), inputState.get());
    const initialValue = unwrapOr(result, -1);
    const state = newSimpleState<number>(initialValue);
    conversionStates.set(config.unit, state);
  }

  // Update all conversions when input changes
  inputState.subscribe(function inputCallback(newInput: number): void {
    for (const config of CONVERSIONS) {
      const result = config.converter(unitState.get(), newInput);
      const value = unwrapOr(result, -1);
      conversionStates.get(config.unit)?.set(value);
    }
  });

  // Update all conversions when unit changes
  unitState.subscribe(function unitCallback(newUnit: Unit): void {
    for (const config of CONVERSIONS) {
      const result = config.converter(newUnit, inputState.get());
      const value = unwrapOr(result, -1);
      conversionStates.get(config.unit)?.set(value);
    }
  });

  function handleSubmit(value: number, unit: Unit): void {
    inputState.set(value);
    unitState.set(unit);
  }

  const container = (
    <div class="m-2 sm:flex sm:min-h-screen items-center justify-center">
      <div class="my-auto max-w-7xl lg:mx-auto rounded-lg border border-app-green-600 bg-app-green-50 pb-4 lg:grid lg:grid-cols-3 lg:gap-5 lg:border-none lg:p-12">
        <div class="relative flex flex-col border-b border-app-green-600 px-11 pt-12 lg:col-span-2 lg:row-span-2 lg:flex-row lg:justify-center lg:border lg:py-8">
          <Logo />
          <UserInput
            input={inputState}
            type={unitState}
            callback={handleSubmit}
          />
        </div>
      </div>
    </div>
  ) as HTMLElement;

  const innerDiv = container.querySelector(".lg\\:grid") as HTMLElement;

  // Append all conversion components
  for (const config of CONVERSIONS) {
    const conversionElement = (
      <Conversion
        conversion={conversionStates.get(config.unit)!}
        to={config.unit}
        hotkey={config.hotkey}
        detail={config.detail?.(inputState)}
      />
    ) as Node;
    innerDiv.appendChild(conversionElement);
  }

  // Append modal at the end
  const modalElement = (
    <Modal
      callback={handleSubmit}
      hotkey="k"
    />
  ) as Node;
  innerDiv.appendChild(modalElement);

  return container;
}
