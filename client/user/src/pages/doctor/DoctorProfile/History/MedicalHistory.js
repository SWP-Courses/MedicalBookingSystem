import "./medicalHistory.scss";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";


export default function MedicalHistory(props) {

  const { setUserContent, handleOptionClick } = props;
  const [historyPatients, setHistoryPatient] = useState([1,2,3,4,5,6,7,8,9,10,11,12,13,1,1,1,1,1]);

  return (
    <div className="medicalHistory">
      <div className="header">
        <h1 className="title">Lịch sử khám bệnh</h1>
        <input className="search" type='text' placeholder="tìm bệnh nhân"/>
        <button className="currentSchedule">Lịch Hôm Nay</button>
      </div>
      <div className="table-responsive">
        <Table striped className="table-history">
        <thead>
          <tr>
            <th>ID</th>
            <th>Bệnh Nhân</th>
            <th>Tên Bệnh</th>
            <th>Bác sỹ</th>
            <th>Ngày Tái Khám</th>
            <th>Chi tiết</th>
            <th>Chi tiết</th>
          </tr>
        </thead>
        <tbody>
          {
            historyPatients.map((item, index) => {
              return (
                <tr>
                  <td>{index}</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>@mdo</td>
                  <td><FontAwesomeIcon icon={faEllipsis} /></td>
                </tr>
              )
            })
          }
        </tbody>
        </Table>
      </div>
    </div>
  );
}
