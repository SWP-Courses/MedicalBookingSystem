import {
  faCheck,
  faPenToSquare,
  faPills,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import ModalEditServices from "../ModalAddService/ModalEditServices";
import "./CurrentPatient.scss";
import EditServices from "../ModalAddService/EditServices";
import { formatSlot } from "~/utils";

function CurrentPatient(props) {
  const { user, setPatient, handleOptionClick, fetchSchedule } = props;
  const [modalShow, setModalShow] = useState(false);

  const handleEditService = () => {
    // setSelectedPatient(user);
    setModalShow(true);
  };
  console.log(">> user", user);
  return (
    <div className="patient-detail">
      <div className="patient-info">
        {Object.keys(user).length ? (
          <>
            <div className="patient-info__profile">
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
            </div>
            <div className="devideLine"></div>
          </>
        ) : (
          <span className="no-date-available rounded-pill">
            vui lòng chọn bệnh nhân khám
          </span>
        )}
        <div className="patient-info__services">
          <EditServices bookedUser={user} fetchSchedule={fetchSchedule} />
        </div>
      </div>
    </div>
  );
}

export default CurrentPatient;
