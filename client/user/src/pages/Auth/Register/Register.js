import { useContext, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "~/context/authContext";

import "./Register.scss";

function Register() {
  const { login, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    currentUser && navigate("/");
  }, [currentUser, navigate]);

  return (
    <div className="Register-wrapper">
      <div className="Register-body">
        <h1 className="title">Đăng Kí Tài Khoản</h1>
        <div className="fisrt-block-input">
          <input type="text" placeholder="Họ và Tên" className="input mt-3" />
          <div className="checkbox-wrap">
            <Form.Select aria-label="Giới tính">
              <option value="1">Nam</option>
              <option value="2">Nữ</option>
              <option value="3">Khác</option>
            </Form.Select>
          </div>
        </div>
        <input type="text" placeholder="Ngày sinh" className="input-box mt-3" />
        <input type="text" placeholder="Địa chỉ" className="input-box mt-3" />
        <input
          type="text"
          placeholder="số điện thoại"
          className="input-box mt-3"
        />
        <input type="text" placeholder="email" className="input-box mt-3" />
        <input type="text" placeholder="mật khẩu" className="input-box mt-3" />
        <button className="btn-register mt-3">Đăng Kí</button>
      </div>
    </div>
  );
}

export default Register;
