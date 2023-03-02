import Calendar from "react-calendar";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "~/context/authContext";
import axios from "axios";
import "react-calendar/dist/Calendar.css";
import "animate.css";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


import "./DoctorSchedule.scss";
import "react-calendar/dist/Calendar.css";
import API_URL from "~/api/Router";
import { formatDate } from "~/utils";
import { hanlderRequest } from "~/utils";
import ModalEditServices from "./ModalAddService/ModalEditServices";

function DoctorSchedule() {
  const { currentUser } = useContext(AuthContext);
  const [date, setDate] = useState(() => {
    const newDate = new Date();
    newDate.setHours(0, 0, 0);
    return newDate;
  });
  const [currentschedule, setCurrentSchedule] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [userService, setUserService] = useState({});

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
    } else {
      console.log(`${error.message} - ${error.code}`);
    }
  };

  const handleUpdateService = (customer) => {
    setModalShow(true);
    setUserService(customer);
  }

  // console.log("check date value: ", date);
  // console.log(">>>check current schedule: ", currentschedule);
  return (
    <div className="schedule ">
      <div className="schedule__calender animate__animated  animate__zoomIn">
        <Calendar
          value={date}
          onChange={(value) => setDate(value)}
          // onMouseOver={handleHoverGetValue}
        />
      </div>
      <div className="schedule__calender-detail">
        <span className="mr-4">Ngày: {formatDate(date)}</span>
        {currentschedule && currentschedule.length > 0 ? (
          <>
            <table className="mt-3">
              <thead>
                <tr>
                  <th>user ID</th>
                  <th>Khung Giờ</th>
                  <th>Dịch Vụ</th>
                  <th>Thanh Toán</th>
                  <th>Kê Thuốc</th>
                  <th>Sửa</th>
                </tr>
              </thead>
              <tbody>
                {currentschedule.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        {item?.customer.map((item, index) => {
                          return (
                            <p
                              key={index}
                            >{`${item._id} - ${item.fullname}`}</p>
                          );
                        })}
                      </td>
                      <td>{item.slot_time}</td>
                      <td>
                        {item?.services.map((service, index) => {
                          return (
                            <p key={index}>{`${service.name}`}</p>
                          ) 
                        })}
                      </td>
                      <td>done</td>
                      <td>kê đơn</td>
                      <td>
                        <span
                          className="schedule__calender-icon"
                          onClick={() => handleUpdateService(item)}
                        >
                          <FontAwesomeIcon icon={faPenToSquare} />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        ) : (
          <>
            <span className="mt-3">hiện không có lịch</span>
          </>
        )}
      </div>

      {/* 
        this modal gonna mouted by the time the component Doctorschedule was called 
        so if this modal have any logic setState in it,  
        it will cause the component re-render directly inside component DoctorSchedule 
        but we can not see it happen, 
        but place console.log in the modal we can see it 
        ===> this re-render is not nessesary 
      */}
      <ModalEditServices
        modalShow={modalShow}
        setModalShow={setModalShow}
        bookedUser={userService}
        fetchSchedule={fetchSchedule}
      />
    </div>
  );
}

export default DoctorSchedule;
