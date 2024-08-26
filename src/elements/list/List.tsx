import React, { useEffect, useRef } from "react";
import "./List.css";

export interface ListProps {
  months: string[];
  month: number;
  handleMonthChange: (val: number) => void;
  setListActive: (val: boolean) => void;
  listActive: boolean;
}

const List: React.FC<ListProps> = (p) => {
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
        p.setListActive(false);
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
          p.setListActive(!p.listActive);
        }}
      >
        {p.months[p.month]}
      </button>
      {p.listActive && (
        <ul ref={listRef} className="mounth__items">
          {p.months.map((item, i) => (
            <li
              className="mounth__item"
              onClick={() => p.handleMonthChange(i)}
              key={item}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default List;
