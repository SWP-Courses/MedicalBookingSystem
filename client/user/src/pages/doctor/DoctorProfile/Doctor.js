import "./Doctor.scss";
import { useState } from "react";
import MedicalHistory from "./History/MedicalHistory";
import DoctorSchedule from "./DoctorSchedule/DoctorSchedule";

import { useContext } from "react";
import { AuthContext } from "~/context/authContext";
import UserInfo from "~/components/userInfo/UserInfo";
import { API_IMAGE_URL } from "~/api/Router";
import Prescription from "./Prescription/Prescription";

export default function Doctor() {
  const [userContent, setUserContent] = useState("info");

  const { currentUser } = useContext(AuthContext);

  const [image, setImage] = useState(currentUser?.avatar);

  const hanldeUploadImage = (e) => {
    if(e && e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      file.avatar = URL.createObjectURL(file); 
      setImage(file);
    }
  };

  const handleOptionClick = (option) => {
    setUserContent(option);
  };

  return (
    <div className="doctor">
      <div className="doctorSidebar">
        <div className="userInfo">
          <img src={`${API_IMAGE_URL}/${currentUser?.avatar?.filename}`} alt="avartar" />
          <span className="doctorName">{currentUser?.fullname}</span>
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
      <div className="doctorContent">
        {userContent === "info" && <UserInfo hanldeUploadImage={hanldeUploadImage} image={image}/>}
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
