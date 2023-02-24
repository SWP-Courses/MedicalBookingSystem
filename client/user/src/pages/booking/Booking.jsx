import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import API_URL from "~/api/Router";
import BookingConfirm from "~/components/bookingConfirm/BookingConfirm";
import BookingFill from "~/components/bookingFill/BookingFill";
import { AuthContext } from "~/context/authContext";
import "./booking.scss";

export default function Booking() {
  const [part, setPart] = useState({
    number: 1,
    title: "THÔNG TIN KHÁM BỆNH",
  });
  const { currentUser } = useContext(AuthContext);
  const [booking, setBooking] = useState({ date: new Date() });
  const [payModal, setPayModal] = useState(false);
  const [services, setServices] = useState();
  const [freeDoctors, setFreeDoctors] = useState();
  const [freeSlots, setFreeSlots] = useState();
  const navigate = useNavigate();
  // const [bookedService, setBookedService] = useState();

  const handleNext = () => {
    setPart({ number: 2, title: "XÁC NHẬN THÔNG TIN" });
  };
  const handleBack = () => {
    setPart({
      number: 1,
      title: "THÔNG TIN KHÁM BỆNH",
    });
  };

  // Side Effects
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(`${API_URL}/services`);
        setServices(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchServices();
  }, []);

  useEffect(() => {
    const fetchFreeDoctors = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/booking/doctors?date=${booking.date}`
        );
        setFreeDoctors(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    // thêm debounce sau
    booking.date && fetchFreeDoctors();
  }, [booking.date]);

  useEffect(() => {
    const fetchFreeSlots = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/booking/slots/${booking.doctor._id}?date=${booking.date}`
        );
        setFreeSlots(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    // thêm debounce sau
    booking.doctor && fetchFreeSlots();
  }, [booking.date, booking.doctor]);

  const hanleBookService = async () => {
    // mới chỉ làm lấy thông tin từ đăng nhập
    const passData = {
      user_id: currentUser._id,
      doctor_id: booking.doctor._id,
      date: booking.date,
      slot_time: booking.slot.time,
      service_id: booking.service._id,
    };
    // console.log(passData);
    try {
      await axios.post(`${API_URL}/bookedservices`, passData);
      navigate(0);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bookingPage">
      <div className="bookingBanner">
        <h1 className="title">Đăng ký khám</h1>
      </div>
      <div className="bookingBlock">
        <h2 className="bookingStep">{part.title}</h2>
        {part.number === 1 && (
          <BookingFill
            booking={booking}
            setBooking={setBooking}
            services={services}
            freeDoctors={freeDoctors}
            freeSlots={freeSlots}
          />
        )}
        {part.number === 2 && <BookingConfirm booking={booking} />}
        <div className="bookingDirection">
          {part.number === 1 && <button onClick={handleNext}>TIẾP TỤC</button>}
          {part.number === 2 && (
            <>
              <button onClick={handleBack}>QUAY LẠI</button>
              <button
                // onClick={() => setPayModal(true)}
                onClick={hanleBookService}
              >
                XÁC NHẬN ĐẶT LỊCH
              </button>
            </>
          )}
        </div>
      </div>

      <Modal show={payModal} onHide={() => setPayModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Thanh toán</Modal.Title>
        </Modal.Header>
        <Modal.Body>Tổng tiền: 312</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setPayModal(false)}>
            Đóng
          </Button>
          <Button variant="primary" onClick={() => setPayModal(false)}>
            Thanh toán
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
