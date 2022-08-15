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

    const unitSet = new Set(Object.values(units).map(u => u.toLowerCase()));
    const unit = split[1].toLowerCase();

    if (unitSet.has(unit)) {
      const u = unit.charAt(0).toUpperCase() + unit.slice(1);
      callback(num, u);
    } else {
      callback(num, initialUnit);
    }

    closeHandler();
  }

  return (
    <div ref={modal} className="absolute z-10 top-0 left-0 w-full h-screen hidden bg-black-usw/70">
      <div className="fixed inset-x-1/3 top-1/4 bg-black-usw p-6 rounded-md border border-green-usw-600 shadow-lg shadow-black-usw">
        <form onSubmit={handleSubmit}>
          <label className="font-space font-bold text-white">Enter a Unit and a Value, <span className="text-green-usw-400"><code>value:unit</code></span></label><br />
          <input ref={input} className="bg-gray-usw-100 rounded-sm" type="text" name="name" />
          <input className="ml-3 mt-3 px-3 bg-green-usw-300 border-green-usw-200 rounded-sm cursor-pointer font-space" type="submit" value="Submit" />
        </form>
        <div className="absolute right-3 top-3 font-space font-bold text-gray-usw-200 cursor-pointer" onClick={closeHandler}>
          <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8 8L40 40"
              className="stroke-green-usw-500"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8 40L40 8"
              className="stroke-green-usw-500"
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
