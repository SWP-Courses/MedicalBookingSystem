import "./medicalHistory.scss";
import { customerMedicalHistory } from "../../../fakeData";
import { Table } from "react-bootstrap";

export default function MedicalHistory() {
  return (
    <div className="medicalHistory">
      <h1 className="title">Lịch sử khám bệnh</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Ngày khám</th>
            <th>Bệnh</th>
            <th>Bác sĩ</th>
            <th>Ngày tái khám</th>
          </tr>
        </thead>
        <tbody>
          {customerMedicalHistory.map((order, index) => (
            <tr>
              <td>{index}</td>
              <td>{order.date}</td>
              <td>{order.desease}</td>
              <td>{order.doctor}</td>
              <td>{order.reExamDate}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
