import CurrentPatient from "./CurrentPatient/CurrentPatient";
import "./DoctorSchedule.scss";
import TableSchedule from "./TableSchedule/TableSchedule";
import { hanlderRequest } from "~/utils";
import API_URL from "~/api/Router";
import axios from "axios";
import { useState, useEffect, useContext} from "react";
import { AuthContext } from "~/context/authContext";

function DoctorSchedule() {
  const [activeSelect, setActiveSelect] = useState("schedule");
  const [currentschedule, setCurrentSchedule] = useState([]);
  const [isBooked, setIsBooked] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [fetchDate, setFetchDate]= useState('');
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
    <div className="doctor-schedule">
      <header className="nav">
        <button
          className={
            activeSelect === "schedule"
              ? "nav__schedule-btn isActive"
              : "nav__schedule-btn"
          }
          onClick={() => setActiveSelect("schedule")}
        >
          Lịch hôm nay
        </button>
        <button
          className={
            activeSelect === "patient"
              ? "nav__current-patient isActive"
              : "nav__current-patient"
          }
          onClick={() => setActiveSelect("patient")}
        >
          Bệnh nhân đang khám
        </button>
      </header>
      <div className="separate"></div>
      {activeSelect === "schedule" && (
        <TableSchedule
          currentschedule={currentschedule}
          activeSelect={activeSelect}
          setActiveSelect={setActiveSelect}
          isBooked={isBooked}
          fetchSchedule={fetchSchedule}
          setFetchDate={setFetchDate}
          setUser={setUser}
        />
      )}
      {activeSelect === "patient" && <CurrentPatient user={user}/>}
    </div>
  );
}

export default DoctorSchedule;
