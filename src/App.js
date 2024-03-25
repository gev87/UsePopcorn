import { useEffect, useState } from "react";
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
import useMovies from "hooks/useMovies";

export default function App() {
  const [query, setQuery] = useState("");
  const [watched, setWatched] = useState(() => {
    const storedValue = JSON.parse(localStorage.getItem("watchedList"));
    return storedValue || [];
  });
  const [selectedId, setSelectedId] = useState(null);

  const { isLoading, error, movies } = useMovies(query);
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
