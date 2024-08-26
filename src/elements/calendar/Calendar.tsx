import React from "react";
import "./Calendar.css";
export interface CalendarProps {
  daysCalendar: (number | null)[];
}

const Calendar: React.FC<CalendarProps> = (p) => {
  return (
    <div className="calendar">
      <div className="days">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div className="day-name" key={day}>
            {day}
          </div>
        ))}
        {p.daysCalendar.map((item, i) => (
          <div key={i} className="day current-month">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
