import { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import "./appointmentSchedule.scss";
import { customerAppointmentSchedule as cusApmSchedule } from "../../../fakeData";

export default function AppointmentSchedule() {
  const [key, setKey] = useState(
    cusApmSchedule.length && cusApmSchedule[0].date
  );
  return (
    <div className="appointmentSchedule">
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        {cusApmSchedule?.map((order) => (
          <Tab eventKey={order.date} title={order.date}>
            <div className="orderSchedule">
              <div className="orderInfoItem">
                <span className="key">Thời gian:</span>
                <span className="value">{order.time}</span>
              </div>
              <div className="orderInfoItem">
                <span className="key">Phòng:</span>
                <span className="value">{order.room}</span>
              </div>
              <div className="orderInfoItem">
                <span className="key">Dịch vụ:</span>
                <span className="value">{order.service}</span>
              </div>
              <div className="orderInfoItem">
                <span className="key">Bác sĩ:</span>
                <span className="value">{order.doctor}</span>
              </div>
            </div>
          </Tab>
        ))}
      </Tabs>
    </div>
  );
}
