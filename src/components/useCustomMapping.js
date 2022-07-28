import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { useKeypressSubstitute } from "./useKeypressSubstitute";

export const useKeyMappings = (leader, keyset, callback) => {
  const callbackRef = useRef(callback);
  const [leaderDown, setLeaderDown] = useState(false);

  const handleKeyPresses = useCallback(
    (e) => {
      if (e.key === leader) {
        setLeaderDown(true);
      }
      // check if all available mod keys to have been pressed
      if (
        e.shiftKey === true &&
        e.altKey === true &&
        e.ctrlKey === true &&
        e.metaKey === true
      ) {
        callbackRef.current(e)
        setLeaderDown(false);
      }

    }, [leader, leaderDown]);

  useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  useKeypressSubstitute(keyset, leaderDown, handleKeyPresses)
}

