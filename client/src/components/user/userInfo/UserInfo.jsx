import "./userInfo.scss";

import { useState, useEffect, useMemo } from "react";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { AuthContext } from "~/context/authContext";
import API_URL, { API_IMAGE_URL } from "~/api/Router";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function UserInfo(props) {
  const { currentUser, update } = useContext(AuthContext);
  const [showAvatar, setShowAvatar] = useState(
    `${API_IMAGE_URL}/${currentUser.avatar.filename}`
  );
  const [userInfo, setUserInfo] = useState({
    fullname: currentUser?.fullname,
    email: currentUser?.email,
    address: currentUser?.address || "",
    gender: currentUser?.gender || "male",
    phone: currentUser?.phone || "",
    dateOfBirth: currentUser?.dateOfBirth,
  });
  const navigate = useNavigate();

  const formData = useMemo(() => new FormData(), []);

  const onSelectAvatar = (e) => {
    const chosenFile = e.target.files[0];
    if (!chosenFile) return;
    formData.append("avatar", chosenFile);
    setShowAvatar(URL.createObjectURL(chosenFile));
  };

  // Functions
  const handleTextInputChange = (e) => {
    setUserInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  //When Click Save button
  const handleUpdateClick = async (e) => {
    e.preventDefault();

    let isFillFulll = true;
    for (const key in userInfo) {
      if (Object.hasOwnProperty.call(userInfo, key)) {
        let value = userInfo[key];
        if (!value) {
          isFillFulll = false;
          break;
        }
      }
    }
    if (!isFillFulll) {
      toast.info("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    for (const key in userInfo) {
      if (Object.hasOwnProperty.call(userInfo, key)) {
        let value = userInfo[key];
        value && formData.append(key, value);
        // console.log(key, value);
        // if(value) {
        //   formData.get(key) !== value && formData.append(key, value)
        // }
      }
    }

    for (const key of formData.keys()) {
      console.log(key, formData.get(key));
    }
    // console.log(formData);
    try {
      await update(formData);
    } catch (err) {
      toast.error(err.response.data);
      for (const key in userInfo) {
        formData.delete(key);
      }
    }
  };

  return (
    <div className="userInfoContainer">
      <h1 className="title">Thông tin cá nhân</h1>
      <hr />
      <div className="userInfo d-flex flex-column flex-lg-row">
        <form className="infoList" onSubmit={handleUpdateClick}>
          <input
            required
            name="fullname"
            placeholder="Họ và tên"
            value={userInfo?.fullname}
            onChange={handleTextInputChange}
          />
          <input
            required
            type="email"
            name="email"
            placeholder="Email"
            disabled={currentUser.isFromThird}
            value={userInfo?.email}
            onChange={handleTextInputChange}
          />
          <input
            required
            name="address"
            placeholder="Địa chỉ"
            value={userInfo?.address}
            onChange={handleTextInputChange}
          />
          <div className="sex">
            <strong>Giới Tính</strong>
            <div className="checkbox-group">
              <input
                required
                // className="form-check-input"
                type="radio"
                name="gender"
                id="flexRadioDefault1"
                value="male"
                checked={userInfo?.gender === "male"}
                onChange={handleTextInputChange}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                Nam
              </label>
            </div>
            <div className="checkbox-group">
              <input
                required
                // className="form-check-input"
                type="radio"
                name="gender"
                id="flexRadioDefault1"
                checked={userInfo?.gender === "female"}
                value="female"
                onChange={handleTextInputChange}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                Nữ
              </label>
            </div>
          </div>
          <div className="phone mt-1">
            <strong>Số Điện Thoại</strong>
            <input
              required
              name="phone"
              placeholder="Số điện thoại"
              value={userInfo?.phone}
              onChange={handleTextInputChange}
            />
          </div>
          <div className="recall-date">
            <strong htmlFor="birthday">Ngày Sinh</strong>
            <input
              required
              type="date"
              id="birthday"
              name="dateOfBirth"
              defaultValue={userInfo.dateOfBirth}
              onChange={handleTextInputChange}
            />
          </div>
          <button className="update-button" onClick={handleUpdateClick}>
            Cập Nhật
          </button>
        </form>
        <div className="accountAvatar ">
          <div className="avata">
            {!currentUser?.avatar?.bucketName ? (
              <img
                src={currentUser.avatar.filename}
                alt="account avarta"
                className="avata"
              />
            ) : (
              <img src={showAvatar} alt="account avarta" className="avata" />
            )}
          </div>
          {currentUser?.avatar?.bucketName && (
            <>
              <label className="uploadImage" htmlFor="imageFile">
                <FontAwesomeIcon icon={faArrowUpFromBracket} />
                <span>Chọn Ảnh</span>
              </label>
              <input
                type="file"
                hidden
                id="imageFile"
                onChange={onSelectAvatar}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
