import { useCallback, useContext, useEffect, useState } from "react";
import { Button, Modal, OverlayTrigger, Table, Tooltip } from "react-bootstrap";
import "./appointmentSchedule.scss";
import { AuthContext } from "~/context/authContext";
import axios from "axios";
import API_URL from "~/api/Router";
import { addDays, format, parseISO } from "date-fns";
import { formatSlot } from "~/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarXmark } from "@fortawesome/free-solid-svg-icons";

function MyVerticallyCenteredModal(props) {
  const { handleCancel, bservice, show, onHide } = props;
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="cancel-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Xác nhận huỷ lịch
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{bservice.services[0].name}</h4>
        <p>Ngày đặt: {format(new Date(bservice?.date), "dd/MM/yyyy")}</p>
        <p>Lúc: {formatSlot(bservice.slot_time)}</p>
        <p>Bác sĩ: {bservice?.doctor[0].fullname}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Đóng</Button>
        <Button variant="danger" onClick={() => handleCancel(bservice._id)}>
          Xác nhận
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default function AppointmentSchedule() {
  const [upBookedServices, setUpServives] = useState();
  const { currentUser } = useContext(AuthContext);
  const [modalShow, setModalShow] = useState(false);

  const fetchUpBservices = useCallback(async () => {
    try {
      const res = await axios.get(
        `${API_URL}/bookedservices/users/${currentUser._id}`
      );
      setUpServives(res.data);
    } catch (err) {
      console.log(err);
    }
  }, [currentUser._id]);

  // Side effects
  useEffect(() => {
    fetchUpBservices();
  }, [fetchUpBservices]);

  // Functions
  const handleCancelBookedService = async (id) => {
    try {
      await axios.delete(`${API_URL}/bookedservices/${id}`);
      // await fetchUpBservices()
      setUpServives((prev) => prev.filter((item) => item._id !== id));
      setModalShow(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="appointmentSchedule">
      <h1 className="title">Lịch khám đã đặt</h1>
      <div className="d-none d-sm-block ">
        <Table hover responsive>
          <thead>
            <tr>
              <th>Mã số</th>
              <th>Ngày khám</th>
              <th className="text-center">Phòng</th>
              <th className="text-center">Giờ khám</th>
              <th>Bác sĩ</th>
              <th>Dịch vụ</th>
              <th className="text-center">Huỷ lịch</th>
            </tr>
          </thead>
          <tbody>
            {upBookedServices?.map((bservice, index) => {
              return (
                <tr key={bservice._id}>
                  <td className="align-middle">{bservice.billNumber}</td>
                  <td className="align-middle">
                    {format(new Date(bservice?.date), "dd/MM/yyyy")}
                  </td>
                  <td className="text-center align-middle">
                    {bservice?.doctor[0]?.room.room}
                  </td>
                  <td className="align-middle text-center">
                    {formatSlot(bservice.slot_time)}
                  </td>
                  <td className="align-middle">
                    {bservice?.doctor[0].fullname}
                  </td>
                  <td className="align-middle">{bservice?.services[0].name}</td>
                  <td className="text-center">
                    <FontAwesomeIcon
                      icon={faCalendarXmark}
                      style={{
                        fontSize: "22px",
                        cursor: "pointer",
                        color: "#e04e4e",
                      }}
                      onClick={() => setModalShow(true)}
                    />
                    <MyVerticallyCenteredModal
                      show={modalShow}
                      onHide={() => setModalShow(false)}
                      bservice={bservice}
                      handleCancel={handleCancelBookedService}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>

      <div className="incoming-schedule-mobile d-sm-none d-block">
        {upBookedServices?.map((bservice, index) => (
          <div className="incoming-schedule-mobile-item row">
            <div className="col-5">
              <h5 className="mobile-incoming-title">
                Thời gian và <br /> địa điểm
              </h5>
              <p>
                Thời gian: <br /> {formatSlot(bservice.slot_time)},{" "}
                {format(new Date(bservice?.date), "dd/MM/yyyy")}
              </p>
              <p>Phòng: {bservice?.doctor[0]?.room.room}</p>
            </div>
            <div className="col-7">
              <h5 className="mobile-incoming-title">Chi tiết dịch vụ</h5>
              <p>Bác sĩ: {bservice?.doctor[0].fullname}</p>
              <p>
                Dịch vụ: <br /> {bservice?.services[0].name}
              </p>
            </div>
            <button className="col-2 cancel-booking-btn">&times;</button>
          </div>
        ))}
      </div>
    </div>
  );
}
