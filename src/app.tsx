import { createDomElement } from "@pkg/just-jsx";

import Conversion from "@lib/ui/conversion";
import Logo from "@lib/ui/logo";
import UserInput from "@lib/ui/user_input";
import { Unit, Units } from "@lib/units";
import { convertToPixels } from "@lib/converters/pixels";
import { newSimpleState } from "@pkg/simple-state";
import { convertToRems } from "./lib/converters/rems";
import { converttoTailwind } from "./lib/converters/tailwind";
import { convertToEms } from "./lib/converters/ems";
import DetailsPixels from "./lib/ui/details_panels/pixels";
import DetailsRems from "./lib/ui/details_panels/rems";
import DetailsEms from "./lib/ui/details_panels/ems";
import DetailsTailwind from "./lib/ui/details_panels/tailwind";

export function App(): Node {
  const _input = newSimpleState<number>(16);
  const _unit = newSimpleState<Unit>(Units.Pixels);

  function _handleSubmit(value: number, unit: Unit): void {
    _input.set(value);
    _unit.set(unit);
  }

  return (
    <div class="rounded-lg border border-app-green-600 bg-app-green-50 pb-4 lg:grid lg:grid-cols-3 lg:gap-5 lg:border-none lg:p-12">
      <div class="relative flex flex-col border-b border-app-green-600 px-11 pt-12 lg:col-span-2 lg:row-span-2 lg:flex-row lg:justify-center lg:border lg:py-8">
        <Logo />
        <UserInput input={_input.get()} type={Units.Pixels} callback={_handleSubmit} />
      </div>
      <Conversion
        input={_input}
        to={Units.Pixels}
        from={_unit}
        converter={convertToPixels}
        hotkey="p"
        detail={<DetailsPixels />}
      />
      <Conversion
        input={_input}
        to={Units.Rems}
        from={_unit}
        converter={convertToRems}
        hotkey="r"
        detail={<DetailsRems />}
      />
      <Conversion
        input={_input}
        to={Units.Ems}
        from={_unit}
        converter={convertToEms}
        hotkey="r"
        detail={<DetailsEms />}
      />
      <Conversion
        input={_input}
        to={Units.Tailwind}
        from={_unit}
        converter={converttoTailwind}
        hotkey="r"
        detail={<DetailsTailwind input={_input} from={_unit} />}
      />
    </div>
  ) as Node;
}
