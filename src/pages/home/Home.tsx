import "./Home.css";
import { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
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
    <section className="page__calendar ">
      <div className="calendar__container _container">
        <div className="">
          <div className="calendar__header">
            <Year />
            <List />
          </div>
          <Calendar />
        </div>
        <div className="page__selector-color">
          <select onChange={(e) => handleThemeChange(e)}>
            <option selected={"green" === color} value="green">
              Green
            </option>
            <option selected={"pink" === color} value="pink">
              Pink
            </option>
            <option selected={"blue" === color} value="blue">
              Blue
            </option>
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
