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
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const hanldeLogin = (type) => {
    if (type === "default") {
      alert("login default");
    }

    if (type === "google") {
      alert("login google");
    }
  };

  const handleRegisterUser = () => {
    alert('demo');
  }

  return (
    <div className="Login-Wrapper">
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
          <select className="select register-select">
            <option>Khách Hàng</option>
            <option>Bác Sỹ</option>
            <option>Quản Trị Viên</option>
          </select>
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
              <input
                type="text"
                placeholder="Địa chỉ"
                className="input-box mt-3"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
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
                onClick={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="mật khẩu"
                className="input-box mt-3"
                value={password}
                onClick={(e) => setPassword(e.target.value)}
              />
              <button 
                    className='btn-register mt-3'
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
