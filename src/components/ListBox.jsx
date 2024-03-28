import React, { useState } from "react";
import ToggleButton from "./ToggleButton";

export default function ListBox({children,header}) {
  const [isOpen, setIsOpen] = useState(true);
  
  return (
    <div className="box">
      <ToggleButton
        onClick={() => setIsOpen((open) => !open)}
        isOpen={isOpen}
      />
      {header}
      {isOpen && children}
    </div>
  );
}
