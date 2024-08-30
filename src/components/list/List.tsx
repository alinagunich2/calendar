import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./List.css";
import { useList } from "../../hooks/useList";

const List = () => {
  const { months, listActive, setListActive, handleMonthChange, month, color } =
    useList();

  const listRef = useRef<HTMLUListElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        listRef.current &&
        !listRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setListActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setListActive]);

  return (
    <div className={`calendar__mounth mounth ${color}`}>
      <button
        className="mounth__select"
        ref={buttonRef}
        onClick={() => {
          setListActive((prev) => !prev);
        }}
      >
        {months[parseInt(month, 10)]}
      </button>
      <AnimatePresence>
        {listActive && (
          <motion.ul
            ref={listRef}
            className="mounth__items"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {months.map(
              (item, i) =>
                i !== 0 && (
                  <motion.li
                    className="mounth__item"
                    onClick={() => handleMonthChange(i)}
                    key={item}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item}
                  </motion.li>
                )
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default List;
