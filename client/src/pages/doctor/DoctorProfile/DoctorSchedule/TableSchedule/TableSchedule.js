import React from "react";
import Calendar from "react-calendar";
import { useState, useEffect, useContext, useCallback } from "react";
import "react-calendar/dist/Calendar.css";
import "animate.css";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./TableSchedule.scss";
import "react-calendar/dist/Calendar.css";
import { formatDate } from "~/utils";
import _ from "lodash";
import { formatSlot } from "~/utils";
import { DoctorContext } from "~/context/DoctorContext";

function TableSchedule(props) {
  const context = useContext(DoctorContext);
  const { setListUsers, setActiveSelect, isBooked } = props;

  const [date, setDate] = useState(() => {
    const newDate = new Date();
    newDate.setHours(0, 0, 0);
    return newDate;
  });

  const tileDisabled = ({ date }) => {
    const currentDate = new Date();
    return date < currentDate && date.getDate() !== currentDate.getDate();
  };

  const handleNavigateUser = (patient) => {
    context.setUser(patient);
    setActiveSelect("patient");
    // setUserService(customer);
  };

  useEffect(() => {
    // setListUsers(() => {
    //   let users = [];
    //   for (const schedule of context.currentschedule) {
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
  }, [context.currentschedule]);

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
          <table className="mt-3">
            <thead>
              <tr>
                <th>Tên</th>
                <th>Khung Giờ</th>
                <th>Dịch Vụ</th>
                <th>Khám</th>
              </tr>
            </thead>
              {context.currentschedule &&
                context.currentschedule.length > 0 &&
                context.currentschedule.map((item, index) => {
                  return (
                    <React.Fragment key={item._id}>
                      <tbody>
                      <tr key={`unique-id-${index}`}>
                        <td>{item?.customer[0]?.fullname}</td>
                        <td>
                          <center>{formatSlot(item.slot_time)}</center>
                        </td>
                        <td>
                          {item?.services.map((service, index) => {
                            return <p key={service._id}>{`${service.name}`}</p>;
                          })}
                        </td>
                        <td>
                          <span
                            className={
                              item.isPaid
                                ? `schedule__calender-icon disabled`
                                : `schedule__calender-icon ml-3`
                            }
                            onClick={
                              item.isPaid
                                ? undefined
                                : () => handleNavigateUser(item)
                            }
                          >
                            <FontAwesomeIcon
                              icon={faArrowRight}
                              style={{
                                color: "var(--secondary-color)",
                                cursor: "pointer",
                              }}
                            />
                          </span>
                        </td>
                      </tr>
                      </tbody>
                    </React.Fragment>
                  );
                })}
          </table>
          {isBooked && (
            <span className="no-date-available rounded-pill">
              không có lịch
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default TableSchedule;
