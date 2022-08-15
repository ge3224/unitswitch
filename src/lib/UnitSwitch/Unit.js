import PropTypes from "prop-types"
import { useRef, useEffect } from "react";
import { units } from "./units"

export default function Unit({ base, input, target, hotkey, callback, children, decimal = true }) {
  const copyIco = useRef();
  const resultDiv = useRef();

  const icoCopyHandler = () => {
    let payload;
    if (decimal) {
      payload = parseFloat(result).toFixed(2);
    } else {
      payload = parseFloat(result).toFixed(0);
    }
    navigator.clipboard.writeText(payload);

    const tw = "opacity-40"
    copyIco.current.classList.add(tw);
    setTimeout(() => { copyIco.current.classList.remove(tw) }, 500);
  }

  const hotkeyCopyHandler = (e) => {
    const split = hotkey.split("+");
    if (e.key === split[split.length - 1] && split[0] === "ctrl" && e.ctrlKey === true) {
      resultDiv.current.classList.add("ring");
      resultDiv.current.classList.add("ring-2");
      resultDiv.current.classList.add("ring-purple-usw-400");
      resultDiv.current.classList.add("ring-inset");

      setTimeout(() => {
        resultDiv.current.classList.remove("ring");
        resultDiv.current.classList.remove("ring-2");
        resultDiv.current.classList.remove("ring-purple-usw-400");
        resultDiv.current.classList.remove("ring-inset");
      }, 500);
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', hotkeyCopyHandler);

    return () => {
      document.removeEventListener("keydown", hotkeyCopyHandler);
    }
  })

  const detailsBtn = useRef();
  const minus = useRef();
  const plus = useRef();
  const details = useRef();

  const handleToggle = () => {
    if (!details.current.classList.contains("hidden")) {
      details.current.classList.add("hidden");
      plus.current.classList.remove("hidden");
      minus.current.classList.add("hidden");
    } else {
      details.current.classList.remove("hidden");
      plus.current.classList.add("hidden");
      minus.current.classList.remove("hidden");
    }
  }

  const result = callback(input, target);

  return (
    <div>
      <div className="flex items-center border-b border-green-usw-600 lg:border lg:h-12 lg:items-stretch">
        <div className="mx-2 lg:my-auto lg:hidden">
          {
            children ?
              <div ref={detailsBtn} className="w-6 flex justify-center" onClick={handleToggle}>
                <svg ref={plus} width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 7H14" className="stroke-green-usw-500" strokeWidth="3" />
                  <path d="M7 0L7 14" className="stroke-green-usw-500" strokeWidth="3" />
                </svg>
                <svg ref={minus} className="hidden" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 7H14" className="stroke-green-usw-500" strokeWidth="3" />
                </svg>
              </div>
              :
              <div className="w-6 flex justify-center">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 7H14" className="stroke-gray-usw-100" strokeWidth="3" />
                  <path d="M7 0L7 14" className="stroke-gray-usw-100" strokeWidth="3" />
                </svg>
              </div>
          }
        </div>
        <div ref={resultDiv} className="w-32 bg-green-usw-100 border-l border-r border-green-usw-600 py-2 px-3 font-space-code font-bold text-sm text-green-usw-500 lg:flex lg:items-center lg:text-base lg:border-l-0" id={units.Pixels}>
          <span className="mr-2 cursor-pointer" onClick={icoCopyHandler}>
            <svg ref={copyIco} className="inline" width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5 4.7158V2.40625C5 1.6296 5.6296 1 6.40625 1H18.5938C19.3704 1 20 1.6296 20 2.40625V14.5938C20 15.3704 19.3704 16 18.5938 16H16.2582"
                className="stroke-green-usw-200"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14.5938 5H2.40625C1.6296 5 1 5.6296 1 6.40625V18.5938C1 19.3704 1.6296 20 2.40625 20H14.5938C15.3704 20 16 19.3704 16 18.5938V6.40625C16 5.6296 15.3704 5 14.5938 5Z"
                className="stroke-green-usw-200"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          {
            Number.isNaN(parseFloat(result)) ?
              "N/A" :
              decimal ?
                parseFloat(result).toFixed(2).length < 8 ?
                  parseFloat(result).toFixed(2) :
                  `${result.toString().substr(0, 5)}..`
                :
                parseInt(result)
          }
        </div>
        <div className="ml-2 mr-auto font-space font-bold text-black-usw lg:my-auto">{base}</div>
        <div className="hidden xl:block font-space-code text-gray-usw-200 lg:mr-4 lg:my-auto">{hotkey ? <small><code>{hotkey}</code></small> : ""}</div>
      </div>
      {
        children ?
          <div ref={details} className="border-b border-green-usw-600 p-3 hidden lg:block lg:border-x font-space lg:text-sm">
            {children}
          </div>
          : ""
      }
    </div>
  )
}

Unit.defaultProps = {
  base: PropTypes.string,
  hotkey: PropTypes.string,
  input: PropTypes.string,
  callback: PropTypes.func,
  target: PropTypes.string,
  decimal: PropTypes.bool,
}
