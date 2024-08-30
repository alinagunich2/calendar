import Year from "../../components/year/Year";
import List from "../../components/list/List";
import Calendar from "../../components/calendar/Calendar";
import "./Home.css";

const Home = () => {
  return (
    <section className="page__calendar ">
      <div className="calendar__container _container">
        <div className="calendar__header">
          <Year />
          <List />
        </div>
        <Calendar />
      </div>
    </section>
  );
};

export default Home;
