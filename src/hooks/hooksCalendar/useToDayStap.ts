import { useDispatch } from "react-redux";
import { setActiveDay, setMonth, setYear } from "../../redux/calendarState";

export const useTodayHandler = () => {
  const dispatch = useDispatch();

  const toDay = String(new Date().getDate()).padStart(2, "0");
  const toMonth = String(new Date().getMonth() + 1).padStart(2, "0");
  const toYear = String(new Date().getFullYear());

  const goToDay = () => {
    dispatch(setActiveDay(toDay));
    dispatch(setMonth(toMonth));
    dispatch(setYear(toYear));
  };

  return { toDay, toMonth, toYear, goToDay };
};
