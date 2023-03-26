import { useState, useEffect, createContext, useContext } from "react";
import { hanlderRequest } from "~/utils";
import API_URL from "~/api/Router";
import axios from "axios";
import { AuthContext } from "~/context/authContext";

const DoctorContext = createContext(null);

function DoctorProvider({ children }) {
  const [currentschedule, setCurrentSchedule] = useState([]);
  // const [isBooked, setIsBooked] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [user, setUser] = useState({});
  const [date, setDate] = useState(() => {
    const newDate = new Date();
    newDate.setHours(0, 0, 0);
    return newDate; 
  });

  useEffect(() => {
    fetchSchedule();
  }, [date]);

  const fetchSchedule = async () => {
    const [error, res] = await hanlderRequest(
      axios.get(
        `${API_URL}/bookedservices/doctors/${currentUser._id}?date=${date}`
      )
    );
    if (res && res.data) {
      setCurrentSchedule(res.data);
      // setIsBooked(false); 
    } else {
      console.log(`%c ${error.message} - ${error.code}`, "color: red");
      if (error?.response?.data) {
        // setIsBooked(true);
        setCurrentSchedule([]);
      }
    }
  };

  const fetchBookedSchedule = async (id) => {
    const [error, res] = await hanlderRequest(
      axios.get(
        `${API_URL}/bookedservices/${id}`
      )
    );
    if (res) {
      setUser(res.data.result);
      return res.data.result;
    } else {
      console.log(`%c ${error.message} - ${error.code}`, "color: red");
    }
  };

  const value = {
    user,
    date,
    currentschedule,
    setDate,
    setUser,
    fetchSchedule,
    fetchBookedSchedule
  };

  return <DoctorContext.Provider value={value}>{children}</DoctorContext.Provider>;
}

export { DoctorContext, DoctorProvider };
