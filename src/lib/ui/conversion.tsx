import { createDomElement, createDomFragment } from "@pkg/just-jsx";
import { Unit } from "@lib/units";
import { Converter } from "@lib/converter";
import { newSimpleState, SimpleState } from "@pkg/simple-state";

export default function Conversion({
  input,
  to,
  from,
  hotkey,
  converter,
  detail,
}: {
  input: SimpleState<number>;
  to: Unit;
  from: SimpleState<Unit>;
  hotkey: string;
  converter: Converter;
  detail?: Node;
}) {
  const _params = newSimpleState<{ input: number; from: Unit }>({ input: input.get(), from: from.get() });

  input.subscribe(function(newValue): void {
    _params.set({ ..._params.get(), input: newValue });
  });

  from.subscribe(function(newValue): void {
    _params.set({ ..._params.get(), from: newValue });
  });

  const _conversion = newSimpleState<number>(converter(_params.get().from, _params.get().input));

  _params.subscribe(function(params): void {
    _conversion.set(converter(params.from, params.input));
  });

  const _showDetail = newSimpleState<boolean>(false);

  function _copyToClipboard(): void {
    navigator.clipboard.writeText(_conversion.get().toString()).catch((err) => {
      console.warn("Failed to copy to clipboard:", err);
    });
  }

  function _onClickCopyIcon(e: Event): void {
    e.preventDefault();

    _copyToClipboard();

    const target = e.currentTarget as HTMLSpanElement;

    target.style.opacity = "0.4";
    setTimeout(function copyIconTimerCallback() {
      target.style.opacity = "1";
    }, 500);
  }

  const copyIcon = (
    <span class="mr-2 cursor-pointer" title="Click to copy the converted value to the clipboard" onclick={_onClickCopyIcon}>
      <svg
        class="inline"
        width="21"
        height="21"
        viewBox="0 0 21 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5 4.7158V2.40625C5 1.6296 5.6296 1 6.40625 1H18.5938C19.3704 1 20 1.6296 20 2.40625V14.5938C20 15.3704 19.3704 16 18.5938 16H16.2582"
          class="stroke-app-green-200"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.5938 5H2.40625C1.6296 5 1 5.6296 1 6.40625V18.5938C1 19.3704 1.6296 20 2.40625 20H14.5938C15.3704 20 16 19.3704 16 18.5938V6.40625C16 5.6296 15.3704 5 14.5938 5Z"
          class="stroke-app-green-200"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  ) as HTMLSpanElement;

  const resultValue = document.createTextNode(_conversion.get().toString());

  const resultDiv = (
    <div
      class="w-32 border-l border-r border-app-green-600 bg-app-green-100 px-3 py-2 text-sm font-bold text-app-green-500 lg:flex lg:items-center lg:border-l-0 lg:text-base"
      id={`to-${to.toString()}`}
    >
      {copyIcon}
      {resultValue}
    </div>
  ) as HTMLDivElement;

  _conversion.subscribe(function(newValue): void {
    resultValue.textContent = newValue.toString();
  });

  let _hotkeyTimerID: number | null = null;

  const hotkeyClassNames = ["ring-2", "ring-app-purple-400", "ring-inset"];

  window.addEventListener("keydown", function handleHotKeyDown(e: KeyboardEvent): void {
    if (e.ctrlKey === true && e.key === hotkey) {
      e.preventDefault();

      _copyToClipboard();

      resultDiv.classList.add(...hotkeyClassNames);

      if (_hotkeyTimerID !== null) {
        clearTimeout(_hotkeyTimerID);
      }

      _hotkeyTimerID = window.setTimeout(function hotkeyTimerCallback() {
        resultDiv.classList.remove(...hotkeyClassNames);
        _hotkeyTimerID = null;
      }, 500);
    }
  });

  const plusIcon = (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 7H14"
        className="stroke-app-green-500"
        strokeWidth="3"
      />
      <path
        d="M7 0L7 14"
        className="stroke-app-green-500"
        strokeWidth="3"
      />
    </svg>
  ) as SVGElement;


  const minusIcon = (
    <svg
      className="hidden"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 7H14"
        className="stroke-app-green-500"
        strokeWidth="3"
      />
    </svg>
  ) as SVGElement;

  const detailsDiv = (
    <div
      className="hidden border-b border-app-green-600 p-3 lg:block lg:border-x lg:text-sm"
    >
      {detail}
    </div>
  ) as HTMLDivElement;

  const detailClassNames = "hidden";
  _showDetail.subscribe(function detailsSubscriber(show): void {

    if (show) {
      detailsDiv.classList.remove(detailClassNames);
      minusIcon.classList.remove(detailClassNames);
      plusIcon.classList.add(detailClassNames);
    } else {
      detailsDiv.classList.add(detailClassNames);
      minusIcon.classList.add(detailClassNames);
      plusIcon.classList.remove(detailClassNames);
    }
  });

  function _onClickDetails(e: Event): void {
    e.preventDefault();
    _showDetail.set(!_showDetail.get());
  }

  const buttonDetail = (
    <div class="flex w-6 justify-center" onclick={_onClickDetails}>
      {plusIcon}
      {minusIcon}
    </div>
  ) as HTMLDivElement;

  return (
    <div>
      <div class="flex items-center border-b border-app-green-600 lg:h-12 lg:items-stretch lg:border">
        <div class="mx-2 lg:my-auto lg:hidden">
          {detail ? (
            <>{buttonDetail}</>
          ) : (
            <div class="flex w-6 justify-center">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 7H14"
                  class="stroke-app-gray-100"
                  strokeWidth="3"
                />
                <path
                  d="M7 0L7 14"
                  class="stroke-app-gray-100"
                  strokeWidth="3"
                />
              </svg>
            </div>
          )}
        </div>
        {resultDiv}
        <div className="ml-2 mr-auto font-bold text-app-black lg:my-auto">
          {to.toString()}
        </div>
        {hotkey && (
          <div class="hidden rounded-sm border border-app-gray-200 p-0.5 text-xs text-app-gray-200 cursor-default hover:border-app-green-400 hover:text-app-green-400 lg:my-auto lg:mr-4 lg:block">
            <span
              title={
                "Press Ctrl-" +
                hotkey.toUpperCase() +
                " to copy the converted value to the clipboard"
              }
            >
              {"Ctrl-" + hotkey.toUpperCase()}
            </span>
          </div>
        )}
      </div>
      {detail && (
        <>{detailsDiv}</>
      )}
    </div>
  );
}
