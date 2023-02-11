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
      alert('login default')
    }

    if(type === 'google') {
      alert('login google')
    }
  }

  return (
    <div className="Login-Wrapper">
      <div className="Login-header">
        <div className="logo">
          <img src="" alt="logo" 
            onClick={() => navigate('/')}
            className='logo'
          />
          <div>Quên Mật Khẩu</div>
        </div>
      </div>
      <div className="login-main">
        {/* <div className="login-title">Đăng Nhập</div> */}
        <div className="login-body">
          <select className="select">
            <option>Khách Hàng</option>
            <option>Bác Sỹ</option>
            <option>Quản Trị Viên</option>
          </select>
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
