import { createDomElement, createRef } from "@pkg/just-jsx/src/index.ts";
import { abbreviations, isUnit, Unit } from "@/lib/units.ts";
import { UserSubmissionCallback, ViewInputState } from "@/lib/types.ts";
import { hotkeyManager } from "../hotkey-manager.ts";

const HIDDEN_CLASS = "hidden";

export default function Modal({
  type,
  callback,
  hotkey,
}: {
  type: ViewInputState<Unit>;
  callback: UserSubmissionCallback;
  hotkey: string;
}) {
  const modal = createRef<HTMLDivElement>();
  const input = createRef<HTMLInputElement>();

  function onClickCloseModal(): void {
    modal.current?.classList.add(HIDDEN_CLASS);
  }

  if (hotkey) {
    hotkeyManager.register(hotkey, function hotkeyHandlerModal() {
      if (input.current) {
        input.current.value = "";
        modal.current?.classList.remove(HIDDEN_CLASS);
        requestAnimationFrame(() => {
          input.current?.focus();
        });
      }
    });

    hotkeyManager.register("Escape", function hotkeyHandlerModalEscape() {
      onClickCloseModal();
    });
  }

  function onSubmitModalForm(e: Event): void {
    e.preventDefault();
    const inputValue = input.current?.value;

    if (inputValue === undefined) {
      return;
    }

    const split = inputValue.split(":");
    const num = parseFloat(split[0]);

    if (Number.isNaN(num)) {
      onClickCloseModal();
      return;
    }

    const unitInput = split[1]?.toLowerCase();

    if (!unitInput) {
      onClickCloseModal();
      return;
    }

    const unit = abbreviations(unitInput);

    if (!unit) {
      onClickCloseModal();
      return;
    }

    callback(num, unit);
    onClickCloseModal();
  }

  return (
    <div
      ref={modal}
      class="absolute left-0 top-0 z-10 hidden h-screen w-full bg-app-black/70"
    >
      <div class="fixed inset-x-1/3 top-1/4 rounded-md border border-app-green-600 bg-app-black p-6 shadow-lg shadow-app-black">
        <form onsubmit={onSubmitModalForm}>
          <label class="font-bold text-white">
            Enter a Unit and a Value,{" "}
            <span class="text-app-green-400">
              <code>value:unit</code>
            </span>
          </label>
          <br />
          <input
            ref={input}
            class="rounded-sm bg-app-gray-100"
            type="text"
            name="name"
            data-testid="modal-input"
          />
          <input
            class="ml-3 mt-3 cursor-pointer rounded-sm border-app-green-200 bg-app-green-300 px-3"
            type="submit"
            value="Submit"
          />
        </form>
        <div
          class="absolute right-3 top-3 cursor-pointer font-bold text-app-gray-200"
          onClick={onClickCloseModal}
        >
          {/* Close icon */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 8L40 40"
              class="stroke-app-green-500"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8 40L40 8"
              class="stroke-app-green-500"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
