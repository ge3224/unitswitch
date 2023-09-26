import { Unit } from "@/units";
import React, { useEffect, useRef } from "react";

/**
 * Modal component for inputting values and units.
 *
 * @param props - Props for the Modal component.
 * @param props.type - The intial type of unit held in state.
 * @param props.callback - A callback function to handle user input.
 * @param props.hotkey - The hotkey combination to trigger the Modal.
 */
export default function Modal({
  type,
  callback,
  hotkey,
}: {
  type: Unit;
  callback: Function;
  hotkey: string;
}) {
  const modal = useRef<HTMLDivElement | null>(null);
  const input = useRef<HTMLInputElement | null>(null);

  /**
   * Event handler for the hotkey combination to open the Modal.
   *
   * @param e - The keyboard event.
   */
  const hotkeyHandler = (e: KeyboardEvent) => {
    if (e.key === hotkey && e.ctrlKey === true) {
      e.preventDefault();
      e.stopPropagation();
      const inputRef = input.current;
      if (inputRef) {
        inputRef.value = "";
        modal.current?.classList.remove("hidden");
        inputRef.focus();
      }
    }

    if (e.key === "Escape") {
      e.preventDefault();
      e.stopPropagation();
      modal.current?.classList.add("hidden");
    }
  };

  // Add and remove event listeners when the component mounts/unmounts
  useEffect(() => {
    document.addEventListener("keydown", hotkeyHandler);

    return () => {
      document.removeEventListener("keydown", hotkeyHandler);
    };
  }, []);

  const closeHandler = () => {
    modal.current?.classList.add("hidden");
  };

  /**
   * Event handler for form submission.
   *
   * @param e - The form submission event.
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputValue = input.current?.value;

    if (inputValue === undefined) {
      // Handle the case where input.current is undefined
      return;
    }

    const split = inputValue.split(":");
    const num = parseFloat(split[0]);
    if (Number.isNaN(num)) {
      closeHandler();
      return;
    }

    const unitSet = new Set(Object.values(Unit).map((u) => u.toLowerCase()));
    const unit = split[1].toLowerCase();

    if (unitSet.has(unit)) {
      const u = unit.charAt(0).toUpperCase() + unit.slice(1);
      callback(num, u);
    } else {
      callback(num, type);
    }

    closeHandler();
  };

  return (
    <div
      ref={modal}
      className="absolute left-0 top-0 z-10 hidden h-screen w-full bg-app-black/70"
    >
      <div className="fixed inset-x-1/3 top-1/4 rounded-md border border-app-green-600 bg-app-black p-6 shadow-lg shadow-app-black">
        <form onSubmit={handleSubmit}>
          <label className="font-space font-bold text-white">
            Enter a Unit and a Value,{" "}
            <span className="text-app-green-400">
              <code>value:unit</code>
            </span>
          </label>
          <br />
          <input
            ref={input}
            className="rounded-sm bg-app-gray-100"
            type="text"
            name="name"
          />
          <input
            className="font-space ml-3 mt-3 cursor-pointer rounded-sm border-app-green-200 bg-app-green-300 px-3"
            type="submit"
            value="Submit"
          />
        </form>
        <div
          className="font-space absolute right-3 top-3 cursor-pointer font-bold text-app-gray-200"
          onClick={closeHandler}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 8L40 40"
              className="stroke-app-green-500"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8 40L40 8"
              className="stroke-app-green-500"
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
