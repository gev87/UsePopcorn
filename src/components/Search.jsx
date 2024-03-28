import useKey from "hooks/useKey";
import React, { useEffect, useRef } from "react";

function Search({ query, setQuery }) {
  const inputEl = useRef(null);

  useKey("enter",()=>{
    if (document.activeElement === inputEl.current) {
      return;
    }
    inputEl.current.focus();
    setQuery("");
  })

  useEffect(() => {
    const input = document.querySelector(".search");
    input.focus();
  }, [query]);
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}

export default Search;
