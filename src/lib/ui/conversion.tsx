import { Unit } from "@/lib/units.ts";
import { ViewInputState } from "@/lib/types.ts";
import { createDomElement, createRef } from "@pkg/just-jsx/src/index.ts";
import { hotkeyManager } from "@/lib/hotkey-manager.ts";
import { newSimpleState } from "@pkg/simple-state/src/index.ts";
import { renderConversion } from "@/lib/render.ts";
import {
  CopyIconSvg,
  GrayPlusIcon,
  MinusIcon,
  PlusIcon,
} from "@/lib/ui/icons.tsx";

const ANIMATION_DURATION_MS = 500;
const HIDDEN_CLASS = "hidden";
const HOTKEY_HIGHLIGHT_CLASSES = [
  "ring-2",
  "ring-app-purple-400",
  "ring-inset",
];

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

  const detailsPanel = createRef<HTMLDivElement>();
  const minusIcon = createRef<SVGElement>();
  const plusIcon = createRef<SVGElement>();
  const valueElement = createRef<HTMLSpanElement>();

  let timerId: number | null = null;

  conversion.subscribe(
    function conversionCallback(newConversion: number): void {
      if (valueElement.current) {
        valueElement.current.textContent = renderConversion(newConversion);
      }
    },
  );

  showDetailState.subscribe(function detailsSubscriber(show): void {
    detailsPanel.current?.classList.toggle(HIDDEN_CLASS, !show);
    minusIcon.current?.classList.toggle(HIDDEN_CLASS, !show);
    plusIcon.current?.classList.toggle(HIDDEN_CLASS, show);
  });

  function copyToClipboard(): void {
    navigator.clipboard.writeText(conversion.get().toString()).catch((err) => {
      console.warn("Failed to copy to clipboard:", err);
    });
  }

  function onClickCopyButton(e: Event): void {
    e.preventDefault();

    copyToClipboard();

    const target = e.currentTarget as HTMLSpanElement;

    target.style.opacity = "0.4";
    setTimeout(function copyIconTimerCallback() {
      target.style.opacity = "1";
    }, ANIMATION_DURATION_MS);
  }

  function registerCopyHotkey(element: HTMLDivElement) {
    hotkeyManager.register(hotkey, function hotkeyHandler() {
      copyToClipboard();

      element.classList.add(...HOTKEY_HIGHLIGHT_CLASSES);

      if (timerId !== null) {
        clearTimeout(timerId);
      }

      timerId = setTimeout(function hotkeyTimerCallback() {
        element.classList.remove(...HOTKEY_HIGHLIGHT_CLASSES);
        timerId = null;
      }, ANIMATION_DURATION_MS);
    });
  }

  function resultDivCallback(element: HTMLDivElement | null): void {
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
                <PlusIcon ref={plusIcon} />
                <MinusIcon ref={minusIcon} />
              </div>
            )
            : (
              <div class="flex w-6 justify-center">
                <GrayPlusIcon />
              </div>
            )}
        </div>
        <div
          ref={resultDivCallback}
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
          <span ref={valueElement}>{renderConversion(conversion.get())}</span>
        </div>
        <div class="ml-2 mr-auto font-bold text-app-black lg:my-auto">
          {to.toString()}
        </div>
        {hotkey && (
          <div class="hidden rounded-sm border border-app-gray-200 p-0.5 text-xs text-app-gray-200 cursor-default hover:border-app-green-400 hover:text-app-green-400 lg:my-auto lg:mr-4 lg:block">
            <span
              title={`Press Ctrl-${hotkey.toUpperCase()} to copy the converted value to the clipboard`}
            >
              {`Ctrl-${hotkey.toUpperCase()}`}
            </span>
          </div>
        )}
      </div>
      {detail &&
        (
          <div
            ref={detailsPanel}
            class="hidden border-b border-app-green-600 p-3 lg:block lg:border-x lg:text-sm"
          >
            {detail}
          </div>
        )}
    </div>
  );
}
