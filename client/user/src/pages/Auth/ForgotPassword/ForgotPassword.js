import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import "./ForgotPassword.scss";

function ForgotPassword() {

  const navigate = useNavigate();

  const [email, setEmail] = useState('')

  const hanldeLogin = (type) => {
    if(type === 'default') {
      navigate('/login')
    }
  }

  return (
    <div className="Login-Wrapper">
      <div className="login-main animate__animated animate__fadeInDown">
        {/* <div className="login-title">Đăng Nhập</div> */}
        <div className="Forgot-body">
          <div className="form-body">
            <div className="form-content">
              <h2>Quên Mật Khẩu</h2>
              <input 
                type="text" 
                placeholder="email hoặc số điện thoại" 
                className="input-box" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button 
                className="btn-sign-in mt-3"
                onClick={() => hanldeLogin('default')}
              >
                Tiếp Tục 
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
