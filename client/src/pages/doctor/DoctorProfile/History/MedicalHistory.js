import { useEffect, useState } from "react";
import axios from "axios";

import "./medicalhistory.scss";
import API_URL from "~/api/Router";
import Search from "./search/Search";
import { hanlderRequest} from "~/utils";
import ModalPrescription from "./ModalPrescription/ModalPrescription";

export default function MedicalHistory(props) {
  const { setUserContent, handleOptionClick, patient } = props;
  const [userSearched, setUserSearched] = useState([]);
  const [userBooked, setUserBooked] = useState('');
  const [listPrescription, setListPrescription] = useState('');
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    if (Object.keys(userSearched).length) {  // check object is Empty
      getBookedUser();
    }
  }, [userSearched]);

  useEffect(() => {
    if (userBooked?.drugbill_id) {
      getPrescriptions();
    }
  }, [userBooked]);

  const getBookedUser = async () => {
    const [error, res] = await hanlderRequest(
      axios.get(API_URL + `/bookedservices/history/${userSearched._id}`)
    );
    if (res?.data) {
      setUserBooked(res.data?.[0]);
    } else {
      console.log(`%c ${error.message}`, "color: red");
    }
  };

  const getPrescriptions = async () => {
    const [error, res] = await hanlderRequest(
      axios.get(API_URL + `/prescriptions/${userBooked.drugbill_id}`)
    );
    if (res?.data) {
      setListPrescription(res.data);
    } else {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="medicalHistory">
        <Search setUserSearched={setUserSearched} />
        <table className="mt-3">
          <thead>
            <tr>
              <th>Tên</th>
              <th>Ngày Khám</th>
              <th>Dịch vụ đã khám</th>
              <th>Thuốc đã kê</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
              {userBooked && userBooked?.customer[0]?.fullname}
              </td>
              <td>{userBooked?.date}</td>
              <td>
                {userBooked?.services?.map((service) => {
                  return <p>{service.name}</p>;
                })}
              </td>
              <td>
                { 
                  listPrescription &&
                  <button className="btn btn-success" onClick={() => setModalShow(true)}>
                    Chi tiết
                  </button>
                }
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <ModalPrescription
        setModalShow={setModalShow}
        modalShow={modalShow}
        listPrescription={listPrescription}
      />
    </>
  );
}