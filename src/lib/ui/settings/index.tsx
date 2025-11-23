import {
  createDomElement,
  createDomFragment,
  createRef,
} from "@pkg/just-jsx/src/index.ts";
import { newSimpleState } from "@pkg/simple-state/src/index.ts";
import { registerHotkeyHandler } from "@/lib/hotkey_manager.ts";
import { CloseIcon } from "@/lib/ui/icons.tsx";
import { UI, A11Y } from "@/lib/strings/index.ts";
import SettingsForm from "./SettingsForm.tsx";

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

  const errorState = newSimpleState<string | null>(null);

  function openModal(): void {
    if (panelRef.current && formRef.current && backdropRef.current) {
      // Clear any previous errors
      errorState.set(null);

      // Load current config values into form
      if ((formRef as any).loadCurrentConfig) {
        (formRef as any).loadCurrentConfig();
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

  // Global Escape listener to close panel
  const handleGlobalEscape: (e: KeyboardEvent) => void =
    function handleGlobalEscape(e: KeyboardEvent): void {
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
    registerHotkeyHandler(hotkey, openModal, "ctrl");
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
        role="presentation"
        aria-hidden="true"
      />

      {/* Side Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-title"
        class="fixed right-0 top-0 z-50 h-screen w-full sm:w-96 flex flex-col border-l border-app-green-600 dark:border-app-green-700 bg-app-black dark:bg-app-green-900 shadow-2xl transform transition-transform duration-300"
        style={{ transform: "translateX(100%)" }}
      >
        {/* Header */}
        <div class="border-b border-app-green-600 dark:border-app-green-700 px-6 py-4 bg-app-green-900/20 dark:bg-transparent">
          <div class="flex items-start justify-between">
            <div>
              <h2 id="settings-title" class="text-lg font-bold text-white dark:text-app-gray-300">
                {UI.sections.settings}
              </h2>
              <div class="mt-1 text-sm text-app-gray-200">
                {UI.settings.subtitle}
              </div>
            </div>
            <button
              type="button"
              class="cursor-pointer rounded p-1 text-app-gray-200 transition-colors hover:bg-app-green-700 hover:text-white"
              onClick={function handleCloseClick(): void {
                closeModal();
              }}
              aria-label={A11Y.buttons.closePanel}
            >
              <CloseIcon />
            </button>
          </div>
        </div>

        {/* Form Body */}
        <SettingsForm
          formRef={formRef}
          errorState={errorState}
          onClose={closeModal}
        />
      </div>
    </>
  );
}
