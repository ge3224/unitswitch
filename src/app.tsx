import { createDomElement } from "@pkg/just-jsx/src/index.ts";

import Conversion from "@/lib/ui/conversion.tsx";
import Logo from "@/lib/ui/logo.tsx";
import Modal from "@/lib/ui/modal.tsx";
import Settings from "@/lib/ui/settings.tsx";
import UserInput from "@/lib/ui/user_input.tsx";
import { SettingsIcon } from "@/lib/ui/icons.tsx";
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
import { Result } from "@/lib/converters/result.ts";
import { newSimpleState, SimpleState } from "@pkg/simple-state/src/index.ts";
import { configState } from "@/lib/config.ts";
import { lastInputState } from "@/lib/last_input.ts";

type ConversionConfig = {
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

const CONVERSIONS: ConversionConfig[] = [
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

export function App(): Node {
  const lastInput = lastInputState.get();
  const inputState = newSimpleState<number>(lastInput.amount);
  const unitState = newSimpleState<Unit>(lastInput.unit);

  const conversionStates = new Map<Unit, SimpleState<Result<number>>>();

  for (const config of CONVERSIONS) {
    const result = config.converter(unitState.get(), inputState.get());
    // const initialValue = unwrapOr(result, -1);
    const state = newSimpleState<Result<number>>(result);
    conversionStates.set(config.unit, state);
  }

  inputState.subscribe(function inputCallback(newInput: number): void {
    for (const config of CONVERSIONS) {
      const result = config.converter(unitState.get(), newInput);
      conversionStates.get(config.unit)?.set(result);
    }
  });

  unitState.subscribe(function unitCallback(newUnit: Unit): void {
    for (const config of CONVERSIONS) {
      const result = config.converter(newUnit, inputState.get());
      conversionStates.get(config.unit)?.set(result);
    }
  });

  configState.subscribe(function configCallback(): void {
    for (const config of CONVERSIONS) {
      const result = config.converter(unitState.get(), inputState.get());
      conversionStates.get(config.unit)?.set(result);
    }
  });

  inputState.subscribe(function saveInputCallback(newAmount: number): void {
    lastInputState.set({
      amount: newAmount,
      unit: unitState.get(),
    });
  });

  unitState.subscribe(function saveUnitCallback(newUnit: Unit): void {
    lastInputState.set({
      amount: inputState.get(),
      unit: newUnit,
    });
  });

  function handleSubmit(value: number, unit: Unit): void {
    inputState.set(value);
    unitState.set(unit);
  }

  let openSettingsFn: (() => void) | null = null;

  const handleSettingsMount: (openFn: () => void) => void =
    function handleSettingsMount(openFn: () => void): void {
      openSettingsFn = openFn;
    };

  return (
    <div class="m-2 sm:flex sm:min-h-screen items-center justify-center">
      <div class="relative my-auto max-w-7xl lg:mx-auto rounded-lg border border-app-green-600 dark:border-app-green-700 pt-6 sm:pt-0 pb-3 lg:grid lg:grid-cols-3 lg:gap-4 lg:border-none lg:p-8">
        <button
          type="button"
          class="absolute lg:fixed top-2 right-2 lg:top-4 lg:right-4 z-30 cursor-pointer rounded-full p-3 text-app-gray-200 dark:text-app-green-300 transition-all hover:bg-app-green-600 dark:hover:bg-app-green-700 hover:text-white hover:shadow-lg hover:scale-110 active:scale-95"
          title="Settings (Ctrl+/)"
          onClick={function handleSettingsClick(): void {
            openSettingsFn?.();
          }}
        >
          <SettingsIcon />
        </button>

        <div class="relative flex flex-col border-b border-app-green-600 dark:border-app-green-700 px-8 pt-8 lg:col-span-2 lg:row-span-2 lg:flex-row lg:justify-center lg:border lg:py-5">
          <Logo />
          <UserInput
            input={inputState}
            type={unitState}
            callback={handleSubmit}
          />
        </div>

        {CONVERSIONS.map((config) => (
          <Conversion
            conversion={conversionStates.get(config.unit)!}
            to={config.unit}
            hotkey={config.hotkey}
            detail={config.detail?.(inputState)}
          />
        ))}

        <Modal
          callback={handleSubmit}
          hotkey="k"
        />

        <Settings
          hotkey="/"
          onMount={handleSettingsMount}
        />
      </div>
    </div>
  ) as Node;
}
