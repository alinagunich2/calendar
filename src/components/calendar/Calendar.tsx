import "./Calendar.css";
import ModalCreateNoties from "../modals/modalCreateNoties/ModalCreateNoties";
import ModalListNoties from "../modals/modalListNoties/ModalListNoties";
import { useTodayHandler } from "../../hooks/hooksCalendar/useToDayStap";
import { useCalendar } from "../../hooks/hooksCalendar/useCalendar";
import { useModalOpen } from "../../hooks/hooksCalendar/useModalOpen";

const Calendar = () => {
  const { daysInCalendar, activeDay, month, year, filterListNoties } =
    useCalendar();
  const {
    setModalListNoties,
    isModalListNoties,
    openModal,
    isModalCreate,
    setIsModalCreate,
    dayClick,
    openModalList,
  } = useModalOpen();
  const { toDay, toMonth, toYear, goToDay } = useTodayHandler();

  return (
    <div className="calendar">
      <div className="calendar__today" onClick={goToDay}>
        Today
      </div>
      <div className="days">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
          <div className="day-name" key={day}>
            {day}
          </div>
        ))}
        {daysInCalendar.map((day: string | null, i: number) => {
          const hasNoties = filterListNoties?.some(
            (item) => item.activeDay === day
          );

          return (
            <div
              onClick={() => openModal(day)}
              key={i}
              className={`day current-month ${day === activeDay && "active"} ${
                toDay === day && toMonth === month && toYear === year && "today"
              }`}
            >
              {parseInt(String(day), 10) ? parseInt(String(day), 10) : ""}

              {hasNoties && (
                <div
                  className="calendar__noties_dot"
                  onClick={(e) => openModalList(e, day)}
                ></div>
              )}
            </div>
          );
        })}
      </div>
      <ModalCreateNoties
        title={"Create Event"}
        isModalCreate={isModalCreate}
        setIsModalCreate={setIsModalCreate}
      />
      <ModalListNoties
        filterListNoties={filterListNoties}
        dayClick={dayClick}
        isModalListNoties={isModalListNoties}
        setModalListNoties={setModalListNoties}
      />
    </div>
  );
};

export default Calendar;
