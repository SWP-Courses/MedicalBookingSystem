import CurrentPatient from "./CurrentPatient/CurrentPatient";
import "./DoctorSchedule.scss";
import TableSchedule from "./TableSchedule/TableSchedule";

import { useState } from "react";

function DoctorSchedule() {
  const [activeSelect, setActiveSelect] = useState("schedule");

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
        <div className="separate"></div>
        {activeSelect === "schedule" && (
          <TableSchedule
            // currentschedule={currentschedule}
            // activeSelect={activeSelect}
            setActiveSelect={setActiveSelect}
            // isBooked={isBooked}
            // setUser={setUser} 
            // setListUsers={setListUsers}
          />
        )}
        {activeSelect === "patient" && (
          <CurrentPatient
            // handleOptionClick={handleOptionClick}
            // setPatient={setPatient}
            // fetchSchedule={fetchSchedule}
          />
        )}
      </div>
      {/* <div className="">
        <button className="cancle-btn" onClick={hanldeCloseModal}>
          Hủy
        </button>
        <Button
          className="ml-3"
          onClick={() => handleUpdateServices(bookedUser)}
        >
          Cập Nhật
        </Button>
      </div> */}
    </>
  );
}

export default DoctorSchedule;
