import "./Doctor.scss";
import { useState } from "react";
import DoctorProfile from "~/pages/doctor/DoctorProfile/DoctorInfo/DoctorProfile";
import Prescription from "./Prescription/Prescription";
import MedicalHistory from "./History/MedicalHistory";
import DoctorSchedule from "./DoctorSchedule/DoctorSchedule";
import doctor from "~/assets/images/doctor.jpg";

export default function Doctor() {
  const [userContent, setUserContent] = useState("info");
  const [routeToPrescription, setRouteToPrescription] = useState("");

  console.log(userContent);

  const handleOptionClick = (option) => {
    setUserContent(option);
  };

  return (
    <div className="doctor">
      <div className="doctorSidebar">
        <div className="userInfo">
          <img src={doctor} alt="avartar" />
          <span className="doctorName">Bác Sỹ Anh</span>
        </div>
        <div className="profileActions">
          <h4
            className={userContent === "info" ? "action active" : "action"}
            onClick={() => {
              handleOptionClick("info");
            }}
          >
            Thông tin cá nhân
          </h4>
          <h4
            className={
              userContent === "doctorSchedule" ? "action active" : "action"
            }
            onClick={() => handleOptionClick("doctorSchedule")}
          >
            Xem Lịch khám
          </h4>
          <h4
            className={
              userContent === "prescription" ? "action active" : "action"
            }
            onClick={() => {
              handleOptionClick("prescription");
            }}
          >
            Kê Đơn
          </h4>
          <h4
            className={
              userContent === "medicalHistory" ? "action active" : "action"
            }
            onClick={() => {
              handleOptionClick("medicalHistory");
            }}
          >
            Lịch Sử Khám Của Bệnh Nhân
          </h4>
        </div>
      </div>
      <div className="doctorContent">
        {userContent === "info" && <DoctorProfile />}
        {userContent === "prescription" && <Prescription />}
        {userContent === "doctorSchedule" && <DoctorSchedule />}
        {userContent === "medicalHistory" && (
          <MedicalHistory
            userContent={userContent}
            setUserContent={setUserContent}
          />
        )}
      </div>
    </div>
  );
}
