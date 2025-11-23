import { createDomElement } from "@pkg/just-jsx/src/index.ts";

import Conversion from "@/lib/ui/conversion.tsx";
import Logo from "@/lib/ui/logo.tsx";
import Modal from "@/lib/ui/modal.tsx";
import Settings from "@/lib/ui/settings/index.tsx";
import UserInput from "@/lib/ui/user_input.tsx";
import { SettingsIcon } from "@/lib/ui/icons.tsx";
import { A11Y } from "@/lib/strings/index.ts";
import { Unit } from "@/lib/units.ts";
import { CONVERSIONS, ConversionConfig } from "@/lib/conversions/config.tsx";
import { newConversionStateManager } from "@/lib/state/conversion_state.ts";
import { lastInputState } from "@/lib/last_input.ts";

type AppProps = {
  conversions?: ConversionConfig[];
};

export function App({ conversions = CONVERSIONS }: AppProps = {}): Node {
  const lastInput = lastInputState.get();
  const { inputState, unitState, conversionStates } =
    newConversionStateManager(conversions, lastInput.amount, lastInput.unit);

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
          title={A11Y.titles.settings}
          aria-label={A11Y.buttons.openSettings}
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

        {conversions.map((config) => (
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
