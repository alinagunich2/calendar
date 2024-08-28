import React, { useState } from "react";
import "./Calendar.css";
import ModalCreateNoties from "../modals/modalCreateNoties/ModalCreateNoties";
import { useDispatch, useSelector } from "react-redux";
import { setActiveDay } from "../../redux/calendarState";
import { RootState } from "../../redux/store";

const Calendar = () => {
  const dispatch = useDispatch();
  const { daysInCalendar, activeDay } = useSelector(
    (state: RootState) => state.calendar
  );
  const [isModalCreate, setIsModalCreate] = useState(false);

  const openModal = (day: number | null) => {
    if (typeof day === "number") {
      setIsModalCreate(!isModalCreate);
      dispatch(setActiveDay(day));
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
        {daysInCalendar.map((day: number | null, i: number) => (
          <div
            onClick={() => openModal(day)}
            key={i}
            className={`day current-month ${day === activeDay && "active"}`}
          >
            {day}
          </div>
        ))}
      </div>
      <ModalCreateNoties
        isModalCreate={isModalCreate}
        setIsModalCreate={setIsModalCreate}
      />
    </div>
  );
};

export default Calendar;
