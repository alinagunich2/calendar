import React, { useState } from "react";
import "./Calendar.css";
import ModalCreateNoties from "../modals/modalCreateNoties/ModalCreateNoties";
import { useDispatch, useSelector } from "react-redux";
import { setActiveDay, setMonth, setYear } from "../../redux/calendarState";
import { RootState } from "../../redux/store";
import ModalListNoties from "../modals/modalListNoties/ModalListNoties";

const Calendar = () => {
  const dispatch = useDispatch();
  const toDay = String(new Date().getDate()).padStart(2, "0");
  const toMonth = String(new Date().getMonth() + 1).padStart(2, "0");
  const toYear = String(new Date().getFullYear());
  const { daysInCalendar, activeDay, month, year } = useSelector(
    (state: RootState) => state.calendar
  );

  const { listNoties } = useSelector((state: RootState) => state.user);

  const filterListNoties = listNoties?.filter((item) => item.month === month);
  const [isModalCreate, setIsModalCreate] = useState(false);
  const [isModalListNoties, setModalListNoties] = useState(false);
  const [dayClick, setDayClick] = useState<null | string>(null);

  const openModal = (day: string | null) => {
    if (typeof day === "string") {
      setIsModalCreate(!isModalCreate);
      dispatch(setActiveDay(day));
    }
  };
  const goToToday = () => {
    dispatch(setActiveDay(toDay));
    dispatch(setMonth(toMonth));
    dispatch(setYear(toYear));
  };
  const openModalList = (
    e: React.MouseEvent<HTMLDivElement>,
    dayClick: string | null
  ) => {
    e.stopPropagation();
    if (dayClick) {
      setDayClick(dayClick);
      setModalListNoties(!isModalListNoties);
    }
  };

  return (
    <div className="calendar">
      <div className="calendar__today" onClick={goToToday}>
        Today
      </div>
      <div className="days">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
          <div className="day-name" key={day}>
            {day}
          </div>
        ))}
        {daysInCalendar.map((day: string | null, i: number) => {
          const hasNoties = filterListNoties?.some(
            (item) => item.activeDay === day
          );

          return (
            <div
              onClick={() => openModal(day)}
              key={i}
              className={`day current-month ${day === activeDay && "active"} ${
                toDay === day && toMonth === month && toYear === year && "today"
              }`}
            >
              {parseInt(String(day), 10) ? parseInt(String(day), 10) : ""}

              {hasNoties && (
                <div
                  className="calendar__noties_dot"
                  onClick={(e) => openModalList(e, day)}
                ></div>
              )}
            </div>
          );
        })}
      </div>
      <ModalCreateNoties
        title={"Create Event"}
        isModalCreate={isModalCreate}
        setIsModalCreate={setIsModalCreate}
      />
      <ModalListNoties
        filterListNoties={filterListNoties}
        dayClick={dayClick}
        isModalListNoties={isModalListNoties}
        setModalListNoties={setModalListNoties}
      />
    </div>
  );
};

export default Calendar;
