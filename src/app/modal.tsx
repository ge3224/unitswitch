import { Unit, abbreviations, isUnit } from "@/units";
import React, { useEffect, useRef } from "react";
import { UserInputCallback } from "./user_input";


/**
 * Modal component for inputting values and units.
 *
 * @param props - Props for the Modal component.
 * @param props.type - The initial type of unit held in state.
 * @param props.callback - A callback function to handle user input.
 * @param props.hotkey - The hotkey combination to trigger the Modal.
 */
export default function Modal({
  type,
  callback,
  hotkey,
}: {
  type: Unit;
  callback: UserInputCallback;
  hotkey: string;
}) {
  // Create refs for the Modal and input elements
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
        // Clear the input value, remove the 'hidden' class to show the Modal,
        // and set focus on the input element.
        inputRef.value = "";
        modal.current?.classList.remove("hidden");
        inputRef.focus();
      }
    }

    if (e.key === "Escape") {
      e.preventDefault();
      e.stopPropagation();
      // Hide the Modal when the Escape key is pressed.
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

  /**
   * Function to handle the closing of the Modal component.
   */
  const closeHandler = () => {
    // Get a reference to the Modal component using the 'modal' ref
    if (modal.current) {
      // Hide the Modal by adding the 'hidden' CSS class
      modal.current.classList.add("hidden");
    }
  };

  /**
   * Event handler for form submission.
   *
   * @param e - The form submission event.
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const inputValue = input.current?.value;

    if (inputValue === undefined) {
      // Handle the case where input.current is undefined
      return;
    }

    const split = inputValue.split(":");
    const num = parseFloat(split[0]);
    if (Number.isNaN(num)) {
      // Close the Modal if the entered value is not a valid number
      closeHandler();
      return;
    }

    const unitInput = split[1].toLowerCase();

    const abbrv = abbreviations(unitInput);
    if (abbrv !== null) {
      // Close the Modal and call the callback function with the parsed values
      closeHandler();
      return callback(num, abbrv);
    }

    const capitalized = unitInput.charAt(0).toUpperCase() + unitInput.slice(1);

    if (!isUnit(capitalized)) {
      // Call the callback function with the parsed values and the default unit type
      callback(num, type);
      // Close the Modal
      closeHandler();
      return;
    }

    // Call the callback function with the parsed values and the capitalized unit type
    callback(num, capitalized as Unit);
    // Close the Modal
    closeHandler();
  };

  return (
    <div
      ref={modal}
      className="absolute left-0 top-0 z-10 hidden h-screen w-full bg-app-black/70"
      data-testid="modal-container"
    >
      {/* Modal content */}
      <div className="fixed inset-x-1/3 top-1/4 rounded-md border border-app-green-600 bg-app-black p-6 shadow-lg shadow-app-black">
        <form onSubmit={handleSubmit}>
          <label className="font-bold text-white">
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
            data-testid="modal-input"
          />
          <input
            className="ml-3 mt-3 cursor-pointer rounded-sm border-app-green-200 bg-app-green-300 px-3"
            type="submit"
            value="Submit"
          />
        </form>
        {/* Close button */}
        <div
          className="absolute right-3 top-3 cursor-pointer font-bold text-app-gray-200"
          onClick={closeHandler}
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

