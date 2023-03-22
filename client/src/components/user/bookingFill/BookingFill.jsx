import "./bookingFill.scss";
import { useContext, useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { Calendar } from "react-calendar";
import { format } from "date-fns";
import { AuthContext } from "~/context/authContext";
import { formatSlot } from "~/utils";


export default function BookingFill({
  booking,
  setBooking,
  services,
  freeDoctors,
  freeSlots,
}) {
  const { currentUser } = useContext(AuthContext);
  const [step, setStep] = useState(1);

  const handleTextInput = (e, field) =>
    setBooking((prev) => ({ ...prev, [field]: e.target.value }));

  const handleChooseService = (service) => {
    const { name, _id } = service;
    setBooking((prev) => ({ ...prev, service: { name, _id } }));
  };

  const handleTimeClick = (time) => {
    setBooking((prev) => ({ ...prev, slot: time }));
  };
  console.log(booking);
  return (
    <div className="bookingContent">
      <div className="hospitalPart">
        <span className="title">Thời gian khám</span>
        <div className="date">
          <span className="d-block mb-2 fs-5">Ngày khám: {format(booking.date, "dd/MM/yyyy")}</span>
          <Calendar
            onChange={(item) => setBooking((prev) => ({ ...prev, date: item }))}
            value={booking.date}
            tileDisabled={({ date }) => {
              let newDate = new Date();
              // enable today
              if (
                date.getDate() === newDate.getDate() &&
                date.getMonth() === newDate.getMonth() &&
                date.getFullYear() === newDate.getFullYear()
              )
                return false;

              // if last days, over next 7 days
              return (
                // date.getDay() === 0 ||
                newDate > date ||
                date > newDate.setDate(newDate.getDate() + 7)
              );
            }}
          />
        </div>
        <Dropdown className="dropdownContain">
          <Dropdown.Toggle id="dropdown-basic" className="dropdownText">
            <div className="text">
              <FontAwesomeIcon icon={faBriefcase} />
              {!booking.doctor
                ? "Chọn bác sĩ muốn khám"
                : booking.doctor.fullname}
            </div>
          </Dropdown.Toggle>

          <Dropdown.Menu className="dropdownOptions">
            {freeDoctors?.map((doctor) => (
              <Dropdown.Item
                onClick={() =>
                  setBooking((prev) => ({ ...prev, doctor: doctor }))
                }
              >
                {doctor.fullname}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        
        {/* Chọn dịch vụ khám */}
        <Dropdown className="dropdownContain">
          <Dropdown.Toggle id="dropdown-basic" className="dropdownText">
            <div className="text">
              <FontAwesomeIcon icon={faBriefcase} />
              {!booking.service
                ? "Chọn dịch vụ khám"
                : booking.service.name}
            </div>
          </Dropdown.Toggle>

          <Dropdown.Menu className="dropdownOptions">
            {services?.map((service) => (
              <Dropdown.Item onClick={() => handleChooseService(service)}>
                {service.name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <div className="time">
          <span>Giờ khám</span>
          <div className="groupTime">
            {freeSlots?.map((slot) => (
              <span
                className={`timeItem ${
                  booking?.slot === slot?.time && "active"
                }`}
                onClick={() => handleTimeClick(slot.time)}
              >
                {formatSlot(slot.time)}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
