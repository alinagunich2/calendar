import "./ModalListNoties.css";
import Portal from "../Portal";
import { NotiesType } from "../../../utils/LocalStorage";
import { useModalListNoties } from "../../../hooks/useModalListNoties";
interface ModalListNotiesTypes {
  dayClick: string | null;
  isModalListNoties: boolean;
  setModalListNoties: (val: boolean) => void;
  filterListNoties: NotiesType[] | undefined;
}
const ModalListNoties: React.FC<ModalListNotiesTypes> = (p) => {
  const { month, year, filterListNotiesDay, deliteNoties, color } =
    useModalListNoties({
      dayClick: p.dayClick,
      filterListNoties: p.filterListNoties,
    });

  if (!p.isModalListNoties) return null;

  return (
    <Portal
      title={`${p.dayClick}.${month}.${year} `}
      isVisible={p.isModalListNoties}
      onClose={() => p.setModalListNoties(false)}
    >
      <div className={color}>
        {filterListNotiesDay.length !== 0 ? (
          <ul className="list-items">
            {filterListNotiesDay.map((item) => (
              <li className="list-item">
                <div className="list-item__content">
                  <h3 className="list-item__title">{item.title}</h3>
                  <p className="list-item__description">{item.description}</p>
                </div>
                <div
                  className="list-item__cross"
                  onClick={() => {
                    deliteNoties(item);
                  }}
                >
                  &#10007;
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <>Пусто</>
        )}
      </div>
    </Portal>
  );
};

export default ModalListNoties;
