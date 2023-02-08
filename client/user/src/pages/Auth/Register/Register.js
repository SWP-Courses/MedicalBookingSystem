import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { useState } from "react";

import "./Register.scss";

function Register() {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleRegisterUser = () => {
    // validate

    // submit API
    let data = {
      name: name,
      gender: gender,
      birthDay: birthDay,
      phone: phone,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };
    console.log(data);
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
                <span>Họ và tên</span>
                <input
                  type="text"
                  placeholder="Nhập tên đầy đủ"
                  className="input-box"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={(e) => {
                    hanldeEmptyInput(e);
                  }}
                  onInput={(e) => {
                    hanldeOnBlurInput(e);
                  }}
                />
              </div>

              <div className="form-group mt-3">
                <span>Ngày Sinh</span>
                <input
                  type="date"
                  placeholder="Nhập ngày sinh"
                  className="input-box"
                  value={birthDay}
                  onChange={(e) => setBirthDay(e.target.value)}
                  onBlur={(e) => {
                    hanldeEmptyInput(e);
                  }}
                  onInput={(e) => {
                    hanldeOnBlurInput(e);
                  }}
                />
              </div>

              <div className="form-group mt-3">
                <span>Số Điện Thoại</span>
                <input
                  type="text"
                  placeholder="nhập số điện thoại"
                  className="input-box"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
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
                  type="text"
                  placeholder="Nhập email"
                  className="input-box"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  type="password"
                  placeholder="Nhập mật khẩu"
                  className="input-box"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                  type="password"
                  placeholder="nhập lại mật khẩu"
                  className="input-box"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                      value={gender}
                      onChange={(e) => setGender(e.target.checked)}
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
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                      value={gender}
                      onChange={(e) => setGender(e.target.checked)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexRadioDefault1"
                    >
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
                    <label
                      className="form-check-label"
                      htmlFor="flexRadioDefault1"
                    >
                      Khác
                    </label>
                  </div>
                </div>
              </div>

              <button
                className="btn-register mt-3"
                onClick={() => handleRegisterUser()}
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
