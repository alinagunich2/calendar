import "./Year.css";
import { useYear } from "../../hooks/useYear";
const Year = () => {
  const { year, handleYearChange } = useYear();

  return (
    <div className="year">
      <div className="year__back" onClick={() => handleYearChange("back")}>
        &#128072;
      </div>
      <p className="year__text">{year}</p>
      <div className="year__next" onClick={() => handleYearChange("next")}>
        &#128073;
      </div>
    </div>
  );
};

export default Year;
