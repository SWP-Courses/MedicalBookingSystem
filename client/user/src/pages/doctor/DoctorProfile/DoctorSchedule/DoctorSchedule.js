import "./DoctorSchedule.scss";

import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import { useState } from "react";

function DoctorSchedule() {
  const [value, onChange] = useState(new Date(2017, 10, 1));

  return (
    <div className="wrapper">
        <div className="calender">
            <Calendar 
                onChange={onChange} 
                value={value} 
                onClick={(value) => alert('New date is: ', value)}
            />
        </div>
        <div className="doctor-schedule-detail">
            <h1>doctor schedule detail</h1>
        </div>
    </div>
  );
}

export default DoctorSchedule;
