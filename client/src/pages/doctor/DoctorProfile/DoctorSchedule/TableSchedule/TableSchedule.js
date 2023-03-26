import React from "react";
import Calendar from "react-calendar";
import { useState, useEffect, useContext, useCallback } from "react";
import "react-calendar/dist/Calendar.css";
import "animate.css";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./TableSchedule.scss";
import "react-calendar/dist/Calendar.css";
import _ from "lodash";
import { formatSlot } from "~/utils";
import { DoctorContext } from "~/context/DoctorContext";

function TableSchedule(props) {
  const context = useContext(DoctorContext);
  const { setActiveSelect } = props;

  const [date, setDate] = useState(() => {
    const newDate = new Date();
    newDate.setHours(0, 0, 0);
    return newDate;
  });

  const tileDisabled = ({ date }) => {
    const currentDate = new Date();
    return date < currentDate && date.getDate() !== currentDate.getDate();
  };

  const handleNavigateUser = async (patient) => {
    await  context.fetchBookedSchedule(patient._id)
    setActiveSelect("patient");
  };

  return (
    <div className="schedule ">
      <div className="schedule__calender">
        <Calendar
          value={date}
          onChange={(value) => {
            context.setDate(value);
          }}
          tileDisabled={tileDisabled}
        />
      </div>
      <div className="schedule__table">
        <div className="schedule__calender-detail">
          <table className="">
            <thead>
              <tr>
                <th>Mã số</th>
                <th>Bệnh nhân</th>
                <th className="text-center">Khung giờ</th>
                <th>Dịch vụ</th>
                <th className="text-center">Khám</th>
              </tr>
            </thead>
            <tbody>
              {context.currentschedule && context.currentschedule.length > 0 ? (
                context.currentschedule.map((item, index) => {
                  return (
                    <tr
                      key={index}
                      style={item.isPaid ? { background: "#ebebeb" } : {}}
                    >
                    <td>{item?.billNumber}</td>
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
                        <FontAwesomeIcon
                          icon={faArrowRight}
                          style={
                            item.isPaid
                              ? {
                                  color: "#e5e5e5",
                                }
                              : {
                                  color: "var(--secondary-color)",
                                  cursor: "pointer",
                                  marginLeft: "30px",
                                  fontSize: "20px",
                                }
                          }
                          onClick={
                            item.isPaid
                              ? undefined
                              : () => handleNavigateUser(item)
                          }
                        />
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr className="no-date-available rounded-pill">
                  <td style={{ border: "none" }}>không có lịch</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TableSchedule;
