import { format } from "date-fns";
import "./bookingConfirm.scss";

export default function BookingConfirm({ booking }) {
  return (
    <div className="bookingConfirm">
      <h2 className="infoTitle">Khách hàng</h2>
      <div className="infoItem">
        <span className="bookingKey">Khách hàng</span>
        <span className="bookingValue">{booking.fullname}</span>
      </div>
      <div className="infoItem">
        <span className="bookingKey">Giới tính</span>
        <span className="bookingValue">{booking.gender}</span>
      </div>
      <div className="infoItem">
        <span className="bookingKey">Ngày sinh</span>
        <span className="bookingValue">{booking.birth}</span>
      </div>
      <div className="infoItem">
        <span className="bookingKey">Số điện thoại</span>
        <span className="bookingValue">{booking.phone}</span>
      </div>
      <div className="infoItem">
        <span className="bookingKey">Email</span>
        <span className="bookingValue">{booking.email}</span>
      </div>
      <div className="infoItem">
        <span className="bookingKey">CMND / CCCD</span>
        <span className="bookingValue">{booking.nationalId}</span>
      </div>
      <h2 className="infoTitle">Thông tin khám</h2>
      <div className="infoItem">
        <span className="bookingKey">Bác sĩ</span>
        <span className="bookingValue">Bác sĩ {booking.doctor}</span>
      </div>
      <div className="infoItem">
        <span className="bookingKey">Chuyên khoa</span>
        <span className="bookingValue">{booking.specialist}</span>
      </div>
      <div className="infoItem">
        <span className="bookingKey">Thời gian khám</span>
        <span className="bookingValue">
          15:00, {format(booking.date, "yyyy-MM-dd")}
        </span>
      </div>
      <div className="infoItem">
        <span className="bookingKey">Địa điểm</span>
        <span className="bookingValue">BV DKQT Human Heal Hồ Chí Minh</span>
      </div>
    </div>
  );
}
