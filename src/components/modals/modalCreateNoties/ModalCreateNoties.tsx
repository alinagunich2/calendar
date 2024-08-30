import "./ModalCreateNoties.css";
import Portal from "../Portal";
import Button from "../../../elements/buttons/Button";
import { useModalCreateNoties } from "../../../hooks/useModalCreateNoties";

export interface ModalCreateNotiesType {
  title: string;
  isModalCreate: boolean;
  setIsModalCreate: (val: boolean) => void;
  setShowPopup: (val: boolean) => void;
}

const ModalCreateNoties: React.FC<ModalCreateNotiesType> = (p) => {
  const {
    activeDay,
    month,
    year,
    modalData,
    hendleChange,
    submitData,
    disabledBtn,
    color,
  } = useModalCreateNoties({
    isModalCreate: p.isModalCreate,
    setIsModalCreate: p.setIsModalCreate,
    setShowPopup: p.setShowPopup,
  });

  return (
    <Portal
      isVisible={p.isModalCreate}
      onClose={() => p.setIsModalCreate(false)}
      title={p.title}
    >
      <div className={color}>
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
              placeholder="_ _ _ _"
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
          <Button color={color} disabled={disabledBtn} click={submitData} />
        </form>
      </div>
    </Portal>
  );
};

export default ModalCreateNoties;
