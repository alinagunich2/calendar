import React, { useEffect, useState } from "react";
import Year from "../../elements/year/Year";
import List from "../../elements/list/List";
import Calendar from "../../elements/calendar/Calendar";
import "./Home.css";

const Home = () => {
  const months = [
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
  const data = new Date();
  const [month, setMonth] = useState(data.getMonth());
  const [year, setYear] = useState(data.getFullYear());
  const [listActive, setListActive] = useState(false);
  const [daysCalendar, setDaysCalendar] = useState<(number | null)[]>([]);
  const [activeDay, setActiveDay] = useState(data.getDate());
  console.log(activeDay, "activeDay");

  useEffect(() => {
    updateCalendar(year, month);
  }, [year, month]);

  const updateCalendar = (year: number, month: number) => {
    const daysMonth = new Date(year, month + 1, 0).getDate();
    const firstDayMonth = new Date(year, month, 1).getDay();
    console.log(daysMonth, "daysMonth");
    console.log(firstDayMonth, "firstDayMonth");

    const days = [];
    for (let i = 0; i < firstDayMonth; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysMonth; i++) {
      days.push(i);
    }
    const nextMonthDays = 7 - (days.length % 7);
    if (nextMonthDays !== 7) {
      for (let i = 1; i <= nextMonthDays; i++) {
        days.push(null);
      }
    }

    setDaysCalendar(days);
  };

  const handleMonthChange = (index: number) => {
    setMonth(index);
  };
  const handleYearChange = (type: "back" | "next") => {
    if (type === "back") {
      setYear((val) => val - 1);
    } else if (type === "next") {
      console.log(type === "next");
      setYear((val) => val + 1);
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
          daysCalendar={daysCalendar}
          year={year}
          month={month}
          setActiveDay={setActiveDay}
          activeDay={activeDay}
        />
      </div>
    </section>
  );
};

export default Home;
