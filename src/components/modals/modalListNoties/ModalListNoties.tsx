import { motion, AnimatePresence } from "framer-motion";
import "./ModalListNoties.css";
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

  return (
    <AnimatePresence>
      {p.isModalListNoties && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className={`modal ${color}`}
        >
          <div className="modal__container">
            <div className="modal__header">
              <h2 className="modal__title">{`${p.dayClick}.${month}.${year} `}</h2>
              <div
                className="modal__close"
                onClick={() => p.setModalListNoties(false)}
              >
                &#10060;
              </div>
            </div>
            <div className={color}>
              {filterListNotiesDay.length !== 0 ? (
                <ul className="list-items">
                  {filterListNotiesDay.map((item) => (
                    <li className="list-item" key={item.id}>
                      <div className="list-item__content">
                        <h3 className="list-item__title">{item.title}</h3>
                        <p className="list-item__description">
                          {item.description}
                        </p>
                      </div>
                      <div
                        className="list-item__cross"
                        onClick={() => deliteNoties(item)}
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
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalListNoties;
