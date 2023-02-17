import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { useState } from "react";

import "./Register.scss";
import UserInfo from "~/components/userInfo/UserInfo";
import axios from "axios";
import { parse, isValid, format } from 'date-fns';
import { enGB } from 'date-fns/locale';
import API_URL from "~/api/Router";

function Register() {
  const [registerInfo, setRegisterInfo] = useState({
    fullname: "",
    email: "",
    gender: "",
    phone: "",
    dateOfBirth: "",
    password: "",
    confirmPassword: "",
  });
  console.log(registerInfo.dateOfBirth);
  const navigate = useNavigate();

  // Functions
  const handleTextInputChange = (e) => {
    setRegisterInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegisterClick = async () => {
    // validate
    const { confirmPassword, ...data } = registerInfo;
    // submit API
    try {
      const res = await axios.post(API_URL+"/auth/register", data);
      setRegisterInfo({});
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
    // console.log(registerInfo);
  };

  const hanldeEmptyInput = (e) => {
    if (!e.target.value) {
      e.target.className = "input-box error";
    } else {
      e.target.className = "input-box";
    }
  };

  const hanldeOnBlurInput = (e) => {
    if (e.target.value) {
      e.target.className = "input-box";
    }
  };

  return (
    <div className="Login-Wrapper animate__animated animate__fadeInDown">
      <div className="Login-header">
        <div className="logo">
          <img
            src=""
            alt="logo"
            onClick={() => navigate("/")}
            className="logo"
          />
          <div>Đăng Kí</div>
        </div>
      </div>
      <div className="login-main">
        <div className="login-body">
          <h2>Đăng Kí</h2>
          <div className="form-body">
            <div className="form-content">
              <div className="form-group">
                <span>Họ và tên (*)</span>
                <input
                  name="fullname"
                  placeholder="Nhập họ và tên"
                  className="input-box"
                  value={registerInfo?.fullname}
                  onChange={handleTextInputChange}
                  onBlur={(e) => {
                    hanldeEmptyInput(e);
                  }}
                  onInput={(e) => {
                    hanldeOnBlurInput(e);
                  }}
                />
              </div>

              <div className="form-group mt-3">
                <span>Ngày Sinh (*)</span>
                <input
                  name="dateOfBirth"
                  type="date"
                  defaultValue="2020-01-10"
                  className="input-box"
                  onChange={handleTextInputChange}
                  onBlur={(e) => {
                    hanldeEmptyInput(e);
                  }}
                  onInput={(e) => {
                    hanldeOnBlurInput(e);
                  }}
                />
              </div>

              <div className="form-group mt-3">
                <span>Số Điện Thoại (*)</span>
                <input
                  name="phone"
                  placeholder="Nhập số điện thoại"
                  className="input-box"
                  value={registerInfo.phone}
                  onChange={handleTextInputChange}
                  onBlur={(e) => {
                    hanldeEmptyInput(e);
                  }}
                  onInput={(e) => {
                    hanldeOnBlurInput(e);
                  }}
                />
              </div>

              <div className="form-group mt-3">
                <span>Email</span>
                <input
                  name="email"
                  placeholder="Nhập email"
                  className="input-box"
                  value={registerInfo.email}
                  onChange={handleTextInputChange}
                  onBlur={(e) => {
                    hanldeEmptyInput(e);
                  }}
                  onInput={(e) => {
                    hanldeOnBlurInput(e);
                  }}
                />
              </div>

              <div className="form-group mt-3">
                <span>Mật khẩu</span>
                <input
                  name="password"
                  type="password"
                  placeholder="Nhập mật khẩu"
                  className="input-box"
                  value={registerInfo.password}
                  onChange={handleTextInputChange}
                  onBlur={(e) => {
                    hanldeEmptyInput(e);
                  }}
                  onInput={(e) => {
                    hanldeOnBlurInput(e);
                  }}
                />
              </div>

              <div className="form-group mt-3">
                <span>Nhập lại mật khẩu</span>
                <input
                  name="confirmPassword"
                  type="password"
                  placeholder="Nhập lại mật khẩu"
                  className="input-box"
                  value={registerInfo.confirmPassword}
                  onChange={handleTextInputChange}
                  onBlur={(e) => {
                    hanldeEmptyInput(e);
                  }}
                  onInput={(e) => {
                    hanldeOnBlurInput(e);
                  }}
                />
              </div>

              <div className="form-group mt-3">
                <span>Giới Tính</span>
                <div className="sex">
                  <div className="checkbox-group">
                    <input
                      // className="form-check-input"
                      type="radio"
                      name="gender"
                      id="flexRadioDefault1"
                      value="male"
                      checked={registerInfo.gender === "male"}
                      onChange={handleTextInputChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexRadioDefault1"
                    >
                      Nam
                    </label>
                  </div>
                  <div className="checkbox-group">
                    <input
                      // className="form-check-input"
                      type="radio"
                      name="gender"
                      id="flexRadioDefault1"
                      value="female"
                      checked={registerInfo.gender === "female"}
                      onChange={handleTextInputChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexRadioDefault1"
                    >
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
                    <label
                      className="form-check-label"
                      htmlFor="flexRadioDefault1"
                    >
                      Khác
                    </label>
                  </div> */}
                </div>
              </div>

              <button
                className="btn-register mt-3"
                onClick={handleRegisterClick}
              >
                Đăng Kí
              </button>
              <div className="sign-up mt-3">
                <span>Bạn Đã Có Tài Khoản ?</span>
                <Link to="/login">Đăng Nhập</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
