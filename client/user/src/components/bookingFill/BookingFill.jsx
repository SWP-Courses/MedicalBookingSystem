import "./bookingFill.scss";
import { compareAsc, compareDesc, isAfter, isEqual } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faCalendar,
  faEnvelope,
  faIdCard,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Calendar } from "react-calendar";
import { format } from "date-fns";
import { AuthContext } from "~/context/authContext";

const getServiceName = () => {};

export default function BookingFill({
  booking,
  setBooking,
  services,
  freeDoctors,
  freeSlots,
}) {
  const { currentUser } = useContext(AuthContext);
  const [step, setStep] = useState(1);

  useEffect(() => {
    currentUser &&
      setBooking((prev) => ({
        ...prev,
        fullname: currentUser.fullname,
        gender: currentUser.gender,
        dateOfBirth: currentUser.dateOfBirth,
        phone: currentUser.phone,
        email: currentUser.email,
      }));
  }, [currentUser, setBooking]);
  console.log(currentUser);

  const handleTextInput = (e, field) =>
    setBooking((prev) => ({ ...prev, [field]: e.target.value }));

  const handleChooseService = (service) => {
    const { name, _id } = service;
    setBooking((prev) => ({ ...prev, service: { name, _id } }));
  };

  const handleTimeClick = (slot) => {
    setBooking((prev) => ({ ...prev, slot: slot }));
  };
  console.log(booking);
  return (
    <div className="bookingContent">
      <div className="hospitalPart">
        <Dropdown className="dropdownContain">
          <Dropdown.Toggle id="dropdown-basic" className="dropdownText">
            <div className="text">
              <FontAwesomeIcon icon={faBriefcase} />
              {!booking.service
                ? "Chọn chuyên khoa khám"
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
        <span className="title">Thời gian khám</span>
        <div className="date">
          <span>Ngày khám: {format(booking.date, "yyyy-MM-dd")}</span>
          <Calendar
            onChange={(item) => setBooking((prev) => ({ ...prev, date: item }))}
            value={booking.date}
            // tileDisabled={({ date }) => {
            //   let newDate = new Date();
            //   if(isEqual(date, newDate)) return false;
            //   return date.getDay() === 0 || isAfter(newDate, date)
            // }
            // }
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
        <div className="time">
          <span>Giờ khám</span>
          <div className="groupTime">
            {freeSlots?.map((slot) => (
              <span
                className={`timeItem ${
                  booking?.slot?.slot_number === slot?.slot_number && "active"
                }`}
                onClick={() => handleTimeClick(slot)}
              >
                {slot.time}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="divideLine"></div>

      <div className="userFillPart">
        <h2>Thông tin cá nhân</h2>
        <div className="twoInfoInput">
          <div className="fillInput">
            <FontAwesomeIcon icon={faUser} />
            <input
              type="text"
              placeholder="Họ và tên (*)"
              required
              value={booking.fullname}
              onChange={(e) => handleTextInput(e, "fullname")}
            />
          </div>
          <input
            type="radio"
            name="gender"
            id="male"
            onClick={(e) =>
              setBooking((prev) => ({ ...prev, gender: e.target.id }))
            }
            checked={booking.gender === "male" && "checked"}
          />
          Nam
          <input
            type="radio"
            name="gender"
            id="female"
            checked={booking.gender === "female" && "checked"}
            onClick={(e) =>
              setBooking((prev) => ({ ...prev, gender: e.target.id }))
            }
          />
          Nữ
        </div>
        <div className="fillInput">
          <FontAwesomeIcon icon={faCalendar} />
          <input
            type="text"
            placeholder="Ngày sinh (*)"
            required
            value={booking.dateOfBirth}
            onChange={(e) => handleTextInput(e, "birth")}
          />
        </div>
        <div className="fillInput">
          <FontAwesomeIcon icon={faPhone} />
          <input
            type="text"
            placeholder="Số điện thoại liên lạc (*)"
            required
            value={booking.phone}
            onChange={(e) => handleTextInput(e, "phone")}
          />
        </div>
        <div className="fillInput">
          <FontAwesomeIcon icon={faEnvelope} />
          <input
            type="text"
            placeholder="Email"
            required
            value={booking.email}
            onChange={(e) => handleTextInput(e, "email")}
          />
        </div>
      </div>
    </div>
  );
}
