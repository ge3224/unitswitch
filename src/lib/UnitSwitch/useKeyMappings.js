import { useCallback, useLayoutEffect, useRef } from "react";
import { useKeypressSubstitute } from "./useKeypressSubstitute";

export const useKeyMappings = (leader, keyset, callback) => {
  const callbackRef = useRef(callback);
  // const leaderDown = useRef();

  // const handleKeyPresses = useCallback(
  //   (e) => {
  //     // if (e.key === leader) {
  //     //   leaderDown.current = true;
  //     // }
  //     // // check if all available mod keys to have been pressed
  //     // if (
  //     //   e.shiftKey === true &&
  //     //   e.altKey === true &&
  //     //   e.ctrlKey === true &&
  //     //   e.metaKey === true
  //     // ) {
  //     //   leaderDown.current = false;
  //     //   callbackRef.current(e)
  //     // }
  //     // console.log("leaderDown", leaderDown);
  //
  //   }, );

  useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  // useKeypressSubstitute(keyset, leaderDown, handleKeyPresses)
}

