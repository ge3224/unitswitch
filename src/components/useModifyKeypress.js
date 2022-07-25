import { useCallback, useEffect, useLayoutEffect, useRef } from "react"

export const useModifyKeypress = (keys, leaderPressed, callback, node = null) => {

  const callbackRef = useRef(callback);

  useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  const handleKeyPress = useCallback(
    (e) => {

      if (leaderPressed) {
        if (keys.some((key) => e.key === key)) {
          e.preventDefault()
          e.stopPropagation();
          const newE = customKeyboardEvent(e, {
            ctrlKey: true,
            shiftKey: true,
            altKey: true,
            metaKey: true 
          })
          callbackRef.current(newE)
        }
      } else {
        callbackRef.current(e)
      }

    }, [keys, leaderPressed]);

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
