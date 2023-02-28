import "./customer.scss";
import blankAvatar from "../../assets/images/blank_avatar.jpg";
import UserInfo from "../../components/userInfo/UserInfo";
import { useState } from "react";
import MedicalHistory from "./medicalHistory/MedicalHistory";
import AppointmentSchedule from "./appointmentSchedule/AppointmentSchedule";
import BlogsSaved from "./blogsSaved/BlogsSaved";

import { useContext } from "react";
import { AuthContext } from "~/context/authContext";
import { API_IMAGE_URL } from "~/api/Router";

export default function Customer() {
  const [userContent, setUserContent] = useState("info");

  const { currentUser } = useContext(AuthContext);

  const handleOptionClick = (option) => {
    setUserContent(option);
  };

  return (
    <div className="customer">
      <div className="userSidebar">
        <div className="userInfo">
            <img src={`${API_IMAGE_URL}/${currentUser?.avatar?.filename}`} alt=""/> 
          
          <span className="userName">{currentUser?.fullname}</span>
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
            className={userContent === "history" ? "action active" : "action"}
            onClick={() => handleOptionClick("history")}
          >
            Lịch sử khám
          </h4>
          <h4
            className={
              userContent === "apmSchedule" ? "action active" : "action"
            }
            onClick={() => {
              handleOptionClick("apmSchedule");
            }}
          >
            Lịch khám đã đặt
          </h4>
          <h4
            className={userContent === "pSaved" ? "action active" : "action"}
            onClick={() => {
              setUserContent("pSaved");
            }}
          >
            Bài viết yêu thích
          </h4>
        </div>
      </div>
      <div className="userContent">
        {userContent === "info" && <UserInfo />}
        {userContent === "history" && <MedicalHistory />}
        {userContent === "apmSchedule" && <AppointmentSchedule />}
        {userContent === "pSaved" && <BlogsSaved />}
      </div>
    </div>
  );
}
