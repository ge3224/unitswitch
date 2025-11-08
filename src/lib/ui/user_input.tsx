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
      class="col-span-5 mb-0 mt-1 h-4 text-xs text-pink-500"
      id="amount-error"
    >
      {warningState.get()}
    </div>
  ) as HTMLDivElement;

  warningState.subscribe((newValue) => {
    warningDiv.textContent = newValue;
  });

  // Subscribe to parent state changes (e.g., from modal)
  input.subscribe((newInput: number) => {
    const newValue = newInput.toString();
    amountState.set(newValue);
    if (amountInput.current) {
      amountInput.current.value = newValue;
    }
  });

  type.subscribe((newType: Unit) => {
    unitState.set(newType);
    if (unitSelect.current) {
      unitSelect.current.value = newType;
    }
  });

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
    <div class="mx-auto mt-6 flex max-w-sm flex-col justify-center md:w-96 lg:ml-10 lg:mt-0">
      <form class="grid grid-cols-5 items-center gap-2" onsubmit={onSubmit}>
        <fieldset class="col-span-3">
          <label class="text-sm" htmlFor="unit_amount">
            Amount:
          </label>
          <input
            ref={amountInput}
            class="focus:ring-app-teal-500 w-full rounded-sm border border-app-green-600 bg-app-green-100 px-1.5 py-1 font-bold text-app-green-500 focus:outline-none focus:ring"
            id="unit_amount"
            type="text"
            onchange={onChangeAmount}
            value={amountState.get()}
            aria-label="Amount"
            aria-describedby="amount-error"
          />
        </fieldset>
        <fieldset class="col-span-2">
          <label class="col-span-2 text-sm" htmlFor="unit_select">
            Unit:
          </label>
          <select
            ref={unitSelect}
            class="focus:ring-app-teal-500 w-full rounded-sm border border-app-green-600 bg-app-gray-50 px-0.5 py-1 text-app-black focus:outline-none focus:ring"
            id="unit_select"
            name="units"
            onchange={onChangeUnit}
            value={unitState.get().toString()}
            aria-label="Unit"
          >
            {Object.values(Units).map((unit, index) => (
              <option key={index} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </fieldset>
        <fieldset class="col-span-5">
          <input
            class="w-1/3 cursor-pointer rounded-sm bg-app-black p-1 font-bold text-white shadow transition delay-150 duration-300 ease-in-out hover:bg-app-green-500 hover:bg-none focus:outline-none focus:ring focus:ring-app-green-200 active:bg-cyan-800 active:transition-none"
            type="submit"
            value="Convert"
          />
        </fieldset>
        {warningDiv}
      </form>
      <div
        class="absolute bottom-4 right-4 hidden h-fit w-fit cursor-default items-center rounded-sm border border-app-gray-200 py-0.5 pl-0.5 pr-1 text-xs text-app-gray-200 hover:border-app-green-400 hover:text-app-green-400 lg:flex"
        title="Press Ctrl-K for quick keyboard conversions."
      >
        Ctrl-K
      </div>
    </div>
  );
}
