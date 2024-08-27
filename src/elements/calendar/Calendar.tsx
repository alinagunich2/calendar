import React, { useState } from "react";
import "./Calendar.css";
import ModalCreateNoties from "../modals/modalCreateNoties/ModalCreateNoties";
export interface CalendarProps {
  daysCalendar: (number | null)[];
  year: number;
  month: number;
  activeDay: number;
  setActiveDay: (val: number) => void;
}

const Calendar: React.FC<CalendarProps> = (p) => {
  const [isModalCreate, setIsModalCreate] = useState(false);

  const openModal = (day: number | null) => {
    if (typeof day === "number") {
      setIsModalCreate(!isModalCreate);
      p.setActiveDay(day);
    }
  };
  return (
    <div className="calendar">
      <div className="days">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div className="day-name" key={day}>
            {day}
          </div>
        ))}
        {p.daysCalendar.map((day, i) => (
          <div
            onClick={() => openModal(day)}
            key={i}
            className={`day current-month ${day === p.activeDay && "active"}`}
          >
            {day}
          </div>
        ))}
      </div>
      <ModalCreateNoties
        isModalCreate={isModalCreate}
        year={p.year}
        month={p.month}
        day={p.activeDay}
      />
    </div>
  );
};

export default Calendar;
