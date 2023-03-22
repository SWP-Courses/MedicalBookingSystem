import { useCallback, useContext, useEffect, useState } from "react";
import {
  Button,
  Modal,
  OverlayTrigger,
  Popover,
  Tab,
  Table,
  Tabs,
} from "react-bootstrap";
import "./appointmentSchedule.scss";
import { customerAppointmentSchedule as cusApmSchedule } from "../../../fakeData";
import { AuthContext } from "~/context/authContext";
import axios from "axios";
import API_URL from "~/api/Router";
import { addDays, format, parseISO } from "date-fns";
import { formatSlot } from "~/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarXmark, faSearch } from "@fortawesome/free-solid-svg-icons";

function MyVerticallyCenteredModal(props) {
  const { handleCancel, bservice, show, onHide } = props;
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
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
      <h1 className="title">Lịch sử khám bệnh</h1>
      <Table hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Ngày khám</th>
            <th>Giờ khám</th>
            <th>Dịch vụ</th>
            <th>Bác sĩ</th>
            <th className="text-center font-weight-bold">Huỷ lịch</th>
            <th className="text-center font-weight-bold">Mã số</th>
          </tr>
        </thead>
        <tbody>
          {upBookedServices?.map((bservice, index) => {
            return (
              <tr key={bservice._id}>
                <td className="align-middle">{index + 1}</td>
                <td className="align-middle">
                  {format(new Date(bservice?.date), "dd/MM/yyyy")}
                </td>
                <td className="align-middle">
                  {formatSlot(bservice.slot_time)}
                </td>
                <td className="align-middle">{bservice?.services[0].name}</td>
                <td className="align-middle">{bservice?.doctor[0].fullname}</td>
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
                <td className="text-center">
                  <OverlayTrigger
                    trigger="click"
                    placement="bottom"
                    overlay={
                      <Popover id={`popover-positioned-bottom}`}>
                        <Popover.Header as="h3">
                          Mã số thanh toán
                        </Popover.Header>
                        <Popover.Body className="fs-5 fw-bold">{bservice?.payCode}</Popover.Body>
                      </Popover>
                    }
                  >
                    <FontAwesomeIcon
                      icon={faSearch}
                      style={{
                        fontSize: "20px",
                        cursor: "pointer",
                        color: "#1092F3",
                      }}
                    />
                  </OverlayTrigger>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
