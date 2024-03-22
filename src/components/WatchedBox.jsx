import React , { useState } from "react";
import ToggleButton from "./ToggleButton";
import WatchedMoviesHeadder from "./WatchedMoviesHeadder";
import MovieList from "./MovieList";
import { tempWatchedData } from "../dummy-data";

 export default function WatchedBox({children}){
    const [isOpen, setIsOpen] = useState(true);
    const [watched, setWatched] = useState(tempWatchedData);
  
    return (
      <div className="box">
        <ToggleButton
          onClick={() => setIsOpen((open) => !open)}
          isOpen={isOpen}
        />
        {isOpen && (
          <>
            <WatchedMoviesHeadder watched={watched} />
            <MovieList movies={watched} alreadyWatched />
          </>
        )}
      </div>
    );
 }