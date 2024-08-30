import { useEffect, useState, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setActiveDay, setMonth, setYear } from "../redux/calendarState";
import { setListNoties } from "../redux/userState";
interface useModalCreateNotiesTypes {
  isModalCreate: boolean;
  setIsModalCreate: (val: boolean) => void;
  setShowPopup: (val: boolean) => void;
}
export const useModalCreateNoties = ({
  isModalCreate,
  setIsModalCreate,
  setShowPopup,
}: useModalCreateNotiesTypes) => {
  const dispatch = useDispatch();

  const { activeDay, month, year, color } = useSelector(
    (state: RootState) => state.calendar
  );

  const [disabledBtn, setDisabledBtn] = useState(true);

  useEffect(() => {
    setModalData({
      title: "",
      activeDay,
      month,
      year,
      description: "",
    });
  }, [activeDay, month, year]);

  const [modalData, setModalData] = useState({
    title: "",
    activeDay,
    month,
    year,
    description: "",
  });

  useEffect(() => {
    const isValid =
      modalData.title.trim() &&
      modalData.description.trim() &&
      /^\d{2}$/.test(modalData.activeDay) &&
      Number(modalData.activeDay) <= 31 &&
      /^\d{2}$/.test(modalData.month) &&
      Number(modalData.month) <= 12 &&
      /^\d{4}$/.test(modalData.year);

    setDisabledBtn(!isValid);
  }, [modalData]);

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
    if (!disabledBtn) {
      dispatch(setListNoties(modalData));
      setModalData({
        title: "",
        activeDay,
        month,
        year,
        description: "",
      });
      setIsModalCreate(!isModalCreate);
      setShowPopup(true);
    }
  };

  return {
    activeDay,
    month,
    year,
    modalData,
    hendleChange,
    submitData,
    disabledBtn,
    color,
  };
};
