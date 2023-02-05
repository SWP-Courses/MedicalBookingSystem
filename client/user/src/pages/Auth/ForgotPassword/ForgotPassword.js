import Form from "react-bootstrap/Form";

import "./ForgotPassword.scss";

function ForgotPassword() {
  return (
    <div className="Login-Wrapper">
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
            <h2>Nhập Email</h2>
            <input type="text" placeholder="Email" className="input-box" />
            <button className="btn-sign-in mt-3 mb-3">TIẾP TỤC</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
