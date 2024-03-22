import { useEffect, useState } from "react";
import StarRating from "./StarRating";
import Loader from "./Loader";

const apiKey = "7b99404a";

function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  const isTop = imdbRating > 6;

  useEffect(() => {
    if (title) {
      document.title = `Movie | ${title}`;
    }
    return () =>{
      document.title = "Use Popcorn";
    } 
  }, [title]);

  const getMovieDetails = async (id) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `http://www.omdbapi.com/?i=${id}&apikey=${apiKey}`
      );
      const data = await response.json();
      setMovie(data);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

 

  const handleAdd = () => {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: +imdbRating,
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
    };
    console.log("watchedUserRating",userRating, imdbRating)
    onAddWatched(newWatchedMovie);
  };

  useEffect(()=>{
    const callback = (event) =>{
      if(event.code ==="Escape"){
        onCloseMovie();
      }
    }
    document.addEventListener('keydown',callback);
    return ()=> {
      document.removeEventListener('keydown',callback);
    }
  },[onCloseMovie])

  useEffect(() => {
    getMovieDetails(selectedId);
  }, [selectedId]);

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie} >
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${title} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              {isTop && <h2>TOP MOVIE</h2>}
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating}
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {isWatched ? (
                <p>
                  You rated with movie {watchedUserRating}
                  <span>⭐</span>
                </p>
              ) : (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    messages={[]}
                    passRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
export default MovieDetails;
