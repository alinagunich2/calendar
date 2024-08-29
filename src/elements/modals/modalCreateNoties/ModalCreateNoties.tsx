import "./ModalCreateNoties.css";
import Portal from "../Portal";
import Button from "../../buttons/Button";
import { useDispatch, useSelector } from "react-redux";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { UserState } from "../../../utils/LocalStorage";
import { RootState } from "../../../redux/store";
import { setActiveDay, setMonth, setYear } from "../../../redux/calendarState";
import { setListNoties } from "../../../redux/userState";

export interface ModalCreateNotiesType {
  title: string;
  isModalCreate: boolean;
  setIsModalCreate: (val: boolean) => void;
}

const ModalCreateNoties: React.FC<ModalCreateNotiesType> = (p) => {
  // const dayRef = useRef<HTMLInputElement>(null);
  // const monthRef = useRef<HTMLInputElement>(null);
  // const yearRef = useRef<HTMLInputElement>(null);
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
  if (!p.isModalCreate) return null;

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
      console.log(modalData);
      console.log(activeDay);
      dispatch(setListNoties(modalData));
      setModalData({
        title: "",
        activeDay,
        month,
        year,
        description: "",
      });
      p.setIsModalCreate(!p.isModalCreate);
      console.log("все отправлено");
    } else {
      console.log(modalData.activeDay);
      console.log(modalData.month);
      console.log(modalData.month);
      console.log("не отправлено");
    }
  };
  return (
    <Portal
      isVisible={p.isModalCreate}
      onClose={() => p.setIsModalCreate(false)}
      title={p.title}
    >
      <div className="">
        <form action="">
          <input
            onChange={hendleChange}
            name="title"
            value={modalData.title}
            className="modal__input"
            type="text"
            placeholder="Title..."
          />
          <div className="modal__inputs">
            <input
              placeholder="_ _"
              onChange={hendleChange}
              name="activeDay"
              value={activeDay}
              className="modal__input-item"
              type="text"
            />
            <div className="">.</div>
            <input
              placeholder="_ _"
              onChange={hendleChange}
              name="month"
              value={month}
              className="modal__input-item"
              type="text"
            />
            <div className="">.</div>
            <input
              placeholder="_ _"
              onChange={hendleChange}
              name="year"
              value={year}
              className="modal__input-item"
              type="text"
            />
          </div>
          <textarea
            onChange={hendleChange}
            name="description"
            value={modalData.description}
            className="modal__text"
            placeholder="Description..."
          ></textarea>
          <Button click={submitData} />
        </form>
      </div>
    </Portal>
  );
};

export default ModalCreateNoties;
