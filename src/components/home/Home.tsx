import React, { useEffect, useState } from "react";
import Year from "../../elements/year/Year";
import List from "../../elements/list/List";
import Calendar from "../../elements/calendar/Calendar";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { AppDispatch } from "../../redux/store";
import {
  setDaysInCalendar,
  setMonth,
  setYear,
} from "../../redux/calendarState";

const Home = () => {
  const months = [
    "null",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dispatch = useDispatch<AppDispatch>();
  const { year, month, activeDay } = useSelector(
    (state: RootState) => state.calendar
  );

  const [listActive, setListActive] = useState(false);

  useEffect(() => {
    updateCalendar(Number(year), Number(month));
  }, [year, month]);

  const updateCalendar = (year: number, month: number) => {
    const daysMonth = new Date(year, month, 0).getDate();
    const firstDayMonth = new Date(year, month - 1, 1).getDay();
    const adjustedFirstDay = firstDayMonth === 0 ? 6 : firstDayMonth - 1;

    const days = [];
    for (let i = 0; i < adjustedFirstDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysMonth; i++) {
      days.push(String(i).padStart(2, "0"));
    }
    const nextMonthDays = (7 - (days.length % 7)) % 7;
    if (nextMonthDays !== 7) {
      for (let i = 1; i <= nextMonthDays; i++) {
        days.push(null);
      }
    }

    dispatch(setDaysInCalendar(days));
  };

  const handleMonthChange = (index: string) => {
    dispatch(setMonth(String(index).padStart(2, "0")));
  };
  const handleYearChange = (type: "back" | "next") => {
    if (type === "back") {
      dispatch(setYear(String(Number(year) - 1)));
    } else if (type === "next") {
      dispatch(setYear(String(Number(year) + 1)));
    }
  };

  //Props
  const homeProps = {
    months,
    month,
    handleMonthChange,
    year,
    setListActive,
    listActive,
  };
  return (
    <section className="page__calendar ">
      <div className="calendar__container _container">
        <div className="calendar__header">
          <Year year={year} handleYearChange={handleYearChange} />
          <List {...homeProps} />
        </div>
        <Calendar
        // daysCalendar={daysCalendar}
        // year={year}
        // month={month}
        // setActiveDay={setActiveDay}
        // activeDay={activeDay}
        />
      </div>
    </section>
  );
};

export default Home;
