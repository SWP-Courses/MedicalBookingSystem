import "./DoctorProfile.scss";
import { useEffect, useState } from "react";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function DoctorProfile(props) {
  
  const { image, hanldeUploadImage} = props;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [birthday, setBirthday] = useState('');


  useEffect(() => {
    return () => {
      image && image.avatar && URL.revokeObjectURL(image.avatar);
    }
  }, [image])

  const handleUpdateProfile = () => {
    const upDateInfo = {
      name: name,
      gender: gender,
      address: address,
      email: email,
      phone: phoneNumber,
      birthday: birthday,
      image: image,

    }
    console.log(upDateInfo);
  }

  return (
    <div className="userInfoContainer">
      <h1 className="title">Hồ Sơ Của Tôi</h1>
      <hr />
      <div className="userInfo">
        <div className="infoList">


          <input 
            type="text" 
            placeholder="Họ và tên" 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input 
            type="email" 
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="text" 
            placeholder="Địa chỉ" 
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <div className="sex">
            <strong>Giới Tính</strong>
            <div className="checkbox-group">
              <input
                // className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
                value={gender}
                onChange={(e) => setGender(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                Nam
              </label>
            </div>
            <div className="checkbox-group">
              <input
                // className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
                value={gender}
                onChange={(e) => setGender(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                Nữ
              </label>
            </div>
            <div className="checkbox-group">
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
            </div>
          </div>
          <div className="phone mt-1">
            <strong>Số Điện Thoại</strong>
            <input 
              type="text" 
              placeholder="số điện thoại"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="recall-date">
            <strong htmlFor="birthday">Ngày Sinh</strong>
            <input 
              type="date" 
              id="birthday" 
              name="birthday" 
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />
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
      <button 
        onClick={() => handleUpdateProfile()}
      >
        LƯU
      </button>
    </div>
  );
}
