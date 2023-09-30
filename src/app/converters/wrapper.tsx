import React, { ReactNode, useEffect, useRef } from "react";
import { Unit } from "@/units";
import { Converter } from "@/converters";

/**
 * Wrapper Component
 *
 * This component displays a unit conversion result and provides functionality
 * to copy the result to the clipboard using a hotkey. It can also toggle
 * additional details when children are provided.
 *
 * @param base - The base unit label.
 * @param input - The input value to convert.
 * @param from - The unit to convert from.
 * @param hotkey - The hotkey to trigger clipboard copying.
 * @param callback - A Converter object that provides conversion functionality.
 * @param children - Additional details or content to display when toggled.
 * @returns A React component for displaying unit conversion results.
 */
export default function Wrapper({
  base,
  input,
  from,
  hotkey,
  converter,
  children,
}: {
  base: string;
  input: number;
  from: Unit;
  hotkey: string;
  converter: Converter;
  children?: ReactNode;
}) {
  const conversion = converter.convert(from, input);
  const value = converter.render(conversion);

  const copyIco = useRef<SVGSVGElement | null>(null);

  const icoCopyHandler = () => {
    navigator.clipboard.writeText(conversion.toString());

    const opacity = "opacity-40";
    if (copyIco.current) {
      copyIco.current.classList.add(opacity);
      setTimeout(() => {
        copyIco.current!.classList.remove(opacity);
      }, 500);
    } else {
      console.warn("copyIco Ref is null");
    }
  };
  const resultDiv = useRef<HTMLDivElement | null>(null);

  // This effect runs after the component has mounted.
  const handleHotkey = (e: KeyboardEvent) => {
    if (e.ctrlKey === true && e.key === hotkey) {
      e.preventDefault();
      // Check if resultDiv.current is not null
      if (resultDiv.current) {
        resultDiv.current?.classList.add("ring-2");
        resultDiv.current?.classList.add("ring-app-purple-400");
        resultDiv.current?.classList.add("ring-inset");

        setTimeout(() => {
          // Check again before removing classes
          if (resultDiv.current) {
            resultDiv.current?.classList.remove("ring-2");
            resultDiv.current?.classList.remove("ring-app-purple-400");
            resultDiv.current?.classList.remove("ring-inset");
          }
        }, 500);
      } else {
        console.warn("resultDiv Ref is null");
      }
    }
  };

  useEffect(() => {
    // Add event listener for the hotkey
    window.addEventListener("keydown", handleHotkey);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleHotkey);
    };
  }, []);

  const plus = useRef<SVGSVGElement | null>(null);
  const minus = useRef<SVGSVGElement | null>(null);
  const details = useRef<HTMLDivElement | null>(null);

  const handleToggle = () => {
    if (details.current && !details.current.classList.contains("hidden")) {
      details.current.classList.add("hidden");
      plus.current?.classList.remove("hidden");
      minus.current?.classList.add("hidden");
    } else {
      details.current?.classList.remove("hidden");
      plus.current?.classList.add("hidden");
      minus.current?.classList.remove("hidden");
    }
  };

  const detailsBtn = useRef<HTMLDivElement | null>(null);

  return (
    <div>
      <div className="flex items-center border-b border-app-green-600 lg:h-12 lg:items-stretch lg:border">
        <div className="mx-2 lg:my-auto lg:hidden">
          {children ? (
            <div
              ref={detailsBtn}
              className="flex w-6 justify-center"
              onClick={handleToggle}
            >
              <svg
                ref={plus}
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
              <svg
                ref={minus}
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
            </div>
          ) : (
            <div className="flex w-6 justify-center">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 7H14"
                  className="stroke-app-gray-100"
                  strokeWidth="3"
                />
                <path
                  d="M7 0L7 14"
                  className="stroke-app-gray-100"
                  strokeWidth="3"
                />
              </svg>
            </div>
          )}
        </div>
        <div
          ref={resultDiv}
          className="w-32 border-l border-r border-app-green-600 bg-app-green-100 px-3 py-2 text-sm font-bold text-app-green-500 lg:flex lg:items-center lg:border-l-0 lg:text-base"
          id={base}
        >
          <span
            className="mr-2 cursor-pointer"
            onClick={icoCopyHandler}
            title="Click to copy the converted value to the clipboard"
          >
            <svg
              ref={copyIco}
              className="inline"
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 4.7158V2.40625C5 1.6296 5.6296 1 6.40625 1H18.5938C19.3704 1 20 1.6296 20 2.40625V14.5938C20 15.3704 19.3704 16 18.5938 16H16.2582"
                className="stroke-app-green-200"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14.5938 5H2.40625C1.6296 5 1 5.6296 1 6.40625V18.5938C1 19.3704 1.6296 20 2.40625 20H14.5938C15.3704 20 16 19.3704 16 18.5938V6.40625C16 5.6296 15.3704 5 14.5938 5Z"
                className="stroke-app-green-200"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          {value}
        </div>
        <div className="ml-2 mr-auto font-bold text-app-black lg:my-auto">
          {base}
        </div>
        <div className="hidden rounded-sm border border-app-gray-200 p-0.5 text-xs text-app-gray-200 cursor-default hover:border-app-green-400 hover:text-app-green-400 lg:my-auto lg:mr-4 xl:block">
          {hotkey && (
            <span
              title={
                "Press Ctrl-" +
                hotkey.toUpperCase() +
                " to copy the converted value to the clipboard"
              }
            >
              {"Ctrl-" + hotkey.toUpperCase()}
            </span>
          )}
        </div>
      </div>
      {children && (
        <div
          ref={details}
          className="hidden border-b border-app-green-600 p-3 lg:block lg:border-x lg:text-sm"
        >
          {children}
        </div>
      )}
    </div>
  );
}
