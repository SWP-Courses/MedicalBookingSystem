import Calendar from "react-calendar";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "~/context/authContext";
import axios from "axios";
import 'react-calendar/dist/Calendar.css';
import 'animate.css';

import "./DoctorSchedule.scss";
import "react-calendar/dist/Calendar.css";
import API_URL from "~/api/Router";
import { formatDate } from "~/utils";

function DoctorSchedule() {
  const { currentUser } = useContext(AuthContext);
  const [value, setDate] = useState(new Date());
  const [currentschedule, setCurrentSchedule] = useState([]);

  useEffect(() => {
    if (value) {
      try {
        fetchSchedule();
      } catch (error) {
        console.log(error);
      }
    }
  }, [value]);

  const fetchSchedule = async () => {
    const res = await axios.get(
      `${API_URL}/bookedservices/doctors/${currentUser._id}?date=${value}`
    );
    if (res && res.data) {
      setCurrentSchedule(res.data);
    }
  };

  const handleHoverGetValue = (e) => {
    console.log('check hover value: ', e.target.value);
  }

  return (
    <div className="schedule ">
      <div className="schedule__calender animate__animated  animate__zoomIn">
        <Calendar 
          value={value} 
          onChange={(value) => setDate(value)} 
          // onMouseOver={handleHoverGetValue}
          hover
        />
      </div>
      <div className="schedule__calender-detail">
        <span>Ngày: {formatDate(value)}</span>
        {
          currentschedule && currentschedule.length > 0 ? (
            <>
              <table className="mt-3">
                <thead>
                  <tr>
                    <th>user ID</th>
                    <th>Slot</th>
                    <th>Services</th>
                  </tr>
                </thead>
                <tbody>
                  {currentschedule.map(() => {
                    return (
                      <tr>
                        <td>121321323131321</td>
                        <td>8:00</td>
                        <td>Nhổ Răng</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          ) : (
            <><p className="mt-3">no booking available</p></>
          )
        }
      </div>
    </div>
  );
}

export default DoctorSchedule;
