import {
  faCheck,
  faPenToSquare,
  faPills,
  faTicket,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import ModalEditServices from "../ModalAddService/ModalEditServices";
import "./CurrentPatient.scss";

function CurrentPatient(props) {
  const { user } = props;
  const [modalShow, setModalShow] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState({});

  const handleEditService = () => {
    setSelectedPatient(user);
    setModalShow(true);
  }

  return (
    <div className="patient-detail">
      <table className="mt-3">
        <thead>
          <tr>
            <th>Tên</th>
            <th>Dịch vụ</th>
            <th>Thanh Toán</th>
            <th>Kê thuốc</th>
            <th>Sửa</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{user.customer[0]?.fullname}</td>
            <td>
              {user.services.map((item, index) => {
                return <p index={item._id}>{item.name}</p>;
              })}
            </td>
            <td>
              <span>
                {
                  <span className={user.isPaid ? "btn-paid" : "btn-not-paid"}>
                    <FontAwesomeIcon
                      icon={user.isPaid ? faCheck : faXmark}
                      style={{
                        fontSize: "18px",
                        marginRight: "2px",
                      }}
                    />
                  </span>
                }
              </span>
            </td>
            <td>
              <span
                className="ml-3"
                onClick={() => {
                  // setPatient(item);
                  // handleOptionClick("prescription");
                }}
              >
                <FontAwesomeIcon
                  icon={faPills}
                  style={{
                    fontSize: "24px",
                    cursor: "pointer",
                    color: "var(--primary)",
                  }}
                />
              </span>
            </td>
            <td>
              <span
              className={
                user.isPaid
                  ? `schedule__calender-icon disabled`
                  : `schedule__calender-icon ml-2`
              }
              onClick={
                user.isPaid ? undefined : handleEditService
              }
              >
                <FontAwesomeIcon icon={faPenToSquare} />
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      <ModalEditServices
        modalShow={modalShow}
        setModalShow={setModalShow}
        bookedUser={selectedPatient}
      />
    </div>
  );
}

export default CurrentPatient;
