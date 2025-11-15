import {
  createDomElement,
  createDomFragment,
  createRef,
} from "@pkg/just-jsx/src/index.ts";
import { hotkeyManager } from "@/lib/hotkey_manager.ts";
import { CloseIcon } from "@/lib/ui/icons.tsx";
import { configState, DEFAULT_CONFIG, resetConfig } from "@/lib/config.ts";
import type { AppConfig, ThemePreference } from "@/lib/config.ts";

const DISPLAY_BLOCK = "block";
const DISPLAY_NONE = "none";

type SettingsProps = {
  hotkey: string;
  onMount?: (openFn: () => void) => void;
};

export default function Settings({ hotkey, onMount }: SettingsProps) {
  const panelRef = createRef<HTMLDivElement>();
  const backdropRef = createRef<HTMLDivElement>();
  const formRef = createRef<HTMLFormElement>();

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

  function openModal(): void {
    if (panelRef.current && formRef.current && backdropRef.current) {
      // Load current config values into form
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

      // Show backdrop
      backdropRef.current.style.display = DISPLAY_BLOCK;

      // Slide in panel
      const slideInPanel: () => void = function slideInPanel(): void {
        if (panelRef.current) {
          panelRef.current.style.transform = "translateX(0)";
        }
      };
      requestAnimationFrame(slideInPanel);
    }
  }

  function closeModal(): void {
    if (panelRef.current && backdropRef.current) {
      // Slide out panel
      panelRef.current.style.transform = "translateX(100%)";

      // Hide backdrop after animation
      const hideBackdrop: () => void = function hideBackdrop(): void {
        if (backdropRef.current) {
          backdropRef.current.style.display = DISPLAY_NONE;
        }
      };
      setTimeout(hideBackdrop, 300);
    }
  }

  function onSubmit(e: Event): void {
    e.preventDefault();

    // Get selected theme
    let selectedTheme: ThemePreference = "system";
    if (themeRefs.light.current?.checked) selectedTheme = "light";
    else if (themeRefs.dark.current?.checked) selectedTheme = "dark";
    else if (themeRefs.system.current?.checked) selectedTheme = "system";

    const newConfig: AppConfig = {
      viewportWidth: parseFloat(viewportWidthRef.current?.value || "1920"),
      viewportHeight: parseFloat(viewportHeightRef.current?.value || "1080"),
      fontSize: parseFloat(fontSizeRef.current?.value || "16"),
      ppi: parseFloat(ppiRef.current?.value || "96"),
      chToEmRatio: parseFloat(chToEmRatioRef.current?.value || "0.5"),
      exToEmRatio: parseFloat(exToEmRatioRef.current?.value || "0.5"),
      theme: selectedTheme,
    };

    // Validate all values are positive numbers
    if (
      newConfig.viewportWidth > 0 &&
      newConfig.viewportHeight > 0 &&
      newConfig.fontSize > 0 &&
      newConfig.ppi > 0 &&
      newConfig.chToEmRatio > 0 &&
      newConfig.exToEmRatio > 0
    ) {
      configState.set(newConfig);
      closeModal();
    }
  }

  function onReset(): void {
    resetConfig();
    closeModal();
  }

  // Global Escape listener to close panel
  const handleGlobalEscape: (e: KeyboardEvent) => void = function handleGlobalEscape(e: KeyboardEvent): void {
    if (
      e.key === "Escape" && panelRef.current &&
      panelRef.current.style.transform === "translateX(0px)"
    ) {
      e.preventDefault();
      closeModal();
    }
  };
  globalThis.addEventListener("keydown", handleGlobalEscape);

  // Register hotkey
  if (hotkey) {
    hotkeyManager.register(hotkey, openModal, "ctrl");
  }

  // Call onMount callback with openModal function
  if (onMount) {
    onMount(openModal);
  }

  return (
    <>
      {/* Backdrop */}
      <div
        ref={backdropRef}
        onClick={function handleBackdropClick(): void {
          closeModal();
        }}
        class="fixed left-0 top-0 z-40 h-screen w-full bg-app-black/50 dark:bg-black/70 transition-opacity"
        style={{ display: "none" }}
      />

      {/* Side Panel */}
      <div
        ref={panelRef}
        class="fixed right-0 top-0 z-50 h-screen w-full sm:w-96 flex flex-col border-l border-app-green-600 dark:border-app-green-700 bg-app-black dark:bg-app-green-900 shadow-2xl transform transition-transform duration-300"
        style={{ transform: "translateX(100%)" }}
      >
        {/* Header */}
        <div class="border-b border-app-green-600 dark:border-app-green-700 px-6 py-4 bg-app-green-900/20 dark:bg-transparent">
          <div class="flex items-start justify-between">
            <div>
              <h2 class="text-lg font-bold text-white dark:text-app-gray-300">Settings</h2>
              <div class="mt-1 text-sm text-app-gray-200">
                Configure CSS unit conversion parameters
              </div>
            </div>
            <button
              type="button"
              class="cursor-pointer rounded p-1 text-app-gray-200 transition-colors hover:bg-app-green-700 hover:text-white"
              onClick={function handleCloseClick(): void {
                closeModal();
              }}
              aria-label="Close panel"
            >
              <CloseIcon />
            </button>
          </div>
        </div>

        {/* Body */}
        <form ref={formRef} onsubmit={function handleFormSubmit(e: Event): void {
          onSubmit(e);
        }} class="flex flex-col h-full">
          <div class="px-6 py-4 space-y-4 flex-1 overflow-y-auto">
            {/* Theme Section */}
            <div class="space-y-3">
              <h3 class="text-sm font-semibold text-app-green-400">
                Theme
              </h3>
              <div class="flex gap-2">
                <label class="flex-1 cursor-pointer">
                  <input
                    ref={themeRefs.light}
                    type="radio"
                    name="theme"
                    value="light"
                    class="peer sr-only"
                  />
                  <div class="rounded-sm border border-app-green-600/50 bg-transparent px-3 py-2 text-center text-sm text-app-gray-200 transition-all peer-checked:border-app-green-400 dark:peer-checked:border-app-green-400 peer-checked:bg-app-green-300 dark:peer-checked:bg-app-green-600 peer-checked:text-app-black dark:peer-checked:text-white peer-checked:font-medium hover:bg-app-green-700 hover:text-white">
                    Light
                  </div>
                </label>
                <label class="flex-1 cursor-pointer">
                  <input
                    ref={themeRefs.dark}
                    type="radio"
                    name="theme"
                    value="dark"
                    class="peer sr-only"
                  />
                  <div class="rounded-sm border border-app-green-600/50 bg-transparent px-3 py-2 text-center text-sm text-app-gray-200 transition-all peer-checked:border-app-green-400 dark:peer-checked:border-app-green-400 peer-checked:bg-app-green-300 dark:peer-checked:bg-app-green-600 peer-checked:text-app-black dark:peer-checked:text-white peer-checked:font-medium hover:bg-app-green-700 hover:text-white">
                    Dark
                  </div>
                </label>
                <label class="flex-1 cursor-pointer">
                  <input
                    ref={themeRefs.system}
                    type="radio"
                    name="theme"
                    value="system"
                    class="peer sr-only"
                  />
                  <div class="rounded-sm border border-app-green-600/50 bg-transparent px-3 py-2 text-center text-sm text-app-gray-200 transition-all peer-checked:border-app-green-400 dark:peer-checked:border-app-green-400 peer-checked:bg-app-green-300 dark:peer-checked:bg-app-green-600 peer-checked:text-app-black dark:peer-checked:text-white peer-checked:font-medium hover:bg-app-green-700 hover:text-white">
                    System
                  </div>
                </label>
              </div>
            </div>

            {/* Viewport Section */}
            <div class="space-y-3">
              <h3 class="text-sm font-semibold text-app-green-400">
                Viewport
              </h3>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs text-app-gray-200 mb-1">
                    Width (px)
                  </label>
                  <input
                    ref={viewportWidthRef}
                    type="number"
                    min="1"
                    step="1"
                    class="w-full rounded-sm border border-transparent dark:border-app-green-700 bg-app-gray-100 dark:bg-app-gray-800 dark:text-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-app-green-600"
                    placeholder={DEFAULT_CONFIG.viewportWidth.toString()}
                  />
                </div>
                <div>
                  <label class="block text-xs text-app-gray-200 mb-1">
                    Height (px)
                  </label>
                  <input
                    ref={viewportHeightRef}
                    type="number"
                    min="1"
                    step="1"
                    class="w-full rounded-sm border border-transparent dark:border-app-green-700 bg-app-gray-100 dark:bg-app-gray-800 dark:text-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-app-green-600"
                    placeholder={DEFAULT_CONFIG.viewportHeight.toString()}
                  />
                </div>
              </div>
            </div>

            {/* Font Section */}
            <div class="space-y-3">
              <h3 class="text-sm font-semibold text-app-green-400">Font</h3>
              <div>
                <label class="block text-xs text-app-gray-200 mb-1">
                  Base Font Size (px)
                </label>
                <input
                  ref={fontSizeRef}
                  type="number"
                  min="1"
                  step="0.1"
                  class="w-full rounded-sm border border-transparent dark:border-app-green-700 bg-app-gray-100 dark:bg-app-gray-800 dark:text-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-app-green-600"
                  placeholder={DEFAULT_CONFIG.fontSize.toString()}
                />
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs text-app-gray-200 mb-1">
                    ch/em Ratio
                  </label>
                  <input
                    ref={chToEmRatioRef}
                    type="number"
                    min="0.01"
                    max="1"
                    step="0.01"
                    class="w-full rounded-sm border border-transparent dark:border-app-green-700 bg-app-gray-100 dark:bg-app-gray-800 dark:text-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-app-green-600"
                    placeholder={DEFAULT_CONFIG.chToEmRatio.toString()}
                  />
                </div>
                <div>
                  <label class="block text-xs text-app-gray-200 mb-1">
                    ex/em Ratio
                  </label>
                  <input
                    ref={exToEmRatioRef}
                    type="number"
                    min="0.01"
                    max="1"
                    step="0.01"
                    class="w-full rounded-sm border border-transparent dark:border-app-green-700 bg-app-gray-100 dark:bg-app-gray-800 dark:text-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-app-green-600"
                    placeholder={DEFAULT_CONFIG.exToEmRatio.toString()}
                  />
                </div>
              </div>
            </div>

            {/* Screen Resolution */}
            <div class="space-y-3">
              <h3 class="text-sm font-semibold text-app-green-400">
                Display
              </h3>
              <div>
                <label class="block text-xs text-app-gray-200 mb-1">
                  Pixels Per Inch (PPI)
                </label>
                <input
                  ref={ppiRef}
                  type="number"
                  min="1"
                  step="1"
                  class="w-full rounded-sm border border-transparent dark:border-app-green-700 bg-app-gray-100 dark:bg-app-gray-800 dark:text-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-app-green-600"
                  placeholder={DEFAULT_CONFIG.ppi.toString()}
                />
              </div>
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
              Reset to Defaults
            </button>
            <div class="flex gap-2">
              <button
                type="button"
                class="cursor-pointer rounded-sm border border-app-green-600/50 bg-transparent px-3 py-1.5 text-sm text-app-gray-200 transition-colors hover:bg-app-green-700 hover:text-white"
                onClick={function handleCancelClick(): void {
                  closeModal();
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                class="cursor-pointer rounded-sm border border-app-green-200 dark:border-app-green-400 bg-app-green-300 dark:bg-app-green-600 px-3 py-1.5 text-sm font-medium text-app-black dark:text-white transition-colors hover:bg-app-green-400"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
