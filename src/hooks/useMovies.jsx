const { useState, useEffect } = require("react");

const apiKey = "7b99404a";

function useMovies(query,callback) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [movies, setMovies] = useState([]);

 

  useEffect(() => {
    // callback?.();
    const controller = new AbortController();
    
    const getMovies = async (controller) => {
        try {
          setError("");
          setIsLoading(true);
          const response = await fetch(
            `http://www.omdbapi.com/?s=${query}&apikey=${apiKey}`,
            { signal: controller.signal }
          );
          if (!response.ok) {
            throw new Error("Something went wrong with fetching movies");
          }
    
          const data = await response.json();
          if (data.Error) {
            throw new Error(data.Error);
          } else {
            setMovies(data.Search);
            setError("");
          }
        } catch (err) {
          if (err.name !== "AbortError") {
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      };

    
    let timer;
    if (query.length > 2) {
      timer = setTimeout(getMovies, 300, controller);
    } else {
       setMovies([]);
      setError("");
    }

    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [query]);

  return { isLoading, error, movies };
}

export default useMovies;
