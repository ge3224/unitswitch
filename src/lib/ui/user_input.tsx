import { createDomElement, createRef } from "@pkg/just-jsx/src/index.ts";
import { newSimpleState } from "@pkg/simple-state/src/index.ts";
import { isUnit, Unit, Units } from "@/lib/units.ts";
import { UserSubmissionCallback, ViewInputState } from "@/lib/types.ts";

export default function UserInput({
  input,
  type,
  callback,
}: {
  input: ViewInputState<number>;
  type: ViewInputState<Unit>;
  callback: UserSubmissionCallback;
}) {
  const amountState = newSimpleState<string>(input.get().toString());
  const unitState = newSimpleState<Unit>(type.get());

  const amountInput = createRef<HTMLInputElement>();
  const unitSelect = createRef<HTMLSelectElement>();
  const warningState = newSimpleState<string>("");

  const warningDiv = (
    <div
      class="col-span-5 mb-0 mt-1 h-4 text-xs text-pink-500 dark:text-pink-400"
      id="amount-error"
      role="alert"
      aria-live="polite"
    >
      {warningState.get()}
    </div>
  ) as HTMLDivElement;

  const updateWarningText: (newValue: string) => void = function updateWarningText(newValue: string): void {
    warningDiv.textContent = newValue;
  };
  warningState.subscribe(updateWarningText);

  // Subscribe to parent state changes (e.g., from modal)
  const handleInputChange: (newInput: number) => void = function handleInputChange(newInput: number): void {
    const newValue = newInput.toString();
    amountState.set(newValue);
    if (amountInput.current) {
      amountInput.current.value = newValue;
    }
  };
  input.subscribe(handleInputChange);

  const handleTypeChange: (newType: Unit) => void = function handleTypeChange(newType: Unit): void {
    unitState.set(newType);
    if (unitSelect.current) {
      unitSelect.current.value = newType;
    }
  };
  type.subscribe(handleTypeChange);

  function onChangeAmount(e: Event): void {
    e.preventDefault();
    const target = e.target as HTMLInputElement;
    amountState.set(target.value !== null ? target.value : "");
  }

  function onChangeUnit(e: Event): void {
    e.preventDefault();
    const target = e.target as HTMLSelectElement;
    const text = target.selectedOptions[0].text;
    if (!text || !isUnit(text)) return;
    unitState.set(text as Unit);
  }

  function toggleWarning(show: boolean): void {
    if (show) {
      warningState.set("Please type a number.");
      return;
    }
    warningState.set("");
  }

  function onSubmit(e: Event): void {
    e.preventDefault();
    const num = parseFloat(amountState.get());
    const invalid = Number.isNaN(num);

    toggleWarning(invalid);

    if (!invalid) callback(num, unitState.get());
  }

  return (
    <div class="mx-auto mt-5 flex max-w-sm flex-col justify-center md:w-96 lg:ml-9 lg:mt-0">
      <form class="grid grid-cols-5 items-center gap-2" onsubmit={function handleFormSubmit(e: Event): void {
        onSubmit(e);
      }}>
        <fieldset class="col-span-3">
          <label class="text-sm dark:text-app-green-300" htmlFor="unit_amount">
            Amount:
          </label>
          <input
            ref={amountInput}
            class="focus:ring-app-teal-500 w-full rounded-sm border border-app-green-600 dark:border-app-green-700 bg-app-green-100 dark:bg-app-green-800 px-1.5 py-1 font-bold text-app-green-500 dark:text-app-green-300 focus:outline-none focus:ring"
            id="unit_amount"
            type="text"
            onchange={function handleAmountChange(e: Event): void {
              onChangeAmount(e);
            }}
            value={amountState.get()}
            aria-label="Amount"
            aria-describedby="amount-error"
          />
        </fieldset>
        <fieldset class="col-span-2">
          <label
            class="col-span-2 text-sm dark:text-app-green-300"
            htmlFor="unit_select"
          >
            Unit:
          </label>
          <select
            ref={unitSelect}
            class="focus:ring-app-teal-500 w-full rounded-sm border border-app-green-600 dark:border-app-green-700 bg-app-gray-50 dark:bg-app-gray-700 px-0.5 py-1 text-app-black focus:outline-none focus:ring"
            id="unit_select"
            name="units"
            onchange={function handleUnitChange(e: Event): void {
              onChangeUnit(e);
            }}
            value={unitState.get().toString()}
            aria-label="Unit"
          >
            {Object.values(Units).map(function renderUnitOption(unit: Unit, index: number): JSX.Element {
              return (
                <option key={index} value={unit}>
                  {unit}
                </option>
              );
            })}
          </select>
        </fieldset>
        <fieldset class="col-span-5 flex items-center gap-2">
          <input
            class="w-1/3 cursor-pointer rounded-sm bg-app-black dark:bg-app-green-600 p-1 font-bold text-white shadow transition delay-150 duration-300 ease-in-out hover:bg-app-green-500 dark:hover:bg-app-green-500 hover:bg-none focus:outline-none focus:ring focus:ring-app-green-200 dark:focus:ring-app-green-500 active:bg-cyan-800 dark:active:bg-cyan-700 active:transition-none"
            type="submit"
            value="Convert"
          />
          <div class="hidden lg:flex items-center gap-1 scale-[0.75] origin-left">
            <kbd
              class="inline-flex items-center justify-center px-1.5 h-6 rounded-sm border border-app-gray-200 dark:border-app-gray-300 bg-white dark:bg-app-gray-800 shadow-sm font-mono text-xs text-app-gray-200 dark:text-app-gray-300 cursor-default hover:border-app-green-400 hover:text-app-green-400"
              title="Press Ctrl+K for quick keyboard conversions"
            >
              Ctrl
            </kbd>
            <kbd
              class="inline-flex items-center justify-center w-6 h-6 rounded-sm border border-app-gray-200 dark:border-app-gray-300 bg-white dark:bg-app-gray-800 shadow-sm font-mono text-xs text-app-gray-200 dark:text-app-gray-300 cursor-default hover:border-app-green-400 hover:text-app-green-400"
              title="Press Ctrl+K for quick keyboard conversions"
            >
              K
            </kbd>
          </div>
        </fieldset>
        {warningDiv}
      </form>
    </div>
  );
}
