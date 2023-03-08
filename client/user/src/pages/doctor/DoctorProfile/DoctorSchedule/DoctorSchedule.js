import Calendar from "react-calendar";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "~/context/authContext";
import axios from "axios";
import "react-calendar/dist/Calendar.css";
import "animate.css";
import {
  faCheck,
  faPenToSquare,
  faPills,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./DoctorSchedule.scss";
import "react-calendar/dist/Calendar.css";
import API_URL from "~/api/Router";
import { formatDate } from "~/utils";
import { hanlderRequest } from "~/utils";
import ModalEditServices from "./ModalAddService/ModalEditServices";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import { formatSlot } from "~/utils";

function DoctorSchedule(props) {
  const { handleOptionClick, setPatient, setListUsers } = props;

  const { currentUser } = useContext(AuthContext);
  const [date, setDate] = useState(() => {
    const newDate = new Date();
    newDate.setHours(0, 0, 0);
    return newDate;
  });
  const [modalShow, setModalShow] = useState(false);
  const [userService, setUserService] = useState({});
  const navigate = useNavigate();
  const [currentschedule, setCurrentSchedule] = useState([]);

  const handleEditService = (customer) => {
    setModalShow(true);
    setUserService(customer);
  };

  useEffect(() => {
    if (!_.isEmpty(currentschedule)) {
    }

    setListUsers(() => {
      let users = [];
      for (const schedule of currentschedule) {
        if (schedule.customer) {
          schedule.customer.map((user) => {
            users.push({
              service_id: schedule._id,
              user_data: user,
            });
          });
        }
      }
      return users;
    });
  }, [currentschedule]);

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

  // console.log("check date value: ", date);
  // console.log(">>>check current schedule: ", currentschedule);
  return (
    <div className="schedule ">
      <div className="schedule__calender">
        <Calendar
          value={date}
          onChange={(value) => setDate(value)}
          // onMouseOver={handleHoverGetValue}
        />
      </div>
      <div className="schedule__calender-detail">
        <span className="mr-4" style={{ color: "#a0a0a0" }}>
          Ngày{" "}
        </span>
        <span style={{ fontWeight: "600" }}>{formatDate(date)}</span>
        <table className="mt-3">
          <thead>
            <tr>
              <th>Tên</th>
              <th>Khung Giờ</th>
              <th>Dịch Vụ</th>
              <th>
                <center>Thanh Toán</center>
              </th>
              <th>Kê Thuốc</th>
              <th>Sửa</th>
            </tr>
          </thead>
          <tbody>
            {currentschedule.map((item, index) => {
              return (
                <tr key={index} >
                  <td >{item?.customer[0]?.fullname}</td>
                  <td>
                    <center>{formatSlot(item.slot_time)}</center>
                  </td>
                  <td>
                    {item?.services.map((service, index) => {
                      return <p key={index}>{`${service.name}`}</p>;
                    })}
                  </td>
                  <td>
                    <center>
                      <button className="btn-paid">
                        <FontAwesomeIcon
                          icon={faCheck}
                          style={{ fontSize: "15px", marginRight: "2px" }}
                        />
                      </button>
                    </center>
                    {/* <button
                          className="btn-not-paid"
                          onClick={() => {
                            setPatient(item);
                            handleOptionClick("prescription");
                          }}
                        >
                          chưa thanh toán
                        </button> */}
                  </td>
                  <td>
                    <center
                      onClick={() => {
                        setPatient(item);
                        handleOptionClick("prescription");
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faPills}
                        style={{ fontSize: "22px", cursor: "pointer", color: 'var(--primary)' }}
                      />
                    </center>
                  </td>
                  <td>
                    <center
                      className="schedule__calender-icon"
                      onClick={() => handleEditService(item)}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} style={{color: '#2892ed'}}/>
                    </center>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {currentschedule && currentschedule.length > 0 ? (
          ""
        ) : (
          <span className="no-date-available">hiện không có lịch</span>
        )}
      </div>

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
