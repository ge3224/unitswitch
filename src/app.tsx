import { createDomElement } from "@pkg/just-jsx/src/index.ts";

import Conversion from "@/lib/ui/conversion.tsx";
import Logo from "@/lib/ui/logo.tsx";
import Modal from "@/lib/ui/modal.tsx";
import UserInput from "@/lib/ui/user_input.tsx";
import {
  DetailsBootstrap,
  DetailsPixels,
  DetailsRemsEms,
  DetailsSixteenNine,
  DetailsTailwind,
} from "@/lib/ui/details.tsx";
import { Unit, Units } from "@/lib/units.ts";
import {
  convertToBootstrap,
  convertToCentimeters,
  convertToEms,
  convertToFeet,
  convertToInches,
  convertToMillimeters,
  convertToPicas,
  convertToPixels,
  convertToPoints,
  convertToRems,
  convertToSixteenNine,
  convertToTailwind,
} from "@/lib/converters/index.ts";
import { newSimpleState } from "@pkg/simple-state/src/index.ts";

export function App(): Node {
  const inputState = newSimpleState<number>(16);
  const unitState = newSimpleState<Unit>(Units.Pixels);

  const bootstrapState = newSimpleState<number>(
    convertToBootstrap(unitState.get(), inputState.get()),
  );

  const centimetersState = newSimpleState<number>(
    convertToCentimeters(unitState.get(), inputState.get()),
  );

  const emsState = newSimpleState<number>(
    convertToEms(unitState.get(), inputState.get()),
  );

  const feetState = newSimpleState<number>(
    convertToFeet(unitState.get(), inputState.get()),
  );

  const inchesState = newSimpleState<number>(
    convertToInches(unitState.get(), inputState.get()),
  );

  const millimetersState = newSimpleState<number>(
    convertToMillimeters(unitState.get(), inputState.get()),
  );

  const picasState = newSimpleState<number>(
    convertToPicas(unitState.get(), inputState.get()),
  );

  const pixelsState = newSimpleState<number>(
    convertToPixels(unitState.get(), inputState.get()),
  );

  const pointsState = newSimpleState<number>(
    convertToPoints(unitState.get(), inputState.get()),
  );

  const remsState = newSimpleState<number>(
    convertToRems(unitState.get(), inputState.get()),
  );

  const sixteenNineState = newSimpleState<number>(
    convertToSixteenNine(unitState.get(), inputState.get()),
  );

  const tailwindState = newSimpleState<number>(
    convertToTailwind(unitState.get(), inputState.get()),
  );

  inputState.subscribe(function inputCallback(newInput: number): void {
    bootstrapState.set(convertToBootstrap(unitState.get(), newInput));
    centimetersState.set(convertToCentimeters(unitState.get(), newInput));
    emsState.set(convertToEms(unitState.get(), newInput));
    feetState.set(convertToFeet(unitState.get(), newInput));
    inchesState.set(convertToInches(unitState.get(), newInput));
    millimetersState.set(convertToMillimeters(unitState.get(), newInput));
    pixelsState.set(convertToPixels(unitState.get(), newInput));
    picasState.set(convertToPicas(unitState.get(), newInput));
    pointsState.set(convertToPoints(unitState.get(), newInput));
    remsState.set(convertToRems(unitState.get(), newInput));
    sixteenNineState.set(convertToSixteenNine(unitState.get(), newInput));
    tailwindState.set(convertToTailwind(unitState.get(), newInput));
  });

  unitState.subscribe(function unitCallback(newUnit: Unit): void {
    bootstrapState.set(convertToBootstrap(newUnit, inputState.get()));
    centimetersState.set(convertToCentimeters(newUnit, inputState.get()));
    emsState.set(convertToEms(newUnit, inputState.get()));
    feetState.set(convertToFeet(newUnit, inputState.get()));
    inchesState.set(convertToInches(newUnit, inputState.get()));
    millimetersState.set(convertToMillimeters(newUnit, inputState.get()));
    pixelsState.set(convertToPixels(newUnit, inputState.get()));
    picasState.set(convertToPicas(newUnit, inputState.get()));
    pointsState.set(convertToPoints(newUnit, inputState.get()));
    remsState.set(convertToRems(newUnit, inputState.get()));
    sixteenNineState.set(convertToSixteenNine(newUnit, inputState.get()));
    tailwindState.set(convertToTailwind(newUnit, inputState.get()));
  });

  function handleSubmit(value: number, unit: Unit): void {
    inputState.set(value);
    unitState.set(unit);
  }

  return (
    <div class="m-2 sm:flex sm:min-h-screen items-center justify-center">
      <div class="my-auto max-w-screen-xl lg:mx-auto rounded-lg border border-app-green-600 bg-app-green-50 pb-4 lg:grid lg:grid-cols-3 lg:gap-5 lg:border-none lg:p-12">
        <div class="relative flex flex-col border-b border-app-green-600 px-11 pt-12 lg:col-span-2 lg:row-span-2 lg:flex-row lg:justify-center lg:border lg:py-8">
          <Logo />
          <UserInput
            input={inputState}
            type={unitState}
            callback={handleSubmit}
          />
        </div>
        <Conversion
          conversion={pixelsState}
          to={Units.Pixels}
          hotkey="1"
          detail={<DetailsPixels />}
        />
        <Conversion
          conversion={remsState}
          to={Units.Rems}
          hotkey="2"
          detail={<DetailsRemsEms />}
        />
        <Conversion
          conversion={emsState}
          to={Units.Ems}
          hotkey="3"
          detail={<DetailsRemsEms />}
        />
        <Conversion
          conversion={tailwindState}
          to={Units.Tailwind}
          hotkey="4"
          detail={<DetailsTailwind conversion={tailwindState} />}
        />
        <Conversion
          conversion={bootstrapState}
          to={Units.Bootstrap}
          hotkey="5"
          detail={<DetailsBootstrap />}
        />
        <Conversion
          conversion={millimetersState}
          to={Units.Millimeters}
          hotkey="6"
        />
        <Conversion
          conversion={centimetersState}
          to={Units.Centimeters}
          hotkey="7"
        />
        <Conversion
          conversion={pointsState}
          to={Units.Points}
          hotkey="8"
        />
        <Conversion
          conversion={picasState}
          to={Units.Picas}
          hotkey="9"
        />
        <Conversion
          conversion={inchesState}
          to={Units.Inches}
          hotkey="!"
        />
        <Conversion
          conversion={feetState}
          to={Units.Feet}
          hotkey="@"
        />
        <Conversion
          conversion={sixteenNineState}
          to={Units.SixteenNine}
          hotkey="#"
          detail={<DetailsSixteenNine input={inputState} />}
        />
        <Modal
          callback={handleSubmit}
          hotkey="k"
        />
      </div>
    </div>
  ) as Node;
}
