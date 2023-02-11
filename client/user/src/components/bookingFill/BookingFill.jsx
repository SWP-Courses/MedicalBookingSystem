import "./bookingFill.scss";
import { useState } from "react";
import { services } from "../../fakeData";
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
import { doctorList } from "../../fakeData";

export default function BookingFill({ booking, setBooking }) {
  console.log(booking);
  const [step, setStep] = useState(1);

  const handleTextInput = (e, field) =>
    setBooking((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <div className="bookingContent">
      <div className="hospitalPart">
        <Dropdown className="dropdownContain">
          <Dropdown.Toggle id="dropdown-basic" className="dropdownText">
            <div className="text">
              <FontAwesomeIcon icon={faBriefcase} />
              {!booking.specialist
                ? "Chọn chuyên khoa khám"
                : booking.specialist}
            </div>
          </Dropdown.Toggle>

          <Dropdown.Menu className="dropdownOptions">
            {services.map((service) => (
              <Dropdown.Item
                href="#/action-1"
                onClick={() =>
                  setBooking((prev) => ({ ...prev, specialist: service }))
                }
              >
                {service}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <div className="timeAvailable">
          <span className="title">Thời gian khám</span>
          <div className="date">
            <span>Ngày khám: {format(booking.date, "yyyy-MM-dd")}</span>
            <Calendar
              onChange={(item) =>
                setBooking((prev) => ({ ...prev, date: item }))
              }
              value={booking.date}
            />
          </div>
          <div className="time">
            <span>Giờ khám</span>
            <div className="groupTime">
              <span className="timeItem active">08:00</span>
              <span className="timeItem">09:00</span>
              <span className="timeItem">10:00</span>
              <span className="timeItem">11:00</span>
            </div>
          </div>
        </div>

        <Dropdown className="dropdownContain">
          <Dropdown.Toggle id="dropdown-basic" className="dropdownText">
            <div className="text">
              <FontAwesomeIcon icon={faBriefcase} />
              {!booking.doctor ? "Chọn bác sĩ muốn khám" : booking.doctor}
            </div>
          </Dropdown.Toggle>

          <Dropdown.Menu className="dropdownOptions">
            {doctorList.slice(0, 3).map((doctor) => (
              <Dropdown.Item
                href="#/action-1"
                onClick={() =>
                  setBooking((prev) => ({ ...prev, doctor: doctor.name }))
                }
              >
                {doctor.name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
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
            id="Nam"
            onClick={(e) =>
              setBooking((prev) => ({ ...prev, gender: e.target.id }))
            }
            checked={booking.gender === "Nam" && "checked"}
          />
          Nam
          <input
            type="radio"
            name="gender"
            id="Nữ"
            checked={booking.gender === "Nữ" && "checked"}
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
            onChange={(e) => handleTextInput(e, "birth")}
          />
        </div>
        <div className="fillInput">
          <FontAwesomeIcon icon={faPhone} />
          <input
            type="text"
            placeholder="Số điện thoại liên lạc (*)"
            required
            onChange={(e) => handleTextInput(e, "phone")}
          />
        </div>
        <div className="fillInput">
          <FontAwesomeIcon icon={faEnvelope} />
          <input
            type="text"
            placeholder="Email"
            required
            onChange={(e) => handleTextInput(e, "email")}
          />
        </div>
        <div className="fillInput">
          <FontAwesomeIcon icon={faIdCard} />
          <input
            type="text"
            placeholder="CMND / CCCD"
            required
            onChange={(e) => handleTextInput(e, "nationalId")}
          />
        </div>
      </div>
    </div>
  );
}
