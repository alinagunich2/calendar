import { motion, AnimatePresence } from "framer-motion";
import "./ModalCreateNoties.css";
import Button from "../../../elements/buttons/Button";
import { useModalCreateNoties } from "../../../hooks/useModalCreateNoties";

export interface ModalCreateNotiesType {
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
    <AnimatePresence>
      {p.isModalCreate && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className={`modal ${color}`}
        >
          <div className="modal__container">
            <div className="modal__header">
              <h2 className="modal__title">Create Event</h2>
              <div
                className="modal__close"
                onClick={() => p.setIsModalCreate(false)}
              >
                &#10060;
              </div>
            </div>
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
                <Button
                  color={color}
                  disabled={disabledBtn}
                  click={submitData}
                />
              </form>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalCreateNoties;
