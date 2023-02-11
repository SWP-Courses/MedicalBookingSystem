import "./DoctorProfile.scss";
import { useEffect, useRef, useState } from "react";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { AuthContext } from "~/context/authContext";

export default function DoctorProfile(props) {

  const { currentUser } = useContext(AuthContext);

  // console.log(currentUser);
  
  const { image, hanldeUploadImage} = props;

  const [name, setName] = useState(currentUser?.fullname);
  const [email, setEmail] = useState(currentUser?.email);
  const [address, setAddress] = useState(currentUser?.address);
  const [gender, setGender] = useState(currentUser?.gender);
  const [phoneNumber, setPhoneNumber] = useState(currentUser?.phone);  
  const [birthday, setBirthday] = useState(() => {
    const curDate = currentUser?.dateOfBirth;
    return curDate.split('/').reverse().join('-');
  });

  console.log('check birthday: ', birthday);
  console.log(gender);

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
                checked={gender === 'male'}
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
                checked={gender === 'female'}
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
                // checked={gender === ''}
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
              // image && image.avatar ?  (
              //   <img src={image.avatar} alt="account avarta" className="avata" />
              // ) : 'upload your avatar here'          
              // image && 
              //  ( <img src{}= alt="avatar"/>)
              image && (
                <img src={image} alt='avatar'/>
              )
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
