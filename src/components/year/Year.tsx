import "./Year.css";
import { useYear } from "../../hooks/useYear";
import { AnimatePresence, motion } from "framer-motion";

const Year = () => {
  const { year, handleYearChange } = useYear();
  return (
    <div className="year">
      <div className="year__back" onClick={() => handleYearChange("back")}>
        &#10002;
      </div>
      <AnimatePresence mode="wait">
        <motion.p
          key={year}
          className="year__text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {year}
        </motion.p>
      </AnimatePresence>
      <div className="year__next" onClick={() => handleYearChange("next")}>
        &#10002;
      </div>
    </div>
  );
};

export default Year;
