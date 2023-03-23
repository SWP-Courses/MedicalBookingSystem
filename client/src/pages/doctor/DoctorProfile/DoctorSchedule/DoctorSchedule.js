import CurrentPatient from "./CurrentPatient/CurrentPatient";
import "./DoctorSchedule.scss";
import TableSchedule from "./TableSchedule/TableSchedule";
import { hanlderRequest } from "~/utils";
import API_URL from "~/api/Router";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "~/context/authContext";

function DoctorSchedule(props) {
  const { handleOptionClick, setPatient, setListUsers } = props;
  const [activeSelect, setActiveSelect] = useState("schedule");
  const [currentschedule, setCurrentSchedule] = useState([]);
  const [isBooked, setIsBooked] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [fetchDate, setFetchDate] = useState("");
  const [user, setUser] = useState({});

  useEffect(() => {
    fetchSchedule();
  }, [fetchDate]);

  const fetchSchedule = async () => {
    const [error, res] = await hanlderRequest(
      axios.get(
        `${API_URL}/bookedservices/doctors/${currentUser._id}?date=${fetchDate}`
      )
    );
    if (res && res.data) {
      setCurrentSchedule(res.data);
      setIsBooked(false);
    } else {
      console.log(`%c ${error.message} - ${error.code}`, "color: red");
      if (error?.response?.data) {
        setIsBooked(true);
        setCurrentSchedule([]);
      }
    }
  };

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
            currentschedule={currentschedule}
            activeSelect={activeSelect}
            setActiveSelect={setActiveSelect}
            isBooked={isBooked}
            setFetchDate={setFetchDate}
            setUser={setUser}
            setListUsers={setListUsers}
          />
        )}
        {activeSelect === "patient" && (
          <CurrentPatient
            user={user}
            handleOptionClick={handleOptionClick}
            setPatient={setPatient}
            fetchSchedule={fetchSchedule}
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
