import { useEffect, useState } from "react";
import { tempWatchedData } from "./dummy-data";
import NavBar from "./components/NavBar";
import Main from "./components/Main";
import NumResults from "./components/NumResults";
import ListBox from "./components/ListBox";
import MovieList from "./components/MovieList";
import WatchedMoviesHeadder from "./components/WatchedMoviesHeadder";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import Search from "components/Search";
import MovieDetails from "components/MovieDetails";
import WatchedList from "components/WatchedList";

const apiKey = "7b99404a";

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState(()=>{
    const storedValue = JSON.parse(localStorage.getItem("watchedList"));
    return storedValue || [];
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);

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
  const handleCloseMovie = () => {
    setSelectedId(null);
  };

  const handleAddWatched = (movie) => {
    setWatched((watched) => [...watched, movie]);
  };

  const handleDeleteWatched = (id) => {
    setWatched((watchedList) =>
      watchedList.filter((movie) => movie.imdbID !== id)
    );
  };

  const handleSelectMovie = (id) => {
    if (id === selectedId) {
      handleCloseMovie();
    } else setSelectedId(id);
  };

  useEffect(() => {
    localStorage.setItem("watchedList", JSON.stringify(watched));
  }, [watched]);

  useEffect(() => {
    const controller = new AbortController();
    let timer;
    if (query.length > 2) {
      handleCloseMovie();
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

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults length={movies?.length || 0} />
      </NavBar>
      <Main>
        <ListBox>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
        </ListBox>

        <ListBox
          header={!selectedId && <WatchedMoviesHeadder watched={watched} />}
        >
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <WatchedList
              movies={watched}
              onDeleteWatched={handleDeleteWatched}
            />
          )}
        </ListBox>
      </Main>
    </>
  );
}
