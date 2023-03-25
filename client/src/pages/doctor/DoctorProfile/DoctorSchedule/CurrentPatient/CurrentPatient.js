import {
  faCheck,
  faPenToSquare,
  faPills,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useContext } from "react";
import "./CurrentPatient.scss";
import EditServices from "../ModalAddService/EditServices";
import { formatSlot } from "~/utils";
import Button from "react-bootstrap/Button";
import { DoctorContext } from "~/context/DoctorContext";

function CurrentPatient(props) {
  const context = useContext(DoctorContext);
  const { setPatient, handleOptionClick, fetchSchedule } = props;
  const [modalShow, setModalShow] = useState(false);
  const [user, setUser] = useState(context.user);

  return (
    <div className="patient-detail">
      <div className="patient-info">
        {Object.keys(user).length > 0 ? (
          <>
            <div className="patient-info__profile">
              <div className="patient-info_detail">
                <div className="patient-info__profile-name">
                  <span>Tên</span>
                  <p>{user?.customer[0]?.fullname}</p>
                </div>
                <div className="patient-info__profile-time">
                  <span>Giờ Khám</span>
                  <p>{formatSlot(user.slot_time)}</p>
                </div>
                <div className="patient-info__profile-payment">
                  <span>Thanh toán</span>
                  {
                    <p className={user.isPaid ? "btn-paid" : "btn-not-paid"}>
                      <FontAwesomeIcon
                        icon={user.isPaid ? faCheck : faXmark}
                        style={{
                          fontSize: "18px",
                          marginRight: "2px",
                        }}
                      />
                    </p>
                  }
                </div>
                <Button className="mt-5 d-block mx-auto prescribing" onClick={() => handleOptionClick('prescription')}>
                  Kê đơn
                </Button>
              </div>
            </div>
            <div className="devideLine"></div>
          </>
        ) : (
          <span className="no-date-available rounded-pill">
            vui lòng chọn bệnh nhân khám
          </span>
        )}
        <div className="patient-info__services pl-1">
          <EditServices/>
        </div>
      </div>
    </div>
  );
}

export default CurrentPatient;
