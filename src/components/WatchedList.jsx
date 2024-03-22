import WatchedMovie from "./WatchedMovie";

export default function WatchedList({ movies, onDeleteWatched }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => <WatchedMovie movie={movie} key={movie.imdbID} onDeleteWatched={onDeleteWatched}/>)}
    </ul>
  );
}
