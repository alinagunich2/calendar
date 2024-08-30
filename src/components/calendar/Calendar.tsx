import "./Calendar.css";
import Popup from "../../elements/popup/popup";
import ModalCreateNoties from "../modals/modalCreateNoties/ModalCreateNoties";
import ModalListNoties from "../modals/modalListNoties/ModalListNoties";
import { useTodayHandler } from "../../hooks/hooksCalendar/useToDayStap";
import { useCalendar } from "../../hooks/hooksCalendar/useCalendar";
import { useModalOpen } from "../../hooks/hooksCalendar/useModalOpen";

const Calendar = () => {
  const {
    daysInCalendar,
    activeDay,
    month,
    year,
    filterListNoties,
    showPopup,
    setShowPopup,
    handleClosePopup,
    color,
  } = useCalendar();
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
    <div className={`calendar ${color}`}>
      <div className="calendar__head">
        <div className="calendar__today" onClick={goToDay}>
          Today
        </div>
        <div onClick={() => openModal(activeDay)} className="calendar__add">
          &#128396;
        </div>
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
        setShowPopup={setShowPopup}
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
      <Popup
        icon="&#9989;"
        text="Successful login"
        isVisible={showPopup}
        onClose={handleClosePopup}
      />
    </div>
  );
};

export default Calendar;
