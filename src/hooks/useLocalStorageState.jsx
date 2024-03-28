import { useEffect, useState } from "react";

export default function useLocalStorageState(initialState, key){

    const [value, setValue] = useState(() => {
        const storedValue = JSON.parse(localStorage.getItem(key));
        return storedValue || initialState;
      });

      useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
      }, [value, key]);

      return [value, setValue];
}