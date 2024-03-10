import { useState, useEffect } from "react";

export function useLocalStorageState(initialState, key) {
  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem(key);
    return storedValue?JSON.parse(storedValue):initialState; // converted that string into array of objects
  });// retreiving the data on screen from this 

  // how to store local storage in a more effective way and using useEffect we are updating the local storage  and updating the state
  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value ,key]
  );
  return [value, setValue];
}
      