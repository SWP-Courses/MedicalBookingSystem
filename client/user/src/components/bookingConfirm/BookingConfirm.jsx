import { faFaceAngry } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import { useContext } from "react";
import { AuthContext } from "~/context/authContext";
import "./bookingConfirm.scss";

export default function BookingConfirm({ booking }) {
  // console.log(booking);
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  return (
    <div className="bookingConfirm">
      <h2 className="infoTitle">Khách hàng</h2>
      <div className="infoItem">
        <span className="bookingKey">Khách hàng</span>
        <span className="bookingValue">{currentUser?.fullname}</span>
      </div>
      <div className="infoItem">
        <span className="bookingKey">Email</span>
        <span className="bookingValue">{currentUser?.email}</span>
      </div>
      <div className="infoItem">
        <span className="bookingKey">Số điện thoại</span>
        <span className="bookingValue">{currentUser?.phone}</span>
      </div>
      <div className="infoItem">
        <span className="bookingKey">Giới tính</span>
        <span className="bookingValue">{currentUser?.gender}</span>
      </div>
      <div className="infoItem">
        <span className="bookingKey">Ngày sinh</span>
        <span className="bookingValue">
          {currentUser?.dateOfBirth &&
            format(new Date(currentUser?.dateOfBirth), "dd/MM/yyyy")}
        </span>
      </div>
      <h2 className="infoTitle">Thông tin khám</h2>
      <div className="infoItem">
        <span className="bookingKey">Bác sĩ</span>
        <span className="bookingValue">Bác sĩ {booking?.doctor.fullname}</span>
      </div>
      <div className="infoItem">
        <span className="bookingKey">Chuyên khoa</span>
        <span className="bookingValue">{booking?.service.name}</span>
      </div>
      <div className="infoItem">
        <span className="bookingKey">Thời gian khám</span>
        <span className="bookingValue">
          {booking.slot}, {format(booking.date, "dd/MM/yyy")}
        </span>
      </div>
      <div className="infoItem">
        <span className="bookingKey">Địa điểm</span>
        <span className="bookingValue">
          Phòng khám răng Miss White Hồ Chí Minh
        </span>
      </div>
    </div>
  );
}
