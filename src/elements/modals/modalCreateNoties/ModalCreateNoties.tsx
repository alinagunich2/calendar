import "./ModalCreateNoties.css";
import Portal from "../Portal";
import Button from "../../buttons/Button";
import { useSelector } from "react-redux";
import { ChangeEvent, useState } from "react";
import { UserState } from "../../../utils/LocalStorage";
import { RootState } from "../../../redux/store";

export interface ModalCreateNotiesType {
  isModalCreate: boolean;
  setIsModalCreate: (val: boolean) => void;
}

const ModalCreateNoties: React.FC<ModalCreateNotiesType> = (p) => {
  const { activeDay, month, year } = useSelector(
    (state: RootState) => state.calendar
  );

  const cal = useSelector((state: RootState) => state.calendar);
  const us = useSelector((state: RootState) => state.user);
  console.log(us, "listNoties");
  const data = `${
    String(activeDay).length === 1 ? "0" + activeDay : activeDay
  }.${String(month).length === 1 ? "0" + month : month}.${year}`;
  const [modalData, setModalData] = useState({
    title: "",
    data,
    description: "",
  });
  const hendleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setModalData((prevData) => ({ ...prevData, [name]: value }));
  };
  if (!p.isModalCreate) return null;

  const submitData = () => {
    console.log(cal, "cal");
    console.log(us, "us");
    console.log(modalData);
    setModalData({
      title: "",
      data,
      description: "",
    });
    p.setIsModalCreate(!p.isModalCreate);
  };
  return (
    <Portal>
      <div className="modal">
        <div className="modal__container">
          <h2 className="modal__title">Create Event</h2>
          <form action="">
            <input
              onChange={hendleChange}
              name="title"
              value={modalData.title}
              className="modal__input"
              type="text"
              placeholder="Title..."
            />
            <input
              name="data"
              className="modal__input"
              value={modalData.data}
              type="text"
              placeholder="Data..."
            />
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
