import { useEffect } from "react";
/**
 * useKeyPress
 * @param {string} key - the name of the key to respond to, compared against event.key
 * @param {function} action - the action to perform on key press
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function useKeypress(
  key: string,
  isOpen: boolean,
  action: () => void
) {
  useEffect(() => {
    if (!isOpen) return;
    function onKeyup(e: KeyboardEvent) {
      if (e.key === key) action();
    }
    window.addEventListener("keyup", onKeyup);
    return () => window.removeEventListener("keyup", onKeyup);
  }, [isOpen]);
}
