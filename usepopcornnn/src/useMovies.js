import { useEffect, useState } from "react";
const KEY = "57f10299";

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  // this is where we are going to update state inside the render phase which makes an infinite loop which is the worst thing to do
  useEffect(
    function () {
      const controller = new AbortController(); // this is browser API
      async function fetchMovies() {
        try {
          setIsLoading(true); // we havent fetch the data so we will put it to false
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal } // here we connected our abort controller with ftech
          );

          if (!res.ok) {
            throw new Error("something went wrong while fetching API"); // error we are throwing here will go to the catch block
          }
          const data = await res.json();
          if (data.Response === "False") {
            throw new Error("movie not Found"); // error we are throwing here will go to the catch block
          }
          setMovies(data.Search);
          setError("");
        } catch (err) {
          if (err.name !== "AbortError") {
            console.log(err.message); //err.message will be the msg that we throw on try block
            setError(err.message);
          }
        } finally {
          // this block will be executed in the end
          setIsLoading(false); // we have fetch all the data so we can set the loading to false
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return; // After setting the states, it exits the useEffect hook immediately. This prevents the further execution of the fetchMovies() function and any side effects associated with it.
      }
      // handleCloseMovie(); // whenever we are searching another movie pehle wali movie detail should be closed

      fetchMovies();

      return function () {
        controller.abort(); // here we cancel the previous request (cleaning up the previous request)
      };
    },
    [query]
  );

  return { movies, isLoading, error };
}
