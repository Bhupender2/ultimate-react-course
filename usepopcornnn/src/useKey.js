import { useEffect } from "react";

export function useKey(key, action) {
  //ESC button escape
  useEffect(() => {
    function callback(e) {
      if (e.code.toLowerCase() === key.toLowerCase()) {
        action();
      }
    }
    document.addEventListener("keydown", callback); // whenever we press the ESC button

    return function () {
      document.removeEventListener("keydown", callback); //whenever the component unmounted or re-render the clean up function should be executed otherwise all the event listener will be added to the DOM which create memory problem /performance issues
    };
  }, [key, action]);
}
