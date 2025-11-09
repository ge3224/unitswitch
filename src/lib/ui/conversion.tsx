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
        ? DISPLAY_NONE
        : DISPLAY_INLINE_BLOCK;
    }

    if (plusIconRef.current) {
      plusIconRef.current.style.display = show
        ? DISPLAY_INLINE_BLOCK
        : DISPLAY_NONE;
    }
  });

  function copyToClipboard(): void {
    navigator.clipboard.writeText(conversion.get().toString())
      .then(() => {
        toast.success("Copied!");
      })
      .catch((err) => {
        console.warn("Failed to copy to clipboard:", err);
        toast.error("Failed to copy to clipboard");
      });
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
      <div class="flex items-center border-b border-app-green-600 lg:h-12 lg:items-stretch lg:border">
        <div class="mx-2 lg:my-auto lg:hidden">
          {detail
            ? (
              <div class="flex w-6 justify-center" onclick={onClickDetails}>
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
          class="w-32 border-l border-r border-app-green-600 bg-app-green-100 px-3 py-2 text-sm font-bold text-app-green-500 lg:flex lg:items-center lg:border-l-0 lg:text-base"
          id={`to-${to.toString()}`}
        >
          <span
            class="mr-2 cursor-pointer"
            title="Click to copy the converted value to the clipboard"
            onclick={onClickCopyButton}
          >
            <CopyIconSvg />
          </span>
          <span ref={conversionValueRef}>
            {renderConversionValue(conversion.get())}
          </span>
        </div>
        <div class="ml-2 mr-auto font-bold text-app-black lg:my-auto">
          {to.toString()}
        </div>
        {hotkey && (
          <kbd
            class="hidden lg:my-auto lg:mr-4 lg:inline-flex items-center justify-center w-6 h-6 rounded-sm border border-app-gray-200 bg-white shadow-sm font-mono text-xs text-app-gray-200 cursor-default hover:border-app-green-400 hover:text-app-green-400 scale-[0.85] origin-right"
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
            class="hidden border-b border-app-green-600 p-3 lg:block lg:border-x lg:text-xs"
          >
            {detail}
          </div>
        )}
    </div>
  );
}
