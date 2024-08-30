import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setDaysInCalendar } from "../../redux/calendarState";

export const useCalendar = () => {
  const dispatch = useDispatch();

  const { daysInCalendar, activeDay, month, year, color, listNoties } =
    useSelector((state: RootState) => ({
      daysInCalendar: state.calendar.daysInCalendar,
      activeDay: state.calendar.activeDay,
      month: state.calendar.month,
      year: state.calendar.year,
      color: state.calendar.color,
      listNoties: state.user.listNoties,
    }));

  const [showPopup, setShowPopup] = useState(false);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

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

  const filterListNoties = listNoties?.filter((item) => item.month === month);
  return {
    daysInCalendar,
    activeDay,
    month,
    year,
    filterListNoties,
    showPopup,
    setShowPopup,
    handleClosePopup,
    color,
  };
};
