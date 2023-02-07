import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import "./Login.scss";

function Login() {

  const navigate = useNavigate();

  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('');

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
          <div>Đăng Nhập</div>
        </div>
      </div>
      <div className="login-main">
        <div className="login-body">
          <select className="select">
            <option>Khách Hàng</option>
            <option>Bác Sỹ</option>
            <option>Quản Trị Viên</option>
          </select>
          <div className="form-body">
            <div className="form-content">
              <h2>Booking Care System</h2>
              <input 
                type="text" 
                placeholder="UserName" 
                className="input-box" 
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
              <input
                type="password"
                placeholder="password"
                className="input-box mt-3"
                value={password}
                onChange={(e) => setUserName(e.target.value)}
              />
              <p 
                className="forgot-password"
                onClick={() => navigate('/forgot-password')}
              >
                Quên mật khẩu
              </p>
              <button 
                className="btn-sign-in"
                onClick={() => hanldeLogin('default')}
              >
                Đăng Nhập
              </button>
              <div className="separate mt-3">
                <div className="line">
                </div>
                <span>Hoặc</span>
                <div className="line">
                </div>
              </div>
              <div>
              <div 
                className="login-google mt-3"
                onClick={() => hanldeLogin('google')}
              >
                <FontAwesomeIcon icon={faGoogle} className='google-icon'/>
              </div>
              </div>
              <div className="sign-up mt-3">
                <span>Bạn Chưa Có Tài Khoản ?</span><Link to="/register">Đăng Kí</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
