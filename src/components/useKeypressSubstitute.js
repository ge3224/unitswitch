import { useCallback, useEffect, useLayoutEffect, useRef } from "react"

// useKeypressSubstitute produces a new keyboard event, if the "leader key" was
// used, and passes it as an argument to the "callback" parameter. The event
// argument is a substitute for a corresponding keyboard event that occurred
// naturally. For example, a key press of "a" will become a key press of, "ctrl
// + shift + alt + meta + a".
export const useKeypressSubstitute = (keySet, leaderPressed, callback, node = null) => {
  const callbackRef = useRef(callback);

  useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  const handleKeyPress = useCallback((e) => {
    if (leaderPressed) {
      if (keySet.has(e.key)) {
        e.preventDefault()
        e.stopPropagation();
        const newEvent = customKeyboardEvent(e, {
          ctrlKey: true,
          shiftKey: true,
          altKey: true,
          metaKey: true
        })
        callbackRef.current(newEvent)
      }
    } else {
      callbackRef.current(e)
    }
  }, [keySet, leaderPressed]);

  useEffect(() => {
    const targetNode = node ?? document;
    targetNode &&
      targetNode.addEventListener("keydown", handleKeyPress);

    return () =>
      targetNode &&
      targetNode.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress, node]);

}

function customKeyboardEvent(e, obj) {
  const proxy = new Proxy(e, {
    get: (target, prop) => obj[prop] || target[prop]
  })
  return new e.constructor(e.type, proxy)
}