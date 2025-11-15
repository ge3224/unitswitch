import { Unit } from "@/lib/units.ts";
import { ViewInputState } from "@/lib/types.ts";
import { createDomElement, createRef } from "@pkg/just-jsx/src/index.ts";
import { hotkeyManager } from "@/lib/hotkey_manager.ts";
import { newSimpleState } from "@pkg/simple-state/src/index.ts";
import { renderConversion as renderConversionValue } from "@/lib/render.ts";
import { toast } from "@/lib/ui/toast.tsx";
import {
  CopyIconSvg,
  GrayPlusIcon,
  MinusIcon,
  PlusIcon,
} from "@/lib/ui/icons.tsx";

const ANIMATION_DURATION_MS = 500;
const HOTKEY_RING_SHADOW = "inset 0 0 0 2px var(--color-app-purple-400)";
const DISPLAY_BLOCK = "block";
const DISPLAY_INLINE_BLOCK = "inline-block";
const DISPLAY_NONE = "none";
const EMPTY_STRING = "";

export default function Conversion({
  conversion,
  to,
  hotkey,
  detail,
}: {
  conversion: ViewInputState<number>;
  to: Unit;
  hotkey: string;
  detail?: JSX.Element;
}) {
  const showDetailState = newSimpleState<boolean>(false);

  const conversionValueRef = createRef<HTMLSpanElement>();
  const detailsPanelRef = createRef<HTMLDivElement>();
  const minusIconRef = createRef<SVGElement>();
  const plusIconRef = createRef<SVGElement>();

  let timerId: number | null = null;

  conversion.subscribe(
    function updateConversionValue(newConversionValue: number): void {
      if (conversionValueRef.current) {
        conversionValueRef.current.textContent = renderConversionValue(
          newConversionValue,
        );
      }
    },
  );

  showDetailState.subscribe(function toggleDetailsPanel(show): void {
    if (detailsPanelRef.current) {
      detailsPanelRef.current.style.display = show
        ? DISPLAY_BLOCK
        : DISPLAY_NONE;
    }

    if (minusIconRef.current) {
      minusIconRef.current.style.display = show
        ? DISPLAY_INLINE_BLOCK
        : DISPLAY_NONE;
    }

    if (plusIconRef.current) {
      plusIconRef.current.style.display = show
        ? DISPLAY_NONE
        : DISPLAY_INLINE_BLOCK;
    }
  });

  function copyToClipboard(): void {
    const handleCopySuccess: () => void = function handleCopySuccess(): void {
      toast.success("Copied!");
    };
    const handleCopyError: (err: Error) => void = function handleCopyError(err: Error): void {
      console.warn("Failed to copy to clipboard:", err);
      toast.error("Failed to copy to clipboard");
    };
    navigator.clipboard.writeText(conversion.get().toString())
      .then(handleCopySuccess)
      .catch(handleCopyError);
  }

  function onClickCopyButton(e: Event): void {
    e.preventDefault();

    copyToClipboard();

    const target = e.currentTarget as HTMLSpanElement;

    target.style.opacity = "0.4";
    setTimeout(function restoreCopyIconOpacity() {
      target.style.opacity = "1";
    }, ANIMATION_DURATION_MS);
  }

  function registerCopyHotkey(element: HTMLDivElement) {
    hotkeyManager.register(hotkey, function onKeyDownCopyHotkey() {
      copyToClipboard();

      element.style.boxShadow = HOTKEY_RING_SHADOW;

      if (timerId !== null) {
        clearTimeout(timerId);
      }

      timerId = setTimeout(function removeHotkeyHighlight() {
        element.style.boxShadow = EMPTY_STRING;
        timerId = null;
      }, ANIMATION_DURATION_MS);
    });
  }

  function handleResultDivRef(element: HTMLDivElement | null): void {
    if (element) {
      registerCopyHotkey(element);
    }
  }

  function onClickDetails(e: Event): void {
    e.preventDefault();
    showDetailState.set(!showDetailState.get());
  }

  return (
    <div>
      <div class="flex items-center border-b border-app-green-600 dark:border-app-green-700 lg:h-10 lg:items-stretch lg:border">
        <div class="mx-2 lg:my-auto lg:hidden">
          {detail
            ? (
              <div class="flex w-6 justify-center" onclick={function handleDetailsClick(e: Event): void {
                onClickDetails(e);
              }}>
                <PlusIcon ref={plusIconRef} />
                <MinusIcon ref={minusIconRef} />
              </div>
            )
            : (
              <div class="flex w-6 justify-center">
                <GrayPlusIcon />
              </div>
            )}
        </div>
        <div
          ref={handleResultDivRef}
          class="w-32 border-l border-r border-app-green-600 dark:border-app-green-700 bg-app-green-100 dark:bg-app-green-800 px-2.5 py-1.5 text-sm font-bold text-app-green-500 dark:text-app-green-300 lg:flex lg:items-center lg:border-l-0 lg:text-base"
          id={`to-${to.toString()}`}
        >
          <span
            class="mr-2 cursor-pointer"
            title="Click to copy the converted value to the clipboard"
            onclick={function handleCopyClick(e: Event): void {
              onClickCopyButton(e);
            }}
          >
            <CopyIconSvg />
          </span>
          <span ref={conversionValueRef}>
            {renderConversionValue(conversion.get())}
          </span>
        </div>
        <div class="ml-2 mr-auto font-bold text-app-black dark:text-app-black lg:my-auto text-sm lg:text-base">
          {to.toString()}
        </div>
        {hotkey && (
          <kbd
            class="hidden lg:inline-flex lg:my-auto lg:mr-3 items-center justify-center w-5 h-5 rounded-sm border border-app-gray-200 dark:border-app-gray-300 bg-white dark:bg-app-gray-800 shadow-sm font-mono text-xs text-app-gray-200 dark:text-app-gray-300 cursor-default hover:border-app-green-400 hover:text-app-green-400 scale-[0.85] origin-right"
            title={`Press ${hotkey} to copy the converted value to the clipboard`}
          >
            {hotkey}
          </kbd>
        )}
      </div>
      {detail &&
        (
          <div
            ref={detailsPanelRef}
            class="hidden border-b border-app-green-600 dark:border-app-green-700 p-2.5 lg:block lg:border-x lg:text-xs dark:text-app-gray-200"
          >
            {detail}
          </div>
        )}
    </div>
  );
}
