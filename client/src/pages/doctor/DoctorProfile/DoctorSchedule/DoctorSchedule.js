import CurrentPatient from "./CurrentPatient/CurrentPatient";
import "./DoctorSchedule.scss";
import TableSchedule from "./TableSchedule/TableSchedule";
import { useState } from "react";

function DoctorSchedule(props) {
  const [activeSelect, setActiveSelect] = useState("schedule");
  const { handleOptionClick } = props;

  return (
    <>
      <header className="nav">
        <button
          className={
            activeSelect === "schedule"
              ? "nav__schedule-btn rounded-pill isActive"
              : "nav__schedule-btn rounded-pill"
          }
          onClick={() => setActiveSelect("schedule")}
        >
          Lịch hôm nay
        </button>
        <button
          className={
            activeSelect === "patient"
              ? "nav__current-patient rounded-pill isActive"
              : "nav__current-patient rounded-pill"
          }
          onClick={() => setActiveSelect("patient")}
        >
          Bệnh nhân đang khám
        </button>
      </header>
      <div className="doctor-schedule">
        {/* <div className="separate"></div> */}
        {activeSelect === "schedule" && (
          <TableSchedule
            setActiveSelect={setActiveSelect}
            // isBooked={isBooked}
            // setListUsers={setListUsers}
          />
        )}
        {activeSelect === "patient" && (
          <CurrentPatient
            // setPatient={setPatient}
            handleOptionClick={handleOptionClick}
          />
        )}
      </div>
    </>
  );
}

export default DoctorSchedule;
