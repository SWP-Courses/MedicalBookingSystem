import Form from "react-bootstrap/Form";

import "./Login.scss";

function Login() {
  return (
    <div className="Login-Wrapper">
      <div className="Login-header">
        <div className="logo">
          <img
            src=''
            alt='logo'
          />
          <div className="sign-in">Đăng Nhập</div>
        </div>
        <div className="sign-up">Đăng Kí</div>
      </div>
      <div className="Login-body">
        <div className="select-role">
            <Form.Select aria-label="Khách Hàng">
                <option value="1">Khách Hàng</option>
                <option value="2">Amdin</option>
                <option value="3">Doctor</option>
            </Form.Select>
        </div>
        <div className="form-login">
          <div className="form-body">
            <h2>Booking Care System</h2>
            <input type="text" placeholder="UserName" className="input-box" />
            <input
              type="password"
              placeholder="password"
              className="input-box mt-3"
            />
            <p className="forgot-password">Quên mật khẩu</p>
            <button className="btn-sign-in mt-3">Đăng Nhập</button>
            <p className="create-account">Tạo Tài Khoản</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
