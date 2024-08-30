import { useState } from "react";
import { useDispatch } from "react-redux";
import { setActiveDay } from "../../redux/calendarState";

export const useModalOpen = () => {
  const dispatch = useDispatch();
  const [isModalCreate, setIsModalCreate] = useState(false);
  const [isModalListNoties, setModalListNoties] = useState(false);
  const [dayClick, setDayClick] = useState<null | string>(null);

  const openModal = (day: string | null) => {
    if (day) {
      setIsModalCreate(!isModalCreate);
      dispatch(setActiveDay(day));
    }
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

  return {
    setDayClick,
    setModalListNoties,
    isModalListNoties,
    openModal,
    isModalCreate,
    setIsModalCreate,
    dayClick,
    openModalList,
  };
};
