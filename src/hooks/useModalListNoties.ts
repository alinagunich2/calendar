import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { deliteNotieInList } from "../redux/userState";
import { NotiesType } from "../utils/LocalStorage";

interface UseModalListNotiesTypes {
  dayClick: string | null;
  filterListNoties: NotiesType[] | undefined;
}

export const useModalListNoties = ({
  dayClick,
  filterListNoties,
}: UseModalListNotiesTypes) => {
  const dispatch = useDispatch();

  const { month, year, color } = useSelector(
    (state: RootState) => state.calendar
  );

  let filterListNotiesDay: NotiesType[] | [] = [];
  if (filterListNoties) {
    filterListNotiesDay = filterListNoties.filter(
      (item) => item.activeDay === dayClick
    );
  }

  const deliteNoties = (item: NotiesType) => {
    dispatch(deliteNotieInList(item));
  };
  return {
    month,
    year,
    filterListNotiesDay,
    deliteNoties,
    color,
  };
};
