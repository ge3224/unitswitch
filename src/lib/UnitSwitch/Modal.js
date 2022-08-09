import { useEffect, useRef } from "react";
import { units } from "./units";

export default function Modal({ initialUnit, callback, hotkey }) {
  const modal = useRef();
  const input = useRef();

  const hotkeyHandler = (e) => {
    if (e.key === hotkey && e.ctrlKey === true) {
      e.preventDefault();
      e.stopPropagation();
      input.current.value = "";
      modal.current.classList.remove("hidden");
      input.current.focus();
    }

    if (e.key === "Escape") {
      e.preventDefault();
      e.stopPropagation();
      modal.current.classList.add("hidden");
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', hotkeyHandler);

    return () => {
      document.removeEventListener("keydown", hotkeyHandler);
    }
  })

  const closeHandler = () => {
    modal.current.classList.add("hidden");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const split = input.current.value.split(":");
    const num = parseFloat(split[0]);
    if (Number.isNaN(num)) {
      closeHandler();
      return
    }

    const unitSet = new Set(Object.values(units));
    const unit = split[1];

    if (unitSet.has(unit)) {
      callback(num, unit);
    } else {
      callback(num, initialUnit);
    }

    closeHandler();
  }

  return (
    <div ref={modal} className="absolute z-10 top-0 left-0 w-full h-screen hidden bg-black/70">
      <div className="fixed inset-x-1/3 top-1/4 bg-black p-6 rounded-md border border-green-600 shadow-lg shadow-black">
        <form onSubmit={handleSubmit}>
          <label className="text-white font-bold">Enter a Unit and a Value, <span className="text-green-400"><code>value:unit</code></span></label><br />
          <input ref={input} className="bg-gray-100 rounded-sm" type="text" name="name" />
          <input className="ml-3 mt-3 px-3 bg-green-300 border-green-200 rounded-sm cursor-pointer" type="submit" value="Submit" />
        </form>
        <div className="absolute right-3 top-3 text-gray-200 font-bold cursor-pointer" onClick={closeHandler}>
          <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8 8L40 40"
              className="stroke-green-500"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8 40L40 8"
              className="stroke-green-500"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div >
  )
}
