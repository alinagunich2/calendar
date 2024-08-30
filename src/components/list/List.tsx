import { useEffect, useRef } from "react";
import "./List.css";
import { useList } from "../../hooks/useList";

const List = () => {
  const { months, listActive, setListActive, handleMonthChange, month } =
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
  }, []);
  return (
    <div className="calendar__mounth mounth">
      <button
        className="mounth__select"
        ref={buttonRef}
        onClick={() => {
          setListActive(!listActive);
        }}
      >
        {months[parseInt(month, 10)]}
      </button>
      {listActive && (
        <ul ref={listRef} className="mounth__items">
          {months.map((item, i) => (
            <>
              {i !== 0 && (
                <li
                  className="mounth__item"
                  onClick={() => handleMonthChange(i)}
                  key={item}
                >
                  {item}
                </li>
              )}
            </>
          ))}
        </ul>
      )}
    </div>
  );
};

export default List;
