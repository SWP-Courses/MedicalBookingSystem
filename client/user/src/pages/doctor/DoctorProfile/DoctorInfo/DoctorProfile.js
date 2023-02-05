import "./DoctorProfile.scss";
import doctor from "~/assets/images/doctor.jpg";
import { useState } from "react";

export default function DoctorProfile() {
  const [image, setIamge] = useState(true);
  const [gender, setGender] = useState("Nam");

  const hanldeUploadImage = () => {
    alert("demo");
  };

  const handleUpdateProfile = () => {
    alert('demo')
  }

  return (
    <div className="userInfoContainer">
      <h1 className="title">Hồ Sơ Của Tôi</h1>
      <hr />
      <div className="userInfo">
        <div className="infoList">
          <input type="text" placeholder="Họ và tên" />
          <input type="text" placeholder="Email" />
          <input type="text" placeholder="Địa chỉ" />
          <div className="sex">
            <strong>Giới Tính</strong>
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
            />
            <label class="form-check-label" for="flexRadioDefault1">
              Nam
            </label>
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
            />
            <label class="form-check-label" for="flexRadioDefault1">
              Nữ
            </label>
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
            />
            <label class="form-check-label" for="flexRadioDefault1">
              Khác
            </label>
          </div>
          <div className="phone">
            <strong>Số Điện Thoại</strong>
            <input type="text" />
          </div>
          <div className="recall-date">
            <strong for="birthday">Ngày Sinh</strong>
            <input type="date" id="birthday" name="birthday" />
          </div>
        </div>
        <div className="accountAvatar">
          <div>
            {image && (
              <img src={doctor} alt="account avarta" className="avata" />
            )}
          </div>
          <button className="uploadImage" onClick={() => hanldeUploadImage()}>
            Chọn Ảnh
          </button>
        </div>
      </div>
      <button 
        onClick={() => handleUpdateProfile()}
      >
        LƯU
      </button>
    </div>
  );
}
