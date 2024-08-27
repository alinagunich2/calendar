import "./ModalCreateNoties.css";
import Portal from "../Portal";
import Button from "../../buttons/Button";

export interface ModalCreateNotiesType {
  isModalCreate: boolean;
  year: number;
  month: number;
  day: number;
}

const ModalCreateNoties: React.FC<ModalCreateNotiesType> = (p) => {
  if (!p.isModalCreate) return null;

  const formattedDay = `${String(p.day).length === 1 ? "0" + p.day : p.day}.${
    String(p.month).length === 1 ? "0" + p.month : p.month
  }.${p.year}`;
  return (
    <Portal>
      <div className="modal">
        <div className="modal__container">
          <h2 className="modal__title">Create Event</h2>
          <form action="">
            <input
              className="modal__input"
              type="text"
              placeholder="Title..."
            />
            <input
              className="modal__input"
              value={formattedDay}
              type="text"
              placeholder="Data..."
            />
            <textarea
              className="modal__text"
              cols={48}
              rows={8}
              placeholder="Description..."
            />
            <Button click={() => console.log(1)} />
          </form>
        </div>
      </div>
    </Portal>
  );
};

export default ModalCreateNoties;
