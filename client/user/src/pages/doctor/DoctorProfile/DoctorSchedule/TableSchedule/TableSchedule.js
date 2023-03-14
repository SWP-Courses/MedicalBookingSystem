import React from "react";
import Calendar from "react-calendar";
import { useState, useEffect, useContext, useCallback } from "react";
import "react-calendar/dist/Calendar.css";
import "animate.css";
import {
  faArrowRight,
  faCheck,
  faPenToSquare,
  faPills,
  faTicket,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./TableSchedule.scss";
import "react-calendar/dist/Calendar.css";
import { formatDate } from "~/utils";
import _ from "lodash";
import { formatSlot } from "~/utils";


function TableSchedule(props) {
  const {
    handleOptionClick,
    setPatient,
    setListUsers,
    activeSelect,
    setActiveSelect,
    currentschedule,
    isBooked,
    setFetchDate,
    setUser,
  } = props;
  const [date, setDate] = useState(() => {
    const newDate = new Date();
    newDate.setHours(0, 0, 0);
    return newDate;
  });

  const tileDisabled = ({ date }) => {
    const currentDate = new Date();
    return date < currentDate && date.getDate() !== currentDate.getDate();
  };

  const handleNavigateUser = (customer) => {
      setUser(customer)
    setActiveSelect("patient");
    // setUserService(customer);
  };

  useEffect(() => {
    // setListUsers(() => {
    //   let users = [];
    //   for (const schedule of currentschedule) {
    //     if (schedule.customer) {
    //       schedule.customer.map((user) => {
    //         users.push({
    //           service_id: schedule._id,
    //           user_data: user,
    //         });
    //       });
    //     }
    //   }
    //   return users;
    // });
  }, [currentschedule]);

  return (
    <div className="schedule ">
      <div className="schedule__calender">
        <div className="schedule__date-detail">
          <span
            style={{
              fontWeight: "600",
              fontSize: "20px",
              color: "#444850",
            }}
          >
            {formatDate(date)}
          </span>
        </div>
        <Calendar
          value={date}
          onChange={(value) => {
            setDate(value);
            setFetchDate(value);
          }}
          tileDisabled={tileDisabled}
        />
      </div>
      <div className="schedule__table">
        <div className="schedule__calender-detail">
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
                <th>Khám</th>
              </tr>
            </thead>
            <tbody>
              {currentschedule.map((item, index) => {
                return (
                  <>
                    <tr key={`unique-id-${index}`}>
                      <td>{item?.customer[0]?.fullname}</td>
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
                          {
                            <span
                              className={
                                item.isPaid ? "btn-paid" : "btn-not-paid"
                              }
                            >
                              <FontAwesomeIcon
                                icon={item.isPaid ? faCheck : faXmark}
                                style={{
                                  fontSize: "18px",
                                  marginRight: "2px",
                                }}
                              />
                            </span>
                          }
                        </center>
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
                            style={{
                              fontSize: "24px",
                              cursor: "pointer",
                              color: "var(--primary)",
                            }}
                          />
                        </center>
                      </td>
                      <td>
                        <center
                          className={
                            item.isPaid
                              ? `schedule__calender-icon disabled`
                              : `schedule__calender-icon`
                          }
                          onClick={
                            item.isPaid
                              ? undefined
                              : () => handleNavigateUser(item)
                          }
                        >
                          <FontAwesomeIcon icon={faArrowRight} />
                        </center>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
          {isBooked && <span className="no-date-available">không có lịch</span>}
        </div>
      </div>
    </div>
  );
}

export default TableSchedule;
