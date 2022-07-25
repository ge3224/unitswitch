import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { useModifyKeypress } from "./useModifyKeypress";

export const useCustomMapping = (leaderKey, maps, callback) => {

  const callbackRef = useRef(callback);
  const [leaderPressed, setLeaderKeyDown] = useState(false);

  useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  const handleKeyPresses = useCallback(
    (e) => {
      if (e.key === leaderKey) {
        setLeaderKeyDown(true);
      }

      if (
        e.shiftKey === true &&
        e.altKey === true &&
        e.ctrlKey === true &&
        e.metaKey === true
      ) {
        callbackRef.current(e)
        setLeaderKeyDown(false);
      }

    }, [leaderKey, leaderPressed]);

  useModifyKeypress(maps, leaderPressed, handleKeyPresses)
}
