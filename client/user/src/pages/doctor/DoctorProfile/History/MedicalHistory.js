import "./medicalHistory.scss";
import DataTable from "react-data-table-component";
import Search from "./search/Search";
import { useEffect, useState } from "react";
import { hanlderRequest, formatDate } from "~/utils";
import axios from "axios";
import API_URL from "~/api/Router";
import _ from "lodash";

export default function MedicalHistory(props) {
  const { setUserContent, handleOptionClick, patient } = props;
  const [userSearched, setUserSearched] = useState({});
  const [userBooked, setUserBooked] = useState([]);
  const [listPrescription, setListPrescription] = useState([]);

  useEffect(() => {
    if (!_.isEmpty(userSearched)) {
      getBookedUser();
    }
  }, [userSearched]);

  useEffect(() => {
    if (userBooked.drugbill_id) {
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
      console.log(error.message);
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

  console.log(">>> list prescription: ", listPrescription);

  return (
    <div className="medicalHistory">
      {/* Search */}
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
          {userBooked.map((user) => {
            return (
              <tr key={user._id}>
                <td>{user?.customer[0]?.fullname}</td>
                <td>{user?.date}</td>
                <td>
                  {user?.services?.map((service) => {
                    return <p>{service.name}</p>;
                  })}
                </td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={getPrescriptions}
                  >
                    Chi tiết
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
