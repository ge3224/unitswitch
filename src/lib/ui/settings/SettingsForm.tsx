import { createDomElement, createRef } from "@pkg/just-jsx/src/index.ts";
import type { Ref } from "@pkg/just-jsx/src/index.ts";
import type { SimpleState } from "@pkg/simple-state/src/index.ts";
import { configState, DEFAULT_CONFIG, resetConfig } from "@/lib/config.ts";
import type { AppConfig, ThemePreference } from "@/lib/config.ts";
import {
  validateViewportWidth,
  validateViewportHeight,
  validateFontSize,
  validatePpi,
  validateChToEmRatio,
  validateExToEmRatio,
} from "@/lib/validation.ts";
import { UI } from "@/lib/strings/index.ts";
import SettingsField from "./SettingsField.tsx";
import ThemeSelector from "./ThemeSelector.tsx";

type SettingsFormProps = {
  formRef: Ref<HTMLFormElement>;
  errorState: SimpleState<string | null>;
  onClose: () => void;
};

export default function SettingsForm({
  formRef,
  errorState,
  onClose,
}: SettingsFormProps) {
  const viewportWidthRef = createRef<HTMLInputElement>();
  const viewportHeightRef = createRef<HTMLInputElement>();
  const fontSizeRef = createRef<HTMLInputElement>();
  const ppiRef = createRef<HTMLInputElement>();
  const chToEmRatioRef = createRef<HTMLInputElement>();
  const exToEmRatioRef = createRef<HTMLInputElement>();
  const themeRefs = {
    light: createRef<HTMLInputElement>(),
    dark: createRef<HTMLInputElement>(),
    system: createRef<HTMLInputElement>(),
  };

  function loadCurrentConfig(): void {
    const config = configState.get();
    if (viewportWidthRef.current) {
      viewportWidthRef.current.value = config.viewportWidth.toString();
    }
    if (viewportHeightRef.current) {
      viewportHeightRef.current.value = config.viewportHeight.toString();
    }
    if (fontSizeRef.current) {
      fontSizeRef.current.value = config.fontSize.toString();
    }
    if (ppiRef.current) ppiRef.current.value = config.ppi.toString();
    if (chToEmRatioRef.current) {
      chToEmRatioRef.current.value = config.chToEmRatio.toString();
    }
    if (exToEmRatioRef.current) {
      exToEmRatioRef.current.value = config.exToEmRatio.toString();
    }
    // Set theme radio button
    const themeRef = themeRefs[config.theme];
    if (themeRef.current) {
      themeRef.current.checked = true;
    }
  }

  // Expose loadCurrentConfig for parent component
  (formRef as any).loadCurrentConfig = loadCurrentConfig;

  function onSubmit(e: Event): void {
    e.preventDefault();

    // Clear any previous error
    errorState.set(null);

    // Get selected theme
    let selectedTheme: ThemePreference = "system";
    if (themeRefs.light.current?.checked) selectedTheme = "light";
    else if (themeRefs.dark.current?.checked) selectedTheme = "dark";
    else if (themeRefs.system.current?.checked) selectedTheme = "system";

    // Parse input values
    const viewportWidth = parseFloat(viewportWidthRef.current?.value || "1920");
    const viewportHeight = parseFloat(
      viewportHeightRef.current?.value || "1080"
    );
    const fontSize = parseFloat(fontSizeRef.current?.value || "16");
    const ppi = parseFloat(ppiRef.current?.value || "96");
    const chToEmRatio = parseFloat(chToEmRatioRef.current?.value || "0.5");
    const exToEmRatio = parseFloat(exToEmRatioRef.current?.value || "0.5");

    // Validate all inputs
    const validations = [
      validateViewportWidth(viewportWidth),
      validateViewportHeight(viewportHeight),
      validateFontSize(fontSize),
      validatePpi(ppi),
      validateChToEmRatio(chToEmRatio),
      validateExToEmRatio(exToEmRatio),
    ];

    // Check for first error
    for (const result of validations) {
      if (!result.ok) {
        errorState.set(result.error.message);
        return;
      }
    }

    // All validations passed, save config
    const newConfig: AppConfig = {
      viewportWidth,
      viewportHeight,
      fontSize,
      ppi,
      chToEmRatio,
      exToEmRatio,
      theme: selectedTheme,
    };

    configState.set(newConfig);
    onClose();
  }

  function onReset(): void {
    resetConfig();
    onClose();
  }

  return (
    <form
      ref={formRef}
      onsubmit={function handleFormSubmit(e: Event): void {
        onSubmit(e);
      }}
      class="flex flex-col h-full"
    >
      <div class="px-6 py-4 space-y-4 flex-1 overflow-y-auto">
        {/* Error Message */}
        {errorState.get() && (
          <div
            class="rounded-sm border border-red-600 bg-red-900/20 px-3 py-2 text-sm text-red-400"
            role="alert"
          >
            {errorState.get()}
          </div>
        )}

        {/* Theme Section */}
        <ThemeSelector themeRefs={themeRefs} />

        {/* Viewport Section */}
        <div class="space-y-3">
          <h3 class="text-sm font-semibold text-app-green-400">
            {UI.sections.viewport}
          </h3>
          <div class="grid grid-cols-2 gap-3">
            <SettingsField
              id="viewport-width"
              label={UI.settings.viewport.width}
              type="number"
              min="1"
              max="7680"
              step="1"
              placeholder={DEFAULT_CONFIG.viewportWidth.toString()}
              inputRef={viewportWidthRef}
            />
            <SettingsField
              id="viewport-height"
              label={UI.settings.viewport.height}
              type="number"
              min="1"
              max="4320"
              step="1"
              placeholder={DEFAULT_CONFIG.viewportHeight.toString()}
              inputRef={viewportHeightRef}
            />
          </div>
        </div>

        {/* Font Section */}
        <div class="space-y-3">
          <h3 class="text-sm font-semibold text-app-green-400">{UI.sections.font}</h3>
          <SettingsField
            id="font-size"
            label={UI.settings.font.baseFontSize}
            type="number"
            min="1"
            max="500"
            step="0.1"
            placeholder={DEFAULT_CONFIG.fontSize.toString()}
            inputRef={fontSizeRef}
          />
          <div class="grid grid-cols-2 gap-3">
            <SettingsField
              id="ch-em-ratio"
              label={UI.settings.font.chEmRatio}
              type="number"
              min="0.01"
              max="1"
              step="0.01"
              placeholder={DEFAULT_CONFIG.chToEmRatio.toString()}
              inputRef={chToEmRatioRef}
            />
            <SettingsField
              id="ex-em-ratio"
              label={UI.settings.font.exEmRatio}
              type="number"
              min="0.01"
              max="1"
              step="0.01"
              placeholder={DEFAULT_CONFIG.exToEmRatio.toString()}
              inputRef={exToEmRatioRef}
            />
          </div>
        </div>

        {/* Screen Resolution */}
        <div class="space-y-3">
          <h3 class="text-sm font-semibold text-app-green-400">
            {UI.sections.display}
          </h3>
          <SettingsField
            id="ppi"
            label={UI.settings.display.ppi}
            type="number"
            min="1"
            max="800"
            step="1"
            placeholder={DEFAULT_CONFIG.ppi.toString()}
            inputRef={ppiRef}
          />
        </div>
      </div>

      {/* Footer */}
      <div class="flex items-center justify-between border-t border-app-green-600 dark:border-app-green-700 px-6 py-4 bg-app-green-900/20 dark:bg-transparent">
        <button
          type="button"
          class="cursor-pointer rounded-sm border border-app-green-600/50 bg-transparent px-3 py-1.5 text-sm text-app-gray-200 transition-colors hover:bg-app-green-700 hover:text-white"
          onClick={function handleResetClick(): void {
            onReset();
          }}
        >
          {UI.buttons.resetToDefaults}
        </button>
        <div class="flex gap-2">
          <button
            type="button"
            class="cursor-pointer rounded-sm border border-app-green-600/50 bg-transparent px-3 py-1.5 text-sm text-app-gray-200 transition-colors hover:bg-app-green-700 hover:text-white"
            onClick={function handleCancelClick(): void {
              onClose();
            }}
          >
            {UI.buttons.cancel}
          </button>
          <button
            type="submit"
            class="cursor-pointer rounded-sm border border-app-green-200 dark:border-app-green-400 bg-app-green-300 dark:bg-app-green-600 px-3 py-1.5 text-sm font-medium text-app-black dark:text-white transition-colors hover:bg-app-green-400"
          >
            {UI.buttons.save}
          </button>
        </div>
      </div>
    </form>
  );
}
