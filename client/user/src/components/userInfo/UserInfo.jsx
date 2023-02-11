import "./userInfo.scss";
import blankAvatar from "../../assets/images/blank_avatar.jpg";

import { useState, useEffect } from "react";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useContext } from "react";
import { AuthContext } from "~/context/authContext";
import { Calendar, fo } from "react-calendar";
import { format, parseISO } from "date-fns";
import API_URL from "~/api/Router";
import axios from "axios";

export default function UserInfo(props) {
  const {image, hanldeUploadImage} = props;
  const { currentUser } = useContext(AuthContext);

  const [userInfo, setUserInfo] = useState({
    fullname:currentUser?.fullname,
    email: currentUser?.email,
    address: currentUser?.address || '',
    gender: currentUser?.gender,
    phone: currentUser?.phone,
    dateOfBirth: currentUser?.dateOfBirth
  })

  useEffect(() => {
    return () => {
      image && image.avatar && URL.revokeObjectURL(image.avatar);
    }
  }, [image])

  // Functions 
  const handleTextInputChange = (e) => {
    setUserInfo(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  // todo-func: call api update
  const handleUpdateClick =async () => {
    try {
      await axios.put(`${API_URL}/users/${currentUser._id}`, userInfo);
    } catch(err) {
      console.log(err);
    }
  }

  console.log(userInfo);

  return (
    <div className="userInfoContainer">
      <h1 className="title">Thông tin khách hàng</h1>
      <hr/>
      <div className="userInfo">
          <div className="infoList">
            <input 
              name="fullname"
              placeholder="Họ và tên" 
              value={userInfo?.fullname}
              onChange={handleTextInputChange}
            />
            <input 
              type="email" 
              name="email"
              placeholder="Email" 
              value={userInfo?.email}
              onChange={handleTextInputChange}
            />
            <input 
              name="address"  
              placeholder="Địa chỉ" 
              value={userInfo?.address}
              onChange={handleTextInputChange}
            />
            <div className="sex">
            <strong>Giới Tính</strong>
            <div className="checkbox-group">
              <input
                // className="form-check-input"
                type="radio"
                name="gender"
                id="flexRadioDefault1"
                value="male"
                checked = {userInfo?.gender ==='male'}
                onChange={handleTextInputChange}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                Nam
              </label>
            </div>
            <div className="checkbox-group">
              <input
                // className="form-check-input"
                type="radio"
                name="gender"
                id="flexRadioDefault1"
                checked = {userInfo?.gender ==='female'}
                value="female"
                onChange={handleTextInputChange}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                Nữ
              </label>
            </div>
            {/* <div className="checkbox-group">
              <input
                // className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
                value={gender}
                onChange={(e) => setGender(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                Khác
              </label>
            </div> */}
          </div>
            <div className="phone mt-1">
              <strong>Số Điện Thoại</strong>
              <input 
                name="phone"
                placeholder="Số điện thoại"
                value={userInfo.phone}
                onChange={handleTextInputChange}
              />
            </div>
            <div className="recall-date">
              <strong htmlFor="birthday">Ngày Sinh</strong>
              <input 
                name="dateOfBirth" 
                placeholder="Ngày sinh"
                value={currentUser.dateOfBirth}
                onChange={handleTextInputChange}
              />
              {/* <input 
                type="date" 
                id="birthday" 
                name="birthday" 
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
              /> */}
              {/* <Calendar
                onChange={(date) => setBirthday(date)}
                value={birthday}
                maxDate={new Date()}
                // formatLongDate={(locale, date) => formatDate(date, 'dd/MM/yyyy')}
            /> */}
            </div>
        </div>
        <div className="accountAvatar">
          <div className="avata">
            {            
              image && image.avatar ?  (
                <img src={image.avatar} alt="account avarta" className="avata" />
              ) : 'upload your avatar here'          
            } 
          </div>
          <label 
            className="uploadImage" 
            htmlFor='imageFile'
          >
            <FontAwesomeIcon icon={faArrowUpFromBracket} />
            <span>Chọn Ảnh</span>
          </label>
          <input 
            type='file' 
            hidden id="imageFile"
            onChange={(e) => hanldeUploadImage(e)}
          />
        </div>
      </div>
      <button onClick={() => console.log(userInfo)}>LƯU</button>
    </div>
  );
}
