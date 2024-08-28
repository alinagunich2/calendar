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
  console.log(activeDay);
  console.log(month);
  const { listNoties } = useSelector((state: RootState) => state.user);
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
        activeDay: null,
        month: null,
        year: null,
        description: "",
      });
      p.setIsModalCreate(!p.isModalCreate);
      console.log("все отправлено");
    } else {
      console.log("не отправлено");
    }
  };
  return (
    <Portal>
      <div className="modal">
        <div className="modal__container">
          <div className="modal__header ">
            <h2 className="modal__title">Create Event</h2>
            <div
              className="modal__cross"
              onClick={() => p.setIsModalCreate(!p.isModalCreate)}
            >
              {" "}
              &#10060;
            </div>
          </div>

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
                onChange={hendleChange}
                name="activeDay"
                value={activeDay}
                className="modal__input-item_data"
                type="text"
              />
              <div className="">.</div>
              <input
                onChange={hendleChange}
                name="month"
                value={month}
                className="modal__input-item_month"
                type="text"
              />
              <div className="">.</div>
              <input
                onChange={hendleChange}
                name="year"
                value={year}
                className="modal__input-item_year"
                type="text"
              />
            </div>
            <input
              onChange={hendleChange}
              name="description"
              value={modalData.description}
              className="modal__text"
              placeholder="Description..."
            />
            <Button click={submitData} />
          </form>
        </div>
      </div>
    </Portal>
  );
};

export default ModalCreateNoties;
