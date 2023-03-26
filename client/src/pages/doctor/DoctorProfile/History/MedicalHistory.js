import { useEffect, useState } from "react";
import axios from "axios";

import "./medicalhistory.scss";
import API_URL from "~/api/Router";
import Search from "./search/Search";
import { hanlderRequest } from "~/utils";
import ModalPrescription from "./ModalPrescription/ModalPrescription";
import { formatDateFns } from "~/utils";
import { formatSlot } from "~/utils";

export default function MedicalHistory(props) {
  const [userSearched, setUserSearched] = useState([]);
  const [userBooked, setUserBooked] = useState("");
  const [listPrescription, setListPrescription] = useState("");
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    if (Object.keys(userSearched).length) {
      // check object is Empty
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
      setUserBooked(res.data);
    } else {
      console.log(`%c ${error.message}`, "color: red");
    }
  };

  const getPrescriptions = async (id) => {
    const [error, res] = await hanlderRequest(
      axios.get(API_URL + `/prescriptions/${id}`)
    );
    if (res?.data) {
      setListPrescription(res.data);
    } else {
      console.log(error.message);
    }
  };

  const hanldeShowPrescription = (id) => {
    if(id) {
      setModalShow(true)
      getPrescriptions(id)
    }
  }

  console.log(">> userSearched: ", userBooked);
  return (
    <>
      <div className="medicalHistory">
        <Search setUserSearched={setUserSearched} />
        <table className="mt-3">
          <thead>
            <tr>
              <th>Tên</th>
              <th>Ngày Khám</th>
              <th>Khung giờ</th>
              <th>Dịch vụ đã khám</th>
              <th>Thuốc đã kê</th>
            </tr>
          </thead> 
          <tbody> 
            {userBooked &&
              userBooked.length > 0 &&
              userBooked.map((item) => {
                return (
                  <tr>
                    <td>{item && item?.customer[0]?.fullname}</td>
                    <td>{formatDateFns(item?.date)}</td>
                    <td>{formatSlot(item?.slot_time)}</td>
                    <td>
                      {item?.services?.map((service) => {
                        return <p>{service.name}</p>;
                      })}
                    </td>
                    <td>
                      {item.drugbill_id && (
                        <button
                          className="btn btn-success"
                          onClick={() => hanldeShowPrescription(item.drugbill_id)}
                        >
                          Chi tiết
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
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
