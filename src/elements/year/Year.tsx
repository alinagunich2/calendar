import React from "react";
import "./Year.css";

export interface YearProps {
  year: number;
  handleYearChange: (val: "back" | "next") => void;
}

const Year: React.FC<YearProps> = (p) => {
  return (
    <div className="year">
      <div className="year__back" onClick={() => p.handleYearChange("back")}>
        &#128072;
      </div>
      <p className="year__text">{p.year}</p>
      <div className="year__next" onClick={() => p.handleYearChange("next")}>
        &#128073;
      </div>
    </div>
  );
};

export default Year;
