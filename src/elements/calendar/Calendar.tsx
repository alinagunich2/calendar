import React, { useState } from "react";
import "./Calendar.css";
import ModalCreateNoties from "../modals/modalCreateNoties/ModalCreateNoties";
import { useDispatch, useSelector } from "react-redux";
import { setActiveDay } from "../../redux/calendarState";
import { RootState } from "../../redux/store";
import ModalListNoties from "../modals/modalListNoties/ModalListNoties";

const Calendar = () => {
  const dispatch = useDispatch();
  const { daysInCalendar, activeDay, month } = useSelector(
    (state: RootState) => state.calendar
  );
  const { listNoties } = useSelector((state: RootState) => state.user);

  const filterListNoties = listNoties?.filter((item) => item.month === month);
  console.log(filterListNoties);
  const [isModalCreate, setIsModalCreate] = useState(false);
  const [isModalListNoties, setModalListNoties] = useState(false);
  const [dayClick, setDayClick] = useState();

  const openModal = (day: string | null) => {
    if (typeof day === "string") {
      setIsModalCreate(!isModalCreate);
      dispatch(setActiveDay(day));
    }
  };
  const openModalList = (day: string) => {
    setDayClick(day);
  };
  return (
    <div className="calendar">
      <div className="days">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
          <div className="day-name" key={day}>
            {day}
          </div>
        ))}
        {daysInCalendar.map((day: string | null, i: number) => (
          <div
            onClick={() => openModal(day)}
            key={i}
            className={`day current-month ${day === activeDay && "active"}`}
          >
            {parseInt(String(day), 10) ? parseInt(String(day), 10) : ""}

            {filterListNoties && (
              <div className="calendar__noties">
                {filterListNoties?.map((itemactiveDay) => (
                  <>
                    {itemactiveDay.activeDay === day && (
                      <div className="calendar__noties_dot"></div>
                    )}
                  </>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <ModalCreateNoties
        isModalCreate={isModalCreate}
        setIsModalCreate={setIsModalCreate}
      />
      <ModalListNoties
        dayClick={dayClick}
        isModalListNoties={isModalListNoties}
        setModalListNoties={setModalListNoties}
      />
    </div>
  );
};

export default Calendar;
