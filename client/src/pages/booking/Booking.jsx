import axios from "axios";
import { format } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import API_URL from "~/api/Router";
import BookingConfirm from "~/components/user/bookingConfirm/BookingConfirm";
import BookingFill from "~/components/user/bookingFill/BookingFill";
import { AuthContext } from "~/context/authContext";
import "./booking.scss";
import { toast } from "react-toastify";
import { newDateWithoutTime } from "~/utils";

export default function Booking() {
  const [part, setPart] = useState({
    number: 1,
    title: "THÔNG TIN KHÁM BỆNH",
  });
  const { pathname } = useLocation();
  const { currentUser, login } = useContext(AuthContext);
  const [booking, setBooking] = useState({
    date: new Date(),
  });
  // console.log(booking);
  const [payModal, setPayModal] = useState(false);
  const [services, setServices] = useState();
  const [freeDoctors, setFreeDoctors] = useState();
  const [freeSlots, setFreeSlots] = useState();
  const [slotNoti, setSlotNoti] = useState("");
  const navigate = useNavigate();
  // const [bookedService, setBookedService] = useState();

  const handleNext = () => {
    const infoArr = [
      "fullname",
      "email",
      "address",
      "gender",
      "phone",
      "dateOfBirth",
    ];
    let isInfoFull = true;
    if (!currentUser) {
      toast.info("Vui lòng đăng nhập trước khi đặt lịch");
      return;
    }

    for (const key of infoArr) {
      if (!currentUser[key]) {
        isInfoFull = false;
        break;
      }
    }

    if (!isInfoFull) {
      toast.info("Vui lòng cập nhật tài khoản trước khi đặt lịch");
      return;
    }

    if (booking.date && booking.service && booking.doctor && booking.slot) {
      setPart({ number: 2, title: "XÁC NHẬN THÔNG TIN" });
    } else {
      toast.info("Vui lòng chọn đầy đủ thông tin khám trước khi tiếp tục!");
    }
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

        const chosenDoctor =
          booking?.doctor?._id &&
          res.data.find((doctor) => doctor._id === booking?.doctor?._id);
        if (!chosenDoctor) {
          setBooking((prev) => ({ ...prev, doctor: {} }));
          setFreeSlots([]);
        }

        setFreeDoctors(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    // thêm debounce sau
    booking.date && fetchFreeDoctors();
  }, [booking.date, booking?.doctor?._id]);

  useEffect(() => {
    const today = new Date();
    const dateObj = new Date(booking.date);
    dateObj.setHours(7, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to zero
    const viewDate = dateObj.toISOString().slice(0, 10);
    if (
      new Date(viewDate).getDate() === today.getDate() &&
      today.getHours() >= 17
    ) {
      setSlotNoti("Đã quá thời gian đặt lịch cho hôm nay");
      return;
    }

    setSlotNoti("");

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
    booking?.doctor?._id && fetchFreeSlots();
  }, [booking.date, booking.doctor]);

  const hanleBookService = async () => {
    // mới chỉ làm lấy thông tin từ đăng nhập
    const passData = {
      user_id: currentUser._id,
      doctor_id: booking.doctor._id,
      date: format(booking.date, "yyyy-MM-dd"),
      slot_time: booking.slot,
      service_id: booking.service._id,
    };
    // console.log(passData);
    try {
      await axios.post(`${API_URL}/bookedservices`, passData);
      toast.success("Đặt lịch thành công");
      navigate("/customer/upcoming-booking");
    } catch (err) {
      console.log(err);
      toast.error(err.response.data)
    }
  };

  return (
    <div className="bookingPage">
      <div className="bookingBanner">
        <h1 className="title">Đăng ký khám</h1>
      </div>
      <div className="container">
        <div className="bookingBlock col-12 col-sm-8 col-xxl-7">
          <div className="bookingTitle">
            <h2 className="bookingStep">{part.title}</h2>
            {!currentUser && (
              <Link
                to="/login"
                state={{ guest: pathname }}
                className="btn btn-primary"
              >
                Đăng nhập
              </Link>
            )}
          </div>
          {/* Phần 1: chọn thông tin */}
          {part.number === 1 && (
            <BookingFill
              booking={booking}
              setBooking={setBooking}
              services={services}
              freeDoctors={freeDoctors}
              freeSlots={freeSlots}
              slotNoti={slotNoti}
            />
          )}

          {/* Phần 2: Xác nhận thông tin */}
          {part.number === 2 && <BookingConfirm booking={booking} />}
          <div className="bookingDirection">
            {part.number === 1 && (
              <button onClick={handleNext}>TIẾP TỤC</button>
            )}
            {part.number === 2 && (
              <>
                <button onClick={handleBack}>QUAY LẠI</button>
                <button onClick={hanleBookService}>XÁC NHẬN ĐẶT LỊCH</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
