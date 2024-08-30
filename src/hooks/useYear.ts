import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setYear } from "../redux/calendarState";
export const useYear = () => {
  const dispatch = useDispatch();
  const { year } = useSelector((state: RootState) => state.calendar);

  const handleYearChange = (type: "back" | "next") => {
    if (type === "back") {
      dispatch(setYear(String(Number(year) - 1)));
    } else if (type === "next") {
      dispatch(setYear(String(Number(year) + 1)));
    }
  };

  return {
    year,
    handleYearChange,
  };
};
