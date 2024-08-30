import "./Home.css";
import { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import Year from "../../components/year/Year";
import List from "../../components/list/List";
import Calendar from "../../components/calendar/Calendar";
import Popup from "../../elements/popup/popup";
import { useHome } from "../../hooks/useHome";
import { RootState } from "../../redux/store";
import { setColor } from "../../redux/calendarState";

const Home = () => {
  const dispatch = useDispatch();

  const { showPopup, handleClosePopup } = useHome();

  const { color } = useSelector((state: RootState) => state.calendar);

  const handleThemeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (
      e.target.value === "green" ||
      e.target.value === "pink" ||
      e.target.value === "blue"
    ) {
      dispatch(setColor(e.target.value));
    }
  };

  return (
    <section className="page__calendar">
      <div className="calendar__container _container">
        <motion.div
          className=""
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="calendar__header">
            <Year />
            <List />
          </div>
          <Calendar />
        </motion.div>
        <div className="page__selector-color">
          <select onChange={(e) => handleThemeChange(e)} value={color}>
            <option value="green">Green</option>
            <option value="pink">Pink</option>
            <option value="blue">Blue</option>
          </select>
        </div>
      </div>
      <Popup
        icon="&#9989;"
        text="Successful login"
        isVisible={showPopup}
        onClose={handleClosePopup}
      />
    </section>
  );
};

export default Home;
