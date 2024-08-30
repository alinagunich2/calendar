import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setMonth } from "../redux/calendarState";

export const useList = () => {
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
  const dispatch = useDispatch();
  const { month, color } = useSelector((state: RootState) => state.calendar);

  const [listActive, setListActive] = useState(false);

  const handleMonthChange = (index: number) => {
    dispatch(setMonth(String(index).padStart(2, "0")));
  };

  return {
    months,
    listActive,
    setListActive,
    handleMonthChange,
    month,
    color,
  };
};
