import React from "react";
import { NotiesType } from "../../../utils/LocalStorage";
import Portal from "../Portal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import "./ModalListNoties.css";
import { deliteNotieInList } from "../../../redux/userState";
interface ModalListNotiesTypes {
  dayClick: string | null;
  isModalListNoties: boolean;
  setModalListNoties: (val: boolean) => void;
  filterListNoties: NotiesType[] | undefined;
}
const ModalListNoties: React.FC<ModalListNotiesTypes> = (p) => {
  const dispatch = useDispatch();
  const { month, year } = useSelector((state: RootState) => state.calendar);
  const { listNoties } = useSelector((state: RootState) => state.user);
  let filterListNotiesDay = [];
  if (p.filterListNoties) {
    filterListNotiesDay = p.filterListNoties.filter(
      (item) => item.activeDay === p.dayClick
    );
  }
  const deliteNoties = (item: NotiesType) => {
    dispatch(deliteNotieInList(item));
  };
  if (!p.isModalListNoties) return null;
  return (
    <Portal
      title={`${p.dayClick}.${month}.${year} `}
      isVisible={p.isModalListNoties}
      onClose={() => p.setModalListNoties(false)}
    >
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
    </Portal>
  );
};

export default ModalListNoties;
