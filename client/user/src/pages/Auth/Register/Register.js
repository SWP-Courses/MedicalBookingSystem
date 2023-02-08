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
  // const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegisterUser = () => {
    // validate

    // submit API
    let data = {
      name: name,
      gender: gender,
      birthDay: birthDay,
      // address: address,
      phone: phone,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };
    console.log(data);
  };

  return (
    <div className="Login-Wrapper animate__animated animate__fadeInDown">
      <div className="Login-header">
        <div className="logo">
          <img
            src=""
            alt="logo"
            // onClick={() => navigate("/")}
            className="logo"
          />
          <div>Đăng Kí</div>
        </div>
      </div>
      <div className="login-main">
        {/* <div className="login-title">Đăng Kí</div> */}
        <div className="login-body">
          {/* <select className="select register-select">
            <option>Khách Hàng</option>
            <option>Bác Sỹ</option>
            <option>Quản Trị Viên</option>
          </select> */}
          <h2>Đăng Kí</h2>
          <div className="form-body">
            <div className="form-content">
              <div className="fisrt-block-input">
                <input
                  type="text"
                  placeholder="Họ và Tên"
                  className="input mt-3"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <div className="checkbox-wrap">
                  <select
                    aria-label="Giới tính"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="1">Nam</option>
                    <option value="0">Nữ</option>
                    <option value="-1">Khác</option>
                  </select>
                </div>
              </div>
              <input
                type="date"
                placeholder="Ngày sinh"
                className="input-box mt-3"
                value={birthDay}
                onChange={(e) => setBirthDay(e.target.value)}
              />
              {/* <input
                type="text"
                placeholder="Địa chỉ"
                className="input-box mt-3"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              /> */}
              <input
                type="text"
                placeholder="số điện thoại"
                className="input-box mt-3"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <input
                type="text"
                placeholder="email"
                className="input-box mt-3"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="mật khẩu"
                className="input-box mt-3"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="nhập lại mật khẩu"
                className="input-box mt-3"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
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
