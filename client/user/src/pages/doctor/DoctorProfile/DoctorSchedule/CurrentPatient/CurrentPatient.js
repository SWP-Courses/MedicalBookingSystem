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
  const [userService, setUserService] = useState({});

  console.log('>> user: ', user);
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
            <td>khoa</td>
            <td>
                {
                    user.services.map((item, index) => {
                        return (
                            <p index={index}>{item.name}</p>
                        )
                    })
                }
            </td>
            <td>{user.isPaid}</td>
            <td>{}</td>
            <td>
              <center
              // className={
              //   item.isPaid
              //     ? `schedule__calender-icon disabled`
              //     : `schedule__calender-icon`
              // }
              // onClick={
              //   item.isPaid ? undefined : () => handleEditService(item)
              // }
              >
                <FontAwesomeIcon icon={faPenToSquare} />
              </center>
            </td>
          </tr>
        </tbody>
      </table>
      <ModalEditServices
        modalShow={modalShow}
        setModalShow={setModalShow}
        bookedUser={userService}
      />
    </div>
  );
}

export default CurrentPatient;
