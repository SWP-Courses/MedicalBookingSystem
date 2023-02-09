import "./customer.scss";
import blankAvatar from "../../assets/images/blank_avatar.jpg";
import UserInfo from "./userInfo/UserInfo";
import { useState } from "react";
import MedicalHistory from "./medicalHistory/MedicalHistory";
import AppointmentSchedule from "./appointmentSchedule/AppointmentSchedule";
import BlogsSaved from "./blogsSaved/BlogsSaved";

export default function Customer() {
  const [userContent, setUserContent] = useState("info");

  const [image, setImage] = useState(null);

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
    <div className="customer">
      <div className="userSidebar">
        <div className="userInfo">
          { 
            image && image.avatar ?
            <img src={image.avatar} alt="avatar" /> : 'no avatar available'
          }
          <span className="userName">Anh Anh</span>
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
        {userContent === "info" && <UserInfo hanldeUploadImage={hanldeUploadImage} image={image}/>}
        {userContent === "history" && <MedicalHistory />}
        {userContent === "apmSchedule" && <AppointmentSchedule />}
        {userContent === "pSaved" && <BlogsSaved />}
      </div>
    </div>
  );
}
