import "./Doctor.scss";
import {  useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import MedicalHistory from "./History/MedicalHistory";
import DoctorSchedule from "./DoctorSchedule/DoctorSchedule";

import { AuthContext } from "~/context/authContext";
import { DoctorContext } from "~/context/DoctorContext";
import UserInfo from "~/components/user/userInfo/UserInfo";
import { API_IMAGE_URL } from "~/api/Router";
import Prescription from "./Prescription/Prescription";
import { DoctorProvider } from "~/context/DoctorContext";

const routers = [
  { path: "/doctor/profile", title: "Thông tin cá nhân" },
  { path: "/doctor/patient-booking", title: "Xem lịch khám" },
  { path: "/doctor/presciption", title: "Kê đơn thuốc" },
  { path: "/doctor/patient-history", title: "Lịch sử khám của bệnh nhân" },
];

export default function DoctorLayout() {
  const { currentUser } = useContext(AuthContext);
  const {
    state
  } = useLocation();
  const [userContent, setUserContent] = useState(state?.redirect  || "info");
  const [image, setImage] = useState(currentUser?.avatar);
  const [patient, setPatient] = useState([]);
  const [listUsers, setListUsers] = useState([]);
  
  const hanldeUploadImage = (e) => {
    if (e && e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      file.avatar = URL.createObjectURL(file);
      setImage(file);
    }
  };

  const handleOptionClick = (option) => {
    setUserContent(option);
  };

  return (
    <DoctorProvider>
    <div className="container-fluid doctor bg-light">
      <div className="doctorSidebar">
        <div className="userInfo">
          <img
            src={`${API_IMAGE_URL}/${currentUser?.avatar?.filename}`}
            alt="avartar"
          />
          <span className="doctorName">{currentUser?.fullname}</span>
        </div>
        <div className="profileActions shadow">
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
            Kê Đơn Thuốc
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
      <div className="doctorContent shadow">
        {userContent === "info" && (
          <UserInfo hanldeUploadImage={hanldeUploadImage} image={image} />
        )}
        {userContent === "prescription" && (
          <Prescription
            patient={patient}
            // listUsers={listUsers}
            currentUser={currentUser}
          />
        )}
        {userContent === "doctorSchedule" && (
          <DoctorSchedule
            handleOptionClick={handleOptionClick}
          />
        )}
        {userContent === "medicalHistory" && (
          <MedicalHistory
            userContent={userContent}
            setUserContent={setUserContent}
          />
        )}
      </div>
    </div>

    </DoctorProvider>
  );
}
