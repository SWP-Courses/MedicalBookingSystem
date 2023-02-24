import Calendar from "react-calendar";
import { useState , useEffect, useContext} from "react";
import { AuthContext } from "~/context/authContext";
import axios from "axios";

import "./DoctorSchedule.scss";
import "react-calendar/dist/Calendar.css";
import API_URL from "~/api/Router";

function DoctorSchedule() {
  const [value, setDate] = useState("");

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {}, []);

  const fetchSchedule = () => {
    const res = axios.get(`${API_URL}/bookedservices/doctors/${currentUser._id}?date=${value}`);
  };

  return (
    <div className="schedule">
      <div className="schedule__calender">
        <Calendar
          value={value}
          onChange={(value) => setDate(value)}
        />
      </div>
      <div className="schedule__calender-detail">
        <span>Ngày: </span>
        <span>{value.toLocaleString()}</span>
      </div>
    </div>
  );
}

export default DoctorSchedule;
