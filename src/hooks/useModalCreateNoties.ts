import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, ChangeEvent } from "react";
import { RootState } from "../redux/store";
import { setActiveDay, setMonth, setYear } from "../redux/calendarState";
import { setListNoties } from "../redux/userState";
interface useModalCreateNotiesTypes {
  isModalCreate: boolean;
  setIsModalCreate: (val: boolean) => void;
}
export const useModalCreateNoties = ({
  isModalCreate,
  setIsModalCreate,
}: useModalCreateNotiesTypes) => {
  const dispatch = useDispatch();

  const { activeDay, month, year } = useSelector(
    (state: RootState) => state.calendar
  );

  useEffect(() => {
    setModalData((prevData) => ({
      ...prevData,
      activeDay,
      month,
      year,
    }));
  }, [activeDay, month, year]);
  const [modalData, setModalData] = useState({
    title: "",
    activeDay,
    month,
    year,
    description: "",
  });
  //
  const hendleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "activeDay") {
      dispatch(setActiveDay(value));
    }
    if (name === "month") {
      dispatch(setMonth(value));
    }
    if (name === "year") {
      dispatch(setYear(value));
    }

    setModalData((prevData) => ({ ...prevData, [name]: value }));
  };

  const submitData = () => {
    if (
      modalData.title &&
      modalData.description &&
      /^\d{2}$/.test(modalData.activeDay) &&
      Number(modalData.activeDay) <= 31 &&
      /^\d{2}$/.test(modalData.month) &&
      Number(modalData.month) <= 12 &&
      /^\d{4}$/.test(modalData.year)
    ) {
      dispatch(setListNoties(modalData));
      setModalData({
        title: "",
        activeDay,
        month,
        year,
        description: "",
      });
      setIsModalCreate(!isModalCreate);
      console.log("все отправлено");
    } else {
      console.log(modalData.activeDay);
      console.log(modalData.month);
      console.log(modalData.month);
      console.log("не отправлено");
    }
  };
  return {
    activeDay,
    month,
    year,
    modalData,
    hendleChange,
    submitData,
  };
};
